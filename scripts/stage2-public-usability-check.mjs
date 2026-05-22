import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const targetUrl = process.argv[2] || 'https://wgis.vercel.app/stage2-preview.html';
const port = Number(process.argv[3] || 9247);
const outputDir = process.argv[4] || 'C:/Users/Public/Documents/ESTsoft/CreatorTemp';

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].filter(Boolean);

const chromePath = chromeCandidates.find(candidate => existsSync(candidate));
if (!chromePath) throw new Error('Chrome or Edge executable was not found');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const datasets = [
  {
    path: 'data/stage2/atlantic-revolutions-preview.json',
    count: 8,
    firstEntryId: 'philadelphia-independence-hall'
  },
  {
    path: 'data/stage2/ethiopia-human-origins-preview.json',
    count: 8,
    firstEntryId: 'ardi-aramis'
  },
  {
    path: 'data/stage2/mesopotamia-early-cities-preview.json',
    count: 10,
    firstEntryId: 'eridu'
  },
  {
    path: 'data/stage2/egypt-ancient-core-preview.json',
    count: 14,
    firstEntryId: 'memphis-egypt'
  },
  {
    path: 'data/stage2/indus-civilization-preview.json',
    count: 8,
    firstEntryId: 'mehrgarh'
  },
  {
    path: 'data/stage2/early-china-core-preview.json',
    count: 8,
    firstEntryId: 'banpo'
  },
  {
    path: 'data/stage2/ancient-greece-core-preview.json',
    count: 10,
    firstEntryId: 'athens-acropolis'
  },
  {
    path: 'data/stage2/achaemenid-persia-core-preview.json',
    count: 8,
    firstEntryId: 'pasargadae'
  },
  {
    path: 'data/stage2/roman-empire-core-preview.json',
    count: 8,
    firstEntryId: 'roman-forum'
  },
  {
    path: 'data/stage2/magadha-maurya-core-preview.json',
    count: 8,
    firstEntryId: 'rajgir-rajagriha'
  },
  {
    path: 'data/stage2/mesoamerica-core-preview.json',
    count: 8,
    firstEntryId: 'san-lorenzo-tenochtitlan'
  },
  {
    path: 'data/stage2/west-africa-early-states-preview.json',
    count: 8,
    firstEntryId: 'jenne-jeno'
  },
  {
    path: 'data/stage2/andean-core-sites-preview.json',
    count: 8,
    firstEntryId: 'caral'
  },
  {
    path: 'data/stage2/southeast-asia-early-states-preview.json',
    count: 8,
    firstEntryId: 'oc-eo'
  },
  {
    path: 'data/stage2/maya-lowland-postclassic-preview.json',
    count: 8,
    firstEntryId: 'palenque'
  },
  {
    path: 'data/stage2/swahili-coast-trade-cities-preview.json',
    count: 8,
    firstEntryId: 'kilwa-kisiwani'
  },
  {
    path: 'data/stage2/lapita-pacific-settlement-preview.json',
    count: 8,
    firstEntryId: 'foue-peninsula-lapita'
  },
  {
    path: 'data/stage2/north-america-indigenous-mound-urban-centers-preview.json',
    count: 8,
    firstEntryId: 'cahokia-mounds'
  },
  {
    path: 'data/stage2/indian-ocean-trade-ports-entrepots-preview.json',
    count: 8,
    firstEntryId: 'aden'
  }
];

class CdpClient {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Map();

    ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        message.error ? reject(new Error(message.error.message)) : resolve(message.result || {});
        return;
      }

      const key = `${message.sessionId || 'browser'}:${message.method}`;
      for (const listener of this.listeners.get(key) || []) listener(message.params || {}, message);
    });
  }

  static async connect(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', reject, { once: true });
    });
    return new CdpClient(ws);
  }

  on(method, sessionId, callback) {
    const key = `${sessionId || 'browser'}:${method}`;
    const listeners = this.listeners.get(key) || [];
    listeners.push(callback);
    this.listeners.set(key, listeners);
    return () => this.listeners.set(key, (this.listeners.get(key) || []).filter(listener => listener !== callback));
  }

  waitForEvent(method, sessionId, timeoutMs = 15000, predicate = () => true) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        off();
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      const off = this.on(method, sessionId, (params, message) => {
        if (!predicate(params, message)) return;
        clearTimeout(timer);
        off();
        resolve(params);
      });
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
    });
  }

  close() {
    this.ws.close();
  }
}

async function waitForJson(url, timeoutMs = 15000) {
  const started = Date.now();
  let lastError;
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(250);
  }
  throw lastError || new Error(`Timed out waiting for ${url}`);
}

function assertCheck(condition, message, details = undefined) {
  if (!condition) {
    const suffix = details === undefined ? '' : `: ${JSON.stringify(details)}`;
    throw new Error(`${message}${suffix}`);
  }
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const userDataDir = await mkdtemp(path.join(os.tmpdir(), 'wgis-stage2-public-'));
  const desktopShot = path.join(outputDir, 'wgis-stage2-nineteen-datasets-desktop.png');
  const mobileShot = path.join(outputDir, 'wgis-stage2-nineteen-datasets-mobile.png');

  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,920',
    'about:blank'
  ], { detached: false, stdio: 'ignore' });

  let client;
  let sessionId;
  const runtimeErrors = [];
  const states = [];

  try {
    const version = await waitForJson(`http://127.0.0.1:${port}/json/version`);
    client = await CdpClient.connect(version.webSocketDebuggerUrl);
    const { targetId } = await client.send('Target.createTarget', { url: 'about:blank' });
    ({ sessionId } = await client.send('Target.attachToTarget', { targetId, flatten: true }));
    await client.send('Target.activateTarget', { targetId });

    client.on('Runtime.exceptionThrown', sessionId, params => {
      runtimeErrors.push(params.exceptionDetails?.text || 'Runtime exception');
    });
    client.on('Log.entryAdded', sessionId, params => {
      const entry = params.entry || {};
      if (entry.level === 'error' && !String(entry.url || '').includes('favicon')) {
        runtimeErrors.push(entry.text || entry.url || 'Log error');
      }
    });

    await client.send('Page.enable', {}, sessionId);
    await client.send('Runtime.enable', {}, sessionId);
    await client.send('Log.enable', {}, sessionId);
    await client.send('Network.enable', {}, sessionId);

    async function evaluate(expression) {
      const result = await client.send('Runtime.evaluate', {
        expression,
        awaitPromise: true,
        returnByValue: true,
        userGesture: true
      }, sessionId);
      if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || 'Evaluation failed');
      return result.result?.value;
    }

    async function waitForExpression(expression, label, timeoutMs = 20000) {
      const started = Date.now();
      let last;
      while (Date.now() - started < timeoutMs) {
        last = await evaluate(`(() => {
          try { return Boolean(${expression}); }
          catch (error) { return String(error && error.message || error); }
        })()`);
        if (last === true) return;
        await sleep(200);
      }
      throw new Error(`Timed out waiting for ${label}: ${JSON.stringify(last)}`);
    }

    async function navigate(metrics) {
      if (metrics) {
        await client.send('Emulation.setDeviceMetricsOverride', metrics, sessionId);
        await client.send('Emulation.setTouchEmulationEnabled', { enabled: Boolean(metrics.mobile) }, sessionId);
      } else {
        await client.send('Emulation.clearDeviceMetricsOverride', {}, sessionId);
        await client.send('Emulation.setTouchEmulationEnabled', { enabled: false }, sessionId);
      }

      const loaded = client.waitForEvent('Page.loadEventFired', sessionId, 20000).catch(() => null);
      await client.send('Page.navigate', { url: targetUrl }, sessionId);
      await loaded;
      await waitForExpression(
        `document.readyState === 'complete' &&
          document.querySelectorAll('#datasetSelect option').length === ${datasets.length} &&
          document.querySelectorAll('.entry-card').length > 0`,
        'stage 2 preview initial load'
      );
    }

    const stateExpression = label => `(() => {
      const text = selector => document.querySelector(selector)?.textContent.trim() || '';
      const countText = text('#entryCount');
      const entryList = document.querySelector('.entry-list');
      const detailPanel = document.querySelector('#detailPanel');
      return {
        label: ${JSON.stringify(label)},
        selectedDataset: document.querySelector('#datasetSelect')?.selectedOptions[0]?.textContent.trim() || '',
        selectedPath: document.querySelector('#datasetSelect')?.value || '',
        searchValue: document.querySelector('#stage2Search')?.value || '',
        datasetOptions: [...document.querySelectorAll('#datasetSelect option')].map(option => option.textContent.trim()),
        entryCountText: countText,
        entryCountNumber: Number((countText.match(/\\d+/) || ['0'])[0]),
        entryCards: document.querySelectorAll('.entry-card').length,
        entryIds: [...document.querySelectorAll('.entry-card')].map(card => card.dataset.entryId),
        contextFilterButtons: document.querySelectorAll('.context-chip[data-context-id]').length,
        contextFilterToggle: text('.context-filter-toggle'),
        activeContext: text('.context-chip.active'),
        markers: document.querySelectorAll('.leaflet-marker-icon').length,
        labels: document.querySelectorAll('.leaflet-tooltip.stage2-label').length,
        detailTitle: text('#detailPanel h2'),
        detailHasConfidence: text('#detailPanel').includes('출처'),
        detailHidden: detailPanel ? detailPanel.classList.contains('is-empty') || getComputedStyle(detailPanel).display === 'none' : true,
        detailActions: document.querySelectorAll('[data-detail-action]').length,
        detailPosition: detailPanel ? getComputedStyle(detailPanel).position : '',
        activeEntryCards: document.querySelectorAll('.entry-card.active').length,
        mapZoom: typeof stage2Map !== 'undefined' && stage2Map ? stage2Map.getZoom() : null,
        scrollY: Math.round(window.scrollY),
        mapTop: Math.round(document.querySelector('#stage2Map')?.getBoundingClientRect().top || 0),
        detailTop: detailPanel ? Math.round(detailPanel.getBoundingClientRect().top) : null,
        entryListCanScroll: entryList ? entryList.scrollHeight > entryList.clientHeight : false,
        entryListScrollTop: entryList ? entryList.scrollTop : 0,
        entryListClientHeight: entryList ? entryList.clientHeight : 0,
        entryListScrollHeight: entryList ? entryList.scrollHeight : 0,
        documentHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight
      };
    })()`;

    async function captureState(label) {
      const state = await evaluate(stateExpression(label));
      states.push(state);
      return state;
    }

    async function selectDataset(dataset) {
      const alreadySelected = await evaluate(`(() => {
        const firstEntry = document.querySelector(${JSON.stringify(`.entry-card[data-entry-id="${dataset.firstEntryId}"]`)});
        const count = Number((document.querySelector('#entryCount')?.textContent.match(/\\d+/) || ['0'])[0]);
        return document.querySelector('#datasetSelect')?.value === ${JSON.stringify(dataset.path)} &&
          count === ${dataset.count} &&
          Boolean(firstEntry);
      })()`);

      if (!alreadySelected) {
        await evaluate(`(() => {
          const select = document.getElementById('datasetSelect');
          select.value = ${JSON.stringify(dataset.path)};
          select.dispatchEvent(new Event('change', { bubbles: true }));
        })()`);
      }

      await waitForExpression(
        `document.querySelector('#datasetSelect')?.value === ${JSON.stringify(dataset.path)} &&
          Number((document.querySelector('#entryCount')?.textContent.match(/\\d+/) || ['0'])[0]) === ${dataset.count} &&
          document.querySelectorAll('.entry-card').length === ${dataset.count} &&
          document.querySelectorAll('.leaflet-marker-icon').length === ${dataset.count} &&
          document.querySelectorAll('.leaflet-tooltip.stage2-label').length === ${dataset.count} &&
          Boolean(document.querySelector(${JSON.stringify(`.entry-card[data-entry-id="${dataset.firstEntryId}"]`)}))`,
        `dataset ${dataset.path} count ${dataset.count}`
      );
    }

    async function setSearch(value, expectedCount) {
      await evaluate(`(() => {
        const input = document.getElementById('stage2Search');
        input.value = ${JSON.stringify(value)};
        input.dispatchEvent(new Event('input', { bubbles: true }));
      })()`);
      try {
        await waitForExpression(
          `Number((document.querySelector('#entryCount')?.textContent.match(/\\d+/) || ['0'])[0]) === ${expectedCount} &&
            document.querySelectorAll('.entry-card').length === ${expectedCount} &&
            document.querySelectorAll('.leaflet-marker-icon').length === ${expectedCount} &&
            document.querySelectorAll('.leaflet-tooltip.stage2-label').length === ${expectedCount}`,
          `search ${value}`
        );
      } catch (error) {
        const state = await captureState(`failed-search-${value}`);
        throw new Error(`${error.message}; state=${JSON.stringify(state)}`);
      }
    }

    async function clickEntry(entryId, expectedTitle) {
      await evaluate(`(() => {
        const card = document.querySelector(${JSON.stringify(`.entry-card[data-entry-id="${entryId}"]`)});
        if (!card) throw new Error('missing entry ${entryId}');
        card.click();
      })()`);
      try {
        await waitForExpression(
          `document.querySelector('#detailPanel h2')?.textContent.trim() === ${JSON.stringify(expectedTitle)}`,
          `${expectedTitle} detail opens`
        );
      } catch (error) {
        const state = await captureState(`failed-detail-${entryId}`);
        throw new Error(`${error.message}; state=${JSON.stringify(state)}`);
      }
    }

    async function clickDetailAction(action) {
      await evaluate(`(() => {
        const button = document.querySelector(${JSON.stringify(`[data-detail-action="${action}"]`)});
        if (!button) throw new Error('missing detail action ${action}');
        button.click();
      })()`);
    }

    async function clickContextId(contextId, expectedCount) {
      const isVisible = await evaluate(`(() => Boolean(document.querySelector(${JSON.stringify(`[data-context-id="${contextId}"]`)})))()`);
      if (!isVisible) {
        await evaluate(`(() => {
          const toggle = document.querySelector('[data-filter-toggle="context"]');
          if (!toggle) throw new Error('missing context filter toggle');
          toggle.click();
        })()`);
        await waitForExpression(
          `Boolean(document.querySelector(${JSON.stringify(`[data-context-id="${contextId}"]`)}))`,
          `context ${contextId} visible`
        );
      }

      await evaluate(`(() => {
        const button = document.querySelector(${JSON.stringify(`[data-context-id="${contextId}"]`)});
        if (!button) throw new Error('missing context ${contextId}');
        button.click();
      })()`);
      await waitForExpression(
        `Number((document.querySelector('#entryCount')?.textContent.match(/\\d+/) || ['0'])[0]) === ${expectedCount} &&
          document.querySelectorAll('.entry-card').length === ${expectedCount} &&
          document.querySelectorAll('.leaflet-marker-icon').length === ${expectedCount} &&
          document.querySelectorAll('.leaflet-tooltip.stage2-label').length === ${expectedCount}`,
        `context ${contextId} count ${expectedCount}`
      );
    }

    await navigate(null);
    let state = await captureState('desktop-initial');
    assertCheck(state.datasetOptions.length === datasets.length, 'Desktop should expose the expected dataset count', state);
    assertCheck(state.entryCountNumber === 8 && state.markers === 8 && state.labels === 8, 'Initial Atlantic dataset should render 8 markers/labels', state);
    assertCheck(state.contextFilterButtons <= 4 && state.contextFilterToggle.startsWith('+'), 'Context filters should start compact on desktop', state);
    assertCheck(state.detailHidden && state.detailActions === 0, 'Empty desktop detail panel should stay hidden until an entry is selected', state);

    for (const dataset of datasets) {
      await selectDataset(dataset);
      state = await captureState(`desktop-${dataset.path.split('/').pop().replace('.json', '')}`);
      assertCheck(state.markers === dataset.count && state.labels === dataset.count, 'Dataset switch should not leave stale markers or labels', state);
      assertCheck(state.contextFilterButtons <= 4 && state.contextFilterToggle.startsWith('+'), 'Dataset switch should keep context filters compact', state);
    }

    const greece = datasets.find(dataset => dataset.path.endsWith('ancient-greece-core-preview.json'));
    const persia = datasets.find(dataset => dataset.path.endsWith('achaemenid-persia-core-preview.json'));
    const roman = datasets.find(dataset => dataset.path.endsWith('roman-empire-core-preview.json'));
    const magadha = datasets.find(dataset => dataset.path.endsWith('magadha-maurya-core-preview.json'));
    const mesoamerica = datasets.find(dataset => dataset.path.endsWith('mesoamerica-core-preview.json'));
    const westAfrica = datasets.find(dataset => dataset.path.endsWith('west-africa-early-states-preview.json'));
    const andes = datasets.find(dataset => dataset.path.endsWith('andean-core-sites-preview.json'));
    const southeastAsia = datasets.find(dataset => dataset.path.endsWith('southeast-asia-early-states-preview.json'));
    const maya = datasets.find(dataset => dataset.path.endsWith('maya-lowland-postclassic-preview.json'));
    const swahili = datasets.find(dataset => dataset.path.endsWith('swahili-coast-trade-cities-preview.json'));
    const pacific = datasets.find(dataset => dataset.path.endsWith('lapita-pacific-settlement-preview.json'));
    const northAmerica = datasets.find(dataset => dataset.path.endsWith('north-america-indigenous-mound-urban-centers-preview.json'));
    const indianOcean = datasets.find(dataset => dataset.path.endsWith('indian-ocean-trade-ports-entrepots-preview.json'));
    await selectDataset(greece);
    await setSearch('델포이', 1);
    state = await captureState('desktop-greece-search-delphi');
    assertCheck(state.entryIds.includes('delphi'), 'Greek search should find Delphi', state);

    await clickEntry('delphi', '델포이');
    state = await captureState('desktop-greece-detail-delphi');
    assertCheck(state.detailTitle === '델포이' && state.detailHasConfidence && !state.detailHidden && state.detailActions === 2, 'Greek detail should show title, source confidence, and detail actions', state);

    await clickDetailAction('focus-map');
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() >= 8", 'desktop detail map focus zooms in');
    state = await captureState('desktop-greece-detail-focus-map');
    assertCheck(state.detailTitle === '델포이' && state.mapZoom >= 8, 'Detail map focus should zoom to the selected entry without closing detail', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop detail closes');
    state = await captureState('desktop-greece-detail-closed');
    assertCheck(state.detailHidden && state.detailTitle === '' && state.activeEntryCards === 0 && state.markers === 1 && state.labels === 1, 'Closing detail should clear active entry while preserving current search markers', state);

    await setSearch('', 10);
    await clickContextId('panhellenic-sanctuaries-games', 2);
    state = await captureState('desktop-greece-panhellenic-context');
    assertCheck(
      state.entryIds.includes('delphi') &&
        state.entryIds.includes('olympia') &&
        state.contextFilterButtons <= 4,
      'Panhellenic sanctuary context should return Delphi and Olympia while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Greece');
    state = await captureState('desktop-return-atlantic-after-greece');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('delphi') &&
        !state.entryIds.includes('olympia'),
      'Switching away from Greece should clear stale Greek list, markers, labels, and map view',
      state
    );

    await selectDataset(persia);
    await setSearch('베히스툰', 1);
    state = await captureState('desktop-persia-search-behistun');
    assertCheck(state.entryIds.includes('behistun'), 'Persia search should find Behistun', state);

    await clickEntry('behistun', '베히스툰');
    state = await captureState('desktop-persia-detail-behistun');
    assertCheck(state.detailTitle === '베히스툰' && state.detailHasConfidence && state.detailActions === 2, 'Persia detail should show Behistun and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Persia detail closes');
    state = await captureState('desktop-persia-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing Persia detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('western-anatolian-frontier-satrapies', 2);
    state = await captureState('desktop-persia-western-satrapies-context');
    assertCheck(
      state.entryIds.includes('sardis') &&
        state.entryIds.includes('daskyleion') &&
        state.contextFilterButtons <= 4,
      'Western Anatolian satrapy context should return Sardis and Daskyleion while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Persia');
    state = await captureState('desktop-return-atlantic-after-persia');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('sardis') &&
        !state.entryIds.includes('daskyleion'),
      'Switching away from Persia should clear stale Persian list, markers, labels, and map view',
      state
    );

    await selectDataset(roman);
    await setSearch('트리어', 1);
    state = await captureState('desktop-roman-search-trier');
    assertCheck(state.entryIds.includes('trier-roman-monuments'), 'Roman search should find Trier', state);

    await clickEntry('trier-roman-monuments', '트리어 로마 유적');
    state = await captureState('desktop-roman-detail-trier');
    assertCheck(state.detailTitle === '트리어 로마 유적' && state.detailHasConfidence && state.detailActions === 2, 'Roman detail should show Trier and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Roman detail closes');
    state = await captureState('desktop-roman-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing Roman detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('imperial-frontiers-britain-rhine', 2);
    state = await captureState('desktop-roman-frontier-context');
    assertCheck(
      state.entryIds.includes('hadrians-wall') &&
        state.entryIds.includes('trier-roman-monuments') &&
        state.contextFilterButtons <= 4,
      'Roman frontier context should return Hadrian wall and Trier while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Roman dataset');
    state = await captureState('desktop-return-atlantic-after-roman');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('hadrians-wall') &&
        !state.entryIds.includes('trier-roman-monuments'),
      'Switching away from Roman dataset should clear stale Roman list, markers, labels, and map view',
      state
    );

    await selectDataset(magadha);
    await setSearch('다울리', 1);
    state = await captureState('desktop-magadha-search-dhauli');
    assertCheck(state.entryIds.includes('dhauli'), 'Magadha-Maurya search should find Dhauli', state);

    await clickEntry('dhauli', '다울리');
    state = await captureState('desktop-magadha-detail-dhauli');
    assertCheck(state.detailTitle === '다울리' && state.detailHasConfidence && state.detailActions === 2, 'Magadha-Maurya detail should show Dhauli and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Magadha-Maurya detail closes');
    state = await captureState('desktop-magadha-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing Magadha-Maurya detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('ashokan-monuments-edicts-dhamma', 5);
    state = await captureState('desktop-magadha-ashokan-context');
    assertCheck(
      state.entryIds.includes('sanchi') &&
        state.entryIds.includes('dhauli') &&
        state.entryIds.includes('barabar-caves') &&
        state.contextFilterButtons <= 4,
      'Ashokan context should return Sanchi, Dhauli, and Barabar while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Magadha-Maurya dataset');
    state = await captureState('desktop-return-atlantic-after-magadha');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('dhauli') &&
        !state.entryIds.includes('barabar-caves'),
      'Switching away from Magadha-Maurya dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(mesoamerica);
    await setSearch('테오티우아칸', 2);
    state = await captureState('desktop-mesoamerica-search-teotihuacan');
    assertCheck(state.entryIds.includes('tikal') && state.entryIds.includes('teotihuacan'), 'Mesoamerica search should find Teotihuacan-related entries', state);

    await clickEntry('teotihuacan', '테오티우아칸');
    state = await captureState('desktop-mesoamerica-detail-teotihuacan');
    assertCheck(state.detailTitle === '테오티우아칸' && state.detailHasConfidence && state.detailActions === 2, 'Mesoamerica detail should show Teotihuacan and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Mesoamerica detail closes');
    state = await captureState('desktop-mesoamerica-detail-closed');
    assertCheck(state.detailHidden && state.markers === 2 && state.labels === 2, 'Closing Mesoamerica detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('mesoamerican-long-distance-exchange-ritual', 6);
    state = await captureState('desktop-mesoamerica-exchange-context');
    assertCheck(
      state.entryIds.includes('san-lorenzo-tenochtitlan') &&
        state.entryIds.includes('la-venta') &&
        state.entryIds.includes('tikal') &&
        state.entryIds.includes('chichen-itza') &&
        state.entryIds.includes('teotihuacan') &&
        state.entryIds.includes('tenochtitlan') &&
        state.contextFilterButtons <= 4,
      'Mesoamerican exchange context should return Olmec, Maya, Teotihuacan, and Tenochtitlan entries while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Mesoamerica dataset');
    state = await captureState('desktop-return-atlantic-after-mesoamerica');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('teotihuacan') &&
        !state.entryIds.includes('tenochtitlan'),
      'Switching away from Mesoamerica dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(westAfrica);
    await setSearch('팀북투', 1);
    state = await captureState('desktop-west-africa-search-timbuktu');
    assertCheck(state.entryIds.includes('timbuktu'), 'West Africa search should find Timbuktu', state);

    await clickEntry('timbuktu', '팀북투');
    state = await captureState('desktop-west-africa-detail-timbuktu');
    assertCheck(state.detailTitle === '팀북투' && state.detailHasConfidence && state.detailActions === 2, 'West Africa detail should show Timbuktu and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop West Africa detail closes');
    state = await captureState('desktop-west-africa-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing West Africa detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('trans-saharan-gold-salt-trade', 4);
    state = await captureState('desktop-west-africa-trans-saharan-context');
    assertCheck(
      state.entryIds.includes('timbuktu') &&
        state.entryIds.includes('gao') &&
        state.entryIds.includes('koumbi-saleh') &&
        state.entryIds.includes('aoudaghost') &&
        state.contextFilterButtons <= 4,
      'Trans-Saharan context should return Timbuktu, Gao, Koumbi Saleh, and Aoudaghost while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after West Africa dataset');
    state = await captureState('desktop-return-atlantic-after-west-africa');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('timbuktu') &&
        !state.entryIds.includes('aoudaghost'),
      'Switching away from West Africa dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(andes);
    await setSearch('마추픽추', 1);
    state = await captureState('desktop-andes-search-machu-picchu');
    assertCheck(state.entryIds.includes('machu-picchu'), 'Andes search should find Machu Picchu', state);

    await clickEntry('machu-picchu', '마추픽추');
    state = await captureState('desktop-andes-detail-machu-picchu');
    assertCheck(state.detailTitle === '마추픽추' && state.detailHasConfidence && state.detailActions === 2, 'Andes detail should show Machu Picchu and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Andes detail closes');
    state = await captureState('desktop-andes-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing Andes detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('inca-imperial-sacred-geography', 3);
    state = await captureState('desktop-andes-inca-sacred-geography-context');
    assertCheck(
      state.entryIds.includes('cusco') &&
        state.entryIds.includes('machu-picchu') &&
        state.entryIds.includes('sacsayhuaman') &&
        state.contextFilterButtons <= 4,
      'Inca sacred geography context should return Cusco, Machu Picchu, and Sacsayhuaman while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Andes dataset');
    state = await captureState('desktop-return-atlantic-after-andes');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('machu-picchu') &&
        !state.entryIds.includes('sacsayhuaman'),
      'Switching away from Andes dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(southeastAsia);
    await setSearch('앙코르', 1);
    state = await captureState('desktop-southeast-asia-search-angkor');
    assertCheck(state.entryIds.includes('angkor'), 'Southeast Asia search should find Angkor', state);

    await clickEntry('angkor', '앙코르');
    state = await captureState('desktop-southeast-asia-detail-angkor');
    assertCheck(state.detailTitle === '앙코르' && state.detailHasConfidence && state.detailActions === 2, 'Southeast Asia detail should show Angkor and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Southeast Asia detail closes');
    state = await captureState('desktop-southeast-asia-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing Southeast Asia detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('mainland-theravada-urban-states', 3);
    state = await captureState('desktop-southeast-asia-theravada-context');
    assertCheck(
      state.entryIds.includes('bagan') &&
        state.entryIds.includes('sukhothai') &&
        state.entryIds.includes('ayutthaya') &&
        state.contextFilterButtons <= 4,
      'Mainland Theravada context should return Bagan, Sukhothai, and Ayutthaya while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Southeast Asia dataset');
    state = await captureState('desktop-return-atlantic-after-southeast-asia');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('angkor') &&
        !state.entryIds.includes('ayutthaya'),
      'Switching away from Southeast Asia dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(maya);
    await setSearch('야슈칠란', 2);
    state = await captureState('desktop-maya-search-yaxchilan');
    assertCheck(state.entryIds.includes('bonampak') && state.entryIds.includes('yaxchilan'), 'Maya search should find Yaxchilan-related entries', state);

    await clickEntry('yaxchilan', '야슈칠란');
    state = await captureState('desktop-maya-detail-yaxchilan');
    assertCheck(state.detailTitle === '야슈칠란' && state.detailHasConfidence && state.detailActions === 2, 'Maya detail should show Yaxchilan and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Maya detail closes');
    state = await captureState('desktop-maya-detail-closed');
    assertCheck(state.detailHidden && state.markers === 2 && state.labels === 2, 'Closing Maya detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('usumacinta-river-cities', 3);
    state = await captureState('desktop-maya-usumacinta-context');
    assertCheck(
      state.entryIds.includes('palenque') &&
        state.entryIds.includes('bonampak') &&
        state.entryIds.includes('yaxchilan') &&
        state.contextFilterButtons <= 4,
      'Usumacinta context should return Palenque, Bonampak, and Yaxchilan while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Maya dataset');
    state = await captureState('desktop-return-atlantic-after-maya');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('yaxchilan') &&
        !state.entryIds.includes('bonampak'),
      'Switching away from Maya dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(swahili);
    await setSearch('잔지바르', 1);
    state = await captureState('desktop-swahili-search-zanzibar');
    assertCheck(state.entryIds.includes('zanzibar-stone-town'), 'Swahili Coast search should find Zanzibar Stone Town', state);

    await clickEntry('zanzibar-stone-town', '잔지바르 스톤타운');
    state = await captureState('desktop-swahili-detail-zanzibar');
    assertCheck(state.detailTitle === '잔지바르 스톤타운' && state.detailHasConfidence && state.detailActions === 2, 'Swahili Coast detail should show Zanzibar Stone Town and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Swahili Coast detail closes');
    state = await captureState('desktop-swahili-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing Swahili Coast detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('kilwa-sofala-great-zimbabwe-gold-route', 3);
    state = await captureState('desktop-swahili-gold-route-context');
    assertCheck(
      state.entryIds.includes('kilwa-kisiwani') &&
        state.entryIds.includes('sofala') &&
        state.entryIds.includes('great-zimbabwe') &&
        state.contextFilterButtons <= 4,
      'Kilwa-Sofala-Great Zimbabwe gold route should return the coastal and inland gold-route entries while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Swahili Coast dataset');
    state = await captureState('desktop-return-atlantic-after-swahili');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('zanzibar-stone-town') &&
        !state.entryIds.includes('great-zimbabwe'),
      'Switching away from Swahili Coast dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(pacific);
    await setSearch('라파누이', 1);
    state = await captureState('desktop-pacific-search-rapa-nui');
    assertCheck(state.entryIds.includes('rapa-nui'), 'Pacific search should find Rapa Nui', state);

    await clickEntry('rapa-nui', '라파누이');
    state = await captureState('desktop-pacific-detail-rapa-nui');
    assertCheck(state.detailTitle === '라파누이' && state.detailHasConfidence && state.detailActions === 2, 'Pacific detail should show Rapa Nui and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Pacific detail closes');
    state = await captureState('desktop-pacific-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing Pacific detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('western-polynesian-lapita-settlement', 2);
    state = await captureState('desktop-pacific-western-polynesia-context');
    assertCheck(
      state.entryIds.includes('nukuleka-lapita') &&
        state.entryIds.includes('mulifanua-lapita') &&
        state.contextFilterButtons <= 4,
      'Western Polynesian Lapita context should return Nukuleka and Mulifanua while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Pacific dataset');
    state = await captureState('desktop-return-atlantic-after-pacific');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('rapa-nui') &&
        !state.entryIds.includes('mulifanua-lapita'),
      'Switching away from Pacific dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(northAmerica);
    await setSearch('카호키아', 1);
    state = await captureState('desktop-north-america-search-cahokia');
    assertCheck(state.entryIds.includes('cahokia-mounds'), 'North America search should find Cahokia Mounds', state);

    await clickEntry('cahokia-mounds', '카호키아 마운즈');
    state = await captureState('desktop-north-america-detail-cahokia');
    assertCheck(state.detailTitle === '카호키아 마운즈' && state.detailHasConfidence && state.detailActions === 2, 'North America detail should show Cahokia Mounds and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop North America detail closes');
    state = await captureState('desktop-north-america-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing North America detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('southeastern-mississippian-chiefdom-centers', 2);
    state = await captureState('desktop-north-america-southeastern-mississippian-context');
    assertCheck(
      state.entryIds.includes('etowah-mounds') &&
        state.entryIds.includes('moundville') &&
        state.contextFilterButtons <= 4,
      'Southeastern Mississippian context should return Etowah and Moundville while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after North America dataset');
    state = await captureState('desktop-return-atlantic-after-north-america');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('cahokia-mounds') &&
        !state.entryIds.includes('moundville'),
      'Switching away from North America dataset should clear stale list, markers, labels, and map view',
      state
    );

    await selectDataset(indianOcean);
    await setSearch('말라카', 1);
    state = await captureState('desktop-indian-ocean-search-malacca');
    assertCheck(state.entryIds.includes('malacca'), 'Indian Ocean search should find Malacca', state);

    await clickEntry('malacca', '말라카');
    state = await captureState('desktop-indian-ocean-detail-malacca');
    assertCheck(state.detailTitle === '말라카' && state.detailHasConfidence && state.detailActions === 2, 'Indian Ocean detail should show Malacca and detail actions', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'desktop Indian Ocean detail closes');
    state = await captureState('desktop-indian-ocean-detail-closed');
    assertCheck(state.detailHidden && state.markers === 1 && state.labels === 1, 'Closing Indian Ocean detail should preserve current search markers', state);

    await setSearch('', 8);
    await clickContextId('persian-gulf-islamic-entrepots', 3);
    state = await captureState('desktop-indian-ocean-persian-gulf-context');
    assertCheck(
      state.entryIds.includes('hormuz') &&
        state.entryIds.includes('basra') &&
        state.entryIds.includes('siraf') &&
        state.contextFilterButtons <= 4,
      'Persian Gulf Islamic entrepots context should return Hormuz, Basra, and Siraf while filters collapse again',
      state
    );

    await selectDataset(datasets[0]);
    await waitForExpression("typeof stage2Map !== 'undefined' && stage2Map.getZoom() <= 4", 'Atlantic map refits after Indian Ocean dataset');
    state = await captureState('desktop-return-atlantic-after-indian-ocean');
    assertCheck(
      state.entryCountNumber === 8 &&
        state.markers === 8 &&
        state.labels === 8 &&
        state.mapZoom <= 4 &&
        !state.entryIds.includes('malacca') &&
        !state.entryIds.includes('hormuz'),
      'Switching away from Indian Ocean dataset should clear stale list, markers, labels, and map view',
      state
    );

    const desktopPng = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
    await writeFile(desktopShot, Buffer.from(desktopPng.data, 'base64'));

    await navigate({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      screenWidth: 390,
      screenHeight: 844,
      screenOrientation: { type: 'portraitPrimary', angle: 0 }
    });

    await selectDataset(indianOcean);
    await evaluate(`(() => {
      const list = document.querySelector('.entry-list');
      list.scrollTop = 360;
    })()`);
    await waitForExpression("document.querySelector('.entry-list')?.scrollTop > 0", 'mobile entry list scrolls');
    state = await captureState('mobile-indian-ocean-list-scroll');
    assertCheck(state.entryListCanScroll && state.entryListScrollTop > 0 && state.contextFilterButtons <= 4, 'Mobile Stage 2 entry list should scroll independently with compact filters', state);

    await clickEntry('aden', '아덴');
    await waitForExpression("document.querySelector('#detailPanel')?.getBoundingClientRect().top < 80", 'mobile detail scrolls into view');
    state = await captureState('mobile-indian-ocean-detail-aden');
    assertCheck(state.detailTitle === '아덴' && state.detailPosition === 'static' && state.detailTop < 80 && state.documentHeight > state.viewportHeight, 'Mobile detail should sit in normal page flow and scroll into view after selection', state);

    await clickDetailAction('focus-map');
    await waitForExpression("(() => { const top = document.querySelector('#stage2Map')?.getBoundingClientRect().top || 0; return typeof stage2Map !== 'undefined' && stage2Map.getZoom() >= 8 && top > -80 && top < window.innerHeight - 80; })()", 'mobile detail map focus returns to map');
    state = await captureState('mobile-indian-ocean-focus-map');
    assertCheck(state.detailTitle === '아덴' && state.mapTop > -80 && state.mapTop < state.viewportHeight - 80 && state.mapZoom >= 8, 'Mobile map focus should return to the selected map location', state);

    await clickDetailAction('close');
    await waitForExpression("document.querySelector('#detailPanel')?.classList.contains('is-empty') && !document.querySelector('.entry-card.active')", 'mobile detail closes');
    state = await captureState('mobile-indian-ocean-detail-closed');
    assertCheck(state.detailHidden && state.activeEntryCards === 0 && state.mapTop > -80 && state.mapTop < state.viewportHeight - 80, 'Mobile close should hide detail and return to the map area', state);

    const mobilePng = await client.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false }, sessionId);
    await writeFile(mobileShot, Buffer.from(mobilePng.data, 'base64'));

    assertCheck(runtimeErrors.length === 0, 'Browser runtime errors detected', runtimeErrors);

    console.log(JSON.stringify({
      ok: true,
      url: targetUrl,
      checkedDatasets: datasets.length,
      checkedEntries: datasets.reduce((total, dataset) => total + dataset.count, 0),
      desktopShot,
      mobileShot,
      states,
      runtimeErrors
    }, null, 2));
  } finally {
    if (client) client.close();
    chrome.kill();
    await sleep(750);
    await rm(userDataDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exit(1);
});
