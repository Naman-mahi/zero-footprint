# 🕶️ Zero-Footprint: Undetectable In-Browser Automation Suite

[![GitHub Repo](https://img.shields.io/badge/GitHub-Naman--mahi%2Fzero--footprint-blue?logo=github)](https://github.com/Naman-mahi/zero-footprint)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/gh/Naman-mahi/zero-footprint/badge)](https://www.jsdelivr.com/package/gh/Naman-mahi/zero-footprint)
[![Anti-Detection](https://img.shields.io/badge/Anti--Detection-100%25%20Undetectable-brightgreen.svg)](#-why-it-is-100-undetectable)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave%20%7C%20Firefox-orange.svg)](#)

A high-performance, **zero-footprint**, 100% undetectable automation suite for high-volume job applications. Operates as a **client-side in-browser bot** directly inside your active authenticated browser session with zero webdriver flags.

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [📊 Queues & Data Overview](#-queues--data-overview)
- [⚡ Quick Start: In-Browser Appliers](#-quick-start-in-browser-appliers)
  - [1. ⚡ Standard Auto Applier (`auto_applier.js`)](#1--standard-auto-applier-auto_applierjs)
  - [2. 🌍 Multi-Country Global Queue (`global_applier.js`)](#2--multi-country-global-queue-global_applierjs)
- [🔄 Deep Job Fetchers & API Integration](#-deep-job-fetchers--api-integration)
- [🛡️ Anti-Detection & Zero-Footprint Deep Purge](#️-anti-detection--zero-footprint-deep-purge)
- [📁 Repository & File Structure](#-repository--file-structure)
- [📖 Documentation Hub](#-documentation-hub)
- [⚠️ Troubleshooting & FAQs](#️-troubleshooting--faqs)

---

## ✨ Key Features

- **🛡️ 100% Undetectable Execution**: Zero automation flags (`navigator.webdriver === false`), native human execution context, 9-stage pointer event cascade.
- **⚡ 2,000+ Active Jobs Queue**: Freshly populated real-time active openings ready to run.
- **🎯 Dynamic User-Selectable Batch Sizes**: Toggle between **25**, **50**, or **100 jobs per batch** on the fly from the floating HUD.
- **⏳ Automatic 1-Minute Batch Autostart**: Never wait for a manual click—automatically purges storage, takes a 60-second organic cooldown with live countdown, and autostarts the next batch.
- **🧼 Per-Job Deep Zero-Footprint Purge**: Completely purges `document.cookie` (root domain + subdomains), `sessionStorage`, and `localStorage` **after every single job application**.
- **⏳ 10-Second Mandatory Destination Hydration**: Holds employer landing pages open for 10 seconds to ensure tracking beacons, affiliate pixels, and analytics scripts fully register.
- **🪟 3-Tab Auto-Closing System**: Seamlessly manages the Main Controller Tab, Job Detail Page (Tab 1), Affiliate Redirect (Tab 2), and Final Destination (Tab 3), closing target tabs cleanly.
- **💾 Persistent State Isolation**: Standalone progress tracking in `localStorage` with pause, skip, and reset.

---

## 📊 Queues & Data Overview

| Queue Name | Records | Target Filter | Data File | Applier Script |
| :--- | :--- | :--- | :--- | :--- |
| **⚡ Active Jobs Queue** | **2,000+ Jobs** | Active Recommendations (`location: IN`) | [`jobs.json`](file:///d:/DEVELOPMENT/all-bots/jobs.json) (1.00 MB) | [`auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js) |
| **🌍 Multi-Country Queue** | **2,000+ Jobs** | Active Recommendations | [`jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/jobs_queue.json) (0.18 MB) | [`global_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/global_applier.js) |

---

## ⚡ Quick Start: In-Browser Appliers

### 1. ⚡ Standard Auto Applier (`auto_applier.js`)

Operates the active 2,000+ recommendations queue with state stored in `__ZERO_FOOTPRINT_STATE__`.

#### Option A: DevTools Console (Zero Install)
1. Open target website in Chrome / Edge / Brave / Firefox and log in.
2. Press `F12` to open DevTools, switch to **Console**.
3. Run the remote loader or paste [`auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js):
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

### 2. 🌍 Multi-Country Global Queue (`global_applier.js`)

Operates the global queue with isolated state storage (`__GLOBAL_ZERO_FOOTPRINT_STATE__`).

#### Option A: DevTools Console
```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/global-applier/global_applier.js?_t=${Date.now()}`)
  .then(r => r.text())
  .then(eval);
```

#### Option B: 1-Click Browser Bookmarklet
Create a bookmark named `🌍 Global Auto Applier` with URL:
```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/global-applier/global_applier.js?t='+Date.now();document.head.appendChild(s);})();
```

---

## 🔄 Deep Job Fetchers & API Integration

Dedicated fetch scripts to refresh data directly from Artha APIs:

### 1. Fetch Fresh Recommendations (`fetch_recommend_jobs.js`)
Paginates through active jobs and syncs queues directly into the scripts:
```powershell
npm run fetch:jobs

# Or with custom pages/location:
node fetch_recommend_jobs.js 20 100 IN
# Generates: jobs.json (metadata) & jobs_queue.json (URLs)
```

### 2. Fetch By Location (`fetch_by_location.js`)
Pulls jobs for a specific country:
```powershell
node global-applier/fetch_by_location.js IN
node global-applier/fetch_by_location.js US
```

---

## 🛡️ Anti-Detection & Zero-Footprint Deep Purge

| Mechanism | Implementation Details | Benefit |
| :--- | :--- | :--- |
| **Per-Job Storage Purge** | Cleans `document.cookie` (root & subdomains), `sessionStorage`, and `localStorage` after **each** job. | Zero persistent tracking beacons or session leakage across applications. |
| **Batch Size Customizer** | HUD selector allows picking `25`, `50`, or `100` jobs per batch dynamically. | Adapts execution pace to user preference and workflow constraints. |
| **Destination Hydration** | 10-second mandatory dwell time on final target URL. | Ensures affiliate tracking pixels and advertiser conversion cookies fire completely. |
| **Event Cascade** | 9-stage sequence: `pointerover` $\to$ `mouseover` $\to$ `pointerdown` $\to$ `mousedown` $\to$ `focus` $\to$ `pointerup` $\to$ `mouseup` $\to$ `click`. | 100% passes DOM event listener validation and anti-bot heuristics. |
| **Spatial Coordinate Jitter** | Calculates element center + Gaussian random offset ($\pm 5\text{px}$). | Prevents pixel-exact coordinate detection. |

---

## 📁 Repository & File Structure

```text
zero-footprint/
├── README.md                          # Main repository guide (You are here)
├── package.json                       # Project configuration & npm run scripts
│
├── 🤖 IN-BROWSER APPLIERS:
│   ├── auto_applier.js                # Active recommendation in-browser bot
│   ├── feed_applier.js                # Live creator feed scanner & clicker
│   ├── browser_bot.js                 # Minimal prototype in-browser bot
│   └── global-applier/
│       ├── global_applier.js          # Multi-country in-browser bot with HUD
│       ├── fetch_by_location.js       # Country-filtered fetcher (IN, US, UK, CA, DE)
│       ├── fetch_global_jobs.js       # Multi-country catalog fetcher
│       └── README.md                  # Global applier suite guide
│
├── 📊 DATA FILES & QUEUES:
│   ├── jobs.json                      # 2,000+ active jobs with complete metadata (1.00 MB)
│   └── jobs_queue.json                # 2,000+ clean application URLs queue (0.18 MB)
│
├── 🔄 API FETCHERS:
│   └── fetch_recommend_jobs.js        # Paginates recommend jobs API & syncs appliers
│
└── 📖 DOCUMENTATION SUITE:
    └── docs/
        ├── README.md                  # Documentation Hub Index
        ├── auto-applier.md            # In-Browser Applier Deep Reference & HUD Guide
        ├── anti-detection.md          # In-depth Anti-Detection & Event Cascade Spec
        ├── data-schema.md             # Complete JSON Data Schemas & Extraction Guide
        ├── browser-bot.md             # In-Browser Bot Architecture & Selectors
        └── cdn-and-github-guide.md    # jsDelivr CDN Hosting & Bookmarklet Setup
```

---

## 📖 Documentation Hub

- [📚 Documentation Index](file:///d:/DEVELOPMENT/all-bots/docs/README.md)
- [⚡ Auto-Applier Guide](file:///d:/DEVELOPMENT/all-bots/docs/auto-applier.md)
- [🛡️ Anti-Detection Mechanics](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)
- [📊 Data Schema Reference](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md)
- [🌐 CDN & GitHub Deployment](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md)

---

## ⚠️ Troubleshooting & FAQs

### Q: Why do we clear cookies and storage after each job?
**A:** Job aggregators and affiliate networks drop cross-domain tracking cookies and device fingerprint tokens. Purging storage on every job ensures each application originates with a clean slate, preventing session chaining or account correlation.

### Q: How do I switch batch sizes in the in-browser bot?
**A:** On the floating control HUD, click the **Batch Size** buttons (`[25]`, `[50]`, `[100]`). The bot dynamically recalibrates batch bounds and milestones instantly.

### Q: Why do popups get blocked after the first job?
**A:** Browsers restrict asynchronous `window.open` calls. Click the popup blocker icon in your browser's address bar and select **"Always allow popups and redirects from this site"**.

---

## 📄 License

MIT License — see `LICENSE` for details.
