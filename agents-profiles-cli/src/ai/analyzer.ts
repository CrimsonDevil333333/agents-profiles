import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import type { AIConfig } from './client.js'
import { chatCompletion } from './client.js'
import { pathExists } from '../utils/fs.js'

export interface AnalysisResult {
  projectSummary: string
  recommendedAgentIds: string[]
  reasoning: string
}

export async function analyzeProject(cwd: string, aiConfig: AIConfig): Promise<AnalysisResult> {
  const projectContext = await gatherProjectContext(cwd)

  const systemPrompt = `You are a project analysis AI. Your job is to analyze a software project and recommend the best AI specialist agents for it.

We have 118 pre-built agent profiles across 18 categories. Based on the project's languages, frameworks, infrastructure, and domain, recommend 6-15 agents that would be most useful.

Available categories and their agents:
- orchestration (8): Orchestrator, Planner, Product Manager, Project Manager, Program Manager, Scrum Master, Engineering Manager, Agile Coach
- executive (3): CEO, CTO, VP Engineering
- business-analysis (2): Business Analyst, Data Analyst
- people-culture (3): HR Manager, Technical Recruiter, Training Specialist
- business-revenue (5): Sales Engineer, Developer Advocate, Customer Success, TAM, Marketing Engineer
- design-architecture (6): Architect, Solutions Architect, Designer, Usability Engineer, Researcher, Workflow Designer
- system-extensibility (6): Agent Builder, Skill Creator, MCP Server Developer, Prompt Engineer, Knowledge Curator, Agent Evaluator
- language-specific (11): Node.js, Python, Rust, Go, Java, PHP, Ruby, .NET, C/C++, Zig, Swift Engineers
- engineering-dev (9): Frontend, Mobile, iOS, Android, Embedded, Backend, Developer, Reviewer, Automation Engineer
- testing-quality (5): Tester, QA Engineer, E2E Automation, Performance Engineer, Penetration Tester
- cloud-infra-architecture (5): Cloud Architect, AWS/Azure/GCP Engineer, Terraform Engineer
- infrastructure-ops (13): DevOps, Ops, SRE, Platform, Network, Chaos, K8s, ArgoCD, Mesh, Helm, DBRE, CI/CD, Edge Engineer
- data-intelligence (13): Data Eng, Data Arch, Analytics, Data Sci, AI, LLM, ML, DL, MLOps, Data Quality, DBA, Kafka, BI Engineer
- specialized-engineering (13): API, Integration, Migration, Security, DevSecOps, IAM, Incident, Data Protection, Observability, Release, Vault, AppSec, SOC
- compliance-legal-finance (5): Compliance, Legal, Accessibility, FinOps, Privacy
- content-communication (6): Tech Writer, Content Strategist, Translator, Proposal, Localization, Support
- it-support (1): IT Support Engineer
- planning-oversight (4): Cost Estimator, Risk, Change, Vendor

Respond in this exact JSON format (no markdown, no code fences):
{
  "projectSummary": "2-3 sentence summary of what this project does",
  "recommendedAgentIds": ["agent-id-1", "agent-id-2", ...],
  "reasoning": "Brief explanation of why these agents were selected"
}

Agent IDs use kebab-case matching the file names: e.g., "frontend-engineer", "python-engineer", "devops-engineer", "cloud-architect", etc.`

  const userPrompt = `Analyze this project and recommend AI agents:

Project files detected:
${projectContext}

Return ONLY valid JSON matching the specified format.`

  const response = await chatCompletion(aiConfig, [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt },
  ])

  return parseAnalysis(response)
}

function parseAnalysis(raw: string): AnalysisResult {
  const cleaned = raw
    .replace(/```(?:json)?\s*/gi, '')
    .replace(/\s*```/g, '')
    .trim()

  try {
    const parsed = JSON.parse(cleaned) as AnalysisResult
    return {
      projectSummary: parsed.projectSummary || '',
      recommendedAgentIds: Array.isArray(parsed.recommendedAgentIds) ? parsed.recommendedAgentIds : [],
      reasoning: parsed.reasoning || '',
    }
  } catch {
    return {
      projectSummary: 'Could not parse AI analysis. Using default agent selection.',
      recommendedAgentIds: [],
      reasoning: 'AI response was not valid JSON. Falling back to defaults.',
    }
  }
}

async function gatherProjectContext(cwd: string): Promise<string> {
  const parts: string[] = []

  const configFiles = [
    'package.json', 'tsconfig.json', 'pyproject.toml', 'Cargo.toml',
    'go.mod', 'pom.xml', 'build.gradle', 'Gemfile', 'composer.json',
    'Dockerfile', 'docker-compose.yml', 'Makefile', 'CMakeLists.txt',
  ]

  for (const file of configFiles) {
    const fp = join(cwd, file)
    if (await pathExists(fp)) {
      try {
        const content = await readFile(fp, 'utf-8')
        const truncated = content.length > 2000 ? content.slice(0, 2000) + '\n... [truncated]' : content
        parts.push(`=== ${file} ===\n${truncated}`)
      } catch { }
    }
  }

  const readmePath = join(cwd, 'README.md')
  if (await pathExists(readmePath)) {
    try {
      const content = await readFile(readmePath, 'utf-8')
      const truncated = content.length > 3000 ? content.slice(0, 3000) + '\n... [truncated]' : content
      parts.push(`=== README.md ===\n${truncated}`)
    } catch { }
  }

  const srcDir = join(cwd, 'src')
  if (await pathExists(srcDir)) {
    try {
      const files = await readdir(srcDir, { recursive: true })
      const extensions = new Set<string>()
      for (const f of files.slice(0, 500)) {
        const ext = f.split('.').pop()
        if (ext && ext.length < 10) extensions.add(ext)
      }
      if (extensions.size > 0) {
        parts.push(`Source file extensions: ${[...extensions].sort().join(', ')}`)
      }
    } catch { }
  }

  return parts.join('\n\n') || 'No project files detected. Unknown project type.'
}
