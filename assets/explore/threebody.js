// Interactive figures for the three-body project page. Equal masses, G = 1.
import { chart } from "./lib/plot.js";
import { onScreenLoop, reducedMotion, oklchToRgb } from "./lib/viz.js";
import { serifGreek } from "./lib/greek.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ---------------------------------------------------------------- physics
// state: Float64Array [x1, y1, x2, y2, x3, y3, vx1, vy1, vx2, vy2, vx3, vy3]
function accel(s, a) {
  a.fill(0);
  for (let i = 0; i < 3; i++)
    for (let j = i + 1; j < 3; j++) {
      const dx = s[2 * j] - s[2 * i], dy = s[2 * j + 1] - s[2 * i + 1];
      const r2 = dx * dx + dy * dy, inv = 1 / (r2 * Math.sqrt(r2));
      a[2 * i] += dx * inv; a[2 * i + 1] += dy * inv;
      a[2 * j] -= dx * inv; a[2 * j + 1] -= dy * inv;
    }
}
function energy(s) {
  let k = 0, u = 0;
  for (let i = 0; i < 3; i++) k += 0.5 * (s[6 + 2 * i] ** 2 + s[7 + 2 * i] ** 2);
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) u -= 1 / Math.hypot(s[2 * j] - s[2 * i], s[2 * j + 1] - s[2 * i + 1]);
  return k + u;
}
// kick-drift splitting coefficients, as in the project code: v += c_k dt a(x), then x += d_k dt v
const cbrt2 = Math.cbrt(2), w = 2 - cbrt2;
const SPLIT = {
  symp1: { c: [1], d: [1] },
  verlet: { c: [0.5, 0.5], d: [1, 0] },
  ruth3: { c: [7 / 24, 3 / 4, -1 / 24], d: [2 / 3, -2 / 3, 1] },
  fr4: { c: [1 / (2 * w), (1 - cbrt2) / (2 * w), (1 - cbrt2) / (2 * w), 1 / (2 * w)], d: [1 / w, -cbrt2 / w, 1 / w, 0] },
};
function makeStepper(method) {
  const a = new Float64Array(6);
  if (SPLIT[method]) {
    const { c, d } = SPLIT[method];
    return (s, dt) => {
      for (let k = 0; k < c.length; k++) {
        accel(s, a);
        for (let i = 0; i < 6; i++) s[6 + i] += c[k] * dt * a[i];
        for (let i = 0; i < 6; i++) s[i] += d[k] * dt * s[6 + i];
      }
    };
  }
  if (method === "euler") {
    return (s, dt) => {
      accel(s, a);
      for (let i = 0; i < 6; i++) { s[i] += dt * s[6 + i]; s[6 + i] += dt * a[i]; }
    };
  }
  // classical fourth-order Runge-Kutta (not symplectic)
  const k1 = new Float64Array(12), k2 = new Float64Array(12), k3 = new Float64Array(12), k4 = new Float64Array(12), tmp = new Float64Array(12);
  const deriv = (s, out) => { accel(s, a); for (let i = 0; i < 6; i++) { out[i] = s[6 + i]; out[6 + i] = a[i]; } };
  return (s, dt) => {
    deriv(s, k1);
    for (let i = 0; i < 12; i++) tmp[i] = s[i] + 0.5 * dt * k1[i]; deriv(tmp, k2);
    for (let i = 0; i < 12; i++) tmp[i] = s[i] + 0.5 * dt * k2[i]; deriv(tmp, k3);
    for (let i = 0; i < 12; i++) tmp[i] = s[i] + dt * k3[i]; deriv(tmp, k4);
    for (let i = 0; i < 12; i++) s[i] += (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
  };
}
// bodies at (-1, 0), (1, 0), (0, 0) with velocities (a, b), (a, b), (-2a, -2b)
const initial = (a, b) => Float64Array.from([-1, 0, 1, 0, 0, 0, a, b, a, b, -2 * a, -2 * b]);
// the sixteen orbits of Šuvakov and Dmitrašinović's table (the figure-eight first), with their periods
const ORBITS = {
  "Figure-eight": { v: [0.3471128135672417, 0.532726851767674], T: 6.3259 },
  "Butterfly I": { v: [0.306892758965492, 0.125506782829762], T: 6.23564136316479 },
  "Butterfly II": { v: [0.392955223941802, 0.0975792352080344], T: 7.00390738764014 },
  "Butterfly III": { v: [0.405915588857606, 0.230163127422333], T: 13.8657626785699 },
  "Butterfly IV": { v: [0.350112121391296, 0.0793394803951883], T: 79.4758748952101 },
  "Moth I": { v: [0.464445237398184, 0.396059973403921], T: 14.8939113169584 },
  "Moth II": { v: [0.439165939331987, 0.452967645644678], T: 28.6702783225658 },
  "Moth III": { v: [0.383443534851074, 0.377363693237305], T: 25.8406180475758 },
  "Bumblebee": { v: [0.184278506469727, 0.587188195800781], T: 63.5345412733264 },
  "Goggles": { v: [0.0833000564575194, 0.127889282226563], T: 10.4668176954385 },
  "Dragonfly": { v: [0.080584285736084, 0.588836087036132], T: 21.2709751966648 },
  "Yarn": { v: [0.559064247131347, 0.349191558837891], T: 55.5017624421301 },
  "Yin-yang Ia": { v: [0.513938054919243, 0.304736003875733], T: 17.328369755004 },
  "Yin-yang Ib": { v: [0.282698682308198, 0.327208786129952], T: 10.9625630756217 },
  "Yin-yang IIa": { v: [0.416822143554688, 0.330333312988282], T: 55.7898786945024 },
  "Yin-yang IIb": { v: [0.417342877101898, 0.313100116109848], T: 54.2075992141846 },
};
// one period with the fourth-order integrator, sampled every `every` steps
function trajectory(name, dt, every) {
  const o = ORBITS[name], s = initial(...o.v), step = makeStepper("fr4"), n = Math.round(o.T / dt), pts = [];
  for (let k = 0; k <= n; k++) { if (k % every === 0) pts.push(Float64Array.from(s.subarray(0, 6))); if (k < n) step(s, dt); }
  const s0 = initial(...o.v); let gap = 0; for (let i = 0; i < 12; i++) gap += (s[i] - s0[i]) ** 2;
  return { pts, dt: dt * every, gap: Math.sqrt(gap) };
}
// ---------------------------------------------------------------- drawing helpers
const BODY = ["#3987e5", "#d95926", "#199e70"];  // dark-screen versions of the page palette
function fit(canvas, aspect) {
  const dpr = Math.min(devicePixelRatio || 1, 2), w = canvas.clientWidth, h = Math.round(w * aspect);
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}
function drawOrbit(view, pts, idx, trail, bounds) {
  const { ctx, w, h } = view, [xmin, xmax, ymin, ymax] = bounds;
  const s = 0.9 * Math.min(w / (xmax - xmin), h / (ymax - ymin)), cx = w / 2 - s * (xmin + xmax) / 2, cy = h / 2 + s * (ymin + ymax) / 2;
  const X = (x) => cx + s * x, Y = (y) => cy - s * y;
  ctx.clearRect(0, 0, w, h);
  for (let b = 0; b < 3; b++) {           // the full orbit, faint
    ctx.strokeStyle = BODY[b]; ctx.globalAlpha = 0.18; ctx.lineWidth = 1;
    ctx.beginPath(); pts.forEach((p, k) => (k ? ctx.lineTo(X(p[2 * b]), Y(p[2 * b + 1])) : ctx.moveTo(X(p[2 * b]), Y(p[2 * b + 1])))); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  for (let b = 0; b < 3; b++) {           // recent trail
    for (let k = 1; k < trail; k++) {
      const i0 = (idx - k + pts.length) % pts.length, i1 = (idx - k + 1 + pts.length) % pts.length;
      ctx.strokeStyle = BODY[b]; ctx.globalAlpha = 1 - k / trail; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(X(pts[i0][2 * b]), Y(pts[i0][2 * b + 1])); ctx.lineTo(X(pts[i1][2 * b]), Y(pts[i1][2 * b + 1])); ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
  const p = pts[idx];
  for (let b = 0; b < 3; b++) {
    ctx.beginPath(); ctx.arc(X(p[2 * b]), Y(p[2 * b + 1]), 7, 0, 2 * Math.PI);
    ctx.fillStyle = BODY[b]; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = "#141a24"; ctx.stroke();
  }
}
function boundsOf(pts) {
  let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
  for (const p of pts) for (let b = 0; b < 3; b++) { xmin = Math.min(xmin, p[2 * b]); xmax = Math.max(xmax, p[2 * b]); ymin = Math.min(ymin, p[2 * b + 1]); ymax = Math.max(ymax, p[2 * b + 1]); }
  return [xmin, xmax, ymin, ymax];
}

// ---------------------------------------------------------------- hero: the figure-eight
function hero() {
  const canvas = $("#hero-orbit");
  if (!canvas) return;
  const orb = trajectory("Figure-eight", 1e-3, 10), bounds = boundsOf(orb.pts);
  let view = fit(canvas, 1), idx = 0;
  const draw = () => drawOrbit(view, orb.pts, idx, 90, bounds);
  draw();
  addEventListener("resize", () => { view = fit(canvas, 1); draw(); });
  if (reducedMotion) return;
  onScreenLoop(canvas, () => { idx = (idx + 1) % orb.pts.length; draw(); }, () => true, 60);
}

// ---------------------------------------------------------------- energy drift of different integrators
function integrators() {
  const root = $("#drift-lab");
  if (!root) return;
  const DTS = [0.002, 0.005, 0.01, 0.02, 0.05];
  const METHODS = [
    { key: "euler", label: "Euler (not symplectic)", color: "#e87ba4", dash: true, evals: 1 },
    { key: "rk4", label: "Runge–Kutta 4 (not symplectic)", color: "#eda100", dash: true, evals: 4 },
    { key: "symp1", label: "symplectic Euler, order 1", color: "#1baf7a", evals: 1 },
    { key: "verlet", label: "Verlet, order 2", color: "#eb6834", evals: 1 },
    { key: "fr4", label: "Forest–Ruth, order 4", color: "#2a78d6", evals: 4 },
  ];
  const slider = $('[data-ctl="dt"]', root), host = $(".xp-plot", root), tbody = $("tbody", root);
  const tEnd = 20 * ORBITS["Figure-eight"].T;
  let plot = null;
  const run = () => {
    const dt = DTS[+slider.value];
    $('[data-out="dt"]', root).textContent = dt;
    const series = [], rows = [];
    for (const m of METHODS) {
      const s = initial(...ORBITS["Figure-eight"].v), step = makeStepper(m.key), E0 = energy(s), n = Math.round(tEnd / dt);
      const every = Math.max(1, Math.round(0.5 / dt)), pts = [];
      let worst = 0, blown = false;
      for (let k = 1; k <= n; k++) {
        step(s, dt);
        const e = Math.abs((energy(s) - E0) / E0);
        if (!isFinite(e) || e > 10) { blown = true; break; }
        worst = Math.max(worst, e);
        if (k % every === 0) pts.push({ x: k * dt, y: Math.max(worst, 1e-16) });
      }
      series.push({ label: m.label, color: m.color, dash: m.dash, line: true, markers: false, points: pts });
      rows.push(`<tr><td>${m.label}</td><td class="num">${blown ? "blew up" : worst.toExponential(1)}</td><td class="num">${Math.round((m.evals * n) / tEnd)}</td></tr>`);
    }
    tbody.innerHTML = rows.join("");
    const spec = {
      id: "drift", height: 360,
      x: { label: "time (20 periods of the figure-eight)", domain: [0, tEnd] },
      y: { label: "largest relative energy error so far", log: true, domain: [1e-16, 10], ticks: [1e-15, 1e-12, 1e-9, 1e-6, 1e-3, 1] },
      series, forceLegend: true,
      tooltip: (p, se) => `<b>${se.label}</b><br>t = ${p.x.toFixed(1)}: ${p.y.toExponential(1)}`,
    };
    if (plot) plot.update(spec); else plot = chart(host, spec);
  };
  slider.addEventListener("input", run);
  run();
}

// ---------------------------------------------------------------- the (a, b) map and a live orbit in three dimensions
// Positions and velocities in space: r = [x1, y1, z1, x2, ...]. The bodies start at (-1, 0, 0), (1, 0, 0) and (0, 0, 0) with
// velocities (a, b, δ), (a, b, -δ) and (-2a, -2b, 0): the push δ sends bodies 1 and 2 out of the plane in opposite
// directions and keeps the total momentum zero. The step shrinks during close encounters, exactly as in the precomputed map.
function accel3(r, a) {
  a.fill(0);
  let rmin = Infinity;
  for (let i = 0; i < 3; i++)
    for (let j = i + 1; j < 3; j++) {
      const dx = r[3 * j] - r[3 * i], dy = r[3 * j + 1] - r[3 * i + 1], dz = r[3 * j + 2] - r[3 * i + 2];
      const r2 = dx * dx + dy * dy + dz * dz, d = Math.sqrt(r2), inv = 1 / (r2 * d);
      rmin = Math.min(rmin, d);
      a[3 * i] += dx * inv; a[3 * i + 1] += dy * inv; a[3 * i + 2] += dz * inv;
      a[3 * j] -= dx * inv; a[3 * j + 1] -= dy * inv; a[3 * j + 2] -= dz * inv;
    }
  return rmin;
}
function energy3(r, v) {
  let e = 0;
  for (let i = 0; i < 9; i++) e += 0.5 * v[i] * v[i];
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) e -= 1 / Math.hypot(r[3 * j] - r[3 * i], r[3 * j + 1] - r[3 * i + 1], r[3 * j + 2] - r[3 * i + 2]);
  return e;
}
const FR_C = SPLIT.fr4.c, FR_D = SPLIT.fr4.d, ETA = 0.005, DT_MAX = 1e-3;

// Shape sphere for a triangle in space. With Jacobi vectors ρ1 = (r3 - r2)/√2 and ρ2 = √(2/3)(r1 - (r2 + r3)/2),
// u = (|ρ1|² - |ρ2|², 2 ρ1·ρ2, ±2|ρ1 × ρ2|) / (|ρ1|² + |ρ2|²): collinear shapes on the equator, equilateral ones at the
// poles. The sign says which way round the triangle runs, seen from one side of its plane; `ref` tracks that side as the
// plane turns. In the plane it stays (0, 0, 1) and this is Montgomery's construction.
function shape3(r, ref, out, k) {
  const q = Math.sqrt(2 / 3), p1 = [0, 0, 0], p2 = [0, 0, 0];
  let n1 = 0, n2 = 0, dot = 0;
  for (let c = 0; c < 3; c++) {
    p1[c] = (r[6 + c] - r[3 + c]) / Math.SQRT2; p2[c] = q * (r[c] - (r[3 + c] + r[6 + c]) / 2);
    n1 += p1[c] ** 2; n2 += p2[c] ** 2; dot += p1[c] * p2[c];
  }
  const N = [p1[1] * p2[2] - p1[2] * p2[1], p1[2] * p2[0] - p1[0] * p2[2], p1[0] * p2[1] - p1[1] * p2[0]];
  const I = n1 + n2, nn = Math.hypot(...N), side = N[0] * ref[0] + N[1] * ref[1] + N[2] * ref[2] < 0 ? -1 : 1;
  if (nn > 0.15 * I) {     // well away from collinear: let the reference follow the plane of the triangle
    for (let c = 0; c < 3; c++) ref[c] += 0.05 * ((side * N[c]) / nn - ref[c]);
    const m = Math.hypot(...ref);
    for (let c = 0; c < 3; c++) ref[c] /= m;
  }
  out[k] = (n1 - n2) / I; out[k + 1] = (2 * dot) / I; out[k + 2] = (side * 2 * nn) / I;
}

// The map: one byte per starting velocity on a 401 x 401 grid over 0 <= a, b <= 1, from integrating to t = 100.
// 0 = a body escaped (left a sphere of radius 20), 255 = not resolved, otherwise the closest return
// P_min = 10^(4 (code - 1) / 253 - 3). Stored raw-deflated.
const MAP_N = 401, MAP_T = 100;
const pOfCode = (c) => 10 ** ((4 * (c - 1)) / 253 - 3);
const ESCAPED = [29, 36, 48], UNRESOLVED = [92, 98, 110];
// colour by log P_min from 3 (the poorest return of any bound orbit) down to 0.001: dim to bright, one hue
const ramp = (s) => oklchToRgb(0.36 + 0.59 * s, 0.035 + 0.075 * Math.sin(0.9 * Math.PI * s), 78);
const rampOfP = (p) => ramp(Math.min(1, Math.max(0, (Math.log10(3) - Math.log10(p)) / (Math.log10(3) + 3))));
const MAP_LUT = Array.from({ length: 256 }, (_, c) => (c === 0 ? ESCAPED : c === 255 ? UNRESOLVED : rampOfP(pOfCode(c))));
// The 2024 test and its convergence check, on a 201 x 201 grid: four bytes per orbit (see section 4).
// Energy deviation (Emax - Emin)/|E0| with fixed-step Forest-Ruth at dt = 1e-4, at t = 10 and t = 50: code
// 1 + round(253 (log10 dev + 16) / 19), 0 = two bodies more than 100 apart before then. Trust horizon: the time the run
// agrees to 0.01 with a run at dt/2, as round(5 t), 255 = still agreeing at t = 50. Then the time two bodies passed
// 100 apart, as round(5 t), 255 = never.
const TRUST_N = 201, TRUST_T = 50;
const devOfCode = (c) => 10 ** (((c - 1) * 19) / 253 - 16);
const ENERGY_LUT = Array.from({ length: 256 }, (_, c) => {
  if (c === 0) return ESCAPED;                       // flew apart in the fixed-step run
  const dev = devOfCode(c);
  return dev >= 1 ? UNRESOLVED : ramp(Math.min(1, -Math.log10(dev) / 14));     // fails the test, or passes: dim near 1, bright when tiny
});
const TRUST_LUT = Array.from({ length: 256 }, (_, h) => ramp(h === 255 ? 1 : Math.min(1, h / 5 / TRUST_T)));
async function loadMap(url) {
  const res = await fetch(url);
  if (!res.ok || typeof DecompressionStream === "undefined") throw new Error("map unavailable");
  return new Uint8Array(await new Response(res.body.pipeThrough(new DecompressionStream("deflate-raw"))).arrayBuffer());
}

const sci = (x) => {
  if (!isFinite(x)) return "–";
  if (x === 0) return "0";
  const e = Math.floor(Math.log10(x)), m = x / 10 ** e;
  return `${m.toFixed(0) === "10" ? "1" : m.toFixed(0)} × 10<sup>${String(m.toFixed(0) === "10" ? e + 1 : e).replace("-", "−")}</sup>`;
};
const minus = (x, d) => x.toFixed(d).replace("-", "−");

function playground() {
  const root = $("#playground");
  if (!root) return;
  const mapCanvas = $("canvas.tb-map", root), viewCanvas = $("canvas.tb-view", root), tip = $(".xp-tip", root);
  const select = $('[data-ctl="preset"]', root), deltaIn = $('[data-ctl="delta"]', root), play = $('[data-act="play"]', root);
  const out = (k) => $(`[data-out="${k}"]`, root);
  const NAMES = Object.keys(ORBITS);
  select.innerHTML = NAMES.map((n) => `<option value="${n}">${n}</option>`).join("") + '<option value="">Chosen on the map</option>';
  $$(".tb-ramp", root).forEach((el) => (el.style.background = `linear-gradient(90deg, ${[0, 0.25, 0.5, 0.75, 1].map((s) => `rgb(${ramp(s).join(",")})`).join(", ")})`));

  // ---- simulation, with a history of samples every 0.02 time units: t, nine coordinates, three shape coordinates
  const r = new Float64Array(9), v = new Float64Array(9), acc = new Float64Array(9), r0 = new Float64Array(9), v0 = new Float64Array(9);
  const CAP = 6000, SAMPLE = 0.02, REC = 13, hist = new Float32Array(CAP * REC), ref = [0, 0, 1];
  let a = ORBITS["Figure-eight"].v[0], b = ORBITS["Figure-eight"].v[1], delta = 0;
  let head = 0, count = 0, t = 0, nextSample = 0, steps = 0, E0 = 0, left = false, pmin = Infinity, pminT = 0, escapedAt = 0, halted = false;
  let prevP = 0, prevT = 0, falling = false;
  const record = () => {
    const k = head * REC;
    hist[k] = t;
    for (let i = 0; i < 9; i++) hist[k + 1 + i] = r[i];
    shape3(r, ref, hist, k + 10);
    head = (head + 1) % CAP; count = Math.min(count + 1, CAP);
  };
  const restart = () => {
    r.set([-1, 0, 0, 1, 0, 0, 0, 0, 0]); v.set([a, b, delta, a, b, -delta, -2 * a, -2 * b, 0]);
    r0.set(r); v0.set(v); E0 = energy3(r, v);
    t = 0; steps = 0; head = 0; count = 0; nextSample = SAMPLE; left = false; pmin = Infinity; pminT = 0; escapedAt = 0; halted = false;
    prevP = 0; prevT = 0; falling = false;
    ref[0] = 0; ref[1] = 0; ref[2] = 1; R = 1.6;
    record();
  };
  const advance = (span) => {
    const target = t + span;
    for (let n = 0; t < target && n < 50000 && !halted; n++) {
      const dt = Math.min(DT_MAX, ETA * accel3(r, acc) ** 1.5);
      for (let k = 0; k < 4; k++) {
        accel3(r, acc);
        for (let i = 0; i < 9; i++) v[i] += FR_C[k] * dt * acc[i];
        for (let i = 0; i < 9; i++) r[i] += FR_D[k] * dt * v[i];
      }
      t += dt;
      if (t >= nextSample) { record(); nextSample += SAMPLE; }
      if (++steps % 10) continue;
      let p = 0, far = 0;
      for (let i = 0; i < 9; i++) p += (r[i] - r0[i]) ** 2 + (v[i] - v0[i]) ** 2;
      for (let i = 0; i < 3; i++) far = Math.max(far, Math.hypot(r[3 * i], r[3 * i + 1], r[3 * i + 2]));
      if (far > 20 && !escapedAt) escapedAt = t;
      if (far > 30) halted = true;      // stop once the escaping body is well clear, so that everything stays in view
      p = Math.sqrt(p);
      if (!left) left = p > 1;
      else {                       // a return is a local minimum of the distance from the starting state
        if (falling && p > prevP && prevP < pmin) { pmin = prevP; pminT = prevT; }
        falling = p < prevP;
      }
      prevP = p; prevT = t;
    }
  };

  // ---- the 3D view
  const CAM = { space: { yaw: 0.35, pitch: 0.8 }, braid: { yaw: 0.35, pitch: 1.3 }, shape: { yaw: 0.5, pitch: 1.15 } };
  const BRAID_W = 15;
  let mode = "space", vv = fit(viewCanvas, 1), R = 1.6, touched = false, playing = !reducedMotion, speed = 1, frame = 0;
  const projector = (cam, scale, persp) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    const ox = vv.w / 2, oy = vv.h / 2, k = persp / R;
    return (X, Y, Z, o) => {
      const x1 = X * cy - Y * sy, y1 = X * sy + Y * cy, up = y1 * cp + Z * sp, depth = -y1 * sp + Z * cp, f = persp ? 6 / (6 - depth * k) : 1;
      o[0] = ox + scale * x1 * f; o[1] = oy - scale * up * f; o[2] = depth; o[3] = f;
      return o;
    };
  };
  const at = (k) => ((head - count + k + CAP) % CAP) * REC;    // k-th sample, oldest first
  const label = (ctx, text, x, y, align = "left") => { ctx.fillStyle = "#b9c1cd"; ctx.textAlign = align; ctx.fillText(text, x, y); };
  const drawBodies = (ctx, P, pos) => {
    const o = [0, 0, 0, 1], order = [0, 1, 2].map((i) => ({ i, p: P(pos[3 * i], pos[3 * i + 1], pos[3 * i + 2], [0, 0, 0, 1]) })).sort((u, w) => u.p[2] - w.p[2]);
    for (const { i, p } of order) {
      ctx.beginPath(); ctx.arc(p[0], p[1], 6.5 * p[3], 0, 2 * Math.PI);
      ctx.fillStyle = BODY[i]; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = "#141a24"; ctx.stroke();
    }
    return o;
  };
  const trail = (ctx, P, bdy, zOf, from, lw) => {        // recent samples, fading out
    const n = count - from, CH = 6, o = [0, 0, 0, 1];
    if (n < 2) return;
    ctx.strokeStyle = BODY[bdy]; ctx.lineWidth = lw;
    for (let c = 0; c < CH; c++) {
      const k0 = from + Math.floor((c * (n - 1)) / CH), k1 = from + Math.floor(((c + 1) * (n - 1)) / CH);
      ctx.globalAlpha = 0.25 + (0.75 * (c + 1)) / CH; ctx.beginPath();
      for (let k = k0; k <= k1; k++) { const j = at(k); P(hist[j + 1 + 3 * bdy], hist[j + 2 + 3 * bdy], zOf(j, bdy), o); k === k0 ? ctx.moveTo(o[0], o[1]) : ctx.lineTo(o[0], o[1]); }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };
  const drawSpace = () => {
    const { ctx, w } = vv, s = (0.42 * w) / R, P = projector(CAM.space, s, 1), o = [0, 0, 0, 1], q = [0, 0, 0, 1];
    let far = 0;
    for (let k = 0; k < count; k++) { const j = at(k); for (let i = 0; i < 3; i++) far = Math.max(far, Math.abs(hist[j + 1 + 3 * i]), Math.abs(hist[j + 2 + 3 * i]), Math.abs(hist[j + 3 + 3 * i])); }
    R += 0.06 * (Math.min(36, Math.max(1.3, 1.15 * far)) - R);
    // the starting plane, z = 0
    const g = R < 2.5 ? 0.5 : R < 6 ? 1 : 4, G = g * Math.ceil(R / g);
    ctx.strokeStyle = "rgba(185,193,205,0.11)"; ctx.lineWidth = 1; ctx.beginPath();
    for (let k = -G; k <= G + 1e-9; k += g) {
      P(k, -G, 0, o); P(k, G, 0, q); ctx.moveTo(o[0], o[1]); ctx.lineTo(q[0], q[1]);
      P(-G, k, 0, o); P(G, k, 0, q); ctx.moveTo(o[0], o[1]); ctx.lineTo(q[0], q[1]);
    }
    ctx.stroke();
    const zOf = (j, bdy) => hist[j + 3 + 3 * bdy];
    for (let bdy = 0; bdy < 3; bdy++) {          // everything so far, faint
      ctx.strokeStyle = BODY[bdy]; ctx.globalAlpha = 0.3; ctx.lineWidth = 1; ctx.beginPath();
      for (let k = 0; k < count; k++) { const j = at(k); P(hist[j + 1 + 3 * bdy], hist[j + 2 + 3 * bdy], hist[j + 3 + 3 * bdy], o); k ? ctx.lineTo(o[0], o[1]) : ctx.moveTo(o[0], o[1]); }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    for (let bdy = 0; bdy < 3; bdy++) trail(ctx, P, bdy, zOf, Math.max(0, count - 60), 2.4);
    // drop lines to the starting plane once the bodies leave it
    ctx.setLineDash([2, 3]); ctx.strokeStyle = "rgba(185,193,205,0.45)"; ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) if (Math.abs(r[3 * i + 2]) > 0.02) { P(r[3 * i], r[3 * i + 1], r[3 * i + 2], o); P(r[3 * i], r[3 * i + 1], 0, q); ctx.beginPath(); ctx.moveTo(o[0], o[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); }
    ctx.setLineDash([]);
    drawBodies(ctx, P, r);
  };
  const drawBraid = () => {
    const { ctx, w } = vv, s = (0.36 * w) / Math.max(R, 1.3), P = projector(CAM.braid, s, 0), o = [0, 0, 0, 1], q = [0, 0, 0, 1], H = 0.9 * Math.max(R, 1.3);
    const zOf = (j) => H * (1 + (2 * (hist[j] - t)) / BRAID_W);
    // planes for "now" and for BRAID_W time units ago, and the time axis
    ctx.lineWidth = 1;
    for (const [Z, alpha] of [[H, 0.22], [-H, 0.1]]) {
      ctx.strokeStyle = `rgba(185,193,205,${alpha})`; ctx.beginPath();
      for (let k = 0; k <= 64; k++) { const th = (2 * Math.PI * k) / 64; P(R * Math.cos(th), R * Math.sin(th), Z, o); k ? ctx.lineTo(o[0], o[1]) : ctx.moveTo(o[0], o[1]); }
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(185,193,205,0.3)"; ctx.beginPath(); P(0, 0, -H, o); P(0, 0, H, q); ctx.moveTo(o[0], o[1]); ctx.lineTo(q[0], q[1]); ctx.stroke();
    ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const side = (Z) => {        // the leftmost point of a ring, for its label
      let best = null;
      for (let k = 0; k < 64; k++) { const th = (2 * Math.PI * k) / 64; P(R * Math.cos(th), R * Math.sin(th), Z, q); if (!best || q[0] < best[0]) best = [q[0], q[1]]; }
      return best;
    };
    let p = side(H); label(ctx, "now", Math.max(4, p[0] - 6), p[1] - 6, p[0] - 6 > 30 ? "right" : "left");
    p = side(-H); label(ctx, `${BRAID_W} time units earlier`, Math.max(4, p[0]), p[1] + 16);
    let from = count;
    while (from > 0 && hist[at(from - 1)] >= t - BRAID_W) from--;
    for (let bdy = 0; bdy < 3; bdy++) trail(ctx, P, bdy, zOf, from, 2);
    const now = [r[0], r[1], H, r[3], r[4], H, r[6], r[7], H];
    drawBodies(ctx, P, now);
  };
  const drawShape = () => {
    const { ctx, w, h } = vv, s = 0.4 * w, P = projector(CAM.shape, s, 0), o = [0, 0, 0, 1], q = [0, 0, 0, 1];
    ctx.strokeStyle = "rgba(185,193,205,0.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(w / 2, h / 2, s, 0, 2 * Math.PI); ctx.stroke();
    ctx.setLineDash([3, 4]);
    for (const front of [false, true]) {          // the equator of collinear shapes
      ctx.strokeStyle = front ? "rgba(185,193,205,0.55)" : "rgba(185,193,205,0.2)"; ctx.beginPath();
      for (let k = 0; k < 120; k++) {
        const a0 = (2 * Math.PI * k) / 120, a1 = (2 * Math.PI * (k + 1)) / 120;
        P(Math.cos(a0), Math.sin(a0), 0, o); P(Math.cos(a1), Math.sin(a1), 0, q);
        if ((o[2] + q[2] > 0) === front) { ctx.moveTo(o[0], o[1]); ctx.lineTo(q[0], q[1]); }
      }
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const mark = (X, Y, Z, text) => {
      P(X, Y, Z, o); ctx.globalAlpha = o[2] < 0 ? 0.4 : 1;
      ctx.beginPath(); ctx.arc(o[0], o[1], 4, 0, 2 * Math.PI); ctx.fillStyle = "#8b94a3"; ctx.fill();
      if (text) label(ctx, text, o[0], o[1] - 9, "center");
      ctx.globalAlpha = 1;
    };
    for (let k = 0; k < 3; k++) { const th = Math.PI + (2 * Math.PI * k) / 3; mark(Math.cos(th), Math.sin(th), 0, k === 0 ? "collision" : ""); }
    mark(0, 0, 1, "equilateral"); mark(0, 0, -1, "");
    for (const front of [false, true]) {          // the path of the shape
      ctx.strokeStyle = front ? "rgba(232,235,240,0.85)" : "rgba(232,235,240,0.25)"; ctx.lineWidth = 1.5; ctx.beginPath();
      for (let k = 1; k < count; k++) {
        const j0 = at(k - 1), j1 = at(k);
        P(hist[j0 + 10], hist[j0 + 11], hist[j0 + 12], o); P(hist[j1 + 10], hist[j1 + 11], hist[j1 + 12], q);
        if ((o[2] + q[2] > 0) === front) { ctx.moveTo(o[0], o[1]); ctx.lineTo(q[0], q[1]); }
      }
      ctx.stroke();
    }
    if (count) { const j = at(count - 1); P(hist[j + 10], hist[j + 11], hist[j + 12], o); ctx.beginPath(); ctx.arc(o[0], o[1], 6, 0, 2 * Math.PI); ctx.fillStyle = "#e8ebf0"; ctx.fill(); }
  };
  const drawView = () => {
    vv.ctx.clearRect(0, 0, vv.w, vv.h);
    (mode === "space" ? drawSpace : mode === "braid" ? drawBraid : drawShape)();
  };
  const readouts = () => {
    out("ab").textContent = `${a.toFixed(4)}, ${b.toFixed(4)}`;
    out("t").textContent = t.toFixed(1);
    out("E").textContent = minus(E0, 4);
    out("dE").innerHTML = sci(Math.abs((energy3(r, v) - E0) / E0));
    out("ret").textContent = left && isFinite(pmin) ? `${pmin < 0.01 ? pmin.toFixed(4) : pmin.toFixed(3)}, t = ${pminT.toFixed(1)}` : "–";
    out("status").textContent = escapedAt ? `a body escaped at t ≈ ${escapedAt.toFixed(0)}` : "all three together";
    const tr = trustAt(a, b);
    out("test2024").innerHTML = tr ? fmtDev(energyWindow === 10 ? tr.d10 : tr.d50) : "–";
    out("horizon").textContent = tr ? fmtHorizon(tr) : "–";
  };

  // ---- the map
  const M = { left: 32, top: 10, bottom: 28 };
  let mv = null, side = 0, mapMsg = "Loading the map…", mapBytes = null, trustBytes = null, mapView = "return", energyWindow = 10;
  const images = {};
  const paint = (n, colour) => {         // an n x n image, rows of increasing b, coloured cell by cell
    const off = document.createElement("canvas");
    off.width = off.height = n;
    const octx = off.getContext("2d"), img = octx.createImageData(n, n);
    for (let j = 0; j < n; j++)
      for (let i = 0; i < n; i++) {
        const c = colour(j * n + i), k = 4 * ((n - 1 - j) * n + i);
        img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255;
      }
    octx.putImageData(img, 0, 0);
    return off;
  };
  const paintEnergy = () => (images.energy = paint(TRUST_N, (q) => ENERGY_LUT[trustBytes[4 * q + (energyWindow === 10 ? 0 : 1)]]));
  const trustAt = (aa, bb) => {
    if (!trustBytes) return null;
    const q = 4 * (Math.round(bb * (TRUST_N - 1)) * TRUST_N + Math.round(aa * (TRUST_N - 1)));
    return { d10: trustBytes[q], d50: trustBytes[q + 1], h: trustBytes[q + 2], stop: trustBytes[q + 3] };
  };
  const fmtDev = (c) => {
    if (c === 0) return "two bodies flew apart first";
    const d = devOfCode(c);
    return `${d < 0.01 ? sci(d) : d < 100 ? d.toFixed(2) : d.toExponential(0).replace("e+", " × 10<sup>") + "</sup>"}, ${d < 1 ? "passes" : "fails"}`;
  };
  const fmtHorizon = (t) => (t.h === 255 ? (t.stop === 255 ? `beyond t = ${TRUST_T}` : `until two bodies part, t ≈ ${(t.stop / 5).toFixed(0)}`) : `t ≈ ${(t.h / 5).toFixed(1)}`);
  const fitMap = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2), w = mapCanvas.clientWidth;
    side = w - M.left - 10;
    const h = side + M.top + M.bottom;
    mapCanvas.width = Math.round(w * dpr); mapCanvas.height = Math.round(h * dpr); mapCanvas.style.height = h + "px";
    const ctx = mapCanvas.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    mv = { ctx, w, h };
  };
  const X = (aa) => M.left + ((aa * (MAP_N - 1) + 0.5) * side) / MAP_N;
  const Y = (bb) => M.top + side - ((bb * (MAP_N - 1) + 0.5) * side) / MAP_N;
  const A = (x) => Math.min(1, Math.max(0, (((x - M.left) * MAP_N) / side - 0.5) / (MAP_N - 1)));
  const B = (y) => Math.min(1, Math.max(0, (((M.top + side - y) * MAP_N) / side - 0.5) / (MAP_N - 1)));
  const drawMap = () => {
    const { ctx, w, h } = mv;
    ctx.clearRect(0, 0, w, h);
    ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const shown = images[mapView];
    if (shown) { ctx.imageSmoothingEnabled = false; ctx.drawImage(shown, M.left, M.top, side, side); }
    else { ctx.fillStyle = "#1d2430"; ctx.fillRect(M.left, M.top, side, side); label(ctx, mapMsg, M.left + side / 2, M.top + side / 2, "center"); }
    // axes
    ctx.fillStyle = "#8b94a3";
    for (let k = 0; k <= 5; k++) {
      const u = k / 5;
      ctx.textAlign = "center"; ctx.fillText(u.toFixed(1), X(u), M.top + side + 15);
      ctx.textAlign = "right"; ctx.fillText(u.toFixed(1), M.left - 6, Y(u) + 4);
    }
    ctx.fillStyle = "#b9c1cd"; ctx.textAlign = "center"; ctx.fillText("a", M.left + side / 2, M.top + side + 26);
    ctx.save(); ctx.translate(9, M.top + side / 2); ctx.rotate(-Math.PI / 2); ctx.fillText("b", 0, 0); ctx.restore();
    // total energy 3(a² + b²) - 5/2 is zero on this arc; outside it the bodies cannot all stay together
    const rE = Math.sqrt(5 / 6);
    ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(232,235,240,0.55)"; ctx.lineWidth = 1; ctx.beginPath();
    for (let k = 0; k <= 60; k++) { const th = (Math.PI / 2) * (k / 60); k ? ctx.lineTo(X(rE * Math.cos(th)), Y(rE * Math.sin(th))) : ctx.moveTo(X(rE * Math.cos(th)), Y(rE * Math.sin(th))); }
    ctx.stroke(); ctx.setLineDash([]);
    label(ctx, "E = 0", X(rE * Math.cos(0.3)) + 6, Y(rE * Math.sin(0.3)) - 2);
    // known periodic orbits
    for (const n of NAMES) {
      const [oa, ob] = ORBITS[n].v;
      ctx.beginPath(); ctx.arc(X(oa), Y(ob), 4.5, 0, 2 * Math.PI);
      ctx.lineWidth = 3; ctx.strokeStyle = "#141a24"; ctx.stroke(); ctx.lineWidth = 1.5; ctx.strokeStyle = "#ffffff"; ctx.stroke();
    }
    // the current choice
    ctx.strokeStyle = "rgba(232,235,240,0.35)"; ctx.lineWidth = 1; ctx.beginPath();
    ctx.moveTo(X(a), M.top); ctx.lineTo(X(a), M.top + side); ctx.moveTo(M.left, Y(b)); ctx.lineTo(M.left + side, Y(b)); ctx.stroke();
    ctx.beginPath(); ctx.arc(X(a), Y(b), 3.5, 0, 2 * Math.PI); ctx.fillStyle = "#ffffff"; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = "#141a24"; ctx.stroke();
  };
  const describe = (aa, bb) => {
    const near = NAMES.find((n) => Math.hypot(X(ORBITS[n].v[0]) - X(aa), Y(ORBITS[n].v[1]) - Y(bb)) < 7);
    let text = `<b>a = ${aa.toFixed(3)}, b = ${bb.toFixed(3)}</b>`;
    if (near) text = `<b>${near}</b> (period ${ORBITS[near].T.toFixed(2)})<br>a = ${ORBITS[near].v[0].toFixed(4)}, b = ${ORBITS[near].v[1].toFixed(4)}`;
    if (mapBytes) {
      const c = mapBytes[Math.round(bb * (MAP_N - 1)) * MAP_N + Math.round(aa * (MAP_N - 1))];
      text += c === 0 ? `<br>accurate run: a body escaped before t = ${MAP_T}` : c === 255 ? "<br>accurate run: not resolved" : `<br>closest return ${pOfCode(c) < 0.01 ? pOfCode(c).toFixed(4) : pOfCode(c).toFixed(3)}`;
    }
    const tr = trustAt(aa, bb);
    if (tr) text += `<br>2024 test, t ≤ ${energyWindow}: ${fmtDev(energyWindow === 10 ? tr.d10 : tr.d50)}<br>trust horizon: ${fmtHorizon(tr)}`;
    return { text, near };
  };
  const choose = (aa, bb, name = "") => {
    a = aa; b = bb; select.value = name;
    restart(); drawMap(); drawView(); readouts(); loop.kick();
  };
  const pick = (e) => {
    const box = mapCanvas.getBoundingClientRect(), x = e.clientX - box.left, y = e.clientY - box.top, { near } = describe(A(x), B(y));
    if (near) choose(...ORBITS[near].v, near); else choose(+A(x).toFixed(4), +B(y).toFixed(4));
  };
  mapCanvas.addEventListener("pointerdown", pick);
  mapCanvas.addEventListener("pointermove", (e) => {
    const box = mapCanvas.getBoundingClientRect(), x = e.clientX - box.left, y = e.clientY - box.top;
    if (e.pointerType === "mouse" && e.buttons) pick(e);
    if (x < M.left || y > M.top + side) { tip.style.opacity = 0; return; }
    tip.innerHTML = describe(A(x), B(y)).text;
    tip.style.opacity = 1;
    tip.style.left = Math.min(x + 14, mv.w - tip.offsetWidth - 4) + "px";
    tip.style.top = Math.max(0, y - tip.offsetHeight - 10) + "px";
  });
  mapCanvas.addEventListener("pointerleave", () => (tip.style.opacity = 0));
  mapCanvas.addEventListener("keydown", (e) => {
    const d = (e.shiftKey ? 10 : 1) / (MAP_N - 1), k = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, d], ArrowDown: [0, -d] }[e.key];
    if (!k) return;
    e.preventDefault();
    choose(+Math.min(1, Math.max(0, a + k[0])).toFixed(4), +Math.min(1, Math.max(0, b + k[1])).toFixed(4));
  });

  // ---- controls
  select.addEventListener("change", () => { if (select.value) choose(...ORBITS[select.value].v, select.value); });
  deltaIn.addEventListener("input", () => { delta = +deltaIn.value; out("delta").textContent = delta.toFixed(2); restart(); drawView(); readouts(); loop.kick(); });
  $$("[data-view]", root).forEach((btn) => btn.addEventListener("click", () => {
    mode = btn.dataset.view;
    $$("[data-view]", root).forEach((x) => x.setAttribute("aria-pressed", x === btn));
    drawView();
  }));
  $$("[data-speed]", root).forEach((btn) => btn.addEventListener("click", () => {
    speed = +btn.dataset.speed;
    $$("[data-speed]", root).forEach((x) => x.setAttribute("aria-pressed", x === btn));
  }));
  $('[data-act="restart"]', root).addEventListener("click", () => { restart(); drawView(); readouts(); loop.kick(); });
  const sync = () => { play.textContent = playing ? "Pause" : "Play"; play.setAttribute("aria-pressed", playing); };
  play.addEventListener("click", () => { playing = !playing; sync(); loop.kick(); });
  let drag = null;
  viewCanvas.addEventListener("pointerdown", (e) => { drag = { x: e.clientX, y: e.clientY }; touched = true; viewCanvas.setPointerCapture(e.pointerId); });
  viewCanvas.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const cam = CAM[mode];
    cam.yaw += (e.clientX - drag.x) * 0.008;
    cam.pitch = Math.min(Math.PI / 2, Math.max(-Math.PI / 2, cam.pitch + (e.clientY - drag.y) * 0.008));
    drag = { x: e.clientX, y: e.clientY };
    if (!playing) drawView();
  });
  const endDrag = () => (drag = null);
  viewCanvas.addEventListener("pointerup", endDrag);
  viewCanvas.addEventListener("pointercancel", endDrag);

  const loop = onScreenLoop(root, () => {
    advance((1.5 * speed) / 60);
    if (!touched) CAM[mode].yaw += 0.0015;
    drawView();
    if (++frame % 6 === 0) readouts();
  }, () => playing, 60);
  addEventListener("resize", () => { vv = fit(viewCanvas, 1); fitMap(); drawMap(); drawView(); });

  fitMap();
  sync();
  choose(a, b, "Figure-eight");
  loadMap(root.dataset.map).then((bytes) => {
    mapBytes = bytes;
    images.return = paint(MAP_N, (q) => MAP_LUT[bytes[q]]);
    drawMap();
  }).catch(() => { mapMsg = "The map could not be loaded."; drawMap(); });
  loadMap(root.dataset.trust).then((bytes) => {
    trustBytes = bytes;
    paintEnergy();
    images.trust = paint(TRUST_N, (q) => TRUST_LUT[bytes[4 * q + 2]]);
    drawMap(); readouts();
  }).catch(() => {});
  // which map is shown, and its key
  const showView = (v) => {
    mapView = v;
    $$("[data-mapview]", root).forEach((x) => x.setAttribute("aria-pressed", x.dataset.mapview === v));
    $$("[data-key]", root).forEach((x) => (x.hidden = x.dataset.key !== v));
    drawMap();
  };
  $$("[data-mapview]", root).forEach((btn) => btn.addEventListener("click", () => showView(btn.dataset.mapview)));
  $$("[data-window]", root).forEach((btn) => btn.addEventListener("click", () => {
    energyWindow = +btn.dataset.window;
    $$("[data-window]", root).forEach((x) => x.setAttribute("aria-pressed", x === btn));
    if (trustBytes) paintEnergy();
    drawMap(); readouts();
  }));
}

function toc() {
  const nav = $("#xp-toc");
  if (!nav) return;
  const heads = $$(".xp-article h2[id]");
  nav.innerHTML = heads.map((h) => { const c = h.cloneNode(true); c.querySelector(".num")?.remove(); return `<a href="#${h.id}">${c.textContent.trim()}</a>`; }).join("");
  const links = $$("a", nav);
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-20% 0px -70% 0px" });
  heads.forEach((h) => io.observe(h));
}

serifGreek();
toc();
hero();
integrators();
playground();
