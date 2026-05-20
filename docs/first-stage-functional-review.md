# WGIS First-Stage Functional Review

Last updated: 2026-05-20

## Scope

This review closes the first-stage stabilization pass before moving into the next data-model stage.

Checked areas:

- Data loading from `data/entries.json`
- Search input, search button, and Enter-key search
- Clear-search behavior
- Type and region filter panel behavior
- Pagination and page-size options `10`, `20`, `30`, `50`
- Desktop and mobile result-list scrolling
- Marker and permanent name-label rendering rules
- Name-label and marker click behavior
- Small map popup and detail drawer close behavior
- Google search links in popup and detail views
- Deployment response for `https://wgis.vercel.app/`

## Current Result

- Entries: 246
- Curation batches: 30
- First-stage progress: 98.4% of the 250-entry working target
- Data validation: pass
- Static UI smoke check: pass
- Public app response: `HTTP 200`
- Public data response: `HTTP 200`

The project is ready to move from first-stage data filling into second-stage data-model planning.

## Local Verification

Run the full local check:

```bash
npm run check
```

This runs:

```bash
npm run validate
npm run smoke
```

`npm run validate` verifies data integrity. `npm run smoke` verifies that critical UI wiring and responsive layout contracts are still present.

## Remaining Manual Check

The smoke check does not replace a real browser interaction pass. Before a public milestone, manually verify:

- On desktop, search for `루시`, `게티즈버그`, `요크타운`, and `수에즈 운하`.
- Confirm search results appear in the list after pressing the search button.
- Confirm markers and name labels appear only for the active searched/page-visible result set.
- Click a name label once and confirm the small popup and detail view open.
- Click the same name label again and confirm the popup/detail can close.
- Change page size to `20`, `30`, and `50`, then confirm paging remains stable.
- On mobile, open the search/results sheet and confirm the result list scrolls independently.
- On mobile, open filters and confirm the filter panel does not consume the whole result-list area.

## Known Constraint

The current smoke check is intentionally dependency-free. It checks DOM hooks, JavaScript event wiring, CSS layout contracts, and representative data presence, but it does not execute Leaflet or render map tiles.
