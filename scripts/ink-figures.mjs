// Draws the site's wordless figures as SVG in the same pen as the home page grid: open pen
// squares, ink blobs (the grid's four drawn states), matrix brackets, and bowed strokes that
// overshoot their ends. No people, no words.
//
// Each figure is a small before → after story. Parts are grouped:
//   s  always shown          b  shown only "before"          a  shown only "after"
// On the page (src/components/Figure.astro) a figure starts in its before state and plays
// into its after state when it scrolls into view: before parts fade, after strokes draw in
// and after blobs drop in, one by one (--i staggers them, --d delays a group). Without
// scripts, or with reduced motion, the after state shows.
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

class Pen {
  constructor(seed) {
    this.seed = seed; this.k = 0;
    this.cur = { cls: 's', strokes: [], fills: [] };
    this.groups = [this.cur];
  }
  r() { this.k += 1; return noise(this.seed, this.k); } // -0.5 .. 0.5

  // draw `fn` into its own group: cls 'a' | 'b' | 's', plus 'mv' to slide in from (tx, ty)
  as(cls, fn, { i = 0, d = 0, tx = 0, ty = 0 } = {}) {
    const prev = this.cur;
    this.cur = { cls, i, d, tx, ty, strokes: [], fills: [] };
    this.groups.push(this.cur);
    fn();
    this.cur = prev;
  }

  // one pen stroke from a to b: slightly bowed, overshooting its ends a little
  line(ax, ay, bx, by, over = 1.8) {
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const s0 = over * (0.2 + (this.r() + 0.5) * 0.5), s1 = over * (0.4 + (this.r() + 0.5) * 0.8);
    const sx = ax - ux * s0, sy = ay - uy * s0, ex = bx + ux * s1, ey = by + uy * s1;
    const b = this.r() * 2 * Math.min(2.5, 0.5 + L * 0.012);
    const cx = (sx + ex) / 2 - uy * b, cy = (sy + ey) / 2 + ux * b;
    this.cur.strokes.push(`M${f(sx)} ${f(sy)}Q${f(cx)} ${f(cy)} ${f(ex)} ${f(ey)}`);
  }
  curve(ax, ay, cx, cy, bx, by) { this.cur.strokes.push(`M${f(ax)} ${f(ay)}Q${f(cx)} ${f(cy)} ${f(bx)} ${f(by)}`); }
  path(pts, closed = false) { const n = pts.length; for (let i = 0; i < (closed ? n : n - 1); i++) this.line(...pts[i], ...pts[(i + 1) % n]); }
  jit(p, a = 1) { return [p[0] + this.r() * a, p[1] + this.r() * a]; }

  square(cx, cy, h) {
    const rot = this.r() * 0.08, c = Math.cos(rot), s = Math.sin(rot);
    const pts = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y]) => {
      const px = x * h + this.r() * 1.2, py = y * h + this.r() * 1.2;
      return [cx + px * c - py * s, cy + px * s + py * c];
    });
    this.path(pts, true);
  }
  rect(x0, y0, x1, y1) { this.path([[x0, y0], [x1, y0], [x1, y1], [x0, y1]].map((p) => this.jit(p, 1.6)), true); }

  // a wobbly closed shape between a square (q = 0) and a circle (q = 1)
  shape(cx, cy, t, q) {
    const N = 20, rot = this.r() * 0.3, pts = [];
    for (let k = 0; k < N; k++) {
      const a = (k / N) * Math.PI * 2 + Math.PI / 4 + rot;
      const sq = 1 / Math.max(Math.abs(Math.cos(a)), Math.abs(Math.sin(a)));
      const rr = t * ((1 - q) * sq + q) + this.r() * 0.9;
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    let m = mid(pts[N - 1], pts[0]), d = `M${f(m[0])} ${f(m[1])}`;
    for (let i = 0; i < N; i++) { const p = pts[i]; m = mid(p, pts[(i + 1) % N]); d += `Q${f(p[0])} ${f(p[1])} ${f(m[0])} ${f(m[1])}`; }
    return d + 'Z';
  }
  blob(cx, cy, r) { this.cur.fills.push(this.shape(cx, cy, r, 1)); }
  ring(cx, cy, r) { this.cur.strokes.push(this.shape(cx, cy, r, 1)); }

  // one weight in the grid's four drawn states: 0 open square, 1 hollow ring, 2 rounded blob, 3 round blob
  cell(cx, cy, h, level) {
    if (level <= 0) return this.square(cx, cy, h);
    const q = level / 3, d = this.shape(cx, cy, h * (1 - 0.45 * q), Math.min(1, q * 1.1));
    (level >= 2 ? this.cur.fills : this.cur.strokes).push(d);
  }
  grid(x0, y0, cols, rows, cs, level = () => 0) {
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const lv = level(c, r);
      if (lv !== null) this.cell(x0 + (c + 0.5) * cs, y0 + (r + 0.5) * cs, cs * 0.34, lv);
    }
  }
  brackets(x0, y0, x1, y1) {
    const s = Math.min(7, (y1 - y0) * 0.15);
    for (const [x, d] of [[x0, 1], [x1, -1]]) {
      this.line(x + d * s, y0, x, y0 + 0.5, 0.6);
      this.line(x, y0, x, y1, 0.6);
      this.line(x, y1 - 0.5, x + d * s, y1, 0.6);
    }
  }
  slash(cx, cy, h) { this.line(cx - h * 1.1, cy + h * 1.1, cx + h * 1.1, cy - h * 1.1, 1.2); }
  tick(cx, cy, s) { this.line(cx - s, cy, cx - s * 0.3, cy + s * 0.7, 0.8); this.line(cx - s * 0.3, cy + s * 0.7, cx + s, cy - s * 0.9, 1); }
  // a loose pen loop around something, a little more than one turn
  loop(cx, cy, rx, ry) {
    const a0 = 2.4 + this.r(), N = 30, pts = [];
    for (let k = 0; k <= N; k++) {
      const a = a0 + (k / N) * (Math.PI * 2 + 0.45), g = 1 + this.r() * 0.04 + (k / N) * 0.07;
      pts.push([cx + Math.cos(a) * rx * g, cy + Math.sin(a) * ry * g]);
    }
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    for (let i = 1; i < pts.length - 1; i++) { const m = [(pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2]; d += `Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`; }
    this.cur.strokes.push(d);
  }
}

// Fit the viewBox to what was drawn (before and after parts), padded, at the given aspect, so every
// figure fills its frame. `px` is about how wide the figure shows on a laptop: the pen width is set
// so lines come out near 1.4px there, like the home page grid.
function fig(name, draw, { aspect = 1.5, px = 290, pad = 0.1 } = {}) {
  const p = new Pen(hash(name));
  draw(p);
  const nums = p.groups.flatMap((g) => [...g.strokes, ...g.fills]).join(' ').match(/-?\d+(\.\d+)?/g).map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) { const x = nums[i], y = nums[i + 1]; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  for (const g of p.groups) { // room for anything that slides in
    if (g.tx) { x0 = Math.min(x0, x0 + g.tx); x1 = Math.max(x1, x1 + g.tx); }
    if (g.ty) { y0 = Math.min(y0, y0 + g.ty); y1 = Math.max(y1, y1 + g.ty); }
  }
  let w = (x1 - x0) * (1 + 2 * pad), h = (y1 - y0) * (1 + 2 * pad);
  if (w / h < aspect) w = h * aspect; else h = w / aspect;
  const vx = (x0 + x1) / 2 - w / 2, vy = (y0 + y1) / 2 - h / 2;
  const sw = 1.45 * w / px, bw = 1.05 * w / px;
  const body = p.groups.filter((g) => g.strokes.length || g.fills.length).map((g) => {
    const vars = [g.i && `--i:${g.i}`, g.d && `--d:${g.d}ms`, g.tx && `--tx:${g.tx}px`, g.ty && `--ty:${g.ty}px`].filter(Boolean).join(';');
    let out = `<g class="${g.cls}"${vars ? ` style="${vars}"` : ''}>`;
    if (g.strokes.length) out += `<path class="pen" pathLength="1" d="${g.strokes.join('')}"/>`;
    if (g.fills.length) out += `<path class="ink" fill="${INK}" stroke-width="${f(bw * 10) / 10}" d="${g.fills.join('')}"/>`;
    return out + '</g>';
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(vx)} ${f(vy)} ${f(w)} ${f(h)}" aria-hidden="true" focusable="false">`
    + `<g fill="none" stroke="${INK}" stroke-width="${Math.round(sw * 100) / 100}" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>\n`;
  fs.writeFileSync(path.join(OUT, `${name}.svg`), svg);
  console.log(name.padEnd(14), `${(svg.length / 1024).toFixed(1)}KB`, 'viewBox', f(w), 'x', f(h), 'stroke', Math.round(sw * 100) / 100);
}

const CX = 180, CY = 120;

// AWQ: vLLM merges q, k and v into one layer. One scale shared by all three parts splits into a
// scale per part.
fig('awq', (p) => {
  const cs = 24, bw = 2 * cs, gap = 12, rows = 3, total = 3 * bw + 2 * gap, x0 = CX - total / 2, y0 = 106;
  for (let b = 0; b < 3; b++) p.grid(x0 + b * (bw + gap), y0, 2, rows, cs);
  p.brackets(x0 - 7, y0 - 4, x0 + total + 7, y0 + rows * cs + 4);
  const mids = [0, 1, 2].map((b) => x0 + b * (bw + gap) + bw / 2);
  p.as('b', () => { p.blob(CX, y0 - 44, 10); mids.forEach((m) => p.line(CX + (m - CX) * 0.22, y0 - 32, m, y0 - 10, 1)); });
  mids.forEach((m, k) => p.as('a', () => { p.blob(m, y0 - 40, 7.5); p.line(m, y0 - 30, m, y0 - 10, 1); }, { i: k * 3, d: 200 }));
});

// int4 decoding: an output tile computed as two half-done pieces and summed back comes together
// and is finished in one go.
fig('decode-tiles', (p) => {
  const cs = 24, hx = 2 * cs, y0 = CY - 2 * cs, X = CX - 2 * cs, s = 13;
  p.as('b mv', () => { p.grid(X, y0, 2, 4, cs, () => 1); p.brackets(X - 5, y0 - 4, X + hx + 5, y0 + 4 * cs + 4); }, { tx: -s });
  p.as('b mv', () => { p.grid(X + hx, y0, 2, 4, cs, () => 1); p.brackets(X + hx - 5, y0 - 4, X + 2 * hx + 5, y0 + 4 * cs + 4); }, { tx: s });
  p.as('b', () => { p.line(CX - 4, CY, CX + 4, CY, 0.6); p.line(CX, CY - 4, CX, CY + 4, 0.6); });
  p.as('a', () => p.brackets(X - 7, y0 - 4, X + 4 * cs + 7, y0 + 4 * cs + 4), { d: 250 });
  for (let c = 0; c < 4; c++) p.as('a', () => { for (let r = 0; r < 4; r++) p.cell(X + (c + 0.5) * cs, y0 + (r + 0.5) * cs, cs * 0.34, 3); }, { i: c * 2, d: 380 });
});

// Checkpoints: of 21 official checkpoints, 15 wouldn't load. Their slashes go and they ink in.
fig('checkpoints', (p) => {
  const cs = 26, cols = 7, rows = 3, x0 = CX - (cols * cs) / 2, y0 = CY - (rows * cs) / 2, h = cs * 0.34;
  const loaded = new Set([2, 6, 9, 13, 15, 19]);
  let k = 0;
  for (let i = 0; i < cols * rows; i++) {
    const x = x0 + ((i % cols) + 0.5) * cs, y = y0 + (Math.floor(i / cols) + 0.5) * cs;
    if (loaded.has(i)) { p.cell(x, y, h, 3); continue; }
    p.as('b', () => { p.square(x, y, h); p.slash(x, y, h); }, { i: k });
    p.as('a', () => p.cell(x, y, h, 3), { i: k, d: 120 });
    k += 1;
  }
});

// Benchmarks: the warmup run and the measured run shared one cache, so the measured run looked
// nearly done. Each gets its own cache, and the measured run fills in to its real length.
fig('benchmarks', (p) => {
  const cs = 24, n = 6, x0 = CX - (n * cs) / 2 + 16, yW = CY - 24, yM = CY + 24, bx = x0 - 30;
  p.grid(x0, yW - cs / 2, n, 1, cs, () => 1);
  p.grid(x0, yM - cs / 2, n, 1, cs, (c) => (c < 2 ? 3 : null));
  for (let c = 2; c < n; c++) {
    const x = x0 + (c + 0.5) * cs;
    p.as('b', () => p.square(x, yM, cs * 0.34));
    p.as('a', () => p.cell(x, yM, cs * 0.34, 3), { i: (c - 2) * 2, d: 350 });
  }
  p.as('b', () => { p.blob(bx, CY, 8); p.line(bx + 4, CY - 8, x0 + 1, yW + 1, 0.8); p.line(bx + 4, CY + 8, x0 + 1, yM - 1, 0.8); });
  p.as('a', () => { p.blob(bx, yW, 6.5); p.line(bx + 8, yW, x0 + 1, yW, 0.6); p.blob(bx, yM, 6.5); p.line(bx + 8, yM, x0 + 1, yM, 0.6); }, { d: 120 });
});

// Fork-safe: a process tree. Importing touched the GPU in the parent, so the forked workers broke.
// The parent goes clean, and each worker sets up its own GPU.
fig('fork-safe', (p) => {
  const top = CY - 46, bot = CY + 40, kids = [-72, -24, 24, 72];
  p.as('b', () => p.blob(CX, top, 12));
  p.as('a', () => p.square(CX, top, 11), { d: 120 });
  kids.forEach((dx, k) => {
    p.line(CX + dx * 0.14, top + 15, CX + dx, bot - 15, 1);
    p.as('b', () => { p.square(CX + dx, bot, 10); p.slash(CX + dx, bot, 10); }, { i: k });
    p.as('a', () => p.blob(CX + dx, bot, 9.5), { i: k * 2, d: 300 });
  });
});

// Tied weights: two layers that share their weights couldn't be compared (≠). They compare equal,
// and the tie between them draws in.
fig('tied-weights', (p) => {
  const cs = 22, n = 3, w = n * cs, gap = 40, xa = CX - gap / 2 - w, xb = CX + gap / 2, y0 = CY - w / 2 + 14;
  const pat = (c, r) => [[0, 2, 0], [3, 0, 1], [0, 1, 3]][r][c];
  for (const x of [xa, xb]) { p.grid(x, y0, n, n, cs, pat); p.brackets(x - 5, y0 - 4, x + w + 5, y0 + w + 4); }
  const ey = y0 + w / 2;
  p.line(CX - 7, ey - 4, CX + 7, ey - 4, 0.6); p.line(CX - 7, ey + 4, CX + 7, ey + 4, 0.6);
  p.as('b', () => p.line(CX - 5, ey + 10, CX + 5, ey - 10, 0.8));
  p.as('a', () => p.curve(xa + w / 2, y0 - 12, CX, y0 - 48, xb + w / 2, y0 - 12), { d: 200 });
  p.as('a', () => { p.blob(xa + w / 2, y0 - 12, 3); p.blob(xb + w / 2, y0 - 12, 3); }, { d: 150 });
});

// Hackathon wins: a podium built from pen squares; one ink blob drops onto the top (solo).
fig('wins', (p) => {
  const cs = 30, h = 12.5, base = 192;
  for (const [o, n] of [[-1, 2], [0, 3], [1, 1]]) for (let k = 0; k < n; k++) p.square(CX + o * cs, base - (k + 0.5) * cs, h);
  p.line(CX - 2.2 * cs, base + 3, CX + 2.2 * cs, base + 3, 1.2);
  const by = base - 3 * cs - 20;
  p.as('a mv', () => p.blob(CX, by, 12.5), { d: 150, ty: -34 });
  p.as('a', () => { for (const a of [-2.4, -1.57, -0.74]) p.line(CX + Math.cos(a) * 21, by + Math.sin(a) * 21, CX + Math.cos(a) * 31, by + Math.sin(a) * 31, 0.4); }, { d: 650 });
}, { px: 288 });

// Judging: a scorecard. Rows are teams, columns are criteria. The scores ink in, then the winning
// row gets a loose pen loop.
fig('judge', (p) => {
  const cs = 26, cols = 5, rows = 5, w = cols * cs, x0 = CX - w / 2, y0 = CY - (rows * cs) / 2;
  const s = [[1, 2, 1, 0, 2], [3, 3, 2, 3, 3], [0, 1, 1, 2, 0], [2, 1, 3, 1, 2], [1, 0, 2, 1, 1]];
  let k = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = x0 + (c + 0.5) * cs, y = y0 + (r + 0.5) * cs, h = cs * 0.34;
    if (!s[r][c]) { p.square(x, y, h); continue; }
    p.as('b', () => p.square(x, y, h), { i: k });
    p.as('a', () => p.cell(x, y, h, s[r][c]), { i: k, d: 80 });
    k += 1;
  }
  p.brackets(x0 - 7, y0 - 4, x0 + w + 7, y0 + rows * cs + 4);
  p.as('a', () => p.loop(CX, y0 + 1.5 * cs, w / 2 + 18, cs * 0.74), { d: k * 55 + 250 });
}, { px: 288 });

// Reviewing: a page of text under a magnifying glass; a check mark draws in inside the lens.
fig('reviewer', (p) => {
  const x0 = 110, y0 = 40, x1 = 226, y1 = 202, lx = 202, ly = 118, lr = 34;
  p.line(x0 + 10, y0 - 9, x1 + 10, y0 - 9, 0.8); p.line(x1 + 10, y0 - 9, x1 + 10, y1 - 10, 0.8);
  p.rect(x0, y0, x1, y1);
  for (let k = 0; k < 9; k++) {
    const y = y0 + 21 + k * 15.5, xs = x0 + 15, xe = x1 - 15 - (k % 3 === 2 ? 32 : (k * 7) % 12);
    const dy = Math.abs(y - ly), cut = dy < lr + 6 ? Math.sqrt((lr + 6) ** 2 - dy ** 2) : -1;
    if (cut < 0) { p.line(xs, y, xe, y, 0.6); continue; }
    if (lx - cut - xs > 6) p.line(xs, y, lx - cut, y, 0.6);
    if (xe - (lx + cut) > 6) p.line(lx + cut, y, xe, y, 0.6);
  }
  p.ring(lx, ly, lr);
  p.ring(lx, ly, lr + 4);
  const a = Math.PI / 4, hx = lx + Math.cos(a) * (lr + 4), hy = ly + Math.sin(a) * (lr + 4);
  p.line(hx, hy, hx + 30, hy + 30, 1); p.line(hx + 6, hy - 2, hx + 35, hy + 26, 1); p.line(hx + 30, hy + 30, hx + 35, hy + 26, 0.4);
  p.as('a', () => p.tick(lx, ly + 2, 14), { d: 250 });
}, { px: 256 });

// 404: a grid of weights with one missing; the missing square drifts nearby.
fig('lost', (p) => {
  const cs = 24, cols = 9, rows = 3, x0 = 34, y0 = 24, miss = [6, 1];
  p.grid(x0, y0, cols, rows, cs, (c, r) => (c === miss[0] && r === miss[1] ? null : 0));
  p.brackets(x0 - 7, y0 - 4, x0 + cols * cs + 7, y0 + rows * cs + 4);
  p.as('s float', () => {
    const fx = 320, fy = 44;
    p.square(fx, fy, cs * 0.34 + 0.5);
    for (const [dx, dy] of [[-27, 10], [-35, 4], [-23, 16]]) p.line(fx + dx, fy + dy, fx + dx + 9, fy + dy - 3, 0.3);
  });
}, { aspect: 3, px: 600, pad: 0.06 });
