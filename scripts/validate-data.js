const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'data');

const errors = [];
const warnings = [];

function toPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function rel(filePath) {
  return toPosix(path.relative(root, filePath));
}

function readJson(relativePath) {
  const absolutePath = path.join(root, relativePath);
  try {
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  } catch (error) {
    errors.push(`${relativePath}: JSON parse failed (${error.message})`);
    return null;
  }
}

function collectJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(fullPath);
    }
  }
  return files.sort((a, b) => rel(a).localeCompare(rel(b)));
}

function keyBy(items, key, label) {
  const map = new Map();
  for (const item of items || []) {
    if (!item || typeof item !== 'object') {
      errors.push(`${label}: contains a non-object item`);
      continue;
    }
    const value = item[key];
    if (!value) {
      errors.push(`${label}: item is missing ${key}`);
      continue;
    }
    if (map.has(value)) {
      errors.push(`${label}: duplicate ${key} "${value}"`);
      continue;
    }
    map.set(value, item);
  }
  return map;
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateCoordinates(entry, label) {
  const coords = entry.coordinates;
  if (!coords || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') {
    errors.push(`${label}: coordinates must include numeric lat/lng`);
    return;
  }
  if (coords.lat < -90 || coords.lat > 90) {
    errors.push(`${label}: latitude out of range (${coords.lat})`);
  }
  if (coords.lng < -180 || coords.lng > 180) {
    errors.push(`${label}: longitude out of range (${coords.lng})`);
  }
}

function validateSources(item, label, { required = false } = {}) {
  if (!item.sources) {
    if (required) errors.push(`${label}: sources are required`);
    return;
  }
  if (!Array.isArray(item.sources)) {
    errors.push(`${label}: sources must be an array`);
    return;
  }
  if (required && item.sources.length === 0) {
    errors.push(`${label}: sources must include at least one source`);
    return;
  }

  item.sources.forEach((source, index) => {
    if (!source || typeof source !== 'object') {
      errors.push(`${label}: source ${index} must be an object`);
      return;
    }
    if (!source.title) {
      errors.push(`${label}: source ${index} is missing title`);
    }
    if (!source.url || !isValidUrl(source.url)) {
      errors.push(`${label}: source ${index} has invalid url`);
    }
  });
}

function validateDate(record, taxonomy, label) {
  if (!record.date) {
    warnings.push(`${label}: source record has no extended date object`);
    return;
  }
  if (!taxonomy.datePrecisions.has(record.date.precision)) {
    errors.push(`${label}: unknown date precision "${record.date.precision}"`);
  }
  for (const key of ['startYear', 'endYear']) {
    if (key in record.date && record.date[key] !== null && typeof record.date[key] !== 'number') {
      errors.push(`${label}: date.${key} must be a number or null`);
    }
  }
}

function validateTaxonomyRefs(record, taxonomy, label) {
  if (!taxonomy.entryTypes.has(record.type)) {
    errors.push(`${label}: unknown type "${record.type}"`);
  }
  if (!taxonomy.confidences.has(record.confidence)) {
    errors.push(`${label}: unknown confidence "${record.confidence}"`);
  }

  if (record.classification) {
    if (!taxonomy.periodBands.has(record.classification.periodBand)) {
      errors.push(`${label}: unknown periodBand "${record.classification.periodBand}"`);
    }
    if (!taxonomy.selectionTiers.has(record.classification.selectionTier)) {
      errors.push(`${label}: unknown selectionTier "${record.classification.selectionTier}"`);
    }
  }

  if (record.spatial) {
    if (!taxonomy.continents.has(record.spatial.continentId)) {
      errors.push(`${label}: unknown continentId "${record.spatial.continentId}"`);
    }
    if (!taxonomy.iso2Countries.has(record.spatial.modernCountryIso2)) {
      errors.push(`${label}: unknown modernCountryIso2 "${record.spatial.modernCountryIso2}"`);
    }
  }
}

function makeTaxonomyIndexes(taxonomyData, continentsData) {
  const continents = new Set((continentsData.continents || []).map(continent => continent.id));
  const iso2Countries = new Set(
    (continentsData.continents || []).flatMap(continent =>
      (continent.countries || []).map(country => country.iso2)
    )
  );

  return {
    requiredLegacyFields: taxonomyData.recordShape?.requiredLegacyFields || [],
    entryTypes: new Set((taxonomyData.entryTypes || []).map(item => item.id)),
    periodBands: new Set((taxonomyData.periodBands || []).map(item => item.id)),
    datePrecisions: new Set((taxonomyData.datePrecision || []).map(item => item.id)),
    confidences: new Set((taxonomyData.confidence || []).map(item => item.id)),
    selectionTiers: new Set((taxonomyData.selectionTiers || []).map(item => item.id)),
    continents,
    iso2Countries
  };
}

function main() {
  const entries = readJson('data/entries.json');
  const batchesData = readJson('data/curation-batches.json');
  const taxonomyData = readJson('data/taxonomy.json');
  const continentsData = readJson('data/continents-countries.json');
  if (!entries || !batchesData || !taxonomyData || !continentsData) return finish();

  if (!Array.isArray(entries)) {
    errors.push('data/entries.json: expected an array');
    return finish();
  }

  const taxonomy = makeTaxonomyIndexes(taxonomyData, continentsData);
  const entryById = keyBy(entries, 'id', 'data/entries.json');
  const batchById = keyBy(batchesData.batches || [], 'id', 'data/curation-batches.json');

  for (const entry of entries) {
    const label = `entry ${entry.id || '(missing id)'}`;
    for (const field of taxonomy.requiredLegacyFields) {
      if (!(field in entry)) errors.push(`${label}: missing required field "${field}"`);
    }
    validateCoordinates(entry, label);
    validateSources(entry, label, { required: true });
    if (!taxonomy.entryTypes.has(entry.type)) {
      errors.push(`${label}: unknown type "${entry.type}"`);
    }
    if (!taxonomy.confidences.has(entry.confidence)) {
      errors.push(`${label}: unknown confidence "${entry.confidence}"`);
    }
    if (!entry.curationBatch) {
      errors.push(`${label}: curationBatch is required`);
    } else if (!batchById.has(entry.curationBatch)) {
      errors.push(`${label}: unknown curationBatch "${entry.curationBatch}"`);
    }
  }

  const recordFiles = collectJsonFiles(path.join(dataDir, 'records'));
  const sourceRecordIds = new Set();

  for (const recordFile of recordFiles) {
    const relativePath = rel(recordFile);
    const recordData = readJson(relativePath);
    if (!recordData) continue;
    if (!Array.isArray(recordData.records)) {
      errors.push(`${relativePath}: records must be an array`);
      continue;
    }
    if (!recordData.curationBatch) {
      errors.push(`${relativePath}: missing curationBatch`);
    }

    const batch = batchById.get(recordData.curationBatch);
    if (!batch) {
      errors.push(`${relativePath}: curationBatch "${recordData.curationBatch}" not found in data/curation-batches.json`);
    } else if (batch.sourceFile && batch.sourceFile !== relativePath) {
      errors.push(`${relativePath}: batch.sourceFile points to "${batch.sourceFile}"`);
    }

    const localRecordIds = [];
    for (const record of recordData.records) {
      const label = `${relativePath}#${record.id || '(missing id)'}`;
      localRecordIds.push(record.id);

      if (sourceRecordIds.has(record.id)) {
        errors.push(`${label}: duplicate source record id across data/records`);
      }
      sourceRecordIds.add(record.id);

      for (const field of taxonomy.requiredLegacyFields) {
        if (!(field in record)) errors.push(`${label}: missing required field "${field}"`);
      }

      validateCoordinates(record, label);
      validateSources(record, label, { required: true });
      validateDate(record, taxonomy, label);
      validateTaxonomyRefs(record, taxonomy, label);
      if (!record.curationBatch) {
        errors.push(`${label}: curationBatch is required`);
      }

      const appEntry = entryById.get(record.id);
      if (!appEntry) {
        errors.push(`${label}: missing matching entry in data/entries.json`);
        continue;
      }

      for (const field of taxonomy.requiredLegacyFields) {
        if (!deepEqual(record[field], appEntry[field])) {
          errors.push(`${label}: field "${field}" differs from data/entries.json`);
        }
      }

      for (const field of ['aliases', 'sources', 'curationBatch']) {
        if (field in record && !deepEqual(record[field], appEntry[field])) {
          errors.push(`${label}: field "${field}" differs from data/entries.json`);
        }
      }
    }

    const seenLocal = new Set();
    for (const id of localRecordIds) {
      if (seenLocal.has(id)) errors.push(`${relativePath}: duplicate local record id "${id}"`);
      seenLocal.add(id);
    }

    if (batch) {
      const batchIds = new Set(batch.entryIds || []);
      const recordIds = new Set(localRecordIds);
      for (const id of batchIds) {
        if (!recordIds.has(id)) errors.push(`${relativePath}: batch.entryIds includes "${id}" but source record does not`);
      }
      for (const id of recordIds) {
        if (!batchIds.has(id)) errors.push(`${relativePath}: source record "${id}" missing from batch.entryIds`);
      }
    }
  }

  for (const batch of batchById.values()) {
    const label = `batch ${batch.id}`;
    if (!Array.isArray(batch.entryIds)) {
      errors.push(`${label}: entryIds must be an array`);
      continue;
    }
    for (const id of batch.entryIds) {
      if (!entryById.has(id)) errors.push(`${label}: entryId "${id}" missing from data/entries.json`);
    }
    if (batch.sourceFile && !fs.existsSync(path.join(root, batch.sourceFile))) {
      errors.push(`${label}: sourceFile does not exist (${batch.sourceFile})`);
    }
  }

  finish({
    entries: entries.length,
    batches: batchById.size,
    sourceFiles: recordFiles.length,
    sourceRecords: sourceRecordIds.size
  });
}

function finish(summary) {
  if (summary) {
    console.log(`entries: ${summary.entries}`);
    console.log(`batches: ${summary.batches}`);
    console.log(`source files: ${summary.sourceFiles}`);
    console.log(`source records: ${summary.sourceRecords}`);
  }

  for (const warning of warnings) {
    console.warn(`WARN ${warning}`);
  }

  if (errors.length) {
    for (const error of errors) {
      console.error(`ERROR ${error}`);
    }
    process.exit(1);
  }

  console.log('data validation ok');
}

main();
