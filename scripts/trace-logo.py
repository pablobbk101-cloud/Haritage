"""Vectorise public/img/logo-source.jpg into public/img/logo.svg (ink on transparent). pip install potracer pillow numpy"""
from PIL import Image
import numpy as np, potrace
im = Image.open('public/img/logo-source.jpg').convert('L')
W, H = im.size
big = im.resize((W*4, H*4), Image.LANCZOS)
dark = np.array(big) < 140
bm = potrace.Bitmap(~dark)   # potracer traces the False pixels, so invert to trace the ink
pl = bm.trace(turdsize=6, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.4)
parts = []
for c in pl:
    s = c.start_point; d = [f"M{s.x:.1f},{s.y:.1f}"]
    for seg in c.segments:
        if seg.is_corner: d.append(f"L{seg.c.x:.1f},{seg.c.y:.1f}L{seg.end_point.x:.1f},{seg.end_point.y:.1f}")
        else: d.append(f"C{seg.c1.x:.1f},{seg.c1.y:.1f} {seg.c2.x:.1f},{seg.c2.y:.1f} {seg.end_point.x:.1f},{seg.end_point.y:.1f}")
    parts.append(''.join(d) + 'Z')
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W*4} {H*4}" role="img" aria-label="HAIRitage Salon logo"><path fill="currentColor" fill-rule="evenodd" d="{"".join(parts)}"/></svg>'
open('public/img/logo.svg', 'w').write(svg)
open('public/img/logo-wordmark.svg', 'w').write(svg.replace(f'viewBox="0 0 {W*4} {H*4}"', f'viewBox="0 1040 {W*4} 150"'))
print(len(svg), 'bytes')
