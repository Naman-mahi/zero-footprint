# 🤖 Browser Bot Technical Reference (`browser_bot.js`)

This document provides a comprehensive technical overview and module-by-module breakdown of [`browser_bot.js`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js), the standalone client-side automation engine.

---

## 🏛️ Module Architecture

```text
browser_bot.js (Self-Executing IIFE)
├── 🔄 Auto-Reset & Instance Manager (window.__ARTHA_BOT_INSTANCE__)
├── 📋 Target Job Queue (JOB_QUEUE array with 16 verified roles)
├── 🎨 Styled Console Startup Banner & Live Link Table
├── 🛡️ Human Event Simulator (sleep, randomDelay, humanClick)
├── 🔍 Multi-Tier Button Discovery Engine (findApplyButton)
├── 🖥️ Floating Glassmorphic Control Panel (HUD Component)
├── ⚡ Single-Page Apply Controller (applyOnCurrentPage)
├── 🚀 Batch Queue Orchestrator (startBatchQueue & stopBatchQueue)
├── 🌐 Global Control Interface (window.__ARTHA_BOT__)
└── 🎛️ Event Listeners & Auto-Trigger Hook
```

---

## 📋 Module 1: Auto-Reset & Instance Management

Lines: [`browser_bot.js:L28-L38`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js#L28-L38)

```javascript
if (window.__ARTHA_BOT_INSTANCE__) {
  console.log("%c🔄 Existing bot instance detected. Resetting and initializing clean session...", "color: #38bdf8; font-weight: bold;");
  try {
    window.__ARTHA_BOT_INSTANCE__.cleanup();
  } catch (e) {
    console.warn("Cleaned previous instance:", e);
  }
}
```

- **Seamless Re-Injections**: If the user pastes the script multiple times or clicks the bookmarklet repeatedly, it automatically tears down the previous instance, removes the old HUD, resets state, and boots up a clean session without throwing blocking warnings or requiring a full webpage refresh.

---

## 📋 Module 2: Target Job Queue (`JOB_QUEUE`)

Lines: [`browser_bot.js:L42-L60`](file:///d:/DEVELOPMENT/all-bots/browser_bot.js#L42-L60)

An array of job targets containing position IDs, titles, and direct web application URLs:

```javascript
const JOB_QUEUE = [
  { id: 1, title: "Data Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/data-engineer-micro1-467d5920" },
  { id: 2, title: "Senior Database Reliability Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/senior-database-reliability-engineer-micro1-8ef9e2c8" },
  { id: 3, title: "QA Engineer @ micro1", url: "https://artha.link/@ritu_singh_647119359/jobs/qa-engineer-micro1-d29d2b9c" },
  // ... 16 target roles
];
```

---

## 🎨 Module 3: Console Startup Banner & Live Link Table

When initialized, the bot outputs an interactive console dashboard displaying:
1. **Version & Repository Banner**: Styled badge with GitHub link.
2. **Interactive Collapsible Table (`console.table`)**: Formatted overview of all 16 target positions.
3. **Direct Clickable Links**: Each job URL is logged to the console for quick manual inspection.
4. **Live Execution Stream**: Color-coded real-time log messages for each opening, button detection strategy, and event cascade step.

---

## 📋 Module 4: Multi-Selector Button Resolver (`findApplyButton`)

Target web platforms often employ A/B testing, dynamic class names, or variant DOM templates. The resolver uses a 3-tier cascade fallback mechanism:

```javascript
function findApplyButton(doc = document) {
  // Tier 1: Canonical static ID selector
  const byId = doc.getElementById("creator-job-details-apply-job-trigger");
  if (byId) return { el: byId, strategy: "ID (#creator-job-details-apply-job-trigger)" };

  // Tier 2: Experiment/Feature Flag data attribute
  const byExp = doc.querySelector('[data-experiment-id="creator-apply-job-trigger"]');
  if (byExp) return { el: byExp, strategy: "Experiment Attr ([data-experiment-id='creator-apply-job-trigger'])" };

  // Tier 3: Heuristic semantic text search across clickable elements
  const buttons = Array.from(doc.querySelectorAll("button, a, div[role='button']"));
  const byText = buttons.find((b) => {
    const txt = (b.innerText || b.textContent || "").trim().toLowerCase();
    return txt === "apply now" || txt.includes("apply now") || txt.startsWith("apply");
  });
  if (byText) return { el: byText, strategy: `Text Heuristic ('${(byText.innerText || byText.textContent || "").trim()}')` };

  return null;
}
```

---

## 📋 Module 5: Floating Glassmorphic Control Panel (HUD)

The HUD provides a styled floating interface placed in the bottom-right corner (`z-index: 9999999`):

```text
┌────────────────────────────────────────────────────────┐
│ 🟢 ZERO-FOOTPRINT BOT                                ✕ │
├────────────────────────────────────────────────────────┤
│ Status:   Ready (16 queued)                            │
│ Progress: 0 / 16                                       │
│ Active:   None                                         │
├────────────────────────────┬───────────────────────────┤
│ [⚡ Apply Current]         │ [🚀 Start Batch (16)]     │
├────────────────────────────┴───────────────────────────┤
│ Bot loaded. Click 'Start Batch' to begin.              │
└────────────────────────────────────────────────────────┘
```

---

## 🌐 Module 6: Global API Interface (`window.__ARTHA_BOT__`)

In addition to the visual HUD, you can interact with the bot programmatically via DevTools:

```javascript
// Start the batch application queue
window.__ARTHA_BOT__.startBatch();

// Stop active batch
window.__ARTHA_BOT__.stopBatch();

// Apply on active page
window.__ARTHA_BOT__.applyCurrent();

// View all 16 queued jobs in console table
window.__ARTHA_BOT__.showJobs();

// Cleanly close HUD and remove session
window.__ARTHA_BOT__.cleanup();
```

---

## 📚 Related Documentation

- [Anti-Detection Architecture](file:///d:/DEVELOPMENT/all-bots/docs/anti-detection.md)
- [Data Feed Schema Guide](file:///d:/DEVELOPMENT/all-bots/docs/data-schema.md)
- [GitHub & jsDelivr CDN Setup](file:///d:/DEVELOPMENT/all-bots/docs/cdn-and-github-guide.md)
- [Docs Central Hub](file:///d:/DEVELOPMENT/all-bots/docs/README.md)
