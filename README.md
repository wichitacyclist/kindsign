# KindSign

**The world's easiest open-source donation sign system.**

Create beautiful, print-ready yard signs for food drives, coat collections, school supplies, disaster relief, and more — in under five minutes.

Simple. Positive. Hopeful. Beautiful. Community-first.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## User flow

Landing → Choose template → Customize → Preview → Export PDF → Order from printer

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + accessible UI primitives
- Zustand (persisted editor + local community gallery)
- Zod schemas for design validation
- Framer Motion for joyful motion
- QRCode for Maps / website / wishlist codes
- html-to-image for PNG/SVG; browser print for PDF with bleed & crop marks

## Features

- 13 professional templates (Minimal, Community, Church, Food Drive, …)
- 7 auto-generated color themes + colorblind-safe mode
- Unlimited drop-off locations with optional QR, GPS icon, website
- Optional logo, hero photo, city/state/skyline silhouettes
- Print sizes: 18×24, 24×36, 11×17, A4, A3
- Printer presets: Imprint, Signs.com, Vistaprint, UPrinting, Signs On The Cheap
- Automated print quality checks (contrast, margins, type, image res)
- Community Templates gallery: publish, fork, rate, duplicate, share URL

## Project structure

```
src/
  app/           # routes: /, /create, /gallery, /share/[id]
  components/    # landing, editor, sign canvas, gallery, ui
  lib/           # themes, templates, sizes, presets, export, quality
```

## Design philosophy

No guilt. No politics. No negativity. Signs should inspire people to help one another.

## License

MIT — built for churches, schools, nonprofits, cities, and neighbors everywhere.
