# WGIS Stage 2 Preview

Last updated: 2026-05-21

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

The third pilot dataset tests ancient city/site-heavy data through early Mesopotamian cities:

- `eridu`
- `uruk`
- `nippur`
- `kish`
- `lagash`
- `akkad`
- `babylon`
- `ur`
- `ashur`
- `nineveh`

The fourth pilot dataset tests ancient Egyptian royal, temple, funerary, frontier, and Hellenistic contexts:

- `memphis-egypt`
- `giza-plateau`
- `saqqara`
- `thebes-egypt`
- `karnak`
- `luxor-temple`
- `valley-of-the-kings`
- `amarna`
- `abu-simbel`
- `alexandria-egypt`
- `dendera-temple`
- `edfu-temple`
- `philae`
- `kom-ombo-temple`

The fifth pilot dataset tests Indus Civilization urban, riverine, craft, water-management, and maritime contexts:

- `mehrgarh`
- `harappa`
- `mohenjo-daro`
- `dholavira`
- `lothal`
- `kalibangan`
- `rakhigarhi`
- `ganweriwala`

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

The Stage 2 validator checks the preview data against `data/stage2/schema.json`. The smoke check confirms that the preview page, assets, critical UI wiring, and every indexed Stage 2 dataset are present.

## Browser Usability Pass

The 2026-05-21 public browser pass checked `/stage2-preview.html` after adding the fourth dataset:

- Dataset selector exposes 4 datasets.
- Atlantic revolutions renders 8 entries, 8 markers, and 8 permanent labels.
- Ethiopia human origins renders 8 entries, 8 markers, and 8 permanent labels.
- Mesopotamia early cities renders 10 entries, 10 markers, and 10 permanent labels.
- Ancient Egypt renders 14 entries, 14 markers, and 14 permanent labels.
- Searching `아마르나` narrows the Egypt dataset to 1 entry, marker, and label.
- Selecting `아마르나` opens the detail panel with source-confidence information.
- The `프톨레마이오스·로마 시대 신전망` context filter returns 4 Egypt entries.
- Switching from Egypt back to Mesopotamia clears stale Egypt markers and labels.
- On mobile, the Egypt entry list scrolls independently and the detail panel stays in normal page flow below the map.
