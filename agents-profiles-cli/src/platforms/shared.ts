import type { InitOptions, GeneratorOutput, PlatformInfo } from '../types.js'
import { copyNativeAgents, buildCuratedConfig } from './helpers.js'
import { logWarn } from '../utils/logger.js'

export async function generatePlatformConfig(
  options: InitOptions,
  cwd: string,
  platform: PlatformInfo,
  configPath: string,
  extra?: string,
): Promise<GeneratorOutput> {
  const files: GeneratorOutput['files'] = []
  const agentFiles: GeneratorOutput['agentFiles'] = []

  const copyResults = await copyNativeAgents(options, platform, cwd)
  for (const r of copyResults) {
    if (r.copied) {
      agentFiles.push({ src: r.src, dest: r.dest })
    } else {
      logWarn(`Agent file not found for ${r.id} in ${platform.name} format`)
    }
  }

  const content = buildCuratedConfig(options, platform.name, platform.agentDir, extra)

  files.push({ path: configPath, content })

  return { platform: platform.id, files, agentFiles }
}
