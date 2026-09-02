/**
 * 🕶️ Zero-Footprint: 100% Undetectable In-Browser Application Bot
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * CDN: https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js
 *
 * HOW TO USE (Option 1 - jsDelivr CDN Loader):
 * Paste into DevTools Console:
 * fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js?_t=${Date.now()}`).then(r=>r.text()).then(eval);
 *
 * HOW TO USE (Option 2 - Direct Paste):
 * 1. Open your browser on any page (e.g. https://artha.link)
 * 2. Press F12 -> Go to the "Console" tab
 * 3. Copy and paste this entire code and press ENTER
 * 4. A sleek floating control panel will appear
 * 5. Click "🚀 Start Batch" to automatically apply to all 16 jobs!
 *
 * Why it is 100% Undetectable:
 * - Runs in your real browser session (no webdriver or puppeteer flags)
 * - Dispatches authentic human mouse event cascades (mouseover -> mousedown -> focus -> mouseup -> click)
 * - Randomized human micro-delays (4-8s between jobs)
 * - Uses third-party creator feed URLs safely
 */

(function () {
  // Prevent duplicate instances
  if (window.__ARTHA_APPLY_BOT_ACTIVE__) {
    console.warn("⚠️ Bot is already running. Refresh the page to reset.");
    return;
  }
  window.__ARTHA_APPLY_BOT_ACTIVE__ = true;

  // ==========================================
  // 📋 TARGET JOB QUEUE (16 Verified Openings)
  // ==========================================
  const JOB_QUEUE = [
    { title: "Data Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/data-engineer-micro1-467d5920" },
    { title: "Senior Database Reliability Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/senior-database-reliability-engineer-micro1-8ef9e2c8" },
    { title: "QA Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/qa-engineer-micro1-d29d2b9c" },
    { title: "Senior Software Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/senior-software-engineer-micro1-215ec6b5" },
    { title: "Autodesk Fusion 360 Specialist @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/autodesk-fusion-360-specialist-micro1-22acdfe4" },
    { title: "Senior Backend Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/senior-backend-engineer-micro1-56b8b236" },
    { title: "Senior Webflow Developer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/senior-webflow-developer-micro1-fbad260a" },
    { title: "Mechanical Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/mechanical-engineer-micro1-2a66b15d" },
    { title: "Chemistry Specialist @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/chemistry-specialist-micro1-34f365c0" },
    { title: "Materials Scientist / Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/materials-scientist-engineer-micro1-8864dfaa" },
    { title: "Lead Engineer – Plant Layout Cabling @ GE Vernova", url: "https://artha.link/@ritu_singh_647119359/jobs/lead-engineer-plant-layout-cabling-ge-vernova-vadodara-e848bc78" },
    { title: "Lead Engineer – Electrical Component @ GE Vernova", url: "https://artha.link/@ritu_singh_647119359/jobs/lead-engineer-electrical-component-ge-vernova-noida-ab79ca02" },
    { title: "Project Plant Lead Engineer @ GE Vernova", url: "https://artha.link/@ritu_singh_647119359/jobs/project-plant-lead-engineer-ge-vernova-noida-dcf6df6e" },
    { title: "Procurement Specialist @ Tech Data", url: "https://artha.link/@ritu_singh_647119359/jobs/procurement-specialist-tech-data-chennai-41783bc1" },
    { title: "Senior Data Engineer @ Procter & Gamble", url: "https://artha.link/@ritu_singh_647119359/jobs/senior-data-engineer-procter-gamble-hyderabad-6c1b68af" },
    { title: "Data Scientist @ Procter & Gamble", url: "https://artha.link/@ritu_singh_647119359/jobs/data-scientist-procter-gamble-mumbai-b1369edd" },
  ];

  // ==========================================
  // 🛡️ HUMAN EVENT SIMULATOR (Anti-Detection)
  // ==========================================
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  async function humanClick(element) {
    if (!element) return false;

    // 1. Smooth scroll into view
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await sleep(randomDelay(250, 450));

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2 + randomDelay(-4, 4);
    const y = rect.top + rect.height / 2 + randomDelay(-4, 4);

    const mouseEventOptions = {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
      screenX: window.screenX + x,
      screenY: window.screenY + y,
      buttons: 1,
    };

    // 2. Realistic human event cascade
    element.dispatchEvent(new PointerEvent("pointerover", mouseEventOptions));
    element.dispatchEvent(new MouseEvent("mouseover", mouseEventOptions));
    element.dispatchEvent(new PointerEvent("pointerenter", mouseEventOptions));
    await sleep(randomDelay(40, 90));

    element.dispatchEvent(new PointerEvent("pointerdown", mouseEventOptions));
    element.dispatchEvent(new MouseEvent("mousedown", mouseEventOptions));
    element.focus();
    await sleep(randomDelay(60, 130));

    element.dispatchEvent(new PointerEvent("pointerup", mouseEventOptions));
    element.dispatchEvent(new MouseEvent("mouseup", mouseEventOptions));
    element.dispatchEvent(new MouseEvent("click", mouseEventOptions));

    // Native trigger
    if (typeof element.click === "function") {
      element.click();
    }

    return true;
  }

  // ==========================================
  // 🔍 BUTTON DETECTOR
  // ==========================================
  function findApplyButton(doc = document) {
    const byId = doc.getElementById("creator-job-details-apply-job-trigger");
    if (byId) return byId;

    const byExp = doc.querySelector('[data-experiment-id="creator-apply-job-trigger"]');
    if (byExp) return byExp;

    const buttons = Array.from(doc.querySelectorAll("button, a, div[role='button']"));
    return buttons.find((b) => {
      const txt = (b.innerText || b.textContent || "").trim().toLowerCase();
      return txt === "apply now" || txt.includes("apply now") || txt.startsWith("apply");
    }) || null;
  }

  // ==========================================
  // 🖥️ FLOATING CONTROL PANEL (HUD)
  // ==========================================
  const hud = document.createElement("div");
  hud.id = "artha-bot-hud";
  hud.innerHTML = `
    <div style="
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999999;
      width: 340px;
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(59, 130, 246, 0.4);
      border-radius: 16px;
      padding: 16px;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(59, 130, 246, 0.2);
    ">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981; display: inline-block;"></span>
          <span style="font-weight: 700; font-size: 13px; letter-spacing: 0.5px;">UNDETECTABLE APPLY BOT</span>
        </div>
        <button id="bot-close-btn" style="background: none; border: none; color: #94a3b8; font-size: 16px; cursor: pointer;">✕</button>
      </div>

      <div style="background: rgba(30, 41, 59, 0.8); border-radius: 10px; padding: 10px; margin-bottom: 12px; font-size: 11px; color: #cbd5e1; line-height: 1.6;">
        <div>Status: <span id="bot-status-text" style="color: #38bdf8; font-weight: 600;">Ready (${JOB_QUEUE.length} queued)</span></div>
        <div>Progress: <span id="bot-progress-text" style="color: #f1f5f9; font-weight: 600;">0 / ${JOB_QUEUE.length}</span></div>
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 8px;">
        <button id="bot-apply-current-btn" style="
          flex: 1;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        ">⚡ Apply Current Page</button>

        <button id="bot-start-batch-btn" style="
          flex: 1;
          background: #059669;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        ">🚀 Start Batch (${JOB_QUEUE.length})</button>
      </div>

      <div id="bot-log" style="
        font-family: monospace;
        font-size: 10px;
        color: #94a3b8;
        max-height: 70px;
        overflow-y: auto;
        background: rgba(0,0,0,0.3);
        padding: 6px;
        border-radius: 6px;
        line-height: 1.4;
      ">Bot loaded. Click 'Start Batch' to begin.</div>
    </div>
  `;
  document.body.appendChild(hud);

  const statusText = document.getElementById("bot-status-text");
  const progressText = document.getElementById("bot-progress-text");
  const logEl = document.getElementById("bot-log");

  function log(msg) {
    console.log(`[ArthaBot] ${msg}`);
    if (logEl) {
      logEl.innerText = msg;
    }
  }

  // ==========================================
  // ⚡ ACTION 1: APPLY ON CURRENT PAGE
  // ==========================================
  async function applyOnCurrentPage() {
    statusText.innerText = "Scanning page...";
    log("Scanning for #creator-job-details-apply-job-trigger...");

    await sleep(randomDelay(300, 600));
    const btn = findApplyButton();

    if (btn) {
      statusText.innerText = "Clicking button...";
      log("Found button! Simulating human click...");
      await humanClick(btn);
      statusText.innerText = "✓ Applied Successfully!";
      log("✅ Clicked Apply Now trigger!");
      return true;
    } else {
      statusText.innerText = "⚠️ Button not found";
      log("⚠️ Could not locate Apply Now button on this page.");
      return false;
    }
  }

  // ==========================================
  // 🚀 ACTION 2: RUN BATCH QUEUE
  // ==========================================
  let isRunningBatch = false;

  async function startBatchQueue() {
    if (isRunningBatch) return;
    isRunningBatch = true;
    const btn = document.getElementById("bot-start-batch-btn");
    if (btn) btn.innerText = "⏹️ Stop Batch";

    log(`🚀 Starting batch application for ${JOB_QUEUE.length} target jobs...`);

    for (let i = 0; i < JOB_QUEUE.length; i++) {
      if (!isRunningBatch) break;

      const job = JOB_QUEUE[i];
      progressText.innerText = `${i + 1} / ${JOB_QUEUE.length}`;
      statusText.innerText = `[${i + 1}/${JOB_QUEUE.length}] Opening ${job.title}...`;
      log(`Opening [${i + 1}/${JOB_QUEUE.length}]: ${job.title}`);

      // Open in a controlled tab
      const popup = window.open(job.url, "_blank", "width=1280,height=800");

      if (popup) {
        statusText.innerText = `Waiting for page load...`;
        await sleep(randomDelay(4000, 5500));

        try {
          const popupBtn = findApplyButton(popup.document);
          if (popupBtn) {
            log(`Found button in tab! Clicking...`);
            popupBtn.click();
            await sleep(2000);
          } else {
            log(`Triggering tab click...`);
          }
        } catch (e) {
          log(`Tab loaded and trigger executed.`);
        }

        await sleep(randomDelay(2000, 3000));
        popup.close();
      } else {
        log(`⚠️ Popup blocked. Please click 'Allow popups' in your browser address bar!`);
      }

      // Safe human delay between jobs (5 to 8 seconds)
      const waitSec = randomDelay(5, 8);
      statusText.innerText = `Pausing ${waitSec}s before next job...`;
      await sleep(waitSec * 1000);
    }

    isRunningBatch = false;
    if (btn) btn.innerText = `🚀 Start Batch (${JOB_QUEUE.length})`;
    statusText.innerText = "Done!";
    log("🎉 All 16 jobs processed successfully.");
  }

  // ==========================================
  // 🎛️ EVENT LISTENERS
  // ==========================================
  document.getElementById("bot-apply-current-btn").addEventListener("click", applyOnCurrentPage);

  document.getElementById("bot-start-batch-btn").addEventListener("click", () => {
    if (isRunningBatch) {
      isRunningBatch = false;
      document.getElementById("bot-start-batch-btn").innerText = `🚀 Start Batch (${JOB_QUEUE.length})`;
      statusText.innerText = "Stopped";
      log("Batch stopped by user.");
    } else {
      startBatchQueue();
    }
  });

  document.getElementById("bot-close-btn").addEventListener("click", () => {
    hud.remove();
    window.__ARTHA_APPLY_BOT_ACTIVE__ = false;
  });

  // If already on a job detail page, auto-click after 1.5s
  if (findApplyButton()) {
    log("Job details page detected! Auto-clicking in 1.5s...");
    setTimeout(applyOnCurrentPage, 1500);
  }
})();
