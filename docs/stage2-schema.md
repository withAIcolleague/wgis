# WGIS Stage 2 Schema

Last updated: 2026-05-20

## Purpose

Stage 2 keeps the current map-facing `data/entries.json` stable, then adds a second layer for richer historical organization.

The schema is defined in:

```text
data/stage2/schema.json
```

The validator is:

```bash
npm run validate:stage2
```

The full project check is:

```bash
npm run check
```

## Required Structure

Each Stage 2 file under `data/stage2/*.json` should include:

- `schemaVersion`: must be `2`
- `status`: `preview-only`, `draft`, or `active`
- `id`, `titleKo`, `descriptionKo`
- `uiFilterGroups`: user-facing filter groups
- `contexts`: historical contexts
- `entries`: links from existing map entries into Stage 2 contexts

`data/stage2/schema.json` is the schema reference and is not treated as a Stage 2 data batch.

The visible preview page reads dataset options from:

```text
data/stage2/index.json
```

Every Stage 2 data file should be listed in that index so the preview page and validator stay aligned.

## Contexts

`contexts` describe historical meaning, not just geography.

Example:

```json
{
  "id": "american-revolution",
  "labelKo": "미국 독립혁명",
  "parentId": "atlantic-revolutions",
  "periodKo": "1765-1783년",
  "summaryKo": "영국령 북아메리카 식민지에서 독립국가와 공화주의 제도가 형성된 흐름입니다."
}
```

Use `parentId` to group detailed contexts under a larger historical frame.

## Entries

Stage 2 entries do not replace `data/entries.json`. They must point to an existing `entryId`.

Each entry must include:

- `entryId`: existing ID in `data/entries.json`
- `titleKo`, `displayTypeKo`, `modernCountryKo`, `coordinates`, `yearLabelKo`, `summaryKo`
- `stage2.primaryContextId`
- `stage2.contextIds`
- `stage2.periodPathKo`
- `stage2.topicTagsKo`
- `stage2.uiFilters`
- `stage2.sourceConfidence`

## UI Filters vs Research Tags

Use `uiFilters` for simple visible filters that users can understand quickly.

Use `topicTagsKo` for denser research tags.

Example:

```json
{
  "uiFilters": {
    "era": "근대",
    "region": "북대서양",
    "theme": ["혁명", "독립운동"],
    "displayType": "장소"
  },
  "topicTagsKo": ["독립선언", "헌법", "공화주의", "식민지 독립"]
}
```

## Source Confidence

`sourceConfidence` is a compact status block for source quality.

```json
{
  "tier": "high",
  "officialSources": 2,
  "referenceSources": 1,
  "noteKo": "국립공원관리청과 백과사전 출처가 함께 있는 고신뢰 항목입니다."
}
```

Allowed `tier` values:

- `high`
- `medium`
- `approximate`

## Validator Rules

`npm run validate:stage2` checks:

- Stage 2 JSON parses successfully
- every Stage 2 data file is listed in `data/stage2/index.json`
- every indexed dataset path points to an existing Stage 2 data file
- required root, context, entry, and source-confidence fields exist
- context IDs are unique
- context parent IDs exist
- every Stage 2 `entryId` exists in `data/entries.json`
- `primaryContextId` and every `contextIds` value exist
- `contextIds` includes `primaryContextId`
- `uiFilters` only use declared filter groups and options
- coordinates are valid latitude/longitude values
- source-confidence source counts are non-negative integers
