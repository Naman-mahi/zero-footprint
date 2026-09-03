# 🚀 Production Playwright Multi-City & Multi-Browser Runner (`playwright_applier.js`)

This technical reference documents **`global-applier/playwright_applier.js`**, our production-grade Node.js Playwright automation runner featuring **dual-browser rotation across Google Chrome & Microsoft Edge**, **job range filtering (`--start 500 --end 900`)**, **100% OS-level disposable temporary profiles**, **multi-city domestic geo-rotation with spatial GPS jitter**, **10-second destination page load timers**, and **batch navigation**.

---

## 🌐 Dual-Browser Engine Matrix (Chrome & Edge)

By default, the engine alternates each application between native **Google Chrome** and **Microsoft Edge** binaries:

| Browser Target | Engine | Channel / Mode | Anti-Detection & Profile Capabilities |
| :--- | :--- | :--- | :--- |
| **🟢 Google Chrome** | `chromium` | Native `chrome` channel | Native OS Chrome binary, Chrome 124 UA, CDP protocol storage purge. |
| **🔷 Microsoft Edge** | `chromium` | Native `msedge` channel | Native OS Edge binary, Edge 124 UA, CDP protocol storage purge. |

*(Optional standalone targets: `firefox`, `webkit`, `chromium` via explicit `--browser <name>` or `--browser-list`)*.

---

## 🎯 Commands for Running Jobs 500 to 900

To run specifically the section between **Job 500 and Job 900** using Chrome and Edge rotation in headed mode:

```powershell
node playwright_applier.js --start 500 --end 900 --batch 50 --browser rotate --headed
```

### Additional Command Variations

```powershell
# 1. Run Jobs 500 to 900 with Auto-Next continuous execution
node playwright_applier.js --start 500 --end 900 --batch 50 --browser rotate --auto-next --headed

# 2. Run Jobs 500 to 900 strictly in Google Chrome
node playwright_applier.js --start 500 --end 900 --batch 50 --browser chrome --headed

# 3. Run Jobs 500 to 900 strictly in Microsoft Edge
node playwright_applier.js --start 500 --end 900 --batch 50 --browser msedge --headed

# 4. Resume execution from saved state
node playwright_applier.js --resume --headed
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
| `--start` | `number` | `0` | Zero-based starting job index (e.g. `500`). |
| `--end` | `number` | `null` | Ending job index boundary (e.g. `900`). |
| `--browser` | `string` | `rotate` | Browser mode: `rotate` (Chrome & Edge), `chrome`, `msedge`, `firefox`, `webkit`. |
| `--batch` | `number` | `50` | Jobs per batch (`50` or `100`). |
| `--location` | `string` | `IN` | Regional profile (`IN`, `US`, `UK`, `CA`, `DE`, `ROTATE`). |
| `--auto-next` | `flag` | `false` | Automatically proceeds to next batch after 30s rest. |
| `--resume` | `flag` | `false` | Resumes from exact index in `progress_state.json`. |
| `--headed` | `flag` | `false` | Displays visible GUI browser window. |
