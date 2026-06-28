# VoidForge Systems

Marketing site and live PC configurator for **VoidForge Systems** — a boutique custom-PC shop.

It's a static site: plain HTML, CSS, and vanilla JavaScript with **no build step and no backend**. Open any page directly in a browser, serve the folder with any static host, or deploy it as-is to GitHub Pages.

## Tech stack

- HTML5 (one file per page, no templating)
- CSS in a single shared stylesheet (`assets/styles.css`) plus small page-scoped `<style>` blocks
- Vanilla JavaScript (no framework, no bundler, no dependencies)
- [Formspree](https://formspree.io) for form delivery (no server of our own)
- Hosted on GitHub Pages

## Pages

| File | What it is |
|------|------------|
| `index.html` | Home — story, included extras, FAQ, policies, reviews, build-request and newsletter forms |
| `forge.html` | **The Forge** — interactive PC configurator with live pricing |
| `product.html` | Featured flagship build (Forge Quasar X9) |
| `gear.html` | Peripherals / gear page |
| `support.html` | Support, warranty, and certifications |
| `404.html` | Custom not-found page (GitHub Pages serves it automatically) |

## Repository structure

```
.
├── index.html            home
├── forge.html            configurator (self-contained: catalog + pricing live here)
├── product.html          flagship product page
├── gear.html             gear page
├── support.html          support / warranty
├── 404.html              not-found page (has its own <base href>)
├── robots.txt            search-crawler rules + sitemap pointer
├── sitemap.xml           lists the 5 content pages
├── og-image.png          social share preview image
├── apple-touch-icon.png  iOS home-screen icon
├── README.md             this file
├── PHOTO-GUIDE.md        notes on sourcing component photos
├── PHOTO-CHECKLIST.md    per-part photo checklist
└── assets/
    ├── app.js            shared interactions (nav, cursor, scroll reveal)
    ├── styles.css        global styles + animations
    └── parts/
        ├── photos.js     maps each part id → its product photo
        ├── rigs.js       featured pre-built rigs shown on the homepage
        └── *.png         component photos (transparent cut-outs)
```

## Where to edit things

**Products and prices (the configurator):** everything lives in `forge.html`, in the inline `<script>`:

- `const PARTS` (line ~521) — the full parts catalog. Each part has an `id`, `name`, `tag`, `specs`, `mc` (your **cost**), `watts`, etc.
- `const PRESETS` (~565) — the default selected part in each category.
- `const MARKUP` (~575) — per-category markup applied to cost, e.g. `{cpu:.08, gpu:.06, ...}`.
- `const DEALS` (~577) — per-part discounts keyed by part id.
- `function sell()` (~579) — turns cost into the displayed price using `MARKUP` then `DEALS`.
- `function buildFee()` (~584) — the assembly fee tiers based on subtotal.

To change a price you almost always change a part's `mc`, a `MARKUP` value, or a `DEALS` entry — not a hard-coded number elsewhere.

**Featured pre-built rigs (homepage):** `assets/parts/rigs.js`.

**Flagship product copy/specs:** `product.html`. **Gear items:** `gear.html`. **Marketing prices/claims on the home page:** `index.html`.

**Images:** drop a transparent `.png` into `assets/parts/` named after the part id (e.g. `gpu5.png`), then make sure its line is present (uncommented) in `assets/parts/photos.js`. If a photo is missing, the configurator falls back to a clean text spec sheet — nothing breaks. Social/icon images are `og-image.png` and `apple-touch-icon.png` at the repo root.

**Forms:** all three forms (review, build request, newsletter) are in `index.html` and post to the same Formspree endpoint, id **`meebkkzn`**. To point forms at a different inbox, change that id. Submissions are sent over AJAX so the visitor stays on the page.

**Branding / colors:** the color palette is defined as CSS custom properties in the `:root` block at the top of `assets/styles.css` (the `--plasma-*` and `--aurora-*` tokens). Logo mark is inline SVG in each page header.

**SEO:** each page has its own `<title>`, meta description, and Open Graph / Twitter tags in its `<head>`. Site-wide crawler settings are in `robots.txt`; the URL list is in `sitemap.xml`.

## Deployment (GitHub Pages)

The site is served straight from the repository — there is nothing to build.

1. Commit and push to the `main` branch.
2. In the repo's **Settings → Pages**, source is **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. GitHub publishes to the Pages URL within a minute or two.

Typical update flow from a clone:

```bash
git add -A
git commit -m "Describe the change"
git push
```

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening the `.html` files directly works too, but a local server most closely matches production.)

## Switching to a custom domain later

When VoidForge moves to its own domain, the live GitHub Pages URL is referenced in several files and needs a search-and-replace. The current URL appears in:

- the five content pages and `404.html` (canonical/Open Graph tags)
- `robots.txt` and `sitemap.xml`

`404.html` additionally has a `<base href="...">` tag (near the top) that must be updated so its links resolve. Both `robots.txt` and `sitemap.xml` contain comments marking exactly what to change. After updating, add a `CNAME` file (GitHub Pages can create it for you when you set the custom domain in Settings → Pages).

## Maintenance notes

- **Scroll-reveal failsafe:** elements with the `.fade-up` class start hidden and are revealed by an `IntersectionObserver` in `app.js`. `index.html`, `product.html`, and `support.html` also include a `<noscript>` rule and a small inline timeout that force-reveal the content if JavaScript is disabled, fails to load, or the tab was opened in the background. Keep that failsafe if you copy the reveal pattern to a new page.
- **Duplicate photos:** `cpu1/cpu2/cpu4` are currently the same image, and `gpu1/gpu2` are the same image. Replacing the duplicates with distinct real photos is a nice-to-have, not a blocker.
- **Oversized photos:** a few CPU PNGs are ~0.8–0.9 MB; compressing them would speed up first load. `assets/parts/` is the bulk of the repo size.
- **Photo docs drift:** `PHOTO-GUIDE.md` lists some parts under placeholder "NEBULA" names; the authoritative names are the comments in `assets/parts/photos.js` and the `PARTS` catalog in `forge.html`.

## Before going live (review checklist)

- Have the Policies / legal section reviewed by an attorney.
- Confirm warranty wording (workmanship vs. hardware coverage).
- Confirm the Formspree inbox (`meebkkzn`) is the address you want submissions delivered to.

© VoidForge Systems
