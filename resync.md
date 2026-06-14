# Resync — Audit & Fix Stale Agent Files

> **Run this against any project that previously used this agent system.**
> It detects and fixes: stub agent files, wrong permissions, missing agents, stale configs.

---

## 1. Locate the Source Repo

```bash
# Check if already cloned
if [ -d "agents-profiles" ]; then
  cd agents-profiles && git pull origin main
else
  git clone https://github.com/CrimsonDevil333333/agents-profiles.git
fi
cd agents-profiles
```

If the repo is already the current working directory, skip clone and just `git pull`.

---

## 2. Regenerate Native Agent Files

```bash
python3 native-agents/generate.py
```

This ensures all 354 files (118 agents × 3 platforms) have full profile content — no stubs.

---

## 3. Detect the Target Project

- If running inside a consumer project already (`.opencode/`, `.claude/`, `.github/` exist), **that is the target**.
- If running inside `agents-profiles/` itself, **ask the user** for the project path or default to the parent directory.

Set `TARGET_DIR` to the consumer project root.

---

## 4. Scan & Fix — Platform by Platform

For each platform below, check files in the target project and replace stale ones.

### 4a. OpenCode — `.opencode/agents/`

```bash
target="$TARGET_DIR/.opencode/agents"
source="native-agents/opencode"

if [ -d "$target" ]; then
  echo "Scanning OpenCode agents..."
  for src_file in "$source"/*.md; do
    slug=$(basename "$src_file")
    dst_file="$target/$slug"
    
    # Determine correct permission tier from the source file
    perm_tier=$(grep -oP '(?<=edit: )(allow|deny)' "$src_file" | head -1)
    
    if [ -f "$dst_file" ]; then
      # Check if stub (contains placeholder text)
      if grep -q "Fulfill the role as defined in the full profile" "$dst_file" 2>/dev/null; then
        echo "  STUB: $slug → replacing"
        cp "$src_file" "$dst_file"
      # Check if wrong permissions
      elif [ "$perm_tier" = "allow" ] && grep -q "edit: deny" "$dst_file" 2>/dev/null; then
        echo "  WRONG PERMS: $slug → replacing"
        cp "$src_file" "$dst_file"
      fi
    else
      echo "  MISSING: $slug → copying"
      cp "$src_file" "$dst_file"
    fi
  done
fi
```

### 4b. Claude Code — `.claude/agents/`

```bash
target="$TARGET_DIR/.claude/agents"
source="native-agents/claude"

if [ -d "$target" ]; then
  echo "Scanning Claude Code agents..."
  for src_file in "$source"/*.md; do
    slug=$(basename "$src_file")
    dst_file="$target/$slug"
    
    if [ -f "$dst_file" ]; then
      if grep -q "Fulfill the role as defined in the full profile" "$dst_file" 2>/dev/null; then
        echo "  STUB: $slug → replacing"
        cp "$src_file" "$dst_file"
      fi
    else
      echo "  MISSING: $slug → copying"
      cp "$src_file" "$dst_file"
    fi
  done
fi
```

### 4c. GitHub Copilot — `.github/agents/`

```bash
target="$TARGET_DIR/.github/agents"
source="native-agents/copilot"

if [ -d "$target" ]; then
  echo "Scanning Copilot agents..."
  for src_file in "$source"/*.agent.md; do
    slug=$(basename "$src_file")
    dst_file="$target/$slug"
    
    if [ -f "$dst_file" ]; then
      if grep -q "Fulfill the role as defined in the full profile" "$dst_file" 2>/dev/null; then
        echo "  STUB: $slug → replacing"
        cp "$src_file" "$dst_file"
      fi
    else
      echo "  MISSING: $slug → copying"
      cp "$src_file" "$dst_file"
    fi
  done
fi
```

---

## 5. Check & Fix Config Files

| File | Location | Check | Fix |
|------|----------|-------|-----|
| `AGENTS.md` | `$TARGET_DIR` | Exists and has valid YAML frontmatter | Copy from repo `INIT.md` |
| `CLAUDE.md` | `$TARGET_DIR` | Exists and has valid YAML frontmatter | Copy from repo `INIT.md` |
| `.github/copilot-instructions.md` | `$TARGET_DIR` | Exists and has valid YAML frontmatter | Copy from repo `INIT.md` |
| `.cursorrules` | `$TARGET_DIR` | Exists and has valid YAML frontmatter | Copy from repo `INIT.md` |

```bash
for config_file in "AGENTS.md" "CLAUDE.md" ".github/copilot-instructions.md" ".cursorrules"; do
  full_path="$TARGET_DIR/$config_file"
  if [ -f "$full_path" ]; then
    # Check if it's still using the old INIT.md stub format
    if grep -q "standalone session init protocol" "$full_path" 2>/dev/null; then
      echo "  STALE: $config_file → replacing with latest INIT.md"
      cp INIT.md "$full_path"
    fi
  fi
done
```

---

## 6. Quick Verification

```bash
echo ""
echo "=== Verification ==="
still_stubs=$(grep -rl "Fulfill the role as defined in the full profile" "$TARGET_DIR/.opencode/agents" "$TARGET_DIR/.claude/agents" "$TARGET_DIR/.github/agents" 2>/dev/null | wc -l)
echo "Remaining stubs: $still_stubs"

if [ "$still_stubs" = "0" ]; then
  echo "✓ All agents are production-ready — no stubs remain."
else
  echo "✗ Some files still need attention."
fi
```

---

## 7. Summary

Report to the user:
- How many files were replaced (stubs → full profiles)
- How many missing agents were copied
- How many config files were refreshed
- Zero remaining stubs (confirm)
