# WGIS Agent Instructions

This repository is a static WGIS map app plus a curated world-history location database.

## Canonical Data Instructions

For DB creation or editing, read and follow these files before making changes:

- `data/DATA_AUTHORING_GUIDE.md`
- `data/PROJECT_STATE.md`
- `data/taxonomy.json`

The source of truth for DB authoring rules is `data/DATA_AUTHORING_GUIDE.md`. Other agent-specific instruction files in this repository are thin entrypoints that point back to this guide.

## Data Work Rules

- Keep data work batch-based.
- Do not add isolated entries without a source record file and a matching curation batch unless the user explicitly asks for a one-off emergency fix.
- Keep `data/records/**`, `data/entries.json`, `data/curation-batches.json`, and `data/PROJECT_STATE.md` synchronized.
- Do not bulk scrape or copy prose from reference sites. Write independent Korean summaries.
- Before committing data changes, run:

```bash
node scripts/validate-data.js
```

## Agent Entrypoints

The repository includes compatibility files for common coding agents and IDEs:

- `CLAUDE.md` for Claude Code.
- `GEMINI.md` for Gemini CLI and Gemini-family agents.
- `.github/copilot-instructions.md` and `.github/instructions/wgis-data.instructions.md` for GitHub Copilot and VS Code.
- `.cursor/rules/wgis-data-authoring.mdc` for Cursor.
- `.windsurf/rules/wgis-data-authoring.md` and `.windsurfrules` for Windsurf.
- `.agent/rules/wgis-data-authoring.md` as a generic fallback for open-source agents that scan `.agent` rule folders.

If these entrypoints conflict, prefer this file first, then `data/DATA_AUTHORING_GUIDE.md`.
