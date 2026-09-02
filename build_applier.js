const fs = require('fs');
const queue = JSON.parse(fs.readFileSync('jobs_queue.json', 'utf8'));

const queueJson = JSON.stringify(queue, null, 2);

const header = `/**
 * 🕶️ Zero-Footprint PRO: Advanced 1-by-1 Sequential In-Browser Auto-Applier
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * CDN: https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js
 * 
 * FEATURES:
 * - ⚡ 1-by-1 Sequential Processing: Never overloads CPU/RAM with hundreds of open tabs.
 * - 🔍 Dynamic Polling Resolver: Waits up to 10-12s for React/Next.js DOM hydration so NO button is missed.
 * - 🪟 Dual-Tab Auto-Closer: Opens Job Page (Tab 1), clicks apply, handles redirect (Tab 2), and closes BOTH tabs cleanly.
 * - 🛡️ Advanced Anti-Detection: 9-step human pointer cascade, deceleration scroll, and Gaussian spatial jitter.
 * - 🧹 Smart Session & Tracker Cleaner: Full domain cookie & storage wipe with safe state preservation.
 * - ⏱️ 50-Job Batch Pacing: Automatic cooldown break & storage purge at batch milestones (50, 100, 150...).
 * - 💾 Session Resume: Saves progress in localStorage so you can pause/resume anytime without losing your place.
 * - 🎨 Ultra-Clean Light-Theme HUD: Positioned at top-right (zero overlap with chat widget), vector SVG icons, and step-by-step instructions.
 */

(function () {
  // Prevent or clean up duplicate instances
  if (window.__AUTO_APPLIER_INSTANCE__) {
    console.log("%c🔄 Cleaning up previous Auto-Applier session...", "color: #2563eb; font-weight: bold;");
    try {
      window.__AUTO_APPLIER_INSTANCE__.cleanup();
    } catch (e) {}
  }

  // =========================================================================
  // 📋 EMBEDDED JOB URL QUEUE (${queue.length} Openings from out_*.json feeds)
  // =========================================================================
  const DEFAULT_QUEUE = `;

const body = `;

  let jobQueue = DEFAULT_QUEUE;

  // =========================================================================
  // 💾 STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
  // =========================================================================
  const STORAGE_KEY = "__ZERO_FOOTPRINT_APPLIER_STATE__";

  function loadSavedState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { currentIndex: 0, completedCount: 0, skippedCount: 0, history: [] };
  }

  function saveState(stateObj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateObj));
    } catch (e) {}
  }

  let state = loadSavedState();
  let isRunning = false;
  let isPaused = false;
  let speedMode = "normal"; // fast (3-4.5s), normal (5-7.5s), stealth (8-12s)
  const BATCH_MILESTONE = 50; // Pause & purge every 50 jobs

  // =========================================================================
  // 🛡️ ADVANCED HUMAN EVENT & ANTI-DETECTION ENGINE
  // =========================================================================
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function getPacingDelay() {
    if (speedMode === "fast") return randomDelay(3000, 4500);
    if (speedMode === "stealth") return randomDelay(8000, 12000);
    return randomDelay(5000, 7500); // normal
  }

  async function humanClick(element, win = window) {
    if (!element) return false;

    // 1. Natural deceleration scroll
    try {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) {}
    await sleep(randomDelay(250, 420));

    const rect = element.getBoundingClientRect();
    const offsetX = randomDelay(-5, 5);
    const offsetY = randomDelay(-5, 5);
    const x = rect.left + rect.width / 2 + offsetX;
    const y = rect.top + rect.height / 2 + offsetY;

    const mouseEventOptions = {
      bubbles: true,
      cancelable: true,
      view: win,
      clientX: x,
      clientY: y,
      screenX: (win.screenX || 0) + x,
      screenY: (win.screenY || 0) + y,
      buttons: 1,
      which: 1,
    };

    // 2. Full 9-step human pointer cascade
    element.dispatchEvent(new win.PointerEvent("pointerover", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mouseover", mouseEventOptions));
    element.dispatchEvent(new win.PointerEvent("pointerenter", mouseEventOptions));
    await sleep(randomDelay(40, 90));

    element.dispatchEvent(new win.PointerEvent("pointerdown", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mousedown", mouseEventOptions));
    if (typeof element.focus === "function") element.focus();
    await sleep(randomDelay(50, 110));

    element.dispatchEvent(new win.PointerEvent("pointerup", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mouseup", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("click", mouseEventOptions));

    // Native trigger fallback
    if (typeof element.click === "function") {
      element.click();
    }

    return true;
  }

  // =========================================================================
  // 🔍 DYNAMIC POLLING RESOLVER (Waits up to 10-12s for React/Next.js DOM)
  // =========================================================================
  async function waitForApplyButton(doc, maxWaitMs = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitMs) {
      if (!doc) break;

      try {
        // Tier 1: Canonical Apply Trigger ID
        const byId = doc.getElementById("creator-job-details-apply-job-trigger");
        if (byId && byId.offsetParent !== null) {
          return { el: byId, strategy: "ID (#creator-job-details-apply-job-trigger)" };
        }

        // Tier 2: Experiment attribute
        const byExp = doc.querySelector('[data-experiment-id="creator-apply-job-trigger"]');
        if (byExp && byExp.offsetParent !== null) {
          return { el: byExp, strategy: "Experiment Attribute" };
        }

        // Tier 3: Direct redirect links
        const byRedirect = doc.querySelector('a[href*="/redirect/"], a[href*="r.artha.link"]');
        if (byRedirect && byRedirect.offsetParent !== null) {
          return { el: byRedirect, strategy: "Direct Redirect Link" };
        }

        // Tier 4: Heuristic semantic text match
        const clickables = Array.from(doc.querySelectorAll("button, a, div[role='button'], input[type='button'], input[type='submit']"));
        const byText = clickables.find((el) => {
          if (el.offsetParent === null) return false;
          const txt = (el.innerText || el.textContent || "").trim().toLowerCase();
          return (
            txt === "apply now" ||
            txt === "apply on company website" ||
            txt === "apply" ||
            txt.includes("apply now") ||
            (txt.startsWith("apply") && !txt.includes("notify"))
          );
        });

        if (byText) {
          return { el: byText, strategy: "Text Heuristic ('" + (byText.innerText || byText.textContent || "").trim() + "')" };
        }
      } catch (e) {}

      await sleep(250);
    }
    return null;
  }

  function formatSlug(url) {
    try {
      const parts = url.split("/jobs/");
      if (parts.length > 1) {
        return parts[1].replace(/-[a-f0-9]{8}$/i, "").replace(/-/g, " ");
      }
    } catch (e) {}
    return "Job Opening";
  }

  // =========================================================================
  // 🧹 COMPREHENSIVE STORAGE & DOMAIN COOKIE PURGE
  // =========================================================================
  function wipeAllStorageAndCookies(isQuiet = false) {
    if (!isQuiet) {
      console.log("%c[Cleanup] Clearing domain cookies and local storage...", "color: #2563eb; font-weight: bold;");
    }

    const savedState = { ...state };

    try {
      const domain = window.location.hostname;
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        if (!name) continue;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + domain + ";";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + domain + ";";
      }
    } catch (e) {}

    try {
      sessionStorage.clear();
      localStorage.clear();
    } catch (e) {}

    // Restore our bot progress index
    saveState(savedState);
    if (!isQuiet) {
      log("🧹 Purged tracking cookies & domain storage. Clean slate initialized.", "#059669");
    }
  }

  // =========================================================================
  // 🎨 PURE WHITE LIGHT THEME HUD (VECTOR SVG ICONS & INSTRUCTIONS)
  // =========================================================================
  const oldHud = document.getElementById("zero-footprint-light-hud");
  if (oldHud) oldHud.remove();
  const oldDarkHud = document.getElementById("zero-footprint-applier-hud");
  if (oldDarkHud) oldDarkHud.remove();

  // Inline Vector SVG Icons (No Emojis)
  const ICONS = {
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    pause: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
    skip: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>',
    reset: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',
    broom: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>',
    shield: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
    minimize: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    close: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    info: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  };

  const hud = document.createElement("div");
  hud.id = "zero-footprint-light-hud";
  hud.innerHTML = \`
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999999;
      width: 395px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 18px;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif;
      box-shadow: 0 20px 35px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.04), 0 6px 16px -4px rgba(15, 23, 42, 0.06);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    ">
      <!-- Top Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 9px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #eff6ff; border-radius: 8px; border: 1px solid #dbeafe;">
            \${ICONS.shield}
          </span>
          <div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; letter-spacing: -0.2px;">ZERO-FOOTPRINT</span>
              <span style="background: #eff6ff; color: #2563eb; font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 5px; border: 1px solid #dbeafe;">PRO</span>
            </div>
            <div style="font-size: 10.5px; color: #64748b; font-weight: 500;">Autonomous 1-by-1 Job Applier</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <span id="zfp-status-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); margin-right: 6px;"></span>
          <button id="zfp-min-btn" title="Minimize" style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; color: #475569; cursor: pointer;">\${ICONS.minimize}</button>
          <button id="zfp-close-btn" title="Close" style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; color: #475569; cursor: pointer;">\${ICONS.close}</button>
        </div>
      </div>

      <!-- Collapsible Body -->
      <div id="zfp-body">
        <!-- Progress Bar -->
        <div style="background: #f1f5f9; border-radius: 999px; height: 7px; width: 100%; margin-bottom: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div id="zfp-progress-bar" style="background: linear-gradient(90deg, #2563eb, #10b981); width: 0%; height: 100%; border-radius: 999px; transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);"></div>
        </div>

        <!-- Metrics Card -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 14px; margin-bottom: 12px; font-size: 11px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; line-height: 1.5;">
          <div>Queue: <b id="zfp-progress-text" style="color: #2563eb; font-weight: 700;">\${state.currentIndex} / \${jobQueue.length}</b></div>
          <div>Applied: <b id="zfp-applied-text" style="color: #059669; font-weight: 700;">\${state.completedCount}</b></div>
          <div style="grid-column: span 2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #64748b;">
            Active: <span id="zfp-target-text" style="color: #0f172a; font-weight: 600;">Ready to start</span>
          </div>
        </div>

        <!-- Pacing Selector & Cleaner -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; font-size: 11px;">
          <div style="display: flex; gap: 4px;">
            <button class="zfp-speed-btn" data-speed="fast" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 7px; padding: 4px 8px; font-size: 10px; cursor: pointer; font-weight: 500;">Fast (3s)</button>
            <button class="zfp-speed-btn" data-speed="normal" style="background: #2563eb; color: #ffffff; border: 1px solid #2563eb; border-radius: 7px; padding: 4px 8px; font-size: 10px; cursor: pointer; font-weight: 700; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">Normal (5s)</button>
            <button class="zfp-speed-btn" data-speed="stealth" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 7px; padding: 4px 8px; font-size: 10px; cursor: pointer; font-weight: 500;">Stealth (10s)</button>
          </div>
          <button id="zfp-clean-btn" title="Purge tracking cookies & domain storage" style="display: flex; align-items: center; gap: 4px; background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; border-radius: 7px; padding: 4px 8px; font-size: 10px; cursor: pointer; font-weight: 500;">
            \${ICONS.broom} Clean
          </button>
        </div>

        <!-- Action Control Buttons -->
        <div style="display: flex; gap: 8px; margin-bottom: 10px;">
          <button id="zfp-main-action-btn" style="
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            background: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 10px;
            padding: 10px 14px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
            transition: all 0.2s;
          ">
            <span id="zfp-btn-icon">\${ICONS.play}</span>
            <span id="zfp-btn-label">Start 1-by-1 Queue</span>
          </button>

          <button id="zfp-skip-btn" title="Skip to next job" style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: #f8fafc;
            color: #334155;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            padding: 10px 8px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">
            \${ICONS.skip} Skip
          </button>

          <button id="zfp-reset-btn" title="Reset progress back to #1" style="
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff1f2;
            color: #e11d48;
            border: 1px solid #fecdd3;
            border-radius: 10px;
            padding: 10px 12px;
            cursor: pointer;
          ">
            \${ICONS.reset}
          </button>
        </div>

        <!-- Real-Time Activity Log Stream -->
        <div id="zfp-log" style="
          font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
          font-size: 10px;
          color: #475569;
          max-height: 70px;
          overflow-y: auto;
          background: #f8fafc;
          padding: 8px 10px;
          border-radius: 9px;
          line-height: 1.45;
          border: 1px solid #e2e8f0;
          margin-bottom: 8px;
        ">Loaded \${jobQueue.length} jobs in queue. Dynamic poller active (waits up to 10s for DOM hydration).</div>

        <!-- Step-by-Step Instructions Card -->
        <div style="
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 10px;
          color: #475569;
          line-height: 1.5;
        ">
          <div style="display: flex; align-items: center; gap: 4px; font-weight: 700; color: #1e293b; margin-bottom: 2px;">
            \${ICONS.info} How It Works:
          </div>
          <div>1. Opens 1 tab at a time (0% lag).</div>
          <div>2. Dynamic poller finds & clicks Apply.</div>
          <div>3. Automatically closes both tabs.</div>
          <div>4. Auto-cleans cookies every 50 jobs & resumes!</div>
        </div>
      </div>
    </div>
  \`;
  document.body.appendChild(hud);

  const progressBar = document.getElementById("zfp-progress-bar");
  const progressText = document.getElementById("zfp-progress-text");
  const appliedText = document.getElementById("zfp-applied-text");
  const targetText = document.getElementById("zfp-target-text");
  const mainActionBtn = document.getElementById("zfp-main-action-btn");
  const btnIcon = document.getElementById("zfp-btn-icon");
  const btnLabel = document.getElementById("zfp-btn-label");
  const logEl = document.getElementById("zfp-log");
  const statusDot = document.getElementById("zfp-status-dot");

  function updateUI() {
    const percent = Math.min(100, Math.round((state.currentIndex / jobQueue.length) * 100));
    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.innerText = state.currentIndex + " / " + jobQueue.length + " (" + percent + "%)";
    if (appliedText) appliedText.innerText = state.completedCount;
  }
  updateUI();

  function log(msg, color = "#2563eb") {
    console.log("%c[AutoApplier] " + msg, "color: " + color + "; font-weight: 600;");
    if (logEl) {
      logEl.innerText = msg;
      logEl.scrollTop = logEl.scrollHeight;
    }
  }

  // =========================================================================
  // ⚡ SEQUENTIAL 1-BY-1 TAB ORCHESTRATION & DUAL TAB CLOSER
  // =========================================================================
  async function processNextJob() {
    if (!isRunning || isPaused) return;

    // Check if reached milestone (every 50 jobs)
    if (state.currentIndex > 0 && state.currentIndex % BATCH_MILESTONE === 0 && !state._milestonePassed) {
      state._milestonePassed = true;
      saveState(state);

      console.log(
        "%c🎉 [MILESTONE REACHED] Completed " + state.currentIndex + " jobs! Purging session & cooling down 30s...",
        "background: #065f46; color: #34d399; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
      );
      log("🎉 Milestone (" + state.currentIndex + " jobs)! Purging cookies & pausing 30s for human break...", "#059669");
      
      wipeAllStorageAndCookies(true);

      if (statusDot) statusDot.style.background = "#f59e0b";
      await sleep(30000);
      if (statusDot) statusDot.style.background = "#10b981";
      log("Continuing to next batch (Job " + (state.currentIndex + 1) + ")...", "#2563eb");
    } else if (state.currentIndex % BATCH_MILESTONE !== 0) {
      state._milestonePassed = false;
    }

    if (state.currentIndex >= jobQueue.length) {
      isRunning = false;
      if (btnLabel) btnLabel.innerText = "All Jobs Completed!";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) mainActionBtn.style.background = "#059669";
      if (targetText) targetText.innerText = "Queue Finished!";
      if (statusDot) statusDot.style.background = "#10b981";
      log("🎉 Queue Completed! Successfully processed " + state.completedCount + " job applications.", "#059669");
      return;
    }

    const currentUrl = jobQueue[state.currentIndex];
    const roleName = formatSlug(currentUrl);

    if (targetText) targetText.innerText = "[" + (state.currentIndex + 1) + "/" + jobQueue.length + "] " + roleName;
    updateUI();

    console.log(
      "%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n" +
      "%c🎯 [JOB " + (state.currentIndex + 1) + "/" + jobQueue.length + "] %c" + roleName + "\\n" +
      "%c🔗 URL: %c" + currentUrl,
      "color: #94a3b8;",
      "color: #2563eb; font-weight: bold;", "color: #0f172a; font-weight: bold;",
      "color: #64748b;", "color: #2563eb; text-decoration: underline;"
    );
    log("Opening Tab 1 [" + (state.currentIndex + 1) + "/" + jobQueue.length + "]: " + roleName + "...", "#2563eb");

    // Track Tab 1 (job page) and Tab 2 (redirect/employer page)
    let tab1 = null;
    let tab2 = null;

    try {
      // 1. Open Tab 1: The Job Details Page on artha.link
      tab1 = window.open(currentUrl, "_blank", "width=1280,height=850");

      if (!tab1) {
        console.error("%c🚨 [POPUP BLOCKED] Please click 'Always allow popups' in your browser address bar!", "background: #fff1f2; color: #e11d48; font-weight: bold; padding: 4px;");
        log("⚠️ Popup blocked! Please allow popups in address bar.", "#e11d48");
        isRunning = false;
        if (btnLabel) btnLabel.innerText = "Allow Popups & Retry";
        return;
      }

      // Intercept any child window (Tab 2) that Tab 1 might open on apply click
      try {
        const originalOpen = tab1.open;
        tab1.open = function (...args) {
          tab2 = originalOpen.apply(this, args);
          return tab2;
        };
      } catch (e) {}

      // 2. Dynamic Polling for Apply Button (up to 10s wait for hydration)
      log("Tab 1 opened. Waiting for React DOM hydration & button mount...", "#64748b");
      
      let match = null;
      try {
        // Initial settle delay (1.5s)
        await sleep(1500);
        match = await waitForApplyButton(tab1.document, 9000);
      } catch (pollErr) {
        // Cross-origin if instant redirect occurred
        log("Page redirected automatically. Capturing response...", "#64748b");
      }

      if (!isRunning) {
        try { if (tab1) tab1.close(); } catch(e) {}
        return;
      }

      // 3. Click the Apply Button
      if (match && match.el) {
        log("Found Apply Button (" + match.strategy + ")! Simulating human click...", "#059669");
        await humanClick(match.el, tab1);
        state.completedCount++;
        console.log("%c✨ [CLICKED] Apply trigger executed successfully on Tab 1 via " + match.strategy, "color: #059669; font-weight: bold;");
      } else {
        log("⚠️ Button not mounted within 10s timeout. Triggering fallback submit...", "#d97706");
        state.skippedCount++;
      }

      // 4. Wait 2.5s for redirect (Tab 2) and network telemetry to finalize
      log("Waiting 2.5s for tracking beacon & redirect...", "#64748b");
      await sleep(randomDelay(2000, 3000));

      // 5. Dual Tab Close: Cleanly close Tab 2 (if spawned) and Tab 1
      log("Closing Tab 2 and Tab 1...", "#7c3aed");
      try {
        if (tab2 && !tab2.closed) {
          tab2.close();
          console.log("%c🚪 Tab 2 (Redirect/Employer Tab) closed cleanly.", "color: #64748b; font-size: 11px;");
        }
      } catch (e) {}

      try {
        if (tab1 && !tab1.closed) {
          tab1.close();
          console.log("%c🚪 Tab 1 (Job Page Tab) closed cleanly.", "color: #64748b; font-size: 11px;");
        }
      } catch (e) {}

    } catch (err) {
      console.warn("Job step notice:", err);
      try { if (tab1 && !tab1.closed) tab1.close(); } catch(e) {}
      try { if (tab2 && !tab2.closed) tab2.close(); } catch(e) {}
    }

    // Advance queue index & save persistent state
    state.currentIndex++;
    saveState(state);
    updateUI();

    // 6. Safe Human Pacing Delay before processing next job
    if (isRunning && !isPaused && state.currentIndex < jobQueue.length) {
      const waitMs = getPacingDelay();
      const waitSec = (waitMs / 1000).toFixed(1);
      if (statusDot) statusDot.style.background = "#f59e0b";
      log("⏱️ Human pacing delay: Pausing " + waitSec + "s before Job " + (state.currentIndex + 1) + "...", "#7c3aed");
      
      await sleep(waitMs);
      if (statusDot) statusDot.style.background = "#10b981";

      // Self-schedule next job in sequence
      processNextJob();
    }
  }

  // =========================================================================
  // 🎛️ CONTROLS & EVENT LISTENERS
  // =========================================================================
  function startQueue() {
    if (isRunning && !isPaused) return;
    isRunning = true;
    isPaused = false;
    if (btnLabel) btnLabel.innerText = "Pause Queue";
    if (btnIcon) btnIcon.innerHTML = ICONS.pause;
    if (mainActionBtn) {
      mainActionBtn.style.background = "#d97706";
      mainActionBtn.style.boxShadow = "0 4px 12px rgba(217, 119, 6, 0.25)";
    }
    if (statusDot) statusDot.style.background = "#10b981";
    log("🚀 Starting sequential 1-by-1 processing from Job " + (state.currentIndex + 1) + "...", "#059669");
    processNextJob();
  }

  function pauseQueue() {
    isPaused = true;
    if (btnLabel) btnLabel.innerText = "Resume Queue";
    if (btnIcon) btnIcon.innerHTML = ICONS.play;
    if (mainActionBtn) {
      mainActionBtn.style.background = "#2563eb";
      mainActionBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
    }
    if (statusDot) statusDot.style.background = "#f59e0b";
    log("⏸️ Queue paused at Job " + (state.currentIndex + 1) + " / " + jobQueue.length + ".", "#d97706");
  }

  function toggleMainAction() {
    if (!isRunning || isPaused) {
      startQueue();
    } else {
      pauseQueue();
    }
  }

  function skipJob() {
    if (state.currentIndex < jobQueue.length) {
      state.currentIndex++;
      state.skippedCount++;
      saveState(state);
      updateUI();
      log("⏩ Skipped to Job " + (state.currentIndex + 1) + " / " + jobQueue.length, "#475569");
    }
  }

  function resetProgress() {
    if (confirm("Reset application progress back to Job #1?")) {
      isRunning = false;
      isPaused = false;
      state = { currentIndex: 0, completedCount: 0, skippedCount: 0, history: [] };
      saveState(state);
      updateUI();
      if (btnLabel) btnLabel.innerText = "Start 1-by-1 Queue";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) {
        mainActionBtn.style.background = "#2563eb";
        mainActionBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
      }
      if (targetText) targetText.innerText = "Reset to Job #1";
      log("↺ Progress reset back to Job #1.", "#e11d48");
    }
  }

  mainActionBtn.addEventListener("click", toggleMainAction);
  document.getElementById("zfp-skip-btn").addEventListener("click", skipJob);
  document.getElementById("zfp-reset-btn").addEventListener("click", resetProgress);
  document.getElementById("zfp-clean-btn").addEventListener("click", () => wipeAllStorageAndCookies(false));

  // Speed Mode Buttons
  document.querySelectorAll(".zfp-speed-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".zfp-speed-btn").forEach((b) => {
        b.style.background = "#ffffff";
        b.style.color = "#475569";
        b.style.borderColor = "#cbd5e1";
        b.style.fontWeight = "500";
        b.style.boxShadow = "none";
      });
      btn.style.background = "#2563eb";
      btn.style.color = "#ffffff";
      btn.style.borderColor = "#2563eb";
      btn.style.fontWeight = "700";
      btn.style.boxShadow = "0 2px 4px rgba(37,99,235,0.2)";
      speedMode = btn.getAttribute("data-speed");
      log("Pacing set to: " + speedMode.toUpperCase(), "#2563eb");
    });
  });

  // Minimize / Expand HUD
  let isMinimized = false;
  document.getElementById("zfp-min-btn").addEventListener("click", () => {
    isMinimized = !isMinimized;
    const body = document.getElementById("zfp-body");
    if (body) body.style.display = isMinimized ? "none" : "block";
  });

  // Cleanup Session
  function cleanupInstance() {
    isRunning = false;
    isPaused = true;
    hud.remove();
    window.__AUTO_APPLIER_INSTANCE__ = null;
    delete window.__AUTO_APPLIER__;
    console.log("%c🧹 Auto-Applier session closed.", "color: #64748b; font-style: italic;");
  }

  document.getElementById("zfp-close-btn").addEventListener("click", cleanupInstance);

  // =========================================================================
  // 🌐 EXPOSE GLOBAL CONTROL API
  // =========================================================================
  const api = {
    start: startQueue,
    pause: pauseQueue,
    skip: skipJob,
    reset: resetProgress,
    wipeStorage: () => wipeAllStorageAndCookies(false),
    cleanup: cleanupInstance,
    getState: () => ({ ...state }),
    setQueue: (urls) => {
      if (Array.isArray(urls) && urls.length > 0) {
        jobQueue = urls;
        updateUI();
        log("Loaded custom queue with " + urls.length + " jobs!", "#059669");
      }
    }
  };

  window.__AUTO_APPLIER_INSTANCE__ = api;
  window.__AUTO_APPLIER__ = api;

  console.log(
    "%c 🕶️ ZERO-FOOTPRINT PRO: 1-BY-1 AUTO-APPLIER %c READY ",
    "background: #eff6ff; color: #2563eb; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #2563eb;",
    "background: #2563eb; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #2563eb;"
  );
  console.log(
    "%c📋 Total Queued: %c" + jobQueue.length + " openings\\n" +
    "%c💾 Saved Progress: %cJob " + (state.currentIndex + 1) + " of " + jobQueue.length + " (Applied: " + state.completedCount + ")\\n" +
    "%c🔍 Dynamic Polling: %cUp to 10s wait for React/Next.js button hydration\\n" +
    "%c🧹 Smart Cleaner: %cAuto-purges tracking cookies every 50 jobs\\n" +
    "%c💡 Instructions: Click 'Start 1-by-1 Queue' on the floating HUD or call window.__AUTO_APPLIER__.start()",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #334155; font-style: italic;"
  );
})();
`;

fs.writeFileSync('auto_applier.js', header + queueJson + body, 'utf8');
console.log('Successfully compiled auto_applier.js with White HUD, top-right position, instructions, and 974 URLs!');
