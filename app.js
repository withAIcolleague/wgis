let map;
let entries = [];
let filteredEntries = [];
let markers = [];
let selectedId = null;
let activeType = 'all';
let activeRegion = 'all';
let currentPage = 1;
let pageSize = 10;
let mapResultsActive = false;
let focusedMapEntryId = null;
let lastTooltipClick = { id: null, time: 0 };
let filterPanelOpen = false;

const MOBILE_MEDIA_QUERY = '(max-width: 820px)';

const TYPE_LABELS = {
  all: '전체',
  place: '과거 지명',
  site: '유적',
  event: '사건',
  artifact: '유물·유적'
};

const TYPE_CLASSES = {
  place: 'type-place',
  site: 'type-site',
  event: 'type-event',
  artifact: 'type-artifact'
};

const TYPE_COLORS = {
  place: '#365a42',
  site: '#6f6a2d',
  event: '#8b3f32',
  artifact: '#67508d'
};

const REGION_FILTERS = [
  { id: 'all', label: '전 세계' },
  {
    id: 'africa',
    label: '아프리카',
    countries: ['나이지리아', '말리', '모로코', '모리타니', '모잠비크', '에티오피아', '이집트', '짐바브웨', '케냐', '탄자니아', '튀니지']
  },
  {
    id: 'europe',
    label: '유럽',
    countries: ['그리스', '네덜란드', '노르웨이', '독일', '러시아', '벨기에', '스웨덴', '스페인', '영국', '이탈리아', '크로아티아', '포르투갈', '프랑스']
  },
  {
    id: 'west-central-asia',
    label: '서·중앙아시아',
    countries: ['시리아', '예멘', '우즈베키스탄', '이라크', '이란', '카자흐스탄', '투르크메니스탄', '튀르키예']
  },
  {
    id: 'south-asia',
    label: '남아시아',
    countries: ['인도', '파키스탄']
  },
  {
    id: 'east-asia',
    label: '동아시아',
    countries: ['대한민국', '북한', '일본', '중국']
  },
  {
    id: 'southeast-asia',
    label: '동남아',
    countries: ['말레이시아', '미얀마', '베트남', '브루나이', '인도네시아', '캄보디아', '태국', '필리핀']
  },
  {
    id: 'americas',
    label: '아메리카',
    countries: ['과테말라', '멕시코', '미국', '볼리비아', '온두라스', '콜롬비아', '쿠바', '페루']
  },
  {
    id: 'oceania',
    label: '오세아니아',
    countries: ['미크로네시아', '바누아투', '사모아', '칠레령 라파누이', '통가', '파푸아뉴기니', '프랑스령 뉴칼레도니아', '프랑스령 폴리네시아']
  }
];

const REGION_FILTER_BY_ID = Object.fromEntries(REGION_FILTERS.map(filter => [filter.id, filter]));

const MARKER_GLYPHS = {
  place: `
    <path d="M8 4.5v13" />
    <path d="M8 5h8.5l-1.9 3 1.9 3H8" />
  `,
  site: `
    <path d="M7 21h10" />
    <path d="M8.5 21V10" />
    <path d="M15.5 21V10" />
    <path d="M6 10h12" />
    <path d="M8 7h8" />
    <path d="M10 4h4" />
  `,
  event: `
    <path d="M13.2 2.5 7.2 14h4.1l-1 7.5 6.5-12.6h-4.2l.6-6.4Z" />
  `,
  artifact: `
    <path d="M8.4 5.4h7.2" />
    <path d="M9.8 5.6v3.1c-1.1.8-1.8 2.2-1.8 4.3v3.7c0 2.3 1.6 3.8 4 3.8s4-1.5 4-3.8V13c0-2.1-.7-3.5-1.8-4.3V5.6" />
    <path d="M8.1 11.2c-2.2.5-2.6 4.5-.4 5.3" />
    <path d="M15.9 11.2c2.2.5 2.6 4.5.4 5.3" />
  `
};

const DEFAULT_VIEW = {
  center: [27, 42],
  zoom: 3
};

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s·ㆍ\-_.,'’"()]/g, '');
}

function initMap() {
  map = L.map('map', {
    zoomControl: false,
    worldCopyJump: true
  }).setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom);

  L.control.zoom({ position: 'topright' }).addTo(map);

  const satellite = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri'
    }
  );

  const satelliteLabels = L.tileLayer(
    'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 19,
      keepBuffer: 4,
      updateWhenZooming: false,
      attribution: 'Labels &copy; Esri'
    }
  );

  const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  });

  satellite.addTo(map);
  satelliteLabels.addTo(map);

  L.control.layers(
    {
      '위성지도': satellite,
      '일반지도': streetMap
    },
    {
      '현재 지명/경계': satelliteLabels
    },
    {
      position: 'topright',
      collapsed: true
    }
  ).addTo(map);
}

async function loadEntries() {
  const res = await fetch('data/entries.json');
  if (!res.ok) throw new Error(`데이터 로드 실패: ${res.status}`);
  entries = await res.json();
  entries = entries.map(entry => ({
    ...entry,
    searchIndex: buildSearchIndex(entry)
  }));
}

function buildSearchIndex(entry) {
  return normalizeText([
    entry.title,
    entry.historicalName,
    entry.modernName,
    entry.modernAdmin,
    entry.country,
    entry.worldRegion,
    entry.period,
    entry.yearLabel,
    entry.summary,
    ...(entry.aliases || [])
  ].join(' '));
}

function setupFilters() {
  const typeContainer = document.getElementById('typeFilters');
  const typeKeys = ['all', 'place', 'site', 'event', 'artifact'];
  typeContainer.innerHTML = typeKeys.map(type => `
    <button class="filter-btn ${type === activeType ? 'active' : ''}" data-type="${type}">
      ${TYPE_LABELS[type]}
    </button>
  `).join('');
  typeContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      activeType = button.dataset.type;
      currentPage = 1;
      mapResultsActive = false;
      focusedMapEntryId = null;
      selectedId = null;
      renderDetail(null);
      update();
    });
  });

  renderRegionFilters();
}

function renderRegionFilters() {
  const regionContainer = document.getElementById('regionFilters');
  const regions = REGION_FILTERS.filter(filter =>
    filter.id === 'all' || entries.some(entry => entryMatchesRegionFilter(entry, filter.id))
  );

  regionContainer.innerHTML = regions.map(region => `
    <button class="filter-btn ${region.id === activeRegion ? 'active' : ''}" data-region="${escapeHtml(region.id)}">
      ${escapeHtml(region.label)}
    </button>
  `).join('');
  regionContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      activeRegion = button.dataset.region;
      currentPage = 1;
      mapResultsActive = false;
      focusedMapEntryId = null;
      selectedId = null;
      renderDetail(null);
      update();
    });
  });
}

function setupFilterPanel() {
  const openButton = document.getElementById('filterPanelBtn');
  const closeButton = document.getElementById('filterPanelCloseBtn');
  const panel = document.getElementById('filterPanel');
  if (!openButton || !closeButton || !panel) return;

  openButton.addEventListener('click', event => {
    event.stopPropagation();
    setFilterPanelOpen(!filterPanelOpen);
  });

  closeButton.addEventListener('click', () => {
    setFilterPanelOpen(false);
  });

  panel.addEventListener('click', event => {
    event.stopPropagation();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setFilterPanelOpen(false);
  });

  document.addEventListener('click', event => {
    if (!filterPanelOpen) return;
    if (panel.contains(event.target) || openButton.contains(event.target)) return;
    setFilterPanelOpen(false);
  });

  setFilterPanelOpen(false);
}

function setFilterPanelOpen(open) {
  const openButton = document.getElementById('filterPanelBtn');
  const panel = document.getElementById('filterPanel');
  if (!openButton || !panel) return;

  filterPanelOpen = open;
  panel.hidden = !open;
  openButton.setAttribute('aria-expanded', String(open));
}

function updateActiveFilterSummary() {
  const summary = document.getElementById('activeFilterSummary');
  if (!summary) return;

  const typeLabel = TYPE_LABELS[activeType] || '전체';
  const regionLabel = REGION_FILTER_BY_ID[activeRegion]?.label || '전 세계';
  summary.textContent = `${typeLabel} · ${regionLabel}`;
}

function entryMatchesRegionFilter(entry, filterId) {
  if (filterId === 'all') return true;

  const filter = REGION_FILTER_BY_ID[filterId];
  if (!filter) return false;

  return filter.countries.includes(entry.country);
}

function setupSearch() {
  const input = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearSearchBtn');

  input.addEventListener('focus', () => {
    setMobileSheetExpanded(true);
  });

  input.addEventListener('input', () => {
    selectedId = null;
    currentPage = 1;
    mapResultsActive = false;
    focusedMapEntryId = null;
    renderDetail(null);
    setMobileSheetExpanded(true);
    update();
  });

  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      executeSearch();
    }
  });

  searchButton.addEventListener('click', executeSearch);

  clearButton.addEventListener('click', () => {
    input.value = '';
    selectedId = null;
    currentPage = 1;
    mapResultsActive = false;
    focusedMapEntryId = null;
    renderDetail(null);
    update();
    input.focus();
  });
}

function setupPagination() {
  const pageSizeSelect = document.getElementById('pageSizeSelect');
  const prevButton = document.getElementById('prevPageBtn');
  const nextButton = document.getElementById('nextPageBtn');

  pageSizeSelect.addEventListener('change', () => {
    pageSize = Number(pageSizeSelect.value);
    currentPage = 1;
    selectedId = null;
    focusedMapEntryId = null;
    renderDetail(null);
    update({ fitMap: mapResultsActive });
  });

  prevButton.addEventListener('click', () => {
    if (currentPage <= 1) return;
    currentPage -= 1;
    selectedId = null;
    focusedMapEntryId = null;
    renderDetail(null);
    update({ fitMap: mapResultsActive });
  });

  nextButton.addEventListener('click', () => {
    if (currentPage >= getTotalPages()) return;
    currentPage += 1;
    selectedId = null;
    focusedMapEntryId = null;
    renderDetail(null);
    update({ fitMap: mapResultsActive });
  });
}

function executeSearch() {
  currentPage = 1;
  selectedId = null;
  focusedMapEntryId = null;
  mapResultsActive = true;
  renderDetail(null);
  update({ fitMap: true });
  setMobileSheetExpanded(true);
}

function isMobileLayout() {
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

function setMobileSheetExpanded(expanded) {
  const panel = document.querySelector('.search-panel');
  const toggle = document.getElementById('mobileSheetToggle');
  if (!panel || !toggle) return;

  if (!isMobileLayout()) {
    panel.classList.remove('mobile-sheet-expanded');
    toggle.setAttribute('aria-expanded', 'false');
    return;
  }

  panel.classList.toggle('mobile-sheet-expanded', expanded);
  toggle.setAttribute('aria-expanded', String(expanded));

  if (!expanded) {
    setFilterPanelOpen(false);
  }

  const label = toggle.querySelector('.sheet-label');
  if (label) {
    label.textContent = expanded ? '지도 크게 보기' : '검색 및 결과';
  }

  window.setTimeout(() => {
    map?.invalidateSize();
  }, 240);
}

function setupMobileSheet() {
  const toggle = document.getElementById('mobileSheetToggle');
  const panel = document.querySelector('.search-panel');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    setMobileSheetExpanded(!panel.classList.contains('mobile-sheet-expanded'));
  });

  const media = window.matchMedia(MOBILE_MEDIA_QUERY);
  const syncLayout = () => {
    setMobileSheetExpanded(media.matches && Boolean(selectedId));
  };

  if (media.addEventListener) {
    media.addEventListener('change', syncLayout);
  } else {
    media.addListener(syncLayout);
  }

  syncLayout();
}

function update({ fitMap = false } = {}) {
  updateFilterButtons();
  filteredEntries = getFilteredEntries();
  clampCurrentPage();
  if (selectedId && !filteredEntries.some(e => e.id === selectedId)) {
    selectedId = null;
    renderDetail(null);
  }
  renderSummary();
  renderPagination();
  renderResults();
  renderMarkers({ fitMap });
}

function updateFilterButtons() {
  document.querySelectorAll('#typeFilters .filter-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.type === activeType);
  });
  document.querySelectorAll('#regionFilters .filter-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.region === activeRegion);
  });
  updateActiveFilterSummary();
}

function getFilteredEntries() {
  const query = normalizeText(document.getElementById('searchInput').value);
  return entries
    .filter(entry => activeType === 'all' || entry.type === activeType)
    .filter(entry => entryMatchesRegionFilter(entry, activeRegion))
    .filter(entry => !query || entry.searchIndex.includes(query))
    .sort((a, b) => {
      if (!query) return a.title.localeCompare(b.title, 'ko');
      const aTitle = normalizeText(a.title).includes(query) || normalizeText(a.historicalName).includes(query);
      const bTitle = normalizeText(b.title).includes(query) || normalizeText(b.historicalName).includes(query);
      if (aTitle !== bTitle) return aTitle ? -1 : 1;
      return a.title.localeCompare(b.title, 'ko');
    });
}

function renderSummary() {
  document.getElementById('resultCount').textContent = filteredEntries.length.toLocaleString();
  document.getElementById('visibleCountries').textContent =
    new Set(filteredEntries.map(entry => entry.country)).size.toLocaleString();
}

function getTotalPages() {
  return Math.max(1, Math.ceil(filteredEntries.length / pageSize));
}

function clampCurrentPage() {
  currentPage = Math.min(Math.max(currentPage, 1), getTotalPages());
}

function getPageEntries() {
  const start = (currentPage - 1) * pageSize;
  return filteredEntries.slice(start, start + pageSize);
}

function renderPagination() {
  const pageSizeSelect = document.getElementById('pageSizeSelect');
  const pageStatus = document.getElementById('pageStatus');
  const prevButton = document.getElementById('prevPageBtn');
  const nextButton = document.getElementById('nextPageBtn');

  pageSizeSelect.value = String(pageSize);
  prevButton.disabled = currentPage <= 1 || filteredEntries.length === 0;
  nextButton.disabled = currentPage >= getTotalPages() || filteredEntries.length === 0;

  if (filteredEntries.length === 0) {
    pageStatus.textContent = '0 / 0';
    return;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredEntries.length);
  pageStatus.textContent = `${start}-${end} / ${filteredEntries.length.toLocaleString()}`;
}

function renderResults() {
  const list = document.getElementById('resultsList');
  if (filteredEntries.length === 0) {
    list.innerHTML = `
      <div class="no-results">
        검색 결과가 없습니다. 과거 지명, 현재 도시명, 사건명, 유물명, 영문 표기를 함께 검색할 수 있습니다.
      </div>
    `;
    return;
  }

  list.innerHTML = getPageEntries().map(entry => `
    <button class="result-card ${entry.id === selectedId ? 'active' : ''}" data-id="${escapeHtml(entry.id)}">
      <div class="result-topline">
        <span class="result-title">${escapeHtml(entry.title)}</span>
        <span class="type-badge ${TYPE_CLASSES[entry.type]}">${TYPE_LABELS[entry.type]}</span>
      </div>
      <div class="result-meta">
        ${escapeHtml(entry.historicalName)} → <strong>${escapeHtml(entry.modernName)}</strong><br />
        ${escapeHtml(entry.country)} · ${escapeHtml(entry.worldRegion)} · ${escapeHtml(entry.yearLabel)}
      </div>
      <div class="result-aliases">${escapeHtml((entry.aliases || []).join(' · '))}</div>
    </button>
  `).join('');

  list.querySelectorAll('.result-card').forEach(card => {
    card.addEventListener('click', () => selectEntry(card.dataset.id));
  });
}

function renderMarkers({ fitMap = false } = {}) {
  markers.forEach(marker => marker.remove());
  markers = [];

  const markerEntries = getMarkerEntries();

  markerEntries.forEach(entry => {
    const marker = L.marker([entry.coordinates.lat, entry.coordinates.lng], {
      icon: createMarkerIcon(entry),
      zIndexOffset: entry.id === selectedId ? 1000 : 0
    }).addTo(map);

    marker.bindTooltip(entry.title, {
      direction: 'top',
      offset: [0, -32],
      opacity: 0.96,
      permanent: true,
      interactive: true,
      className: `map-point-label ${entry.id === selectedId ? 'selected' : ''}`
    });

    const tooltip = marker.getTooltip();
    if (tooltip) {
      tooltip.on('click', event => {
        if (event.originalEvent) L.DomEvent.stopPropagation(event.originalEvent);
        registerTooltipClick(entry.id);
        toggleEntryDetail(entry.id);
      });
    }

    marker.on('click', event => {
      if (event.originalEvent) L.DomEvent.stopPropagation(event.originalEvent);
      if (shouldIgnoreMarkerClick(entry.id)) return;
      toggleEntryDetail(entry.id);
    });

    marker.bindPopup(createMapPopupContent(entry), {
      autoPan: true,
      autoPanPadding: [22, 22],
      className: 'map-info-popup',
      closeButton: true,
      maxWidth: 320,
      offset: [0, -30]
    });

    if (entry.id === selectedId) {
      marker.openPopup();
    }

    markers.push(marker);
  });

  if (!fitMap) return;

  if (markerEntries.length > 1) {
    const bounds = L.latLngBounds(markerEntries.map(e => [e.coordinates.lat, e.coordinates.lng]));
    map.fitBounds(bounds.pad(0.18), { animate: false });
  } else if (markerEntries.length === 1) {
    const entry = markerEntries[0];
    map.setView([entry.coordinates.lat, entry.coordinates.lng], 8, { animate: false });
  } else if (!selectedId) {
    map.setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom, { animate: false });
  }
}

function registerTooltipClick(id) {
  lastTooltipClick = {
    id,
    time: performance.now()
  };
}

function shouldIgnoreMarkerClick(id) {
  return lastTooltipClick.id === id && performance.now() - lastTooltipClick.time < 350;
}

function getMarkerEntries() {
  const pageEntries = mapResultsActive ? getPageEntries() : [];
  const extraEntryId = selectedId || focusedMapEntryId;
  if (!extraEntryId) return pageEntries;

  const extraEntry = entries.find(entry => entry.id === extraEntryId);
  if (!extraEntry || pageEntries.some(entry => entry.id === extraEntryId)) {
    return pageEntries;
  }

  return [...pageEntries, extraEntry];
}

function createMapPopupContent(entry) {
  const googleUrl = getGoogleSearchUrl(entry);

  return `
    <article class="map-popup-card">
      <div class="detail-kicker">
        <span class="type-badge ${TYPE_CLASSES[entry.type]}">${TYPE_LABELS[entry.type]}</span>
        <span class="result-meta">${escapeHtml(entry.yearLabel)}</span>
      </div>
      <h3>${escapeHtml(entry.title)}</h3>
      <dl>
        <dt>현재 지명</dt>
        <dd>${escapeHtml(entry.modernName)}</dd>
        <dt>지역</dt>
        <dd>${escapeHtml(entry.country)} · ${escapeHtml(entry.worldRegion)}</dd>
      </dl>
      <p>${escapeHtml(entry.summary)}</p>
      <div class="external-link-row">
        <a class="external-link" href="${escapeHtml(googleUrl)}" target="_blank" rel="noopener noreferrer">Google에서 검색</a>
      </div>
    </article>
  `;
}

function createMarkerIcon(entry) {
  const color = TYPE_COLORS[entry.type] || '#365a42';
  const glyph = MARKER_GLYPHS[entry.type] || MARKER_GLYPHS.place;
  return L.divIcon({
    className: `map-point-icon ${entry.id === selectedId ? 'selected' : ''}`,
    html: `
      <svg class="map-point-svg" width="24" height="36" viewBox="0 0 24 36" aria-hidden="true">
        <g fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          ${glyph}
          <path d="M12 22v11" />
          <path d="M10 33h4" />
        </g>
      </svg>
    `,
    iconSize: [24, 36],
    iconAnchor: [12, 34],
    popupAnchor: [0, -32]
  });
}

function selectEntry(id, { focusMap = true } = {}) {
  const entry = entries.find(item => item.id === id);
  if (!entry) return;

  selectedId = id;
  focusedMapEntryId = id;
  renderResults();
  renderDetail(entry);
  if (focusMap) {
    map.setView([entry.coordinates.lat, entry.coordinates.lng], 9, { animate: true });
  }
  renderMarkers();
  setMobileSheetExpanded(true);
}

function toggleEntryDetail(id) {
  if (selectedId === id) {
    clearSelectedEntry();
    return;
  }

  selectEntry(id, { focusMap: false });
}

function clearSelectedEntry() {
  selectedId = null;
  renderResults();
  renderDetail(null);
  renderMarkers();
  setMobileSheetExpanded(false);
}

function renderDetail(entry) {
  const drawer = document.getElementById('detailDrawer');
  if (!entry) {
    drawer.innerHTML = `
      <div class="empty-detail">
        <span class="empty-title">검색하거나 결과를 선택하세요</span>
        <span class="empty-copy">현재 지명, 좌표, 과거 명칭과 맥락이 여기에 표시됩니다.</span>
      </div>
    `;
    syncMobileDetail(null);
    return;
  }

  const googleUrl = getGoogleSearchUrl(entry);

  drawer.innerHTML = `
    <article class="detail-content">
      <button class="detail-close-btn" type="button" data-detail-close aria-label="상세 정보 닫기">×</button>
      <div class="detail-kicker">
        <span class="type-badge ${TYPE_CLASSES[entry.type]}">${TYPE_LABELS[entry.type]}</span>
        <span class="result-meta">${escapeHtml(entry.worldRegion)}</span>
      </div>
      <h2 class="detail-title">${escapeHtml(entry.title)}</h2>
      <dl class="detail-grid">
        <dt>과거 데이터</dt>
        <dd>${escapeHtml(entry.historicalName)}</dd>
        <dt>현재 지명</dt>
        <dd>${escapeHtml(entry.modernName)}</dd>
        <dt>현재 행정구역</dt>
        <dd>${escapeHtml(entry.modernAdmin)}</dd>
        <dt>현재 국가</dt>
        <dd>${escapeHtml(entry.country)}</dd>
        <dt>시대</dt>
        <dd>${escapeHtml(entry.period)} · ${escapeHtml(entry.yearLabel)}</dd>
        <dt>좌표</dt>
        <dd>${entry.coordinates.lat.toFixed(4)}, ${entry.coordinates.lng.toFixed(4)}</dd>
      </dl>
      <p class="detail-summary">${escapeHtml(entry.summary)}</p>
      <div class="alias-list">
        ${(entry.aliases || []).map(alias => `<span class="alias-pill">${escapeHtml(alias)}</span>`).join('')}
      </div>
      <div class="confidence">
        위치 신뢰도: ${formatConfidence(entry.confidence)}<br />
        ${escapeHtml(entry.sourceNote || '')}
      </div>
      <div class="external-link-row">
        <a class="external-link" href="${escapeHtml(googleUrl)}" target="_blank" rel="noopener noreferrer">Google에서 검색</a>
      </div>
    </article>
  `;
  syncMobileDetail(entry);
}

function syncMobileDetail(entry) {
  const mobileDetail = document.getElementById('mobileDetail');
  const drawer = document.getElementById('detailDrawer');
  if (!mobileDetail || !drawer) return;

  mobileDetail.hidden = !entry;
  mobileDetail.innerHTML = entry ? drawer.innerHTML : '';
}

function setupDetailActions() {
  const detailTargets = [
    document.getElementById('detailDrawer'),
    document.getElementById('mobileDetail')
  ].filter(Boolean);

  detailTargets.forEach(target => {
    target.addEventListener('click', event => {
      if (!event.target.closest('[data-detail-close]')) return;
      clearSelectedEntry();
    });
  });
}

function formatConfidence(value) {
  const labels = {
    high: '높음',
    medium: '중간',
    approximate: '추정'
  };
  return labels[value] || value || '미기재';
}

function getGoogleSearchUrl(entry) {
  const latinAliases = (entry.aliases || [])
    .filter(alias => /[A-Za-z]/.test(alias))
    .slice(0, 3);
  const query = [
    entry.title,
    entry.historicalName,
    ...latinAliases,
    entry.country,
    'history'
  ]
    .filter(Boolean)
    .join(' ');

  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function init() {
  initMap();
  setupSearch();
  setupPagination();
  setupFilterPanel();
  setupMobileSheet();
  setupDetailActions();
  try {
    await loadEntries();
    setupFilters();
    update();
  } catch (error) {
    document.getElementById('resultsList').innerHTML = `
      <div class="no-results">데이터를 불러오지 못했습니다. 로컬 서버로 실행 중인지 확인하세요.</div>
    `;
    console.error(error);
  }
}

init();
