/**
 * 🚀 US High-CPC Job Fetcher (Pulse Variant: Control)
 * 
 * Target: United States High-CPC Job Openings
 * API: https://my.artha.link/api/job-api/recommend?pulse_variant=control
 * 
 * Fetches:
 *   1. Targeted High-CPC Tech / Cloud / Security / DevOps jobs using specialized niche keywords
 *   2. Top High-CPC US Openings across the entire catalog (CPCs up to $1.75+)
 *   3. Sorts all records strictly in descending order of CPC (Highest CPC First!)
 * 
 * OUTPUTS:
 *   1. us/jobs.json        -> Full metadata records including cpc_value
 *   2. us/jobs_queue.json  -> Deduplicated array of US apply URLs (Highest CPC first)
 *   3. us/auto_applier.js  -> Directly populates DEFAULT_QUEUE in the US Auto-Applier
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

async function fetchUsHighCpcJobs() {
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
        // Confirm US location
        const isUS = item.country === "US" || 
                     item.company_info?.country === "United States" || 
                     item.company_info?.country === "US" ||
                     (!["IN", "GB", "CA", "AU"].includes(item.country) && item.salary_curr === "USD");

        if (!isUS) continue;

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
          cpc_value: typeof item.cpc_value === "number" ? item.cpc_value : 0,
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
        console.log(`  📦 [${label}] Added ${newCount} jobs | Total unique: ${allJobs.length}`);
      }
      await sleep(150);
    } catch (e) {
      console.warn(`  ⚠️ Query failed for ${label}:`, e.message);
    }
  }

  // Phase 1: Targeted Technology-Software Niche Keywords
  console.log(`\n⏳ Phase 1: Fetching US Tech/Cloud/Security Niche Keywords...`);
  for (let page = 1; page <= 3; page++) {
    await queryBatch({
      query: "",
      geo_boost: false,
      page: page,
      limit: 100,
      location: "US",
      only_enriched: false,
      only_cpa: false,
      categories: ["technology-software"],
      niche_keywords: USER_NICHE_KEYWORDS,
      sort_by: "high_cpc"
    }, `Tech Niche Page ${page}`);
  }

  // Phase 2: Top Catalog High CPC in US (Highest Paying CPCs)
  console.log(`\n⏳ Phase 2: Fetching Top-Tier High CPC US Catalog (Pages 1–15)...`);
  for (let page = 1; page <= 15; page++) {
    await queryBatch({
      query: "",
      geo_boost: false,
      page: page,
      limit: 100,
      location: "US",
      only_enriched: false,
      only_cpa: false,
      sort_by: "high_cpc"
    }, `Top US High-CPC Page ${page}`);
  }

  // Phase 3: Major US Tech & Metro Hubs with sort_by: high_cpc
  console.log(`\n⏳ Phase 3: Fetching Major US Metro Hubs...`);
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
        sort_by: "high_cpc"
      }, `${hub} P${page}`);
    }
  }

  // Sort strictly by CPC descending (highest CPC first)
  allJobs.sort((a, b) => (b.cpc_value || 0) - (a.cpc_value || 0));

  return allJobs;
}

(async () => {
  console.log('======================================================');
  console.log('🚀 ARTHA US HIGH-CPC FETCHER (SORT: HIGH CPC FIRST)');
  console.log('======================================================\n');

  const startTime = Date.now();
  const jobs = await fetchUsHighCpcJobs();

  if (jobs.length === 0) {
    console.error('❌ No US jobs found.');
    process.exit(1);
  }

  const usDir = __dirname;

  // 1. Save metadata list
  const jobsFilePath = path.join(usDir, 'jobs.json');
  fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf8');

  // 2. Save deduplicated URL queue
  const queueUrls = jobs.map(j => j.apply_link).filter(Boolean);
  const queueFilePath = path.join(usDir, 'jobs_queue.json');
  fs.writeFileSync(queueFilePath, JSON.stringify(queueUrls, null, 2), 'utf8');

  // 3. Sync directly into us/auto_applier.js
  const autoApplierPath = path.join(usDir, 'auto_applier.js');
  try {
    if (fs.existsSync(autoApplierPath)) {
      let autoApplier = fs.readFileSync(autoApplierPath, 'utf8');
      const queueFormatted = '  const DEFAULT_QUEUE = ' + JSON.stringify(queueUrls, null, 2).split('\n').map((line, idx) => idx === 0 ? line : '  ' + line).join('\n') + ';';
      autoApplier = autoApplier.replace(/  const DEFAULT_QUEUE = \[\s*[\s\S]*?\s*\];/, queueFormatted);
      
      const maxCpc = jobs[0]?.cpc_value ? `$${jobs[0].cpc_value.toFixed(2)}` : '$1.75';
      const minCpc = jobs[jobs.length - 1]?.cpc_value ? `$${jobs[jobs.length - 1].cpc_value.toFixed(2)}` : '$0.05';
      autoApplier = autoApplier.replace(/📋 EMBEDDED US JOB URL QUEUE \([^)]*\)/, `📋 EMBEDDED US JOB URL QUEUE (${queueUrls.length} Openings, CPC: ${minCpc} - ${maxCpc})`);
      
      fs.writeFileSync(autoApplierPath, autoApplier, 'utf8');
      console.log(`✅ Synced ${queueUrls.length} High-CPC US URLs into us/auto_applier.js`);
    }
  } catch (syncErr) {
    console.warn('⚠️ Notice during queue sync:', syncErr.message);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const maxCpc = jobs[0]?.cpc_value ? `$${jobs[0].cpc_value.toFixed(3)}` : 'N/A';
  const medianCpc = jobs[Math.floor(jobs.length / 2)]?.cpc_value ? `$${jobs[Math.floor(jobs.length / 2)].cpc_value.toFixed(3)}` : 'N/A';

  console.log('\n======================================================');
  console.log('🎉 US HIGH-CPC FETCH & SYNC COMPLETED');
  console.log('======================================================');
  console.log(`⏱️ Time:          ${elapsed}s`);
  console.log(`💎 US Jobs:       ${jobs.length} records`);
  console.log(`💰 Highest CPC:   ${maxCpc}`);
  console.log(`📊 Median CPC:    ${medianCpc}`);
  console.log(`📁 Metadata File: us/jobs.json (${(fs.statSync(jobsFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`📁 Queue File:    us/jobs_queue.json (${(fs.statSync(queueFilePath).size / 1024).toFixed(1)} KB)`);
  console.log('======================================================\n');
})();
