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

The eighth pilot dataset tests Achaemenid Persian royal capitals, ceremonial landscapes, inscriptions, royal road/satrapal networks, and western Anatolian frontier contexts:

- `pasargadae`
- `persepolis`
- `susa`
- `ecbatana-hegmataneh`
- `behistun`
- `naqsh-e-rostam`
- `sardis`
- `daskyleion`

The ninth pilot dataset tests Roman republican and imperial capital spaces, Italian urban life, ports and logistics, Punic-Roman Africa, western frontiers, and late antique transformations:

- `roman-forum`
- `palatine-hill`
- `pompeii`
- `ostia-antica`
- `ravenna`
- `carthage`
- `hadrians-wall`
- `trier-roman-monuments`

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

## Detail Flow Refinement Pass

The 2026-05-22 detail-flow pass refined how the Stage 2 detail panel behaves after the preview grew to 7 datasets:

- The empty detail panel now stays hidden until a user selects a list item or map marker, reducing map obstruction.
- Selected entries show two detail actions: `지도에서 보기` and `닫기`.
- `지도에서 보기` recenters and zooms to the selected entry; on mobile it also scrolls the map back into view.
- `닫기` clears the active entry, hides the detail panel, and preserves the current search/filter result markers.
- Pressing `Escape` also closes the active detail panel.
- On mobile, selecting a list item or marker scrolls the detail panel into view, and closing the panel avoids leaving a large blank area below the map.
- Dataset and filter refreshes stop pending map animations before fitting new result bounds, preventing stale map positions after a `지도에서 보기` action.
- The browser pass verifies these desktop and mobile detail-flow behaviors alongside the 7-dataset switching, search, filter, marker-label, and scrolling checks.

## Eight-Dataset Public Usability Pass

The 2026-05-22 eight-dataset browser pass checks `/stage2-preview.html` after adding the Achaemenid Persia pilot dataset:

- Dataset selector exposes 8 datasets.
- All 8 indexed datasets render their expected entry, marker, and permanent-label counts: Atlantic revolutions 8, Ethiopia 8, Mesopotamia 10, Egypt 14, Indus 8, Early China 8, Ancient Greece 10, and Achaemenid Persia 8.
- Compact context filters stay limited to 4 visible context buttons plus an expansion control after every dataset switch.
- Searching `베히스툰` in the Achaemenid Persia dataset narrows the list and map to 1 entry, marker, and label.
- Selecting `베히스툰` opens the detail panel with source-confidence information and detail actions.
- Closing the `베히스툰` detail panel preserves the current search marker and label.
- The `서아나톨리아 사트라피와 변방` context filter returns `사르디스` and `다스킬레이온` with 2 markers and 2 labels.
- Switching back from Achaemenid Persia to Atlantic revolutions clears stale Persian list items, markers, labels, and map zoom state.
- Dataset, search, and context changes explicitly reframe the map after any prior detail zoom.
- On mobile, the Achaemenid Persia entry list scrolls independently, `파사르가다에` detail scrolls into view, `지도에서 보기` returns to the map, and `닫기` hides the detail panel.
- Browser screenshots are saved to `C:\Users\Public\Documents\ESTsoft\CreatorTemp\wgis-stage2-eight-datasets-desktop.png` and `C:\Users\Public\Documents\ESTsoft\CreatorTemp\wgis-stage2-eight-datasets-mobile.png`.

## Nine-Dataset Public Usability Pass

The 2026-05-22 nine-dataset browser pass checks `/stage2-preview.html` after adding the Roman Republic and Empire pilot dataset:

- Dataset selector exposes 9 datasets.
- All 9 indexed datasets render their expected entry, marker, and permanent-label counts: Atlantic revolutions 8, Ethiopia 8, Mesopotamia 10, Egypt 14, Indus 8, Early China 8, Ancient Greece 10, Achaemenid Persia 8, and Roman Republic and Empire 8.
- Compact context filters stay limited to 4 visible context buttons plus an expansion control after every dataset switch.
- Searching `트리어` in the Roman dataset narrows the list and map to 1 entry, marker, and label.
- Selecting `트리어 로마 유적` opens the detail panel with source-confidence information and detail actions.
- Closing the `트리어 로마 유적` detail panel preserves the current search marker and label.
- The `브리타니아·라인 변경과 군사 경관` context filter returns `하드리아누스 방벽` and `트리어 로마 유적` with 2 markers and 2 labels.
- Switching back from the Roman dataset to Atlantic revolutions clears stale Roman list items, markers, labels, and map zoom state.
- On mobile, the Roman entry list scrolls independently, `로마 포룸` detail scrolls into view, `지도에서 보기` returns to the map, and `닫기` hides the detail panel.
- Browser screenshots are saved to `C:\Users\Public\Documents\ESTsoft\CreatorTemp\wgis-stage2-nine-datasets-desktop.png` and `C:\Users\Public\Documents\ESTsoft\CreatorTemp\wgis-stage2-nine-datasets-mobile.png`.
