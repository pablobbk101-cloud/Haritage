import services from './services.json';

export type Service = {
  id: number;
  cat: string;
  name: string;
  price: number | null;
  from: boolean;
  branches: string[];
};

export const SERVICES = services as Service[];

export const SITE = {
  name: 'HAIRitage Salon99',
  short: 'HAIRitage',
  tagline: 'Your hair. Your heritage. Your slot.',
  description:
    'HAIRitage Salon99 is an ethnic hair and beauty salon in Roodepoort with two branches, Westgate and Allen\'s Nek. Braids, locs, relaxers, wigs, nails and lashes. Book your exact slot online.',
  credit: { name: 'Mr Point Productions', url: 'https://mrpoint.online', phone: '+27 60 452 1037' },
};

export const HOURS: [string, string][] = [
  ['Monday to Friday', '09:00 to 18:00'],
  ['Saturday', '08:00 to 17:00'],
  ['Sunday', '09:00 to 16:00'],
];

// open/close hour by JS weekday (0 = Sunday)
export const OPEN: Record<number, [number, number]> = {
  0: [9, 16], 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [8, 17],
};

export const BRANCHES = {
  westgate: {
    id: 'westgate',
    name: 'Westgate',
    full: 'HAIRitage Salon Westgate',
    address: ['Westgate Shopping Centre', '120 Ontdekkers Road, Horizon View', 'Roodepoort'],
    where: 'Entrance 1, Woolworths entrance, opposite HiFi Corp',
    phone: '068 523 8088',
    tel: '+27685238088',
    wa: '27685238088',
    map: 'https://www.google.com/maps/search/?api=1&query=Westgate+Shopping+Centre+Roodepoort',
  },
  allensnek: {
    id: 'allensnek',
    name: "Allen's Nek",
    full: "HAIRitage Salon Allen's Nek",
    address: ["Shop 2B, Allen's Nek Retail Park", 'Cnr Hendrik Potgieter and Jim Fouche', 'Roodepoort'],
    where: "Allen's Nek Retail Park",
    phone: '072 997 4937',
    tel: '+27729974937',
    wa: '27729974937',
    map: 'https://www.google.com/maps/search/?api=1&query=Allen%27s+Nek+Retail+Park+Roodepoort',
  },
} as const;

export type BranchId = keyof typeof BRANCHES;

export const CATEGORIES: { id: string; label: string; blurb: string }[] = [
  { id: 'braids', label: 'Braids & twists', blurb: 'Knotless, box braids, butterfly locs, faux locs, Fulani, twists.' },
  { id: 'cornrows', label: 'Cornrows & plaiting', blurb: 'Freehand, fishbone, benny and betty, unplaiting.' },
  { id: 'straightback', label: 'Straight-back', blurb: 'Straight-up, half straight-back, tribal lines.' },
  { id: 'locs', label: 'Dreadlocks', blurb: 'Starter locs, crochet, interlocking, twist and style.' },
  { id: 'relax', label: 'Relaxers & perms', blurb: 'Mizani, Dark and Lovely, Design Essentials, perming.' },
  { id: 'styling', label: 'Styling', blurb: 'Blow waves, silk press, finger waves, gel-ups, bob cuts.' },
  { id: 'cuts', label: 'Cuts & barbering', blurb: 'Fades, shaves, chiskop and trims for adults and kids.' },
  { id: 'care', label: 'Colour & care', blurb: 'Colour, treatments, hot oil, Mizani wash and moisture.' },
  { id: 'wigs', label: 'Wigs', blurb: 'Installation, plucking, styling, cut and straighten.' },
  { id: 'nails', label: 'Nails', blurb: 'Gel, acrylic, dip, pedicures and nail art.' },
  { id: 'lashes', label: 'Lashes & brows', blurb: 'Cluster and strip lashes, tint, shape and tweeze.' },
  { id: 'massage', label: 'Massage', blurb: "Allen's Nek: aromatherapy, back, neck and shoulder, foot." },
  { id: 'makeup', label: 'Make-up', blurb: 'Full make-up with strip lashes.' },
];

export function catStats(id: string) {
  const list = SERVICES.filter((s) => s.cat === id);
  const prices = list.map((s) => s.price).filter((p): p is number => !!p);
  return { count: list.length, min: prices.length ? Math.min(...prices) : null };
}

export const STAFF: Record<BranchId, { name: string; role: string }[]> = {
  westgate: [
    { name: 'Sandra', role: 'Nail tech' },
    { name: 'Buhle', role: 'Nail tech' },
    { name: 'Sabelisiwe', role: 'Nail tech' },
    { name: 'Nompumelelo', role: 'Nails, make-up' },
    { name: 'Tebogo', role: 'Stylist, wig install' },
    { name: 'Ayanda', role: 'Stylist, dreadlocks' },
    { name: 'Mahadi', role: 'Dreadlocks, wig install' },
    { name: 'Sibongile', role: 'Stylist' },
    { name: 'Sindiswa', role: 'Stylist, wig install' },
    { name: 'Violet', role: 'Stylist' },
    { name: 'Ncobile', role: 'Stylist, make-up, lashes' },
    { name: 'Zinhle', role: 'Stylist, wig install' },
    { name: 'Simangele', role: 'Plaiter' },
    { name: 'Thabo M', role: 'Stylist, pixie' },
    { name: 'Tumi', role: 'Stylist, dreadlocks' },
    { name: 'Thami', role: 'Stylist, pixie' },
    { name: 'Aubrey', role: 'Stylist, razor cut' },
    { name: 'Kenny', role: 'Pixie, cuts' },
    { name: 'Nomsa M', role: 'Stylist, dreadlocks' },
  ],
  allensnek: [
    { name: 'Thubelihle', role: 'Nails, lashes, massage' },
    { name: 'Zinhle', role: 'Make-up, nail tech' },
    { name: 'Rebecca', role: 'Nails, hair' },
    { name: 'Mpho T', role: 'Plaiter, nail tech' },
    { name: 'Nomsa', role: 'Plaiter stylist' },
    { name: 'Suku', role: 'Plaiter stylist' },
    { name: 'Jane', role: 'Plaiter stylist' },
    { name: 'Thobile', role: 'Plaiter stylist' },
    { name: 'Zandile', role: 'Dreadlocks stylist' },
    { name: 'Zanele', role: 'Plaiter stylist' },
    { name: 'Masentle', role: 'Plaiter stylist' },
    { name: 'Martina Lavender', role: 'Plaiter stylist' },
    { name: 'Neli', role: 'Plaiter stylist' },
    { name: 'Tsholo', role: 'Plaiter stylist' },
    { name: 'Fana', role: 'Barber, pixie, colour, perming' },
    { name: 'Jimmy', role: 'Barber, pixie, colour, perming' },
    { name: 'Siphiwe', role: 'Barber, pixie, colour, perming' },
    { name: 'Sunny', role: 'Dreadlocks, braids, cuts, colour, relaxer' },
    { name: 'Promise', role: 'Dreadlocks stylist' },
    { name: 'Stanley', role: 'Dreadlocks stylist' },
  ],
};

export const money = (n: number | null, from = false) => (n ? `${from ? 'from ' : ''}R${n}` : 'Quoted');
