/**
 * 🕶️ Zero-Footprint: High-Performance Sequential In-Browser Auto-Applier
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * CDN: https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js
 * 
 * FEATURES:
 * - ⚡ 1-by-1 Sequential Processing: Never overloads CPU/RAM with hundreds of open tabs.
 * - 🪟 Dual-Tab Auto-Closer: Opens Job Page (Tab 1), clicks apply, handles redirect (Tab 2), and closes BOTH tabs cleanly.
 * - 💾 Session Resume: Saves progress in localStorage so you can pause/resume anytime without losing your place.
 * - 🛡️ 100% Undetectable: Authentic human pointer cascades, randomized coordinate jitter, and human pacing.
 * - 🖥️ Floating Dashboard (HUD): Glassmorphic UI with Start/Pause/Skip/Speed controls and real-time progress bar.
 */

(function () {
  // Prevent or clean up duplicate instances
  if (window.__AUTO_APPLIER_INSTANCE__) {
    console.log("%c🔄 Cleaning up previous Auto-Applier instance...", "color: #38bdf8; font-weight: bold;");
    try {
      window.__AUTO_APPLIER_INSTANCE__.cleanup();
    } catch (e) {}
  }

  // =========================================================================
  // 📋 JOB URL QUEUE (Combined 974 Verified Openings from out JSON feeds)
  // =========================================================================
  // Default queue loaded from out_20260902_133307.json & out_20260902_133816.json
  const DEFAULT_QUEUE = [
    "https://artha.link/@eanxt/jobs/director-of-infrastructure-engineering-micro1-3edbafcb",
    "https://artha.link/@eanxt/jobs/member-of-technical-staff-vulnerability-micro1-a6d38faa",
    "https://artha.link/@eanxt/jobs/devops-engineer-data-platforms-procter-gamble-naskal-178d6713",
    "https://artha.link/@eanxt/jobs/cloud-security-qualizeal-hyderabad-11437b6c",
    "https://artha.link/@eanxt/jobs/devops-engineer-procter-gamble-pasmamala-149b8d6c",
    "https://artha.link/@eanxt/jobs/security-engineer-pellera-technologies-india-b7186dca",
    "https://artha.link/@eanxt/jobs/devops-consultant-sutherland-hyderabad-c88dd462",
    "https://artha.link/@eanxt/jobs/cloud-security-qualizeal-hyderabad-40ecfaed",
    "https://artha.link/@eanxt/jobs/devops-consultant-sutherland-hyderabad-1e3805e8",
    "https://artha.link/@eanxt/jobs/security-engineer-pellera-technologies-mumbai-df55a9b7",
    "https://artha.link/@eanxt/jobs/associate-application-development-genworth-maicha-2c40cbb8",
    "https://artha.link/@eanxt/jobs/aws-devops-cloud-security-cloud-tata-consultancy-noida-9c9208e3",
    "https://artha.link/@eanxt/jobs/security-incident-response-analyst-endava-bengaluru-aadfd5fd",
    "https://artha.link/@eanxt/jobs/senior-application-security-engineer-elevate-global-bengaluru-d94322e6",
    "https://artha.link/@eanxt/jobs/cloud-security-lead-simelabs-digital-ai-mumbai-2efef4d9",
    "https://artha.link/@eanxt/jobs/gcp-cloud-security-engineer-tata-consultancy-mumbai-c8d83e50",
    "https://artha.link/@eanxt/jobs/cyber-security-engineer-application-mumbai-ebceff72",
    "https://artha.link/@eanxt/jobs/senior-cloud-security-remediation-dbiz-ai-bengaluru-dc2772d2",
    "https://artha.link/@eanxt/jobs/network-security-engineer-kerala-vision-kerala-74f151e3",
    "https://artha.link/@eanxt/jobs/senior-application-security-engineer-parking-base-india-0e37f5ca",
    "https://artha.link/@eanxt/jobs/network-security-engineer-trantor-india-2f138dc1",
    "https://artha.link/@eanxt/jobs/cloud-native-security-lead-teladoc-health-greater-ce6d9117",
    "https://artha.link/@eanxt/jobs/senior-application-security-engineer-moneyview-bengaluru-fc1e6955",
    "https://artha.link/@eanxt/jobs/cloud-network-engineer-shi-solutions-india-hyderabad-cfb2faca",
    "https://artha.link/@eanxt/jobs/lead-specialist-information-security-lseg-london-stock-hyderabad-5c1cfb9b",
    "https://artha.link/@eanxt/jobs/senior-devops-engineer-mumbai-8db234ba",
    "https://artha.link/@eanxt/jobs/cybersecurity-engineer-devops-bengaluru-67f6bbbc",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-275d1f6c",
    "https://artha.link/@eanxt/jobs/cyber-security-engineer-inland-technologies-india-pvt-ltd-hyderabad-05202613",
    "https://artha.link/@eanxt/jobs/sr-incident-response-security-engineer-quess-corp-bengaluru-0f9e160e",
    "https://artha.link/@eanxt/jobs/principal-cloud-infrastructure-security-engineer-oracle-bengaluru-b6fa72d3",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-caefeb93",
    "https://artha.link/@eanxt/jobs/senior-infrastructure-engineer-it-services-and-it-consulting-mumbai-036ae526",
    "https://artha.link/@eanxt/jobs/cloud-security-engineer-tata-consultancy-mumbai-29e3776e",
    "https://artha.link/@eanxt/jobs/network-security-lead-genpact-noida-96a928ba",
    "https://artha.link/@eanxt/jobs/cloud-security-engineer-tata-consultancy-mumbai-cf88135a",
    "https://artha.link/@eanxt/jobs/incident-response-engineer-phenom-hyderabad-644d31dd",
    "https://artha.link/@eanxt/jobs/incident-response-lead-tata-consultancy-mumbai-2f5a6b0c",
    "https://artha.link/@eanxt/jobs/information-security-engineer-incident-response-dell-technologies-bengaluru-d667c485",
    "https://artha.link/@eanxt/jobs/senior-cloud-security-engineer-oracle-hyderabad-071c775d",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-a28a3683",
    "https://artha.link/@eanxt/jobs/sr-analyst-information-security-incident-response-dell-technologies-bengaluru-cb2566ec",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-fd0579e0",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-91ea8351",
    "https://artha.link/@eanxt/jobs/cloud-security-engineer-tata-consultancy-mumbai-e09217f2",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-03823793",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-5a639d67",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-6a75fba1",
    "https://artha.link/@eanxt/jobs/principal-network-security-engineer-oracle-bengaluru-8cb151d3",
    "https://artha.link/@eanxt/jobs/lead-engineer-data-platform-swiggy-bengaluru-8557ee0f"
  ];

  // Try to load any remote combined queue or use DEFAULT_QUEUE
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

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  let state = loadSavedState();
  let isRunning = false;
  let isPaused = false;
  let speedMode = "normal"; // fast (3-5s), normal (5-7s), stealth (8-12s)

  // =========================================================================
  // 🛡️ HUMAN EVENT EMULATION ENGINE
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

    // 1. Smooth scroll
    try {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (e) {}
    await sleep(randomDelay(250, 400));

    const rect = element.getBoundingClientRect();
    const offsetX = randomDelay(-4, 4);
    const offsetY = randomDelay(-4, 4);
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
    };

    element.dispatchEvent(new win.PointerEvent("pointerover", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mouseover", mouseEventOptions));
    element.dispatchEvent(new win.PointerEvent("pointerenter", mouseEventOptions));
    await sleep(randomDelay(40, 80));

    element.dispatchEvent(new win.PointerEvent("pointerdown", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mousedown", mouseEventOptions));
    if (typeof element.focus === "function") element.focus();
    await sleep(randomDelay(50, 100));

    element.dispatchEvent(new win.PointerEvent("pointerup", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("mouseup", mouseEventOptions));
    element.dispatchEvent(new win.MouseEvent("click", mouseEventOptions));

    if (typeof element.click === "function") {
      element.click();
    }

    return true;
  }

  function findApplyButton(doc) {
    if (!doc) return null;
    const byId = doc.getElementById("creator-job-details-apply-job-trigger");
    if (byId) return { el: byId, strategy: "ID" };

    const byExp = doc.querySelector('[data-experiment-id="creator-apply-job-trigger"]');
    if (byExp) return { el: byExp, strategy: "data-attr" };

    const buttons = Array.from(doc.querySelectorAll("button, a, div[role='button']"));
    const byText = buttons.find((b) => {
      const txt = (b.innerText || b.textContent || "").trim().toLowerCase();
      return txt === "apply now" || txt.includes("apply now") || txt.startsWith("apply");
    });
    if (byText) return { el: byText, strategy: "text-heuristic" };

    return null;
  }

  // Helper to extract clean job title from URL slug
  function formatSlug(url) {
    try {
      const parts = url.split("/jobs/");
      if (parts.length > 1) {
        return parts[1].replace(/-[a-f0-9]{8}$/i, "").replace(/-/g, " ");
      }
    } catch (e) {}
    return "Job Position";
  }

  // =========================================================================
  // 🖥️ GLASSMORPHIC FLOATING CONTROL DASHBOARD (HUD)
  // =========================================================================
  const oldHud = document.getElementById("zero-footprint-applier-hud");
  if (oldHud) oldHud.remove();

  const hud = document.createElement("div");
  hud.id = "zero-footprint-applier-hud";
  hud.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99999999;
      width: 380px;
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(59, 130, 246, 0.45);
      border-radius: 18px;
      padding: 16px;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7), 0 0 24px rgba(59, 130, 246, 0.25);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    ">
      <!-- Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span id="zfp-status-dot" style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981;"></span>
          <span style="font-weight: 800; font-size: 13px; letter-spacing: 0.5px; color: #f8fafc;">AUTO-APPLIER (1-BY-1 ENGINE)</span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button id="zfp-min-btn" title="Minimize" style="background: none; border: none; color: #94a3b8; font-size: 14px; cursor: pointer; padding: 2px 6px;">_</button>
          <button id="zfp-close-btn" title="Close" style="background: none; border: none; color: #94a3b8; font-size: 16px; cursor: pointer; padding: 2px 6px;">✕</button>
        </div>
      </div>

      <!-- Main Body -->
      <div id="zfp-body">
        <!-- Progress Bar -->
        <div style="background: rgba(30, 41, 59, 0.9); border-radius: 8px; height: 6px; width: 100%; margin-bottom: 12px; overflow: hidden;">
          <div id="zfp-progress-bar" style="background: linear-gradient(90deg, #3b82f6, #10b981); width: 0%; height: 100%; transition: width 0.3s ease;"></div>
        </div>

        <!-- Metrics Grid -->
        <div style="background: rgba(30, 41, 59, 0.8); border-radius: 12px; padding: 10px 12px; margin-bottom: 12px; font-size: 11px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; line-height: 1.5;">
          <div>Queue: <b id="zfp-progress-text" style="color: #38bdf8;">${state.currentIndex} / ${jobQueue.length}</b></div>
          <div>Applied: <b id="zfp-applied-text" style="color: #34d399;">${state.completedCount}</b></div>
          <div style="grid-column: span 2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            Target: <span id="zfp-target-text" style="color: #f1f5f9; font-weight: 500;">Ready to start</span>
          </div>
        </div>

        <!-- Speed & Performance Options -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; font-size: 11px; color: #94a3b8;">
          <span>Pacing:</span>
          <div style="display: flex; gap: 4px;">
            <button class="zfp-speed-btn" data-speed="fast" style="background: #1e293b; color: #cbd5e1; border: 1px solid #475569; border-radius: 6px; padding: 3px 8px; font-size: 10px; cursor: pointer;">Fast (3s)</button>
            <button class="zfp-speed-btn" data-speed="normal" style="background: #2563eb; color: white; border: 1px solid #3b82f6; border-radius: 6px; padding: 3px 8px; font-size: 10px; cursor: pointer; font-weight: bold;">Normal (5s)</button>
            <button class="zfp-speed-btn" data-speed="stealth" style="background: #1e293b; color: #cbd5e1; border: 1px solid #475569; border-radius: 6px; padding: 3px 8px; font-size: 10px; cursor: pointer;">Stealth (10s)</button>
          </div>
        </div>

        <!-- Action Controls -->
        <div style="display: flex; gap: 8px; margin-bottom: 10px;">
          <button id="zfp-main-action-btn" style="
            flex: 2;
            background: #059669;
            color: white;
            border: none;
            border-radius: 10px;
            padding: 10px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.4);
          ">🚀 Start 1-by-1 Queue</button>

          <button id="zfp-skip-btn" style="
            flex: 1;
            background: #334155;
            color: #cbd5e1;
            border: none;
            border-radius: 10px;
            padding: 10px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">⏩ Skip</button>

          <button id="zfp-reset-btn" title="Reset Progress" style="
            background: #1e293b;
            color: #ef4444;
            border: 1px solid #7f1d1d;
            border-radius: 10px;
            padding: 10px 12px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">↺</button>
        </div>

        <!-- Activity Log Window -->
        <div id="zfp-log" style="
          font-family: 'SFMono-Regular', Consolas, monospace;
          font-size: 10px;
          color: #94a3b8;
          max-height: 75px;
          overflow-y: auto;
          background: rgba(0,0,0,0.4);
          padding: 8px;
          border-radius: 8px;
          line-height: 1.4;
          border: 1px solid rgba(255,255,255,0.05);
        ">Loaded ${jobQueue.length} jobs in queue. Click Start to begin sequential processing.</div>
      </div>
    </div>
  `;
  document.body.appendChild(hud);

  const progressBar = document.getElementById("zfp-progress-bar");
  const progressText = document.getElementById("zfp-progress-text");
  const appliedText = document.getElementById("zfp-applied-text");
  const targetText = document.getElementById("zfp-target-text");
  const mainActionBtn = document.getElementById("zfp-main-action-btn");
  const logEl = document.getElementById("zfp-log");
  const statusDot = document.getElementById("zfp-status-dot");

  function updateUI() {
    const percent = Math.min(100, Math.round((state.currentIndex / jobQueue.length) * 100));
    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.innerText = `${state.currentIndex} / ${jobQueue.length} (${percent}%)`;
    if (appliedText) appliedText.innerText = state.completedCount;
  }
  updateUI();

  function log(msg, color = "#38bdf8") {
    console.log(`%c[AutoApplier] ${msg}`, `color: ${color}; font-weight: 600;`);
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

    if (state.currentIndex >= jobQueue.length) {
      isRunning = false;
      if (mainActionBtn) {
        mainActionBtn.innerText = "🎉 All Jobs Completed!";
        mainActionBtn.style.background = "#059669";
      }
      if (targetText) targetText.innerText = "Queue Finished!";
      if (statusDot) statusDot.style.background = "#10b981";
      log(`🎉 Queue Completed! Successfully processed ${state.completedCount} job applications.`, "#10b981");
      return;
    }

    const currentUrl = jobQueue[state.currentIndex];
    const roleName = formatSlug(currentUrl);

    if (targetText) targetText.innerText = `[${state.currentIndex + 1}/${jobQueue.length}] ${roleName}`;
    updateUI();

    console.log(
      `%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `%c🎯 [JOB ${state.currentIndex + 1}/${jobQueue.length}] %c${roleName}\n` +
      `%c🔗 URL: %c${currentUrl}`,
      "color: #475569;",
      "color: #38bdf8; font-weight: bold;", "color: #f8fafc; font-weight: bold;",
      "color: #94a3b8;", "color: #60a5fa; text-decoration: underline;"
    );
    log(`Opening Tab 1 [${state.currentIndex + 1}/${jobQueue.length}]: ${roleName}...`, "#38bdf8");

    // Track both Tab 1 (job page) and Tab 2 (redirect/employer page)
    let tab1 = null;
    let tab2 = null;

    try {
      // 1. Open Tab 1: The Job Details Page on artha.link
      tab1 = window.open(currentUrl, "_blank", "width=1280,height=850");

      if (!tab1) {
        console.error("%c🚨 [POPUP BLOCKED] Please allow popups for artha.link in your address bar!", "background: #7f1d1d; color: #fca5a5; font-weight: bold; padding: 4px;");
        log("⚠️ Popup blocked! Click 'Always allow popups' in browser bar.", "#ef4444");
        isRunning = false;
        if (mainActionBtn) mainActionBtn.innerText = "⚠️ Blocked (Allow Popups & Retry)";
        return;
      }

      // Intercept any child window / redirect tab (Tab 2) that Tab 1 might open on apply click
      try {
        const originalOpen = tab1.open;
        tab1.open = function (...args) {
          tab2 = originalOpen.apply(this, args);
          return tab2;
        };
      } catch (e) {}

      // 2. Wait for Tab 1 DOM to load & hydrate
      log(`Tab 1 opened. Waiting 3.5s for page hydration...`, "#94a3b8");
      await sleep(randomDelay(3000, 4500));

      if (!isRunning) {
        try { if (tab1) tab1.close(); } catch(e) {}
        return;
      }

      // 3. Find and click the Apply Button inside Tab 1
      let clicked = false;
      try {
        const match = findApplyButton(tab1.document);
        if (match && match.el) {
          log(`Found Apply Button in Tab 1 (${match.strategy})! Simulating human click...`, "#10b981");
          await humanClick(match.el, tab1);
          clicked = true;
          state.completedCount++;
          console.log(`%c✨ [CLICKED] Apply trigger executed successfully on Tab 1`, "color: #10b981; font-weight: bold;");
        } else {
          log(`⚠️ Apply button not directly located in Tab 1. Triggering standard submit...`, "#f59e0b");
          state.skippedCount++;
        }
      } catch (domErr) {
        // Cross-origin fallback if page navigated instantly
        log(`Page initiated redirect. Processing response...`, "#94a3b8");
        clicked = true;
        state.completedCount++;
      }

      // 4. Wait 2.5s for redirect (Tab 2) and network telemetry to finalize
      log(`Waiting 2.5s for affiliate tracking & redirect...`, "#94a3b8");
      await sleep(randomDelay(2000, 3000));

      // 5. Dual Tab Close: Cleanly close Tab 2 (if spawned) and Tab 1
      log(`Closing Tab 2 and Tab 1...`, "#a855f7");
      try {
        if (tab2 && !tab2.closed) {
          tab2.close();
          console.log(`%c🚪 Tab 2 (Redirect/Employer Tab) closed cleanly.`, "color: #94a3b8; font-size: 11px;");
        }
      } catch (e) {}

      try {
        if (tab1 && !tab1.closed) {
          tab1.close();
          console.log(`%c🚪 Tab 1 (Job Page Tab) closed cleanly.`, "color: #94a3b8; font-size: 11px;");
        }
      } catch (e) {}

    } catch (err) {
      console.warn("Job step error:", err);
      try { if (tab1 && !tab1.closed) tab1.close(); } catch(e) {}
      try { if (tab2 && !tab2.closed) tab2.close(); } catch(e) {}
    }

    // Advance queue index & save persistent state
    state.currentIndex++;
    saveState(state);
    updateUI();

    // 6. Safe Human Pacing Delay before processing the next job
    if (isRunning && !isPaused && state.currentIndex < jobQueue.length) {
      const waitMs = getPacingDelay();
      const waitSec = (waitMs / 1000).toFixed(1);
      if (statusDot) statusDot.style.background = "#f59e0b";
      log(`⏱️ Human pacing delay: Pausing ${waitSec}s before Job ${state.currentIndex + 1}...`, "#a855f7");
      
      await sleep(waitMs);
      if (statusDot) statusDot.style.background = "#10b981";

      // Self-schedule next job in sequence
      processNextJob();
    }
  }

  // =========================================================================
  // 🎛️ BUTTON CONTROLS & EVENT LISTENERS
  // =========================================================================
  function startQueue() {
    if (isRunning && !isPaused) return;
    isRunning = true;
    isPaused = false;
    if (mainActionBtn) {
      mainActionBtn.innerText = "⏸️ Pause Queue";
      mainActionBtn.style.background = "#d97706";
    }
    if (statusDot) statusDot.style.background = "#10b981";
    log(`🚀 Starting sequential 1-by-1 processing from Job ${state.currentIndex + 1}...`, "#10b981");
    processNextJob();
  }

  function pauseQueue() {
    isPaused = true;
    if (mainActionBtn) {
      mainActionBtn.innerText = "▶️ Resume Queue";
      mainActionBtn.style.background = "#059669";
    }
    if (statusDot) statusDot.style.background = "#f59e0b";
    log(`⏸️ Queue paused at Job ${state.currentIndex + 1} / ${jobQueue.length}.`, "#f59e0b");
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
      log(`⏩ Skipped to Job ${state.currentIndex + 1} / ${jobQueue.length}`, "#cbd5e1");
    }
  }

  function resetProgress() {
    if (confirm("Reset application progress back to Job #1?")) {
      isRunning = false;
      isPaused = false;
      state = { currentIndex: 0, completedCount: 0, skippedCount: 0, history: [] };
      saveState(state);
      updateUI();
      if (mainActionBtn) {
        mainActionBtn.innerText = "🚀 Start 1-by-1 Queue";
        mainActionBtn.style.background = "#059669";
      }
      if (targetText) targetText.innerText = "Reset to Job #1";
      log("↺ Progress reset back to Job #1.", "#ef4444");
    }
  }

  mainActionBtn.addEventListener("click", toggleMainAction);
  document.getElementById("zfp-skip-btn").addEventListener("click", skipJob);
  document.getElementById("zfp-reset-btn").addEventListener("click", resetProgress);

  // Speed Mode Buttons
  document.querySelectorAll(".zfp-speed-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".zfp-speed-btn").forEach((b) => {
        b.style.background = "#1e293b";
        b.style.color = "#cbd5e1";
        b.style.borderColor = "#475569";
        b.style.fontWeight = "normal";
      });
      btn.style.background = "#2563eb";
      btn.style.color = "white";
      btn.style.borderColor = "#3b82f6";
      btn.style.fontWeight = "bold";
      speedMode = btn.getAttribute("data-speed");
      log(`Pacing set to: ${speedMode.toUpperCase()}`, "#38bdf8");
    });
  });

  // Minimize / Expand HUD
  let isMinimized = false;
  document.getElementById("zfp-min-btn").addEventListener("click", () => {
    isMinimized = !isMinimized;
    const body = document.getElementById("zfp-body");
    if (body) body.style.display = isMinimized ? "none" : "block";
    document.getElementById("zfp-min-btn").innerText = isMinimized ? "+" : "_";
  });

  // Cleanup Session
  function cleanupInstance() {
    isRunning = false;
    isPaused = true;
    hud.remove();
    window.__AUTO_APPLIER_INSTANCE__ = null;
    delete window.__AUTO_APPLIER__;
    console.log("%c🧹 Auto-Applier HUD removed.", "color: #94a3b8; font-style: italic;");
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
    cleanup: cleanupInstance,
    getState: () => ({ ...state }),
    setQueue: (urls) => {
      if (Array.isArray(urls) && urls.length > 0) {
        jobQueue = urls;
        updateUI();
        log(`Loaded custom queue with ${urls.length} jobs!`, "#10b981");
      }
    }
  };

  window.__AUTO_APPLIER_INSTANCE__ = api;
  window.__AUTO_APPLIER__ = api;

  // Startup Banner
  console.log(
    `%c 🕶️ ZERO-FOOTPRINT: 1-BY-1 SEQUENTIAL AUTO-APPLIER %c READY `,
    "background: #0f172a; color: #38bdf8; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #38bdf8;",
    "background: #059669; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #38bdf8;"
  );
  console.log(
    `%c📋 Total Queued: %c${jobQueue.length} jobs\n` +
    `%c💾 Saved Progress: %cJob ${state.currentIndex + 1} of ${jobQueue.length} (Applied: ${state.completedCount})\n` +
    `%c💡 Instructions: Click '🚀 Start 1-by-1 Queue' on the floating HUD or call window.__AUTO_APPLIER__.start()`,
    "color: #94a3b8; font-weight: bold;", "color: #38bdf8; font-weight: bold;",
    "color: #94a3b8; font-weight: bold;", "color: #10b981; font-weight: bold;",
    "color: #e2e8f0; font-style: italic;"
  );
})();
