let map;
let entries = [];
let filteredEntries = [];
let markers = [];
let selectedId = null;
let activeType = 'all';
let activeRegion = 'all';

const TYPE_LABELS = {
  all: '전체',
  place: '과거 지명',
  event: '사건',
  artifact: '유물·유적'
};

const TYPE_CLASSES = {
  place: 'type-place',
  event: 'type-event',
  artifact: 'type-artifact'
};

const TYPE_COLORS = {
  place: '#365a42',
  event: '#8b3f32',
  artifact: '#67508d'
};

const MARKER_GLYPHS = {
  place: `
    <path d="M8 4.5v13" />
    <path d="M8 5h8.5l-1.9 3 1.9 3H8" />
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
  const typeKeys = ['all', 'place', 'event', 'artifact'];
  typeContainer.innerHTML = typeKeys.map(type => `
    <button class="filter-btn ${type === activeType ? 'active' : ''}" data-type="${type}">
      ${TYPE_LABELS[type]}
    </button>
  `).join('');
  typeContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      activeType = button.dataset.type;
      update();
    });
  });

  renderRegionFilters();
}

function renderRegionFilters() {
  const regionContainer = document.getElementById('regionFilters');
  const regions = ['all', ...Array.from(new Set(entries.map(e => e.worldRegion))).sort((a, b) => a.localeCompare(b, 'ko'))];
  regionContainer.innerHTML = regions.map(region => `
    <button class="filter-btn ${region === activeRegion ? 'active' : ''}" data-region="${escapeHtml(region)}">
      ${region === 'all' ? '전 세계' : escapeHtml(region)}
    </button>
  `).join('');
  regionContainer.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      activeRegion = button.dataset.region;
      update();
    });
  });
}

function setupSearch() {
  const input = document.getElementById('searchInput');
  const clearButton = document.getElementById('clearSearchBtn');

  input.addEventListener('input', () => {
    selectedId = null;
    update();
  });

  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && filteredEntries.length > 0) {
      selectEntry(filteredEntries[0].id);
    }
  });

  clearButton.addEventListener('click', () => {
    input.value = '';
    selectedId = null;
    update();
    input.focus();
  });
}

function update() {
  updateFilterButtons();
  filteredEntries = getFilteredEntries();
  renderSummary();
  renderResults();
  renderMarkers();
  if (selectedId && !filteredEntries.some(e => e.id === selectedId)) {
    selectedId = null;
    renderDetail(null);
  }
}

function updateFilterButtons() {
  document.querySelectorAll('#typeFilters .filter-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.type === activeType);
  });
  document.querySelectorAll('#regionFilters .filter-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.region === activeRegion);
  });
}

function getFilteredEntries() {
  const query = normalizeText(document.getElementById('searchInput').value);
  return entries
    .filter(entry => activeType === 'all' || entry.type === activeType)
    .filter(entry => activeRegion === 'all' || entry.worldRegion === activeRegion)
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

  list.innerHTML = filteredEntries.map(entry => `
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

function renderMarkers() {
  markers.forEach(marker => marker.remove());
  markers = [];

  filteredEntries.forEach(entry => {
    const marker = L.marker([entry.coordinates.lat, entry.coordinates.lng], {
      icon: createMarkerIcon(entry)
    }).addTo(map);

    marker.bindTooltip(entry.title, {
      direction: 'top',
      offset: [0, -32],
      opacity: 0.92
    });

    marker.on('click', () => selectEntry(entry.id));
    markers.push(marker);
  });

  if (filteredEntries.length > 1 && filteredEntries.length <= 60) {
    const bounds = L.latLngBounds(filteredEntries.map(e => [e.coordinates.lat, e.coordinates.lng]));
    map.fitBounds(bounds.pad(0.18), { animate: false });
  } else if (filteredEntries.length === 1) {
    const entry = filteredEntries[0];
    map.setView([entry.coordinates.lat, entry.coordinates.lng], 8, { animate: false });
  } else if (!selectedId) {
    map.setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom, { animate: false });
  }
}

function createMarkerIcon(entry) {
  const color = TYPE_COLORS[entry.type] || '#365a42';
  const glyph = MARKER_GLYPHS[entry.type] || MARKER_GLYPHS.place;
  return L.divIcon({
    className: 'map-point-icon',
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

function selectEntry(id) {
  const entry = entries.find(item => item.id === id);
  if (!entry) return;

  selectedId = id;
  renderResults();
  renderDetail(entry);
  map.setView([entry.coordinates.lat, entry.coordinates.lng], 9, { animate: true });

  const activeMarker = markers.find(marker => {
    const latLng = marker.getLatLng();
    return Math.abs(latLng.lat - entry.coordinates.lat) < 0.0001 &&
      Math.abs(latLng.lng - entry.coordinates.lng) < 0.0001;
  });
  if (activeMarker) activeMarker.openTooltip();
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
    return;
  }

  drawer.innerHTML = `
    <article class="detail-content">
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
    </article>
  `;
}

function formatConfidence(value) {
  const labels = {
    high: '높음',
    medium: '중간',
    approximate: '추정'
  };
  return labels[value] || value || '미기재';
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
