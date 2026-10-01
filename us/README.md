# 🇺🇸 Zero-Footprint PRO: US High-CPC Auto-Applier Suite

[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Edge%20%7C%20Brave%20%7C%20Firefox-orange.svg)](#)
[![CPC Rate](https://img.shields.io/badge/CPC%20Rate-Up%20to%20%241.75%2Fclick-brightgreen.svg)](#)
[![Undetectable](https://img.shields.io/badge/Anti--Detection-100%25%20Undetectable-blue.svg)](#)

A dedicated, high-yield automation module specialized exclusively for **United States high-CPC job openings** (up to **$1.75 per click**). Runs directly in your browser with zero webdriver footprint, native human click simulation, sequential 1-by-1 tab orchestration, and automated deep purge.

---

## 📁 US Module Structure

```text
all-bots/
├── us/
│   ├── auto_applier.js     # US in-browser 1-by-1 applier (with 1,973 High-CPC URLs pre-embedded)
│   ├── fetch_jobs.js       # Real-time Artha recommendation fetcher (pulse_variant=control)
│   ├── jobs.json           # Detailed metadata for 1,973 US openings (1.42 MB)
│   ├── jobs_queue.json     # Clean deduplicated apply URLs sorted highest-CPC first (0.20 MB)
│   └── README.md           # Documentation & instructions
├── auto_applier.js         # Base IN catalog applier
├── fetch_jobs.js           # Base IN fetcher
└── package.json            # Root package configuration with `npm run fetch:us`
```

---

## 💎 US High-CPC Highlights

- **💰 Massive CPC Yield**: Includes job openings paying from **$0.78 up to $1.75 per click** (compared to $0.048 in standard feeds).
- **🎯 Highest CPC First**: The queue is strictly ordered in descending order of `cpc_value` so you apply to the most profitable listings first.
- **🛡️ 100% Undetectable Execution**: Operates inside your existing authenticated browser session with full 9-step human pointer dispatch and natural deceleration scroll.
- **⚡ 1-by-1 Sequential Processing**: Never opens more than 1 job at a time, eliminating CPU and memory spikes.
- **🧼 Isolated Deep Purge**: Uses a dedicated storage key (`__ZERO_FOOTPRINT_APPLIER_STATE_US__`) and clears domain cookies, `sessionStorage`, and `localStorage` after **each** job applied.
- **🪟 Dual-Tab Auto-Closer**: Smoothly handles Job Details (Tab 1), Affiliate Redirects (Tab 2), and ATS Destination pages (Tab 3), closing all tabs cleanly after telemetry fires.

---

## 🚀 Quick Start: Running the US Auto-Applier

### Option 1: DevTools Console (Zero Install)

1. Open [artha.link](https://artha.link) in your browser and sign in.
2. Press `F12` to open DevTools and switch to the **Console** tab.
3. Open [`us/auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/us/auto_applier.js), copy the entire content, paste it into the console, and press `Enter`.
4. The floating pure white **US High-CPC HUD** will appear at the top-right corner.
5. Click **"Start Batch 1 (50 Jobs)"** to start.

---

### Option 2: 1-Click Bookmarklet

Create a new browser bookmark:
- **Name:** `🇺🇸 US High-CPC Applier`
- **URL / Location:**
```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/us/auto_applier.js?t='+Date.now();document.head.appendChild(s);})();
```

---

## 🔄 Fetching Fresh US Jobs (`fetch_jobs.js`)

To query Artha's recommendation API for fresh high-CPC US listings and automatically update `jobs.json`, `jobs_queue.json`, and `auto_applier.js`:

```powershell
# From project root:
npm run fetch:us

# Or directly:
node us/fetch_jobs.js
```

### API Endpoint Used:
- **URL:** `https://my.artha.link/api/job-api/recommend?pulse_variant=control`
- **Method:** `POST`
- **Configuration:**
  - `location: "US"`
  - `sort_by: "high_cpc"`
  - Specialized tech niche keywords (DevSecOps, Cloud Security, SRE, Platform Engineer, Kubernetes, AWS, etc.)
  - High-tier US metro hubs (New York, San Francisco, Seattle, Austin, Los Angeles, Chicago, Boston, Denver, etc.)

---

## 🎛️ HUD Controller & Controls

- **Batch Size Switcher:** Choose **25**, **50**, **100**, or **200** jobs per batch.
- **Delay Pacing:** Select human delay between applications (**1s**, **2s**, **3s**, **5s**, **8s**, **10s**, **15s**).
- **Batch Navigation:** Jump forward or backward through batches using `Prev` and `Next`.
- **Wipe Storage Button:** Instantly wipe cookies and session storage on demand.
- **Autostart Cooldown:** 60-second cooldown between batches with countdown timer (or click to start immediately).
- **Persistent State:** Saves progress in `localStorage` under `__ZERO_FOOTPRINT_APPLIER_STATE_US__`. Pause and resume anytime without losing progress.

---

## ⚠️ Important Browser Setup

**Allow Popups & Redirects:**
When applying to the first job, modern browsers may show a popup blocked alert. Click the popup icon in the URL bar and select **"Always allow popups and redirects from artha.link"** to enable smooth 1-by-1 automation.
