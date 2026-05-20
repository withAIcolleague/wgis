const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const stage2Dir = path.join(root, 'data', 'stage2');
const errors = [];

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

function collectStage2Files() {
  if (!fs.existsSync(stage2Dir)) return [];

  return fs.readdirSync(stage2Dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'schema.json')
    .map(entry => path.join(stage2Dir, entry.name))
    .sort((a, b) => rel(a).localeCompare(rel(b)));
}

function isObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function requiredFields(item, fields, label) {
  for (const field of fields) {
    if (!(field in item)) {
      errors.push(`${label}: missing required field "${field}"`);
    }
  }
}

function requireString(value, label) {
  if (typeof value !== 'string' || value.trim() === '') {
    errors.push(`${label}: must be a non-empty string`);
  }
}

function requireStringArray(value, label, { min = 1 } = {}) {
  if (!Array.isArray(value)) {
    errors.push(`${label}: must be an array`);
    return;
  }
  if (value.length < min) {
    errors.push(`${label}: must contain at least ${min} item(s)`);
  }
  value.forEach((item, index) => {
    if (typeof item !== 'string' || item.trim() === '') {
      errors.push(`${label}[${index}]: must be a non-empty string`);
    }
  });
}

function requireNonNegativeInteger(value, label) {
  if (!Number.isInteger(value) || value < 0) {
    errors.push(`${label}: must be a non-negative integer`);
  }
}

function validateCoordinates(coords, label) {
  if (!isObject(coords) || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') {
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

function assertUnique(items, getKey, label) {
  const seen = new Set();
  for (const item of items) {
    const key = getKey(item);
    if (!key) continue;
    if (seen.has(key)) {
      errors.push(`${label}: duplicate id "${key}"`);
    }
    seen.add(key);
  }
}

function validateUiFilters(uiFilters, filterGroupsById, label) {
  if (!isObject(uiFilters)) {
    errors.push(`${label}: uiFilters must be an object`);
    return;
  }

  for (const [groupId, value] of Object.entries(uiFilters)) {
    const group = filterGroupsById.get(groupId);
    if (!group) {
      errors.push(`${label}: uiFilters has unknown group "${groupId}"`);
      continue;
    }

    const values = Array.isArray(value) ? value : [value];
    if (!values.length) {
      errors.push(`${label}: uiFilters.${groupId} must not be empty`);
    }

    for (const option of values) {
      if (!group.options.includes(option)) {
        errors.push(`${label}: uiFilters.${groupId} option "${option}" is not declared in uiFilterGroups`);
      }
    }
  }
}

function validateStage2File(relativePath, data, schema, entryById) {
  const rootLabel = relativePath;
  requiredFields(data, schema.rootRequiredFields, rootLabel);

  if (data.schemaVersion !== 2) {
    errors.push(`${rootLabel}: schemaVersion must be 2`);
  }
  if (!schema.allowedStatus.includes(data.status)) {
    errors.push(`${rootLabel}: unknown status "${data.status}"`);
  }

  requireString(data.id, `${rootLabel}.id`);
  requireString(data.titleKo, `${rootLabel}.titleKo`);
  requireString(data.descriptionKo, `${rootLabel}.descriptionKo`);

  if (!Array.isArray(data.uiFilterGroups)) {
    errors.push(`${rootLabel}: uiFilterGroups must be an array`);
  }
  if (!Array.isArray(data.contexts)) {
    errors.push(`${rootLabel}: contexts must be an array`);
  }
  if (!Array.isArray(data.entries)) {
    errors.push(`${rootLabel}: entries must be an array`);
  }
  if (!Array.isArray(data.uiFilterGroups) || !Array.isArray(data.contexts) || !Array.isArray(data.entries)) {
    return;
  }

  assertUnique(data.uiFilterGroups, group => group.id, `${rootLabel}.uiFilterGroups`);
  assertUnique(data.contexts, context => context.id, `${rootLabel}.contexts`);
  assertUnique(data.entries, entry => entry.entryId, `${rootLabel}.entries`);

  const filterGroupsById = new Map();
  for (const group of data.uiFilterGroups) {
    const label = `${rootLabel}.uiFilterGroups#${group.id || '(missing id)'}`;
    requireString(group.id, `${label}.id`);
    requireString(group.labelKo, `${label}.labelKo`);
    requireStringArray(group.options, `${label}.options`);

    if (group.id) {
      filterGroupsById.set(group.id, group);
    }
  }

  const contextById = new Map();
  for (const context of data.contexts) {
    const label = `${rootLabel}.contexts#${context.id || '(missing id)'}`;
    requiredFields(context, schema.contextRequiredFields, label);
    requireString(context.id, `${label}.id`);
    requireString(context.labelKo, `${label}.labelKo`);
    if (context.parentId !== null && typeof context.parentId !== 'string') {
      errors.push(`${label}.parentId: must be null or a string`);
    }
    requireString(context.periodKo, `${label}.periodKo`);
    requireString(context.summaryKo, `${label}.summaryKo`);

    if (context.id) {
      contextById.set(context.id, context);
    }
  }

  for (const context of data.contexts) {
    if (context.parentId && !contextById.has(context.parentId)) {
      errors.push(`${rootLabel}.contexts#${context.id}: unknown parentId "${context.parentId}"`);
    }
  }

  for (const entry of data.entries) {
    const label = `${rootLabel}.entries#${entry.entryId || '(missing entryId)'}`;
    requiredFields(entry, schema.entryRequiredFields, label);
    requireString(entry.entryId, `${label}.entryId`);
    requireString(entry.titleKo, `${label}.titleKo`);
    requireString(entry.displayTypeKo, `${label}.displayTypeKo`);
    requireString(entry.modernCountryKo, `${label}.modernCountryKo`);
    validateCoordinates(entry.coordinates, label);
    requireString(entry.yearLabelKo, `${label}.yearLabelKo`);
    requireString(entry.summaryKo, `${label}.summaryKo`);

    const appEntry = entryById.get(entry.entryId);
    if (!appEntry) {
      errors.push(`${label}: entryId is missing from data/entries.json`);
    } else {
      if (entry.titleKo !== appEntry.title) {
        errors.push(`${label}: titleKo differs from data/entries.json title`);
      }
      if (entry.displayTypeKo !== appEntry.type && !['장소', '사건', '유적', '유물·유적'].includes(entry.displayTypeKo)) {
        errors.push(`${label}: displayTypeKo is not a known Korean display type`);
      }
    }

    if (!isObject(entry.stage2)) {
      errors.push(`${label}.stage2: must be an object`);
      continue;
    }

    requiredFields(entry.stage2, schema.stage2RequiredFields, `${label}.stage2`);
    requireString(entry.stage2.primaryContextId, `${label}.stage2.primaryContextId`);
    requireStringArray(entry.stage2.contextIds, `${label}.stage2.contextIds`);
    requireStringArray(entry.stage2.periodPathKo, `${label}.stage2.periodPathKo`, { min: 2 });
    requireStringArray(entry.stage2.topicTagsKo, `${label}.stage2.topicTagsKo`);

    if (!contextById.has(entry.stage2.primaryContextId)) {
      errors.push(`${label}.stage2.primaryContextId: unknown context "${entry.stage2.primaryContextId}"`);
    }
    if (Array.isArray(entry.stage2.contextIds)) {
      if (!entry.stage2.contextIds.includes(entry.stage2.primaryContextId)) {
        errors.push(`${label}.stage2.contextIds: must include primaryContextId`);
      }
      for (const contextId of entry.stage2.contextIds) {
        if (!contextById.has(contextId)) {
          errors.push(`${label}.stage2.contextIds: unknown context "${contextId}"`);
        }
      }
    }

    validateUiFilters(entry.stage2.uiFilters, filterGroupsById, `${label}.stage2`);

    if (!isObject(entry.stage2.sourceConfidence)) {
      errors.push(`${label}.stage2.sourceConfidence: must be an object`);
      continue;
    }
    requiredFields(entry.stage2.sourceConfidence, schema.sourceConfidenceRequiredFields, `${label}.stage2.sourceConfidence`);
    if (!schema.allowedSourceConfidenceTiers.includes(entry.stage2.sourceConfidence.tier)) {
      errors.push(`${label}.stage2.sourceConfidence.tier: unknown tier "${entry.stage2.sourceConfidence.tier}"`);
    }
    requireNonNegativeInteger(entry.stage2.sourceConfidence.officialSources, `${label}.stage2.sourceConfidence.officialSources`);
    requireNonNegativeInteger(entry.stage2.sourceConfidence.referenceSources, `${label}.stage2.sourceConfidence.referenceSources`);
    requireString(entry.stage2.sourceConfidence.noteKo, `${label}.stage2.sourceConfidence.noteKo`);
    if ((entry.stage2.sourceConfidence.officialSources || 0) + (entry.stage2.sourceConfidence.referenceSources || 0) === 0) {
      errors.push(`${label}.stage2.sourceConfidence: must include at least one source count`);
    }
  }
}

function main() {
  const schema = readJson('data/stage2/schema.json');
  const entries = readJson('data/entries.json');
  if (!schema || !entries) return finish();

  if (schema.schemaVersion !== 2) {
    errors.push('data/stage2/schema.json: schemaVersion must be 2');
  }

  const entryById = new Map((entries || []).map(entry => [entry.id, entry]));
  const stage2Files = collectStage2Files();
  let stage2EntryCount = 0;
  if (!stage2Files.length) {
    errors.push('data/stage2: no stage 2 data files found');
  }

  for (const file of stage2Files) {
    const relativePath = rel(file);
    const data = readJson(relativePath);
    if (data) {
      if (Array.isArray(data.entries)) {
        stage2EntryCount += data.entries.length;
      }
      validateStage2File(relativePath, data, schema, entryById);
    }
  }

  finish({
    files: stage2Files.length,
    entries: stage2EntryCount
  });
}

function finish(summary) {
  if (summary) {
    console.log(`stage2 files: ${summary.files}`);
    console.log(`stage2 entries: ${summary.entries}`);
  }

  if (errors.length) {
    for (const error of errors) {
      console.error(`ERROR ${error}`);
    }
    process.exit(1);
  }

  console.log('stage2 validation ok');
}

main();
