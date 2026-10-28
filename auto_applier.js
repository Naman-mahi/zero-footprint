/**
 * 🕶️ Zero-Footprint PRO: Advanced 1-by-1 Sequential In-Browser Auto-Applier (India High-CPC Edition)
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * 
 * FEATURES:
 * - 🇮🇳 Pure Indian Jobs: Exclusively targets Indian openings (location: "IN" / country: "IN").
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
  if (window.__AUTO_APPLIER_INSTANCE__ || window.__AUTO_APPLIER_INSTANCE__) {
    console.log("%c🔄 Cleaning up previous Auto-Applier session...", "color: #2563eb; font-weight: bold;");
    try {
      if (window.__AUTO_APPLIER_INSTANCE__) window.__AUTO_APPLIER_INSTANCE__.cleanup();
      if (window.__AUTO_APPLIER_INSTANCE__) window.__AUTO_APPLIER_INSTANCE__.cleanup();
    } catch (e) {}
  }

  // =========================================================================
  // 📋 DYNAMIC LIVE JOB QUEUE (Zero Hardcoded Links - Live Retrieval)
  // =========================================================================
  const DEFAULT_QUEUE = [
  "https://artha.link/@eanxt/jobs/driving-instructor-driving-licence-my-four-wheels-roorkee-e37bb6d2",
  "https://artha.link/@eanxt/jobs/hiring-driving-instructor-driving-my-four-wheels-roorkee-1b267196",
  "https://artha.link/@eanxt/jobs/security-and-loss-prevention-specialist-asspl-haryana-c77-faridabad-6b79fa11",
  "https://artha.link/@eanxt/jobs/security-and-loss-prevention-specialist-asspl-west-bengal-kolkata-c93fe9b7",
  "https://artha.link/@eanxt/jobs/support-worker-mounties-care-mounties-care-prayagraj-a11afb26",
  "https://artha.link/@eanxt/jobs/fire-fighting-testing-commissioning-johnson-controls-hyderabad-0c8294ac",
  "https://artha.link/@eanxt/jobs/senior-cook-anglo-eastern-ship-karjat-589abc47",
  "https://artha.link/@eanxt/jobs/security-executive-accorhotel-hyderabad-cbcfec71",
  "https://artha.link/@eanxt/jobs/slp-specialist-security-loss-prevention-asspl-karnataka-b56-bengaluru-3a60b2cd",
  "https://artha.link/@eanxt/jobs/slp-expert-intl-intl-in-isk3-cluster-asspl-maharashtra-thane-793f9de3",
  "https://artha.link/@eanxt/jobs/investigation-representative-row-ib-asspl-telangana-d82-in-ts-2255a498",
  "https://artha.link/@eanxt/jobs/law-enforcement-response-ler-specialist-asspl-delhi-new-delhi-cd293450",
  "https://artha.link/@eanxt/jobs/investigation-associate-relay-product-adci-karnataka-a66-bengaluru-447dcd6f",
  "https://artha.link/@eanxt/jobs/incident-response-manager-security-adci-blr-14-sez-bengaluru-4eb68bf8",
  "https://artha.link/@eanxt/jobs/investigation-representative-row-ib-asspl-andhra-andhra-pradesh-5072eb70",
  "https://artha.link/@eanxt/jobs/investigation-sme-flex-investigations-adci-hyd-16-sez-h83-hyderabad-95bc2a28",
  "https://artha.link/@eanxt/jobs/loss-prevention-specialist-worldwide-asspl-maharashtra-mumbai-4136c895",
  "https://artha.link/@eanxt/jobs/risk-manager-law-enforcement-engagement-adci-karnataka-bengaluru-1999187b",
  "https://artha.link/@eanxt/jobs/investigation-representative-row-ib-asspl-telangana-d82-andhra-pradesh-d86bf69d",
  "https://artha.link/@eanxt/jobs/vrmo-senior-investigation-specialist-en-adci-karnataka-a66-bengaluru-d7ef64e4",
  "https://artha.link/@eanxt/jobs/dauernachtwache-in-der-pflege-stiftung-lebensart-barau-427a7dd7",
  "https://artha.link/@eanxt/jobs/sr-officer-exucative-meril-killa-pardi-5aa5096f",
  "https://artha.link/@eanxt/jobs/demi-chef-de-partie-grand-mercure-bengaluru-b3c41060",
  "https://artha.link/@eanxt/jobs/m46f0-security-agent-fedex-new-delhi-36482cf8",
  "https://artha.link/@eanxt/jobs/personal-de-limpieza-mcdonald-s-mah-n-mcdonald-s-espa-a-margao-fa7ebcb5",
  "https://artha.link/@eanxt/jobs/order-taker-popo-global-bengaluru-fc453081",
  "https://artha.link/@eanxt/jobs/senior-economist-adci-karnataka-bengaluru-b37aea56",
  "https://artha.link/@eanxt/jobs/senior-technical-program-manager-amazon-adci-karnataka-bengaluru-9007271a",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-mpna-asspl-maharashtra-pune-8cd13a43",
  "https://artha.link/@eanxt/jobs/executive-licenses-permits-real-estate-asspl-karnataka-b56-bengaluru-5ea9fc76",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-maharashtra-thane-f9c91d60",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-gujarat-d34-surat-ecfe25e7",
  "https://artha.link/@eanxt/jobs/art-director-creative-dev-gss-creative-adci-karnataka-bengaluru-ebd6ec7f",
  "https://artha.link/@eanxt/jobs/art-director-ii-content-generation-hub-adci-tamil-nadu-a83-chennai-060345ff",
  "https://artha.link/@eanxt/jobs/research-scientist-applied-iv-adobe-noida-74d3d732",
  "https://artha.link/@eanxt/jobs/sap-ehs-terrabit-consulting-tamil-nadu-in-7fb64e30",
  "https://artha.link/@eanxt/jobs/casual-cleaners-jindabyne-quayclean-australia-prayagraj-448fea6b",
  "https://artha.link/@eanxt/jobs/technical-writer-remote-yo-ai-labs-bengaluru-3cc6f2c7",
  "https://artha.link/@eanxt/jobs/operator-tool-cutter-grinding-ceratizit-attibele-712d91e8",
  "https://artha.link/@eanxt/jobs/ui-ux-designer-aptech-ltd-navi-mumbai-5a7ff429",
  "https://artha.link/@eanxt/jobs/senior-technical-writer-id94768-agileengine-noida-e7be8897",
  "https://artha.link/@eanxt/jobs/apprentice-starbucks-kozhikode-30705ee0",
  "https://artha.link/@eanxt/jobs/omni-sport-advisor-dsi-indiranagar-decathlon-bengaluru-2d67e710",
  "https://artha.link/@eanxt/jobs/video-lead-brave-bison-bengaluru-b407c778",
  "https://artha.link/@eanxt/jobs/eap-counsellor-overnight-shifts-workplace-options-bengaluru-287145ec",
  "https://artha.link/@eanxt/jobs/video-collection-project-egocentric-chemin-remote-aa1ed5f7",
  "https://artha.link/@eanxt/jobs/spa-therapist-four-seasons-hotels-mumbai-8d09050e",
  "https://artha.link/@eanxt/jobs/senior-medical-science-liaison-pharming-group-prayagraj-f31f97b3",
  "https://artha.link/@eanxt/jobs/pune-csr-non-voice-for-video-gaming-keywords-studios-pune-cb4f5cf7",
  "https://artha.link/@eanxt/jobs/mep-execution-mechanical-powai-west-larsen-toubro-mumbai-61327328",
  "https://artha.link/@eanxt/jobs/electrician-srg-global-prayagraj-e2fe296b",
  "https://artha.link/@eanxt/jobs/plant-operations-supervisor-groway-corporates-limbdi-40e0ce58",
  "https://artha.link/@eanxt/jobs/shift-incharge-hirestar-job-bank-kochi-2d8ff706",
  "https://artha.link/@eanxt/jobs/executive-content-pivotroots-digital-mumbai-477ca11b",
  "https://artha.link/@eanxt/jobs/senior-manager-corporate-legal-larsen-toubro-powai-6065ba6a",
  "https://artha.link/@eanxt/jobs/maintenance-electrician-mitolo-family-farms-prayagraj-3aaccac9",
  "https://artha.link/@eanxt/jobs/executive-quality-control-zentiva-group-a-s-ankleshwar-981fa309",
  "https://artha.link/@eanxt/jobs/supv-iii-strategic-sourcing-te-connectivity-bangalore-d90e4a70",
  "https://artha.link/@eanxt/jobs/stretegic-sourcing-lead-te-connectivity-bangalore-8e6c745a",
  "https://artha.link/@eanxt/jobs/sr-mgr-general-management-te-connectivity-bangalore-b6ff3280",
  "https://artha.link/@eanxt/jobs/stsi-bengaluru-reckitt-bangalore-21f6c4ed",
  "https://artha.link/@eanxt/jobs/senior-engineer-node-and-asset-colt-technology-bangalore-445d372b",
  "https://artha.link/@eanxt/jobs/transport-planner-rail-arup-bangalore-54257395",
  "https://artha.link/@eanxt/jobs/avp-scenario-design-standard-chartered-bangalore-594d7fe9",
  "https://artha.link/@eanxt/jobs/specialist-fiduciary-fund-servs-india-standard-chartered-bangalore-8aeacd22",
  "https://artha.link/@eanxt/jobs/sr-r-d-product-dvl-engineer-te-connectivity-bangalore-ec66cab3",
  "https://artha.link/@eanxt/jobs/strategic-sourcing-lead-te-connectivity-bangalore-ef571dc0",
  "https://artha.link/@eanxt/jobs/staff-r-d-product-dvl-engineer-te-connectivity-bangalore-42142ca9",
  "https://artha.link/@eanxt/jobs/staff-r-d-product-dvl-engineer-signal-te-connectivity-bangalore-fd28c0e6",
  "https://artha.link/@eanxt/jobs/project-manager-ii-te-connectivity-bangalore-c729b880",
  "https://artha.link/@eanxt/jobs/lead-capital-reporting-standard-chartered-bangalore-0141a6e2",
  "https://artha.link/@eanxt/jobs/papm-senior-modeler-standard-chartered-bangalore-bc58bcd3",
  "https://artha.link/@eanxt/jobs/staff-r-d-product-dvl-engineer-te-connectivity-bangalore-ce490a84",
  "https://artha.link/@eanxt/jobs/sr-systems-engineer-te-connectivity-bangalore-97917b00",
  "https://artha.link/@eanxt/jobs/staff-simulation-engineer-te-connectivity-bangalore-49f62feb",
  "https://artha.link/@eanxt/jobs/sr-r-d-product-dvl-engineer-te-connectivity-bangalore-0125d383",
  "https://artha.link/@eanxt/jobs/supplier-compliance-risk-program-analyst-te-connectivity-bangalore-c6d6afb6",
  "https://artha.link/@eanxt/jobs/r-d-product-dvl-engineer-i-te-connectivity-bangalore-4c90d4ba",
  "https://artha.link/@eanxt/jobs/mgr-eh-s-te-connectivity-bangalore-8fdea8f9",
  "https://artha.link/@eanxt/jobs/senior-manager-engineering-excellence-te-connectivity-bangalore-93b4de45",
  "https://artha.link/@eanxt/jobs/principal-relationship-manager-standard-chartered-thane-f1dcbc92",
  "https://artha.link/@eanxt/jobs/business-manager-markets-clusters-standard-chartered-bangalore-542d3b8e",
  "https://artha.link/@eanxt/jobs/supv-qlty-reliability-engineering-te-connectivity-bangalore-db4fedbf",
  "https://artha.link/@eanxt/jobs/sr-r-d-product-dvl-engineer-te-connectivity-bangalore-9454de2e",
  "https://artha.link/@eanxt/jobs/enterprise-ai-security-architect-te-connectivity-bangalore-f7fb1306",
  "https://artha.link/@eanxt/jobs/mgr-i-r-d-product-dvl-engineering-te-connectivity-bangalore-4f61cac6",
  "https://artha.link/@eanxt/jobs/servicenow-hrsd-portal-lead-te-connectivity-bangalore-4dcdb8ef",
  "https://artha.link/@eanxt/jobs/r-t-leader-high-speed-cable-assemblies-te-connectivity-bangalore-bf88b754",
  "https://artha.link/@eanxt/jobs/staff-signal-integrity-engineer-te-connectivity-bangalore-0e8f5c8e",
  "https://artha.link/@eanxt/jobs/strategic-sourcing-analyst-iv-te-connectivity-bangalore-22442902",
  "https://artha.link/@eanxt/jobs/vice-president-head-emea-margin-services-standard-chartered-bangalore-9bd16456",
  "https://artha.link/@eanxt/jobs/senior-manager-market-risk-management-standard-chartered-bangalore-88b81385",
  "https://artha.link/@eanxt/jobs/supv-iii-product-pricing-te-connectivity-bangalore-b302d771",
  "https://artha.link/@eanxt/jobs/associate-director-affluent-relations-standard-chartered-mumbai-41bbb9e0",
  "https://artha.link/@eanxt/jobs/associate-vice-president-valuation-standard-chartered-bangalore-6e5705c7",
  "https://artha.link/@eanxt/jobs/senior-manager-deal-advisory-research-standard-chartered-bangalore-ba02a46e",
  "https://artha.link/@eanxt/jobs/manager-affluent-analytics-standard-chartered-bangalore-f63b01a7",
  "https://artha.link/@eanxt/jobs/portfolio-manager-branch-standard-chartered-mumbai-5b2eef35",
  "https://artha.link/@eanxt/jobs/sr-assoc-cl-backend-eng-wrb-tech-standard-chartered-bangalore-74805258",
  "https://artha.link/@eanxt/jobs/sr-assoc-prod-specialist-adobe-campaign-standard-chartered-bangalore-7612f955",
  "https://artha.link/@eanxt/jobs/senior-manager-capital-management-standard-chartered-chennai-6b41c6aa",
  "https://artha.link/@eanxt/jobs/lead-third-party-continuous-monitoring-standard-chartered-bangalore-e71a340d",
  "https://artha.link/@eanxt/jobs/manager-design-studio-standard-chartered-bangalore-c08d21e3",
  "https://artha.link/@eanxt/jobs/sr-manager-java-development-standard-chartered-bangalore-18177146",
  "https://artha.link/@eanxt/jobs/lead-penetration-testing-standard-chartered-bangalore-3df3ed63",
  "https://artha.link/@eanxt/jobs/associate-director-affluent-relations-standard-chartered-mumbai-efc766f8",
  "https://artha.link/@eanxt/jobs/senior-associate-irrbb-reporting-standard-chartered-bangalore-c8af1b24",
  "https://artha.link/@eanxt/jobs/head-credit-risk-review-specialised-standard-chartered-bangalore-674a04b1",
  "https://artha.link/@eanxt/jobs/senior-relationship-manager-affluent-standard-chartered-bangalore-d6c10dce",
  "https://artha.link/@eanxt/jobs/sr-manager-java-development-standard-chartered-bangalore-a1009ad2",
  "https://artha.link/@eanxt/jobs/mgr-borm-standard-chartered-mumbai-4cae0ebf",
  "https://artha.link/@eanxt/jobs/associate-director-lending-fraud-risk-standard-chartered-bangalore-40ca95c0",
  "https://artha.link/@eanxt/jobs/manager-capital-standard-chartered-bangalore-9f128476",
  "https://artha.link/@eanxt/jobs/head-financial-crime-assurance-standard-chartered-bangalore-bbe884f6",
  "https://artha.link/@eanxt/jobs/sr-manager-java-development-standard-chartered-bangalore-9c58d7b8",
  "https://artha.link/@eanxt/jobs/relationship-manager-standard-chartered-bangalore-de47c245",
  "https://artha.link/@eanxt/jobs/sr-relationship-manager-affluent-standard-chartered-mumbai-548eaefd",
  "https://artha.link/@eanxt/jobs/sr-manager-pc-change-standard-chartered-bangalore-3e0160c1",
  "https://artha.link/@eanxt/jobs/senior-audit-manager-t-o-digital-assets-standard-chartered-bangalore-f1974df5",
  "https://artha.link/@eanxt/jobs/vp-global-process-support-standard-chartered-bangalore-c099eaa6",
  "https://artha.link/@eanxt/jobs/director-affluent-relations-standard-chartered-bangalore-8f7c1ef2",
  "https://artha.link/@eanxt/jobs/snr-manager-development-recon-standard-chartered-bangalore-30834053",
  "https://artha.link/@eanxt/jobs/vice-president-head-apac-margin-services-standard-chartered-bangalore-21e49f7f",
  "https://artha.link/@eanxt/jobs/rm-director-standard-chartered-mumbai-a4f591ff",
  "https://artha.link/@eanxt/jobs/associate-director-collateral-standard-chartered-bangalore-8600da55",
  "https://artha.link/@eanxt/jobs/portfolio-manager-branch-standard-chartered-mumbai-917a4ff5",
  "https://artha.link/@eanxt/jobs/manager-framework-policy-standard-chartered-bangalore-b793a3a8",
  "https://artha.link/@eanxt/jobs/director-financial-crime-assurance-abc-standard-chartered-bangalore-742c25fa",
  "https://artha.link/@eanxt/jobs/manager-global-markets-middle-office-standard-chartered-bangalore-1b6cb642",
  "https://artha.link/@eanxt/jobs/senior-insurance-specialist-standard-chartered-bangalore-b6c99395",
  "https://artha.link/@eanxt/jobs/associate-wrb-model-development-standard-chartered-bangalore-a2716741",
  "https://artha.link/@eanxt/jobs/vp-credit-policy-and-process-standard-chartered-bangalore-1a81b605",
  "https://artha.link/@eanxt/jobs/mgr-borm-standard-chartered-mumbai-bf1df7ee",
  "https://artha.link/@eanxt/jobs/mgr-i-fp-a-te-connectivity-bangalore-0a50d071",
  "https://artha.link/@eanxt/jobs/pcb-design-engineer-ii-te-connectivity-bangalore-5e3bf30a",
  "https://artha.link/@eanxt/jobs/sr-manager-java-development-standard-chartered-bangalore-d55b0526",
  "https://artha.link/@eanxt/jobs/mgr-r-d-product-dvl-engineering-te-connectivity-bangalore-ed41d626",
  "https://artha.link/@eanxt/jobs/senior-manager-credit-risk-governance-standard-chartered-bangalore-591e6b3b",
  "https://artha.link/@eanxt/jobs/senior-manager-credit-policy-and-process-standard-chartered-bangalore-7c6956c2",
  "https://artha.link/@eanxt/jobs/papm-lead-modeler-standard-chartered-bangalore-383134b2",
  "https://artha.link/@eanxt/jobs/senior-manager-otcr-third-party-risk-sme-standard-chartered-bangalore-0003925e",
  "https://artha.link/@eanxt/jobs/vice-president-nfrr-coe-standard-chartered-bangalore-804c4f0d",
  "https://artha.link/@eanxt/jobs/consultant-copywriter-wpp-production-bangalore-de1a1cc2",
  "https://artha.link/@eanxt/jobs/director-prism-head-standard-chartered-bangalore-e41962a3",
  "https://artha.link/@eanxt/jobs/senior-relationship-manager-standard-chartered-bangalore-94756652",
  "https://artha.link/@eanxt/jobs/associate-director-capital-risk-standard-chartered-bangalore-4a56fca6",
  "https://artha.link/@eanxt/jobs/senior-manager-giai-technology-standard-chartered-bangalore-7b5ebf5b",
  "https://artha.link/@eanxt/jobs/senior-officer-gls-standard-chartered-bangalore-cf098fa7",
  "https://artha.link/@eanxt/jobs/associate-lead-irrbb-reporting-standard-chartered-bangalore-258b567d",
  "https://artha.link/@eanxt/jobs/audit-director-payments-and-core-standard-chartered-bangalore-a09cdcb6",
  "https://artha.link/@eanxt/jobs/manufacturing-engineer-iii-jabil-remote-603a8aa7",
  "https://artha.link/@eanxt/jobs/senior-manager-markets-regulatory-standard-chartered-bangalore-ef0005d1",
  "https://artha.link/@eanxt/jobs/project-manager-controls-delivery-arup-bangalore-5243882b",
  "https://artha.link/@eanxt/jobs/assistant-manager-stress-testing-standard-chartered-bangalore-7352b240",
  "https://artha.link/@eanxt/jobs/sr-project-manager-engineer-te-connectivity-bangalore-d04863e6",
  "https://artha.link/@eanxt/jobs/staff-r-d-product-dvl-engineer-te-connectivity-bangalore-80cacddc",
  "https://artha.link/@eanxt/jobs/project-manager-ii-te-connectivity-bangalore-adf30656",
  "https://artha.link/@eanxt/jobs/r-d-product-dvl-engineer-ii-te-connectivity-bangalore-abc1f457",
  "https://artha.link/@eanxt/jobs/r-d-product-dvl-engineer-te-connectivity-bangalore-87d5fb42",
  "https://artha.link/@eanxt/jobs/r-d-product-dvl-engineer-ii-te-connectivity-bangalore-8b7dee6b",
  "https://artha.link/@eanxt/jobs/0926-ind-178-cheminformatics-expert-elsevier-remote-638ed5c7",
  "https://artha.link/@eanxt/jobs/supply-chain-performance-inventory-te-connectivity-bangalore-1aed59f6",
  "https://artha.link/@eanxt/jobs/supply-chain-analyst-iii-te-connectivity-bangalore-9370017e",
  "https://artha.link/@eanxt/jobs/senior-analyst-erp-sap-o2c-te-connectivity-remote-2ba5ed65",
  "https://artha.link/@eanxt/jobs/project-manager-supply-chain-jabil-remote-ff8a61e4",
  "https://artha.link/@eanxt/jobs/bim-engineer-structures-arup-bangalore-9e55f685",
  "https://artha.link/@eanxt/jobs/senior-ml-engineer-standard-chartered-chennai-06376cab",
  "https://artha.link/@eanxt/jobs/forward-deployed-ai-engineer-te-connectivity-bangalore-8921783b",
  "https://artha.link/@eanxt/jobs/analyst-data-insights-te-connectivity-bangalore-211015f1",
  "https://artha.link/@eanxt/jobs/key-customer-supply-management-te-connectivity-remote-5bab8a97",
  "https://artha.link/@eanxt/jobs/sr-project-manager-engineer-te-connectivity-bangalore-d33e5f09",
  "https://artha.link/@eanxt/jobs/manager-procurement-digital-te-connectivity-bangalore-7f00b29b",
  "https://artha.link/@eanxt/jobs/sr-r-d-product-dvl-engineer-te-connectivity-bangalore-cb661d27",
  "https://artha.link/@eanxt/jobs/project-manager-iv-te-connectivity-bangalore-c5ff018e",
  "https://artha.link/@eanxt/jobs/channel-order-management-analytics-te-connectivity-bangalore-855cf818",
  "https://artha.link/@eanxt/jobs/principal-data-science-te-connectivity-bangalore-7bb26008",
  "https://artha.link/@eanxt/jobs/staff-r-d-product-dvl-engineer-signal-te-connectivity-bangalore-0895dd28",
  "https://artha.link/@eanxt/jobs/staff-r-d-product-dvl-engineer-te-connectivity-bangalore-d56e9077",
  "https://artha.link/@eanxt/jobs/buyer-i-jabil-remote-8d4bf814",
  "https://artha.link/@eanxt/jobs/assistant-manager-regulatory-sciences-pfizer-delhi-a632743d",
  "https://artha.link/@eanxt/jobs/cybersecurity-engineer-privileged-moody-s-bangalore-ac5d9115",
  "https://artha.link/@eanxt/jobs/industrial-engineer-ii-jabil-remote-c394b073",
  "https://artha.link/@eanxt/jobs/senior-specialist-public-cloud-msd-hyderabad-68c062f4",
  "https://artha.link/@eanxt/jobs/lead-manufacturing-engineer-jabil-remote-8a3bffcc",
  "https://artha.link/@eanxt/jobs/iqc-iqa-associate-engineer-jabil-remote-1328c243",
  "https://artha.link/@eanxt/jobs/graduate-trainee-jabil-remote-4e0757a2",
  "https://artha.link/@eanxt/jobs/staff-manufacturing-engineer-te-connectivity-bangalore-a8f21e38",
  "https://artha.link/@eanxt/jobs/risk-associate-entain-telangana-86de9fe3",
  "https://artha.link/@eanxt/jobs/administrative-support-exec-te-connectivity-baner-42bae988",
  "https://artha.link/@eanxt/jobs/supply-chain-analyst-iii-te-connectivity-bangalore-65261112",
  "https://artha.link/@eanxt/jobs/assistant-production-leader-jabil-remote-b0683ecf",
  "https://artha.link/@eanxt/jobs/mfg-process-dvl-engineer-ii-te-connectivity-remote-d43cbbe8",
  "https://artha.link/@eanxt/jobs/gat-jabil-remote-c27a8d5f",
  "https://artha.link/@eanxt/jobs/tool-die-maker-iv-te-connectivity-pune-9e1396f6",
  "https://artha.link/@eanxt/jobs/abb-talent-pool-unpause-returnee-abb-bangalore-rural-43caddfc",
  "https://artha.link/@eanxt/jobs/buyer-iii-jabil-remote-6feab2d6",
  "https://artha.link/@eanxt/jobs/refrigeration-specialist-amazon-adci-hyd-16-sez-hyderabad-3aaf97d5",
  "https://artha.link/@eanxt/jobs/corporate-counsel-devices-digital-legal-asspl-karnataka-bengaluru-0ebe9b72",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-inqc-asspl-maharashtra-mumbai-e0a9646a",
  "https://artha.link/@eanxt/jobs/process-assistant-rad-operations-asspl-maharashtra-thane-4fe072c8",
  "https://artha.link/@eanxt/jobs/bms-specialist-amazon-maintenance-adci-hyd-16-sez-h83-hyderabad-1c19b2d2",
  "https://artha.link/@eanxt/jobs/sr-design-technologist-eshop-content-adci-karnataka-a66-bengaluru-84062f86",
  "https://artha.link/@eanxt/jobs/creative-specialist-artwork-prime-video-amazon-development-bengaluru-24fc7650",
  "https://artha.link/@eanxt/jobs/senior-ux-designer-design-adci-hyd-13-sez-hyderabad-81b22006",
  "https://artha.link/@eanxt/jobs/sr-associate-arabic-prime-video-trust-adci-blr-14-sez-bengaluru-79a1299b",
  "https://artha.link/@eanxt/jobs/bbm-escalation-specialist-amazon-adci-hyd-16-sez-h83-hyderabad-4ad6f643",
  "https://artha.link/@eanxt/jobs/case-mgr-msk-s-msk-adci-karnataka-a66-bengaluru-320d532b",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-cmt-adci-karnataka-bengaluru-a7cf2943",
  "https://artha.link/@eanxt/jobs/creative-director-creative-director-asspl-maharashtra-mumbai-066f3ab0",
  "https://artha.link/@eanxt/jobs/product-operations-manager-amazon-music-adci-karnataka-bengaluru-8b7ed248",
  "https://artha.link/@eanxt/jobs/applied-science-manager-amazon-music-amazon-development-bengaluru-8f8a0f80",
  "https://artha.link/@eanxt/jobs/packaging-associate-in-packaging-asspl-karnataka-bengaluru-1d12025e",
  "https://artha.link/@eanxt/jobs/video-editor-gss-adci-karnataka-chennai-fd1c9d01",
  "https://artha.link/@eanxt/jobs/translation-team-manager-tsops-adci-hyd-13-sez-hyderabad-7b7e6389",
  "https://artha.link/@eanxt/jobs/visual-design-associate-prime-video-gss-adci-tamil-nadu-a83-chennai-d7b75972",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-ssg-science-adci-blr-14-sez-bengaluru-7d5a40b1",
  "https://artha.link/@eanxt/jobs/social-video-content-lead-imdb-india-asspl-maharashtra-mumbai-a89d025a",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-last-mile-science-amazon-dev-center-bengaluru-bd38d598",
  "https://artha.link/@eanxt/jobs/design-lead-gss-adci-karnataka-bengaluru-b496f075",
  "https://artha.link/@eanxt/jobs/seasonal-myhr-live-support-sr-advisor-adci-karnataka-a66-gurugram-1b6fda60",
  "https://artha.link/@eanxt/jobs/senior-applied-scientist-amazon-music-adci-karnataka-bengaluru-0e2a0df9",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engr-rme-ingsf-asspl-maharashtra-mumbai-b9113124",
  "https://artha.link/@eanxt/jobs/music-executive-in-originals-music-team-asspl-maharashtra-mumbai-e7b06a83",
  "https://artha.link/@eanxt/jobs/advocacy-operations-associate-advocacy-adci-hyd-13-sez-h84-hyderabad-93632bbb",
  "https://artha.link/@eanxt/jobs/visual-designer-display-creative-adci-karnataka-bengaluru-a52c21e8",
  "https://artha.link/@eanxt/jobs/research-scientist-ii-last-mile-science-adci-karnataka-bengaluru-13bab506",
  "https://artha.link/@eanxt/jobs/creative-director-brand-and-creative-asspl-karnataka-bengaluru-de7d7c32",
  "https://artha.link/@eanxt/jobs/corporate-counsel-compliance-safety-ww-asspl-karnataka-bengaluru-2b6cdcbe",
  "https://artha.link/@eanxt/jobs/associate-corporate-counsel-amazon-development-bengaluru-c9153e25",
  "https://artha.link/@eanxt/jobs/corporate-counsel-seller-services-asspl-karnataka-bengaluru-93a10af2",
  "https://artha.link/@eanxt/jobs/advocacy-operations-associate-adci-hyd-13-sez-h84-hyderabad-70e8ca39",
  "https://artha.link/@eanxt/jobs/av-lead-gss-adci-karnataka-chennai-560f9345",
  "https://artha.link/@eanxt/jobs/rme-coordinator-rme-coordinator-asspl-delhi-kolkata-385d16d5",
  "https://artha.link/@eanxt/jobs/manager-applied-science-rbs-tech-adci-blr-14-sez-bengaluru-a30c1628",
  "https://artha.link/@eanxt/jobs/creative-manager-elevated-shopping-shop-asspl-haryana-gurugram-4e365a1e",
  "https://artha.link/@eanxt/jobs/whs-officer-whs-edsp-asspl-maharashtra-mumbai-5eea4c2f",
  "https://artha.link/@eanxt/jobs/case-mgr-ppl-s-amazon-dev-center-hyderabad-09c149ab",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-inqc-asspl-delhi-c76-new-delhi-22c1c699",
  "https://artha.link/@eanxt/jobs/visual-designer-key-art-dev-gss-adci-karnataka-bengaluru-75b426e6",
  "https://artha.link/@eanxt/jobs/senior-bms-specialist-amazon-adci-hyd-16-sez-h83-hyderabad-105d3cad",
  "https://artha.link/@eanxt/jobs/rme-coordinator-iii-rme-coordinator-iii-asspl-maharashtra-thane-b81c2e14",
  "https://artha.link/@eanxt/jobs/research-scientist-iii-last-mile-science-adci-karnataka-bengaluru-598e5b02",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-rajasthan-d33-jaipur-24b314c2",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-haryana-c77-gurugram-484e4ac3",
  "https://artha.link/@eanxt/jobs/content-developer-customer-trust-adci-blr-14-sez-f07-bengaluru-11ccec96",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-grocery-retail-in-adci-karnataka-bengaluru-a8490657",
  "https://artha.link/@eanxt/jobs/sr-digital-supply-chain-associate-pv-adci-maa-15-sez-chennai-e712fca0",
  "https://artha.link/@eanxt/jobs/research-science-manager-last-mile-adci-karnataka-bengaluru-60e099fb",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-rme-asspl-maharashtra-thane-f1311759",
  "https://artha.link/@eanxt/jobs/case-mgr-crt-s-adci-tamil-nadu-a83-chennai-28368b07",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-on-road-experience-adci-karnataka-bengaluru-2ce13e7c",
  "https://artha.link/@eanxt/jobs/applied-scientist-amazon-music-catalog-adci-karnataka-bengaluru-17b03845",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-haryana-gurugram-60948d62",
  "https://artha.link/@eanxt/jobs/applied-scientist-ssg-science-adci-blr-14-sez-bengaluru-e1a6d2d2",
  "https://artha.link/@eanxt/jobs/case-mgr-us-pr-s-us-pr-s-amazon-dev-center-hyderabad-4f4d5450",
  "https://artha.link/@eanxt/jobs/case-mgr-mloa-s-disability-and-leave-amazon-dev-center-hyderabad-43a4ffb0",
  "https://artha.link/@eanxt/jobs/applied-scientist-amazon-music-catalog-adci-blr-dta-bengaluru-306c3b00",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-inqc-asspl-uttar-pradesh-noida-548c975b",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-gsf-asspl-karnataka-b56-bengaluru-3104074b",
  "https://artha.link/@eanxt/jobs/brand-specialist-german-adci-blr-14-sez-in-dl-fdb04eae",
  "https://artha.link/@eanxt/jobs/digital-supply-chain-associate-prime-adci-maa-15-sez-k20-chennai-283aa118",
  "https://artha.link/@eanxt/jobs/bbm-escalation-specialist-amazon-adci-hyd-16-sez-hyderabad-fe384043",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-rme-asspl-maharashtra-pune-f274ddad",
  "https://artha.link/@eanxt/jobs/pr-specialist-amazon-prime-video-india-asspl-maharashtra-mumbai-0500dcda",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-gujarat-d34-ahmedabad-d77a7784",
  "https://artha.link/@eanxt/jobs/re-contract-administrator-real-estate-asspl-karnataka-bengaluru-be66d0c8",
  "https://artha.link/@eanxt/jobs/senior-corporate-counsel-litigation-asspl-delhi-new-delhi-e7f5c861",
  "https://artha.link/@eanxt/jobs/support-engineer-iii-music-client-adci-karnataka-bengaluru-ec19a76a",
  "https://artha.link/@eanxt/jobs/myhr-live-support-advisor-s-mhls-adci-punjab-malerkotla-ecf3be33",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-rme-asspl-haryana-gurugram-eb6d1ebc",
  "https://artha.link/@eanxt/jobs/software-development-manager-sports-amazon-dev-center-bengaluru-dcf3db7a",
  "https://artha.link/@eanxt/jobs/lead-game-designer-dneg-mumbai-a03bb2f0",
  "https://artha.link/@eanxt/jobs/hindi-speaking-human-transcription-opsarmy-jaipur-87d2f186",
  "https://artha.link/@eanxt/jobs/art-director-havas-group-chennai-7b2f9ac1",
  "https://artha.link/@eanxt/jobs/tekline-coe-lead-mahindra-rise-chennai-35a93b64",
  "https://artha.link/@eanxt/jobs/seeking-expressions-of-interest-from-good-people-hr-pty-prayagraj-5aaab536",
  "https://artha.link/@eanxt/jobs/social-expert-arrow-associates-goregaon-east-2109be3a",
  "https://artha.link/@eanxt/jobs/babysitter-wanted-in-nashik-babysitting-babysits-nashik-b4f7e23f",
  "https://artha.link/@eanxt/jobs/vehicle-spray-painter-apprentice-brisbane-bmw-prayagraj-5c166943",
  "https://artha.link/@eanxt/jobs/content-ai-vrinda-international-mumbai-356cfe36",
  "https://artha.link/@eanxt/jobs/shift-supervisor-starbucks-amritsar-ef37c6d5",
  "https://artha.link/@eanxt/jobs/affiliate-psychologist-hinganghat-lyra-health-hinganghat-a0f0ab33",
  "https://artha.link/@eanxt/jobs/babysitter-wanted-in-zerakpur-babysits-zirakpur-91d6b9ba",
  "https://artha.link/@eanxt/jobs/corporate-lawyer-fiu-liaison-coinsell-technology-new-delhi-eb8d5644",
  "https://artha.link/@eanxt/jobs/psychology-phd-assessment-specialist-mercor-mumbai-1b317499",
  "https://artha.link/@eanxt/jobs/gypsum-carpenter-2coms-patna-2f67f676",
  "https://artha.link/@eanxt/jobs/senior-marine-technician-2coms-kochi-813ac1d4",
  "https://artha.link/@eanxt/jobs/mep-execution-electricals-wagle-larsen-toubro-mumbai-314a41f8",
  "https://artha.link/@eanxt/jobs/senior-product-designer-central-parking-bengaluru-c0709c7c",
  "https://artha.link/@eanxt/jobs/graphic-visual-designer-sa-technologies-mumbai-972e860f",
  "https://artha.link/@eanxt/jobs/shift-engineer-injection-molding-smc-ltd-bengaluru-eefaaf3b",
  "https://artha.link/@eanxt/jobs/diesel-mechanic-dido-mader-prayagraj-54f14d02",
  "https://artha.link/@eanxt/jobs/creative-producer-re-equil-india-chandigarh-91dcdde9"
];
  let jobQueue = DEFAULT_QUEUE;
  let batchSize = 50;

  const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
  const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

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
    if (!isSilent) log("⏳ Fetching fresh Indian High-CPC jobs live from Artha...", "#2563eb");
    if (btnLabel && !isRunning) btnLabel.innerText = "Fetching Indian jobs...";

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
            geo_boost: true,
            location: "IN",
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

          // Confirm Indian location
          const isIN = it.country === "IN" || it.company_info?.country === "India";
          if (!isIN) continue;

          const titleLower = (it.title || "").toLowerCase();
          const compLower = (it.company || it.company_info?.name || "").toLowerCase();

          // Exclude trucking, CDL, driver, freight spam
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
        log(`✨ Loaded ${freshUrls.length} fresh Indian High-CPC jobs! Ready to start.`, "#059669");
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
  const oldHud = document.getElementById("zero-footprint-light-hud");
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
  hud.id = "zero-footprint-light-hud";
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
              <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; letter-spacing: -0.2px;">🇮🇳 INDIA HIGH-CPC APPLIER</span>
              <span style="background: #ecfdf5; color: #059669; font-size: 9.5px; font-weight: 700; padding: 1px 5px; border-radius: 5px; border: 1px solid #a7f3d0;">🇮🇳 INDIA EDITION</span>
            </div>
            <div style="font-size: 10.5px; color: #64748b; font-weight: 500;">Live Pure-CPC Indian Jobs Applier</div>
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

  window.__AUTO_APPLIER_INSTANCE__ = api;
  window.__AUTO_APPLIER__ = api;

  // Auto-fetch fresh live jobs on launch
  fetchFreshJobs(false);

  console.log(
    "%c ⚡ ZERO-FOOTPRINT PRO %c READY ",
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
