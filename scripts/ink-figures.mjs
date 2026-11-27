// Draws the site's wordless figures as SVG in the same pen as the home page grid: bowed pen
// strokes that overshoot their ends, ink fills, matrix brackets, hatching. No people, no words.
// Each figure draws the work it stands for (a chip, a stopwatch, a balance scale...).
//
// Each figure is a small before → after story. Parts are grouped:
//   s  always shown          b  shown only "before"          a  shown only "after"
//   mv slides in from (--tx, --ty)                           fall  drops away as it fades
// On the page (src/components/Figure.astro) a figure starts in its before state and plays
// into its after state when it scrolls into view. Without scripts, or with reduced motion,
// the after state shows.
//
// Run: node scripts/ink-figures.mjs   (writes src/figures/*.svg)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'figures');
fs.mkdirSync(OUT, { recursive: true });

const INK = '#111';
const noise = (a, b) => { const n = Math.sin(a * 127.1 + b * 311.7) * 43758.5453; return n - Math.floor(n) - 0.5; };
const f = (n) => Math.round(n * 10) / 10;
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 9973, 7);
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const poly = (pts) => 'M' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L') + 'Z';
const TAU = Math.PI * 2;

class Pen {
  constructor(seed) {
    this.seed = seed; this.k = 0;
    this.cur = { cls: 's', strokes: [], fills: [], paper: [] };
    this.groups = [this.cur];
  }
  r() { this.k += 1; return noise(this.seed, this.k); } // -0.5 .. 0.5

  // draw `fn` into its own group (later groups sit on top of earlier ones)
  as(cls, fn, { i = 0, d = 0, tx = 0, ty = 0, rot = 0 } = {}) {
    const prev = this.cur;
    this.cur = { cls, i, d, tx, ty, rot, strokes: [], fills: [], paper: [] };
    this.groups.push(this.cur);
    fn();
    this.cur = prev;
  }
  paper(pts) { this.cur.paper.push(poly(pts)); } // white under this group's ink, hides what is behind
  fill(pts) { this.cur.fills.push(poly(pts)); }

  // ---- strokes --------------------------------------------------------------------------
  // one pen stroke from a to b: slightly bowed, overshooting its ends a little
  line(ax, ay, bx, by, over = 1.6) {
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const s0 = over * (0.2 + (this.r() + 0.5) * 0.5), s1 = over * (0.4 + (this.r() + 0.5) * 0.8);
    const sx = ax - ux * s0, sy = ay - uy * s0, ex = bx + ux * s1, ey = by + uy * s1;
    const b = this.r() * 2 * Math.min(2.2, 0.4 + L * 0.011);
    const cx = (sx + ex) / 2 - uy * b, cy = (sy + ey) / 2 + ux * b;
    this.cur.strokes.push(`M${f(sx)} ${f(sy)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`);
  }
  curve(ax, ay, cx, cy, bx, by) { this.cur.strokes.push(`M${f(ax)} ${f(ay)}Q${f(cx)} ${f(cy)} ${f(bx)} ${f(by)}`); }
  path(pts, closed = false, over = 1.2) { const n = pts.length; for (let i = 0; i < (closed ? n : n - 1); i++) this.line(...pts[i], ...pts[(i + 1) % n], over); }
  jit(p, a = 1) { return [p[0] + this.r() * a, p[1] + this.r() * a]; }
  smooth(pts) {
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 1; i < pts.length - 1; i++) { const m = mid(pts[i], pts[i + 1]); d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`; }
    const l = pts[pts.length - 1];
    this.cur.strokes.push(d + `L${f(l[0])} ${f(l[1])}`);
  }
  arcPts(cx, cy, rx, ry, a0, a1, rot = 0, j = 0.5) {
    const n = Math.max(6, Math.round(Math.abs(a1 - a0) * Math.max(rx, ry) / 5)), c = Math.cos(rot), s = Math.sin(rot), pts = [];
    for (let k = 0; k <= n; k++) {
      const a = a0 + (a1 - a0) * k / n, x = Math.cos(a) * rx + this.r() * j, y = Math.sin(a) * ry + this.r() * j;
      pts.push([cx + x * c - y * s, cy + x * s + y * c]);
    }
    return pts;
  }
  arc(cx, cy, rx, ry, a0, a1, rot = 0) { this.smooth(this.arcPts(cx, cy, rx, ry, a0, a1, rot)); }
  // a closed oval drawn like a pen does: a little more than one turn
  oval(cx, cy, rx, ry, rot = 0, paper = false) {
    const a0 = this.r() * 3;
    if (paper) this.paper(this.arcPts(cx, cy, rx, ry, 0, TAU, rot, 0));
    this.arc(cx, cy, rx, ry, a0, a0 + TAU + 0.28, rot);
  }
  rect(x0, y0, x1, y1, j = 1.2, paper = false) {
    const pts = [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
    if (paper) this.paper(pts);
    this.path(pts.map((p) => this.jit(p, j)), true);
  }
  // 45° hatching inside a rectangle
  hatch(x0, y0, x1, y1, gap = 6) {
    for (let c = x0 + y0 + gap * 0.7; c < x1 + y1 - 1; c += gap) {
      const sx = Math.max(x0, c - y1), ex = Math.min(x1, c - y0);
      if (ex - sx > 2) this.line(sx, c - sx, ex, c - ex, 0.15);
    }
  }
  zigzag(ax, ay, bx, by, n = 6, amp = 4) {
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, pts = [];
    for (let k = 0; k <= n; k++) {
      const o = k === 0 || k === n ? 0 : (k % 2 ? 1 : -1) * amp;
      pts.push([ax + dx * k / n - uy * o + this.r() * 0.8, ay + dy * k / n + ux * o + this.r() * 0.8]);
    }
    this.path(pts, false, 0.3);
  }
  squiggle(x0, x1, y, amp = 2, waves = 0) {
    const n = waves || Math.max(3, Math.round((x1 - x0) / 7)), pts = [];
    for (let k = 0; k <= n * 2; k++) pts.push([x0 + (x1 - x0) * k / (n * 2), y + (k % 2 ? amp : -amp) * (0.7 + (this.r() + 0.5) * 0.5)]);
    this.smooth(pts);
  }
  wedge(cx, cy, r, a0, a1) { this.fill([[cx, cy], ...this.arcPts(cx, cy, r, r, a0, a1, 0, 0)]); }
  blob(cx, cy, r) {
    const N = 20, rot = this.r() * 0.3, pts = [];
    for (let k = 0; k < N; k++) { const t = (k / N) * TAU + rot, rr = r + this.r() * Math.min(0.9, r * 0.12); pts.push([cx + Math.cos(t) * rr, cy + Math.sin(t) * rr]); }
    let m = mid(pts[N - 1], pts[0]), d = `M${f(m[0])} ${f(m[1])}`;
    for (let i = 0; i < N; i++) { const q = pts[i]; m = mid(q, pts[(i + 1) % N]); d += `Q${f(q[0])} ${f(q[1])} ${f(m[0])} ${f(m[1])}`; }
    this.cur.fills.push(d + 'Z');
  }
  square(cx, cy, h) { this.rect(cx - h, cy - h, cx + h, cy + h, 1.2); }

  // ---- marks ----------------------------------------------------------------------------
  arrow(ax, ay, bx, by) {
    this.line(ax, ay, bx, by, 0.8);
    const a = Math.atan2(by - ay, bx - ax), L = 7;
    this.line(bx, by, bx - Math.cos(a - 0.5) * L, by - Math.sin(a - 0.5) * L, 0.4);
    this.line(bx, by, bx - Math.cos(a + 0.5) * L, by - Math.sin(a + 0.5) * L, 0.4);
  }
  cross(cx, cy, s) { this.line(cx - s, cy - s, cx + s, cy + s, 0.8); this.line(cx + s, cy - s, cx - s, cy + s, 0.8); }
  tick(cx, cy, s) { this.line(cx - s, cy, cx - s * 0.3, cy + s * 0.7, 0.6); this.line(cx - s * 0.3, cy + s * 0.7, cx + s, cy - s * 0.9, 0.9); }
  sparkle(cx, cy, s) { this.line(cx, cy - s, cx, cy + s, 0.2); this.line(cx - s * 0.75, cy, cx + s * 0.75, cy, 0.2); }
  brackets(x0, y0, x1, y1) {
    const s = Math.min(7, (y1 - y0) * 0.15);
    for (const [x, d] of [[x0, 1], [x1, -1]]) { this.line(x + d * s, y0, x, y0 + 0.5, 0.5); this.line(x, y0, x, y1, 0.5); this.line(x, y1 - 0.5, x + d * s, y1, 0.5); }
  }

  // ---- things ---------------------------------------------------------------------------
  // a GPU / processor: a square die with pins on every side
  chip(cx, cy, h, pins = 3) {
    this.rect(cx - h, cy - h, cx + h, cy + h, Math.min(1.2, h * 0.08), true);
    this.rect(cx - h * 0.45, cy - h * 0.45, cx + h * 0.45, cy + h * 0.45, 0.6);
    const pl = Math.max(3.5, h * 0.3);
    for (let k = 0; k < pins; k++) {
      const t = -h + (2 * h) * (k + 1) / (pins + 1);
      this.line(cx + t, cy - h, cx + t, cy - h - pl, 0.2); this.line(cx + t, cy + h, cx + t, cy + h + pl, 0.2);
      this.line(cx - h, cy + t, cx - h - pl, cy + t, 0.2); this.line(cx + h, cy + t, cx + h + pl, cy + t, 0.2);
    }
  }
  // a dial: a knob with a pointer and a few ticks on its top
  dial(cx, cy, r, ang) {
    this.oval(cx, cy, r, r, 0, true);
    for (let k = 0; k < 5; k++) { const a = -Math.PI * (0.88 - k * 0.19); this.line(cx + Math.cos(a) * (r + 2.5), cy + Math.sin(a) * (r + 2.5), cx + Math.cos(a) * (r + 5.5), cy + Math.sin(a) * (r + 5.5), 0.1); }
    this.line(cx, cy, cx + Math.cos(ang) * r * 0.78, cy + Math.sin(ang) * r * 0.78, 0.3);
    this.blob(cx, cy, Math.max(1.4, r * 0.13));
  }
  // a file: a page with a folded corner and a few lines of text
  doc(x, y, w, h, lines = 4) {
    const fo = Math.min(w, h) * 0.24, out = [[x, y], [x + w - fo, y], [x + w, y + fo], [x + w, y + h], [x, y + h]];
    this.paper(out);
    this.path(out.map((p) => this.jit(p, 0.8)), true);
    this.line(x + w - fo, y, x + w - fo, y + fo, 0.3); this.line(x + w - fo, y + fo, x + w, y + fo, 0.3);
    for (let k = 0; k < lines; k++) { const yy = y + h * 0.34 + k * h * 0.15; if (yy < y + h - 5) this.line(x + w * 0.17, yy, x + w * (k === lines - 1 ? 0.52 : 0.8), yy, 0.3); }
  }
  // a luggage-style tag, hole at (hx, hy), on a string from (ax, ay)
  tag(hx, hy, w, h, rot, ax, ay) {
    const c = Math.cos(rot), s = Math.sin(rot), T = ([x, y]) => [hx + x * c - y * s, hy + x * s + y * c];
    const pts = [[-5, 0], [4, -h / 2], [w, -h / 2], [w, h / 2], [4, h / 2]].map(T);
    this.paper(pts);
    this.path(pts.map((p) => this.jit(p, 0.5)), true, 0.6);
    const [qx, qy] = T([1.5, 0]);
    this.oval(qx, qy, 1.8, 1.8);
    this.curve(ax, ay, (ax + qx) / 2 + 3, Math.max(ay, qy) + 6, qx, qy);
  }
  stopwatch(cx, cy, r) {
    this.rect(cx - 6, cy - r - 13, cx + 6, cy - r - 6, 0.6);
    this.line(cx, cy - r - 6, cx, cy - r, 0.2);
    const a = -2.35; this.line(cx + Math.cos(a) * r, cy + Math.sin(a) * r, cx + Math.cos(a) * (r + 7), cy + Math.sin(a) * (r + 7), 0.2);
    this.oval(cx, cy, r, r, 0, true);
    for (let k = 0; k < 12; k++) {
      const t = (k / 12) * TAU, r0 = r * (k % 3 ? 0.86 : 0.78);
      this.line(cx + Math.cos(t) * r0, cy + Math.sin(t) * r0, cx + Math.cos(t) * r * 0.93, cy + Math.sin(t) * r * 0.93, 0.1);
    }
  }
  // a storage drum, like a cache or a disk
  cylinder(cx, cy, rx, ry, h) {
    const top = cy - h / 2, bot = cy + h / 2;
    this.paper([...this.arcPts(cx, top, rx, ry, Math.PI, TAU, 0, 0), ...this.arcPts(cx, bot, rx, ry, 0, Math.PI, 0, 0)]);
    this.oval(cx, top, rx, ry);
    this.line(cx - rx, top, cx - rx, bot, 0.2); this.line(cx + rx, top, cx + rx, bot, 0.2);
    this.arc(cx, bot, rx, ry, 0, Math.PI);
    this.arc(cx, top + h * 0.45, rx, ry, 0.08, Math.PI - 0.08);
  }
  // a process window: a box with a title bar
  win(cx, cy, w, h) {
    this.rect(cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2, 1, true);
    this.line(cx - w / 2, cy - h / 2 + 7, cx + w / 2, cy - h / 2 + 7, 0.3);
  }
  laptop(cx, by, w, h) {
    this.rect(cx - w / 2, by - h, cx + w / 2, by, 1, true);
    this.rect(cx - w / 2 + 5, by - h + 5, cx + w / 2 - 5, by - 4, 0.6);
    this.path([[cx - w / 2 - 1, by], [cx + w / 2 + 1, by], [cx + w / 2 + 11, by + 9], [cx - w / 2 - 11, by + 9]], true, 0.6);
  }
  rosette(cx, cy, r) {
    for (const s of [-1, 1]) {
      const x0 = cx + s * r * 0.32, y0 = cy + r * 0.92, x1 = cx + s * r * 0.78, y1 = cy + r * 2.25;
      this.paper([[x0 - 3, y0], [x0 + 3, y0], [x1 + 4, y1], [x1 - 4, y1]]);
      this.line(x0 - 3, y0, x1 - 4, y1, 0.3); this.line(x0 + 3, y0, x1 + 4, y1, 0.3);
      this.path([[x1 - 4, y1], [x1, y1 - 4], [x1 + 4, y1]], false, 0.2);
    }
    const pts = [];
    for (let k = 0; k <= 60; k++) { const a = (k / 60) * TAU; const rr = r * (1 + 0.13 * Math.cos(a * 11)); pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); }
    this.paper(pts); this.smooth(pts);
    this.oval(cx, cy, r * 0.6, r * 0.6);
    this.blob(cx, cy, r * 0.34);
  }
  // a conference paper: a page in two columns, a title, a figure box
  article(x, y, w, h, full = true) {
    this.rect(x, y, x + w, y + h, 1, true);
    if (!full) return;
    this.line(x + w * 0.2, y + 12, x + w * 0.8, y + 12, 0.3);
    this.line(x + w * 0.3, y + 19, x + w * 0.7, y + 19, 0.2);
    const cw = (w - 30) / 2;
    for (let col = 0; col < 2; col++) {
      const cx0 = x + 10 + col * (cw + 10);
      for (let k = 0; k < 9; k++) {
        const yy = y + 32 + k * 9.5;
        if (col === 1 && k >= 1 && k <= 4) { if (k === 1) this.rect(cx0, yy - 2, cx0 + cw, yy + 30, 0.6); continue; }
        if (yy > y + h - 8) break;
        this.line(cx0, yy, cx0 + cw * (k % 4 === 3 ? 0.6 : 1), yy, 0.15);
      }
    }
  }
}

// Fit the viewBox to what was drawn (before and after parts), padded, at the given aspect, so every
// figure fills its frame. `px` is about how wide the figure shows on a laptop: the pen width is set
// so lines come out near 1.4px there, like the home page grid.
function fig(name, draw, { aspect = 1.5, px = 290, pad = 0.08 } = {}) {
  const p = new Pen(hash(name));
  draw(p);
  const nums = p.groups.flatMap((g) => [...g.strokes, ...g.fills]).join(' ').match(/-?\d+(\.\d+)?/g).map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) { const x = nums[i], y = nums[i + 1]; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  for (const g of p.groups) if (g.cls.includes('mv')) { // room for anything that slides in
    if (g.ty < 0) y0 = Math.min(y0, y0 + g.ty * 0.5);
  }
  let w = (x1 - x0) * (1 + 2 * pad), h = (y1 - y0) * (1 + 2 * pad);
  if (w / h < aspect) w = h * aspect; else h = w / aspect;
  const vx = (x0 + x1) / 2 - w / 2, vy = (y0 + y1) / 2 - h / 2;
  const sw = 1.45 * w / px, bw = 1.0 * w / px;
  const body = p.groups.filter((g) => g.strokes.length || g.fills.length || g.paper.length).map((g) => {
    const vars = [g.i && `--i:${g.i}`, g.d && `--d:${g.d}ms`, g.tx && `--tx:${g.tx}px`, g.ty && `--ty:${g.ty}px`, g.rot && `--rot:${g.rot}deg`].filter(Boolean).join(';');
    let out = `<g class="${g.cls}"${vars ? ` style="${vars}"` : ''}>`;
    if (g.paper.length) out += `<path fill="#fff" stroke="none" d="${g.paper.join('')}"/>`;
    if (g.strokes.length) out += `<path class="pen" pathLength="1" d="${g.strokes.join('')}"/>`;
    if (g.fills.length) out += `<path class="ink" fill="${INK}" stroke-width="${f(bw * 10) / 10}" d="${g.fills.join('')}"/>`;
    return out + '</g>';
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(vx)} ${f(vy)} ${f(w)} ${f(h)}" aria-hidden="true" focusable="false">`
    + `<g fill="none" stroke="${INK}" stroke-width="${Math.round(sw * 100) / 100}" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>\n`;
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg);
  console.log(name.padEnd(14), `${(svg.length / 1024).toFixed(1)}KB`, 'viewBox', f(w), 'x', f(h));
}

// AWQ. vLLM merges q, k and v into one layer, but their weights have different ranges (the hatching).
// One dial set for all three gave wrong answers; now each part gets its own dial, and the X becomes a check.
fig('awq', (p) => {
  const xs = [118, 180, 242], bw = 40, y0 = 104, y1 = 172;
  xs.forEach((x, k) => { p.rect(x - bw / 2, y0, x + bw / 2, y1, 1); p.hatch(x - bw / 2, y0, x + bw / 2, y1, [4.5, 8, 13][k]); });
  p.brackets(90, y0 - 7, 270, y1 + 7);
  p.as('b', () => { p.dial(180, 56, 17, -0.75); xs.forEach((x) => p.curve(180 + (x - 180) * 0.22, 74, x + (180 - x) * 0.3, 84, x, y0 - 9)); });
  p.as('b', () => p.cross(296, 138, 8));
  xs.forEach((x, k) => p.as('a', () => { p.dial(x, 60, 12, [-2.3, -1.25, -0.35][k]); p.line(x, 73, x, y0 - 9, 0.3); }, { i: k * 3, d: 200 }));
  p.as('a', () => p.tick(298, 138, 10), { d: 750 });
});

// int4 decoding on A100 (Humming). Each output tile used to be split in two and summed back; now it is
// computed whole, and one more token streams out of the chip in the same time.
fig('decode-tiles', (p) => {
  const cx = 104, cy = 120, h = 44, t = 24;
  p.chip(cx, cy, h, 4);
  p.rect(cx - t, cy - t, cx + t, cy + t, 0.8);
  p.as('b mv', () => p.hatch(cx - t, cy - t, cx - 2, cy + t, 6), { tx: -5 });
  p.as('b mv', () => p.hatch(cx + 2, cy - t, cx + t, cy + t, 6), { tx: 5 });
  p.as('b', () => p.zigzag(cx, cy - t - 4, cx, cy + t + 4, 8, 3));
  p.as('a', () => p.hatch(cx - t, cy - t, cx + t, cy + t, 6), { d: 250 });
  const tok = (x) => p.rect(x - 9, cy - 7, x + 9, cy + 7, 0.7, true);
  [186, 214, 242].forEach((x) => tok(x));
  p.as('a mv', () => tok(270), { d: 450, tx: -22 });
  p.as('a', () => { p.line(196, cy - 16, 252, cy - 16, 0.4); p.line(214, cy + 16, 266, cy + 16, 0.4); }, { d: 650 });
});

// Official checkpoints (torchao). The files carried a stale field, like an old luggage tag, and were
// stopped before loading. The tag falls off, and the file drops into the model.
fig('checkpoints', (p) => {
  p.as('s', () => p.doc(42, 54, 62, 82, 3));
  p.as('s', () => p.doc(54, 64, 62, 82, 3));
  p.as('s', () => p.doc(66, 74, 62, 82, 4));
  p.as('b fall', () => p.tag(146, 96, 24, 13, 0.55, 122, 82), { ty: 46, rot: 40 });
  p.arrow(140, 132, 196, 132);
  p.as('b', () => { p.line(178, 104, 178, 160, 0.5); p.cross(178, 132, 7); });
  p.as('a mv', () => p.doc(226, 92, 34, 44, 2), { ty: -34, d: 350 });
  p.as('s', () => {
    p.paper([[206, 118], [274, 118], [274, 166], [206, 166]]);
    p.path([[206, 118], [206, 166], [274, 166], [274, 118]], false);
    p.line(206, 118, 194, 104, 0.4); p.line(274, 118, 286, 104, 0.4);
  });
  p.as('a', () => p.tick(300, 92, 9), { d: 900 });
});

// Benchmarks (vLLM). The stopwatch was effectively timing the cache: the warmup filled it, so the
// measured run barely moved the dial. Now it times the model, and the dial shows the real time.
fig('benchmarks', (p) => {
  const sx = 180, sy = 128, r = 40;
  p.chip(74, sy, 24, 3);
  p.cylinder(286, sy, 24, 8, 46);
  p.stopwatch(sx, sy, r);
  p.as('b', () => p.curve(sx + r + 3, sy - 4, sx + r + 24, sy - 22, 286 - 27, sy - 8));
  p.as('b', () => p.wedge(sx, sy, r * 0.62, -Math.PI / 2, -Math.PI / 2 + 0.75));
  p.as('a', () => p.curve(sx - r - 3, sy - 4, sx - r - 22, sy - 22, 74 + 24 + 10, sy - 8), { d: 150 });
  p.as('a', () => p.wedge(sx, sy, r * 0.62, -Math.PI / 2, -Math.PI / 2 + 4.5), { d: 500 });
});

// Fork-safe import (torchao). Importing torchao set up the GPU in the parent process, so the four
// workers vLLM forks from it broke. Now the parent lets go, and each worker sets up its own GPU.
fig('fork-safe', (p) => {
  const px = 180, py = 58, kids = [72, 144, 216, 288], ky = 160;
  kids.forEach((x) => p.line(px + (x - px) * 0.18, py + 20, x, ky - 18, 0.8));
  p.win(px, py, 56, 38);
  kids.forEach((x) => p.win(x, ky, 44, 32));
  p.as('b', () => { p.line(px + 29, py + 2, px + 52, py + 2, 0.3); p.chip(px + 70, py + 2, 13, 2); });
  kids.forEach((x, k) => p.as('b', () => p.zigzag(x - 13, ky - 9, x + 11, ky + 14, 5, 4), { i: k * 2 }));
  kids.forEach((x, k) => p.as('a', () => { p.line(x, ky + 17, x, ky + 24, 0.2); p.chip(x, ky + 38, 10, 2); }, { i: k * 2, d: 300 }));
});

// Tied weights (torchao, Transformers 5). The input and output layers share their weights, but the
// two couldn't be checked equal. The scale levels out, and a chain ties the two layers together.
fig('tied-weights', (p) => {
  const cx = 180, top = 60, base = 200, arm = 82;
  p.line(cx, top + 6, cx, base - 14, 0.3);
  p.path([[cx - 16, base], [cx, base - 16], [cx + 16, base]], false, 0.4);
  p.line(cx - 40, base, cx + 40, base, 0.6);
  p.path([[cx - 6, top + 8], [cx, top], [cx + 6, top + 8]], false, 0.3);
  const scale = (ang, cls, opts) => p.as(cls, () => {
    const ends = [[cx - Math.cos(ang) * arm, top + 4 - Math.sin(ang) * arm], [cx + Math.cos(ang) * arm, top + 4 + Math.sin(ang) * arm]];
    p.line(...ends[0], ...ends[1], 1);
    for (const [x, y] of ends) {
      const by = y + 54;
      p.line(x, y, x - 23, by, 0.2); p.line(x, y, x + 23, by, 0.2);
      p.line(x - 27, by, x + 27, by, 0.3);
      p.arc(x, by, 27, 9, 0.05, Math.PI - 0.05);
      p.rect(x - 10, by - 19, x + 10, by - 1, 0.6, true); p.hatch(x - 10, by - 19, x + 10, by - 1, 4.5);
    }
  }, opts);
  scale(0.2, 'b');
  scale(0, 'a', { d: 150 });
  p.as('a', () => {
    const ax = cx - arm + 12, bx = cx + arm - 12, y = top + 4 + 54 - 10, n = 11;
    for (let k = 0; k < n; k++) {
      const t = (k + 0.5) / n, x = ax + (bx - ax) * t, yy = y + 30 * 4 * t * (1 - t) * 0.6 + 6;
      const dydx = (30 * 4 * (1 - 2 * t) * 0.6) / (bx - ax);
      p.oval(x, yy, 6.5, k % 2 ? 1.6 : 3.4, Math.atan(dydx));
    }
  }, { d: 650 });
});

// Hackathon wins (solo): a podium built from pen squares; one ink blob drops onto the top.
fig('wins', (p) => {
  const CX = 180, cs = 30, h = 12.5, base = 192;
  for (const [o, n] of [[-1, 2], [0, 3], [1, 1]]) for (let k = 0; k < n; k++) p.square(CX + o * cs, base - (k + 0.5) * cs, h);
  p.line(CX - 2.2 * cs, base + 3, CX + 2.2 * cs, base + 3, 1.2);
  const by = base - 3 * cs - 20;
  p.as('a mv', () => p.blob(CX, by, 12.5), { d: 150, ty: -34 });
  p.as('a', () => { for (const a of [-2.4, -1.57, -0.74]) p.line(CX + Math.cos(a) * 21, by + Math.sin(a) * 21, CX + Math.cos(a) * 31, by + Math.sin(a) * 31, 0.4); }, { d: 650 });
}, { px: 288 });

// Judging: demos on three laptops, the middle one in front; a rosette lands on it.
fig('judge', (p) => {
  const screen = (k, x0, x1, y0, y1) => {
    if (k === 0) [0.4, 0.7, 0.55, 0.95].forEach((v, j) => { const bw = (x1 - x0) / 5.5, bx = x0 + 3 + j * bw * 1.3; p.rect(bx, y1 - (y1 - y0) * v, bx + bw, y1, 0.3); });
    if (k === 1) p.path([[x0, y1 - 3], [x0 + (x1 - x0) * 0.25, y1 - 12], [x0 + (x1 - x0) * 0.45, y1 - 8], [x0 + (x1 - x0) * 0.7, y1 - 24], [x1, y0 + 3]], false, 0.3);
    if (k === 2) [[0, 0.8], [6, 0.6], [6, 0.7], [0, 0.4], [6, 0.55]].forEach(([ind, len], j) => { const yy = y0 + 3 + j * (y1 - y0 - 4) / 5; p.line(x0 + ind, yy, x0 + ind + (x1 - x0 - ind) * len, yy, 0.15); });
  };
  const lap = (k, cx, by, w, h) => p.as('s', () => { p.laptop(cx, by, w, h); screen(k, cx - w / 2 + 11, cx + w / 2 - 11, by - h + 11, by - 9); });
  lap(0, 104, 140, 74, 48);
  lap(2, 256, 140, 74, 48);
  lap(1, 180, 170, 112, 72);
  p.as('a mv', () => p.rosette(180 + 56 - 8, 170 - 72 - 2, 15), { ty: -30, d: 250 });
}, { px: 288 });

// Reviewing: a stack of conference papers in two columns; review notes and a check are penned onto the top one.
fig('reviewer', (p) => {
  const x = 116, y = 56, w = 112, h = 140;
  p.as('s', () => p.article(x - 22, y - 18, w, h, false));
  p.as('s', () => p.article(x - 11, y - 9, w, h, false));
  p.as('s', () => p.article(x, y, w, h));
  p.as('a', () => p.squiggle(x + 10, x + 50, y + 54, 1.6), { d: 200 });
  p.as('a', () => { p.line(x + w + 8, y + 70, x + w + 8, y + 112, 0.3); p.line(x + w + 8, y + 70, x + w + 4, y + 70, 0.1); p.line(x + w + 8, y + 112, x + w + 4, y + 112, 0.1); }, { d: 500 });
  p.as('a', () => p.oval(x + 30, y + 99, 20, 6.5, -0.04), { d: 800 });
  p.as('a', () => p.tick(x + w + 24, y + 26, 10), { d: 1100 });
}, { px: 256 });

// 404: a grid of weights with one missing; the missing square drifts nearby.
fig('lost', (p) => {
  const cs = 24, cols = 9, rows = 3, x0 = 34, y0 = 24, miss = [6, 1];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    if (c === miss[0] && r === miss[1]) continue;
    const cx = x0 + (c + 0.5) * cs, cy = y0 + (r + 0.5) * cs, hh = cs * 0.34;
    p.rect(cx - hh, cy - hh, cx + hh, cy + hh, 1.1);
  }
  p.brackets(x0 - 7, y0 - 4, x0 + cols * cs + 7, y0 + rows * cs + 4);
  p.as('s float', () => {
    const fx = 320, fy = 44, hh = cs * 0.34 + 0.5;
    p.rect(fx - hh, fy - hh, fx + hh, fy + hh, 1.1);
    for (const [dx, dy] of [[-27, 10], [-35, 4], [-23, 16]]) p.line(fx + dx, fy + dy, fx + dx + 9, fy + dy - 3, 0.3);
  });
}, { aspect: 3, px: 600, pad: 0.06 });
