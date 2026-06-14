import type { InitOptions } from '../types.js'
import { runInteractiveFlow } from '../tui/prompts.js'
import { generateForPlatforms } from '../platforms/registry.js'
import { writeGeneratedFile } from '../utils/fs.js'
import { logStep, logSuccess, logFooter, logInfo, logError } from '../utils/logger.js'
import pc from 'picocolors'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

function resolveTemplatesDir(): string {
  // CLI is at agents-profiles-cli/dist/commands/init.js
  // Repo root is two levels up: agents-profiles-cli/../
  const dir = typeof __dirname !== 'undefined'
    ? resolve(__dirname, '..', '..', '..')
    : resolve(fileURLToPath(import.meta.url), '..', '..', '..', '..')
  return resolve(dir)
}

export async function initCommand(dir?: string): Promise<void> {
  const cwd = dir ? resolve(dir) : process.cwd()
  const templatesDir = resolveTemplatesDir()

  logInfo(`Working directory: ${pc.dim(cwd)}`)
  logInfo(`Templates: ${pc.dim(templatesDir)}`)

  const options: InitOptions = await runInteractiveFlow(cwd, templatesDir)

  const totalSteps = options.platforms.length + 1
  let currentStep = 1

  logStep(currentStep, totalSteps, `Generating configurations for ${options.platforms.length} platform(s)...`)

  try {
    const outputs = await generateForPlatforms(options.platforms, options, cwd)

    currentStep++
    logStep(currentStep, totalSteps, `Writing ${outputs.reduce((s, o) => s + o.files.length + o.agentFiles.length, 0)} file(s)...`)

    let totalFiles = 0
    let totalAgents = 0

    for (const output of outputs) {
      for (const file of output.files) {
        const writtenPath = await writeGeneratedFile(cwd, file.path, file.content)
        logSuccess(`  ${pc.cyan(output.platform.padEnd(14))} ${pc.dim(writtenPath.replace(cwd, '.'))}`)
        totalFiles++
      }
      for (const af of output.agentFiles) {
        logSuccess(`  ${pc.cyan('agent'.padEnd(14))} ${pc.dim(af.dest.replace(cwd, '.'))}`)
        totalAgents++
      }
    }

    logFooter('.')

    const platformLabels = options.platforms.map((p) => {
      if (p === 'custom') return `custom (${options.customProviders.length})`
      return p
    })

    const summary = [
      `\n${pc.bold('Summary')}`,
      `  ${pc.dim('Project:')}     ${options.projectName}`,
      `  ${pc.dim('Platforms:')}   ${platformLabels.join(', ')}`,
      `  ${pc.dim('Agents:')}      ${options.agents.length} (${totalAgents} agent files copied)`,
      `  ${pc.dim('Files:')}       ${totalFiles} config files written`,
      `  ${pc.dim('Depth:')}       ${options.agentDepth}`,
    ]
    if (options.aiCredentials) {
      summary.push(`  ${pc.dim('AI:')}          ${options.aiCredentials.model} @ ${options.aiCredentials.baseUrl}`)
    }
    console.log(summary.join('\n'))
    console.log('')
  } catch (err) {
    logError(`Failed: ${err instanceof Error ? err.message : String(err)}`)
    process.exit(1)
  }
}
