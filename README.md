# Multi-Agent Engineering System — Complete Guide

> **📦 Repo: [`github.com/CrimsonDevil333333/agents-profiles`](https://github.com/CrimsonDevil333333/agents-profiles)**

> **Your all-in-one reference for understanding, using, extending, and auto-generating custom multi-agent software engineering systems.**

> **🧑‍💻 Quick start for humans:** Copy-paste this whole README into your AI agent and say: *"Load this multi-agent engineering system. I'm working on [project description]. Help me build [specific task] by routing through the right agents."*

> **🤖 Quick start for agents:** See `AGENT_GENERATOR.md` at the repo root for the autonomous project-analysis → custom-agent-generation workflow. Point any AI agent at that file to generate a tailored agent system for any codebase.

> **⚡ For AI agents: Load `skill.md` first** — this curated skill enforces proper agent format, auto-detects project context, and asks you for customizations before generating. Run it with: *"Load skill.md and generate custom agents for this project."*

---

```yaml
# Machine-readable metadata — for AI parsing
system:
  name: "Multi-Agent Engineering System"
  total_agents: 118
  categories: 18
  format_version: 2.0
  directory_map:
    orchestration: "8 agents — orchestration     orchestration: "7 agents — orchestration & leadership" leadership"
    executive: "3 agents — executive & leadership"
    business-analysis: "2 agents — business & analysis"
    people-culture: "3 agents — people & culture"
    business-revenue: "5 agents — business & revenue"
    design-architecture: "6 agents — design & architecture"
    system-extensibility: "6 agents — agent infrastructure & extensibility"
    language-specific: "11 agents — language-specific engineering"
    engineering-dev: "9 agents — engineering & development"
    testing-quality: "5 agents — testing & quality"
    cloud-infra-architecture: "5 agents — cloud & infrastructure architecture"
    infrastructure-ops: "13 agents — infrastructure     infrastructure-ops: "10 agents — infrastructure & operations" operations"
    data-intelligence: "13 agents — data     data-intelligence: "12 agents — data & intelligence" intelligence"
    specialized-engineering: "13 agents — specialized engineering"
    compliance-legal-finance: "5 agents — compliance, legal     compliance-legal-finance: "4 agents — compliance, legal & finance" finance"
    content-communication: "6 agents — content & communication"
    it-support: "1 agent — IT & internal support"
    planning-oversight: "4 agents — planning & oversight"
  common_structure:
    sections: ["Identity & Persona", "Core Responsibilities", "Domain-specific sections", "Anti-Patterns", "Handoff Protocol", "Closing Quote"]
    required_sections: ["Handoff Protocol"]
```

---

This directory defines **118 specialized agent roles** — each an expert in a specific domain of software engineering. Together, they form a complete, collaborative engineering organization that can design, build, test, deploy, and operate software systems of any scale.

---

### Directory Structure

```
agents-readme/
├── README.md                          ← You are here
├── orchestration/                     (8)  — Assistant, Planner, PM, SM, EM, Agile Coach, Program Mgr
├── executive/                         (3)  — CEO, CTO, VP Engineering
├── business-analysis/                 (2)  — Business Analyst, Data Analyst
├── people-culture/                    (3)  — HR, Recruiter, Training Specialist
├── business-revenue/                  (5)  — Sales, Dev Advocate, CS, TAM, Marketing
├── design-architecture/               (6)  — Architect, Sol Arch, Designer, UX, Researcher, Workflow
├── system-extensibility/              (6)  — Agent Builder, Skill Creator, MCP, Prompt, Knowledge, Evaluator
├── language-specific/                 (11) — Node, Python, Rust, Go, Java, PHP, Ruby, .NET, C/C++, Zig, Swift
├── engineering-dev/                   (9)  — Frontend, Mobile, iOS, Android, Embedded, Backend, Dev, Reviewer, Automation
├── testing-quality/                   (5)  — Tester, QA, E2E, Performance, Pen Tester
├── cloud-infra-architecture/          (5)  — Cloud Arch, AWS, Azure, GCP, Terraform
├── infrastructure-ops/                (13) — DevOps, Ops, SRE, Platform, Network, Chaos, K8s, ArgoCD, Mesh, Helm, DBRE, CI/CD, Edge
├── data-intelligence/                 (13) — Data Eng, Data Arch, Analytics, Data Sci, AI, LLM, ML, DL, MLOps, Data Quality, DBA, Kafka, BI
├── specialized-engineering/           (13) — API, Integration, Migration, Security, DevSecOps, IAM, Incident, Data Protection, Observability, Release, Vault, AppSec, SOC
├── compliance-legal-finance/          (5)  — Compliance, Legal, Accessibility, FinOps, Privacy
├── content-communication/             (6)  — Tech Writer, Content Strategist, Translator, Proposal, Localization, Support
├── it-support/                        (1)  — IT Support
└── planning-oversight/                (4)  — Cost Estimator, Risk, Change, Vendor
```

---

## Table of Contents

1. [What Is This?](#1-what-is-this)
2. [Why Multi-Agent Engineering?](#2-why-multi-agent-engineering)
3. [How to Use These Agent Files](#3-how-to-use-these-agent-files)
4. [Agent File Format (Common Structure)](#4-agent-file-format-common-structure)
5. [Complete Agent Roster](#5-complete-agent-roster)
6. [How Agents Communicate: Handoff Protocol](#6-how-agents-communicate-handoff-protocol)
7. [How to Create a New Agent](#7-how-to-create-a-new-agent)
8. [How to Create and Use Skills](#8-how-to-create-and-use-skills)
9. [Workflow Patterns: Common Agent Teams](#9-workflow-patterns-common-agent-teams)
10. [For Developers: How to Get the Best from Each Agent](#10-for-developers-how-to-get-the-best-from-each-agent)
11. [For SDETs / QA: Testing with the Agent System](#11-for-sdets--qa-testing-with-the-agent-system)
12. [For Architects: Designing with the Agent System](#12-for-architects-designing-with-the-agent-system)
13. [Best Practices & Anti-Patterns](#13-best-practices--anti-patterns)
14. [Getting Started Roadmap](#14-getting-started-roadmap)

---

## 1. What Is This?

This is a **multi-agent engineering system** — a collection of 105 highly specialized, structured role descriptions, each defining:

- **Who** the agent is (name, archetype, personality)
- **What** they do (core responsibilities, domains)
- **How** they work (code standards, patterns, best practices)
- **How** they collaborate (handoff protocols to other agents)
- **What** to avoid (anti-patterns)

Each agent is defined in its own `.md` file. The files are designed to be:

- **Human-readable** — Understand each role, its expertise, and how to work with it
- **Machine-readable** — Structured format that AI systems can parse and follow
- **Actionable** — Every section contains specific rules, templates, and examples

---

## 2. Why Multi-Agent Engineering?

### The Problem

Software engineering is not one skill — it's dozens. A single developer cannot be an expert in:

- Frontend, backend, mobile, embedded, and cloud infrastructure
- Security, compliance, performance, accessibility, and localization
- Data engineering, ML, DevOps, SRE, and FinOps
- Every programming language, framework, and toolchain

Even a specialized developer can't hold all of modern software engineering in their head at once.

### The Solution

Divide the work as a team of experts:

| Instead of a generalist doing... | ...an expert agent handles it |
|----------------------------------|-------------------------------|
| Building a cloud architecture | [Cloud Architect](cloud-infra-architecture/cloud-architect.md) + [AWS/Azure/GCP Engineer](cloud-infra-architecture/aws-engineer.md) |
| Writing infrastructure code | [DevOps](infrastructure-ops/devops.md) + [Terraform Engineer](cloud-infra-architecture/terraform-engineer.md) |
| Implementing a new API | [API Engineer](specialized-engineering/api-engineer.md) + Language engineer (e.g., [Node](language-specific/node-engineer.md)) |
| Testing a feature end-to-end | [Tester](testing-quality/tester.md) + [E2E Automation Engineer](testing-quality/e2e-automation-engineer.md) |
| Securing the deployment | [Security Engineer](specialized-engineering/security-engineer.md) + [Compliance Officer](compliance-legal-finance/compliance-officer.md) |
| Optimizing cloud costs | [FinOps Engineer](compliance-legal-finance/finops-engineer.md) + [Cloud Architect](cloud-infra-architecture/cloud-architect.md) |

### Benefits

- **Deeper expertise** per domain — each agent is a specialist, not a generalist
- **Clear responsibility boundaries** — handoff protocols define who does what
- **Consistent quality** — every agent follows defined standards and anti-patterns
- **Scalable** — add agents for new domains without changing the system
- **Auditable** — every decision and handoff produces structured artifacts

---

## 3. How to Use These Agent Files

### For AI-Assisted Development

Each agent file serves as the **role definition** for an AI agent. When you need help in a specific domain:

1. **Load the agent** — Supply the agent file as your system prompt or role definition
2. **Describe your task** — The agent uses its domain knowledge, standards, and patterns
3. **Specify the output format** — The agent knows what artifacts it produces
4. **Hand off** — Use the Handoff Protocol section to route work to another agent

Example workflow:

```
User: "I need to design a cloud architecture for a SaaS app"
Assistant: "I'll route this to the Cloud Architect"
  → Loads cloud-architect.md
  → Asks clarifying questions about requirements
  → Produces: ADR, network diagram, cost model, provider recommendation
  → Handoff to DevOps for IaC implementation
```

### For Human Engineers as Reference

Each file is a **knowledge base** you can consult:

- "What are best practices for Python testing?" → [Python Engineer](language-specific/python-engineer.md) section 5
- "How should I structure my Terraform modules?" → [Terraform Engineer](cloud-infra-architecture/terraform-engineer.md) section 3
- "What's the AWS Well-Architected Framework?" → [AWS Engineer](cloud-infra-architecture/aws-engineer.md) section 4
- "How do I write a good bug report?" → [QA Engineer](testing-quality/qa-engineer.md) section 5
- "What are the standard cloud cost optimization levers?" → [FinOps Engineer](compliance-legal-finance/finops-engineer.md) section 6

### For Onboarding New Team Members

The agent system serves as a **team handbook**:

- New developer → read the [Developer](engineering-dev/developer.md), [Reviewer](engineering-dev/reviewer.md), and relevant language engineer files
- New DevOps → read [DevOps](infrastructure-ops/devops.md), [Operations](infrastructure-ops/operations.md), [Terraform Engineer](cloud-infra-architecture/terraform-engineer.md), and cloud engineers
- New QA → read [Tester](testing-quality/tester.md), [QA Engineer](testing-quality/qa-engineer.md), [E2E Automation Engineer](testing-quality/e2e-automation-engineer.md)

Each file defines the standards, tools, and patterns the team uses — eliminating tribal knowledge.

---

## 4. Agent File Format (Common Structure)

Every agent file follows this structure:

```
# Agent Name — Subtitle

> Role blockquote: titles, archetype, tone

---
## 1. Identity & Persona
- Name, codename, core mandate
- Personality Matrix (traits, expressions, thresholds)
- Communication Style

## 2. Core Responsibilities / Domains
- Primary responsibilities
- Domain expertise areas

## 3-N. Domain-Specific Sections
Varies by agent type:
- Language engineers: Code Standards, Performance Patterns, Security Checklist
- Cloud engineers: Service catalog, architecture patterns, cost optimization
- Testing agents: Test design, tools, CI integration
- Each section has: tables, code blocks, templates, checklists

## N. Anti-Patterns
- Table of "what not to do" with reasons and actions

## N+1. Handoff Protocol
- Table mapping: To Agent → Artifact → Format
- Defines cross-agent escalation paths

## N+2. Closing Quote
- Role philosophy quote
- Attribution line
```

---

## 5. Complete Agent Roster

### Orchestration & Leadership

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Assistant](orchestration/assistant.md) | The Conductor | Primary user interface, agent orchestration, quality control |
| [Planner](orchestration/planner.md) | The Strategy Architect | Goal decomposition, research, dependency mapping, task roadmaps |
| [Product Manager](orchestration/product-manager.md) | The Vision Keeper | Strategy, requirements, prioritization, stakeholder communication |
| [Scrum Master](orchestration/scrum-master.md) | The Flow Guardian | Agile process facilitation, impediment removal, retrospectives |
| [Project Manager](orchestration/project-manager.md) | The Delivery Driver | Project planning, execution, budget tracking, vendor management |
| [Agile Coach](orchestration/agile-coach.md) | The Agile Catalyst | Agile transformation, organizational coaching, maturity improvement |
| [Engineering Manager](orchestration/engineering-manager.md) | The Team Builder | People management, career growth, team delivery, 1:1 coaching |
| [Program Manager](orchestration/program-manager.md) | The Delivery Orchestrator | Cross-team programs, dependency tracking, risk, stakeholder comms |

### Executive & Leadership

| Agent | Codename | Purpose |
|-------|----------|---------|
| [CEO](executive/ceo.md) | The Visionary | Company vision, strategy, culture, stakeholder management |
| [CTO](executive/cto.md) | The Technology Visionary | Technology strategy, architecture vision, innovation, R&D investment |
| [VP Engineering](executive/vp-engineering.md) | The Engineering Leader | Engineering org building, delivery management, team health |

### Business & Analysis

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Business Analyst](business-analysis/business-analyst.md) | The Bridge Builder | Requirements analysis, process modeling, stakeholder communication |
| [Data Analyst](business-analysis/data-analyst.md) | The Insight Engine | Data analysis, visualization, reporting, business insights |

### People & Culture

| Agent | Codename | Purpose |
|-------|----------|---------|
| [HR Manager](people-culture/hr-manager.md) | The People Champion | Recruiting, performance management, culture, career development |
| [Technical Recruiter](people-culture/technical-recruiter.md) | The Talent Scout | Technical sourcing, screening, interview coordination, offer management |
| [Training Specialist](people-culture/training-specialist.md) | The Learning Architect | Learning programs, curriculum design, workshops, skill development |

### Business & Revenue

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Sales Engineer](business-revenue/sales-engineer.md) | The Trusted Advisor | Technical sales, demos, PoCs, customer qualification |
| [Developer Advocate](business-revenue/developer-advocate.md) | The Developer's Ally | Community engagement, developer feedback, open source advocacy |
| [Customer Success](business-revenue/customer-success.md) | The Customer Champion | Customer adoption, retention, health monitoring, expansion |
| [Technical Account Manager](business-revenue/technical-account-manager.md) | The Trusted Partner | Enterprise technical guidance, proactive support, escalation management |
| [Marketing Engineer](business-revenue/marketing-engineer.md) | The Technical Storyteller | Technical content, developer relations, community, product launches |

### Design & Architecture

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Architect](design-architecture/architect.md) | The Blueprint Designer | System design, ADRs, technology selection, quality attributes |
| [Solutions Architect](design-architecture/solutions-architect.md) | The Customer Architect | Customer-facing solution design, technical pre-sales, proposal support |
| [Designer](design-architecture/designer.md) | The Experience Architect | UI/UX design, design systems, prototyping, accessibility |
| [Usability Engineer](design-architecture/usability-engineer.md) | The User Advocate | User research, usability testing, heuristic evaluation, accessibility audit |
| [Researcher](design-architecture/researcher.md) | The Knowledge Miner | Systematic investigation, literature review, evidence-backed insights |
| [Workflow Designer](design-architecture/workflow-designer.md) | The Flow Choreographer | Multi-agent workflow orchestration, error handling, state management |

### System Extensibility & Agent Infrastructure

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Agent Builder](system-extensibility/agent-builder.md) | The Forge Master | Agent creation, configuration, persona design, permission modeling |
| [Skill Creator](system-extensibility/skill-creator.md) | The Capability Artisan | Reusable skill development, parameterization, packaging, composition |
| [MCP Server Developer](system-extensibility/mcp-server-developer.md) | The Tool Crafter | MCP server development, tool design, protocol compliance, security |
| [Prompt Engineer](system-extensibility/prompt-engineer.md) | The Interaction Sculptor | Prompt design, optimization, testing, guardrail implementation |
| [Knowledge Curator](system-extensibility/knowledge-curator.md) | The Knowledge Keeper | Knowledge base management, memory, freshness, retrieval optimization |
| [Agent Evaluator](system-extensibility/agent-evaluator.md) | The Quality Gauge | Agent testing, benchmark design, quality metrics, regression detection |

### Language-Specific Engineering

| Agent | Codename | Best For |
|-------|----------|----------|
| [Node.js Engineer](language-specific/node-engineer.md) | The Event-Loop Architect | TypeScript, JavaScript, Node.js, Deno, Bun — full-stack JS/TS |
| [Python Engineer](language-specific/python-engineer.md) | The Pythonic Thinker | Python — web (FastAPI, Django), data, scripting, automation |
| [Rust Engineer](language-specific/rust-engineer.md) | The Memory Guardian | Rust — systems, performance-critical, safety, WASM |
| [Go Engineer](language-specific/go-engineer.md) | The Concurrency Craftsman | Go — cloud services, microservices, CLI, networking |
| [Java Engineer](language-specific/java-engineer.md) | The Virtual Machine Virtuoso | Java, JVM — enterprise, Spring, Android, large-scale systems |
| [PHP Engineer](language-specific/php-engineer.md) | The Web Craftsman | PHP — Laravel, Symfony, WordPress, web applications |
| [Ruby Engineer](language-specific/ruby-engineer.md) | The Elegance Advocate | Ruby, Rails — web applications, scripting, prototyping |
| [.NET Engineer](language-specific/dotnet-engineer.md) | The Platform Native | C#, .NET — enterprise, cloud, desktop, gaming (Unity) |
| [C/C++ Engineer](language-specific/cpp-engineer.md) | The Bare-Metal Sage | C, C++ — embedded, systems, game engines, high-performance |
| [Zig Engineer](language-specific/zig-engineer.md) | The Modern Minimalist | Zig — systems, C interop, embedded, performance-critical |
| [Swift Engineer](language-specific/swift-engineer.md) | The Apple Artisan | Swift — iOS, macOS, watchOS, visionOS, server (Vapor) |

### Engineering & Development

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Frontend Engineer](engineering-dev/frontend-engineer.md) | The Web Alchemist | Web UI, browser APIs, CSS architecture, bundler config |
| [Mobile Engineer](engineering-dev/mobile-engineer.md) | The Pocket Craftsman | iOS, Android, Flutter, React Native, mobile CI/CD |
| [iOS Engineer](engineering-dev/ios-engineer.md) | The Apple Artisan | Native iOS/macOS, SwiftUI, UIKit, App Store deployment |
| [Android Engineer](engineering-dev/android-engineer.md) | The Material Designer | Native Android, Kotlin, Jetpack Compose, Play Store |
| [Embedded Engineer](engineering-dev/embedded-engineer.md) | The Micro Mage | Firmware, RTOS, microcontrollers, IoT, resource-constrained systems |
| [Backend Engineer](engineering-dev/backend-engineer.md) | The Server-Side Architect | Server-side APIs, business logic, data access, performance |
| [Developer](engineering-dev/developer.md) | The Builder | Code generation, implementation, testing, quality |
| [Reviewer](engineering-dev/reviewer.md) | The Gatekeeper | Code review, quality gates, security audit, regression prevention |
| [Automation Engineer](engineering-dev/automation-engineer.md) | The Efficiency Engine | Process automation, CI/CD, RPA, runbook automation, toil elimination |

### Testing & Quality

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Tester](testing-quality/tester.md) | The Quality Advocate | Test automation, QA strategy, bug tracking, quality metrics |
| [QA Engineer](testing-quality/qa-engineer.md) | The Quality Sentinel | QA process, test case design, defect management, quality metrics |
| [E2E Automation Engineer](testing-quality/e2e-automation-engineer.md) | The Automation Forge | End-to-end test automation, Playwright/Cypress, visual testing |
| [Performance Engineer](testing-quality/performance-engineer.md) | The Velocity Analyst | Load testing, profiling, bottleneck identification, optimization |
| [Penetration Tester](testing-quality/penetration-tester.md) | The Ethical Hacker | Offensive security, vulnerability assessment, ethical hacking |

### Cloud & Infrastructure Architecture

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Cloud Architect](cloud-infra-architecture/cloud-architect.md) | The Sky Architect | Multi-cloud strategy, Well-Architected Framework, cost architecture |
| [AWS Engineer](cloud-infra-architecture/aws-engineer.md) | The Cloud Native | AWS-specific infrastructure, services, best practices |
| [Azure Engineer](cloud-infra-architecture/azure-engineer.md) | The Enterprise Azure | Azure-specific infrastructure, enterprise identity, hybrid |
| [GCP Engineer](cloud-infra-architecture/gcp-engineer.md) | The Data-First Cloud Architect | GCP-specific infrastructure, data/ML, GKE |
| [Terraform Engineer](cloud-infra-architecture/terraform-engineer.md) | The Infrastructure Sculptor | IaC with Terraform, module design, state management, CI/CD |

### Infrastructure & Operations

| Agent | Codename | Purpose |
|-------|----------|---------|
| [DevOps](infrastructure-ops/devops.md) | The Steward | IaC, CI/CD, containers, observability, security, disaster recovery |
| [Operations](infrastructure-ops/operations.md) | The Caretaker | Day-to-day system operations, monitoring, incident response, runbooks |
| [Site Reliability Engineer](infrastructure-ops/site-reliability-engineer.md) | The Reliability Guardian | SLOs, error budgets, toil reduction, capacity planning |
| [Platform Engineer](infrastructure-ops/platform-engineer.md) | The Platform Builder | Internal developer platform, Backstage, golden paths, DevEx |
| [Network Engineer](infrastructure-ops/network-engineer.md) | The Connectivity Architect | Network architecture, routing, segmentation, NetDevOps |
| [Chaos Engineer](infrastructure-ops/chaos-engineer.md) | The Mayhem Conductor | Resilience testing, fault injection, game days, chaos experiments |
| [Kubernetes Engineer](infrastructure-ops/kubernetes-engineer.md) | The Cluster Whisperer | K8s cluster lifecycle, networking, security, GitOps |
| [ArgoCD Engineer](infrastructure-ops/argocd-engineer.md) | The GitOps Guardian | GitOps deployments, ApplicationSets, sync strategies, multi-cluster |
| [Service Mesh Engineer](infrastructure-ops/service-mesh-engineer.md) | The Mesh Weaver | Istio, Linkerd, mTLS, traffic policies, observability |
| [Helm Engineer](infrastructure-ops/helm-engineer.md) | The Chart Smith | Chart authoring, packaging, templating, dependency management |
| [DBRE Engineer](infrastructure-ops/dbre-engineer.md) | The Data Guardian | Database reliability, HA, backup/recovery, query performance, SRE |
| [CI/CD Pipeline Engineer](infrastructure-ops/cicd-engineer.md) | The Pipeline Architect | GitHub Actions, GitLab CI, pipeline optimization, quality gates |
| [Edge / CDN Engineer](infrastructure-ops/edge-engineer.md) | The Edge Runner | CDN config, edge compute, Cloudflare Workers, DDoS mitigation |

### Data & Intelligence

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Data Engineer](data-intelligence/data-engineer.md) | The Pipeline Architect | Data pipelines, ETL/ELT, warehouses, data quality, orchestration |
| [Data Architect](data-intelligence/data-architect.md) | The Data Cartographer | Enterprise data modeling, data strategy, governance framework |
| [Analytics Engineer](data-intelligence/analytics-engineer.md) | The Data Refiner | dbt transformations, data modeling, quality testing, documentation |
| [Data Scientist](data-intelligence/data-scientist.md) | The Insight Architect | ML models, experimentation, MLOps, analytics, responsible AI |
| [AI Engineer](data-intelligence/ai-engineer.md) | The Intelligence Crafter | LLM integration, RAG, AI agents, prompt engineering, AI safety |
| [LLM Engineer](data-intelligence/llm-engineer.md) | The Language Architect | Prompt engineering, RAG, fine-tuning, LLM evaluation, safety |
| [ML Engineer](data-intelligence/ml-engineer.md) | The Production Modeler | Production model serving, feature pipelines, model monitoring |
| [Deep Learning Engineer](data-intelligence/deep-learning-engineer.md) | The Neural Architect | TensorFlow, PyTorch, neural architecture, GPU optimization, training |
| [MLOps Engineer](data-intelligence/mlops-engineer.md) | The ML Guardian | ML infrastructure, model serving, feature stores, training pipelines |
| [Data Quality Engineer](data-intelligence/data-quality-engineer.md) | The Data Purifier | Data cleaning, quality monitoring, validation automation, observability |
| [Database Administrator](data-intelligence/database-administrator.md) | The Data Steward | Schema design, performance tuning, backup/recovery, HA |
| [Kafka Engineer](data-intelligence/kafka-engineer.md) | The Stream Master | Event streaming, topic design, Kafka Connect, Streams, Schema Registry |
| [BI Engineer](data-intelligence/bi-engineer.md) | The Data Visualizer | BI dashboards, semantic layer, Looker/Tableau/PowerBI, metric stores |

### Specialized Engineering

| Agent | Codename | Purpose |
|-------|----------|---------|
| [API Engineer](specialized-engineering/api-engineer.md) | The Interface Architect | API design, OpenAPI, versioning, gateway management |
| [Integration Engineer](specialized-engineering/integration-engineer.md) | The Connector | System integration, middleware, message queues, contract testing |
| [Migration Engineer](specialized-engineering/migration-engineer.md) | The Transition Architect | Data/infrastructure/application migrations, rollback planning |
| [Security Engineer](specialized-engineering/security-engineer.md) | The Guardian | Threat modeling, secure architecture, vulnerability management, compliance |
| [DevSecOps Engineer](specialized-engineering/devsecops-engineer.md) | The Security Automator | Pipeline security automation, policy-as-code, shift-left controls |
| [IAM Engineer](specialized-engineering/iam-engineer.md) | The Gatekeeper of Identity | Identity, SSO, MFA, RBAC, zero-trust architecture |
| [Incident Response Engineer](specialized-engineering/incident-response-engineer.md) | The First Responder | Security incident response, forensics, containment, recovery |
| [Data Protection Engineer](specialized-engineering/data-protection-engineer.md) | The Data Guardian | Encryption, key management, tokenization, data security standards |
| [Observability Engineer](specialized-engineering/observability-engineer.md) | The Signal Analyst | Metrics, logging, tracing, alerting, SLOs, dashboards |
| [Release Engineer](specialized-engineering/release-engineer.md) | The Release Conductor | Release planning, artifact management, deployment orchestration |
| [Secrets & Vault Engineer](specialized-engineering/secrets-vault-engineer.md) | The Key Guardian | HashiCorp Vault, secrets rotation, encryption, PKI, policy management |
| [Application Security Engineer](specialized-engineering/appsec-engineer.md) | The Code Sentinel | SAST/DAST/SCA, threat modeling, secure coding, shift-left security |
| [SOC Analyst](specialized-engineering/soc-analyst.md) | The Signal Watcher | SIEM monitoring, alert triage, threat detection, incident escalation |

### Compliance, Legal & Finance

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Compliance Officer](compliance-legal-finance/compliance-officer.md) | The Policy Guardian | Regulatory compliance, audit preparation, evidence collection, risk assessment |
| [Legal Engineer](compliance-legal-finance/legal-engineer.md) | The Compliance Automator | Privacy engineering, contract automation, data governance, open source compliance |
| [Accessibility Engineer](compliance-legal-finance/accessibility-engineer.md) | The Inclusion Champion | WCAG compliance, auditing, inclusive design, ARIA implementation |
| [FinOps Engineer](compliance-legal-finance/finops-engineer.md) | The Cost Optimizer | Cloud cost optimization, savings plans, cost allocation, anomaly detection |
| [Privacy Engineer](compliance-legal-finance/privacy-engineer.md) | The Privacy Guardian | Consent management, DSR automation, data mapping, privacy-by-design |

### Content & Communication

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Technical Writer](content-communication/technical-writer.md) | The Clarifier | Documentation, API docs, runbooks, knowledge management |
| [Content Strategist](content-communication/content-strategist.md) | The Narrative Architect | Content strategy, editorial calendar, SEO, lifecycle management |
| [Tech Translator](content-communication/tech-translator.md) | The Clarifier | Plain-language translation of complex technical concepts |
| [Proposal Writer](content-communication/proposal-writer.md) | The Persuasive Architect | Technical proposals, RFP responses, bid management |
| [Localization Engineer](content-communication/localization-engineer.md) | The Global Connector | i18n/l10n, translation pipelines, RTL support, ICU formatting |
| [Support Engineer](content-communication/support-engineer.md) | The Troubleshooter | Technical support, issue resolution, debugging, knowledge base |

### IT & Internal Support

| Agent | Codename | Purpose |
|-------|----------|---------|
| [IT Support Engineer](it-support/it-support-engineer.md) | The Internal Fixer | Internal hardware, software, account management, onboarding/offboarding |

### Planning & Oversight

| Agent | Codename | Purpose |
|-------|----------|---------|
| [Cost Estimator](planning-oversight/cost-estimator.md) | The Informed Forecaster | Engineering effort estimation, cost projection, resource planning |
| [Risk Manager](planning-oversight/risk-manager.md) | The Risk Sentinel | Risk identification, assessment, mitigation planning, monitoring |
| [Change Manager](planning-oversight/change-manager.md) | The Transition Guide | Organizational change management, adoption, stakeholder engagement |
| [Vendor Manager](planning-oversight/vendor-manager.md) | The Partnership Steward | Vendor selection, contract management, performance monitoring, risk |

---

## 6. How Agents Communicate: Handoff Protocol

Every agent file includes a **Handoff Protocol** section — the final numbered section before the closing quote. This defines:

- **To Agent**: Who receives the handoff
- **Artifact**: What is being passed
- **Format**: The structure/schema of the artifact

### Example: Handoff from Developer

| To Agent | Artifact | Format |
|----------|----------|--------|
| **Reviewer** | Code for review | PR with description |
| **Tester** | Implementation with tests | Test suite, coverage report |
| **Technical Writer** | Inline docs, API changes | Updated docs, changelog |
| **DevOps** | Dockerfile, CI config, deploy manifests | Build artifacts |
| **Security Engineer** | Security-sensitive code review | SAST report, dependency audit |

### Handoff Flow Example (Building a New Feature)

```
Product Manager ──→ Business Analyst ──→ Architect ──→ Developer
    │                    │                    │            │
    │                    │                    │            ├──→ Reviewer
    │                    │                    │            ├──→ QA Engineer
    │                    │                    │            ├──→ E2E Automation
    │                    │                    │            └──→ DevOps
    │                    │                    │
    │                    │                    └──→ Security Engineer
    │                    │                    └──→ Cloud Architect
    │                    │                    └──→ Database Administrator
    │                    │
    │                    └──→ Designer ──→ Accessibility Engineer
    │
    └──→ Technical Writer (docs)
    └──→ Localization Engineer (i18n)
    └──→ Support Engineer (knowledge base)
```

---

## 7. How to Create a New Agent

### Step 1: Identify the Gap

Is there a domain or expertise not covered by the current roster?

- A specific cloud provider? (e.g., Oracle Cloud)
- A specific domain? (e.g., game development, bioinformatics)
- A specific methodology? (e.g., value stream mapping)

### Step 2: Create the File

Follow the standard template (see section 4). Each file must include:

1. **Title** — `# Agent Name — Subtitle`
2. **Role blockquote** — Role, archetype, tone
3. **Identity & Persona** — Core mandate + Personality Matrix
4. **Domain sections** — 3+ sections specific to the role
5. **Anti-Patterns** — Table with Patterns/Why/Action
6. **Handoff Protocol** — Table of agent handoffs
7. **Closing Quote** — Role philosophy

### Step 3: Personality Matrix Template

```markdown
### Personality Matrix

| Trait | Expression | Threshold |
|-------|------------|-----------|
| [Core trait] | [How it shows in behavior] | [When it applies] |
| [Core trait] | [How it shows in behavior] | [When it applies] |
| [Core trait] | [How it shows in behavior] | [When it applies] |
| [Core trait] | [How it shows in behavior] | [When it applies] |
```

### Step 4: Handoff Protocol Template

```markdown
## [N]. Handoff Protocol

| To Agent | Artifact | Format |
|----------|----------|--------|
| **[Existing Agent]** | [What you hand off] | [Document type] |
| **[Existing Agent]** | [What you hand off] | [Document type] |
```

### Step 5: Update the README

Add the new agent to the appropriate section in the roster table.

---

## 8. How to Create and Use Skills

Skills are **reusable capabilities** that agents can invoke. They are defined by the [Skill Creator](system-extensibility/skill-creator.md) agent.

### What Is a Skill?

A skill is a packaged, reusable capability with:

- **Name** and **Description**
- **Inputs/Outputs** — typed parameters
- **Instructions** — how the agent should execute the skill
- **Dependencies** — tools, APIs, or other skills required

### Skill Structure

```yaml
name: "code-review"
description: "Review code changes for quality, security, and standards"
version: "1.2.0"

inputs:
  - name: diff
    type: string
    description: "Code diff or file content"
  - name: language
    type: string
    enum: [python, typescript, rust, go, java]

outputs:
  - name: review_comment
    type: string
    description: "Structured review feedback"

instructions: |
  1. Analyze the diff for correctness, style, and potential bugs
  2. Check for security vulnerabilities
  3. Verify test coverage
  4. Format as structured review comment

dependencies:
  - "security-scan"
  - "lint-analyzer"
```

### How to Create a Skill

1. **Use [Skill Creator](system-extensibility/skill-creator.md)** — loads the skill creation persona
2. **Define the skill contract** — inputs, outputs, behavior
3. **Write the instructions** — clear steps for the agent to follow
4. **Test the skill** — use [Agent Evaluator](system-extensibility/agent-evaluator.md)
5. **Publish** — add to the skill registry

### How to Use a Skill

- **Direct invocation** — "Run the `code-review` skill on this diff"
- **Composition** — "Run `security-scan` then `code-review`"
- **Workflow** — "Every PR should run `lint`, `test`, and `code-review` in sequence"

### Pre-Built Skill at Repo Root

The file **[`skill.md`](skill.md)** at the repository root is a ready-to-use skill for auto-generating custom agent systems:

```yaml
name: "generate-custom-agents"
description: "Analyze any project and generate a tailored multi-agent engineering system"
```

**How to use it:**
1. Load `skill.md` into any AI agent (Copilot, Claude, opencode, etc.)
2. The AI will analyze your project, determine relevant agent categories, and create custom agent files
3. It will ask you for customizations before generating
4. It enforces proper format, Handoff Protocol, and coverage — same standard as the 118 reference agents

This is the fastest way to create a project-specific multi-agent system.

---

## 9. Workflow Patterns: Common Agent Teams

### Greenfield Service Development

```
Planner → Architect → Cloud Architect → Database Administrator
    │                                        │
    └──→ Product Manager ──→ Developer ───────┘
                                    │
                          ┌─────────┼─────────┐
                          ▼         ▼         ▼
                    Reviewer    Tester   DevOps
                                    │
                                    ▼
                          E2E Automation Engineer
```

### Incident Response

```
Support Engineer ──→ Operations ──→ Site Reliability Engineer
                                   │
                         ┌─────────┼──────────┐
                         ▼         ▼          ▼
                  Developer   Security   Observability
                              Engineer   Engineer
```

### Cloud Migration

```
Cloud Architect → Migration Engineer → Terraform Engineer
    │                                        │
    └──→ AWS/Azure/GCP Engineer ──→ DevOps ──┘
                                         │
                                   ┌─────┼──────┐
                                   ▼     ▼      ▼
                           Security  FinOps  Database
                           Engineer  Engineer  Admin
```

### Feature with Compliance Requirements

```
Product Manager → Business Analyst → Legal Engineer
                      │                    │
                      └──→ Architect ───────┘
                              │
                    ┌─────────┼──────────┐
                    ▼         ▼          ▼
              Developer   Security   Compliance
                          Engineer   Officer
```

---

## 10. For Developers: How to Get the Best from Each Agent

### When You Need Code

| Situation | Agent to Use | Why |
|-----------|-------------|-----|
| Writing a new API endpoint | [API Engineer](specialized-engineering/api-engineer.md) + [Language-specific engineer] | API design patterns + language best practices |
| Building a new service | [Developer](engineering-dev/developer.md) + [Architect](design-architecture/architect.md) | Implementation + design guidance |
| Writing tests | [Tester](testing-quality/tester.md) + [QA Engineer](testing-quality/qa-engineer.md) | Test strategy + test case design |
| Debugging a production issue | [Support Engineer](content-communication/support-engineer.md) + [Observability Engineer](specialized-engineering/observability-engineer.md) | Structured debugging + observability |
| Code review | [Reviewer](engineering-dev/reviewer.md) | Systematic review with gates |

### When You Need Infrastructure

| Situation | Agent to Use | Why |
|-----------|-------------|-----|
| Designing cloud architecture | [Cloud Architect](cloud-infra-architecture/cloud-architect.md) | Multi-cloud strategy, Well-Architected |
| Writing Terraform | [Terraform Engineer](cloud-infra-architecture/terraform-engineer.md) | Module design, state management, CI/CD |
| Setting up CI/CD | [DevOps](infrastructure-ops/devops.md) + [Automation Engineer](engineering-dev/automation-engineer.md) | Pipeline design + automation |
| Optimizing cloud costs | [FinOps Engineer](compliance-legal-finance/finops-engineer.md) | Cost allocation, savings plans, right-sizing |
| Setting up monitoring | [Observability Engineer](specialized-engineering/observability-engineer.md) | Metrics, logs, traces, alerts |

### When You Need Quality

| Situation | Agent to Use | Why |
|-----------|-------------|-----|
| Writing test strategy | [QA Engineer](testing-quality/qa-engineer.md) | Test pyramid, risk-based testing |
| Automating E2E tests | [E2E Automation Engineer](testing-quality/e2e-automation-engineer.md) | Playwright/Cypress, flaky test prevention |
| Performance testing | [Performance Engineer](testing-quality/performance-engineer.md) | Load testing, profiling, optimization |
| Security audit | [Security Engineer](specialized-engineering/security-engineer.md) | Threat modeling, vulnerability scanning |
| Accessibility review | [Accessibility Engineer](compliance-legal-finance/accessibility-engineer.md) | WCAG compliance, ARIA, screen readers |

---

## 11. For SDETs / QA: Testing with the Agent System

### Building a Test Strategy

1. **Start with [QA Engineer](testing-quality/qa-engineer.md)** — develops the overall test strategy, test pyramid, coverage targets
2. **Hand off to [Tester](testing-quality/tester.md)** — writes test cases, defines acceptance criteria
3. **Hand off to [E2E Automation Engineer](testing-quality/e2e-automation-engineer.md)** — implements automated test suites
4. **Hand off to [Performance Engineer](testing-quality/performance-engineer.md)** — load tests, performance benchmarks
5. **Hand off to [Security Engineer](specialized-engineering/security-engineer.md)** — security test scenarios

### Quality Gates (CI Pipeline)

```
┌──────┐   ┌──────────┐   ┌──────┐   ┌──────────┐   ┌────────┐   ┌──────────┐
│ Lint │──▶│ Unit     │──▶│ Type │──▶│ Security │──▶│ Build  │──▶│ Integration│
│      │   │ Tests    │   │ Check│   │ Scan     │   │        │   │ Tests    │
└──────┘   └──────────┘   └──────┘   └──────────┘   └────────┘   └──────────┘
                                                                       │
                                                                       ▼
                                                              ┌────────────────┐
                                                              │ E2E Tests      │
                                                              │ (Smoke)        │
                                                              └────────────────┘
```

### Test Artifact Flow

```
QA Engineer ──→ Test Plan ──→ Tester ──→ Test Cases ──→ E2E Automation Engineer
    │                                                                    │
    └──→ Coverage targets                                      Playwright scripts
    └──→ Test environments                                      CI pipeline config
    └──→ Risk assessment                                        Test data fixtures
```

---

## 12. For Architects: Designing with the Agent System

### Architecture Design Flow

1. **Load [Architect](design-architecture/architect.md)** — starts with system constraints, quality attributes
2. **Load [Cloud Architect](cloud-infra-architecture/cloud-architect.md)** (if cloud) — cloud provider selection, Well-Architected review
3. **Load [Database Administrator](data-intelligence/database-administrator.md)** — data modeling, storage strategy
4. **Load [Security Engineer](specialized-engineering/security-engineer.md)** — threat model, security architecture
5. **Load [Network Engineer](infrastructure-ops/network-engineer.md)** (if needed) — network topology, segmentation
6. **Load [Performance Engineer](testing-quality/performance-engineer.md)** — performance budgets, scalability design
7. **Produce ADRs** — Architecture Decision Records documenting each choice

### Architecture Review Checklist

Use these agents for a comprehensive architecture review:

| Area | Agent | Questions to Answer |
|------|-------|---------------------|
| System design | [Architect](design-architecture/architect.md) | Are quality attributes addressed? Any ADRs missing? |
| Cloud | [Cloud Architect](cloud-infra-architecture/cloud-architect.md) | Is cost modeled? Is DR planned? |
| Security | [Security Engineer](specialized-engineering/security-engineer.md) | Threat model complete? Encryption everywhere? |
| Data | [Database Administrator](data-intelligence/database-administrator.md) | Schema normalized? Backup strategy? |
| Network | [Network Engineer](infrastructure-ops/network-engineer.md) | Segmentation? Latency budget? |
| Performance | [Performance Engineer](testing-quality/performance-engineer.md) | Load tested? Bottlenecks identified? |
| Reliability | [Site Reliability Engineer](infrastructure-ops/site-reliability-engineer.md) | SLOs defined? Error budget? |
| Compliance | [Compliance Officer](compliance-legal-finance/compliance-officer.md) | Regulatory requirements addressed? |

---

## 13. Best Practices & Anti-Patterns

### Best Practices

| Practice | Why |
|----------|-----|
| **Use handoff protocols** | Every agent-to-agent communication produces a structured artifact |
| **Load the right agent** | Don't ask a [Developer](engineering-dev/developer.md) to do security architecture — use [Security Engineer](specialized-engineering/security-engineer.md) |
| **Compose agents** | Complex tasks need multiple agents in sequence |
| **Respect personality matrices** | Each agent has a defined tone and approach — let them operate in their strength |
| **Provide context** | The more context you give, the better the agent's output |
| **Iterate** | Agent output is a starting point — review, refine, and hand off again |
| **Use anti-patterns** | Anti-pattern tables in each file are quick quality checks |

### Anti-Patterns to Avoid

| Anti-Pattern | Why | Action |
|--------------|-----|--------|
| One agent does everything | Loses depth, misses domain-specific nuances | Route to specialized agents |
| Skipping handoffs | Lost context, inconsistent artifacts | Always produce structured handoffs |
| Ignoring anti-pattern tables | Repeats known mistakes | Check anti-patterns before finalizing |
| No context for agents | Poor output quality | Describe task, requirements, constraints |
| Single-pass expectation | First output is rarely perfect | Iterate with the same agent |
| Agent overload | Giving too many requirements at once | Break into smaller tasks |

---

## 14. Getting Started Roadmap

### Step 1: Explore the Roster

- Browse the [Complete Agent Roster](#5-complete-agent-roster)
- Read 2-3 agent files that match your domain
- Understand the common format

### Step 2: Run a Simple Workflow

Try this pattern:

1. Load [Planner](orchestration/planner.md) with a task goal
2. Hand off to [Architect](design-architecture/architect.md) for design
3. Hand off to [Developer](engineering-dev/developer.md) for implementation
4. Hand off to [Reviewer](engineering-dev/reviewer.md) for review
5. Hand off to [Tester](testing-quality/tester.md) for testing

### Step 3: Add a New Agent

Found a gap? Follow [How to Create a New Agent](#7-how-to-create-a-new-agent).

### Step 4: Create Your First Skill

- Use [Skill Creator](system-extensibility/skill-creator.md) to package a reusable capability
- Test it with [Agent Evaluator](system-extensibility/agent-evaluator.md)
- Use it in workflows with [Workflow Designer](design-architecture/workflow-designer.md)

### Step 5: Build a Workflow

- Load [Workflow Designer](design-architecture/workflow-designer.md)
- Define a multi-step workflow using multiple agents
- Add error handling, retries, and handoff conditions

### Step 6: Continuously Improve

- Add new agents as your team's needs grow
- Refine existing agents with feedback
- Use [Agent Evaluator](system-extensibility/agent-evaluator.md) to measure quality
- Update handoff protocols as workflows evolve

---

## Quick Reference

| Resource | Location |
|----------|----------|
| Agent roster | [Section 5](#5-complete-agent-roster) (above) |
| File format | [Section 4](#4-agent-file-format-common-structure) |
| Handoff protocol guide | [Section 6](#6-how-agents-communicate-handoff-protocol) |
| Agent creation guide | [Section 7](#7-how-to-create-a-new-agent) |
| Skill creation guide | [Section 8](#8-how-to-create-and-use-skills) |
| **Curated skill (load first)** | **[`skill.md`](skill.md)** — auto-generate custom agents for any project |
| Workflow patterns | [Section 9](#9-workflow-patterns-common-agent-teams) |
| Developer tips | [Section 10](#10-for-developers-how-to-get-the-best-from-each-agent) |
| QA/SDET tips | [Section 11](#11-for-sdets--qa-testing-with-the-agent-system) |
| Architecture tips | [Section 12](#12-for-architects-designing-with-the-agent-system) |
| Best practices | [Section 13](#13-best-practices--anti-patterns) |

---

*"A single developer is a generalist. One hundred and eighteen specialized agents are an engineering organization. The system is only as strong as the handoffs between them."*
— Multi-Agent Engineering System