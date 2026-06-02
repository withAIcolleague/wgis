# WGIS First-Stage Functional Review

Last updated: 2026-05-21

## Scope

This review closes the first-stage stabilization pass before continuing the second-stage data-model expansion.

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

- Entries: 250
- Curation batches: 31
- First-stage progress: 100% of the 250-entry working target
- Data validation: pass
- Stage 2 validation: pass
- Static UI smoke check: pass
- Local browser functional check: pass
- Public app response: `HTTP 200`
- Public data response: `HTTP 200`

The first-stage data target is complete. The project is ready to continue second-stage data-model expansion after the deployment is rechecked.

## Local Verification

Run the full local check:

```bash
npm run check
```

This runs:

```bash
npm run validate
npm run validate:stage2
npm run smoke
```

`npm run validate` verifies data integrity. `npm run validate:stage2` verifies the Stage 2 datasets. `npm run smoke` verifies that critical UI wiring and responsive layout contracts are still present.

## Browser Verification

The 2026-05-21 local browser pass checked the main app with 250 first-stage records:

- Desktop initial load shows 250 results, 69 current countries, and no map markers before an explicit map search.
- Searching `Dendera` renders one result, one marker, and one permanent name label.
- Clicking the name label opens the map popup and detail drawer; clicking it again closes both.
- Popup/detail Google search links are rendered.
- Page sizes `20`, `30`, and `50` keep marker and name-label counts aligned, so stale permanent labels do not accumulate.
- The filter panel opens and closes.
- Mobile expanded search/results sheet fills the viewport.
- Mobile result list scrolls independently with `50` visible results.
- Mobile filter panel is fixed separately from the result-list flow.

## Remaining Manual Check

The automated checks do not replace a final human visual pass. Before a public milestone, manually verify:

- On desktop, search for `Lucy`, `Gettysburg`, `Dendera`, and `Suez Canal`.
- Confirm search results appear in the list after pressing the search button.
- Confirm markers and name labels appear only for the active searched/page-visible result set.
- Click a name label once and confirm the small popup and detail view open.
- Click the same name label again and confirm the popup/detail can close.
- Change page size to `20`, `30`, and `50`, then confirm paging remains stable.
- On mobile, open the search/results sheet and confirm the result list scrolls independently.
- On mobile, open filters and confirm the filter panel does not consume the whole result-list area.

## Known Constraint

The dependency-free smoke check verifies DOM hooks, JavaScript event wiring, CSS layout contracts, and representative data presence. It does not execute Leaflet or render map tiles, so browser verification remains necessary for marker and tooltip behavior.
