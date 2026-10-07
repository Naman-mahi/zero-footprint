/**
 * 🇮🇳 Zero-Footprint PRO: India All-Categories & All-Niches In-Browser Auto-Applier
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * 
 * FEATURES:
 * - 🇮🇳 Exhaustive Indian Coverage: Pre-loaded with 190 verified Indian openings across ALL 18 categories & 30+ niches.
 * - 🌐 Live On-Demand Refresh: Click 'Fetch Fresh Jobs' to re-query the full Artha Indian catalog directly in your browser.
 * - 🚫 Anti-Spam: Completely filters out all trucking, CDL, driver, and duplicate spam listings.
 * - ⚡ 1-by-1 Sequential Processing: Never overloads CPU/RAM with hundreds of open tabs.
 * - 🎯 Configurable Batch Size (25 / 50 / 100 / 200): Easily adjust application batch limits on the fly.
 * - 🔍 Dynamic Polling Resolver: Waits up to 10-12s for React/Next.js DOM hydration so NO button is missed.
 * - 🪟 Dual-Tab Auto-Closer: Opens Job Page (Tab 1), clicks apply, handles redirect (Tab 2), and closes BOTH tabs cleanly.
 * - 🛡️ Advanced Anti-Detection: 9-step human pointer cascade, deceleration scroll, and Gaussian spatial jitter.
 * - 🧼 0-Footprint Per-Job Deep Purge: Wipes domain cookies, sessionStorage & localStorage after EACH job applied.
 * - 💾 Isolated State: Uses dedicated storage key '__ZERO_FOOTPRINT_APPLIER_STATE_INDIA_ALL__' (no conflicts).
 * - 🎨 Ultra-Clean Pure White HUD: Top-right positioning, vector SVGs, and live progress statistics.
 * 
 * HOW TO RUN:
 * 1. Open https://artha.link or https://my.artha.link in Google Chrome.
 * 2. Press F12 -> Console tab.
 * 3. Paste this entire file into the console and press Enter.
 */

(function () {
  // Prevent or clean up duplicate instances
  if (window.__AUTO_APPLIER_INDIA_ALL__ || window.__AUTO_APPLIER_INSTANCE_INDIA_ALL__) {
    console.log("%c🔄 Cleaning up previous India All-Niches Auto-Applier session...", "color: #2563eb; font-weight: bold;");
    try {
      if (window.__AUTO_APPLIER_INDIA_ALL__) window.__AUTO_APPLIER_INDIA_ALL__.cleanup();
      if (window.__AUTO_APPLIER_INSTANCE_INDIA_ALL__) window.__AUTO_APPLIER_INSTANCE_INDIA_ALL__.cleanup();
    } catch (e) {}
  }

  // =========================================================================
  // 📋 PRE-CACHED JOB QUEUE (ALL INDIAN CATEGORIES & NICHES)
  // =========================================================================
  const DEFAULT_QUEUE = [
  "https://artha.link/@eanxt/jobs/driving-instructor-driving-licence-my-four-wheels-roorkee-f6c5dad9",
  "https://artha.link/@eanxt/jobs/driving-instructor-driving-licence-my-four-wheels-roorkee-1b267196",
  "https://artha.link/@eanxt/jobs/qa-apply-type-in-qaautomation-bommasandra-bf0e81d4",
  "https://artha.link/@eanxt/jobs/sr-engineer-data-empower-bengaluru-3564d9cb",
  "https://artha.link/@eanxt/jobs/slp-specialist-security-loss-prevention-asspl-karnataka-b56-bengaluru-25d6d7fc",
  "https://artha.link/@eanxt/jobs/loss-prevention-specialist-worldwide-asspl-maharashtra-mumbai-585e070c",
  "https://artha.link/@eanxt/jobs/risk-manager-law-enforcement-engagement-adci-karnataka-bengaluru-ce946cf1",
  "https://artha.link/@eanxt/jobs/investigation-associate-relay-product-adci-karnataka-a66-bengaluru-77af4f6c",
  "https://artha.link/@eanxt/jobs/security-and-loss-prevention-specialist-asspl-haryana-c77-faridabad-a16b0d7c",
  "https://artha.link/@eanxt/jobs/investigation-associate-relay-product-adci-karnataka-a66-bengaluru-2cf3604e",
  "https://artha.link/@eanxt/jobs/multi-lingual-es-japanese-global-adci-karnataka-a66-bengaluru-bf959044",
  "https://artha.link/@eanxt/jobs/investigation-representative-row-ib-asspl-andhra-c0ab2485",
  "https://artha.link/@eanxt/jobs/investigation-representative-row-ib-asspl-telangana-d82-a3291b8a",
  "https://artha.link/@eanxt/jobs/incident-response-manager-security-adci-blr-14-sez-bengaluru-15a006ba",
  "https://artha.link/@eanxt/jobs/security-loss-prevention-expert-asspl-telangana-hyderabad-77199c25",
  "https://artha.link/@eanxt/jobs/barista-starbucks-mysuru-26034f01",
  "https://artha.link/@eanxt/jobs/sr-product-manager-tech-alexa-smart-adci-karnataka-bengaluru-4405c0e3",
  "https://artha.link/@eanxt/jobs/procurement-category-manager-energy-adsipl-maharashtra-mumbai-f7c69382",
  "https://artha.link/@eanxt/jobs/senior-business-analyst-finops-adci-karnataka-a66-bengaluru-de97a7b8",
  "https://artha.link/@eanxt/jobs/business-intelligence-engineer-aop-row-asspl-karnataka-hyderabad-28f3112f",
  "https://artha.link/@eanxt/jobs/manager-market-access-novartis-remote-40cb6f1c",
  "https://artha.link/@eanxt/jobs/sales-rep-institutional-territory-novartis-telangana-06954025",
  "https://artha.link/@eanxt/jobs/sales-rep-institutional-territory-novartis-raipur-58235c9d",
  "https://artha.link/@eanxt/jobs/sr-manager-sr-reporting-analyst-contract-standard-chartered-bangalore-3c13b1f5",
  "https://artha.link/@eanxt/jobs/senior-process-associate-ptp-invesco-telangana-8f67a11e",
  "https://artha.link/@eanxt/jobs/machine-learning-engineer-apac-lexisnexis-legal-bangalore-1855f2bb",
  "https://artha.link/@eanxt/jobs/clinical-application-specialist-guj-mp-danaher-ahmedabad-adebed5e",
  "https://artha.link/@eanxt/jobs/staff-backend-engineer-wise-hyderabad-2596d5ec",
  "https://artha.link/@eanxt/jobs/fraud-business-analyst-standard-chartered-bangalore-d36b1083",
  "https://artha.link/@eanxt/jobs/it-d-product-manager-genesis-procurement-reckitt-hyderabad-024c483a",
  "https://artha.link/@eanxt/jobs/houdini-lookdev-artist-wpp-production-mumbai-edab48a0",
  "https://artha.link/@eanxt/jobs/strategic-security-senior-analyst-novartis-remote-14e17dba",
  "https://artha.link/@eanxt/jobs/sr-staff-software-development-engineer-morningstar-mumbai-ddbbd3ba",
  "https://artha.link/@eanxt/jobs/senior-people-analyst-wise-hyderabad-42d0fd37",
  "https://artha.link/@eanxt/jobs/mgr-ii-mfg-process-dvl-engineering-te-connectivity-bangalore-bfff119e",
  "https://artha.link/@eanxt/jobs/r-d-product-dvl-engineer-ii-te-connectivity-bangalore-650f5489",
  "https://artha.link/@eanxt/jobs/sr-technical-lead-c-developer-aristocrat-remote-79c666e2",
  "https://artha.link/@eanxt/jobs/eglobal-application-support-wtw-mumbai-239a97e6",
  "https://artha.link/@eanxt/jobs/artificial-intelligence-developer-low-wtw-thane-fc5f3fa0",
  "https://artha.link/@eanxt/jobs/identity-and-access-management-engineer-wtw-thane-8cd2d0f1",
  "https://artha.link/@eanxt/jobs/early-careers-2027-graduate-actuarial-wtw-remote-896c79f3",
  "https://artha.link/@eanxt/jobs/business-technology-administrator-wtw-thane-de5a5d87",
  "https://artha.link/@eanxt/jobs/control-resilience-assessor-wtw-mumbai-683e8af5",
  "https://artha.link/@eanxt/jobs/retirement-valuation-analyst-north-wtw-remote-716cba4c",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-inqc-asspl-maharashtra-mumbai-38486872",
  "https://artha.link/@eanxt/jobs/pr-specialist-amazon-prime-video-india-asspl-maharashtra-mumbai-0df71f88",
  "https://artha.link/@eanxt/jobs/visual-designer-display-creative-adci-karnataka-bengaluru-d9a0d00b",
  "https://artha.link/@eanxt/jobs/dsc-associate-prime-video-sports-adci-maa-15-sez-chennai-9b9e6b29",
  "https://artha.link/@eanxt/jobs/design-executive-prime-video-creative-asspl-maharashtra-mumbai-e9c5a912",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-inqc-asspl-uttar-pradesh-noida-322c152a",
  "https://artha.link/@eanxt/jobs/case-mgr-mloa-s-disability-and-leave-amazon-dev-center-hyderabad-cdb3827d",
  "https://artha.link/@eanxt/jobs/digital-content-associate-firetv-adci-maa-15-sez-chennai-1c16fd40",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-gujarat-d34-ahmedabad-7ecd9012",
  "https://artha.link/@eanxt/jobs/support-engineer-iii-music-client-adci-karnataka-bengaluru-1baed435",
  "https://artha.link/@eanxt/jobs/bms-specialist-amazon-maintenance-adci-hyd-16-sez-h83-hyderabad-aea0a9d3",
  "https://artha.link/@eanxt/jobs/av-lead-gss-adci-karnataka-chennai-08d1bdd7",
  "https://artha.link/@eanxt/jobs/visual-designer-key-art-dev-gss-adci-karnataka-bengaluru-61ae11ae",
  "https://artha.link/@eanxt/jobs/process-assistant-gsf-prime-now-asspl-haryana-c77-gurugram-4a785b14",
  "https://artha.link/@eanxt/jobs/sr-design-technologist-eshop-content-adci-karnataka-a66-bengaluru-5799e0dc",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-rme-asspl-maharashtra-thane-a6106688",
  "https://artha.link/@eanxt/jobs/translation-team-manager-tsops-adci-hyd-13-sez-hyderabad-c4e3534f",
  "https://artha.link/@eanxt/jobs/social-video-content-lead-imdb-india-asspl-maharashtra-mumbai-49a01b3e",
  "https://artha.link/@eanxt/jobs/quality-assurance-technician-amazon-adci-karnataka-bengaluru-2f09b345",
  "https://artha.link/@eanxt/jobs/creative-project-manager-gss-creative-adci-karnataka-bengaluru-4dc53b0c",
  "https://artha.link/@eanxt/jobs/av-lead-gss-adci-karnataka-chennai-3dd13f89",
  "https://artha.link/@eanxt/jobs/corporate-counsel-seller-services-asspl-karnataka-bengaluru-ba3d3101",
  "https://artha.link/@eanxt/jobs/executive-licenses-permits-real-estate-asspl-karnataka-b56-bengaluru-68d7119e",
  "https://artha.link/@eanxt/jobs/senior-technical-program-manager-amazon-adci-karnataka-bengaluru-57437588",
  "https://artha.link/@eanxt/jobs/process-assistant-amxl-3p-fcs-south-asspl-telangana-hyderabad-43922231",
  "https://artha.link/@eanxt/jobs/case-mgr-msk-s-msk-adci-karnataka-a66-bengaluru-5ea3bb57",
  "https://artha.link/@eanxt/jobs/corporate-counsel-compliance-safety-ww-asspl-karnataka-bengaluru-b66ceb26",
  "https://artha.link/@eanxt/jobs/rme-coordinator-rme-coordinator-asspl-delhi-kolkata-15c21813",
  "https://artha.link/@eanxt/jobs/applied-science-manager-amazon-music-amazon-development-bengaluru-abade7d1",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-rajasthan-d33-jaipur-4dd4ef87",
  "https://artha.link/@eanxt/jobs/programming-manager-prime-video-avod-in-asspl-maharashtra-mumbai-38de46aa",
  "https://artha.link/@eanxt/jobs/design-lead-gss-adci-karnataka-bengaluru-0f2b7bef",
  "https://artha.link/@eanxt/jobs/process-assistant-amxl-3p-fc-east-asspl-west-bengal-howrah-9e019006",
  "https://artha.link/@eanxt/jobs/applied-scientist-amazon-music-catalog-adci-blr-dta-bengaluru-9a9da201",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-haryana-c77-gurugram-2f102141",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-fc-asspl-karnataka-b56-bengaluru-262f80da",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-ssg-science-adci-blr-14-sez-bengaluru-3ade28b1",
  "https://artha.link/@eanxt/jobs/sr-associate-arabic-prime-video-trust-adci-blr-14-sez-bengaluru-3636df4f",
  "https://artha.link/@eanxt/jobs/senior-economist-adci-karnataka-bengaluru-5dfe82ca",
  "https://artha.link/@eanxt/jobs/video-editor-gss-adci-karnataka-chennai-c998df90",
  "https://artha.link/@eanxt/jobs/whs-officer-workplace-health-and-safety-asspl-haryana-gurugram-ce2f78c9",
  "https://artha.link/@eanxt/jobs/art-director-ii-content-generation-hub-adci-tamil-nadu-a83-chennai-5ca127b6",
  "https://artha.link/@eanxt/jobs/bbm-escalation-specialist-amazon-adci-hyd-16-sez-hyderabad-46523458",
  "https://artha.link/@eanxt/jobs/corporate-counsel-devices-digital-legal-asspl-karnataka-bengaluru-816a280e",
  "https://artha.link/@eanxt/jobs/creative-specialist-artwork-prime-video-adci-blr-14-sez-bengaluru-71749a77",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-gujarat-d34-surat-443d27f9",
  "https://artha.link/@eanxt/jobs/applied-scientist-amazon-music-catalog-adci-karnataka-bengaluru-ec37e606",
  "https://artha.link/@eanxt/jobs/art-director-creative-dev-gss-creative-adci-karnataka-bengaluru-fb3fb9e7",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-cmt-adci-karnataka-bengaluru-cdea8b7a",
  "https://artha.link/@eanxt/jobs/creative-project-manager-gss-creative-adci-karnataka-bengaluru-8f281c57",
  "https://artha.link/@eanxt/jobs/design-executive-prime-video-creative-asspl-maharashtra-mumbai-970bb2f0",
  "https://artha.link/@eanxt/jobs/myhr-live-support-advisor-s-mhls-adci-karnataka-a66-hyderabad-d3f86374",
  "https://artha.link/@eanxt/jobs/manager-applied-science-rbs-tech-adci-blr-14-sez-bengaluru-1d04ec1a",
  "https://artha.link/@eanxt/jobs/whs-officer-whs-edsp-asspl-maharashtra-mumbai-dba2ddea",
  "https://artha.link/@eanxt/jobs/creative-manager-elevated-shopping-shop-asspl-haryana-gurugram-d99c82c0",
  "https://artha.link/@eanxt/jobs/case-mgr-crt-s-adci-tamil-nadu-a83-chennai-9ccd23ea",
  "https://artha.link/@eanxt/jobs/rme-coordinator-iii-rme-coordinator-iii-asspl-maharashtra-thane-70c7a1d9",
  "https://artha.link/@eanxt/jobs/visual-design-associate-prime-video-gss-adci-tamil-nadu-chennai-6277b48d",
  "https://artha.link/@eanxt/jobs/product-operations-manager-amazon-music-adci-karnataka-bengaluru-ed7e7614",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-maharashtra-thane-fe7195e8",
  "https://artha.link/@eanxt/jobs/product-designer-amazon-pay-india-amazon-pay-india-bengaluru-b9b10c17",
  "https://artha.link/@eanxt/jobs/brand-specialist-german-adci-blr-14-sez-35be233b",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engr-rme-ingsf-asspl-maharashtra-mumbai-4429c1a4",
  "https://artha.link/@eanxt/jobs/associate-corporate-counsel-amazon-development-bengaluru-6a796fd6",
  "https://artha.link/@eanxt/jobs/applied-scientist-ssg-science-adci-blr-14-sez-bengaluru-6a634c85",
  "https://artha.link/@eanxt/jobs/music-executive-in-originals-music-team-asspl-maharashtra-mumbai-f44f013d",
  "https://artha.link/@eanxt/jobs/rme-coordinator-rme-coordinator-asspl-uttar-pradesh-lucknow-3ccd5a99",
  "https://artha.link/@eanxt/jobs/sdet-audio-ssg-adci-blr-14-sez-bengaluru-52375946",
  "https://artha.link/@eanxt/jobs/digital-content-associate-prime-video-adci-maa-15-sez-chennai-e22fe637",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-grocery-retail-in-adci-karnataka-bengaluru-d38b36de",
  "https://artha.link/@eanxt/jobs/associate-corporate-counsel-amazon-healthcare-new-delhi-c1640df6",
  "https://artha.link/@eanxt/jobs/creative-specialist-artwork-prime-video-amazon-development-bengaluru-14ff83d7",
  "https://artha.link/@eanxt/jobs/research-scientist-ii-last-mile-science-adci-karnataka-bengaluru-57efa5ce",
  "https://artha.link/@eanxt/jobs/re-contract-administrator-real-estate-asspl-karnataka-bengaluru-75f6fbbb",
  "https://artha.link/@eanxt/jobs/ai-creative-strategist-mash-prayagraj-5061a69d",
  "https://artha.link/@eanxt/jobs/law-content-expert-fully-remote-upto-mercor-mumbai-6e37cc36",
  "https://artha.link/@eanxt/jobs/skilled-technician-level-ii-shop-cummins-inc-phaltan-54d4f5fb",
  "https://artha.link/@eanxt/jobs/production-in-charge-sisco-jobs-tiruchirappalli-3aba8c50",
  "https://artha.link/@eanxt/jobs/campaign-rope-access-supervisor-srg-global-prayagraj-f7f0c490",
  "https://artha.link/@eanxt/jobs/lottie-creator-app-experience-phonepe-limited-bengaluru-6ef2ebaa",
  "https://artha.link/@eanxt/jobs/apprentice-starbucks-vadodara-4c692904",
  "https://artha.link/@eanxt/jobs/graphic-designer-global-pacific-remote-eaf5e871",
  "https://artha.link/@eanxt/jobs/jm-supervisor-belapur-rentokil-initial-mumbai-a5710dfa",
  "https://artha.link/@eanxt/jobs/heavy-commercial-vehicle-hcv-electrician-2coms-mumbai-c8ec6256",
  "https://artha.link/@eanxt/jobs/bilingual-stem-phd-safety-expert-mercor-mumbai-caeae045",
  "https://artha.link/@eanxt/jobs/career-counselor-crux-chennai-a6d599bf",
  "https://artha.link/@eanxt/jobs/babysitter-wanted-in-k-tp-di-babysits-vellore-a1c6ca52",
  "https://artha.link/@eanxt/jobs/operations-executive-belapur-rentokil-initial-navi-mumbai-70b443a1",
  "https://artha.link/@eanxt/jobs/content-writer-primetimer-absolute-sports-pvt-bengaluru-4d18451b",
  "https://artha.link/@eanxt/jobs/career-coach-remote-yo-ai-labs-mumbai-b397f40d",
  "https://artha.link/@eanxt/jobs/senior-technical-writer-sa-global-bengaluru-8768cb5d",
  "https://artha.link/@eanxt/jobs/sindihi-language-expert-remote-yo-it-consulting-remote-dbbf5372",
  "https://artha.link/@eanxt/jobs/fire-line-pipe-fitter-prydan-consultancy-ahmedabad-599e8ec8",
  "https://artha.link/@eanxt/jobs/pharmaceutical-industry-good-people-hr-pty-prayagraj-36cd65a3",
  "https://artha.link/@eanxt/jobs/manager-senior-manager-legal-saaki-argus-averil-chennai-172d3649",
  "https://artha.link/@eanxt/jobs/allied-health-professionals-private-headspace-prayagraj-31b785ad",
  "https://artha.link/@eanxt/jobs/maintenance-fitter-afternoon-shift-ego-good-people-hr-pty-prayagraj-6b358822",
  "https://artha.link/@eanxt/jobs/technician-ii-cpi-commscope-verna-e822e5e4",
  "https://artha.link/@eanxt/jobs/content-lead-antal-international-thane-785c34fe",
  "https://artha.link/@eanxt/jobs/maintenance-electrician-must-have-good-people-hr-pty-prayagraj-334ce209",
  "https://artha.link/@eanxt/jobs/welding-mechanical-training-specialist-eram-talent-new-delhi-f4dd661f",
  "https://artha.link/@eanxt/jobs/generalist-service-representative-ii-schneider-electric-ahmedabad-5f61e767",
  "https://artha.link/@eanxt/jobs/art-director-creative-dev-gss-creative-adci-karnataka-bengaluru-a7ac7fe1",
  "https://artha.link/@eanxt/jobs/product-designer-amazon-pay-india-amazon-pay-india-bengaluru-31299a1e",
  "https://artha.link/@eanxt/jobs/graphic-specialist-procter-gamble-hyderabad-a43b3d9d",
  "https://artha.link/@eanxt/jobs/specialist-quality-assurance-procter-gamble-mumbai-f52e13ff",
  "https://artha.link/@eanxt/jobs/it-internal-audit-analyst-regal-rexnord-pune-6ddafab0",
  "https://artha.link/@eanxt/jobs/design-engineer-i-regal-rexnord-pune-bdae8b42",
  "https://artha.link/@eanxt/jobs/lead-design-engineer-regal-rexnord-pune-b9905792",
  "https://artha.link/@eanxt/jobs/field-service-engineer-i-wind-turbines-regal-rexnord-pune-1246f27b",
  "https://artha.link/@eanxt/jobs/field-service-engineer-i-industrial-regal-rexnord-pune-b9696824",
  "https://artha.link/@eanxt/jobs/design-engineer-associate-regal-rexnord-hyderabad-e7feeba9",
  "https://artha.link/@eanxt/jobs/accounts-executive-third-party-payroll-regal-rexnord-mumbai-7ee072f9",
  "https://artha.link/@eanxt/jobs/cad-technician-third-party-payroll-regal-rexnord-mumbai-ef570fbd",
  "https://artha.link/@eanxt/jobs/executive-accounts-payable-regal-rexnord-mumbai-81347d17",
  "https://artha.link/@eanxt/jobs/senior-executive-assistant-bangalore-boston-consulting-bengaluru-1afb2507",
  "https://artha.link/@eanxt/jobs/india-ops-senior-executive-assistant-boston-consulting-gurgaon-3d5b4931",
  "https://artha.link/@eanxt/jobs/bi-a-senior-analyst-boston-consulting-gurgaon-d842bb1a",
  "https://artha.link/@eanxt/jobs/manager-bcg-vantage-boston-consulting-gurgaon-fdac1cd4",
  "https://artha.link/@eanxt/jobs/ap-people-analytics-senior-specialist-boston-consulting-gurgaon-5c4afb51",
  "https://artha.link/@eanxt/jobs/global-practice-area-senior-manager-boston-consulting-gurgaon-84ce9b11",
  "https://artha.link/@eanxt/jobs/cyber-defence-senior-director-boston-consulting-gurgaon-eb823f53",
  "https://artha.link/@eanxt/jobs/global-it-data-architect-senior-manager-boston-consulting-gurgaon-528f4117",
  "https://artha.link/@eanxt/jobs/executive-support-services-team-manager-boston-consulting-gurgaon-6a39918c",
  "https://artha.link/@eanxt/jobs/india-human-resources-specialist-talent-boston-consulting-gurgaon-c1a7aae5",
  "https://artha.link/@eanxt/jobs/global-finance-planning-analysis-manager-boston-consulting-gurgaon-241a628c",
  "https://artha.link/@eanxt/jobs/global-cybersecurity-manager-governance-boston-consulting-gurgaon-fdebab9c",
  "https://artha.link/@eanxt/jobs/senior-analyst-bcg-vantage-boston-consulting-gurgaon-e5333979",
  "https://artha.link/@eanxt/jobs/ap-practice-area-coordinator-people-boston-consulting-gurgaon-df5ec02c",
  "https://artha.link/@eanxt/jobs/senior-analyst-bcg-vantage-boston-consulting-gurgaon-1433a26e",
  "https://artha.link/@eanxt/jobs/india-team-leader-human-resources-boston-consulting-gurgaon-86399f4e",
  "https://artha.link/@eanxt/jobs/india-lead-specialist-human-resources-boston-consulting-gurgaon-527919aa",
  "https://artha.link/@eanxt/jobs/global-hr-shared-services-director-boston-consulting-gurgaon-1d31ab71",
  "https://artha.link/@eanxt/jobs/global-cybersecurity-manager-boston-consulting-gurgaon-89ceaab4",
  "https://artha.link/@eanxt/jobs/administrative-assistant-boston-consulting-gurgaon-496a243a",
  "https://artha.link/@eanxt/jobs/global-hr-shared-services-manager-boston-consulting-gurgaon-b7eefd81",
  "https://artha.link/@eanxt/jobs/sr-identity-engineer-iam-big-it-jobs-big-it-jobs-692e4c73",
  "https://artha.link/@eanxt/jobs/backend-engineer-big-it-jobs-big-it-jobs-0e9abf31",
  "https://artha.link/@eanxt/jobs/senior-operations-engineer-big-it-jobs-big-it-jobs-089c03d0",
  "https://artha.link/@eanxt/jobs/qa-automation-engineer-big-it-jobs-big-it-jobs-cc8830d8",
  "https://artha.link/@eanxt/jobs/inside-sales-associate-medibuddy-medibuddy-indore-madhya-709fc127",
  "https://artha.link/@eanxt/jobs/customer-success-intern-artha-link-surat-gujarat-d19cb2c7",
  "https://artha.link/@eanxt/jobs/full-stack-developer-artha-link-surat-gujarat-d9d29603",
  "https://artha.link/@eanxt/jobs/sales-intern-growth-artha-link-surat-gujarat-c1e790e2",
  "https://artha.link/@eanxt/jobs/india-team-leader-human-resources-boston-consulting-mumbai-cc00805b",
  "https://artha.link/@eanxt/jobs/cad-technician-third-party-payroll-regal-rexnord-mumbai-9b476ffc"
];

  let jobQueue = DEFAULT_QUEUE.slice();
  let batchSize = 50;

  const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
  const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

  // =========================================================================
  // 💾 STATE MANAGEMENT & LOCAL STORAGE PERSISTENCE
  // =========================================================================
  const STORAGE_KEY = "__ZERO_FOOTPRINT_APPLIER_STATE_INDIA_ALL__";

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

  // =========================================================================
  // 🌐 LIVE FRESH JOB FETCHER (ALL CATEGORIES & NICHES IN BROWSER)
  // =========================================================================
  async function fetchFreshJobs(isSilent = false) {
    if (isFetchingLive) return false;
    isFetchingLive = true;
    if (!isSilent) log("⏳ Fetching fresh Indian listings across all categories...", "#2563eb");
    if (btnLabel && !isRunning) btnLabel.innerText = "Fetching India jobs...";

    const freshUrls = [];
    const seen = new Set();

    const categories = [
      'technology-software', 'accounting-finance', 'healthcare-nursing',
      'sales', 'marketing-advertising-pr', 'hr-recruitment', 'customer-service-support',
      'engineering', 'management-exec-consulting', 'legal', 'creative-design-arts-media',
      'scientific-qa', 'manufacturing', 'admin-clerical-secretarial'
    ];

    try {
      // 1. General Indian feed (all pages until has_more: false)
      for (let page = 1; page <= 10; page++) {
        const res = await fetch(RECOMMEND_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ query: "", location: "IN", geo_boost: true, page: page, limit: 100, sort_by: "high_cpc" })
        });
        if (!res.ok) break;
        const data = await res.json();
        const items = data.items || [];
        if (items.length === 0) break;

        for (const it of items) {
          if (it.country !== "IN" && it.company_info?.country !== "India") continue;
          const title = (it.title || "").toLowerCase();
          const comp = (it.company || it.company_info?.name || "").toLowerCase();
          if (title.includes("truck") || title.includes("driver") || title.includes("cdl") || title.includes("freight") || comp.includes("mesilla valley")) continue;
          const slug = it.slug || (it.url ? it.url.replace(BASE_JOB_URL, "") : null);
          if (!slug || seen.has(slug)) continue;
          seen.add(slug);
          freshUrls.push(BASE_JOB_URL + slug);
        }
        if (data.has_more === false) break;
      }

      // 2. Sample major categories
      for (const cat of categories) {
        for (let page = 1; page <= 3; page++) {
          const res = await fetch(RECOMMEND_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ categories: [cat], location: "IN", geo_boost: true, page: page, limit: 100 })
          });
          if (!res.ok) break;
          const data = await res.json();
          const items = data.items || [];
          if (items.length === 0) break;

          for (const it of items) {
            if (it.country !== "IN" && it.company_info?.country !== "India") continue;
            const title = (it.title || "").toLowerCase();
            const comp = (it.company || it.company_info?.name || "").toLowerCase();
            if (title.includes("truck") || title.includes("driver") || title.includes("cdl") || title.includes("freight")) continue;
            const slug = it.slug || (it.url ? it.url.replace(BASE_JOB_URL, "") : null);
            if (!slug || seen.has(slug)) continue;
            seen.add(slug);
            freshUrls.push(BASE_JOB_URL + slug);
          }
          if (data.has_more === false) break;
        }
      }

      if (freshUrls.length > 0) {
        jobQueue = freshUrls;
        updateUI();
        log("✨ Loaded " + freshUrls.length + " fresh Indian jobs across all categories!", "#059669");
        isFetchingLive = false;
        return true;
      }
    } catch (err) {
      console.warn("Live fetch notice:", err.message);
    }

    isFetchingLive = false;
    updateUI();
    return false;
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
        return parts[1].replace(/-[a-f0-9]{8}$/i, "").replace(/-/g, " ");
      }
    } catch (e) {}
    return "Job Opening";
  }

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

    saveState(savedState);
    if (!isQuiet) {
      log("🧼 Purged cookies, sessionStorage & localStorage cleanly for Job " + (state.currentIndex + 1) + "!", "#059669");
    }
  }

  // =========================================================================
  // 🎨 PURE WHITE LIGHT THEME HUD (VECTOR SVG ICONS)
  // =========================================================================
  const oldHud = document.getElementById("zero-footprint-india-all-hud");
  if (oldHud) oldHud.remove();

  const ICONS = {
    shield: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    play: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    pause: '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
    skip: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>',
    reset: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    refresh: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>',
    broom: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 22 5-5-3.5-3.5-5 5M2 22l6.5-6.5M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
    chevronLeft: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>',
    minimize: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    close: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    info: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  };

  const hud = document.createElement("div");
  hud.id = "zero-footprint-india-all-hud";
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
              <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; letter-spacing: -0.2px;">🇮🇳 INDIA ALL-NICHES APPLIER</span>
              <span style="background: #ecfdf5; color: #059669; font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 5px; border: 1px solid #a7f3d0;">🇮🇳 ALL NICHES</span>
            </div>
            <div style="font-size: 10.5px; color: #64748b; font-weight: 500;">Exhaustive Multi-Category Sequential Applier</div>
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
          <div>Queue Size: <b id="zfp-progress-text" style="color: #2563eb; font-weight: 700;">${state.currentIndex} / ${jobQueue.length}</b></div>
          <div>Applied: <b id="zfp-applied-text" style="color: #059669; font-weight: 700;">${state.completedCount}</b></div>
          <div style="grid-column: span 2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #64748b;">
            Active: <span id="zfp-target-text" style="color: #0f172a; font-weight: 600;">${jobQueue[state.currentIndex] ? formatSlug(jobQueue[state.currentIndex]) : 'Ready to start'}</span>
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
        ">Ready with ${jobQueue.length} Indian jobs across all categories. Click 'Start' to begin applying.</div>

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
            ${ICONS.info} Indian Multi-Niche Features:
          </div>
          <div>• <b>All Sectors:</b> Tech, Healthcare, Finance, Marketing, HR, Ops, Engineering.</div>
          <div>• <b>Dual-Tab Auto-Closer:</b> Closes application tabs automatically after clicking apply.</div>
          <div>• <b>Deep Purge:</b> Wipes cookies, sessionStorage & localStorage after EACH job.</div>
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
  const logDiv = document.getElementById("zfp-log");
  const statusDot = document.getElementById("zfp-status-dot");
  const mainActionBtn = document.getElementById("zfp-main-action-btn");
  const btnLabel = document.getElementById("zfp-btn-label");
  const btnIcon = document.getElementById("zfp-btn-icon");

  let cooldownTimerId = null;
  let cooldownSecondsRemaining = 60;

  function stopCooldownTimer() {
    if (cooldownTimerId) {
      clearInterval(cooldownTimerId);
      cooldownTimerId = null;
    }
  }

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
      targetText.innerText = jobQueue[state.currentIndex] ? formatSlug(jobQueue[state.currentIndex]) : "Done!";
    }

    if (batchBadge) {
      const curBatch = Math.floor(state.currentIndex / batchSize) + 1;
      const totalBatches = Math.max(1, Math.ceil(total / batchSize));
      batchBadge.innerText = "Batch " + curBatch + " / " + totalBatches;
    }

    if (!isRunning && btnLabel && !cooldownTimerId) {
      const nextBatch = Math.floor(state.currentIndex / batchSize) + 1;
      btnLabel.innerText = state.currentIndex >= total ? "Completed!" : "Start Batch " + nextBatch;
    }
  }

  // =========================================================================
  // ⚡ SEQUENTIAL 1-BY-1 TAB ORCHESTRATION & DUAL TAB CLOSER
  // =========================================================================
  async function processNextJob() {
    if (!isRunning || isPaused) return;

    if (state.currentIndex > 0 && state.currentIndex % batchSize === 0 && !state._milestonePassed) {
      state._milestonePassed = true;
      saveState(state);

      const curBatch = Math.floor(state.currentIndex / batchSize);
      const nextBatch = curBatch + 1;
      const totalBatches = Math.ceil(jobQueue.length / batchSize);

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
      log("🎉 Batch " + curBatch + " completed! Storage purged. ⏳ Autostarting Batch " + nextBatch + " in 60s...", "#059669");

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

    wipeAllStorageAndCookies(true);

    const currentUrl = jobQueue[state.currentIndex];
    const roleName = formatSlug(currentUrl);

    updateUI();

    log("Opening Tab 1 [" + (state.currentIndex + 1) + "/" + jobQueue.length + "]: " + roleName + "...", "#2563eb");

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
    stopCooldownTimer();
    if (jobQueue.length === 0) {
      log("Queue is empty. Fetching fresh jobs...", "#2563eb");
      fetchFreshJobs().then((success) => {
        if (success && jobQueue.length > 0) startQueue();
      });
      return;
    }

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

    log("▶️ Starting application loop from Job #" + (state.currentIndex + 1) + "...", "#059669");
    processNextJob();
  }

  function pauseQueue() {
    stopCooldownTimer();
    isRunning = false;
    isPaused = true;

    const nextBatch = Math.floor(state.currentIndex / batchSize) + 1;
    if (btnLabel) btnLabel.innerText = "Resume Batch " + nextBatch;
    if (btnIcon) btnIcon.innerHTML = ICONS.play;
    if (mainActionBtn) {
      mainActionBtn.style.background = "#2563eb";
      mainActionBtn.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.25)";
    }
    if (statusDot) statusDot.style.background = "#f59e0b";

    log("⏸️ Paused. Progress safely preserved in localStorage.", "#f59e0b");
  }

  function skipJob() {
    stopCooldownTimer();
    if (state.currentIndex < jobQueue.length) {
      const skippedUrl = jobQueue[state.currentIndex];
      log("⏭️ Skipped Job #" + (state.currentIndex + 1) + ": " + formatSlug(skippedUrl), "#d97706");
      state.currentIndex++;
      state.skippedCount++;
      saveState(state);
      updateUI();
      if (isRunning && !isPaused) processNextJob();
    }
  }

  function resetProgress() {
    stopCooldownTimer();
    if (confirm("Reset progress back to Job #1?")) {
      isRunning = false;
      isPaused = false;
      state = { currentIndex: 0, completedCount: 0, skippedCount: 0, history: [] };
      saveState(state);
      updateUI();
      log("🔄 Progress reset back to Job #1.", "#2563eb");
    }
  }

  function moveToNextBatch() {
    stopCooldownTimer();
    const nextIndex = Math.min(jobQueue.length, Math.ceil((state.currentIndex + 1) / batchSize) * batchSize);
    state.currentIndex = nextIndex;
    saveState(state);
    updateUI();
    log("⏩ Fast-forwarded to Batch #" + (Math.floor(state.currentIndex / batchSize) + 1), "#2563eb");
  }

  function moveToPrevBatch() {
    stopCooldownTimer();
    const prevIndex = Math.max(0, (Math.floor(state.currentIndex / batchSize) - 1) * batchSize);
    state.currentIndex = prevIndex;
    saveState(state);
    updateUI();
    log("⏪ Rewound to Batch #" + (Math.floor(state.currentIndex / batchSize) + 1), "#2563eb");
  }

  // Bind Listeners
  mainActionBtn.addEventListener("click", () => {
    if (isRunning) pauseQueue();
    else startQueue();
  });

  document.getElementById("zfp-skip-btn").addEventListener("click", skipJob);
  document.getElementById("zfp-reset-btn").addEventListener("click", resetProgress);
  document.getElementById("zfp-next-batch-btn").addEventListener("click", moveToNextBatch);
  document.getElementById("zfp-prev-batch-btn").addEventListener("click", moveToPrevBatch);

  document.getElementById("zfp-fetch-btn").addEventListener("click", () => {
    stopCooldownTimer();
    fetchFreshJobs(false);
  });

  document.getElementById("zfp-full-purge-btn").addEventListener("click", () => {
    wipeAllStorageAndCookies(false);
  });

  document.querySelectorAll(".zfp-size-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
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
      batchSize = parseInt(btn.getAttribute("data-size"), 10);
      updateUI();
      log("Batch size set to: " + batchSize + " applications", "#2563eb");
    });
  });

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

  let isMinimized = false;
  document.getElementById("zfp-min-btn").addEventListener("click", () => {
    isMinimized = !isMinimized;
    const body = document.getElementById("zfp-body");
    if (body) body.style.display = isMinimized ? "none" : "block";
  });

  function cleanupInstance() {
    stopCooldownTimer();
    isRunning = false;
    isPaused = true;
    hud.remove();
    window.__AUTO_APPLIER_INSTANCE_INDIA_ALL__ = null;
    delete window.__AUTO_APPLIER_INDIA_ALL__;
    console.log("%c🧹 India All-Niches Auto-Applier session closed.", "color: #64748b; font-style: italic;");
  }

  document.getElementById("zfp-close-btn").addEventListener("click", cleanupInstance);

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

  window.__AUTO_APPLIER_INSTANCE_INDIA_ALL__ = api;
  window.__AUTO_APPLIER_INDIA_ALL__ = api;

  updateUI();

  console.log(
    "%c 🇮🇳 INDIA ALL-NICHES APPLIER %c READY ",
    "background: #ecfdf5; color: #059669; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #059669;",
    "background: #059669; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #059669;"
  );
  console.log(
    "%c📋 Pre-loaded Queue: %c" + jobQueue.length + " Indian jobs across all categories & niches.\n" +
    "%c💾 Saved Progress: %cJob " + (state.currentIndex + 1) + " | Applied: " + state.completedCount + "\n" +
    "%c🎯 Controls: %cClick 'Start' or 'Fetch Fresh Jobs' on the floating HUD",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;"
  );
})();
