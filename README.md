# 🕶️ Zero-Footprint: 100% Undetectable In-Browser Automation Suite

A high-performance, **zero-footprint**, 100% undetectable in-browser automation suite and visual job portal for high-volume job applications on Artha. Operates directly inside your active authenticated browser session with zero webdriver flags or anti-bot footprint.

---

## 📁 Repository Structure

```text
all-bots/
├── index.html          # 🌐 Visual Job Portal (Browse roles, payout amounts & 1-click apply)
├── auto_applier.js     # ⚡ Core In-Browser Auto-Applier (Floating HUD, 1-by-1 tab closer)
├── fetch_jobs.js       # 🚀 Multi-Pipeline Fresh Jobs Fetcher (CPC & Pan-India)
├── jobs.json           # 📋 Full Metadata Catalog for all fetched active jobs
├── jobs_queue.json     # 🔗 Deduplicated Direct Application URLs
├── jobs_data.js        # 📦 Instant zero-setup data loader for index.html
├── package.json        # ⚙️ Project Configuration & NPM Scripts
└── README.md           # 📖 Complete Documentation & Instructions
```

---

## 🚀 Quick Start Guide

### 1. 🌐 View & Apply via Web Portal (`index.html`)

You can visually browse every job, see payout amounts, filter by role/city, and apply manually with 1-click:

1. Double-click **`index.html`** in Windows Explorer (or right-click → **Open with Chrome / Edge / Brave**).
2. Features available on the portal:
   - **Payout Badges:** View exact amounts (e.g., `💰 $0.160 CPC`, `💎 $3.00 CPA`).
   - **Search & Filters:** Search by Job Role, Title, or Company; filter by City (Bengaluru, Hyderabad, Pune, Mumbai, etc.); or sort by highest amount.
   - **Direct Apply:** Click **Apply Now** on any card to immediately launch the application.
   - **Copy Link:** Click the copy icon to grab direct apply URLs.

*(Zero web server required: works straight out of the box via double-click).*

---

### 2. ⚡ Run the Automated Bot (`auto_applier.js`)

The auto-applier runs directly in your active browser console, automating the application flow sequentially one tab at a time with 100% human-like telemetry.

#### ⚙️ Step 1: Allow Pop-ups in Chrome (One-Time Setup)
Because the applier opens and closes job tabs automatically, Chrome needs permission to open pop-ups:
1. Open **[https://artha.link](https://artha.link)** in Chrome.
2. Click the **tune / padlock icon** on the left side of the address bar.
3. Click **Site settings** → Set **Pop-ups and redirects** to **Allow**.

#### 🤖 Step 2: Launch the Applier
1. Go to **[https://artha.link](https://artha.link)** (or `https://my.artha.link`) and log in.
2. Press **`F12`** (or right-click → *Inspect*) to open DevTools, then switch to the **Console** tab.
3. Open [`auto_applier.js`](auto_applier.js), select all code (`Ctrl + A`), copy it (`Ctrl + C`), paste it into the Console, and press **Enter**.
4. The **Pure White Floating HUD** will appear at the top-right of your screen.
5. Click **Start Applying**!

---

### 3. 🔄 Fetch Fresh Jobs (`fetch_jobs.js`)

Whenever you want to wipe the old cache and pull all the latest live listings from Artha:

```bash
npm run fetch
```
*(Or run `node fetch_jobs.js` directly)*

**What this automatically does:**
1. Wipes old cached files (`jobs.json`, `jobs_queue.json`, `jobs_data.js`).
2. Queries the live Artha API across 5 pipelines:
   - High-CPC Indian Catalog (strictly positive CPC).
   - General Indian Feed across all pages.
   - All 18 Official Industry Categories.
   - Major Indian Metros & Tech States.
   - High-demand role keywords (Engineering, Data, Cloud, AI, Management, etc.).
3. Deduplicates all listings and sorts them with the **highest CPC first**.
4. Automatically updates `jobs.json`, `jobs_queue.json`, `jobs_data.js`, and syncs the new queue into `auto_applier.js`.

---

## ✨ Features & Architecture

| Feature | Description |
| :--- | :--- |
| **🛡️ 100% Undetectable** | `navigator.webdriver === false`. Zero headless flags. Native pointer events with Gaussian jitter and human deceleration scroll. |
| **⚡ 1-by-1 Sequential Flow** | Opens 1 job tab at a time, verifies React DOM hydration, clicks Apply, handles redirect tracking, and closes the tab cleanly. Never overloads RAM or CPU. |
| **🧼 Deep Cache Purge** | Automatically purges `document.cookie`, `sessionStorage`, and `localStorage` between applications for a fresh fingerprint. |
| **🎯 Configurable Batches** | Toggle application batch limits (**25**, **50**, **100**, or **200 jobs**) on the fly directly from the HUD. |
| **⏱️ Variable Pacing Delays** | Choose delay speeds from **1s**, **2s**, **3s**, **5s**, **8s**, **10s**, or **15s** with scaled destination telemetry hold. |
| **💾 Persistent Progress** | State is preserved in `localStorage`. You can pause, close your tab, and resume anytime without losing your place. |

---

## 🛠️ Global Console API

While the auto-applier is running in your browser, you can control it programmatically from the DevTools Console:

```javascript
window.__AUTO_APPLIER__.start();          // Start / Resume application queue
window.__AUTO_APPLIER__.pause();          // Pause queue
window.__AUTO_APPLIER__.skip();           // Skip current job and move to next
window.__AUTO_APPLIER__.reset();          // Reset queue progress back to 0
window.__AUTO_APPLIER__.setBatchSize(50); // Set batch size (e.g. 25, 50, 100, 200)
window.__AUTO_APPLIER__.fetchFresh();     // Fetch fresh live jobs directly in browser
window.__AUTO_APPLIER__.cleanup();        // Close HUD and terminate session
```

---

## ❓ Frequently Asked Questions & Troubleshooting

#### 1. Why are job tabs not opening?
Make sure **Pop-ups and redirects** are set to **Allow** in Chrome settings for `https://artha.link`. If blocked, Chrome will display a small red icon in the address bar.

#### 2. Can I use the web page without running Node.js?
**Yes!** Simply double-click `index.html`. It automatically reads from `jobs_data.js` so it opens immediately in any browser without needing a local web server.

#### 3. How do I clear my progress and start from Job #1?
Click the **Reset** icon (circular arrow) on the floating HUD, or run `window.__AUTO_APPLIER__.reset()` in your console.

#### 4. How do I change the speed between applications?
Use the speed dropdown on the HUD to switch between fast (`1s`, `2s`) and extra safe human pacing (`5s`, `8s`, `10s`).
