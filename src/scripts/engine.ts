import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const bars = gsap.utils.toArray<HTMLElement>('.curtain i');
const mark = document.querySelector<HTMLElement>('.curtain .mark');
const scanLine = document.querySelector<HTMLElement>('.curtain .scan');

/* ---------- one clock: GSAP ticker drives Lenis ---------- */
export let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- ready gate (after the curtain lifts) ---------- */
let ready = false;
const queue: Array<() => void> = [];
export function onReady(fn: () => void) {
  if (ready) fn();
  else queue.push(fn);
}
function setReady() {
  ready = true;
  root.dataset.ready = 'true';
  queue.splice(0).forEach((f) => f());
  document.dispatchEvent(new CustomEvent('hs:ready'));
}

/* ---------- curtain: barcode bars, scan left to right ---------- */
function coverOut() {
  if (reduce) {
    root.classList.remove('cover');
    return setReady();
  }
  const first = !sessionStorage.getItem('hs-seen');
  try { sessionStorage.setItem('hs-seen', '1'); } catch (_) {}
  gsap.set(bars, { scaleY: 1, transformOrigin: 'bottom' });
  gsap.set(mark, { opacity: 1 });
  root.classList.remove('cover');
  const tl = gsap.timeline({ onComplete: setReady });
  if (first) {
    // first visit: let the laser read the mark once
    tl.fromTo(scanLine, { x: 0, opacity: 1 }, { x: innerWidth, duration: 0.9, ease: 'power2.inOut' }, 0.1)
      .to(mark, { opacity: 1, duration: 0.01 }, 0)
      .to(mark, { opacity: 0, duration: 0.3 }, 0.95)
      .to(scanLine, { opacity: 0, duration: 0.2 }, 1.0);
  } else {
    tl.to(mark, { opacity: 0, duration: 0.25 }, 0.05);
  }
  const at = first ? 1.0 : 0.1;
  tl.to(bars, { scaleY: 0, duration: 0.7, ease: 'expo.inOut', stagger: { each: 0.03, from: 'start' } }, at);
  tl.set('.curtain', { pointerEvents: 'none' });
}

function coverIn(url: string) {
  if (reduce) {
    location.href = url;
    return;
  }
  gsap.set(bars, { transformOrigin: 'top' });
  gsap.set('.curtain', { pointerEvents: 'all' });
  const tl = gsap.timeline({
    onComplete: () => {
      root.classList.add('cover');
      location.href = url;
    },
  });
  tl.to(bars, { scaleY: 1, duration: 0.5, ease: 'expo.inOut', stagger: { each: 0.025, from: 'start' } }, 0)
    .fromTo(scanLine, { x: 0, opacity: 1 }, { x: innerWidth, duration: 0.55, ease: 'power2.inOut' }, 0)
    .to(mark, { opacity: 1, duration: 0.25 }, 0.25)
    .to(scanLine, { opacity: 0, duration: 0.1 }, 0.55);
}

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
  if (!a || a.target === '_blank' || a.hasAttribute('download') || a.dataset.noTransition !== undefined) return;
  const u = new URL(a.href, location.href);
  if (u.origin !== location.origin) return;
  if (u.pathname === location.pathname && u.search === location.search) {
    if (u.hash) {
      e.preventDefault();
      const t = document.querySelector(u.hash) as HTMLElement | null;
      if (t) lenis ? lenis.scrollTo(t, { offset: -70 }) : t.scrollIntoView();
      closeMenu();
    }
    return;
  }
  e.preventDefault();
  closeMenu();
  coverIn(u.href);
});

addEventListener('pageshow', (ev) => {
  if ((ev as PageTransitionEvent).persisted) {
    gsap.set(bars, { scaleY: 0 });
    root.classList.remove('cover');
    gsap.set('.curtain', { pointerEvents: 'none' });
  }
});

/* ---------- mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const mnav = document.getElementById('mnav');
let prevHd = root.dataset.hd || 'paper';
function openMenu() {
  prevHd = root.dataset.hd || 'paper';
  root.dataset.hd = 'ink';
  mnav?.classList.add('open');
  menuBtn?.setAttribute('aria-expanded', 'true');
  if (menuBtn) menuBtn.textContent = 'Close';
  lenis?.stop();
}
function closeMenu() {
  if (!mnav?.classList.contains('open')) return;
  mnav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
  if (menuBtn) menuBtn.textContent = 'Menu';
  root.dataset.hd = prevHd;
  lenis?.start();
}
menuBtn?.addEventListener('click', () => (mnav?.classList.contains('open') ? closeMenu() : openMenu()));
addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

/* ---------- reveals (created after the curtain lifts) ---------- */
onReady(() => {
  // header gets a solid ground once the page scrolls
  const hdEl = document.getElementById('hd');
  ScrollTrigger.create({ start: 40, end: 'max', onToggle: (self) => hdEl?.classList.toggle('solid', self.isActive) });
  // header theme follows the section under it
  gsap.utils.toArray<HTMLElement>('[data-hd]').forEach((sec) => {
    if (sec === root) return;
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 36px',
      end: 'bottom 36px',
      onToggle: (self) => {
        if (self.isActive && !mnav?.classList.contains('open')) root.dataset.hd = sec.dataset.hd!;
      },
    });
  });

  if (reduce) return;

  gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((el) => {
    const spans = el.querySelectorAll('.ln>span');
    gsap.to(spans, {
      y: 0,
      duration: 1.05,
      ease: 'expo.out',
      stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        delay: Number(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      },
    );
  });

  gsap.utils.toArray<HTMLElement>('[data-scan]').forEach((el) => {
    gsap.to(el, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1,
      ease: 'expo.out',
      delay: Number(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });
});

/* boot */
addEventListener('load', () => document.fonts.ready.then(coverOut));
