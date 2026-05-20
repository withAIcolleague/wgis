# WGIS Data Project State

Last updated: 2026-05-20

## Current Goal

Build the first useful WGIS world-history map database with about 150-250 high-value entries.

The long-term target is 3,000+ entries, but the project should progress one focused batch at a time instead of trying to fill every culture, country, and period at once.

## Current Status

- App display index: `data/entries.json`
- Current entry count: 246
- Completed curation batches: 30
- Latest completed batch: `atlantic-modern-revolutions-independence-capitals-v1`
- Latest completed infrastructure milestone: pre-stage-2 stabilization
- Data authoring guide: `data/DATA_AUTHORING_GUIDE.md`
- Agent instruction entrypoints: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/wgis-data-authoring.mdc`, `.windsurf/rules/wgis-data-authoring.md`
- Data validation script: `scripts/validate-data.js`
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

1. First-stage closure and functional review
   - Scope: PC/mobile search, filters, pagination, list scrolling, marker labels, small map popup, detail drawer, Google search links, deployment response, and data validation/CI status

2. Stage-2 data model planning
   - Scope: multi-batch entry links, denser period taxonomy, source confidence tiers, and separate UI-facing filter groups

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
12. Commit and push to `origin/main`.

## Validation Commands

```bash
node scripts/validate-data.js
```
