/**
 * 🌍 Zero-Footprint: Dedicated Multi-Location Job Fetcher
 * 
 * Fetches job openings and saves them into clean, separate, location-specific JSON files:
 *   - jobs_us.json  (United States)
 *   - jobs_uk.json  (United Kingdom)
 *   - jobs_in.json  (India)
 *   - jobs_ca.json  (Canada)
 *   - jobs_de.json  (Germany / Europe)
 *   - jobs_global.json (All / Global)
 * 
 * USAGE:
 *   node fetch_by_location.js [country] [limit] [offset]
 * 
 * EXAMPLES:
 *   node fetch_by_location.js US 500        -> Saves to jobs_us.json
 *   node fetch_by_location.js UK 500        -> Saves to jobs_uk.json
 *   node fetch_by_location.js IN 500        -> Saves to jobs_in.json
 *   node fetch_by_location.js CA 500        -> Saves to jobs_ca.json
 *   node fetch_by_location.js DE 500        -> Saves to jobs_de.json
 *   node fetch_by_location.js ALL 500       -> Saves to jobs_global.json
 *   node fetch_by_location.js FETCH_ALL 200 -> Automatically fetches all 5 locations!
 */

const fs = require('fs');
const path = require('path');

const API_KEY = "ak_live_3b1e7f2eee24b195609e54927f35b8e5f87ea1df1f23933d";
const API_URL = "https://api.artha.link/api/v1/jobs";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

const COUNTRY_MAP = {
  US: { code: 'US', file: 'jobs_us.json', name: 'United States' },
  UK: { code: 'GB', file: 'jobs_uk.json', name: 'United Kingdom' },
  GB: { code: 'GB', file: 'jobs_uk.json', name: 'United Kingdom' },
  IN: { code: 'IN', file: 'jobs_in.json', name: 'India' },
  CA: { code: 'CA', file: 'jobs_ca.json', name: 'Canada' },
  DE: { code: 'DE', file: 'jobs_de.json', name: 'Germany' },
  ALL: { code: null, file: 'jobs_global.json', name: 'Global / All Locations' },
  GLOBAL: { code: null, file: 'jobs_global.json', name: 'Global / All Locations' }
};

const targetCountry = (process.argv[2] || 'ALL').toUpperCase();
const requestedLimit = Number(process.argv[3] || 500);
const startingOffset = Number(process.argv[4] || 0);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJobsForCountry(countryCode, limitTotal = 500, offsetStart = 0) {
  const jobUrls = [];
  let currentOffset = offsetStart;
  const maxToFetch = Math.min(limitTotal, 500);

  console.log(`\n⏳ Fetching jobs for: ${countryCode || 'GLOBAL (ALL COUNTRIES)'} (Requested: ${maxToFetch}, Starting offset: ${offsetStart})...`);

  while (jobUrls.length < maxToFetch) {
    const remaining = maxToFetch - jobUrls.length;
    const limit = Math.min(100, remaining);

    const queryObj = {
      limit: String(limit),
      offset: String(currentOffset)
    };

    if (countryCode) {
      queryObj.location = countryCode;
    }

    const params = new URLSearchParams(queryObj);

    try {
      const response = await fetch(`${API_URL}?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json"
        }
      });

      if (response.status === 429) {
        const retryAfter = Number(response.headers.get("Retry-After")) || 5;
        console.log(`⏳ Rate limited. Retrying in ${retryAfter}s...`);
        await sleep(retryAfter * 1000);
        continue;
      }

      const result = await response.json();
      if (!response.ok || !result.success) {
        console.error(`❌ API error for ${countryCode || 'GLOBAL'}:`, result.error || response.statusText);
        break;
      }

      const items = result.data?.items || [];
      const urls = items.filter(it => it && it.slug).map(it => `${BASE_JOB_URL}${it.slug}`);

      jobUrls.push(...urls);
      console.log(`  📦 Received ${items.length} items (${urls.length} URLs) | Total fetched: ${jobUrls.length}/${maxToFetch} | Total available in API: ${result.data?.total || 'N/A'}`);

      if (!result.data?.has_more || items.length === 0) {
        break;
      }

      currentOffset += items.length;
    } catch (err) {
      console.error(`❌ Network error: ${err.message}`);
      break;
    }
  }

  return jobUrls;
}

(async () => {
  console.log('======================================================');
  console.log('🌍 ZERO-FOOTPRINT: LOCATION-SPECIFIC JOB EXTRACTOR');
  console.log('======================================================');

  if (targetCountry === 'FETCH_ALL' || targetCountry === 'ALL_COUNTRIES') {
    // Fetch all 5 specific locations sequentially
    const locationsToFetch = ['US', 'UK', 'IN', 'CA', 'DE'];
    const limitPerCountry = Number(process.argv[3] || 200);

    for (const loc of locationsToFetch) {
      const meta = COUNTRY_MAP[loc];
      const urls = await fetchJobsForCountry(meta.code, limitPerCountry, 0);

      const filePath = path.join(__dirname, meta.file);
      fs.writeFileSync(filePath, JSON.stringify(urls, null, 2), 'utf8');

      console.log(`✅ Saved ${urls.length} URLs to -> ${meta.file} (${meta.name})\n`);
      await sleep(1500);
    }

    console.log('======================================================');
    console.log('🎉 ALL 5 COUNTRY FILES GENERATED SUCCESSFULLY!');
    console.log('======================================================');
    return;
  }

  const meta = COUNTRY_MAP[targetCountry] || COUNTRY_MAP.ALL;
  const urls = await fetchJobsForCountry(meta.code, requestedLimit, startingOffset);

  const filePath = path.join(__dirname, meta.file);
  fs.writeFileSync(filePath, JSON.stringify(urls, null, 2), 'utf8');

  console.log('\n======================================================');
  console.log(`🎉 SUCCESS: Generated ${urls.length} jobs for ${meta.name}`);
  console.log(`📁 File Saved: ${meta.file}`);
  console.log('======================================================\n');

  if (urls.length > 0) {
    console.log('Sample Openings:');
    urls.slice(0, 3).forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
  }
})();
