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
- **🎯 Full Human Event Cascade**: Dispatches `pointerover`, `mouseover`, `pointerenter`, `pointerdown`, `mousedown`, `focus`, `pointerup`, `mouseup`, and `click` with randomized coordinate jitter.
- **⏱️ Human Micro-Jitter Delays**: Organic delays between steps (40ms-130ms) and job transitions (5s-8s) mimicking human decision-making.
- **🖥️ Floating Glassmorphic Control Panel (HUD)**: Sleek real-time HUD with active status, progress counter, batch toggle, and activity logs.
- **⚡ Dual Operation Modes**:
  - **Single Apply Mode**: Auto-detects and triggers the application process on any active job page.
  - **Batch Queue Mode**: Sequentially processes job queues in controlled background tabs.
- **📦 Cloud & CDN Ready**: Load and run anywhere with a single-line snippet via **jsDelivr CDN**.

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
| **Interaction Cadence** | ❌ Instantaneous / static timing (0ms - 50ms) | ✅ Gaussian-distributed micro-delays (4s - 8s) |
| **Authentication & CAPTCHAs** | ❌ Blocked by Cloudflare Turnstile / reCAPTCHA | ✅ Runs inside already-authenticated session |

> 📚 For a full technical deep dive into detection vectors and mitigation algorithms, see [`docs/anti-detection.md`](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md).

---

## 🚀 Quick Start Guide

### Method 1: Direct Browser Console (Zero Install)

1. Open your target website (e.g. [https://artha.link](https://artha.link)) in Chrome, Brave, Edge, or Firefox.
2. Ensure you are logged into your account.
3. Open Developer Tools: Press **`F12`** (or **`Ctrl + Shift + I`** on Windows / **`Cmd + Option + I`** on macOS) and navigate to the **Console** tab.
4. Copy the entire contents of [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js) and paste it into the console.
5. Press **`Enter`**.
6. The floating control panel will appear in the bottom-right corner. Click **🚀 Start Batch** or **⚡ Apply Current Page**.

---

### Method 2: One-Click Bookmarklet

Create a browser bookmark to launch the bot on any page with one click:

1. Press `Ctrl + D` (or `Cmd + D`) to create a bookmark in your browser bar.
2. Name it: `⚡ Apply Bot`.
3. Set the **URL** field to the following javascript payload:

```javascript
javascript:(function(){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js?t='+Date.now();document.head.appendChild(s);})();
```

---

### Method 3: jsDelivr CDN Remote Loader

Execute the latest version directly in your browser console without copying thousands of lines of code:

```javascript
fetch(`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js?_t=${Date.now()}`)
  .then(res => res.text())
  .then(code => eval(code));
```

---

### Method 4: Tampermonkey / Violentmonkey Userscript

For complete automation on every visit, create a userscript:

```javascript
// ==UserScript==
// @name         Zero-Footprint Artha Bot
// @namespace    https://github.com/Naman-mahi/zero-footprint
// @version      1.0.0
// @description  100% undetectable in-browser auto applier
// @author       Naman-mahi
// @match        https://artha.link/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js';
    document.body.appendChild(script);
})();
```

---

## 📁 Repository & File Structure

```text
zero-footprint/
├── README.md                      # Main repository documentation & guide
├── browser_bot.js                 # Primary in-browser undetectable automation engine
├── data.json                      # Scraped & enriched job feeds with full metadata
└── docs/                          # Comprehensive technical documentation suite
    ├── README.md                  # Documentation hub and navigation index
    ├── anti-detection.md          # In-depth guide on anti-detection mechanics & evasion
    ├── browser-bot.md             # Architecture, HUD, selectors, and engine reference
    ├── data-schema.md             # Complete JSON schema, fields, and extraction guide
    └── cdn-and-github-guide.md    # Guide for GitHub hosting, jsDelivr CDN, and bookmarklets
```

### File Summaries

| File | Purpose | Documentation |
| :--- | :--- | :--- |
| [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js) | Standalone client-side bot with HUD, event simulator, and queue processor. | [Read Docs](file:///d:/DEVELOPMENT/all-bots/docs/browser-bot.md) |
| [`data.json`](file:///d:/DEVELOPMENT/all-bots/data.json) | Comprehensive database of scraped job listings, company profiles, and redirect links. | [Read Docs](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md) |
| [`docs/`](file:///d:/DEVELOPMENT/all-bots/docs/) | In-depth technical guides covering anti-detection, CDN deployment, and schemas. | [Browse Docs](file:///d:/DEVELOPMENT/all-bots/docs/README.md) |

---

## ⚙️ Configuration & Customization

### Modifying the Target Job Queue

In [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js#L29-L46), locate the `JOB_QUEUE` array and customize your target job URLs:

```javascript
const JOB_QUEUE = [
  { title: "Senior Backend Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/senior-backend-engineer-micro1-56b8b236" },
  { title: "Lead Engineer @ GE Vernova", url: "https://artha.link/@ritu_singh_647119359/jobs/lead-engineer-electrical-component-ge-vernova-noida-ab79ca02" },
  // Add your custom URLs here...
];
```

### Adjusting Human Delays

To make operations faster or more conservative, adjust the delay ranges in [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js#L254-L278):

```javascript
// Delay between opening tab and scanning for button (Default: 4000ms - 5500ms)
await sleep(randomDelay(4000, 5500));

// Safe human pause between sequential jobs (Default: 5s - 8s)
const waitSec = randomDelay(5, 8);
await sleep(waitSec * 1000);
```

---

## 🌐 GitHub + jsDelivr CDN Integration

This repository is published on GitHub at [**Naman-mahi/zero-footprint**](https://github.com/Naman-mahi/zero-footprint). jsDelivr automatically provides global edge distribution for the codebase.

### Live CDN Endpoints:
- **Latest Code (Master Branch):**  
  [`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js`](https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js)
- **Data Feed via CDN:**  
  [`https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/data.json`](https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/data.json)
- **Instant Cache Purge API:**  
  [`https://purge.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js`](https://purge.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/browser_bot.js)

> 📖 For full CDN configuration, version pinning, and bookmarklet instructions, see [`docs/cdn-and-github-guide.md`](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md).

---

## 📖 Detailed Documentation

Explore our comprehensive guides in the [`/docs`](file:///d:/DEVELOPMENT/all-bots/docs/) directory:

- 🛡️ **[Anti-Detection Architecture](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)**: How the human event cascade, random coordinate jitter, and in-browser execution defeat bot defenses.
- 🤖 **[Browser Bot Technical Reference](file:///d:/DEVELOPMENT/all-bots/docs/browser-bot.md)**: Deep dive into the HUD interface, button selector strategies, lifecycle hooks, and single-instance locks.
- 📊 **[Data Schema & Feeds Guide](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md)**: Data structure of `data.json`, field definitions, company metadata, and queue extraction scripts.
- 🚀 **[GitHub & jsDelivr CDN Setup](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md)**: Step-by-step repository setup, versioning, CDN links, and bookmarklet integration.

---

## ⚠️ Troubleshooting & FAQs

### Q: The batch starts, but tabs don't open?
**A:** Browsers block multi-tab popups by default. Look at the right side of your browser address bar for a blocked popup icon. Click **"Always allow popups and redirects from this site"** and re-trigger the batch.

### Q: How do I stop an active batch?
**A:** Click the **⏹️ Stop Batch** button on the floating HUD, or close the HUD using the **✕** button.

### Q: Does this work on sites with Cloudflare Turnstile or CAPTCHAs?
**A:** Yes! Because this runs directly in your existing authenticated browser session with genuine mouse events, Cloudflare and bot telemetry detect authentic human context and pass without triggering challenges.

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
