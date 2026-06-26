# Nebula Forge — Real Part Photos: Sourcing + Shot List

You asked the right question: *"Where can I get real photos that won't be copyrighted and won't screw me later?"* Here's the honest answer, ranked from safest to riskiest, then the exact shot list and the dead-simple way to drop photos into the site.

---

## The short version

**Shoot your own photos.** You physically build with these parts. The moment you press the shutter, *you* own the copyright — forever, no license, no attribution, nobody can ever come after you. It's the only option that's 100% bulletproof, and it makes the site look like *yours* instead of a reseller clone. Everything else has strings attached.

---

## Your options, ranked

**1. Shoot them yourself — BEST, zero legal risk**
You own every photo outright. A phone camera + a $15 lightbox + a window is genuinely enough (tips below). This is what I'd build the whole site around. Bonus: real builds in real cases photograph way better than catalog shots, and it's a real differentiator.

**2. Manufacturer "press" / media assets — OK, but get it in writing**
Brands (ASUS, Corsair, NVIDIA, Samsung, etc.) publish press images. These are usually for *editorial/review* use, **not** automatically for selling. If you want to use them, email their PR/marketing and get **written permission for commercial/retail use**. Keep the email. Without that, it's a gray area that can bite you.

**3. Licensed stock photos — safe if you pay for the right license**
Shutterstock / Adobe Stock / iStock have product shots. Buy a license that explicitly covers **commercial use**. Save the license receipt. Downside: costs money, and the same image shows up on other sites.

**4. Distributor-provided assets (incl. Micro Center) — only with explicit permission**
If you become an official reseller/affiliate, your supplier sometimes grants a media kit. That's a *business agreement* — only use their images if they explicitly say you can.

### Do NOT do this (this is the "screw me later" stuff)
- ❌ Right-click-saving from Micro Center, Newegg, Amazon, B&H, or any store.
- ❌ Pulling images off Google Image search.
- ❌ Grabbing manufacturer product shots without written permission.
- ❌ Screenshotting YouTube reviews or other people's build photos.

All of the above are someone else's copyright. It might work for a while, then turn into a takedown notice or a bill. Not worth it when your phone is right there.

---

## Recommended: the DIY studio (cheap + repeatable)

You don't need a real studio. You need *consistency* — same angle, same light, same background for every part in a category, so the grid looks intentional and premium.

- **Background:** plain white poster board, or a cheap collapsible lightbox ($15–30 on Amazon). White or black both work — pick one and stick to it.
- **Light:** big soft window light, or two cheap LED panels at 45°. Avoid harsh direct sun (blows out RGB and metal).
- **Camera:** any modern phone. Turn on grid lines. Shoot in the highest resolution. Lock focus on the part.
- **Angle:** straight-on or a slight 3/4 hero angle. **Use the same angle for every part in a category** (all GPUs the same, all cases the same, etc.).
- **Framing:** part centered, a little empty space around it, roughly square (1:1).
- **RGB parts (RAM, coolers, cases):** take one shot with RGB **on** in a dim room — that's your hero. It'll look incredible.

### After the shoot (background removal — makes parts "float")
1. Knock out the background so it's transparent. Easiest free tools: **remove.bg**, the iPhone "lift subject" long-press, or Photoshop/Photopea "remove background."
2. Export as **PNG** (transparent) — this is what makes parts float cleanly on the dark site.
3. Keep it square-ish, ~2000px on the long side is plenty. Don't upload 50MB monsters; resize to keep the site fast.

---

## The Shot List

One photo per row. **Name the file exactly as shown** and drop it into `assets/parts/`. That's literally all you have to do — the site picks it up automatically.

### Processors (CPU)
| Part | Filename |
|---|---|
| AMD Ryzen 9 9950X3D | `cpu1.png` |
| AMD Ryzen 9 9900X | `cpu2.png` |
| Intel Core i9-14900KS | `cpu3.png` |
| AMD Ryzen 7 9800X3D | `cpu4.png` |
| AMD Threadripper 7980X | `cpu5.png` |

### Graphics Cards (GPU)
| Part | Filename |
|---|---|
| NVIDIA GeForce RTX 5090 | `gpu1.png` |
| NVIDIA GeForce RTX 5080 | `gpu2.png` |
| NVIDIA GeForce RTX 5070 Ti | `gpu3.png` |
| NVIDIA RTX 6000 Ada | `gpu4.png` |
| AMD Radeon RX 9900 XTX | `gpu5.png` |

### Memory (RAM) — *shoot with RGB on*
| Part | Filename |
|---|---|
| G.Skill Trident Z5 RGB 64GB | `ram1.png` |
| Kingston Fury Renegade 128GB | `ram2.png` |
| Corsair Dominator Titanium 32GB | `ram3.png` |
| Crucial Pro Workstation 256GB | `ram4.png` |

### Storage
| Part | Filename |
|---|---|
| Samsung 9100 Pro 4TB NVMe | `st1.png` |
| WD Black SN850X 2TB | `st2.png` |
| Crucial T705 8TB NVMe | `st3.png` |
| Solidigm D5 1.6TB Enterprise | `st4.png` |

### Cooling — *shoot with RGB on for the AIOs*
| Part | Filename |
|---|---|
| NEBULA Hydro 420 Pro | `cl1.png` |
| Arctic Liquid Freezer III 360 | `cl2.png` |
| Noctua NH-D15 G2 Air | `cl3.png` |
| Custom Hardline Loop | `cl4.png` |

### Cases — *hero shot, RGB on, 3/4 angle*
| Part | Filename |
|---|---|
| NEBULA Stellar Mid | `cs1.png` |
| Lian Li O11 Vision | `cs2.png` |
| Fractal Define 7 Stealth | `cs3.png` |
| NEBULA Quasar Forge XL | `cs4.png` |

### Power Supplies (PSU)
| Part | Filename |
|---|---|
| NEBULA Titanium 1200W | `ps1.png` |
| Seasonic Prime PX-1000 | `ps2.png` |
| Corsair AX1600i | `ps3.png` |

---

## How to put a photo live (30 seconds, no coding)

1. Drop your file into `nebula-forge/assets/parts/` (e.g. `gpu1.png`).
2. Open `nebula-forge/assets/parts/photos.js`.
3. Find that part's line and **delete the `//`** at the start to switch it on:
   ```
   P['gpu1'] = DIR + 'gpu1.png';   // NVIDIA GeForce RTX 5090
   ```
4. Save, refresh the configurator. The real photo replaces the placeholder.

You can do these one at a time as you shoot — no need to finish all 27 at once. Anything you haven't shot yet keeps showing the temporary placeholder render, so the site always looks complete. If a filename is ever wrong, the site just falls back to the placeholder instead of breaking.

---

## What I'm using in the meantime

Until your photos exist, the configurator shows clean placeholder renders so we can build, test, and design everything else. **These are temporary scaffolding, not the final look** — the second you drop in real PNGs, they take over automatically. The whole site is wired photo-first around your real shots.
