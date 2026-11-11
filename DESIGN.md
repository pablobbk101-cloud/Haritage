# HAIRitage Salon99: design brief

## Brief
- Subject: HAIRitage Salon99, ethnic hair and beauty salons in Roodepoort (Westgate + Allen's Nek).
- Audience: women, men and parents booking braids, locs, relaxers, wigs, nails and lashes. Mostly on phones.
- Job: get people to book an exact slot and pay a small deposit, on the salon's own site instead of a third-party listing.
- Source material: the real logo, hours, addresses, phone numbers, staff and price lists from the salon's two My Appointment pages (see `scripts/raw-services.json`).

## Concept card
- Idea: the logo's hair turns into a barcode, so on this site a booking is a scan and every bar is a slot.
- Anchor: the HAIRitage logo itself (afro mass shedding a barcode) and the salon's online booking.
- Metaphor: the till and the scanner. Barcodes, laser line, receipt.
- Signature: the day-barcode on /book. Tall bars are free 30 minute starts, short stubs are taken, the laser follows you, click a bar and a receipt prints. The hero echoes it: the paper "hair mass" sheds a barcode that sways at idle and parts around the pointer.
- Emotion: sharp, loud, high contrast, like a freshly printed receipt.
- Motion verb: scan and snap. Things sweep in left to right like a scanner line, then lock.
- Screenshot frame: the hero with YOUR SLOT in laser red above the hanging bars.

## System
- Palette: ink `#0b0b0a` (ground, text), paper `#efede6` (ground), bone `#e1ddd0` (secondary ground), muted `#77736a`, line (ink or paper at 20%), laser `#ff2b1c` (accent, one use per view), night `#151513`.
- Type: Big Shoulders Display 700 to 900 for display (tall, condensed, bar-like), Inter Variable for body, Space Mono for labels, prices and receipt.
- Grid: 12 columns, fluid padding `clamp(1.1rem, 4vw, 3.5rem)`, hard 1px rules, zero radius.
- Motion language: one ease (`cubic-bezier(.16,1,.3,1)`), sweeps 0.45 to 0.6 s, stagger 20 to 40 ms. One clock (GSAP ticker).
- Idle: the hero barcode sways and a laser auto-scans when the pointer is still. Off under reduced motion.
- Page transition: barcode curtain (14 bars drop, navigate, lift).

## Pages
Home, Services (all 372 services, filter + search), Book (barcode booking + deposit receipt), Salons, Team, 404.

## Assumptions to replace
- Deposit rule is a proposal: 20% of price, rounded up to R10, min R50, max R200, R100 when the service is quoted.
- Availability on /book is simulated (deterministic) and payment is a demo. Connect the salon's calendar and a payment provider (Yoco, PayFast or Stripe) to go live.
- Service durations are estimates from category and price.
- Site URL in `astro.config.mjs` is a placeholder.
- No salon photography was available: the site uses the logo and typography only. Add real photos of styles when the salon supplies them.
- Staff first names and roles are taken from the public booking pages.
