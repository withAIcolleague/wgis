# WGIS Data Project State

Last updated: 2026-05-22

## Current Goal

Build the first useful WGIS world-history map database with about 150-250 high-value entries.

The long-term target is 3,000+ entries, but the project should progress one focused batch at a time instead of trying to fill every culture, country, and period at once.

## Current Status

- App display index: `data/entries.json`
- Current entry count: 283
- Completed curation batches: 35
- Latest completed batch: `asia-china-imperial-buddhist-heritage-sites-v1`
- Latest completed infrastructure milestone: stage-2 thirty-four-dataset public usability pass
- Data authoring guide: `data/DATA_AUTHORING_GUIDE.md`
- Agent instruction entrypoints: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/wgis-data-authoring.mdc`, `.windsurf/rules/wgis-data-authoring.md`
- Data validation script: `scripts/validate-data.js`
- Functional smoke-check script: `scripts/smoke-check.js`
- Stage-2 public usability script: `scripts/stage2-public-usability-check.mjs`
- Data quality floor: every app entry must have `curationBatch` and at least one valid `sources` URL

## Completed

- 5-continent country classification database
  - File: `data/continents-countries.json`
  - Scope: 193 UN member states plus 2 UN General Assembly observer states
  - Total: 195 countries

- Data taxonomy and source-record structure
  - File: `data/taxonomy.json`
  - Source records root: `data/records/`
  - App-compatible display index: `data/entries.json`

- Data authoring guide for AI agents
  - File: `data/DATA_AUTHORING_GUIDE.md`
  - Agent entrypoints: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.github/instructions/wgis-data.instructions.md`, `.cursor/rules/wgis-data-authoring.mdc`, `.windsurf/rules/wgis-data-authoring.md`, `.windsurfrules`, `.agent/rules/wgis-data-authoring.md`
  - Scope: batch planning, source record shape, app index reflection, curation batch metadata, source policy, validation checklist

- Ethiopia human origins batch
  - Batch ID: `africa-ethiopia-human-origins-v1`
  - Source file: `data/records/africa/ethiopia/human-origins.json`
  - Entries added: 8
  - Entry IDs:
    - `ardi-aramis`
    - `lucy-hadar`
    - `selam-dikika`
    - `dikika-cutmarked-bones`
    - `gona-oldowan-tools`
    - `ledi-geraru-ld-350-1`
    - `herto-homo-sapiens-idaltu`
    - `omo-kibish-omo-i`

- Data validation script
  - File: `scripts/validate-data.js`
  - Checks: JSON parsing, duplicate IDs, coordinates, taxonomy references, required sources, required curation batches, source record links, and source-record/app-index field consistency

- Pre-stage-2 stabilization
  - Files: `package.json`, `.github/workflows/validate.yml`, `vercel.json`, `app.js`, `styles.css`
  - Scope: npm validation script, GitHub Actions data validation, Vercel security headers, mobile result-list scrolling, map/detail popup close controls

- First-stage functional smoke review
  - Files: `scripts/smoke-check.js`, `docs/first-stage-functional-review.md`, `package.json`
  - Commands: `npm run smoke`, `npm run check`
  - Scope: data count floor, representative entries, search controls, filter panel, pagination, marker label click wiring, popup/detail close controls, Google links, desktop/mobile scroll contracts

- Stage-2 visual preview
  - Files: `stage2-preview.html`, `stage2-preview.css`, `stage2-preview.js`, `data/stage2/atlantic-revolutions-preview.json`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: visual comparison between current map data and proposed Stage 2 context model, using the Atlantic revolutions sample entries
  - Model demonstrated: multi-context links, detailed period path, user-facing filters, research tags, and source-confidence status

- Stage-2 schema validation
  - Files: `data/stage2/schema.json`, `scripts/validate-stage2.js`, `docs/stage2-schema.md`, `package.json`
  - Commands: `npm run validate:stage2`, `npm run check`
  - Scope: required Stage 2 fields, context ID integrity, parent context references, entry links back to `data/entries.json`, UI filter option validation, coordinates, and source-confidence metadata

- Stage-2 human origins pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/ethiopia-human-origins-preview.json`, `stage2-preview.html`, `stage2-preview.js`, `stage2-preview.css`
  - URL path: `/stage2-preview.html`
  - Scope: add the Ethiopia human-origins batch as a second Stage 2 preview dataset alongside Atlantic revolutions
  - Model stress test: prehistoric periods, approximate fossil coordinates, artifact-heavy display type, evolution contexts, behavior evidence, and early Homo sapiens contexts

- Stage-2 Mesopotamia early cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/mesopotamia-early-cities-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add an ancient urban civilization dataset as a third Stage 2 preview dataset
  - Model stress test: city/site-heavy data, sacred cities, city-states, imperial capitals, and approximate location handling for Akkad and some early city territories

- Stage-2 Egypt ancient core pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/egypt-ancient-core-preview.json`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a fourth Stage 2 preview dataset using the existing ancient Egypt core and late temple entries
  - Model stress test: royal capitals, pyramid and Theban funerary landscapes, temple complexes, Amarna reform, Nubian frontier monuments, Ptolemaic-Roman temple networks, and Hellenistic Mediterranean port contexts

- Stage-2 four-dataset usability pass
  - Files: `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: verify public preview behavior after adding the fourth dataset
  - Checked: dataset switching, search, context filtering, detail panel rendering, stale marker/label cleanup, and mobile entry-list scrolling
  - Result: public browser pass completed for 4 datasets and 40 Stage 2 preview entries

- Stage-2 Indus Civilization pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/indus-civilization-preview.json`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a fifth Stage 2 preview dataset using the existing Indus Civilization major urban sites batch
  - Model stress test: early farming roots, mature Harappan urban planning, Indus river core cities, Ghaggar-Hakra/eastern settlements, Gujarat maritime and water-management sites, craft/trade standardization, and underexplored Cholistan large-site handling

- Stage-2 five-dataset usability pass
  - Files: `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: verify public preview behavior after adding the fifth dataset
  - Checked: 5-dataset switching, Indus search/filter/detail behavior, stale marker/label cleanup, and mobile entry-list scrolling
  - Result: public browser pass completed for 5 datasets and 48 Stage 2 preview entries

- Stage-2 Early China core pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/early-china-core-preview.json`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a sixth Stage 2 preview dataset using the existing early China Yellow River and Bronze Age core sites batch
  - Model stress test: Yellow River Neolithic settlements, lower Yangtze Liangzhu water-management polity, Longshan late Neolithic political centers, Erlitou early Bronze Age urbanism, early Shang capital networks, late Shang writing and bronze ritual state, and Sichuan Basin regional Bronze Age civilization

- Stage-2 six-dataset usability pass
  - Files: `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: verify public preview behavior after adding the sixth dataset
  - Checked: 6-dataset switching, Early China search/filter/detail behavior, stale marker/label cleanup, and mobile entry-list scrolling
  - Result: public browser pass completed for 6 datasets and 56 Stage 2 preview entries

- Stage-2 compact context filter refinement
  - Files: `stage2-preview.js`, `stage2-preview.css`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: reduce visible context-filter footprint as the Stage 2 preview grows beyond a few datasets
  - Checked: compact filter default state, hidden-context expansion, active-context preservation after selection, dataset switching, search, marker cleanup, and mobile entry-list scrolling
  - Result: browser pass completed for compact filters across 6 datasets and 56 Stage 2 preview entries

- Stage-2 Ancient Greece core pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/ancient-greece-core-preview.json`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a seventh Stage 2 preview dataset using the existing ancient Greece core sites batch
  - Model stress test: Aegean Bronze Age palatial worlds, Mycenaean fortress and epic memory, classical polis civic centers, Peloponnesian power centers, Panhellenic sanctuaries and games, Aegean-Anatolian crossroads, and Ionian maritime knowledge networks

- Stage-2 seven-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `package.json`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: make the public Stage 2 preview browser check repeatable after adding the seventh dataset
  - Checked: 7-dataset selector, expected entry/marker/label counts across 66 Stage 2 preview entries, compact context filters, Ancient Greece search/detail/context behavior, stale Greek marker cleanup, and mobile entry-list scrolling
  - Result: public headless Chrome pass completed; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\`

- Stage-2 detail-flow refinement
  - Files: `stage2-preview.js`, `stage2-preview.css`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: make the Stage 2 detail panel easier to close, return from, and use on mobile after adding more datasets
  - Checked: hidden empty-detail state, detail `지도에서 보기` action, detail `닫기` action, Escape close wiring, current search marker preservation after close, mobile detail scroll-into-view, mobile map-return flow, stale map-animation cleanup after dataset switching, and removal of blank space below the hidden mobile detail panel
  - Result: local and public browser passes completed for 7 datasets and 66 Stage 2 preview entries

- Stage-2 Achaemenid Persia core pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/achaemenid-persia-core-preview.json`, `stage2-preview.js`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add an eighth Stage 2 preview dataset using the existing Achaemenid Persia core imperial sites batch
  - Model stress test: Persian royal capitals, ceremonial palace landscapes, Elamite and Median inheritance, imperial inscriptions and kingship, royal road/satrapal administration, and western Anatolian frontier satrapies

- Stage-2 eight-dataset public usability pass
  - Files: `stage2-preview.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the eighth dataset
  - Checked: 8-dataset selector, expected entry/marker/label counts across 74 Stage 2 preview entries, compact context filters, Achaemenid Persia search/detail/context behavior, stale Persian marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 8 datasets and 74 Stage 2 preview entries

- Stage-2 Roman Republic and Empire core pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/roman-empire-core-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a ninth Stage 2 preview dataset using the existing Roman Republic and Empire core sites batch
  - Model stress test: capital political spaces, imperial palace landscapes, Italian urban life, Vesuvius preservation, Mediterranean ports and grain logistics, Punic-Roman Africa, Britain/Rhine frontiers, and late antique western capitals

- Stage-2 nine-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the ninth dataset
  - Checked: 9-dataset selector, expected entry/marker/label counts across 82 Stage 2 preview entries, compact context filters, Roman search/detail/context behavior, stale Roman marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 9 datasets and 82 Stage 2 preview entries

- Stage-2 Magadha and Maurya core pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/magadha-maurya-core-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a tenth Stage 2 preview dataset using the existing Magadha and Maurya core sites batch
  - Model stress test: Magadha state formation, Pataliputra imperial administration, Buddhist sacred geography, Ashokan monuments and edicts, Gandhara learning networks, Kalinga War memory, and Mauryan rock-cut architecture

- Stage-2 ten-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the tenth dataset
  - Checked: 10-dataset selector, expected entry/marker/label counts across 90 Stage 2 preview entries, compact context filters, Magadha-Maurya search/detail/context behavior, stale Magadha-Maurya marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 10 datasets and 90 Stage 2 preview entries

- Stage-2 Mesoamerica core pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/mesoamerica-core-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add an eleventh Stage 2 preview dataset using the existing Mesoamerica core sites batch
  - Model stress test: Olmec formative centers, Preclassic Maya urbanism, Classic Maya dynastic rivalry, Yucatan Postclassic ritual/astronomy, Teotihuacan planned metropolis, Mexica imperial capital, and long-distance exchange/ritual networks

- Stage-2 eleven-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the eleventh dataset
  - Checked: 11-dataset selector, expected entry/marker/label counts across 98 Stage 2 preview entries, compact context filters, Mesoamerica search/detail/context behavior, stale Mesoamerica marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 11 datasets and 98 Stage 2 preview entries

- Stage-2 West African early states and trade networks pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/west-africa-early-states-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twelfth Stage 2 preview dataset using the existing West African early states and trade networks batch
  - Model stress test: Middle Niger inland urbanism, trans-Saharan gold-salt trade, Ghana/Wagadu power centers, Mali-Songhai Islamic learning cities, Yoruba sacred kingship, Edo-Benin court art, and Igbo-Ukwu metalwork exchange

- Stage-2 twelve-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the twelfth dataset
  - Checked: 12-dataset selector, expected entry/marker/label counts across 106 Stage 2 preview entries, compact context filters, West Africa search/detail/context behavior, stale West Africa marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 12 datasets and 106 Stage 2 preview entries

- Stage-2 Andean early states and Inca core sites pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/andean-core-sites-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a thirteenth Stage 2 preview dataset using the existing Andean early states and Inca core sites batch
  - Model stress test: Norte Chico/Caral early urbanism, Chavin ritual landscapes, Moche north-coast ritual power, Chimu Chan Chan urbanism, Tiwanaku highland networks, Cusco royal capital ritual, Inca mountain estates, and coast-highland exchange

- Stage-2 thirteen-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the thirteenth dataset
  - Checked: 13-dataset selector, expected entry/marker/label counts across 114 Stage 2 preview entries, compact context filters, Andes search/detail/context behavior, stale Andes marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 13 datasets and 114 Stage 2 preview entries

- Stage-2 Southeast Asian early states and temple networks pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/southeast-asia-early-states-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a fourteenth Stage 2 preview dataset using the existing Southeast Asian early states and temple networks batch
  - Model stress test: Mekong delta Funan/Oc Eo exchange, Champa My Son temple valleys, Khmer Angkor imperial landscapes, Central Java Buddhist-Hindu temple networks, Pagan/Bagan Theravada landscapes, and Sukhothai-Ayutthaya urban states

- Stage-2 fourteen-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the fourteenth dataset
  - Checked: 14-dataset selector, expected entry/marker/label counts across 122 Stage 2 preview entries, compact context filters, Southeast Asia search/detail/context behavior, stale Southeast Asia marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 14 datasets and 122 Stage 2 preview entries

- Stage-2 Maya lowland and Postclassic networks pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/maya-lowland-postclassic-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a fifteenth Stage 2 preview dataset using the existing Maya lowland and Postclassic networks batch
  - Model stress test: Classic Maya dynastic centers, Usumacinta river cities, Puuc architecture, Postclassic Mayapan politics, eastern Yucatan sacbe networks, Bonampak painted court scenes, and Caribbean coastal trade/pilgrimage ports

- Stage-2 fifteen-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the fifteenth dataset
  - Checked: 15-dataset selector, expected entry/marker/label counts across 130 Stage 2 preview entries, compact context filters, Maya search/detail/context behavior, stale Maya marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 15 datasets and 130 Stage 2 preview entries

- Stage-2 Swahili Coast trade cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/swahili-coast-trade-cities-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a sixteenth Stage 2 preview dataset using the existing Swahili Coast trade cities batch
  - Model stress test: East African city-states, Indian Ocean exchange, coral-stone urbanism, Islamic mercantile networks, Portuguese fortified harbor competition, and Kilwa-Sofala-Great Zimbabwe gold-route connections

- Stage-2 sixteen-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the sixteenth dataset
  - Checked: 16-dataset selector, expected entry/marker/label counts across 138 Stage 2 preview entries, compact context filters, Swahili Coast search/detail/context behavior, stale Swahili marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 16 datasets and 138 Stage 2 preview entries

- Stage-2 Lapita and Pacific settlement landscapes pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/lapita-pacific-settlement-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a seventeenth Stage 2 preview dataset using the existing Lapita and Pacific settlement core sites batch
  - Model stress test: Lapita expansion, Polynesian navigation, ceremonial landscapes, island settlement routes, Oceania exchange networks, and Pacific island power/ritual centers

- Stage-2 seventeen-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the seventeenth dataset
  - Checked: 17-dataset selector, expected entry/marker/label counts across 146 Stage 2 preview entries, compact context filters, Lapita/Pacific search/detail/context behavior, stale Pacific marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 17 datasets and 146 Stage 2 preview entries

- Stage-2 North American Indigenous mound and urban centers pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/north-america-indigenous-mound-urban-centers-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add an eighteenth Stage 2 preview dataset using the existing North American Indigenous mound and urban centers batch
  - Model stress test: Poverty Point earthworks, Ohio Valley effigy mounds, Ancestral Pueblo architecture, Chacoan roads and ritual centers, Mississippian urbanism, Cahokia, southeastern chiefdom centers, and Caddoan-Mississippian exchange networks

- Stage-2 eighteen-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the eighteenth dataset
  - Checked: 18-dataset selector, expected entry/marker/label counts across 154 Stage 2 preview entries, compact context filters, North America search/detail/context behavior, stale North America marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 18 datasets and 154 Stage 2 preview entries

- Stage-2 Indian Ocean trade ports and entrepots pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/indian-ocean-trade-ports-entrepots-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a nineteenth Stage 2 preview dataset using the existing Indian Ocean trade ports and entrepots batch
  - Model stress test: Red Sea and Aden Gulf gateways, Persian Gulf Islamic entrepots, Malabar spice ports, Roman-Indian trade, Straits of Malacca entrepot politics, Song-Yuan maritime Silk Road, and long-distance spice, horse, textile, pearl, and ceramic exchange

- Stage-2 nineteen-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the nineteenth dataset
  - Checked: 19-dataset selector, expected entry/marker/label counts across 162 Stage 2 preview entries, compact context filters, Indian Ocean search/detail/context behavior, stale Indian Ocean marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 19 datasets and 162 Stage 2 preview entries

- Stage-2 early modern exploration and colonial port cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/early-modern-exploration-colonial-port-cities-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twentieth Stage 2 preview dataset using the existing Atlantic exploration and colonial port cities batch
  - Model stress test: Iberian oceanic expansion, Portuguese Atlantic-Indian Ocean route making, Spanish Indies trade administration, Seville-Cadiz Casa de Contratacion shift, northern European commercial ports, Caribbean fortified fleet ports, and Atlantic colonial commerce and violence

- Stage-2 twenty-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the twentieth dataset
  - Checked: 20-dataset selector, expected entry/marker/label counts across 170 Stage 2 preview entries, compact context filters, Early Modern ports search/detail/context behavior, stale Early Modern marker cleanup, deterministic map reframing after detail zoom, mobile entry-list scrolling, mobile detail map-return flow, and hidden-detail close behavior
  - Result: local and public browser passes completed for 20 datasets and 170 Stage 2 preview entries

- Stage-2 early modern Southeast Asian maritime sultanates and port cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/early-modern-southeast-asia-maritime-sultanates-port-cities-preview.json`, `scripts/smoke-check.js`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-first Stage 2 preview dataset using the existing early modern Southeast Asian maritime sultanates and colonial port cities batch
  - Model stress test: post-Malacca Straits sultanate rivalry, Aceh pepper and Islamic oceanic networks, Johor riverine kingship, Brunei riverine sultanate, Makassar free-port spice transit, Maluku clove sultanates, Manila galleon exchange, VOC Batavia, and colonial-company fortified port cities

- Stage-2 twenty-one-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the public Stage 2 preview browser check repeatable after adding the twenty-first dataset
  - Checked: 21 indexed dataset endpoints and expected entry counts across 178 Stage 2 preview entries; when headless Chrome is available, the same script probes rendered URL states for compact context filters, early modern Southeast Asian maritime search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: local endpoint verification completed for 21 datasets and 178 Stage 2 preview entries; the current Windows sandbox reports `browserProbe: "skipped"` because the installed Chrome/Edge headless GPU process exits before DOM/screenshot capture

- Stage-2 early modern East Asian ports and treaty cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/early-modern-east-asia-ports-treaty-cities-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-second Stage 2 preview dataset using the existing East Asian early modern ports and treaty-era cities batch
  - Model stress test: Nagasaki and Dejima restricted trade, Dutch/VOC knowledge channels, Guangzhou Canton-system commerce, Portuguese Macau entrepot urbanism, Shanghai treaty-port concessions, Yokohama open-port infrastructure, and Korean Busan/Incheon open-port treaty networks

- Stage-2 twenty-two-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the twenty-second dataset
  - Checked: 22 indexed dataset endpoints and expected entry counts across 186 Stage 2 preview entries, compact context filters, East Asian ports search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 22 datasets and 186 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\`

- Stage-2 early modern gunpowder empire capitals pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/early-modern-gunpowder-empire-capitals-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-third Stage 2 preview dataset using the existing early modern gunpowder empire capitals batch
  - Model stress test: Ottoman Istanbul and Topkapi court administration, Safavid Isfahan and Naqsh-e Jahan square/market/ritual planning, Mughal Agra and Fatehpur Sikri capital experiments, Shah Jahan's Delhi Red Fort, Lahore frontier court and Shalimar garden landscape, and world-heritage palace preservation

- Stage-2 twenty-three-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the twenty-third dataset
  - Checked: 23 indexed dataset endpoints and expected entry counts across 194 Stage 2 preview entries, compact context filters, gunpowder empires search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 23 datasets and 194 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Stage-2 Central Asian Silk Road and oasis cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/central-asia-silk-road-oasis-cities-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-fourth Stage 2 preview dataset using the existing Central Asian Silk Road and oasis cities batch
  - Model stress test: Samarkand and Bukhara Transoxiana learning/crossroad cities, Merv and Khiva layered Khorasan/Khorezm oasis urbanism, Otrar Syr Darya crossroads and Mongol invasion memory, Kashgar western Tarim crossroads, Turfan/Gaochang Buddhist-Uighur oasis, Dunhuang Mogao Buddhist cave corridor, and world-heritage oasis preservation

- Stage-2 twenty-four-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the twenty-fourth dataset
  - Checked: 24 indexed dataset endpoints and expected entry counts across 202 Stage 2 preview entries, compact context filters, Central Asian oasis search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 24 datasets and 202 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Stage-2 Islamic caliphate and knowledge cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/islamic-caliphate-knowledge-cities-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-fifth Stage 2 preview dataset using the existing Islamic caliphate and knowledge cities batch
  - Model stress test: Abbasid Baghdad and House of Wisdom memory, Umayyad Damascus and pilgrimage routes, Samarra planned caliphal capital, Fatimid-Mamluk Cairo learning and craft quarters, Cordoba and Andalusi knowledge transfer, Kairouan Maliki mosque city, Fez/Qarawiyyin madrasa-medina networks, Nishapur Khorasan craft and scholarly urbanism, and world-heritage medieval Islamic city preservation

- Stage-2 twenty-five-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the twenty-fifth dataset
  - Checked: 25 indexed dataset endpoints and expected entry counts across 210 Stage 2 preview entries, compact context filters, Islamic knowledge-city search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 25 datasets and 210 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Stage-2 European medieval trade and urban networks pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/europe-medieval-trade-urban-networks-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-sixth Stage 2 preview dataset using the existing European medieval trade and urban networks batch
  - Model stress test: Venice lagoon and Levant trade, Genoese western Mediterranean and Black Sea finance, Bruges cloth/market/early finance exchange, Lubeck Hanseatic law and Baltic brokerage, Novgorod Rus river-Hanseatic contact, Visby Gotland warehouse city, Bergen Bryggen stockfish kontor, Dubrovnik/Ragusa Adriatic-Balkan diplomacy, and world-heritage commercial city preservation

- Stage-2 twenty-six-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the twenty-sixth dataset
  - Checked: 26 indexed dataset endpoints and expected entry counts across 218 Stage 2 preview entries, compact context filters, European medieval trade search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 26 datasets and 218 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Stage-2 East Asian medieval capitals and knowledge cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/east-asia-medieval-capitals-knowledge-cities-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-seventh Stage 2 preview dataset using the existing East Asian medieval capitals and knowledge cities batch
  - Model stress test: Tang Changan cosmopolitan grid capital and Silk Road endpoint, Luoyang and Longmen Buddhist imperial patronage, Northern Song Kaifeng commerce and print circulation, Nanjing Jiangnan dynastic capital transitions, Heian-kyo court/Buddhist/literary capital, Nara Heijo-kyo and Shosoin Silk Road traces, Silla Seorabeol royal Buddhist capital, Goryeo Gaegyeong Buddhist-Confucian transition capital, and world-heritage East Asian capital preservation

- Stage-2 twenty-seven-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the twenty-seventh dataset
  - Checked: 27 indexed dataset endpoints and expected entry counts across 226 Stage 2 preview entries, compact context filters, East Asian medieval capital search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 27 datasets and 226 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Stage-2 European Renaissance and early modern science cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/europe-renaissance-science-cities-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-eighth Stage 2 preview dataset using the existing European Renaissance and early modern science cities batch
  - Model stress test: Florence Medici patronage and Accademia del Cimento, Padua university botanical medicine and Galileo, Bologna university law/medicine/anatomy, Pisa Galileo/botanical/mathematics, Rome Lincean Academy and natural history, Leiden university observatory and print network, Paris royal academy/state observatory science, London Royal Society/Gresham/Greenwich experimental philosophy, and preserved world-heritage science landscapes

- Stage-2 twenty-eight-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the twenty-eighth dataset
  - Checked: 28 indexed dataset endpoints and expected entry counts across 234 Stage 2 preview entries, compact context filters, Renaissance science city search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 28 datasets and 234 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Stage-2 modern imperial maritime chokepoints and canal-port cities pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/modern-imperial-chokepoints-canal-port-cities-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a twenty-ninth Stage 2 preview dataset using the existing modern imperial chokepoints and canal-port cities batch
  - Model stress test: Suez Canal steamship route shortening and canal sovereignty, Port Said canal city and Suez Crisis, Singapore Straits Settlements free port, Hong Kong Victoria Harbour and China trade, Colombo Ceylon coaling/transshipment port, Cape Town Table Bay Cape-route supply, Panama Canal American isthmian geopolitics, Gibraltar British naval Mediterranean gateway, and modern maritime chokepoint governance

- Stage-2 twenty-nine-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the twenty-ninth dataset
  - Checked: 29 indexed dataset endpoints and expected entry counts across 242 Stage 2 preview entries, compact context filters, modern imperial chokepoint search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 29 datasets and 242 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Stage-2 Egyptian late temple centers pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/egypt-late-temple-centers-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a thirtieth Stage 2 preview dataset using the existing Egyptian late temple centers batch plus related Egyptian ritual and Hellenistic comparison anchors
  - Model stress test: Theban Karnak-Luxor ritual legacy, Abu Simbel and Philae Nubian frontier/rescue heritage, Alexandria as Hellenistic Ptolemaic capital, Dendera Hathor astronomy and priestly knowledge, Edfu Horus temple texts, Kom Ombo dual cult, Ptolemaic/Roman Nile temple building, and late Egyptian sacred architecture

- Stage-2 thirty-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the thirtieth dataset
  - Checked: 30 indexed dataset endpoints and expected entry counts across 250 Stage 2 preview entries, compact context filters, Egyptian late temple search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 30 datasets and 250 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Korean Three Kingdoms and Unified Silla heritage sites batch
  - Batch ID: `asia-korea-three-kingdoms-silla-heritage-sites-v1`
  - Source file: `data/records/asia/korea/three-kingdoms-silla-heritage-sites.json`
  - Entries added: 9
  - Entry IDs:
    - `gungnae-wandu-koguryo`
    - `koguryo-tomb-king-tongmyong`
    - `gongsanseong-fortress`
    - `songsan-ri-royal-tombs`
    - `busosanseong-gwanbukri`
    - `mireuksa-temple-site`
    - `wolseong-palace-site`
    - `hwangnyongsa-temple-site`
    - `seokguram-bulguksa`

- Stage-2 Korean Three Kingdoms and Unified Silla heritage pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/korea-three-kingdoms-silla-heritage-sites-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a thirty-first Stage 2 preview dataset using the new Korean ancient heritage source batch
  - Model stress test: Goguryeo Gungnae-Wandu fortified capital system and Pyongyang tomb memory, Baekje Ungjin/Sabi/Iksan royal capital network, Silla Gyeongju palace core, Hwangnyongsa royal Buddhist memory, Seokguram-Bulguksa Unified Silla Buddhist architecture, and East Asian heritage transmission

- Stage-2 thirty-one-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the thirty-first dataset
  - Checked: 31 indexed dataset endpoints and expected entry counts across 259 Stage 2 preview entries, compact context filters, Korean ancient heritage search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 31 datasets and 259 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Korean Goryeo and Joseon heritage sites batch
  - Batch ID: `asia-korea-goryeo-joseon-heritage-sites-v1`
  - Source file: `data/records/asia/korea/goryeo-joseon-heritage-sites.json`
  - Entries added: 8
  - Entry IDs:
    - `kaesong-manwoldae-palace`
    - `haeinsa-janggyeong-panjeon`
    - `gyeongbokgung-palace`
    - `jongmyo-shrine`
    - `changdeokgung-palace`
    - `donggureung-royal-tombs`
    - `suwon-hwaseong-fortress`
    - `namhansanseong-fortress`

- Stage-2 Korean Goryeo and Joseon heritage pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/korea-goryeo-joseon-heritage-sites-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a thirty-second Stage 2 preview dataset using the new Korean Goryeo and Joseon heritage source batch
  - Model stress test: Kaesong Manwoldae royal capital landscape, Haeinsa Tripitaka Koreana record repository, Hanyang palace and Jongmyo ritual core, Joseon royal tomb memory landscape, Suwon Hwaseong fortress city, and Namhansanseong mountain emergency-capital defense system

- Stage-2 thirty-two-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the thirty-second dataset
  - Checked: 32 indexed dataset endpoints and expected entry counts across 267 Stage 2 preview entries, compact context filters, Korean Goryeo/Joseon heritage search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 32 datasets and 267 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Japanese ancient, medieval, and early modern heritage sites batch
  - Batch ID: `asia-japan-ancient-medieval-heritage-sites-v1`
  - Source file: `data/records/asia/japan/ancient-medieval-heritage-sites.json`
  - Entries added: 8
  - Entry IDs:
    - `horyuji-temple-area`
    - `todai-ji-temple`
    - `enryaku-ji-mount-hiei`
    - `byodoin-phoenix-hall`
    - `kiyomizu-dera-temple`
    - `itsukushima-shrine`
    - `himeji-castle`
    - `nikko-toshogu-shrine`

- Stage-2 Japanese ancient, medieval, and early modern heritage pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/japan-ancient-medieval-heritage-sites-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a thirty-third Stage 2 preview dataset using the new Japanese heritage source batch
  - Model stress test: Horyuji and Todaiji early state Buddhism, Enryakuji mountain Tendai network, Byodoin Pure Land landscape, Kiyomizu-dera Higashiyama pilgrimage, Itsukushima maritime Shinto sanctuary, Himeji fortified daimyo power, and Nikko Toshogu Tokugawa ritual landscape

- Stage-2 thirty-three-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the thirty-third dataset
  - Checked: 33 indexed dataset endpoints and expected entry counts across 275 Stage 2 preview entries, compact context filters, Japanese heritage search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 33 datasets and 275 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Chinese imperial ritual, defense, and Buddhist heritage sites batch
  - Batch ID: `asia-china-imperial-buddhist-heritage-sites-v1`
  - Source file: `data/records/asia/china/imperial-buddhist-heritage-sites.json`
  - Entries added: 8
  - Entry IDs:
    - `forbidden-city-beijing`
    - `temple-of-heaven-beijing`
    - `summer-palace-beijing`
    - `chengde-mountain-resort`
    - `ming-tombs-beijing`
    - `great-wall-badaling-section`
    - `yungang-grottoes`
    - `dazu-rock-carvings`

- Stage-2 Chinese imperial ritual, defense, and Buddhist heritage pilot dataset
  - Files: `data/stage2/index.json`, `data/stage2/china-imperial-buddhist-heritage-sites-preview.json`, `scripts/smoke-check.js`, `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `/stage2-preview.html`
  - Scope: add a thirty-fourth Stage 2 preview dataset using the new Chinese imperial and Buddhist heritage source batch
  - Model stress test: Forbidden City palace axis, Temple of Heaven state ritual, Summer Palace and Chengde Qing imperial gardens/retreats, Ming Tombs and Great Wall northern defensive landscape, Yungang Northern Wei grottoes, and Dazu Tang-Song syncretic rock carvings

- Stage-2 thirty-four-dataset public usability pass
  - Files: `scripts/stage2-public-usability-check.mjs`, `docs/stage2-preview.md`
  - URL path: `https://wgis.vercel.app/stage2-preview.html`
  - Scope: keep the Stage 2 preview endpoint and browser-state check repeatable after adding the thirty-fourth dataset
  - Checked: 34 indexed dataset endpoints and expected entry counts across 283 Stage 2 preview entries, compact context filters, Chinese imperial heritage search/detail/context behavior, stale-data cleanup, and mobile-sized rendering
  - Result: public endpoint and headless browser verification completed for 34 datasets and 283 Stage 2 preview entries; screenshots saved under `C:\Users\Public\Documents\ESTsoft\CreatorTemp\` when the local headless browser runtime is available

- Legacy core seed normalization batch
  - Batch ID: `legacy-core-seed-v1`
  - Source file: `data/records/global/legacy/core-seed-entries.json`
  - Entries added: 0
  - Entries normalized: 8
  - Entry IDs:
    - `baekje-hanseong`
    - `joseon-hanyang`
    - `imjin-war-busan`
    - `edo-tokyo`
    - `constantinople`
    - `waterloo`
    - `gettysburg`
    - `boston-tea-party`

- Modern imperial chokepoints and canal-port cities batch
  - Batch ID: `global-modern-imperial-chokepoints-canal-port-cities-v1`
  - Source file: `data/records/global/modern/imperial-chokepoints-canal-port-cities.json`
  - Entries added: 8
  - Entry IDs:
    - `suez-canal`
    - `port-said`
    - `singapore-port`
    - `hong-kong-victoria-harbour`
    - `colombo-port`
    - `cape-town-table-bay`
    - `panama-canal`
    - `gibraltar-port`

- Atlantic revolutions and independence capitals batch
  - Batch ID: `atlantic-modern-revolutions-independence-capitals-v1`
  - Source file: `data/records/atlantic/modern/revolutions-independence-capitals.json`
  - Entries added: 8
  - Entry IDs:
    - `philadelphia-independence-hall`
    - `yorktown-battlefield`
    - `paris-bastille`
    - `cap-haitien-cap-francais`
    - `caracas-bolivar-independence`
    - `bogota-casa-del-florero`
    - `buenos-aires-cabildo`
    - `mexico-city-national-palace-independence`
  - Note: `boston-tea-party` remains in the legacy core seed batch to avoid duplicate source-record ownership.

- Ancient Mesopotamia early cities batch
  - Batch ID: `asia-iraq-mesopotamia-early-cities-v1`
  - Source file: `data/records/asia/iraq/mesopotamia-early-cities.json`
  - Entries added: 8 new entries plus 2 existing entries linked to the batch
  - Entry IDs:
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

- Ancient Egypt core sites batch
  - Batch ID: `africa-egypt-ancient-core-sites-v1`
  - Source file: `data/records/africa/egypt/ancient-egypt-core-sites.json`
  - Entries added: 10
  - Entry IDs:
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

- Ancient Egypt late temple centers batch
  - Batch ID: `africa-egypt-late-temple-centers-v1`
  - Source file: `data/records/africa/egypt/late-temple-centers.json`
  - Entries added: 4
  - Entry IDs:
    - `dendera-temple`
    - `edfu-temple`
    - `philae`
    - `kom-ombo-temple`

- Indus Civilization major urban sites batch
  - Batch ID: `asia-south-asia-indus-civilization-v1`
  - Source file: `data/records/asia/south-asia/indus-civilization.json`
  - Entries added: 7 new entries plus 1 existing entry upgraded and linked to the batch
  - Entry IDs:
    - `harappa`
    - `mohenjo-daro`
    - `dholavira`
    - `lothal`
    - `kalibangan`
    - `rakhigarhi`
    - `mehrgarh`
    - `ganweriwala`

- Ancient Greece core sites batch
  - Batch ID: `europe-greece-ancient-core-sites-v1`
  - Source file: `data/records/europe/greece/ancient-greece-core-sites.json`
  - Entries added: 9 new entries plus 1 existing entry upgraded and linked to the batch
  - Entry IDs:
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

- Achaemenid Persia core imperial sites batch
  - Batch ID: `asia-iran-achaemenid-persia-core-sites-v1`
  - Source file: `data/records/asia/iran/achaemenid-persia-core-sites.json`
  - Entries added: 7 new entries plus 1 existing entry upgraded and linked to the batch
  - Entry IDs:
    - `pasargadae`
    - `persepolis`
    - `susa`
    - `ecbatana-hegmataneh`
    - `behistun`
    - `naqsh-e-rostam`
    - `sardis`
    - `daskyleion`
  - Note: `babylon` remains in the Mesopotamia batch to avoid duplicate source-record ownership until multi-batch links are modeled explicitly.

- Early China Yellow River and Bronze Age core sites batch
  - Batch ID: `asia-china-early-china-core-sites-v1`
  - Source file: `data/records/asia/china/early-china-core-sites.json`
  - Entries added: 8
  - Entry IDs:
    - `banpo`
    - `liangzhu-city`
    - `taosi`
    - `erlitou`
    - `yanshi-shang-city`
    - `zhengzhou-shang-city`
    - `yinxu-anyang`
    - `sanxingdui`

- Roman Republic and Empire core sites batch
  - Batch ID: `europe-roman-empire-core-sites-v1`
  - Source file: `data/records/europe/roman-empire/roman-core-sites.json`
  - Entries added: 6 new entries plus 2 existing entries upgraded and linked to the batch
  - Entry IDs:
    - `roman-forum`
    - `palatine-hill`
    - `pompeii`
    - `ostia-antica`
    - `ravenna`
    - `carthage`
    - `hadrians-wall`
    - `trier-roman-monuments`

- Magadha and Maurya core sites batch
  - Batch ID: `asia-south-asia-magadha-maurya-core-sites-v1`
  - Source file: `data/records/asia/south-asia/magadha-maurya-core-sites.json`
  - Entries added: 7 new entries plus 1 existing entry upgraded and linked to the batch
  - Entry IDs:
    - `rajgir-rajagriha`
    - `pataliputra`
    - `bodh-gaya`
    - `sarnath`
    - `sanchi`
    - `taxila`
    - `dhauli`
    - `barabar-caves`

- Mesoamerica core sites batch
  - Batch ID: `americas-mesoamerica-core-sites-v1`
  - Source file: `data/records/americas/mesoamerica/mesoamerica-core-sites.json`
  - Entries added: 7 new entries plus 1 existing entry upgraded and linked to the batch
  - Entry IDs:
    - `san-lorenzo-tenochtitlan`
    - `la-venta`
    - `el-mirador`
    - `tikal`
    - `calakmul`
    - `chichen-itza`
    - `teotihuacan`
    - `tenochtitlan`

- West African early states and trade networks batch
  - Batch ID: `africa-west-africa-early-states-v1`
  - Source file: `data/records/africa/west-africa/west-africa-early-states.json`
  - Entries added: 7 new entries plus 1 existing entry upgraded and linked to the batch
  - Entry IDs:
    - `jenne-jeno`
    - `timbuktu`
    - `gao`
    - `koumbi-saleh`
    - `aoudaghost`
    - `ife`
    - `benin-city`
    - `igbo-ukwu`

- Andean early states and Inca core sites batch
  - Batch ID: `americas-andes-core-sites-v1`
  - Source file: `data/records/americas/andes/andean-core-sites.json`
  - Entries added: 7 new entries plus 1 existing entry upgraded and linked to the batch
  - Entry IDs:
    - `caral`
    - `chavin-de-huantar`
    - `moche-huacas`
    - `chan-chan`
    - `tiwanaku`
    - `cusco`
    - `machu-picchu`
    - `sacsayhuaman`

- Southeast Asian early states and temple networks batch
  - Batch ID: `asia-southeast-asia-early-states-temple-networks-v1`
  - Source file: `data/records/asia/southeast-asia/early-states-temple-networks.json`
  - Entries added: 7 new entries plus 1 existing entry upgraded and linked to the batch
  - Entry IDs:
    - `oc-eo`
    - `my-son`
    - `angkor`
    - `borobudur`
    - `prambanan`
    - `bagan`
    - `sukhothai`
    - `ayutthaya`

- Maya lowland and Postclassic networks batch
  - Batch ID: `americas-mesoamerica-maya-postclassic-networks-v1`
  - Source file: `data/records/americas/mesoamerica/maya-postclassic-networks.json`
  - Entries added: 8
  - Entry IDs:
    - `palenque`
    - `copan`
    - `uxmal`
    - `mayapan`
    - `coba`
    - `bonampak`
    - `yaxchilan`
    - `tulum`

- East African Swahili coast trade cities batch
  - Batch ID: `africa-east-africa-swahili-coast-trade-cities-v1`
  - Source file: `data/records/africa/east-africa/swahili-coast-trade-cities.json`
  - Entries added: 8
  - Entry IDs:
    - `kilwa-kisiwani`
    - `songo-mnara`
    - `fort-jesus-mombasa`
    - `gedi`
    - `lamu-old-town`
    - `zanzibar-stone-town`
    - `sofala`
    - `great-zimbabwe`

- Central Asian Silk Road and oasis cities batch
  - Batch ID: `asia-central-asia-silk-road-oasis-cities-v1`
  - Source file: `data/records/asia/central-asia/silk-road-oasis-cities.json`
  - Entries added: 8
  - Entry IDs:
    - `samarkand`
    - `bukhara`
    - `merv`
    - `khiva-itchan-kala`
    - `otrar`
    - `kashgar`
    - `turfan-gaochang`
    - `dunhuang-mogao-caves`

- North American Indigenous mound and urban centers batch
  - Batch ID: `americas-north-america-indigenous-mound-urban-centers-v1`
  - Source file: `data/records/americas/north-america/indigenous-mound-urban-centers.json`
  - Entries added: 8
  - Entry IDs:
    - `cahokia-mounds`
    - `chaco-canyon`
    - `mesa-verde`
    - `poverty-point`
    - `serpent-mound`
    - `etowah-mounds`
    - `spiro-mounds`
    - `moundville`

- Oceania Lapita and Pacific settlement core sites batch
  - Batch ID: `oceania-pacific-lapita-settlement-core-sites-v1`
  - Source file: `data/records/oceania/pacific/lapita-pacific-settlement-core-sites.json`
  - Entries added: 8
  - Entry IDs:
    - `foue-peninsula-lapita`
    - `teouma`
    - `talepakemalai`
    - `nukuleka-lapita`
    - `mulifanua-lapita`
    - `nan-madol`
    - `rapa-nui`
    - `taputapuatea`

- European medieval trade and urban networks batch
  - Batch ID: `europe-medieval-trade-urban-networks-v1`
  - Source file: `data/records/europe/medieval/medieval-trade-urban-networks.json`
  - Entries added: 8
  - Entry IDs:
    - `venice`
    - `genoa`
    - `bruges`
    - `lubeck`
    - `novgorod`
    - `visby`
    - `bergen-bryggen`
    - `dubrovnik`

- Islamic caliphate and knowledge cities batch
  - Batch ID: `islamic-caliphate-knowledge-cities-v1`
  - Source file: `data/records/asia/southwest-asia/islamic-caliphate-knowledge-cities.json`
  - Entries added: 8
  - Entry IDs:
    - `baghdad`
    - `damascus`
    - `cairo-islamic`
    - `cordoba`
    - `kairouan`
    - `samarra`
    - `nishapur`
    - `fez`

- Indian Ocean trade ports and entrepots batch
  - Batch ID: `indian-ocean-trade-ports-entrepots-v1`
  - Source file: `data/records/indian-ocean/trade-ports-entrepots.json`
  - Entries added: 8
  - Entry IDs:
    - `aden`
    - `hormuz`
    - `basra`
    - `siraf`
    - `calicut`
    - `muziris`
    - `malacca`
    - `quanzhou`

- European Renaissance and early modern science cities batch
  - Batch ID: `europe-renaissance-science-cities-v1`
  - Source file: `data/records/europe/early-modern/renaissance-science-cities.json`
  - Entries added: 8
  - Entry IDs:
    - `florence`
    - `padua`
    - `bologna`
    - `pisa`
    - `rome-renaissance`
    - `leiden`
    - `paris-science`
    - `london-royal-society`

- East Asian medieval capitals and knowledge cities batch
  - Batch ID: `asia-east-asia-medieval-capitals-knowledge-cities-v1`
  - Source file: `data/records/asia/east-asia/medieval-capitals-knowledge-cities.json`
  - Entries added: 4 new entries plus 4 existing entries upgraded and linked to the batch
  - Entry IDs:
    - `changan-xian`
    - `luoyang`
    - `kaifeng`
    - `nanjing`
    - `heian-kyo`
    - `nara`
    - `silla-seorabeol`
    - `goryeo-gaegyeong`

- Atlantic exploration and colonial port cities batch
  - Batch ID: `atlantic-early-modern-exploration-colonial-port-cities-v1`
  - Source file: `data/records/atlantic/early-modern/exploration-colonial-port-cities.json`
  - Entries added: 8
  - Entry IDs:
    - `lisbon`
    - `seville`
    - `cadiz`
    - `porto`
    - `amsterdam`
    - `bristol`
    - `havana`
    - `cartagena-de-indias`

- Early modern gunpowder empire capitals batch
  - Batch ID: `eurasia-early-modern-gunpowder-empire-capitals-v1`
  - Source file: `data/records/eurasia/early-modern/gunpowder-empire-capitals.json`
  - Entries added: 8
  - Entry IDs:
    - `ottoman-istanbul`
    - `topkapi-palace`
    - `safavid-isfahan`
    - `naqsh-e-jahan-square`
    - `agra-fort`
    - `fatehpur-sikri`
    - `red-fort-delhi`
    - `lahore-fort-shalimar`

- East Asian early modern ports and treaty-era cities batch
  - Batch ID: `asia-east-asia-early-modern-ports-treaty-cities-v1`
  - Source file: `data/records/asia/east-asia/early-modern-ports-treaty-cities.json`
  - Entries added: 8
  - Entry IDs:
    - `nagasaki-port`
    - `dejima`
    - `guangzhou-thirteen-factories`
    - `macau-historic-centre`
    - `shanghai-treaty-port`
    - `yokohama-port`
    - `busan-open-port`
    - `incheon-open-port`

- Early modern Southeast Asian maritime sultanates and port cities batch
  - Batch ID: `asia-southeast-asia-early-modern-maritime-sultanates-port-cities-v1`
  - Source file: `data/records/asia/southeast-asia/early-modern-maritime-sultanates-port-cities.json`
  - Entries added: 8
  - Entry IDs:
    - `aceh-banda-aceh`
    - `johor-lama`
    - `brunei-kota-batu`
    - `makassar-gowa-tallo`
    - `ternate-sultanate`
    - `tidore-sultanate`
    - `intramuros-manila`
    - `batavia-jakarta`

## Current Policy

- Work on DB only unless the user explicitly asks for UI changes.
- For DB work, read `data/DATA_AUTHORING_GUIDE.md` before creating or editing records.
- Add data in focused curation batches.
- One batch should cover one country, culture area, period, or research topic.
- Preferred batch size: 8-15 entries.
- Keep `data/entries.json` as the app-compatible display index.
- Keep source records under `data/records/{continent}/{country-or-region}/{topic}.json`.
- Update `data/curation-batches.json` for every completed batch.
- Update this `data/PROJECT_STATE.md` after every meaningful data milestone.
- Every `data/entries.json` item must have `curationBatch` and at least one valid source URL.
- Commit and push after each verified batch or structural data change.
- Run `npm run check` before pushing functional or data milestones.

## Classification Policy

- Modern continent and country are spatial indexes, not the main historical classification.
- Main historical classification should use:
  - historical region
  - culture area
  - period band
  - topic or polity
  - entry type
- Time density matters:
  - Prehistory and ancient history can use broader region and culture-area batches.
  - Medieval and early modern history should split by kingdoms, empires, trade networks, and religious-cultural zones.
  - Modern and contemporary history should be highly selective because source volume grows rapidly.

## Source Policy

- World History Encyclopedia can be used as a reference source.
- Do not bulk crawl or scrape World History Encyclopedia.
- Do not copy WHE prose into WGIS.
- Write independent Korean summaries.
- Add WHE URLs in `sources` when used.
- Cross-check coordinates, dates, and classifications with official, academic, museum, UNESCO, Pleiades, Wikidata, or other reliable sources where possible.

## Next Batch Candidates

1. First-stage DB next expansion batch
   - Scope: continue focused source-record growth with another bounded culture/region/time slice and keep the batch small enough to verify end to end

2. Stage-2 thirty-fifth pilot dataset
   - Scope: optionally model the legacy core seed entries as a cross-regional demonstration set if we want every existing source file to have a Stage 2 preview, while recognizing it is less culturally focused than the newer batches

## Resume Checklist

At the start of a new session:

1. Read `data/PROJECT_STATE.md`.
2. Read `data/DATA_AUTHORING_GUIDE.md`.
3. Check `git status -sb`.
4. Parse and inspect:
   - `data/entries.json`
   - `data/curation-batches.json`
   - `data/taxonomy.json`
5. Pick exactly one next batch with the user or from `Next Batch Candidates`.
6. Research candidates and sources for that batch.
7. Create or update the source record file under `data/records/`.
8. Add app-compatible entries to `data/entries.json`.
9. Add or update the batch in `data/curation-batches.json`.
10. Update this file.
11. Run `node scripts/validate-data.js`.
12. Run `npm run check`.
13. Commit and push to `origin/main`.

## Validation Commands

```bash
node scripts/validate-data.js
npm run smoke
npm run validate:stage2
npm run check
```
