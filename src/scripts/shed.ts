import gsap from 'gsap';
import { reduce } from './engine';

/**
 * The hero barcode. The paper "hair mass" sheds bars that hang into the dark section below,
 * exactly like the logo. One driver, three inputs: time (idle sway + auto laser), pointer (bars lift and part,
 * laser follows), scroll (bars stretch). Runs on the shared GSAP ticker.
 */
export function shed(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  let w = 0, h = 0, dpr = 1;
  type Bar = { x: number; bw: number; base: number };
  let bars: Bar[] = [];
  let seed = 41;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);

  const build = () => {
    seed = 41;
    bars = [];
    let x = 0;
    while (x < w + 12) {
      const bw = [2, 2, 3, 4, 6, 9][Math.floor(rnd() * 6)] * (w < 600 ? 0.8 : 1.15);
      const base = 0.62 + 0.38 * Math.pow(rnd(), 1.6);
      bars.push({ x, bw, base });
      x += bw + [2, 3, 3, 5, 8][Math.floor(rnd() * 5)] * (w < 600 ? 0.8 : 1.15);
    }
  };

  const size = () => {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    draw(0, 0);
  };

  let px = -999, tx = -999, t = 0, scrollK = 0, inside = false;
  const paper = '#efede6';
  const laser = '#ff2b1c';

  function draw(time: number, k: number) {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < bars.length; i++) {
      const b = bars[i];
      const cx = b.x + b.bw / 2;
      const d = Math.abs(cx - px);
      const part = Math.exp(-Math.pow(d / 110, 2)); // bars lift near the laser
      const sway = Math.sin(time * 0.9 + cx * 0.011) * 5 + Math.sin(time * 0.37 + i * 0.7) * 3;
      const len = Math.min(h, h * b.base * (1 + k * 0.35) + sway - part * h * 0.22);
      ctx.fillStyle = d < b.bw + 2 ? laser : paper;
      ctx.fillRect(b.x, 0, b.bw, Math.max(8, len));
    }
    if (px > -500) {
      ctx.fillStyle = laser;
      ctx.fillRect(px - 1, 0, 2, h);
    }
  }

  const tick = (_t: number, dt: number) => {
    t += dt / 1000;
    const r = canvas.getBoundingClientRect();
    if (r.bottom < -50 || r.top > innerHeight + 50) return; // off screen: pause
    scrollK = gsap.utils.clamp(0, 1, scrollY / innerHeight);
    if (!inside) tx = (Math.sin(t * 0.42) * 0.5 + 0.5) * w; // idle: laser scans by itself
    px += (tx - px) * Math.min(1, dt / 90);
    draw(t, scrollK);
  };

  const move = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    inside = e.clientY < r.bottom + 40 && e.clientY > 0;
    if (inside) tx = e.clientX - r.left;
  };

  size();
  new ResizeObserver(size).observe(canvas);
  if (reduce) {
    px = -999;
    draw(0, 0);
    return;
  }
  addEventListener('pointermove', move, { passive: true });
  gsap.ticker.add(tick);
}
