import { Command } from 'commander'
import { initCommand } from './commands/init.js'
import { getBuiltinPlatforms } from './platforms/registry.js'
import pc from 'picocolors'

export function createCLI(): Command {
  const program = new Command()

  program
    .name('agents-profiles-cli')
    .description('AI Agent Setup Wizard — configure multi-agent AI profiles for your project')
    .version('0.2.0')

  program
    .command('init')
    .description('Interactive setup: analyze project, select agents, generate configs')
    .argument('[directory]', 'Project directory (defaults to current directory)')
    .option('-y, --yes', 'Skip prompts and use defaults')
    .addHelpText('after', `
Examples:
  $ agents-profiles-cli init
  $ agents-profiles-cli init /path/to/project

The wizard will:
  1. Detect your project languages/frameworks
  2. Ask for AI API key (optional — enables smart agent recommendations)
  3. Let you pick AI platforms (OpenCode, Claude, Copilot, Cursor, etc.)
  4. Select or customize your agent roster
  5. Generate config files + copy native agent profiles`)
    .action(async (dir?: string) => {
      await initCommand(dir)
    })

  program
    .command('list')
    .alias('ls')
    .description('List all supported AI platforms and their config files')
    .addHelpText('after', `
Example:
  $ agents-profiles-cli list

Shows every platform agents-profiles-cli can configure,
including the config files it generates for each.`)
    .action(() => {
      console.log(`\n${pc.bold(pc.cyan('Supported Platforms:'))}\n`)
      for (const p of getBuiltinPlatforms()) {
        console.log(`  ${pc.bold(p.name.padEnd(20))} ${pc.dim(p.description)}`)
        if (p.configFiles.length > 0) {
          console.log(`  ${''.padEnd(22)}${pc.dim(`Config: ${p.configFiles.join(', ')}`)}`)
          console.log(`  ${''.padEnd(22)}${pc.dim(`Agents: ./${p.agentDir}/`)}`)
        }
        console.log('')
      }
      console.log(`  ${pc.bold('Custom Providers'.padEnd(20))} ${pc.dim('Define your own via')} ${pc.cyan('agents-profiles-cli init')}`)
      console.log('')
    })

  program
    .command('detect')
    .description('Scan a project and show detected languages, frameworks, tooling')
    .argument('[directory]', 'Project directory (defaults to current directory)')
    .addHelpText('after', `
Example:
  $ agents-profiles-cli detect
  $ agents-profiles-cli detect ./my-project

Detects: languages, frameworks, package manager,
Docker, CI/CD pipelines, and test frameworks.`)
    .action(async (dir?: string) => {
      const { detectProject } = await import('./detectors/project.js')
      const cwd = dir ? dir : process.cwd()
      const project = await detectProject(cwd)
      console.log(`\n${pc.bold(pc.cyan('Project Detection Results:'))}\n`)
      console.log(`  ${pc.dim('Languages:')}      ${project.languages.join(', ') || 'Unknown'}`)
      if (project.frameworks.length > 0) {
        console.log(`  ${pc.dim('Frameworks:')}      ${project.frameworks.join(', ')}`)
      }
      if (project.packageManager) {
        console.log(`  ${pc.dim('Package Manager:')} ${project.packageManager}`)
      }
      console.log(`  ${pc.dim('Docker:')}          ${project.hasDocker ? pc.green('Yes') : pc.dim('No')}`)
      console.log(`  ${pc.dim('CI/CD:')}           ${project.hasCiCd ? pc.green('Yes') : pc.dim('No')}`)
      if (project.testFrameworks.length > 0) {
        console.log(`  ${pc.dim('Testing:')}         ${project.testFrameworks.join(', ')}`)
      }
      console.log('')
    })

  program.addHelpText('before', `
${pc.bold('agents-profiles-cli')} — ${pc.cyan('Multi-Agent System Setup Wizard')}

${pc.dim('What is it?')}
  Interactive CLI that configures AI coding assistants with 118 specialist
  agent profiles. Turns any AI (OpenCode, Claude, Copilot, Cursor, etc.)
  into an orchestrator that routes tasks to domain experts.

${pc.dim('Why use it?')}
  • One command sets up a full multi-agent engineering team
  • 118 pre-built specialist profiles across 18 categories
  • Works with OpenCode, Claude Code, GitHub Copilot, Cursor, Windsurf, Aider, Continue.dev
  • AI-powered project analysis recommends the right agents
  • Custom providers and custom agents for any workflow
  • Zero manual config — agents are copied into your project automatically

${pc.dim('Prerequisites')}
  • Node.js 18+ and npm
  • One of: OpenCode, Claude Code, GitHub Copilot, Cursor, Windsurf, Aider, or Continue.dev
  • (Optional) OpenAI-compatible API key for AI-powered agent recommendations

${pc.dim('Installation')}
  $ npm install -g agents-profiles-cli
  $ npx agents-profiles-cli init

${pc.dim('Quick Start')}
  1. ${pc.cyan('agents-profiles-cli init')} — run the wizard in your project
  2. Select your AI platform(s)
  3. Pick agents or let AI recommend them
  4. Open your AI assistant — it's now the Orchestrator

  Then give your AI this command:
  "Fetch and read the config file, then initialize the multi-agent system for my project."

${pc.dim('Commands:')}
`)

  return program
}
