/* ============================================================
   NEBULA FORGE — Real Part Photo Manifest
   ============================================================
   HOW THIS WORKS (the easy part):
   1. Drop a photo into this folder: nebula-forge/assets/parts/
   2. Name it EXACTLY like the filenames below (e.g. gpu1.png).
   3. Uncomment that line (delete the // at the start).
   4. Refresh the site. The real photo replaces the temp render.

   That's it. No code, no rebuild. If a photo is missing or the
   filename is wrong, the configurator quietly falls back to the
   placeholder render — nothing breaks.

   PHOTO TIPS for a clean, "floating product" look:
   • Shoot on a plain white or black backdrop, then knock the
     background out so it's transparent → save as .png
   • Square-ish framing (1:1), part centered, ~2000px is plenty.
   • Same lighting + angle across a category = a premium, uniform grid.
   ============================================================ */
(function () {
  var P = (window.PART_IMAGES = window.PART_IMAGES || {});
  var DIR = 'assets/parts/';

  /* ---------- PROCESSORS (CPU) ---------- */
  P['cpu1'] = DIR + 'cpu1.png';   // AMD Ryzen 9 9950X3D
  P['cpu2'] = DIR + 'cpu2.png';   // AMD Ryzen 9 9900X
  P['cpu3'] = DIR + 'cpu3.png';   // Intel Core i9-14900KS
  P['cpu4'] = DIR + 'cpu4.png';   // AMD Ryzen 7 9800X3D
  P['cpu5'] = DIR + 'cpu5.png';   // AMD Threadripper 7980X

  /* ---------- GRAPHICS CARDS (GPU) ---------- */
  P['gpu1'] = DIR + 'gpu1.png';   // NVIDIA GeForce RTX 5090
  P['gpu2'] = DIR + 'gpu2.png';   // NVIDIA GeForce RTX 5080
  P['gpu3'] = DIR + 'gpu3.png';   // NVIDIA GeForce RTX 5070 Ti
  P['gpu4'] = DIR + 'gpu4.png';   // NVIDIA RTX 6000 Ada
  P['gpu5'] = DIR + 'gpu5.png';   // AMD Radeon RX 9900 XTX

  /* ---------- MEMORY (RAM) ---------- */
  P['ram1'] = DIR + 'ram1.png';   // G.Skill Trident Z5 RGB 64GB
  P['ram2'] = DIR + 'ram2.png';   // Kingston Fury Renegade 128GB
  P['ram3'] = DIR + 'ram3.png';   // Corsair Dominator Titanium 32GB
  P['ram4'] = DIR + 'ram4.png';   // Crucial Pro Workstation 256GB

  /* ---------- STORAGE ---------- */
  P['st1'] = DIR + 'st1.png';     // Samsung 9100 Pro 4TB NVMe
  P['st2'] = DIR + 'st2.png';     // WD Black SN850X 2TB
  P['st3'] = DIR + 'st3.png';     // Crucial T705 8TB NVMe
  P['st4'] = DIR + 'st4.png';     // Solidigm D5 1.6TB Enterprise

  /* ---------- COOLING ---------- */
  P['cl1'] = DIR + 'cl1.png';     // be quiet! Pure Loop 2 FX 360
  P['cl2'] = DIR + 'cl2.png';     // Arctic Liquid Freezer III 360
  P['cl3'] = DIR + 'cl3.png';     // Noctua NH-D15 G2 Air
  // P['cl4'] = DIR + 'cl4.png';     // Custom Hardline Loop

  /* ---------- CASES ---------- */
  P['cs1'] = DIR + 'cs1.png';     // Corsair iCUE 5000X RGB
  P['cs2'] = DIR + 'cs2.png';     // Lian Li O11 Vision
  P['cs3'] = DIR + 'cs3.png';     // Fractal Define 7 Stealth
  P['cs4'] = DIR + 'cs4.png';     // Lian Li O11 Dynamic EVO XL

  /* ---------- POWER SUPPLIES (PSU) ---------- */
  P['ps1'] = DIR + 'ps1.png';     // ASUS ROG Thor 1200W
  P['ps2'] = DIR + 'ps2.png';     // Seasonic Prime PX-1000
  P['ps3'] = DIR + 'ps3.png';     // Corsair AX1600i
})();
