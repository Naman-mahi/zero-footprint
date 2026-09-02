# 📚 Zero-Footprint Documentation Hub

Welcome to the comprehensive documentation suite for **Zero-Footprint** ([GitHub Repository](https://github.com/Naman-mahi/zero-footprint)). This hub provides detailed guides on architecture, anti-detection mechanisms, file references, data schemas, and deployment via GitHub and jsDelivr CDN.

---

## 📑 Documentation Index

```text
docs/
├── README.md                  # (You are here) Central documentation index
├── auto-applier.md            # High-performance 1-by-1 sequential auto-applier (974+ jobs)
├── anti-detection.md          # In-depth guide on anti-detection mechanics & evasion
├── browser-bot.md             # Technical reference & architecture of browser_bot.js
├── data-schema.md             # Detailed schema, fields, and parsing guide for data.json
└── cdn-and-github-guide.md    # Hosting on GitHub, jsDelivr CDN distribution, & loaders
```

---

## 🧭 Navigation Guide

### 1. ⚡ [High-Performance 1-by-1 Auto-Applier (`auto_applier.js`)](file:///d:/DEVELOPMENT/all-bots/docs/auto-applier.md)
Specialized engine for processing large queues (500–1,000+ jobs) safely:
- **Strict 1-by-1 Sequential Processing**: Ensures zero machine lag, low RAM/CPU footprint.
- **Dual-Tab Auto-Closing**: Opens the job page (Tab 1), clicks apply, handles employer redirect (Tab 2), and closes both tabs.
- **Persistent State & Resume**: Progress stored in `localStorage` with pause, skip, and reset capabilities.

### 2. 🛡️ [Anti-Detection Mechanics](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)
Learn why standard automation bots fail and how this in-browser engine guarantees 100% undetectability:
- **Automation Flag Elimination**: Defeating `navigator.webdriver`, CDP leakage, and browser fingerprint anomalies.
- **Human Pointer Event Cascade**: How 9 individual events are dispatched sequentially with realistic micro-delays.
- **Natural Coordinate Jitter**: Implementing Gaussian spatial randomized offsets ($\pm 4\text{px}$) instead of robotic center clicks.
- **Behavioral Timing Models**: Randomized pacing (3s–10s) preventing rate-limiting and anomaly detection.

### 3. 🤖 [Browser Bot Technical Reference (`browser_bot.js`)](file:///d:/DEVELOPMENT/all-bots/docs/browser-bot.md)
Complete breakdown of the main script:
- **Concurrency & Singleton Lock**: `window.__ARTHA_BOT_INSTANCE__`.
- **Target Job Queue Architecture**: Managing batch applications across multiple openings.
- **Button Detection Strategies**: Multi-tier selector resolution (`id`, `data-experiment-id`, inner text heuristics).
- **Floating HUD Component**: Real-time glassmorphic UI, progress tracking, dynamic state transitions, and responsive controls.

### 4. 📊 [Data Schema Reference (`data.json` & `out_*.json`)](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md)
Complete specification of the enriched job database:
- **Core Entity Structure**: Breakdown of `items` collection and individual job properties.
- **Field Definitions**: IDs, slugs, salary ranges, skills, company metadata, and affiliate redirect parameters.
- **Queue Generator Utility**: Scripts to extract live jobs from `data.json` and `fetch-jobs.js`.

### 5. 🌐 [GitHub & jsDelivr CDN Deployment Guide](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md)
How to host, distribute, and execute the bot with zero setup:
- **Repository Setup**: Live at `https://github.com/Naman-mahi/zero-footprint`.
- **jsDelivr CDN Architecture**: URL patterns, `master` branch access, and automatic caching.
- **Deployment Methods**: 
  - Console dynamic import snippet.
  - One-click browser bookmarklet (`javascript:` URI).
  - Tampermonkey / Violentmonkey userscript integration.
- **Cache Management**: Instant purging via the jsDelivr Purge API.

---

## 🔗 Quick Links

- [Back to Project Root README](file:///d:/DEVELOPMENT/all-bots/README.md)
- [1-by-1 Auto Applier: `auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js)
- [Standard In-Browser Bot: `browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js)
- [Combined 974 Jobs Queue: `jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/jobs_queue.json)
- [GitHub Repository: Naman-mahi/zero-footprint](https://github.com/Naman-mahi/zero-footprint)
