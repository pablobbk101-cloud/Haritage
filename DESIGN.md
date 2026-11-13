# HAIRitage Salon99: design brief

## Brief
- Subject: HAIRitage Salon99, hair and beauty salons in Roodepoort (Westgate and Allen's Nek).
- Audience: women, men and parents booking braids, locs, relaxers, wigs, nails and lashes. Mostly on phones.
- Job: get people to book an exact slot (no deposit, pay at the salon) on the salon's own site instead of a third-party listing.
- Source material: the real logo, hours, addresses, phone numbers, staff, price lists, stylist-to-service links and durations from the salons' My Appointment pages (`scripts/ma-data.json`, `scripts/raw-services.json`).

## Look: warm studio
- Simple, calm, rounded. One accent, sentence case everywhere, no tracked capitals, no heavy motion.
- Palette (tokens in `src/styles/global.css`): cream `#fbf7f1` ground, sand `#f3ebe1`, ink `#2b201c`, clay accent `#b4492d`, soft clay `#f6e3d8`.
- Type: Fraunces (display, warm serif) and Inter (body and labels).
- Shape: 16px cards, 10px inner controls, pill buttons and chips.
- Signature: the real logo set large on a soft clay tile in the hero, and in booking the day shown as bars, one every 15 minutes, with the time above each bar, OPEN on the first and CLOSE on the last.
- Motion: a small fade-up on scroll and a hover lift, nothing else. Respects reduced motion. No smooth-scroll library, no page curtain.

## Pages
Home, Services (all 372, filter and search), Book (6-step booking with receipt), Salons, Team, 404.

## Assumptions to replace
- Availability on /book is simulated and no payment is taken online. Connect the salon's calendar to go live.
- No salon photography was supplied: the site uses the logo and type only. Add real photos of styles when the salon has them.
