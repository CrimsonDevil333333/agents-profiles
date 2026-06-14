import pc from 'picocolors'

export function logInfo(msg: string): void {
  console.log(`${pc.cyan('ℹ')} ${msg}`)
}

export function logSuccess(msg: string): void {
  console.log(`${pc.green('✔')} ${msg}`)
}

export function logWarn(msg: string): void {
  console.log(`${pc.yellow('⚠')} ${msg}`)
}

export function logError(msg: string): void {
  console.log(`${pc.red('✖')} ${msg}`)
}

export function logStep(step: number, total: number, msg: string): void {
  console.log(`\n${pc.bold(pc.cyan(`[${step}/${total}]`))} ${pc.bold(msg)}`)
}

export function logHeader(): void {
  console.log(`\n${pc.bold(pc.cyan('agents-profiles-cli'))} ${pc.dim('— AI Agent Setup Wizard')}\n`)
}

export function logFooter(projectDir: string): void {
  console.log(`\n${pc.bold(pc.green('✓ Setup complete!'))}`)
  console.log(`  Configuration written to ${pc.cyan(projectDir)}`)
  console.log(`  ${pc.dim('Run your AI coding assistant to start using the agents.')}\n`)
}
