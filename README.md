# 🕶️ Zero-Footprint: 100% Undetectable In-Browser Auto-Applier

A high-performance, **zero-footprint**, 100% undetectable in-browser automation suite for high-volume job applications on Artha. Operates directly inside your active authenticated browser session with zero webdriver flags.

---

## 📁 Clean Repository Structure

```text
all-bots/
├── index.html          # 🌐 Live Web Portal (Browse roles, amounts & apply directly)
├── auto_applier.js     # ⚡ Core In-Browser Sequential Auto-Applier (Floating HUD)
├── fetch_jobs.js       # 🚀 Comprehensive Multi-Pipeline Fresh Jobs Fetcher
├── jobs.json           # 📋 Full Metadata Catalog for all fetched active jobs
├── jobs_queue.json     # 🔗 Deduplicated Direct Application URLs
├── jobs_data.js        # 📦 Instant zero-setup data loader for index.html
├── package.json        # ⚙️ Clean Project Configuration & Scripts
└── README.md           # 📖 Documentation
```

---

## ✨ Key Features

- **🛡️ 100% Undetectable Execution**: Zero automation flags (`navigator.webdriver === false`), native human execution context, 9-stage pointer event cascade.
- **⚡ High-Volume Queue**: Pre-populated with real-time active openings, prioritized by highest CPC first.
- **🎯 Configurable Batch Size**: Toggle between **25**, **50**, **100**, or **200** jobs per batch directly on the floating HUD.
- **⏱️ Granular Pacing Delay**: Select from multiple human delay profiles (**1s**, **2s**, **3s**, **5s**, **8s**, **10s**, **15s**) with scaled destination telemetry hold.
- **🧼 Deep Zero-Footprint Purge**: Cleans `document.cookie`, `sessionStorage`, and `localStorage` after each job.
- **🪟 Smart Multi-Tab Auto-Closer**: Handles gateway redirects, destination pages, and closes tabs sequentially.
- **💾 Session Resume & Controls**: Persistent state in `localStorage` with pause, resume, skip, and reset.

---

## 🚀 How to Run

### 1. Fetch Fresh Jobs
Wipes old cache files, pulls all live active listings (CPC prioritized), and updates the bot queue:

```bash
npm run fetch
```
*(Or `node fetch_jobs.js`)*

### 2. Run the Auto-Applier in Browser
1. Open [artha.link](https://artha.link) in Google Chrome (or Edge/Brave) and log in.
2. Press `F12` to open DevTools, then click the **Console** tab.
3. Open [`auto_applier.js`](auto_applier.js), copy the entire file, paste it into the Console, and press **Enter**.
4. The floating HUD will appear at the top-right. Click **Start Applying** to begin!

---

## 🛠️ Global Console API
While the applier is running in the browser, you can control it anytime from the DevTools console:
```javascript
window.__AUTO_APPLIER__.start();         // Start / Resume application queue
window.__AUTO_APPLIER__.pause();         // Pause queue
window.__AUTO_APPLIER__.skip();          // Skip to next job
window.__AUTO_APPLIER__.reset();         // Reset queue progress
window.__AUTO_APPLIER__.setBatchSize(50);// Change batch size
window.__AUTO_APPLIER__.cleanup();       // Remove HUD and stop session
```
