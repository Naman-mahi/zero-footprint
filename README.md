# 🕶️ Zero-Footprint: Undetectable In-Browser & Playwright Automation Suite

[![GitHub Repo](https://img.shields.io/badge/GitHub-Naman--mahi%2Fzero--footprint-blue?logo=github)](https://github.com/Naman-mahi/zero-footprint)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/gh/Naman-mahi/zero-footprint/badge)](https://www.jsdelivr.com/package/gh/Naman-mahi/zero-footprint)
[![Anti-Detection](https://img.shields.io/badge/Anti--Detection-100%25%20Undetectable-brightgreen.svg)](#-why-it-is-100-undetectable)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave%20%7C%20Firefox-orange.svg)](#)

A high-performance, **zero-footprint**, 100% undetectable automation suite for high-volume job applications. Operates both as a **client-side in-browser bot** directly inside your active authenticated browser session, and as a **production-grade Playwright multi-browser runner** with OS-level disposable temporary profiles.

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [📊 Queues & Architecture Overview](#-queues--architecture-overview)
- [⚡ Quick Start: In-Browser Appliers](#-quick-start-in-browser-appliers)
  - [1. 💎 High-CPC 10,000 Queue (`cpc_applier.js`)](#1--high-cpc-10000-queue-cpc_applierjs)
  - [2. ⚡ Standard Recommendation Queue (`auto_applier.js`)](#2--standard-recommendation-queue-auto_applierjs)
- [🎭 Quick Start: Multi-Browser Playwright Engine](#-quick-start-multi-browser-playwright-engine)
- [🔄 Deep Job Fetchers & API Integration](#-deep-job-fetchers--api-integration)
- [🛡️ Anti-Detection & Zero-Footprint Deep Purge](#️-anti-detection--zero-footprint-deep-purge)
- [📁 Repository & File Structure](#-repository--file-structure)
- [📖 Documentation Hub](#-documentation-hub)
- [⚠️ Troubleshooting & FAQs](#️-troubleshooting--faqs)

---

## ✨ Key Features

- **🛡️ 100% Undetectable Execution**: Zero automation flags (`navigator.webdriver === false`), native human execution context, 9-stage pointer event cascade.
- **💎 10,000 High-CPC Dedicated Queue**: Paged and extracted all 100 pages (`cpc_value: 0.048`, `sort_by: "high_cpc"`) into dedicated data files and appliers.
- **🎯 Dynamic User-Selectable Batch Sizes**: Toggle between **25**, **50**, or **100 jobs per batch** on the fly from the floating HUD or CLI.
- **🧼 Per-Job Deep Zero-Footprint Purge**: Completely purges `document.cookie` (root domain + subdomains), `sessionStorage`, `localStorage`, and `IndexedDB` **after every single job application**.
- **⏳ 10-Second Mandatory Destination Hydration**: Holds employer landing pages open for 10 seconds to ensure tracking beacons, affiliate pixels, and analytics scripts fully register.
- **🪟 3-Tab Auto-Closing System**: Seamlessly manages the Main Controller Tab, Job Detail Page (Tab 1), Affiliate Redirect (Tab 2), and Final Destination (Tab 3), closing target tabs cleanly.
- **🌐 Dual-Browser Rotation (Playwright Engine)**: Alternates each job between native **Google Chrome** and **Microsoft Edge** binaries with $\pm 500\text{m}$ spatial Gaussian GPS jitter.
- **💾 Persistent State Isolation**: Standalone progress tracking in `localStorage` for both standard and high-CPC queues with pause, skip, and reset.

---

## 📊 Queues & Architecture Overview

| Queue Name | Records | Target Filter | Data File | Applier Script | Playwright Queue |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **💎 High-CPC 10,000 Queue** | **10,000 Jobs** | `cpc_value: 0.048`<br>`sort_by: high_cpc`<br>`location: IN` | [`jobs_all_high_cpc.json`](file:///d:/DEVELOPMENT/all-bots/jobs_all_high_cpc.json) (2.83 MB) | [`cpc_applier.js`](file:///d:/DEVELOPMENT/all-bots/cpc_applier.js) | [`jobs_all_high_cpc_queue.json`](file:///d:/DEVELOPMENT/all-bots/jobs_all_high_cpc_queue.json) (0.89 MB) |
| **⚡ Standard Queue** | **8,987 Jobs** | `pulse_variant: control`<br>`location: IN` | [`jobs_high_cpc.json`](file:///d:/DEVELOPMENT/all-bots/jobs_high_cpc.json) (2.34 MB) | [`auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js) | [`jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/jobs_queue.json) (0.80 MB) |

---

## ⚡ Quick Start: In-Browser Appliers

### 1. 💎 High-CPC 10,000 Queue (`cpc_applier.js`)

Operates the complete 10,000 High-CPC queue with isolated state storage (`__CPC_ZERO_FOOTPRINT_STATE__`).

#### Option A: DevTools Console (Zero Install)
1. Open target website in Chrome / Edge / Brave / Firefox and log in.
2. Press `F12` to open DevTools, switch to **Console**.
3. Run the remote loader or paste [`cpc_applier.js`](file:///d:/DEVELOPMENT/all-bots/cpc_applier.js):
```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/cpc_applier.js?_t=${Date.now()}`)
  .then(r => r.text())
  .then(eval);
```

#### Option B: 1-Click Browser Bookmarklet
Create a bookmark named `💎 10k High-CPC Applier` with URL:
```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/cpc_applier.js?t='+Date.now();document.head.appendChild(s);})();
```

---

### 2. ⚡ Standard Recommendation Queue (`auto_applier.js`)

Operates the standard 8,987 recommendation queue with state stored in `__ZERO_FOOTPRINT_STATE__`.

#### Option A: DevTools Console
```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?_t=${Date.now()}`)
  .then(r => r.text())
  .then(eval);
```

#### Option B: 1-Click Browser Bookmarklet
Create a bookmark named `⚡ 1-by-1 Auto Applier` with URL:
```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?t='+Date.now();document.head.appendChild(s);})();
```

---

## 🎭 Quick Start: Multi-Browser Playwright Engine

For automated headless or headed execution on Node.js using **Google Chrome** and **Microsoft Edge** rotation with OS-level disposable temporary profiles:

### 1. Run the 10,000 High-CPC Queue
```powershell
# Run with Chrome & Edge rotation (50-job batch, visible browser)
npm run apply:cpc

# Or with custom options:
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --batch 50 --browser rotate --headed
```

### 2. Run Range Slices (e.g. Jobs 500 to 900)
```powershell
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --start 500 --end 900 --batch 50 --browser rotate --headed
```

### 3. Continuous Execution with Auto-Next
```powershell
# Automatically proceeds to next batch after 30s rest
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --batch 50 --auto-next --headed
```

### 4. Resume from Saved State
```powershell
node global-applier/playwright_applier.js --resume --headed
```

---

## 🔄 Deep Job Fetchers & API Integration

We provide dedicated fetch scripts to refresh data directly from Artha APIs:

### 1. Fetch 10,000 High-CPC Jobs (`fetch_all_cpc_pages.js`)
Paginates through all 100 pages of `cpc_value: 0.048` & `sort_by: "high_cpc"`:
```powershell
npm run fetch:cpc
# Generates: jobs_all_high_cpc.json (metadata) & jobs_all_high_cpc_queue.json (URLs)
```

### 2. Fetch Recommendation Feed (`fetch_recommend_jobs.js`)
Paginates the recommendation feed:
```powershell
npm run fetch:recommend
# Generates: jobs_high_cpc.json (metadata) & jobs_queue.json (URLs)
```

---

## 🛡️ Anti-Detection & Zero-Footprint Deep Purge

| Mechanism | Implementation Details | Benefit |
| :--- | :--- | :--- |
| **Per-Job Storage Purge** | Cleans `document.cookie` (root & subdomains), `sessionStorage`, `localStorage`, and `IndexedDB` after **each** job. | Zero persistent tracking beacons or session leakage across applications. |
| **Batch Size Customizer** | HUD selector allows picking `25`, `50`, or `100` jobs per batch dynamically. | Adapts execution pace to user preference and workflow constraints. |
| **Destination Hydration** | 10-second mandatory dwell time on final target URL. | Ensures affiliate tracking pixels and advertiser conversion cookies fire completely. |
| **Event Cascade** | 9-stage sequence: `pointerover` $\to$ `mouseover` $\to$ `pointerdown` $\to$ `mousedown` $\to$ `focus` $\to$ `pointerup` $\to$ `mouseup` $\to$ `click`. | 100% passes DOM event listener validation and anti-bot heuristics. |
| **Spatial Coordinate Jitter** | Calculates element center + Gaussian random offset ($\pm 4\text{px}$). | Prevents pixel-exact coordinate detection. |
| **Multi-City Geo Rotation** | Rotates between Bengaluru, Hyderabad, Mumbai, Pune, Chennai, Delhi NCR, Kolkata, Ahmedabad. | Avoids single-IP/coordinate geo-clustering. |

---

## 📁 Repository & File Structure

```text
zero-footprint/
├── README.md                          # Main repository guide (You are here)
├── package.json                       # Project dependencies & npm run scripts
│
├── 🤖 IN-BROWSER APPLIERS:
│   ├── cpc_applier.js                 # Dedicated 10,000 High-CPC in-browser bot (selectable batch, per-job purge)
│   ├── auto_applier.js                # Standard recommendation in-browser bot (8,987 jobs)
│   └── browser_bot.js                 # Minimal prototype in-browser bot
│
├── 📊 DATA FILES & QUEUES:
│   ├── jobs_all_high_cpc.json         # 10,000 High-CPC jobs with complete rich metadata (2.83 MB)
│   ├── jobs_all_high_cpc_queue.json   # 10,000 High-CPC clean application URLs queue (0.89 MB)
│   ├── jobs_high_cpc.json             # 8,987 recommendation jobs with rich metadata (2.34 MB)
│   └── jobs_queue.json                # 8,987 recommendation clean URLs queue (0.80 MB)
│
├── 🔄 API FETCHERS:
│   ├── fetch_all_cpc_pages.js         # Paginates all 100 pages of cpc_value: 0.048 & sort_by: high_cpc
│   └── fetch_recommend_jobs.js        # Paginates recommend jobs API
│
├── 🎭 PLAYWRIGHT RUNNER ENGINE:
│   └── global-applier/
│       ├── playwright_applier.js      # Production multi-browser & multi-city Playwright runner
│       ├── global_applier.js          # In-browser global runner
│       ├── fetch_by_location.js       # Country-filtered fetcher (IN, US, UK, CA, DE)
│       └── README.md                  # Playwright runner documentation
│
└── 📖 DOCUMENTATION SUITE:
    └── docs/
        ├── README.md                  # Documentation Hub Index
        ├── auto-applier.md            # In-Browser Applier Deep Reference & HUD Guide
        ├── playwright-runner.md       # Playwright CLI & Multi-Browser Rotation Guide
        ├── anti-detection.md          # In-depth Anti-Detection & Event Cascade Spec
        ├── data-schema.md             # Complete JSON Data Schemas & Extraction Guide
        ├── browser-bot.md             # In-Browser Bot Architecture & Selectors
        └── cdn-and-github-guide.md    # jsDelivr CDN Hosting & Bookmarklet Setup
```

---

## 📖 Documentation Hub

- [📚 Documentation Index](file:///d:/DEVELOPMENT/all-bots/docs/README.md)
- [⚡ Auto-Applier & CPC Applier Guide](file:///d:/DEVELOPMENT/all-bots/docs/auto-applier.md)
- [🚀 Playwright Runner CLI Reference](file:///d:/DEVELOPMENT/all-bots/docs/playwright-runner.md)
- [🛡️ Anti-Detection Mechanics](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)
- [📊 Data Schema Reference](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md)
- [🌐 CDN & GitHub Deployment](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md)

---

## ⚠️ Troubleshooting & FAQs

### Q: Why do we clear cookies and storage after each job?
**A:** Job aggregators and affiliate networks drop cross-domain tracking cookies and device fingerprint tokens. Purging storage on every job ensures each application originates with a completely clean slate, preventing session chaining or account correlation.

### Q: How do I switch batch sizes in the in-browser bot?
**A:** On the floating control HUD, click the **Batch Size** buttons (`[25]`, `[50]`, `[100]`). The bot dynamically recalibrates batch bounds and milestones instantly.

### Q: Can I run Playwright without a visible window?
**A:** Yes! Simply omit the `--headed` flag:
```powershell
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --batch 50
```

---

## 📄 License

MIT License — see `LICENSE` for details.
