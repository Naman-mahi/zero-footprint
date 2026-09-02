const fs = require("fs");

const API_KEY = "ak_live_3b1e7f2eee24b195609e54927f35b8e5f87ea1df1f23933d";
const API_URL = "https://api.artha.link/api/v1/jobs";
const BASE_JOB_URL = "https://artha.link/@eanxt/jobs/";

const COUNTRY = "IN";

// Usage:
// node fetch-jobs.js <offset> <limit>
//
// Examples:
// node fetch-jobs.js 0 500
// node fetch-jobs.js 500 500
// node fetch-jobs.js 1000 500

const offset = Number(process.argv[2] || 0);
const requestedLimit = Number(process.argv[3] || 500);

// Maximum 500 records per run
const totalToFetch = Math.min(requestedLimit, 500);

if (!Number.isInteger(offset) || offset < 0) {
  console.error("❌ Offset must be a number >= 0");
  process.exit(1);
}

if (!Number.isInteger(totalToFetch) || totalToFetch < 1) {
  console.error("❌ Limit must be a number between 1 and 500");
  process.exit(1);
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function getOutputFilename() {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");

  return `out_${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.json`;
}

async function fetchJobs() {
  const jobUrls = [];
  let currentOffset = offset;

  while (jobUrls.length < totalToFetch) {
    const remaining = totalToFetch - jobUrls.length;

    // API allows max 100 per request
    const limit = Math.min(100, remaining);

    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(currentOffset),
      location: COUNTRY
    });

    console.log(
      `Fetching: offset=${currentOffset}, limit=${limit}, country=${COUNTRY}`
    );

    const response = await fetch(
      `${API_URL}?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json"
        }
      }
    );

    const requestId = response.headers.get("X-Request-Id");

    // Handle rate limit
    if (response.status === 429) {
      const retryAfter =
        Number(response.headers.get("Retry-After")) || 5;

      console.log(
        `⏳ Rate limited. Retrying after ${retryAfter} seconds...`
      );

      await sleep(retryAfter * 1000);
      continue;
    }

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("\n❌ API ERROR");
      console.error("Status:", response.status);
      console.error("Error:", result.error);
      console.error("Request ID:", requestId);
      process.exit(1);
    }

    const data = result.data;

    // Extract only the full base URL + slug for each job
    const urls = (data.items || [])
      .filter(item => item && item.slug)
      .map(item => `${BASE_JOB_URL}${item.slug}`);

    jobUrls.push(...urls);

    console.log(
      `Received ${data.items.length} items (${urls.length} URLs) | ` +
      `This run: ${jobUrls.length}/${totalToFetch} | ` +
      `Total available: ${data.total}`
    );

    // No more records available
    if (!data.has_more || data.items.length === 0) {
      break;
    }

    currentOffset += data.items.length;
  }

  return jobUrls;
}

(async () => {
  try {
    const jobUrls = await fetchJobs();

    const filename = getOutputFilename();

    fs.writeFileSync(
      filename,
      JSON.stringify(jobUrls, null, 2),
      "utf8"
    );

    console.log("\n======================================");
    console.log("DONE");
    console.log(`Base URL: ${BASE_JOB_URL}`);
    console.log(`Country: ${COUNTRY}`);
    console.log(`Starting offset: ${offset}`);
    console.log(`Requested: ${totalToFetch}`);
    console.log(`Saved URLs: ${jobUrls.length}`);
    console.log(`Output: ${filename}`);
    console.log("======================================");

    // Print first 3 sample URLs
    if (jobUrls.length > 0) {
      console.log("\nSample Generated URLs:");
      jobUrls.slice(0, 3).forEach((u, i) => console.log(`  ${i + 1}. ${u}`));
    }

  } catch (error) {
    console.error("\n❌ FAILED");
    console.error(error.message);
  }
})();
