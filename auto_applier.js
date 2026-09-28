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
  // 📋 EMBEDDED JOB URL QUEUE (1517 Openings, CPC: 0.048)
  // =========================================================================
  const DEFAULT_QUEUE = [
    "https://artha.link/@eanxt/jobs/sr-design-engineer-pprtl-prime-power-acl-digital-hyderabad-e4ddc0e2",
    "https://artha.link/@eanxt/jobs/ams-circuit-design-engineer-acl-digital-hyderabad-3c230688",
    "https://artha.link/@eanxt/jobs/accountant-s-lokanadham-co-hyderabad-480222e7",
    "https://artha.link/@eanxt/jobs/relationship-manager-pcg-advisory-chola-securities-hyderabad-249d6b95",
    "https://artha.link/@eanxt/jobs/agile-project-manager-only-immediate-luxoft-india-hyderabad-658e1780",
    "https://artha.link/@eanxt/jobs/houdini-artist-mythri-bhramaand-hyderabad-8d9925e2",
    "https://artha.link/@eanxt/jobs/interior-design-lead-livspace-hyderabad-5ee30715",
    "https://artha.link/@eanxt/jobs/pyp-spanish-facilitator-the-shri-ram-academy-hyderabad-0c87c5ba",
    "https://artha.link/@eanxt/jobs/sap-successfactors-consultant-tech-mahindra-hyderabad-f50672ca",
    "https://artha.link/@eanxt/jobs/sap-successfactors-rmk-rcm-consultant-tata-consultancy-hyderabad-9b95bfef",
    "https://artha.link/@eanxt/jobs/siebel-developer-tata-consultancy-hyderabad-bcf94e62",
    "https://artha.link/@eanxt/jobs/senior-back-end-developer-insight-global-hyderabad-6f7d620a",
    "https://artha.link/@eanxt/jobs/corporate-gifting-sales-manager-shelf-merch-hyderabad-cce37d09",
    "https://artha.link/@eanxt/jobs/article-assistant-shekar-and-co-hyderabad-2a2a1c5d",
    "https://artha.link/@eanxt/jobs/business-development-executive-strobes-security-inc-hyderabad-23f66212",
    "https://artha.link/@eanxt/jobs/fisheries-technician-ponicone-hyderabad-cb5d08c1",
    "https://artha.link/@eanxt/jobs/iti-fitters-pridefms-hyderabad-58259e05",
    "https://artha.link/@eanxt/jobs/finance-officer-united-brothers-hyderabad-aa90f681",
    "https://artha.link/@eanxt/jobs/sr-data-engineer-insight-global-hyderabad-b4920e27",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-olympus-corporation-hyderabad-abeb9bd8",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-iravatham-homes-hyderabad-c783b15f",
    "https://artha.link/@eanxt/jobs/quality-assurance-automation-engineer-qualizeal-hyderabad-732191d0",
    "https://artha.link/@eanxt/jobs/sales-executive-rv-tours-and-hyderabad-55c4f02f",
    "https://artha.link/@eanxt/jobs/cyber-security-architect-shi-solutions-india-hyderabad-d35f7e45",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-kanerika-inc-hyderabad-65930759",
    "https://artha.link/@eanxt/jobs/interior-designer-livspace-hyderabad-2b133a93",
    "https://artha.link/@eanxt/jobs/business-development-manager-real-capital-hyderabad-daafaaa3",
    "https://artha.link/@eanxt/jobs/accordion-india-lead-data-engineer-accordion-india-hyderabad-cb0296ef",
    "https://artha.link/@eanxt/jobs/senior-sql-server-postgresql-dba-programmers-io-hyderabad-d50153d4",
    "https://artha.link/@eanxt/jobs/inside-sales-manager-fission-labs-hyderabad-8c2fbdca",
    "https://artha.link/@eanxt/jobs/operations-manager-scale-jobs-hyderabad-159d8d88",
    "https://artha.link/@eanxt/jobs/technical-consultant-wfm-adp-hyderabad-71d024df",
    "https://artha.link/@eanxt/jobs/senior-frontend-developer-prudent-hyderabad-82eb7305",
    "https://artha.link/@eanxt/jobs/customer-support-specialist-artech-infosystem-hyderabad-5d63f97c",
    "https://artha.link/@eanxt/jobs/senior-accounts-executive-devender-co-hyderabad-4d34fcea",
    "https://artha.link/@eanxt/jobs/customer-support-specialist-artech-infosystem-hyderabad-bf544787",
    "https://artha.link/@eanxt/jobs/enterprise-solutions-executive-senior-codenyx-hyderabad-3f2f9b70",
    "https://artha.link/@eanxt/jobs/production-support-analyst-dark-matter-hyderabad-93402551",
    "https://artha.link/@eanxt/jobs/data-center-autocad-design-engineer-astreya-hyderabad-c4d84985",
    "https://artha.link/@eanxt/jobs/senior-sales-manager-the-leela-palaces-hyderabad-654425b3",
    "https://artha.link/@eanxt/jobs/senior-web-video-player-engineer-remote-kake-hyderabad-b690c839",
    "https://artha.link/@eanxt/jobs/digital-brand-designer-graphic-ui-ux-robotouch-hyderabad-65d7cf80",
    "https://artha.link/@eanxt/jobs/support-engineer-microsoft-teams-waferwire-cloud-hyderabad-29405a0e",
    "https://artha.link/@eanxt/jobs/operations-supervisor-medchemexpress-llc-hyderabad-c773c566",
    "https://artha.link/@eanxt/jobs/business-development-manager-cregx-hyderabad-99cb4539",
    "https://artha.link/@eanxt/jobs/audit-manager-commercial-real-estate-sentient-an-ascend-hyderabad-362be446",
    "https://artha.link/@eanxt/jobs/presales-manager-qualizeal-hyderabad-720fc7bc",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-analyst-scientist-kake-hyderabad-3000a866",
    "https://artha.link/@eanxt/jobs/senior-storage-engineer-openstack-ceph-cloud4c-services-hyderabad-2f23c5c9",
    "https://artha.link/@eanxt/jobs/business-head-smartq-hyderabad-7bba5ced",
    "https://artha.link/@eanxt/jobs/fashion-design-specialist-kaladhar-handlooms-hyderabad-f2d27756",
    "https://artha.link/@eanxt/jobs/power-bi-engineer-bpmlinks-hyderabad-f1cfdf29",
    "https://artha.link/@eanxt/jobs/kafka-admin-bpmlinks-hyderabad-950ff55e",
    "https://artha.link/@eanxt/jobs/sailpoint-isc-developer-cirruslabs-hyderabad-c352b028",
    "https://artha.link/@eanxt/jobs/oracle-consultant-nish-technologies-hyderabad-5153eda9",
    "https://artha.link/@eanxt/jobs/sales-executive-hyderabad-kompally-design-cafe-hyderabad-eb79847e",
    "https://artha.link/@eanxt/jobs/administrative-manager-anupam-fuels-hyderabad-3a1ba1f0",
    "https://artha.link/@eanxt/jobs/us-non-it-engineering-recruiter-msrcosmos-llc-hyderabad-c9980920",
    "https://artha.link/@eanxt/jobs/regulatory-compliance-manager-wise-hyderabad-988de57a",
    "https://artha.link/@eanxt/jobs/oracle-database-administrator-persistent-systems-hyderabad-9f929be2",
    "https://artha.link/@eanxt/jobs/performance-management-specialist-re-soch-hyderabad-14a680ae",
    "https://artha.link/@eanxt/jobs/oracle-consultant-nish-technologies-hyderabad-366021bd",
    "https://artha.link/@eanxt/jobs/pre-sales-solutions-engineer-ai-cx-pronix-inc-hyderabad-5f8343d2",
    "https://artha.link/@eanxt/jobs/informatica-mdm-developer-persistent-systems-hyderabad-223decef",
    "https://artha.link/@eanxt/jobs/assistant-sales-manager-workafella-hyderabad-b0779226",
    "https://artha.link/@eanxt/jobs/gis-developer-kumaran-systems-hyderabad-300c37dc",
    "https://artha.link/@eanxt/jobs/wiam-intake-info-sec-analyst-lorven-technologies-hyderabad-0a3714ff",
    "https://artha.link/@eanxt/jobs/gcp-data-engineer-hyderabad-hcltech-hyderabad-10b364db",
    "https://artha.link/@eanxt/jobs/sales-development-highradius-hyderabad-051eba85",
    "https://artha.link/@eanxt/jobs/edtech-business-development-manager-ihub-data-iiit-hyderabad-9ae973b4",
    "https://artha.link/@eanxt/jobs/new-client-intake-staff-citrin-cooperman-hyderabad-4c7652e9",
    "https://artha.link/@eanxt/jobs/new-client-intake-senior-citrin-cooperman-hyderabad-14a00018",
    "https://artha.link/@eanxt/jobs/data-engineer-lead-nexus-corporation-hyderabad-861e80ad",
    "https://artha.link/@eanxt/jobs/mdm-master-data-management-or-reltio-pwc-acceleration-hyderabad-3f514540",
    "https://artha.link/@eanxt/jobs/presales-engineer-kanerika-inc-hyderabad-95dbe23e",
    "https://artha.link/@eanxt/jobs/business-development-inside-sales-emertxe-information-hyderabad-1c7f7e63",
    "https://artha.link/@eanxt/jobs/director-demand-generation-zenwork-inc-hyderabad-6c19c98b",
    "https://artha.link/@eanxt/jobs/sales-engineer-safran-hyderabad-900efa70",
    "https://artha.link/@eanxt/jobs/rtl-design-engineer-acl-digital-hyderabad-c1dd92fc",
    "https://artha.link/@eanxt/jobs/rtl-design-engineer-acl-digital-hyderabad-a3b2a59a",
    "https://artha.link/@eanxt/jobs/analog-layout-acl-digital-hyderabad-0920adcc",
    "https://artha.link/@eanxt/jobs/flexera-sme-tata-consultancy-hyderabad-d11e9ea9",
    "https://artha.link/@eanxt/jobs/sales-manager-acl-digital-hyderabad-dd00c316",
    "https://artha.link/@eanxt/jobs/sap-cpi-consultant-tata-consultancy-hyderabad-08b614c8",
    "https://artha.link/@eanxt/jobs/senior-automation-engineer-insight-global-hyderabad-f3b4dbfe",
    "https://artha.link/@eanxt/jobs/telecom-engineer-tata-consultancy-hyderabad-2204870e",
    "https://artha.link/@eanxt/jobs/cisco-ucs-admin-tata-consultancy-hyderabad-cb7c4962",
    "https://artha.link/@eanxt/jobs/data-engineer-tata-consultancy-hyderabad-735f5aff",
    "https://artha.link/@eanxt/jobs/network-l2-administrator-tata-consultancy-hyderabad-9428c721",
    "https://artha.link/@eanxt/jobs/oracle-cloud-technical-tata-consultancy-hyderabad-f71f8865",
    "https://artha.link/@eanxt/jobs/azure-data-engineer-tata-consultancy-hyderabad-d90cbbce",
    "https://artha.link/@eanxt/jobs/senior-scala-backend-developer-tata-consultancy-hyderabad-afd00354",
    "https://artha.link/@eanxt/jobs/consultant-tata-consultancy-hyderabad-13fe0ed5",
    "https://artha.link/@eanxt/jobs/network-architect-tata-consultancy-hyderabad-e9c8c9c1",
    "https://artha.link/@eanxt/jobs/m365-admin-tata-consultancy-hyderabad-49a20a04",
    "https://artha.link/@eanxt/jobs/1040-hni-supervisor-citrin-cooperman-hyderabad-f9256ab3",
    "https://artha.link/@eanxt/jobs/support-engineer-dynamics-365-contact-waferwire-cloud-hyderabad-7ba342f9",
    "https://artha.link/@eanxt/jobs/senior-quality-assurance-automation-zapcom-group-inc-hyderabad-3172b1d1",
    "https://artha.link/@eanxt/jobs/network-engineer-ccna-vitel-global-hyderabad-44ca6b54",
    "https://artha.link/@eanxt/jobs/gcp-data-analyst-persistent-systems-hyderabad-7143dc6b",
    "https://artha.link/@eanxt/jobs/sales-manager-swiggy-hyderabad-616fd9bc",
    "https://artha.link/@eanxt/jobs/oracle-fusion-functional-functional-scm-tata-consultancy-hyderabad-8ea26baf",
    "https://artha.link/@eanxt/jobs/servicenow-csm-tata-consultancy-hyderabad-2aa5a756",
    "https://artha.link/@eanxt/jobs/content-writer-ixoreal-biomed-hyderabad-e1b66e12",
    "https://artha.link/@eanxt/jobs/msd-f-o-technical-consultant-tata-consultancy-hyderabad-b690966d",
    "https://artha.link/@eanxt/jobs/corporate-sales-hyd-blr-bonito-designs-hyderabad-8871d2db",
    "https://artha.link/@eanxt/jobs/sap-ibp-techno-functional-consultant-evoke-technologies-hyderabad-2785b477",
    "https://artha.link/@eanxt/jobs/oracle-weblogic-admin-tata-consultancy-hyderabad-8c6aaea6",
    "https://artha.link/@eanxt/jobs/sales-manager-swiggy-hyderabad-6bff98af",
    "https://artha.link/@eanxt/jobs/sales-officer-mm-foam-india-hyderabad-4aa56ce1",
    "https://artha.link/@eanxt/jobs/account-advisor-revenue-operations-trundl-inc-hyderabad-cce95ea9",
    "https://artha.link/@eanxt/jobs/netapp-storage-admin-l3-tata-consultancy-hyderabad-e32a9ca0",
    "https://artha.link/@eanxt/jobs/oracle-fusion-financials-functional-appstek-corp-hyderabad-61246539",
    "https://artha.link/@eanxt/jobs/oracle-fusion-cloud-hcm-functional-appstek-corp-hyderabad-0e92cd9b",
    "https://artha.link/@eanxt/jobs/gcp-data-engineer-tata-consultancy-hyderabad-e1e39555",
    "https://artha.link/@eanxt/jobs/big-data-engineers-spark-scala-aws-coforge-hyderabad-82f5de19",
    "https://artha.link/@eanxt/jobs/vice-president-operations-adept-global-hyderabad-e32d07df",
    "https://artha.link/@eanxt/jobs/senior-principal-statistical-programmer-ocugen-india-pvt-ltd-hyderabad-dcd91430",
    "https://artha.link/@eanxt/jobs/adobe-senior-developer-tata-consultancy-hyderabad-44e8afac",
    "https://artha.link/@eanxt/jobs/sap-concur-consultant-hcltech-hyderabad-cd4b742b",
    "https://artha.link/@eanxt/jobs/quality-assurance-manager-incedo-inc-hyderabad-97e20754",
    "https://artha.link/@eanxt/jobs/research-and-development-specialist-doveriye-hyderabad-105144bf",
    "https://artha.link/@eanxt/jobs/security-manager-data-centre-operations-securitas-group-hyderabad-044e2083",
    "https://artha.link/@eanxt/jobs/principal-data-engineer-anblicks-hyderabad-3759c3fe",
    "https://artha.link/@eanxt/jobs/zonal-credit-manager-financial-services-hyderabad-726cc129",
    "https://artha.link/@eanxt/jobs/oracle-scm-functional-consultant-eappsys-hyderabad-20f1cfe6",
    "https://artha.link/@eanxt/jobs/informatica-developer-tata-consultancy-hyderabad-40547e8e",
    "https://artha.link/@eanxt/jobs/lead-data-engineer-technogen-india-pvt-hyderabad-da48858b",
    "https://artha.link/@eanxt/jobs/senior-student-success-executive-emertxe-information-hyderabad-28e6799d",
    "https://artha.link/@eanxt/jobs/senior-soa-integration-engineer-solugenix-hyderabad-3ae56abb",
    "https://artha.link/@eanxt/jobs/audiologist-hnr-speech-and-hyderabad-5d7a629d",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-talent-corner-hr-hyderabad-13b3a4bd",
    "https://artha.link/@eanxt/jobs/customer-service-executives-hiwaga-beauty-salon-hyderabad-0505707e",
    "https://artha.link/@eanxt/jobs/us-accounting-staff-citrin-cooperman-hyderabad-c8191e6f",
    "https://artha.link/@eanxt/jobs/furniture-designer-luxury-craft-segment-nolwa-hyderabad-fd103419",
    "https://artha.link/@eanxt/jobs/support-engineer-persistent-systems-hyderabad-6e01b120",
    "https://artha.link/@eanxt/jobs/oracle-functional-consultant-buxton-consulting-hyderabad-7f5a47d5",
    "https://artha.link/@eanxt/jobs/quality-systems-specialist-ocugen-india-pvt-ltd-hyderabad-5d8865e4",
    "https://artha.link/@eanxt/jobs/cch-tagetik-consultant-viseo-hyderabad-bc135056",
    "https://artha.link/@eanxt/jobs/clinical-project-coordinator-imaging-endpoints-hyderabad-d0d2a695",
    "https://artha.link/@eanxt/jobs/sap-basis-data-center-migration-gyansys-inc-hyderabad-3c9329cc",
    "https://artha.link/@eanxt/jobs/it-architect-imaging-endpoints-hyderabad-da5a2cca",
    "https://artha.link/@eanxt/jobs/genai-architect-vlink-inc-hyderabad-4600bdfd",
    "https://artha.link/@eanxt/jobs/we-re-hiring-at-amped-amped-games-social-hyderabad-e250f2a1",
    "https://artha.link/@eanxt/jobs/business-development-manager-marble-nitco-limited-hyderabad-e0817cbe",
    "https://artha.link/@eanxt/jobs/virtual-relationship-manager-insurancedekho-hyderabad-b860d536",
    "https://artha.link/@eanxt/jobs/ai-transformation-director-axtria-ingenious-hyderabad-21070c04",
    "https://artha.link/@eanxt/jobs/travel-and-tourism-freshers-sales-bd-homeyhuts-hyderabad-c513544a",
    "https://artha.link/@eanxt/jobs/social-media-content-designer-video-shelf-merch-hyderabad-f78c3aab",
    "https://artha.link/@eanxt/jobs/audit-senior-commercial-real-estate-citrin-cooperman-hyderabad-9dd6a7ed",
    "https://artha.link/@eanxt/jobs/accounts-payable-accountant-emea-sol-millennium-hyderabad-341f804f",
    "https://artha.link/@eanxt/jobs/project-manager-holmesai-hyderabad-bd7c2629",
    "https://artha.link/@eanxt/jobs/oracle-forms-tata-consultancy-hyderabad-0084a36d",
    "https://artha.link/@eanxt/jobs/manager-business-development-bim-arth-hyderabad-c52587e3",
    "https://artha.link/@eanxt/jobs/sales-manager-nklusive-hyderabad-0c90ab49",
    "https://artha.link/@eanxt/jobs/oracle-fusion-hcm-functional-consultant-tata-consultancy-hyderabad-362b9007",
    "https://artha.link/@eanxt/jobs/hedge-fund-accountant-ces-hyderabad-dd8df12e",
    "https://artha.link/@eanxt/jobs/sap-ps-consultant-hcltech-hyderabad-55d3e6c8",
    "https://artha.link/@eanxt/jobs/sap-mm-consultant-tata-consultancy-hyderabad-08d31f04",
    "https://artha.link/@eanxt/jobs/inside-sales-executive-scale-jobs-hyderabad-ec157293",
    "https://artha.link/@eanxt/jobs/data-engineer-valuelabs-hyderabad-86d3112b",
    "https://artha.link/@eanxt/jobs/oracle-hcm-technical-tata-consultancy-hyderabad-d1507042",
    "https://artha.link/@eanxt/jobs/community-manager-scale-jobs-hyderabad-35349242",
    "https://artha.link/@eanxt/jobs/oracle-hcm-tata-consultancy-hyderabad-a03abc03",
    "https://artha.link/@eanxt/jobs/sales-intern-us-region-scale-jobs-hyderabad-8c3bd483",
    "https://artha.link/@eanxt/jobs/sap-s-4hana-sd-functional-consultant-tata-consultancy-hyderabad-a62593e7",
    "https://artha.link/@eanxt/jobs/assistant-professor-accounting-finance-gitam-deemed-hyderabad-b787e0d1",
    "https://artha.link/@eanxt/jobs/sales-lead-livspace-hyderabad-5508c21d",
    "https://artha.link/@eanxt/jobs/design-lead-livspace-hyderabad-40dbe2ca",
    "https://artha.link/@eanxt/jobs/account-manager-saras-analytics-hyderabad-51712916",
    "https://artha.link/@eanxt/jobs/salesforce-technical-lead-solugenix-hyderabad-dcef901a",
    "https://artha.link/@eanxt/jobs/agile-scrum-tata-consultancy-hyderabad-2149e765",
    "https://artha.link/@eanxt/jobs/oracle-ebs-scm-techno-functional-tata-consultancy-hyderabad-a0fd95f7",
    "https://artha.link/@eanxt/jobs/redhat-linux-administration-tata-consultancy-hyderabad-834034f3",
    "https://artha.link/@eanxt/jobs/asa1-ca-fresher-stat-audit-deloitte-hyderabad-fa4843db",
    "https://artha.link/@eanxt/jobs/front-end-developer-react-tata-consultancy-hyderabad-686ce267",
    "https://artha.link/@eanxt/jobs/business-development-manager-saas-sales-archvi-hyderabad-fd13a9e7",
    "https://artha.link/@eanxt/jobs/software-asset-manager-sam-manager-astreya-hyderabad-31f14265",
    "https://artha.link/@eanxt/jobs/network-administrator-tata-consultancy-hyderabad-7deb89f2",
    "https://artha.link/@eanxt/jobs/network-administrator-meraki-experience-tata-consultancy-hyderabad-c0872595",
    "https://artha.link/@eanxt/jobs/ansible-automation-engineer-tata-consultancy-hyderabad-786bdad1",
    "https://artha.link/@eanxt/jobs/ai-operations-incident-commander-pwc-acceleration-hyderabad-15d599b6",
    "https://artha.link/@eanxt/jobs/incident-manager-ctrls-datacenters-hyderabad-3e6bff07",
    "https://artha.link/@eanxt/jobs/network-engineer-sonata-software-hyderabad-cdb1b21f",
    "https://artha.link/@eanxt/jobs/informatica-bdm-developer-tata-consultancy-hyderabad-752d4afd",
    "https://artha.link/@eanxt/jobs/entra-id-tata-consultancy-hyderabad-8c8f1fa3",
    "https://artha.link/@eanxt/jobs/accountant-sol-millennium-hyderabad-021c8b97",
    "https://artha.link/@eanxt/jobs/interior-architect-ini-design-studio-hyderabad-b4590cb3",
    "https://artha.link/@eanxt/jobs/customer-success-operations-associate-assistly-senior-hyderabad-43b63e53",
    "https://artha.link/@eanxt/jobs/lead-corporate-services-ec-council-hyderabad-aeda30f1",
    "https://artha.link/@eanxt/jobs/sap-isu-fica-consultant-tata-consultancy-hyderabad-1be9aa83",
    "https://artha.link/@eanxt/jobs/network-nsx-avi-sme-tata-consultancy-hyderabad-7d481178",
    "https://artha.link/@eanxt/jobs/senior-project-coordinator-rsp-india-hyderabad-9e3ac1ff",
    "https://artha.link/@eanxt/jobs/area-service-incharge-jio-hyderabad-350e52f4",
    "https://artha.link/@eanxt/jobs/data-engineer-tata-consultancy-hyderabad-254ae555",
    "https://artha.link/@eanxt/jobs/inside-sales-specialist-taevas-life-sciences-hyderabad-af3c7ae8",
    "https://artha.link/@eanxt/jobs/project-manager-domain-p-c-valuemomentum-hyderabad-724969f5",
    "https://artha.link/@eanxt/jobs/database-administrator-tanla-platforms-hyderabad-30bd7268",
    "https://artha.link/@eanxt/jobs/senior-data-analyst-tanla-platforms-hyderabad-c365ea32",
    "https://artha.link/@eanxt/jobs/sap-sd-with-vistex-consultant-automatonsx-hyderabad-dfdf0ec1",
    "https://artha.link/@eanxt/jobs/oracle-hcm-cloud-tata-consultancy-hyderabad-bf654129",
    "https://artha.link/@eanxt/jobs/sap-cloud-alm-consultant-tata-consultancy-hyderabad-ea23ba7d",
    "https://artha.link/@eanxt/jobs/senior-sales-manager-mirana-realty-hyderabad-2b8230ef",
    "https://artha.link/@eanxt/jobs/sap-abap-consultant-nexsap-solutions-hyderabad-da1c8380",
    "https://artha.link/@eanxt/jobs/project-manager-chattels-design-hyderabad-7378b222",
    "https://artha.link/@eanxt/jobs/senior-data-analyst-keka-hr-hyderabad-4f223954",
    "https://artha.link/@eanxt/jobs/technical-project-manager-valuelabs-hyderabad-96a02697",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-nationsbenefits-hyderabad-c0a17628",
    "https://artha.link/@eanxt/jobs/cyberark-architect-sutherland-hyderabad-59027db3",
    "https://artha.link/@eanxt/jobs/business-manager-latin-america-scigen-pte-ltd-hyderabad-1d6748d8",
    "https://artha.link/@eanxt/jobs/pega-technical-architect-coforge-hyderabad-6b505333",
    "https://artha.link/@eanxt/jobs/key-accounts-manager-e-commerce-ccl-products-india-hyderabad-f1cc974d",
    "https://artha.link/@eanxt/jobs/servicenow-project-management-persistent-systems-hyderabad-22048bf5",
    "https://artha.link/@eanxt/jobs/linux-administrator-persistent-systems-hyderabad-b62cfef8",
    "https://artha.link/@eanxt/jobs/microsoft-365-cloud-security-intern-hyd-shrimad-technologies-hyderabad-d1781ca3",
    "https://artha.link/@eanxt/jobs/data-scientist-birlasoft-hyderabad-42f99211",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-evernorth-health-hyderabad-daa2c70c",
    "https://artha.link/@eanxt/jobs/ui-ux-designer-genpact-hyderabad-24a1d959",
    "https://artha.link/@eanxt/jobs/sales-development-representative-cognitivebotics-hyderabad-a57230c3",
    "https://artha.link/@eanxt/jobs/senior-project-architect-high-rise-studio-infinite-hyderabad-54ac369d",
    "https://artha.link/@eanxt/jobs/sap-ilm-consultant-tata-consultancy-hyderabad-e88493c7",
    "https://artha.link/@eanxt/jobs/sap-s-4hana-fscm-functional-consultant-tata-consultancy-hyderabad-d9ddc013",
    "https://artha.link/@eanxt/jobs/senior-sap-ibp-consultant-tata-consultancy-hyderabad-96c5dbd2",
    "https://artha.link/@eanxt/jobs/company-secretary-nsl-hyderabad-2d2ded93",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-prudent-hyderabad-e70ee4fa",
    "https://artha.link/@eanxt/jobs/ms-dynamics-365-f-o-technical-consultant-tata-consultancy-hyderabad-f5a97b33",
    "https://artha.link/@eanxt/jobs/backup-administrator-cloud4c-services-hyderabad-466d290f",
    "https://artha.link/@eanxt/jobs/hiring-drive-servicenow-cmdb-engineer-adp-hyderabad-6e1c67eb",
    "https://artha.link/@eanxt/jobs/associate-director-record-to-report-randstad-global-hyderabad-1eece14d",
    "https://artha.link/@eanxt/jobs/senior-network-engineer-ctrls-datacenters-hyderabad-0d064652",
    "https://artha.link/@eanxt/jobs/state-head-matrimony-com-hyderabad-56516a23",
    "https://artha.link/@eanxt/jobs/audit-senior-investment-funds-sentient-an-ascend-hyderabad-ee99644c",
    "https://artha.link/@eanxt/jobs/senior-oracle-apps-technical-consultant-quess-it-solutions-hyderabad-df9b90cb",
    "https://artha.link/@eanxt/jobs/marketing-growth-intern-vanix-technologies-hyderabad-91f8323c",
    "https://artha.link/@eanxt/jobs/industry-partnership-manager-indian-school-of-hyderabad-8e0cec9e",
    "https://artha.link/@eanxt/jobs/accordion-india-associate-it-risk-and-accordion-india-hyderabad-2977be21",
    "https://artha.link/@eanxt/jobs/cyber-security-senior-engineer-evernorth-health-hyderabad-143bc7f7",
    "https://artha.link/@eanxt/jobs/piping-design-engineer-integrated-hyderabad-2454fb17",
    "https://artha.link/@eanxt/jobs/senior-test-engineer-lead-test-engineer-qualizeal-hyderabad-f41f66f1",
    "https://artha.link/@eanxt/jobs/channel-sales-manager-uneecops-hyderabad-34d41d78",
    "https://artha.link/@eanxt/jobs/oracle-incentive-compensation-cloud-tata-consultancy-hyderabad-a7345dfc",
    "https://artha.link/@eanxt/jobs/data-analytics-tl-aceolution-hyderabad-b820ff9c",
    "https://artha.link/@eanxt/jobs/software-developer-php-react-akkodis-hyderabad-5f5711de",
    "https://artha.link/@eanxt/jobs/senior-analog-layout-engineer-leadsoc-hyderabad-91c4dbcd",
    "https://artha.link/@eanxt/jobs/data-engineer-tata-consultancy-hyderabad-3413dfda",
    "https://artha.link/@eanxt/jobs/sr-designer-interiors-vm-modular-hyderabad-d843ec05",
    "https://artha.link/@eanxt/jobs/network-engineer-coforge-hyderabad-61f9d0b9",
    "https://artha.link/@eanxt/jobs/senior-sales-manager-human-nutrition-flychem-hyderabad-7e9b9e9c",
    "https://artha.link/@eanxt/jobs/backup-administrator-veeam-tekskills-inc-hyderabad-e22fbfbe",
    "https://artha.link/@eanxt/jobs/program-manager-saras-analytics-hyderabad-88241e29",
    "https://artha.link/@eanxt/jobs/bim-architect-interior-design-latinem-private-hyderabad-fe36119f",
    "https://artha.link/@eanxt/jobs/technology-provisioning-analyst-t500-cibc-india-hyderabad-c318cf1c",
    "https://artha.link/@eanxt/jobs/sap-finance-control-consultant-latinem-private-hyderabad-12144228",
    "https://artha.link/@eanxt/jobs/azure-network-specialist-viaplus-hyderabad-e2c735f6",
    "https://artha.link/@eanxt/jobs/application-support-specialist-t500-cibc-india-hyderabad-8d8a5a85",
    "https://artha.link/@eanxt/jobs/sap-build-process-automation-bpa-latinem-private-hyderabad-1067d12a",
    "https://artha.link/@eanxt/jobs/data-engineer-latinem-private-hyderabad-4277ceba",
    "https://artha.link/@eanxt/jobs/instructional-designer-tp-hyderabad-98f8d49d",
    "https://artha.link/@eanxt/jobs/senior-account-manager-h-rmann-india-hyderabad-680dd0af",
    "https://artha.link/@eanxt/jobs/senior-full-stack-developer-php-laravel-ekshvaku-tech-hyderabad-f5b20e57",
    "https://artha.link/@eanxt/jobs/sr-azure-data-engineer-fabric-mandatory-tata-consultancy-hyderabad-9ef6f728",
    "https://artha.link/@eanxt/jobs/business-specialist-process-and-change-cibc-india-hyderabad-e59ca0e6",
    "https://artha.link/@eanxt/jobs/manager-it-cybersecurity-data-ansr-hyderabad-6c1ab67b",
    "https://artha.link/@eanxt/jobs/lead-edifecs-analyst-simplify-alpha-hyderabad-ddd8d8ec",
    "https://artha.link/@eanxt/jobs/data-analyst-lonza-hyderabad-ddaa7583",
    "https://artha.link/@eanxt/jobs/sr-engineer-it-cybersecurity-data-ansr-hyderabad-26734da9",
    "https://artha.link/@eanxt/jobs/gaming-support-live-connections-hyderabad-ca6761be",
    "https://artha.link/@eanxt/jobs/sales-manager-workafella-hyderabad-5b4ca80e",
    "https://artha.link/@eanxt/jobs/senior-sales-engineer-trident-infosol-hyderabad-f3cc5a9d",
    "https://artha.link/@eanxt/jobs/data-engineer-valuemomentum-hyderabad-df43eaee",
    "https://artha.link/@eanxt/jobs/lead-data-engineer-databricks-kanerika-inc-hyderabad-b7cd3af9",
    "https://artha.link/@eanxt/jobs/senior-finance-executive-kanerika-inc-hyderabad-4805f6f4",
    "https://artha.link/@eanxt/jobs/ui-ux-engineer-insight-global-hyderabad-3e0324cc",
    "https://artha.link/@eanxt/jobs/zonal-sales-manager-personal-care-flychem-hyderabad-2b1abbb8",
    "https://artha.link/@eanxt/jobs/back-end-developer-digile-hyderabad-de0f12ce",
    "https://artha.link/@eanxt/jobs/audit-senior-not-for-profit-hud-citrin-cooperman-hyderabad-97782647",
    "https://artha.link/@eanxt/jobs/business-development-executive-it-sharpatoms-hyderabad-b21bd940",
    "https://artha.link/@eanxt/jobs/technical-systems-support-engineer-adb-safegate-hyderabad-5bd6d45b",
    "https://artha.link/@eanxt/jobs/bim-consultant-acs-arth-hyderabad-934e4f6f",
    "https://artha.link/@eanxt/jobs/assistant-manager-deputy-manager-plant-gridcrest-by-kaynes-hyderabad-4d9f5d57",
    "https://artha.link/@eanxt/jobs/sales-team-lead-ltm-hyderabad-94b90c87",
    "https://artha.link/@eanxt/jobs/data-modeller-tata-consultancy-hyderabad-81f2d9f8",
    "https://artha.link/@eanxt/jobs/interior-designer-naibu-design-studio-hyderabad-9c4b5e2f",
    "https://artha.link/@eanxt/jobs/oracle-planning-cloud-tata-consultancy-hyderabad-ee9e9d90",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-prodoc-ai-hyderabad-2acd3ebb",
    "https://artha.link/@eanxt/jobs/hedge-fund-accountant-senior-director-live-connections-hyderabad-a51b08e5",
    "https://artha.link/@eanxt/jobs/sales-and-marketing-for-hvac-and-syntec-airflow-hyderabad-eaf1f02f",
    "https://artha.link/@eanxt/jobs/sap-fico-lead-consultant-dautom-hyderabad-65343805",
    "https://artha.link/@eanxt/jobs/servicenow-itam-ham-sam-tata-consultancy-hyderabad-410000fd",
    "https://artha.link/@eanxt/jobs/director-workforce-management-wfm-sutherland-hyderabad-1a16f218",
    "https://artha.link/@eanxt/jobs/project-manager-insight-global-hyderabad-4beb9307",
    "https://artha.link/@eanxt/jobs/commvault-backup-cloud4c-services-hyderabad-dcd9fbc0",
    "https://artha.link/@eanxt/jobs/junior-interior-designer-homelane-hyderabad-646c9f4f",
    "https://artha.link/@eanxt/jobs/assistant-accountant-t500-29273-visy-hyderabad-3228abb0",
    "https://artha.link/@eanxt/jobs/sap-fiori-consultant-syntax-hyderabad-19974609",
    "https://artha.link/@eanxt/jobs/performance-test-engineer-javascript-c-luxoft-hyderabad-6711a0dc",
    "https://artha.link/@eanxt/jobs/engineer-it-software-fullstack-t500-ansr-hyderabad-482ab993",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-latinem-private-hyderabad-a8cdec0b",
    "https://artha.link/@eanxt/jobs/offline-marketing-executive-doctor-ogha-hyderabad-98744239",
    "https://artha.link/@eanxt/jobs/commercial-technology-manager-flynas-hyderabad-807e3eea",
    "https://artha.link/@eanxt/jobs/client-relationship-associate-quess-tax-filing-hyderabad-10595dd8",
    "https://artha.link/@eanxt/jobs/sap-grc-pc-consultant-tata-consultancy-hyderabad-53b1d8ad",
    "https://artha.link/@eanxt/jobs/sales-executive-wehouse-home-hyderabad-5a5c7ffc",
    "https://artha.link/@eanxt/jobs/mba-internal-sales-executive-diagnostics-ogha-hyderabad-f1acad04",
    "https://artha.link/@eanxt/jobs/sap-pm-lead-consultant-dautom-hyderabad-541ca380",
    "https://artha.link/@eanxt/jobs/creative-designer-graphic-video-motion-marcus-co-hyderabad-df5069cf",
    "https://artha.link/@eanxt/jobs/senior-design-engineer-puzzolana-india-hyderabad-1b9b882a",
    "https://artha.link/@eanxt/jobs/assistant-manager-academic-and-student-indian-school-of-hyderabad-973a011b",
    "https://artha.link/@eanxt/jobs/sr-executive-product-support-specialist-deloitte-hyderabad-5c1411bc",
    "https://artha.link/@eanxt/jobs/sales-manager-home-interiors-homewiz-hyderabad-e4d031cc",
    "https://artha.link/@eanxt/jobs/educator-coach-school-education-maple-valley-hyderabad-4e423d69",
    "https://artha.link/@eanxt/jobs/php-fullstack-lead-allshore-hyderabad-a2b96edc",
    "https://artha.link/@eanxt/jobs/sales-manager-mouri-tech-hyderabad-394bf025",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-managed-services-coeo-hyderabad-c421f0ba",
    "https://artha.link/@eanxt/jobs/compliance-manager-auditing-monitoring-azurity-hyderabad-8151dc13",
    "https://artha.link/@eanxt/jobs/cryptography-architect-eki-veltris-hyderabad-8f893d36",
    "https://artha.link/@eanxt/jobs/systems-engineer-storage-backup-recovery-gspann-technologies-hyderabad-8e79f720",
    "https://artha.link/@eanxt/jobs/customer-operations-team-leader-order-visy-hyderabad-8c1a6857",
    "https://artha.link/@eanxt/jobs/network-systems-administration-senior-inspire-hyderabad-5cd8c474",
    "https://artha.link/@eanxt/jobs/lead-databricks-engineer-t500-29323-talent500-hyderabad-2f62d604",
    "https://artha.link/@eanxt/jobs/data-management-specialist-htc-global-services-hyderabad-d1034a8e",
    "https://artha.link/@eanxt/jobs/head-of-operations-unison-hyderabad-a7e32814",
    "https://artha.link/@eanxt/jobs/sales-executive-natural-elements-hyderabad-f7753657",
    "https://artha.link/@eanxt/jobs/dom-system-administrator-the-children-s-place-hyderabad-91b2d721",
    "https://artha.link/@eanxt/jobs/business-development-executive-milieu-global-it-hyderabad-60591642",
    "https://artha.link/@eanxt/jobs/front-office-team-leader-hyatt-place-hyderabad-66fa4288",
    "https://artha.link/@eanxt/jobs/personal-assistant-to-managing-director-krishna-jewellers-hyderabad-ad1257d6",
    "https://artha.link/@eanxt/jobs/static-timing-analysis-sta-engineer-sevya-multimedia-hyderabad-0f82459d",
    "https://artha.link/@eanxt/jobs/project-manager-customer-implementations-cloudleap-hyderabad-8fcc7494",
    "https://artha.link/@eanxt/jobs/business-development-manager-krishna-jewellers-hyderabad-62fc1abc",
    "https://artha.link/@eanxt/jobs/luxury-real-estate-manager-sharpline-hyderabad-0fb7bbb4",
    "https://artha.link/@eanxt/jobs/inside-sales-specialist-brio-technologies-hyderabad-19575c98",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-anblicks-hyderabad-aacb48a4",
    "https://artha.link/@eanxt/jobs/senior-scientific-officer-peoplefy-hyderabad-de4c2802",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-lead-data-architect-tezo-hyderabad-8e910767",
    "https://artha.link/@eanxt/jobs/senior-quality-engineer-ii-t500-29357-marriott-tech-hyderabad-057c9b82",
    "https://artha.link/@eanxt/jobs/accounts-receivable-specialist-keka-hr-hyderabad-cdbc4a83",
    "https://artha.link/@eanxt/jobs/sr-engineer-it-cybersecurity-identity-ansr-hyderabad-c0eecc5c",
    "https://artha.link/@eanxt/jobs/senior-data-scientist-marketing-mix-blend-hyderabad-2d5a9910",
    "https://artha.link/@eanxt/jobs/senior-engineering-manager-iam-t500-marriott-tech-hyderabad-2165f7f9",
    "https://artha.link/@eanxt/jobs/senior-ux-engineer-demandbase-hyderabad-a7df5f1d",
    "https://artha.link/@eanxt/jobs/vp-finance-transformation-cpg-genpact-hyderabad-c4c5fa30",
    "https://artha.link/@eanxt/jobs/senior-network-engineer-shi-solutions-india-hyderabad-18b6f217",
    "https://artha.link/@eanxt/jobs/experience-manager-intraedge-hyderabad-129a28ea",
    "https://artha.link/@eanxt/jobs/dean-school-of-business-woxsen-university-hyderabad-47f7b740",
    "https://artha.link/@eanxt/jobs/v-support-engineer-stackave-solutions-hyderabad-f12926c2",
    "https://artha.link/@eanxt/jobs/school-administrative-officer-dr-reddy-s-hyderabad-7cf76e61",
    "https://artha.link/@eanxt/jobs/technical-delivery-manager-valuelabs-hyderabad-d85985c7",
    "https://artha.link/@eanxt/jobs/data-engineer-persistent-systems-hyderabad-5435f048",
    "https://artha.link/@eanxt/jobs/database-administrator-htc-global-services-hyderabad-c07a250e",
    "https://artha.link/@eanxt/jobs/sr-data-scientist-with-snowflake-synapone-hyderabad-ed45b171",
    "https://artha.link/@eanxt/jobs/bid-customer-sales-support-zestiot-hyderabad-0c337a40",
    "https://artha.link/@eanxt/jobs/mainframe-mq-administrator-tata-consultancy-hyderabad-cee56ce8",
    "https://artha.link/@eanxt/jobs/account-manager-avance-consulting-hyderabad-4c9123df",
    "https://artha.link/@eanxt/jobs/chat-support-executive-artech-l-l-c-hyderabad-0f1d63ec",
    "https://artha.link/@eanxt/jobs/sap-finance-control-consultant-tata-consultancy-hyderabad-f60bb77d",
    "https://artha.link/@eanxt/jobs/business-development-manager-togglenow-hyderabad-9af1775d",
    "https://artha.link/@eanxt/jobs/senior-data-scientist-fireai-hyderabad-557de4a1",
    "https://artha.link/@eanxt/jobs/senior-director-business-development-primesoft-solutions-hyderabad-d3293758",
    "https://artha.link/@eanxt/jobs/senior-associate-data-analytics-grant-thornton-indus-hyderabad-2b930aef",
    "https://artha.link/@eanxt/jobs/vp-enterprise-sales-ai-planet-hyderabad-5035220b",
    "https://artha.link/@eanxt/jobs/senior-backend-engineer-typescript-kake-hyderabad-ee52969b",
    "https://artha.link/@eanxt/jobs/sap-pra-production-and-revenue-tata-consultancy-hyderabad-6ca5da0f",
    "https://artha.link/@eanxt/jobs/oracle-enterprise-resources-planning-htc-global-services-hyderabad-f20d968f",
    "https://artha.link/@eanxt/jobs/oracle-financial-functional-consultant-htc-global-services-hyderabad-743c4960",
    "https://artha.link/@eanxt/jobs/data-analyst-htc-global-services-hyderabad-f7aeace7",
    "https://artha.link/@eanxt/jobs/graphic-designer-animator-edvak-hyderabad-f633a163",
    "https://artha.link/@eanxt/jobs/qualys-guard-vulnerability-management-volto-consulting-hyderabad-7b60f644",
    "https://artha.link/@eanxt/jobs/bim-consultant-archi-arth-hyderabad-4f0610c1",
    "https://artha.link/@eanxt/jobs/walk-in-drive-in-tcs-hyderabad-19-sep-tata-consultancy-hyderabad-a9658253",
    "https://artha.link/@eanxt/jobs/senior-service-desk-engineer-evonsys-hyderabad-12ba7e87",
    "https://artha.link/@eanxt/jobs/key-account-sales-executive-aurolab-hyderabad-57b396b6",
    "https://artha.link/@eanxt/jobs/technical-support-engineer-ozonetel-onecxi-hyderabad-d9b83048",
    "https://artha.link/@eanxt/jobs/walk-in-drive-in-tcs-hyderabad-19-sep-tata-consultancy-hyderabad-483c1d05",
    "https://artha.link/@eanxt/jobs/senior-implementation-specialist-brightedge-hyderabad-49ed8491",
    "https://artha.link/@eanxt/jobs/back-end-developer-adb-safegate-hyderabad-ba6ffeab",
    "https://artha.link/@eanxt/jobs/lead-data-engineer-kanerika-inc-hyderabad-f9c1bd95",
    "https://artha.link/@eanxt/jobs/customer-support-executive-globalflex-hr-hyderabad-7c372f7a",
    "https://artha.link/@eanxt/jobs/director-database-platforms-managed-argano-hyderabad-a41fb610",
    "https://artha.link/@eanxt/jobs/technical-project-manager-valuemomentum-hyderabad-a7ef7d2d",
    "https://artha.link/@eanxt/jobs/lead-platform-stability-reliability-test-hcltech-hyderabad-04289bb1",
    "https://artha.link/@eanxt/jobs/quality-assurance-and-automation-haystek-technologies-hyderabad-16e89f36",
    "https://artha.link/@eanxt/jobs/relationship-manager-policybazaar-com-hyderabad-7deec620",
    "https://artha.link/@eanxt/jobs/3d-artist-animator-generalist-pc-games-amgo-games-private-hyderabad-e44c35a9",
    "https://artha.link/@eanxt/jobs/senior-technical-sales-engineer-nexa-global-infra-hyderabad-524a1164",
    "https://artha.link/@eanxt/jobs/enterprise-m-a-technology-integration-arcelormittal-hyderabad-493224ad",
    "https://artha.link/@eanxt/jobs/clinical-psychologist-lissun-hyderabad-76eb344c",
    "https://artha.link/@eanxt/jobs/field-sales-executive-mba-2026-indiamart-intermesh-hyderabad-315df30f",
    "https://artha.link/@eanxt/jobs/research-analyst-usa-staffing-lead-brezq-hyderabad-e9c91ed9",
    "https://artha.link/@eanxt/jobs/sap-sd-consultant-tata-consultancy-hyderabad-22d08a2a",
    "https://artha.link/@eanxt/jobs/copywriter-r-k-swamy-limited-hyderabad-03116129",
    "https://artha.link/@eanxt/jobs/account-manager-pharma-iqvia-hyderabad-4c464e70",
    "https://artha.link/@eanxt/jobs/oracle-scm-cloud-functional-consultant-datavail-hyderabad-6df7fe56",
    "https://artha.link/@eanxt/jobs/zonal-sales-manager-south-india-hr-yaar-hyderabad-a9b77db3",
    "https://artha.link/@eanxt/jobs/sap-re-fx-functional-consultant-insight-global-hyderabad-0258fb65",
    "https://artha.link/@eanxt/jobs/early-years-educator-ekam-early-learning-hyderabad-63a3d54e",
    "https://artha.link/@eanxt/jobs/technical-delivery-manager-banking-hcltech-hyderabad-98ae02fb",
    "https://artha.link/@eanxt/jobs/bd-marketplace-growth-lead-skinbae-india-hyderabad-6d526a1b",
    "https://artha.link/@eanxt/jobs/analyst-ensar-solutions-inc-hyderabad-72dc22fb",
    "https://artha.link/@eanxt/jobs/occupational-therapist-shaping-child-hyderabad-865fd53f",
    "https://artha.link/@eanxt/jobs/growth-gtm-associate-zumi-foods-hyderabad-5716914a",
    "https://artha.link/@eanxt/jobs/pediatric-physiotherapist-shaping-child-hyderabad-59b6e5d1",
    "https://artha.link/@eanxt/jobs/sap-btp-abap-consultant-vueverse-hyderabad-6fb0f091",
    "https://artha.link/@eanxt/jobs/oracle-fusion-payroll-functional-vueverse-hyderabad-99a9efc5",
    "https://artha.link/@eanxt/jobs/digital-transformation-consultant-campx-hyderabad-02d54f17",
    "https://artha.link/@eanxt/jobs/team-member-strategic-sourcing-aurigene-hyderabad-829b7400",
    "https://artha.link/@eanxt/jobs/snowflake-administrator-bpmlinks-hyderabad-58907bde",
    "https://artha.link/@eanxt/jobs/assistant-deputy-manager-corporate-mahindra-university-hyderabad-bef1ec4a",
    "https://artha.link/@eanxt/jobs/inside-sales-executive-algonox-technologies-hyderabad-a096ee2a",
    "https://artha.link/@eanxt/jobs/school-principal-the-leap-school-hyderabad-61e6325c",
    "https://artha.link/@eanxt/jobs/sales-technical-lead-symco-techno-hyderabad-065b19e7",
    "https://artha.link/@eanxt/jobs/accounts-payable-specialist-keka-hr-hyderabad-f5440265",
    "https://artha.link/@eanxt/jobs/msd-power-platform-tata-consultancy-hyderabad-5cb674fd",
    "https://artha.link/@eanxt/jobs/oracle-ppm-oracle-project-portfolio-tata-consultancy-hyderabad-12e19a0f",
    "https://artha.link/@eanxt/jobs/associate-tp-hyderabad-18bbd867",
    "https://artha.link/@eanxt/jobs/manager-global-restaurant-design-t500-mcdonald-s-global-hyderabad-beaf30b2",
    "https://artha.link/@eanxt/jobs/lead-generation-qualification-executive-focus-softnet-hyderabad-44936d08",
    "https://artha.link/@eanxt/jobs/business-development-executive-it-sharpatoms-hyderabad-fee6e2fe",
    "https://artha.link/@eanxt/jobs/associate-finance-accounting-operations-cherry-bekaert-hyderabad-2bb28df5",
    "https://artha.link/@eanxt/jobs/director-of-operations-insight-global-hyderabad-579b2417",
    "https://artha.link/@eanxt/jobs/msp-program-coordinator-workspend-inc-hyderabad-0a0571eb",
    "https://artha.link/@eanxt/jobs/oracle-10g-ecm-enterprise-content-tata-consultancy-hyderabad-a29e1031",
    "https://artha.link/@eanxt/jobs/sales-manager-chattels-design-hyderabad-4c0f4f99",
    "https://artha.link/@eanxt/jobs/software-technical-lead-constelli-hyderabad-6dd976f4",
    "https://artha.link/@eanxt/jobs/senior-sap-abap-fiori-consultant-selecci-n-consulting-hyderabad-3a8346fc",
    "https://artha.link/@eanxt/jobs/digital-solution-designer-divami-hyderabad-ab61ed86",
    "https://artha.link/@eanxt/jobs/internal-auditor-hartree-partners-hyderabad-daf1ec6a",
    "https://artha.link/@eanxt/jobs/sap-ppqm-consultant-neovatic-hyderabad-0fd64fab",
    "https://artha.link/@eanxt/jobs/sap-co-consultant-neovatic-hyderabad-4da3034c",
    "https://artha.link/@eanxt/jobs/sales-manager-dynapix-digital-hyderabad-08aa2a13",
    "https://artha.link/@eanxt/jobs/walk-in-drive-on-19th-sept-help-desk-movate-hyderabad-c8db7345",
    "https://artha.link/@eanxt/jobs/informatica-developer-tata-consultancy-hyderabad-8135e7ee",
    "https://artha.link/@eanxt/jobs/technical-program-manager-trianz-hyderabad-6eede2c3",
    "https://artha.link/@eanxt/jobs/sas-developer-infosys-hyderabad-d10f22e2",
    "https://artha.link/@eanxt/jobs/abm-outbound-manager-smartwinnr-hyderabad-b7fc6a2c",
    "https://artha.link/@eanxt/jobs/functional-consultant-tata-consultancy-hyderabad-5912c3a6",
    "https://artha.link/@eanxt/jobs/senior-backend-engineer-python-shimentox-hyderabad-c364a30a",
    "https://artha.link/@eanxt/jobs/back-end-developer-constelli-hyderabad-a0cce4f7",
    "https://artha.link/@eanxt/jobs/casa-indexing-processor-t500-29401-cibc-india-hyderabad-45beb612",
    "https://artha.link/@eanxt/jobs/speech-language-pathologist-lissun-hyderabad-3fc969b1",
    "https://artha.link/@eanxt/jobs/project-manager-adecco-hyderabad-34b08acc",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-tint-tone-shade-hyderabad-af1f329f",
    "https://artha.link/@eanxt/jobs/manager-central-reconciliations-cmo-tlm-cibc-india-hyderabad-749ae576",
    "https://artha.link/@eanxt/jobs/project-manager-flow-interio-hyderabad-8730fc75",
    "https://artha.link/@eanxt/jobs/interior-designer-flow-interio-hyderabad-71ff372b",
    "https://artha.link/@eanxt/jobs/senior-sales-manager-flow-interio-hyderabad-d9111bc2",
    "https://artha.link/@eanxt/jobs/french-and-spanish-teacher-northfield-hyderabad-3b456cf0",
    "https://artha.link/@eanxt/jobs/data-engineer-htc-global-services-hyderabad-3827098a",
    "https://artha.link/@eanxt/jobs/engineer-it-data-t500-29412-ansr-hyderabad-fc7432c7",
    "https://artha.link/@eanxt/jobs/dbt-admin-nexify-infosystems-hyderabad-aecd359e",
    "https://artha.link/@eanxt/jobs/enterprise-application-architect-leap-metrics-hyderabad-d2117972",
    "https://artha.link/@eanxt/jobs/design-engineer-puzzolana-india-hyderabad-1f76cc1e",
    "https://artha.link/@eanxt/jobs/business-development-executive-fresher-algonox-technologies-hyderabad-c1512252",
    "https://artha.link/@eanxt/jobs/senior-azure-administrator-tata-consultancy-hyderabad-4ea8e472",
    "https://artha.link/@eanxt/jobs/sccm-admin-sr-stefanini-north-hyderabad-d55fe7df",
    "https://artha.link/@eanxt/jobs/associate-vice-president-enterprise-deutsche-b-rse-group-hyderabad-e177861d",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-flow-interio-hyderabad-54891c32",
    "https://artha.link/@eanxt/jobs/chartered-accountant-isprout-managed-hyderabad-f4ee51a8",
    "https://artha.link/@eanxt/jobs/content-video-creator-freelance-runo-hyderabad-b8ae6ebc",
    "https://artha.link/@eanxt/jobs/sales-manager-isprout-managed-hyderabad-d13e2e5a",
    "https://artha.link/@eanxt/jobs/azure-data-engineer-scalable-systems-datavruti-hyderabad-287e03a7",
    "https://artha.link/@eanxt/jobs/design-coordinator-protonlogics-it-hyderabad-d0c0d437",
    "https://artha.link/@eanxt/jobs/application-support-analyst-lorhan-it-hyderabad-bb381009",
    "https://artha.link/@eanxt/jobs/customer-success-analyst-insightsoftware-hyderabad-1d71c4c5",
    "https://artha.link/@eanxt/jobs/vice-principal-northfield-hyderabad-413d020f",
    "https://artha.link/@eanxt/jobs/project-manager-kaprel-hyderabad-d947aef3",
    "https://artha.link/@eanxt/jobs/netsuite-functional-buxton-consulting-hyderabad-6290fc48",
    "https://artha.link/@eanxt/jobs/resource-management-specialist-jade-global-hyderabad-5096f45d",
    "https://artha.link/@eanxt/jobs/key-account-sales-manager-feemonk-hyderabad-d29a9b2a",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-unitile-hyderabad-8364a0cc",
    "https://artha.link/@eanxt/jobs/power-bi-tech-mahindra-hyderabad-617952d9",
    "https://artha.link/@eanxt/jobs/assistant-sales-manager-lorhan-it-hyderabad-9c25d3cb",
    "https://artha.link/@eanxt/jobs/oracle-ebs-apps-dba-buxton-consulting-hyderabad-3000373a",
    "https://artha.link/@eanxt/jobs/msp-admin-program-operations-specialist-randstad-enterprise-hyderabad-d6223b2f",
    "https://artha.link/@eanxt/jobs/service-delivery-coordinator-with-eidiko-systems-hyderabad-fe628bd1",
    "https://artha.link/@eanxt/jobs/support-engineer-euc-persistent-systems-hyderabad-95835807",
    "https://artha.link/@eanxt/jobs/audit-senior-commercial-hospitality-sentient-an-ascend-hyderabad-2fdfe41b",
    "https://artha.link/@eanxt/jobs/sr-social-media-manager-digital-mojo-hyderabad-c402fa95",
    "https://artha.link/@eanxt/jobs/cost-accountant-plant-radha-tmt-hyderabad-c84719dd",
    "https://artha.link/@eanxt/jobs/audit-senior-banking-credit-union-sentient-an-ascend-hyderabad-f7b212f1",
    "https://artha.link/@eanxt/jobs/oracle-fusion-finance-functional-persistent-systems-hyderabad-3c152956",
    "https://artha.link/@eanxt/jobs/tech-lead-lead-data-engineer-the-ksquare-group-hyderabad-f1df18f0",
    "https://artha.link/@eanxt/jobs/financial-controller-power-sector-radha-tmt-hyderabad-b5e50f67",
    "https://artha.link/@eanxt/jobs/technical-architect-hcltech-hyderabad-44b04c75",
    "https://artha.link/@eanxt/jobs/oracle-fusion-scm-functional-consultant-persistent-systems-hyderabad-c6b1e6fb",
    "https://artha.link/@eanxt/jobs/audit-senior-commercial-audit-citrin-cooperman-hyderabad-ceef2c87",
    "https://artha.link/@eanxt/jobs/senior-sales-executive-api-tofflon-india-pvt-hyderabad-23d5309f",
    "https://artha.link/@eanxt/jobs/consultant-salesforce-development-t500-cibc-india-hyderabad-a91e3914",
    "https://artha.link/@eanxt/jobs/service-engineer-filling-machines-tofflon-india-pvt-hyderabad-daf9adb3",
    "https://artha.link/@eanxt/jobs/sr-analyst-it-service-management-t500-ansr-hyderabad-f06bf92f",
    "https://artha.link/@eanxt/jobs/associate-staff-digital-identity-talent500-hyderabad-648ea149",
    "https://artha.link/@eanxt/jobs/interior-designer-bonito-designs-hyderabad-ce601724",
    "https://artha.link/@eanxt/jobs/demand-generation-manager-b2b-sales-runo-hyderabad-3b3f1c5c",
    "https://artha.link/@eanxt/jobs/oracle-fusion-functional-oracle-fusion-coforge-hyderabad-a5798932",
    "https://artha.link/@eanxt/jobs/gis-front-end-developer-tata-consultancy-hyderabad-b4f72f35",
    "https://artha.link/@eanxt/jobs/sales-manager-sampangi-group-hyderabad-4857a6b8",
    "https://artha.link/@eanxt/jobs/lead-market-access-policy-advocacy-biological-e-limited-hyderabad-a79d530f",
    "https://artha.link/@eanxt/jobs/honorary-nonprofit-leadership-ken-foundation-hyderabad-3cd56039",
    "https://artha.link/@eanxt/jobs/sap-fica-isu-consultant-techify-consulting-hyderabad-121120eb",
    "https://artha.link/@eanxt/jobs/manager-assurance-mska-associates-hyderabad-47758048",
    "https://artha.link/@eanxt/jobs/relationship-manager-policybazaar-com-hyderabad-63d8d605",
    "https://artha.link/@eanxt/jobs/seo-specialist-104017-mycareernet-hyderabad-0725cc43",
    "https://artha.link/@eanxt/jobs/head-of-sox-testing-wise-hyderabad-c507499d",
    "https://artha.link/@eanxt/jobs/sr-google-ads-specialist-onsite-digital-mojo-hyderabad-c9e237c7",
    "https://artha.link/@eanxt/jobs/adobe-enterprise-architect-credera-hyderabad-0aa77440",
    "https://artha.link/@eanxt/jobs/special-educator-cognitivebotics-hyderabad-fdb4d92c",
    "https://artha.link/@eanxt/jobs/associate-indirect-tax-lakshmikumaran-and-hyderabad-192e0d5d",
    "https://artha.link/@eanxt/jobs/field-service-engineer-aurolab-hyderabad-3610a018",
    "https://artha.link/@eanxt/jobs/information-technology-support-engineer-imaging-endpoints-hyderabad-6ede5ebe",
    "https://artha.link/@eanxt/jobs/executive-organic-certification-field-sresta-natural-hyderabad-3a67403a",
    "https://artha.link/@eanxt/jobs/oracle-ebs-scm-functional-consultant-erptree-consulting-hyderabad-dc932f97",
    "https://artha.link/@eanxt/jobs/kinaxis-12-yrs-pan-india-client-of-neerinfo-hyderabad-7bfc0b4b",
    "https://artha.link/@eanxt/jobs/enterprise-sales-regional-director-adecco-hyderabad-c22056d1",
    "https://artha.link/@eanxt/jobs/senior-sap-security-analyst-t500-29482-visy-hyderabad-dfc439c5",
    "https://artha.link/@eanxt/jobs/assistant-manager-assurance-mska-associates-hyderabad-37697ca6",
    "https://artha.link/@eanxt/jobs/associate-senior-business-process-deutsche-b-rse-group-hyderabad-2fcb522c",
    "https://artha.link/@eanxt/jobs/executive-assistant-to-gcs-directors-fedex-gcs-hyderabad-dd6e831e",
    "https://artha.link/@eanxt/jobs/registrar-obstetrics-and-gynaecology-continental-hyderabad-2c5378f9",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-hyderabad-design-cafe-hyderabad-7d6b8c5f",
    "https://artha.link/@eanxt/jobs/senior-engineer-it-software-java-t500-ansr-hyderabad-47632d4a",
    "https://artha.link/@eanxt/jobs/sccm-administrator-l3-stefanini-north-hyderabad-7a4f155a",
    "https://artha.link/@eanxt/jobs/financial-controller-confidential-jobs-hyderabad-1021851c",
    "https://artha.link/@eanxt/jobs/business-development-executive-us-market-clientcurve-hyderabad-3c9a88bc",
    "https://artha.link/@eanxt/jobs/business-intelligence-analyst-97046-mycareernet-hyderabad-e3937fec",
    "https://artha.link/@eanxt/jobs/gww-consultant-confidential-hyderabad-69926b04",
    "https://artha.link/@eanxt/jobs/aws-enterprise-architect-credera-hyderabad-2a66b6e1",
    "https://artha.link/@eanxt/jobs/data-center-project-manager-network-starenterprises-hyderabad-24291807",
    "https://artha.link/@eanxt/jobs/gcp-data-engineer-tata-consultancy-hyderabad-788658c9",
    "https://artha.link/@eanxt/jobs/chat-support-artech-l-l-c-hyderabad-8b8b1eb7",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-meansquare-ai-hyderabad-1b2a7623",
    "https://artha.link/@eanxt/jobs/business-development-executive-zolo-hyderabad-363a060d",
    "https://artha.link/@eanxt/jobs/sap-sd-consultant-tata-consultancy-hyderabad-d4e57c2d",
    "https://artha.link/@eanxt/jobs/product-security-specialist-allegis-group-hyderabad-e169638e",
    "https://artha.link/@eanxt/jobs/assistant-general-manager-expansion-upgrad-hyderabad-199b669a",
    "https://artha.link/@eanxt/jobs/assistant-manager-snacks-third-party-ccl-products-india-hyderabad-510543c1",
    "https://artha.link/@eanxt/jobs/guidewire-policy-centre-lead-valuemomentum-hyderabad-ebce66e5",
    "https://artha.link/@eanxt/jobs/hardware-test-engineer-adb-safegate-hyderabad-64031bab",
    "https://artha.link/@eanxt/jobs/guidewire-technical-lead-valuemomentum-hyderabad-40bac80b",
    "https://artha.link/@eanxt/jobs/enterprise-data-architect-everestdx-inc-hyderabad-e3f087b3",
    "https://artha.link/@eanxt/jobs/sap-functional-architect-greathr-solutions-hyderabad-aa67d29b",
    "https://artha.link/@eanxt/jobs/graphic-designer-waferwire-cloud-hyderabad-57a9ef4e",
    "https://artha.link/@eanxt/jobs/assistant-manager-international-voice-marketstar-hyderabad-f6877c66",
    "https://artha.link/@eanxt/jobs/area-sales-manager-feemonk-hyderabad-a759050a",
    "https://artha.link/@eanxt/jobs/product-sales-manager-aegisvision-hyderabad-133d2c25",
    "https://artha.link/@eanxt/jobs/oracle-ebs-technical-consultant-eappsys-hyderabad-00e46303",
    "https://artha.link/@eanxt/jobs/accountant-rainier-softech-hyderabad-62d91e4d",
    "https://artha.link/@eanxt/jobs/sap-ewm-consultant-volto-consulting-hyderabad-70159853",
    "https://artha.link/@eanxt/jobs/salesforce-administrator-teceze-hyderabad-3a709291",
    "https://artha.link/@eanxt/jobs/senior-proposal-writer-radiant-systems-inc-hyderabad-d50f24a6",
    "https://artha.link/@eanxt/jobs/anti-money-laundering-analyst-htc-global-services-hyderabad-394bfdb5",
    "https://artha.link/@eanxt/jobs/sde-data-engineer-magneton-hyderabad-17422365",
    "https://artha.link/@eanxt/jobs/ea-to-the-deputy-director-pallavi-hyderabad-24f8b585",
    "https://artha.link/@eanxt/jobs/zonal-manager-policybazaar-com-hyderabad-3f0c5d20",
    "https://artha.link/@eanxt/jobs/contact-center-rightfax-quess-corp-limited-hyderabad-9b3be7a6",
    "https://artha.link/@eanxt/jobs/principal-genai-engineer-backend-savitr-software-hyderabad-fed8f12b",
    "https://artha.link/@eanxt/jobs/apparel-designer-talent-corner-hr-hyderabad-22a30e6d",
    "https://artha.link/@eanxt/jobs/java-backend-developer-virtusa-hyderabad-1307c1ed",
    "https://artha.link/@eanxt/jobs/lead-backend-engineer-golang-product-oolio-hyderabad-54f25fad",
    "https://artha.link/@eanxt/jobs/territory-sales-manager-waasle-laundry-hyderabad-ee410f5f",
    "https://artha.link/@eanxt/jobs/vdi-infrastructure-engineer-hyderabad-world-wide-hyderabad-df1a3267",
    "https://artha.link/@eanxt/jobs/production-support-analyst-saap-technologies-hyderabad-4833b535",
    "https://artha.link/@eanxt/jobs/accounts-payable-specialist-thinkwise-hyderabad-d051df22",
    "https://artha.link/@eanxt/jobs/workday-security-integration-functional-brillius-hyderabad-207f0e37",
    "https://artha.link/@eanxt/jobs/business-development-manager-trusity-hyderabad-04de20d0",
    "https://artha.link/@eanxt/jobs/java-backend-developer-techdoquest-hyderabad-fcc21619",
    "https://artha.link/@eanxt/jobs/sales-executive-joify-hyderabad-c3044986",
    "https://artha.link/@eanxt/jobs/service-delivery-leader-f-a-genpact-hyderabad-ba28414f",
    "https://artha.link/@eanxt/jobs/financial-controller-corenza-hyderabad-d9b65e42",
    "https://artha.link/@eanxt/jobs/sap-basis-hana-btp-tata-consultancy-hyderabad-0bc278fb",
    "https://artha.link/@eanxt/jobs/sap-finance-control-consultant-insight-global-hyderabad-de0b828c",
    "https://artha.link/@eanxt/jobs/sql-developer-viaplus-hyderabad-60015f39",
    "https://artha.link/@eanxt/jobs/network-engineer-ii-t500-29546-mcdonald-s-global-hyderabad-d9bbe9f7",
    "https://artha.link/@eanxt/jobs/quality-engineer-web-service-testing-cibc-india-hyderabad-82ee73a8",
    "https://artha.link/@eanxt/jobs/management-trainee-ca-freshers-genpact-hyderabad-f959ea42",
    "https://artha.link/@eanxt/jobs/director-public-insurance-registry-cxo-10xtd-hyderabad-223a48ba",
    "https://artha.link/@eanxt/jobs/area-sales-manager-pacific-bearing-hyderabad-79ae0d60",
    "https://artha.link/@eanxt/jobs/lead-security-engineer-aws-cloud-edvak-ehr-hyderabad-cf60ff40",
    "https://artha.link/@eanxt/jobs/sales-manager-ice-cream-heritage-foods-ltd-hyderabad-06931078",
    "https://artha.link/@eanxt/jobs/record-to-report-management-trainee-genpact-hyderabad-e69d5f46",
    "https://artha.link/@eanxt/jobs/director-of-business-development-life-acl-digital-hyderabad-53d6fb23",
    "https://artha.link/@eanxt/jobs/quality-assurance-automation-engineer-denken-solutions-inc-hyderabad-cd025c62",
    "https://artha.link/@eanxt/jobs/data-scientist-5-8-years-8-years-quantum-integrators-hyderabad-be1d78fc",
    "https://artha.link/@eanxt/jobs/us-hr-operations-executive-us-it-clicksoft-solutions-hyderabad-94d55ece",
    "https://artha.link/@eanxt/jobs/sales-account-manager-clicksoft-solutions-hyderabad-aa24c49f",
    "https://artha.link/@eanxt/jobs/senior-medical-coder-ip-drg-doctus-data-hyderabad-0d83872f",
    "https://artha.link/@eanxt/jobs/azure-data-engineer-prophecy-hyderabad-3e95cf02",
    "https://artha.link/@eanxt/jobs/customer-support-specialist-live-connections-hyderabad-af359386",
    "https://artha.link/@eanxt/jobs/video-motion-graphics-designer-artech-l-l-c-hyderabad-10d0af10",
    "https://artha.link/@eanxt/jobs/data-engineer-valuemomentum-hyderabad-6e7b3c07",
    "https://artha.link/@eanxt/jobs/game-developer-zen-technologies-hyderabad-5f6affde",
    "https://artha.link/@eanxt/jobs/wfm-project-manager-adp-hyderabad-ecee531c",
    "https://artha.link/@eanxt/jobs/consultant-change-and-transformation-chryselys-hyderabad-4b3c550a",
    "https://artha.link/@eanxt/jobs/oracle-hcm-cloud-techno-functional-tata-consultancy-hyderabad-1d3f4c74",
    "https://artha.link/@eanxt/jobs/senior-systems-analyst-full-stack-net-eastman-hyderabad-d8c34151",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-cybersecurity-arise-techglobal-hyderabad-3a2a9fc4",
    "https://artha.link/@eanxt/jobs/siebel-product-configuration-specialist-tata-consultancy-hyderabad-ebf35e83",
    "https://artha.link/@eanxt/jobs/seo-geo-content-writer-beetexting-hyderabad-c67d6204",
    "https://artha.link/@eanxt/jobs/web-developement-manager-highradius-hyderabad-1ad82a65",
    "https://artha.link/@eanxt/jobs/sap-ariba-consultant-in2it-enterprise-hyderabad-3d85ca9a",
    "https://artha.link/@eanxt/jobs/senior-product-engineer-mondee-hyderabad-15ae0127",
    "https://artha.link/@eanxt/jobs/sap-eam-iam-intelligent-asset-mycareernet-hyderabad-3f008c72",
    "https://artha.link/@eanxt/jobs/area-sales-manager-pet-food-fmcg-client-of-talent-hyderabad-293aebab",
    "https://artha.link/@eanxt/jobs/data-analyst-smartwinnr-hyderabad-cb315c25",
    "https://artha.link/@eanxt/jobs/senior-manager-business-development-neorecruit-hyderabad-1c0e5f06",
    "https://artha.link/@eanxt/jobs/global-payments-operations-undisclosed-hyderabad-a40b7837",
    "https://artha.link/@eanxt/jobs/ai-video-generation-million-dreams-hyderabad-c40526f4",
    "https://artha.link/@eanxt/jobs/sales-manager-excipient-sinobright-hyderabad-6f4c50eb",
    "https://artha.link/@eanxt/jobs/network-automation-engineer-hcltech-hyderabad-9bb3194a",
    "https://artha.link/@eanxt/jobs/manager-operations-gokhana-hyderabad-ade7026f",
    "https://artha.link/@eanxt/jobs/data-engineer-data-bricks-valuemomentum-hyderabad-a353f0de",
    "https://artha.link/@eanxt/jobs/senior-manager-corporate-travel-ntt-data-business-hyderabad-de1aaf15",
    "https://artha.link/@eanxt/jobs/inside-sales-executive-us-region-evoke-technologies-hyderabad-dbfe46ec",
    "https://artha.link/@eanxt/jobs/microsoft-dynamics-365-erp-technical-neerinfo-solutions-hyderabad-a4994c7b",
    "https://artha.link/@eanxt/jobs/jr-manager-assistant-manager-msn-laboratories-hyderabad-6b8dec5b",
    "https://artha.link/@eanxt/jobs/sr-technical-analyst-non-prod-packing-cibc-india-hyderabad-5cd30b6f",
    "https://artha.link/@eanxt/jobs/principal-engineer-architect-tek-ninjas-hyderabad-1ddeffe1",
    "https://artha.link/@eanxt/jobs/order-management-analyst-brillio-hyderabad-a4618420",
    "https://artha.link/@eanxt/jobs/sap-product-costing-innorev-hyderabad-d8118267",
    "https://artha.link/@eanxt/jobs/oracle-pl-sql-developer-ingrain-systems-inc-hyderabad-16bdb7ae",
    "https://artha.link/@eanxt/jobs/default-operations-live-connections-hyderabad-437a6bea",
    "https://artha.link/@eanxt/jobs/clinical-sas-programmer-tata-consultancy-hyderabad-e6fc1357",
    "https://artha.link/@eanxt/jobs/sales-development-representative-track3d-hyderabad-85d6ffa1",
    "https://artha.link/@eanxt/jobs/technical-analyst-application-packaging-cibc-india-hyderabad-eb67c777",
    "https://artha.link/@eanxt/jobs/design-engineer-material-compliance-novintix-hyderabad-91e5d24a",
    "https://artha.link/@eanxt/jobs/technical-analyst-vulnerability-cibc-india-hyderabad-3165b2af",
    "https://artha.link/@eanxt/jobs/netezza-dba-omegahires-hyderabad-3eb8bbc9",
    "https://artha.link/@eanxt/jobs/product-consultant-caliber-technologies-hyderabad-fb777fdf",
    "https://artha.link/@eanxt/jobs/auth0-customer-identity-specialist-thoughtfocus-hyderabad-8a048405",
    "https://artha.link/@eanxt/jobs/director-servicenow-consultant-the-edge-hyderabad-4055130e",
    "https://artha.link/@eanxt/jobs/collections-specialist-adp-hyderabad-7c830f5c",
    "https://artha.link/@eanxt/jobs/sap-fico-consultant-ntt-data-business-hyderabad-030dc522",
    "https://artha.link/@eanxt/jobs/head-of-sales-and-business-development-radiant-systems-inc-hyderabad-fd533e27",
    "https://artha.link/@eanxt/jobs/soc-front-end-design-signoff-engineer-amlogic-inc-hyderabad-397b5dbd",
    "https://artha.link/@eanxt/jobs/executive-operations-smartq-hyderabad-611fa018",
    "https://artha.link/@eanxt/jobs/technical-analyst-application-packaging-cibc-india-hyderabad-c6d60c95",
    "https://artha.link/@eanxt/jobs/technical-engagement-lead-saras-analytics-hyderabad-20a2cb85",
    "https://artha.link/@eanxt/jobs/data-engineer-ascendion-hyderabad-7b983f7b",
    "https://artha.link/@eanxt/jobs/senior-associate-lead-sap-s-4-hana-deutsche-b-rse-group-hyderabad-78142ab0",
    "https://artha.link/@eanxt/jobs/customer-success-coordination-manager-guidant-global-hyderabad-cf544880",
    "https://artha.link/@eanxt/jobs/processor-operations-management-officer-cibc-india-hyderabad-b46a0156",
    "https://artha.link/@eanxt/jobs/processor-operations-management-officer-cibc-india-hyderabad-9cf9acb8",
    "https://artha.link/@eanxt/jobs/robotics-engineer-tata-consultancy-hyderabad-9f7ebfd1",
    "https://artha.link/@eanxt/jobs/frontend-developer-graystone-capital-hyderabad-4e2dfbba",
    "https://artha.link/@eanxt/jobs/corporate-sales-executive-zolo-hyderabad-1b153853",
    "https://artha.link/@eanxt/jobs/administrative-officer-on-contract-t-m-services-hyderabad-00348dee",
    "https://artha.link/@eanxt/jobs/technical-project-manager-with-ai-synergy-technologies-hyderabad-f1f7ab64",
    "https://artha.link/@eanxt/jobs/clinical-research-associate-freshers-clinogenesis-hyderabad-96fdff20",
    "https://artha.link/@eanxt/jobs/data-engineering-lead-the-heineken-company-hyderabad-712432ec",
    "https://artha.link/@eanxt/jobs/data-engineer-the-heineken-company-hyderabad-5a6ca60b",
    "https://artha.link/@eanxt/jobs/senior-data-quality-engineer-yulu-hyderabad-9603926b",
    "https://artha.link/@eanxt/jobs/network-administrator-palo-alto-tata-consultancy-hyderabad-b230763a",
    "https://artha.link/@eanxt/jobs/corporate-sales-manager-cityinfo-services-hyderabad-ff424d7b",
    "https://artha.link/@eanxt/jobs/technical-project-manager-sky-systems-inc-hyderabad-6c04cba7",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-truww-hyderabad-49109620",
    "https://artha.link/@eanxt/jobs/team-lead-paid-search-mediamint-hyderabad-26ad121a",
    "https://artha.link/@eanxt/jobs/business-manager-upman-placements-hyderabad-36ed6e39",
    "https://artha.link/@eanxt/jobs/automation-engineer-sky-systems-inc-hyderabad-1aac4a02",
    "https://artha.link/@eanxt/jobs/senior-business-manager-hyderabad-makemytrip-hyderabad-e4c19787",
    "https://artha.link/@eanxt/jobs/virtual-medical-assistant-eureka-infotech-inc-hyderabad-a364ed14",
    "https://artha.link/@eanxt/jobs/senior-delivery-manager-hcm-platform-darwinbox-hyderabad-88fcbdfc",
    "https://artha.link/@eanxt/jobs/data-governance-lead-microsoft-purview-rbst-consulting-hyderabad-c1c82086",
    "https://artha.link/@eanxt/jobs/executive-assistant-darwinbox-hyderabad-26793988",
    "https://artha.link/@eanxt/jobs/etl-data-engineer-zone-it-solutions-hyderabad-5d0937d6",
    "https://artha.link/@eanxt/jobs/oracle-jde-finance-functional-consultant-steps-talent-hyderabad-b8927396",
    "https://artha.link/@eanxt/jobs/engineer-it-service-management-itom-ansr-hyderabad-8076f76e",
    "https://artha.link/@eanxt/jobs/data-scientist-teksystems-global-hyderabad-240c97f4",
    "https://artha.link/@eanxt/jobs/oracle-fusion-ppm-functional-consultant-erptree-consulting-hyderabad-1cdd7366",
    "https://artha.link/@eanxt/jobs/lead-application-support-specialist-talent500-hyderabad-9bd2402e",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-t500-29640-cibc-india-hyderabad-087d214a",
    "https://artha.link/@eanxt/jobs/strategy-business-operations-ridhira-group-hyderabad-c6f07674",
    "https://artha.link/@eanxt/jobs/senior-technical-writer-sre-devops-t500-marriott-tech-hyderabad-8883f1ed",
    "https://artha.link/@eanxt/jobs/senior-it-service-support-delivery-talent500-hyderabad-807b6f8c",
    "https://artha.link/@eanxt/jobs/accounts-executive-ridhira-group-hyderabad-91f161b2",
    "https://artha.link/@eanxt/jobs/lead-data-analyst-gtm-aptita-hyderabad-496a5094",
    "https://artha.link/@eanxt/jobs/bds-telemedicine-nextenti-tech-hyderabad-68d0f800",
    "https://artha.link/@eanxt/jobs/senior-manager-t500-29646-guidant-global-hyderabad-32bea066",
    "https://artha.link/@eanxt/jobs/head-of-business-development-colaberry-hyderabad-6f10e372",
    "https://artha.link/@eanxt/jobs/service-engineer-ezone-security-hyderabad-ca05080f",
    "https://artha.link/@eanxt/jobs/data-engineering-t500-29647-cibc-india-hyderabad-66931f30",
    "https://artha.link/@eanxt/jobs/business-development-executive-us-it-pragma-edge-inc-hyderabad-37d3c518",
    "https://artha.link/@eanxt/jobs/db2-database-support-engineer-pragma-edge-inc-hyderabad-10d9edff",
    "https://artha.link/@eanxt/jobs/senior-etl-developer-htc-global-services-hyderabad-2389fb91",
    "https://artha.link/@eanxt/jobs/production-support-ibm-sterling-b2b-radiant-digital-hyderabad-3ef6e48b",
    "https://artha.link/@eanxt/jobs/back-end-developer-people-tech-group-hyderabad-f65f23e1",
    "https://artha.link/@eanxt/jobs/statistical-programmer-tata-consultancy-hyderabad-4bdc9e81",
    "https://artha.link/@eanxt/jobs/senior-database-administrator-paltech-hyderabad-9c3c76fa",
    "https://artha.link/@eanxt/jobs/senior-oracle-apps-dba-infolob-hyderabad-a2d5bdd9",
    "https://artha.link/@eanxt/jobs/senior-automation-engineer-qualizeal-hyderabad-948e64da",
    "https://artha.link/@eanxt/jobs/financial-planning-and-analysis-saras-analytics-hyderabad-50d62026",
    "https://artha.link/@eanxt/jobs/sap-fscm-i2d-consulting-hyderabad-2d9ee6f2",
    "https://artha.link/@eanxt/jobs/ptc-territory-account-manager-softcell-hyderabad-96feaa75",
    "https://artha.link/@eanxt/jobs/back-end-developer-net-tekit-software-hyderabad-b1b18542",
    "https://artha.link/@eanxt/jobs/head-pre-primary-alliance-hyderabad-e8e95479",
    "https://artha.link/@eanxt/jobs/z-os-unix-zlinux-integration-engineer-oak-tree-software-hyderabad-ff324819",
    "https://artha.link/@eanxt/jobs/sales-operations-services-portfolio-mediamint-hyderabad-6b972be0",
    "https://artha.link/@eanxt/jobs/aws-databrics-adf-pyspark-python-tata-consultancy-hyderabad-5df8cb27",
    "https://artha.link/@eanxt/jobs/sales-executive-bengaluru-peenya-essentra-bengaluru-7bfc97c8",
    "https://artha.link/@eanxt/jobs/technical-support-engineer-chennai-kinco-automation-greater-4b64639b",
    "https://artha.link/@eanxt/jobs/senior-product-manager-hospitality-cvent-bengaluru-fc8a7a2d",
    "https://artha.link/@eanxt/jobs/business-development-executive-essentra-bengaluru-63c7f56e",
    "https://artha.link/@eanxt/jobs/freelance-interior-designers-bengaluru-design-cafe-bengaluru-6fb3362e",
    "https://artha.link/@eanxt/jobs/creative-producer-4-yrs-media-company-metamorph-bengaluru-b5e99cc1",
    "https://artha.link/@eanxt/jobs/zonal-sales-manager-building-material-sales-gallop-bengaluru-3b06e4af",
    "https://artha.link/@eanxt/jobs/senior-oracle-cloud-payroll-techno-erptree-consulting-bengaluru-284d504e",
    "https://artha.link/@eanxt/jobs/sales-executive-hindi-speaker-bengaluru-scg-bengaluru-632af31c",
    "https://artha.link/@eanxt/jobs/dlp-symantec-bengaluru-walkin-drive-on-tata-consultancy-bengaluru-e2193a48",
    "https://artha.link/@eanxt/jobs/trainee-technical-writer-0-to-2-years-aleido-india-bengaluru-c5ba3695",
    "https://artha.link/@eanxt/jobs/legal-executive-legal-assistant-to-kmb-group-bengaluru-7fcf2d14",
    "https://artha.link/@eanxt/jobs/sap-datasphere-sap-analytics-cloud-sac-ust-bengaluru-91adec1f",
    "https://artha.link/@eanxt/jobs/enterprise-patching-governance-advisor-world-wide-bengaluru-58f593be",
    "https://artha.link/@eanxt/jobs/design-architect-in-bangalore-atelier-astil-bengaluru-109016fd",
    "https://artha.link/@eanxt/jobs/customer-support-executive-freshers-openhire-bengaluru-3d70e615",
    "https://artha.link/@eanxt/jobs/customer-service-representative-alorica-bengaluru-8ceacc54",
    "https://artha.link/@eanxt/jobs/relationship-manager-policybazaar-com-chennai-6a4e7c8e",
    "https://artha.link/@eanxt/jobs/manager-my-own-service-bengaluru-0ca65c2f",
    "https://artha.link/@eanxt/jobs/interior-designer-nivexa-spaces-bengaluru-3b7f8bf4",
    "https://artha.link/@eanxt/jobs/sales-engineer-regent-biochem-bengaluru-50449e6c",
    "https://artha.link/@eanxt/jobs/sales-specialist-catalysts-bengaluru-aae1c56d",
    "https://artha.link/@eanxt/jobs/head-bd-distribution-alternates-aif-vantrock-bengaluru-b139b8d6",
    "https://artha.link/@eanxt/jobs/senior-application-administrator-ambient-security-bengaluru-583aa727",
    "https://artha.link/@eanxt/jobs/ca-fresher-big-4-promaynov-advisory-bengaluru-b6456867",
    "https://artha.link/@eanxt/jobs/senior-auditor-a-global-tier-1-bengaluru-c9c8c35b",
    "https://artha.link/@eanxt/jobs/area-sales-manager-acg-world-bengaluru-59ad4db0",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-padma-prabhakar-bengaluru-ca5aee1c",
    "https://artha.link/@eanxt/jobs/enterprise-sales-lead-8-yrs-b2b-deep-metamorph-bengaluru-0de5e450",
    "https://artha.link/@eanxt/jobs/head-director-of-demand-generation-8-metamorph-bengaluru-71a774bf",
    "https://artha.link/@eanxt/jobs/sales-manager-luxury-real-estate-pin-click-bengaluru-678e5c7c",
    "https://artha.link/@eanxt/jobs/area-sales-manager-paisabazaar-greater-270dcf58",
    "https://artha.link/@eanxt/jobs/2-month-training-100-job-opportunity-primepro-bengaluru-ad9814de",
    "https://artha.link/@eanxt/jobs/vp-sales-luxury-real-estate-pin-click-bengaluru-5debe629",
    "https://artha.link/@eanxt/jobs/graphic-designer-video-editor-intern-managramasethu-bengaluru-123a6e8b",
    "https://artha.link/@eanxt/jobs/informatica-developer-tata-consultancy-bengaluru-1ab1de8a",
    "https://artha.link/@eanxt/jobs/sales-executive-livspace-bengaluru-8ac3d1d5",
    "https://artha.link/@eanxt/jobs/sales-marketing-executive-marvice-media-pvt-bengaluru-e808a7b6",
    "https://artha.link/@eanxt/jobs/sales-crm-head-real-estate-drk-projects-bengaluru-0eba4989",
    "https://artha.link/@eanxt/jobs/project-management-executive-intern-tonbo-imaging-bengaluru-92a643c7",
    "https://artha.link/@eanxt/jobs/servicenow-csm-tata-consultancy-bengaluru-89972f6c",
    "https://artha.link/@eanxt/jobs/opentext-tata-consultancy-bengaluru-18454b68",
    "https://artha.link/@eanxt/jobs/ipv4-ipv6-deployment-engineer-tenarai-bengaluru-86773fcf",
    "https://artha.link/@eanxt/jobs/clinical-research-associate-freshers-clinogenesis-chennai-651b3d08",
    "https://artha.link/@eanxt/jobs/frontend-developer-runable-bengaluru-d29782d0",
    "https://artha.link/@eanxt/jobs/contact-center-manager-unison-bengaluru-f4ff3901",
    "https://artha.link/@eanxt/jobs/service-engineer-global-forklifts-bengaluru-south-d72b2cb2",
    "https://artha.link/@eanxt/jobs/product-designer-mirabelle-korea-bengaluru-f85e96d6",
    "https://artha.link/@eanxt/jobs/customer-relationship-management-krishvi-group-bengaluru-34d19032",
    "https://artha.link/@eanxt/jobs/assistance-manager-senior-accountant-arka-advisors-bengaluru-a8133ed4",
    "https://artha.link/@eanxt/jobs/chief-executive-officer-automotive-bengaluru-45178ec3",
    "https://artha.link/@eanxt/jobs/inside-sales-specialist-cybermindr-bengaluru-b64ae7d8",
    "https://artha.link/@eanxt/jobs/junior-architect-inesis-architects-bengaluru-2743dc3e",
    "https://artha.link/@eanxt/jobs/business-development-manager-medical-sidni-medex-bengaluru-b61396f6",
    "https://artha.link/@eanxt/jobs/qualified-company-secretary-and-trainees-gaa-consulting-bengaluru-65223e75",
    "https://artha.link/@eanxt/jobs/sales-manager-krishvi-group-bengaluru-7afe0c32",
    "https://artha.link/@eanxt/jobs/cluster-manager-hasbro-clothing-pvt-bengaluru-6be7465d",
    "https://artha.link/@eanxt/jobs/customer-service-associate-walk-in-konecta-bengaluru-cc41c769",
    "https://artha.link/@eanxt/jobs/montessori-educator-primary-2-6-years-pep-schoolv2-bengaluru-40616d87",
    "https://artha.link/@eanxt/jobs/head-of-internal-audit-tilteddelta-bengaluru-60bd31ac",
    "https://artha.link/@eanxt/jobs/sap-abap-consultant-eyeglobal-solutions-india-a7a8ea99",
    "https://artha.link/@eanxt/jobs/presales-specialist-designer-alankaram-bengaluru-4943dfb9",
    "https://artha.link/@eanxt/jobs/telesales-executive-vr-360ty-tech-bengaluru-c79f4650",
    "https://artha.link/@eanxt/jobs/senior-salesforce-admin-ringcentral-bengaluru-d257f5e3",
    "https://artha.link/@eanxt/jobs/customer-support-executive-outbound-merago-inc-bengaluru-e3cbd0bd",
    "https://artha.link/@eanxt/jobs/business-development-manager-playo-bengaluru-4dd168e6",
    "https://artha.link/@eanxt/jobs/business-development-executive-rioo-bengaluru-eefa7066",
    "https://artha.link/@eanxt/jobs/bim-architect-myrtha-pools-bengaluru-eda036ab",
    "https://artha.link/@eanxt/jobs/growth-manager-helium-homes-full-time-ovi-bengaluru-2f336f6a",
    "https://artha.link/@eanxt/jobs/junior-architect-collectiveproject-bengaluru-b5cb7dab",
    "https://artha.link/@eanxt/jobs/fashion-stylist-rasa-silver-stories-bengaluru-4eb5b9c7",
    "https://artha.link/@eanxt/jobs/preschool-teacher-eurokids-ullal-bengaluru-south-f1bf3b98",
    "https://artha.link/@eanxt/jobs/saviynt-support-engineer-hcltech-bengaluru-d6221585",
    "https://artha.link/@eanxt/jobs/account-manager-programmatic-dentsu-global-bengaluru-de758507",
    "https://artha.link/@eanxt/jobs/senior-consultant-tax-arka-advisors-bengaluru-e2f700e2",
    "https://artha.link/@eanxt/jobs/senior-project-management-analyst-target-bengaluru-7be76bd3",
    "https://artha.link/@eanxt/jobs/senior-medical-writer-healthminds-bengaluru-23e8a4dd",
    "https://artha.link/@eanxt/jobs/service-coordinator-koche-international-bengaluru-68a84b4c",
    "https://artha.link/@eanxt/jobs/accountant-only-fresher-broadwings-multi-bengaluru-0bacc36a",
    "https://artha.link/@eanxt/jobs/chief-technology-officer-unique-bengaluru-2a5647a6",
    "https://artha.link/@eanxt/jobs/business-development-executive-goodspace-ai-bengaluru-53551b23",
    "https://artha.link/@eanxt/jobs/deployment-engineer-tenarai-bengaluru-5f7eb647",
    "https://artha.link/@eanxt/jobs/occupational-therapist-shelterarms-child-bengaluru-df6d0c77",
    "https://artha.link/@eanxt/jobs/founding-engineer-ai-backend-zango-bengaluru-779747e4",
    "https://artha.link/@eanxt/jobs/area-sales-manager-meril-vijayawada-58343342",
    "https://artha.link/@eanxt/jobs/business-development-executive-mba-wonderla-holidays-bengaluru-610b3951",
    "https://artha.link/@eanxt/jobs/interior-designer-chattels-design-bengaluru-4925d91f",
    "https://artha.link/@eanxt/jobs/highradius-tata-consultancy-bengaluru-15707dc6",
    "https://artha.link/@eanxt/jobs/grc-consultant-mumbai-quess-it-solutions-mumbai-87955469",
    "https://artha.link/@eanxt/jobs/market-advisor-mumbai-propsoch-mumbai-178c2bef",
    "https://artha.link/@eanxt/jobs/immigration-advisor-mumbai-globevisa-group-mumbai-6f536cd7",
    "https://artha.link/@eanxt/jobs/pim-pam-engineer-mumbai-quess-it-solutions-mumbai-253ab133",
    "https://artha.link/@eanxt/jobs/travel-consultant-mumbai-gurugram-tata-consultancy-mumbai-0430c374",
    "https://artha.link/@eanxt/jobs/business-development-executive-mumbai-jb-skincare-pvt-ltd-mumbai-74e77fb6",
    "https://artha.link/@eanxt/jobs/tpm-manager-mumbai-bangalore-id-fresh-food-mumbai-f55569f8",
    "https://artha.link/@eanxt/jobs/regional-training-manager-mumbai-bharat-serums-and-mumbai-06caa173",
    "https://artha.link/@eanxt/jobs/associate-director-corporate-tax-mumbai-bdo-india-mumbai-9159f095",
    "https://artha.link/@eanxt/jobs/business-development-manager-marble-nitco-limited-mumbai-b135f7b9",
    "https://artha.link/@eanxt/jobs/regional-security-consulting-lead-mumbai-ntt-data-mumbai-b7546fd3",
    "https://artha.link/@eanxt/jobs/manager-closing-sales-central-mumbai-narang-realty-mumbai-cedfc158",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-mumbai-bangalore-comic-con-india-india-f37f5e85",
    "https://artha.link/@eanxt/jobs/senior-manager-sponsorship-sales-mumbai-wizcraft-mumbai-edf7db80",
    "https://artha.link/@eanxt/jobs/assistant-professor-quantitative-svkm-s-narsee-mumbai-9b39647d",
    "https://artha.link/@eanxt/jobs/storage-administrator-l2-mumbai-asian-hires-mumbai-0ad54068",
    "https://artha.link/@eanxt/jobs/channel-manager-india-mumbai-karnataka-alibaba-com-mumbai-6af1df41",
    "https://artha.link/@eanxt/jobs/bim-architect-iconic-project-in-mumbai-amarilla-mumbai-963cae6b",
    "https://artha.link/@eanxt/jobs/faculty-verbal-gmat-gre-sat-navi-mumbai-jamboree-education-gurugram-09400c82",
    "https://artha.link/@eanxt/jobs/global-social-media-manager-delhi-studyin-india-171b67ad",
    "https://artha.link/@eanxt/jobs/labware-lims-immediate-joiner-bangalore-capgemini-bengaluru-43230844",
    "https://artha.link/@eanxt/jobs/account-manager-sales-south-asia-mumbai-radisson-hotel-group-mumbai-9420ce17",
    "https://artha.link/@eanxt/jobs/cbse-vice-principal-academics-kharghar-apeejay-education-mumbai-5d582fd0",
    "https://artha.link/@eanxt/jobs/specialist-associate-rmg-delhi-ncr-pwc-india-delhi-d788d224",
    "https://artha.link/@eanxt/jobs/relationship-alliance-lead-mumbai-sr-sg-oasis-hr-mumbai-6e420b1f",
    "https://artha.link/@eanxt/jobs/opening-for-elk-engineer-developer-quess-it-solutions-mumbai-7f245c02",
    "https://artha.link/@eanxt/jobs/senior-3d-2d-designer-bangalore-mumbai-wizcraft-bangalore-rural-fb0a03f7",
    "https://artha.link/@eanxt/jobs/opening-for-cybersecurity-grc-quess-it-solutions-mumbai-e2cf8e97",
    "https://artha.link/@eanxt/jobs/cloud-business-development-manager-pentagon-system-and-mumbai-fdea1059",
    "https://artha.link/@eanxt/jobs/gm-structural-design-engineering-mumbai-sg-oasis-hr-mumbai-9e244946",
    "https://artha.link/@eanxt/jobs/hiring-for-statutory-audit-chartered-avenueshr-consulting-mumbai-5dfd8d32",
    "https://artha.link/@eanxt/jobs/agm-r2r-for-food-company-mumbai-govandi-sg-oasis-hr-mumbai-c19c1968",
    "https://artha.link/@eanxt/jobs/senior-interior-designer-mumbai-dar-mumbai-7d3bc201",
    "https://artha.link/@eanxt/jobs/head-of-engineering-services-surgical-microport-mumbai-e1c07ebd",
    "https://artha.link/@eanxt/jobs/data-science-2-5-years-bangalore-a-client-of-bengaluru-9397b9d7",
    "https://artha.link/@eanxt/jobs/senior-network-engineer-11-lpa-to-15-technosprout-thane-0216401d",
    "https://artha.link/@eanxt/jobs/senior-cloud-sales-specialist-aws-azure-ntt-data-bengaluru-f6cf4085",
    "https://artha.link/@eanxt/jobs/founder-s-office-agritech-4-8-years-talentiser-mumbai-1c237faa",
    "https://artha.link/@eanxt/jobs/senior-manager-manager-business-commix-mumbai-4c0a1ef1",
    "https://artha.link/@eanxt/jobs/chartered-accountant-ca-taxation-audit-j-b-patel-and-navi-mumbai-6d2e8a9e",
    "https://artha.link/@eanxt/jobs/excel-specialist-in-a-fast-growing-koku-solar-private-thane-e0ca94aa",
    "https://artha.link/@eanxt/jobs/urgent-hiring-for-the-role-of-a-project-earnready-by-mumbai-82e601d1",
    "https://artha.link/@eanxt/jobs/urgent-hiring-for-sales-manager-earnready-by-mumbai-3e138737",
    "https://artha.link/@eanxt/jobs/game-designer-trainee-junior-game-rendered-ideas-mira-bhayandar-f0333c8b",
    "https://artha.link/@eanxt/jobs/payroll-supervisor-ambe-international-mumbai-1ba64779",
    "https://artha.link/@eanxt/jobs/horticulturist-pravaa-mumbai-960d2917",
    "https://artha.link/@eanxt/jobs/architectural-project-manager-hralways-mumbai-1f29bdde",
    "https://artha.link/@eanxt/jobs/sales-mice-manager-event-and-exhibition-zellar-international-mumbai-bef6c723",
    "https://artha.link/@eanxt/jobs/sales-and-client-engagement-internship-reaviva-holistic-mumbai-00227d20",
    "https://artha.link/@eanxt/jobs/biddable-media-manager-kreative-co-navi-mumbai-585fc1c5",
    "https://artha.link/@eanxt/jobs/internal-auditor-allcargo-global-mumbai-c6cdeb19",
    "https://artha.link/@eanxt/jobs/education-sales-counselor-inside-sales-emriom-solutions-mumbai-a210e955",
    "https://artha.link/@eanxt/jobs/project-manager-shreeji-facade-mumbai-b59cdb7c",
    "https://artha.link/@eanxt/jobs/senior-inside-sales-representative-yocket-mumbai-9f88b7e1",
    "https://artha.link/@eanxt/jobs/sales-representative-efficientip-mumbai-d52dc48f",
    "https://artha.link/@eanxt/jobs/channel-sales-lead-jio-mumbai-8d70faca",
    "https://artha.link/@eanxt/jobs/telecaller-aurelian-aces-mumbai-4e9a84d9",
    "https://artha.link/@eanxt/jobs/accounts-payable-manager-deloitte-mumbai-c0c3720e",
    "https://artha.link/@eanxt/jobs/client-servicing-account-management-juicelabs-ai-mumbai-84ca0ff5",
    "https://artha.link/@eanxt/jobs/sales-manager-kaapro-mumbai-8752cb6c",
    "https://artha.link/@eanxt/jobs/information-technology-support-engineer-the-good-men-mumbai-b5e10b66",
    "https://artha.link/@eanxt/jobs/tele-sales-specialist-spotlight-concepts-mumbai-359b5781",
    "https://artha.link/@eanxt/jobs/senior-copywriter-upgrad-international-mumbai-d4b8e18f",
    "https://artha.link/@eanxt/jobs/senior-sales-manager-zhuhai-keyu-mumbai-88a9851b",
    "https://artha.link/@eanxt/jobs/creative-assistant-x-ai-team-bulb-chamka-mumbai-497f461f",
    "https://artha.link/@eanxt/jobs/regional-manager-univicoustic-apac-mumbai-35a27338",
    "https://artha.link/@eanxt/jobs/senior-executive-ad-ops-dentsu-india-mumbai-dd66061b",
    "https://artha.link/@eanxt/jobs/dermatologist-dent-heal-mumbai-98bf9e1c",
    "https://artha.link/@eanxt/jobs/interior-designer-mansi-tarneja-mumbai-f304ee77",
    "https://artha.link/@eanxt/jobs/clinical-counseling-psychologist-mitsu-care-mumbai-8157fa8e",
    "https://artha.link/@eanxt/jobs/corporate-gifting-business-manager-d-link-india-limited-mumbai-39d6d838",
    "https://artha.link/@eanxt/jobs/pre-sales-executive-everest-technical-india-ede7a954",
    "https://artha.link/@eanxt/jobs/personal-assistant-luma-fertility-mumbai-24a449fa",
    "https://artha.link/@eanxt/jobs/lead-architect-isprava-mumbai-9c01cd8d",
    "https://artha.link/@eanxt/jobs/associate-dentist-home-visits-dent-home-mumbai-4218fcd5",
    "https://artha.link/@eanxt/jobs/sales-development-representative-bizpay-streamlining-navi-mumbai-8638d3ac",
    "https://artha.link/@eanxt/jobs/territory-sales-manager-rehau-india-mumbai-ba46dc82",
    "https://artha.link/@eanxt/jobs/product-visual-designer-think-design-mumbai-9b54455a",
    "https://artha.link/@eanxt/jobs/hr-cum-office-coordinator-nexovel-bioscience-mumbai-7c09a944",
    "https://artha.link/@eanxt/jobs/sales-manager-industrial-3d-printing-divide-by-zero-mumbai-e0572d79",
    "https://artha.link/@eanxt/jobs/sales-manager-real-estate-hr-yaar-mumbai-796c08dc",
    "https://artha.link/@eanxt/jobs/principal-undergraduate-college-confidential-jobs-mumbai-9be0cd58",
    "https://artha.link/@eanxt/jobs/etl-developer-synechron-mumbai-215b3823",
    "https://artha.link/@eanxt/jobs/pa-physician-asst-adecco-mumbai-cda4b3ba",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-a-t-video-networks-mumbai-9e863bc1",
    "https://artha.link/@eanxt/jobs/junior-media-buyer-the-humsafar-trust-mumbai-cb303b88",
    "https://artha.link/@eanxt/jobs/assistant-professor-of-computer-science-illinois-tech-mumbai-mumbai-49633ed6",
    "https://artha.link/@eanxt/jobs/computer-engineer-crks-stock-broking-mumbai-ebb2c4e8",
    "https://artha.link/@eanxt/jobs/associate-director-of-sales-unison-mumbai-6f406a82",
    "https://artha.link/@eanxt/jobs/senior-copywriter-havas-life-mumbai-mumbai-c4773075",
    "https://artha.link/@eanxt/jobs/state-area-sales-manager-horeca-sales-sg-oasis-hr-bangalore-urban-95f7cdb2",
    "https://artha.link/@eanxt/jobs/tcs-sap-fico-consultant-walkin-tata-consultancy-greater-5fbaed84",
    "https://artha.link/@eanxt/jobs/fractional-senior-product-designer-stealth-indian-greater-caa3f626",
    "https://artha.link/@eanxt/jobs/partnership-manager-pune-keka-hr-pune-district-c2fff0b9",
    "https://artha.link/@eanxt/jobs/pune-business-development-manager-apmosys-pune-district-fbd4ff9b",
    "https://artha.link/@eanxt/jobs/sales-team-lead-pune-syndrome-newedge-pune-city-06158b94",
    "https://artha.link/@eanxt/jobs/dft-lead-manager-blr-pune-scaleflux-bengaluru-bb29e404",
    "https://artha.link/@eanxt/jobs/sales-executive-pune-baner-store-design-cafe-pune-district-3f11d7cf",
    "https://artha.link/@eanxt/jobs/sales-manager-yerwada-kharadi-pune-design-cafe-pune-city-9f62092f",
    "https://artha.link/@eanxt/jobs/on-site-nutritionist-assistant-in-pune-np-fitness-pune-city-0bdcab46",
    "https://artha.link/@eanxt/jobs/ca-inter-ca-finalist-at-pune-cangraft-equipment-pune-pimpri-e10d3b05",
    "https://artha.link/@eanxt/jobs/agm-sales-small-engines-gensets-pune-koel-fluid-dynamics-pune-city-f2ef6e7c",
    "https://artha.link/@eanxt/jobs/assistant-associate-professor-ai-ml-pune-newton-school-of-pune-district-5f1a012c",
    "https://artha.link/@eanxt/jobs/sales-and-marketing-modular-furniture-swidoo-interics-pvt-pune-district-0584e852",
    "https://artha.link/@eanxt/jobs/immediate-hiring-for-sr-software-seventh-contact-pune-district-369c8850",
    "https://artha.link/@eanxt/jobs/veterinarian-raintree-veterinary-pune-division-2c9443c6",
    "https://artha.link/@eanxt/jobs/customer-service-representative-wns-pune-city-cbdcedfb",
    "https://artha.link/@eanxt/jobs/business-development-executive-market-disc-pune-division-8903866b",
    "https://artha.link/@eanxt/jobs/customer-service-representative-atain-pune-district-465ecdf8",
    "https://artha.link/@eanxt/jobs/consultant-ophthalmologist-phaco-pead-asg-eye-hospital-pune-division-c5d7078b",
    "https://artha.link/@eanxt/jobs/azure-data-engineer-bangalore-chennai-tata-consultancy-bengaluru-a20eba3d",
    "https://artha.link/@eanxt/jobs/your-next-big-career-move-infosys-bpm-infosys-bpm-pune-district-bf635828",
    "https://artha.link/@eanxt/jobs/direct-walkin-drive-tcs-pune-on-sunday-tata-consultancy-pune-district-5ed21cca",
    "https://artha.link/@eanxt/jobs/customer-care-executive-wns-pune-pimpri-64ddf50c",
    "https://artha.link/@eanxt/jobs/storage-administrator-tata-consultancy-pune-district-c4ce08ba",
    "https://artha.link/@eanxt/jobs/sales-development-representative-cold-revnew-inc-pune-city-ce84aab3",
    "https://artha.link/@eanxt/jobs/rpa-ui-path-tata-consultancy-pune-district-fc519edf",
    "https://artha.link/@eanxt/jobs/accountant-finchikitsak-pune-district-d82ad799",
    "https://artha.link/@eanxt/jobs/sap-abap-consultant-infomatics-corp-pune-district-b237f978",
    "https://artha.link/@eanxt/jobs/customer-service-representative-wns-pune-district-6c133ba0",
    "https://artha.link/@eanxt/jobs/customer-success-specialist-btb-venture-group-pune-division-d9ba7a99",
    "https://artha.link/@eanxt/jobs/veterinarian-vetic-pune-district-dc475dc4",
    "https://artha.link/@eanxt/jobs/senior-channel-sales-manager-managed-devx-pune-division-2d59abb9",
    "https://artha.link/@eanxt/jobs/murex-bo-developer-mizuho-pune-city-af847e19",
    "https://artha.link/@eanxt/jobs/senior-network-engineer-storage-l3-persistent-systems-pune-city-a26b36ff",
    "https://artha.link/@eanxt/jobs/national-sales-manager-critical-care-krayr-solutions-pune-division-c5105476",
    "https://artha.link/@eanxt/jobs/oracle-hcm-cloud-techno-functional-tata-consultancy-pune-city-bf68ca7a",
    "https://artha.link/@eanxt/jobs/virtual-drive-senior-lead-interior-dar-pune-district-32e6c275",
    "https://artha.link/@eanxt/jobs/data-platform-consultant-snap-analytics-pune-district-dfae1f26",
    "https://artha.link/@eanxt/jobs/speech-language-pathologist-lissun-pune-district-c044be6a",
    "https://artha.link/@eanxt/jobs/sap-sales-and-distribution-sd-consultant-tata-consultancy-mumbai-e70e9e6d",
    "https://artha.link/@eanxt/jobs/sales-engineer-rexel-india-pvt-ltd-pune-district-ae2f2d58",
    "https://artha.link/@eanxt/jobs/l1-it-support-engineer-immediate-advait-techserve-pune-district-247859ce",
    "https://artha.link/@eanxt/jobs/ielts-trainer-isms-group-of-pune-division-e9da5ef8",
    "https://artha.link/@eanxt/jobs/senior-channel-sales-manager-managed-devx-chennai-7876af12",
    "https://artha.link/@eanxt/jobs/interior-designer-tulio-pune-pimpri-f5ac690a",
    "https://artha.link/@eanxt/jobs/service-desk-specialist-l1-support-live-connections-pune-city-4ac234a2",
    "https://artha.link/@eanxt/jobs/geographic-information-systems-manager-artech-l-l-c-pune-district-d6133c2a",
    "https://artha.link/@eanxt/jobs/desktop-operations-associate-mizuho-pune-city-1f01c931",
    "https://artha.link/@eanxt/jobs/senior-frontend-engineer-vue-aem-dentsu-pune-city-3bfdc016",
    "https://artha.link/@eanxt/jobs/design-engineer-agile-technology-pune-district-5a46be7b",
    "https://artha.link/@eanxt/jobs/software-engineering-consultant-tata-consultancy-pune-district-d4d65b67",
    "https://artha.link/@eanxt/jobs/travel-sales-executive-inside-sales-genztourism-pune-division-70967b75",
    "https://artha.link/@eanxt/jobs/customer-service-representative-wns-pune-district-3088d8ae",
    "https://artha.link/@eanxt/jobs/senior-consultant-ansible-automation-intive-pune-city-10d47198",
    "https://artha.link/@eanxt/jobs/sap-s-4hana-retail-o2c-car-talent-basket-pune-district-bbacadef",
    "https://artha.link/@eanxt/jobs/sales-executive-gautam-banerjee-pune-division-c0b021b6",
    "https://artha.link/@eanxt/jobs/sap-finance-control-consultant-tata-consultancy-pune-district-f6d8d10b",
    "https://artha.link/@eanxt/jobs/geographic-information-system-specialist-artech-infosystem-pune-district-0da42b17",
    "https://artha.link/@eanxt/jobs/vulnerability-management-and-threat-mizuho-pune-city-d6e166ed",
    "https://artha.link/@eanxt/jobs/business-development-executive-btb-venture-group-pune-division-1ba78fab",
    "https://artha.link/@eanxt/jobs/gcp-data-engineer-tata-consultancy-chennai-3ac3fd10",
    "https://artha.link/@eanxt/jobs/head-of-sales-spareshub-iradium-pune-division-54637c6c",
    "https://artha.link/@eanxt/jobs/sap-ppqm-consultant-tata-consultancy-pune-district-cb9d12aa",
    "https://artha.link/@eanxt/jobs/nutritionist-omfit-pune-division-bdbe941f",
    "https://artha.link/@eanxt/jobs/cybersecurity-controls-testing-analyst-mizuho-pune-city-dc008f82",
    "https://artha.link/@eanxt/jobs/interior-designer-tata-technologies-pune-district-1167585b",
    "https://artha.link/@eanxt/jobs/customer-service-representative-wns-pune-city-2cac579f",
    "https://artha.link/@eanxt/jobs/senior-area-sales-executive-mars-pune-district-0380ad1d",
    "https://artha.link/@eanxt/jobs/finance-operations-artech-l-l-c-pune-district-580ccc41",
    "https://artha.link/@eanxt/jobs/cyber-security-advisory-lead-mizuho-pune-city-f7824fde",
    "https://artha.link/@eanxt/jobs/python-backend-developer-infobeans-pune-district-70bb328d",
    "https://artha.link/@eanxt/jobs/data-engineer-recro-pune-district-678f1296",
    "https://artha.link/@eanxt/jobs/hadoop-admin-upgrad-rekrut-bengaluru-8cf6c88e",
    "https://artha.link/@eanxt/jobs/area-service-manager-chennai-electrolux-group-chennai-eb2b7b88",
    "https://artha.link/@eanxt/jobs/walk-in-database-postgres-chennai-tata-consultancy-chennai-18da566d",
    "https://artha.link/@eanxt/jobs/sr-manager-enterprise-sales-chennai-tata-communications-chennai-66935f04",
    "https://artha.link/@eanxt/jobs/senior-sales-engineer-chennai-ev-nidec-traction-chennai-7f7622ba",
    "https://artha.link/@eanxt/jobs/azure-data-engineer-f2f-discussion-tata-consultancy-chennai-3c844832",
    "https://artha.link/@eanxt/jobs/sr-academic-counselor-study-abroad-upgrad-study-abroad-chennai-60d2d84a",
    "https://artha.link/@eanxt/jobs/openings-for-technical-voice-process-movate-chennai-3104bd53",
    "https://artha.link/@eanxt/jobs/sales-executive-channel-partner-real-aj-elite-chennai-aba93698",
    "https://artha.link/@eanxt/jobs/elite-relationship-manager-for-leading-the-banyan-hr-chennai-c8b264c5",
    "https://artha.link/@eanxt/jobs/commis-i-ii-iii-corporate-cafeteria-food-tech-company-chennai-80dbc839",
    "https://artha.link/@eanxt/jobs/real-estate-software-sales-executive-https-www-fynrio-com-chennai-5b294b84",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-steel-structure-the-banyan-hr-chennai-6e170949",
    "https://artha.link/@eanxt/jobs/sales-executive-b2b-saas-field-inside-kcube-consultancy-chennai-a5295cbb",
    "https://artha.link/@eanxt/jobs/key-account-manager-b2b-it-solutions-consolidated-bengaluru-2c9b87d6",
    "https://artha.link/@eanxt/jobs/outreach-manager-chennai-office-of-ahmedabad-university-chennai-1f0e0505",
    "https://artha.link/@eanxt/jobs/gcp-data-engineer-f2f-interview-maneva-consulting-bengaluru-0772f90e",
    "https://artha.link/@eanxt/jobs/academic-counsellor-edtech-sales-boston-institute-of-greater-aa9a60c8",
    "https://artha.link/@eanxt/jobs/openings-for-customer-support-voice-movate-chennai-6b1ca134",
    "https://artha.link/@eanxt/jobs/openings-for-technical-voice-process-movate-chennai-c88374ac",
    "https://artha.link/@eanxt/jobs/walkin-drive-19-sep-chennai-pyspark-tata-consultancy-chennai-5ca1290a",
    "https://artha.link/@eanxt/jobs/walkin-drive-19-sep-chennai-google-data-tata-consultancy-chennai-5f1bd549",
    "https://artha.link/@eanxt/jobs/excellent-opportunity-hcltech-freshers-hcltech-chennai-c028dabe",
    "https://artha.link/@eanxt/jobs/urgent-opening-for-big-data-engineer-hcltech-bengaluru-a8571329",
    "https://artha.link/@eanxt/jobs/walk-in-urgent-hiring-for-otc-hcltech-chennai-e4cbe533",
    "https://artha.link/@eanxt/jobs/opening-at-hcl-for-rcm-process-tainer-hcltech-chennai-a117ffa7",
    "https://artha.link/@eanxt/jobs/opening-at-hcl-for-rcm-team-lead-us-hcltech-chennai-243fbf07",
    "https://artha.link/@eanxt/jobs/tcs-hiring-spark-scala-data-engineer-4-tata-consultancy-chennai-b9d085a0",
    "https://artha.link/@eanxt/jobs/mega-walkin-interview-for-otc-hcltech-chennai-a99e445e",
    "https://artha.link/@eanxt/jobs/walk-in-drive-in-tcs-chennai-19-sep-26-tata-consultancy-chennai-44e820a5",
    "https://artha.link/@eanxt/jobs/hcltech-is-hiring-for-otc-collection-hcltech-chennai-75fe3fbb",
    "https://artha.link/@eanxt/jobs/walk-in-drive-in-tcs-chennai-19-sep-26-tata-consultancy-chennai-0b8466fa",
    "https://artha.link/@eanxt/jobs/mega-walkin-interview-for-otc-hcltech-chennai-846c197f",
    "https://artha.link/@eanxt/jobs/trainee-sales-service-coordinator-selene-marine-ltd-chennai-0b8550db",
    "https://artha.link/@eanxt/jobs/sales-executive-policybazaar-com-chennai-971d7ef8",
    "https://artha.link/@eanxt/jobs/qualified-ca-australia-audit-accounting-live-connections-chennai-554e7816",
    "https://artha.link/@eanxt/jobs/urgent-hiring-bim-modelers-civil-3d-digital-datum-chennai-8187ecf2",
    "https://artha.link/@eanxt/jobs/walk-in-at-hcltech-for-otc-collections-hcltech-chennai-e1c4c9ea",
    "https://artha.link/@eanxt/jobs/walk-in-at-hcltech-for-otc-collections-hcltech-chennai-3ec83d50",
    "https://artha.link/@eanxt/jobs/agency-sales-manager-talentigence-chennai-e674d6ea",
    "https://artha.link/@eanxt/jobs/junior-accountant-finance-executive-elixir-global-chennai-e73fd143",
    "https://artha.link/@eanxt/jobs/sales-engineer-regent-biochem-chennai-e17d94b0",
    "https://artha.link/@eanxt/jobs/field-sales-executive-waran-engineering-chennai-aeff1c51",
    "https://artha.link/@eanxt/jobs/program-manager-cleantech-industry-chennai-c0876055",
    "https://artha.link/@eanxt/jobs/enterprise-account-manager-culturemonkey-bengaluru-4bdf1278",
    "https://artha.link/@eanxt/jobs/personal-kid-trainer-janarva-chennai-339f98ce",
    "https://artha.link/@eanxt/jobs/key-account-manager-professional-gionik-human-chennai-da7a1f51",
    "https://artha.link/@eanxt/jobs/funding-manager-rohaan-chennai-e7be53c1",
    "https://artha.link/@eanxt/jobs/bookkeeper-growth-accountants-chennai-86eb43c5",
    "https://artha.link/@eanxt/jobs/interior-designer-hcltech-chennai-425a7d53",
    "https://artha.link/@eanxt/jobs/sap-consultant-tata-consultancy-chennai-34bb2a3d",
    "https://artha.link/@eanxt/jobs/sap-finance-control-consultant-tata-consultancy-chennai-0db2339f",
    "https://artha.link/@eanxt/jobs/customer-service-associate-voice-process-allegis-global-chennai-0d859dc0",
    "https://artha.link/@eanxt/jobs/informatica-developer-tata-consultancy-bengaluru-6b5b40b4",
    "https://artha.link/@eanxt/jobs/mariadb-database-administrator-dba-tata-consultancy-chennai-606e0acc",
    "https://artha.link/@eanxt/jobs/senior-technical-lead-hcltech-bengaluru-3d313adc",
    "https://artha.link/@eanxt/jobs/nursing-superintendent-mgm-healthcare-chennai-9d043f8b",
    "https://artha.link/@eanxt/jobs/restaurant-manager-millet-maagic-meal-chennai-2e578b11",
    "https://artha.link/@eanxt/jobs/production-support-openshift-mongo-db-tata-consultancy-bengaluru-10d886eb",
    "https://artha.link/@eanxt/jobs/radiologist-jesseena-human-tamil-nadu-5b06f63c",
    "https://artha.link/@eanxt/jobs/functional-tester-with-payments-tata-consultancy-chennai-84f8e360",
    "https://artha.link/@eanxt/jobs/global-leadership-hiring-consultant-high-places-chennai-401290dd",
    "https://artha.link/@eanxt/jobs/new-medical-practice-start-up-services-drkrish-chennai-e1043b39",
    "https://artha.link/@eanxt/jobs/medical-superintendent-mgm-healthcare-chennai-18ab72f1",
    "https://artha.link/@eanxt/jobs/m365-admin-tata-consultancy-chennai-d13e251d",
    "https://artha.link/@eanxt/jobs/senior-technical-lead-hcltech-chennai-7e529980",
    "https://artha.link/@eanxt/jobs/oracle-fusion-functional-finance-ap-tata-consultancy-bengaluru-f95fcf40",
    "https://artha.link/@eanxt/jobs/walkin-drive-at-hcl-tech-navallur-uk-hcltech-chennai-60f59670",
    "https://artha.link/@eanxt/jobs/voice-process-sutherland-chennai-f7eb102a",
    "https://artha.link/@eanxt/jobs/accountant-vilvaa-consultancy-chennai-85c8ce04",
    "https://artha.link/@eanxt/jobs/walkin-drive-saturday-26th-september-tata-electronics-kolar-2c48cceb",
    "https://artha.link/@eanxt/jobs/area-manager-policybazaar-com-chennai-1995ca48",
    "https://artha.link/@eanxt/jobs/admissions-counselor-talent-compass-chennai-faad60ac",
    "https://artha.link/@eanxt/jobs/interior-designer-leblanc-interior-chennai-98e403ea",
    "https://artha.link/@eanxt/jobs/trainee-roles-in-order-management-gsot-chennai-fe61d881",
    "https://artha.link/@eanxt/jobs/senior-network-engineer-tata-consultancy-chennai-8b61004b",
    "https://artha.link/@eanxt/jobs/motion-graphics-artist-client-place-chennai-ee884a15",
    "https://artha.link/@eanxt/jobs/assistant-manager-ur-trucks-pvt-ltd-chennai-ebdc4e42",
    "https://artha.link/@eanxt/jobs/etl-specialist-tata-consultancy-greater-7763cf2f",
    "https://artha.link/@eanxt/jobs/sales-executive-artium-academy-chennai-aaea1dfd",
    "https://artha.link/@eanxt/jobs/partnerships-manager-delhi-keka-hr-delhi-8c66e7cf",
    "https://artha.link/@eanxt/jobs/corporate-sales-delhi-anand-rathi-gurugram-35f2dfcd",
    "https://artha.link/@eanxt/jobs/business-lead-delhi-ncr-yuma-energy-delhi-4581a0fd",
    "https://artha.link/@eanxt/jobs/business-development-executive-delhi-unidus-decor-new-delhi-7a73e77a",
    "https://artha.link/@eanxt/jobs/regional-sales-channel-manager-india-alibaba-com-delhi-1673c2c7",
    "https://artha.link/@eanxt/jobs/cochlear-implant-audiologist-delhi-hearclear-india-delhi-7e620d35",
    "https://artha.link/@eanxt/jobs/phaco-sales-specialist-delhi-jaipur-aurolab-jaipur-d2796768",
    "https://artha.link/@eanxt/jobs/business-development-executive-delhi-total-health-ahmedabad-6581e46a",
    "https://artha.link/@eanxt/jobs/ca-article-articleship-nsp-delhi-mbsk-co-new-delhi-99c7ad20",
    "https://artha.link/@eanxt/jobs/technical-support-engineer-delhi-ncr-mech-mind-robotics-greater-delhi-78e09641",
    "https://artha.link/@eanxt/jobs/area-sales-executive-sales-officer-troovy-delhi-4e68b08b",
    "https://artha.link/@eanxt/jobs/specification-executive-building-live-connections-delhi-88518d57",
    "https://artha.link/@eanxt/jobs/public-relations-pr-manager-for-delhi-fleishmanhillard-mumbai-592ae749",
    "https://artha.link/@eanxt/jobs/head-of-sales-maruti-cars-new-delhi-and-profession-makers-new-delhi-4e4adfd2",
    "https://artha.link/@eanxt/jobs/partner-acquisition-interns-field-sales-enrope-solutions-noida-d24f741f",
    "https://artha.link/@eanxt/jobs/international-travel-package-operations-paymy-travel-delhi-08998d91",
    "https://artha.link/@eanxt/jobs/presales-architect-digital-applications-innova-esi-noida-1572dcc6",
    "https://artha.link/@eanxt/jobs/government-strategic-account-manager-pfizer-delhi-00e6527c",
    "https://artha.link/@eanxt/jobs/graduate-student-aceolution-delhi-f1997e12",
    "https://artha.link/@eanxt/jobs/mutual-fund-sales-milestone-global-delhi-36f4b68d",
    "https://artha.link/@eanxt/jobs/sales-manager-duvera-delhi-ea529f66",
    "https://artha.link/@eanxt/jobs/field-sales-executive-7sailors-in-delhi-179b30ef",
    "https://artha.link/@eanxt/jobs/senior-sales-manager-o2-cure-take-a-deep-gurgaon-54738f95",
    "https://artha.link/@eanxt/jobs/german-teacher-max-mueller-new-delhi-d8e3c921",
    "https://artha.link/@eanxt/jobs/corporate-sales-executive-punia-trvlez-new-delhi-595fbcd9",
    "https://artha.link/@eanxt/jobs/field-sales-executive-policybazaar-com-delhi-0390ef6a",
    "https://artha.link/@eanxt/jobs/ctvs-surgeon-hospital-placement-delhi-c09b18f0",
    "https://artha.link/@eanxt/jobs/travel-consultant-startuphr-consulting-gurugram-f54b0c4c",
    "https://artha.link/@eanxt/jobs/senior-sales-executive-enterprise-sales-airkomm-media-pvt-new-delhi-718ad883",
    "https://artha.link/@eanxt/jobs/art-director-copywriter-video-editor-crestra-new-delhi-d5abcfc1",
    "https://artha.link/@eanxt/jobs/senior-architect-eternity-opulence-gurugram-ba9c176b",
    "https://artha.link/@eanxt/jobs/physiotherapist-indraprasth-spine-new-delhi-98c7e82c",
    "https://artha.link/@eanxt/jobs/admission-counsellor-icfm-institute-of-new-delhi-79094ac5",
    "https://artha.link/@eanxt/jobs/customer-relations-manager-talentumhr-new-delhi-bb35a507",
    "https://artha.link/@eanxt/jobs/key-account-sales-manager-glint-india-noida-c2b864ab",
    "https://artha.link/@eanxt/jobs/admission-counselor-icfm-institute-of-preet-vihar-2178da6a",
    "https://artha.link/@eanxt/jobs/medical-oncologist-gyanindit-pvt-ltd-hauz-khas-c461b02e",
    "https://artha.link/@eanxt/jobs/sales-executive-kansal-buildmart-llp-delhi-7c7472c8",
    "https://artha.link/@eanxt/jobs/l2-it-support-executive-computer-ware-india-delhi-f3950b62",
    "https://artha.link/@eanxt/jobs/advertiser-sales-manager-appmontize-media-new-delhi-d37d1516",
    "https://artha.link/@eanxt/jobs/business-manager-glusap-division-sapient-delhi-c07f5d2e",
    "https://artha.link/@eanxt/jobs/event-manager-business-development-wellness-studio-dwarka-6460f293",
    "https://artha.link/@eanxt/jobs/sales-administrative-executive-oasis-art-studio-delhi-239455b6",
    "https://artha.link/@eanxt/jobs/graphic-designer-indesign-coreldraw-shemrock-group-of-rohini-c02177de",
    "https://artha.link/@eanxt/jobs/interior-designer-residential-ishan-homes-delhi-abbe27bc",
    "https://artha.link/@eanxt/jobs/field-sales-executive-vision-world-dwarka-e71a70f6",
    "https://artha.link/@eanxt/jobs/sales-and-marketing-representative-namastey-homes-delhi-4eb9f7e6",
    "https://artha.link/@eanxt/jobs/software-support-executive-ilex-softhub-pvt-ltd-new-delhi-ce18612d",
    "https://artha.link/@eanxt/jobs/b2b-sales-specialist-3d-spaces-ai-gurugram-52ef5a52",
    "https://artha.link/@eanxt/jobs/ca-articleship-tax-gst-audit-m-madan-co-new-delhi-bcc909ab",
    "https://artha.link/@eanxt/jobs/field-sales-representative-policybazaar-com-delhi-f6e856c1",
    "https://artha.link/@eanxt/jobs/business-development-executive-hovo-digital-delhi-ec894383",
    "https://artha.link/@eanxt/jobs/cluster-manager-indian-silk-house-greater-delhi-f73dad7f",
    "https://artha.link/@eanxt/jobs/travel-sales-executive-vedic-voyages-new-delhi-962eef32",
    "https://artha.link/@eanxt/jobs/front-desk-executive-hotel-management-jindal-medical-store-delhi-17b98445",
    "https://artha.link/@eanxt/jobs/graphic-designer-saloni-jain-south-delhi-563aba16",
    "https://artha.link/@eanxt/jobs/social-media-manager-bard-spaces-new-delhi-ec5fd19a",
    "https://artha.link/@eanxt/jobs/dermatologist-derma-defyn-varanasi-d073ba25",
    "https://artha.link/@eanxt/jobs/audiologist-the-lotus-hearing-dwarka-b907487f",
    "https://artha.link/@eanxt/jobs/sales-manager-people-konnect-bengaluru-fb6fbe68",
    "https://artha.link/@eanxt/jobs/business-support-associate-dmn-team-larsen-toubro-delhi-496e231c",
    "https://artha.link/@eanxt/jobs/trainer-digitide-new-delhi-a76d1086",
    "https://artha.link/@eanxt/jobs/head-of-fundraising-vantrock-greater-delhi-0ee57fee",
    "https://artha.link/@eanxt/jobs/chief-content-editor-the-new-indian-chennai-1c5e85da",
    "https://artha.link/@eanxt/jobs/ctvs-hospital-placement-new-delhi-69928fae",
    "https://artha.link/@eanxt/jobs/nursing-manager-zafify-delhi-a419ff58",
    "https://artha.link/@eanxt/jobs/customer-support-executive-ambrane-india-delhi-a3ac4873",
    "https://artha.link/@eanxt/jobs/executive-assistant-amish-aggarwala-new-delhi-c7fa9807",
    "https://artha.link/@eanxt/jobs/area-sales-manager-pharma-nutraceuticals-gipl-www-giplindia-noida-b64a9477",
    "https://artha.link/@eanxt/jobs/sales-manager-noida-sarovar-hotels-noida-87be62b3",
    "https://artha.link/@eanxt/jobs/microsoft-fabric-data-engineer-noida-teceze-noida-e15a5386",
    "https://artha.link/@eanxt/jobs/performance-marketer-creative-agency-mantle-noida-3b943178",
    "https://artha.link/@eanxt/jobs/walkin-drive-25th-sep-payments-mortgage-hcltech-noida-3ae75a6e",
    "https://artha.link/@eanxt/jobs/corporate-sale-manager-mice-services-wny-holidays-pvt-ltd-noida-9dd88742",
    "https://artha.link/@eanxt/jobs/social-media-manager-creative-agency-mantle-noida-6a5a0a3d",
    "https://artha.link/@eanxt/jobs/hcl-dryice-product-sr-qa-engineer-noida-hclsoftware-noida-e7ef3c69",
    "https://artha.link/@eanxt/jobs/senior-manager-training-placement-unison-noida-96caf17b",
    "https://artha.link/@eanxt/jobs/hiring-sales-manager-dubai-luxury-real-am-realty-solutions-noida-fdb220f1",
    "https://artha.link/@eanxt/jobs/ibdp-chemistry-physics-hindi-psychology-apeejay-education-noida-71d57e51",
    "https://artha.link/@eanxt/jobs/business-development-executive-unacademy-noida-2d0102fa",
    "https://artha.link/@eanxt/jobs/lead-generation-executive-flint-marketings-noida-65f7066e",
    "https://artha.link/@eanxt/jobs/customer-support-specialist-tp-noida-c48bd49f",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-homebazaar-com-noida-df4a8730",
    "https://artha.link/@eanxt/jobs/graduate-management-trainee-pan-hr-solution-noida-441103b0",
    "https://artha.link/@eanxt/jobs/3d-animator-chamele-advertising-delhi-ba46e6ba",
    "https://artha.link/@eanxt/jobs/travel-sales-specialist-outback-escapes-noida-34a45207",
    "https://artha.link/@eanxt/jobs/content-writer-consultant-bu-study-upgrad-noida-278c9305",
    "https://artha.link/@eanxt/jobs/fashion-intern-offmint-noida-7952463e",
    "https://artha.link/@eanxt/jobs/quality-analyst-spanish-language-mount-talent-noida-574595c7",
    "https://artha.link/@eanxt/jobs/customer-support-executive-risebird-noida-df9c7a2d",
    "https://artha.link/@eanxt/jobs/sales-executive-numoo-hr-noida-d9efde09",
    "https://artha.link/@eanxt/jobs/walk-in-drive-17th-september-2026-hcltech-noida-c7231ad4",
    "https://artha.link/@eanxt/jobs/walk-in-drive-24th-and-25th-september-hcltech-noida-62967de5",
    "https://artha.link/@eanxt/jobs/language-specialist-italian-spanish-hcltech-noida-7a125320",
    "https://artha.link/@eanxt/jobs/sales-executive-unacademy-noida-b0631c77",
    "https://artha.link/@eanxt/jobs/career-counselor-maxtalent-maxxsavvy-noida-4105e771",
    "https://artha.link/@eanxt/jobs/sales-executive-leads-n-latte-noida-fc4fc532",
    "https://artha.link/@eanxt/jobs/e-commerce-accountant-markmybrand-noida-0b33015c",
    "https://artha.link/@eanxt/jobs/admissions-counselor-white-force-group-noida-18f64a79",
    "https://artha.link/@eanxt/jobs/business-development-executive-earningzen-private-noida-baef0eb2",
    "https://artha.link/@eanxt/jobs/regional-sales-director-hcltech-noida-009de1d2",
    "https://artha.link/@eanxt/jobs/chat-sales-representative-telus-digital-noida-a7ec1503",
    "https://artha.link/@eanxt/jobs/mega-walkin-interview-for-am-gl-r2r-hcltech-noida-75f697e9",
    "https://artha.link/@eanxt/jobs/business-development-executive-it-sales-digicrome-noida-fe225f17",
    "https://artha.link/@eanxt/jobs/virtual-relationship-manager-insurancedekho-noida-d224193b",
    "https://artha.link/@eanxt/jobs/associate-direct-tax-rb-lawcorp-pvt-ltd-noida-f8232d00",
    "https://artha.link/@eanxt/jobs/account-executive-social-media-arte-mediatech-noida-7e01465e",
    "https://artha.link/@eanxt/jobs/gcp-data-engineer-hcltech-noida-5e36e689",
    "https://artha.link/@eanxt/jobs/assistant-professor-clinical-psychology-amity-university-noida-8fd169db",
    "https://artha.link/@eanxt/jobs/cybersecurity-risk-analyst-vensure-employer-noida-0286ecd6",
    "https://artha.link/@eanxt/jobs/faculty-interior-design-ux-ui-product-amity-university-noida-f898311a",
    "https://artha.link/@eanxt/jobs/assistant-professor-computer-science-amity-university-noida-f0d200ee",
    "https://artha.link/@eanxt/jobs/video-editor-cyfuture-noida-a67c8129",
    "https://artha.link/@eanxt/jobs/associate-rsp-india-noida-d852d4cd",
    "https://artha.link/@eanxt/jobs/international-sales-specialist-graygraph-noida-c3f95cdc",
    "https://artha.link/@eanxt/jobs/sales-executive-agent-alliance-noida-f647c9fd",
    "https://artha.link/@eanxt/jobs/head-of-engineering-design-msafe-group-noida-496c30cf",
    "https://artha.link/@eanxt/jobs/venafi-microsoft-pki-engineer-teceze-gurugram-d95e6bc2",
    "https://artha.link/@eanxt/jobs/head-of-sales-the-modular-delhi-6f084c26",
    "https://artha.link/@eanxt/jobs/sales-manager-moneytree-realty-noida-5ec779f9",
    "https://artha.link/@eanxt/jobs/research-and-development-executive-earth-s-soul-noida-dcc46dcd",
    "https://artha.link/@eanxt/jobs/sales-account-manager-clicksoft-solutions-noida-facbdd27",
    "https://artha.link/@eanxt/jobs/international-business-development-graygraph-noida-2fe8880a",
    "https://artha.link/@eanxt/jobs/cyber-security-specialist-tata-consultancy-bengaluru-b611854d",
    "https://artha.link/@eanxt/jobs/business-development-executive-risebird-noida-85dece7d",
    "https://artha.link/@eanxt/jobs/data-pipeline-engineer-tenarai-noida-069b5615",
    "https://artha.link/@eanxt/jobs/principal-law-college-institute-accurate-group-of-gautam-buddha-c6143bb0",
    "https://artha.link/@eanxt/jobs/team-lead-livesalesman-noida-171ed38f",
    "https://artha.link/@eanxt/jobs/mega-walk-in-drive-for-fresher-hcltech-noida-6396eeed",
    "https://artha.link/@eanxt/jobs/product-designer-holidays-easemytrip-com-india-89ed581f",
    "https://artha.link/@eanxt/jobs/assistant-professor-galgotias-university-noida-6d8a6213",
    "https://artha.link/@eanxt/jobs/network-engineer-anlage-digital-bengaluru-997b8862",
    "https://artha.link/@eanxt/jobs/junior-fashion-designer-namrata-joshipura-noida-f69e7558",
    "https://artha.link/@eanxt/jobs/customer-support-executive-freshers-policybazaar-com-gurugram-183eebd0",
    "https://artha.link/@eanxt/jobs/mega-walk-in-drive-12th-sep-2026-hcltech-gurugram-c2b47d95",
    "https://artha.link/@eanxt/jobs/mep-project-manager-rmz-gurugram-476e62be",
    "https://artha.link/@eanxt/jobs/customer-support-associate-csa-eve-healthcare-gurugram-581a43d3",
    "https://artha.link/@eanxt/jobs/physiotherapist-senocare-services-gurugram-ad3b16ba",
    "https://artha.link/@eanxt/jobs/management-accountant-fp-a-executive-eximius-next-gurugram-345c81f1",
    "https://artha.link/@eanxt/jobs/ux-design-and-research-intern-olx-india-gurugram-e316cd15",
    "https://artha.link/@eanxt/jobs/senior-accountant-univlabs-gurugram-6f424b7e",
    "https://artha.link/@eanxt/jobs/corporate-leasing-trueseed-in-gurugram-c3a6952c",
    "https://artha.link/@eanxt/jobs/senior-client-accountant-csc-gurugram-c194dec0",
    "https://artha.link/@eanxt/jobs/sales-manager-houseeazy-gurugram-9d5693db",
    "https://artha.link/@eanxt/jobs/site-in-charge-rmz-gurugram-3fdd353c",
    "https://artha.link/@eanxt/jobs/dietitian-nutritionist-fresher-rebootgut-gurugram-00cedd49",
    "https://artha.link/@eanxt/jobs/early-years-teacher-king-s-college-uk-gurugram-d3220d97",
    "https://artha.link/@eanxt/jobs/sales-executive-shakti-realty-gurugram-861bb112",
    "https://artha.link/@eanxt/jobs/financial-controller-promaynov-advisory-gurugram-d50a80db",
    "https://artha.link/@eanxt/jobs/hindi-sanskrit-teacher-matrikiran-school-gurugram-7c0e30d4",
    "https://artha.link/@eanxt/jobs/assistant-professor-tutor-sgt-university-gurugram-aacbd3c6",
    "https://artha.link/@eanxt/jobs/graphic-designer-pogoloom-gurugram-a02a7f79",
    "https://artha.link/@eanxt/jobs/creative-cultural-club-in-charges-sgt-university-gurugram-1e6fd23a",
    "https://artha.link/@eanxt/jobs/presales-executive-real-estate-ascens-buildcon-llp-gurugram-f6b2f957",
    "https://artha.link/@eanxt/jobs/business-development-manager-rrayze-business-gurugram-12a3d9b6",
    "https://artha.link/@eanxt/jobs/associate-international-sales-consultant-policybazaar-com-gurugram-8d884b27",
    "https://artha.link/@eanxt/jobs/customer-support-executive-policybazaar-com-gurugram-0bd00523",
    "https://artha.link/@eanxt/jobs/customer-support-executive-policybazaar-com-gurugram-b612d5c5",
    "https://artha.link/@eanxt/jobs/customer-service-representative-policybazaar-com-gurugram-0ef5cfa8",
    "https://artha.link/@eanxt/jobs/international-sales-representative-policybazaar-com-gurugram-93c7e72a",
    "https://artha.link/@eanxt/jobs/customer-service-representative-policybazaar-com-gurugram-51ea39e1",
    "https://artha.link/@eanxt/jobs/customer-sales-specialist-wns-gurugram-8ced57ed",
    "https://artha.link/@eanxt/jobs/sales-development-representative-recrew-ai-gurugram-6febac16",
    "https://artha.link/@eanxt/jobs/sales-specialist-policybazaar-com-gurugram-3a7af8e7",
    "https://artha.link/@eanxt/jobs/assistant-professor-the-northcap-gurugram-7ae88dac",
    "https://artha.link/@eanxt/jobs/executive-administrative-assistant-espangle-gurugram-7c730d5a",
    "https://artha.link/@eanxt/jobs/client-solutions-intern-olbrain-gurugram-9c5164c8",
    "https://artha.link/@eanxt/jobs/sales-manager-modular-kitchens-novella-kitchens-gurugram-3139cce7",
    "https://artha.link/@eanxt/jobs/assistant-professor-management-sgt-university-gurugram-6b34f9cb",
    "https://artha.link/@eanxt/jobs/marketing-communications-manager-espangle-gurugram-535136e6",
    "https://artha.link/@eanxt/jobs/customer-care-representative-telus-digital-gurugram-19a34b1e",
    "https://artha.link/@eanxt/jobs/customer-service-representative-wns-gurugram-3141d774",
    "https://artha.link/@eanxt/jobs/tele-sales-executive-deckmount-gurugram-44df4bb5",
    "https://artha.link/@eanxt/jobs/international-sales-representative-policybazaar-com-gurugram-71cb7590",
    "https://artha.link/@eanxt/jobs/international-sales-specialist-policybazaar-com-gurugram-80a025b7",
    "https://artha.link/@eanxt/jobs/cloud-network-engineer-impetus-career-gurugram-7e5d310a",
    "https://artha.link/@eanxt/jobs/sales-specialist-policybazaar-com-gurugram-2558783d",
    "https://artha.link/@eanxt/jobs/mathematics-physics-teacher-matrikiran-school-gurugram-1938c734",
    "https://artha.link/@eanxt/jobs/change-management-analyst-marsh-gurugram-3d39d5b1",
    "https://artha.link/@eanxt/jobs/head-of-operations-olive-green-gurugram-01c9a90d",
    "https://artha.link/@eanxt/jobs/international-sales-representative-policybazaar-com-gurugram-0cdcc0d4",
    "https://artha.link/@eanxt/jobs/servicenow-customer-service-management-tata-consultancy-noida-2767462b",
    "https://artha.link/@eanxt/jobs/customer-service-representative-wns-gurugram-95e171ce",
    "https://artha.link/@eanxt/jobs/sales-executive-policybazaar-com-gurugram-f6e7b120",
    "https://artha.link/@eanxt/jobs/business-development-executive-policybazaar-com-gurugram-124654a9",
    "https://artha.link/@eanxt/jobs/operations-manager-us-impetus-career-gurugram-3ee2dac7",
    "https://artha.link/@eanxt/jobs/associate-sales-consultant-policybazaar-com-gurugram-9d524e11",
    "https://artha.link/@eanxt/jobs/forensic-audit-cla-indus-value-mumbai-4f0f5e7c",
    "https://artha.link/@eanxt/jobs/data-analyst-home-credit-india-gurugram-185fb756",
    "https://artha.link/@eanxt/jobs/grant-accounting-associate-rsm-us-llp-gurugram-bb11abe8",
    "https://artha.link/@eanxt/jobs/technical-project-manager-devyani-gurugram-76efb257",
    "https://artha.link/@eanxt/jobs/business-development-executive-binary-semantics-ltd-gurugram-bf31047a",
    "https://artha.link/@eanxt/jobs/gold-loan-officer-esaf-bank-delhi-8e2b9663",
    "https://artha.link/@eanxt/jobs/sap-pm-consultant-antal-international-gurugram-974abc6d",
    "https://artha.link/@eanxt/jobs/business-development-manager-enterprise-worktual-innovations-greater-d0450646",
    "https://artha.link/@eanxt/jobs/customer-service-representative-policybazaar-com-gurugram-05053936",
    "https://artha.link/@eanxt/jobs/customer-service-representative-policybazaar-com-gurugram-ffbd9bdd",
    "https://artha.link/@eanxt/jobs/customer-support-representative-policybazaar-com-gurugram-deb0455f",
    "https://artha.link/@eanxt/jobs/customer-support-executive-policybazaar-com-gurugram-bec6b3a4",
    "https://artha.link/@eanxt/jobs/sales-executive-hexahealth-gurugram-8c29d118",
    "https://artha.link/@eanxt/jobs/senior-business-development-executive-openhire-gurugram-719ee7d3",
    "https://artha.link/@eanxt/jobs/insurance-sales-representative-policybazaar-com-delhi-de006faf",
    "https://artha.link/@eanxt/jobs/real-estate-specialist-just-office-gurugram-a7f2a540",
    "https://artha.link/@eanxt/jobs/technical-support-engineer-storage-capgemini-bangalore-urban-b6e8223d",
    "https://artha.link/@eanxt/jobs/dgm-control-assurance-unison-gurugram-356bc54a",
    "https://artha.link/@eanxt/jobs/associate-sales-consultant-policybazaar-com-gurugram-39a0d481",
    "https://artha.link/@eanxt/jobs/business-development-executive-policybazaar-com-gurugram-f4f62cd7",
    "https://artha.link/@eanxt/jobs/customer-service-representative-policybazaar-com-gurugram-e96eab7a",
    "https://artha.link/@eanxt/jobs/international-business-development-policybazaar-com-gurugram-0b6f9903",
    "https://artha.link/@eanxt/jobs/international-sales-executive-policybazaar-com-gurugram-6c04383b",
    "https://artha.link/@eanxt/jobs/associate-sales-consultant-policybazaar-com-gurugram-ccbf2c87",
    "https://artha.link/@eanxt/jobs/international-sales-executive-policybazaar-com-gurugram-a4b5c7ef",
    "https://artha.link/@eanxt/jobs/field-sales-officer-policybazaar-com-delhi-969c63c8",
    "https://artha.link/@eanxt/jobs/business-development-executive-policybazaar-com-gurugram-750a2a78",
    "https://artha.link/@eanxt/jobs/customer-service-specialist-policybazaar-com-gurugram-0ff4b173",
    "https://artha.link/@eanxt/jobs/shopify-developer-kolkata-techievolve-global-rajarhat-11b6eee4",
    "https://artha.link/@eanxt/jobs/assistant-manager-indian-payroll-kolkata-bdo-india-kolkata-8d85e739",
    "https://artha.link/@eanxt/jobs/consultant-ophthalmologist-phaco-kolkata-asg-eye-hospital-kolkata-eed3046b",
    "https://artha.link/@eanxt/jobs/content-writer-hindi-kolkata-nation-with-namo-kolkata-8132f1f0",
    "https://artha.link/@eanxt/jobs/pms-aif-sales-kolkata-for-investment-intellectual-kolkata-9dfbe382",
    "https://artha.link/@eanxt/jobs/customer-service-representative-tp-kolkata-9c2c831c",
    "https://artha.link/@eanxt/jobs/process-associate-xceedance-kolkata-a09ced43",
    "https://artha.link/@eanxt/jobs/workday-hcm-consultant-tata-consultancy-greater-cf6fd82c",
    "https://artha.link/@eanxt/jobs/sales-executive-middleton-chambers-kolkata-73000b21",
    "https://artha.link/@eanxt/jobs/customer-service-representative-tp-kolkata-46ebf9a0",
    "https://artha.link/@eanxt/jobs/regional-sales-manager-linnea-media-kolkata-1393ca3a",
    "https://artha.link/@eanxt/jobs/senior-leadership-wealth-management-radiate-rays-kolkata-55ac80e3",
    "https://artha.link/@eanxt/jobs/it-field-support-engineer-device-teceze-kolkata-8305c579",
    "https://artha.link/@eanxt/jobs/professor-of-law-amity-university-kolkata-34059c26",
    "https://artha.link/@eanxt/jobs/executive-sous-chef-pastry-retail-brand-sg-oasis-hr-kolkata-a404fc43",
    "https://artha.link/@eanxt/jobs/sap-sales-distribution-consultant-tata-consultancy-greater-88707c58",
    "https://artha.link/@eanxt/jobs/oracle-consultant-tata-consultancy-greater-d0952fb1",
    "https://artha.link/@eanxt/jobs/sap-ps-consultant-tata-consultancy-greater-d8261456",
    "https://artha.link/@eanxt/jobs/sap-fiori-consultant-tata-consultancy-greater-d45d40e6",
    "https://artha.link/@eanxt/jobs/boomi-developer-tata-consultancy-kolkata-7d6851f5",
    "https://artha.link/@eanxt/jobs/anaplan-developer-tata-consultancy-greater-baa826db",
    "https://artha.link/@eanxt/jobs/sap-btp-consultant-tata-consultancy-greater-90bd48c5",
    "https://artha.link/@eanxt/jobs/sap-sd-tata-consultancy-kolkata-997b71e5",
    "https://artha.link/@eanxt/jobs/english-communication-soft-skills-nips-institute-of-kolkata-19b22e61",
    "https://artha.link/@eanxt/jobs/guidewire-claim-centre-tata-consultancy-bengaluru-b0f29e4e",
    "https://artha.link/@eanxt/jobs/network-cloud-tata-consultancy-kolkata-225ffea2",
    "https://artha.link/@eanxt/jobs/computer-science-teacher-pgt-de-paul-school-kolkata-f9e3ba12",
    "https://artha.link/@eanxt/jobs/business-development-executive-zigsaw-kolkata-7d560fb4",
    "https://artha.link/@eanxt/jobs/junior-google-ads-media-buyer-btrue-media-kolkata-407cb011",
    "https://artha.link/@eanxt/jobs/unix-sql-autosys-itrs-tata-consultancy-bengaluru-34462d2c",
    "https://artha.link/@eanxt/jobs/sql-dba-tata-consultancy-bengaluru-fbe3fb66",
    "https://artha.link/@eanxt/jobs/sap-cpi-architect-tata-consultancy-greater-004a2770",
    "https://artha.link/@eanxt/jobs/sap-consultant-hcltech-bengaluru-9ef75ddd",
    "https://artha.link/@eanxt/jobs/sales-executive-lakegrid-greater-ce5a9411",
    "https://artha.link/@eanxt/jobs/designer-vedant-fashions-kolkata-d466edbb",
    "https://artha.link/@eanxt/jobs/oracle-fusion-ppm-functional-consultant-tata-consultancy-greater-04fe29a9",
    "https://artha.link/@eanxt/jobs/executive-sr-executive-visa-operations-journey-partner-kolkata-7203a7e4",
    "https://artha.link/@eanxt/jobs/sap-hcm-tata-consultancy-kolkata-b145dae0",
    "https://artha.link/@eanxt/jobs/national-head-channel-sales-altius-sports-kolkata-7f3537bc",
    "https://artha.link/@eanxt/jobs/telesales-supervisor-comparison-junction-kolkata-3ce19664",
    "https://artha.link/@eanxt/jobs/customer-service-executive-career-comfort-kolkata-12acdf14",
    "https://artha.link/@eanxt/jobs/sap-business-object-bo-tata-consultancy-kolkata-d0329ff5",
    "https://artha.link/@eanxt/jobs/oracle-fusion-scm-functional-eam-tata-consultancy-greater-d39320f7",
    "https://artha.link/@eanxt/jobs/area-sales-executive-travel-trade-b2b-pacific-pearl-kolkata-90a28d02",
    "https://artha.link/@eanxt/jobs/big-data-engineer-tata-consultancy-chennai-e50ce849",
    "https://artha.link/@eanxt/jobs/sap-fico-s-4hana-tata-consultancy-greater-007b8e8a",
    "https://artha.link/@eanxt/jobs/application-support-tata-consultancy-chennai-3f5b1877",
    "https://artha.link/@eanxt/jobs/sap-abap-technical-consultant-itc-infotech-kolkata-d0ac7384",
    "https://artha.link/@eanxt/jobs/manager-big4-bengaluru-c57e0a43",
    "https://artha.link/@eanxt/jobs/credit-controller-shyam-metalics-and-kolkata-925e911f",
    "https://artha.link/@eanxt/jobs/process-associate-career-comfort-kolkata-0bf68411",
    "https://artha.link/@eanxt/jobs/sap-api-architect-hcltech-bengaluru-8388d329",
    "https://artha.link/@eanxt/jobs/pension-specialist-tata-consultancy-kolkata-82e32cc9",
    "https://artha.link/@eanxt/jobs/sap-technical-lead-hcltech-bengaluru-59a7378c",
    "https://artha.link/@eanxt/jobs/data-engineer-tata-consultancy-bengaluru-9b533bab",
    "https://artha.link/@eanxt/jobs/assistant-sales-manager-thomas-cook-india-bengaluru-e8f49287",
    "https://artha.link/@eanxt/jobs/front-end-developer-react-tata-consultancy-kolkata-893a6e95",
    "https://artha.link/@eanxt/jobs/project-co-ordinator-mahila-housing-trust-kolkata-8e36c120",
    "https://artha.link/@eanxt/jobs/marketing-business-development-manager-divsoft-solutions-kolkata-db2d3960",
    "https://artha.link/@eanxt/jobs/senior-frontend-developer-tata-consultancy-greater-470717e9",
    "https://artha.link/@eanxt/jobs/senior-us-accounting-specialist-fundtec-greater-11c438de",
    "https://artha.link/@eanxt/jobs/associate-sales-manager-taevas-life-sciences-kolkata-79a4ec1f",
    "https://artha.link/@eanxt/jobs/sap-is-retail-functional-consultant-tata-consultancy-chennai-53cdb98f",
    "https://artha.link/@eanxt/jobs/sap-bpa-architect-hcltech-bengaluru-a96f2b78",
    "https://artha.link/@eanxt/jobs/team-lead-outbound-calling-clirnet-kolkata-6de87b53",
    "https://artha.link/@eanxt/jobs/pyspark-tata-consultancy-chennai-056924f7",
    "https://artha.link/@eanxt/jobs/photographer-nestasia-kolkata-28eb3909",
    "https://artha.link/@eanxt/jobs/full-time-management-trainee-industry-anudip-foundation-mumbai-8d178ccd",
    "https://artha.link/@eanxt/jobs/senior-php-magento-developer-somnetics-som-greater-67c3e368",
    "https://artha.link/@eanxt/jobs/mdm-developer-webologix-ltd-inc-west-bengal-7da16dcd",
    "https://artha.link/@eanxt/jobs/telesales-executive-comparison-junction-noida-6ea4e253",
    "https://artha.link/@eanxt/jobs/head-of-international-sales-duratuf-products-kolkata-3248e1a7",
    "https://artha.link/@eanxt/jobs/veterinary-surgeon-vetic-west-bengal-f1fb9c0c",
    "https://artha.link/@eanxt/jobs/sap-car-posdta-consultant-tata-consultancy-kolkata-1c72a273",
    "https://artha.link/@eanxt/jobs/assistant-manager-transmission-projects-t-v-s-d-ahmedabad-9ddcc531",
    "https://artha.link/@eanxt/jobs/sales-executive-vikas-medical-kolkata-ef4ac0df",
    "https://artha.link/@eanxt/jobs/pyspark-data-engineer-tata-consultancy-bengaluru-d300a3ef",
    "https://artha.link/@eanxt/jobs/oracle-fusion-hcm-payroll-module-pwc-india-gurugram-000433c0",
    "https://artha.link/@eanxt/jobs/azure-data-engineer-tata-consultancy-pune-city-5adaf220",
    "https://artha.link/@eanxt/jobs/ui-path-ai-agentic-ai-senior-developer-tata-consultancy-bengaluru-8c32a401",
    "https://artha.link/@eanxt/jobs/anaplan-tata-consultancy-kolkata-06781327",
    "https://artha.link/@eanxt/jobs/aws-data-engineer-tata-consultancy-pune-city-e648c247",
    "https://artha.link/@eanxt/jobs/partnership-manager-ahmedabad-keka-hr-ahmedabad-6b3b7346",
    "https://artha.link/@eanxt/jobs/enterprise-sales-officer-ahmedabad-jio-gujarat-10c37c42",
    "https://artha.link/@eanxt/jobs/business-development-manager-wfo-evoke-hr-solutions-ahmedabad-13a14c1f",
    "https://artha.link/@eanxt/jobs/opening-for-teacher-primary-school-redbricks-education-ahmedabad-47b00cd9",
    "https://artha.link/@eanxt/jobs/chartered-accountant-inter-ca-svt-advisors-ahmedabad-18678709",
    "https://artha.link/@eanxt/jobs/area-sales-manager-ahmedabad-sports-and-the-banyan-hr-ahmedabad-7ce7373b",
    "https://artha.link/@eanxt/jobs/sales-manager-ahmedabad-baroda-surat-samsara-group-gujarat-98fbfea3",
    "https://artha.link/@eanxt/jobs/cfa-faculty-trainer-cfa-level-ii-talent-corner-hr-mumbai-01ffd044",
    "https://artha.link/@eanxt/jobs/customer-service-specialist-netrtech-solutions-jaipur-33f22680",
    "https://artha.link/@eanxt/jobs/sales-marketing-coordinator-diamond-masala-ahmedabad-7432f7cd",
    "https://artha.link/@eanxt/jobs/sales-consultant-wonderedge-ahmedabad-b1cd4278",
    "https://artha.link/@eanxt/jobs/sales-specialist-t-p-l-global-llc-ahmedabad-6794b65a",
    "https://artha.link/@eanxt/jobs/accountant-gajroll-technology-ahmedabad-00fe35c0",
    "https://artha.link/@eanxt/jobs/telesales-executive-nseg-pvt-ltd-ahmedabad-55260ff6",
    "https://artha.link/@eanxt/jobs/customer-service-specialist-netrtech-solutions-nagpur-9c87f790",
    "https://artha.link/@eanxt/jobs/us-accounting-executive-night-shift-rhc-india-ahmedabad-60a646bb",
    "https://artha.link/@eanxt/jobs/business-development-executive-bde-b2b-i-vision-infotech-ahmedabad-d6902a13",
    "https://artha.link/@eanxt/jobs/visa-consultant-fresher-zigsaw-ahmedabad-0ce37b43",
    "https://artha.link/@eanxt/jobs/bim-engineer-mars-bim-solutions-ahmedabad-237b8375",
    "https://artha.link/@eanxt/jobs/senior-business-development-manager-anvayo-tech-ahmedabad-f24b9845",
    "https://artha.link/@eanxt/jobs/founding-partner-revenue-gtm-mar-cat-ahmedabad-d4054be5",
    "https://artha.link/@eanxt/jobs/accounts-gst-lead-charyas-ahmedabad-115c36f4",
    "https://artha.link/@eanxt/jobs/product-lead-hochiki-cavitak-mumbai-467bef49",
    "https://artha.link/@eanxt/jobs/administration-facilities-executive-cavitak-ahmedabad-c54a1717",
    "https://artha.link/@eanxt/jobs/data-associate-data-annotation-dwij-ai-ahmedabad-bbb13299",
    "https://artha.link/@eanxt/jobs/operations-executive-pintola-ahmedabad-c24b203a",
    "https://artha.link/@eanxt/jobs/customer-service-specialist-netrtech-solutions-ahmedabad-bc7a51c2",
    "https://artha.link/@eanxt/jobs/customer-service-representative-netrtech-solutions-mumbai-1ba6f70a",
    "https://artha.link/@eanxt/jobs/us-property-accountant-rhc-india-ahmedabad-dee27f98",
    "https://artha.link/@eanxt/jobs/cloud-sales-manager-cloudfirst-bengaluru-11b3c0e3",
    "https://artha.link/@eanxt/jobs/student-visa-counsellor-rk-international-ahmedabad-db574341",
    "https://artha.link/@eanxt/jobs/us-accountant-night-shift-mantras2success-com-ahmedabad-e5b408dd",
    "https://artha.link/@eanxt/jobs/territory-manager-asia-zigsaw-ahmedabad-a8584cf9",
    "https://artha.link/@eanxt/jobs/safety-manager-right-advisors-ahmedabad-120c62b9",
    "https://artha.link/@eanxt/jobs/informatica-developer-tata-consultancy-bengaluru-321efe00",
    "https://artha.link/@eanxt/jobs/campaign-manager-digivana-india-4ec63a32",
    "https://artha.link/@eanxt/jobs/relationship-manager-hl-lap-prime-atop-consultants-ahmedabad-4714aea1",
    "https://artha.link/@eanxt/jobs/ppc-project-manager-e2m-ahmedabad-55b026f8",
    "https://artha.link/@eanxt/jobs/audit-associate-crowe-uae-ahmedabad-71ce2fce",
    "https://artha.link/@eanxt/jobs/senior-hr-manager-hr-systems-compliance-myarmor-wellness-ahmedabad-64ec9eff",
    "https://artha.link/@eanxt/jobs/area-sales-manager-lenskart-com-ahmedabad-2448910f",
    "https://artha.link/@eanxt/jobs/scan-to-bim-bim-acs-engineer-virtual-building-solapur-7b31c813",
    "https://artha.link/@eanxt/jobs/senior-accounting-officer-us-accounting-analytix-business-ahmedabad-4c19e0a9",
    "https://artha.link/@eanxt/jobs/graphic-designer-e11even-technologies-ahmedabad-2d1ec446",
    "https://artha.link/@eanxt/jobs/yardi-support-specialist-rhc-india-ahmedabad-6ee15957",
    "https://artha.link/@eanxt/jobs/front-office-assistant-aura-the-diet-clinic-ahmedabad-4832779c",
    "https://artha.link/@eanxt/jobs/plc-engineer-iot-engineer-eronkan-technologies-ahmedabad-5be1666a",
    "https://artha.link/@eanxt/jobs/back-office-executive-prudent-corporate-ahmedabad-8bae72f2",
    "https://artha.link/@eanxt/jobs/quality-control-manager-senior-manager-zydus-group-ahmedabad-997f9d21",
    "https://artha.link/@eanxt/jobs/field-sales-executive-policybazaar-com-ahmedabad-a433e98d",
    "https://artha.link/@eanxt/jobs/regional-manager-join-in-campus-ahmedabad-e7778dfa",
    "https://artha.link/@eanxt/jobs/executive-assistant-to-senior-vice-zydus-group-ahmedabad-8ecfc25e",
    "https://artha.link/@eanxt/jobs/chartered-accountant-kmk-ahmedabad-8577004b",
    "https://artha.link/@eanxt/jobs/scm-associate-audit-compliance-cavitak-ahmedabad-9077209a",
    "https://artha.link/@eanxt/jobs/associate-key-account-manager-sales-excellent-publicity-mumbai-51b84f3d",
    "https://artha.link/@eanxt/jobs/payor-business-manager-pfizer-ahmedabad-82f6ddb9",
    "https://artha.link/@eanxt/jobs/assistant-account-executive-sanghvi-vora-and-ahmedabad-570b8cc6",
    "https://artha.link/@eanxt/jobs/australian-tax-reviewer-sourcein-ahmedabad-bcae7b2d",
    "https://artha.link/@eanxt/jobs/us-sales-account-manager-swiftsku-yc-w21-ahmedabad-52a0b6a4",
    "https://artha.link/@eanxt/jobs/australian-smsf-accountant-counthq-ahmedabad-7920880c",
    "https://artha.link/@eanxt/jobs/etl-tester-tata-consultancy-chennai-5a84dd50",
    "https://artha.link/@eanxt/jobs/senior-architect-bim-revit-ini-design-studio-ahmedabad-a4ce137e",
    "https://artha.link/@eanxt/jobs/customer-service-representative-policybazaar-com-ahmedabad-10f9e781",
    "https://artha.link/@eanxt/jobs/av-programmer-audio-visual-cavitak-mumbai-6f61efe5",
    "https://artha.link/@eanxt/jobs/senior-accountant-qubs-kpo-services-ahmedabad-17a067ef",
    "https://artha.link/@eanxt/jobs/senior-architect-ini-design-studio-ahmedabad-001c1f06",
    "https://artha.link/@eanxt/jobs/government-sales-audio-visual-av-cavitak-delhi-cf14ead1",
    "https://artha.link/@eanxt/jobs/deputy-general-manager-marketing-cadila-ahmedabad-87f53939",
    "https://artha.link/@eanxt/jobs/freelance-interior-designers-north-east-design-cafe-gujarat-e4bb3d29",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-azilen-technologies-ahmedabad-abdc2399",
    "https://artha.link/@eanxt/jobs/business-development-executive-chasepro-ahmedabad-fd9704f9",
    "https://artha.link/@eanxt/jobs/hiring-in-jaipur-for-head-export-sales-wowjobs-jaipur-da527b89",
    "https://artha.link/@eanxt/jobs/customer-support-specialist-jmd-technologies-inc-jaipur-7f79ebc6",
    "https://artha.link/@eanxt/jobs/customer-service-representative-tp-jaipur-53ab5740",
    "https://artha.link/@eanxt/jobs/sales-executive-hospitality-the-nivaas-jaipur-112684f3",
    "https://artha.link/@eanxt/jobs/nurse-apex-hospitals-jaipur-9319f670",
    "https://artha.link/@eanxt/jobs/luxury-sales-jaipur-rugs-jaipur-3f1ed5e5",
    "https://artha.link/@eanxt/jobs/sales-executive-manavi-skills-jaipur-5089cf2e",
    "https://artha.link/@eanxt/jobs/sales-lead-conversion-executive-furnicasa-india-92b691d1",
    "https://artha.link/@eanxt/jobs/senior-sales-executive-egnoto-jaipur-2992b557",
    "https://artha.link/@eanxt/jobs/assistant-professor-ece-anand-international-jaipur-18cb1530",
    "https://artha.link/@eanxt/jobs/english-teacher-foreigner-poornima-university-jaipur-2eded173",
    "https://artha.link/@eanxt/jobs/curator-city-palace-museum-jaipur-49bb6404",
    "https://artha.link/@eanxt/jobs/playwright-kpmg-india-bengaluru-038e1009",
    "https://artha.link/@eanxt/jobs/sales-manager-trimurty-builders-jaipur-54934ea0",
    "https://artha.link/@eanxt/jobs/counselling-psychologist-and-tara-mindspace-jaipur-c3fb7489",
    "https://artha.link/@eanxt/jobs/business-development-executive-leadfreak-jaipur-8e2802df",
    "https://artha.link/@eanxt/jobs/graphic-designer-vyas-business-jaipur-e2440a7a",
    "https://artha.link/@eanxt/jobs/associate-project-architect-jaigarh-public-jaipur-64c9d497",
    "https://artha.link/@eanxt/jobs/motion-graphics-designer-nishani-studio-jaipur-51e6478a",
    "https://artha.link/@eanxt/jobs/business-development-executive-am-lp-fintech-noida-19b62003",
    "https://artha.link/@eanxt/jobs/senior-backend-engineer-suncrypto-jaipur-f4d3a2e0",
    "https://artha.link/@eanxt/jobs/customer-service-representative-tp-jaipur-99e38986",
    "https://artha.link/@eanxt/jobs/customer-support-executive-jmd-technologies-inc-jaipur-4ced4501",
    "https://artha.link/@eanxt/jobs/site-mapper-jaipur-rugs-raipur-25578ce7",
    "https://artha.link/@eanxt/jobs/customer-service-executive-cse-jmd-technologies-inc-jaipur-0bde148f",
    "https://artha.link/@eanxt/jobs/business-development-executive-the-hiring-company-jaipur-638edc4d",
    "https://artha.link/@eanxt/jobs/chartered-accountant-listenfirst-jaipur-22a627bb",
    "https://artha.link/@eanxt/jobs/account-executive-self-employed-jaipur-b76250e2",
    "https://artha.link/@eanxt/jobs/quality-assurance-manager-tp-jaipur-a539b7b7",
    "https://artha.link/@eanxt/jobs/sap-fico-consultant-asg-eye-hospital-chennai-c6044da4",
    "https://artha.link/@eanxt/jobs/customer-service-representative-tp-jaipur-bf63a412",
    "https://artha.link/@eanxt/jobs/customer-support-manager-suncrypto-jaipur-3390d380",
    "https://artha.link/@eanxt/jobs/medical-sales-representative-pfizer-jaipur-a04a4b68",
    "https://artha.link/@eanxt/jobs/outreach-officer-bde-heion-ventures-pvt-jaipur-b8aa56a5",
    "https://artha.link/@eanxt/jobs/admission-counsellor-outreach-banyan-tree-schools-jaipur-e0882e2e",
    "https://artha.link/@eanxt/jobs/creative-marketing-analyst-pericent-bpm-and-jaipur-b0f35527",
    "https://artha.link/@eanxt/jobs/assistant-associate-professor-finance-jaipuria-institute-indore-12b00d3f",
    "https://artha.link/@eanxt/jobs/information-technology-administrator-snapmint-jaipur-615c67d2",
    "https://artha.link/@eanxt/jobs/senior-account-manager-hiregenie-finance-jaipur-3eae36a4",
    "https://artha.link/@eanxt/jobs/ai-graphic-designer-angara-ecommerce-jaipur-6ff651a0",
    "https://artha.link/@eanxt/jobs/assistant-professor-interior-design-and-poornima-university-jaipur-6a7c4100",
    "https://artha.link/@eanxt/jobs/b2b-sales-client-support-executive-eat-better-co-jaipur-1ea7cc1f",
    "https://artha.link/@eanxt/jobs/credit-risk-specialist-kpmg-india-bengaluru-e68bd6d6",
    "https://artha.link/@eanxt/jobs/sales-executive-saas-aidc-softserv-inc-jaipur-c89cc5a1",
    "https://artha.link/@eanxt/jobs/wordpress-developer-egnoto-jaipur-f5c6540b",
    "https://artha.link/@eanxt/jobs/senior-regional-sales-manager-jumbo-steels-limited-surat-257bbf9a",
    "https://artha.link/@eanxt/jobs/interior-designer-purple-shell-turnkey-jaipur-c965bd41",
    "https://artha.link/@eanxt/jobs/customer-success-executive-pinnacle-bangalore-urban-f68b3f60",
    "https://artha.link/@eanxt/jobs/sales-officer-ghar-soaps-pune-district-5cb09730",
    "https://artha.link/@eanxt/jobs/executive-events-partnership-swiggy-bengaluru-0d34a84c",
    "https://artha.link/@eanxt/jobs/head-of-quality-control-desire-energy-jaipur-3d3106d1",
    "https://artha.link/@eanxt/jobs/junior-architect-construction-projects-hiring-point-gurugram-c50e3846",
    "https://artha.link/@eanxt/jobs/senior-back-end-developer-boomerangfx-india-3b20199c",
    "https://artha.link/@eanxt/jobs/admission-counselor-the-kulish-school-jaipur-434efa15",
    "https://artha.link/@eanxt/jobs/senior-statutory-audit-assurance-pierag-consulting-gurugram-43d3b330",
    "https://artha.link/@eanxt/jobs/chief-information-security-officer-celebal-technologies-jaipur-1ce0bdab",
    "https://artha.link/@eanxt/jobs/business-development-manager-kochi-apmosys-kochi-755fe8ff",
    "https://artha.link/@eanxt/jobs/cloud-security-walkin-sept-12-2026-kochi-tata-consultancy-kochi-b3d1a997",
    "https://artha.link/@eanxt/jobs/architecture-draftsman-residential-and-archpro-kochi-e982844d",
    "https://artha.link/@eanxt/jobs/sales-crm-executive-wedartistry-aluva-bef89033",
    "https://artha.link/@eanxt/jobs/accounts-receivable-specialist-exl-kochi-90cafcd6",
    "https://artha.link/@eanxt/jobs/senior-associate-us-insurance-voice-trinity-skillworks-kochi-27f46b57",
    "https://artha.link/@eanxt/jobs/executive-assistant-audit-business-mska-associates-kochi-98dfe52e",
    "https://artha.link/@eanxt/jobs/student-counselor-newzealand-skills-kochi-2230eb68",
    "https://artha.link/@eanxt/jobs/fx-artist-senior-mid-digital-turbo-media-ernakulam-0cb1d72f",
    "https://artha.link/@eanxt/jobs/sap-fico-consultant-tata-consultancy-kochi-a2734c15",
    "https://artha.link/@eanxt/jobs/business-immigration-coordinator-ii-fragomen-bengaluru-8669ef64",
    "https://artha.link/@eanxt/jobs/manager-project-solutioning-detailing-vinton-kochi-c0017376",
    "https://artha.link/@eanxt/jobs/swift-alliance-access-alliance-gateway-interland-kochi-5bc8e023",
    "https://artha.link/@eanxt/jobs/sales-executive-parijat-packaging-kerala-9559bdac",
    "https://artha.link/@eanxt/jobs/graphic-designer-parel-creative-kochi-c4718b41",
    "https://artha.link/@eanxt/jobs/senior-lift-technician-erection-brio-elevators-bengaluru-7d02a904",
    "https://artha.link/@eanxt/jobs/head-of-sales-and-business-development-edroots-kochi-61908e0b",
    "https://artha.link/@eanxt/jobs/home-sales-team-lead-jio-kochi-e7a4b7a7",
    "https://artha.link/@eanxt/jobs/bams-bhms-doctor-sea-bird-medicare-mumbai-e1ccd443",
    "https://artha.link/@eanxt/jobs/fpga-prototyping-haps-hcltech-bangalore-urban-948286a2",
    "https://artha.link/@eanxt/jobs/cyber-security-engineer-tata-consultancy-kochi-ef172f9d",
    "https://artha.link/@eanxt/jobs/sap-finance-control-consultant-tata-consultancy-chennai-a687145a",
    "https://artha.link/@eanxt/jobs/network-security-engineer-tata-consultancy-kochi-5aa32406",
    "https://artha.link/@eanxt/jobs/apigee-administration-tata-consultancy-chennai-a2c34599",
    "https://artha.link/@eanxt/jobs/l1-help-desk-engineer-worksent-kochi-a7f4ff69",
    "https://artha.link/@eanxt/jobs/business-development-executive-hdb-financial-kerala-c975d347",
    "https://artha.link/@eanxt/jobs/data-engineer-tenarai-noida-8469a82e",
    "https://artha.link/@eanxt/jobs/associate-clinical-data-coordinator-iqvia-bengaluru-c9465795",
    "https://artha.link/@eanxt/jobs/digital-designer-web-design-t500-29316-comply-kochi-80cb446d",
    "https://artha.link/@eanxt/jobs/technical-project-manager-geojit-technologies-kochi-18889df5",
    "https://artha.link/@eanxt/jobs/oracle-techno-functional-consultant-gapblue-software-kochi-403d4616",
    "https://artha.link/@eanxt/jobs/cluster-manager-hasbro-clothing-pvt-kochi-7e8c29c2",
    "https://artha.link/@eanxt/jobs/ibm-mq-admin-tata-consultancy-bengaluru-808793c0",
    "https://artha.link/@eanxt/jobs/spotfire-sql-developer-iqvia-india-bengaluru-518b1476",
    "https://artha.link/@eanxt/jobs/aws-data-engineer-tata-consultancy-bengaluru-70107e01",
    "https://artha.link/@eanxt/jobs/cyber-security-specialist-tata-consultancy-bengaluru-25f5306b",
    "https://artha.link/@eanxt/jobs/senior-data-engineer-tenarai-noida-29014b02",
    "https://artha.link/@eanxt/jobs/business-development-manager-bdm-vedatma-consulting-kanayannur-a0d68f54",
    "https://artha.link/@eanxt/jobs/sr-associate-trans-processing-insurance-hirevibe-talent-kochi-c08daad1",
    "https://artha.link/@eanxt/jobs/sales-manager-surgical-devices-nextgen-medworks-bengaluru-01818693",
    "https://artha.link/@eanxt/jobs/program-manager-experion-kochi-5538912c",
    "https://artha.link/@eanxt/jobs/product-engineer-tata-consultancy-bengaluru-2b2d668c",
    "https://artha.link/@eanxt/jobs/oracle-technical-consultant-gapblue-software-kochi-fb153e65",
    "https://artha.link/@eanxt/jobs/sales-manager-policybazaar-com-kochi-1b7fb3b8",
    "https://artha.link/@eanxt/jobs/financial-services-banking-kpmg-bengaluru-2da14492",
    "https://artha.link/@eanxt/jobs/ireland-accountant-mount-talent-delhi-9c899eba",
    "https://artha.link/@eanxt/jobs/business-development-executive-neural-networks-pvt-kochi-5620c433",
    "https://artha.link/@eanxt/jobs/aruba-wireless-network-engineer-tata-consultancy-chennai-697ed539",
    "https://artha.link/@eanxt/jobs/pre-sales-consultant-unity-infotech-kochi-ffe829b2",
    "https://artha.link/@eanxt/jobs/drawing-sketching-teacher-mad-school-chennai-63acf0e7",
    "https://artha.link/@eanxt/jobs/executive-growth-marketing-wonderla-holidays-bengaluru-f7063aac",
    "https://artha.link/@eanxt/jobs/associate-architect-people-equation-kochi-f6822431",
    "https://artha.link/@eanxt/jobs/technical-writer-talent-basket-kochi-420573cb",
    "https://artha.link/@eanxt/jobs/staff-accountant-kpmg-india-mumbai-bb788fbb",
    "https://artha.link/@eanxt/jobs/tcs-is-hiring-for-infoblox-sme-tata-consultancy-chennai-4de078b1",
    "https://artha.link/@eanxt/jobs/junior-compliance-executive-htic-global-kochi-0f1510c2",
    "https://artha.link/@eanxt/jobs/business-development-executive-remote-salesone-india-b301745a",
    "https://artha.link/@eanxt/jobs/business-development-manager-bu-gsp-upgrad-gsp-kochi-5120e983",
    "https://artha.link/@eanxt/jobs/ar-quality-auditor-ar-eqa-cascade-revenue-ernakulam-c7cb98c4",
    "https://artha.link/@eanxt/jobs/industrial-trainee-kpmg-india-mumbai-210a6bff",
    "https://artha.link/@eanxt/jobs/senior-associate-assistant-manager-deal-bdo-india-gurugram-6bf21b1b",
    "https://artha.link/@eanxt/jobs/commercial-sales-meril-guwahati-7f79aba2",
    "https://artha.link/@eanxt/jobs/sde-ii-backend-admaren-tech-kochi-c78f1143",
    "https://artha.link/@eanxt/jobs/technical-writer-proposals-rfp-response-pumex-computing-llc-kochi-5459ee68",
    "https://artha.link/@eanxt/jobs/social-media-editor-the-new-indian-kochi-1303da6a",
    "https://artha.link/@eanxt/jobs/senior-sales-engineer-goose-kochi-b0d63402"
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
