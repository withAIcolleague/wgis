---
applyTo: "data/**/*.json,data/**/*.md,scripts/validate-data.js"
---

# WGIS Data Authoring

When editing WGIS data files, follow `data/DATA_AUTHORING_GUIDE.md` as the canonical schema and workflow guide.

- Start by reading `data/PROJECT_STATE.md`.
- Work on one focused curation batch at a time.
- Create or update the source record file under `data/records/**` first.
- Mirror only app display fields into `data/entries.json`.
- Add or update the matching batch in `data/curation-batches.json`.
- Update `data/PROJECT_STATE.md` after each meaningful data milestone.
- Run `node scripts/validate-data.js` before committing.
