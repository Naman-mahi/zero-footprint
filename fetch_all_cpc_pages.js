/**
 * 🚀 Artha Deep Catalog Fetcher (sort_by: "high_cpc" - Up to 3,000 Pages)
 * 
 * Fetches all available records with sort_by: "high_cpc" across up to 3,000 pages
 * and saves them into a separate dedicated JSON file.
 * 
 * OUTPUTS:
 *   - jobs_all_high_cpc.json        -> Full metadata array of all fetched items
 *   - jobs_all_high_cpc_queue.json  -> Deduplicated array of apply URLs
 * 
 * USAGE:
 *   node fetch_all_cpc_pages.js [maxPages] [pageSize] [location]
 * 
 * EXAMPLES:
 *   node fetch_all_cpc_pages.js 3000 100 IN
 *   node fetch_all_cpc_pages.js 3000 25 IN
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

const MAX_PAGES = Number(process.argv[2] || 3000);
const PAGE_SIZE = Number(process.argv[3] || 100);
const LOCATION_CODE = (process.argv[4] || "IN").toUpperCase();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchAllHighCpcPages() {
  const allJobs = [];
  const seenSlugs = new Set();
  let page = 1;
  let consecutiveZeroMatches = 0;
  let totalApiItemsReceived = 0;

  console.log('======================================================');
  console.log('🚀 ARTHA DEEP CATALOG FETCHER: HIGH CPC');
  console.log('======================================================');
  console.log(`📍 Location:      ${LOCATION_CODE}`);
  console.log(`🎯 Sort By:       high_cpc`);
  console.log(`📄 Max Pages:     ${MAX_PAGES}`);
  console.log(`📦 Page Size:     ${PAGE_SIZE} items/request`);
  console.log(`🌐 Endpoint:      ${RECOMMEND_API_URL}`);
  console.log('======================================================\n');

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
        console.log(`  ⏳ Rate limited on page ${page}. Waiting ${retryAfter}s...`);
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
      totalApiItemsReceived += rawItems.length;

      if (rawItems.length === 0) {
        console.log(`ℹ️ API returned empty items array on page ${page}. Finished catalog traversal.`);
        break;
      }

      let newThisPage = 0;
      for (const item of rawItems) {
        const slug = item.slug || (item.url ? item.url.replace(BASE_JOB_URL, '') : null);
        if (!slug || seenSlugs.has(slug)) continue;

        seenSlugs.add(slug);
        allJobs.push({
          title: item.title,
          company_name: item.company_info?.name || item.company || "Unknown Company",
          apply_link: `${BASE_JOB_URL}${slug}`,
          country: item.country || item.company_info?.country || LOCATION_CODE,
          cpc_value: item.cpc_value !== undefined ? item.cpc_value : null,
          cpa_value: item.cpa_value !== undefined ? item.cpa_value : null,
          page_fetched: page
        });
        newThisPage++;
      }

      if (page % 10 === 0 || page === 1 || newThisPage < rawItems.length) {
        console.log(`  📦 Page ${page}/${MAX_PAGES}: Received ${rawItems.length} items (${newThisPage} new unique) | Total unique: ${allJobs.length} | API items: ${totalApiItemsReceived}`);
      }

      if (newThisPage === 0) {
        consecutiveZeroMatches++;
        if (consecutiveZeroMatches >= 5) {
          console.log(`ℹ️ Stopping after 5 consecutive pages with 0 new unique items (exhausted all available unique records).`);
          break;
        }
      } else {
        consecutiveZeroMatches = 0;
      }

      // Checkpoint save every 500 pages for safety
      if (page % 500 === 0 && allJobs.length > 0) {
        const tempPath = path.join(__dirname, 'jobs_all_high_cpc.json');
        fs.writeFileSync(tempPath, JSON.stringify(allJobs, null, 2), 'utf8');
        console.log(`💾 [Checkpoint] Saved ${allJobs.length} records to disk.`);
      }

      page++;
      await sleep(100);
    } catch (err) {
      console.error(`❌ Network error on page ${page}:`, err.message);
      await sleep(2000);
      page++;
    }
  }

  return allJobs;
}

(async () => {
  const startTime = Date.now();
  const jobs = await fetchAllHighCpcPages();

  // 1. Save all jobs metadata to separate file
  const fullOutputFilename = 'jobs_all_high_cpc.json';
  const fullOutputPath = path.join(__dirname, fullOutputFilename);
  fs.writeFileSync(fullOutputPath, JSON.stringify(jobs, null, 2), 'utf8');

  // 2. Save deduplicated apply URLs to separate queue file
  const queueOutputFilename = 'jobs_all_high_cpc_queue.json';
  const queueOutputPath = path.join(__dirname, queueOutputFilename);
  const queueUrls = jobs.map(j => j.apply_link).filter(Boolean);
  fs.writeFileSync(queueOutputPath, JSON.stringify(queueUrls, null, 2), 'utf8');

  const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
  const fullSizeMb = (fs.statSync(fullOutputPath).size / (1024 * 1024)).toFixed(2);
  const queueSizeMb = (fs.statSync(queueOutputPath).size / (1024 * 1024)).toFixed(2);

  console.log('\n======================================================');
  console.log('🎉 DEEP HIGH-CPC FETCH COMPLETED');
  console.log('======================================================');
  console.log(`⏱️ Time Elapsed:     ${elapsedSec}s`);
  console.log(`📁 Metadata File:    ${fullOutputFilename} (${jobs.length} records, ${fullSizeMb} MB)`);
  console.log(`📁 URL Queue File:   ${queueOutputFilename} (${queueUrls.length} unique URLs, ${queueSizeMb} MB)`);
  console.log('======================================================\n');
})();
