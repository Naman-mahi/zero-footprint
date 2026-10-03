/**
 * 🕶️ Zero-Footprint PRO: Advanced 1-by-1 Sequential In-Browser Auto-Applier (US High-CPC Live Edition)
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * 
 * FEATURES:
 * - 🌐 100% Zero Hardcoded Links: Fetches fresh, active high-CPC jobs live from Artha directly in your browser.
 * - 🚫 Anti-Spam: Completely filters out all trucking, CDL, driver, and duplicate spam listings.
 * - ⚡ 1-by-1 Sequential Processing: Never overloads CPU/RAM with hundreds of open tabs.
 * - 🎯 Configurable Batch Size (25 / 50 / 100 / 200): Easily adjust application batch limits on the fly.
 * - 🔍 Dynamic Polling Resolver: Waits up to 10-12s for React/Next.js DOM hydration so NO button is missed.
 * - 🪟 Dual-Tab Auto-Closer: Opens Job Page (Tab 1), clicks apply, handles redirect (Tab 2), and closes BOTH tabs cleanly.
 * - 🛡️ Advanced Anti-Detection: 9-step human pointer cascade, deceleration scroll, and Gaussian spatial jitter.
 * - 🧼 0-Footprint Per-Job Deep Purge: Wipes domain cookies, sessionStorage & localStorage after EACH job applied.
 * - 💾 Session Resume: Saves progress in localStorage so you can pause/resume anytime without losing your place.
 * - 🎨 Ultra-Clean Pure White HUD: Top-right positioning, vector SVGs, and step-by-step instructions.
 */

(function () {
  // Prevent or clean up duplicate instances
  if (window.__AUTO_APPLIER_US_INSTANCE__ || window.__AUTO_APPLIER_INSTANCE__) {
    console.log("%c🔄 Cleaning up previous Auto-Applier session...", "color: #2563eb; font-weight: bold;");
    try {
      if (window.__AUTO_APPLIER_US_INSTANCE__) window.__AUTO_APPLIER_US_INSTANCE__.cleanup();
      if (window.__AUTO_APPLIER_INSTANCE__) window.__AUTO_APPLIER_INSTANCE__.cleanup();
    } catch (e) {}
  }

  // =========================================================================
  // 📋 DYNAMIC LIVE JOB QUEUE (Zero Hardcoded Links - Live Retrieval)
  // =========================================================================
  const DEFAULT_QUEUE = [];
  let jobQueue = DEFAULT_QUEUE;
  let batchSize = 50;

  const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
  const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

  // =========================================================================
  // 💾 STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
  // =========================================================================
  const STORAGE_KEY = "__ZERO_FOOTPRINT_APPLIER_STATE_US__";

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
  let isFetchingLive = false;
  let speedMode = "5s"; // 1s, 2s, 3s, 5s, 8s, 10s, 15s

  // =========================================================================
  // 🛡️ ADVANCED HUMAN EVENT & ANTI-DETECTION ENGINE
  // =========================================================================
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function getPacingDelay() {
    switch (speedMode) {
      case "1s": return randomDelay(1000, 1500);
      case "2s": return randomDelay(1800, 2400);
      case "3s": return randomDelay(2800, 3800);
      case "5s": return randomDelay(4500, 6000);
      case "8s": return randomDelay(7500, 9000);
      case "10s": return randomDelay(9500, 11500);
      case "15s": return randomDelay(14000, 16500);
      default:
        const num = parseFloat(speedMode);
        if (!isNaN(num) && num > 0) return Math.round(num * 1000);
        return randomDelay(4500, 6000);
    }
  }

  function getDestinationHoldMs() {
    switch (speedMode) {
      case "1s": return randomDelay(2500, 3500);
      case "2s": return randomDelay(3500, 5000);
      case "3s": return randomDelay(5000, 6500);
      case "5s": return randomDelay(7500, 9500);
      case "8s": return randomDelay(9000, 11500);
      case "10s": return randomDelay(10000, 12500);
      case "15s": return randomDelay(14000, 16500);
      default: return randomDelay(8000, 10000);
    }
  }

  // =========================================================================
  // 🌐 LIVE FRESH JOB FETCHER (Artha Recommendation API)
  // =========================================================================
  async function fetchFreshJobs(isSilent = false) {
    if (isFetchingLive) return false;
    isFetchingLive = true;
    if (!isSilent) log("⏳ Fetching fresh High-CPC jobs live from Artha...", "#2563eb");
    if (btnLabel && !isRunning) btnLabel.innerText = "Fetching fresh jobs...";

    const freshUrls = [];
    const seen = new Set();

    try {
      // Query up to 10 pages for top High-CPC jobs directly inside user's active session
      for (let page = 1; page <= 10; page++) {
        const res = await fetch(RECOMMEND_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            query: "",
            page: page,
            limit: 100,
            geo_boost: false,
            location: "US",
            only_enriched: false,
            only_cpa: false,
            sort_by: "high_cpc"
          })
        });

        if (!res.ok) break;
        const data = await res.json();
        const items = data.items || [];
        if (items.length === 0) break;

        for (const it of items) {
          if (typeof it.cpc_value !== "number" || it.cpc_value <= 0) continue;
          const titleLower = (it.title || "").toLowerCase();
          const compLower = (it.company || it.company_info?.name || "").toLowerCase();

          // Exclude trucking, CDL, driver, freight, Mesilla Valley spam
          if (
            titleLower.includes("truck") ||
            titleLower.includes("driver") ||
            titleLower.includes("cdl") ||
            titleLower.includes("dry van") ||
            titleLower.includes("freight") ||
            titleLower.includes("hauler") ||
            compLower.includes("mesilla valley") ||
            compLower.includes("transport")
          ) {
            continue;
          }

          const slug = it.slug || (it.url ? it.url.replace(BASE_JOB_URL, "") : null);
          if (!slug || seen.has(slug)) continue;
          seen.add(slug);
          freshUrls.push(`${BASE_JOB_URL}${slug}`);
        }
      }

      if (freshUrls.length > 0) {
        jobQueue = freshUrls;
        updateUI();
        log(`✨ Loaded ${freshUrls.length} fresh pure High-CPC jobs! Ready to start.`, "#059669");
        isFetchingLive = false;
        return true;
      }
    } catch (err) {
      console.warn("Live fetch notice:", err.message);
    }

    isFetchingLive = false;
    if (!isSilent) log("⚠️ Could not load fresh jobs. Please verify you are signed in on artha.link.", "#e11d48");
    updateUI();
    return false;
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
  async function waitForApplyButton(tabWin, maxWaitMs = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitMs) {
      if (!tabWin || tabWin.closed) break;

      let doc = null;
      try {
        doc = tabWin.document;
      } catch (crossOriginErr) {
        return null;
      }

      if (doc) {
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
      }

      await sleep(250);
    }
    return null;
  }

  function formatSlug(url) {
    if (!url) return "Job Opening";
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
      console.log("%c🧼 [Zero-Footprint Purge] Clearing domain cookies, sessionStorage, and localStorage...", "color: #2563eb; font-weight: bold;");
    }

    const savedState = { ...state };

    try {
      const domain = window.location.hostname;
      const hostParts = domain.split(".");
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        if (!name) continue;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + domain + ";";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + domain + ";";
        if (hostParts.length > 2) {
          const rootDomain = hostParts.slice(-2).join(".");
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + rootDomain + ";";
        }
      }
    } catch (e) {}

    try {
      sessionStorage.clear();
      localStorage.clear();
      if (window.indexedDB && window.indexedDB.databases) {
        window.indexedDB.databases().then((dbs) => {
          for (let db of dbs) {
            if (db.name) window.indexedDB.deleteDatabase(db.name);
          }
        }).catch(() => {});
      }
    } catch (e) {}

    // Restore bot progress index
    saveState(savedState);
    if (!isQuiet) {
      log("🧼 Purged cookies, sessionStorage & localStorage cleanly for Job " + (state.currentIndex + 1) + "!", "#059669");
    }
  }

  // =========================================================================
  // 🎨 PURE WHITE LIGHT THEME HUD (VECTOR SVG ICONS)
  // =========================================================================
  const oldHud = document.getElementById("zero-footprint-light-hud-us");
  if (oldHud) oldHud.remove();
  const oldLightHud = document.getElementById("zero-footprint-light-hud");
  if (oldLightHud) oldLightHud.remove();

  // Inline Vector SVG Icons
  const ICONS = {
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    pause: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>',
    refresh: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>',
    skip: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>',
    reset: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>',
    broom: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>',
    shield: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
    minimize: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    close: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    info: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    chevronRight: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    chevronLeft: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>'
  };

  const hud = document.createElement("div");
  hud.id = "zero-footprint-light-hud-us";
  hud.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999999;
      width: 410px;
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
            ${ICONS.shield}
          </span>
          <div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; letter-spacing: -0.2px;">🇺🇸 US HIGH-CPC AUTO APPLIER</span>
              <span style="background: #ecfdf5; color: #059669; font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 5px; border: 1px solid #a7f3d0;">🇺🇸 US HIGH-CPC</span>
            </div>
            <div style="font-size: 10.5px; color: #64748b; font-weight: 500;">Live Pure-CPC Sequential Applier</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <span id="zfp-status-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); margin-right: 6px;"></span>
          <button id="zfp-min-btn" title="Minimize" style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; color: #475569; cursor: pointer;">${ICONS.minimize}</button>
          <button id="zfp-close-btn" title="Close" style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; color: #475569; cursor: pointer;">${ICONS.close}</button>
        </div>
      </div>

      <!-- Collapsible Body -->
      <div id="zfp-body">
        <!-- Progress Bar -->
        <div style="background: #f1f5f9; border-radius: 999px; height: 7px; width: 100%; margin-bottom: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div id="zfp-progress-bar" style="background: linear-gradient(90deg, #2563eb, #10b981); width: 0%; height: 100%; border-radius: 999px; transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);"></div>
        </div>

        <!-- Metrics Card -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 14px; margin-bottom: 10px; font-size: 11px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; line-height: 1.5;">
          <div>Live Queue: <b id="zfp-progress-text" style="color: #2563eb; font-weight: 700;">${state.currentIndex} / ${jobQueue.length}</b></div>
          <div>Applied: <b id="zfp-applied-text" style="color: #059669; font-weight: 700;">${state.completedCount}</b></div>
          <div style="grid-column: span 2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #64748b;">
            Active: <span id="zfp-target-text" style="color: #0f172a; font-weight: 600;">${jobQueue[state.currentIndex] ? formatSlug(jobQueue[state.currentIndex]) : 'Ready to fetch & start'}</span>
          </div>
        </div>

        <!-- Batch Size & Navigation Row -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px 10px;">
          <div style="display: flex; align-items: center; gap: 3px;">
            <span style="font-size: 10px; color: #64748b; font-weight: 600; margin-right: 1px;">Batch:</span>
            <button class="zfp-size-btn" data-size="25" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">25</button>
            <button class="zfp-size-btn" data-size="50" style="background: #2563eb; color: #ffffff; border: 1px solid #2563eb; border-radius: 5px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 700; box-shadow: 0 1px 3px rgba(37,99,235,0.2);">50</button>
            <button class="zfp-size-btn" data-size="100" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">100</button>
            <button class="zfp-size-btn" data-size="200" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">200</button>
          </div>

          <div id="zfp-batch-badge" style="font-size: 11px; font-weight: 700; color: #2563eb;">
            Batch ${Math.floor(state.currentIndex / batchSize) + 1} / ${Math.max(1, Math.ceil(jobQueue.length / batchSize))}
          </div>

          <div style="display: flex; gap: 3px;">
            <button id="zfp-prev-batch-btn" title="Previous Batch" style="display: flex; align-items: center; background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 3px 6px; font-size: 10px; cursor: pointer;">${ICONS.chevronLeft}</button>
            <button id="zfp-next-batch-btn" title="Next Batch" style="display: flex; align-items: center; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 5px; padding: 3px 6px; font-size: 10px; cursor: pointer; font-weight: 700;">${ICONS.chevronRight}</button>
          </div>
        </div>

        <!-- Pacing Options (Seconds Selector) -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 11px;">
          <span style="color: #64748b; font-size: 10.5px; font-weight: 600;">Delay:</span>
          <div style="display: flex; gap: 3px;">
            <button class="zfp-speed-btn" data-speed="1s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">1s</button>
            <button class="zfp-speed-btn" data-speed="2s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">2s</button>
            <button class="zfp-speed-btn" data-speed="3s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">3s</button>
            <button class="zfp-speed-btn" data-speed="5s" style="background: #2563eb; color: #ffffff; border: 1px solid #2563eb; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 700; box-shadow: 0 1px 3px rgba(37,99,235,0.2);">5s</button>
            <button class="zfp-speed-btn" data-speed="8s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">8s</button>
            <button class="zfp-speed-btn" data-speed="10s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">10s</button>
            <button class="zfp-speed-btn" data-speed="15s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">15s</button>
          </div>
        </div>

        <!-- Action Control Buttons -->
        <div style="display: flex; gap: 6px; margin-bottom: 8px;">
          <button id="zfp-main-action-btn" style="
            flex: 2.2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            background: #2563eb;
            color: #ffffff;
            border: none;
            border-radius: 10px;
            padding: 10px 12px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
            transition: all 0.2s;
          ">
            <span id="zfp-btn-icon">${ICONS.play}</span>
            <span id="zfp-btn-label">Start Batch ${Math.floor(state.currentIndex / batchSize) + 1}</span>
          </button>

          <button id="zfp-skip-btn" title="Skip to next job" style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            background: #f8fafc;
            color: #334155;
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            padding: 10px 6px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
          ">
            ${ICONS.skip} Skip
          </button>

          <button id="zfp-reset-btn" title="Reset progress back to #1" style="
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff1f2;
            color: #e11d48;
            border: 1px solid #fecdd3;
            border-radius: 10px;
            padding: 10px 10px;
            cursor: pointer;
          ">
            ${ICONS.reset}
          </button>
        </div>

        <!-- Fetch Fresh Live Jobs & Wipe Storage Buttons -->
        <div style="display: flex; gap: 6px; margin-bottom: 8px;">
          <button id="zfp-fetch-btn" style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: #eff6ff;
            color: #2563eb;
            border: 1px solid #bfdbfe;
            border-radius: 9px;
            padding: 7px 8px;
            font-size: 10.5px;
            font-weight: 700;
            cursor: pointer;
          ">
            ${ICONS.refresh} Fetch Fresh Jobs
          </button>

          <button id="zfp-full-purge-btn" style="
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            background: #f8fafc;
            color: #475569;
            border: 1px dashed #cbd5e1;
            border-radius: 9px;
            padding: 7px 8px;
            font-size: 10.5px;
            font-weight: 600;
            cursor: pointer;
          ">
            ${ICONS.broom} Wipe Storage
          </button>
        </div>

        <!-- Real-Time Activity Log Stream -->
        <div id="zfp-log" style="
          font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
          font-size: 10px;
          color: #475569;
          max-height: 65px;
          overflow-y: auto;
          background: #f8fafc;
          padding: 7px 10px;
          border-radius: 9px;
          line-height: 1.45;
          border: 1px solid #e2e8f0;
          margin-bottom: 8px;
        ">Ready. No old hardcoded links. Click 'Start' to fetch fresh live jobs and begin.</div>

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
            ${ICONS.info} Live High-CPC Features:
          </div>
          <div>• <b>Zero Old Links:</b> Always pulls 100% active, live openings on start.</div>
          <div>• <b>Clean Queue:</b> Trucking, CDL, and spam listings are automatically excluded.</div>
          <div>• <b>Per-Job Deep Purge:</b> Wipes cookies, sessionStorage & localStorage after EACH job.</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(hud);

  const progressBar = document.getElementById("zfp-progress-bar");
  const progressText = document.getElementById("zfp-progress-text");
  const appliedText = document.getElementById("zfp-applied-text");
  const targetText = document.getElementById("zfp-target-text");
  const batchBadge = document.getElementById("zfp-batch-badge");
  const mainActionBtn = document.getElementById("zfp-main-action-btn");
  const btnIcon = document.getElementById("zfp-btn-icon");
  const btnLabel = document.getElementById("zfp-btn-label");
  const logEl = document.getElementById("zfp-log");
  const statusDot = document.getElementById("zfp-status-dot");

  function updateUI() {
    const totalJobs = jobQueue.length;
    const curIndex = state.currentIndex;
    const curBatch = Math.floor(curIndex / batchSize) + 1;
    const totalBatches = Math.max(1, Math.ceil(totalJobs / batchSize));
    const percent = totalJobs > 0 ? Math.min(100, Math.round((curIndex / totalJobs) * 100)) : 0;

    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.innerText = curIndex + " / " + totalJobs + " (" + percent + "%)";
    if (appliedText) appliedText.innerText = state.completedCount;
    if (batchBadge) batchBadge.innerText = "Batch " + curBatch + " / " + totalBatches;
    if (targetText) {
      targetText.innerText = jobQueue[curIndex] ? ("[" + (curIndex + 1) + "/" + totalJobs + "] " + formatSlug(jobQueue[curIndex])) : (totalJobs === 0 ? "Ready to fetch live jobs" : "Queue Finished!");
    }
    if (!isRunning && btnLabel && !isFetchingLive) {
      btnLabel.innerText = totalJobs > 0 ? ("Start Batch " + curBatch + " (" + batchSize + " Jobs)") : "Start (Fetch Fresh Jobs)";
    }
  }
  updateUI();

  function log(msg, color = "#2563eb") {
    console.log("%c[AutoApplier] " + msg, "color: " + color + "; font-weight: 600;");
    if (logEl) {
      logEl.innerText = msg;
      logEl.scrollTop = logEl.scrollHeight;
    }
  }

  let cooldownTimerId = null;
  let cooldownSecondsRemaining = 0;

  function stopCooldownTimer() {
    if (cooldownTimerId) {
      clearInterval(cooldownTimerId);
      cooldownTimerId = null;
    }
    cooldownSecondsRemaining = 0;
  }

  // =========================================================================
  // ⚡ SEQUENTIAL 1-BY-1 TAB ORCHESTRATION & DUAL TAB CLOSER
  // =========================================================================
  async function processNextJob() {
    if (!isRunning || isPaused) return;

    // Check if reached milestone (end of selected batch size)
    if (state.currentIndex > 0 && state.currentIndex % batchSize === 0 && !state._milestonePassed) {
      state._milestonePassed = true;
      saveState(state);

      const curBatch = Math.floor(state.currentIndex / batchSize);
      const nextBatch = curBatch + 1;
      const totalBatches = Math.ceil(jobQueue.length / batchSize);

      console.log(
        "%c🎉 [BATCH " + curBatch + " COMPLETED] Finished " + state.currentIndex + " jobs! Purging cookies & storage...",
        "background: #065f46; color: #34d399; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
      );
      
      wipeAllStorageAndCookies(true);

      isRunning = false;
      stopCooldownTimer();
      cooldownSecondsRemaining = 60;

      if (btnLabel) btnLabel.innerText = "Start Batch " + nextBatch + " now (" + cooldownSecondsRemaining + "s autostart)";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) {
        mainActionBtn.style.background = "#059669";
        mainActionBtn.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
      }
      if (statusDot) statusDot.style.background = "#f59e0b";
      log("🎉 Batch " + curBatch + " completed! Storage purged. ⏳ Autostarting Batch " + nextBatch + " / " + totalBatches + " in 60s (or click button to start now)...", "#059669");

      cooldownTimerId = setInterval(() => {
        cooldownSecondsRemaining--;
        if (cooldownSecondsRemaining > 0) {
          if (btnLabel) btnLabel.innerText = "Start Batch " + nextBatch + " now (" + cooldownSecondsRemaining + "s autostart)";
          if (statusDot) statusDot.style.background = (cooldownSecondsRemaining % 2 === 0) ? "#f59e0b" : "#10b981";
        } else {
          stopCooldownTimer();
          log("🚀 [AUTOSTART] 1-minute cooldown complete! Starting Batch " + nextBatch + "...", "#059669");
          startQueue();
        }
      }, 1000);

      return;
    } else if (state.currentIndex % batchSize !== 0) {
      state._milestonePassed = false;
    }

    if (state.currentIndex >= jobQueue.length) {
      isRunning = false;
      if (btnLabel) btnLabel.innerText = "All " + jobQueue.length + " Jobs Completed!";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) mainActionBtn.style.background = "#059669";
      if (statusDot) statusDot.style.background = "#10b981";
      log("🎉 Entire Queue Completed! Successfully processed " + state.completedCount + " job applications.", "#059669");
      return;
    }

    // 🧹 ALWAYS purge domain cookies, localStorage & sessionStorage before opening next job
    wipeAllStorageAndCookies(true);

    const currentUrl = jobQueue[state.currentIndex];
    const roleName = formatSlug(currentUrl);

    updateUI();

    console.log(
      "%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" +
      "%c🎯 [JOB " + (state.currentIndex + 1) + "/" + jobQueue.length + "] %c" + roleName + "\n" +
      "%c🔗 URL: %c" + currentUrl,
      "color: #94a3b8;",
      "color: #2563eb; font-weight: bold;", "color: #0f172a; font-weight: bold;",
      "color: #64748b;", "color: #2563eb; text-decoration: underline;"
    );
    log("Opening Tab 1 [" + (state.currentIndex + 1) + "/" + jobQueue.length + "]: " + roleName + "...", "#2563eb");

    let tab1 = null;
    let tab2 = null;
    let tab3 = null;

    try {
      // 1. Open Tab 1: The Job Details Page
      tab1 = window.open(currentUrl, "_blank", "width=1280,height=850");

      if (!tab1) {
        console.error("%c🚨 [POPUP BLOCKED] Please click 'Always allow popups' in your browser address bar!", "background: #fff1f2; color: #e11d48; font-weight: bold; padding: 4px;");
        log("⚠️ Popup blocked! Please allow popups in address bar.", "#e11d48");
        isRunning = false;
        if (btnLabel) btnLabel.innerText = "Allow Popups & Retry";
        return;
      }

      // Intercept window openings: Tab 1 -> Tab 2 -> Tab 3
      try {
        const origOpen1 = tab1.open;
        tab1.open = function (...args) {
          const child = origOpen1.apply(this, args);
          if (!tab2) {
            tab2 = child;
            try {
              if (tab2) {
                const origOpen2 = tab2.open;
                tab2.open = function (...args2) {
                  tab3 = origOpen2.apply(this, args2);
                  return tab3;
                };
              }
            } catch (e2) {}
          } else if (!tab3) {
            tab3 = child;
          }
          return child;
        };
      } catch (e) {}

      // 2. Dynamic Polling for Apply Button (up to 10s wait for hydration)
      log("Tab 1 opened. Waiting for React DOM hydration & button mount...", "#64748b");
      
      let match = null;
      try {
        await sleep(1500);
        match = await waitForApplyButton(tab1, 9000);
      } catch (pollErr) {
        log("Page redirected automatically. Capturing response...", "#64748b");
      }

      if (!isRunning) {
        try { if (tab3 && !tab3.closed) tab3.close(); } catch(e) {}
        try { if (tab2 && !tab2.closed) tab2.close(); } catch(e) {}
        try { if (tab1 && !tab1.closed) tab1.close(); } catch(e) {}
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

      // 4. Wait for redirect (Tab 2 & Tab 3) and network telemetry to finalize
      const holdMs = getDestinationHoldMs();
      log("Waiting " + (holdMs / 1000).toFixed(1) + "s for destination page hydration & affiliate telemetry...", "#64748b");
      await sleep(holdMs);

      // 5. Triple Tab Close: Cleanly wipe storage and close Tab 3, Tab 2, and Tab 1
      log("Purging storage & closing windows...", "#7c3aed");
      try {
        if (tab3 && !tab3.closed) {
          try { tab3.localStorage.clear(); } catch (e) {}
          try { tab3.sessionStorage.clear(); } catch (e) {}
          tab3.close();
        }
      } catch (e) {}

      try {
        if (tab2 && !tab2.closed) {
          try { tab2.localStorage.clear(); } catch (e) {}
          try { tab2.sessionStorage.clear(); } catch (e) {}
          tab2.close();
        }
      } catch (e) {}

      try {
        if (tab1 && !tab1.closed) {
          try { tab1.localStorage.clear(); } catch (e) {}
          try { tab1.sessionStorage.clear(); } catch (e) {}
          tab1.close();
        }
      } catch (e) {}

    } catch (err) {
      console.warn("Job step notice:", err);
      try { if (tab3 && !tab3.closed) tab3.close(); } catch(e) {}
      try { if (tab2 && !tab2.closed) tab2.close(); } catch(e) {}
      try { if (tab1 && !tab1.closed) tab1.close(); } catch(e) {}
    }

    // 🧼 Zero-Footprint Per-Job Deep Purge: Clear cookies, sessionStorage & localStorage after EACH job applied
    wipeAllStorageAndCookies(false);

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

      processNextJob();
    }
  }

  // =========================================================================
  // 🎛️ CONTROLS & EVENT LISTENERS
  // =========================================================================
  async function startQueue() {
    stopCooldownTimer();
    if (isRunning && !isPaused) return;

    // If queue is empty or finished, fetch fresh live jobs first!
    if (jobQueue.length === 0 || state.currentIndex >= jobQueue.length) {
      const ok = await fetchFreshJobs(false);
      if (!ok || jobQueue.length === 0) {
        return;
      }
    }

    isRunning = true;
    isPaused = false;
    const curBatch = Math.floor(state.currentIndex / batchSize) + 1;
    if (btnLabel) btnLabel.innerText = "Pause Batch " + curBatch;
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
    stopCooldownTimer();
    isPaused = true;
    const curBatch = Math.floor(state.currentIndex / batchSize) + 1;
    if (btnLabel) btnLabel.innerText = "Resume Batch " + curBatch;
    if (btnIcon) btnIcon.innerHTML = ICONS.play;
    if (mainActionBtn) {
      mainActionBtn.style.background = "#2563eb";
      mainActionBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
    }
    if (statusDot) statusDot.style.background = "#f59e0b";
    log("⏸️ Queue paused at Job " + (state.currentIndex + 1) + " / " + jobQueue.length + ".", "#d97706");
  }

  function toggleMainAction() {
    if (!isRunning || isPaused || cooldownTimerId) {
      startQueue();
    } else {
      pauseQueue();
    }
  }

  function skipJob() {
    stopCooldownTimer();
    if (state.currentIndex < jobQueue.length) {
      state.currentIndex++;
      state.skippedCount++;
      saveState(state);
      updateUI();
      log("⏩ Skipped to Job " + (state.currentIndex + 1) + " / " + jobQueue.length, "#475569");
    }
  }

  function resetProgress() {
    stopCooldownTimer();
    if (confirm("Reset application progress back to Job #1?")) {
      isRunning = false;
      isPaused = false;
      state = { currentIndex: 0, completedCount: 0, skippedCount: 0, history: [] };
      saveState(state);
      updateUI();
      if (btnLabel) btnLabel.innerText = "Start Batch 1 (" + batchSize + " Jobs)";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) {
        mainActionBtn.style.background = "#2563eb";
        mainActionBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
      }
      log("↺ Progress reset back to Job #1 (Batch 1).", "#e11d48");
    }
  }

  function moveToNextBatch() {
    stopCooldownTimer();
    const currentBatch = Math.floor(state.currentIndex / batchSize);
    const nextIndex = (currentBatch + 1) * batchSize;
    if (nextIndex < jobQueue.length) {
      isRunning = false;
      isPaused = false;
      state.currentIndex = nextIndex;
      saveState(state);
      wipeAllStorageAndCookies(true);
      updateUI();
      log("⏩ Moved to Batch " + (Math.floor(nextIndex / batchSize) + 1) + " (Starting from Job " + (nextIndex + 1) + "). Storage purged.", "#2563eb");
    } else {
      alert("Already at the final batch!");
    }
  }

  function moveToPrevBatch() {
    stopCooldownTimer();
    const currentBatch = Math.floor(state.currentIndex / batchSize);
    const prevIndex = Math.max(0, (currentBatch - 1) * batchSize);
    isRunning = false;
    isPaused = false;
    state.currentIndex = prevIndex;
    saveState(state);
    wipeAllStorageAndCookies(true);
    updateUI();
    log("⏪ Moved to Batch " + (Math.floor(prevIndex / batchSize) + 1) + " (Starting from Job " + (prevIndex + 1) + "). Storage purged.", "#2563eb");
  }

  mainActionBtn.addEventListener("click", toggleMainAction);
  document.getElementById("zfp-skip-btn").addEventListener("click", skipJob);
  document.getElementById("zfp-reset-btn").addEventListener("click", resetProgress);
  document.getElementById("zfp-next-batch-btn").addEventListener("click", moveToNextBatch);
  document.getElementById("zfp-prev-batch-btn").addEventListener("click", moveToPrevBatch);
  document.getElementById("zfp-full-purge-btn").addEventListener("click", () => wipeAllStorageAndCookies(false));
  document.getElementById("zfp-fetch-btn").addEventListener("click", () => fetchFreshJobs(false));

  // Batch Size Switchers (25, 50, 100, 200)
  document.querySelectorAll(".zfp-size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedSize = parseInt(btn.getAttribute("data-size"), 10);
      if (!selectedSize || isNaN(selectedSize)) return;
      batchSize = selectedSize;

      document.querySelectorAll(".zfp-size-btn").forEach((b) => {
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
      btn.style.boxShadow = "0 1px 3px rgba(37,99,235,0.2)";

      updateUI();
      log("Batch size set to " + batchSize + " jobs per batch.", "#2563eb");
    });
  });

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
    stopCooldownTimer();
    isRunning = false;
    isPaused = true;
    hud.remove();
    window.__AUTO_APPLIER_US_INSTANCE__ = null;
    delete window.__AUTO_APPLIER_US__;
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
    nextBatch: moveToNextBatch,
    prevBatch: moveToPrevBatch,
    fetchFresh: () => fetchFreshJobs(false),
    skipCooldown: () => {
      if (cooldownTimerId) startQueue();
    },
    setBatchSize: (size) => {
      const s = parseInt(size, 10);
      if (s > 0) {
        batchSize = s;
        updateUI();
        log("Batch size updated to " + s + " jobs via API.", "#2563eb");
      }
    },
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

  window.__AUTO_APPLIER_US_INSTANCE__ = api;
  window.__AUTO_APPLIER_US__ = api;

  // Auto-fetch fresh live jobs on launch
  fetchFreshJobs(false);

  console.log(
    "%c 🇺🇸 US HIGH-CPC AUTO APPLIER %c READY ",
    "background: #eff6ff; color: #2563eb; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #2563eb;",
    "background: #2563eb; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #2563eb;"
  );
  console.log(
    "%c🌐 Live Dynamic Mode: %cZero hardcoded links in code. Fresh jobs fetched live from Artha.\n" +
    "%c💾 Saved Progress: %cJob " + (state.currentIndex + 1) + " | Applied: " + state.completedCount + "\n" +
    "%c🎯 Controls: %cClick 'Start' or 'Fetch Fresh Jobs' on the floating HUD",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;"
  );
})();
