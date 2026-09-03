/**
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
 * - ⏩ Batch Navigator (50 Jobs per Batch): Easy Next/Prev batch controls (Batches 1–20 across all 974 jobs).
 * - 🧹 1-Click Storage & Cookie Purge Button: Wipes domain cookies, localStorage & sessionStorage instantly.
 * - 💾 Session Resume: Saves progress in localStorage so you can pause/resume anytime without losing your place.
 * - 🎨 Ultra-Clean Pure White HUD: Top-right positioning (zero overlap with chat widget), vector SVGs, and step-by-step instructions.
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
  // 📋 EMBEDDED JOB URL QUEUE (974 Openings from out_*.json feeds)
  // =========================================================================
  const DEFAULT_QUEUE = [
  "https://artha.link/@eanxt/jobs/product-designer-mirabelle-korea-bengaluru-f85e96d6",
  "https://artha.link/@eanxt/jobs/staff-level-ii-accountant-1065-op-re-tax-withum-bengaluru-3bb68d8a",
  "https://artha.link/@eanxt/jobs/director-of-business-development-krown-kumarappa-madurai-5a829949",
  "https://artha.link/@eanxt/jobs/interior-designer-m-s-klass-interiors-mumbai-dfc62d94",
  "https://artha.link/@eanxt/jobs/project-manager-at-site-jv-ventures-hyderabad-8b456182",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineer-l-t-technology-bengaluru-203faff2",
  "https://artha.link/@eanxt/jobs/asic-design-verification-l-t-technology-bengaluru-7a0030f5",
  "https://artha.link/@eanxt/jobs/senior-statistical-programmer-acl-digital-bengaluru-f859c6c3",
  "https://artha.link/@eanxt/jobs/structural-design-engineer-ez-engineers-pvt-ltd-vadodara-d5faf5f1",
  "https://artha.link/@eanxt/jobs/design-verification-lead-acl-digital-bengaluru-663909fb",
  "https://artha.link/@eanxt/jobs/design-team-lead-truww-bengaluru-4df109ec",
  "https://artha.link/@eanxt/jobs/sales-executive-crennovations-3d-d5542f21",
  "https://artha.link/@eanxt/jobs/senior-accountant-1065-operating-withum-bengaluru-87463400",
  "https://artha.link/@eanxt/jobs/finance-associate-falconsage-bengaluru-304583c7",
  "https://artha.link/@eanxt/jobs/preferred-relationship-manager-anand-rathi-share-chennai-ceeade85",
  "https://artha.link/@eanxt/jobs/area-sales-manager-marico-limited-guwahati-764715c2",
  "https://artha.link/@eanxt/jobs/unity-3d-programmer-appy-monkeys-bengaluru-a1fffb77",
  "https://artha.link/@eanxt/jobs/manufacturing-engineer-tvasta-chennai-2f83df17",
  "https://artha.link/@eanxt/jobs/data-analyst-arcana-coimbatore-4e23e891",
  "https://artha.link/@eanxt/jobs/faculty-teacher-education-indus-training-and-bengaluru-fb7d38cb",
  "https://artha.link/@eanxt/jobs/data-center-engineer-infogain-bengaluru-76016de3",
  "https://artha.link/@eanxt/jobs/peering-provisioning-engineer-infogain-bengaluru-126d3db1",
  "https://artha.link/@eanxt/jobs/sta-engineer-mediatek-bengaluru-4adbb895",
  "https://artha.link/@eanxt/jobs/frontend-developer-reactjs-6-years-dbiz-ai-kochi-2c8881c4",
  "https://artha.link/@eanxt/jobs/audit-assistant-ravi-ladia-and-co-hyderabad-4cb49686",
  "https://artha.link/@eanxt/jobs/video-editing-internship-airlearn-bengaluru-de524802",
  "https://artha.link/@eanxt/jobs/video-editor-intern-airlearn-bengaluru-180ef100",
  "https://artha.link/@eanxt/jobs/geographic-information-system-developer-apepdcl-edb245a4",
  "https://artha.link/@eanxt/jobs/software-engineer-backend-sde-2-arcana-bangalore-urban-f19d4110",
  "https://artha.link/@eanxt/jobs/principal-sas-programmer-advanced-clinical-ahmedabad-c665d952",
  "https://artha.link/@eanxt/jobs/customer-support-international-voice-movate-chennai-58048801",
  "https://artha.link/@eanxt/jobs/dermatologist-sanjeevani-cos-bengaluru-f5271f5f",
  "https://artha.link/@eanxt/jobs/business-development-executive-vien-digital-noida-a8f42658",
  "https://artha.link/@eanxt/jobs/relationship-manager-pcg-sales-chola-securities-hyderabad-e59d9f77",
  "https://artha.link/@eanxt/jobs/relationship-manager-pcg-advisory-chola-securities-kolkata-90cdbfb3",
  "https://artha.link/@eanxt/jobs/assistant-professor-associate-professor-alliance-university-bengaluru-f105fecb",
  "https://artha.link/@eanxt/jobs/physiotherapist-global-health-spine-fa8eb9d0",
  "https://artha.link/@eanxt/jobs/design-verification-engineer-dv-l-t-technology-bengaluru-08565361",
  "https://artha.link/@eanxt/jobs/senior-rtl-design-engineer-l-t-technology-bengaluru-ad8c4acb",
  "https://artha.link/@eanxt/jobs/senior-dv-engineers-uvm-verliog-l-t-technology-bengaluru-626d9583",
  "https://artha.link/@eanxt/jobs/senior-dv-engineer-l-t-technology-bengaluru-a5794bc0",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineer-l-t-technology-bengaluru-a6a0df5c",
  "https://artha.link/@eanxt/jobs/ams-verification-engineer-l-t-technology-bengaluru-1181fbea",
  "https://artha.link/@eanxt/jobs/memory-layout-engineer-acl-digital-noida-e4e8b688",
  "https://artha.link/@eanxt/jobs/soc-design-verification-lead-l-t-technology-bengaluru-a54b728e",
  "https://artha.link/@eanxt/jobs/sr-lead-design-verification-acl-digital-bengaluru-ac10aa80",
  "https://artha.link/@eanxt/jobs/design-verification-engineer-acl-digital-bengaluru-89863081",
  "https://artha.link/@eanxt/jobs/design-verification-engineer-acl-digital-bengaluru-ad23093a",
  "https://artha.link/@eanxt/jobs/rtl-design-engineer-acl-digital-hyderabad-9596bf13",
  "https://artha.link/@eanxt/jobs/functional-safety-engineer-acl-digital-bengaluru-6e239392",
  "https://artha.link/@eanxt/jobs/design-verification-lead-l-t-technology-bengaluru-7bae3b72",
  "https://artha.link/@eanxt/jobs/fpga-design-engineer-acl-digital-bengaluru-dec8a368",
  "https://artha.link/@eanxt/jobs/asic-design-engineer-acl-digital-bengaluru-fdf38508",
  "https://artha.link/@eanxt/jobs/ddr-pcie-nvme-ucie-verification-engineer-acl-digital-bengaluru-a07e420c",
  "https://artha.link/@eanxt/jobs/lead-design-engineer-acl-digital-bengaluru-c285b09b",
  "https://artha.link/@eanxt/jobs/analog-layout-engineer-acl-digital-bengaluru-61f4e1fc",
  "https://artha.link/@eanxt/jobs/sr-design-engineer-pprtl-prime-power-acl-digital-hyderabad-e4ddc0e2",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineer-acl-digital-hyderabad-e7c4b6fc",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineer-l-t-technology-bengaluru-f3cd9849",
  "https://artha.link/@eanxt/jobs/analog-layout-engineer-acl-digital-bengaluru-c7a6bf79",
  "https://artha.link/@eanxt/jobs/ams-circuit-design-engineer-acl-digital-hyderabad-3c230688",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineers-acl-digital-bengaluru-a5173aa4",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineer-acl-digital-bengaluru-5054e2cc",
  "https://artha.link/@eanxt/jobs/gfx-ip-verification-engineer-acl-digital-bengaluru-b854b823",
  "https://artha.link/@eanxt/jobs/staff-engineer-acl-digital-bengaluru-8d77a677",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineer-l-t-technology-bangalore-urban-4bd7e34e",
  "https://artha.link/@eanxt/jobs/rtl-design-verification-engineer-acl-digital-bengaluru-5745739e",
  "https://artha.link/@eanxt/jobs/cpu-verification-engineer-acl-digital-bengaluru-919ed8b9",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineer-acl-digital-bengaluru-47eea715",
  "https://artha.link/@eanxt/jobs/lead-rtl-design-engineer-acl-digital-bengaluru-6b994a35",
  "https://artha.link/@eanxt/jobs/formal-verification-engineer-acl-digital-bengaluru-aa49b505",
  "https://artha.link/@eanxt/jobs/functional-verification-engineer-acl-digital-bengaluru-6e1c418d",
  "https://artha.link/@eanxt/jobs/lead-fpga-design-engineers-acl-digital-bengaluru-26bf0543",
  "https://artha.link/@eanxt/jobs/fpga-design-engineer-acl-digital-hyderabad-f6af89e0",
  "https://artha.link/@eanxt/jobs/memory-layout-engineer-acl-digital-bengaluru-c89b6d60",
  "https://artha.link/@eanxt/jobs/rtl-design-engineer-acl-digital-hyderabad-c1dd92fc",
  "https://artha.link/@eanxt/jobs/fpga-design-engineer-acl-digital-hyderabad-4963ecef",
  "https://artha.link/@eanxt/jobs/memory-design-engineers-acl-digital-bengaluru-88aa8018",
  "https://artha.link/@eanxt/jobs/analog-layout-engineers-acl-digital-bengaluru-0e153585",
  "https://artha.link/@eanxt/jobs/io-layout-engineer-acl-digital-bengaluru-55873cd6",
  "https://artha.link/@eanxt/jobs/ip-verification-engineer-acl-digital-bengaluru-fb1eb672",
  "https://artha.link/@eanxt/jobs/design-verification-lead-acl-digital-bengaluru-04a316d2",
  "https://artha.link/@eanxt/jobs/formal-verification-engineer-acl-digital-bengaluru-742698b9",
  "https://artha.link/@eanxt/jobs/functional-verification-engineer-acl-digital-bengaluru-8f431ab0",
  "https://artha.link/@eanxt/jobs/rtl-design-engineer-acl-digital-hyderabad-8a221e23",
  "https://artha.link/@eanxt/jobs/senior-rtl-design-engineer-acl-digital-bengaluru-aa945f58",
  "https://artha.link/@eanxt/jobs/verification-lead-acl-digital-hyderabad-c2bfecf9",
  "https://artha.link/@eanxt/jobs/senior-fs-audit-withum-bengaluru-271e50c2",
  "https://artha.link/@eanxt/jobs/senior-verification-engineer-acl-digital-bengaluru-74ab8376",
  "https://artha.link/@eanxt/jobs/noc-verification-engineer-acl-digital-bengaluru-a2f49ed6",
  "https://artha.link/@eanxt/jobs/manager-oil-gas-audit-withum-ahmedabad-36de8267",
  "https://artha.link/@eanxt/jobs/pd-emir-engineer-acl-digital-bengaluru-3c36e88c",
  "https://artha.link/@eanxt/jobs/senior-accountant-nfp-audit-blr-withum-bengaluru-81528b61",
  "https://artha.link/@eanxt/jobs/senior-design-verification-engineer-acl-digital-hyderabad-1454585b",
  "https://artha.link/@eanxt/jobs/staff-level-ii-accountant-1040-hni-tax-withum-bengaluru-54addf4e",
  "https://artha.link/@eanxt/jobs/rtl-design-engineer-acl-digital-hyderabad-a3b2a59a",
  "https://artha.link/@eanxt/jobs/ams-verification-acl-digital-bengaluru-f4f20206",
  "https://artha.link/@eanxt/jobs/lead-rtl-design-engineer-acl-digital-chennai-5f1d0266",
  "https://artha.link/@eanxt/jobs/software-engineer-in-test-arcana-bengaluru-71e90cdc",
  "https://artha.link/@eanxt/jobs/staff-level-ii-accountant-1065-tax-amd-withum-ahmedabad-0b5a9b6f",
  "https://artha.link/@eanxt/jobs/manager-real-estate-tangible-assets-withum-bengaluru-bfb58de8",
  "https://artha.link/@eanxt/jobs/senior-accountant-qubs-kpo-services-ahmedabad-17a067ef",
  "https://artha.link/@eanxt/jobs/ibm-planning-analytics-tm1-support-pepsico-hyderabad-4d848d74",
  "https://artha.link/@eanxt/jobs/senior-accountant-technology-audit-withum-ahmedabad-0fc0c375",
  "https://artha.link/@eanxt/jobs/sales-engineer-pei-genesis-pune-district-5ba31f5e",
  "https://artha.link/@eanxt/jobs/structural-design-engineer-devang-sutaria-mumbai-bd41714d",
  "https://artha.link/@eanxt/jobs/exhibition-sales-manager-b2b-exhibitions-asapp-info-global-mumbai-5cdc0d2b",
  "https://artha.link/@eanxt/jobs/relationship-manager-policybazaar-com-coimbatore-a86aa2b1",
  "https://artha.link/@eanxt/jobs/clinical-data-manager-iqvia-india-bengaluru-824d1b82",
  "https://artha.link/@eanxt/jobs/copywriter-publicis-groupe-mumbai-91e61bbf",
  "https://artha.link/@eanxt/jobs/associate-erp-technical-consultant-highshine-it-chennai-c32f58b4",
  "https://artha.link/@eanxt/jobs/leader-of-silicon-engineering-nvm-mixed-texas-instruments-bengaluru-c031dc98",
  "https://artha.link/@eanxt/jobs/lead-analog-design-engineer-isolation-texas-instruments-bengaluru-8dc62edf",
  "https://artha.link/@eanxt/jobs/seino-mll-logistics-greater-delhi-751447c9",
  "https://artha.link/@eanxt/jobs/senior-rfic-mixed-signal-design-texas-instruments-bengaluru-c1c5dc99",
  "https://artha.link/@eanxt/jobs/physics-teacher-for-international-pion-academy-mumbai-df2ecc9c",
  "https://artha.link/@eanxt/jobs/sales-director-referral-partner-macrohire-india-5e4393ec",
  "https://artha.link/@eanxt/jobs/sap-fico-consultant-ltm-bengaluru-78ef4a8a",
  "https://artha.link/@eanxt/jobs/program-advisor-us-sales-interview-kickstart-india-9e9d383e",
  "https://artha.link/@eanxt/jobs/intern-copy-writing-airlearn-bengaluru-992bf1b0",
  "https://artha.link/@eanxt/jobs/development-engineering-technical-ge-vernova-mumbai-c5fd6412",
  "https://artha.link/@eanxt/jobs/lead-engineer-controls-engineering-ge-vernova-noida-8970f2e2",
  "https://artha.link/@eanxt/jobs/lead-engineer-electrical-component-ge-vernova-bishrakh-307d5202",
  "https://artha.link/@eanxt/jobs/project-plant-lead-engineer-ge-vernova-bishrakh-a8521c39",
  "https://artha.link/@eanxt/jobs/lead-engineer-cyber-security-ge-vernova-bishrakh-74425c02",
  "https://artha.link/@eanxt/jobs/lead-engineer-plant-layout-cabling-ge-vernova-jiyatalavdi-ed793b9c",
  "https://artha.link/@eanxt/jobs/lead-engineer-systems-engineering-ge-vernova-kelambakkam-54dfacfb",
  "https://artha.link/@eanxt/jobs/scientist-procter-gamble-mumbai-8735f6bf",
  "https://artha.link/@eanxt/jobs/medical-manager-procter-gamble-mumbai-20cfa01d",
  "https://artha.link/@eanxt/jobs/r-d-director-procter-gamble-mumbai-df89553d",
  "https://artha.link/@eanxt/jobs/r-d-packaging-leader-procter-gamble-mumbai-bf6aba81",
  "https://artha.link/@eanxt/jobs/distribution-qa-procter-gamble-mumbai-6b79c666",
  "https://artha.link/@eanxt/jobs/associate-business-development-engineer-fm-bangalore-714a3134",
  "https://artha.link/@eanxt/jobs/consultant-engineer-fm-mumbai-4f917828",
  "https://artha.link/@eanxt/jobs/senior-adjuster-fm-mumbai-1d38c502",
  "https://artha.link/@eanxt/jobs/senior-engineer-power-systems-ge-vernova-bengaluru-fd15872b",
  "https://artha.link/@eanxt/jobs/territory-sales-executive-pharma-selling-procter-gamble-mumbai-1ec1b5dc",
  "https://artha.link/@eanxt/jobs/key-account-manager-procter-gamble-mumbai-e57ff63e",
  "https://artha.link/@eanxt/jobs/territory-business-executive-pharma-procter-gamble-mumbai-ad8a4aac",
  "https://artha.link/@eanxt/jobs/inside-sales-associate-medibuddy-medibuddy-indore-madhya-709fc127",
  "https://artha.link/@eanxt/jobs/ot-security-architect-lonza-hyderabad-1037f55b",
  "https://artha.link/@eanxt/jobs/quality-senior-professional-customer-lonza-hyderabad-4f1b4156"
];

  let jobQueue = DEFAULT_QUEUE;
  const BATCH_SIZE = 50;

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
      console.log("%c[Cleanup] Clearing domain cookies, sessionStorage, and localStorage...", "color: #2563eb; font-weight: bold;");
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

    // Restore bot progress index
    saveState(savedState);
    if (!isQuiet) {
      log("Wiped all cookies, localStorage & sessionStorage cleanly!", "#059669");
    }
  }

  // =========================================================================
  // 🎨 PURE WHITE LIGHT THEME HUD (VECTOR SVG ICONS)
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
    broom: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>',
    shield: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
    minimize: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    close: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    info: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',
    chevronRight: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>',
    chevronLeft: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>'
  };

  const hud = document.createElement("div");
  hud.id = "zero-footprint-light-hud";
  hud.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999999;
      width: 400px;
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
              <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; letter-spacing: -0.2px;">ZERO-FOOTPRINT</span>
              <span style="background: #eff6ff; color: #2563eb; font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 5px; border: 1px solid #dbeafe;">PRO</span>
            </div>
            <div style="font-size: 10.5px; color: #64748b; font-weight: 500;">Autonomous 1-by-1 Job Applier</div>
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
          <div>Queue: <b id="zfp-progress-text" style="color: #2563eb; font-weight: 700;">${state.currentIndex} / ${jobQueue.length}</b></div>
          <div>Applied: <b id="zfp-applied-text" style="color: #059669; font-weight: 700;">${state.completedCount}</b></div>
          <div style="grid-column: span 2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #64748b;">
            Active: <span id="zfp-target-text" style="color: #0f172a; font-weight: 600;">${jobQueue[state.currentIndex] ? formatSlug(jobQueue[state.currentIndex]) : 'Ready to start'}</span>
          </div>
        </div>

        <!-- Batch Navigation Selector (Next / Prev Batch Controls) -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px 10px;">
          <button id="zfp-prev-batch-btn" title="Go to Previous Batch" style="display: flex; align-items: center; gap: 3px; background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; padding: 3px 8px; font-size: 10px; cursor: pointer; font-weight: 600;">
            ${ICONS.chevronLeft} Prev 50
          </button>
          
          <div id="zfp-batch-badge" style="font-size: 11px; font-weight: 700; color: #2563eb;">
            Batch ${Math.floor(state.currentIndex / BATCH_SIZE) + 1} / ${Math.ceil(jobQueue.length / BATCH_SIZE)}
          </div>

          <button id="zfp-next-batch-btn" title="Move to Next Batch" style="display: flex; align-items: center; gap: 3px; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 6px; padding: 3px 8px; font-size: 10px; cursor: pointer; font-weight: 700;">
            Next 50 ${ICONS.chevronRight}
          </button>
        </div>

        <!-- Pacing Options -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 11px;">
          <span style="color: #64748b; font-size: 10.5px; font-weight: 500;">Pacing:</span>
          <div style="display: flex; gap: 4px;">
            <button class="zfp-speed-btn" data-speed="fast" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 7px; padding: 3px 8px; font-size: 10px; cursor: pointer; font-weight: 500;">Fast (3s)</button>
            <button class="zfp-speed-btn" data-speed="normal" style="background: #2563eb; color: #ffffff; border: 1px solid #2563eb; border-radius: 7px; padding: 3px 8px; font-size: 10px; cursor: pointer; font-weight: 700; box-shadow: 0 2px 4px rgba(37,99,235,0.2);">Normal (5s)</button>
            <button class="zfp-speed-btn" data-speed="stealth" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 7px; padding: 3px 8px; font-size: 10px; cursor: pointer; font-weight: 500;">Stealth (10s)</button>
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
            <span id="zfp-btn-label">Start Batch ${Math.floor(state.currentIndex / BATCH_SIZE) + 1}</span>
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

        <!-- Dedicated Purge Storage & Cookies Button -->
        <button id="zfp-full-purge-btn" style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #f8fafc;
          color: #475569;
          border: 1px dashed #cbd5e1;
          border-radius: 9px;
          padding: 7px 10px;
          font-size: 10.5px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 8px;
          transition: all 0.2s;
        ">
          ${ICONS.broom} Wipe All Cookies, Session & Local Storage
        </button>

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
        ">Ready. Loaded ${jobQueue.length} jobs across ${Math.ceil(jobQueue.length / BATCH_SIZE)} batches. Click Start or Next 50 to begin.</div>

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
            ${ICONS.info} Batch Navigation Guide:
          </div>
          <div>• <b>Next 50 ▶:</b> Jump directly to Batch 2 (51–100), Batch 3 (101–150)...</div>
          <div>• <b>Auto-Closer:</b> Opens tab, clicks Apply, and closes both tabs.</div>
          <div>• <b>Storage Wipe:</b> Click button above to clear all tracking cookies anytime!</div>
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
    const curBatch = Math.floor(curIndex / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(totalJobs / BATCH_SIZE);
    const percent = Math.min(100, Math.round((curIndex / totalJobs) * 100));

    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.innerText = curIndex + " / " + totalJobs + " (" + percent + "%)";
    if (appliedText) appliedText.innerText = state.completedCount;
    if (batchBadge) batchBadge.innerText = "Batch " + curBatch + " / " + totalBatches;
    if (targetText) {
      targetText.innerText = jobQueue[curIndex] ? ("[" + (curIndex + 1) + "/" + totalJobs + "] " + formatSlug(jobQueue[curIndex])) : "Queue Finished!";
    }
    if (!isRunning && btnLabel) {
      btnLabel.innerText = "Start Batch " + curBatch;
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

  // =========================================================================
  // ⚡ SEQUENTIAL 1-BY-1 TAB ORCHESTRATION & DUAL TAB CLOSER
  // =========================================================================
  async function processNextJob() {
    if (!isRunning || isPaused) return;

    // Check if reached milestone (end of a 50-job batch)
    if (state.currentIndex > 0 && state.currentIndex % BATCH_SIZE === 0 && !state._milestonePassed) {
      state._milestonePassed = true;
      saveState(state);

      const curBatch = Math.floor(state.currentIndex / BATCH_SIZE);
      const nextBatch = curBatch + 1;
      const totalBatches = Math.ceil(jobQueue.length / BATCH_SIZE);

      console.log(
        "%c🎉 [BATCH " + curBatch + " COMPLETED] Finished " + state.currentIndex + " jobs! Purging cookies & storage...",
        "background: #065f46; color: #34d399; font-size: 13px; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
      );
      
      wipeAllStorageAndCookies(true);

      isRunning = false;
      if (btnLabel) btnLabel.innerText = "Start Batch " + nextBatch + " (" + (state.currentIndex + 1) + "–" + Math.min(jobQueue.length, state.currentIndex + BATCH_SIZE) + ")";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) {
        mainActionBtn.style.background = "#059669";
        mainActionBtn.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.3)";
      }
      if (statusDot) statusDot.style.background = "#10b981";
      log("🎉 Batch " + curBatch + " completed! Storage purged. Click button to begin Batch " + nextBatch + " / " + totalBatches, "#059669");
      return;
    } else if (state.currentIndex % BATCH_SIZE !== 0) {
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
        await sleep(1500);
        match = await waitForApplyButton(tab1.document, 9000);
      } catch (pollErr) {
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
    const curBatch = Math.floor(state.currentIndex / BATCH_SIZE) + 1;
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
    isPaused = true;
    const curBatch = Math.floor(state.currentIndex / BATCH_SIZE) + 1;
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
      if (btnLabel) btnLabel.innerText = "Start Batch 1";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) {
        mainActionBtn.style.background = "#2563eb";
        mainActionBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
      }
      log("↺ Progress reset back to Job #1 (Batch 1).", "#e11d48");
    }
  }

  function moveToNextBatch() {
    const currentBatch = Math.floor(state.currentIndex / BATCH_SIZE);
    const nextIndex = (currentBatch + 1) * BATCH_SIZE;
    if (nextIndex < jobQueue.length) {
      isRunning = false;
      isPaused = false;
      state.currentIndex = nextIndex;
      saveState(state);
      wipeAllStorageAndCookies(true);
      updateUI();
      log("⏩ Moved to Batch " + (Math.floor(nextIndex / BATCH_SIZE) + 1) + " (Starting from Job " + (nextIndex + 1) + "). Storage purged.", "#2563eb");
    } else {
      alert("Already at the final batch!");
    }
  }

  function moveToPrevBatch() {
    const currentBatch = Math.floor(state.currentIndex / BATCH_SIZE);
    const prevIndex = Math.max(0, (currentBatch - 1) * BATCH_SIZE);
    isRunning = false;
    isPaused = false;
    state.currentIndex = prevIndex;
    saveState(state);
    wipeAllStorageAndCookies(true);
    updateUI();
    log("⏪ Moved to Batch " + (Math.floor(prevIndex / BATCH_SIZE) + 1) + " (Starting from Job " + (prevIndex + 1) + "). Storage purged.", "#2563eb");
  }

  mainActionBtn.addEventListener("click", toggleMainAction);
  document.getElementById("zfp-skip-btn").addEventListener("click", skipJob);
  document.getElementById("zfp-reset-btn").addEventListener("click", resetProgress);
  document.getElementById("zfp-next-batch-btn").addEventListener("click", moveToNextBatch);
  document.getElementById("zfp-prev-batch-btn").addEventListener("click", moveToPrevBatch);
  document.getElementById("zfp-full-purge-btn").addEventListener("click", () => wipeAllStorageAndCookies(false));

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
    nextBatch: moveToNextBatch,
    prevBatch: moveToPrevBatch,
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
    "%c📋 Total Queued: %c" + jobQueue.length + " openings across " + Math.ceil(jobQueue.length / BATCH_SIZE) + " batches\n" +
    "%c💾 Saved Progress: %cJob " + (state.currentIndex + 1) + " (Batch " + (Math.floor(state.currentIndex / BATCH_SIZE) + 1) + ") | Applied: " + state.completedCount + "\n" +
    "%c⏩ Batch Controls: %cClick 'Next 50 ▶' or 'Prev 50 ◀' on HUD to jump batches\n" +
    "%c🧹 Storage Purge: %cClick 'Wipe Storage' button to purge cookies & storage instantly\n" +
    "%c💡 Instructions: Click 'Start Batch " + (Math.floor(state.currentIndex / BATCH_SIZE) + 1) + "' on HUD or call window.__AUTO_APPLIER__.start()",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #334155; font-style: italic;"
  );
})();
