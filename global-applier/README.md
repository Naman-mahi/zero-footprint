# 🌍 Zero-Footprint: Multi-City Batch Auto-Applier Suite

A high-performance automated application suite featuring **100% OS-level disposable profiles**, **multi-city domestic geo-rotation with spatial GPS jitter**, **10-second destination page load timers**, and **batch navigation**.

---

## 📁 Package Structure

| File | Purpose |
| :--- | :--- |
| **[`playwright_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/playwright_applier.js)** | Node.js Playwright runner with **OS-level temp directory deletion**, **multi-city geo-rotation**, **batch selection (`--batch-num`)**, and **auto-next mode**. |
| **[`global_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/global_applier.js)** | In-browser 1-by-1 auto-applier with **50 / 100 batch size toggle**, white frosted glass HUD, vector SVGs, and dual-tab auto-closer. |
| **[`fetch_by_location.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/fetch_by_location.js)** | Location-specific job fetcher saving clean separate JSON files (`jobs_in.json`, `jobs_us.json`, `jobs_uk.json`, etc.). |
| **[`jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/global-applier/jobs_queue.json)** | Complete embedded queue of 974 global job openings. |

---

## 🎯 How to Run Batches (50 or 100 Jobs)

### 1. Run Batch 1 (Jobs 1 to 50)
```powershell
node playwright_applier.js --location IN --batch 50 --batch-num 1 --headed
```

### 2. Run Batch 2 (Jobs 51 to 100)
```powershell
node playwright_applier.js --location IN --batch 50 --batch-num 2 --headed
```

### 3. Run Batch 3 (Jobs 101 to 150)
```powershell
node playwright_applier.js --location IN --batch 50 --batch-num 3 --headed
```

### 4. Run All Batches Continuously (30s Cooldown Between Batches)
```powershell
node playwright_applier.js --location IN --batch 50 --auto-next --headed
```

### 5. Resume from Exact Last Progress
```powershell
node playwright_applier.js --resume --headed
```

---

## 🏙️ Multi-City Domestic Geolocation (India)

When running `--location IN`, every job rotates across major Indian tech hubs with **$\pm 500\text{m}$ spatial Gaussian GPS jitter**:

* 📍 **Bengaluru** (`12.9716, 77.5946`)
* 📍 **Hyderabad** (`17.3850, 78.4867`)
* 📍 **Mumbai** (`19.0760, 72.8777`)
* 📍 **Pune** (`18.5204, 73.8567`)
* 📍 **Chennai** (`13.0827, 80.2707`)
* 📍 **Delhi NCR** (`28.6139, 77.2090`)
* 📍 **Kolkata** (`22.5726, 88.3639`)
* 📍 **Ahmedabad** (`23.0225, 72.5714`)

---

## 🧼 100% Zero-Trace Cleansing Guarantee

For every job:
1. Playwright creates a temporary profile directory in the OS temp folder (`fs.mkdtempSync`).
2. Clears CDP storage, cookies, network cache, IndexedDB, and Cache API.
3. Closes the context and **permanently deletes the OS profile folder from disk (`fs.rmSync`)**.
