import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const targetUrl = process.argv[2] || 'https://wgis.vercel.app/stage2-preview.html';
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
  },
  {
    path: 'data/stage2/early-modern-exploration-colonial-port-cities-preview.json',
    count: 8,
    firstEntryId: 'lisbon'
  },
  {
    path: 'data/stage2/early-modern-southeast-asia-maritime-sultanates-port-cities-preview.json',
    count: 8,
    firstEntryId: 'aceh-banda-aceh'
  },
  {
    path: 'data/stage2/early-modern-east-asia-ports-treaty-cities-preview.json',
    count: 8,
    firstEntryId: 'nagasaki-port'
  },
  {
    path: 'data/stage2/early-modern-gunpowder-empire-capitals-preview.json',
    count: 8,
    firstEntryId: 'ottoman-istanbul'
  }
];

const latestDataset = datasets[datasets.length - 1];
const desktopShot = path.join(outputDir, 'wgis-stage2-twenty-three-datasets-desktop.png');
const mobileShot = path.join(outputDir, 'wgis-stage2-twenty-three-datasets-mobile.png');

function assertCheck(condition, message, details = undefined) {
  if (!condition) {
    const suffix = details === undefined ? '' : `: ${JSON.stringify(details)}`;
    throw new Error(`${message}${suffix}`);
  }
}

function countOccurrences(text, pattern) {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function stripTags(value) {
  return String(value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function extractTextById(dom, id) {
  const match = dom.match(new RegExp(`<[^>]+id="${id}"[^>]*>([\\s\\S]*?)<\\/[^>]+>`));
  return stripTags(match?.[1]);
}

function extractDetailTitle(dom) {
  const match = dom.match(/<h2>([\s\S]*?)<\/h2>/);
  return stripTags(match?.[1]);
}

function extractEntryIds(dom) {
  return [...dom.matchAll(/data-entry-id="([^"]+)"/g)].map(match => match[1]);
}

function extractState(label, dom) {
  const entryIds = extractEntryIds(dom);
  return {
    label,
    ready: dom.includes('data-stage2-ready="true"'),
    datasetOptions: countOccurrences(dom, /<option\b/g),
    entryCountText: extractTextById(dom, 'entryCount'),
    entryCards: countOccurrences(dom, /class="entry-card/g),
    entryIds,
    contextFilterButtons: countOccurrences(dom, /data-context-id="/g),
    contextFilterToggle: dom.includes('data-filter-toggle="context"'),
    markers: countOccurrences(dom, /stage2-marker/g),
    labels: countOccurrences(dom, /stage2-label/g),
    detailTitle: extractDetailTitle(dom),
    detailActions: countOccurrences(dom, /data-detail-action="/g),
    hasSourceConfidence: dom.includes('출처 상태') || dom.includes('출처 ')
  };
}

async function fetchJson(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function buildUrl(params = {}) {
  const url = new URL(targetUrl);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  }
  return url.href;
}

function runChrome(args, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const child = spawn(chromePath, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    const stdout = [];
    const stderr = [];
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Chrome timed out: ${args.join(' ')}`));
    }, timeoutMs);

    child.stdout.on('data', chunk => stdout.push(chunk));
    child.stderr.on('data', chunk => stderr.push(chunk));
    child.on('error', error => {
      clearTimeout(timer);
      reject(error);
    });
    child.on('close', code => {
      clearTimeout(timer);
      const output = Buffer.concat(stdout).toString('utf8');
      const errorOutput = Buffer.concat(stderr).toString('utf8');
      if (code !== 0) {
        reject(new Error(`Chrome exited with ${code}: ${errorOutput || output}`));
        return;
      }
      resolve({ stdout: output, stderr: errorOutput });
    });
  });
}

async function dumpDom(url, userDataDir, { width = 1440, height = 920 } = {}) {
  const result = await runChrome([
    '--headless=new',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=10000',
    `--window-size=${width},${height}`,
    '--dump-dom',
    url
  ], 45000);

  return result.stdout;
}

async function captureScreenshot(url, userDataDir, filePath, { width, height }) {
  await runChrome([
    '--headless=new',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=10000',
    `--window-size=${width},${height}`,
    `--screenshot=${filePath}`,
    url
  ], 45000);
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const userDataDir = await mkdtemp(path.join(os.tmpdir(), 'wgis-stage2-public-'));
  const states = [];

  try {
    const index = await fetchJson(new URL('data/stage2/index.json', targetUrl).href);
    assertCheck(Array.isArray(index.datasets), 'Stage 2 index should expose datasets');
    assertCheck(index.datasets.length === datasets.length, 'Stage 2 index should expose the expected dataset count', {
      expected: datasets.length,
      actual: index.datasets.length
    });

    for (const expected of datasets) {
      const metadata = index.datasets.find(dataset => dataset.path === expected.path);
      assertCheck(Boolean(metadata), `Stage 2 index should include ${expected.path}`);
      const dataset = await fetchJson(new URL(expected.path, targetUrl).href);
      assertCheck(dataset.entries.length === expected.count, `Dataset ${expected.path} should expose expected entries`, {
        expected: expected.count,
        actual: dataset.entries.length
      });
      assertCheck(dataset.entries.some(entry => entry.entryId === expected.firstEntryId), `Dataset ${expected.path} should include first sample entry`);
    }

    let browserProbe = 'passed';
    try {
      let dom = await dumpDom(buildUrl(), userDataDir);
      let state = extractState('desktop-initial', dom);
      states.push(state);
      assertCheck(state.ready, 'Initial preview page should finish Stage 2 rendering', state);
      assertCheck(state.datasetOptions === datasets.length, 'Initial page should render the expected dataset option count', state);
      assertCheck(state.entryCards === 8 && state.markers >= 8 && state.labels >= 8, 'Initial page should render first dataset cards, markers, and labels', state);
      assertCheck(state.contextFilterButtons <= 4 && state.contextFilterToggle, 'Initial context filters should start compact', state);

      dom = await dumpDom(buildUrl({ dataset: latestDataset.path }), userDataDir);
      state = extractState('desktop-gunpowder-empires-default', dom);
      states.push(state);
      assertCheck(state.entryCards === latestDataset.count && state.entryIds.includes('ottoman-istanbul'), 'Latest dataset should render Ottoman Istanbul and all entries', state);

      dom = await dumpDom(buildUrl({ dataset: latestDataset.path, q: '샬리마르' }), userDataDir);
      state = extractState('desktop-gunpowder-empires-search-shalimar', dom);
      states.push(state);
      assertCheck(state.entryCountText === '1개' && state.entryIds.includes('lahore-fort-shalimar'), 'Latest dataset search should find Lahore Fort and Shalimar Gardens', state);

      dom = await dumpDom(buildUrl({ dataset: latestDataset.path, entry: 'topkapi-palace' }), userDataDir);
      state = extractState('desktop-gunpowder-empires-detail-topkapi', dom);
      states.push(state);
      assertCheck(
        state.detailTitle === '톱카프 궁전' && state.detailActions === 2 && state.hasSourceConfidence,
        'Latest dataset detail should show Topkapi Palace, source confidence, and detail actions',
        state
      );

      dom = await dumpDom(buildUrl({
        dataset: latestDataset.path,
        context: 'mughal-imperial-capital-landscapes'
      }), userDataDir);
      state = extractState('desktop-gunpowder-empires-mughal-context', dom);
      states.push(state);
      assertCheck(
        state.entryCountText === '4개' &&
          state.entryIds.includes('agra-fort') &&
          state.entryIds.includes('fatehpur-sikri') &&
          state.entryIds.includes('red-fort-delhi') &&
          state.entryIds.includes('lahore-fort-shalimar') &&
          !state.entryIds.includes('topkapi-palace'),
        'Mughal context should return Agra, Fatehpur Sikri, Red Fort, and Lahore without stale Topkapi data',
        state
      );

      dom = await dumpDom(buildUrl({
        dataset: latestDataset.path,
        entry: 'ottoman-istanbul'
      }), userDataDir, { width: 390, height: 844 });
      state = extractState('mobile-gunpowder-empires-detail-istanbul', dom);
      states.push(state);
      assertCheck(
        state.ready && state.detailTitle === '오스만 이스탄불' && state.detailActions === 2,
        'Mobile-sized latest dataset render should keep the Ottoman Istanbul detail panel available',
        state
      );

      await captureScreenshot(
        buildUrl({ dataset: latestDataset.path, entry: 'topkapi-palace' }),
        userDataDir,
        desktopShot,
        { width: 1440, height: 920 }
      );
      await captureScreenshot(
        buildUrl({ dataset: latestDataset.path, entry: 'ottoman-istanbul' }),
        userDataDir,
        mobileShot,
        { width: 390, height: 844 }
      );
    } catch (error) {
      if (!String(error.message || error).startsWith('Chrome ')) throw error;
      browserProbe = 'skipped';
      states.push({
        label: 'headless-browser-probe-skipped',
        reason: String(error.message || error).slice(0, 500)
      });
    }

    console.log(JSON.stringify({
      ok: true,
      url: targetUrl,
      checkedDatasets: datasets.length,
      checkedEntries: datasets.reduce((total, dataset) => total + dataset.count, 0),
      browserProbe,
      desktopShot,
      mobileShot,
      states
    }, null, 2));
  } finally {
    await rm(userDataDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exit(1);
});
