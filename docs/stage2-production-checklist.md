# WGIS Stage 2 Production Checklist

Last updated: 2026-06-06

## Current Production State

- `/` is the primary Stage 2 context-map route.
- `/stage1.html` remains the first-stage support route.
- `/stage2-preview.html` remains a QA compatibility route.
- Canonical Stage 2 assets are `stage2.css` and `stage2.js`.
- Legacy asset aliases `stage2-preview.css` and `stage2-preview.js` remain available for old direct references.
- `data/stage2/index.json` lists 44 active Stage 2 datasets.
- The active Stage 2 datasets cover all current source-record files, including `data/records/global/legacy/core-seed-entries.json`.

## Naming Policy

- New app assets should use production names such as `stage2.css` and `stage2.js`.
- New Stage 2 data files should avoid the historical `-preview` suffix.
- Existing `*-preview.json` Stage 2 data files stay in place to avoid URL churn and compatibility risk.
- `/stage2-preview.html` is intentionally kept as a QA compatibility route, not as the primary user route.
- Historical notes in `docs/stage2-preview.md` and `data/PROJECT_STATE.md` should preserve the wording that was true at the time of each pass.

## Handoff Checklist

Use this checklist before another agent starts a new WGIS batch:

1. Read `data/PROJECT_STATE.md`.
2. Read `data/DATA_AUTHORING_GUIDE.md`.
3. Run `git status -sb`.
4. Pick exactly one bounded next batch.
5. Prefer source-record-first changes under `data/records/`.
6. Reflect app-facing entries in `data/entries.json` only when the source record changes.
7. Add or update one active Stage 2 dataset for the same batch.
8. Add the dataset to `data/stage2/index.json`.
9. Update `scripts/stage2-public-usability-check.mjs` when the expected public dataset count changes.
10. Update `data/PROJECT_STATE.md` with the current count, completed work, checks, and next candidate.
11. Run the validation commands below.
12. Commit and push only the intended files.

## Attempt Limit

- Any failing command, public check, deployment check, or external call should be attempted at most 3 times.
- If the same failure persists after 3 attempts, stop and report:
  - command or route
  - attempt count
  - observed error
  - likely cause
  - what user approval or manual action is needed

## Validation Commands

```bash
node scripts/validate-data.js
npm run validate:stage2
npm run smoke
npm run check
node --check scripts/stage2-public-usability-check.mjs
node scripts/stage2-public-usability-check.mjs https://wgis.vercel.app/
```

Run the public usability check after push, because it verifies the deployed route contract.
