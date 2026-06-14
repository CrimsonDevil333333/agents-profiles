import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import type { DetectedProject } from '../types.js'
import { pathExists } from '../utils/fs.js'

export async function detectProject(cwd: string): Promise<DetectedProject> {
  const result: DetectedProject = {
    languages: [],
    frameworks: [],
    packageManager: null,
    hasDocker: false,
    hasCiCd: false,
    testFrameworks: [],
  }

  await Promise.all([
    detectLanguages(cwd, result),
    detectFrameworks(cwd, result),
    detectPackageManager(cwd, result),
    detectDocker(cwd, result),
    detectCiCd(cwd, result),
    detectTestFrameworks(cwd, result),
  ])

  return result
}

async function detectLanguages(cwd: string, result: DetectedProject): Promise<void> {
  const checks: Array<[string, string]> = [
    ['package.json', 'JavaScript'],
    ['tsconfig.json', 'TypeScript'],
    ['pyproject.toml', 'Python'],
    ['requirements.txt', 'Python'],
    ['setup.py', 'Python'],
    ['Cargo.toml', 'Rust'],
    ['go.mod', 'Go'],
    ['pom.xml', 'Java'],
    ['build.gradle', 'Java'],
    ['Gemfile', 'Ruby'],
    ['composer.json', 'PHP'],
    ['*.csproj', 'C#'],
    ['CMakeLists.txt', 'C++'],
    ['Makefile', 'C'],
    ['Package.swift', 'Swift'],
    ['build.zig', 'Zig'],
  ]

  for (const [file, lang] of checks) {
    if (file.includes('*')) {
      const dir = await readdir(cwd)
      if (dir.some((f) => f.endsWith(file.slice(1)))) {
        addUnique(result.languages, lang)
      }
    } else if (await pathExists(join(cwd, file))) {
      addUnique(result.languages, lang)
    }
  }

  if (result.languages.length === 0) {
    result.languages.push('Unknown')
  }
}

async function detectFrameworks(cwd: string, result: DetectedProject): Promise<void> {
  const pkgJsonPath = join(cwd, 'package.json')
  if (await pathExists(pkgJsonPath)) {
    try {
      const content = JSON.parse(await readFile(pkgJsonPath, 'utf-8'))
      const deps = { ...content.dependencies, ...content.devDependencies } as Record<string, string>
      const frameworkMap: Record<string, string> = {
        next: 'Next.js',
        react: 'React',
        vue: 'Vue.js',
        angular: 'Angular',
        svelte: 'Svelte',
        express: 'Express.js',
        nest: 'NestJS',
        fastify: 'Fastify',
        'nuxt': 'Nuxt.js',
        'gatsby': 'Gatsby',
        'remix': 'Remix',
        'astro': 'Astro',
        'solid-js': 'Solid.js',
        'preact': 'Preact',
        'hono': 'Hono',
        'elysia': 'Elysia',
      }
      for (const [key, name] of Object.entries(frameworkMap)) {
        if (deps[key]) addUnique(result.frameworks, name)
      }
    } catch { }
  }

  const pyprojectPath = join(cwd, 'pyproject.toml')
  if (await pathExists(pyprojectPath)) {
    try {
      const content = await readFile(pyprojectPath, 'utf-8')
      if (content.includes('django')) addUnique(result.frameworks, 'Django')
      if (content.includes('fastapi')) addUnique(result.frameworks, 'FastAPI')
      if (content.includes('flask')) addUnique(result.frameworks, 'Flask')
    } catch { }
  }
}

async function detectPackageManager(cwd: string, result: DetectedProject): Promise<void> {
  const checks: Array<[string, string]> = [
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['package-lock.json', 'npm'],
    ['bun.lockb', 'bun'],
    ['Cargo.toml', 'cargo'],
    ['go.mod', 'go'],
    ['Gemfile', 'bundler'],
    ['pyproject.toml', 'pip'],
    ['requirements.txt', 'pip'],
  ]
  for (const [file, pm] of checks) {
    if (await pathExists(join(cwd, file))) {
      result.packageManager = pm
      return
    }
  }
}

async function detectDocker(cwd: string, result: DetectedProject): Promise<void> {
  result.hasDocker = await pathExists(join(cwd, 'Dockerfile'))
}

async function detectCiCd(cwd: string, result: DetectedProject): Promise<void> {
  const ghPath = join(cwd, '.github', 'workflows')
  result.hasCiCd = await pathExists(ghPath)
}

async function detectTestFrameworks(cwd: string, result: DetectedProject): Promise<void> {
  const pkgJsonPath = join(cwd, 'package.json')
  if (await pathExists(pkgJsonPath)) {
    try {
      const content = JSON.parse(await readFile(pkgJsonPath, 'utf-8'))
      const deps = { ...content.dependencies, ...content.devDependencies } as Record<string, string>
      const testMap: Record<string, string> = {
        vitest: 'Vitest',
        jest: 'Jest',
        mocha: 'Mocha',
        ava: 'AVA',
        tape: 'Tape',
        'playwright': 'Playwright',
        'cypress': 'Cypress',
      }
      for (const [key, name] of Object.entries(testMap)) {
        if (deps[key]) addUnique(result.testFrameworks, name)
      }
    } catch { }
  }

  const pyprojectPath = join(cwd, 'pyproject.toml')
  if (await pathExists(pyprojectPath)) {
    try {
      const content = await readFile(pyprojectPath, 'utf-8')
      if (content.includes('pytest')) addUnique(result.testFrameworks, 'pytest')
      if (content.includes('unittest')) addUnique(result.testFrameworks, 'unittest')
    } catch { }
  }
}

function addUnique(arr: string[], item: string): void {
  if (!arr.includes(item)) arr.push(item)
}
