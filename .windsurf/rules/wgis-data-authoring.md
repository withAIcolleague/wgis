---
trigger: glob
globs: data/**/*.json,data/**/*.md,scripts/validate-data.js
---

# WGIS Data Authoring

Follow `AGENTS.md` and `data/DATA_AUTHORING_GUIDE.md` when editing WGIS historical-location data.

- Start with `data/PROJECT_STATE.md`.
- Work on one focused curation batch at a time.
- Keep source records, app entries, curation batches, and project state synchronized.
- Write independent Korean summaries; do not copy reference prose.
- Validate with `node scripts/validate-data.js` before commit.
