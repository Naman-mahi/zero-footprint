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

### 1. 🌐 iOS Web App Portal (`index.html`)

A native iPhone-styled web portal with an iOS bottom tab bar, live earnings tracker, and application ledger:

1. Double-click **`index.html`** in Windows Explorer (or open with Chrome / Safari / Edge).
2. **Native iOS Bottom Tabs:**
   - 💼 **Jobs Tab:** Browse all available high-yield jobs (sorted by highest CPC). Tapping **Apply** opens the application, moves it out of the feed, and logs your earnings.
   - ✅ **Applied Tab:** Review your submitted applications with exact timestamps, total earnings calculated, and options to re-visit or restore jobs.
   - 👤 **Profile & Earnings Tab:** View your cumulative earnings dashboard (**Total Earned**, **Applied Count**, **Average Payout/Job**, **Remaining Pipeline Value**), track your daily application goal progress, or clear/export your LocalStorage history.

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

**Option A (1-Line Console Script):**
Paste this into the DevTools Console and press Enter:
```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?_t=${Date.now()}`).then(r => r.text()).then(eval);
```

**Option B (Manual Paste):**
1. Open [`auto_applier.js`](auto_applier.js), select all code (`Ctrl + A`), copy it (`Ctrl + C`).
2. Paste it into the Console and press **Enter**.

The **Pure White Floating HUD** will appear at the top-right of your screen. Click **Start Applying**!

---

### 3. 🔄 Fetch Fresh Jobs (`fetch_jobs.js`)

Whenever you want to wipe the old cache and pull all the latest high-yield listings from Artha:

```bash
npm run fetch
```
*(Or run `node fetch_jobs.js` directly)*

#### 🎯 Strict High-Yield CPC Rules (Future Guarantee):
- **Minimum Threshold (`>= $0.010`):** Automatically discards all sub-$0.01 / `0.00x` listings (such as `$0.007`, `$0.008`, and `$0.000`). Only jobs paying at least `$0.010` (up to `$0.160+`) are kept.
- **Configurable:** If you ever want to adjust this threshold in the future, change `MIN_CPC_THRESHOLD = 0.01;` on line 29 of [`fetch_jobs.js`](fetch_jobs.js).
- **Auto-Sync:** Wipes old files, writes fresh metadata to `jobs.json` and `jobs_data.js`, and syncs the new queue into `auto_applier.js`.

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
