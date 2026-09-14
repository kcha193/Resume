# Resume — Agent Instructions

This file governs automated agents (Codex, CI bots, etc.) working in this repo. No other
Codex-specific instructions exist yet beyond this section — see CLAUDE.md for full project
context (Claude Code-specific; not auto-loaded by Codex).

## Context Navigation

<!-- context-navigation:start v1 -->
Follow the global context-navigation rule (`~/.claude/CLAUDE.md` for Claude,
`~/.codex/AGENTS.md` for Codex): vault first; Claude uses native search;
Codex uses codebase-memory-mcp (`detect_changes` first); Graphify only on request.
- `graphify-out/` is a dated snapshot, not auto-refreshed — check its age before trusting it; don't hand-edit it.
- codebase-memory-mcp is registered for Codex by this repo's `.codex/config.toml`, which Codex loads only for trusted projects.
<!-- context-navigation:end -->
