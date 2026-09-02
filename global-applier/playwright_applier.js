/**
 * 🕶️ Zero-Footprint: Playwright Multi-Country Batch Auto-Applier
 * 
 * Runs automated job applications directly in Node.js via Playwright.
 * 
 * USAGE:
 *   node playwright_applier.js [options]
 * 
 * OPTIONS:
 *   --batch <number>    Batch size: 50 or 100 (Default: 50)
 *   --start <number>    Starting index in queue (Default: 0)
 *   --headed            Run with visible browser window (Default: headless)
 *   --speed <mode>      fast (3s), normal (5s), stealth (8s) (Default: normal)
 * 
 * EXAMPLES:
 *   node playwright_applier.js --batch 50 --headed
 *   node playwright_applier.js --batch 100 --start 50 --speed normal
 */

const fs = require('fs');
const path = require('path');

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
const batchSize = Number(getArg('batch', 50));
const startIndex = Number(getArg('start', 0));
const speedMode = getArg('speed', 'normal');

// Load Job Queue
const queueFile = path.join(__dirname, 'jobs_queue.json');
if (!fs.existsSync(queueFile)) {
  console.error(`❌ Missing jobs_queue.json in ${__dirname}`);
  process.exit(1);
}
const queue = JSON.parse(fs.readFileSync(queueFile, 'utf8'));

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

(async () => {
  let playwright;
  try {
    playwright = require('playwright');
  } catch (e) {
    console.log('\n📦 Playwright is not installed yet. To install it, run:');
    console.log('   npm install playwright\n');
    console.log('Or use the in-browser script: global-applier/global_applier.js');
    process.exit(1);
  }

  const { chromium } = playwright;

  console.log('\n======================================================');
  console.log('🕶️ ZERO-FOOTPRINT: PLAYWRIGHT BATCH APPLIER');
  console.log('======================================================');
  console.log(`📋 Total in Queue:  ${queue.length} jobs`);
  console.log(`🎯 Batch Size:       ${batchSize} jobs per run`);
  console.log(`🏁 Starting Index:   Job ${startIndex + 1}`);
  console.log(`🖥️ Mode:             ${isHeaded ? 'Headed (Visible Browser)' : 'Headless'}`);
  console.log(`⏱️ Pacing Speed:     ${speedMode.toUpperCase()}`);
  console.log('======================================================\n');

  const browser = await chromium.launch({
    headless: !isHeaded,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  let currentIndex = startIndex;
  let appliedCount = 0;
  let batchCount = 0;

  while (currentIndex < queue.length) {
    // Create clean browser context per batch
    const context = await browser.newContext({
      viewport: { width: 1280, height: 850 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      locale: 'en-US'
    });

    const currentBatchNum = Math.floor(currentIndex / batchSize) + 1;
    const batchEndIndex = Math.min(queue.length, currentIndex + batchSize);

    console.log(`\n🚀 Starting Batch ${currentBatchNum}: Processing Jobs ${currentIndex + 1} to ${batchEndIndex}...\n`);

    for (; currentIndex < batchEndIndex; currentIndex++) {
      const url = queue[currentIndex];
      const roleName = formatSlug(url);

      console.log(`[Job ${currentIndex + 1}/${queue.length}] ${roleName}`);
      console.log(`  🔗 ${url}`);

      const page = await context.newPage();

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
        await sleep(1500);

        // Dynamic Polling for Apply Button (up to 10s wait)
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
            if (await el.isVisible({ timeout: 1500 })) {
              applyBtn = el;
              break;
            }
          } catch (e) {}
        }

        if (applyBtn) {
          // Listen for popup redirect tab
          const [popup] = await Promise.all([
            page.waitForEvent('popup', { timeout: 4000 }).catch(() => null),
            applyBtn.click()
          ]);

          console.log(`  ✨ [APPLIED] Trigger clicked successfully.`);
          appliedCount++;

          // Wait 2.5s for tracking beacon
          await sleep(2500);

          if (popup) {
            await popup.close().catch(() => {});
          }
        } else {
          console.log(`  ⚠️ Apply button timed out. Skipping.`);
        }
      } catch (err) {
        console.warn(`  ⚠️ Notice: ${err.message}`);
      } finally {
        await page.close().catch(() => {});
      }

      // Safe human pacing delay between individual jobs
      if (currentIndex + 1 < batchEndIndex) {
        const waitMs = getPacingDelay();
        console.log(`  ⏱️ Pausing ${(waitMs / 1000).toFixed(1)}s before next job...\n`);
        await sleep(waitMs);
      }
    }

    // End of batch cleanup
    console.log(`\n🧹 Batch ${currentBatchNum} finished! Purging session & cookies...`);
    await context.close();
    batchCount++;

    if (currentIndex < queue.length) {
      console.log(`☕ Taking 30s human cooldown break before Batch ${currentBatchNum + 1}...`);
      await sleep(30000);
    }
  }

  await browser.close();
  console.log(`\n🎉 All jobs completed! Total applied: ${appliedCount} / ${queue.length}`);
})();
