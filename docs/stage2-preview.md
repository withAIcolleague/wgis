# WGIS Stage 2 Preview

Last updated: 2026-05-22

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

The sixth pilot dataset tests early China civilization formation across Yellow River, lower Yangtze, Central Plains, Anyang, and Sichuan Basin contexts:

- `banpo`
- `liangzhu-city`
- `taosi`
- `erlitou`
- `yanshi-shang-city`
- `zhengzhou-shang-city`
- `yinxu-anyang`
- `sanxingdui`

The seventh pilot dataset tests ancient Greek Bronze Age, polis, sanctuary, Aegean-Anatolian, and Ionian network contexts:

- `athens-acropolis`
- `sparta-laconia`
- `ancient-corinth`
- `thebes-boeotia`
- `delphi`
- `olympia`
- `knossos`
- `mycenae`
- `troy-hisarlik`
- `miletus`

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

The public browser usability pass can be run with:

```bash
npm run check:stage2-public -- https://wgis.vercel.app/stage2-preview.html
```

It opens the deployed preview in headless Chrome, verifies dataset switching, compact context filters, search, detail rendering, stale marker cleanup, and mobile list scrolling, then saves desktop and mobile screenshots outside the repository.

## Browser Usability Pass

The 2026-05-22 public browser pass checked `/stage2-preview.html` after adding the sixth dataset:

- Dataset selector exposes 6 datasets.
- Atlantic revolutions renders 8 entries, 8 markers, and 8 permanent labels.
- Ethiopia human origins renders 8 entries, 8 markers, and 8 permanent labels.
- Mesopotamia early cities renders 10 entries, 10 markers, and 10 permanent labels.
- Ancient Egypt renders 14 entries, 14 markers, and 14 permanent labels.
- Indus Civilization renders 8 entries, 8 markers, and 8 permanent labels.
- Early China renders 8 entries, 8 markers, and 8 permanent labels.
- Searching `아마르나` narrows the Egypt dataset to 1 entry, marker, and label.
- Selecting `아마르나` opens the detail panel with source-confidence information.
- The `프톨레마이오스·로마 시대 신전망` context filter returns 4 Egypt entries.
- Switching from Egypt back to Mesopotamia clears stale Egypt markers and labels.
- Searching `로탈` narrows the Indus dataset to 1 entry, marker, and label.
- Selecting `로탈` opens the detail panel with source-confidence information.
- The `구자라트 해상 교역과 물 관리` context filter returns 2 Indus entries.
- Switching from Indus back to Atlantic revolutions clears stale Indus markers and labels.
- Searching `인허` narrows the Early China dataset to 1 entry, marker, and label.
- Selecting `인허` opens the detail panel with source-confidence information.
- The `초기 상 도성 네트워크` context filter returns 3 Early China entries.
- Switching from Early China back to Atlantic revolutions clears stale Early China markers and labels.
- On mobile, the Early China entry list scrolls independently and the detail panel stays in normal page flow below the map.

## UI Refinement Pass

The 2026-05-22 compact-filter pass reduced the Stage 2 context filter footprint:

- Context filters now start collapsed to 4 visible context chips plus a `+N개` expansion control.
- Expanding the context filters exposes hidden research contexts only when needed.
- Selecting a hidden context collapses the filter list again while keeping the active context visible.
- Desktop and mobile browser checks confirm the compact filters preserve dataset switching, search, context filtering, marker cleanup, and list scrolling.

## Seven-Dataset Public Usability Pass

The 2026-05-22 seven-dataset public browser pass checked `https://wgis.vercel.app/stage2-preview.html` after adding the ancient Greece pilot dataset:

- Dataset selector exposes 7 datasets.
- All 7 indexed datasets render their expected entry, marker, and permanent-label counts: Atlantic revolutions 8, Ethiopia 8, Mesopotamia 10, Egypt 14, Indus 8, Early China 8, and Ancient Greece 10.
- Compact context filters stay limited to 4 visible context buttons plus an expansion control after every dataset switch.
- Searching `델포이` in the Ancient Greece dataset narrows the list and map to 1 entry, marker, and label.
- Selecting `델포이` opens the detail panel with source-confidence information.
- The `범그리스 성소와 제전` context filter returns `델포이` and `올림피아` with 2 markers and 2 labels.
- Switching back from Ancient Greece to Atlantic revolutions clears stale Greek list items, markers, and labels.
- On mobile, the Ancient Greece entry list scrolls independently and the detail panel stays in normal page flow below the map.
- Browser screenshots were saved to `C:\Users\Public\Documents\ESTsoft\CreatorTemp\wgis-stage2-seven-datasets-desktop.png` and `C:\Users\Public\Documents\ESTsoft\CreatorTemp\wgis-stage2-seven-datasets-mobile.png`.
