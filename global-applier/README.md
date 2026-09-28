# 🌍 Zero-Footprint: Multi-Country In-Browser Auto-Applier Suite

A high-performance, 100% undetectable in-browser application suite featuring **multi-country job queues**, **dynamic user-selectable batch sizes (50 vs 100)**, **10-second destination hydration**, and **zero-footprint per-job storage purges**.

---

## 📁 Package Structure

| File | Purpose |
| :--- | :--- |
| **[`global_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/global_applier.js)** | In-browser 1-by-1 auto-applier with white frosted glass HUD, vector SVGs, and dual-tab auto-closer. |
| **[`fetch_by_location.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/fetch_by_location.js)** | Location-specific job fetcher saving clean separate JSON files (`jobs_in.json`, `jobs_us.json`, `jobs_uk.json`, etc.). |
| **[`fetch_global_jobs.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/fetch_global_jobs.js)** | Multi-country catalog fetcher pulling jobs across global regions. |

---

## ⚡ Quick Start: In-Browser Global Applier

### Option A: DevTools Console (Zero Install)
1. Open your browser to [artha.link](https://artha.link) and log in.
2. Press `F12` to open DevTools, switch to the **Console** tab.
3. Paste the contents of [`global_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/global_applier.js) or run:
```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/global-applier/global_applier.js?_t=${Date.now()}`)
  .then(r => r.text())
  .then(eval);
```

### Option B: Bookmarklet
Create a bookmark with URL:
```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/global-applier/global_applier.js?t='+Date.now();document.head.appendChild(s);})();
```

---

## 🔄 Fetching Jobs By Location

Run the location fetcher to generate country-specific queues:
```powershell
# Fetch jobs for India
node global-applier/fetch_by_location.js IN

# Fetch jobs for United States
node global-applier/fetch_by_location.js US

# Fetch jobs across all regions
node global-applier/fetch_global_jobs.js
```
