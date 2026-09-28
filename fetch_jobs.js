/**
 * 🚀 Artha High-CPC Job Fetcher (cpc_value = 0.048)
 * 
 * Uses geo_boost=true to activate the pulse_boost algorithm, fetching
 * all active job openings with cpc_value = 0.048 across major tech hubs.
 * 
 * OUTPUTS:
 *   1. jobs.json        -> Full metadata records including cpc_value: 0.048
 *   2. jobs_queue.json  -> Deduplicated array of 0.048 CPC application URLs
 *   3. auto_applier.js  -> Directly populates DEFAULT_QUEUE with the High-CPC links
 * 
 * USAGE:
 *   npm run fetch
 *   node fetch_jobs.js
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";
const TARGET_CPC = 0.048;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchHighCpcJobs() {
  const seenSlugs = new Set();
  const allJobs = [];

  async function queryBatch(payload, label = "") {
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
        await sleep(retryAfter * 1000);
        return;
      }

      if (!response.ok) return;

      const result = await response.json();
      const rawItems = result.items || [];
      let newCount = 0;

      for (const item of rawItems) {
        if (item.cpc_value !== TARGET_CPC) continue;
        const slug = item.slug || (item.url ? item.url.replace(BASE_JOB_URL, '') : null);
        if (!slug || seenSlugs.has(slug)) continue;

        seenSlugs.add(slug);
        allJobs.push({
          id: item.id,
          title: item.title,
          slug: slug,
          company_name: item.company_info?.name || item.company || "Unknown Company",
          apply_link: `${BASE_JOB_URL}${slug}`,
          country: item.country || item.company_info?.country || "IN",
          city: item.city || null,
          cpc_value: item.cpc_value,
          job_type: item.job_type || null,
          work_mode: item.work_mode || null,
          posted_date: item.posted_date || null
        });
        newCount++;
      }

      if (newCount > 0) {
        console.log(`  📦 [${label}] Added ${newCount} new CPC 0.048 jobs | Total unique: ${allJobs.length}`);
      }
      await sleep(120);
    } catch (e) {}
  }

  console.log(`\n⏳ Phase 1: Fetching core catalog with geo_boost=true...`);
  for (let page = 1; page <= 8; page++) {
    await queryBatch({ query: "", page, limit: 100, geo_boost: true }, `Core Page ${page}`);
  }

  console.log(`\n⏳ Phase 2: Fetching regional hub catalogs...`);
  const hubs = [
    'Bengaluru', 'Mumbai', 'Hyderabad', 'Pune',
    'Chennai', 'Delhi', 'Noida', 'Gurugram',
    'Kolkata', 'Ahmedabad', 'Jaipur', 'Kochi'
  ];

  for (const hub of hubs) {
    for (let page = 1; page <= 3; page++) {
      await queryBatch({ query: hub, page, limit: 100, geo_boost: true }, `${hub} P${page}`);
    }
  }

  return allJobs;
}

(async () => {
  console.log('======================================================');
  console.log(`🚀 ARTHA HIGH-CPC FETCHER (TARGET CPC: ${TARGET_CPC})`);
  console.log('======================================================\n');

  const startTime = Date.now();
  const jobs = await fetchHighCpcJobs();

  if (jobs.length === 0) {
    console.error('❌ No CPC 0.048 jobs found.');
    process.exit(1);
  }

  // 1. Save metadata list
  const jobsFilePath = path.join(__dirname, 'jobs.json');
  fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf8');

  // 2. Save deduplicated URL queue
  const queueUrls = jobs.map(j => j.apply_link).filter(Boolean);
  const queueFilePath = path.join(__dirname, 'jobs_queue.json');
  fs.writeFileSync(queueFilePath, JSON.stringify(queueUrls, null, 2), 'utf8');

  // 3. Sync directly into auto_applier.js
  try {
    const autoApplierPath = path.join(__dirname, 'auto_applier.js');
    if (fs.existsSync(autoApplierPath)) {
      let autoApplier = fs.readFileSync(autoApplierPath, 'utf8');
      const queueFormatted = '  const DEFAULT_QUEUE = ' + JSON.stringify(queueUrls, null, 2).split('\n').map((line, idx) => idx === 0 ? line : '  ' + line).join('\n') + ';';
      autoApplier = autoApplier.replace(/  const DEFAULT_QUEUE = \[\s*[\s\S]*?\s*\];/, queueFormatted);
      // Update comment count
      autoApplier = autoApplier.replace(/📋 EMBEDDED JOB URL QUEUE \([^)]*\)/, `📋 EMBEDDED JOB URL QUEUE (${queueUrls.length} Openings, CPC: 0.048)`);
      fs.writeFileSync(autoApplierPath, autoApplier, 'utf8');
      console.log(`✅ Synced ${queueUrls.length} High-CPC URLs into auto_applier.js`);
    }
  } catch (syncErr) {
    console.warn('⚠️ Notice during queue sync:', syncErr.message);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n======================================================');
  console.log('🎉 HIGH-CPC FETCH & SYNC COMPLETED');
  console.log('======================================================');
  console.log(`⏱️ Time:          ${elapsed}s`);
  console.log(`💎 High-CPC Jobs: ${jobs.length} records (All cpc_value: ${TARGET_CPC})`);
  console.log(`📁 Metadata File: jobs.json (${(fs.statSync(jobsFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`📁 Queue File:    jobs_queue.json (${(fs.statSync(queueFilePath).size / 1024).toFixed(1)} KB)`);
  console.log('======================================================\n');
})();
