# 🌍 Zero-Footprint: Multi-Country Batch Auto-Applier

A high-performance automated application suite supporting **50 or 100 applications per batch**, multi-country job extraction (US, UK, India, Canada, Germany), native proxy routing, and dual execution modes (In-Browser HUD or Node.js Playwright Runner).

---

## 📁 Package Contents

| File | Purpose |
| :--- | :--- |
| **[`global_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/global_applier.js)** | In-browser 1-by-1 auto-applier with **50 / 100 batch size toggle**, white frosted glass HUD, vector SVGs, next/prev batch navigation, and dual-tab auto-closer. |
| **[`playwright_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/playwright_applier.js)** | Node.js Playwright runner with **proxy support (`--proxy-server`)**, **geo mocking (`--mock-geo`)**, and 5 location profiles. |
| **[`fetch_by_location.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/fetch_by_location.js)** | Location-specific job fetcher saving clean separate JSON files (`jobs_us.json`, `jobs_uk.json`, `jobs_in.json`, etc.). |
| **[`jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/global-applier/jobs_queue.json)** | Complete embedded queue of 974 global job openings. |

---

## 🌐 1. Fetching Location-Specific JSON Files

Run `fetch_by_location.js` to create separate JSON queues for each country:

```powershell
# Fetch 500 United States Jobs -> saves to jobs_us.json
node fetch_by_location.js US 500

# Fetch 500 United Kingdom Jobs -> saves to jobs_uk.json
node fetch_by_location.js UK 500

# Fetch 500 India Jobs -> saves to jobs_in.json
node fetch_by_location.js IN 500

# Fetch 500 Canada Jobs -> saves to jobs_ca.json
node fetch_by_location.js CA 500

# Fetch 500 Germany Jobs -> saves to jobs_de.json
node fetch_by_location.js DE 500

# Fetch all 5 countries at once (200 jobs each)
node fetch_by_location.js FETCH_ALL 200
```

---

## 💻 2. Running Playwright Batch Applier (`playwright_applier.js`)

### Standard Domestic Execution (India Profile - No Mismatches)
```powershell
node playwright_applier.js --location IN --batch 50 --headed
```

### With a Network Proxy Server
If you route through an external HTTP/SOCKS5 proxy server:
```powershell
node playwright_applier.js --location US --proxy-server "http://proxy.example.com:8080" --batch 50 --headed
```

### With Client-Side Geo Route Interception (For Test/Dev Environments)
```powershell
node playwright_applier.js --location US --mock-geo --batch 50 --headed
```

### Resume from Last Saved Progress
```powershell
node playwright_applier.js --resume --headed
```

---

## 🚀 3. In-Browser HUD Runner (`global_applier.js`)

Run this one-liner in your DevTools console (`F12` -> Console) on [https://artha.link](https://artha.link):

```javascript
fetch(`https://raw.githubusercontent.com/Naman-mahi/zero-footprint/master/global-applier/global_applier.js?_t=${Date.now()}`)
  .then(r => r.text())
  .then(eval);
```
