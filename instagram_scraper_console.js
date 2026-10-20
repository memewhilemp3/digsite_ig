/**
 * ::: DIGSITE INSTAGRAM CONSOLE EXCAVATOR v2.5 :::
 * 
 * INSTRUCTIONS:
 * 1. Log into Instagram in your desktop browser (Chrome, Brave, Firefox, Edge, Safari).
 * 2. Navigate to your Saved collection or any specific collection:
 *    https://www.instagram.com/your_username/saved/
 * 3. Open Developer Tools (Press F12, or Ctrl+Shift+I on Windows / Cmd+Option+I on Mac).
 * 4. Click the "Console" tab, paste this entire script, and press ENTER.
 * 5. A retro Digsite Excavator HUD will appear in the top-right corner.
 *    The script will smoothly auto-scroll and excavate all your saved posts, reels, and carousels.
 * 6. When scrolling reaches the end, or when you click [STOP & DOWNLOAD JSON], 
 *    it automatically downloads `my_instagram_digsite.json`.
 * 7. Drop that file into the DIGSITE IG Collections web dashboard!
 */

(function runDigsiteExcavator() {
  if (!window.location.hostname.includes('instagram.com')) {
    alert('::: DIGSITE ERROR ::: Please run this script while on https://www.instagram.com/your_username/saved/');
    return;
  }

  // Prevent multiple instances
  if (window.__digsiteExcavatorActive) {
    alert('::: DIGSITE NOTICE ::: Excavator is already active!');
    return;
  }
  window.__digsiteExcavatorActive = true;

  const harvestedItems = new Map();
  let isScrolling = true;
  let scrollAttempts = 0;
  let lastScrollHeight = 0;
  let consecutiveStallCount = 0;
  const MAX_STALLS = 6;

  // 1. Create Floating Terminal HUD
  const hud = document.createElement('div');
  hud.id = 'digsite-hud';
  hud.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    width: 340px;
    background: rgba(5, 7, 13, 0.94);
    border: 1px solid #ffeaa7;
    border-radius: 12px;
    padding: 16px;
    color: #e2e8f0;
    font-family: monospace;
    font-size: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.85);
    z-index: 99999999;
    backdrop-filter: blur(10px);
    line-height: 1.5;
  `;

  hud.innerHTML = `
    <div style="font-weight: bold; color: #ffeaa7; border-bottom: 1px dashed #334155; padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between;">
      <span>[◈ DIGSITE EXCAVATOR]</span>
      <span style="color: #58a6ff;">v2.5_ACTIVE</span>
    </div>
    <div style="margin-bottom: 8px;">
      STATUS: <span id="digsite-status" style="color: #56d364; font-weight: bold;">EXCAVATING...</span>
    </div>
    <div style="margin-bottom: 8px; font-size: 13px;">
      HARVESTED: <span id="digsite-count" style="color: #ffeaa7; font-weight: bold; font-size: 15px;">0</span> items
    </div>
    <div style="margin-bottom: 12px; color: #94a3b8; font-size: 11px;">
      Auto-scrolling saved collection... Please leave this tab visible while excavating.
    </div>
    <div style="display: flex; gap: 8px;">
      <button id="digsite-stop-btn" style="flex: 1; background: #238636; border: 1px solid #2ea043; color: #fff; padding: 8px; border-radius: 6px; font-family: monospace; font-weight: bold; cursor: pointer;">
        ⏹ STOP & DOWNLOAD
      </button>
      <button id="digsite-cancel-btn" style="background: transparent; border: 1px solid #64748b; color: #94a3b8; padding: 8px; border-radius: 6px; font-family: monospace; cursor: pointer;">
        ✕
      </button>
    </div>
  `;
  document.body.appendChild(hud);

  const statusEl = document.getElementById('digsite-status');
  const countEl = document.getElementById('digsite-count');
  const stopBtn = document.getElementById('digsite-stop-btn');
  const cancelBtn = document.getElementById('digsite-cancel-btn');

  function updateCount() {
    if (countEl) countEl.innerText = harvestedItems.size;
  }

  // 2. DOM Harvester function
  function harvestVisiblePosts() {
    // Collect all links pointing to posts or reels
    const postAnchors = document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]');

    postAnchors.forEach(a => {
      const href = a.getAttribute('href') || '';
      const match = href.match(/\/(p|reel)\/([A-Za-z0-9_-]+)/);
      if (!match) return;

      const type = match[1] === 'reel' ? 'Reel' : 'Post';
      const shortcode = match[2];
      const fullUrl = `https://www.instagram.com${match[0]}/`;

      if (harvestedItems.has(shortcode)) return;

      // Extract image / thumbnail / alt text
      const img = a.querySelector('img');
      const captionText = img ? (img.getAttribute('alt') || '') : '';
      const thumbnailUrl = img ? (img.getAttribute('src') || '') : '';

      // Check for carousel indicator icon or multi-photo
      const isCarousel = !!a.querySelector('svg[aria-label*="Carousel"], svg[aria-label*="carousel"], span[aria-label*="Carousel"]');
      const contentType = isCarousel ? 'Carousel' : type;

      // Creator extraction heuristic
      let creator = 'unknown';
      // Look for parent articles or text badges
      const container = a.closest('div[role="dialog"]') || a.closest('article') || a.parentElement;
      if (container) {
        const creatorLink = container.querySelector('a[href^="/"][role="link"]:not([href*="/p/"]):not([href*="/reel/"])');
        if (creatorLink) {
          const rawCreator = (creatorLink.getAttribute('href') || '').replace(/\//g, '');
          if (rawCreator && !['explore', 'reels', 'direct', 'stories'].includes(rawCreator)) {
            creator = rawCreator;
          }
        }
      }

      // If alt text contains "Photo by [User] on [Date]", parse creator
      if (captionText) {
        const creatorMatch = captionText.match(/Photo by ([^on]+) on/i) || captionText.match(/by ([^\.]+)\./i);
        if (creatorMatch && creator === 'unknown') {
          creator = creatorMatch[1].trim().replace(/^@/, '');
        }
      }

      harvestedItems.set(shortcode, {
        shortcode,
        url: fullUrl,
        contentType,
        creator,
        captionSummary: captionText,
        thumbnailUrl: thumbnailUrl.length < 500 ? thumbnailUrl : '',
        harvestedAt: new Date().toISOString()
      });
    });

    updateCount();
  }

  // 3. Auto-scroll loop
  const scrollTimer = setInterval(() => {
    if (!isScrolling) return;

    harvestVisiblePosts();

    window.scrollBy({
      top: 900,
      behavior: 'smooth'
    });

    scrollAttempts++;

    // Check for stalled scrolling (reached bottom or waiting for lazy load)
    const currentHeight = document.documentElement.scrollHeight;
    if (currentHeight === lastScrollHeight) {
      consecutiveStallCount++;
      if (statusEl) statusEl.innerText = `BUFFERING (${consecutiveStallCount}/${MAX_STALLS})...`;
      if (consecutiveStallCount >= MAX_STALLS) {
        // Reached end of collection
        if (statusEl) statusEl.innerText = 'EXCAVATION COMPLETE';
        stopAndDownload();
      }
    } else {
      consecutiveStallCount = 0;
      lastScrollHeight = currentHeight;
      if (statusEl) statusEl.innerText = 'EXCAVATING...';
    }
  }, 850);

  // 4. Download JSON
  function stopAndDownload() {
    isScrolling = false;
    clearInterval(scrollTimer);

    harvestVisiblePosts();

    const data = Array.from(harvestedItems.values());
    if (data.length === 0) {
      alert('::: DIGSITE NOTICE ::: No posts were excavated. Make sure you are on a page displaying saved posts or reels.');
      cleanup();
      return;
    }

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    const timestampStr = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.href = url;
    a.download = `my_instagram_digsite_${timestampStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (statusEl) {
      statusEl.style.color = '#58a6ff';
      statusEl.innerText = `DOWNLOADED ${data.length} ITEMS!`;
    }

    setTimeout(cleanup, 3500);
  }

  function cleanup() {
    clearInterval(scrollTimer);
    window.__digsiteExcavatorActive = false;
    if (hud && hud.parentElement) {
      hud.parentElement.removeChild(hud);
    }
  }

  stopBtn.onclick = stopAndDownload;
  cancelBtn.onclick = cleanup;

  console.log('%c::: DIGSITE INSTAGRAM EXCAVATOR RUNNING :::', 'color: #ffeaa7; font-weight: bold; font-size: 14px;');
  console.log('%cHarvesting posts in background. Click [STOP & DOWNLOAD] on the floating HUD anytime.', 'color: #79c0ff;');
})();
