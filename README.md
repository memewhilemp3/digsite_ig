# ⛏️ DIGSITE IG COLLECTIONS (v2.5)
### Pure ASCII Topographic Strata & Multi-Scenario Archaeological Excavator for Instagram

> **Zero server requirements · 100% Client-Side · Sub-second performance for 4,400+ saved items · GitHub Pages ready**

```
 ██████╗ ██╗ ██████╗ ███████╗██╗████████╗███████╗    ██╗ ██████╗ 
 ██╔══██╗██║██╔════╝ ██╔════╝██║╚══██╔══╝██╔════╝    ██║██╔════╝ 
 ██║  ██║██║██║  ███╗███████╗██║   ██║   █████╗      ██║██║  ███╗
 ██║  ██║██║██║   ██║╚════██║██║   ██║   ██╔══╝      ██║██║   ██║
 ██████╔╝██║╚██████╔╝███████║██║   ██║   ███████╗    ██║╚██████╔╝
 ╚═════╝ ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝   ╚══════╝    ╚═╝ ╚═════╝ 
      ::: D I G S I T E   I G   C O L L E C T I O N S :::
```

---

## 🌟 What is DIGSITE IG?

**DIGSITE IG Collections** is a high-performance web dashboard that transforms your Instagram saved collections (posts, reels, carousels) into an interactive **topographic excavation terrain and semantic constellation**.

Whether you have 100 or 4,400+ saved items, DIGSITE processes the entire collection in sub-second time directly in your browser using a **Sparse Inverted Index** and renders an ethereal, translucent gossamer network of creative themes.

---

## 🚀 Key Features

### 1. ✦ Multi-Scenario Latent Clustering
Thematic clustering is not static. DIGSITE provides five distinct excavation scenarios, allowing the latent topology and cluster bubbles to continuously evolve:
- **✦ Balanced Strata**: 8–12 balanced thematic archipelagos with cross-cluster bridges.
- **🌐 Broad Kingdoms**: 4–5 macro-disciplines synthesizing large creative territories.
- **🔬 Deep Niches**: 14–18 fine-grained clusters isolating specialized aesthetics and micro-topics.
- **👥 Creator Ecosystems**: Groups posts around dominant creator hubs and collaborative circles.
- **⏳ Temporal Strata**: Chronological emergence epochs organizing your history from bedrock to summit.
- **🎲 Reshuffle Digsite**: Stochastic drift button that re-perturbs the latent seed to surface unexpected serendipitous alignments.

### 2. ⚡ Sub-Second Performance on 4,400+ Items
- **Sparse TF-IDF Inverted Index**: Replaces traditional $O(N^2)$ dense similarity matrices with inverted posting lists. Ingestion, candidate scoring, and cluster assignments take **< 500ms** even for 4,440 items.
- **Micro-ASCII Level of Detail (LOD)**: When zoomed out ($zoomK < 0.45$), nodes switch to lightweight micro-ASCII particles (`·`, `+`, `◈`), eliminating tens of thousands of redundant canvas operations per frame to maintain a steady **60 FPS**.
- **Density-Adaptive Gossamer Web**: Link opacity and stroke widths scale inversely with node count, preserving an ethereal web-like translucency without turning into a heavy, clunky block.
- **Orbital Cluster Biomes**: Cluster attraction forces distribute nodes into orbital biomes around the canvas, completely preventing cluster labels from collapsing or piling up in the center.

### 3. ⏳ Dual-Direction Chronological Corridor
- Rearranges your collection along an interactive horizontal time axis.
- Toggle between **Newest ➔ Oldest** and **Oldest ➔ Newest** with one click.
- Topographic elevation dynamically maps either the most recent finds or ancient bedrock archives as the elevated peaks.

### 4. ⛏️ 1-Click Instagram Console Scraper
No third-party apps or Instagram API credentials needed!
- Open Instagram on desktop -> Press `F12` -> Open Console.
- Paste the bundled script (`instagram_scraper_console.js`).
- A floating terminal HUD appears, smoothly scrolling and harvesting your saved items, captions, creators, and media previews, then automatically downloads `my_instagram_digsite.json`.

### 5. ⇄ Cross-Digsite Comparator & Archiving
- **💾 Export Archive**: Download a lightweight `.digsite.json` snapshot containing all metadata, cluster configurations, and dates.
- **⇄ Compare Digsites**: Drop a friend's `.json` or `.digsite.json` alongside your own to calculate:
  - **Vocabulary Resonance**: Jaccard index measuring creative overlap and shared concepts.
  - **Shared Thematic Intersections**: Concepts, hashtags, and keywords common to both digsites.
  - **Exclusive Rabbit Holes**: Unique niches and topics exclusive to each person.
  - **Format Split & Velocity**: Reels vs. Posts comparison.
  - **Chronological Emergence**: Timeline comparison of active saving periods.

---

## 🛠️ How to Host on GitHub Pages (1-Click Deployment)

This project contains **zero server dependencies** and requires **no build step** (no Node/npm build required at runtime).

### Step 1: Create a GitHub Repository
1. Go to [GitHub.com/new](https://github.com/new) and name your repository (e.g., `digsite-ig`).
2. Make it **Public**.

### Step 2: Push the Files
Push the following files into the repository root:
- `index.html` (The dashboard entrypoint)
- `instagram_scraper_console.js` (The standalone excavator script)
- `README.md` (This documentation)

```bash
git init
git add index.html instagram_scraper_console.js README.md
git commit -m "feat: launch digsite ig collections v2.5"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/digsite-ig.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. On GitHub, navigate to **Settings** ➔ **Pages** (under "Code and automation").
2. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main` / Folder: `/ (root)`
3. Click **Save**.
4. In about 30 seconds, your dashboard will be live at:
   `https://YOUR_USERNAME.github.io/digsite-ig/`

---

## 📖 How Visitors Use the Digsite

```
   [1. INSTAGRAM]           [2. CONSOLE SCRAPE]           [3. DIGSITE WEB]
   instagram.com/saved/  ➔  F12 Console ➔ Paste JS  ➔  Drop JSON into Digsite
                                                             │
                  ┌──────────────────────────────────────────┴──────────────────────────────────────────┐
                  ▼                                                                                     ▼
        [THEMATIC EXCAVATION]                                                                 [COMPARE DIGSITES]
  ✦ Select Scenario: Broad / Deep / Creators / Chrono                                   ⇄ Drop Friend's JSON
  ✦ Correlate multiple tabs                                                            ✦ Calculate Jaccard Resonance
  ✦ Double-click node to open in background tab                                        ✦ Uncover exclusive rabbit holes
```

1. **Harvest Saved Collection**:
   - Log into Instagram in Chrome / Firefox / Edge / Safari on desktop.
   - Navigate to `https://www.instagram.com/your_username/saved/`.
   - Open Developer Tools (`F12`), switch to **Console**, paste `instagram_scraper_console.js`, and press `Enter`.
   - The HUD will auto-scroll and download `my_instagram_digsite.json`.
2. **Ingest into DIGSITE**:
   - Open your hosted DIGSITE URL.
   - Drag and drop `my_instagram_digsite.json`.
   - The sparse index constructs in under 500ms.
3. **Explore & Correlate**:
   - Switch between **Thematic**, **Musical**, **Geographic**, and **Chronological** lenses.
   - Multi-select theme tabs to illuminate cross-cluster correlation bridges (`✦`).
   - Drag theme pills to rearrange ranking priority in the gallery.
   - Double-click any node to open the original Instagram post in a background tab.

---

## 🔒 Privacy & Safety
- **100% Client-Side**: All parsing, TF-IDF calculation, force simulations, and cross-digsite comparisons execute purely in your local browser memory.
- No personal data, cookies, or Instagram credentials are ever sent to an external server.
- Excludes political/war/conflict noise tabs by design, focusing on creative, lifestyle, musical, artistic, and technological domains.

---

::: DIGSITE ARCHAEOLOGY · TOPOGRAPHIC STRATA ENGINE v2.5 :::
