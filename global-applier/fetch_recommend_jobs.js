/**
 * 🚀 Artha Job Recommendation Fetcher (160 Sorted Records)
 * 
 * Fetches 80 records for sort_by="high_cpc" and 80 records for sort_by="high_cpa",
 * sorts all 160 records by the highest cpc_value / cpa_value descending,
 * and outputs ONLY ONE clean JSON file (jobs_recommend_160.json).
 * 
 * USAGE:
 *   node fetch_recommend_jobs.js [location] [outputFile]
 * 
 * EXAMPLE:
 *   node fetch_recommend_jobs.js IN jobs_recommend_160.json
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

const DEFAULT_NICHE_KEYWORDS = [
  "cloud security engineer",
  "devsecops engineer",
  "application security engineer",
  "security operations analyst",
  "site reliability engineer",
  "cloud infrastructure engineer",
  "platform engineer",
  "aws devops engineer",
  "kubernetes engineer",
  "security engineer",
  "e-commerce platform engineer",
  "cloud systems administrator",
  "incident response analyst",
  "security automation engineer",
  "cloud network engineer",
  "aws",
  "azure",
  "gcp",
  "kubernetes",
  "docker",
  "terraform",
  "jenkins",
  "ci cd",
  "infrastructure as code",
  "cloud security",
  "devsecops",
  "siem",
  "splunk",
  "identity access management",
  "vulnerability management",
  "incident response",
  "network security",
  "zero trust",
  "container security",
  "linux administration",
  "python scripting",
  "e-commerce platforms",
  "api security",
  "security monitoring",
  "cloud architecture"
];

const locationCode = (process.argv[2] || 'IN').toUpperCase();
const outputFileName = process.argv[3] || 'jobs_recommend_160.json';
const targetCountPerSort = 80;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchRecommendJobs(sortByMode, targetCount = 80) {
  const items = [];
  let page = 1;
  const pageSize = 25;

  console.log(`\n⏳ Fetching ${targetCount} records for sort_by="${sortByMode}" (Location: ${locationCode})...`);

  while (items.length < targetCount) {
    const remaining = targetCount - items.length;
    const limit = Math.min(pageSize, remaining);

    const payload = {
      query: "",
      geo_boost: false,
      page: page,
      limit: limit,
      location: locationCode,
      only_enriched: false,
      only_cpa: false,
      categories: ["technology-software"],
      niche_keywords: DEFAULT_NICHE_KEYWORDS,
      sort_by: sortByMode
    };

    try {
      const response = await fetch(RECOMMEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`❌ HTTP Error ${response.status}: ${response.statusText} on page ${page}`);
        await sleep(2000);
        break;
      }

      const result = await response.json();
      const rawItems = result.items || [];

      if (rawItems.length === 0) {
        console.log(`ℹ️ No more items returned at page ${page}.`);
        break;
      }

      for (const item of rawItems) {
        if (items.length >= targetCount) break;

        items.push({
          title: item.title,
          company_name: item.company_info?.name || item.company || "Unknown Company",
          apply_link: item.slug ? `${BASE_JOB_URL}${item.slug}` : (item.url || null),
          cpc_value: item.cpc_value !== undefined ? item.cpc_value : null,
          cpa_value: item.cpa_value !== undefined ? item.cpa_value : null
        });
      }

      console.log(`  📦 Page ${page}: Received ${rawItems.length} items | Total fetched: ${items.length}/${targetCount}`);

      page++;
      await sleep(300);
    } catch (err) {
      console.error(`❌ Fetch error on page ${page}:`, err.message);
      break;
    }
  }

  return items;
}

(async () => {
  console.log('======================================================');
  console.log('🚀 ARTHA RECOMMENDATION JOB FETCHER (SINGLE 160 SORTED FILE)');
  console.log('======================================================');
  console.log(`📍 Location: ${locationCode}`);
  console.log(`🌐 Endpoint: ${RECOMMEND_API_URL}`);
  console.log('======================================================\n');

  // 1. Fetch 80 records for sort_by = "high_cpc"
  const cpcJobs = await fetchRecommendJobs("high_cpc", targetCountPerSort);

  // 2. Fetch 80 records for sort_by = "high_cpa"
  const cpaJobs = await fetchRecommendJobs("high_cpa", targetCountPerSort);

  // Combine all 160 items
  const allItems = [...cpcJobs, ...cpaJobs];

  // Sort descending by highest value (cpc_value or cpa_value)
  allItems.sort((a, b) => {
    const aVal = Math.max(a.cpc_value || 0, a.cpa_value || 0);
    const bVal = Math.max(b.cpc_value || 0, b.cpa_value || 0);
    return bVal - aVal;
  });

  // Write ONLY ONE single output file
  const mainOutputPath = path.isAbsolute(outputFileName)
    ? outputFileName
    : path.join(__dirname, outputFileName);

  fs.writeFileSync(mainOutputPath, JSON.stringify(allItems, null, 2), 'utf8');

  // Clean up any old multi-file outputs if they exist
  const cleanupFiles = [
    'data_recommend_80.json',
    'jobs_recommend_queue.json',
    'jobs_recommend_minimal.json',
    'jobs_high_cpc_minimal.json',
    'jobs_high_cpa_minimal.json'
  ];

  for (const f of cleanupFiles) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch (e) {}
    }
  }

  console.log('\n======================================================');
  console.log('🎉 FETCH COMPLETED & SORTED SUCCESSFULLY');
  console.log('======================================================');
  console.log(`✨ Total Records:   ${allItems.length} records`);
  console.log(`📊 Sorted By:       Highest cpc_value & cpa_value (Descending)`);
  console.log(`📁 Single File:     ${path.basename(mainOutputPath)} (${(fs.statSync(mainOutputPath).size / 1024).toFixed(1)} KB)`);
  console.log('======================================================\n');
})();
