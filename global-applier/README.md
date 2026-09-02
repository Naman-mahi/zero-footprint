# 🌍 Zero-Footprint: Multi-Country Batch Auto-Applier

A high-performance automated application suite supporting **50 or 100 applications per batch**, multi-country job extraction (US, UK, India, Global), and dual execution modes (In-Browser HUD or Node.js Playwright Runner).

---

## 📁 Package Contents

| File | Purpose |
| :--- | :--- |
| **[`global_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/global_applier.js)** | In-browser 1-by-1 auto-applier with **50 / 100 batch size toggle**, white frosted glass HUD, vector SVGs, next/prev batch navigation, and dual-tab auto-closer. |
| **[`playwright_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/playwright_applier.js)** | Node.js Playwright runner for executing batches of 50 or 100 applications directly from your terminal. |
| **[`fetch_global_jobs.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/fetch_global_jobs.js)** | Multi-country API fetcher to extract job openings for any region (`US`, `GB`, `CA`, `IN`, `ALL`). |
| **[`jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/global-applier/jobs_queue.json)** | Complete embedded queue of 974 global job openings. |

---

## 🚀 Execution Method 1: In-Browser HUD (50 / 100 Batch Toggle)

Open Developer Tools (`F12` -> Console) on [https://artha.link](https://artha.link) and run:

```javascript
fetch(`https://raw.githubusercontent.com/Naman-mahi/zero-footprint/master/global-applier/global_applier.js?_t=${Date.now()}`)
  .then(r => r.text())
  .then(eval);
```

### ✨ In-Browser Features:
- **Batch Size Toggle**: Switch between **50** and **100** applications per run with a single click.
- **Batch Navigator**: Jump directly to `Batch 2`, `Batch 3`, etc. using `[◀ Prev]` and `[Next ▶]`.
- **Dynamic Poller**: Waits up to 10s for React DOM hydration so no button is missed.
- **Auto-Closer**: Automatically closes both Tab 1 (job details) and Tab 2 (redirect) after 2.5s.
- **1-Click Wipe**: Purges cookies, localStorage, and sessionStorage between batches.

---

## 💻 Execution Method 2: Node.js Playwright Runner

Run batches of 50 or 100 applications directly from your terminal:

```bash
# 1. Install Playwright (if not installed)
npm install playwright

# 2. Run first batch of 50 jobs with visible browser
node playwright_applier.js --batch 50 --headed

# 3. Run batch of 100 jobs starting from Job 51 in headless mode
node playwright_applier.js --batch 100 --start 50 --speed normal
```

---

## 🌐 Fetching Jobs by Country (US, UK, India, Global)

Use `fetch_global_jobs.js` to extract fresh job feeds by country code:

```bash
# Fetch 500 United States jobs
node fetch_global_jobs.js 0 500 US

# Fetch 500 United Kingdom jobs
node fetch_global_jobs.js 0 500 GB

# Fetch 500 Global / Worldwide jobs (no country filter)
node fetch_global_jobs.js 0 500 ALL

# Fetch 500 India jobs
node fetch_global_jobs.js 0 500 IN
```
