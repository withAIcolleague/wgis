const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const errors = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function check(label, condition, detail = '') {
  if (!condition) {
    errors.push(detail ? `${label}: ${detail}` : label);
  }
}

function includesAll(text, values) {
  return values.every(value => text.includes(value));
}

function countOccurrences(text, pattern) {
  return (text.match(pattern) || []).length;
}

function main() {
  const html = readText('index.html');
  const stage2Html = readText('stage2-preview.html');
  const stage2App = readText('stage2-preview.js');
  const stage2Css = readText('stage2-preview.css');
  const app = readText('app.js');
  const css = readText('styles.css');
  const entries = readJson('data/entries.json');
  const batches = readJson('data/curation-batches.json');
  const stage2Index = readJson('data/stage2/index.json');
  const stage2Datasets = Array.isArray(stage2Index.datasets)
    ? stage2Index.datasets.map(dataset => ({
      metadata: dataset,
      data: readJson(dataset.path)
    }))
    : [];

  check('entries.json is an array', Array.isArray(entries));
  check('first-stage entry floor', entries.length >= 307, `${entries.length} entries found`);
  check('curation batch floor', Array.isArray(batches.batches) && batches.batches.length >= 38);

  const entryIds = new Set(entries.map(entry => entry.id));
  [
    'lucy-hadar',
    'gettysburg',
    'suez-canal',
    'philadelphia-independence-hall',
    'yorktown-battlefield'
  ].forEach(id => {
    check(`representative entry exists (${id})`, entryIds.has(id));
  });

  [
    'map',
    'searchInput',
    'searchButton',
    'clearSearchBtn',
    'filterPanelBtn',
    'filterPanel',
    'typeFilters',
    'regionFilters',
    'resultCount',
    'visibleCountries',
    'pageSizeSelect',
    'prevPageBtn',
    'nextPageBtn',
    'resultsList',
    'detailDrawer',
    'mobileSheetToggle',
    'mobileDetail'
  ].forEach(id => {
    check(`required DOM id exists (${id})`, html.includes(`id="${id}"`));
  });

  ['10', '20', '30', '50'].forEach(size => {
    check(`page size option exists (${size})`, html.includes(`value="${size}"`));
  });

  check('Leaflet assets referenced', includesAll(html, ['leaflet.css', 'leaflet.js']));
  check('local assets referenced', includesAll(html, ['styles.css', 'app.js']));
  check('filter panel starts hidden', html.includes('id="filterPanel"') && html.includes('hidden'));
  check('stage 2 preview is linked from main app', html.includes('stage2-preview.html'));

  check('entries are fetched from app data', app.includes("fetch('data/entries.json')"));
  check('search button executes map search', app.includes("searchButton.addEventListener('click', executeSearch)"));
  check('enter key executes map search', includesAll(app, ["event.key === 'Enter'", 'executeSearch();']));
  check('clear search resets results', includesAll(app, ['clearButton.addEventListener', "input.value = ''"]));
  check('pagination size changes page size', includesAll(app, ['pageSizeSelect.addEventListener', 'pageSize = Number(pageSizeSelect.value)']));
  check('prev and next pagination handlers exist', countOccurrences(app, /addEventListener\('click'/g) >= 7);
  check('search activates marker rendering', includesAll(app, ['mapResultsActive = true', 'update({ fitMap: true })']));
  check('marker source is gated by search or selected entry', includesAll(app, ['function getMarkerEntries()', 'mapResultsActive ? getPageEntries() : []']));
  check('marker labels are permanent', includesAll(app, ['marker.bindTooltip', 'permanent: true']));
  check('main map clears stale marker labels', includesAll(app, ['function clearMarkers()', 'unbindTooltip()', '.leaflet-tooltip.map-point-label']));
  check('marker labels are interactive', includesAll(app, ['interactive: true', "tooltip.on('click'"]));
  check('marker label DOM clicks are wired', includesAll(app, ['function bindTooltipElementClick', 'element.dataset.wgisClickBound', "L.DomEvent.on(element, 'click'"]));
  check('marker label clicks are delegated from map container', includesAll(app, ['function setupMapLabelInteractions()', "closest('.map-point-label[data-entry-id]')", 'setupMapLabelInteractions();']));
  check('label click toggles detail', includesAll(app, ['function handleTooltipClick', 'registerTooltipClick(id)', 'toggleEntryDetail(id)']));
  check('marker click toggles detail', includesAll(app, ['shouldIgnoreMarkerClick(entry.id)', 'toggleEntryDetail(entry.id)']));
  check('map popup close button enabled', includesAll(app, ['marker.bindPopup', 'closeButton: true']));
  check('detail close action wired', includesAll(app, ['data-detail-close', 'clearSelectedEntry();']));
  check('Google search links rendered in popup and detail', countOccurrences(app, /getGoogleSearchUrl\(entry\)/g) >= 2);
  check('app bootstrap calls setup functions', includesAll(app, [
    'setupSearch();',
    'setupPagination();',
    'setupFilterPanel();',
    'setupMobileSheet();',
    'setupDetailActions();',
    'setupFilters();'
  ]));

  check('desktop panel uses fixed app shell height', includesAll(css, ['.app-shell', 'height: 100vh', 'overflow: hidden']));
  check('result list scrolls on desktop', includesAll(css, ['.results-section', 'overflow-y: auto']));
  check('filter panel scrolls independently', includesAll(css, ['.filter-panel', 'overflow-y: auto']));
  check('mobile layout media query exists', css.includes('@media (max-width: 820px)'));
  check('mobile expanded sheet fills viewport', includesAll(css, ['.search-panel.mobile-sheet-expanded', 'height: 100dvh']));
  check('mobile collapsed sheet hides dense sections', includesAll(css, [
    '.search-panel:not(.mobile-sheet-expanded) .filter-toolbar',
    '.search-panel:not(.mobile-sheet-expanded) .results-section'
  ]));
  check('mobile results list scrolls inside sheet', includesAll(css, [
    '.search-panel.mobile-sheet-expanded .results-section',
    'overflow-y: auto',
    '-webkit-overflow-scrolling: touch'
  ]));
  check('mobile filter panel is separated from main flow', includesAll(css, [
    '.search-panel.mobile-sheet-expanded .filter-panel',
    'position: fixed'
  ]));

  check('stage 2 preview page references assets', includesAll(stage2Html, [
    'stage2-preview.css',
    'stage2-preview.js',
    'stage2Map',
    'datasetSelect',
    'contextFilters',
    'entryList',
    'detailPanel'
  ]));
  check('stage 2 preview fetches dataset index', stage2App.includes("fetch('data/stage2/index.json')"));
  check('stage 2 preview can load selected dataset path', stage2App.includes('loadDataset(event.target.value)'));
  check('stage 2 preview renders Leaflet markers', includesAll(stage2App, ['L.map', 'L.marker', 'bindTooltip']));
  check('stage 2 preview clears stale marker labels', includesAll(stage2App, ['function clearMarkers()', 'unbindTooltip()', '.leaflet-tooltip.stage2-label']));
  check('stage 2 preview compacts context filters', includesAll(stage2App, ['CONTEXT_COLLAPSED_LIMIT', 'contextFiltersExpanded', 'context-filter-toggle']));
  check('stage 2 preview search stays scoped to entry fields', !stage2App.includes('entry.stage2.contextIds.map(id => getContext(id)?.labelKo)'));
  check('stage 2 preview detail actions are wired', includesAll(stage2App, ['function focusMapOnEntry(entry)', 'function closeDetail()', 'data-detail-action="focus-map"', 'data-detail-action="close"', "event.key === 'Escape'"]));
  check('stage 2 preview hides empty detail panel', includesAll(stage2App, ["panel.classList.add('is-empty')", "panel.classList.remove('is-empty')"]) && includesAll(stage2Css, ['.detail-panel.is-empty', 'display: none']));
  check('stage 2 preview has responsive mobile rules', includesAll(stage2Css, ['@media (max-width: 820px)', '.entry-list']));
  check('stage 2 index has multiple datasets', stage2Datasets.length >= 37);

  for (const { metadata, data } of stage2Datasets) {
    const datasetLabel = metadata.id || metadata.path;
    check(`stage 2 dataset status matches index (${datasetLabel})`, data.status === metadata.status);
    check(`stage 2 dataset has contexts (${datasetLabel})`, Array.isArray(data.contexts) && data.contexts.length >= 5);
    check(`stage 2 dataset has sample entries (${datasetLabel})`, Array.isArray(data.entries) && data.entries.length >= 8);

    for (const previewEntry of data.entries || []) {
      check(`stage 2 preview entry exists in main data (${previewEntry.entryId})`, entryIds.has(previewEntry.entryId));
      check(`stage 2 preview entry has multiple context links (${previewEntry.entryId})`, Array.isArray(previewEntry.stage2?.contextIds) && previewEntry.stage2.contextIds.length >= 2);
      check(`stage 2 preview entry has UI filters (${previewEntry.entryId})`, Boolean(previewEntry.stage2?.uiFilters));
      check(`stage 2 preview entry has source confidence (${previewEntry.entryId})`, Boolean(previewEntry.stage2?.sourceConfidence?.tier));
    }
  }

  if (errors.length) {
    for (const error of errors) {
      console.error(`ERROR ${error}`);
    }
    process.exit(1);
  }

  console.log(`smoke checks ok (${entries.length} entries, ${batches.batches.length} batches)`);
}

main();
