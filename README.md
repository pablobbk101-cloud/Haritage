# HAIRitage Salon99 — concept site

Own-brand site with online booking and deposits for HAIRitage Salon99, Roodepoort (Westgate + Allen's Nek).
Concept: **"Every bar is a slot."** The logo's afro sheds a barcode; every bar is a 30-minute start time; booking is a scan.

Built by Mr Point Productions as a pitch concept. See `DESIGN.md` for the brief, concept card and system.

## Stack

Astro (static) · GSAP + ScrollTrigger · Lenis · self-hosted fonts (Big Shoulders Display, Inter, Space Mono).

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

## Deploy (Cloudflare Pages)

- Connect this GitHub repo in Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Then set the real domain in `astro.config.mjs` (`site`) and in `public/robots.txt` (sitemap URL)

## Pages

`/` home · `/services/` 372 services with filters · `/book/` 6-step booking demo (salon, service, stylist, date, time bar, details) · `/salons/` · `/team/` · 404

## Regenerate data and logo

```bash
npm run services                 # scripts/raw-services.json -> src/data/services.json
python3 scripts/trace-logo.py    # public/img/logo-source.jpg -> logo.svg (needs potracer, pillow)
```

## Placeholders and assumptions (replace before going live)

- **Booking is a demo.** Availability is simulated and no payment is taken. It needs a real calendar and a payment provider (Yoco, PayFast or Stripe).
- **Deposit rule is a proposal:** 20% of price, rounded up to R10, min R50, max R200, R100 for quoted prices.
- **Durations are real**: each service uses the length set in the salon's own My Appointment account (`scripts/ma-data.json`).
- **Services and prices** were taken from the salons' public My Appointment pages and need the owner's sign-off.
- **Stylists and their services are copied from My Appointment's booking form** for each salon: every service group lists exactly the stylists the salon linked to it (`scripts/ma-data.json`, merged by `scripts/build-services.py` into `src/data/services.json` and `src/data/ma.json`). If the salon changes who does what, update `ma-data.json` and re-run the script.
- **Site URL** is a placeholder (`haritage.pages.dev`).
- **No salon photography** yet; the site is typographic plus the traced logo. Real photos would lift it most.
