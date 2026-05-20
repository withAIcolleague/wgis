# WGIS Generic Agent Rule

This fallback rule exists for open-source coding agents that scan `.agent` or generic rule folders.

Use `AGENTS.md` as the shared repository policy and `data/DATA_AUTHORING_GUIDE.md` as the canonical DB authoring guide.

- Read `data/PROJECT_STATE.md` before choosing a batch.
- Work source-record-first under `data/records/**`.
- Reflect only app display fields into `data/entries.json`.
- Update `data/curation-batches.json` and `data/PROJECT_STATE.md`.
- Validate with `node scripts/validate-data.js`.
