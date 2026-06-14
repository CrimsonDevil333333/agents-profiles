import type { AgentProfile } from '../types.js'

const catalog: AgentProfile[] = [
  // ── Orchestration ──
  { id: 'orchestrator', name: 'Orchestrator', category: 'orchestration', description: 'Routes tasks to specialist agents based on task requirements', file: 'orchestrator.md', permissions: 'read-only' },
  { id: 'planner', name: 'Planner', category: 'orchestration', description: 'Strategic planning, milestones, and execution roadmaps', file: 'planner.md', permissions: 'read-only' },
  { id: 'product-manager', name: 'Product Manager', category: 'orchestration', description: 'Product strategy, requirements gathering, backlog refinement', file: 'product-manager.md', permissions: 'read-only' },
  { id: 'project-manager', name: 'Project Manager', category: 'orchestration', description: 'Project tracking, timelines, stakeholder communication', file: 'project-manager.md', permissions: 'read-only' },
  { id: 'program-manager', name: 'Program Manager', category: 'orchestration', description: 'Multi-project coordination and dependency management', file: 'program-manager.md', permissions: 'read-only' },
  { id: 'scrum-master', name: 'Scrum Master', category: 'orchestration', description: 'Agile process facilitation and team coaching', file: 'scrum-master.md', permissions: 'read-only' },
  { id: 'engineering-manager', name: 'Engineering Manager', category: 'orchestration', description: 'Engineering team leadership, hiring, delivery accountability', file: 'engineering-manager.md', permissions: 'read-only' },
  { id: 'agile-coach', name: 'Agile Coach', category: 'orchestration', description: 'Agile transformation coaching and process improvement', file: 'agile-coach.md', permissions: 'read-only' },

  // ── Executive ──
  { id: 'ceo', name: 'CEO', category: 'executive', description: 'Vision, strategy, high-level product decisions', file: 'ceo.md', permissions: 'read-only' },
  { id: 'cto', name: 'CTO', category: 'executive', description: 'Technology strategy, architecture direction, innovation', file: 'cto.md', permissions: 'read-only' },
  { id: 'vp-engineering', name: 'VP Engineering', category: 'executive', description: 'Engineering org leadership, standards, culture', file: 'vp-engineering.md', permissions: 'read-only' },

  // ── Engineering ──
  { id: 'frontend-engineer', name: 'Frontend Engineer', category: 'engineering', description: 'UI/UX implementation, component architecture, responsive design', file: 'frontend-engineer.md', permissions: 'read-write', tools: ['react', 'vue', 'css', 'typescript'] },
  { id: 'backend-engineer', name: 'Backend Engineer', category: 'engineering', description: 'Server logic, API design, database access, business logic', file: 'backend-engineer.md', permissions: 'read-write', tools: ['node', 'python', 'rust', 'go'] },
  { id: 'fullstack-engineer', name: 'Fullstack Engineer', category: 'engineering', description: 'End-to-end feature development across frontend and backend', file: 'fullstack-engineer.md', permissions: 'read-write' },

  // ── Infrastructure ──
  { id: 'devops-engineer', name: 'DevOps Engineer', category: 'infrastructure', description: 'CI/CD pipelines, infrastructure automation, deployment', file: 'devops-engineer.md', permissions: 'infrastructure', tools: ['docker', 'kubernetes', 'terraform', 'ci-cd'] },
  { id: 'sre-engineer', name: 'SRE Engineer', category: 'infrastructure', description: 'System reliability, SLIs/SLOs, incident response, observability', file: 'sre-engineer.md', permissions: 'infrastructure', tools: ['prometheus', 'grafana', 'datadog'] },
  { id: 'cloud-architect', name: 'Cloud Architect', category: 'infrastructure', description: 'Cloud architecture design, migration strategy, cost optimization', file: 'cloud-architect.md', permissions: 'read-only' },

  // ── Specialized ──
  { id: 'security-engineer', name: 'Security Engineer', category: 'specialized', description: 'Application security, threat modeling, vulnerability assessment', file: 'security-engineer.md', permissions: 'read-only' },
  { id: 'data-engineer', name: 'Data Engineer', category: 'data', description: 'Data pipelines, ETL processes, data warehousing, analytics', file: 'data-engineer.md', permissions: 'read-write' },
  { id: 'ai-engineer', name: 'AI Engineer', category: 'data', description: 'LLM integration, AI feature development, prompt engineering', file: 'ai-engineer.md', permissions: 'read-write' },
  { id: 'qa-engineer', name: 'QA Engineer', category: 'testing', description: 'Test strategy, test automation, quality gates', file: 'qa-engineer.md', permissions: 'read-write', tools: ['playwright', 'cypress', 'vitest', 'jest'] },
  { id: 'tech-writer', name: 'Technical Writer', category: 'content', description: 'Documentation, API references, guides, technical content', file: 'tech-writer.md', permissions: 'read-only' },
  { id: 'db-admin', name: 'Database Administrator', category: 'data', description: 'Database design, query optimization, migration, backup strategies', file: 'db-admin.md', permissions: 'infrastructure' },
  { id: 'ux-designer', name: 'UX Designer', category: 'design', description: 'User research, wireframes, prototypes, design systems', file: 'ux-designer.md', permissions: 'read-only' },
]

export function getAgentCatalog(): AgentProfile[] {
  return catalog
}

export function getAgentCategories(): string[] {
  return [...new Set(catalog.map((a) => a.category))]
}

export function getAgentsByCategory(category: string): AgentProfile[] {
  return catalog.filter((a) => a.category === category)
}

export function getMinimalAgents(): AgentProfile[] {
  return catalog.filter(
    (a) => a.category === 'orchestration' || a.id === 'frontend-engineer' || a.id === 'backend-engineer',
  )
}
