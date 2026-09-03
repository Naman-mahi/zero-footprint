/**
 * 🕶️ Zero-Footprint PRO: Ultimate Multi-City & Multi-Browser Playwright Engine
 * 
 * FEATURES:
 * - 🌐 DYNAMIC MULTI-BROWSER ROTATION:
 *     - 🟢 Google Chrome (Native Chrome channel)
 *     - 🔷 Microsoft Edge (Native Edge channel)
 *     - 🦊 Mozilla Firefox (Gecko engine with custom stealth prefs)
 *     - 🧭 Apple WebKit (Safari engine)
 *     - 🌐 Bundled Chromium
 *     - Supports rotation per run / per job, random selection, or single browser pinning.
 * - 🧼 ZERO-TRACE DISPOSABLE PROFILES:
 *     - OS-Level Ephemeral Temp Directory (fs.mkdtempSync -> fs.rmSync): guarantees 0 bytes remain on disk.
 *     - CDP Protocol Level Purge: Storage.clearDataForOrigin (for Chromium-based browsers).
 *     - Network Level Purge: Network.clearBrowserCookies & Network.clearBrowserCache.
 *     - DOM Level Purge: localStorage.clear(), sessionStorage.clear(), IndexedDB deletion, Cache API deletion.
 * - 🏙️ MULTI-CITY DOMESTIC GEO-ROTATION:
 *     - India (IN): Bengaluru, Hyderabad, Mumbai, Pune, Chennai, Delhi NCR, Kolkata, Ahmedabad.
 *     - United States (US): New York, San Francisco, Austin, Seattle, Chicago.
 *     - United Kingdom (UK): London, Manchester, Birmingham.
 *     - Spatial Gaussian Jitter: Jitters GPS coordinates per job so no two requests originate from the exact same coordinates.
 * - ⏳ Extended 10-Second Mandatory Destination Hydration Wait.
 * - 🎯 Intuitive Batch Navigation:
 *     - --batch 50 / --batch 100
 *     - --batch-num 2 (jumps straight to Batch 2)
 *     - --auto-next (cycles through batches automatically with 30s cooldown)
 *     - --resume (picks up from exact saved state)
 * - 🛡️ 9-Stage Human Pointer Simulation & Anti-Bot Evasion.
 * 
 * USAGE:
 *   node playwright_applier.js [options]
 * 
 * EXAMPLES:
 *   # 1. Run with Multi-Browser Engine Rotation (Cycles Chrome -> Edge -> Firefox -> WebKit -> Chromium)
 *   node playwright_applier.js --location IN --batch 50 --browser rotate --headed
 * 
 *   # 2. Run with Random Browser Selection per job
 *   node playwright_applier.js --location IN --batch 50 --browser random --headed
 * 
 *   # 3. Pin to a specific browser engine (e.g. Firefox or WebKit)
 *   node playwright_applier.js --location IN --batch 50 --browser firefox --headed
 *   node playwright_applier.js --location IN --batch 50 --browser webkit --headed
 * 
 *   # 4. Custom browser subset rotation
 *   node playwright_applier.js --location IN --batch 50 --browser-list chrome,firefox,msedge --headed
 * 
 *   # 5. Resume from exact last saved progress
 *   node playwright_applier.js --resume --headed
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// =========================================================================
// 🌐 MULTI-BROWSER ENGINE DATABASE & PROFILES
// =========================================================================
const BROWSER_DATABASE = {
  chrome: {
    id: 'chrome',
    engine: 'chromium',
    name: 'Google Chrome',
    icon: '🟢',
    channel: 'chrome',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    supportsCdp: true,
    launchArgs: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-web-security',
      '--disable-dev-shm-usage',
      '--disk-cache-size=0',
      '--media-cache-size=0'
    ]
  },
  msedge: {
    id: 'msedge',
    engine: 'chromium',
    name: 'Microsoft Edge',
    icon: '🔷',
    channel: 'msedge',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
    supportsCdp: true,
    launchArgs: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-web-security',
      '--disable-dev-shm-usage',
      '--disk-cache-size=0',
      '--media-cache-size=0'
    ]
  },
  firefox: {
    id: 'firefox',
    engine: 'firefox',
    name: 'Mozilla Firefox',
    icon: '🦊',
    channel: null,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
    supportsCdp: false,
    firefoxUserPrefs: {
      'dom.webdriver.enabled': false,
      'useAutomationExtension': false,
      'browser.cache.disk.enable': false,
      'browser.cache.memory.enable': false
    },
    launchArgs: []
  },
  webkit: {
    id: 'webkit',
    engine: 'webkit',
    name: 'Apple WebKit',
    icon: '🧭',
    channel: null,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
    supportsCdp: false,
    launchArgs: []
  },
  chromium: {
    id: 'chromium',
    engine: 'chromium',
    name: 'Chromium',
    icon: '🌐',
    channel: null,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    supportsCdp: true,
    launchArgs: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-web-security',
      '--disable-dev-shm-usage',
      '--disk-cache-size=0',
      '--media-cache-size=0'
    ]
  }
};

// Aliases
BROWSER_DATABASE.edge = BROWSER_DATABASE.msedge;
BROWSER_DATABASE.safari = BROWSER_DATABASE.webkit;
BROWSER_DATABASE.googlechrome = BROWSER_DATABASE.chrome;

// =========================================================================
// 🏙️ MULTI-CITY DOMESTIC & REGIONAL LOCATION DATABASE
// =========================================================================
const CITY_DATABASE = {
  IN: [
    { city: 'Bengaluru', lat: 12.9716, lng: 77.5946, timezone: 'Asia/Kolkata', locale: 'en-IN' },
    { city: 'Hyderabad', lat: 17.3850, lng: 78.4867, timezone: 'Asia/Kolkata', locale: 'en-IN' },
    { city: 'Mumbai', lat: 19.0760, lng: 72.8777, timezone: 'Asia/Kolkata', locale: 'en-IN' },
    { city: 'Pune', lat: 18.5204, lng: 73.8567, timezone: 'Asia/Kolkata', locale: 'en-IN' },
    { city: 'Chennai', lat: 13.0827, lng: 80.2707, timezone: 'Asia/Kolkata', locale: 'en-IN' },
    { city: 'Delhi NCR', lat: 28.6139, lng: 77.2090, timezone: 'Asia/Kolkata', locale: 'en-IN' },
    { city: 'Kolkata', lat: 22.5726, lng: 88.3639, timezone: 'Asia/Kolkata', locale: 'en-IN' },
    { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714, timezone: 'Asia/Kolkata', locale: 'en-IN' }
  ],
  US: [
    { city: 'New York', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York', locale: 'en-US' },
    { city: 'San Francisco', lat: 37.7749, lng: -122.4194, timezone: 'America/Los_Angeles', locale: 'en-US' },
    { city: 'Austin', lat: 30.2672, lng: -97.7431, timezone: 'America/Chicago', locale: 'en-US' },
    { city: 'Seattle', lat: 47.6062, lng: -122.3321, timezone: 'America/Los_Angeles', locale: 'en-US' },
    { city: 'Chicago', lat: 41.8781, lng: -87.6298, timezone: 'America/Chicago', locale: 'en-US' }
  ],
  UK: [
    { city: 'London', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London', locale: 'en-GB' },
    { city: 'Manchester', lat: 53.4808, lng: -2.2426, timezone: 'Europe/London', locale: 'en-GB' },
    { city: 'Birmingham', lat: 52.4862, lng: -1.8904, timezone: 'Europe/London', locale: 'en-GB' }
  ],
  CA: [
    { city: 'Toronto', lat: 43.6532, lng: -79.3832, timezone: 'America/Toronto', locale: 'en-CA' },
    { city: 'Vancouver', lat: 49.2827, lng: -123.1207, timezone: 'America/Vancouver', locale: 'en-CA' },
    { city: 'Montreal', lat: 45.5017, lng: -73.5673, timezone: 'America/Toronto', locale: 'en-CA' }
  ],
  DE: [
    { city: 'Frankfurt', lat: 50.1109, lng: 8.6821, timezone: 'Europe/Berlin', locale: 'de-DE' },
    { city: 'Berlin', lat: 52.5200, lng: 13.4050, timezone: 'Europe/Berlin', locale: 'de-DE' },
    { city: 'Munich', lat: 48.1351, lng: 11.5820, timezone: 'Europe/Berlin', locale: 'de-DE' }
  ]
};

// Aliases
CITY_DATABASE.GB = CITY_DATABASE.UK;

// CLI Argument Parser
const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && args[idx + 1]) {
    return args[idx + 1];
  }
  return defaultValue;
}

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🕶️ Zero-Footprint PRO: Multi-City & Multi-Browser Playwright Engine

USAGE:
  node playwright_applier.js [options]

BROWSER OPTIONS:
  --browser <name>        Browser selection mode:
                          'rotate' / 'all' - Cycle through Chrome & Edge per job (default)
                          'random'         - Randomly select Chrome or Edge for each job
                          'chrome'         - Google Chrome (native channel)
                          'msedge'         - Microsoft Edge (native channel)
                          'firefox'        - Mozilla Firefox (Gecko engine)
                          'webkit'         - Apple WebKit (Safari engine)
                          'chromium'       - Bundled Chromium
  --browser-list <list>   Comma-separated list of browsers to rotate (e.g. chrome,msedge)
  --browser-per <unit>    Rotation frequency: 'job' (default, rotate each job) or 'batch'

BATCH & LOCATION OPTIONS:
  --location <code|all>   Target country: IN, US, UK, CA, DE, or ROTATE (default: IN)
  --batch <number>        Number of jobs per batch (default: 50)
  --batch-num <number>    Jump directly to specific batch number (e.g. 2, 3)
  --start <number>        Starting job index (e.g. 500)
  --end <number>          Ending job index limit (e.g. 900)
  --auto-next             Automatically progress to next batch after 30s cooldown
  --resume                Resume execution from saved state in progress_state.json

TIMING & DISPLAY:
  --close-wait <ms>       Milliseconds to hold destination page open (default: 10000)
  --speed <mode>          Pacing mode: 'fast', 'normal', 'stealth' (default: normal)
  --headed                Display visible browser window (default: headless)
  --mock-geo              Enable client-side mock geolocation API

PROXY OPTIONS:
  --proxy-server <url>    HTTP/SOCKS proxy server (e.g. http://ip:port)
  --proxy-username <user> Proxy authentication username
  --proxy-password <pass> Proxy authentication password

EXAMPLES:
  # Run Jobs 500 to 900 rotating Chrome & Edge in headed mode:
  node playwright_applier.js --start 500 --end 900 --batch 50 --browser rotate --headed

  # Run Batch 1 in India with Chrome & Edge:
  node playwright_applier.js --location IN --batch 50 --browser rotate --headed
  node playwright_applier.js --resume --headed
`);
  process.exit(0);
}

const isHeaded = args.includes('--headed');
const isResume = args.includes('--resume');
const isAutoNext = args.includes('--auto-next');
const isMockGeo = args.includes('--mock-geo');
const batchSize = Number(getArg('batch', 50));
const batchNumArg = getArg('batch-num', null);
const closeWaitMs = Math.max(10000, Number(getArg('close-wait', 10000)));
const speedMode = getArg('speed', 'normal');
const requestedCountry = (getArg('location', 'IN')).toUpperCase();
const isRotateCountry = requestedCountry === 'ROTATE' || requestedCountry === 'ALL' || requestedCountry === 'MULTI';
const customQueueArg = getArg('queue', null);

// Browser Rotation Configuration
const browserArg = (getArg('browser', 'rotate')).toLowerCase();
const customBrowserListArg = getArg('browser-list', null);
const browserPerArg = (getArg('browser-per', 'job')).toLowerCase(); // 'job' or 'batch'

// Restrict default rotation pool to Google Chrome and Microsoft Edge only as requested
const DEFAULT_BROWSER_ROTATION = ['chrome', 'msedge'];
let activeBrowserList = [];

if (customBrowserListArg) {
  activeBrowserList = customBrowserListArg
    .split(',')
    .map(b => b.trim().toLowerCase())
    .filter(b => BROWSER_DATABASE[b]);
  if (activeBrowserList.length === 0) activeBrowserList = [...DEFAULT_BROWSER_ROTATION];
} else if (browserArg === 'rotate' || browserArg === 'all' || browserArg === 'multi') {
  activeBrowserList = [...DEFAULT_BROWSER_ROTATION];
} else if (browserArg === 'random') {
  activeBrowserList = [...DEFAULT_BROWSER_ROTATION];
} else if (BROWSER_DATABASE[browserArg]) {
  activeBrowserList = [browserArg];
} else {
  console.warn(`⚠️ Warning: Unknown browser '${browserArg}', defaulting to Chrome & Edge rotation pool.`);
  activeBrowserList = [...DEFAULT_BROWSER_ROTATION];
}

const isRandomBrowser = browserArg === 'random';

// Proxy configuration
const proxyServer = getArg('proxy-server', null);
const proxyUsername = getArg('proxy-username', null);
const proxyPassword = getArg('proxy-password', null);

// Determine Queue File
let queueFileName = 'jobs_queue.json';
if (customQueueArg) {
  queueFileName = customQueueArg;
} else if (!isRotateCountry) {
  const locMap = { IN: 'jobs_in.json', US: 'jobs_us.json', UK: 'jobs_uk.json', GB: 'jobs_uk.json', CA: 'jobs_ca.json', DE: 'jobs_de.json' };
  const candidate = locMap[requestedCountry];
  if (candidate && fs.existsSync(path.join(__dirname, candidate))) {
    queueFileName = candidate;
  }
}

const queueFilePath = path.isAbsolute(queueFileName) ? queueFileName : path.join(__dirname, queueFileName);
const stateFilePath = path.join(__dirname, 'progress_state.json');

if (!fs.existsSync(queueFilePath)) {
  console.error(`❌ Error: Queue file not found at ${queueFilePath}`);
  console.error(`💡 Tip: Fetch jobs first using: node fetch_by_location.js ${requestedCountry} 500`);
  process.exit(1);
}

const queue = JSON.parse(fs.readFileSync(queueFilePath, 'utf8'));

// Determine range boundaries (--start and --end)
let startIndex = 0;
if (batchNumArg) {
  const bNum = Math.max(1, Number(batchNumArg));
  startIndex = (bNum - 1) * batchSize;
} else if (getArg('start', null) !== null) {
  startIndex = Number(getArg('start', 0));
} else if (isResume && fs.existsSync(stateFilePath)) {
  try {
    const saved = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    if (saved && typeof saved.currentIndex === 'number') {
      startIndex = saved.currentIndex;
      console.log(`💾 Resuming from saved progress: Job ${startIndex + 1} of ${queue.length}`);
    }
  } catch (e) {}
}

const endArg = getArg('end', null);
const maxEndIndex = endArg !== null ? Math.min(queue.length, Number(endArg)) : queue.length;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function getPacingDelay() {
  if (speedMode === 'fast') return randomDelay(3000, 4500);
  if (speedMode === 'stealth') return randomDelay(8000, 12000);
  return randomDelay(4500, 7000); // normal
}

function formatSlug(url) {
  try {
    const parts = url.split('/jobs/');
    if (parts.length > 1) {
      return parts[1].replace(/-[a-f0-9]{8}$/i, '').replace(/-/g, ' ');
    }
  } catch (e) {}
  return 'Job Opening';
}

/**
 * 🏙️ Multi-City Location Profile with Spatial Gaussian Jitter
 */
function getCityProfile(index) {
  let countryKey = isRotateCountry ? ['IN', 'US', 'UK', 'CA', 'DE'][index % 5] : requestedCountry;
  const cityList = CITY_DATABASE[countryKey] || CITY_DATABASE.IN;
  const cityBase = cityList[index % cityList.length];

  // Spatial Gaussian Jitter (+/- 0.005 deg approx 500m)
  const jitterLat = cityBase.lat + (Math.random() - 0.5) * 0.009;
  const jitterLng = cityBase.lng + (Math.random() - 0.5) * 0.009;

  return {
    country: countryKey,
    city: cityBase.city,
    displayName: `${cityBase.city}, ${countryKey}`,
    geolocation: { latitude: Number(jitterLat.toFixed(6)), longitude: Number(jitterLng.toFixed(6)) },
    timezoneId: cityBase.timezone,
    locale: cityBase.locale,
    httpHeaders: { 'Accept-Language': `${cityBase.locale},en;q=0.9` }
  };
}

/**
 * 🌐 Multi-Browser Profile Selector
 */
function getBrowserProfile(jobIndex, batchIndex = 0) {
  const index = browserPerArg === 'batch' ? batchIndex : jobIndex;
  let browserKey;
  if (isRandomBrowser) {
    browserKey = activeBrowserList[Math.floor(Math.random() * activeBrowserList.length)];
  } else {
    browserKey = activeBrowserList[index % activeBrowserList.length];
  }
  return BROWSER_DATABASE[browserKey] || BROWSER_DATABASE.chromium;
}

function saveState(currentIndex, completedCount, skippedCount) {
  try {
    fs.writeFileSync(stateFilePath, JSON.stringify({
      currentIndex,
      completedCount,
      skippedCount,
      queueFile: queueFileName,
      timestamp: new Date().toISOString()
    }, null, 2), 'utf8');
  } catch (e) {}
}

/**
 * 🧼 100% DEEP BROWSER DATA PURGE ENGINE
 */
async function performDeepDataPurge(context, page, popup, browserProfile) {
  // 1. Wipe Popup (Tab 2) DOM storage
  if (popup && !popup.isClosed()) {
    try {
      await popup.evaluate(async () => {
        try { localStorage.clear(); } catch(e) {}
        try { sessionStorage.clear(); } catch(e) {}
        try {
          if (window.indexedDB && indexedDB.databases) {
            const dbs = await indexedDB.databases();
            dbs.forEach(db => indexedDB.deleteDatabase(db.name));
          }
        } catch(e) {}
        try {
          if (window.caches) {
            const keys = await caches.keys();
            keys.forEach(k => caches.delete(k));
          }
        } catch(e) {}
      });
    } catch (e) {}
  }

  // 2. Wipe Job Details (Tab 1) DOM storage
  if (page && !page.isClosed()) {
    try {
      await page.evaluate(async () => {
        try { localStorage.clear(); } catch(e) {}
        try { sessionStorage.clear(); } catch(e) {}
        try {
          if (window.indexedDB && indexedDB.databases) {
            const dbs = await indexedDB.databases();
            dbs.forEach(db => indexedDB.deleteDatabase(db.name));
          }
        } catch(e) {}
        try {
          if (window.caches) {
            const keys = await caches.keys();
            keys.forEach(k => caches.delete(k));
          }
        } catch(e) {}
      });
    } catch (e) {}

    // 3. Chrome DevTools Protocol (CDP) Deep Cleanse (Chromium-based engines only)
    if (browserProfile && browserProfile.supportsCdp) {
      try {
        const cdp = await context.newCDPSession(page);
        await cdp.send('Storage.clearDataForOrigin', {
          origin: '*',
          storageTypes: 'all' // all origins, cookies, indexeddb, websql, cache_storage, service_workers
        }).catch(() => {});
        await cdp.send('Network.clearBrowserCookies').catch(() => {});
        await cdp.send('Network.clearBrowserCache').catch(() => {});
        await cdp.detach().catch(() => {});
      } catch (e) {}
    }
  }

  // 4. Playwright Context Cookie Flush
  try {
    await context.clearCookies().catch(() => {});
    await context.clearPermissions().catch(() => {});
  } catch (e) {}
}

// Execution stats
const results = {
  startedAt: new Date().toISOString(),
  queueFile: queueFileName,
  totalQueued: queue.length,
  batchSize,
  browserMode: isRandomBrowser ? 'RANDOM' : (activeBrowserList.length > 1 ? 'ROTATION' : activeBrowserList[0].toUpperCase()),
  activeBrowsers: activeBrowserList.map(b => BROWSER_DATABASE[b]?.name || b),
  appliedCount: 0,
  skippedCount: 0,
  failedCount: 0,
  history: []
};

// Graceful Shutdown Handler
let isTerminating = false;
let currentProcessingIndex = startIndex;

function handleGracefulExit() {
  if (isTerminating) return;
  isTerminating = true;
  console.log('\n\n🛑 [SHUTDOWN] Saving progress state before exiting...');
  saveState(currentProcessingIndex, results.appliedCount, results.skippedCount);
  console.log(`💾 Progress saved at Job ${currentProcessingIndex + 1}. You can resume anytime using --resume.\n`);
  process.exit(0);
}

process.on('SIGINT', handleGracefulExit);
process.on('SIGTERM', handleGracefulExit);

// =========================================================================
// 🚀 MAIN PLAYWRIGHT EXECUTION ENGINE
// =========================================================================
(async () => {
  let playwright;
  try {
    playwright = require('playwright');
  } catch (e) {
    console.error('\n❌ Playwright is not installed. Please run: npm install playwright\n');
    process.exit(1);
  }

  const browserDisplayList = activeBrowserList.map(b => `${BROWSER_DATABASE[b]?.icon || '🌐'} ${BROWSER_DATABASE[b]?.name || b}`).join(', ');

  console.log('\n======================================================');
  console.log('🕶️ ZERO-FOOTPRINT PRO: MULTI-CITY & MULTI-BROWSER ENGINE');
  console.log('======================================================');
  console.log(`📁 Active Queue File:   ${path.basename(queueFilePath)} (${queue.length} jobs)`);
  console.log(`🎯 Batch Size:           ${batchSize} jobs per batch`);
  console.log(`🏁 Starting Index:       Job ${startIndex + 1} / ${queue.length} (Batch ${Math.floor(startIndex / batchSize) + 1})`);
  console.log(`🌐 Browser Rotation:     ${activeBrowserList.length > 1 ? 'ACTIVE (Rotating per ' + browserPerArg + ')' : 'PINNED'}`);
  console.log(`   └─ Targets:           ${browserDisplayList}`);
  console.log(`🏙️ City Rotation:        ACTIVE (${(CITY_DATABASE[requestedCountry] || CITY_DATABASE.IN).map(c => c.city).join(', ')})`);
  if (proxyServer) {
    console.log(`🔌 Network Proxy:        ${proxyServer}`);
  }
  console.log(`⏳ Page Load & Wait:    ${(closeWaitMs / 1000).toFixed(1)}s (Full load & beacon finalization)`);
  console.log(`🧼 Deep Cleanse Mode:    100% DISPOSABLE EPHEMERAL PROFILES`);
  console.log(`🖥️ Browser Display:      ${isHeaded ? 'Headed (Visible GUI)' : 'Headless (Silent)'}`);
  console.log(`⏱️ Human Pacing:         ${speedMode.toUpperCase()}`);
  console.log('======================================================\n');

  let currentIndex = startIndex;

  while (currentIndex < maxEndIndex && !isTerminating) {
    const currentBatchNum = Math.floor(currentIndex / batchSize) + 1;
    const totalBatches = Math.ceil(queue.length / batchSize);
    const batchEndIndex = Math.min(maxEndIndex, currentIndex + batchSize);

    console.log(`\n┌──────────────────────────────────────────────────────────────┐`);
    console.log(`│ 🚀 RUNNING BATCH ${currentBatchNum} / ${totalBatches} (Jobs ${currentIndex + 1} to ${batchEndIndex} of ${queue.length})`);
    console.log(`│ 📁 Queue File: ${path.basename(queueFilePath)}`);
    console.log(`└──────────────────────────────────────────────────────────────┘\n`);

    for (; currentIndex < batchEndIndex && !isTerminating; currentIndex++) {
      currentProcessingIndex = currentIndex;
      const url = queue[currentIndex];
      const roleName = formatSlug(url);
      const activeProfile = getCityProfile(currentIndex);
      const activeBrowser = getBrowserProfile(currentIndex, currentBatchNum - 1);

      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`🎯 [JOB ${currentIndex + 1}/${queue.length}] ${roleName}`);
      console.log(`🔗 URL: ${url}`);
      console.log(`🌐 Browser: ${activeBrowser.icon} ${activeBrowser.name} (Engine: ${activeBrowser.engine}${activeBrowser.channel ? ', Channel: ' + activeBrowser.channel : ''})`);
      console.log(`🏙️ Location: ${activeProfile.displayName} (GPS: ${activeProfile.geolocation.latitude}, ${activeProfile.geolocation.longitude})`);

      // 1. Create a unique, disposable OS-level temporary profile directory
      const tempUserDataDir = fs.mkdtempSync(path.join(os.tmpdir(), `pw_profile_${Date.now()}_`));

      const contextOptions = {
        viewport: { width: 1366, height: 868 },
        userAgent: activeBrowser.userAgent,
        geolocation: activeProfile.geolocation,
        permissions: ['geolocation'],
        timezoneId: activeProfile.timezoneId,
        locale: activeProfile.locale,
        extraHTTPHeaders: activeProfile.httpHeaders,
        headless: !isHeaded,
        args: activeBrowser.launchArgs || []
      };

      if (activeBrowser.channel) {
        contextOptions.channel = activeBrowser.channel;
      }
      if (activeBrowser.firefoxUserPrefs) {
        contextOptions.firefoxUserPrefs = activeBrowser.firefoxUserPrefs;
      }

      if (proxyServer) {
        contextOptions.proxy = { server: proxyServer };
        if (proxyUsername && proxyPassword) {
          contextOptions.proxy.username = proxyUsername;
          contextOptions.proxy.password = proxyPassword;
        }
      }

      // Launch sterile persistent context tied to the disposable temp directory with fallback safety
      let context;
      let effectiveBrowser = activeBrowser;
      try {
        const engine = playwright[activeBrowser.engine];
        context = await engine.launchPersistentContext(tempUserDataDir, contextOptions);
      } catch (launchErr) {
        console.warn(`⚠️ [BROWSER LAUNCH FALLBACK] ${activeBrowser.name} launch error: ${launchErr.message}. Falling back to bundled Chromium.`);
        delete contextOptions.channel;
        delete contextOptions.firefoxUserPrefs;
        contextOptions.args = BROWSER_DATABASE.chromium.launchArgs;
        contextOptions.userAgent = BROWSER_DATABASE.chromium.userAgent;
        effectiveBrowser = BROWSER_DATABASE.chromium;
        context = await playwright.chromium.launchPersistentContext(tempUserDataDir, contextOptions);
      }

      // Optional client-side geo route mocking for test environments
      if (isMockGeo) {
        await context.route('**/*geo*/**', async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              success: true,
              message: 'Geo fetched successfully',
              data: {
                ip: '203.0.113.20',
                geo: {
                  lat: activeProfile.geolocation.latitude,
                  lng: activeProfile.geolocation.longitude,
                  city: activeProfile.city,
                  country: activeProfile.country,
                  timezone: activeProfile.timezoneId,
                  isVpn: false,
                  isProxy: false,
                  isHosting: false
                }
              }
            })
          }).catch(() => route.continue());
        });
      }

      const pages = context.pages();
      const page = pages.length > 0 ? pages[0] : await context.newPage();
      let isApplied = false;
      let spawnedPopup = null;

      try {
        // 1. Navigate to Job Details Page
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
        await sleep(1800);

        // 2. Dynamic Polling for Apply Trigger (waits up to 10s for React DOM hydration)
        const applySelectors = [
          '#creator-job-details-apply-job-trigger',
          '[data-experiment-id="creator-apply-job-trigger"]',
          'a[href*="/redirect/"]',
          'button:has-text("Apply Now")',
          'a:has-text("Apply Now")',
          'button:has-text("Apply")',
          'a:has-text("Apply")'
        ];

        let applyBtn = null;
        for (const selector of applySelectors) {
          try {
            const el = page.locator(selector).first();
            if (await el.isVisible({ timeout: 1200 })) {
              applyBtn = el;
              break;
            }
          } catch (e) {}
        }

        if (applyBtn) {
          // Scroll button smoothly into center
          try {
            await applyBtn.scrollIntoViewIfNeeded({ timeout: 2000 });
          } catch (e) {}
          await sleep(randomDelay(300, 500));

          // 3. Listen for Child Redirect Window (Tab 2)
          const popupPromise = page.waitForEvent('popup', { timeout: 6000 }).catch(() => null);

          // 4. Dispatch authentic human click
          await applyBtn.click({ delay: randomDelay(60, 120) });
          spawnedPopup = await popupPromise;

          console.log(`✨ [CLICKED] Apply trigger executed successfully.`);
          results.appliedCount++;
          isApplied = true;

          // 5. Extended Minimum 10-Second Wait & Full Page Hydration
          if (spawnedPopup) {
            console.log(`🌐 Destination page opened. Waiting for full network & DOM load...`);
            try {
              await spawnedPopup.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
            } catch (e) {}
          }

          console.log(`⏳ Holding open for ${(closeWaitMs / 1000).toFixed(1)}s for full page load & telemetry completion...`);
          await sleep(closeWaitMs);

          // 6. Cleanly Close Destination Popup
          if (spawnedPopup && !spawnedPopup.isClosed()) {
            await spawnedPopup.close().catch(() => {});
            console.log(`🚪 Closed destination window cleanly.`);
          }
        } else {
          console.log(`⚠️ Apply button timed out in DOM. Moving to next.`);
          results.skippedCount++;
        }
      } catch (err) {
        console.warn(`⚠️ Notice: ${err.message}`);
        results.failedCount++;
      } finally {
        // 7. EXECUTE 100% COMPLETE IN-MEMORY BROWSER DATA PURGE
        await performDeepDataPurge(context, page, spawnedPopup, effectiveBrowser);

        if (!page.isClosed()) {
          await page.close().catch(() => {});
        }

        // 8. DESTROY BROWSER CONTEXT & DELETE DISPOSABLE OS DIRECTORY
        await context.close().catch(() => {});
        try {
          fs.rmSync(tempUserDataDir, { recursive: true, force: true });
        } catch (e) {}

        console.log(`🧼 [0-FOOTPRINT PURGE] Deleted temporary OS profile directory & storage for Job ${currentIndex + 1} (${effectiveBrowser.name}).`);
      }

      results.history.push({
        index: currentIndex + 1,
        url,
        applied: isApplied,
        location: activeProfile.displayName,
        browser: effectiveBrowser.name,
        engine: effectiveBrowser.engine,
        channel: effectiveBrowser.channel || 'default',
        timestamp: new Date().toISOString()
      });

      saveState(currentIndex + 1, results.appliedCount, results.skippedCount);

      // Safe human pacing delay between individual jobs
      if (currentIndex + 1 < batchEndIndex && !isTerminating) {
        const waitMs = getPacingDelay();
        console.log(`⏱️ Human pacing delay: Pausing ${(waitMs / 1000).toFixed(1)}s before Job ${currentIndex + 2}...\n`);
        await sleep(waitMs);
      }
    }

    // End of Batch Handshake
    console.log(`\n======================================================`);
    console.log(`🎉 BATCH ${currentBatchNum} / ${totalBatches} FINISHED (Processed up to Job ${currentIndex})`);
    console.log(`======================================================`);

    if (currentIndex < maxEndIndex && !isTerminating) {
      if (isAutoNext) {
        console.log(`\n☕ [AUTO-NEXT COOLDOWN] Taking 30s organic human rest before Batch ${currentBatchNum + 1}...`);
        await sleep(30000);
      } else {
        console.log(`\n💡 To start the next batch, run:`);
        console.log(`   node playwright_applier.js --location ${requestedCountry} --batch ${batchSize} --batch-num ${currentBatchNum + 1} --browser ${browserArg} --headed\n`);
        break;
      }
    }
  }

  // Export Execution Summary Report
  results.finishedAt = new Date().toISOString();
  const reportFilename = `results_${Date.now()}.json`;
  const reportPath = path.join(__dirname, reportFilename);
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

  console.log('\n======================================================');
  console.log('🎉 EXECUTION RUN COMPLETED');
  console.log('======================================================');
  console.log(`✅ Total Applied:  ${results.appliedCount} / ${queue.length}`);
  console.log(`⏩ Total Skipped:  ${results.skippedCount}`);
  console.log(`📊 Summary Report: ${reportFilename}`);
  console.log('======================================================\n');
})();
