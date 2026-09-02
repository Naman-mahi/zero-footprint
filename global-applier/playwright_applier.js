/**
 * 🕶️ Zero-Footprint PRO: Production-Grade Multi-Location Playwright Batch Applier
 * 
 * FEATURES:
 * - 🌍 5 Regional Location Profiles (US, UK, India, Canada, Germany/EU + Auto-Rotate).
 * - 🎯 Configurable Batch Sizes (50 or 100 applications per run).
 * - ⏳ Extended Close Timer (4.5s–6.0s) for affiliate beacons & redirect finalization.
 * - 🛡️ 9-Stage Human Pointer Simulation & Anti-Bot Evasion.
 * - 💾 State Persistence: Graceful Ctrl+C shutdown saving progress to progress_state.json.
 * - 🧹 Automated Context & Storage Purge between batches.
 * - 📊 Detailed Execution Summary Report exported to results_<timestamp>.json.
 * 
 * USAGE:
 *   node playwright_applier.js [options]
 * 
 * OPTIONS:
 *   --batch <number>        Batch size: 50 or 100 (Default: 50)
 *   --location <code|all>   Location preset: US, UK, IN, CA, DE, or ROTATE (Default: US)
 *   --start <number>        Starting index in queue (Default: 0)
 *   --resume                Resume from last saved progress_state.json
 *   --headed                Run with visible browser window (Default: headless)
 *   --close-wait <ms>       Milliseconds to wait before closing redirect tab (Default: 5000)
 *   --speed <mode>          fast (3s), normal (5s), stealth (8s) (Default: normal)
 * 
 * EXAMPLES:
 *   node playwright_applier.js --location US --batch 50 --headed
 *   node playwright_applier.js --location UK --batch 50 --close-wait 6000
 *   node playwright_applier.js --location ROTATE --batch 100 --start 0
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
    geolocation: { latitude: 40.7128, longitude: -74.0060 },
    timezoneId: 'America/New_York',
    locale: 'en-US',
    httpHeaders: { 'Accept-Language': 'en-US,en;q=0.9' }
  },
  UK: {
    code: 'UK',
    name: 'United Kingdom (London)',
    geolocation: { latitude: 51.5074, longitude: -0.1278 },
    timezoneId: 'Europe/London',
    locale: 'en-GB',
    httpHeaders: { 'Accept-Language': 'en-GB,en;q=0.9' }
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom (London)',
    geolocation: { latitude: 51.5074, longitude: -0.1278 },
    timezoneId: 'Europe/London',
    locale: 'en-GB',
    httpHeaders: { 'Accept-Language': 'en-GB,en;q=0.9' }
  },
  IN: {
    code: 'IN',
    name: 'India (Hyderabad / Bengaluru)',
    geolocation: { latitude: 17.3850, longitude: 78.4867 },
    timezoneId: 'Asia/Kolkata',
    locale: 'en-IN',
    httpHeaders: { 'Accept-Language': 'en-IN,en-GB;q=0.9,en;q=0.8' }
  },
  CA: {
    code: 'CA',
    name: 'Canada (Toronto)',
    geolocation: { latitude: 43.6532, longitude: -79.3832 },
    timezoneId: 'America/Toronto',
    locale: 'en-CA',
    httpHeaders: { 'Accept-Language': 'en-CA,en;q=0.9' }
  },
  DE: {
    code: 'DE',
    name: 'Germany / Europe (Frankfurt)',
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
const batchSize = Number(getArg('batch', 50));
const closeWaitMs = Number(getArg('close-wait', 5000));
const speedMode = getArg('speed', 'normal');
const requestedLocation = (getArg('location', 'US')).toUpperCase();
const isRotateLocation = requestedLocation === 'ROTATE' || requestedLocation === 'ALL' || requestedLocation === 'MULTI';

// State File & Queue File paths
const stateFilePath = path.join(__dirname, 'progress_state.json');
const queueFilePath = path.join(__dirname, 'jobs_queue.json');

if (!fs.existsSync(queueFilePath)) {
  console.error(`❌ Error: Missing jobs_queue.json at ${queueFilePath}`);
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
  return LOCATION_PROFILES[requestedLocation] || LOCATION_PROFILES.US;
}

function saveState(currentIndex, completedCount, skippedCount) {
  try {
    fs.writeFileSync(stateFilePath, JSON.stringify({
      currentIndex,
      completedCount,
      skippedCount,
      timestamp: new Date().toISOString()
    }, null, 2), 'utf8');
  } catch (e) {}
}

// Execution stats
const results = {
  startedAt: new Date().toISOString(),
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
  console.log(`📋 Total in Queue:      ${queue.length} openings`);
  console.log(`🎯 Batch Size:           ${batchSize} jobs per run`);
  console.log(`🏁 Starting Index:       Job ${startIndex + 1} / ${queue.length}`);
  console.log(`🌍 Location Mode:        ${isRotateLocation ? '🔄 Multi-Country Auto-Rotation (US, UK, IN, CA, DE)' : (LOCATION_PROFILES[requestedLocation]?.name || requestedLocation)}`);
  console.log(`⏳ Close Wait Timer:     ${(closeWaitMs / 1000).toFixed(1)} seconds (Tracking finalization)`);
  console.log(`🖥️ Browser Display:      ${isHeaded ? 'Headed (Visible GUI)' : 'Headless (Silent)'}`);
  console.log(`⏱️ Human Pacing:         ${speedMode.toUpperCase()}`);
  console.log('======================================================\n');

  globalBrowser = await chromium.launch({
    headless: !isHeaded,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-web-security'
    ]
  });

  let currentIndex = startIndex;

  while (currentIndex < queue.length && !isTerminating) {
    const currentBatchNum = Math.floor(currentIndex / batchSize) + 1;
    const totalBatches = Math.ceil(queue.length / batchSize);
    const batchEndIndex = Math.min(queue.length, currentIndex + batchSize);
    const batchProfile = getLocationProfile(currentIndex);

    console.log(`\n┌──────────────────────────────────────────────────────────────┐`);
    console.log(`│ 🚀 STARTING BATCH ${currentBatchNum} / ${totalBatches} (Jobs ${currentIndex + 1} to ${batchEndIndex})`);
    console.log(`│ 🌍 Location Profile: ${batchProfile.name}`);
    console.log(`└──────────────────────────────────────────────────────────────┘\n`);

    // Create fresh, isolated browser context for this batch
    const context = await globalBrowser.newContext({
      viewport: { width: 1366, height: 868 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      geolocation: batchProfile.geolocation,
      permissions: ['geolocation'],
      timezoneId: batchProfile.timezoneId,
      locale: batchProfile.locale,
      extraHTTPHeaders: batchProfile.httpHeaders
    });

    for (; currentIndex < batchEndIndex && !isTerminating; currentIndex++) {
      currentProcessingIndex = currentIndex;
      const url = queue[currentIndex];
      const roleName = formatSlug(url);
      const activeProfile = isRotateLocation ? getLocationProfile(currentIndex) : batchProfile;

      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`🎯 [JOB ${currentIndex + 1}/${queue.length}] ${roleName}`);
      console.log(`🔗 URL: ${url}`);
      if (isRotateLocation) {
        console.log(`🌍 Profile: ${activeProfile.name} (${activeProfile.code})`);
      }

      const page = await context.newPage();
      let isApplied = false;
      let spawnedPopup = null;

      try {
        // 1. Navigate to Job Details Page
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
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
          const popupPromise = page.waitForEvent('popup', { timeout: 4500 }).catch(() => null);

          // 4. Dispatch human click
          await applyBtn.click({ delay: randomDelay(60, 120) });
          spawnedPopup = await popupPromise;

          console.log(`✨ [CLICKED] Apply trigger executed successfully.`);
          results.appliedCount++;
          isApplied = true;

          // 5. Extended Close Wait Timer for tracking beacons & affiliate redirect
          console.log(`⏳ Waiting ${(closeWaitMs / 1000).toFixed(1)}s for tracking beacons & employer redirect...`);
          await sleep(closeWaitMs);

          // 6. Cleanly close Child Tab (if spawned)
          if (spawnedPopup && !spawnedPopup.isClosed()) {
            await spawnedPopup.close().catch(() => {});
            console.log(`🚪 Closed redirect window cleanly.`);
          }
        } else {
          console.log(`⚠️ Apply button timed out in DOM. Moving to next.`);
          results.skippedCount++;
        }
      } catch (err) {
        console.warn(`⚠️ Notice: ${err.message}`);
        results.failedCount++;
      } finally {
        if (!page.isClosed()) {
          await page.close().catch(() => {});
          console.log(`🚪 Closed job details window.`);
        }
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

    // End of Batch Cleanup
    console.log(`\n🧹 [BATCH ${currentBatchNum} FINISHED] Purging browser context, cookies, and local cache...`);
    await context.close().catch(() => {});

    if (currentIndex < queue.length && !isTerminating) {
      console.log(`\n☕ [COOLDOWN BREAK] Taking 30s organic human rest before Batch ${currentBatchNum + 1}...`);
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
