/**
 * 🚀 US High-CPC Job Fetcher (Strict Pure-CPC Edition)
 * 
 * Target: United States High-CPC Job Openings (STRICTLY cpc_value > 0)
 * API: https://my.artha.link/api/job-api/recommend?pulse_variant=control
 * 
 * GUARANTEES:
 *   - 100% Pure CPC: Every single job opening has a verified cpc_value > 0.
 *   - Zero 0/null/CPA-only jobs: All non-CPC or 0-CPC listings are strictly discarded.
 *   - Complete Cache Wipe: Removes all previous old job caches before syncing.
 *   - Sorted Highest CPC First: From $1.75+ down to top tier.
 * 
 * OUTPUTS:
 *   1. us/jobs.json        -> Full metadata records (only cpc_value > 0)
 *   2. us/jobs_queue.json  -> Deduplicated array of pure-CPC US apply URLs
 *   3. us/auto_applier.js  -> Directly replaces DEFAULT_QUEUE in US Auto-Applier
 * 
 * USAGE:
 *   node us/fetch_jobs.js
 *   npm run fetch:us
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

const USER_NICHE_KEYWORDS = [
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchUsPureCpcJobs() {
  const seenSlugs = new Set();
  const allJobs = [];

  async function queryBatch(payload, label = "") {
    try {
      const response = await fetch(RECOMMEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("Retry-After")) || 5;
        console.warn(`  ⚠️ Rate limited. Waiting ${retryAfter}s...`);
        await sleep(retryAfter * 1000);
        return;
      }

      if (!response.ok) {
        console.warn(`  ⚠️ API returned status ${response.status} for ${label}`);
        return;
      }

      const result = await response.json();
      const rawItems = result.items || [];
      let newCount = 0;

      for (const item of rawItems) {
        // STRICT FILTER 1: Must have a strictly positive CPC value (No 0, null, or CPA-only)
        if (typeof item.cpc_value !== "number" || item.cpc_value <= 0) continue;

        // STRICT FILTER 2: Confirm US location
        const isUS = item.country === "US" || 
                     item.company_info?.country === "United States" || 
                     item.company_info?.country === "US" ||
                     (!["IN", "GB", "CA", "AU"].includes(item.country) && item.salary_curr === "USD");

        if (!isUS) continue;

        const titleLower = (item.title || "").toLowerCase();
        const compLower = (item.company || item.company_info?.name || "").toLowerCase();

        // Anti-Spam: Exclude all trucking, CDL, driver, freight, and Mesilla Valley listings
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

        const slug = item.slug || (item.url ? item.url.replace(BASE_JOB_URL, '') : null);
        if (!slug || seenSlugs.has(slug)) continue;

        seenSlugs.add(slug);
        allJobs.push({
          id: item.id || null,
          title: item.title,
          slug: slug,
          company_name: item.company_info?.name || item.company || "Unknown Company",
          apply_link: `${BASE_JOB_URL}${slug}`,
          country: "US",
          city: item.city || null,
          state: item.state || null,
          cpc_value: item.cpc_value,
          cpa_value: item.cpa_value || null,
          salary_min: item.salary_min || null,
          salary_max: item.salary_max || null,
          salary_curr: item.salary_curr || "USD",
          salary_unit: item.salary_unit || null,
          job_type: item.job_type || null,
          work_mode: item.work_mode || null,
          category: item.category || [],
          posted_date: item.posted_date || null
        });
        newCount++;
      }

      if (newCount > 0) {
        console.log(`  📦 [${label}] Added ${newCount} pure-CPC jobs | Total unique: ${allJobs.length}`);
      }
      await sleep(120);
    } catch (e) {
      console.warn(`  ⚠️ Query failed for ${label}:`, e.message);
    }
  }

  // Phase 1: Targeted Technology-Software Niche Keywords (only_cpc: true)
  console.log(`\n⏳ Phase 1: Fetching US Tech/Cloud/Security Niche Keywords (Strictly CPC > 0)...`);
  for (let page = 1; page <= 3; page++) {
    await queryBatch({
      query: "",
      geo_boost: false,
      page: page,
      limit: 100,
      location: "US",
      only_enriched: false,
      only_cpa: false,
      only_cpc: true,
      categories: ["technology-software"],
      niche_keywords: USER_NICHE_KEYWORDS,
      sort_by: "high_cpc"
    }, `Tech Niche Page ${page}`);
  }

  // Phase 2: Top-Tier High CPC US Catalog across pages 1 to 25 (Strictly CPC > 0)
  console.log(`\n⏳ Phase 2: Fetching Top-Tier High CPC US Catalog (Pages 1–25, Strictly CPC > 0)...`);
  for (let page = 1; page <= 25; page++) {
    await queryBatch({
      query: "",
      geo_boost: false,
      page: page,
      limit: 100,
      location: "US",
      only_enriched: false,
      only_cpa: false,
      only_cpc: true,
      sort_by: "high_cpc"
    }, `Top US Pure-CPC Page ${page}`);
  }

  // Phase 3: Major US Metro Hubs (Strictly CPC > 0)
  console.log(`\n⏳ Phase 3: Fetching Major US Metro Hubs (Strictly CPC > 0)...`);
  const usHubs = [
    "New York", "San Francisco", "Seattle", "Austin",
    "Los Angeles", "Chicago", "Boston", "Denver",
    "Atlanta", "Dallas", "Miami", "San Jose"
  ];

  for (const hub of usHubs) {
    for (let page = 1; page <= 2; page++) {
      await queryBatch({
        query: hub,
        geo_boost: false,
        page: page,
        limit: 100,
        location: "US",
        only_enriched: false,
        only_cpa: false,
        only_cpc: true,
        sort_by: "high_cpc"
      }, `${hub} P${page}`);
    }
  }

  // Sort strictly by CPC descending (highest CPC first)
  allJobs.sort((a, b) => b.cpc_value - a.cpc_value);

  return allJobs;
}

(async () => {
  console.log('======================================================');
  console.log('🚀 ARTHA US PURE-CPC FETCHER (ZERO 0-CPC / HIGHEST FIRST)');
  console.log('======================================================\n');

  const usDir = __dirname;
  const jobsFilePath = path.join(usDir, 'jobs.json');
  const queueFilePath = path.join(usDir, 'jobs_queue.json');

  // 1. Remove all old cached files first
  if (fs.existsSync(jobsFilePath)) {
    fs.unlinkSync(jobsFilePath);
    console.log('🧹 Removed old us/jobs.json cache.');
  }
  if (fs.existsSync(queueFilePath)) {
    fs.unlinkSync(queueFilePath);
    console.log('🧹 Removed old us/jobs_queue.json cache.');
  }

  const startTime = Date.now();
  const jobs = await fetchUsPureCpcJobs();

  if (jobs.length === 0) {
    console.error('❌ No pure CPC US jobs found.');
    process.exit(1);
  }

  // Double check: zero non-CPC items allowed
  const invalidItems = jobs.filter(j => typeof j.cpc_value !== 'number' || j.cpc_value <= 0);
  if (invalidItems.length > 0) {
    console.error(`🚨 Fatal: Found ${invalidItems.length} items without positive CPC! Aborting.`);
    process.exit(1);
  }

  // 2. Save fresh pure-CPC metadata list
  fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf8');

  // 3. Save fresh pure-CPC deduplicated URL queue
  const queueUrls = jobs.map(j => j.apply_link).filter(Boolean);
  fs.writeFileSync(queueFilePath, JSON.stringify(queueUrls, null, 2), 'utf8');

  // 4. us/auto_applier.js operates in Live Dynamic Fetcher mode (zero hardcoded links)
  console.log('💡 Note: us/auto_applier.js operates in Live Dynamic Fetcher mode (zero hardcoded links in code).');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const maxCpc = jobs[0]?.cpc_value ? `$${jobs[0].cpc_value.toFixed(3)}` : 'N/A';
  const minCpc = jobs[jobs.length - 1]?.cpc_value ? `$${jobs[jobs.length - 1].cpc_value.toFixed(3)}` : 'N/A';
  const medianCpc = jobs[Math.floor(jobs.length / 2)]?.cpc_value ? `$${jobs[Math.floor(jobs.length / 2)].cpc_value.toFixed(3)}` : 'N/A';

  console.log('\n======================================================');
  console.log('🎉 US PURE-CPC FETCH & SYNC COMPLETED');
  console.log('======================================================');
  console.log(`⏱️ Time:          ${elapsed}s`);
  console.log(`💎 Pure-CPC Jobs: ${jobs.length} records (100% CPC > 0)`);
  console.log(`💰 Highest CPC:   ${maxCpc}`);
  console.log(`📊 Lowest CPC:    ${minCpc}`);
  console.log(`📈 Median CPC:    ${medianCpc}`);
  console.log(`📁 Metadata File: us/jobs.json (${(fs.statSync(jobsFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`📁 Queue File:    us/jobs_queue.json (${(fs.statSync(queueFilePath).size / 1024).toFixed(1)} KB)`);
  console.log('======================================================\n');
})();
