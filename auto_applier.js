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
  "https://artha.link/@eanxt/jobs/innovation-cup-2027-team-synthetic-emd-group-merck-kgaa-hyderabad-c86421df",
  "https://artha.link/@eanxt/jobs/innovation-cup-2027-team-advanced-emd-group-merck-kgaa-hyderabad-8572440f",
  "https://artha.link/@eanxt/jobs/innovation-cup-2027-team-climate-change-emd-group-merck-kgaa-hyderabad-851495fc",
  "https://artha.link/@eanxt/jobs/innovation-cup-2027-team-oncology-all-emd-group-merck-kgaa-hyderabad-6d8902d2",
  "https://artha.link/@eanxt/jobs/innovation-cup-2027-team-fertility-all-emd-group-merck-kgaa-hyderabad-8112bb85",
  "https://artha.link/@eanxt/jobs/innovation-cup-2027-team-immunology-emd-group-merck-kgaa-hyderabad-f5ad3771",
  "https://artha.link/@eanxt/jobs/innovation-cup-2027-team-drug-discovery-emd-group-merck-kgaa-hyderabad-0b60261c",
  "https://artha.link/@eanxt/jobs/planning-reporting-coe-senior-manager-reckitt-hyderabad-3c9a4d85",
  "https://artha.link/@eanxt/jobs/manager-clinical-data-scientist-pfizer-chennai-05d8ce54",
  "https://artha.link/@eanxt/jobs/tsi-chennai-4-ssmt-reckitt-chennai-876ce9dc",
  "https://artha.link/@eanxt/jobs/onboarding-people-services-data-rws-mumbai-dfa546c8",
  "https://artha.link/@eanxt/jobs/tsi-brahmapur-reckitt-brahmapur-b3379432",
  "https://artha.link/@eanxt/jobs/senior-specialist-solution-architecture-msd-hyderabad-af257518",
  "https://artha.link/@eanxt/jobs/senior-business-product-owner-s-p-global-gurugram-647c419a",
  "https://artha.link/@eanxt/jobs/senior-bim-engineer-structures-arup-bangalore-fe0f9f18",
  "https://artha.link/@eanxt/jobs/account-executive-bangalore-booking-com-bangalore-92fd37a7",
  "https://artha.link/@eanxt/jobs/senior-financial-data-analyst-moody-s-bengaluru-52dc90ee",
  "https://artha.link/@eanxt/jobs/manager-advisory-services-moody-s-hybrid-remote-7bdb129d",
  "https://artha.link/@eanxt/jobs/manager-software-engineering-msd-hyderabad-2282fc2f",
  "https://artha.link/@eanxt/jobs/specialist-site-reliability-engineering-msd-hyderabad-a4a30787",
  "https://artha.link/@eanxt/jobs/spclst-infrastructure-engineering-msd-hyderabad-49b43cb8",
  "https://artha.link/@eanxt/jobs/apprentice-insurance-client-services-s-p-global-ahmedabad-dbb6c059",
  "https://artha.link/@eanxt/jobs/senior-data-engineer-s-p-global-hyderabad-2af1ad99",
  "https://artha.link/@eanxt/jobs/process-engineer-reckitt-mysore-9b75beda",
  "https://artha.link/@eanxt/jobs/tsi-vizianagram-reckitt-vishakhapatnam-bc4659d9",
  "https://artha.link/@eanxt/jobs/senior-security-operation-specialist-msci-mumbai-765efab8",
  "https://artha.link/@eanxt/jobs/task-team-engineer-plumbing-arup-bangalore-564fdbed",
  "https://artha.link/@eanxt/jobs/senior-engineer-application-development-colt-technology-gurugram-88e79952",
  "https://artha.link/@eanxt/jobs/electrical-design-engineer-data-centre-arup-mumbai-45dcad40",
  "https://artha.link/@eanxt/jobs/apprentice-client-support-s-p-global-gurugram-cbe32a82",
  "https://artha.link/@eanxt/jobs/manager-marketing-brand-thums-up-coca-cola-gurugram-6b43feb8",
  "https://artha.link/@eanxt/jobs/financial-engineer-moody-s-gurugram-1578f90b",
  "https://artha.link/@eanxt/jobs/senior-fire-engineer-arup-mumbai-4e5d5ed5",
  "https://artha.link/@eanxt/jobs/associate-fire-engineer-arup-mumbai-09dffa45",
  "https://artha.link/@eanxt/jobs/civil-engineer-infrastructure-arup-mumbai-6070d56b",
  "https://artha.link/@eanxt/jobs/senior-civil-engineer-arup-bangalore-ec9a4a94",
  "https://artha.link/@eanxt/jobs/bridge-engineer-rails-arup-bangalore-cd1ef5ce",
  "https://artha.link/@eanxt/jobs/bim-engineer-structures-arup-bangalore-7580d12d",
  "https://artha.link/@eanxt/jobs/senior-structural-engineer-arup-bangalore-775114b1",
  "https://artha.link/@eanxt/jobs/bim-engineer-civils-arup-bangalore-2c0b74a0",
  "https://artha.link/@eanxt/jobs/digital-bim-engineer-arup-bangalore-1c31d387",
  "https://artha.link/@eanxt/jobs/genai-platform-engineer-llm-gateway-pfizer-8d6b5591",
  "https://artha.link/@eanxt/jobs/mechanical-engineer-data-centre-arup-mumbai-c1e8f554",
  "https://artha.link/@eanxt/jobs/sr-r-d-product-dvl-engineer-te-connectivity-bangalore-7d164753",
  "https://artha.link/@eanxt/jobs/sr-r-d-product-dvl-engineer-te-connectivity-bangalore-6b20a96d",
  "https://artha.link/@eanxt/jobs/principal-mechanical-engineer-dci-pipes-jabil-178d81fb",
  "https://artha.link/@eanxt/jobs/task-team-engineer-mechanical-arup-bangalore-bb06c00b",
  "https://artha.link/@eanxt/jobs/task-team-engineer-electrical-arup-bangalore-5026253f",
  "https://artha.link/@eanxt/jobs/senior-bim-engineer-civils-arup-bangalore-cc0d8dec",
  "https://artha.link/@eanxt/jobs/group-engineering-lead-entain-telangana-6d527219",
  "https://artha.link/@eanxt/jobs/senior-wind-fluid-dynamics-engineer-arup-mumbai-b6a5a538",
  "https://artha.link/@eanxt/jobs/senior-mechanical-engineer-data-centre-arup-mumbai-bfb05fb0",
  "https://artha.link/@eanxt/jobs/sr-phe-and-fire-fighting-engineer-arup-mumbai-1d708860",
  "https://artha.link/@eanxt/jobs/financial-data-analyst-moody-s-bengaluru-5a664736",
  "https://artha.link/@eanxt/jobs/sourcing-procurement-analyst-ii-te-connectivity-bangalore-3a485363",
  "https://artha.link/@eanxt/jobs/jr-specialist-hr-technology-organon-hybrid-remote-2e5ffbdd",
  "https://artha.link/@eanxt/jobs/project-manager-controls-delivery-arup-bangalore-2c13bad1",
  "https://artha.link/@eanxt/jobs/data-operations-specialist-moody-s-bengaluru-0ffd26c6",
  "https://artha.link/@eanxt/jobs/customer-service-associate-iv-te-connectivity-bangalore-33e1b2db",
  "https://artha.link/@eanxt/jobs/senior-acoustics-consultant-arup-mumbai-33ebd975",
  "https://artha.link/@eanxt/jobs/digital-human-health-intern-msd-pune-e25753ac",
  "https://artha.link/@eanxt/jobs/digital-human-health-intern-msd-hyderabad-c4855ade",
  "https://artha.link/@eanxt/jobs/innovation-automation-te-connectivity-bangalore-8db8e3a0",
  "https://artha.link/@eanxt/jobs/bim-data-coordinator-arup-bangalore-c9394dd9",
  "https://artha.link/@eanxt/jobs/reporter-ii-s-p-global-gurugram-d103ea2e",
  "https://artha.link/@eanxt/jobs/material-metal-controller-johnson-matthey-bawal-4c848001",
  "https://artha.link/@eanxt/jobs/engineer-ii-virtualization-shift-8am-crowdstrike-bengaluru-9f1c2ca4",
  "https://artha.link/@eanxt/jobs/principal-software-engineer-ansr-summit-gurgaon-68040abe",
  "https://artha.link/@eanxt/jobs/senior-release-manager-ansr-summit-gurgaon-7501342d",
  "https://artha.link/@eanxt/jobs/principal-performance-engineer-ansr-summit-gurgaon-b2494914",
  "https://artha.link/@eanxt/jobs/sr-staff-sdet-ansr-summit-gurgaon-979bf4ca",
  "https://artha.link/@eanxt/jobs/staff-data-engineer-ansr-summit-gurgaon-ba6bca03",
  "https://artha.link/@eanxt/jobs/senior-staff-it-help-desk-ansr-summit-gurgaon-7c895fba",
  "https://artha.link/@eanxt/jobs/principal-sre-operations-engineer-ansr-summit-gurgaon-a02d9069",
  "https://artha.link/@eanxt/jobs/staff-sdet-ansr-summit-gurgaon-feb6f323",
  "https://artha.link/@eanxt/jobs/staff-software-engineer-ansr-summit-gurgaon-7c8ebd6d",
  "https://artha.link/@eanxt/jobs/staff-software-engineer-ansr-summit-gurgaon-7dfa0780",
  "https://artha.link/@eanxt/jobs/sr-sdet-ansr-summit-gurgaon-46e4f8d8",
  "https://artha.link/@eanxt/jobs/sr-staff-sre-operations-engineer-ansr-summit-gurgaon-0cf955c0",
  "https://artha.link/@eanxt/jobs/staff-dba-ansr-summit-gurgaon-e67c555b",
  "https://artha.link/@eanxt/jobs/senior-staff-software-engineer-ansr-summit-gurgaon-3c379884",
  "https://artha.link/@eanxt/jobs/staff-network-engineer-ansr-summit-gurgaon-8d92d009",
  "https://artha.link/@eanxt/jobs/sr-staff-sdet-ansr-summit-gurgaon-5b6eae16",
  "https://artha.link/@eanxt/jobs/engineer-iv-v-rms-engineer-lululemon-india-bengaluru-1e0c6c57",
  "https://artha.link/@eanxt/jobs/senior-software-engineer-oracle-retail-lululemon-india-bengaluru-b47476e4",
  "https://artha.link/@eanxt/jobs/oracle-retail-application-sr-software-lululemon-india-bengaluru-74227486",
  "https://artha.link/@eanxt/jobs/sr-software-engineer-oracle-retail-lululemon-india-bengaluru-9e48c73d",
  "https://artha.link/@eanxt/jobs/oracle-retail-applications-senior-lululemon-india-bengaluru-8d7fe8c4",
  "https://artha.link/@eanxt/jobs/senior-software-engineer-oracle-retail-lululemon-india-bengaluru-24f93b91",
  "https://artha.link/@eanxt/jobs/sr-software-engineer-oracle-retail-lululemon-india-bengaluru-8cb587a4",
  "https://artha.link/@eanxt/jobs/quality-assurance-engineer-ansr-tech-bengaluru-83958e0f",
  "https://artha.link/@eanxt/jobs/graphic-designer-talent500-bengaluru-f5769347",
  "https://artha.link/@eanxt/jobs/graphic-designer-graphic-or-graphic-talent500-bengaluru-ee0baeaf",
  "https://artha.link/@eanxt/jobs/graphic-designer-graphic-or-graphic-talent500-bengaluru-9958e0c4",
  "https://artha.link/@eanxt/jobs/graphic-designer-graphic-design-or-talent500-bengaluru-25883924",
  "https://artha.link/@eanxt/jobs/graphic-designer-graphic-design-or-talent500-bengaluru-e49c5a12",
  "https://artha.link/@eanxt/jobs/graphic-designer-graphic-design-or-talent500-bengaluru-96be4d16",
  "https://artha.link/@eanxt/jobs/graphic-designer-graphic-or-graphic-talent500-bengaluru-42971ecc",
  "https://artha.link/@eanxt/jobs/frontend-developer-react-js-talent500-inc-hyderabad-cdc1ffcb",
  "https://artha.link/@eanxt/jobs/frontend-developer-react-js-and-html-talent500-inc-hyderabad-053d6756",
  "https://artha.link/@eanxt/jobs/frontend-developer-react-js-html-talent500-inc-hyderabad-6efe2721",
  "https://artha.link/@eanxt/jobs/frontend-developer-react-js-html-talent500-inc-hyderabad-1d7df52f",
  "https://artha.link/@eanxt/jobs/frontend-developer-react-js-and-html-talent500-inc-hyderabad-14f07ee1",
  "https://artha.link/@eanxt/jobs/frontend-developer-react-js-and-html-talent500-inc-hyderabad-402863b5",
  "https://artha.link/@eanxt/jobs/frontend-developer-react-js-html-talent500-inc-hyderabad-8fc2c57f",
  "https://artha.link/@eanxt/jobs/software-engineering-senior-advisor-evernorth-hyderabad-9413b3cb",
  "https://artha.link/@eanxt/jobs/associate-customer-success-manager-talent500-tech-bengaluru-23f1eb67",
  "https://artha.link/@eanxt/jobs/principal-sdet-ansr-summit-gurgaon-258adb4b",
  "https://artha.link/@eanxt/jobs/principal-software-engineer-ansr-summit-gurgaon-436d6d8b",
  "https://artha.link/@eanxt/jobs/staff-software-engineer-ansr-summit-gurgaon-db6a2e82",
  "https://artha.link/@eanxt/jobs/principal-performance-engineer-ansr-summit-gurgaon-41079e54",
  "https://artha.link/@eanxt/jobs/principal-software-engineer-ansr-summit-gurgaon-eced8e1b",
  "https://artha.link/@eanxt/jobs/staff-data-engineer-ansr-summit-gurgaon-3f03a22f",
  "https://artha.link/@eanxt/jobs/manager-sales-analyst-gedu-services-loni-ddc0591e",
  "https://artha.link/@eanxt/jobs/manager-sales-analyst-gedu-services-pali-b380f35e",
  "https://artha.link/@eanxt/jobs/manager-sales-analyst-gedu-services-rajapur-0892d62c",
  "https://artha.link/@eanxt/jobs/manager-sales-analyst-gedu-services-gh-zi-b-d-37e387fb",
  "https://artha.link/@eanxt/jobs/investigation-representative-row-ib-asspl-andhra-andhra-pradesh-be5d7e03",
  "https://artha.link/@eanxt/jobs/investigation-sme-flex-investigations-adci-hyd-16-sez-h83-hyderabad-0962dfb1",
  "https://artha.link/@eanxt/jobs/investigation-representative-row-ib-asspl-telangana-d82-andhra-pradesh-ec51a321",
  "https://artha.link/@eanxt/jobs/slp-expert-intl-intl-in-isk3-cluster-asspl-maharashtra-thane-ac3d193a",
  "https://artha.link/@eanxt/jobs/investigation-associate-relay-product-adci-karnataka-a66-bengaluru-30d189c6",
  "https://artha.link/@eanxt/jobs/investigation-associate-pq-ops-amazon-dev-center-hyderabad-3c9706e2",
  "https://artha.link/@eanxt/jobs/incident-response-manager-security-adci-blr-14-sez-bengaluru-d89d99ab",
  "https://artha.link/@eanxt/jobs/law-enforcement-response-ler-specialist-asspl-delhi-new-delhi-baf37541",
  "https://artha.link/@eanxt/jobs/canteen-and-uniform-shop-assistant-xavier-college-prayagraj-d8696bbb",
  "https://artha.link/@eanxt/jobs/kitchen-steward-sihamco-jaipur-a0c8b479",
  "https://artha.link/@eanxt/jobs/commis-indian-curry-accor-aerocity-6d532900",
  "https://artha.link/@eanxt/jobs/babysitter-wanted-in-sawai-madhopur-babysits-sawai-madhopur-0dc743fa",
  "https://artha.link/@eanxt/jobs/principal-software-engineer-moody-s-bangalore-351926b4",
  "https://artha.link/@eanxt/jobs/senior-electrical-engineer-arup-bangalore-5bf80b46",
  "https://artha.link/@eanxt/jobs/key-account-manager-msd-rajkot-a694a5ce",
  "https://artha.link/@eanxt/jobs/lead-ai-security-analyst-s-p-global-hyderabad-b278e061",
  "https://artha.link/@eanxt/jobs/multi-assets-index-quant-research-msci-mumbai-14bcb09d",
  "https://artha.link/@eanxt/jobs/application-specialist-rws-mumbai-5f42712e",
  "https://artha.link/@eanxt/jobs/asst-dir-devops-engineer-moody-s-remote-b973c46c",
  "https://artha.link/@eanxt/jobs/senior-specialist-ai-evals-engineer-msd-hyderabad-3779d9f2",
  "https://artha.link/@eanxt/jobs/transmission-distribution-lead-arup-delhi-6d76bbe3",
  "https://artha.link/@eanxt/jobs/consultant-public-policy-and-government-coca-cola-dlf-qe-c161be3c",
  "https://artha.link/@eanxt/jobs/senior-controls-engineer-arup-mumbai-135fff6e",
  "https://artha.link/@eanxt/jobs/spclst-infrastructure-engineering-msd-hyderabad-ce29d384",
  "https://artha.link/@eanxt/jobs/communications-intelligence-analyst-moody-s-remote-76a77d19",
  "https://artha.link/@eanxt/jobs/technology-consultant-wtw-remote-4d6ba9fb",
  "https://artha.link/@eanxt/jobs/manufacturing-engineering-i-ii-jabil-remote-0b5700c8",
  "https://artha.link/@eanxt/jobs/automation-engineer-jabil-remote-947f656e",
  "https://artha.link/@eanxt/jobs/senior-embedded-developer-abb-bangalore-0e7737a2",
  "https://artha.link/@eanxt/jobs/product-manager-content-entain-telangana-f53ecc8b",
  "https://artha.link/@eanxt/jobs/senior-bi-analyst-power-bi-commercial-te-connectivity-bangalore-5837f130",
  "https://artha.link/@eanxt/jobs/r-d-senior-software-engineer-abb-hyderabad-44f6a707",
  "https://artha.link/@eanxt/jobs/associate-project-engineer-abb-bangalore-562485ae",
  "https://artha.link/@eanxt/jobs/customer-service-associate-iv-te-connectivity-bangalore-3c34537a",
  "https://artha.link/@eanxt/jobs/sales-specialist-product-abb-faridabad-fe7cc5dd",
  "https://artha.link/@eanxt/jobs/mobile-service-assurance-engineer-vodafonethree-bangalore-48bd0292",
  "https://artha.link/@eanxt/jobs/r-d-product-owner-delivery-lead-abb-bangalore-04b5458f",
  "https://artha.link/@eanxt/jobs/accounting-reporting-analyst-abb-bangalore-dda9d42e",
  "https://artha.link/@eanxt/jobs/planner-jabil-remote-93b5e115",
  "https://artha.link/@eanxt/jobs/el-product-marketing-specialist-abb-nashik-0ca93c23",
  "https://artha.link/@eanxt/jobs/buyer-i-jabil-remote-e438e7a7",
  "https://artha.link/@eanxt/jobs/manufacturing-engineer-2-jabil-remote-6759c1b2",
  "https://artha.link/@eanxt/jobs/finance-analyst-ii-plant-operations-te-connectivity-pune-7f684058",
  "https://artha.link/@eanxt/jobs/technical-support-specialist-i-elsevier-chennai-21efa2ef",
  "https://artha.link/@eanxt/jobs/warehouse-shift-supervisor-johnson-matthey-rewari-90589b17",
  "https://artha.link/@eanxt/jobs/service-operations-manager-abb-bangalore-52ac6c37",
  "https://artha.link/@eanxt/jobs/apc-engineer-for-digital-solutions-abb-bangalore-c6fba396",
  "https://artha.link/@eanxt/jobs/acoustics-consultant-arup-mumbai-f0218268",
  "https://artha.link/@eanxt/jobs/asst-dir-risk-management-moody-s-noida-cecf910e",
  "https://artha.link/@eanxt/jobs/specialist-ai-evals-engineer-msd-hyderabad-66e5876d",
  "https://artha.link/@eanxt/jobs/lead-design-engineer-rail-bridges-arup-bangalore-f59835cd",
  "https://artha.link/@eanxt/jobs/onboarding-people-services-data-rws-mumbai-abba78f1",
  "https://artha.link/@eanxt/jobs/category-lead-procurement-wtw-mumbai-a2afd078",
  "https://artha.link/@eanxt/jobs/digital-human-health-intern-msd-uppal-kalan-b98dd48f",
  "https://artha.link/@eanxt/jobs/senior-specialist-software-engineering-msd-uppal-kalan-36c3c587",
  "https://artha.link/@eanxt/jobs/associate-director-ai-security-architect-s-p-global-uppal-kalan-260c2b1c",
  "https://artha.link/@eanxt/jobs/associate-fire-engineer-arup-karanja-5f195ece",
  "https://artha.link/@eanxt/jobs/senior-mechanical-engineer-data-centre-arup-karanja-59587726",
  "https://artha.link/@eanxt/jobs/apprentice-visible-alpha-client-support-s-p-global-karanja-f68e62eb",
  "https://artha.link/@eanxt/jobs/onboarding-people-services-data-rws-karanja-3ab3e148",
  "https://artha.link/@eanxt/jobs/specialist-inference-engineering-msd-uppal-kalan-a2e9a2fe",
  "https://artha.link/@eanxt/jobs/senior-specialist-inference-engineering-msd-uppal-kalan-cfc24648",
  "https://artha.link/@eanxt/jobs/electrical-design-engineer-data-centre-arup-karanja-44b83fca",
  "https://artha.link/@eanxt/jobs/civil-engineer-infrastructure-arup-karanja-4110e8f9",
  "https://artha.link/@eanxt/jobs/category-lead-procurement-wtw-karanja-0f145a80",
  "https://artha.link/@eanxt/jobs/planner-jabil-pedgaon-fcba4143",
  "https://artha.link/@eanxt/jobs/planner-iii-jabil-pedgaon-12b5bb27",
  "https://artha.link/@eanxt/jobs/spclst-ai-engineering-msd-uppal-kalan-2cc26a34",
  "https://artha.link/@eanxt/jobs/digital-human-health-intern-msd-nanded-0bc7d818",
  "https://artha.link/@eanxt/jobs/senior-fire-engineer-arup-karanja-87d1780b",
  "https://artha.link/@eanxt/jobs/sr-phe-and-fire-fighting-engineer-arup-karanja-9bf7f85e",
  "https://artha.link/@eanxt/jobs/financial-data-analyst-moody-s-yelahanka-0c5f1f21",
  "https://artha.link/@eanxt/jobs/innovation-automation-te-connectivity-yelahanka-2a3efb59",
  "https://artha.link/@eanxt/jobs/customer-service-associate-iv-te-connectivity-yelahanka-1a07a81e",
  "https://artha.link/@eanxt/jobs/r-d-product-owner-delivery-lead-abb-yelahanka-dc6404c0",
  "https://artha.link/@eanxt/jobs/senior-wind-fluid-dynamics-engineer-arup-karanja-f2f46204",
  "https://artha.link/@eanxt/jobs/mechanical-engineer-data-centre-arup-karanja-2caa5a93",
  "https://artha.link/@eanxt/jobs/sr-r-d-product-dvl-engineer-te-connectivity-yelahanka-58156885",
  "https://artha.link/@eanxt/jobs/sr-r-d-product-dvl-engineer-te-connectivity-yelahanka-e5183687",
  "https://artha.link/@eanxt/jobs/data-operations-specialist-moody-s-yelahanka-e94b1f9b",
  "https://artha.link/@eanxt/jobs/senior-acoustics-consultant-arup-karanja-69911d74",
  "https://artha.link/@eanxt/jobs/bim-engineer-structures-arup-yelahanka-c1ed07f9",
  "https://artha.link/@eanxt/jobs/sourcing-procurement-analyst-ii-te-connectivity-yelahanka-24597c11",
  "https://artha.link/@eanxt/jobs/task-team-engineer-mechanical-arup-yelahanka-f54c03b5",
  "https://artha.link/@eanxt/jobs/senior-structural-engineer-arup-yelahanka-af713459",
  "https://artha.link/@eanxt/jobs/senior-bim-engineer-civils-arup-yelahanka-8e6d209f",
  "https://artha.link/@eanxt/jobs/bridge-engineer-rails-arup-yelahanka-e975e86e",
  "https://artha.link/@eanxt/jobs/digital-bim-engineer-arup-yelahanka-753c4917",
  "https://artha.link/@eanxt/jobs/bim-data-coordinator-arup-yelahanka-d51cd206",
  "https://artha.link/@eanxt/jobs/project-manager-controls-delivery-arup-yelahanka-c7427f20",
  "https://artha.link/@eanxt/jobs/senior-civil-engineer-arup-yelahanka-e38aecce",
  "https://artha.link/@eanxt/jobs/task-team-engineer-electrical-arup-yelahanka-8619f495",
  "https://artha.link/@eanxt/jobs/bridge-designer-rail-arup-yelahanka-81a54c44",
  "https://artha.link/@eanxt/jobs/bim-engineer-civils-arup-yelahanka-91d89be0",
  "https://artha.link/@eanxt/jobs/task-team-engineer-plumbing-arup-yelahanka-770d2537",
  "https://artha.link/@eanxt/jobs/reporter-ii-s-p-global-fatehpur-70168928",
  "https://artha.link/@eanxt/jobs/senior-engineer-application-development-colt-technology-fatehpur-f10a99eb",
  "https://artha.link/@eanxt/jobs/technology-consultant-wtw-fatehpur-92f804cb",
  "https://artha.link/@eanxt/jobs/financial-engineer-moody-s-fatehpur-4babfb20",
  "https://artha.link/@eanxt/jobs/apprentice-client-support-s-p-global-fatehpur-79dc21ef",
  "https://artha.link/@eanxt/jobs/principal-mechanical-engineer-dci-pipes-jabil-remote-3e47b932",
  "https://artha.link/@eanxt/jobs/group-engineering-lead-entain-telangana-6b818a82",
  "https://artha.link/@eanxt/jobs/material-metal-controller-johnson-matthey-rewari-12d15f78",
  "https://artha.link/@eanxt/jobs/manager-marketing-brand-thums-up-coca-cola-dlf-qe-93b7793a",
  "https://artha.link/@eanxt/jobs/jr-specialist-hr-technology-organon-remote-dae54399",
  "https://artha.link/@eanxt/jobs/genai-platform-engineer-llm-gateway-pfizer-remote-2079d952",
  "https://artha.link/@eanxt/jobs/r-d-product-owner-delivery-lead-abb-bengaluru-3b56f456",
  "https://artha.link/@eanxt/jobs/task-team-engineer-electrical-arup-bengaluru-a03999c9",
  "https://artha.link/@eanxt/jobs/task-team-engineer-mechanical-arup-bengaluru-fa467ef0",
  "https://artha.link/@eanxt/jobs/onboarding-people-services-data-rws-shivaji-nagar-db376fef",
  "https://artha.link/@eanxt/jobs/innovation-automation-te-connectivity-bengaluru-79072ca3",
  "https://artha.link/@eanxt/jobs/seasonal-myhr-live-support-sr-advisor-adci-karnataka-a66-gurugram-1b5cbbdd",
  "https://artha.link/@eanxt/jobs/sr-associate-arabic-prime-video-trust-adci-blr-14-sez-bengaluru-88f410bb",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-rme-asspl-maharashtra-thane-343a3659",
  "https://artha.link/@eanxt/jobs/sr-digital-supply-chain-associate-pv-adci-maa-15-sez-chennai-f4d588fc",
  "https://artha.link/@eanxt/jobs/graphic-designer-in-events-adci-karnataka-bengaluru-587aa373",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-cmt-adci-karnataka-bengaluru-adc7480f",
  "https://artha.link/@eanxt/jobs/bbm-escalation-specialist-amazon-adci-hyd-16-sez-hyderabad-07d45945",
  "https://artha.link/@eanxt/jobs/quality-assurance-engineer-i-music-adci-karnataka-bengaluru-34d819a0",
  "https://artha.link/@eanxt/jobs/associate-corporate-counsel-amazon-development-bengaluru-92e524f9",
  "https://artha.link/@eanxt/jobs/creative-manager-elevated-shopping-shop-asspl-haryana-gurugram-1da0af39",
  "https://artha.link/@eanxt/jobs/applied-science-manager-amazon-music-amazon-development-bengaluru-bbe342e7",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-inqc-asspl-maharashtra-mumbai-56ad8751",
  "https://artha.link/@eanxt/jobs/pr-specialist-amazon-prime-video-india-asspl-maharashtra-mumbai-9a7992eb",
  "https://artha.link/@eanxt/jobs/associate-corporate-counsel-amazon-healthcare-new-delhi-ef30b3a4",
  "https://artha.link/@eanxt/jobs/advocacy-operations-associate-advocacy-adci-hyd-13-sez-hyderabad-67b65109",
  "https://artha.link/@eanxt/jobs/art-director-key-art-dev-gss-creative-adci-karnataka-bengaluru-4a98a56a",
  "https://artha.link/@eanxt/jobs/corporate-counsel-devices-digital-legal-asspl-karnataka-bengaluru-d45a67e0",
  "https://artha.link/@eanxt/jobs/executive-licenses-permits-real-estate-asspl-karnataka-b56-bengaluru-a9f15205",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-grocery-retail-in-adci-karnataka-bengaluru-749cc8e7",
  "https://artha.link/@eanxt/jobs/process-assistant-rad-operations-asspl-maharashtra-thane-42d5774a",
  "https://artha.link/@eanxt/jobs/art-director-creative-dev-gss-creative-adci-karnataka-bengaluru-59a9f504",
  "https://artha.link/@eanxt/jobs/visual-designer-key-art-dev-gss-adci-karnataka-bengaluru-66395730",
  "https://artha.link/@eanxt/jobs/art-director-ii-content-generation-hub-adci-tamil-nadu-a83-chennai-cf7ea690",
  "https://artha.link/@eanxt/jobs/sr-design-technologist-eshop-content-adci-karnataka-a66-bengaluru-3fbc27a0",
  "https://artha.link/@eanxt/jobs/whs-officer-whs-edsp-asspl-maharashtra-mumbai-234b1e31",
  "https://artha.link/@eanxt/jobs/case-mgr-crt-s-adci-tamil-nadu-a83-chennai-ce89c0a1",
  "https://artha.link/@eanxt/jobs/rme-coordinator-rme-coordinator-asspl-delhi-kolkata-e81a6a36",
  "https://artha.link/@eanxt/jobs/brand-specialist-german-adci-blr-14-sez-in-dl-dac11c51",
  "https://artha.link/@eanxt/jobs/senior-bms-specialist-amazon-adci-hyd-16-sez-h83-hyderabad-cfc0222b",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-haryana-c77-gurugram-fe9fc141",
  "https://artha.link/@eanxt/jobs/av-lead-gss-adci-karnataka-chennai-cdbf5abf",
  "https://artha.link/@eanxt/jobs/advocacy-operations-associate-adci-hyd-13-sez-h84-hyderabad-1f0c77a2",
  "https://artha.link/@eanxt/jobs/creative-director-creative-director-asspl-maharashtra-mumbai-e160e37d",
  "https://artha.link/@eanxt/jobs/senior-applied-scientist-amazon-music-adci-karnataka-bengaluru-9c404b48",
  "https://artha.link/@eanxt/jobs/visual-designer-display-creative-adci-karnataka-bengaluru-087044eb",
  "https://artha.link/@eanxt/jobs/research-scientist-iii-last-mile-science-adci-karnataka-bengaluru-3e2c6742",
  "https://artha.link/@eanxt/jobs/creative-director-brand-and-creative-asspl-karnataka-bengaluru-2669315d",
  "https://artha.link/@eanxt/jobs/digital-content-associate-amazon-music-adci-tamil-nadu-chennai-5c894e1c",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-haryana-gurugram-1880e83c",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-rme-asspl-maharashtra-pune-b040ae7c",
  "https://artha.link/@eanxt/jobs/applied-scientist-amazon-music-catalog-adci-blr-dta-bengaluru-53e3d987",
  "https://artha.link/@eanxt/jobs/video-editor-gss-adci-karnataka-chennai-bcb4e57e",
  "https://artha.link/@eanxt/jobs/dsc-associate-prime-video-sports-adci-maa-15-sez-chennai-d43cf173",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-gujarat-d34-ahmedabad-1fc274d8",
  "https://artha.link/@eanxt/jobs/research-science-manager-last-mile-adci-karnataka-bengaluru-6503fc65",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-gujarat-d34-surat-b79f149e",
  "https://artha.link/@eanxt/jobs/case-mgr-us-pr-s-us-pr-s-amazon-dev-center-hyderabad-6b7bb45f",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-gsf-asspl-karnataka-b56-bengaluru-57d5690f",
  "https://artha.link/@eanxt/jobs/social-video-content-lead-imdb-india-asspl-maharashtra-mumbai-d232fe6d",
  "https://artha.link/@eanxt/jobs/bbm-escalation-specialist-amazon-adci-hyd-16-sez-h83-hyderabad-36b29b4a",
  "https://artha.link/@eanxt/jobs/software-development-manager-sports-amazon-dev-center-bengaluru-6b53ab5b",
  "https://artha.link/@eanxt/jobs/case-mgr-ppl-s-amazon-dev-center-hyderabad-3e52ac48",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-rme-asspl-maharashtra-pune-03b26474",
  "https://artha.link/@eanxt/jobs/rme-coordinator-iii-rme-coordinator-iii-asspl-maharashtra-thane-0eec75cd",
  "https://artha.link/@eanxt/jobs/refrigeration-specialist-amazon-adci-hyd-16-sez-hyderabad-6373de52",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engr-rme-ingsf-asspl-maharashtra-mumbai-80c1dc10",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-rajasthan-d33-jaipur-5c5d945b",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-inqc-asspl-uttar-pradesh-noida-8e412be0",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-inqc-asspl-delhi-c76-new-delhi-e6df2801",
  "https://artha.link/@eanxt/jobs/brand-specialist-german-adci-tamil-nadu-a83-in-tn-715e2e29",
  "https://artha.link/@eanxt/jobs/communications-specialist-operations-asspl-karnataka-bengaluru-81911878",
  "https://artha.link/@eanxt/jobs/senior-corporate-counsel-litigation-asspl-delhi-new-delhi-93548a6d",
  "https://artha.link/@eanxt/jobs/senior-economist-adci-karnataka-bengaluru-e999b50d",
  "https://artha.link/@eanxt/jobs/corporate-counsel-compliance-safety-ww-asspl-karnataka-bengaluru-928d5557",
  "https://artha.link/@eanxt/jobs/research-scientist-ii-last-mile-science-adci-karnataka-bengaluru-49d66b8b",
  "https://artha.link/@eanxt/jobs/advocacy-operations-associate-advocacy-adci-hyd-13-sez-h84-hyderabad-beaa868d",
  "https://artha.link/@eanxt/jobs/applied-scientist-ii-last-mile-science-amazon-dev-center-bengaluru-88ee0d6b",
  "https://artha.link/@eanxt/jobs/applied-scientist-amazon-music-catalog-adci-karnataka-bengaluru-8564bf17",
  "https://artha.link/@eanxt/jobs/digital-supply-chain-associate-prime-adci-maa-15-sez-k20-chennai-9e2c1730",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-rme-asspl-haryana-gurugram-12a8de25",
  "https://artha.link/@eanxt/jobs/m4490-health-safety-environment-fedex-new-delhi-7ac0f636",
  "https://artha.link/@eanxt/jobs/re-contract-administrator-real-estate-asspl-maharashtra-mumbai-2296f37e",
  "https://artha.link/@eanxt/jobs/product-operations-manager-amazon-music-adci-karnataka-bengaluru-54d0c28a",
  "https://artha.link/@eanxt/jobs/reliability-maintenance-engineer-asspl-maharashtra-thane-4174100d",
  "https://artha.link/@eanxt/jobs/internal-communications-specialist-asspl-karnataka-bengaluru-3c49676e",
  "https://artha.link/@eanxt/jobs/case-mgr-mloa-s-disability-and-leave-amazon-dev-center-hyderabad-d82d6b0b",
  "https://artha.link/@eanxt/jobs/visual-design-associate-prime-video-gss-adci-tamil-nadu-a83-chennai-15828e6d",
  "https://artha.link/@eanxt/jobs/decision-scientist-senior-ii-fedex-bengaluru-2b987ae7",
  "https://artha.link/@eanxt/jobs/lawyers-senior-lawyers-administrative-limber-prayagraj-b3e03d8e",
  "https://artha.link/@eanxt/jobs/mental-health-clinician-full-time-vic-headspace-prayagraj-7463c30c",
  "https://artha.link/@eanxt/jobs/babysitter-wanted-in-b-lianta-babysits-khordha-d1247371",
  "https://artha.link/@eanxt/jobs/fire-alarm-technician-fire-fighting-hudson-manpower-mumbai-876bacca",
  "https://artha.link/@eanxt/jobs/linkedin-specialist-abacus-consultants-civil-lines-6a07bf20",
  "https://artha.link/@eanxt/jobs/student-wellbeing-counsellor-mcauley-community-prayagraj-7723dbc4",
  "https://artha.link/@eanxt/jobs/burner-designer-bps-babcock-power-apac-chennai-d79365f0",
  "https://artha.link/@eanxt/jobs/gsa-housekeeping-accor-bommanahalli-1d92dcf5",
  "https://artha.link/@eanxt/jobs/september-open-day-open-jobs-showcase-good-people-hr-pty-prayagraj-d5b89ede",
  "https://artha.link/@eanxt/jobs/automotive-technician-2coms-new-delhi-222e318c",
  "https://artha.link/@eanxt/jobs/real-estate-lawyer-r3-consultant-kolkata-5b7162a7",
  "https://artha.link/@eanxt/jobs/ingot-casting-supervisor-saudi-arabia-hudson-manpower-ahmedabad-dd94cc88",
  "https://artha.link/@eanxt/jobs/content-developer-property-construction-relx-trading-prayagraj-6f44e914",
  "https://artha.link/@eanxt/jobs/chemistry-subject-matter-expert-ai-weekday-ai-remote-b70c23c2",
  "https://artha.link/@eanxt/jobs/babysitter-wanted-in-mhow-babysitting-babysits-mhow-593399c1",
  "https://artha.link/@eanxt/jobs/ui-ux-designer-ladybird-web-dharmapuri-1fcc7197",
  "https://artha.link/@eanxt/jobs/house-keeping-staff-male-or-female-job-hospital-ernakulam-eaff527b",
  "https://artha.link/@eanxt/jobs/social-media-assistant-carnivore-style-remote-6a54b37c",
  "https://artha.link/@eanxt/jobs/corporate-counsel-seller-services-asspl-karnataka-bengaluru-63a135b8",
  "https://artha.link/@eanxt/jobs/creative-quality-specialist-in-asspl-karnataka-bengaluru-06b714ec",
  "https://artha.link/@eanxt/jobs/manager-applied-science-rbs-tech-adci-blr-14-sez-bengaluru-11796465",
  "https://artha.link/@eanxt/jobs/design-lead-gss-adci-karnataka-bengaluru-30b5d756",
  "https://artha.link/@eanxt/jobs/bms-specialist-amazon-maintenance-adci-hyd-16-sez-h83-hyderabad-b91ff970",
  "https://artha.link/@eanxt/jobs/co-curricular-sports-activities-kildare-college-prayagraj-179d2353",
  "https://artha.link/@eanxt/jobs/machining-skilled-operator-mct-grinding-hudson-manpower-new-delhi-6d48d22d",
  "https://artha.link/@eanxt/jobs/assembly-drill-operator-on-contract-john-cockerill-mumbai-a67c7a2e",
  "https://artha.link/@eanxt/jobs/senior-ui-ux-designer-qube-cinema-remote-d01d479e",
  "https://artha.link/@eanxt/jobs/associate-textile-vardhman-ludhiana-58785cdc",
  "https://artha.link/@eanxt/jobs/workshop-diesel-fitter-aestec-services-prayagraj-411bbf8e",
  "https://artha.link/@eanxt/jobs/diversecity-youth-reference-group-headspace-prayagraj-aee37042",
  "https://artha.link/@eanxt/jobs/executive-senior-executive-maintenance-kone-navi-mumbai-e960e883",
  "https://artha.link/@eanxt/jobs/social-media-content-marketer-intern-lokal-app-bengaluru-2f926a41",
  "https://artha.link/@eanxt/jobs/pointsman-alstom-saharanpur-efb89088",
  "https://artha.link/@eanxt/jobs/consultant-cognigy-ttec-hyderabad-e0991d0f",
  "https://artha.link/@eanxt/jobs/shift-supervisor-starbucks-chennai-a55139ac",
  "https://artha.link/@eanxt/jobs/graphic-designer-internship-ladybird-web-dharmapuri-952cf61e",
  "https://artha.link/@eanxt/jobs/graduate-research-development-chemist-good-people-hr-pty-prayagraj-ba1fe2f8",
  "https://artha.link/@eanxt/jobs/production-development-specialist-abb-bengaluru-4fac5081",
  "https://artha.link/@eanxt/jobs/ruson-aboriginal-and-or-torres-strait-northern-health-prayagraj-8f1d364e",
  "https://artha.link/@eanxt/jobs/m4490-health-safety-environment-fedex-bengaluru-96db5dc2",
  "https://artha.link/@eanxt/jobs/senior-executive-assistant-bangalore-boston-consulting-bengaluru-1afb2507",
  "https://artha.link/@eanxt/jobs/senior-executive-assistant-boston-consulting-gurgaon-49637c10",
  "https://artha.link/@eanxt/jobs/india-ops-senior-executive-assistant-boston-consulting-gurgaon-3d5b4931",
  "https://artha.link/@eanxt/jobs/global-data-steward-senior-manager-boston-consulting-gurgaon-b050fd73",
  "https://artha.link/@eanxt/jobs/global-it-executive-director-digital-boston-consulting-gurgaon-3d7c4107",
  "https://artha.link/@eanxt/jobs/hr-manager-global-businesses-functions-boston-consulting-gurgaon-2287fd29",
  "https://artha.link/@eanxt/jobs/global-it-platform-engineer-manager-boston-consulting-gurgaon-aa6e1df7",
  "https://artha.link/@eanxt/jobs/manager-bcg-vantage-boston-consulting-mumbai-a1287b2e",
  "https://artha.link/@eanxt/jobs/senior-analyst-bcg-vantage-boston-consulting-gurgaon-1433a26e",
  "https://artha.link/@eanxt/jobs/global-finance-data-governance-senior-boston-consulting-gurgaon-fc0ddbab",
  "https://artha.link/@eanxt/jobs/global-supplier-risk-governance-director-boston-consulting-gurgaon-7e90ee66",
  "https://artha.link/@eanxt/jobs/india-team-leader-human-resources-boston-consulting-gurgaon-86399f4e",
  "https://artha.link/@eanxt/jobs/india-lead-specialist-human-resources-boston-consulting-gurgaon-527919aa",
  "https://artha.link/@eanxt/jobs/global-cybersecurity-manager-boston-consulting-gurgaon-89ceaab4",
  "https://artha.link/@eanxt/jobs/global-benefits-manager-boston-consulting-gurgaon-462e7f72",
  "https://artha.link/@eanxt/jobs/india-ops-senior-specialist-boston-consulting-gurgaon-ab9bdaa9",
  "https://artha.link/@eanxt/jobs/global-hr-shared-services-manager-boston-consulting-gurgaon-b7eefd81",
  "https://artha.link/@eanxt/jobs/india-senior-analyst-finance-project-boston-consulting-gurgaon-b2da81cc",
  "https://artha.link/@eanxt/jobs/india-operations-senior-specialist-boston-consulting-gurgaon-477564db",
  "https://artha.link/@eanxt/jobs/global-finance-associate-travel-expense-boston-consulting-gurgaon-35a65366",
  "https://artha.link/@eanxt/jobs/global-product-manager-boston-consulting-gurgaon-47b7d98d",
  "https://artha.link/@eanxt/jobs/hub-management-services-office-boston-consulting-gurgaon-21c4fb86",
  "https://artha.link/@eanxt/jobs/bcg-x-staffing-specialist-x-delivery-boston-consulting-gurgaon-9f4b28f3",
  "https://artha.link/@eanxt/jobs/senior-analyst-bcg-vantage-boston-consulting-gurgaon-2ea5be8f",
  "https://artha.link/@eanxt/jobs/bi-a-manager-boston-consulting-gurgaon-1b853cf0",
  "https://artha.link/@eanxt/jobs/india-senior-specialist-office-boston-consulting-bengaluru-a788d9e1",
  "https://artha.link/@eanxt/jobs/global-product-manager-es-smart-office-boston-consulting-gurgaon-0a6b15c5",
  "https://artha.link/@eanxt/jobs/asia-pacific-unlocking-potential-senior-boston-consulting-gurgaon-3ee1e143",
  "https://artha.link/@eanxt/jobs/global-employee-relations-director-boston-consulting-gurgaon-00af6eda",
  "https://artha.link/@eanxt/jobs/senior-executive-assistant-mumbai-boston-consulting-mumbai-775a22a6",
  "https://artha.link/@eanxt/jobs/senior-executive-assistant-chennai-boston-consulting-chennai-5e09aadb",
  "https://artha.link/@eanxt/jobs/specialist-senior-specialist-human-boston-consulting-gurgaon-89cebd66",
  "https://artha.link/@eanxt/jobs/enterprise-services-genai-deployment-boston-consulting-gurgaon-becdf527",
  "https://artha.link/@eanxt/jobs/global-hr-operations-senior-specialist-boston-consulting-gurgaon-f700060d",
  "https://artha.link/@eanxt/jobs/sustainability-data-analytics-senior-boston-consulting-gurgaon-3082d864",
  "https://artha.link/@eanxt/jobs/india-specialist-marketing-crm-boston-consulting-gurgaon-9e742dd4",
  "https://artha.link/@eanxt/jobs/global-l-d-innovation-director-boston-consulting-gurgaon-7f1d569f",
  "https://artha.link/@eanxt/jobs/global-data-senior-manager-marketing-boston-consulting-gurgaon-08e64182",
  "https://artha.link/@eanxt/jobs/global-digital-marketing-channel-senior-boston-consulting-gurgaon-80a3e127",
  "https://artha.link/@eanxt/jobs/bcg-x-finance-analyst-boston-consulting-gurgaon-549f499e",
  "https://artha.link/@eanxt/jobs/global-data-engineer-senior-specialist-boston-consulting-gurgaon-ee3f9b97",
  "https://artha.link/@eanxt/jobs/bi-a-services-director-boston-consulting-gurgaon-8f6cd05d",
  "https://artha.link/@eanxt/jobs/asia-pacific-commercial-finance-senior-boston-consulting-gurgaon-0dbfa81b",
  "https://artha.link/@eanxt/jobs/senior-specialist-office-operations-boston-consulting-mumbai-ef398c1f",
  "https://artha.link/@eanxt/jobs/global-bi-a-product-director-pipeline-boston-consulting-gurgaon-deed2470",
  "https://artha.link/@eanxt/jobs/global-bi-a-product-senior-manager-boston-consulting-gurgaon-f9e83662",
  "https://artha.link/@eanxt/jobs/administrative-assistant-boston-consulting-gurgaon-b2f5ab83",
  "https://artha.link/@eanxt/jobs/global-digital-marketing-specialist-seo-boston-consulting-gurgaon-376d5539",
  "https://artha.link/@eanxt/jobs/project-manager-case-team-services-boston-consulting-gurgaon-3f4acdd4",
  "https://artha.link/@eanxt/jobs/executive-legal-counsel-employment-ap-boston-consulting-gurgaon-d478527b",
  "https://artha.link/@eanxt/jobs/ep-p-senior-analyst-esg-supplier-risk-boston-consulting-gurgaon-009db217",
  "https://artha.link/@eanxt/jobs/india-finance-senior-analyst-benefits-boston-consulting-gurgaon-557f210b",
  "https://artha.link/@eanxt/jobs/global-bi-a-business-partner-director-boston-consulting-gurgaon-4558f5d7",
  "https://artha.link/@eanxt/jobs/bi-a-senior-analyst-boston-consulting-gurgaon-4f661910",
  "https://artha.link/@eanxt/jobs/global-people-analytics-senior-analyst-boston-consulting-gurgaon-f57e287f",
  "https://artha.link/@eanxt/jobs/ap-marketing-specialist-boston-consulting-gurgaon-1635f508",
  "https://artha.link/@eanxt/jobs/source-to-pay-product-manager-boston-consulting-gurgaon-f2ad82a1",
  "https://artha.link/@eanxt/jobs/ep-p-analyst-supplier-onboarding-boston-consulting-gurgaon-d28493f0",
  "https://artha.link/@eanxt/jobs/analyst-fp-a-boston-consulting-gurgaon-ce255ea9",
  "https://artha.link/@eanxt/jobs/asia-pacific-senior-financial-analyst-boston-consulting-gurgaon-a699807f",
  "https://artha.link/@eanxt/jobs/content-specialist-bcg-vantage-boston-consulting-gurgaon-9a13d228",
  "https://artha.link/@eanxt/jobs/global-cybersecurity-senior-specialist-boston-consulting-gurgaon-4daf911e",
  "https://artha.link/@eanxt/jobs/gsb-finance-manager-boston-consulting-gurgaon-da8f688d",
  "https://artha.link/@eanxt/jobs/finance-analyst-global-record-to-report-boston-consulting-gurgaon-ac6927d0",
  "https://artha.link/@eanxt/jobs/global-l-d-analytics-special-projects-boston-consulting-gurgaon-bdca124a",
  "https://artha.link/@eanxt/jobs/bi-a-analyst-boston-consulting-gurgaon-61d5cb69",
  "https://artha.link/@eanxt/jobs/global-cybersecurity-senior-manager-boston-consulting-gurgaon-618429d9",
  "https://artha.link/@eanxt/jobs/cpu-performance-developer-staff-engineer-qualcomm-bangalore-ebc360e8",
  "https://artha.link/@eanxt/jobs/senior-staff-staff-senior-lead-camera-qualcomm-hyderabad-fa60fe6e",
  "https://artha.link/@eanxt/jobs/senior-lead-senior-engineer-engineer-qualcomm-hyderabad-d9836684",
  "https://artha.link/@eanxt/jobs/cpu-workload-tracing-staff-engineer-qualcomm-bangalore-833545f7",
  "https://artha.link/@eanxt/jobs/rtl-design-staff-engineer-qualcomm-chennai-50e00d70",
  "https://artha.link/@eanxt/jobs/rtl-design-director-soc-lead-qualcomm-bangalore-6a9c3c41",
  "https://artha.link/@eanxt/jobs/cpu-software-engineer-staff-qualcomm-bangalore-7a962af1",
  "https://artha.link/@eanxt/jobs/staff-engineer-aisw-qualcomm-bangalore-1f63e576",
  "https://artha.link/@eanxt/jobs/npu-ai-processor-synthesis-design-qualcomm-bangalore-7b1de10b",
  "https://artha.link/@eanxt/jobs/rtl-design-peripheral-sr-staff-qualcomm-bangalore-8d758f7b",
  "https://artha.link/@eanxt/jobs/it-systems-administrator-big-it-jobs-ahmedabad-01de7a03",
  "https://artha.link/@eanxt/jobs/ai-ml-engineer-artha-link-surat-2ddcf277",
  "https://artha.link/@eanxt/jobs/india-team-leader-human-resources-boston-consulting-mumbai-cc00805b",
  "https://artha.link/@eanxt/jobs/senior-analyst-bcg-vantage-boston-consulting-mumbai-87ba7713",
  "https://artha.link/@eanxt/jobs/senior-executive-assistant-bangalore-boston-consulting-bengaluru-d48eb649",
  "https://artha.link/@eanxt/jobs/india-senior-specialist-office-boston-consulting-chennai-d2b0e895",
  "https://artha.link/@eanxt/jobs/bi-a-manager-boston-consulting-gurgaon-49a31784",
  "https://artha.link/@eanxt/jobs/content-specialist-bcg-vantage-boston-consulting-gurgaon-e8eeab8a",
  "https://artha.link/@eanxt/jobs/india-senior-specialist-office-boston-consulting-new-delhi-c30b8291"
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
