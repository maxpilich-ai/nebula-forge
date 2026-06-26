# VoidForge Systems

Marketing site and live PC configurator for **VoidForge Systems** — a boutique custom-PC shop in Minnesota.

It's a static site (plain HTML/CSS/JS, no build step). Open any page directly in a browser or serve the folder with any static host.

## Pages

| File | What it is |
|------|------------|
| `index.html` | Home — story, included extras, FAQ, policies, build request form |
| `forge.html` | **The Forge** — interactive PC configurator with live pricing |
| `product.html` | Featured flagship build (Forge Quasar X9) |
| `support.html` | Support, warranty, and certifications |

## Structure

```
assets/
  app.js            shared site interactions (nav, animations)
  styles.css        global styles
  parts/
    photos.js       maps each part to its real product photo
    rigs.js         featured pre-built rigs for the homepage
    *.png           component photos (transparent cut-outs)
```

## Adding a part photo

Drop a transparent `.png` into `assets/parts/` named after the part id
(e.g. `gpu5.png`), then uncomment its line in `assets/parts/photos.js`.
If a photo is missing, the configurator falls back to a clean text spec
sheet — nothing breaks.

## Before going live

- Replace the Stripe deposit link placeholder in `index.html`
- Replace the Formspree form IDs (build request + newsletter) in `index.html`
- Have the Policies / legal section reviewed by an attorney
- Confirm warranty wording (workmanship vs. hardware coverage)

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

© VoidForge Systems LLC · Minnesota · USA
