# WGIS Data Project State

Last updated: 2026-05-13

## Current Goal

Build the first useful WGIS world-history map database with about 150-250 high-value entries.

The long-term target is 3,000+ entries, but the project should progress one focused batch at a time instead of trying to fill every culture, country, and period at once.

## Current Status

- App display index: `data/entries.json`
- Current entry count: 40
- Completed curation batches: 2
- Latest completed batch: `asia-iraq-mesopotamia-early-cities-v1`
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

1. Ancient Egypt: core sites and monuments
   - Possible source file: `data/records/africa/egypt/ancient-egypt-core-sites.json`
   - Likely entries: Memphis, Giza, Saqqara, Thebes, Karnak, Luxor, Valley of the Kings, Amarna, Abu Simbel, Alexandria

2. Indus Civilization: major urban sites
   - Possible source file: `data/records/asia/south-asia/indus-civilization.json`
   - Likely entries: Harappa, Mohenjo-daro, Dholavira, Lothal, Kalibangan, Rakhigarhi, Ganweriwala, Mehrgarh

3. Ancient Greece: early poleis and Panhellenic sanctuaries
   - Possible source file: `data/records/europe/greece/ancient-greece-core-sites.json`
   - Likely entries: Athens, Sparta, Corinth, Thebes, Delphi, Olympia, Knossos, Mycenae, Troy, Miletus

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
