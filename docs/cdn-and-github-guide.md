# 🌐 GitHub & jsDelivr CDN Deployment & Execution Guide

This guide provides end-to-end instructions for hosting the **Zero-Footprint** project on **GitHub** ([Naman-mahi/zero-footprint](https://github.com/Naman-mahi/zero-footprint)) and serving [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js) globally via the **jsDelivr CDN** with zero infrastructure costs, high availability, and instant execution.

---

## 🏗️ 1. Repository Details

- **GitHub Repository**: [https://github.com/Naman-mahi/zero-footprint](https://github.com/Naman-mahi/zero-footprint)
- **Primary Branch**: `master`
- **Clone URL (SSH)**: `git@github.com:Naman-mahi/zero-footprint.git`
- **Clone URL (HTTPS)**: `https://github.com/Naman-mahi/zero-footprint.git`

### Git Workflow Commands:

```bash
# Check status of local changes
git status

# Stage updated files and docs
git add .

# Commit updates
git commit -m "docs: update guides and repo links"

# Push directly to master branch
git push origin master
```

---

## ⚡ 2. jsDelivr CDN Endpoints

jsDelivr provides an automated, free global CDN for all public GitHub repositories. Every commit pushed to GitHub is immediately accessible worldwide.

### Standard URL Syntax:

```text
https://cdn.jsdelivr.net/gh/<USER>/<REPO>@<VERSION>/<FILE>
```

| Type | URL Pattern | Live URL |
| :--- | :--- | :--- |
| **Latest on `master` Branch** | `https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js` | [Open CDN Script](https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js) |
| **Data Feed via CDN** | `https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/data.json` | [Open CDN Data](https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/data.json) |
| **Release Tag (e.g. v1.0.0)** | `https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@v1.0.0/browser_bot.js` | Immutable production tag |
| **Instant Cache Purge** | `https://purge.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js` | [Purge Cache](https://purge.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js) |

---

## 🚀 3. Execution Methods Using jsDelivr

### Method A: Browser DevTools Console One-Liner

Open Developer Tools (`F12` -> Console) on your target page (e.g., `https://example-job-portal.com`) and run:

```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js?_t=${Date.now()}`)
  .then(res => res.text())
  .then(code => { eval(code); console.log("✅ Zero-Footprint Bot loaded from jsDelivr CDN!"); })
  .catch(err => console.error("❌ Failed to load bot:", err));
```

---

### Method B: One-Click Browser Bookmarklet

A bookmarklet allows you to launch the bot on any webpage without opening DevTools:

#### Setup Instructions:
1. Open your browser Bookmarks Manager (`Ctrl + Shift + O` on Chrome/Edge or `Cmd + Option + B` on macOS).
2. Click **Add New Bookmark**.
3. Name: `⚡ Launch Apply Bot`.
4. URL / Location: Paste the following single-line code:

```javascript
javascript:(function(){const s=document.createElement('script');s.type='text/javascript';s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js?t='+Date.now();document.head.appendChild(s);})();
```

5. Click **Save**.
6. Whenever you are on `https://example-job-portal.com`, simply click the bookmark in your bookmarks bar. The floating HUD will immediately inject and appear.

---

### Method C: Tampermonkey / Violentmonkey Userscript

For automated loading every time you visit the target site:

```javascript
// ==UserScript==
// @name         Zero-Footprint Auto Loader (jsDelivr CDN)
// @namespace    https://github.com/Naman-mahi/zero-footprint
// @version      1.0.0
// @description  Loads the latest undetectable apply bot from jsDelivr CDN
// @author       Naman-mahi
// @match        https://example-job-portal.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    // Prevent duplicate injections
    if (document.getElementById('auto-applier-cdn-script')) return;

    const script = document.createElement('script');
    script.id = 'auto-applier-cdn-script';
    script.type = 'text/javascript';
    script.src = `https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js?_t=${Date.now()}`;
    document.body.appendChild(script);
})();
```

---

## 🔄 4. Cache Management & Instant Purge

jsDelivr caches files aggressively to optimize global performance:
- **Branch references (`@master`)**: Cached at edge servers for up to **12 hours** to 24 hours.
- **Release tags (`@v1.0.0`)**: Cached **permanently** (immutable).

### How to Force an Instant Cache Purge

When you push updates to `master` and need changes to reflect immediately:

#### 1. Via Purge API URL:
Prefix the jsDelivr URL with `purge.` instead of `cdn.`:
```text
https://purge.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js
```
Open that URL in your browser or make a GET request; jsDelivr will return a JSON confirmation:
```json
{
  "status": "finished",
  "paths": {
    "/gh/Naman-mahi/zero-footprint@master/browser_bot.js": { "purged": true }
  }
}
```

#### 2. Via Client-Side Cache Busting Parameter:
Append `?_t=${Date.now()}` to bypass local browser and proxy caches:
```javascript
const cdnUrl = `https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js?_t=${Date.now()}`;
```

---

## 🔒 5. Content Security Policy (CSP) & CORS Notes

- **CORS**: jsDelivr sends open `Access-Control-Allow-Origin: *` headers, allowing `fetch()` from any origin or domain.
- **CSP**: If target websites enforce strict `script-src` Content Security Policies that block remote script tags, use the **`fetch().then(eval)`** method or paste the script directly into the browser console (the console execution context is exempt from page CSP restrictions).

---

## 📚 Related Documentation

- [Anti-Detection Architecture](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)
- [Browser Bot Engine Reference](file:///d:/DEVELOPMENT/all-bots/docs/browser-bot.md)
- [Data Feed Schema Guide](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md)
- [Docs Central Hub](file:///d:/DEVELOPMENT/all-bots/docs/README.md)
