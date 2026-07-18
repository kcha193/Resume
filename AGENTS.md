# Resume — Agent Instructions

This file governs automated agents (Codex, CI bots, etc.) working in this repo. No other
Codex-specific instructions exist yet beyond this section — see CLAUDE.md for full project
context (Claude Code-specific; not auto-loaded by Codex).

## Context Navigation (Graphify + Codebase Memory)

Codex does not auto-load CLAUDE.md, so these rules are inlined here too (kept in sync with
CLAUDE.md's "Context Navigation" section).

### 4-Layer Query Rule
1. **First:** query `graphify-out/graph.json` or `graphify-out/wiki/index.md`
   to understand code structure and connections
2. **Second:** query the Obsidian vault for decisions, progress, and project context
3. **Third:** for live/ad-hoc structural questions the static graphify graph
   doesn't answer (call chains, impact of uncommitted changes, dead code,
   symbol search), use codebase-memory-mcp's MCP tools directly. Call
   `detect_changes` first — it does not auto-watch or auto-reindex; if it
   reports drift, re-run `index_repository` before trusting graph results
4. **Fourth:** only read raw code files when editing
   or when the first three layers don't have the answer

### Codebase Memory (codebase-memory-mcp)
- codebase-memory-mcp is a structural code index only; it has no LLM inside it.
- It does not replace graphify or `AI_Context`.
- If this project is not already indexed in the current agent session, ask the
  agent to "index this project" once.
- Its cache lives outside the repo at `~/.cache/codebase-memory-mcp/`.
- If codebase-memory-mcp is unavailable, skip to raw code reads; nothing
  depends on it being present.
