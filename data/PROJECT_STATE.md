# WGIS Data Project State

Last updated: 2026-05-22

## Current Goal

Build the first useful WGIS world-history map database with about 150-250 high-value entries.

The long-term target is 3,000+ entries, but the project should progress one focused batch at a time instead of trying to fill every culture, country, and period at once.

## Current Status

- App display index: `data/entries.json`
- Current entry count: 250
- Completed curation batches: 31
- Latest completed batch: `africa-egypt-late-temple-centers-v1`
- Latest completed infrastructure milestone: stage-2 ten-dataset public usability pass
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

1. Stage-2 eleventh pilot dataset
   - Scope: create another Stage 2 file from Mesoamerica core sites to compare Olmec, Maya, Teotihuacan, and Mexica urban, ritual, political, and long-distance exchange contexts

2. First-stage DB next expansion batch
   - Scope: resume focused first-stage source-record growth if the priority shifts back from Stage 2 modeling to raw coverage

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
