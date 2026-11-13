"""Merge the two My Appointment price lists into src/data/services.json.
Run: python3 scripts/build-services.py  (reads scripts/raw-services.json)"""
import re, json
raw = json.load(open('scripts/raw-services.json'))
MAP = {'Hair - Braids':'braids','Hair - Twists':'braids','Hair - Cornrows':'cornrows','Hair - Dreadlocks':'locs',
 'Hair - Relaxers':'relax','Hair - Perming':'relax','Hair - Straightback':'straightback','Hair - Styling':'styling',
 'Haircuts':'cuts','Hair - Technique':'care','Hair Colour':'care','Hair Treatments':'care','Hair - Wigs':'wigs',
 'Hands and Feet':'nails','Lashes':'lashes','Brows':'lashes','Brows and Lashes':'lashes','Tinting':'lashes',
 'Massage':'massage','Makeup':'makeup','Promotions':'makeup'}
RP = r'(?<![A-Za-z])(from\s*)?R\s?(\d{2,4})'
def price(n):
    m = re.search(RP, n, re.I); p = None; fr = False
    if m: p = int(m.group(2)); fr = bool(m.group(1))
    else:
        m = re.search(r'(?<![-\d])\(?(\d{2,4})\)?\s*$', n)
        if m and int(m.group(1)) >= 20: p = int(m.group(1))
    if p and p > 3000: p = None          # obvious typos such as R7000
    if re.search(r'minus', n, re.I): p = None
    return p, fr
def clean(n):
    n = re.sub(r'\(?\s*'+RP+r'(/\w+)?\s*\)?', '', n, flags=re.I)
    n = re.sub(r'\(?(?<![-\d])\d{2,4}\)?\s*$', '', n)
    n = re.sub(r'\s+', ' ', n).strip(' -(')
    n = re.sub(r'\s+-\s*|\s*-\s+', ' - ', n)
    if n.isupper() or sum(c.isupper() for c in n) > len(n)*.6: n = n.title()
    return n.strip(' -')
ma = json.load(open('scripts/ma-data.json'))   # real stylist-to-group links + durations from My Appointment
svc = {}
for b, cats in raw.items():
    gl = ma[b]['groups']
    for c in cats:
        cat = MAP[c['cat']]
        gi = next(i for i, g in enumerate(gl) if g['group'] == c['cat'])
        assert len(gl[gi]['durs']) == len(c['items']), (b, c['cat'])
        for ii, it in enumerate(c['items']):
            p, fr = price(it); name = clean(it)
            if not name or len(name) < 3: continue
            d = svc.setdefault((cat, name.lower()), {'cat':cat,'name':name,'price':p,'from':fr or bool(re.search('from',it,re.I)),'branches':[]})
            if b not in d['branches']: d['branches'].append(b)
            d.setdefault('m', {}).setdefault(b, [gi, gl[gi]['durs'][ii]])
            if d['price'] is None and p: d['price'] = p
out = list(svc.values())
for i, s in enumerate(out): s['id'] = i+1
json.dump(out, open('src/data/services.json','w'), ensure_ascii=False, indent=0)
json.dump({b: {'staff': ma[b]['staff'], 'groups': [{'g': g['group'], 'cat': MAP[g['group']], 'staff': g['staff']} for g in ma[b]['groups']]} for b in ma},
          open('src/data/ma.json','w'), ensure_ascii=False, indent=0)
print(len(out), 'services,', sum(1 for s in out if s['price']), 'priced')
