import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ensureDir, pathExists } from '../utils/fs.js'
import type { InitOptions, PlatformInfo } from '../types.js'

export interface AgentCopyResult {
  id: string
  src: string
  dest: string
  copied: boolean
}

export async function copyNativeAgents(
  options: InitOptions,
  platform: PlatformInfo,
  projectDir: string,
): Promise<AgentCopyResult[]> {
  const results: AgentCopyResult[] = []
  const targetDir = join(projectDir, platform.agentDir)
  await ensureDir(targetDir)

  for (const agent of options.agents) {
    const agentFile = agent.file
    const nativeSrc = join(options.templatesDir, 'native-agents', platform.nativeAgentDir, agentFile)
    const profileSrc = join(options.templatesDir, 'profiles', agent.category, agentFile)
    const src = (await pathExists(nativeSrc)) ? nativeSrc : profileSrc
    const dest = join(targetDir, agentFile)

    if (await pathExists(src)) {
      await copyFile(src, dest)
      results.push({ id: agent.id, src, dest, copied: true })
    } else {
      results.push({ id: agent.id, src: '', dest, copied: false })
    }
  }

  return results
}

export function buildAgentRosterTable(agents: InitOptions['agents']): string {
  return [
    '| Agent | Category | Purpose |',
    '|-------|----------|---------|',
    ...agents.map((a) => `| ${a.name} | ${a.category} | ${a.description} |`),
  ].join('\n')
}

/** Full triage table from the curated README — maps task domains to agent types */
export function buildFullTriageTable(): string {
  return [
    '| Task Domain | Route To |',
    '|-------------|----------|',
    '| arch/design/ADR | Architect, Cloud Architect |',
    '| frontend | Frontend Engineer |',
    '| backend API | Backend Engineer + Language Engineer |',
    '| language:* | Language Engineer (Node, Python, Rust, Go, Java, etc.) |',
    '| mobile | Mobile Engineer (iOS/Android) |',
    '| embedded | Embedded Engineer |',
    '| infra/k8s/terraform | DevOps, K8s, Terraform Engineer |',
    '| ci/cd/gitops | CI/CD Engineer, ArgoCD Engineer |',
    '| database/ha | DBRE Engineer, Database Admin |',
    '| security/threat | Security Engineer, AppSec Engineer |',
    '| soc/monitoring | SOC Analyst, Observability Engineer |',
    '| secrets/vault | Secrets & Vault Engineer |',
    '| pentest | Penetration Tester |',
    '| data pipeline | Data Engineer, Kafka Engineer |',
    '| ml/ai/llm | ML Engineer, AI Engineer, LLM Engineer |',
    '| bi/dashboard | BI Engineer |',
    '| testing/qa | QA Engineer, E2E Engineer |',
    '| performance | Performance Engineer |',
    '| review | Reviewer |',
    '| api design | API Engineer |',
    '| ops/incident | Operations, SRE |',
    '| chaos/resilience | Chaos Engineer |',
    '| edge/cdn | Edge/CDN Engineer |',
    '| docs | Technical Writer |',
    '| compliance | Compliance Officer, Privacy Engineer |',
    '| finops | FinOps Engineer |',
    '| planning | PM, Planner, Scrum Master |',
    '| product | Product Manager |',
    '| debugging | Support Engineer |',
    '| localization | Localization Engineer |',
  ].join('\n')
}

export function buildHandoffProtocol(): string {
  return [
    '| From Agent | To Agent | Artifact | Format |',
    '|------------|----------|----------|--------|',
    '| Specialist | Reviewer | Code/implementation | PR with description |',
    '| Specialist | QA Engineer | Feature with tests | Test suite + coverage |',
    '| Developer | Technical Writer | API changes | Updated docs + changelog |',
    '| Developer | DevOps | Dockerfile, CI config | Build + deploy manifests |',
    '| Any Agent | Orchestrator | Completed work | Summary + next steps |',
  ].join('\n')
}

/** Full curated config content following the README self-setup protocol template */
export function buildCuratedConfig(
  opts: InitOptions,
  platformName: string,
  agentDir: string,
  extra?: string,
): string {
  return `# ${opts.projectName} — Multi-Agent Engineering System

> **Your AI is now the Orchestrator. Route tasks to specialist agents.**
> **118 profiles at github.com/CrimsonDevil333333/agents-profiles**
> **${opts.agents.length} agents selected for this project**

---

## Role: Orchestrator — NOT the Doer

You coordinate. You do NOT do specialized work. Every specialized task is routed to a specialist agent.

---

## Quick Triage (task → agent)

Use this table to route user tasks to the right specialist agent:

${buildFullTriageTable()}

---

## Selected Agent Roster

| Agent | Category | Purpose |
|-------|----------|---------|
${opts.agents.map((a) => `| ${a.name} | ${a.category} | ${a.description} |`).join('\n')}

---

## Quality Gates

Every output MUST pass these gates before reaching the user:

1. **Reviewer gate** — audit output as the Reviewer agent
2. **Test gate** — bug fixes must include a regression test
3. **Anti-pattern check** — verify against agent's Anti-Patterns table
4. **Context gate** — drop previous agent's context before loading the next

**No gate can be skipped.**

---

## Instructions for the Orchestrator

1. **You are the Orchestrator** — route specialized work, do not do it yourself
2. **Load agents** from \`${agentDir}\` directory
3. **Speak AS the agent** — adopt their tone, standards, and knowledge
4. **Drop context on handoff** — keep only the artifact when switching domains
5. **Use Handoff Protocol** — always use the agent's Handoff Protocol when switching

### Bug Fix Workflow
When addressing a bug, follow this sequence:
1. **Triage** (Support Engineer)
2. **Route** (Orchestrator)
3. **Fix + test** (Specialist)
4. **Review** (Reviewer)
5. **Verify** (QA/E2E Engineer)
6. **Prevent** (add anti-pattern if novel)

### Handoff Protocol

${buildHandoffProtocol()}

---

## Agent File Format

Every agent file in \`${agentDir}\` follows this structure:

\`\`\`
# Agent Name — Subtitle

> Role blockquote

## 1. Identity & Persona
- Name, Codename, Core Mandate
- Personality Matrix (4 traits)

## 2-N. Domain-Specific Sections

## N. Anti-Patterns

## N+1. Handoff Protocol

## N+2. Closing Quote
\`\`\`

**All 118 agents follow this exact format.**

---

## Workflow Patterns

### New Feature Development
\`\`\`
Planner → Architect → Developer → Reviewer → QA → DevOps
\`\`\`

### Incident Response
\`\`\`
Support → Operations → SRE → Developer/Observability
\`\`\`

### Security Review
\`\`\`
Security Engineer → Developer → AppSec → Compliance
\`\`\`

---

## Full Agent Catalog (118 agents)

The complete roster covers 18 categories:
- orchestration (8) · executive (3) · business-analysis (2)
- people-culture (3) · business-revenue (5) · design-architecture (6)
- system-extensibility (6) · language-specific (11) · engineering-dev (9)
- testing-quality (5) · cloud-infra-architecture (5) · infrastructure-ops (13)
- data-intelligence (13) · specialized-engineering (13) · compliance-legal-finance (5)
- content-communication (6) · it-support (1) · planning-oversight (4)

**Agent files: https://github.com/CrimsonDevil333333/agents-profiles**

${extra || ''}
---
*Setup by agents-profiles-cli*`
}
