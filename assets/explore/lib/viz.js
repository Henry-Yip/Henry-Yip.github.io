// Canvas renderers for spin configurations, plus an animation loop that only runs on screen.

export const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Run `tick` every frame while `node` is visible and `isPlaying()` is true.
export function onScreenLoop(node, tick, isPlaying = () => true, fps = 60) {
  let visible = false, raf = 0, last = -Infinity;
  const frame = (now) => {
    raf = 0;
    if (!visible || document.hidden || !isPlaying()) return;
    if (now - last >= 1000 / fps - 1) { last = now; tick(); }
    raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf && visible && isPlaying()) raf = requestAnimationFrame(frame); };
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; kick(); }, { rootMargin: "100px" }).observe(node);
  document.addEventListener("visibilitychange", kick);
  return { kick };
}

// --- colour: OKLCH -> sRGB, used for the direction-coded spin palette
export function oklchToRgb(L, C, hDeg) {
  const h = (hDeg * Math.PI) / 180, a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lin = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  return lin.map((c) => {
    const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(c, 0), 1 / 2.4) - 0.055;
    return Math.round(255 * Math.min(1, Math.max(0, v)));
  });
}

// Hue = in-plane direction (cyclic, constant lightness), lightness = vertical component.
const HUE_BINS = 72, Z_BINS = 21;
const SPIN_LUT = [];
for (let zb = 0; zb < Z_BINS; zb++) {
  const z = -1 + (2 * zb) / (Z_BINS - 1);
  const L = 0.42 + 0.46 * (z + 1) / 2, C = 0.15 * Math.sqrt(Math.max(0, 1 - z * z)) + 0.02;
  for (let hb = 0; hb < HUE_BINS; hb++) SPIN_LUT.push(oklchToRgb(L, C, (360 * hb) / HUE_BINS));
}
export function spinRGB(x, y, z) {
  let h = Math.atan2(y, x) / (2 * Math.PI);
  if (h < 0) h += 1;
  const hb = Math.round(h * HUE_BINS) % HUE_BINS;
  const zb = Math.round(((Math.max(-1, Math.min(1, z)) + 1) / 2) * (Z_BINS - 1));
  return SPIN_LUT[zb * HUE_BINS + hb];
}
const SPIN_CSS = SPIN_LUT.map(([r, g, b]) => `rgb(${r},${g},${b})`);
function spinCSS(x, y, z) {
  let h = Math.atan2(y, x) / (2 * Math.PI);
  if (h < 0) h += 1;
  const hb = Math.round(h * HUE_BINS) % HUE_BINS;
  const zb = Math.round(((Math.max(-1, Math.min(1, z)) + 1) / 2) * (Z_BINS - 1));
  return SPIN_CSS[zb * HUE_BINS + hb];
}

const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

// --- 2D lattice of +/-1 spins, optionally overlaid with a per-site state (cluster, frontier)
export class LatticeView {
  constructor(canvas, L, opts = {}) {
    this.c = canvas;
    this.L = L;
    this.ctx = canvas.getContext("2d");
    this.off = document.createElement("canvas");
    this.off.width = this.off.height = L;
    this.octx = this.off.getContext("2d");
    this.img = this.octx.createImageData(L, L);
    this.up = hex(opts.up || "#e9edf3");
    this.down = hex(opts.down || "#1d2635");
    this.layers = (opts.layers || []).map(hex);
    this.grid = opts.grid || false;
    this.resize();
  }

  resize() {
    const r = this.c.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.c.width = Math.max(1, Math.round(r.width * dpr));
    this.c.height = Math.max(1, Math.round(r.width * dpr));
  }

  draw(s, state) {
    const d = this.img.data;
    for (let i = 0; i < s.length; i++) {
      const c = state && state[i] ? this.layers[state[i] - 1] : s[i] > 0 ? this.up : this.down;
      d[4 * i] = c[0]; d[4 * i + 1] = c[1]; d[4 * i + 2] = c[2]; d[4 * i + 3] = 255;
    }
    this.octx.putImageData(this.img, 0, 0);
    const { ctx, c } = this;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.off, 0, 0, c.width, c.height);
    if (this.grid) {
      ctx.strokeStyle = "rgba(11,14,20,0.55)";
      ctx.lineWidth = 1;
      const k = c.width / this.L;
      ctx.beginPath();
      for (let i = 1; i < this.L; i++) {
        ctx.moveTo(Math.round(i * k) + 0.5, 0); ctx.lineTo(Math.round(i * k) + 0.5, c.height);
        ctx.moveTo(0, Math.round(i * k) + 0.5); ctx.lineTo(c.width, Math.round(i * k) + 0.5);
      }
      ctx.stroke();
    }
  }

  marker(i, color) {
    const k = this.c.width / this.L, x = i % this.L, y = (i - x) / this.L;
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = Math.max(2, k * 0.18);
    this.ctx.strokeRect(x * k + 1, y * k + 1, k - 2, k - 2);
  }
}

// --- 2D slice through a 3D vector field, coloured by direction
export function drawSlice(canvas, model, z) {
  const L = model.L, ctx = canvas.getContext("2d");
  const img = ctx.createImageData(L, L), d = img.data;
  for (let y = 0; y < L; y++)
    for (let x = 0; x < L; x++) {
      const i = x + L * (y + L * z), [r, g, b] = spinRGB(model.sx[i], model.sy[i], model.sz[i]), o = 4 * (x + L * y);
      d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = 255;
    }
  const off = document.createElement("canvas");
  off.width = off.height = L;
  off.getContext("2d").putImageData(img, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
}

// --- rotatable 3D lattice of arrows (perspective projection, painter's algorithm)
export class CubeView {
  constructor(canvas, model, opts = {}) {
    this.c = canvas;
    this.m = model;
    this.ctx = canvas.getContext("2d");
    this.yaw = opts.yaw ?? 0.6;
    this.pitch = opts.pitch ?? -0.45;
    this.auto = opts.autoRotate ?? 0.0025;
    this.order = new Uint32Array(model.N);
    this.depth = new Float32Array(model.N);
    this.dragging = false;
    let lx = 0, ly = 0;
    canvas.addEventListener("pointerdown", (e) => { this.dragging = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener("pointermove", (e) => {
      if (!this.dragging) return;
      this.yaw += (e.clientX - lx) * 0.01;
      this.pitch = Math.max(-1.4, Math.min(1.4, this.pitch + (e.clientY - ly) * 0.01));
      lx = e.clientX; ly = e.clientY;
      if (opts.onDrag) opts.onDrag();
    });
    const end = () => { this.dragging = false; };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    this.resize();
  }

  resize() {
    const r = this.c.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.c.width = Math.max(1, Math.round(r.width * dpr));
    this.c.height = Math.max(1, Math.round(r.height * dpr));
  }

  draw(spin = true) {
    if (spin && !this.dragging) this.yaw += this.auto;
    const { ctx, c, m } = this, L = m.L, N = m.N;
    const W = c.width, H = c.height, half = (L - 1) / 2;
    const cy = Math.cos(this.yaw), sy = Math.sin(this.yaw), cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const scale = Math.min(W, H) / (L * 1.9), dist = L * 3.6;
    // rotate a point: yaw about the vertical axis, then pitch
    const rot = (x, y, z) => {
      const x1 = cy * x + sy * y, y1 = -sy * x + cy * y;
      return [x1, cp * y1 - sp * z, sp * y1 + cp * z];
    };
    const project = (x, y, z) => {
      const f = dist / (dist + y);
      return [W / 2 + x * scale * f, H / 2 - z * scale * f];
    };
    ctx.clearRect(0, 0, W, H);

    // faint wireframe of the box, so the lattice reads as a cube
    const e = half + 0.6, corners = [];
    for (const a of [-e, e]) for (const b of [-e, e]) for (const d of [-e, e]) corners.push(rot(a, b, d));
    ctx.strokeStyle = "rgba(185,193,205,0.22)";
    ctx.lineWidth = Math.max(1, scale * 0.04);
    ctx.globalAlpha = 1;
    ctx.beginPath();
    for (let i = 0; i < 8; i++)
      for (let j = i + 1; j < 8; j++) {
        if ([1, 2, 4].includes(i ^ j)) {
          const [x0, y0] = project(...corners[i]), [x1, y1] = project(...corners[j]);
          ctx.moveTo(x0, y0); ctx.lineTo(x1, y1);
        }
      }
    ctx.stroke();

    const P = this.P || (this.P = new Float32Array(3 * N));
    for (let i = 0; i < N; i++) {
      const x = (i % L) - half, y = (Math.floor(i / L) % L) - half, z = Math.floor(i / (L * L)) - half;
      const [rx, ry, rz] = rot(x, y, z);
      P[3 * i] = rx; P[3 * i + 1] = ry; P[3 * i + 2] = rz;
      this.depth[i] = ry;
      this.order[i] = i;
    }
    const depth = this.depth;
    this.order.sort((a, b) => depth[b] - depth[a]);
    ctx.lineCap = "round";
    const arm = 0.34;
    for (let k = 0; k < N; k++) {
      const i = this.order[k];
      const ax = m.sx[i], ay = m.sy[i], az = m.sz[i];
      const [dx, dy, dz] = rot(ax * arm, ay * arm, az * arm);
      const px = P[3 * i], py = P[3 * i + 1], pz = P[3 * i + 2];
      const [x0, y0] = project(px - dx, py - dy, pz - dz);
      const [x1, y1] = project(px + dx, py + dy, pz + dz);
      const f1 = dist / (dist + py + dy);
      const near = 1 - (py + half * 1.8) / (half * 3.6);
      ctx.globalAlpha = 0.18 + 0.82 * Math.max(0, Math.min(1, near)) ** 1.5;
      ctx.strokeStyle = spinCSS(ax, ay, az);
      ctx.lineWidth = Math.max(1, scale * 0.12 * f1);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath();
      ctx.arc(x1, y1, Math.max(0.8, scale * 0.1 * f1), 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

// --- scrolling time traces for one or more series
export class Trace {
  constructor(canvas, series, opts = {}) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.series = series.map((s) => ({ ...s, data: [] }));
    this.n = opts.n || 300;
    this.ymin = opts.ymin ?? 0;
    this.ymax = opts.ymax ?? 1;
    this.resize();
  }

  resize() {
    const r = this.c.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.c.width = Math.max(1, Math.round(r.width * dpr));
    this.c.height = Math.max(1, Math.round(r.height * dpr));
  }

  push(...values) {
    values.forEach((v, k) => { const d = this.series[k].data; d.push(v); if (d.length > this.n) d.shift(); });
    this.draw();
  }

  clear() {
    this.series.forEach((s) => (s.data = []));
    this.draw();
  }

  draw() {
    const { ctx, c } = this, W = c.width, H = c.height, dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "#263041";
    ctx.lineWidth = 1;
    for (const f of [0, 0.5, 1]) {
      const y = Math.round(H - f * (H - 2)) - 0.5;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    for (const s of this.series) {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2 * dpr;
      ctx.lineJoin = ctx.lineCap = "round";
      ctx.beginPath();
      s.data.forEach((v, k) => {
        const x = (k / (this.n - 1)) * W, y = H - ((v - this.ymin) / (this.ymax - this.ymin)) * (H - 4) - 2;
        k ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });
      ctx.stroke();
    }
  }
}
