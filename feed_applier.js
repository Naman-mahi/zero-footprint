/**
 * 🕶️ Zero-Footprint: In-Page Feed Auto-Applier (Feed Card Clicker)
 * 
 * GitHub: https://github.com/Naman-mahi/zero-footprint
 * CDN: https://cdn.jsdelivr.net/gh/Naman-mahi/zero-footprint@master/feed_applier.js
 * 
 * USE CASE:
 * Run directly while browsing any creator feed (e.g. https://artha.link/@eanxt)
 * It scans job cards, opens details, triggers apply in a controlled tab, closes it,
 * auto-scrolls for more cards, and purges storage/cookies every 50 jobs!
 */

(async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const randomDelay = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // =========================================================================
  // 🧹 STORAGE & COOKIE PURGE UTILITY
  // =========================================================================
  const wipeAllStorageAndCookies = () => {
    console.log("%c[Cleanup] Clearing domain cookies, localStorage & sessionStorage...", "color: #2563eb; font-weight: bold;");
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}

    try {
      const domain = window.location.hostname;
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        if (!name) continue;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain};`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${domain};`;
      }
    } catch (e) {}

    console.log("%c[Cleanup] Storage and tracking cookies purged successfully.", "color: #059669; font-weight: bold;");
  };

  // =========================================================================
  // 🔍 FEED SCANNER & CARD RESOLVER
  // =========================================================================
  function getVisibleJobCards() {
    const candidates = Array.from(
      document.querySelectorAll('a[href*="/jobs/"], div[role="button"], article, [data-testid*="job-card"]')
    );

    return candidates.filter((el) => {
      const text = (el.innerText || el.textContent || "").trim();
      return (
        text.length > 15 &&
        (text.includes("Full-time") || text.includes("Contract") || text.includes("Remote") || text.includes("India") || text.includes("Hyderabad") || text.includes("Bengaluru") || text.includes("Mumbai") || text.includes("Engineer") || text.includes("Specialist") || text.includes("Developer")) &&
        !el.closest("nav") &&
        !el.closest("footer") &&
        !text.includes("Notify me")
      );
    });
  }

  // =========================================================================
  // 🚀 MAIN EXECUTION LOOP (BATCHES OF 50 WITH AUTO-COOLDOWN)
  // =========================================================================
  const BATCH_SIZE = 50;
  const processedHrefs = new Set();
  let totalProcessed = 0;

  console.log(
    "%c 🕶️ ZERO-FOOTPRINT: IN-PAGE FEED AUTO-APPLIER %c ACTIVE ",
    "background: #eff6ff; color: #2563eb; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 6px 0 0 6px; border: 1px solid #2563eb;",
    "background: #2563eb; color: #ffffff; font-size: 13px; font-weight: 800; padding: 6px 10px; border-radius: 0 6px 6px 0; border: 1px solid #2563eb;"
  );

  while (true) {
    let cards = getVisibleJobCards().filter(c => {
      const href = c.getAttribute("href") || c.querySelector("a")?.getAttribute("href") || c.innerText.slice(0, 40);
      return !processedHrefs.has(href);
    });

    // If no new cards visible, scroll down to trigger infinite loading
    if (cards.length === 0) {
      console.log("%c[Feed] Scrolling down to load more job cards...", "color: #64748b; font-style: italic;");
      window.scrollBy({ top: 1200, behavior: "smooth" });
      await delay(2500);

      cards = getVisibleJobCards().filter(c => {
        const href = c.getAttribute("href") || c.querySelector("a")?.getAttribute("href") || c.innerText.slice(0, 40);
        return !processedHrefs.has(href);
      });

      if (cards.length === 0) {
        console.log("%c[Feed] No more job cards found on feed. All available cards processed.", "color: #059669; font-weight: bold;");
        break;
      }
    }

    console.log(`%c[Feed] Found ${cards.length} unapplied job cards on feed. Processing next batch...`, "color: #2563eb; font-weight: bold;");

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardIdentifier = card.getAttribute("href") || card.querySelector("a")?.getAttribute("href") || card.innerText.slice(0, 40);
      processedHrefs.add(cardIdentifier);
      totalProcessed++;

      console.log(
        `%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `%c🎯 [JOB ${totalProcessed}] %c${card.innerText.split("\n")[0] || "Job Card"}`,
        "color: #94a3b8;",
        "color: #2563eb; font-weight: bold;", "color: #0f172a; font-weight: bold;"
      );

      // 1. Scroll card into view and click it
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      await delay(randomDelay(350, 600));

      const linkEl = card.tagName.toLowerCase() === "a" ? card : card.querySelector("a");
      const jobUrl = linkEl ? linkEl.href : null;

      if (jobUrl) {
        // Open controlled tab
        console.log(`%c[Tab 1] Opening: %c${jobUrl}`, "color: #64748b;", "color: #2563eb; text-decoration: underline;");
        const jobTab = window.open(jobUrl, "_blank", "width=1280,height=850");

        let redirectTab = null;
        if (jobTab) {
          try {
            const originalOpen = jobTab.open;
            jobTab.open = function (...args) {
              redirectTab = originalOpen.apply(this, args);
              return redirectTab;
            };
          } catch (e) {}

          // Dynamic polling for Apply button (up to 10s wait)
          let applyBtn = null;
          const pollStart = Date.now();
          while (Date.now() - pollStart < 9000) {
            try {
              if (jobTab.document) {
                applyBtn = jobTab.document.getElementById("creator-job-details-apply-job-trigger") ||
                  jobTab.document.querySelector('[data-experiment-id="creator-apply-job-trigger"]') ||
                  Array.from(jobTab.document.querySelectorAll("button, a")).find(b => {
                    const txt = (b.innerText || b.textContent || "").trim().toLowerCase();
                    return txt === "apply now" || txt.startsWith("apply");
                  });
              }
            } catch (e) {}

            if (applyBtn) break;
            await delay(300);
          }

          if (applyBtn) {
            console.log("%c✨ [CLICK] Apply trigger found! Dispatching authentic click...", "color: #059669; font-weight: bold;");
            applyBtn.click();
            await delay(2500); // Wait for tracking beacon
          } else {
            console.warn("%c⚠️ Apply button timed out in tab. Moving forward.", "color: #d97706;");
          }

          // Cleanly close both tabs
          try { if (redirectTab && !redirectTab.closed) redirectTab.close(); } catch (e) {}
          try { if (jobTab && !jobTab.closed) jobTab.close(); } catch (e) {}
        }
      }

      // Safe human pacing delay (4s - 7s)
      const waitMs = randomDelay(4000, 7000);
      console.log(`%c⏱️ Pacing delay: ${(waitMs/1000).toFixed(1)}s before next card...`, "color: #7c3aed; font-style: italic;");
      await delay(waitMs);

      // =====================================================================
      // 🛑 MILESTONE HANDLING: AFTER EVERY 50 JOBS
      // =====================================================================
      if (totalProcessed > 0 && totalProcessed % BATCH_SIZE === 0) {
        console.log(
          `%c🎉 [BATCH MILESTONE] Reached ${totalProcessed} jobs applied!\n` +
          `%c🧹 Purging all session storage & domain tracking cookies...\n` +
          `%c☕ Cooling down for 45 seconds (Human break)...`,
          "background: #065f46; color: #34d399; font-size: 14px; font-weight: bold; padding: 6px 10px; border-radius: 4px;",
          "color: #2563eb; font-weight: bold;",
          "color: #f59e0b; font-style: italic;"
        );

        wipeAllStorageAndCookies();
        await delay(45000);
        console.log("%c▶️ Cooldown complete. Resuming next 50 jobs...", "color: #059669; font-weight: bold;");
      }
    }
  }

  wipeAllStorageAndCookies();
  console.log(`%c🎉 [ALL DONE] Total ${totalProcessed} jobs processed across the feed.`, "background: #2563eb; color: #ffffff; font-size: 14px; font-weight: bold; padding: 6px 10px; border-radius: 4px;");
})();
