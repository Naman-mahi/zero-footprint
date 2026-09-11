# 📚 Zero-Footprint Documentation Hub

Welcome to the comprehensive documentation suite for **Zero-Footprint** ([GitHub Repository](https://github.com/Naman-mahi/zero-footprint)). This hub provides detailed technical guides on architecture, anti-detection mechanisms, in-browser bots, production Playwright multi-browser runners, data schemas, and deployment via GitHub and jsDelivr CDN.

---

## 📑 Documentation Index

```text
docs/
├── README.md                  # (You are here) Central documentation index
├── auto-applier.md            # In-browser appliers (cpc_applier.js & auto_applier.js) reference
├── playwright-runner.md       # Production Playwright multi-browser & multi-city CLI runner
├── anti-detection.md          # In-depth guide on anti-detection mechanics & evasion
├── data-schema.md             # Detailed schemas for jobs_all_high_cpc.json & jobs_high_cpc.json
├── browser-bot.md             # Technical reference & architecture of browser_bot.js
└── cdn-and-github-guide.md    # Hosting on GitHub, jsDelivr CDN distribution, & loaders
```

---

## 🧭 Navigation Guide

### 1. ⚡ [In-Browser Appliers: `cpc_applier.js` & `auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/docs/auto-applier.md)
Specialized in-browser bots for high-volume execution:
- **10,000 High-CPC Dedicated Applier (`cpc_applier.js`)**: Runs all 10,000 `cpc_value: 0.048` jobs.
- **Dynamic Batch Sizing**: On-the-fly toggling between `25`, `50`, and `100` jobs per batch.
- **Per-Job Zero-Footprint Purge**: Deep purge of `document.cookie` (root & subdomains), `sessionStorage`, `localStorage`, and `IndexedDB` after **every** application.
- **10-Second Destination Hold**: Holds destination tabs open for full tracking pixel hydration.
- **3-Tab Auto-Closing**: Manages controller, job page, affiliate redirect, and destination page.

### 2. 🎭 [Playwright Multi-Browser Engine (`playwright_applier.js`)](file:///d:/DEVELOPMENT/all-bots/docs/playwright-runner.md)
Production-grade Node.js Playwright automation runner:
- **Chrome & Edge Engine Rotation**: Alternates between native Google Chrome and Microsoft Edge binaries.
- **Custom Queue Loading**: Support for `--queue jobs_all_high_cpc_queue.json` or standard queues.
- **Range Boundaries**: Execute targeted slices with `--start 500 --end 900`.
- **Zero-Trace Disposable Profiles**: OS-level temp directory deletion after each run.
- **Multi-City Geolocation**: 8 major Indian tech hubs with $\pm 500\text{m}$ spatial Gaussian GPS jitter.

### 3. 🛡️ [Anti-Detection Mechanics](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)
Learn how the engine achieves 100% undetectability:
- **Automation Flag Elimination**: Defeating `navigator.webdriver`, CDP leakage, and fingerprint anomalies.
- **9-Stage Human Pointer Event Cascade**: Realistic mouse and pointer dispatching.
- **Natural Coordinate Jitter**: Gaussian spatial randomized offsets ($\pm 4\text{px}$).
- **Behavioral Timing Models**: Randomized pacing (3s–7s) preventing anomaly detection.

### 4. 📊 [Data Schema Reference](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md)
Complete specification of the enriched job databases:
- **High-CPC Dataset (`jobs_all_high_cpc.json`)**: 10,000 records from all 100 API pages.
- **Recommendation Dataset (`jobs_high_cpc.json`)**: 8,987 records.
- **Queue Schemas (`jobs_all_high_cpc_queue.json` & `jobs_queue.json`)**: Formatted application URLs.

### 5. 🌐 [GitHub & jsDelivr CDN Deployment Guide](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md)
How to host, distribute, and execute the bot with zero setup:
- **jsDelivr CDN Endpoints**: Real-time CDN script URLs for `cpc_applier.js` and `auto_applier.js`.
- **Bookmarklets & Userscripts**: 1-click execution payloads.
- **Cache Invalidation**: Instant purging via jsDelivr Purge API.

---

## 🔗 Quick Links

- [Project Root README](file:///d:/DEVELOPMENT/all-bots/README.md)
- [10k High-CPC Applier: `cpc_applier.js`](file:///d:/DEVELOPMENT/all-bots/cpc_applier.js)
- [Standard Auto Applier: `auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js)
- [10k High-CPC Queue: `jobs_all_high_cpc_queue.json`](file:///d:/DEVELOPMENT/all-bots/jobs_all_high_cpc_queue.json)
- [Playwright Applier: `global-applier/playwright_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/playwright_applier.js)
