/**
 * 🚀 Artha Job Recommendation Fetcher (Location: IN Only)
 * 
 * Strictly uses location="IN" to fetch:
 *   1. High CPC records with non-null cpc_value -> saved to jobs_high_cpc_120.json (sorted descending)
 *   2. High CPA records with non-null cpa_value -> saved to jobs_high_cpa_120.json (sorted descending)
 * 
 * Each item contains minimal short fields:
 *   - title
 *   - company_name
 *   - apply_link
 *   - cpc_value
 *   - cpa_value
 * 
 * USAGE:
 *   node fetch_recommend_jobs.js
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";
const LOCATION_CODE = "IN";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch records for CPC or CPA mode for location="IN"
 */
async function fetchValidJobsForIndia(mode, targetCount = 120) {
  const isCpa = mode === 'cpa';
  const validItems = [];
  let page = 1;
  const pageSize = 25;
  let zeroMatchPages = 0;

  console.log(`\n⏳ Fetching valid records for High ${mode.toUpperCase()} (Location: ${LOCATION_CODE}, Target: ${targetCount})...`);

  while (validItems.length < targetCount && page <= 30) {
    const payload = {
      query: "",
      geo_boost: false,
      page: page,
      limit: pageSize,
      location: LOCATION_CODE,
      only_enriched: false,
      only_cpa: isCpa,
      categories: [],
      niche_keywords: [],
      sort_by: isCpa ? "high_cpa" : "high_cpc"
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

      if (rawItems.length === 0) break;

      let addedThisPage = 0;
      for (const item of rawItems) {
        if (validItems.length >= targetCount) break;

        const cpcVal = item.cpc_value !== undefined ? item.cpc_value : null;
        const cpaVal = item.cpa_value !== undefined ? item.cpa_value : null;

        // Ensure non-null value for target mode
        if (isCpa && cpaVal === null) continue;
        if (!isCpa && cpcVal === null) continue;

        validItems.push({
          title: item.title,
          company_name: item.company_info?.name || item.company || "Unknown Company",
          apply_link: item.slug ? `${BASE_JOB_URL}${item.slug}` : (item.url || null),
          country: item.country || item.company_info?.country || LOCATION_CODE,
          cpc_value: cpcVal,
          cpa_value: cpaVal
        });
        addedThisPage++;
      }

      console.log(`  📦 Page ${page}: Received ${rawItems.length} items (${addedThisPage} valid ${mode.toUpperCase()}) | Total valid: ${validItems.length}`);

      if (addedThisPage === 0) {
        zeroMatchPages++;
        if (zeroMatchPages >= 2) {
          console.log(`ℹ️ Stopping fetch for ${mode.toUpperCase()} after 2 consecutive pages with no additional valid ${mode.toUpperCase()} items.`);
          break;
        }
      } else {
        zeroMatchPages = 0;
      }

      page++;
      await sleep(250);
    } catch (err) {
      console.error(`❌ Fetch error on page ${page}:`, err.message);
      break;
    }
  }

  // Sort descending by highest value
  validItems.sort((a, b) => {
    const valA = isCpa ? (a.cpa_value || 0) : (a.cpc_value || 0);
    const valB = isCpa ? (b.cpa_value || 0) : (b.cpc_value || 0);
    return valB - valA;
  });

  return validItems;
}

(async () => {
  console.log('======================================================');
  console.log(`🚀 ARTHA JOB FETCHER (LOCATION: ${LOCATION_CODE} ONLY)`);
  console.log('======================================================');
  console.log(`📍 Location: ${LOCATION_CODE}`);
  console.log(`🌐 Endpoint: ${RECOMMEND_API_URL}`);
  console.log('======================================================\n');

  // 1. Fetch High CPC jobs for location="IN"
  const cpcJobs = await fetchValidJobsForIndia('cpc', 120);

  // 2. Fetch High CPA jobs for location="IN"
  const cpaJobs = await fetchValidJobsForIndia('cpa', 120);

  // Save to two separate files
  const cpcFilePath = path.join(__dirname, 'jobs_high_cpc_120.json');
  const cpaFilePath = path.join(__dirname, 'jobs_high_cpa_120.json');

  fs.writeFileSync(cpcFilePath, JSON.stringify(cpcJobs, null, 2), 'utf8');
  fs.writeFileSync(cpaFilePath, JSON.stringify(cpaJobs, null, 2), 'utf8');

  // Clean up any old files
  const oldFiles = [
    'jobs_recommend_160.json',
    'data_recommend_80.json',
    'jobs_recommend_queue.json',
    'jobs_recommend_minimal.json',
    'jobs_high_cpc_minimal.json',
    'jobs_high_cpa_minimal.json'
  ];
  for (const f of oldFiles) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch (e) {}
    }
  }

  console.log('\n======================================================');
  console.log('🎉 FETCH COMPLETED SUCCESSFULLY');
  console.log('======================================================');
  console.log(`📁 High CPC File: jobs_high_cpc_120.json (${cpcJobs.length} records, ${(fs.statSync(cpcFilePath).size / 1024).toFixed(1)} KB)`);
  console.log(`📁 High CPA File: jobs_high_cpa_120.json (${cpaJobs.length} records, ${(fs.statSync(cpaFilePath).size / 1024).toFixed(1)} KB)`);
  console.log('======================================================\n');
})();
