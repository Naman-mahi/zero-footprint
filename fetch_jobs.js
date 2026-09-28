/**
 * 🚀 Artha Job Recommendation Fetcher (Fresh Active Jobs)
 * 
 * Fetches available real-time job openings from the recommendation feed
 * without any CPC filtering.
 * 
 * OUTPUTS:
 *   1. jobs.json        -> Complete metadata list of fetched openings
 *   2. jobs_queue.json  -> Deduplicated array of all apply URLs
 * 
 * USAGE:
 *   node fetch_recommend_jobs.js [maxPages] [pageSize] [location]
 * 
 * EXAMPLES:
 *   node fetch_recommend_jobs.js 25 100 IN
 *   node fetch_recommend_jobs.js 10 100
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

const MAX_PAGES = Number(process.argv[2] || 25);
const PAGE_SIZE = Number(process.argv[3] || 100);
const LOCATION_CODE = (process.argv[4] || "IN").toUpperCase();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJobs() {
  const allJobs = [];
  const seenSlugs = new Set();
  let page = 1;
  let consecutiveZeroMatches = 0;

  console.log(`\n⏳ Fetching fresh jobs (Location: ${LOCATION_CODE}, Limit: ${PAGE_SIZE}/page, Max Pages: ${MAX_PAGES})...`);

  while (page <= MAX_PAGES) {
    const payload = {
      query: "",
      geo_boost: false,
      page: page,
      limit: PAGE_SIZE,
      location: LOCATION_CODE,
      only_enriched: false,
      only_cpa: false,
      categories: [],
      niche_keywords: []
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
        const slug = item.slug || (item.url ? item.url.replace(BASE_JOB_URL, '') : null);
        if (!slug || seenSlugs.has(slug)) continue;

        seenSlugs.add(slug);
        allJobs.push({
          id: item.id,
          title: item.title,
          slug: slug,
          company_name: item.company_info?.name || item.company || "Unknown Company",
          apply_link: `${BASE_JOB_URL}${slug}`,
          country: item.country || item.company_info?.country || LOCATION_CODE,
          city: item.city || null,
          job_type: item.job_type || null,
          work_mode: item.work_mode || null,
          salary_min: item.salary_min || null,
          salary_max: item.salary_max || null,
          salary_curr: item.salary_curr || null,
          posted_date: item.posted_date || null
        });
        newValidThisPage++;
      }

      console.log(`  📦 Page ${page}: Received ${rawItems.length} items (${newValidThisPage} new unique) | Total collected: ${allJobs.length}`);

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
      await sleep(200);
    } catch (err) {
      console.error(`❌ Fetch error on page ${page}:`, err.message);
      break;
    }
  }

  return allJobs;
}

(async () => {
  console.log('======================================================');
  console.log(`🚀 ARTHA JOB FETCHER (LOCATION: ${LOCATION_CODE})`);
  console.log('======================================================');
  console.log(`📍 Location: ${LOCATION_CODE}`);
  console.log(`📄 Max Pages: ${MAX_PAGES}`);
  console.log(`📦 Page Size: ${PAGE_SIZE}`);
  console.log(`🌐 Endpoint: ${RECOMMEND_API_URL}`);
  console.log('======================================================\n');

  // 1. Fetch fresh jobs
  const jobs = await fetchJobs();

  if (jobs.length === 0) {
    console.error('❌ No jobs found or network error occurred.');
    process.exit(1);
  }

  // 2. Save full records to jobs.json
  const jobsFilePath = path.join(__dirname, 'jobs.json');
  fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf8');

  // 3. Extract unique URLs and save to jobs_queue.json
  const queueUrls = jobs.map(j => j.apply_link).filter(Boolean);
  const queueFilePath = path.join(__dirname, 'jobs_queue.json');
  fs.writeFileSync(queueFilePath, JSON.stringify(queueUrls, null, 2), 'utf8');

  // 4. Update embedded DEFAULT_QUEUE in auto_applier.js and global_applier.js
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
  console.log(`📁 Jobs Metadata: jobs.json (${jobs.length} records, ${(fs.statSync(jobsFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`📁 Jobs Queue:    jobs_queue.json (${queueUrls.length} unique URLs, ${(fs.statSync(queueFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log('======================================================\n');
})();
