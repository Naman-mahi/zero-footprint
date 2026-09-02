# 🕶️ Zero-Footprint: Undetectable In-Browser Automation Suite

[![GitHub Repo](https://img.shields.io/badge/GitHub-Naman--mahi%2Fzero--footprint-blue?logo=github)](https://github.com/Naman-mahi/zero-footprint)
[![jsDelivr CDN](https://data.jsdelivr.com/v1/package/gh/Naman-mahi/zero-footprint/badge)](https://www.jsdelivr.com/package/gh/Naman-mahi/zero-footprint)
[![Anti-Detection](https://img.shields.io/badge/Anti--Detection-100%25%20Undetectable-brightgreen.svg)](#-why-it-is-100-undetectable)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20%7C%20Brave%20%7C%20Edge%20%7C%20Firefox-orange.svg)](#)

A zero-footprint, 100% undetectable in-browser automation suite designed to execute automated job applications and user actions directly within your active authenticated browser session.

Unlike traditional automation frameworks (Puppeteer, Playwright, Selenium) which are immediately flagged by anti-bot systems (Cloudflare, DataDome, PerimeterX, Arkose Labs), this bot operates entirely in native client space, generating realistic human pointer event cascades and randomized timing distributions.

---

## 📑 Table of Contents

- [✨ Key Features](#-key-features)
- [🛡️ Why It Is 100% Undetectable](#️-why-it-is-100-undetectable)
- [⚡ High-Performance 1-by-1 Auto-Applier (`auto_applier.js`)](#-high-performance-1-by-1-auto-applier-auto_applierjs)
- [🚀 Quick Start Guide](#-quick-start-guide)
  - [Method 1: Direct Browser Console (Zero Install)](#method-1-direct-browser-console-zero-install)
  - [Method 2: One-Click Bookmarklet](#method-2-one-click-bookmarklet)
  - [Method 3: jsDelivr CDN Remote Loader](#method-3-jsdelivr-cdn-remote-loader)
  - [Method 4: Tampermonkey / Violentmonkey Userscript](#method-4-tampermonkey--violentmonkey-userscript)
- [📁 Repository & File Structure](#-repository--file-structure)
- [⚙️ Configuration & Customization](#️-configuration--customization)
- [🌐 GitHub + jsDelivr CDN Integration](#-github--jsdelivr-cdn-integration)
- [📖 Detailed Documentation](#-detailed-documentation)
- [⚠️ Troubleshooting & FAQs](#️-troubleshooting--faqs)

---

## ✨ Key Features

- **🛡️ 100% Undetectable Execution**: Zero automation flags (`navigator.webdriver === false`), native human execution context.
- **⚡ 1-by-1 Sequential Processing (`auto_applier.js`)**: Protects your machine's CPU & RAM by running strictly 1 tab at a time for 500 to 1,000+ job queues.
- **🪟 Dual-Tab Auto-Closing**: Opens the job page (Tab 1), clicks apply, catches the employer redirect (Tab 2), and closes **both tabs** cleanly.
- **🎯 Full Human Event Cascade**: Dispatches `pointerover`, `mouseover`, `pointerenter`, `pointerdown`, `mousedown`, `focus`, `pointerup`, `mouseup`, and `click` with randomized coordinate jitter ($\pm 4\text{px}$).
- **💾 Session Resume (`localStorage`)**: Never lose your place when running large batches—resume seamlessly from where you stopped.
- **🖥️ Floating Glassmorphic Control Dashboard (HUD)**: Sleek real-time HUD with progress bar, active job info, pause/skip/reset buttons, and pacing speed selectors.
- **📦 Cloud & CDN Ready**: Load and run anywhere with a single-line snippet via **jsDelivr CDN**.

---

## ⚡ High-Performance 1-by-1 Auto-Applier (`auto_applier.js`)

For high-volume application queues (500 to 1,000+ jobs from `out_*.json`), use [`auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js).

### Single-Line Console Loader:
```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?_t=${Date.now()}`)
  .then(r => r.text())
  .then(eval);
```

### 1-Click Bookmarklet:
```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?t='+Date.now();document.head.appendChild(s);})();
```

> 📖 Read the full [Auto-Applier Reference Guide](file:///d:/DEVELOPMENT/all-bots/docs/auto-applier.md) for complete details.

---

## 🛡️ Why It Is 100% Undetectable

Modern web platforms detect bots through automated browser fingerprinting and behavioral telemetry. Here is how this bot bypasses all detection layers:

| Detection Vector | Selenium / Puppeteer / Playwright | Zero-Footprint In-Browser Bot |
| :--- | :--- | :--- |
| **`navigator.webdriver`** | ❌ `true` (Flags bot immediately) | ✅ `false` (Native browser state) |
| **Runtime Flags** | ❌ Chrome DevTools Protocol (CDP) hooks exposed | ✅ Zero CDP hooks or instrumentation |
| **Fingerprint Matching** | ❌ Synthetic canvas/WebGL/audio fingerprints | ✅ Uses your genuine personal browser profile |
| **Event Verification** | ❌ `isTrusted: false` synthetic `click()` only | ✅ Complete pointer cascade + focus + coordinates |
| **Coordinate Telemetry** | ❌ (0, 0) or exact mathematical center clicks | ✅ Random offset jitter ($\pm 4\text{px}$) around button center |
| **Interaction Cadence** | ❌ Instantaneous / static timing (0ms - 50ms) | ✅ Gaussian-distributed micro-delays (3s - 8s) |
| **Authentication & CAPTCHAs** | ❌ Blocked by Cloudflare Turnstile / reCAPTCHA | ✅ Runs inside already-authenticated session |

> 📚 For a full technical deep dive into detection vectors and mitigation algorithms, see [`docs/anti-detection.md`](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md).

---

## 🚀 Quick Start Guide

### Method 1: Direct Browser Console (Zero Install)

1. Open your target website (e.g. [https://artha.link](https://artha.link)) in Chrome, Brave, Edge, or Firefox.
2. Ensure you are logged into your account.
3. Open Developer Tools: Press **`F12`** (or **`Ctrl + Shift + I`** on Windows / **`Cmd + Option + I`** on macOS) and navigate to the **Console** tab.
4. Copy the entire contents of [`auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js) and paste it into the console.
5. Press **`Enter`**.
6. The floating control panel will appear in the bottom-right corner. Click **🚀 Start 1-by-1 Queue**.

---

### Method 2: One-Click Bookmarklet

Create a browser bookmark to launch the bot on any page with one click:

1. Press `Ctrl + D` (or `Cmd + D`) to create a bookmark in your browser bar.
2. Name it: `⚡ 1-by-1 Auto Applier`.
3. Set the **URL** field to the following javascript payload:

```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?t='+Date.now();document.head.appendChild(s);})();
```

---

### Method 3: jsDelivr CDN Remote Loader

Execute the latest version directly in your browser console without copying thousands of lines of code:

```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js?_t=${Date.now()}`)
  .then(res => res.text())
  .then(code => eval(code));
```

---

### Method 4: Tampermonkey / Violentmonkey Userscript

For complete automation on every visit, create a userscript:

```javascript
// ==UserScript==
// @name         Zero-Footprint Auto-Applier
// @namespace    https://github.com/Naman-mahi/zero-footprint
// @version      2.0.0
// @description  100% undetectable sequential 1-by-1 auto applier
// @author       Naman-mahi
// @match        https://artha.link/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js';
    document.body.appendChild(script);
})();
```

---

## 📁 Repository & File Structure

```text
zero-footprint/
├── README.md                      # Main repository documentation & guide
├── auto_applier.js                # High-performance 1-by-1 sequential auto-applier (974+ jobs)
├── browser_bot.js                 # Primary in-browser undetectable automation engine (16 jobs)
├── fetch-jobs.js                  # API fetch utility generating clean job URL lists
├── jobs_queue.json                # Combined deduplicated 974 job URLs queue
├── out_20260902_133307.json       # Batch 1 (500 clean URLs)
├── out_20260902_133816.json       # Batch 2 (500 clean URLs)
├── data.json                      # Scraped & enriched job feeds with full metadata
└── docs/                          # Comprehensive technical documentation suite
    ├── README.md                  # Documentation hub and navigation index
    ├── auto-applier.md            # Reference guide for 1-by-1 dual tab closer engine
    ├── anti-detection.md          # In-depth guide on anti-detection mechanics & evasion
    ├── browser-bot.md             # Architecture, HUD, selectors, and engine reference
    ├── data-schema.md             # Complete JSON schema, fields, and extraction guide
    └── cdn-and-github-guide.md    # Guide for GitHub hosting, jsDelivr CDN, and bookmarklets
```

### File Summaries

| File | Purpose | Documentation |
| :--- | :--- | :--- |
| [`auto_applier.js`](file:///d:/DEVELOPMENT/all-bots/auto_applier.js) | 1-by-1 high-volume applier with dual-tab closing and session resume. | [Read Docs](file:///d:/DEVELOPMENT/all-bots/docs/auto-applier.md) |
| [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js) | Standalone client-side bot with HUD, event simulator, and queue processor. | [Read Docs](file:///d:/DEVELOPMENT/all-bots/docs/browser-bot.md) |
| [`jobs_queue.json`](file:///d:/DEVELOPMENT/all-bots/jobs_queue.json) | Combined, deduplicated list of 974 clean target job URLs. | [Read Docs](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md) |
| [`fetch-jobs.js`](file:///d:/DEVELOPMENT/all-bots/fetch-jobs.js) | Node.js pagination fetcher that queries the public API and extracts clean URLs. | [Read Code](file:///d:/DEVELOPMENT/all-bots/fetch-jobs.js) |
| [`docs/`](file:///d:/DEVELOPMENT/all-bots/docs/) | In-depth technical guides covering anti-detection, CDN deployment, and schemas. | [Browse Docs](file:///d:/DEVELOPMENT/all-bots/docs/README.md) |

---

## 🌐 GitHub + jsDelivr CDN Integration

This repository is published on GitHub at [**Naman-mahi/zero-footprint**](https://github.com/Naman-mahi/zero-footprint). jsDelivr automatically provides global edge distribution for the codebase.

### Live CDN Endpoints:
- **Auto-Applier Script (1-by-1 Engine):**  
  [`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js`](https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js)
- **Browser Bot Script:**  
  [`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js`](https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js)
- **Combined 974 Job Queue JSON:**  
  [`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/jobs_queue.json`](https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/jobs_queue.json)
- **Instant Cache Purge API:**  
  [`https://purge.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js`](https://purge.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/auto_applier.js)

---

## ⚠️ Troubleshooting & FAQs

### Q: Why run 1-by-1 instead of opening all 500+ tabs at once?
**A:** Opening dozens of browser tabs simultaneously exhausts RAM, spikes CPU usage to 100%, and triggers rate-limits or bot blocks. Running 1-by-1 ensures your browser stays ultra-responsive, consumes minimal memory, and applies with natural human timing.

### Q: How does the dual-tab closer work?
**A:** When `auto_applier.js` opens Tab 1 and clicks the apply button, the platform triggers an affiliate redirect (Tab 2). The script intercepts and closes Tab 2 as soon as the tracking beacon is registered, then closes Tab 1 and moves to the next job.

### Q: Can I pause and resume later?
**A:** Yes! Progress is saved in `localStorage`. If you pause, reload, or close your browser, you can resume right where you left off.

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
