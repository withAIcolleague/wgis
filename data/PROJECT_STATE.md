# WGIS Data Project State

Last updated: 2026-05-15

## Current Goal

Build the first useful WGIS world-history map database with about 150-250 high-value entries.

The long-term target is 3,000+ entries, but the project should progress one focused batch at a time instead of trying to fill every culture, country, and period at once.

## Current Status

- App display index: `data/entries.json`
- Current entry count: 101
- Completed curation batches: 10
- Latest completed batch: `americas-mesoamerica-core-sites-v1`
- Latest completed infrastructure milestone: `a28681f Add data validation script`
- Data validation script: `scripts/validate-data.js`

## Completed

- 5-continent country classification database
  - File: `data/continents-countries.json`
  - Scope: 193 UN member states plus 2 UN General Assembly observer states
  - Total: 195 countries

- Data taxonomy and source-record structure
  - File: `data/taxonomy.json`
  - Source records root: `data/records/`
  - App-compatible display index: `data/entries.json`

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
  - Checks: JSON parsing, duplicate IDs, coordinates, taxonomy references, batch links, source record links, and source-record/app-index field consistency

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

## Current Policy

- Work on DB only unless the user explicitly asks for UI changes.
- Add data in focused curation batches.
- One batch should cover one country, culture area, period, or research topic.
- Preferred batch size: 8-15 entries.
- Keep `data/entries.json` as the app-compatible display index.
- Keep source records under `data/records/{continent}/{country-or-region}/{topic}.json`.
- Update `data/curation-batches.json` for every completed batch.
- Update this `data/PROJECT_STATE.md` after every meaningful data milestone.
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

1. West African early states and trade networks
   - Possible source file: `data/records/africa/west-africa/west-africa-early-states.json`
   - Likely entries: Jenne-Jeno, Timbuktu, Gao, Koumbi Saleh, Aoudaghost, Ife, Benin City, Igbo-Ukwu

2. Andean early states and Inca core sites
   - Possible source file: `data/records/americas/andes/andean-core-sites.json`
   - Likely entries: Caral, Chavin de Huantar, Moche Huacas, Chan Chan, Tiwanaku, Cusco, Machu Picchu, Sacsayhuaman

## Resume Checklist

At the start of a new session:

1. Read `data/PROJECT_STATE.md`.
2. Check `git status -sb`.
3. Parse and inspect:
   - `data/entries.json`
   - `data/curation-batches.json`
   - `data/taxonomy.json`
4. Pick exactly one next batch with the user or from `Next Batch Candidates`.
5. Research candidates and sources for that batch.
6. Create or update the source record file under `data/records/`.
7. Add app-compatible entries to `data/entries.json`.
8. Add or update the batch in `data/curation-batches.json`.
9. Update this file.
10. Run `node scripts/validate-data.js`.
11. Commit and push to `origin/main`.

## Validation Commands

```bash
node scripts/validate-data.js
```
