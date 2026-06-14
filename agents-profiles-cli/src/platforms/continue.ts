import type { InitOptions, GeneratorOutput, PlatformInfo } from '../types.js'
import { copyNativeAgents, buildCuratedConfig } from './helpers.js'
import { logWarn } from '../utils/logger.js'

export const continueInfo: PlatformInfo = {
  id: 'continue', name: 'Continue.dev', description: 'Open-source AI code assistant',
  configFiles: ['.continuerc.json'], configDir: '.continue', agentDir: '.continue/agents',
  nativeAgentDir: 'opencode', agentExt: '.md', enabled: true,
}

export const genericInfo: PlatformInfo = {
  id: 'generic', name: 'Generic / System Prompt', description: 'Universal config for ChatGPT, Gemini, DeepSeek, Grok',
  configFiles: ['AI_AGENTS.md'], configDir: '.agents', agentDir: '.agents/profiles',
  nativeAgentDir: 'opencode', agentExt: '.md', enabled: true,
}

async function generateConfig(
  options: InitOptions, cwd: string, platform: PlatformInfo, configPath: string, format: 'json' | 'md',
): Promise<GeneratorOutput> {
  const files: GeneratorOutput['files'] = []
  const agentFiles: GeneratorOutput['agentFiles'] = []

  const copyResults = await copyNativeAgents(options, platform, cwd)
  for (const r of copyResults) {
    if (r.copied) agentFiles.push({ src: r.src, dest: r.dest })
    else logWarn(`Agent file not found for ${r.id}`)
  }

  if (format === 'json') {
    const continuerc = {
      models: [{ title: 'Default', provider: 'openai', model: 'gpt-4o' }],
      customCommands: [{
        name: 'agents',
        description: 'List available AI agents and route tasks',
        prompt: `Available agents:\n${options.agents.map((a) => `  - ${a.name} (${a.id}): ${a.description}`).join('\n')}\n\nRoute the user's request to the appropriate agent.`,
      }],
      contextProviders: [{
        name: 'agent-team',
        params: { agents: options.agents.map((a) => ({ name: a.name, role: a.description, category: a.category })) },
      }],
    }
    files.push({ path: configPath, content: JSON.stringify(continuerc, null, 2) })
  } else {
    files.push({ path: configPath, content: buildCuratedConfig(options, platform.name, platform.agentDir,
      `## For Generic AI Users
- Use this as a system prompt for ChatGPT, Gemini, DeepSeek, Grok, or any LLM
- Copy and paste this file as context before starting your session
- The AI will become the Orchestrator with ${options.agents.length} specialist agents`
    )})
  }

  return { platform: platform.id, files, agentFiles }
}

export async function generateContinue(options: InitOptions, cwd: string): Promise<GeneratorOutput> {
  return generateConfig(options, cwd, continueInfo, '.continuerc.json', 'json')
}

export async function generateGeneric(options: InitOptions, cwd: string): Promise<GeneratorOutput> {
  return generateConfig(options, cwd, genericInfo, 'AI_AGENTS.md', 'md')
}
