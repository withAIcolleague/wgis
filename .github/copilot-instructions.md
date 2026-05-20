# WGIS Copilot Instructions

This repository uses shared agent instructions in `AGENTS.md`.

For WGIS DB creation or editing:

- Read `data/DATA_AUTHORING_GUIDE.md` before changing data files.
- Read `data/PROJECT_STATE.md` to understand current progress and the next batch candidates.
- Keep work source-record-first: create or update `data/records/**` before reflecting display fields in `data/entries.json`.
- Keep `data/entries.json`, `data/curation-batches.json`, and `data/PROJECT_STATE.md` synchronized with each completed batch.
- Do not bulk scrape or copy prose from World History Encyclopedia or other sources. Write independent Korean summaries.
- Validate before commit:

```bash
node scripts/validate-data.js
```
