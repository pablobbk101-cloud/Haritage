// Small on purpose: mobile menu, gentle reveal. No smooth-scroll library, no page curtain.
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
export const lenis = null;
export function onReady(fn: () => void) { fn(); }

const body = document.body;
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('mnav');
function setMenu(open: boolean) {
  nav?.classList.toggle('open', open);
  body.classList.toggle('menu-open', open);
  btn?.setAttribute('aria-expanded', String(open));
  if (btn) btn.textContent = open ? 'Close' : 'Menu';
}
btn?.addEventListener('click', () => setMenu(!nav?.classList.contains('open')));
nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
matchMedia('(min-width: 861px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });

const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) items.forEach((el) => el.classList.add('in'));
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
}
