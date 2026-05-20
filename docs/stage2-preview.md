# WGIS Stage 2 Preview

Last updated: 2026-05-20

## What This Adds

The Stage 2 preview is a visible prototype at:

```text
/stage2-preview.html
```

It does not replace the main `data/entries.json` app index. It shows how a future Stage 2 data model can sit beside the current map data.

## Preview Data

Preview data lives at:

```text
data/stage2/atlantic-revolutions-preview.json
```

The sample uses the existing Atlantic revolutions entries:

- `philadelphia-independence-hall`
- `yorktown-battlefield`
- `paris-bastille`
- `cap-haitien-cap-francais`
- `caracas-bolivar-independence`
- `bogota-casa-del-florero`
- `buenos-aires-cabildo`
- `mexico-city-national-palace-independence`

The preview now also includes an Ethiopia human-origins pilot dataset:

- `ardi-aramis`
- `lucy-hadar`
- `selam-dikika`
- `dikika-cutmarked-bones`
- `gona-oldowan-tools`
- `ledi-geraru-ld-350-1`
- `herto-homo-sapiens-idaltu`
- `omo-kibish-omo-i`

The dataset list is managed in:

```text
data/stage2/index.json
```

## Model Idea

Stage 1 stores enough information to search and place an item on the map.

Stage 2 adds separate layers:

- `contexts`: historical research contexts such as Atlantic revolutions, American Revolution, Haitian Revolution, and Spanish American independence.
- `periodPathKo`: a more detailed period path.
- `topicTagsKo`: research tags that can be denser than the public filter UI.
- `uiFilters`: simplified filters that users can understand quickly.
- `sourceConfidence`: source quality status and verification notes.

## Validation

The preview is included in:

```bash
npm run validate:stage2
npm run smoke
npm run check
```

The Stage 2 validator checks the preview data against `data/stage2/schema.json`. The smoke check confirms that the preview page, assets, and critical UI wiring are present.
