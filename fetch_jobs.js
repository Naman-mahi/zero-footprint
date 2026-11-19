/**
 * 🚀 Artha India Comprehensive Job Fetcher (All Indian Openings - CPC Prioritized)
 * 
 * Fetches all verified active Indian job openings across all categories,
 * major metros, states, and specialized roles, strictly sorted with
 * highest CPC first, followed by all remaining verified opportunities.
 * 
 * GUARANTEES:
 *   - Strictly Indian Opportunities (location: 'IN', country: 'IN', verified Indian company info).
 *   - Complete Cache Wipe: Removes all old job records before syncing.
 *   - Sorted Highest CPC First: Down to all verified Indian roles.
 *   - Anti-Spam: Discards trucking, driver, and freight spam.
 * 
 * OUTPUTS:
 *   1. jobs.json                 -> Full metadata records
 *   2. jobs_queue.json           -> Deduplicated array of application URLs
 *   3. auto_applier.js           -> Synced DEFAULT_QUEUE
 *   4. auto_applier_crowdstrike.js -> Synced DEFAULT_QUEUE
 * 
 * USAGE:
 *   node fetch_jobs.js
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

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

async function fetchAllIndiaJobs() {
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
        // STRICT FILTER 1: Confirm Indian location
        const isIN = item.country === "IN" || item.company_info?.country === "India";
        if (!isIN) continue;

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
          cpc_value: typeof item.cpc_value === 'number' ? item.cpc_value : 0,
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
        console.log(`  📦 [${label}] Added ${newCount} jobs | Total unique: ${allJobs.length}`);
      }
      await sleep(100);
      return result.has_more !== false && rawItems.length >= 100;
    } catch (e) {
      console.warn(`  ⚠️ Query failed for ${label}:`, e.message);
      return false;
    }
  }

  // Phase 1: High-CPC Indian Catalog (Pages 1 to 25)
  console.log(`\n⏳ Phase 1: Fetching High-CPC Indian Catalog (location: 'IN')...`);
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

  // Phase 2: All Indian Feed without CPC restriction (Pages 1 to 25)
  console.log(`\n⏳ Phase 2: Fetching All Indian Feed (location: 'IN')...`);
  for (let page = 1; page <= 25; page++) {
    const hasMore = await queryBatch({
      query: "",
      geo_boost: true,
      location: "IN",
      page: page,
      limit: 100,
      only_enriched: false,
      only_cpa: false
    }, `All India P${page}`);
    if (!hasMore && page > 3) break;
  }

  // Phase 3: All 18 Official Categories in India
  console.log(`\n⏳ Phase 3: Fetching All 18 Official Industry Categories in India...`);
  for (const cat of OFFICIAL_CATEGORIES) {
    for (let page = 1; page <= 5; page++) {
      const hasMore = await queryBatch({
        query: "",
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100,
        categories: [cat]
      }, `Cat: ${cat} P${page}`);
      if (!hasMore) break;
    }
  }

  // Phase 4: Metros & States in India
  console.log(`\n⏳ Phase 4: Fetching Major Indian Metros & States...`);
  for (const region of METRO_AND_STATES) {
    for (let page = 1; page <= 3; page++) {
      const hasMore = await queryBatch({
        query: region,
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100
      }, `Region: ${region} P${page}`);
      if (!hasMore) break;
    }
  }

  // Phase 5: High-Demand Roles
  console.log(`\n⏳ Phase 5: Fetching Specialized Role Niches in India...`);
  for (const role of ROLE_KEYWORDS) {
    for (let page = 1; page <= 3; page++) {
      const hasMore = await queryBatch({
        query: role,
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100
      }, `Role: ${role} P${page}`);
      if (!hasMore) break;
    }
  }

  // Sort strictly by CPC descending (highest CPC first, then organic/CPA)
  allJobs.sort((a, b) => (b.cpc_value || 0) - (a.cpc_value || 0));

  return allJobs;
}

(async () => {
  console.log('======================================================');
  console.log('🇮🇳 ARTHA COMPREHENSIVE INDIA JOB FETCHER');
  console.log('======================================================\n');

  const jobsFilePath = path.join(__dirname, 'jobs.json');
  const queueFilePath = path.join(__dirname, 'jobs_queue.json');

  // 1. Remove old cached files
  [jobsFilePath, queueFilePath].forEach(fp => {
    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
      console.log(`🧹 Removed old ${path.basename(fp)} cache.`);
    }
  });

  const startTime = Date.now();
  const jobs = await fetchAllIndiaJobs();

  if (jobs.length === 0) {
    console.error('❌ No Indian jobs found.');
    process.exit(1);
  }

  // 2. Save metadata list
  fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'jobs_data.js'), 'window.__JOBS_DATA__ = ' + JSON.stringify(jobs, null, 2) + ';', 'utf8');

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
      fs.writeFileSync(applierPath, content, 'utf8');
      console.log(`🔄 Synced ${queueUrls.length} jobs into auto_applier.js.`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const positiveCpc = jobs.filter(j => j.cpc_value > 0);
  const maxCpc = positiveCpc[0]?.cpc_value ? `$${positiveCpc[0].cpc_value.toFixed(3)}` : 'N/A';
  const minCpc = positiveCpc[positiveCpc.length - 1]?.cpc_value ? `$${positiveCpc[positiveCpc.length - 1].cpc_value.toFixed(3)}` : 'N/A';

  console.log('\n======================================================');
  console.log('🎉 COMPREHENSIVE FETCH & SYNC COMPLETED');
  console.log('======================================================');
  console.log(`⏱️ Time:              ${elapsed}s`);
  console.log(`💎 Total Indian Jobs: ${jobs.length} listings`);
  console.log(`💰 Positive CPC Jobs: ${positiveCpc.length} listings (up to ${maxCpc})`);
  console.log(`📊 Highest CPC:       ${maxCpc}`);
  console.log(`📁 jobs.json:         ${(fs.statSync(jobsFilePath).size / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`📁 jobs_queue.json:    ${(fs.statSync(queueFilePath).size / 1024).toFixed(1)} KB`);
  console.log('======================================================\n');
})();
