# WGIS Agent Instructions

This repository is a static WGIS map app plus a curated world-history location database.

For DB creation or editing, read and follow:

- `data/DATA_AUTHORING_GUIDE.md`
- `data/PROJECT_STATE.md`
- `data/taxonomy.json`

Required validation before commit:

```bash
node scripts/validate-data.js
```

Keep data work batch-based. Do not add isolated entries without a source record file and a matching curation batch unless the user explicitly asks for a one-off emergency fix.
