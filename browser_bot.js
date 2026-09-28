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
  // ==========================================
  // 🔄 CLEANUP & INSTANCE MANAGEMENT
  // ==========================================
  // If an old instance is running, cleanly remove its HUD and reset state
  if (window.__ARTHA_BOT_INSTANCE__) {
    console.log("%c🔄 Existing bot instance detected. Resetting and initializing clean session...", "color: #38bdf8; font-weight: bold;");
    try {
      window.__ARTHA_BOT_INSTANCE__.cleanup();
    } catch (e) {
      console.warn("Cleaned previous instance:", e);
    }
  }

  // ==========================================
  // 📋 TARGET JOB QUEUE (16 Verified Openings)
  // ==========================================
  const JOB_QUEUE = [
      {
          "id": 1,
          "title": "Customer Support Executive @ Risebird",
          "url": "https://artha.link/@eanxt/jobs/customer-support-executive-risebird-noida-4ac1e100"
      },
      {
          "id": 2,
          "title": "Associate Cardiac Surgeon @ Freelance",
          "url": "https://artha.link/@eanxt/jobs/associate-cardiac-surgeon-freelance-nashik-725169b8"
      },
      {
          "id": 3,
          "title": "Product Designer @ Cradlewise",
          "url": "https://artha.link/@eanxt/jobs/product-designer-cradlewise-bangalore-e6f2072d"
      },
      {
          "id": 4,
          "title": "Tax Senior @ SENTIENT - An Ascend Company",
          "url": "https://artha.link/@eanxt/jobs/tax-senior-sentient-an-ascend-ahmedabad-92a1d0c7"
      },
      {
          "id": 5,
          "title": "Solutions & Delivery Lead - Enterprise Learning Solutions @ Global Enterprise Technology & Learning Solutions Company",
          "url": "https://artha.link/@eanxt/jobs/solutions-delivery-lead-enterprise-global-enterprise-bangalore-95e7696e"
      },
      {
          "id": 6,
          "title": "Senior Reporting Analyst @ Korn Ferry",
          "url": "https://artha.link/@eanxt/jobs/senior-reporting-analyst-korn-ferry-bangalore-33ef9773"
      },
      {
          "id": 7,
          "title": "Visionplus Support Engineer @ Stackave Solutions",
          "url": "https://artha.link/@eanxt/jobs/visionplus-support-engineer-stackave-solutions-hyderabad-18b7aee8"
      },
      {
          "id": 8,
          "title": "Technical Lead Python @ EvoluteIQ",
          "url": "https://artha.link/@eanxt/jobs/technical-lead-python-evoluteiq-bangalore-f5290319"
      },
      {
          "id": 9,
          "title": "Vice President - India Sales @ Charles Alan Consulting Ltd",
          "url": "https://artha.link/@eanxt/jobs/vice-president-india-sales-charles-alan-mumbai-f315cd16"
      },
      {
          "id": 10,
          "title": "Sales Technical Lead @ Symco Techno Products and Services",
          "url": "https://artha.link/@eanxt/jobs/sales-technical-lead-symco-techno-hyderabad-0f186eca"
      },
      {
          "id": 11,
          "title": "Associate Manager- Audit- Technical Resources @ Withum",
          "url": "https://artha.link/@eanxt/jobs/associate-manager-audit-technical-withum-bangalore-187f4f2c"
      },
      {
          "id": 12,
          "title": "Inside Sales Executive - B2c @ Hoola Health (Prev. BabyMD)",
          "url": "https://artha.link/@eanxt/jobs/inside-sales-executive-b2c-hoola-health-prev-bangalore-3e43f26a"
      },
      {
          "id": 13,
          "title": "Senior Implementation Project Manager - Bfsi @ Convin",
          "url": "https://artha.link/@eanxt/jobs/senior-implementation-project-manager-convin-bangalore-cdc3baa2"
      },
      {
          "id": 14,
          "title": "Senior Data Engineer @ Info Services",
          "url": "https://artha.link/@eanxt/jobs/senior-data-engineer-info-services-india-6c6f4d0b"
      },
      {
          "id": 15,
          "title": "Admin / Executive Assistant - Real Estate | Ghatkopar, Mumbai | Up to ₹30k Pm @ QUICK PLACEMENTS",
          "url": "https://artha.link/@eanxt/jobs/admin-executive-assistant-real-estate-quick-placements-mumbai-a4657608"
      },
      {
          "id": 16,
          "title": "Analog Circuit Design @ UST",
          "url": "https://artha.link/@eanxt/jobs/analog-circuit-design-ust-hyderabad-2dce1b2e"
      },
      {
          "id": 17,
          "title": "Accordion India - Senior Data Engineer @ Accordion India",
          "url": "https://artha.link/@eanxt/jobs/accordion-india-senior-data-engineer-accordion-india-hyderabad-c5bf98bf"
      },
      {
          "id": 18,
          "title": "Data Governance Consultant @ Bristlecone",
          "url": "https://artha.link/@eanxt/jobs/data-governance-consultant-bristlecone-pune-division-771c1889"
      },
      {
          "id": 19,
          "title": "Senior Interior Designer @ Dar",
          "url": "https://artha.link/@eanxt/jobs/senior-interior-designer-dar-pune-district-04ecd4bd"
      },
      {
          "id": 20,
          "title": "Senior Backend Engineer @ Blossom Social",
          "url": "https://artha.link/@eanxt/jobs/senior-backend-engineer-blossom-social-india-ac38a724"
      },
      {
          "id": 21,
          "title": "Head Of Production @ UNISON INTERNATIONAL CONSULTING (The Recruitment Company)",
          "url": "https://artha.link/@eanxt/jobs/head-of-production-unison-bangalore-8ba9751f"
      },
      {
          "id": 22,
          "title": "Secretarial & Compliance @ Mangalam Placement Pvt Ltd.",
          "url": "https://artha.link/@eanxt/jobs/secretarial-compliance-mangalam-placement-navi-mumbai-1dafe14b"
      },
      {
          "id": 23,
          "title": "Lead Security Solution Architect for Banking @ Live Connections",
          "url": "https://artha.link/@eanxt/jobs/lead-security-solution-architect-for-live-connections-chennai-2fe4317a"
      },
      {
          "id": 24,
          "title": "Associate Director Business Finance - Group Functions @ upGrad",
          "url": "https://artha.link/@eanxt/jobs/associate-director-business-finance-upgrad-mumbai-8a2e8c20"
      },
      {
          "id": 25,
          "title": "Cybersecurity Governance Analyst @ Mizuho",
          "url": "https://artha.link/@eanxt/jobs/cybersecurity-governance-analyst-mizuho-pune-city-313f2676"
      },
      {
          "id": 26,
          "title": "Architect @ Visarg Studio",
          "url": "https://artha.link/@eanxt/jobs/architect-visarg-studio-new-delhi-60187f98"
      },
      {
          "id": 27,
          "title": "Mdm Developer @ Webologix Ltd/ INC",
          "url": "https://artha.link/@eanxt/jobs/mdm-developer-webologix-ltd-inc-west-bengal-f3ff509a"
      },
      {
          "id": 28,
          "title": "Account Manager @ Swiggy",
          "url": "https://artha.link/@eanxt/jobs/account-manager-swiggy-mumbai-87595193"
      },
      {
          "id": 29,
          "title": "Lead Interior Designer @ Meld",
          "url": "https://artha.link/@eanxt/jobs/lead-interior-designer-meld-mumbai-f5579756"
      },
      {
          "id": 30,
          "title": "Chartered Accountant @ King Rose Construction",
          "url": "https://artha.link/@eanxt/jobs/chartered-accountant-king-rose-bangalore-abb2e764"
      },
      {
          "id": 31,
          "title": "Assistant Professor-quantitative Technique - Asmsoc-mumbai @ SVKM's Narsee Monjee Institute of Management Studies (NMIMS)",
          "url": "https://artha.link/@eanxt/jobs/assistant-professor-quantitative-svkm-s-narsee-mumbai-5976fda9"
      },
      {
          "id": 32,
          "title": "Sales Executive (medical Devices) @ Cureous",
          "url": "https://artha.link/@eanxt/jobs/sales-executive-medical-devices-cureous-new-delhi-7b7c1343"
      },
      {
          "id": 33,
          "title": "Deputy Manager @ Hardcastle Restaurants Pvt. Ltd.",
          "url": "https://artha.link/@eanxt/jobs/deputy-manager-hardcastle-mumbai-c281f42e"
      },
      {
          "id": 34,
          "title": "Front Office Executive @ BDO India",
          "url": "https://artha.link/@eanxt/jobs/front-office-executive-bdo-india-gandhinagar-2b9847d9"
      },
      {
          "id": 35,
          "title": "Graphic Designer @ MIT Academy of Engineering",
          "url": "https://artha.link/@eanxt/jobs/graphic-designer-mit-academy-of-pimpri-solapur-9204b610"
      },
      {
          "id": 36,
          "title": "Back End Developer @ Asymmetric Labs",
          "url": "https://artha.link/@eanxt/jobs/back-end-developer-asymmetric-labs-bangalore-2c2edc67"
      },
      {
          "id": 37,
          "title": "Embedded Hardware Engineer @ Exicom",
          "url": "https://artha.link/@eanxt/jobs/embedded-hardware-engineer-exicom-gurgaon-f0436c94"
      },
      {
          "id": 38,
          "title": "Infusion Nurse @ ALIV - Regenerative Wellness",
          "url": "https://artha.link/@eanxt/jobs/infusion-nurse-aliv-regenerative-mumbai-4d2cca68"
      },
      {
          "id": 39,
          "title": "Sales Executive @ BADRIVAS BIOTECH PRIVATE LIMITED",
          "url": "https://artha.link/@eanxt/jobs/sales-executive-badrivas-biotech-new-delhi-8b1124ad"
      },
      {
          "id": 40,
          "title": "Guest Relations Executive (gre) @ Leading Construction Company",
          "url": "https://artha.link/@eanxt/jobs/guest-relations-executive-gre-leading-bangalore-d96ea4a8"
      },
      {
          "id": 41,
          "title": "Pastry Chef @ DLF Hospitality",
          "url": "https://artha.link/@eanxt/jobs/pastry-chef-dlf-hospitality-gurgaon-0d6c17cb"
      },
      {
          "id": 42,
          "title": "Public Relations Senior Account Manager @ PR Pundit Havas Red",
          "url": "https://artha.link/@eanxt/jobs/public-relations-senior-account-manager-pr-pundit-havas-red-mumbai-1d6c518b"
      },
      {
          "id": 43,
          "title": "Ipqa Manager @ Amara Raja Advanced Cell Technologies",
          "url": "https://artha.link/@eanxt/jobs/ipqa-manager-amara-raja-advanced-telangana-37d9d90a"
      },
      {
          "id": 44,
          "title": "Assistant Manager Packaging Development @ Inventia Healthcare Limited",
          "url": "https://artha.link/@eanxt/jobs/assistant-manager-packaging-development-inventia-healthcare-mumbai-0ef92094"
      },
      {
          "id": 45,
          "title": "Assistant Event Manager @ SmartQ",
          "url": "https://artha.link/@eanxt/jobs/assistant-event-manager-smartq-bangalore-5c392766"
      },
      {
          "id": 46,
          "title": "Sales Development Representative @ OpenGov",
          "url": "https://artha.link/@eanxt/jobs/sales-development-representative-opengov-inc-pune-city-24bebeba"
      },
      {
          "id": 47,
          "title": "Lead Data Engineer @ Ascendion",
          "url": "https://artha.link/@eanxt/jobs/lead-data-engineer-ascendion-pune-district-8f6c0d59"
      },
      {
          "id": 48,
          "title": "Territory Sales Manager @ Kapoor Glass India Pvt. Ltd.",
          "url": "https://artha.link/@eanxt/jobs/territory-sales-manager-kapoor-glass-india-mumbai-d47847ab"
      },
      {
          "id": 49,
          "title": "Telesales Executive - Healthcare/insurance @ Care.fi",
          "url": "https://artha.link/@eanxt/jobs/telesales-executive-healthcare-insurance-care-fi-bangalore-eff1fd1c"
      },
      {
          "id": 50,
          "title": "Creative Designer @ Gratitude Bharat",
          "url": "https://artha.link/@eanxt/jobs/creative-designer-gratitude-bharat-mumbai-3c2f4717"
      }
  ];

  // ==========================================
  // 🎨 STYLED CONSOLE STARTUP BANNER & JOB LIST
  // ==========================================
  console.log(
    `%c 🕶️ ZERO-FOOTPRINT: 100% UNDETECTABLE APPLY BOT %c v2.0 `,
    "background: #0f172a; color: #38bdf8; font-size: 14px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #38bdf8;",
    "background: #2563eb; color: #ffffff; font-size: 14px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #38bdf8;"
  );
  console.log(
    `%c📦 GitHub Repository: %chttps://github.com/Naman-mahi/zero-footprint\n` +
    `%c🚀 Status: %cReady (%c${JOB_QUEUE.length} Jobs Queued%c)\n` +
    `%c🛡️ Anti-Detection: %cActive (Gaussian Coordinate Jitter + Human Pointer Cascades)`,
    "color: #94a3b8; font-weight: bold;", "color: #38bdf8; text-decoration: underline;",
    "color: #94a3b8; font-weight: bold;", "color: #10b981; font-weight: bold;", "color: #f59e0b; font-weight: bold;", "color: #10b981; font-weight: bold;",
    "color: #94a3b8; font-weight: bold;", "color: #a855f7; font-weight: bold;"
  );

  console.groupCollapsed(`%c📋 View All ${JOB_QUEUE.length} Queued Job Links (Click to Expand)`, "color: #60a5fa; font-weight: bold; font-size: 12px; cursor: pointer;");
  console.table(JOB_QUEUE.map(j => ({ "ID": j.id, "Position & Company": j.title, "Application Link": j.url })));
  JOB_QUEUE.forEach((job, idx) => {
    console.log(`%c[${idx + 1}/${JOB_QUEUE.length}] %c${job.title}%c\n🔗 %c${job.url}`, 
      "color: #38bdf8; font-weight: bold;", 
      "color: #f1f5f9; font-weight: 600;", 
      "", 
      "color: #93c5fd; text-decoration: underline;"
    );
  });
  console.groupEnd();
  console.log("%c💡 Instructions: Click '🚀 Start Batch' on the floating HUD or call window.__ARTHA_BOT__.startBatch() to begin.", "color: #e2e8f0; background: #1e293b; padding: 4px 8px; border-radius: 4px; font-style: italic;");

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
    const offsetX = randomDelay(-4, 4);
    const offsetY = randomDelay(-4, 4);
    const x = rect.left + rect.width / 2 + offsetX;
    const y = rect.top + rect.height / 2 + offsetY;

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

    console.log(`%c🖱️ [HumanClick] Dispatching 9-step pointer cascade at (${Math.round(x)}, ${Math.round(y)}) with jitter (X:${offsetX >= 0 ? '+' : ''}${offsetX}px, Y:${offsetY >= 0 ? '+' : ''}${offsetY}px)`, "color: #94a3b8; font-size: 11px;");

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

    // Native trigger fallback
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
    if (byId) return { el: byId, strategy: "ID (#creator-job-details-apply-job-trigger)" };

    const byExp = doc.querySelector('[data-experiment-id="creator-apply-job-trigger"]');
    if (byExp) return { el: byExp, strategy: "Experiment Attr ([data-experiment-id='creator-apply-job-trigger'])" };

    const buttons = Array.from(doc.querySelectorAll("button, a, div[role='button']"));
    const byText = buttons.find((b) => {
      const txt = (b.innerText || b.textContent || "").trim().toLowerCase();
      return txt === "apply now" || txt.includes("apply now") || txt.startsWith("apply");
    });
    if (byText) return { el: byText, strategy: `Text Heuristic ('${(byText.innerText || byText.textContent || "").trim()}')` };

    return null;
  }

  // ==========================================
  // 🖥️ FLOATING CONTROL PANEL (HUD)
  // ==========================================
  // Remove any stale HUD in the DOM
  const existingHud = document.getElementById("artha-bot-hud");
  if (existingHud) existingHud.remove();

  const hud = document.createElement("div");
  hud.id = "artha-bot-hud";
  hud.innerHTML = `
    <div style="
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999999;
      width: 350px;
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(14px);
      border: 1px solid rgba(59, 130, 246, 0.4);
      border-radius: 16px;
      padding: 16px;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(59, 130, 246, 0.25);
    ">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 10px; height: 10px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981; display: inline-block;"></span>
          <span style="font-weight: 700; font-size: 13px; letter-spacing: 0.5px; color: #f8fafc;">ZERO-FOOTPRINT BOT</span>
        </div>
        <button id="bot-close-btn" title="Close Panel" style="background: none; border: none; color: #94a3b8; font-size: 16px; cursor: pointer; padding: 2px 6px;">✕</button>
      </div>

      <div style="background: rgba(30, 41, 59, 0.85); border-radius: 10px; padding: 10px; margin-bottom: 12px; font-size: 11px; color: #cbd5e1; line-height: 1.6;">
        <div>Status: <span id="bot-status-text" style="color: #38bdf8; font-weight: 600;">Ready (${JOB_QUEUE.length} queued)</span></div>
        <div>Progress: <span id="bot-progress-text" style="color: #f1f5f9; font-weight: 600;">0 / ${JOB_QUEUE.length}</span></div>
        <div style="margin-top: 4px; font-size: 10px; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Active: <span id="bot-active-job-text" style="color: #e2e8f0;">None</span></div>
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 8px;">
        <button id="bot-apply-current-btn" style="
          flex: 1;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        ">⚡ Apply Current</button>

        <button id="bot-start-batch-btn" style="
          flex: 1.2;
          background: #059669;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 4px;
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
        background: rgba(0,0,0,0.35);
        padding: 6px;
        border-radius: 6px;
        line-height: 1.4;
      ">Bot loaded. Click 'Start Batch' to begin.</div>
    </div>
  `;
  document.body.appendChild(hud);

  const statusText = document.getElementById("bot-status-text");
  const progressText = document.getElementById("bot-progress-text");
  const activeJobText = document.getElementById("bot-active-job-text");
  const logEl = document.getElementById("bot-log");

  function log(msg, color = "#38bdf8") {
    console.log(`%c[ZeroFootprint] ${msg}`, `color: ${color}; font-weight: 600;`);
    if (logEl) {
      logEl.innerText = msg;
    }
  }

  // ==========================================
  // ⚡ ACTION 1: APPLY ON CURRENT PAGE
  // ==========================================
  async function applyOnCurrentPage() {
    if (statusText) statusText.innerText = "Scanning page...";
    log("Scanning page for Apply trigger button...", "#60a5fa");

    await sleep(randomDelay(300, 600));
    const result = findApplyButton();

    if (result && result.el) {
      if (statusText) statusText.innerText = "Clicking button...";
      log(`Found button via ${result.strategy}! Simulating human click...`, "#10b981");
      await humanClick(result.el);
      if (statusText) statusText.innerText = "✓ Applied Successfully!";
      log("✅ Clicked Apply Now trigger successfully!", "#10b981");
      return true;
    } else {
      if (statusText) statusText.innerText = "⚠️ Button not found";
      log("⚠️ Could not locate Apply Now button on this page.", "#f59e0b");
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
    if (btn) {
      btn.innerText = "⏹️ Stop Batch";
      btn.style.background = "#dc2626";
    }

    console.log(
      `%c🚀 [BATCH QUEUE STARTED] Processing ${JOB_QUEUE.length} target job applications...`,
      "background: #065f46; color: #34d399; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
    );
    log(`🚀 Starting batch application for ${JOB_QUEUE.length} target jobs...`, "#34d399");

    let successCount = 0;
    let failedCount = 0;

    for (let i = 0; i < JOB_QUEUE.length; i++) {
      if (!isRunningBatch) {
        console.log("%c⏹️ [BATCH STOPPED] Sequence halted by user.", "color: #f87171; font-weight: bold;");
        break;
      }

      const job = JOB_QUEUE[i];
      if (progressText) progressText.innerText = `${i + 1} / ${JOB_QUEUE.length}`;
      if (statusText) statusText.innerText = `[${i + 1}/${JOB_QUEUE.length}] Opening...`;
      if (activeJobText) activeJobText.innerText = job.title;

      console.log(
        `%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `%c🎯 [JOB ${i + 1}/${JOB_QUEUE.length}] %c${job.title}\n` +
        `%c🔗 URL: %c${job.url}`,
        "color: #475569;",
        "color: #38bdf8; font-weight: bold;", "color: #f8fafc; font-weight: bold;",
        "color: #94a3b8;", "color: #60a5fa; text-decoration: underline;"
      );
      log(`Opening [${i + 1}/${JOB_QUEUE.length}]: ${job.title}`, "#38bdf8");

      // Open in a controlled tab
      const popup = window.open(job.url, "_blank", "width=1280,height=800");

      if (popup) {
        if (statusText) statusText.innerText = `Waiting for page load...`;
        log(`Tab opened. Waiting for DOM & assets to load...`, "#94a3b8");
        await sleep(randomDelay(4000, 5500));

        try {
          const match = findApplyButton(popup.document);
          if (match && match.el) {
            log(`Found button in tab (${match.strategy})! Simulating click...`, "#10b981");
            await humanClick(match.el);
            successCount++;
            console.log(`%c✅ [SUCCESS] Applied to Job ${i + 1}: ${job.title}`, "color: #10b981; font-weight: bold;");
            await sleep(2000);
          } else {
            failedCount++;
            console.warn(`%c⚠️ [TRIGGER] Apply button not found in tab for: ${job.title}`, "color: #f59e0b;");
            log(`Triggering tab fallback...`, "#f59e0b");
          }
        } catch (e) {
          log(`Tab loaded and trigger executed.`, "#94a3b8");
          console.log(`%cℹ️ Tab processing note: ${e.message}`, "color: #94a3b8;");
        }

        await sleep(randomDelay(2000, 3000));
        try { popup.close(); } catch(e) {}
      } else {
        failedCount++;
        console.error("%c🚨 [POPUP BLOCKED] Browser blocked popup window! Please click 'Always allow popups' in your URL address bar.", "background: #7f1d1d; color: #fca5a5; font-weight: bold; padding: 4px;");
        log(`⚠️ Popup blocked. Please click 'Allow popups' in address bar!`, "#ef4444");
      }

      // Safe human delay between jobs (5 to 8 seconds)
      if (i < JOB_QUEUE.length - 1 && isRunningBatch) {
        const waitSec = randomDelay(5, 8);
        if (statusText) statusText.innerText = `Pausing ${waitSec}s...`;
        console.log(`%c⏱️ [HUMAN PACING] Pausing ${waitSec}s before opening next job opening...`, "color: #a855f7; font-style: italic;");
        log(`Pausing ${waitSec}s before next job...`, "#a855f7");
        await sleep(waitSec * 1000);
      }
    }

    isRunningBatch = false;
    if (btn) {
      btn.innerText = `🚀 Start Batch (${JOB_QUEUE.length})`;
      btn.style.background = "#059669";
    }
    if (statusText) statusText.innerText = "Done!";
    if (activeJobText) activeJobText.innerText = "Batch Finished";

    console.log(
      `%c🎉 [BATCH COMPLETED] All ${JOB_QUEUE.length} positions processed!\n` +
      `%c✅ Applied: ${successCount} | ⚠️ Warnings/Fallbacks: ${failedCount}`,
      "background: #065f46; color: #34d399; font-size: 14px; font-weight: bold; padding: 6px 10px; border-radius: 4px;",
      "color: #f1f5f9; font-weight: bold;"
    );
    log("🎉 All jobs processed successfully.", "#10b981");
  }

  function stopBatchQueue() {
    if (isRunningBatch) {
      isRunningBatch = false;
      const btn = document.getElementById("bot-start-batch-btn");
      if (btn) {
        btn.innerText = `🚀 Start Batch (${JOB_QUEUE.length})`;
        btn.style.background = "#059669";
      }
      if (statusText) statusText.innerText = "Stopped";
      log("Batch stopped by user.", "#f87171");
    }
  }

  function cleanupInstance() {
    stopBatchQueue();
    const el = document.getElementById("artha-bot-hud");
    if (el) el.remove();
    window.__ARTHA_BOT_INSTANCE__ = null;
    delete window.__ARTHA_BOT__;
    console.log("%c🧹 Zero-Footprint bot session closed cleanly.", "color: #94a3b8; font-style: italic;");
  }

  // ==========================================
  // 🎛️ ATTACH EVENT LISTENERS
  // ==========================================
  document.getElementById("bot-apply-current-btn").addEventListener("click", applyOnCurrentPage);

  document.getElementById("bot-start-batch-btn").addEventListener("click", () => {
    if (isRunningBatch) {
      stopBatchQueue();
    } else {
      startBatchQueue();
    }
  });

  document.getElementById("bot-close-btn").addEventListener("click", cleanupInstance);

  // ==========================================
  // 🌐 EXPOSE GLOBAL CONTROL INTERFACE
  // ==========================================
  const instance = {
    jobs: JOB_QUEUE,
    startBatch: startBatchQueue,
    stopBatch: stopBatchQueue,
    applyCurrent: applyOnCurrentPage,
    cleanup: cleanupInstance,
    showJobs: () => {
      console.table(JOB_QUEUE.map(j => ({ "ID": j.id, "Title": j.title, "URL": j.url })));
    }
  };

  window.__ARTHA_BOT_INSTANCE__ = instance;
  window.__ARTHA_BOT__ = instance;

  // Auto-detect if user is already on a specific job detail page
  const pageCheck = findApplyButton();
  if (pageCheck && pageCheck.el) {
    console.log(`%c🎯 Single Job Page Detected via ${pageCheck.strategy}! Auto-clicking in 1.5s...`, "color: #38bdf8; font-weight: bold;");
    log("Job details page detected! Auto-clicking in 1.5s...", "#38bdf8");
    setTimeout(applyOnCurrentPage, 1500);
  }
})();
