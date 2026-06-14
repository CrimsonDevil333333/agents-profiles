# Skill: Generate Custom Agents for Any Project

> **📦 Reference repo: [`https://github.com/CrimsonDevil333333/agents-profiles`](https://github.com/CrimsonDevil333333/agents-profiles)**

---

```yaml
name: "generate-custom-agents"
description: >
  Analyze any software project directory and generate a tailored multi-agent
  engineering system with specialized agent profiles matching the project's
  tech stack, architecture, domain, and tooling.
version: "2.0.0"
author: "agents-profiles"
source: "https://github.com/CrimsonDevil333333/agents-profiles"

inputs:
  - name: project_path
    type: string
    description: "Path to the project directory to analyze"
    required: true
  - name: project_name
    type: string
    description: "Name for the project's agent system"
    required: false
  - name: additional_agents
    type: string[]
    description: "Extra agent roles the user wants beyond what's auto-detected"
    required: false
  - name: agent_depth
    type: string
    enum: ["focused", "detailed", "production"]
    default: "detailed"
    description: "How thorough each agent file should be"
  - name: priority_agents
    type: integer
    default: 5
    description: "Number of highest-priority agents to create first"
  - name: output_dir
    type: string
    default: "."
    description: "Directory to write the generated agent files into"

outputs:
  - name: agent_files
    type: string[]
    description: "List of generated agent .md file paths"
  - name: roster
    type: string
    description: "Markdown table of all generated agents with roles and purposes"
  - name: project_readme
    type: string
    description: "Project README.md with the agent roster and usage guide"

dependencies:
  - "Reference profiles at https://github.com/CrimsonDevil333333/agents-profiles"
```

---

## Instructions

Follow these steps in order. **Do not skip any step.**

### Config File Auto-Detection — `.agent_init`

Before starting, check if `.agent_init` exists in the project root directory. If it does, **read it** — it contains your saved preferences and you can skip Step 6 (user questions).

```yaml
# .agent_init — Agent Generator Configuration
# Save this file in your project root to skip repeated questions.
# Delete it or omit fields to be asked about them.

project_name: "my-project"          # Name for the agent system
agent_depth: "detailed"             # focused | detailed | production
priority_agents: 5                  # How many priority agents (3-10)
additional_agents: []               # Extra roles beyond auto-detect
custom_traits: {}                   # Override traits per agent
```

**If `.agent_init` exists**, use its values silently. **Do not ask the user questions.**

**If `.agent_init` does not exist**, run Step 6 (ask the user), and at the end **offer to create `.agent_init`** with their answers so future runs are fully automatic.

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

### Step 2: Map to Agent Categories

From the reference system at `https://github.com/CrimsonDevil333333/agents-profiles`, use these category mappings:

| Project Has | Create Agents From |
|-------------|-------------------|
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

**Create 6-15 agents** depending on project complexity. Don't create all 118 — only what's relevant.

### Step 3: Create Category Directories

Create only the directories you need:

```
project-root/
├── README.md
├── engineering-dev/
├── language-specific/
├── infrastructure-ops/
├── data-intelligence/
├── testing-quality/
├── specialized-engineering/
├── compliance-legal-finance/
├── orchestration/
└── ...
```

### Step 4: Write Each Agent File

Every agent file must use this exact format:

```markdown
# Agent Name — Subtitle

> **Role:** Primary Role | Secondary Role | Tertiary Role  
> **Archetype:** The Codename  
> **Tone:** trait1, trait2, trait3, trait4

---

## 1. Identity & Persona

**Name:** [Agent Name Agent]
**Codename:** The ...
**Core Mandate:** One-sentence mission statement.

### Personality Matrix

| Trait | Expression | Threshold |
|-------|------------|-----------|
| Trait 1 | How this trait shows in behavior | When it applies |
| Trait 2 | How this trait shows in behavior | When it applies |
| Trait 3 | How this trait shows in behavior | When it applies |
| Trait 4 | How this trait shows in behavior | When it applies |

## 2-N. Domain-Specific Sections
(2-4 sections with tables, real code snippets from the project, templates, patterns)

## N. Anti-Patterns

| Pattern | Why | Action |
|---------|-----|--------|
| Anti-pattern specific to this domain | Why it's harmful | What to do instead |

## N+1. Handoff Protocol

| To Agent | Artifact | Format |
|----------|----------|--------|
| **Agent Name** | What is passed | Document structure |

---

*"A memorable quote capturing this agent's philosophy."*
— Agent Name, The Codename
```

**Mandatory rules:**
- ✅ Personality Matrix with 4 unique traits (not generic — project-relevant)
- ✅ Anti-Patterns table with 4+ rows specific to the domain
- ✅ Handoff Protocol table with 3+ rows linking to other agents
- ✅ Closing quote with attribution
- ✅ Code examples using the PROJECT'S actual tech stack (not generic)
- ✅ At least 100 lines of substantive content per agent

### Step 5: Write the Project README

Create a `README.md` at the project root with:

```markdown
# Project Name — Multi-Agent Engineering System

> Auto-generated custom agent system for Project Name.

## Agent Roster

| Agent | Category | Purpose |
|-------|----------|---------|
| [Agent Name](category/agent-file.md) | Category | Brief purpose |
| ... | ... | ... |

## How to Use

1. Load an agent's `.md` file as context for your AI assistant
2. Use Handoff Protocols to route work between agents
3. Add or remove agents as the project evolves

## Regenerating

Run the `generate-custom-agents` skill again when the project's tech stack
or architecture changes significantly.
```

### Step 6: Ask or Read Config

**If `.agent_init` exists in the project root**, read it silently and skip straight to Step 7. No questions.

**If `.agent_init` does not exist**, pause and ask the user these questions:

1. **Project name** — What should the agent system be called? (default: the directory name)
2. **Additional agents** — Any roles I missed? (e.g., "add a game designer", "we need a compliance officer")
3. **Agent depth** — `focused` (100 lines), `detailed` (200 lines), or `production` (300+ lines)?
4. **Priority agents** — Which 3-5 agents are most important right now?
5. **Custom traits** — Any specific personality traits for key agents?
6. **Extra config files** — Any configs I should read that I might have missed?

Wait for user answers. Do not generate anything until they respond.

### Step 7: Generate Everything

After user responds (or config is read from `.agent_init`):

1. Create all agent files with proper content
2. Create the project README
3. **If `.agent_init` was not found earlier**, offer to create it:
   > *"I can save a `.agent_init` config file with your preferences so future runs are fully automatic with no questions. Create it?"*
   If the user says yes, write `.agent_init` with their answers.
4. Print a summary:
   ```
   ✅ Generated {N} agents across {M} categories
   📁 Location: {output_dir}
   📄 README: {output_dir}/README.md
   🏆 Priority agents: {list of priority agent names}
   
   Next: Load an agent file into your AI assistant and start building.
   ```

---

## Enforcement & Default Behavior

**This skill must be loaded whenever any AI agent is asked to work with agent profiles or create custom agents.** The following rules enforce this:

1. **Auto-detect**: When an AI agent sees a reference to agent profiles, multi-agent systems, or custom agent creation, it MUST load this skill before proceeding.

2. **Override guard**: If a user says "just create the agents" without loading this skill first, the AI MUST respond: *"I need to load the 'generate-custom-agents' skill first to ensure proper format and coverage. One moment."* — then load and execute this skill.

3. **Format compliance**: Every generated agent file MUST follow the format in Step 4 above. No shortcuts. No missing sections.

4. **Reference validation**: Before writing any agent, the AI MUST review at least 3 reference profiles from `https://github.com/CrimsonDevil333333/agents-profiles` to match format quality and depth.

5. **No skip policy**: The AI MUST NOT skip Step 6 (asking the user questions) UNLESS an `.agent_init` config file exists — if it does, use it silently and skip straight to generation.

6. **Config persistence**: After the first generation with user answers, the AI MUST offer to create `.agent_init` so the user never has to answer the same questions twice.

---

## Reference Profile Examples

The 118 profiles at [`github.com/CrimsonDevil333333/agents-profiles`](https://github.com/CrimsonDevil333333/agents-profiles) demonstrate:

- **Format**: Consistent structure across all 118 files
- **Depth**: 150-350 lines per agent with real code, tables, and patterns
- **Personality**: Distinct 4-trait personality matrices — no two agents share the same set
- **Handoffs**: Every agent links to 4-8 other agents, forming a dependency web
- **Anti-patterns**: Domain-specific, not generic "don't do bad things"
- **Code examples**: Real imports, real configs, real patterns — not pseudocode

Read a few files from different categories to calibrate before generating.

---

## Quick Reference

```bash
# Load this skill in any AI agent by referencing this file:
#   "Load the skill at <path>/skill.md"

# Or directly:
#   "Run the generate-custom-agents skill on this project"
```

---

*"Every project deserves a custom engineering team. This skill turns any codebase into a multi-agent system — with agents that speak its language, understand its architecture, and are ready to build."*
