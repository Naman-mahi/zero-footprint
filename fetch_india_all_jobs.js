/**
 * 🇮🇳 Artha India Comprehensive Multi-Category & Multi-Niche Job Fetcher
 * 
 * Standalone runner to fetch Indian jobs across ALL official industry categories,
 * specialized job niches, and major tech/business hubs.
 * 
 * FEATURES:
 *   - 🇮🇳 Strictly India: location: "IN", geo_boost: true, country: "IN".
 *   - 🌐 18 Official Categories: Tech, Healthcare, Finance, Sales, Engineering, HR, Legal, etc.
 *   - 🎯 30+ Specialized Niches: Fullstack, DevOps, Cloud, AI/ML, Pharma, Audit, B2B, UI/UX, etc.
 *   - 🏙️ 11 Indian Metro Hubs: Bengaluru, Hyderabad, Pune, Mumbai, Delhi/NCR, Chennai, etc.
 *   - 💎 Pure Positive CPC prioritized, with fallback to all verified Indian opportunities.
 *   - 🚫 Anti-Spam: Discards trucking, driver, and CDL spam.
 *   - 📁 Isolated Outputs: jobs_india_all.json & jobs_india_all_queue.json (no conflict with deployed files).
 * 
 * USAGE:
 *   node fetch_india_all_jobs.js            (Fetch all Indian jobs across all categories & niches)
 *   node fetch_india_all_jobs.js --cpc-only (Strictly positive CPC only: cpc_value > 0)
 */

const fs = require('fs');
const path = require('path');

const RECOMMEND_API_URL = "https://my.artha.link/api/job-api/recommend?pulse_variant=control";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CPC_ONLY_MODE = process.argv.includes('--cpc-only');

// All 18 Official Categories on Artha
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

// Specialized Niche Keywords
const NICHE_QUERIES = [
  // Tech & Software Niches
  'React', 'Python', 'Java', 'Fullstack', 'Frontend', 'Backend', 'DevOps', 'AWS', 'Cloud', 'Data Engineer', 'Machine Learning', 'Cybersecurity', 'QA Automation',
  // Healthcare & Pharma
  'Pharma', 'Clinical', 'Biotech', 'Medical', 'Pharmacist',
  // Finance & Accounting
  'Accountant', 'Chartered Accountant', 'Finance', 'Audit', 'Tax', 'Fintech', 'Banking',
  // Sales & Business Development
  'Business Development', 'Account Executive', 'Inside Sales', 'B2B Sales',
  // Marketing & Design
  'Digital Marketing', 'SEO', 'Content Writer', 'UI UX', 'Graphic Designer',
  // HR, Ops & Management
  'Recruiter', 'Talent Acquisition', 'HR', 'Customer Success', 'Product Manager', 'Project Manager',
  // Core Engineering
  'Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Embedded'
];

// Major Indian Metros
const METRO_HUBS = [
  'Bengaluru', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi', 'Noida', 'Gurgaon', 'Gurugram', 'Chennai', 'Kolkata', 'Ahmedabad'
];

async function fetchIndiaAllJobs() {
  const seenSlugs = new Set();
  const allJobs = [];
  const stats = {
    generalFeed: 0,
    categories: 0,
    niches: 0,
    metros: 0
  };

  async function queryBatch(payload, label, statKey) {
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
        console.warn(`    ⚠️ Rate limited on [${label}]. Waiting ${retryAfter}s...`);
        await sleep(retryAfter * 1000);
        return;
      }

      if (!response.ok) return;

      const result = await response.json();
      const rawItems = result.items || [];
      let addedCount = 0;

      for (const item of rawItems) {
        // Location verification
        const isIndia = item.country === "IN" || item.company_info?.country === "India";
        if (!isIndia) continue;

        // CPC check if in strict mode
        if (CPC_ONLY_MODE && (typeof item.cpc_value !== "number" || item.cpc_value <= 0)) {
          continue;
        }

        const titleLower = (item.title || "").toLowerCase();
        const compLower = (item.company || item.company_info?.name || "").toLowerCase();

        // Anti-spam filters (trucking/CDL/freight)
        if (
          titleLower.includes("truck") ||
          titleLower.includes("driver") ||
          titleLower.includes("cdl") ||
          titleLower.includes("dry van") ||
          titleLower.includes("freight") ||
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
          cpc_value: item.cpc_value || 0,
          cpa_value: item.cpa_value || null,
          salary_min: item.salary_min || null,
          salary_max: item.salary_max || null,
          salary_curr: item.salary_curr || "INR",
          job_type: item.job_type || null,
          work_mode: item.work_mode || null,
          category: item.category || [],
          source_query: label,
          posted_date: item.posted_date || null
        });

        addedCount++;
      }

      if (addedCount > 0) {
        stats[statKey] = (stats[statKey] || 0) + addedCount;
        console.log(`    📦 [${label}] +${addedCount} jobs | Total unique: ${allJobs.length}`);
      }

      await sleep(100);
    } catch (e) {
      console.warn(`    ⚠️ Query notice for [${label}]:`, e.message);
    }
  }

  console.log("==================================================================");
  console.log(`🇮🇳 ARTHA INDIA MULTI-CATEGORY JOB FETCHER [${CPC_ONLY_MODE ? "STRICT CPC ONLY" : "ALL OPENINGS"}]`);
  console.log("==================================================================\n");

  // Phase 1: High-Volume General Indian Feed (Pages 1 to 20)
  console.log("⏳ Phase 1: Fetching General Indian Feed (Pages 1–20)...");
  for (let page = 1; page <= 20; page++) {
    await queryBatch({
      query: "",
      geo_boost: true,
      location: "IN",
      page: page,
      limit: 100,
      only_enriched: false,
      only_cpa: false,
      only_cpc: CPC_ONLY_MODE,
      sort_by: "high_cpc"
    }, `India Feed P${page}`, "generalFeed");
  }

  // Phase 2: Official Categories (18 Categories, Pages 1-3)
  console.log("\n⏳ Phase 2: Fetching All 18 Official Industry Categories...");
  for (const cat of OFFICIAL_CATEGORIES) {
    for (let page = 1; page <= 3; page++) {
      await queryBatch({
        categories: [cat],
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100,
        only_cpc: CPC_ONLY_MODE
      }, `Cat: ${cat} P${page}`, "categories");
    }
  }

  // Phase 3: Specialized Niches
  console.log("\n⏳ Phase 3: Fetching Specialized Role Niches...");
  for (const query of NICHE_QUERIES) {
    for (let page = 1; page <= 2; page++) {
      await queryBatch({
        query: query,
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100,
        only_cpc: CPC_ONLY_MODE
      }, `Niche: ${query} P${page}`, "niches");
    }
  }

  // Phase 4: Metro Hubs
  console.log("\n⏳ Phase 4: Fetching Major Indian Metro Hubs...");
  for (const hub of METRO_HUBS) {
    for (let page = 1; page <= 2; page++) {
      await queryBatch({
        query: hub,
        geo_boost: true,
        location: "IN",
        page: page,
        limit: 100,
        only_cpc: CPC_ONLY_MODE
      }, `Metro: ${hub} P${page}`, "metros");
    }
  }

  // Sort descending by CPC value so highest CPC jobs are at the top
  allJobs.sort((a, b) => (b.cpc_value || 0) - (a.cpc_value || 0));

  return { allJobs, stats };
}

(async () => {
  const jobsFilePath = path.join(__dirname, 'jobs_india_all.json');
  const queueFilePath = path.join(__dirname, 'jobs_india_all_queue.json');

  const startTime = Date.now();
  const { allJobs, stats } = await fetchIndiaAllJobs();

  if (allJobs.length === 0) {
    console.error("❌ No jobs found matching criteria.");
    process.exit(1);
  }

  // Save isolated output files
  fs.writeFileSync(jobsFilePath, JSON.stringify(allJobs, null, 2), 'utf8');
  const queueUrls = allJobs.map(j => j.apply_link).filter(Boolean);
  fs.writeFileSync(queueFilePath, JSON.stringify(queueUrls, null, 2), 'utf8');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const positiveCpcJobs = allJobs.filter(j => j.cpc_value > 0);
  const maxCpc = positiveCpcJobs[0]?.cpc_value ? `$${positiveCpcJobs[0].cpc_value.toFixed(3)}` : 'N/A';
  const minCpc = positiveCpcJobs[positiveCpcJobs.length - 1]?.cpc_value ? `$${positiveCpcJobs[positiveCpcJobs.length - 1].cpc_value.toFixed(3)}` : 'N/A';

  console.log('\n==================================================================');
  console.log('🎉 INDIA ALL-NICHES & CATEGORIES FETCH COMPLETE');
  console.log('==================================================================');
  console.log(`⏱️ Duration:           ${elapsed}s`);
  console.log(`💎 Total Unique Jobs:   ${allJobs.length} Indian listings`);
  console.log(`💰 Positive CPC Jobs:   ${positiveCpcJobs.length} listings (up to ${maxCpc})`);
  console.log('\n📊 Breakdown by Pipeline:');
  console.log(`   • General Feed:      ${stats.generalFeed} jobs`);
  console.log(`   • Official Sectors:  ${stats.categories} jobs`);
  console.log(`   • Specialized Niches:${stats.niches} jobs`);
  console.log(`   • Metro Hubs:        ${stats.metros} jobs`);
  console.log('\n📁 Output Files (Isolated - No deployment conflicts):');
  console.log(`   • Full Metadata:     jobs_india_all.json (${(fs.statSync(jobsFilePath).size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`   • Direct URL Queue:  jobs_india_all_queue.json (${(fs.statSync(queueFilePath).size / 1024).toFixed(1)} KB)`);
  console.log('==================================================================\n');
})();
