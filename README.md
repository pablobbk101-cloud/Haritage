# HAIRitage Salon99 — concept site

Own-brand site with online booking for HAIRitage Salon99, Roodepoort (Westgate + Allen's Nek).
Look: **warm studio**. Cream and clay palette, Fraunces and Inter, rounded cards. The logo is the hero and booking shows the day as 15-minute time bars.

Built by Mr Point Productions as a pitch concept. See `DESIGN.md` for the brief, concept card and system.

## Stack

Astro (static) · GSAP (booking bars only) · self-hosted fonts (Fraunces, Inter).

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
- **No deposit:** clients book a slot and pay at the salon. A payment provider can be added later if the salon wants deposits.
- **Durations are real**: each service uses the length set in the salon's own My Appointment account (`scripts/ma-data.json`).
- **Services and prices** were taken from the salons' public My Appointment pages and need the owner's sign-off.
- **Stylists and their services are copied from My Appointment's booking form** for each salon: every service group lists exactly the stylists the salon linked to it (`scripts/ma-data.json`, merged by `scripts/build-services.py` into `src/data/services.json` and `src/data/ma.json`). If the salon changes who does what, update `ma-data.json` and re-run the script.
- **Site URL** is a placeholder (`haritage.pages.dev`).
- **No salon photography** yet; the site is typographic plus the traced logo. Real photos would lift it most.
