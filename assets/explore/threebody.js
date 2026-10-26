// Interactive figures for the three-body project page. Equal masses, G = 1, motion in the plane.
import { chart } from "./lib/plot.js";
import { onScreenLoop, reducedMotion } from "./lib/viz.js";
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
const ORBITS = {
  "figure-eight": { v: [0.3471128135672417, 0.532726851767674], T: 6.326 },
  "butterfly I": { v: [0.306892758965492, 0.125506782829762], T: 6.235 },
  "moth I": { v: [0.464445237398184, 0.396059973403921], T: 14.894 },
  goggles: { v: [0.0833000564575194, 0.127889282226563], T: 10.465 },
  "yin-yang I": { v: [0.513938054919243, 0.304736003875733], T: 17.329 },
};
// one period with the fourth-order integrator, sampled every `every` steps
function trajectory(name, dt, every) {
  const o = ORBITS[name], s = initial(...o.v), step = makeStepper("fr4"), n = Math.round(o.T / dt), pts = [];
  for (let k = 0; k <= n; k++) { if (k % every === 0) pts.push(Float64Array.from(s.subarray(0, 6))); if (k < n) step(s, dt); }
  const s0 = initial(...o.v); let gap = 0; for (let i = 0; i < 12; i++) gap += (s[i] - s0[i]) ** 2;
  return { pts, dt: dt * every, gap: Math.sqrt(gap) };
}
// shape sphere: Jacobi coordinates of the triangle, mapped to the unit sphere (Montgomery's construction)
function shapePoint(p) {
  const z1r = (p[4] - p[2]) / Math.SQRT2, z1i = (p[5] - p[3]) / Math.SQRT2;
  const k = Math.sqrt(2 / 3), z2r = k * (p[0] - (p[2] + p[4]) / 2), z2i = k * (p[1] - (p[3] + p[5]) / 2);
  const n1 = z1r * z1r + z1i * z1i, n2 = z2r * z2r + z2i * z2i, I = n1 + n2;
  // u1 + i u2 = 2 conj(z1) z2 lies in the plane of collinear shapes; u3 = |z1|^2 - |z2|^2 ... rotated so that
  // the collinear shapes form the equator and the two equilateral shapes are the poles
  const re = 2 * (z1r * z2r + z1i * z2i), im = 2 * (z1r * z2i - z1i * z2r);
  return [(n1 - n2) / I, re / I, im / I];
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
  const orb = trajectory("figure-eight", 1e-3, 10), bounds = boundsOf(orb.pts);
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
  const tEnd = 20 * ORBITS["figure-eight"].T;
  let plot = null;
  const run = () => {
    const dt = DTS[+slider.value];
    $('[data-out="dt"]', root).textContent = dt;
    const series = [], rows = [];
    for (const m of METHODS) {
      const s = initial(...ORBITS["figure-eight"].v), step = makeStepper(m.key), E0 = energy(s), n = Math.round(tEnd / dt);
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

// ---------------------------------------------------------------- orbit gallery with the shape sphere
function gallery() {
  const root = $("#gallery");
  if (!root) return;
  const orbitCanvas = $("canvas.tb-orbit", root), sphereCanvas = $("canvas.tb-sphere", root), play = $('[data-act="play"]', root);
  let name = "figure-eight", orb = null, sphere = null, bounds = null, idx = 0, playing = !reducedMotion;
  let vo = fit(orbitCanvas, 1), vs = fit(sphereCanvas, 1);
  const tilt = 0.45, ct = Math.cos(tilt), st = Math.sin(tilt);
  const proj = (u, view) => {        // view the sphere from slightly above the plane of collinear shapes
    const r = 0.42 * Math.min(view.w, view.h), x = u[1], y = u[2] * ct - u[0] * st, z = u[2] * st + u[0] * ct;
    return [view.w / 2 + r * x, view.h / 2 - r * y, z];
  };
  const drawSphere = () => {
    const { ctx, w, h } = vs, r = 0.42 * Math.min(w, h);
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(185,193,205,0.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(w / 2, h / 2, r, 0, 2 * Math.PI); ctx.stroke();
    // equator: collinear shapes
    ctx.setLineDash([3, 4]); ctx.beginPath();
    for (let k = 0; k <= 120; k++) { const a = (2 * Math.PI * k) / 120, q = proj([Math.cos(a), Math.sin(a), 0], vs); k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
    ctx.stroke(); ctx.setLineDash([]);
    // the path, front half brighter
    for (let k = 1; k < sphere.length; k++) {
      const a = proj(sphere[k - 1], vs), b = proj(sphere[k], vs);
      ctx.strokeStyle = a[2] < 0 ? "rgba(232,235,240,0.25)" : "rgba(232,235,240,0.85)"; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
    // landmarks: binary collisions on the equator, equilateral (Lagrange) shapes at the poles
    ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"; ctx.textAlign = "center";
    const mark = (u, colour, label) => { const q = proj(u, vs); ctx.beginPath(); ctx.arc(q[0], q[1], 4, 0, 2 * Math.PI); ctx.fillStyle = colour; ctx.fill(); if (label) { ctx.fillStyle = "#b9c1cd"; ctx.fillText(label, q[0], q[1] - 9); } };
    for (let k = 0; k < 3; k++) { const a = Math.PI + (2 * Math.PI * k) / 3; mark([Math.cos(a), Math.sin(a), 0], "#8b94a3", k === 0 ? "collision" : ""); }
    mark([0, 0, 1], "#8b94a3", "equilateral"); mark([0, 0, -1], "#8b94a3", "");
    const q = proj(sphere[idx], vs);
    ctx.beginPath(); ctx.arc(q[0], q[1], 6, 0, 2 * Math.PI); ctx.fillStyle = "#e8ebf0"; ctx.fill();
  };
  const draw = () => { drawOrbit(vo, orb.pts, idx, 60, bounds); drawSphere(); };
  const choose = (n) => {
    name = n;
    $$("[data-orbit]", root).forEach((b) => b.setAttribute("aria-pressed", b.dataset.orbit === n));
    orb = trajectory(n, 1e-4, 50); bounds = boundsOf(orb.pts); sphere = orb.pts.map(shapePoint); idx = 0;
    $('[data-out="T"]', root).textContent = ORBITS[n].T.toFixed(3);
    $('[data-out="gap"]', root).textContent = orb.gap.toExponential(0);
    draw();
  };
  $$("[data-orbit]", root).forEach((b) => b.addEventListener("click", () => choose(b.dataset.orbit)));
  const sync = () => { play.textContent = playing ? "Pause" : "Play"; play.setAttribute("aria-pressed", playing); };
  const loop = onScreenLoop(root, () => {
    const stepsPerFrame = Math.max(1, Math.round(orb.pts.length / (ORBITS[name].T * 60 / 1.5)));   // about 1.5 time units per second
    idx = (idx + stepsPerFrame) % orb.pts.length; draw();
  }, () => playing, 60);
  play.addEventListener("click", () => { playing = !playing; sync(); loop.kick(); });
  addEventListener("resize", () => { vo = fit(orbitCanvas, 1); vs = fit(sphereCanvas, 1); draw(); });
  sync();
  choose(name);
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
gallery();
