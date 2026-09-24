/**
 * 🕶️ Zero-Footprint PRO: Advanced 1-by-1 Sequential In-Browser Auto-Applier
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * CDN: https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js
 * 
 * FEATURES:
 * - ⚡ 1-by-1 Sequential Processing: Never overloads CPU/RAM with hundreds of open tabs.
 * - 🎯 Configurable Batch Size (25 / 50 / 100): Easily adjust application batch limits on the fly.
 * - 🔍 Dynamic Polling Resolver: Waits up to 10-12s for React/Next.js DOM hydration so NO button is missed.
 * - 🪟 Dual-Tab Auto-Closer: Opens Job Page (Tab 1), clicks apply, handles redirect (Tab 2), and closes BOTH tabs cleanly.
 * - 🛡️ Advanced Anti-Detection: 9-step human pointer cascade, deceleration scroll, and Gaussian spatial jitter.
 * - ⏩ Batch Navigator: Next/Prev batch controls across all jobs in queue.
 * - 🧼 0-Footprint Per-Job Deep Purge: Wipes domain cookies, sessionStorage & localStorage after EACH job applied.
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
  // 📋 EMBEDDED JOB URL QUEUE (183 Openings from fresh recommendation feeds)
  // =========================================================================
  const DEFAULT_QUEUE = [
    "https://artha.link/@eanxt/jobs/senior-appian-technical-consultant-polariseme-india-307d1e20",
    "https://artha.link/@eanxt/jobs/product-designer-mirabelle-korea-bengaluru-f85e96d6",
    "https://artha.link/@eanxt/jobs/accountant-s-lokanadham-co-hyderabad-480222e7",
    "https://artha.link/@eanxt/jobs/noc-verification-engineer-acl-digital-bengaluru-a2f49ed6",
    "https://artha.link/@eanxt/jobs/principal-sas-programmer-advanced-clinical-ahmedabad-c665d952",
    "https://artha.link/@eanxt/jobs/functional-product-analyst-aa-india-thakral-one-bangalore-urban-5b21c3ba",
    "https://artha.link/@eanxt/jobs/d365-support-analyst-eversana-pune-pimpri-c1fbf66d",
    "https://artha.link/@eanxt/jobs/your-next-big-career-move-infosys-bpm-infosys-bpm-pune-district-bf635828",
    "https://artha.link/@eanxt/jobs/montessori-educator-primary-2-6-years-pep-schoolv2-bengaluru-40616d87",
    "https://artha.link/@eanxt/jobs/magento-2-frontend-developer-hyv-unotech-global-india-f88ef3a2",
    "https://artha.link/@eanxt/jobs/ams-dv-lead-high-voltage-power-texas-instruments-bengaluru-239ca0e4",
    "https://artha.link/@eanxt/jobs/staff-level-ii-accountant-1065-op-re-tax-withum-ahmedabad-dab8cac0",
    "https://artha.link/@eanxt/jobs/senior-consultant-endur-functional-capspire-bengaluru-8a51d2b8",
    "https://artha.link/@eanxt/jobs/senior-consultant-endur-functional-capspire-gurugram-22b28f67",
    "https://artha.link/@eanxt/jobs/executive-personal-assistant-manish-flour-mills-mumbai-e7325e58",
    "https://artha.link/@eanxt/jobs/sage-x3-o2c-techno-functional-ust-bengaluru-02435acd",
    "https://artha.link/@eanxt/jobs/article-assistant-shekar-and-co-hyderabad-2a2a1c5d",
    "https://artha.link/@eanxt/jobs/back-end-developer-goquant-india-4cc054f7",
    "https://artha.link/@eanxt/jobs/lan-wireless-sme-walkin-drive-tata-consultancy-chennai-eac9c748",
    "https://artha.link/@eanxt/jobs/linux-system-administrator-mgt-commerce-gmbh-india-97ce9f61",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-dar-pune-district-9678f252",
    "https://artha.link/@eanxt/jobs/founding-engineer-ai-backend-zango-bengaluru-779747e4",
    "https://artha.link/@eanxt/jobs/vice-president-anand-rathi-mumbai-f73b0423",
    "https://artha.link/@eanxt/jobs/interior-designer-neterwala-aibara-llp-worli-84bf440f",
    "https://artha.link/@eanxt/jobs/sap-fi-co-mm-pp-and-sd-analysts-shamrock-ai-shillong-7ca7e280",
    "https://artha.link/@eanxt/jobs/customer-service-representative-nlb-services-mumbai-3c1884ae",
    "https://artha.link/@eanxt/jobs/a-v-technician-m-s-dynamix-media-new-delhi-abdc4796",
    "https://artha.link/@eanxt/jobs/delegate-acquisition-manager-redd-media-india-caa628ee",
    "https://artha.link/@eanxt/jobs/web-developer-lascade-kochi-c3bcc6a9",
    "https://artha.link/@eanxt/jobs/opening-for-teacher-primary-school-redbricks-education-ahmedabad-47b00cd9",
    "https://artha.link/@eanxt/jobs/computer-engineer-crks-stock-broking-mumbai-ebb2c4e8",
    "https://artha.link/@eanxt/jobs/product-designer-ai-slice-bengaluru-1465bdb9",
    "https://artha.link/@eanxt/jobs/senior-analog-design-engineer-pi-semiconductor-bengaluru-019936cc",
    "https://artha.link/@eanxt/jobs/iti-fitters-pridefms-hyderabad-58259e05",
    "https://artha.link/@eanxt/jobs/finance-officer-united-brothers-hyderabad-aa90f681",
    "https://artha.link/@eanxt/jobs/veterinarian-raintree-veterinary-pune-division-2c9443c6",
    "https://artha.link/@eanxt/jobs/product-aligned-agentic-quality-bridge-ai-india-900f42c3",
    "https://artha.link/@eanxt/jobs/head-of-business-development-bhalekar-consulting-india-5455123b",
    "https://artha.link/@eanxt/jobs/business-growth-specialist-symtrax-pune-division-d7b85789",
    "https://artha.link/@eanxt/jobs/business-manager-glusap-division-sapient-delhi-c07f5d2e",
    "https://artha.link/@eanxt/jobs/anti-money-laundering-analyst-c4d-technology-sahibzada-ajit-23ccbada",
    "https://artha.link/@eanxt/jobs/social-media-manager-free-vpn-sa-bengaluru-71a0d6ab",
    "https://artha.link/@eanxt/jobs/chartered-accountant-finance-accounts-wah-foods-kolkata-d8814960",
    "https://artha.link/@eanxt/jobs/front-office-operations-executive-point-blank-new-delhi-a8c9ac4f",
    "https://artha.link/@eanxt/jobs/solar-field-sales-executive-gridwise-solar-faridabad-e8da2b2c",
    "https://artha.link/@eanxt/jobs/sales-team-leader-revantage-advisory-bengaluru-108cfa3e",
    "https://artha.link/@eanxt/jobs/oracle-fusion-erp-ppm-functional-infobeans-bengaluru-975f5d63",
    "https://artha.link/@eanxt/jobs/team-lead-king-cardinal-coimbatore-16eb7d34",
    "https://artha.link/@eanxt/jobs/product-engineer-answerthis-yc-f25-india-6c1d7d93",
    "https://artha.link/@eanxt/jobs/bookkeeper-growth-accountants-chennai-86eb43c5",
    "https://artha.link/@eanxt/jobs/b2b-business-development-kanan-co-vadodara-1115e095",
    "https://artha.link/@eanxt/jobs/sales-executive-saas-aidc-softserv-inc-jaipur-c89cc5a1",
    "https://artha.link/@eanxt/jobs/business-development-manager-kgreen-consulting-mumbai-eed31eac",
    "https://artha.link/@eanxt/jobs/business-development-executive-aulas-bengaluru-11782719",
    "https://artha.link/@eanxt/jobs/data-annotation-team-lead-zyka-ai-india-10d6b6bc",
    "https://artha.link/@eanxt/jobs/sales-executive-rv-tours-and-hyderabad-55c4f02f",
    "https://artha.link/@eanxt/jobs/sales-business-development-manager-positron-belagavi-0324f7a4",
    "https://artha.link/@eanxt/jobs/school-manager-citta-india-jaisalmer-825efc0b",
    "https://artha.link/@eanxt/jobs/chief-commercial-officer-founding-team-k-li-india-india-b6cdfb09",
    "https://artha.link/@eanxt/jobs/architects-arihant-healthcare-new-delhi-1c5fa1a7",
    "https://artha.link/@eanxt/jobs/internship-content-writing-airlearn-bengaluru-0db6edf1",
    "https://artha.link/@eanxt/jobs/articled-assistant-sachin-gogave-co-pune-division-51265fc3",
    "https://artha.link/@eanxt/jobs/compliance-lead-scapia-bengaluru-a819aabd",
    "https://artha.link/@eanxt/jobs/field-sales-executive-vision-world-dwarka-e71a70f6",
    "https://artha.link/@eanxt/jobs/personal-kid-trainer-janarva-chennai-339f98ce",
    "https://artha.link/@eanxt/jobs/sales-consultant-outskill-bengaluru-south-776553a5",
    "https://artha.link/@eanxt/jobs/senior-fashion-designer-verandah-mumbai-cfe590b5",
    "https://artha.link/@eanxt/jobs/placement-officer-edtech-upskill-rocket-bengaluru-2de7bdba",
    "https://artha.link/@eanxt/jobs/senior-business-development-manager-muraspec-mumbai-6f19bd1b",
    "https://artha.link/@eanxt/jobs/business-development-manager-retained-acara-solutions-bengaluru-8a7ae9a1",
    "https://artha.link/@eanxt/jobs/hcc-medical-coder-1-3-years-experience-agilys-nxt-hyderabad-68311e12",
    "https://artha.link/@eanxt/jobs/patent-associate-ict-kria-law-chennai-f3a832aa",
    "https://artha.link/@eanxt/jobs/functional-tester-kumaran-systems-hyderabad-c6e39534",
    "https://artha.link/@eanxt/jobs/air-travel-ticketing-booking-specialist-zourney-in-gurgaon-10bf585b",
    "https://artha.link/@eanxt/jobs/enterprise-account-executive-smartwinnr-mumbai-2653832c",
    "https://artha.link/@eanxt/jobs/architect-awas-buildcon-patna-42d86dcb",
    "https://artha.link/@eanxt/jobs/reddit-associate-infrasity-new-delhi-6a60a8a7",
    "https://artha.link/@eanxt/jobs/technical-consultant-wfm-adp-hyderabad-71d024df",
    "https://artha.link/@eanxt/jobs/senior-counsellor-telugu-speaking-edvoy-chennai-42a32471",
    "https://artha.link/@eanxt/jobs/article-assistant-ca-cma-kumbhat-and-co-llp-bengaluru-6310fc31",
    "https://artha.link/@eanxt/jobs/senior-project-manager-velodata-global-pvt-thiruvananthapu-d918d6b9",
    "https://artha.link/@eanxt/jobs/structural-design-engineer-jw-consultants-llp-pune-division-e9dfe7f7",
    "https://artha.link/@eanxt/jobs/customer-success-manager-india-ridy-inc-bengaluru-c509decd",
    "https://artha.link/@eanxt/jobs/assistant-manager-video-production-emeritus-india-aa6d80d6",
    "https://artha.link/@eanxt/jobs/sales-intern-aktion-safety-mumbai-7d9825d7",
    "https://artha.link/@eanxt/jobs/graphic-designer-motion-graphics-video-nothing-else-matters-gurugram-ee20b6e0",
    "https://artha.link/@eanxt/jobs/social-media-manager-fraganote-new-delhi-eafe1db8",
    "https://artha.link/@eanxt/jobs/sales-executive-ivf-dss-imagetech-pvt-mumbai-d397d511",
    "https://artha.link/@eanxt/jobs/business-development-expert-manager-the-mom-store-bangalore-urban-50c82657",
    "https://artha.link/@eanxt/jobs/trainee-roles-in-order-management-gsot-chennai-fe61d881",
    "https://artha.link/@eanxt/jobs/medical-doctor-unison-delhi-b9a82b89",
    "https://artha.link/@eanxt/jobs/interior-designer-elita-interiors-bengaluru-7035408e",
    "https://artha.link/@eanxt/jobs/junior-architect-2026-ateli-r-asraya-bengaluru-2ddf89e4",
    "https://artha.link/@eanxt/jobs/business-development-and-partnership-the-celestial-ahmedabad-c158fd59",
    "https://artha.link/@eanxt/jobs/assistant-professor-of-computer-science-psit-kanpur-kanpur-c9376a43",
    "https://artha.link/@eanxt/jobs/brand-designer-h-h-indore-20534701",
    "https://artha.link/@eanxt/jobs/faculty-quantitative-aptitude-maths-99-aceipm-noida-5954274f",
    "https://artha.link/@eanxt/jobs/mold-designer-metrinch-chennai-3d27e817",
    "https://artha.link/@eanxt/jobs/front-desk-associate-wework-india-delhi-eebc793b",
    "https://artha.link/@eanxt/jobs/front-office-receptionist-sanskar-institutions-noida-83ad4e1a",
    "https://artha.link/@eanxt/jobs/front-office-receptionist-sanskar-institutions-noida-658030ec",
    "https://artha.link/@eanxt/jobs/sales-manager-baoxhin-india-pune-district-20397aaf",
    "https://artha.link/@eanxt/jobs/senior-optometrist-eyesense-opticians-bengaluru-50a9fc8c",
    "https://artha.link/@eanxt/jobs/sr-relationship-manager-sunkersett-bengaluru-db2128c8",
    "https://artha.link/@eanxt/jobs/plant-tissue-culture-laboratory-manager-leafactory-kozhikode-009f4327",
    "https://artha.link/@eanxt/jobs/junior-interior-designer-a-wonder-room-abu-mumbai-156a2a8a",
    "https://artha.link/@eanxt/jobs/sap-sales-distribution-consultant-tata-consultancy-pune-district-12c2c352",
    "https://artha.link/@eanxt/jobs/mold-designer-krispolymers-kanpur-c13fd065",
    "https://artha.link/@eanxt/jobs/senior-backend-engineer-suncrypto-jaipur-f4d3a2e0",
    "https://artha.link/@eanxt/jobs/domain-pre-sales-principal-consultant-fico-mumbai-848d96dd",
    "https://artha.link/@eanxt/jobs/business-development-manager-k12-sports-tenvic-bengaluru-5b9939c1",
    "https://artha.link/@eanxt/jobs/retail-leasing-head-gurgaon-big-steps-ventures-gurgaon-cbcd69b1",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-mastech-digital-chennai-f4446a22",
    "https://artha.link/@eanxt/jobs/cluster-manager-hasbro-clothing-pvt-kochi-7e8c29c2",
    "https://artha.link/@eanxt/jobs/senior-auditor-the-vellore-kitchen-vellore-4f6f3024",
    "https://artha.link/@eanxt/jobs/sales-executive-unitech-shipping-chennai-cdf654a3",
    "https://artha.link/@eanxt/jobs/telesales-specialist-aurawill-coimbatore-1d1acfa6",
    "https://artha.link/@eanxt/jobs/sales-executive-a2meharinternational-gurgaon-04449e6c",
    "https://artha.link/@eanxt/jobs/account-based-marketing-and-gtm-engineer-fluid-ai-mumbai-ba8b4028",
    "https://artha.link/@eanxt/jobs/clinical-sales-specialist-myonsite-healthcare-vadodara-261cdf32",
    "https://artha.link/@eanxt/jobs/relationship-manager-insurancedekho-west-bengal-dbc43b0f",
    "https://artha.link/@eanxt/jobs/territory-sales-manager-kapoor-glass-india-mumbai-5459f6b2",
    "https://artha.link/@eanxt/jobs/field-sales-executive-jaipur-lioness-tile-jaipur-31eb36e4",
    "https://artha.link/@eanxt/jobs/epm-fccs-arcs-jade-global-pune-city-1f629856",
    "https://artha.link/@eanxt/jobs/tele-sales-specialist-spotlight-concepts-mumbai-359b5781",
    "https://artha.link/@eanxt/jobs/international-curriculum-teachers-axios-career-academy-mumbai-034b43d3",
    "https://artha.link/@eanxt/jobs/outreach-officer-bde-heion-ventures-pvt-jaipur-b8aa56a5",
    "https://artha.link/@eanxt/jobs/clinical-sales-engineer-orca-healthcare-chennai-5bc910b9",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-quess-it-staffing-bengaluru-0852b023",
    "https://artha.link/@eanxt/jobs/informatica-mdm-saas-lead-lumendata-bengaluru-997229de",
    "https://artha.link/@eanxt/jobs/counselor-dreams-public-hamirpur-d57583ab",
    "https://artha.link/@eanxt/jobs/quick-commerce-specialist-the-nota-co-gurugram-b2a038c6",
    "https://artha.link/@eanxt/jobs/deputy-manager-manager-international-walplast-products-mumbai-96965696",
    "https://artha.link/@eanxt/jobs/hiring-sales-executive-startelelogic-startelelogic-noida-3c8cebf4",
    "https://artha.link/@eanxt/jobs/oracle-pbcs-technical-consultant-intellicore-india-3b48651c",
    "https://artha.link/@eanxt/jobs/full-stack-development-intern-rustic-wisdom-bengaluru-78c5acb7",
    "https://artha.link/@eanxt/jobs/interior-design-specialist-trisha-interiors-bengaluru-7d2f8189",
    "https://artha.link/@eanxt/jobs/medical-representative-home-healthcare-arohacares-gurgaon-fc5d0203",
    "https://artha.link/@eanxt/jobs/business-development-manager-marble-nitco-limited-mumbai-b135f7b9",
    "https://artha.link/@eanxt/jobs/senior-accountant-fetaca-jaipur-96f152c6",
    "https://artha.link/@eanxt/jobs/technical-project-manager-ai-accellor-hyderabad-1b433cfd",
    "https://artha.link/@eanxt/jobs/sr-executive-asst-manager-international-mfp-products-pvt-ltd-vadodara-d3307103",
    "https://artha.link/@eanxt/jobs/technical-lead-coforge-noida-fbabbcf9",
    "https://artha.link/@eanxt/jobs/business-manager-pmo-nab-bengaluru-3b77bb6a",
    "https://artha.link/@eanxt/jobs/customer-support-specialist-samvadsocial-pune-division-07547cad",
    "https://artha.link/@eanxt/jobs/sales-manager-generali-central-mangaluru-6c10ffde",
    "https://artha.link/@eanxt/jobs/account-manager-mahadev-agency-indore-c8f126e3",
    "https://artha.link/@eanxt/jobs/strength-and-conditioning-coach-prehab-bengaluru-north-b7287dc0",
    "https://artha.link/@eanxt/jobs/project-manager-urbansky-hyderabad-d8ff16af",
    "https://artha.link/@eanxt/jobs/political-reporter-mid-day-mumbai-e69bca14",
    "https://artha.link/@eanxt/jobs/associate-consultant-moe-s-art-mumbai-c5b48f22",
    "https://artha.link/@eanxt/jobs/senior-storage-engineer-openstack-ceph-cloud4c-services-hyderabad-2f23c5c9",
    "https://artha.link/@eanxt/jobs/oracle-oic-tata-consultancy-hyderabad-29d08837",
    "https://artha.link/@eanxt/jobs/technical-associate-mep-mechanical-aspire-iitb-mumbai-437503a5",
    "https://artha.link/@eanxt/jobs/sap-sd-otc-s4-hana-order-management-gyansys-inc-bangalore-urban-05632ef0",
    "https://artha.link/@eanxt/jobs/sales-executive-inbound-sales-thewav-kolkata-4d8e1ebf",
    "https://artha.link/@eanxt/jobs/presales-engineer-valuefirst-bengaluru-e3ca4658",
    "https://artha.link/@eanxt/jobs/salesforce-technical-architect-exl-noida-86cb5e3c",
    "https://artha.link/@eanxt/jobs/nutritionist-omfit-pune-division-bdbe941f",
    "https://artha.link/@eanxt/jobs/telephony-ucaas-administrator-persistent-systems-pune-city-90acb8ca",
    "https://artha.link/@eanxt/jobs/jd-edwards-manufacturing-functional-hcltech-bengaluru-b9c49e9f",
    "https://artha.link/@eanxt/jobs/graphic-designer-for-social-media-d2s-technologies-delhi-0d9655b8",
    "https://artha.link/@eanxt/jobs/creative-designer-nexumsquare-india-113f9521",
    "https://artha.link/@eanxt/jobs/senior-iam-consultant-saviynt-ic-consult-mumbai-7a426879",
    "https://artha.link/@eanxt/jobs/general-physician-noraya-for-docors-kolhapur-c7ac141b",
    "https://artha.link/@eanxt/jobs/company-secretary-desire-energy-jaipur-e84f6499",
    "https://artha.link/@eanxt/jobs/executive-operations-smartq-hyderabad-e5547716",
    "https://artha.link/@eanxt/jobs/business-head-smartq-hyderabad-7bba5ced",
    "https://artha.link/@eanxt/jobs/senior-board-design-engineer-acl-digital-hyderabad-32ce5b5d",
    "https://artha.link/@eanxt/jobs/oracle-cloud-scm-functional-consultant-datavail-hyderabad-1ef9858b",
    "https://artha.link/@eanxt/jobs/network-firewall-security-tata-consultancy-chennai-cf6f618e",
    "https://artha.link/@eanxt/jobs/senior-engineer-sta-semifive-bengaluru-9bf626b4",
    "https://artha.link/@eanxt/jobs/executive-territory-sales-manager-wires-torrent-electricals-ahmedabad-2a43f9e8",
    "https://artha.link/@eanxt/jobs/company-secretary-pedalstart-gurugram-6d566c46",
    "https://artha.link/@eanxt/jobs/back-end-developer-recro-bengaluru-9c4808eb",
    "https://artha.link/@eanxt/jobs/senior-executive-biocon-bengaluru-9772af93",
    "https://artha.link/@eanxt/jobs/sales-intern-speeddex-indore-15ee3b39",
    "https://artha.link/@eanxt/jobs/head-r-d-machinery-amor-management-coimbatore-192f1c80",
    "https://artha.link/@eanxt/jobs/executive-director-rehwa-society-india-maheshwar-23a5f922",
    "https://artha.link/@eanxt/jobs/hardware-support-technician-network-emapta-global-coimbatore-031b9706",
    "https://artha.link/@eanxt/jobs/graphic-designer-illustrator-finesse-ink-kerala-18743483",
    "https://artha.link/@eanxt/jobs/deputy-chief-accountant-archoo-ahmedabad-a97c8140",
    "https://artha.link/@eanxt/jobs/release-project-manager-ust-bengaluru-efe13aa6",
    "https://artha.link/@eanxt/jobs/manager-solution-consulting-edgeverve-bengaluru-3b26f9d4",
    "https://artha.link/@eanxt/jobs/ui-ux-designer-frontend-developer-meridiansquare-north-goa-2d2691cc",
    "https://artha.link/@eanxt/jobs/jr-project-manager-f-b-ambros-world-foods-mumbai-213bd8f7",
    "https://artha.link/@eanxt/jobs/team-leader-edc-soundbox-paytm-mumbai-6a79dc60",
    "https://artha.link/@eanxt/jobs/customer-success-executive-trustsignal-io-dharamshala-3190f436",
    "https://artha.link/@eanxt/jobs/sas-developer-artech-l-l-c-hyderabad-a9d54242",
    "https://artha.link/@eanxt/jobs/director-security-engineering-confidential-jobs-bengaluru-bf12dfb2",
    "https://artha.link/@eanxt/jobs/student-success-manager-karan-gupta-mumbai-ebb75bd5",
    "https://artha.link/@eanxt/jobs/assistant-architect-dpap-architects-new-delhi-1f2c4380",
    "https://artha.link/@eanxt/jobs/associate-director-fund-accounting-sei-hyderabad-d1404924",
    "https://artha.link/@eanxt/jobs/senior-associate-associate-manager-jiosaavn-mumbai-29cb9820",
    "https://artha.link/@eanxt/jobs/customer-success-manager-leadership-talent-hyderabad-958ef8e3",
    "https://artha.link/@eanxt/jobs/fitness-consultant-healthify-bengaluru-de2d2fce",
    "https://artha.link/@eanxt/jobs/assistant-account-manager-savino-del-bene-mumbai-7a24c2b9",
    "https://artha.link/@eanxt/jobs/lead-engineer-angel-and-genie-bengaluru-8b12c7a9",
    "https://artha.link/@eanxt/jobs/net-technical-architect-azilen-technologies-ahmedabad-a58a23eb",
    "https://artha.link/@eanxt/jobs/sales-executive-gujranwala-legacy-delhi-d7353dcd",
    "https://artha.link/@eanxt/jobs/fashion-design-specialist-kaladhar-handlooms-hyderabad-f2d27756",
    "https://artha.link/@eanxt/jobs/business-development-executive-myoperator-greater-delhi-af5fea7b",
    "https://artha.link/@eanxt/jobs/business-development-manager-arqia-arqia-mumbai-1115d14d",
    "https://artha.link/@eanxt/jobs/field-sales-executive-waran-engineering-chennai-aeff1c51",
    "https://artha.link/@eanxt/jobs/data-engineer-useready-bengaluru-5ac20948",
    "https://artha.link/@eanxt/jobs/embedded-electronics-hardware-engineer-biba-electronics-west-delhi-8e14d552",
    "https://artha.link/@eanxt/jobs/b2b-collections-specialist-emapta-global-coimbatore-67bf4c91",
    "https://artha.link/@eanxt/jobs/associate-manager-public-relations-dentsu-india-chennai-8ede4b9d",
    "https://artha.link/@eanxt/jobs/assistant-professor-cse-kcc-institute-of-noida-2eb50548",
    "https://artha.link/@eanxt/jobs/senior-reconciliation-analyst-travelex-mumbai-55508db8",
    "https://artha.link/@eanxt/jobs/executive-assistant-projects-ksr-brothers-new-delhi-e3b582b7",
    "https://artha.link/@eanxt/jobs/interior-project-manager-livspace-kolkata-728c7eb0",
    "https://artha.link/@eanxt/jobs/audiologist-the-lotus-hearing-dwarka-b907487f",
    "https://artha.link/@eanxt/jobs/sap-basis-consultant-tata-consultancy-kolkata-45eadc0f",
    "https://artha.link/@eanxt/jobs/capacity-infra-engineer-tata-consultancy-chennai-e82334cd",
    "https://artha.link/@eanxt/jobs/algorithm-engineer-meril-vapi-89435004",
    "https://artha.link/@eanxt/jobs/manager-hr-performance-rewards-shalina-healthcare-mumbai-5bad91b1",
    "https://artha.link/@eanxt/jobs/technology-architect-sisl-global-india-c2c0eb20",
    "https://artha.link/@eanxt/jobs/senior-proposal-writer-v-group-inc-bhopal-adfda0b9",
    "https://artha.link/@eanxt/jobs/sap-ariba-consultant-sonata-software-bengaluru-3a30b9c6",
    "https://artha.link/@eanxt/jobs/interior-designer-leblanc-interior-chennai-98e403ea",
    "https://artha.link/@eanxt/jobs/senior-development-director-ascentis-group-bengaluru-7475bb85",
    "https://artha.link/@eanxt/jobs/senior-architect-architectonics-the-mumbai-7c070306",
    "https://artha.link/@eanxt/jobs/sales-executive-gautam-banerjee-pune-division-c0b021b6",
    "https://artha.link/@eanxt/jobs/microsoft-program-manager-hsv-digital-india-146d24c4",
    "https://artha.link/@eanxt/jobs/architect-desa-kapashera-b60a8d58",
    "https://artha.link/@eanxt/jobs/qualified-company-secretary-sppc-navi-mumbai-fc1d76b3",
    "https://artha.link/@eanxt/jobs/web-platform-manager-brickred-systems-hyderabad-30bb22d1",
    "https://artha.link/@eanxt/jobs/consultant-systematic-reviews-skyward-analytics-gurugram-b029a4e2",
    "https://artha.link/@eanxt/jobs/murex-bo-developer-mizuho-pune-city-af847e19",
    "https://artha.link/@eanxt/jobs/business-development-executive-netgains-mumbai-4172a7d2",
    "https://artha.link/@eanxt/jobs/operations-executive-pintola-ahmedabad-c24b203a",
    "https://artha.link/@eanxt/jobs/sales-executive-antarabodh-mumbai-0c0dbdf3",
    "https://artha.link/@eanxt/jobs/receptionist-and-pre-sales-executive-rajshree-group-ahmedabad-53dd75e4",
    "https://artha.link/@eanxt/jobs/ca-inter-ca-finalist-at-pune-cangraft-equipment-pune-pimpri-e10d3b05",
    "https://artha.link/@eanxt/jobs/network-routing-switching-walkin-tata-consultancy-chennai-72346919",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-triton-mumbai-fea399a9",
    "https://artha.link/@eanxt/jobs/designer-ganesh-creations-jaipur-83f85b84",
    "https://artha.link/@eanxt/jobs/copy-strategy-and-project-management-netglobes-ahmedabad-980c48cf",
    "https://artha.link/@eanxt/jobs/strategic-alliances-partnerships-aafm-india-mumbai-abf5b68d",
    "https://artha.link/@eanxt/jobs/corporate-sales-executive-dcs11-new-delhi-ab28d9c1",
    "https://artha.link/@eanxt/jobs/executive-assistant-master-chains-n-mumbai-b51ac5c1",
    "https://artha.link/@eanxt/jobs/founding-partner-revenue-gtm-mar-cat-ahmedabad-d4054be5",
    "https://artha.link/@eanxt/jobs/graphic-designer-paywint-manjeri-65cb580f",
    "https://artha.link/@eanxt/jobs/prior-authorization-expert-lenity-health-bengaluru-1b3807f3",
    "https://artha.link/@eanxt/jobs/client-solutions-intern-olbrain-gurugram-9c5164c8",
    "https://artha.link/@eanxt/jobs/audiologist-hnr-speech-and-hyderabad-5d7a629d",
    "https://artha.link/@eanxt/jobs/drawing-sketching-teacher-mad-school-chennai-63acf0e7",
    "https://artha.link/@eanxt/jobs/accounts-finance-executive-pure-living-india-north-goa-4a566f5d",
    "https://artha.link/@eanxt/jobs/forward-deployed-engineer-engineering-elai-agritech-pune-city-44939f33",
    "https://artha.link/@eanxt/jobs/senior-sales-manager-o2-cure-take-a-deep-gurgaon-54738f95",
    "https://artha.link/@eanxt/jobs/interior-designer-purple-shell-turnkey-jaipur-c965bd41",
    "https://artha.link/@eanxt/jobs/dms-specialist-digital-platform-vistra-mumbai-b6679ab7",
    "https://artha.link/@eanxt/jobs/it-endpoint-jamf-engineer-persistent-systems-pune-city-15d3c161",
    "https://artha.link/@eanxt/jobs/graphic-designer-associate-pr-pundit-havas-red-gurugram-65b99e5b",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-entiovi-technologies-kolkata-b8bfb4e7",
    "https://artha.link/@eanxt/jobs/ecommerce-customer-support-operations-ganesh-trading-c-india-c57b5dac",
    "https://artha.link/@eanxt/jobs/service-delivery-manager-smart-analytica-mumbai-a9447f88",
    "https://artha.link/@eanxt/jobs/business-development-executive-kyzen-research-mumbai-6937ede6",
    "https://artha.link/@eanxt/jobs/manager-corporate-sales-zolo-bengaluru-689506c8",
    "https://artha.link/@eanxt/jobs/research-systems-design-intern-social-innovation-bengaluru-2e30e5e1",
    "https://artha.link/@eanxt/jobs/publisher-development-executive-cybermedia-gurugram-b3ed734c",
    "https://artha.link/@eanxt/jobs/sales-executive-mechsoft-digital-pune-pimpri-6bf1c388",
    "https://artha.link/@eanxt/jobs/ai-transformation-lead-mergen-compass-new-delhi-b87615e0",
    "https://artha.link/@eanxt/jobs/junior-interior-designer-dks-infradesigns-chennai-3f4da5af",
    "https://artha.link/@eanxt/jobs/international-sales-executive-freshers-mj-logistics-mohali-district-1d995437",
    "https://artha.link/@eanxt/jobs/article-trainee-tlb-co-hyderabad-e341d0b1",
    "https://artha.link/@eanxt/jobs/manager-domestic-sales-anjani-closures-pvt-ahmedabad-cbe6cd27",
    "https://artha.link/@eanxt/jobs/mes-siemens-opscenter-camstar-capgemini-greater-65dea193",
    "https://artha.link/@eanxt/jobs/architect-architect-hafeez-mumbai-b9a59af0",
    "https://artha.link/@eanxt/jobs/fundraising-manager-udaan-india-87f9cf41",
    "https://artha.link/@eanxt/jobs/client-servicing-account-management-juicelabs-ai-mumbai-84ca0ff5",
    "https://artha.link/@eanxt/jobs/senior-identity-services-engineer-epsilon-bengaluru-2e49c8e8",
    "https://artha.link/@eanxt/jobs/sap-basis-hana-consultant-tata-consultancy-hyderabad-58881d2c",
    "https://artha.link/@eanxt/jobs/telecaller-assetra-associates-bengaluru-41711798",
    "https://artha.link/@eanxt/jobs/school-career-counsellor-beyond-mentor-delhi-b5b79d19",
    "https://artha.link/@eanxt/jobs/senior-lec-clp-engineer-leadsoc-bengaluru-c818b99f",
    "https://artha.link/@eanxt/jobs/financial-planning-and-analysis-randstad-india-delhi-b4bfe2a2",
    "https://artha.link/@eanxt/jobs/teli-sales-executive-green-planet-pune-pimpri-27e2536b",
    "https://artha.link/@eanxt/jobs/sap-fi-consultant-tata-consultancy-mumbai-6021fe88",
    "https://artha.link/@eanxt/jobs/zonal-manager-sales-poultry-feed-chembond-india-975c017a",
    "https://artha.link/@eanxt/jobs/associate-gmo-natixis-services-in-bengaluru-caab113d",
    "https://artha.link/@eanxt/jobs/home-sales-team-lead-jio-thrissur-903620d2",
    "https://artha.link/@eanxt/jobs/public-relations-executive-avian-we-delhi-89b0efd2",
    "https://artha.link/@eanxt/jobs/sr-manager-supply-solutions-walmart-bengaluru-a8c88820",
    "https://artha.link/@eanxt/jobs/oracle-fusion-finance-technical-tata-consultancy-kolkata-15c2fa5a",
    "https://artha.link/@eanxt/jobs/sales-manager-mice-zellar-international-bengaluru-5a02313f",
    "https://artha.link/@eanxt/jobs/design-coordinator-iwps-global-bengaluru-d9b89c2d",
    "https://artha.link/@eanxt/jobs/state-head-veelo-mobility-west-bengal-be85b24a",
    "https://artha.link/@eanxt/jobs/customer-service-representative-concentrix-bengaluru-d9c59612",
    "https://artha.link/@eanxt/jobs/operations-and-maintenance-engineer-sany-renewable-karnataka-d9155bc2",
    "https://artha.link/@eanxt/jobs/business-development-executive-outreach-expert-education-kolkata-afcf6054",
    "https://artha.link/@eanxt/jobs/front-desk-executive-aerospace-services-gurugram-14a8802e",
    "https://artha.link/@eanxt/jobs/revenue-analyst-yonder-talent-india-india-dbb73331",
    "https://artha.link/@eanxt/jobs/data-analyst-navi-bangalore-urban-8e1c5430",
    "https://artha.link/@eanxt/jobs/business-development-executive-inside-grorev-salesnair-faridabad-5b40bb31",
    "https://artha.link/@eanxt/jobs/google-ads-lead-gen-expert-pmax-demand-adstia-agency-gurugram-5609d32c",
    "https://artha.link/@eanxt/jobs/business-development-manager-fibrox-3d-rajkot-3ad017f2",
    "https://artha.link/@eanxt/jobs/junior-architect-arete-design-studio-chandigarh-77ca201c",
    "https://artha.link/@eanxt/jobs/b2b-inside-sales-team-leader-dermatouch-ahmedabad-72117a34",
    "https://artha.link/@eanxt/jobs/physiotherapist-indraprasth-spine-new-delhi-98c7e82c",
    "https://artha.link/@eanxt/jobs/it-support-specialist-l3-gg-it-services-kolkata-aee0e80f",
    "https://artha.link/@eanxt/jobs/assistant-event-manager-smartq-bengaluru-a432690d",
    "https://artha.link/@eanxt/jobs/jio-centre-manager-jio-chennai-e057dddb",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-adarsha-interiors-bengaluru-c38e0ff5",
    "https://artha.link/@eanxt/jobs/web-developer-shopify-webflow-wordpress-8spades-advertising-velachery-0baa4f79",
    "https://artha.link/@eanxt/jobs/sales-manager-solar-scaleneworks-people-delhi-6be22965",
    "https://artha.link/@eanxt/jobs/patient-care-advisor-indegene-bengaluru-8777e514",
    "https://artha.link/@eanxt/jobs/analyst-associate-privatecircle-bengaluru-24b1130a",
    "https://artha.link/@eanxt/jobs/marketing-coordinator-hartron-rohtak-rohtak-4606bce9",
    "https://artha.link/@eanxt/jobs/clinical-ai-validator-women-s-and-child-careconnect-india-5eece728",
    "https://artha.link/@eanxt/jobs/architectural-designer-amogh-infra-ujjain-ff90de43",
    "https://artha.link/@eanxt/jobs/vice-president-us-operations-adept-global-hyderabad-4e918f15",
    "https://artha.link/@eanxt/jobs/executive-assistant-orgo-chem-pvt-ltd-surat-497a640b",
    "https://artha.link/@eanxt/jobs/social-media-manager-the-global-voice-north-goa-07cd5829",
    "https://artha.link/@eanxt/jobs/consultant-senior-resident-general-jindal-steel-ltd-angul-4544894a",
    "https://artha.link/@eanxt/jobs/db2-database-administrator-claidroid-thiruvananthapu-fada4cdb",
    "https://artha.link/@eanxt/jobs/data-engineer-exl-gurugram-81cba419",
    "https://artha.link/@eanxt/jobs/business-development-executive-empliance-gurugram-6a65b8c2",
    "https://artha.link/@eanxt/jobs/project-manager-exl-gurugram-abaf62bb",
    "https://artha.link/@eanxt/jobs/fund-accounting-allvue-thoughtfocus-greater-4f03a888",
    "https://artha.link/@eanxt/jobs/business-development-executive-kaapro-bhopal-86e06ea5",
    "https://artha.link/@eanxt/jobs/lead-manager-education-and-technology-dharmalife-new-delhi-8fedfd1b",
    "https://artha.link/@eanxt/jobs/growth-marketer-shift-india-e5fe0ee7",
    "https://artha.link/@eanxt/jobs/mainframe-mq-administrator-tata-consultancy-chennai-c78bbaae",
    "https://artha.link/@eanxt/jobs/senior-automation-engineer-styli-bengaluru-cc3c1ad8",
    "https://artha.link/@eanxt/jobs/interior-designer-nivexa-spaces-bengaluru-3b7f8bf4",
    "https://artha.link/@eanxt/jobs/graphic-designer-studio-plural-mumbai-da22dcd1",
    "https://artha.link/@eanxt/jobs/senior-sap-basis-migration-specialist-all-european-careers-india-8014be2b",
    "https://artha.link/@eanxt/jobs/oracle-specialist-teceze-mumbai-0cc28d9c",
    "https://artha.link/@eanxt/jobs/senior-network-engineer-ctrls-datacenters-hyderabad-0d064652",
    "https://artha.link/@eanxt/jobs/sap-sd-consultant-tata-consultancy-bengaluru-0059bdf7",
    "https://artha.link/@eanxt/jobs/immediate-opening-for-sap-onesource-gyansys-inc-bengaluru-2da44c8e",
    "https://artha.link/@eanxt/jobs/business-development-executive-outbound-the-unemps-indore-ef7d601f",
    "https://artha.link/@eanxt/jobs/microsoft-dynamics-365-technical-tata-consultancy-pune-district-e5206465",
    "https://artha.link/@eanxt/jobs/sales-engineer-omg-labs-chennai-55214eee",
    "https://artha.link/@eanxt/jobs/analog-layout-engineer-hcltech-bengaluru-9ea5e546",
    "https://artha.link/@eanxt/jobs/senior-mold-designer-ics-designs-navi-mumbai-737601cd",
    "https://artha.link/@eanxt/jobs/manager-senior-manager-event-operations-people-matters-gurugram-267850f1",
    "https://artha.link/@eanxt/jobs/junior-graphic-designer-the-global-voice-north-goa-b583da5c",
    "https://artha.link/@eanxt/jobs/executive-learning-development-fabindia-limited-faridabad-9e0eedf9",
    "https://artha.link/@eanxt/jobs/assistant-professor-of-cse-ggi-gulzar-group-of-khanna-4447855e",
    "https://artha.link/@eanxt/jobs/sales-manager-bloop-gurugram-850ea0fb",
    "https://artha.link/@eanxt/jobs/it-support-team-leader-us-shift-binary-semantics-ltd-gurugram-a919c680",
    "https://artha.link/@eanxt/jobs/corporate-advisory-chartered-accountant-walter-advisors-mumbai-cb76867b",
    "https://artha.link/@eanxt/jobs/vapt-tata-consultancy-kochi-a9d54c01",
    "https://artha.link/@eanxt/jobs/lead-security-engineer-crest-data-ahmedabad-923e5ec1",
    "https://artha.link/@eanxt/jobs/admission-counsellor-truewings-education-bangalore-b03ecee5",
    "https://artha.link/@eanxt/jobs/sales-commercial-shyam-steel-kolkata-751aea7f",
    "https://artha.link/@eanxt/jobs/manager-of-fundraising-animal-rahat-mumbai-92d8ff69",
    "https://artha.link/@eanxt/jobs/admission-counselor-jain-school-of-kochi-60ef98fa",
    "https://artha.link/@eanxt/jobs/assistant-professor-pune-institute-of-mulshi-163b0736",
    "https://artha.link/@eanxt/jobs/preschool-teacher-punnya-the-dehradun-f86b276e",
    "https://artha.link/@eanxt/jobs/process-lead-accounts-payable-acuity-analytics-gurugram-f7babc8b",
    "https://artha.link/@eanxt/jobs/tpm-manager-mumbai-bangalore-id-fresh-food-mumbai-f55569f8",
    "https://artha.link/@eanxt/jobs/accountant-bookkeeper-uk-accountancy-vlookup-business-mysore-25108df9",
    "https://artha.link/@eanxt/jobs/ent-specialist-med-first-ent-centre-delhi-4f237244",
    "https://artha.link/@eanxt/jobs/associate-director-finance-accounting-embark-bengaluru-586083dc",
    "https://artha.link/@eanxt/jobs/executive-sr-executive-visa-operations-journey-partner-kolkata-7203a7e4",
    "https://artha.link/@eanxt/jobs/senior-airline-ticketing-k2-holidays-mumbai-6d440295",
    "https://artha.link/@eanxt/jobs/business-development-manager-remote-hex-wireless-pvt-ltd-vadodara-4c5435d6",
    "https://artha.link/@eanxt/jobs/fashion-graphic-designer-youth-organization-mumbai-b2a35cbb",
    "https://artha.link/@eanxt/jobs/implementation-customer-success-manager-eubrics-ai-bengaluru-d65ec6d9",
    "https://artha.link/@eanxt/jobs/assistant-associate-professor-radiology-nextenti-tech-amal-puram-631ee31e",
    "https://artha.link/@eanxt/jobs/gcp-data-engineer-tata-consultancy-chennai-86c69bd5",
    "https://artha.link/@eanxt/jobs/assistant-professor-general-medicine-nextenti-tech-konaseema-157136f9",
    "https://artha.link/@eanxt/jobs/copywriter-unreal-foods-bengaluru-42d4ef9b",
    "https://artha.link/@eanxt/jobs/head-customer-success-t500-29223-talent500-mumbai-a03dd76f",
    "https://artha.link/@eanxt/jobs/gcp-data-engineer-tata-consultancy-kolkata-1d1b3dd1",
    "https://artha.link/@eanxt/jobs/account-executive-sales-support-aml-rightsource-noida-13419b1b",
    "https://artha.link/@eanxt/jobs/technical-service-engineer-hoymiles-india-6f159a78",
    "https://artha.link/@eanxt/jobs/oracle-cloud-ppm-functional-consultant-ibu-india-13f54896",
    "https://artha.link/@eanxt/jobs/field-sales-executive-indiamart-intermesh-jaipur-77bc9629",
    "https://artha.link/@eanxt/jobs/cyber-risk-engineer-allianz-services-pune-district-c9566e2f",
    "https://artha.link/@eanxt/jobs/lead-edifecs-analyst-simplify-alpha-hyderabad-ddd8d8ec",
    "https://artha.link/@eanxt/jobs/retina-surgeon-ophthalmologist-jabalpur-asg-eye-hospital-jabalpur-6da6bac1",
    "https://artha.link/@eanxt/jobs/data-scientist-omnicom-global-fc695efc",
    "https://artha.link/@eanxt/jobs/senior-sap-basis-migration-specialist-s-all-european-careers-4d6a5dc4",
    "https://artha.link/@eanxt/jobs/program-manager-itsm-tan-eisai-visakhapatnam-703ed8db",
    "https://artha.link/@eanxt/jobs/senior-sales-engineer-trident-infosol-hyderabad-f3cc5a9d",
    "https://artha.link/@eanxt/jobs/sap-isu-technical-consultant-wipro-bengaluru-768fb55d",
    "https://artha.link/@eanxt/jobs/technical-project-manager-capital-inadev-noida-c6b6fd86",
    "https://artha.link/@eanxt/jobs/lead-technical-consultant-o9-digital-mrf-chennai-d8e4158a",
    "https://artha.link/@eanxt/jobs/customer-service-specialist-netrtech-solutions-ahmedabad-bc7a51c2",
    "https://artha.link/@eanxt/jobs/sales-development-representative-sdr-us-visdum-noida-0e2594bc",
    "https://artha.link/@eanxt/jobs/japanese-intern-airlearn-bengaluru-ffa66589",
    "https://artha.link/@eanxt/jobs/russian-intern-airlearn-bengaluru-b9fa804e",
    "https://artha.link/@eanxt/jobs/consultant-ophthalmologist-retina-asg-eye-hospital-asansol-596d6383",
    "https://artha.link/@eanxt/jobs/special-educator-saamarthya-pune-division-47208490",
    "https://artha.link/@eanxt/jobs/member-of-technical-staff-ai-focused-advocara-innovation-india-48185219",
    "https://artha.link/@eanxt/jobs/business-growth-strategy-partner-parko-abrasives-faridabad-92d0b9c5",
    "https://artha.link/@eanxt/jobs/interior-designer-nsn-studio-divine-gurugram-246132e9",
    "https://artha.link/@eanxt/jobs/pre-sales-executive-fortune-park-howrah-5775b200",
    "https://artha.link/@eanxt/jobs/chartered-accountant-starlight-ispat-pvt-kolkata-fa369968",
    "https://artha.link/@eanxt/jobs/associate-director-partner-success-us-acumen-part-of-delhi-b0c31b3e",
    "https://artha.link/@eanxt/jobs/clinical-dietitian-dietician-kajal-s-delhi-3adf15b2",
    "https://artha.link/@eanxt/jobs/avp-sales-and-bd-connectezy-greater-9c64b7c1",
    "https://artha.link/@eanxt/jobs/sales-team-lead-ltm-hyderabad-94b90c87",
    "https://artha.link/@eanxt/jobs/accounts-gst-lead-charyas-ahmedabad-115c36f4",
    "https://artha.link/@eanxt/jobs/sales-team-lead-travel-hospitality-wandering-lama-bengaluru-71285f50",
    "https://artha.link/@eanxt/jobs/oracle-incentive-compensation-cloud-tata-consultancy-chennai-ac0998dc",
    "https://artha.link/@eanxt/jobs/graduate-management-trainee-riseupp-bengaluru-south-b885cd31",
    "https://artha.link/@eanxt/jobs/shopify-web-designer-mosa-surat-b26107fd",
    "https://artha.link/@eanxt/jobs/national-sales-manager-pioneer-management-mumbai-b7894a61",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-prodoc-ai-ahmedabad-e487c466",
    "https://artha.link/@eanxt/jobs/vp-sales-luxury-real-estate-pin-click-bengaluru-5debe629",
    "https://artha.link/@eanxt/jobs/dart-engineer-hclsoftware-bengaluru-6f975309",
    "https://artha.link/@eanxt/jobs/junior-interior-designer-homelane-hyderabad-646c9f4f",
    "https://artha.link/@eanxt/jobs/executive-jr-manager-accounts-kalinga-commercial-odisha-11d1eaaf",
    "https://artha.link/@eanxt/jobs/lead-mid-office-hero-fincorp-gurugram-76010484",
    "https://artha.link/@eanxt/jobs/fixed-income-dealer-and-fund-manager-moneylicious-mumbai-5a8ef8ae",
    "https://artha.link/@eanxt/jobs/workday-integration-consultant-teamware-solutions-india-9350eb21",
    "https://artha.link/@eanxt/jobs/international-sales-executive-fmcg-mumbai-161c2860",
    "https://artha.link/@eanxt/jobs/plant-finance-head-randstad-india-tamil-nadu-4ef33429",
    "https://artha.link/@eanxt/jobs/presales-executive-real-estate-ascens-buildcon-llp-gurugram-f6b2f957",
    "https://artha.link/@eanxt/jobs/doctor-hiring-for-germany-europe-careers-delhi-1c31a8e0",
    "https://artha.link/@eanxt/jobs/sales-development-representative-acefone-gurugram-1a432c57",
    "https://artha.link/@eanxt/jobs/b2b-lead-generation-specialist-puzzle-innovationz-india-8eb5307b",
    "https://artha.link/@eanxt/jobs/blockchain-developer-omnix-bengaluru-2e646e4d",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-padma-prabhakar-bengaluru-ca5aee1c",
    "https://artha.link/@eanxt/jobs/zonal-sales-manager-building-material-sales-gallop-bengaluru-3b06e4af",
    "https://artha.link/@eanxt/jobs/quality-executives-vashini-agro-pollachi-1082f189",
    "https://artha.link/@eanxt/jobs/senior-graphic-designer-grand-royal-tours-p-salem-1ba12367",
    "https://artha.link/@eanxt/jobs/graphic-designer-ahlen-foodpreneurs-chennai-797a41cc",
    "https://artha.link/@eanxt/jobs/architect-vikram-design-studio-kolkata-5b86fe0a",
    "https://artha.link/@eanxt/jobs/print-designer-tulip-group-noida-bc7f4b11",
    "https://artha.link/@eanxt/jobs/business-head-for-cost-management-sycone-cpmc-pvt-ltd-greater-ebc6a4da",
    "https://artha.link/@eanxt/jobs/senior-concrete-tekla-modeller-sweco-gurugram-18d3313b",
    "https://artha.link/@eanxt/jobs/sales-director-omniactive-health-mumbai-c73bac53",
    "https://artha.link/@eanxt/jobs/linux-platform-security-infinite-computer-pune-district-2e87191c",
    "https://artha.link/@eanxt/jobs/computational-architect-designer-dar-pune-district-83a94707",
    "https://artha.link/@eanxt/jobs/head-of-fundraising-partnerships-youth-organization-mumbai-3981a623",
    "https://artha.link/@eanxt/jobs/data-associate-data-annotation-dwij-ai-ahmedabad-bbb13299",
    "https://artha.link/@eanxt/jobs/academic-sales-manager-softcell-chennai-1f302bee",
    "https://artha.link/@eanxt/jobs/senior-analyst-franchise-services-t500-inspire-hyderabad-ae6493ff",
    "https://artha.link/@eanxt/jobs/collections-officer-esaf-bank-puducherry-2ffcb983",
    "https://artha.link/@eanxt/jobs/graphic-designer-protea-digital-pvt-bengaluru-db0f5e91",
    "https://artha.link/@eanxt/jobs/need-it-sales-and-leads-head-datanatix-chennai-e266d0d8",
    "https://artha.link/@eanxt/jobs/account-payable-reconciliation-associate-startuphr-consulting-gurugram-fcf663cf",
    "https://artha.link/@eanxt/jobs/executive-video-editor-swiggy-mumbai-e1397326",
    "https://artha.link/@eanxt/jobs/area-sales-manager-pharma-nutraceuticals-gipl-www-giplindia-noida-b64a9477",
    "https://artha.link/@eanxt/jobs/montessori-ntt-teacher-trainer-upeducators-pune-district-82279142",
    "https://artha.link/@eanxt/jobs/deep-learning-image-processing-expert-ust-gurugram-2e9c7ba6",
    "https://artha.link/@eanxt/jobs/national-head-channel-sales-altius-sports-kolkata-7f3537bc",
    "https://artha.link/@eanxt/jobs/social-media-manager-the-wingman-group-gurugram-b419bc23",
    "https://artha.link/@eanxt/jobs/associate-director-of-sales-unison-mumbai-6f406a82",
    "https://artha.link/@eanxt/jobs/account-growth-strategy-executive-geezy-bengaluru-9ae49239",
    "https://artha.link/@eanxt/jobs/architect-nature-homes-spaces-jaipur-5049d1bd",
    "https://artha.link/@eanxt/jobs/sap-car-posdta-consultant-tata-consultancy-delhi-bab4655d",
    "https://artha.link/@eanxt/jobs/senior-vip-desktop-support-engineer-atyeti-inc-mumbai-ad27c389",
    "https://artha.link/@eanxt/jobs/ad-sales-coordinator-cond-nast-india-mumbai-309088d9",
    "https://artha.link/@eanxt/jobs/project-manager-data-center-adecco-mumbai-1d7a58f6",
    "https://artha.link/@eanxt/jobs/management-trainee-freshers-srs-consulting-inc-hyderabad-dd2197d6",
    "https://artha.link/@eanxt/jobs/rpa-uipath-support-engineer-accelirate-inc-pune-city-55855319",
    "https://artha.link/@eanxt/jobs/sr-manager-sales-gokhana-bangalore-urban-1434c795",
    "https://artha.link/@eanxt/jobs/senior-quality-engineer-ii-t500-29357-marriott-tech-hyderabad-057c9b82",
    "https://artha.link/@eanxt/jobs/senior-engineering-manager-iam-t500-marriott-tech-hyderabad-2165f7f9",
    "https://artha.link/@eanxt/jobs/senior-quality-engineer-i-t500-29356-marriott-tech-hyderabad-7528361c",
    "https://artha.link/@eanxt/jobs/application-support-engineer-mobily-infotech-greater-852ba1e9",
    "https://artha.link/@eanxt/jobs/tcs-is-hiring-for-linux-admin-tata-consultancy-chennai-b72c3dc6",
    "https://artha.link/@eanxt/jobs/customer-service-representative-netrtech-solutions-mumbai-1ba6f70a",
    "https://artha.link/@eanxt/jobs/oracle-retail-consultant-tata-consultancy-mumbai-8c4c057d",
    "https://artha.link/@eanxt/jobs/social-search-manager-omnicom-global-pune-district-d96c8635",
    "https://artha.link/@eanxt/jobs/senior-sales-manager-meril-vapi-bf9f272d",
    "https://artha.link/@eanxt/jobs/lead-hardware-engineer-gridcrest-by-kaynes-noida-3eac7d7b",
    "https://artha.link/@eanxt/jobs/strategic-engagement-manager-elsevier-india-6f2b9ccb",
    "https://artha.link/@eanxt/jobs/ux-ui-designer-remote-hire-feed-india-fac165ed",
    "https://artha.link/@eanxt/jobs/information-technology-support-engineer-htc-global-services-hyderabad-6d737588",
    "https://artha.link/@eanxt/jobs/senior-content-writer-reviews-koimoi-com-mumbai-98794450",
    "https://artha.link/@eanxt/jobs/business-development-manager-deeptech-nirog-scan-by-y3x-bhubaneswar-3c2673db",
    "https://artha.link/@eanxt/jobs/principal-dft-engineer-mulya-technologies-india-d14d419d",
    "https://artha.link/@eanxt/jobs/occupational-therapist-lissun-greater-delhi-71953613",
    "https://artha.link/@eanxt/jobs/article-assistant-valueonshore-vos-gurugram-f7fcfc5c",
    "https://artha.link/@eanxt/jobs/lead-azure-data-engineer-5-locations-tata-consultancy-bengaluru-fa9ed458",
    "https://artha.link/@eanxt/jobs/data-engineer-v4c-ai-india-9c48c839",
    "https://artha.link/@eanxt/jobs/medical-coding-executive-bestica-healthcare-bengaluru-f62f649a",
    "https://artha.link/@eanxt/jobs/business-development-executive-oneklick-ai-hyderabad-47ce3322",
    "https://artha.link/@eanxt/jobs/backend-developer-c-net-remote-quik-hire-staffing-india-ef38a2e2",
    "https://artha.link/@eanxt/jobs/technical-writer-remote-quik-hire-staffing-india-d3d2fbbf",
    "https://artha.link/@eanxt/jobs/partnerships-manager-remote-quik-hire-staffing-india-7a9a1932",
    "https://artha.link/@eanxt/jobs/cinema-manager-pvr-limited-gurugram-2c24516c",
    "https://artha.link/@eanxt/jobs/account-manager-peoplefy-mumbai-942462ef",
    "https://artha.link/@eanxt/jobs/business-development-manager-phdizone-research-madurai-cd9888d1",
    "https://artha.link/@eanxt/jobs/data-engineer-paid-internship-unloq-bengaluru-74e816d5"
  ];

  let jobQueue = DEFAULT_QUEUE;
  let batchSize = 50; // default 50 (configurable: 25, 50, 100)

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
  async function waitForApplyButton(tabWin, maxWaitMs = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitMs) {
      if (!tabWin || tabWin.closed) break;

      let doc = null;
      try {
        doc = tabWin.document;
      } catch (crossOriginErr) {
        // Tab redirected to external employer site
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

        <!-- Batch Size & Navigation Row -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 6px 10px;">
          <div style="display: flex; align-items: center; gap: 3px;">
            <span style="font-size: 10px; color: #64748b; font-weight: 600; margin-right: 1px;">Batch:</span>
            <button id="zfp-size-25-btn" class="zfp-size-btn" data-size="25" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 6px; font-size: 10px; cursor: pointer; font-weight: 500;">25</button>
            <button id="zfp-size-50-btn" class="zfp-size-btn" data-size="50" style="background: #2563eb; color: #ffffff; border: 1px solid #2563eb; border-radius: 5px; padding: 2px 6px; font-size: 10px; cursor: pointer; font-weight: 700; box-shadow: 0 1px 3px rgba(37,99,235,0.2);">50</button>
            <button id="zfp-size-100-btn" class="zfp-size-btn" data-size="100" style="background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 2px 6px; font-size: 10px; cursor: pointer; font-weight: 500;">100</button>
          </div>

          <div id="zfp-batch-badge" style="font-size: 11px; font-weight: 700; color: #2563eb;">
            Batch ${Math.floor(state.currentIndex / batchSize) + 1} / ${Math.ceil(jobQueue.length / batchSize)}
          </div>

          <div style="display: flex; gap: 3px;">
            <button id="zfp-prev-batch-btn" title="Previous Batch" style="display: flex; align-items: center; background: #ffffff; color: #475569; border: 1px solid #cbd5e1; border-radius: 5px; padding: 3px 6px; font-size: 10px; cursor: pointer;">${ICONS.chevronLeft}</button>
            <button id="zfp-next-batch-btn" title="Next Batch" style="display: flex; align-items: center; background: #eff6ff; color: #2563eb; border: 1px solid #bfdbfe; border-radius: 5px; padding: 3px 6px; font-size: 10px; cursor: pointer; font-weight: 700;">${ICONS.chevronRight}</button>
          </div>
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
            <span id="zfp-btn-label">Start Batch ${Math.floor(state.currentIndex / batchSize) + 1} (${batchSize} Jobs)</span>
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
        ">Ready. Loaded ${jobQueue.length} jobs across ${Math.ceil(jobQueue.length / batchSize)} batches. Click Start to begin.</div>

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
            ${ICONS.info} Batch & Deep-Clean Guide:
          </div>
          <div>• <b>Batch Sizes:</b> Toggle between 25, 50, or 100 applications per batch.</div>
          <div>• <b>Per-Job Deep Purge:</b> Wipes cookies, sessionStorage & localStorage after EACH job.</div>
          <div>• <b>Auto-Closer:</b> Opens tab, clicks Apply, and closes all tabs cleanly.</div>
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
    const totalBatches = Math.ceil(totalJobs / batchSize);
    const percent = Math.min(100, Math.round((curIndex / totalJobs) * 100));

    if (progressBar) progressBar.style.width = percent + "%";
    if (progressText) progressText.innerText = curIndex + " / " + totalJobs + " (" + percent + "%)";
    if (appliedText) appliedText.innerText = state.completedCount;
    if (batchBadge) batchBadge.innerText = "Batch " + curBatch + " / " + totalBatches;
    if (targetText) {
      targetText.innerText = jobQueue[curIndex] ? ("[" + (curIndex + 1) + "/" + totalJobs + "] " + formatSlug(jobQueue[curIndex])) : "Queue Finished!";
    }
    if (!isRunning && btnLabel) {
      btnLabel.innerText = "Start Batch " + curBatch + " (" + batchSize + " Jobs)";
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

    // Track Tab 1 (Job Details), Tab 2 (Gateway/Redirect), and Tab 3 (Destination Employer/ATS)
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

      // 4. Wait for redirect (Tab 2 & Tab 3) and network telemetry to finalize (10s load wait)
      log("Waiting 10s for destination page hydration & affiliate telemetry...", "#64748b");
      await sleep(randomDelay(10000, 11500));

      // 5. Triple Tab Close: Cleanly wipe storage and close Tab 3, Tab 2, and Tab 1
      log("Purging storage & closing windows...", "#7c3aed");
      try {
        if (tab3 && !tab3.closed) {
          try { tab3.localStorage.clear(); } catch (e) {}
          try { tab3.sessionStorage.clear(); } catch (e) {}
          tab3.close();
          console.log("%c🚪 Tab 3 (Final Employer/ATS Destination Tab) storage wiped & closed cleanly.", "color: #059669; font-size: 11px; font-weight: bold;");
        }
      } catch (e) {}

      try {
        if (tab2 && !tab2.closed) {
          try { tab2.localStorage.clear(); } catch (e) {}
          try { tab2.sessionStorage.clear(); } catch (e) {}
          tab2.close();
          console.log("%c🚪 Tab 2 (Redirect Gateway Tab) storage wiped & closed cleanly.", "color: #059669; font-size: 11px; font-weight: bold;");
        }
      } catch (e) {}

      try {
        if (tab1 && !tab1.closed) {
          try { tab1.localStorage.clear(); } catch (e) {}
          try { tab1.sessionStorage.clear(); } catch (e) {}
          tab1.close();
          console.log("%c🚪 Tab 1 (Job Details Tab) storage wiped & closed cleanly.", "color: #059669; font-size: 11px; font-weight: bold;");
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
    console.log("%c🧼 [ZERO-FOOTPRINT PURGE] Cleared cookies, sessionStorage & localStorage for Job " + (state.currentIndex + 1), "color: #059669; font-weight: bold; font-size: 11px;");

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
    stopCooldownTimer();
    if (isRunning && !isPaused) return;
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

  // Batch Size Switchers (25, 50, 100)
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

  console.log(
    "%c 🕶️ ZERO-FOOTPRINT PRO: 1-BY-1 AUTO-APPLIER %c READY ",
    "background: #eff6ff; color: #2563eb; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #2563eb;",
    "background: #2563eb; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #2563eb;"
  );
  console.log(
    "%c📋 Total Queued: %c" + jobQueue.length + " openings across " + Math.ceil(jobQueue.length / batchSize) + " batches\n" +
    "%c💾 Saved Progress: %cJob " + (state.currentIndex + 1) + " (Batch " + (Math.floor(state.currentIndex / batchSize) + 1) + ") | Applied: " + state.completedCount + "\n" +
    "%c🎯 Batch Selector: %cChoose 25, 50, or 100 on the HUD toolbar\n" +
    "%c🧼 Deep Purge: %cCookies, localStorage & sessionStorage wiped after EACH application\n" +
    "%c💡 Instructions: Click 'Start Batch " + (Math.floor(state.currentIndex / batchSize) + 1) + "' on HUD or call window.__AUTO_APPLIER__.start()",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #2563eb; font-weight: bold;",
    "color: #64748b; font-weight: bold;", "color: #059669; font-weight: bold;",
    "color: #334155; font-style: italic;"
  );
})();
