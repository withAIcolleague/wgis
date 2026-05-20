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
  const app = readText('app.js');
  const css = readText('styles.css');
  const entries = readJson('data/entries.json');
  const batches = readJson('data/curation-batches.json');

  check('entries.json is an array', Array.isArray(entries));
  check('first-stage entry floor', entries.length >= 240, `${entries.length} entries found`);
  check('curation batch floor', Array.isArray(batches.batches) && batches.batches.length >= 30);

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

  check('entries are fetched from app data', app.includes("fetch('data/entries.json')"));
  check('search button executes map search', app.includes("searchButton.addEventListener('click', executeSearch)"));
  check('enter key executes map search', includesAll(app, ["event.key === 'Enter'", 'executeSearch();']));
  check('clear search resets results', includesAll(app, ['clearButton.addEventListener', "input.value = ''"]));
  check('pagination size changes page size', includesAll(app, ['pageSizeSelect.addEventListener', 'pageSize = Number(pageSizeSelect.value)']));
  check('prev and next pagination handlers exist', countOccurrences(app, /addEventListener\('click'/g) >= 7);
  check('search activates marker rendering', includesAll(app, ['mapResultsActive = true', 'update({ fitMap: true })']));
  check('marker source is gated by search or selected entry', includesAll(app, ['function getMarkerEntries()', 'mapResultsActive ? getPageEntries() : []']));
  check('marker labels are permanent', includesAll(app, ['marker.bindTooltip', 'permanent: true']));
  check('marker labels are interactive', includesAll(app, ['interactive: true', "tooltip.on('click'"]));
  check('label click toggles detail', includesAll(app, ['registerTooltipClick(entry.id)', 'toggleEntryDetail(entry.id)']));
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

  if (errors.length) {
    for (const error of errors) {
      console.error(`ERROR ${error}`);
    }
    process.exit(1);
  }

  console.log(`smoke checks ok (${entries.length} entries, ${batches.batches.length} batches)`);
}

main();
