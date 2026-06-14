# Skill: Select & Deploy Agents for Any Project

> **📦 Reference repo: [`https://github.com/CrimsonDevil333333/agents-profiles`](https://github.com/CrimsonDevil333333/agents-profiles)**
> **📜 Init guide: [`INIT.md`](./INIT.md)** — give this to your AI at the start of every session.

---

```yaml
name: "select-deploy-agents"
description: >
  Analyze any software project directory and select the right agents
  from the 118 pre-built profiles. The primary goal is SELECTION, not
  generation. Only generate a new profile when none of the 118 fit.
version: "3.0.0"
author: "agents-profiles"
source: "https://github.com/CrimsonDevil333333/agents-profiles"

inputs:
  - name: project_path
    type: string
    description: "Path to the project directory to analyze"
    required: true
  - name: additional_agents
    type: string[]
    description: "Extra agent roles the user wants beyond what's auto-detected"
    required: false
  - name: output_dir
    type: string
    default: "."
    description: "Directory to write the roster and any new agent files into"

outputs:
  - name: roster
    type: string
    description: "Markdown table of selected agents with roles, categories, and repo paths"
  - name: new_agent_files
    type: string[]
    description: "List of NEWLY generated agent .md file paths (only if existing profiles were insufficient)"

dependencies:
  - "118 profiles at https://github.com/CrimsonDevil333333/agents-profiles"
  - "INIT.md at https://github.com/CrimsonDevil333333/agents-profiles/blob/main/INIT.md"
```

---

## Core Principle: SELECT — Don't CREATE

**The 118 agent profiles already exist.** Your job is to:

1. **Analyze the project** — tech stack, architecture, domain, tooling
2. **SELECT the right agents** from the 118 existing profiles
3. **Generate ONLY if needed** — when a role genuinely has no match (rare)

**Do NOT write new `.md` agent files for common roles** (Node.js, DevOps, Security, etc.). They already exist. Go fetch them from the repo.

**Only generate a new profile when ALL of these are true:**
- The role is NOT covered by any of the 18 categories
- The role is NOT a variation of an existing agent
- The user explicitly asked for a custom agent

---

## Instructions

Follow these steps in order. **Do not skip any step.**

### Step 1: Analyze the Project

Explore the project directory thoroughly:

```
project/
├── src/              ← language, framework, architecture patterns
├── tests/            ← testing framework, coverage
├── infra/            ← Docker, K8s, Terraform, CI/CD configs
├── docs/             ← documentation style, audience
├── package.json      ← Node dependencies
├── requirements.txt  ← Python dependencies
├── Cargo.toml        ← Rust dependencies
├── go.mod            ← Go dependencies
├── pom.xml           ← Java/Maven
├── *.csproj          ← .NET
├── .agent_init       ← saved preferences (if present)
└── ...
```

Extract:
- **Primary language(s)** — Node, Python, Rust, Go, Java, PHP, Ruby, .NET, C/C++, Zig, Swift
- **Framework(s)** — React, Vue, FastAPI, Spring, Rails, Laravel, etc.
- **Architecture** — monolith, microservices, serverless, event-driven
- **Deployment** — Docker, K8s, Terraform, serverless, CDN, edge
- **CI/CD** — GitHub Actions, GitLab CI, Jenkins, ArgoCD
- **Data layer** — PostgreSQL, MySQL, MongoDB, Kafka, Redis, S3
- **Testing** — pytest, jest, unittest, Playwright, Cypress
- **Domain** — SaaS, e-commerce, data pipeline, ML, embedded, game, mobile
- **Security** — auth, encryption, compliance requirements

### Step 2: Map to Existing Agents

From the 118 existing profiles, match the project's characteristics to the right agents:

| Project Has | Select Agents From This Category |
|-------------|---------------------------------|
| Web frontend | `engineering-dev/` (frontend-engineer) |
| Mobile app | `engineering-dev/` (mobile-engineer, ios-engineer, android-engineer) |
| Backend API | `language-specific/` + `engineering-dev/` (backend-engineer) |
| Database | `data-intelligence/` (database-administrator, dbre-engineer) |
| Cloud infra | `cloud-infra-architecture/` + `infrastructure-ops/` |
| CI/CD | `infrastructure-ops/` (cicd-engineer, devops) |
| Containers/K8s | `infrastructure-ops/` (kubernetes-engineer, helm-engineer, argocd-engineer) |
| Data pipelines | `data-intelligence/` (data-engineer, kafka-engineer) |
| ML/AI | `data-intelligence/` (data-scientist, ml-engineer, ai-engineer) |
| Security needs | `specialized-engineering/` (security-engineer, appsec-engineer) |
| Compliance needs | `compliance-legal-finance/` (compliance-officer, privacy-engineer) |
| API-first | `specialized-engineering/` (api-engineer) |
| Testing | `testing-quality/` (tester, qa-engineer, e2e-automation-engineer) |
| Design/UX | `design-architecture/` (designer, architect) |

**Select 6-15 agents** depending on project complexity. Do not select all 118 — only what's relevant.

### Step 3: Ask the User

Present your analysis and recommended roster:

```
📊 Project Analysis:
  Language: {lang}
  Framework: {framework}
  Architecture: {architecture}
  Cloud/Deploy: {deployment}
  Domain: {domain}

🤖 Recommended Agents:
  | # | Agent | Category | Path in Repo |
  |---|-------|----------|-------------|
  | 1 | {Name} | {Category} | `category/{name}.md` |
  | ... | ... | ... | ... |

Options:
  - ✅ Accept this roster (default)
  - ➕ Request additional agents
  - ❌ Remove specific agents
  - ✏️ Request a custom agent (only if role doesn't exist)
```

Wait for user confirmation before proceeding.

### Step 4: Create the Roster & Init File

Write the project's agent roster:

```markdown
# {Project Name} — Multi-Agent System

> Agents selected from the 118 pre-built profiles at
> [agents-profiles](https://github.com/CrimsonDevil333333/agents-profiles)

## Agent Roster

| Agent | Category | Repo Path | Purpose |
|-------|----------|-----------|---------|
| {Name} | {Category} | `{category}/{name}.md` | {purpose} |
| ... | ... | ... | ... |

## How to Use

1. Give your AI the `INIT.md` file at the start of every session
2. The AI will auto-load the right agents based on your task
3. Agents are fetched directly from the repo — no local copies needed
4. Use Handoff Protocols to route work between agents

## Regenerating

Re-run this skill when the project's tech stack or architecture changes.
```

If the user wants **custom agents** (genuinely new roles), create them using the existing profiles as format blueprints (fetch 3+ existing `.md` files first for reference).

### Step 5: Load & Delegate

Once the roster is confirmed, the real work begins at session start:

1. User starts a new chat with your AI
2. AI reads **INIT.md** — becomes the Orchestrator
3. AI loads the relevant agent(s) from the repo using raw URLs
4. AI delegates tasks to the right agent instead of doing everything itself

**This is the critical step that most systems get wrong.** The AI must:
- Load the agent's `.md` file as context
- Adopt the agent's identity, tone, and standards
- Speak AS that agent, not as the generic assistant
- Hand off to other agents when the task scope changes

---

## Enforcement Rules

1. **SELECTION is primary**: The default action is to select from the 118 existing profiles. Generation is a fallback, never the default.

2. **No auto-generation**: If the user says "create agents", do NOT start writing `.md` files. Analyze the project, then SELECT from existing profiles. Only generate if the role genuinely doesn't exist.

3. **Must fetch real files**: Before using any agent (even existing ones), fetch and read their actual `.md` file from the repo. Do not rely on training data.

4. **Auto-init on new sessions**: When starting a new chat, the AI MUST load INIT.md first and become the Orchestrator. It MUST NOT default to a single-agent mode.

5. **Delegation is mandatory**: The Orchestrator MUST route specialized tasks to the appropriate agent. It MUST NOT do specialized work itself. It announces the routing, loads the agent, and speaks as that agent.

6. **One agent at a time**: Load the specific agent for the current task. If the task crosses domains, route sequentially, not simultaneously.

7. **Config persistence**: After first run, offer to save `.agent_init` so preferences persist across sessions.

---

## Quick Reference

```bash
# New session: give INIT.md to your AI
# The AI automatically loads the right agents from the repo

# Or directly:
# "Select agents for this project using the agents-profiles skill"
```

---

*"The 118 agents are already built. Your job is not to create — it's to select, load, and delegate. Be the conductor, not the musician."*
