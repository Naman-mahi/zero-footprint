/**
 * ⚡ Zero-Footprint PRO: All-India High-CPC In-Browser Auto-Applier
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * 
 * TARGET ROLES (293 Openings):
 * - Pan-India (293 Verified High-CPC Openings across 95 Companies)
 * 
 * HOW TO RUN:
 * 1. Open https://artha.link or https://my.artha.link in Google Chrome.
 * 2. Press F12 -> Console tab.
 * 3. Paste this entire file into the console and press Enter.
 */

(function () {
  // Prevent duplicate instances
  if (window.__AUTO_APPLIER_CROWDSTRIKE__ || window.__AUTO_APPLIER_INSTANCE_CROWDSTRIKE__) {
    console.log("%c🔄 Cleaning up previous Auto-Applier session...", "color: #dc2626; font-weight: bold;");
    try {
      if (window.__AUTO_APPLIER_CROWDSTRIKE__) window.__AUTO_APPLIER_CROWDSTRIKE__.cleanup();
      if (window.__AUTO_APPLIER_INSTANCE_CROWDSTRIKE__) window.__AUTO_APPLIER_INSTANCE_CROWDSTRIKE__.cleanup();
    } catch (e) {}
  }

  // =========================================================================
  // 📋 ALL-INDIA HIGH-CPC TARGET JOB QUEUE (293 Verified Openings)
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
              <span style="font-weight: 800; font-size: 13.5px; color: #0f172a; letter-spacing: -0.2px;">⚡ ALL-INDIA HIGH-CPC APPLIER</span>
              <span style="background: #fef2f2; color: #dc2626; font-size: 9.5px; font-weight: 800; padding: 1px 6px; border-radius: 5px; border: 1px solid #fecaca;">293 ROLES</span>
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
            <span id="cs-btn-label">Start Applying (293 Jobs)</span>
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
        ">Ready. Loaded 293 Indian High-CPC jobs across all companies. Click 'Start' to begin.</div>

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
            ${ICONS.info} High-CPC India Target Profile:
          </div>
          <div>• <b>Coverage:</b> Pan-India High-CPC Openings (293 verified jobs across 95 companies).</div>
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
      btnLabel.innerText = state.currentIndex >= total ? "All 293 Jobs Applied!" : "Start Applying (" + (total - state.currentIndex) + " left)";
    }
  }

  async function processNextJob() {
    if (!isRunning || isPaused) return;

    if (state.currentIndex >= jobQueue.length) {
      isRunning = false;
      if (btnLabel) btnLabel.innerText = "All 293 Roles Completed!";
      if (btnIcon) btnIcon.innerHTML = ICONS.play;
      if (mainActionBtn) mainActionBtn.style.background = "#059669";
      if (statusDot) statusDot.style.background = "#10b981";
      log("🎉 Application Queue Finished! Successfully processed " + state.completedCount + " applications.", "#059669");
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

    log("▶️ Starting Application loop from Role #" + (state.currentIndex + 1) + "...", "#059669");
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
    console.log("%c🧹 Auto-Applier session closed.", "color: #64748b; font-style: italic;");
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
    "%c ⚡ ALL-INDIA HIGH-CPC APPLIER %c READY ",
    "background: #fef2f2; color: #dc2626; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #dc2626;",
    "background: #dc2626; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #dc2626;"
  );
  console.log(
    "%c🎯 Target: %c293 Indian High-CPC Openings (All Companies)\n" +
    "%c💾 Saved Progress: %cJob " + (state.currentIndex + 1) + " | Applied: " + state.completedCount + "\n" +
    "%c⚡ Controls: %cClick 'Start Applying' on the floating HUD in the top right",
    "color: #64748b; font-weight: bold;", "color: #dc2626; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #dc2626; font-weight: bold;"
  );
})();
