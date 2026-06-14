import { mkdir, writeFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'

export async function ensureDir(dir: string): Promise<void> {
  await mkdir(dir, { recursive: true })
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

export async function writeGeneratedFile(basePath: string, filePath: string, content: string): Promise<string> {
  const fullPath = join(basePath, filePath)
  await ensureDir(dirname(fullPath))
  await writeFile(fullPath, content, 'utf-8')
  return fullPath
}
