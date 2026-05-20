let stage2Data = null;
let stage2Index = null;
let stage2Map = null;
let activeDatasetPath = null;
let activeContextId = 'all';
let activeEntryId = null;
let markers = [];

const CONTEXT_ALL = {
  id: 'all',
  labelKo: '전체 맥락'
};

const TYPE_CLASS = {
  장소: 'type-place',
  사건: 'type-event',
  '유물·유적': 'type-artifact'
};

const TIER_LABEL = {
  high: '높음',
  medium: '보강 필요',
  approximate: '근사'
};

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s._,'()·-]/g, '');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getContext(id) {
  if (!stage2Data) return null;
  return stage2Data.contexts.find(context => context.id === id);
}

function getFilteredEntries() {
  if (!stage2Data) return [];

  const query = normalizeText(document.getElementById('stage2Search').value);

  return stage2Data.entries.filter(entry => {
    const contextMatch = activeContextId === 'all' || entry.stage2.contextIds.includes(activeContextId);
    if (!contextMatch) return false;

    if (!query) return true;

    const searchText = normalizeText([
      entry.titleKo,
      entry.displayTypeKo,
      entry.modernCountryKo,
      entry.yearLabelKo,
      entry.summaryKo,
      ...entry.stage2.periodPathKo,
      ...entry.stage2.topicTagsKo,
      ...entry.stage2.contextIds.map(id => getContext(id)?.labelKo)
    ].join(' '));

    return searchText.includes(query);
  });
}

function initMap() {
  stage2Map = L.map('stage2Map', {
    zoomControl: false,
    worldCopyJump: true
  }).setView([20, -35], 3);

  L.control.zoom({ position: 'topright' }).addTo(stage2Map);

  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri'
    }
  ).addTo(stage2Map);

  L.tileLayer(
    'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 19,
      keepBuffer: 4,
      updateWhenZooming: false,
      attribution: 'Labels &copy; Esri'
    }
  ).addTo(stage2Map);
}

function createIcon(entry) {
  const markerType = entry.displayTypeKo === '사건'
    ? 'event'
    : entry.displayTypeKo === '유물·유적'
      ? 'artifact'
      : '';
  const glyph = markerType === 'event' ? '!' : markerType === 'artifact' ? '◆' : '•';

  return L.divIcon({
    className: '',
    html: `<span class="stage2-marker ${markerType}">${glyph}</span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14]
  });
}

function renderDatasetSelect() {
  const select = document.getElementById('datasetSelect');
  if (!select || !stage2Index) return;

  select.innerHTML = stage2Index.datasets.map(dataset => `
    <option value="${escapeHtml(dataset.path)}">${escapeHtml(dataset.titleKo)}</option>
  `).join('');

  select.value = activeDatasetPath || stage2Index.datasets[0]?.path || '';
}

function renderContextFilters() {
  const container = document.getElementById('contextFilters');
  if (!stage2Data) {
    container.innerHTML = '';
    return;
  }

  const contexts = [CONTEXT_ALL, ...stage2Data.contexts];

  container.innerHTML = contexts.map(context => `
    <button class="context-chip ${context.id === activeContextId ? 'active' : ''}" type="button" data-context-id="${escapeHtml(context.id)}">
      ${escapeHtml(context.labelKo)}
    </button>
  `).join('');

  container.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      activeContextId = button.dataset.contextId;
      activeEntryId = null;
      update();
    });
  });
}

function renderEntries() {
  const entries = getFilteredEntries();
  const list = document.getElementById('entryList');
  document.getElementById('entryCount').textContent = `${entries.length}개`;

  if (!entries.length) {
    list.innerHTML = '<div class="empty-state">조건에 맞는 2단계 샘플 항목이 없습니다.</div>';
    return;
  }

  list.innerHTML = entries.map(entry => {
    const context = getContext(entry.stage2.primaryContextId);
    const tier = entry.stage2.sourceConfidence.tier;

    return `
      <button class="entry-card ${entry.entryId === activeEntryId ? 'active' : ''}" type="button" data-entry-id="${escapeHtml(entry.entryId)}">
        <div class="entry-title-row">
          <span class="entry-title">${escapeHtml(entry.titleKo)}</span>
          <span class="type-badge ${TYPE_CLASS[entry.displayTypeKo] || 'type-place'}">${escapeHtml(entry.displayTypeKo)}</span>
        </div>
        <div class="entry-meta">
          ${escapeHtml(entry.modernCountryKo)} · ${escapeHtml(entry.yearLabelKo)}<br />
          ${escapeHtml(context?.labelKo || '')} · 출처 ${escapeHtml(TIER_LABEL[tier] || tier)}
        </div>
      </button>
    `;
  }).join('');

  list.querySelectorAll('.entry-card').forEach(card => {
    card.addEventListener('click', () => selectEntry(card.dataset.entryId, { pan: true }));
  });
}

function renderMarkers({ fit = false } = {}) {
  markers.forEach(marker => marker.remove());
  markers = [];

  const entries = getFilteredEntries();

  entries.forEach(entry => {
    const marker = L.marker([entry.coordinates.lat, entry.coordinates.lng], {
      icon: createIcon(entry),
      zIndexOffset: entry.entryId === activeEntryId ? 1000 : 0
    }).addTo(stage2Map);

    marker.bindTooltip(entry.titleKo, {
      className: 'stage2-label',
      direction: 'top',
      offset: [0, -14],
      opacity: 0.96,
      permanent: true
    });

    marker.on('click', () => selectEntry(entry.entryId, { pan: false }));
    markers.push(marker);
  });

  if (!fit || !entries.length) return;

  const bounds = L.latLngBounds(entries.map(entry => [entry.coordinates.lat, entry.coordinates.lng]));
  stage2Map.fitBounds(bounds.pad(0.2), { animate: false });
}

function selectEntry(entryId, { pan = false } = {}) {
  const entry = stage2Data.entries.find(item => item.entryId === entryId);
  if (!entry) return;

  activeEntryId = entryId;
  renderEntries();
  renderDetail(entry);
  renderMarkers();

  if (pan) {
    stage2Map.setView([entry.coordinates.lat, entry.coordinates.lng], 6, { animate: true });
  }
}

function renderDetail(entry) {
  const panel = document.getElementById('detailPanel');
  const primaryContext = getContext(entry.stage2.primaryContextId);
  const contexts = entry.stage2.contextIds.map(getContext).filter(Boolean);
  const tier = entry.stage2.sourceConfidence.tier;
  const filterValues = Object.entries(entry.stage2.uiFilters)
    .flatMap(([key, value]) => Array.isArray(value) ? value.map(item => `${key}: ${item}`) : [`${key}: ${value}`]);

  panel.innerHTML = `
    <article class="detail-content">
      <div class="detail-kicker">
        <span class="type-badge ${TYPE_CLASS[entry.displayTypeKo] || 'type-place'}">${escapeHtml(entry.displayTypeKo)}</span>
        <span class="tier-badge tier-${escapeHtml(tier)}">출처 ${escapeHtml(TIER_LABEL[tier] || tier)}</span>
      </div>
      <h2>${escapeHtml(entry.titleKo)}</h2>
      <p class="detail-summary">${escapeHtml(entry.summaryKo)}</p>

      <dl class="detail-grid">
        <dt>현재 지도용</dt>
        <dd>${escapeHtml(entry.modernCountryKo)} · ${entry.coordinates.lat.toFixed(4)}, ${entry.coordinates.lng.toFixed(4)}</dd>
        <dt>대표 맥락</dt>
        <dd>${escapeHtml(primaryContext?.labelKo || '')}</dd>
        <dt>시대 경로</dt>
        <dd>${escapeHtml(entry.stage2.periodPathKo.join(' > '))}</dd>
        <dt>출처 상태</dt>
        <dd>공식 ${entry.stage2.sourceConfidence.officialSources}개 · 참고 ${entry.stage2.sourceConfidence.referenceSources}개</dd>
      </dl>

      <div class="section-title">사용자에게 보일 필터</div>
      <div class="tag-list">
        ${filterValues.map(value => `<span class="tag-chip">${escapeHtml(value)}</span>`).join('')}
      </div>

      <div class="section-title">연구용 주제 태그</div>
      <div class="tag-list">
        ${entry.stage2.topicTagsKo.map(tag => `<span class="tag-chip">${escapeHtml(tag)}</span>`).join('')}
      </div>

      <div class="section-title">동시에 연결되는 역사 맥락</div>
      <div class="context-list">
        ${contexts.map(context => `
          <div class="context-item">
            <strong>${escapeHtml(context.labelKo)}</strong>
            <span>${escapeHtml(context.periodKo)} · ${escapeHtml(context.summaryKo)}</span>
          </div>
        `).join('')}
      </div>

      <div class="section-title">검증 메모</div>
      <p class="detail-summary">${escapeHtml(entry.stage2.sourceConfidence.noteKo)}</p>
    </article>
  `;
}

function renderEmptyDetail() {
  document.getElementById('detailPanel').innerHTML = `
    <div class="empty-state">
      왼쪽 항목이나 지도 마커를 선택하면 1단계 지도용 정보와 2단계 분류 정보가 나란히 표시됩니다.
    </div>
  `;
}

function update() {
  renderContextFilters();
  renderEntries();
  renderMarkers({ fit: true });

  const selected = stage2Data.entries.find(entry => entry.entryId === activeEntryId);
  if (selected && getFilteredEntries().some(entry => entry.entryId === activeEntryId)) {
    renderDetail(selected);
  } else {
    renderEmptyDetail();
  }
}

async function init() {
  initMap();

  const indexResponse = await fetch('data/stage2/index.json');
  if (!indexResponse.ok) throw new Error(`2단계 목록을 불러오지 못했습니다: ${indexResponse.status}`);
  stage2Index = await indexResponse.json();
  activeDatasetPath = stage2Index.datasets[0]?.path || null;
  if (!activeDatasetPath) throw new Error('2단계 미리보기 데이터셋이 없습니다.');

  renderDatasetSelect();

  document.getElementById('datasetSelect').addEventListener('change', event => {
    loadDataset(event.target.value);
  });

  document.getElementById('stage2Search').addEventListener('input', () => {
    activeEntryId = null;
    update();
  });

  await loadDataset(activeDatasetPath);
}

async function loadDataset(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`2단계 미리보기 데이터를 불러오지 못했습니다: ${response.status}`);

  stage2Data = await response.json();
  activeDatasetPath = path;
  activeContextId = 'all';
  activeEntryId = null;
  document.getElementById('stage2Search').value = '';
  renderDatasetSelect();
  update();
}

init().catch(error => {
  document.getElementById('detailPanel').innerHTML = `
    <div class="empty-state">${escapeHtml(error.message)}</div>
  `;
  console.error(error);
});
