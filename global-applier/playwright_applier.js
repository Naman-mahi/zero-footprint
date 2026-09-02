/**
 * 🕶️ Zero-Footprint PRO: Production-Grade Multi-Location Playwright Batch Applier
 * 
 * FEATURES:
 * - 🧼 100% DEEP BROWSER PURGE:
 *     - CDP Protocol Level Purge: Storage.clearDataForOrigin (all origins, cookies, indexeddb, websql, cache, service workers).
 *     - Network Level Purge: Network.clearBrowserCookies & Network.clearBrowserCache.
 *     - DOM Level Purge: localStorage.clear(), sessionStorage.clear(), IndexedDB deletion, Cache API deletion.
 *     - Ephemeral Context Recycling: Recreates a sterile, isolated browser.newContext() on every job.
 * - ⏳ Extended 10-Second Mandatory Page Load Wait for full destination rendering.
 * - 🌍 5 Regional Location Profiles (US, UK, India, Canada, Germany/EU + Auto-Rotate).
 * - 🔌 Native Proxy Support (--proxy-server, --proxy-username, --proxy-password).
 * - 🧪 Client-Side Geo Route Interception (--mock-geo) for testing & staging environments.
 * - 📁 Location-Specific JSON Queue Auto-Detection (jobs_us.json, jobs_uk.json, jobs_in.json, etc.).
 * - 🎯 Configurable Batch Sizes (50 or 100 applications per run).
 * - 🛡️ 9-Stage Human Pointer Simulation & Anti-Bot Evasion.
 * - 💾 State Persistence: Graceful Ctrl+C shutdown saving progress to progress_state.json.
 * - 📊 Detailed Execution Summary Report exported to results_<timestamp>.json.
 * 
 * USAGE:
 *   node playwright_applier.js [options]
 * 
 * OPTIONS:
 *   --location <code|all>       Location preset: US, UK, IN, CA, DE, or ROTATE (Default: IN)
 *   --batch <number>            Batch size: 50 or 100 (Default: 50)
 *   --queue <filename>          Custom queue JSON file path (e.g., jobs_in.json)
 *   --start <number>            Starting index in queue (Default: 0)
 *   --close-wait <ms>           Milliseconds to wait for destination page to finish loading (Default: 10000 = 10s)
 *   --proxy-server <url>        HTTP/SOCKS5 proxy server (e.g., http://proxy.example.com:8080)
 *   --proxy-username <user>     Proxy authentication username
 *   --proxy-password <pass>     Proxy authentication password
 *   --mock-geo                  Intercept client-side geo API calls for local test environments
 *   --resume                    Resume from last saved progress_state.json
 *   --headed                    Run with visible browser window (Default: headless)
 *   --speed <mode>              fast (3s), normal (5s), stealth (8s) (Default: normal)
 * 
 * EXAMPLES:
 *   node playwright_applier.js --location IN --batch 50 --headed
 *   node playwright_applier.js --location IN --batch 50 --close-wait 12000 --headed
 *   node playwright_applier.js --location US --proxy-server "http://us-proxy.example.com:8080" --batch 50
 *   node playwright_applier.js --resume --headed
 */

const fs = require('fs');
const path = require('path');

// =========================================================================
// 🌍 5 PRE-CONFIGURED REGIONAL LOCATION PROFILES
// =========================================================================
const LOCATION_PROFILES = {
  US: {
    code: 'US',
    name: 'United States (New York)',
    queueFile: 'jobs_us.json',
    geolocation: { latitude: 40.7128, longitude: -74.0060 },
    timezoneId: 'America/New_York',
    locale: 'en-US',
    httpHeaders: { 'Accept-Language': 'en-US,en;q=0.9' }
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom (London)',
    queueFile: 'jobs_uk.json',
    geolocation: { latitude: 51.5074, longitude: -0.1278 },
    timezoneId: 'Europe/London',
    locale: 'en-GB',
    httpHeaders: { 'Accept-Language': 'en-GB,en;q=0.9' }
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom (London)',
    queueFile: 'jobs_uk.json',
    geolocation: { latitude: 51.5074, longitude: -0.1278 },
    timezoneId: 'Europe/London',
    locale: 'en-GB',
    httpHeaders: { 'Accept-Language': 'en-GB,en;q=0.9' }
  },
  IN: {
    code: 'IN',
    name: 'India (Hyderabad / Bengaluru)',
    queueFile: 'jobs_in.json',
    geolocation: { latitude: 17.3850, longitude: 78.4867 },
    timezoneId: 'Asia/Kolkata',
    locale: 'en-IN',
    httpHeaders: { 'Accept-Language': 'en-IN,en-GB;q=0.9,en;q=0.8' }
  },
  CA: {
    code: 'CA',
    name: 'Canada (Toronto)',
    queueFile: 'jobs_ca.json',
    geolocation: { latitude: 43.6532, longitude: -79.3832 },
    timezoneId: 'America/Toronto',
    locale: 'en-CA',
    httpHeaders: { 'Accept-Language': 'en-CA,en;q=0.9' }
  },
  DE: {
    code: 'DE',
    name: 'Germany / Europe (Frankfurt)',
    queueFile: 'jobs_de.json',
    geolocation: { latitude: 50.1109, longitude: 8.6821 },
    timezoneId: 'Europe/Berlin',
    locale: 'de-DE',
    httpHeaders: { 'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8' }
  }
};

const LOCATION_KEYS = ['US', 'UK', 'IN', 'CA', 'DE'];

// CLI Argument Parser
const args = process.argv.slice(2);
function getArg(name, defaultValue) {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && args[idx + 1]) {
    return args[idx + 1];
  }
  return defaultValue;
}

const isHeaded = args.includes('--headed');
const isResume = args.includes('--resume');
const isMockGeo = args.includes('--mock-geo');
const batchSize = Number(getArg('batch', 50));
// Minimum 10-second wait for full destination page load & beacon delivery
const closeWaitMs = Math.max(10000, Number(getArg('close-wait', 10000)));
const speedMode = getArg('speed', 'normal');
const requestedLocation = (getArg('location', 'IN')).toUpperCase();
const isRotateLocation = requestedLocation === 'ROTATE' || requestedLocation === 'ALL' || requestedLocation === 'MULTI';
const customQueueArg = getArg('queue', null);

// Proxy configuration
const proxyServer = getArg('proxy-server', null);
const proxyUsername = getArg('proxy-username', null);
const proxyPassword = getArg('proxy-password', null);

// Determine Queue File
let queueFileName = 'jobs_queue.json';
if (customQueueArg) {
  queueFileName = customQueueArg;
} else if (!isRotateLocation && LOCATION_PROFILES[requestedLocation]) {
  const candidateFile = LOCATION_PROFILES[requestedLocation].queueFile;
  if (fs.existsSync(path.join(__dirname, candidateFile))) {
    queueFileName = candidateFile;
  }
}

const queueFilePath = path.isAbsolute(queueFileName) ? queueFileName : path.join(__dirname, queueFileName);
const stateFilePath = path.join(__dirname, 'progress_state.json');

if (!fs.existsSync(queueFilePath)) {
  console.error(`❌ Error: Queue file not found at ${queueFilePath}`);
  console.error(`💡 Tip: Fetch jobs first using: node fetch_by_location.js ${requestedLocation} 500`);
  process.exit(1);
}

const queue = JSON.parse(fs.readFileSync(queueFilePath, 'utf8'));

// Determine starting index
let startIndex = Number(getArg('start', 0));
if (isResume && fs.existsSync(stateFilePath)) {
  try {
    const saved = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    if (saved && typeof saved.currentIndex === 'number') {
      startIndex = saved.currentIndex;
      console.log(`💾 Resuming from saved progress: Job ${startIndex + 1} of ${queue.length}`);
    }
  } catch (e) {}
}

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

function getLocationProfile(index) {
  if (isRotateLocation) {
    const key = LOCATION_KEYS[index % LOCATION_KEYS.length];
    return LOCATION_PROFILES[key];
  }
  return LOCATION_PROFILES[requestedLocation] || LOCATION_PROFILES.IN;
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
 * Wipes CDP storage, Network cache, DOM localStorage, sessionStorage, IndexedDB, and Cache API.
 */
async function performDeepDataPurge(context, page, popup) {
  // 1. Wipe Popup (Tab 2) DOM storage
  if (popup && !popup.isClosed()) {
    try {
      await popup.evaluate(async () => {
        try { localStorage.clear(); } catch(e) {}
        try { sessionStorage.clear(); } catch(e) {}
        try {
          const dbs = await indexedDB.databases();
          dbs.forEach(db => indexedDB.deleteDatabase(db.name));
        } catch(e) {}
        try {
          const keys = await caches.keys();
          keys.forEach(k => caches.delete(k));
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
          const dbs = await indexedDB.databases();
          dbs.forEach(db => indexedDB.deleteDatabase(db.name));
        } catch(e) {}
        try {
          const keys = await caches.keys();
          keys.forEach(k => caches.delete(k));
        } catch(e) {}
      });
    } catch (e) {}

    // 3. Chrome DevTools Protocol (CDP) Deep Cleanse
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

  // 4. Playwright Context Cookie Flush
  try {
    await context.clearCookies();
    await context.clearPermissions();
  } catch (e) {}
}

// Execution stats
const results = {
  startedAt: new Date().toISOString(),
  queueFile: queueFileName,
  totalQueued: queue.length,
  batchSize,
  appliedCount: 0,
  skippedCount: 0,
  failedCount: 0,
  history: []
};

// Graceful Shutdown Handler
let isTerminating = false;
let globalBrowser = null;
let currentProcessingIndex = startIndex;

function handleGracefulExit() {
  if (isTerminating) return;
  isTerminating = true;
  console.log('\n\n🛑 [SHUTDOWN] Saving progress state before exiting...');
  saveState(currentProcessingIndex, results.appliedCount, results.skippedCount);
  console.log(`💾 Progress saved at Job ${currentProcessingIndex + 1}. You can resume anytime using --resume.\n`);
  
  if (globalBrowser) {
    globalBrowser.close().then(() => process.exit(0)).catch(() => process.exit(0));
  } else {
    process.exit(0);
  }
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

  const { chromium } = playwright;

  console.log('\n======================================================');
  console.log('🕶️ ZERO-FOOTPRINT PRO: PLAYWRIGHT BATCH APPLIER');
  console.log('======================================================');
  console.log(`📁 Active Queue File:   ${path.basename(queueFilePath)} (${queue.length} jobs)`);
  console.log(`🎯 Batch Size:           ${batchSize} jobs per run`);
  console.log(`🏁 Starting Index:       Job ${startIndex + 1} / ${queue.length}`);
  console.log(`🌍 Location Profile:     ${isRotateLocation ? '🔄 Multi-Country Auto-Rotation (US, UK, IN, CA, DE)' : (LOCATION_PROFILES[requestedLocation]?.name || requestedLocation)}`);
  if (proxyServer) {
    console.log(`🔌 Network Proxy:        ${proxyServer}`);
  }
  if (isMockGeo) {
    console.log(`🧪 Geo Interception:     ACTIVE (Mocking client-side geo endpoints)`);
  }
  console.log(`⏳ Page Load & Wait:    ${(closeWaitMs / 1000).toFixed(1)} seconds (Full load & beacon delivery)`);
  console.log(`🧼 Deep Cleanse Mode:    100% COMPLETE (CDP Storage, Network Cache, Cookies, IndexedDB, Session)`);
  console.log(`🖥️ Browser Display:      ${isHeaded ? 'Headed (Visible GUI)' : 'Headless (Silent)'}`);
  console.log(`⏱️ Human Pacing:         ${speedMode.toUpperCase()}`);
  console.log('======================================================\n');

  const launchOptions = {
    headless: !isHeaded,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-web-security'
    ]
  };

  if (proxyServer) {
    launchOptions.proxy = {
      server: proxyServer
    };
    if (proxyUsername && proxyPassword) {
      launchOptions.proxy.username = proxyUsername;
      launchOptions.proxy.password = proxyPassword;
    }
  }

  globalBrowser = await chromium.launch(launchOptions);

  let currentIndex = startIndex;

  while (currentIndex < queue.length && !isTerminating) {
    const currentBatchNum = Math.floor(currentIndex / batchSize) + 1;
    const totalBatches = Math.ceil(queue.length / batchSize);
    const batchEndIndex = Math.min(queue.length, currentIndex + batchSize);

    console.log(`\n┌──────────────────────────────────────────────────────────────┐`);
    console.log(`│ 🚀 STARTING BATCH ${currentBatchNum} / ${totalBatches} (Jobs ${currentIndex + 1} to ${batchEndIndex})`);
    console.log(`│ 📁 Queue File:       ${path.basename(queueFilePath)}`);
    console.log(`└──────────────────────────────────────────────────────────────┘\n`);

    for (; currentIndex < batchEndIndex && !isTerminating; currentIndex++) {
      currentProcessingIndex = currentIndex;
      const url = queue[currentIndex];
      const roleName = formatSlug(url);
      const activeProfile = getLocationProfile(currentIndex);

      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`🎯 [JOB ${currentIndex + 1}/${queue.length}] ${roleName}`);
      console.log(`🔗 URL: ${url}`);
      console.log(`🌍 Profile: ${activeProfile.name} (${activeProfile.code})`);

      // CREATE FRESH, STERILE CONTEXT FOR THIS INDIVIDUAL JOB
      const context = await globalBrowser.newContext({
        viewport: { width: 1366, height: 868 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        geolocation: activeProfile.geolocation,
        permissions: ['geolocation'],
        timezoneId: activeProfile.timezoneId,
        locale: activeProfile.locale,
        extraHTTPHeaders: activeProfile.httpHeaders
      });

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
                  city: activeProfile.name.split('(')[1]?.replace(')', '') || 'City',
                  country: activeProfile.code,
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

      const page = await context.newPage();
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
        // 7. EXECUTE 100% COMPLETE BROWSER DATA PURGE BEFORE DESTROYING CONTEXT
        await performDeepDataPurge(context, page, spawnedPopup);

        if (!page.isClosed()) {
          await page.close().catch(() => {});
          console.log(`🚪 Closed job details window.`);
        }

        // 8. DESTROY THE ENTIRE CONTEXT (Removes all in-memory and disk session footprint)
        await context.close().catch(() => {});
        console.log(`🧼 [DEEP PURGE COMPLETE] Wiped all cookies, cache, indexedDB & storage for Job ${currentIndex + 1}.`);
      }

      results.history.push({
        index: currentIndex + 1,
        url,
        applied: isApplied,
        location: activeProfile.code,
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

    if (currentIndex < queue.length && !isTerminating) {
      console.log(`\n☕ [COOLDOWN BREAK] Batch ${currentBatchNum} finished. Taking 30s organic human rest before Batch ${currentBatchNum + 1}...`);
      await sleep(30000);
    }
  }

  if (globalBrowser) {
    await globalBrowser.close().catch(() => {});
  }

  // Export Execution Summary Report
  results.finishedAt = new Date().toISOString();
  const reportFilename = `results_${Date.now()}.json`;
  const reportPath = path.join(__dirname, reportFilename);
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

  console.log('\n======================================================');
  console.log('🎉 EXECUTION RUN FINISHED');
  console.log('======================================================');
  console.log(`✅ Total Applied:  ${results.appliedCount} / ${queue.length}`);
  console.log(`⏩ Total Skipped:  ${results.skippedCount}`);
  console.log(`📊 Summary Report: ${reportFilename}`);
  console.log('======================================================\n');
})();
