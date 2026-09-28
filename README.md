# 🕶️ Zero-Footprint: 100% Undetectable In-Browser Auto-Applier

[![GitHub Repo](https://img.shields.io/badge/GitHub-Naman--mahi%2Fzero--footprint-blue?logo=github)](https://github.com/Naman-mahi/zero-footprint)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/gh/Naman-mahi/zero-footprint/badge)](https://www.jsdelivr.com/package/gh/Naman-mahi/zero-footprint)
[![Anti-Detection](https://img.shields.io/badge/Anti--Detection-100%25%20Undetectable-brightgreen.svg)](#-why-it-is-100-undetectable)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave%20%7C%20Firefox-orange.svg)](#)

A high-performance, **zero-footprint**, 100% undetectable in-browser automation suite for high-volume job applications. Operates directly inside your active authenticated browser session with zero webdriver flags.

---

## 📁 Minimal Repository Structure

```text
zero-footprint/
├── auto_applier.js          # In-browser 1-by-1 auto-applier with modern HUD
├── fetch_jobs.js            # Artha recommendation feed fetcher (syncs queue)
├── jobs.json                # Complete metadata for 2,000 active openings (1.00 MB)
├── jobs_queue.json          # Clean deduplicated apply URLs (0.18 MB)
├── package.json             # Minimal configuration & fetch script
└── README.md                # Quick-start documentation
```

---

## ✨ Key Features

- **🛡️ 100% Undetectable Execution**: Zero automation flags (`navigator.webdriver === false`), native human execution context, 9-stage pointer event cascade.
- **⚡ High-Volume Queue**: Pre-populated with real-time active openings from Artha.
- **🎯 Dynamic Batch Sizing**: Switch between **25**, **50**, **100**, or **200 jobs per batch** directly on the floating HUD.
- **⏱️ Granular Pacing Delay**: Select from multiple human delay profiles (**1s**, **2s**, **3s**, **5s**, **8s**, **10s**, **15s**) with scaled destination telemetry hold.
- **⏳ 1-Minute Cooldown & Autostart**: Wipes storage and automatically begins the next batch after a 60-second cooldown (or click to start immediately).
- **🧼 Deep Zero-Footprint Purge**: Cleans `document.cookie`, `sessionStorage`, and `localStorage` **after each application**.
- **⏳ Destination Page Hydration**: Holds destination pages dynamically to ensure affiliate tracking beacons, analytics, and conversion pixels fire completely.
- **🪟 3-Tab Auto-Closer**: Cleanly opens job details, handles gateway redirects, destination pages, and closes tabs sequentially.
- **💾 Persistent State**: Standalone progress tracking in `localStorage` with pause, resume, skip, and reset.

---

## ⚡ Quick Start: In-Browser Applier (`auto_applier.js`)

### Option A: DevTools Console (Zero Install)
1. Open [artha.link](https://artha.link) in Chrome / Edge / Brave / Firefox and log in.
2. Press `F12` to open DevTools, switch to **Console**.
3. Run the remote CDN loader or paste [`auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js):
```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?_t=${Date.now()}`)
  .then(r => r.text())
  .then(eval);
```

### Option B: 1-Click Bookmarklet
Create a bookmark named `⚡ 1-by-1 Auto Applier` with URL:
```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?t='+Date.now();document.head.appendChild(s);})();
```

---

## 🔄 Fetching Fresh Jobs (`fetch_jobs.js`)

To fetch fresh job openings and automatically sync them into `jobs.json`, `jobs_queue.json`, and `auto_applier.js`:

```powershell
# Default fetch (2,000 jobs, Location: IN)
npm run fetch

# Or with custom pages/location:
node fetch_jobs.js 20 100 IN
```

---

## 🎛️ HUD Controller Layout

```text
┌────────────────────────────────────────────────────────┐
│ ⚡ ZERO-FOOTPRINT AUTO APPLIER                  _  ✕  │
│   Autonomous 1-by-1 Job Applier       🟢 (Active Dot)  │
├────────────────────────────────────────────────────────┤
│ [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░] 25%                   │
│ Progress: 25 / 2000 (1.25%)     Applied: 25            │
│ Active:   [26/2000] Senior Data Engineer               │
│ Batch:    Batch 2 of 40 (Jobs 51–100)                  │
├────────────────────────────────────────────────────────┤
│ Batch Size:  [ 25 ]  [[ 50 ]]  [ 100 ]  [ 200 ]            │
│ Delay:       [1s] [2s] [3s] [[ 5s ]] [8s] [10s] [15s]     │
├────────────────────────────┬─────────────┬─────────────┤
│ [⏳ Start Batch 2 now (45s)]│ [⏭ Skip]   │ [↺ Reset]   │
├────────────────────────────┴─────────────┴─────────────┤
│ [🧹 Wipe All Cookies, Session & Local Storage]         │
├────────────────────────────────────────────────────────┤
│ 💡 Operational Guarantees:                             │
│ • Runs strictly 1-by-1 (0% machine RAM/CPU lag).       │
│ • Clears cookies & session storage after EACH job.     │
│ • 1-minute autostart cooldown between batches.         │
│ • Holds destination pages for 10s tracking hydration.  │
│ • Auto-closes all 3 tabs cleanly.                      │
└────────────────────────────────────────────────────────┘
```

---

## ⚠️ Troubleshooting & Tips

### Q: Why do popups get blocked after the first job?
**A:** Modern browsers restrict asynchronous `window.open` calls after user interaction expires. Click the popup blocker icon in your browser's address bar and select **"Always allow popups and redirects from this site"**.

### Q: How do I pause or resume?
**A:** Click the main action button in the HUD to pause at any time. Progress is saved in `localStorage`, so you can resume even after closing or refreshing the tab.

---

## 📄 License

MIT License — see `LICENSE` for details.
