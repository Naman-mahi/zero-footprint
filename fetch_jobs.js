/**
 * 🚀 Artha High-Yield Job Fetcher (Strict Minimum $0.010+ CPC)
 * 
 * Exclusively fetches verified active Indian job openings paying AT LEAST $0.010+ CPC.
 * Strictly filters out all sub-$0.01 listings ($0.007, $0.008, $0.000, null, etc.).
 * 
 * STRICT RULES:
 *   - Minimum CPC Threshold: cpc_value >= 0.01 (No 0.00x listings allowed).
 *   - Strictly Indian Opportunities: location: 'IN', country: 'IN', verified Indian company info.
 *   - Sorted Highest CPC First: From top-tier $0.160+ down to $0.010.
 *   - Cache Wipe: Automatically removes all old job records before syncing fresh ones.
 *   - Anti-Spam: Discards trucking, CDL, driver, and freight spam.
 * 
 * OUTPUTS:
 *   1. jobs.json       -> Full metadata records (only cpc_value >= 0.01)
 *   2. jobs_queue.json -> Deduplicated array of application URLs
 *   3. jobs_data.js    -> Visual portal instant offline loader
 *   4. auto_applier.js -> Synced DEFAULT_QUEUE
 * 
 * USAGE:
 *   node fetch_jobs.js
 *   npm run fetch
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

// 🎯 STRICT MINIMUM CPC THRESHOLD ($0.010+)
// Any job below $0.010 (e.g. 0.008, 0.007, 0.000) is strictly rejected.
const MIN_CPC_THRESHOLD = 0.01;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const OFFICIAL_CATEGORIES = [
  'technology-software',
  'accounting-finance',
  'healthcare-nursing',
  'sales',
  'marketing-advertising-pr',
  'hr-recruitment',
  'customer-service-support',
  'engineering',
  'management-exec-consulting',
  'legal',
  'creative-design-arts-media',
  'scientific-qa',
  'manufacturing',
  'admin-clerical-secretarial',
  'energy-oil-gas',
  'catering-hospitality',
  'construction-trades',
  'retail-wholesale'
];

const METRO_AND_STATES = [
  'Bengaluru', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai',
  'Delhi', 'Noida', 'Gurgaon', 'Gurugram', 'Chennai',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Kochi', 'Chandigarh',
  'Indore', 'Lucknow', 'Karnataka', 'Maharashtra', 'Telangana',
  'Tamil Nadu', 'Haryana', 'Uttar Pradesh', 'Gujarat'
];

const ROLE_KEYWORDS = [
  'Engineer', 'Developer', 'Analyst', 'Manager', 'Specialist',
  'Associate', 'Executive', 'Consultant', 'Lead', 'Intern',
  'Product', 'Data', 'Cloud', 'DevOps', 'Fullstack', 'Frontend', 'Backend'
];

async function fetchHighCpcJobs() {
  const seenSlugs = new Set();
  const allJobs = [];

  async function queryBatch(payload, label = "") {
    try {
      const response = await fetch(RECOMMEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("Retry-After")) || 5;
        console.warn(`  ⚠️ Rate limited on [${label}]. Waiting ${retryAfter}s...`);
        await sleep(retryAfter * 1000);
        return false;
      }

      if (!response.ok) {
        return false;
      }

      const result = await response.json();
      const rawItems = result.items || [];
      if (rawItems.length === 0) return false;

      let newCount = 0;

      for (const item of rawItems) {
        // STRICT FILTER 1: Must be in India
        const isIN = item.country === "IN" || item.company_info?.country === "India";
        if (!isIN) continue;

        // STRICT FILTER 2: Minimum CPC Threshold ($0.010+ CPC)
        // Strictly removes all 0.00x listings (0.007, 0.008, 0.000, null, etc.)
        if (typeof item.cpc_value !== "number" || item.cpc_value < MIN_CPC_THRESHOLD) {
          continue;
        }

        const titleLower = (item.title || "").toLowerCase();
        const compLower = (item.company || item.company_info?.name || "").toLowerCase();

        // Anti-Spam: Exclude all trucking, CDL, driver, freight listings
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
          country: "IN",
          city: item.city || null,
          state: item.state || null,
          cpc_value: item.cpc_value,
          cpa_value: item.cpa_value || null,
          salary_min: item.salary_min || null,
          salary_max: item.salary_max || null,
          salary_curr: item.salary_curr || "INR",
          salary_unit: item.salary_unit || null,
          job_type: item.job_type || null,
          work_mode: item.work_mode || null,
          category: item.category || [],
          posted_date: item.posted_date || null
        });
        newCount++;
      }

      if (newCount > 0) {
        console.log(`  📦 [${label}] Added ${newCount} jobs (>= $0.010 CPC) | Total unique: ${allJobs.length}`);
      }
      await sleep(100);
      return result.has_more !== false && rawItems.length >= 100;
    } catch (e) {
      console.warn(`  ⚠️ Query failed for ${label}:`, e.message);
      return false;
    }
  }

  // Phase 1: High-CPC Indian Catalog (Pages 1 to 25)
  console.log(`\n⏳ Phase 1: Querying High-CPC Indian Catalog (only_cpc: true, sort_by: 'high_cpc')...`);
  for (let page = 1; page <= 25; page++) {
    const hasMore = await queryBatch({
      query: "",
      geo_boost: true,
      location: "IN",
      page: page,
      limit: 100,
      only_enriched: false,
      only_cpa: false,
      only_cpc: true,
      sort_by: "high_cpc"
    }, `Pure-CPC P${page}`);
    if (!hasMore && page > 3) break;
  }

  // Phase 2: All 18 Official Categories in India
  console.log(`\n⏳ Phase 2: Scanning 18 Official Industry Categories...`);
  for (const cat of OFFICIAL_CATEGORIES) {
    for (let page = 1; page <= 5; page++) {
      const hasMore = await queryBatch({
        query: "",
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100,
        only_cpc: true,
        sort_by: "high_cpc",
        categories: [cat]
      }, `Cat: ${cat} P${page}`);
      if (!hasMore) break;
    }
  }

  // Phase 3: Major Indian Metros & Tech Hubs
  console.log(`\n⏳ Phase 3: Scanning Major Indian Metros & States...`);
  for (const region of METRO_AND_STATES) {
    for (let page = 1; page <= 3; page++) {
      const hasMore = await queryBatch({
        query: region,
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100,
        only_cpc: true,
        sort_by: "high_cpc"
      }, `Region: ${region} P${page}`);
      if (!hasMore) break;
    }
  }

  // Phase 4: High-Demand Role Niches
  console.log(`\n⏳ Phase 4: Scanning High-Demand Role Niches...`);
  for (const role of ROLE_KEYWORDS) {
    for (let page = 1; page <= 3; page++) {
      const hasMore = await queryBatch({
        query: role,
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100,
        only_cpc: true,
        sort_by: "high_cpc"
      }, `Role: ${role} P${page}`);
      if (!hasMore) break;
    }
  }

  // Sort strictly by CPC descending (highest CPC first: 0.160 -> 0.032 -> 0.020 -> 0.015 -> 0.010)
  allJobs.sort((a, b) => b.cpc_value - a.cpc_value);

  return allJobs;
}

(async () => {
  console.log('======================================================');
  console.log('🚀 ARTHA HIGH-YIELD JOB FETCHER (STRICT CPC >= $0.010)');
  console.log('======================================================\n');

  const jobsFilePath = path.join(__dirname, 'jobs.json');
  const queueFilePath = path.join(__dirname, 'jobs_queue.json');
  const dataScriptPath = path.join(__dirname, 'jobs_data.js');

  // 1. Wipe old cache files completely
  [jobsFilePath, queueFilePath, dataScriptPath].forEach(fp => {
    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
      console.log(`🧹 Removed old ${path.basename(fp)} cache.`);
    }
  });

  const startTime = Date.now();
  const jobs = await fetchHighCpcJobs();

  if (jobs.length === 0) {
    console.error('❌ No jobs found with CPC >= $0.010.');
    process.exit(1);
  }

  // Double check: absolutely zero items below $0.01 allowed
  const invalidJobs = jobs.filter(j => typeof j.cpc_value !== 'number' || j.cpc_value < MIN_CPC_THRESHOLD);
  if (invalidJobs.length > 0) {
    console.error(`🚨 Fatal: Found ${invalidJobs.length} listings below $0.010 threshold! Discarding them.`);
    process.exit(1);
  }

  // 2. Save metadata list
  fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf8');
  fs.writeFileSync(dataScriptPath, 'window.__JOBS_DATA__ = ' + JSON.stringify(jobs, null, 2) + ';', 'utf8');

  // 3. Save deduplicated URL queue
  const queueUrls = jobs.map(j => j.apply_link).filter(Boolean);
  fs.writeFileSync(queueFilePath, JSON.stringify(queueUrls, null, 2), 'utf8');

  // 4. Sync DEFAULT_QUEUE into auto_applier.js
  const applierPath = path.join(__dirname, 'auto_applier.js');
  if (fs.existsSync(applierPath)) {
    let content = fs.readFileSync(applierPath, 'utf8');
    const startIdx = content.indexOf('const DEFAULT_QUEUE = [');
    if (startIdx !== -1) {
      const endIdx = content.indexOf('];', startIdx) + 2;
      const queueStr = 'const DEFAULT_QUEUE = ' + JSON.stringify(queueUrls, null, 2) + ';';
      content = content.slice(0, startIdx) + queueStr + content.slice(endIdx);
      
      // Also update in-browser live fetcher check if present
      content = content.replace(
        /if \(typeof it\.cpc_value !== ['"]number['"] \|\| it\.cpc_value <= 0\) continue;/g,
        'if (typeof it.cpc_value !== "number" || it.cpc_value < 0.01) continue;'
      );
      
      fs.writeFileSync(applierPath, content, 'utf8');
      console.log(`🔄 Synced ${queueUrls.length} jobs (>= $0.010 CPC) into auto_applier.js.`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const maxCpc = jobs[0]?.cpc_value ? `$${jobs[0].cpc_value.toFixed(3)}` : 'N/A';
  const minCpc = jobs[jobs.length - 1]?.cpc_value ? `$${jobs[jobs.length - 1].cpc_value.toFixed(3)}` : 'N/A';
  const medianCpc = jobs[Math.floor(jobs.length / 2)]?.cpc_value ? `$${jobs[Math.floor(jobs.length / 2)].cpc_value.toFixed(3)}` : 'N/A';

  console.log('\n======================================================');
  console.log('🎉 HIGH-YIELD FETCH & SYNC COMPLETED');
  console.log('======================================================');
  console.log(`⏱️ Time:              ${elapsed}s`);
  console.log(`💎 High-CPC Jobs:     ${jobs.length} listings (100% CPC >= $0.010)`);
  console.log(`💰 Highest CPC:       ${maxCpc}`);
  console.log(`📊 Lowest CPC:        ${minCpc} (Strict minimum enforced)`);
  console.log(`📈 Median CPC:        ${medianCpc}`);
  console.log(`📁 jobs.json:         ${(fs.statSync(jobsFilePath).size / 1024).toFixed(1)} KB`);
  console.log(`📁 jobs_queue.json:    ${(fs.statSync(queueFilePath).size / 1024).toFixed(1)} KB`);
  console.log('======================================================\n');
})();
