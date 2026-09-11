/**
 * 🚀 Artha Job Recommendation Fetcher (All CPC 0.048 Records, Location: IN)
 * 
 * Fetches ALL available job openings matching filter: cpc_value = 0.048 (Location: "IN")
 * without limiting to arbitrary milestones (e.g. 120).
 * 
 * OUTPUTS:
 *   1. jobs_high_cpc.json  -> Complete metadata list of all CPC 0.048 openings
 *   2. jobs_queue.json     -> Deduplicated array of all apply URLs
 * 
 * USAGE:
 *   node fetch_recommend_jobs.js
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";
const LOCATION_CODE = "IN";
const TARGET_CPC = 0.048;
const PAGE_SIZE = 100;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAllCpcJobs() {
  const validJobs = [];
  const seenSlugs = new Set();
  let page = 1;
  let consecutiveZeroMatches = 0;

  console.log(`\n⏳ Fetching ALL valid records with CPC: ${TARGET_CPC} (Location: ${LOCATION_CODE}, Limit: ${PAGE_SIZE}/page)...`);

  while (page <= 200) {
    const payload = {
      query: "",
      geo_boost: false,
      page: page,
      limit: PAGE_SIZE,
      location: LOCATION_CODE,
      only_enriched: false,
      only_cpa: false,
      categories: [],
      niche_keywords: [],
      sort_by: "high_cpc"
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

      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("Retry-After")) || 5;
        console.log(`  ⏳ Rate limited on page ${page}. Retrying in ${retryAfter}s...`);
        await sleep(retryAfter * 1000);
        continue;
      }

      if (!response.ok) {
        console.error(`❌ HTTP Error ${response.status}: ${response.statusText} on page ${page}`);
        await sleep(2000);
        break;
      }

      const result = await response.json();
      const rawItems = result.items || [];

      if (rawItems.length === 0) {
        console.log(`ℹ️ Reached end of results (empty items array on page ${page}).`);
        break;
      }

      let newValidThisPage = 0;
      for (const item of rawItems) {
        const cpcVal = item.cpc_value !== undefined ? item.cpc_value : null;

        // Filter for cpc_value === 0.048 (or >= 0.048)
        if (cpcVal === null || cpcVal < TARGET_CPC) continue;

        const slug = item.slug || (item.url ? item.url.replace(BASE_JOB_URL, '') : null);
        if (!slug || seenSlugs.has(slug)) continue;

        seenSlugs.add(slug);
        validJobs.push({
          title: item.title,
          company_name: item.company_info?.name || item.company || "Unknown Company",
          apply_link: `${BASE_JOB_URL}${slug}`,
          country: item.country || item.company_info?.country || LOCATION_CODE,
          cpc_value: cpcVal,
          cpa_value: item.cpa_value !== undefined ? item.cpa_value : null
        });
        newValidThisPage++;
      }

      console.log(`  📦 Page ${page}: Received ${rawItems.length} items (${newValidThisPage} new valid CPC ${TARGET_CPC}) | Total unique: ${validJobs.length}`);

      if (newValidThisPage === 0) {
        consecutiveZeroMatches++;
        if (consecutiveZeroMatches >= 3) {
          console.log(`ℹ️ Stopping fetch after 3 consecutive pages with no new unique matching items.`);
          break;
        }
      } else {
        consecutiveZeroMatches = 0;
      }

      page++;
      await sleep(150);
    } catch (err) {
      console.error(`❌ Fetch error on page ${page}:`, err.message);
      break;
    }
  }

  return validJobs;
}

(async () => {
  console.log('======================================================');
  console.log(`🚀 ARTHA JOB FETCHER (ALL CPC ${TARGET_CPC} JOBS - LOCATION: ${LOCATION_CODE})`);
  console.log('======================================================');
  console.log(`📍 Location: ${LOCATION_CODE}`);
  console.log(`💰 Target CPC: >= ${TARGET_CPC}`);
  console.log(`🌐 Endpoint: ${RECOMMEND_API_URL}`);
  console.log('======================================================\n');

  // 1. Fetch ALL CPC jobs matching filter
  const cpcJobs = await fetchAllCpcJobs();

  // 2. Save full records to jobs_high_cpc.json
  const cpcFilePath = path.join(__dirname, 'jobs_high_cpc.json');
  fs.writeFileSync(cpcFilePath, JSON.stringify(cpcJobs, null, 2), 'utf8');

  // 3. Extract unique URLs and save to jobs_queue.json
  const queueUrls = cpcJobs.map(j => j.apply_link).filter(Boolean);
  const queueFilePath = path.join(__dirname, 'jobs_queue.json');
  fs.writeFileSync(queueFilePath, JSON.stringify(queueUrls, null, 2), 'utf8');

  // 4. Clean up any obsolete temporary / legacy files
  const obsoleteFiles = [
    'jobs_high_cpc_120.json',
    'jobs_high_cpa_120.json',
    'jobs_recommend_160.json',
    'data_recommend_80.json',
    'jobs_recommend_queue.json',
    'jobs_recommend_minimal.json',
    'jobs_high_cpc_minimal.json',
    'jobs_high_cpa_minimal.json'
  ];
  for (const f of obsoleteFiles) {
    const p = path.join(__dirname, f);
    if (fs.existsSync(p)) {
      try { fs.unlinkSync(p); } catch (e) {}
    }
  }

  // 5. Update embedded DEFAULT_QUEUE in auto_applier.js and global_applier.js
  try {
    const autoApplierPath = path.join(__dirname, 'auto_applier.js');
    if (fs.existsSync(autoApplierPath)) {
      let autoApplier = fs.readFileSync(autoApplierPath, 'utf8');
      const queueFormatted = '  const DEFAULT_QUEUE = ' + JSON.stringify(queueUrls, null, 2).split('\n').map((line, idx) => idx === 0 ? line : '  ' + line).join('\n') + ';';
      autoApplier = autoApplier.replace(/  const DEFAULT_QUEUE = \[\s*[\s\S]*?\s*\];/, queueFormatted);
      fs.writeFileSync(autoApplierPath, autoApplier, 'utf8');
      console.log(`✅ Embedded ${queueUrls.length} URLs into auto_applier.js`);
    }

    const globalApplierPath = path.join(__dirname, 'global-applier', 'global_applier.js');
    if (fs.existsSync(globalApplierPath)) {
      let globalApplier = fs.readFileSync(globalApplierPath, 'utf8');
      const queueFormatted = '  const DEFAULT_QUEUE = ' + JSON.stringify(queueUrls, null, 2).split('\n').map((line, idx) => idx === 0 ? line : '  ' + line).join('\n') + ';';
      globalApplier = globalApplier.replace(/  const DEFAULT_QUEUE = \[\s*[\s\S]*?\s*\];/, queueFormatted);
      fs.writeFileSync(globalApplierPath, globalApplier, 'utf8');
      console.log(`✅ Embedded ${queueUrls.length} URLs into global_applier.js`);
    }
  } catch (syncErr) {
    console.warn('⚠️ Notice during queue sync:', syncErr.message);
  }

  console.log('\n======================================================');
  console.log('🎉 FETCH & SYNC COMPLETED SUCCESSFULLY');
  console.log('======================================================');
  console.log(`📁 CPC File:  jobs_high_cpc.json (${cpcJobs.length} records, ${(fs.statSync(cpcFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`📁 Queue File: jobs_queue.json (${queueUrls.length} unique URLs, ${(fs.statSync(queueFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log('======================================================\n');
})();
