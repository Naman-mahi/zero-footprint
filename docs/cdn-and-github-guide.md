# 🌐 GitHub & jsDelivr CDN Deployment & Execution Guide

This guide provides end-to-end instructions for hosting the **All-Bots** project on **GitHub** and serving [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js) globally via the **jsDelivr CDN** with zero infrastructure costs, high availability, and instant execution.

---

## 🏗️ 1. Publishing to GitHub

To make your repository accessible via jsDelivr, initialize Git and publish to a public GitHub repository:

### Step-by-Step GitHub Setup:

```bash
# 1. Navigate to the project folder
cd d:/DEVELOPMENT/all-bots

# 2. Initialize Git repository
git init

# 3. Add all project files and docs
git add .

# 4. Create initial commit
git commit -m "feat: initial release of all-bots undetectable automation suite"

# 5. Set main branch
git branch -M main

# 6. Add your GitHub remote (replace with your repository URL)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git

# 7. Push to GitHub
git push -u origin main
```

---

## ⚡ 2. jsDelivr CDN URL Structure

jsDelivr provides an automated, free global CDN for all public GitHub repositories. As soon as you push code to GitHub, it is immediately accessible worldwide.

### Standard URL Syntax:

```text
https://cdn.jsdelivr.net/gh/<USER>/<REPO>@<VERSION>/<FILE>
```

| Type | URL Pattern | Best Use Case |
| :--- | :--- | :--- |
| **Latest on `main` Branch** | `https://cdn.jsdelivr.net/gh/USER/REPO@main/browser_bot.js` | Rapid development / continuous updates |
| **Version Release Tag** | `https://cdn.jsdelivr.net/gh/USER/REPO@v1.0.0/browser_bot.js` | Production stability (immutable caching) |
| **Specific Commit SHA** | `https://cdn.jsdelivr.net/gh/USER/REPO@4a7b3c8/browser_bot.js` | Exact code audit / frozen execution |
| **Automatic Minification** | `https://cdn.jsdelivr.net/gh/USER/REPO@main/browser_bot.js` | Fast loading over cellular/slow networks |

---

## 🚀 3. Execution Methods Using jsDelivr

### Method A: Browser DevTools Console One-Liner

Open Developer Tools (`F12` -> Console) on your target page and run:

```javascript
fetch(`https://cdn.jsdelivr.net/gh/USER/REPO@main/browser_bot.js?_t=${Date.now()}`)
  .then(res => res.text())
  .then(code => { eval(code); console.log("✅ Bot loaded from jsDelivr CDN!"); })
  .catch(err => console.error("❌ Failed to load bot:", err));
```

---

### Method B: One-Click Browser Bookmarklet

A bookmarklet allows you to launch the bot on any webpage without opening DevTools:

#### Setup Instructions:
1. Open your browser Bookmarks Manager (`Ctrl + Shift + O` or `Cmd + Option + B`).
2. Click **Add New Bookmark**.
3. Name: `⚡ Launch Apply Bot`.
4. URL / Location: Paste the following code:

```javascript
javascript:(function(){const s=document.createElement('script');s.type='text/javascript';s.src='https://cdn.jsdelivr.net/gh/USER/REPO@main/browser_bot.js?t='+Date.now();document.head.appendChild(s);})();
```

5. Click **Save**.
6. Whenever you are on `https://artha.link`, simply click the bookmark in your bookmarks bar. The floating HUD will immediately inject and appear.

---

### Method C: Tampermonkey / Violentmonkey Userscript

For automated loading every time you visit the target site:

```javascript
// ==UserScript==
// @name         All-Bots Auto Loader (jsDelivr CDN)
// @namespace    https://github.com/USER/REPO
// @version      1.0.0
// @description  Loads the latest undetectable apply bot from jsDelivr CDN
// @author       You
// @match        https://artha.link/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    // Prevent multiple script tags
    if (document.getElementById('artha-bot-cdn-script')) return;

    const script = document.createElement('script');
    script.id = 'artha-bot-cdn-script';
    script.type = 'text/javascript';
    script.src = `https://cdn.jsdelivr.net/gh/USER/REPO@main/browser_bot.js?_t=${Date.now()}`;
    document.body.appendChild(script);
})();
```

---

## 🔄 4. Cache Management & Instant Purge

jsDelivr caches files aggressively to optimize global performance:
- **Branch references (`@main`)**: Cached at edge servers for up to **12 hours** to 24 hours.
- **Release tags (`@v1.0.0`)**: Cached **permanently** (immutable).

### How to Force an Instant Cache Purge

When you push updates to `main` and need changes to reflect immediately:

#### 1. Via Purge API URL:
Prefix the jsDelivr URL with `purge.` instead of `cdn.`:
```text
https://purge.jsdelivr.net/gh/USER/REPO@main/browser_bot.js
```
Open that URL in your browser; jsDelivr will return a JSON response confirming the edge cache has been cleared:
```json
{
  "status": "finished",
  "paths": {
    "/gh/USER/REPO@main/browser_bot.js": { "purged": true }
  }
}
```

#### 2. Via Client-Side Cache Busting Parameter:
Append `?_t=${Date.now()}` or `?v=1.0.1` to bypass local browser and proxy caches:
```javascript
const cdnUrl = `https://cdn.jsdelivr.net/gh/USER/REPO@main/browser_bot.js?_t=${Date.now()}`;
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
