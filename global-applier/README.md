# 🌍 Zero-Footprint: Multi-City Batch Auto-Applier Suite

A high-performance automated application suite featuring **Chrome & Edge browser rotation**, **10,000 High-CPC queue execution (`--queue jobs_all_high_cpc_queue.json`)**, **range slicing (`--start 500 --end 900`)**, **100% OS-level disposable profiles**, **multi-city domestic geo-rotation with spatial GPS jitter**, and **10-second destination page load timers**.

---

## 📁 Package Structure

| File | Purpose |
| :--- | :--- |
| **[`playwright_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/playwright_applier.js)** | Node.js Playwright runner with **Chrome & Edge rotation**, **custom queue loading**, **range limits (`--start`/`--end`)**, and **auto-next mode**. |
| **[`global_applier.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/global_applier.js)** | In-browser 1-by-1 auto-applier with white frosted glass HUD, vector SVGs, and dual-tab auto-closer. |
| **[`fetch_by_location.js`](file:///d:/DEVELOPMENT/all-bots/global-applier/fetch_by_location.js)** | Location-specific job fetcher saving clean separate JSON files (`jobs_in.json`, `jobs_us.json`, `jobs_uk.json`, etc.). |
| **[`jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/jobs_queue.json)** | Standard recommendation queue of job openings. |

---

## 🎯 Command Reference

### 1. 💎 Run the 10,000 High-CPC Queue (Chrome & Edge Rotation)
```powershell
node playwright_applier.js --queue jobs_all_high_cpc_queue.json --batch 50 --browser rotate --headed
```

### 2. 🎯 Run Section 500 to 900 (Chrome & Edge)
```powershell
node playwright_applier.js --start 500 --end 900 --batch 50 --browser rotate --headed
```

### 3. ⚡ Continuous Execution with Auto-Next
```powershell
node playwright_applier.js --queue jobs_all_high_cpc_queue.json --batch 50 --browser rotate --auto-next --headed
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
