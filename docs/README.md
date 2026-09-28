# 📚 Zero-Footprint Documentation Hub

Welcome to the comprehensive documentation suite for **Zero-Footprint** ([GitHub Repository](https://github.com/Naman-mahi/zero-footprint)). This hub provides detailed technical guides on architecture, anti-detection mechanisms, in-browser bots, data schemas, and deployment via GitHub and jsDelivr CDN.

---

## 📑 Documentation Index

```text
docs/
├── README.md                  # (You are here) Central documentation index
├── auto-applier.md            # In-browser appliers (auto_applier.js & global_applier.js) reference
├── anti-detection.md          # In-depth guide on anti-detection mechanics & evasion
├── data-schema.md             # Detailed schemas for jobs.json & jobs_queue.json
├── browser-bot.md             # Technical reference & architecture of browser_bot.js
└── cdn-and-github-guide.md    # Hosting on GitHub, jsDelivr CDN distribution, & loaders
```

---

## 🧭 Navigation Guide

### 1. ⚡ [In-Browser Appliers: `auto_applier.js` & `global_applier.js`](file:///d:/DEVELOPMENT/all-bots/docs/auto-applier.md)
Specialized in-browser bots for high-volume execution:
- **Sequential 1-by-1 Processing**: Eliminates browser crashes and CPU/RAM overload.
- **Dynamic Batch Sizing**: On-the-fly toggling between `25`, `50`, and `100` jobs per batch.
- **Per-Job Zero-Footprint Purge**: Deep purge of `document.cookie` (root & subdomains), `sessionStorage`, and `localStorage` after **every** application.
- **10-Second Destination Hold**: Holds destination tabs open for full tracking pixel hydration.
- **3-Tab Auto-Closing**: Manages controller, job page, affiliate redirect, and destination page.

### 2. 🛡️ [Anti-Detection Mechanics](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)
Learn how the engine achieves 100% undetectability:
- **Automation Flag Elimination**: Defeating `navigator.webdriver`, CDP leakage, and fingerprint anomalies.
- **9-Stage Human Pointer Event Cascade**: Realistic mouse and pointer dispatching.
- **Natural Coordinate Jitter**: Gaussian spatial randomized offsets ($\pm 5\text{px}$).
- **Behavioral Timing Models**: Randomized pacing (3s–7s) preventing anomaly detection.

### 3. 📊 [Data Schema Reference](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md)
Complete specification of the enriched job databases:
- **Active Jobs Dataset (`jobs.json`)**: 2,000+ active job openings.
- **Queue Schema (`jobs_queue.json`)**: Clean application URLs ready for execution.

### 4. 🌐 [GitHub & jsDelivr CDN Deployment Guide](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md)
How to host, distribute, and execute the bot with zero setup:
- **jsDelivr CDN Endpoints**: Real-time CDN script URLs for `auto_applier.js` and `global_applier.js`.
- **Bookmarklets & Userscripts**: 1-click execution payloads.
- **Cache Invalidation**: Instant purging via jsDelivr Purge API.

---

## 🔗 Quick Links

- [Project Root README](file:///d:/DEVELOPMENT/all-bots/README.md)
- [Standard Auto Applier: `auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js)
- [Global Applier: `global-applier/global_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/global_applier.js)
- [Active Job Queue: `jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/jobs_queue.json)
