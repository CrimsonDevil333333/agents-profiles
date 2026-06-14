# agents-profiles-cli

**Multi-Agent System Setup Wizard** — Interactive CLI that configures AI coding assistants with 118 specialist agent profiles. Turns any AI into an **Orchestrator** that routes tasks to domain experts.

## Why Use It?

- **One command** sets up a full multi-agent engineering team in your project
- **118 pre-built specialists** across 18 categories (orchestration, frontend, backend, DevOps, security, data, etc.)
- **Works everywhere** — OpenCode, Claude Code, GitHub Copilot, Cursor, Windsurf, Aider, Continue.dev
- **AI-powered analysis** — optionally provide an API key and let AI recommend the right agents for your project
- **Custom providers** — add any AI tool beyond the built-in platforms
- **Zero manual config** — agent profiles are copied into your project automatically

## Prerequisites

- **Node.js 18+** and npm
- One of the supported AI coding assistants:
  - [OpenCode](https://opencode.ai)
  - [Claude Code](https://docs.anthropic.com/en/docs/claude-code)
  - [GitHub Copilot](https://github.com/features/copilot)
  - [Cursor](https://cursor.com)
  - [Windsurf](https://codeium.com/windsurf)
  - [Aider](https://aider.chat)
  - [Continue.dev](https://continue.dev)
- (Optional) OpenAI-compatible API key for AI-powered agent recommendations

## Installation

```sh
# Global install (recommended)
npm install -g agents-profiles-cli

# Or run directly without installing
npx agents-profiles-cli init
```

## How It Works

```
agents-profiles-cli init
  │
  ├── 1. Detect your project (languages, frameworks, Docker, CI/CD)
  │
  ├── 2. (Optional) AI analysis — provide API key + model
  │       → AI reads your project files
  │       → Recommends the best agents from the 118 profiles
  │
  ├── 3. Pick AI platforms (OpenCode, Claude, Copilot, Cursor, etc.)
  │
  ├── 4. Select agents (minimal / standard / complete)
  │       → Or accept AI recommendations
  │       → Or define custom agents
  │
  ├── 5. Generate config files
  │       → AGENTS.md / CLAUDE.md / .cursorrules / etc.
  │       → Copies native agent profiles to .opencode/agents/ etc.
  │
  └── 6. Open your AI assistant — it's now the Orchestrator
```

## Usage

```sh
# Interactive setup wizard
agents-profiles-cli init

# Setup in a specific directory
agents-profiles-cli init ./my-project

# List supported platforms
agents-profiles-cli list

# Detect project info
agents-profiles-cli detect

# Detect a specific project
agents-profiles-cli detect ./other-project
```

### Commands

| Command | Description |
|---------|-------------|
| `init [dir]` | Interactive setup wizard |
| `list` / `ls` | List supported AI platforms |
| `detect [dir]` | Show detected project info |
| `--help` | Show full help |
| `--version` | Show version |

## After Setup

Once the wizard finishes, open your AI coding assistant and give it this command:

> "Fetch and read the config file I just created, then initialize the multi-agent system for my project."

Your AI will become the **Orchestrator** — routing every task to the right specialist agent.

## Supported Platforms

| Platform | Config File | Agent Directory |
|----------|-------------|-----------------|
| OpenCode | `AGENTS.md` | `.opencode/agents/` |
| Claude Code | `CLAUDE.md` | `.claude/agents/` |
| GitHub Copilot | `.github/copilot-instructions.md` | `.github/agents/` |
| Cursor | `.cursorrules` | `.cursor/rules/` |
| Windsurf | `.windsurfrules` | `.windsurf/rules/` |
| Aider | `.aider-rules.md` | `.aider/` |
| Continue.dev | `.continuerc.json` | `.continue/agents/` |
| Generic | `AI_AGENTS.md` | `.agents/profiles/` |
| Custom | User-defined | User-defined |

## Custom Providers

Beyond the built-in platforms, you can define **custom AI providers** during `init`:
- Give it a name, description, and config file path
- Choose output format (markdown, JSON, YAML, TOML, text)
- Perfect for proprietary AI tools, internal agents, or experimental platforms

## Custom Agents

You can also add **custom agent profiles** to any setup:
- Define name, description, category, and permission level
- Custom agents appear in all generated configs alongside built-in profiles
- Permission levels: `read-only`, `read-write`, `infrastructure` (full shell access)

## Project

Part of the [agents-profiles](https://github.com/CrimsonDevil333333/agents-profiles) ecosystem.
