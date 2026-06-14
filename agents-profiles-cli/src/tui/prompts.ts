import * as p from '@clack/prompts'
import pc from 'picocolors'
import type { InitOptions, SupportedPlatform, AgentProfile, CustomProviderDef, AICredentials, AIAnalysisResult } from '../types.js'
import { detectProject } from '../detectors/project.js'
import { getBuiltinPlatforms } from '../platforms/registry.js'
import { getAgentCatalog, getAgentCategories, getAgentsByCategory, getMinimalAgents } from '../generators/agents.js'
import { analyzeProject } from '../ai/analyzer.js'
import { logInfo, logSuccess, logWarn } from '../utils/logger.js'

export async function runInteractiveFlow(cwd: string, templatesDir: string): Promise<InitOptions> {
  p.intro(pc.bold(pc.cyan('AI Agent Setup Wizard')))

  const project = await detectProject(cwd)
  if (project.languages.length > 0 && project.languages[0] !== 'Unknown') {
    logInfo(`Detected: ${project.languages.join(', ')}${project.frameworks.length > 0 ? ` • ${project.frameworks.join(', ')}` : ''}`)
  }

  // ── Project name ──
  const projectName = await p.text({
    message: 'What is your project name?',
    placeholder: 'my-awesome-project',
    defaultValue: 'my-project',
    validate: (v) => { if (!v || v.trim().length === 0) return 'Required' },
  })
  if (p.isCancel(projectName) || typeof projectName !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }

  // ── AI analysis (optional) ──
  const useAi = await p.confirm({
    message: 'Use AI to analyze your project and recommend agents?',
    initialValue: true,
  })
  if (p.isCancel(useAi)) { p.cancel('Setup cancelled.'); process.exit(0) }

  let aiCredentials: AICredentials | undefined
  let aiAnalysis: AIAnalysisResult | undefined

  if (useAi) {
    const baseUrl = await p.text({
      message: 'OpenAI-compatible API base URL?',
      placeholder: 'https://api.openai.com/v1',
      defaultValue: 'https://api.openai.com/v1',
    })
    if (p.isCancel(baseUrl) || typeof baseUrl !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }

    const apiKey = await p.password({
      message: 'API key?',
      validate: (v) => { if (!v || v.length === 0) return 'API key is required' },
    })
    if (p.isCancel(apiKey) || typeof apiKey !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }

    const model = await p.text({
      message: 'Model name?',
      placeholder: 'gpt-4o',
      defaultValue: 'gpt-4o',
    })
    if (p.isCancel(model) || typeof model !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }

    aiCredentials = { baseUrl: baseUrl.trim(), apiKey: apiKey.trim(), model: model.trim() || 'gpt-4o' }

    const spin = p.spinner()
    spin.start('Analyzing project with AI...')

    try {
      aiAnalysis = await analyzeProject(cwd, aiCredentials)
      spin.stop(`Analysis complete: ${aiAnalysis.projectSummary.slice(0, 100)}${aiAnalysis.projectSummary.length > 100 ? '...' : ''}`)
      if (aiAnalysis.recommendedAgentIds.length > 0) {
        logSuccess(`AI recommends ${aiAnalysis.recommendedAgentIds.length} agents`)
      }
    } catch (err) {
      spin.stop('AI analysis failed')
      logWarn(`AI error: ${err instanceof Error ? err.message : String(err)}`)
      logInfo('Falling back to manual agent selection')
    }
  }

  // ── Platform selection ──
  const builtinChoices = getBuiltinPlatforms().map((pl) => ({
    value: pl.id as SupportedPlatform,
    label: `${pl.name} — ${pl.description}`,
    hint: pl.configFiles.join(', '),
  }))
  builtinChoices.push({ value: 'custom' as SupportedPlatform, label: 'Custom Provider', hint: 'Define your own AI tool' })

  const selectedPlatforms = await p.multiselect<SupportedPlatform>({
    message: 'Which AI platforms do you want to configure?',
    options: builtinChoices, required: true,
  })
  if (p.isCancel(selectedPlatforms)) { p.cancel('Setup cancelled.'); process.exit(0) }

  // ── Custom providers ──
  const customProviders: CustomProviderDef[] = []
  if (selectedPlatforms.includes('custom' as SupportedPlatform)) {
    p.note('Define custom AI providers.', 'Custom Providers')
    let addMore = true
    while (addMore) {
      const cpName = await p.text({ message: 'Provider name?', placeholder: 'My Custom AI', validate: (v) => { if (!v || v.trim().length === 0) return 'Required' } })
      if (p.isCancel(cpName) || typeof cpName !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }
      const cpId = cpName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom-ai'
      const cpDesc = await p.text({ message: 'Description?', placeholder: 'Custom AI configuration', defaultValue: 'Custom provider' })
      if (p.isCancel(cpDesc) || typeof cpDesc !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }
      const cpFile = await p.text({ message: 'Config file path?', placeholder: '.my-ai/config.md', defaultValue: `.${cpId}.md`, validate: (v) => { if (!v || v.trim().length === 0) return 'Required' } })
      if (p.isCancel(cpFile) || typeof cpFile !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }
      const cpFormat = await p.select<string>({
        message: 'Format?',
        options: [
          { value: 'markdown', label: 'Markdown' }, { value: 'json', label: 'JSON' },
          { value: 'yaml', label: 'YAML' }, { value: 'toml', label: 'TOML' }, { value: 'text', label: 'Plain Text' },
        ],
      })
      if (p.isCancel(cpFormat) || typeof cpFormat !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }
      customProviders.push({ id: cpId, name: cpName.trim(), description: cpDesc.trim(), configFilePath: cpFile.trim(), configFormat: cpFormat as any })
      logSuccess(`Added: ${cpName.trim()}`)
      const more = await p.confirm({ message: 'Add another?', initialValue: false })
      if (p.isCancel(more)) { p.cancel('Setup cancelled.'); process.exit(0) }
      addMore = more === true
    }
  }

  // ── Agent selection ──
  const depthChoiceRaw = await p.select<string>({
    message: 'How many agents?',
    options: [
      { value: 'minimal', label: 'Minimal', hint: 'Core orchestration (8 agents)' },
      { value: 'standard', label: 'Standard', hint: 'Pick categories + agents yourself' },
      { value: 'complete', label: 'Complete', hint: 'Full 24-agent engineering org' },
    ],
  })
  if (p.isCancel(depthChoiceRaw)) { p.cancel('Setup cancelled.'); process.exit(0) }
  const depthChoice = depthChoiceRaw as InitOptions['agentDepth']

  let selectedAgents: AgentProfile[]
  const allAgents = getAgentCatalog()
  const customAgents: AgentProfile[] = []

  if (depthChoice === 'complete') {
    selectedAgents = allAgents
  } else if (depthChoice === 'minimal') {
    selectedAgents = getMinimalAgents()
  } else {
    const categories = getAgentCategories()
    const selectedCategoriesRaw = await p.multiselect<string>({
      message: 'Which agent categories?',
      options: categories.map((cat) => ({ value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) })),
      required: true,
    })
    if (p.isCancel(selectedCategoriesRaw)) { p.cancel('Setup cancelled.'); process.exit(0) }
    selectedAgents = selectedCategoriesRaw.flatMap((cat) => getAgentsByCategory(cat))

    const chosenIds = await p.multiselect<string>({
      message: 'Select specific agents:',
      options: selectedAgents.map((a) => ({ value: a.id, label: a.name, hint: a.description })),
      required: false,
    })
    if (p.isCancel(chosenIds)) { p.cancel('Setup cancelled.'); process.exit(0) }
    if (chosenIds && chosenIds.length > 0) {
      selectedAgents = selectedAgents.filter((a) => chosenIds.includes(a.id))
    }
  }

  // Apply AI recommendations if available
  if (aiAnalysis?.recommendedAgentIds && aiAnalysis.recommendedAgentIds.length > 0 && depthChoice !== 'complete') {
    const recommended = allAgents.filter((a) => aiAnalysis!.recommendedAgentIds.includes(a.id))
    if (recommended.length > 0) {
      const useAiRec = await p.confirm({
        message: `Use AI recommendation (${recommended.length} agents) instead of your selection?`,
        initialValue: true,
      })
      if (p.isCancel(useAiRec)) { p.cancel('Setup cancelled.'); process.exit(0) }
      if (useAiRec) selectedAgents = recommended
    }
  }

  // ── Custom agents ──
  const addCustomAgents = await p.confirm({ message: 'Add custom agent profiles?', initialValue: false })
  if (p.isCancel(addCustomAgents)) { p.cancel('Setup cancelled.'); process.exit(0) }
  if (addCustomAgents) {
    let adding = true
    while (adding) {
      const caName = await p.text({ message: 'Custom agent name?', placeholder: 'My Specialist', validate: (v) => { if (!v || v.trim().length === 0) return 'Required' } })
      if (p.isCancel(caName) || typeof caName !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }
      const caId = caName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom-agent'
      const caDesc = await p.text({ message: 'What does it do?', placeholder: 'Handles specialized tasks', defaultValue: 'Custom agent' })
      if (p.isCancel(caDesc) || typeof caDesc !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }
      const caCategory = await p.text({ message: 'Category?', placeholder: 'custom', defaultValue: 'custom' })
      if (p.isCancel(caCategory) || typeof caCategory !== 'string') { p.cancel('Setup cancelled.'); process.exit(0) }
      const caPerm = await p.select<string>({
        message: 'Permission level?',
        options: [
          { value: 'read-only', label: 'Read Only' },
          { value: 'read-write', label: 'Read/Write' },
          { value: 'infrastructure', label: 'Infrastructure + Shell' },
        ],
      })
      if (p.isCancel(caPerm)) { p.cancel('Setup cancelled.'); process.exit(0) }
      customAgents.push({ id: caId, name: caName.trim(), description: caDesc.trim(), category: caCategory.trim(), file: `${caId}.md`, permissions: caPerm as any })
      logSuccess(`Added: ${caName.trim()}`)
      const more = await p.confirm({ message: 'Add another?', initialValue: false })
      if (p.isCancel(more)) { p.cancel('Setup cancelled.'); process.exit(0) }
      adding = more === true
    }
  }

  p.outro(pc.green('Done! Generating setup files...'))

  return {
    cwd,
    templatesDir,
    projectName: projectName.trim() || 'my-project',
    platforms: selectedPlatforms,
    agents: [...selectedAgents, ...customAgents],
    includeAllAgents: depthChoice === 'complete',
    agentDepth: depthChoice,
    customProviders,
    customAgents,
    aiCredentials,
    aiAnalysis,
  }
}
