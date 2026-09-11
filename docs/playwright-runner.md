# 🚀 Production Playwright Multi-City & Multi-Browser Runner (`playwright_applier.js`)

This technical reference documents **`global-applier/playwright_applier.js`**, our production-grade Node.js Playwright automation runner featuring **dual-browser rotation across Google Chrome & Microsoft Edge**, **custom queue selection (`--queue jobs_all_high_cpc_queue.json`)**, **job range slicing (`--start 500 --end 900`)**, **100% OS-level disposable temporary profiles**, **multi-city domestic geo-rotation with spatial GPS jitter**, and **10-second destination hydration timers**.

---

## 🌐 Dual-Browser Engine Matrix (Chrome & Edge)

By default, the engine alternates each job between native **Google Chrome** and **Microsoft Edge** binaries:

| Browser Target | Engine | Channel / Mode | Anti-Detection & Profile Capabilities |
| :--- | :--- | :--- | :--- |
| **🟢 Google Chrome** | `chromium` | Native `chrome` channel | Native OS Chrome binary, Chrome 124 UA, CDP protocol storage purge. |
| **🔷 Microsoft Edge** | `chromium` | Native `msedge` channel | Native OS Edge binary, Edge 124 UA, CDP protocol storage purge. |

*(Optional standalone targets: `firefox`, `webkit`, `chromium` via explicit `--browser <name>` or `--browser-list`)*.

---

## 🎯 Command Reference

### 1. 💎 Running the 10,000 High-CPC Queue

```powershell
# Using npm shortcut:
npm run apply:cpc

# Or direct Node command with Chrome/Edge rotation in headed mode:
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --batch 50 --browser rotate --headed
```

### 2. 🎯 Running Targeted Job Slices (e.g. Jobs 500 to 900)

To run specifically the section between **Job 500 and Job 900**:

```powershell
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --start 500 --end 900 --batch 50 --browser rotate --headed
```

### 3. ⚡ Continuous Execution with Auto-Next

To let the runner automatically progress through batches with a 30-second cooldown:

```powershell
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --batch 50 --auto-next --headed
```

### 4. 📌 Pinned Single Browser Execution

```powershell
# Strictly in Google Chrome:
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --browser chrome --headed

# Strictly in Microsoft Edge:
node global-applier/playwright_applier.js --queue jobs_all_high_cpc_queue.json --browser msedge --headed
```

### 5. 💾 Resume from Saved State

```powershell
node global-applier/playwright_applier.js --resume --headed
```

---

## 🏙️ Multi-City Domestic Geolocation Database

Each job automatically rotates across major tech hubs with **$\pm 500\text{m}$ spatial Gaussian GPS jitter**:

### 🇮🇳 India (`--location IN`):
| City | Base Latitude | Base Longitude | Timezone | Locale |
| :--- | :--- | :--- | :--- | :--- |
| **Bengaluru** | `12.9716` | `77.5946` | `Asia/Kolkata` | `en-IN` |
| **Hyderabad** | `17.3850` | `78.4867` | `Asia/Kolkata` | `en-IN` |
| **Mumbai** | `19.0760` | `72.8777` | `Asia/Kolkata` | `en-IN` |
| **Pune** | `18.5204` | `73.8567` | `Asia/Kolkata` | `en-IN` |
| **Chennai** | `13.0827` | `80.2707` | `Asia/Kolkata` | `en-IN` |
| **Delhi NCR** | `28.6139` | `77.2090` | `Asia/Kolkata` | `en-IN` |
| **Kolkata** | `22.5726` | `88.3639` | `Asia/Kolkata` | `en-IN` |
| **Ahmedabad** | `23.0225` | `72.5714` | `Asia/Kolkata` | `en-IN` |

---

## ⚙️ CLI Parameter Reference

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `--queue` | `string` | `jobs_queue.json` | Path to target queue file (e.g. `jobs_all_high_cpc_queue.json`). |
| `--start` | `number` | `0` | Zero-based starting job index (e.g. `500`). |
| `--end` | `number` | `null` | Ending job index boundary (e.g. `900`). |
| `--browser` | `string` | `rotate` | Mode: `rotate` (Chrome & Edge), `chrome`, `msedge`, `firefox`, `webkit`. |
| `--batch` | `number` | `50` | Jobs per batch (`25`, `50`, or `100`). |
| `--batch-num` | `number` | `null` | Jump directly to a specific batch number (e.g. `2`). |
| `--location` | `string` | `IN` | Regional profile (`IN`, `US`, `UK`, `CA`, `DE`, `ROTATE`). |
| `--close-wait` | `number` | `10000` | Milliseconds to hold destination page open (minimum 10000ms). |
| `--auto-next` | `flag` | `false` | Automatically proceeds to next batch after 30s rest. |
| `--resume` | `flag` | `false` | Resumes from exact index in `progress_state.json`. |
| `--headed` | `flag` | `false` | Displays visible GUI browser window. |
| `--speed` | `string` | `normal` | Pacing mode: `fast` (3-4.5s), `normal` (4.5-7s), `stealth` (8-12s). |
