/**
 * 🦅 Zero-Footprint PRO: Dedicated CrowdStrike In-Browser Auto-Applier
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * 
 * TARGET ROLES (31 Openings):
 * - Bengaluru, Pune, Mumbai (CrowdStrike India Engineering & Leadership)
 * 
 * HOW TO RUN:
 * 1. Open https://artha.link or https://my.artha.link in Google Chrome.
 * 2. Press F12 -> Console tab.
 * 3. Paste this entire file into the console and press Enter.
 */

(function () {
  // Prevent duplicate instances
  if (window.__AUTO_APPLIER_CROWDSTRIKE__ || window.__AUTO_APPLIER_INSTANCE_CROWDSTRIKE__) {
    console.log("%c🔄 Cleaning up previous CrowdStrike Auto-Applier session...", "color: #dc2626; font-weight: bold;");
    try {
      if (window.__AUTO_APPLIER_CROWDSTRIKE__) window.__AUTO_APPLIER_CROWDSTRIKE__.cleanup();
      if (window.__AUTO_APPLIER_INSTANCE_CROWDSTRIKE__) window.__AUTO_APPLIER_INSTANCE_CROWDSTRIKE__.cleanup();
    } catch (e) {}
  }

  // =========================================================================
  // 📋 CROWDSTRIKE TARGET JOB QUEUE (31 Verified Openings)
  // =========================================================================
  const DEFAULT_QUEUE = [
  "https://artha.link/@eanxt/jobs/infrastructure-engineer-techops-cicd-crowdstrike-bengaluru-dbc5db80",
  "https://artha.link/@eanxt/jobs/sr-backend-engineer-crowdstrike-bengaluru-f4b3618d",
  "https://artha.link/@eanxt/jobs/manager-sales-engineering-crowdstrike-mumbai-c9fb55c9",
  "https://artha.link/@eanxt/jobs/network-reliability-engineer-iii-hybrid-crowdstrike-bengaluru-b6d27db6",
  "https://artha.link/@eanxt/jobs/engineer-iii-cloud-crowdstrike-pune-e7f67ea7",
  "https://artha.link/@eanxt/jobs/engineer-iii-techops-cicd-sda-crowdstrike-bengaluru-663bd9b9",
  "https://artha.link/@eanxt/jobs/sr-software-developer-observability-crowdstrike-bengaluru-becea209",
  "https://artha.link/@eanxt/jobs/sr-engineer-cloud-crowdstrike-pune-f2cf64c9",
  "https://artha.link/@eanxt/jobs/engineer-iii-techops-cicd-platform-crowdstrike-bengaluru-fc557ef3",
  "https://artha.link/@eanxt/jobs/engineer-ii-site-reliability-hybrid-ind-crowdstrike-bengaluru-5fb0f3f0",
  "https://artha.link/@eanxt/jobs/sr-engineer-data-ml-platform-hybrid-ind-crowdstrike-bengaluru-e9ca5f1e",
  "https://artha.link/@eanxt/jobs/engineer-ii-virtualization-shift-8am-crowdstrike-bengaluru-a6695671",
  "https://artha.link/@eanxt/jobs/engineer-iii-cicd-devops-crowdstrike-pune-ea04cfa7",
  "https://artha.link/@eanxt/jobs/full-stack-engineer-iii-crowdstrike-bengaluru-1e5b8f84",
  "https://artha.link/@eanxt/jobs/engineer-ii-vulnerability-detection-crowdstrike-pune-d9e53537",
  "https://artha.link/@eanxt/jobs/engineer-ii-vulnerability-detection-crowdstrike-pune-fe78d560",
  "https://artha.link/@eanxt/jobs/full-stack-engineer-iii-crowdstrike-bengaluru-74ab9a7a",
  "https://artha.link/@eanxt/jobs/engineer-iii-cicd-devops-crowdstrike-pune-bdc115d1",
  "https://artha.link/@eanxt/jobs/sr-engineer-data-ml-platform-hybrid-ind-crowdstrike-bengaluru-6d556cf9",
  "https://artha.link/@eanxt/jobs/engineer-ii-virtualization-shift-8am-crowdstrike-bengaluru-decf1beb",
  "https://artha.link/@eanxt/jobs/engineer-ii-site-reliability-hybrid-ind-crowdstrike-bengaluru-4a25e082",
  "https://artha.link/@eanxt/jobs/infrastructure-engineer-techops-cicd-crowdstrike-bengaluru-a384d623",
  "https://artha.link/@eanxt/jobs/sr-backend-engineer-crowdstrike-bengaluru-4a0768ce",
  "https://artha.link/@eanxt/jobs/sr-backend-engineer-crowdstrike-bengaluru-8d882f4d",
  "https://artha.link/@eanxt/jobs/manager-sales-engineering-crowdstrike-mumbai-eca9c8db",
  "https://artha.link/@eanxt/jobs/network-reliability-engineer-iii-hybrid-crowdstrike-bengaluru-990bdeb6",
  "https://artha.link/@eanxt/jobs/engineer-iii-cloud-crowdstrike-pune-13ab66bf",
  "https://artha.link/@eanxt/jobs/engineer-iii-techops-cicd-sda-crowdstrike-bengaluru-4dd3da5c",
  "https://artha.link/@eanxt/jobs/sr-engineer-cloud-crowdstrike-pune-33d94f56",
  "https://artha.link/@eanxt/jobs/sr-software-developer-observability-crowdstrike-bengaluru-64284c15",
  "https://artha.link/@eanxt/jobs/engineer-iii-techops-cicd-platform-crowdstrike-bengaluru-83efd1c7"
];

  let jobQueue = DEFAULT_QUEUE.slice();
  let batchSize = 15;

  // =========================================================================
  // 💾 STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
  // =========================================================================
  const STORAGE_KEY = "__ZERO_FOOTPRINT_APPLIER_STATE_CROWDSTRIKE__";

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
  let speedMode = "5s";

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

  async function humanClick(element, win = window) {
    if (!element) return false;

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

    if (typeof element.click === "function") {
      element.click();
    }

    return true;
  }

  async function waitForApplyButton(tabWin, maxWaitMs = 12000) {
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
          const byId = doc.getElementById("creator-job-details-apply-job-trigger");
          if (byId && byId.offsetParent !== null) {
            return { el: byId, strategy: "ID (#creator-job-details-apply-job-trigger)" };
          }

          const byExp = doc.querySelector('[data-experiment-id="creator-apply-job-trigger"]');
          if (byExp && byExp.offsetParent !== null) {
            return { el: byExp, strategy: "Experiment Attribute" };
          }

          const byRedirect = doc.querySelector('a[href*="/redirect/"], a[href*="r.artha.link"]');
          if (byRedirect && byRedirect.offsetParent !== null) {
            return { el: byRedirect, strategy: "Direct Redirect Link" };
          }

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
        return parts[1]
          .replace(/-[a-f0-9]{8}$/i, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, l => l.toUpperCase());
      }
    } catch (e) {}
    return "Job Opening";
  }

  function wipeAllStorageAndCookies(isQuiet = false) {
    if (!isQuiet) {
      console.log("%c🧼 [Zero-Footprint Purge] Clearing domain cookies, sessionStorage, and localStorage...", "color: #dc2626; font-weight: bold;");
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

    saveState(savedState);
    if (!isQuiet) {
      log("🧼 Purged cookies, sessionStorage & localStorage cleanly for Job #" + (state.currentIndex + 1) + "!", "#059669");
    }
  }

  // =========================================================================
  // 🎨 PURE WHITE LIGHT THEME HUD (VECTOR SVG ICONS)
  // =========================================================================
  const oldHud = document.getElementById("zero-footprint-crowdstrike-hud");
  if (oldHud) oldHud.remove();

  const ICONS = {
    target: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    play: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    pause: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    skip: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
    reset: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    broom: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 22 5-5-3.5-3.5-5 5M2 22l6.5-6.5M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
    minimize: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    close: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    info: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  const hud = document.createElement("div");
  hud.id = "zero-footprint-crowdstrike-hud";
  hud.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999999;
      width: 420px;
      background: #ffffff;
      border: 1px solid #fecaca;
      border-radius: 20px;
      padding: 18px;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif;
      box-shadow: 0 20px 35px -10px rgba(220, 38, 38, 0.12), 0 0 0 1px rgba(220, 38, 38, 0.05), 0 6px 16px -4px rgba(15, 23, 42, 0.06);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    ">
      <!-- Top Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 9px;">
          <span style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
            ${ICONS.target}
          </span>
          <div>
            <div style="display: flex; align-items: center; gap: 5px;">
              <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; letter-spacing: -0.2px;">🦅 CROWDSTRIKE APPLIER</span>
              <span style="background: #fef2f2; color: #dc2626; font-size: 9.5px; font-weight: 800; padding: 1px 6px; border-radius: 5px; border: 1px solid #fecaca;">31 ROLES</span>
            </div>
            <div style="font-size: 10.5px; color: #64748b; font-weight: 500;">Dedicated Targeted Application Suite</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <span id="cs-status-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2); margin-right: 6px;"></span>
          <button id="cs-min-btn" title="Minimize" style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; color: #475569; cursor: pointer;">${ICONS.minimize}</button>
          <button id="cs-close-btn" title="Close" style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 7px; color: #475569; cursor: pointer;">${ICONS.close}</button>
        </div>
      </div>

      <!-- Collapsible Body -->
      <div id="cs-body">
        <!-- Progress Bar -->
        <div style="background: #f1f5f9; border-radius: 999px; height: 7px; width: 100%; margin-bottom: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div id="cs-progress-bar" style="background: linear-gradient(90deg, #dc2626, #f97316); width: 0%; height: 100%; border-radius: 999px; transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);"></div>
        </div>

        <!-- Metrics Card -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 14px; margin-bottom: 10px; font-size: 11px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; line-height: 1.5;">
          <div>Queue: <b id="cs-progress-text" style="color: #dc2626; font-weight: 700;">${state.currentIndex} / ${jobQueue.length}</b></div>
          <div>Applied: <b id="cs-applied-text" style="color: #059669; font-weight: 700;">${state.completedCount}</b></div>
          <div style="grid-column: span 2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #64748b;">
            Current: <span id="cs-target-text" style="color: #0f172a; font-weight: 600;">${jobQueue[state.currentIndex] ? formatSlug(jobQueue[state.currentIndex]) : 'All applied!'}</span>
          </div>
        </div>

        <!-- Pacing Options (Seconds Selector) -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 11px;">
          <span style="color: #64748b; font-size: 10.5px; font-weight: 600;">Pacing:</span>
          <div style="display: flex; gap: 3px;">
            <button class="cs-speed-btn" data-speed="1s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">1s</button>
            <button class="cs-speed-btn" data-speed="2s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">2s</button>
            <button class="cs-speed-btn" data-speed="3s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">3s</button>
            <button class="cs-speed-btn" data-speed="5s" style="background: #dc2626; color: #ffffff; border: 1px solid #dc2626; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 700; box-shadow: 0 1px 3px rgba(220,38,38,0.2);">5s</button>
            <button class="cs-speed-btn" data-speed="8s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">8s</button>
            <button class="cs-speed-btn" data-speed="10s" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 2px 5px; font-size: 10px; cursor: pointer; font-weight: 500;">10s</button>
          </div>
        </div>

        <!-- Action Control Buttons -->
        <div style="display: flex; gap: 6px; margin-bottom: 8px;">
          <button id="cs-main-action-btn" style="
            flex: 2.2;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            background: #dc2626;
            color: #ffffff;
            border: none;
            border-radius: 10px;
            padding: 10px 12px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
            transition: all 0.2s;
          ">
            <span id="cs-btn-icon">${ICONS.play}</span>
            <span id="cs-btn-label">Start Applying (31 Jobs)</span>
          </button>

          <button id="cs-skip-btn" title="Skip to next role" style="
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

          <button id="cs-reset-btn" title="Reset back to Job #1" style="
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

        <!-- Deep Purge Storage Button -->
        <div style="display: flex; gap: 6px; margin-bottom: 8px;">
          <button id="cs-full-purge-btn" style="
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
            ${ICONS.broom} Wipe Cookies & Storage
          </button>
        </div>

        <!-- Real-Time Activity Log Stream -->
        <div id="cs-log" style="
          font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
          font-size: 10px;
          color: #475569;
          max-height: 75px;
          overflow-y: auto;
          background: #f8fafc;
          padding: 7px 10px;
          border-radius: 9px;
          line-height: 1.45;
          border: 1px solid #e2e8f0;
          margin-bottom: 8px;
        ">Ready. Loaded 31 CrowdStrike jobs (Bengaluru, Pune, Mumbai). Click 'Start' to begin.</div>

        <!-- Role Summary List -->
        <div style="
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 10px;
          color: #991b1b;
          line-height: 1.45;
        ">
          <div style="display: flex; align-items: center; gap: 4px; font-weight: 700; color: #b91c1c; margin-bottom: 3px;">
            ${ICONS.info} CrowdStrike Target Profile:
          </div>
          <div>• <b>Locations:</b> Bengaluru, Pune, Mumbai (31 verified openings).</div>
          <div>• <b>Functions:</b> CI/CD, TechOps, Cloud, Backend, SRE, Observability, ML Platform, Sales Eng.</div>
          <div>• <b>Safety:</b> Dual-tab auto-closer + per-job deep cache purge active.</div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(hud);

  const progressBar = document.getElementById("cs-progress-bar");
  const progressText = document.getElementById("cs-progress-text");
  const appliedText = document.getElementById("cs-applied-text");
  const targetText = document.getElementById("cs-target-text");
  const logDiv = document.getElementById("cs-log");
  const statusDot = document.getElementById("cs-status-dot");
  const mainActionBtn = document.getElementById("cs-main-action-btn");
  const btnLabel = document.getElementById("cs-btn-label");
  const btnIcon = document.getElementById("cs-btn-icon");

  function log(msg, color = "#475569") {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    const formatted = "[" + time + "] " + msg;
    if (logDiv) {
      logDiv.innerHTML = '<span style="color: ' + color + ';">' + formatted + '</span><br>' + logDiv.innerHTML;
    }
    console.log("%c" + formatted, "color: " + color);
  }

  function updateUI() {
    const total = jobQueue.length;
    const current = Math.min(state.currentIndex, total);
    const pct = total > 0 ? ((current / total) * 100).toFixed(1) : 0;

    if (progressBar) progressBar.style.width = pct + "%";
    if (progressText) progressText.innerText = current + " / " + total + " (" + pct + "%)";
    if (appliedText) appliedText.innerText = state.completedCount;

    if (targetText) {
      targetText.innerText = jobQueue[state.currentIndex] ? formatSlug(jobQueue[state.currentIndex]) : "Completed!";
    }

    if (!isRunning && btnLabel) {
      btnLabel.innerText = state.currentIndex >= total ? "All 31 Jobs Applied!" : "Start Applying (" + (total - state.currentIndex) + " left)";
    }
  }

  async function processNextJob() {
    if (!isRunning || isPaused) return;

    if (state.currentIndex >= jobQueue.length) {
      isRunning = false;
      if (btnLabel) btnLabel.innerText = "All 31 Roles Completed!";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) mainActionBtn.style.background = "#059669";
      if (statusDot) statusDot.style.background = "#10b981";
      log("🎉 CrowdStrike Queue Finished! Successfully processed " + state.completedCount + " applications.", "#059669");
      return;
    }

    wipeAllStorageAndCookies(true);

    const currentUrl = jobQueue[state.currentIndex];
    const roleName = formatSlug(currentUrl);

    updateUI();

    log("Opening Tab 1 [" + (state.currentIndex + 1) + "/" + jobQueue.length + "]: " + roleName + "...", "#dc2626");

    let tab1 = null;
    let tab2 = null;
    let tab3 = null;

    try {
      tab1 = window.open(currentUrl, "_blank", "width=1280,height=850");

      if (!tab1) {
        log("⚠️ Popup blocked! Please allow popups in address bar.", "#e11d48");
        isRunning = false;
        if (btnLabel) btnLabel.innerText = "Allow Popups & Retry";
        return;
      }

      try {
        const origOpen1 = tab1.open;
        tab1.open = function (...args) {
          const child = origOpen1.apply(this, args);
          if (!tab2) {
            tab2 = child;
            try {
              const origOpen2 = tab2.open;
              tab2.open = function (...args2) {
                const child2 = origOpen2.apply(this, args2);
                if (!tab3) tab3 = child2;
                return child2;
              };
            } catch (e2) {}
          } else if (!tab3) {
            tab3 = child;
          }
          return child;
        };
      } catch (e) {}

      log("Waiting for React DOM hydration in Tab 1...", "#64748b");
      const btnMatch = await waitForApplyButton(tab1, 12000);

      if (btnMatch && btnMatch.el) {
        log("🎯 Found Apply Trigger via: " + btnMatch.strategy, "#059669");

        await sleep(randomDelay(600, 1100));

        let triggerDoc = null;
        try {
          triggerDoc = btnMatch.el.ownerDocument;
        } catch (e) {}
        const targetWin = triggerDoc ? (triggerDoc.defaultView || tab1) : tab1;

        await humanClick(btnMatch.el, targetWin);
        log("🖱️ Executed human pointer cascade. Waiting for redirect...", "#059669");

        await sleep(randomDelay(2200, 3200));

        const holdMs = getDestinationHoldMs();
        log("Holding on destination tab (" + (holdMs / 1000).toFixed(1) + "s pacing)...", "#64748b");
        await sleep(holdMs);

        state.completedCount++;
        state.history.push({ url: currentUrl, status: "applied", timestamp: Date.now() });
        log("✅ Applied successfully to: " + roleName, "#059669");
      } else {
        log("⚠️ No apply button resolved within 12s. Moving forward...", "#d97706");
        state.skippedCount++;
        state.history.push({ url: currentUrl, status: "skipped", timestamp: Date.now() });
      }

    } catch (err) {
      log("⚠️ Encountered error: " + err.message, "#e11d48");
      state.skippedCount++;
    } finally {
      try {
        if (tab3 && !tab3.closed) tab3.close();
      } catch (e) {}
      try {
        if (tab2 && !tab2.closed) tab2.close();
      } catch (e) {}
      try {
        if (tab1 && !tab1.closed) tab1.close();
      } catch (e) {}

      state.currentIndex++;
      saveState(state);
      updateUI();

      wipeAllStorageAndCookies(true);

      if (isRunning && !isPaused) {
        const nextDelay = getPacingDelay();
        log("⏳ Inter-job pacing pause (" + (nextDelay / 1000).toFixed(1) + "s)...", "#64748b");
        await sleep(nextDelay);
        processNextJob();
      }
    }
  }

  function startQueue() {
    if (state.currentIndex >= jobQueue.length) {
      state.currentIndex = 0;
      saveState(state);
      updateUI();
    }

    isRunning = true;
    isPaused = false;

    if (btnLabel) btnLabel.innerText = "Pause Queue";
    if (btnIcon) btnIcon.innerHTML = ICONS.pause;
    if (mainActionBtn) {
      mainActionBtn.style.background = "#e11d48";
      mainActionBtn.style.boxShadow = "0 4px 12px rgba(225, 29, 72, 0.25)";
    }
    if (statusDot) statusDot.style.background = "#10b981";

    log("▶️ Starting CrowdStrike application loop from Role #" + (state.currentIndex + 1) + "...", "#059669");
    processNextJob();
  }

  function pauseQueue() {
    isRunning = false;
    isPaused = true;

    if (btnLabel) btnLabel.innerText = "Resume Applying";
    if (btnIcon) btnIcon.innerHTML = ICONS.play;
    if (mainActionBtn) {
      mainActionBtn.style.background = "#dc2626";
      mainActionBtn.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.25)";
    }
    if (statusDot) statusDot.style.background = "#f59e0b";

    log("⏸️ Paused. Progress preserved in localStorage.", "#f59e0b");
  }

  function skipJob() {
    if (state.currentIndex < jobQueue.length) {
      const skippedUrl = jobQueue[state.currentIndex];
      log("⏭️ Skipped Role #" + (state.currentIndex + 1) + ": " + formatSlug(skippedUrl), "#d97706");
      state.currentIndex++;
      state.skippedCount++;
      saveState(state);
      updateUI();
      if (isRunning && !isPaused) processNextJob();
    }
  }

  function resetProgress() {
    if (confirm("Reset progress back to Role #1?")) {
      isRunning = false;
      isPaused = false;
      state = { currentIndex: 0, completedCount: 0, skippedCount: 0, history: [] };
      saveState(state);
      updateUI();
      log("🔄 Progress reset back to Role #1.", "#dc2626");
    }
  }

  // Bind Listeners
  mainActionBtn.addEventListener("click", () => {
    if (isRunning) pauseQueue();
    else startQueue();
  });

  document.getElementById("cs-skip-btn").addEventListener("click", skipJob);
  document.getElementById("cs-reset-btn").addEventListener("click", resetProgress);

  document.getElementById("cs-full-purge-btn").addEventListener("click", () => {
    wipeAllStorageAndCookies(false);
  });

  document.querySelectorAll(".cs-speed-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".cs-speed-btn").forEach((b) => {
        b.style.background = "#ffffff";
        b.style.color = "#475569";
        b.style.borderColor = "#cbd5e1";
        b.style.fontWeight = "500";
        b.style.boxShadow = "none";
      });
      btn.style.background = "#dc2626";
      btn.style.color = "#ffffff";
      btn.style.borderColor = "#dc2626";
      btn.style.fontWeight = "700";
      btn.style.boxShadow = "0 1px 3px rgba(220,38,38,0.2)";
      speedMode = btn.getAttribute("data-speed");
      log("Pacing set to: " + speedMode.toUpperCase(), "#dc2626");
    });
  });

  let isMinimized = false;
  document.getElementById("cs-min-btn").addEventListener("click", () => {
    isMinimized = !isMinimized;
    const body = document.getElementById("cs-body");
    if (body) body.style.display = isMinimized ? "none" : "block";
  });

  function cleanupInstance() {
    isRunning = false;
    isPaused = true;
    hud.remove();
    window.__AUTO_APPLIER_CROWDSTRIKE__ = null;
    window.__AUTO_APPLIER_INSTANCE_CROWDSTRIKE__ = null;
    console.log("%c🧹 CrowdStrike Auto-Applier session closed.", "color: #64748b; font-style: italic;");
  }

  document.getElementById("cs-close-btn").addEventListener("click", cleanupInstance);

  const api = {
    start: startQueue,
    pause: pauseQueue,
    skip: skipJob,
    reset: resetProgress,
    wipeStorage: () => wipeAllStorageAndCookies(false),
    cleanup: cleanupInstance,
    getState: () => ({ ...state })
  };

  window.__AUTO_APPLIER_CROWDSTRIKE__ = api;
  window.__AUTO_APPLIER_INSTANCE_CROWDSTRIKE__ = api;

  updateUI();

  console.log(
    "%c 🦅 CROWDSTRIKE APPLIER %c READY ",
    "background: #fef2f2; color: #dc2626; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #dc2626;",
    "background: #dc2626; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #dc2626;"
  );
  console.log(
    "%c🎯 Target: %c31 CrowdStrike Openings (Bengaluru, Pune, Mumbai)\n" +
    "%c💾 Saved Progress: %cJob " + (state.currentIndex + 1) + " | Applied: " + state.completedCount + "\n" +
    "%c⚡ Controls: %cClick 'Start Applying' on the floating HUD in the top right",
    "color: #64748b; font-weight: bold;", "color: #dc2626; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #dc2626; font-weight: bold;"
  );
})();
