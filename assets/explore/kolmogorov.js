// Interactive figures for the Kolmogorov flow page: a live solver in the browser (the same method as JAX-CFD, at 64 x 64)
// and charts of the JAX-CFD and Dedalus runs.
import { chart } from "./lib/plot.js";
import { onScreenLoop, reducedMotion, oklchToRgb } from "./lib/viz.js";
import { serifGreek } from "./lib/greek.js";
import { Kolmogorov } from "./lib/kolmo-solver.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const JAX = "#2a78d6", DED = "#eb6834", THEORY = "#3b4352", RE40 = "#1baf7a", RE2000 = "#eda100";

// vorticity colours on the dark screen: clockwise blue, anticlockwise orange, zero the screen colour
const LUT = Array.from({ length: 257 }, (_, k) => {
  const s = (k - 128) / 128, m = Math.abs(s) ** 0.85;
  return s < 0 ? oklchToRgb(0.2 + 0.62 * m, 0.13 * m, 250) : oklchToRgb(0.2 + 0.66 * m, 0.14 * m, 55);
});
const SCREEN = [20, 26, 36];

function makeView(canvas, N) {
  const off = document.createElement("canvas");
  off.width = off.height = N;
  const octx = off.getContext("2d"), img = octx.createImageData(N, N), w = new Float64Array(N * N);
  let scale = 0;
  return (solver) => {
    solver.vorticity(w);
    let mx = 0;
    for (let p = 0; p < w.length; p++) mx = Math.max(mx, Math.abs(w[p]));
    scale = scale ? scale + 0.05 * (mx - scale) : mx;
    const inv = 128 / Math.max(scale, 1e-9);
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        const c = LUT[Math.max(0, Math.min(256, Math.round(128 + w[i * N + j] * inv)))], k = 4 * ((N - 1 - j) * N + i);
        img.data[k] = c[0]; img.data[k + 1] = c[1]; img.data[k + 2] = c[2]; img.data[k + 3] = 255;
      }
    octx.putImageData(img, 0, 0);
    const dpr = Math.min(devicePixelRatio || 1, 2), size = Math.round(canvas.clientWidth * dpr);
    if (canvas.width !== size) { canvas.width = canvas.height = size; }
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    ctx.drawImage(off, 0, 0, size, size);
  };
}
// click to drop a small vortex where the pointer is, alternating its sign
function stirrer(canvas, solver) {
  let sign = 1;
  canvas.addEventListener("pointerdown", (e) => {
    const box = canvas.getBoundingClientRect(), N = solver.N, x0 = (2 * Math.PI * (e.clientX - box.left)) / box.width, y0 = 2 * Math.PI * (1 - (e.clientY - box.top) / box.height);
    const w = new Float64Array(N * N), amp = sign * Math.max(4, solver.Re / 4), s2 = 2 * 0.35 ** 2;
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        let dx = Math.abs((2 * Math.PI * i) / N - x0), dy = Math.abs((2 * Math.PI * j) / N - y0);
        dx = Math.min(dx, 2 * Math.PI - dx); dy = Math.min(dy, 2 * Math.PI - dy);
        w[i * N + j] = amp * Math.exp(-(dx * dx + dy * dy) / s2);
      }
    solver.addVorticity(w); sign = -sign;
  });
}
const decode = (b64) => { const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)); return Float64Array.from(new Float32Array(bytes.buffer)); };

// ---------------------------------------------------------------- hero: a turbulent flow at Re = 40
function hero(data) {
  const canvas = $("#hero-flow");
  if (!canvas) return;
  const solver = new Kolmogorov(64, 40, 0.01);
  solver.setVorticity(decode(data.hero));
  const draw = makeView(canvas, 64);
  draw(solver); stirrer(canvas, solver);
  if (reducedMotion) return;
  onScreenLoop(canvas, () => { for (let k = 0; k < 4; k++) solver.step(); draw(solver); }, () => true, 60);
}

// ---------------------------------------------------------------- the live solver with a Reynolds-number slider
function flowLab(data) {
  const root = $("#flow-lab");
  if (!root) return;
  const N = 64, canvas = $("canvas.kf-flow", root), trace = $("canvas.xp-trace", root), slider = $('[data-ctl="Re"]', root), play = $('[data-act="play"]', root);
  const out = (k) => $(`[data-out="${k}"]`, root);
  const solver = new Kolmogorov(N, +slider.value, 0.01), draw = makeView(canvas, N);
  const noise = (amp) => {
    const w = new Float64Array(N * N), modes = [];
    for (let a = 0; a <= 3; a++) for (let b = -6; b <= 6; b++) if (a || b > 0) modes.push([a, b, Math.random() - 0.5, 2 * Math.PI * Math.random()]);
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        const x = (2 * Math.PI * i) / N, y = (2 * Math.PI * j) / N;
        let v = 0; for (const [a, b, c, ph] of modes) v += c * Math.cos(a * x + b * y + ph);
        w[i * N + j] = amp * v;
      }
    return w;
  };
  const toLaminar = () => { solver.setVorticity(solver.laminar()); solver.addVorticity(noise(1e-3)); solver.t = 0; hist.length = 0; };
  const sigma = (Re) => { const T = data.theory.table; const k = Math.max(0, Math.min(T.length - 2, Math.floor((Re - T[0][0]) / 0.5))); const f = (Re - T[k][0]) / 0.5; return T[k][1] + f * (T[k + 1][1] - T[k][1]); };
  const hist = [];        // [t, D / D_lam]
  let playing = !reducedMotion, frame = 0;
  const drawTrace = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2), w = trace.clientWidth, h = trace.clientHeight;
    if (trace.width !== Math.round(w * dpr)) { trace.width = Math.round(w * dpr); trace.height = Math.round(h * dpr); }
    const ctx = trace.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
    const W = 60, t1 = Math.max(W, solver.t), t0 = t1 - W, ymax = 1.25;
    const X = (t) => 8 + ((t - t0) / W) * (w - 16), Y = (v) => h - 8 - (Math.min(v, ymax) / ymax) * (h - 16);
    ctx.font = "11px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"; ctx.fillStyle = "#8b94a3";
    ctx.setLineDash([3, 4]); ctx.strokeStyle = "rgba(185,193,205,0.45)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(8, Y(1)); ctx.lineTo(w - 8, Y(1)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillText("laminar", 12, Y(1) - 4);
    ctx.strokeStyle = "#e8ebf0"; ctx.lineWidth = 1.6; ctx.beginPath();
    let started = false;
    for (const [t, v] of hist) { if (t < t0) continue; started ? ctx.lineTo(X(t), Y(v)) : ctx.moveTo(X(t), Y(v)); started = true; }
    ctx.stroke();
  };
  const readouts = () => {
    const d = solver.diagnostics(), s = sigma(solver.Re);
    out("t").textContent = solver.t.toFixed(1);
    out("D").textContent = (d.D / (solver.Re / 32)).toFixed(3);
    out("sigma").textContent = s < 0 ? `stable, σ = ${s.toFixed(3).replace("-", "−")}` : `unstable, σ = +${s.toFixed(3)}`;
  };
  slider.addEventListener("input", () => { solver.setRe(+slider.value); out("Re").textContent = (+slider.value).toFixed(1); readouts(); });
  $('[data-act="kick"]', root).addEventListener("click", () => { solver.addVorticity(noise(0.5)); loop.kick(); });
  $('[data-act="laminar"]', root).addEventListener("click", () => { toLaminar(); draw(solver); drawTrace(); readouts(); loop.kick(); });
  const sync = () => { play.textContent = playing ? "Pause" : "Play"; play.setAttribute("aria-pressed", playing); };
  play.addEventListener("click", () => { playing = !playing; sync(); loop.kick(); });
  stirrer(canvas, solver);
  const loop = onScreenLoop(root, () => {
    for (let k = 0; k < 4; k++) solver.step();
    hist.push([solver.t, solver.diagnostics().D / (solver.Re / 32)]);
    if (hist.length > 2000) hist.splice(0, hist.length - 2000);
    draw(solver); drawTrace();
    if (++frame % 6 === 0) readouts();
  }, () => playing, 60);
  addEventListener("resize", () => { draw(solver); drawTrace(); });
  out("Re").textContent = (+slider.value).toFixed(1);
  toLaminar(); sync(); draw(solver); drawTrace(); readouts();
}

// ---------------------------------------------------------------- charts of the two codes
function ratesChart(data) {
  const host = $("#rates-chart .xp-plot");
  if (!host) return;
  chart(host, {
    id: "rates", height: 340,
    x: { label: "Reynolds number Re", domain: [7.5, 12.5] },
    y: { label: "growth rate σ of a small disturbance", domain: [-0.1, 0.1], ticks: [-0.1, -0.05, 0, 0.05, 0.1] },
    refs: [{ value: 0, axis: "y" }, { value: 9.967, axis: "x", label: "Re = 9.967" }],
    series: [
      { label: "linear theory", color: THEORY, line: true, markers: false, points: data.theory.curve.map(([x, y]) => ({ x, y })) },
      { label: "JAX-CFD", color: JAX, r: 7, points: data.rates.map((r) => ({ x: r.Re, y: r.jax })) },
      { label: "Dedalus", color: DED, r: 3.5, points: data.rates.map((r) => ({ x: r.Re, y: r.dedalus })) },
    ],
    tooltip: (p, se) => `<b>${se.label}</b><br>Re = ${p.x}: σ = ${p.y.toFixed(5)}`,
  });
}
function re40Chart(data) {
  const host = $("#re40-chart .xp-plot");
  if (!host) return;
  const r = data.re40;
  chart(host, {
    id: "re40", height: 320,
    x: { label: "time", domain: [r.t[0], r.t[r.t.length - 1]] },
    y: { label: "dissipation D / D_lam", domain: [0, 0.3] },
    series: [
      { label: "JAX-CFD", color: JAX, line: true, markers: false, points: r.t.map((t, k) => ({ x: t, y: r.jax[k] })) },
      { label: "Dedalus", color: DED, line: true, markers: false, points: r.t.map((t, k) => ({ x: t, y: r.dedalus[k] })) },
    ],
    tooltip: (p, se) => `<b>${se.label}</b><br>t = ${p.x.toFixed(1)}: ${p.y.toFixed(3)}`,
  });
}
const decades = ([lo, hi], step) => {
  const t = [];
  for (let e = Math.ceil(Math.log10(lo) / step) * step; e <= Math.log10(hi) + 1e-9; e += step) t.push(10 ** e);
  return t;
};
function spectraChart(data) {
  const root = $("#spectra");
  if (!root) return;
  const host = $(".xp-plot", root);
  let plot = null;
  const show = (key) => {
    $$("[data-re]", root).forEach((b) => b.setAttribute("aria-pressed", b.dataset.re === key));
    const s = data.spectra[key], pts = (arr) => s.k.map((k, i) => ({ x: k, y: arr[i] })).filter((p) => p.y > 1e-30);
    const spec = {
      id: "spectra", height: 340,
      x: { label: "wavenumber k", log: true, domain: [1, s.kmax] },
      y: { label: "energy spectrum E(k)", log: true, domain: s.ydomain, ticks: decades(s.ydomain, 5) },
      refs: [{ value: s.cutoff, axis: "x", label: "2/3" }],
      series: [
        { label: "JAX-CFD", color: JAX, line: true, markers: false, points: pts(s.jax) },
        { label: "Dedalus", color: DED, line: true, markers: false, points: pts(s.dedalus) },
      ],
      tooltip: (p, se) => `<b>${se.label}</b><br>k = ${p.x}: ${p.y.toExponential(2)}`,
    };
    if (plot) plot.update(spec); else plot = chart(host, spec);
  };
  $$("[data-re]", root).forEach((b) => b.addEventListener("click", () => show(b.dataset.re)));
  show("40");
}
// relative difference between the two codes' vorticity fields, from the same start
function separationChart(id, pts, tmax, color, label, ydomain = [1e-8, 3]) {
  const host = $(`#${id} .xp-plot`);
  if (!host || !pts.length) return;
  chart(host, {
    id, height: 300,
    x: { label: "time", domain: [0, tmax] },
    y: { label: "difference between the codes", log: true, domain: ydomain, ticks: decades(ydomain, 1).filter((v, i, a) => a.length < 7 || i % 2 === 0) },
    series: [{ label, color, line: true, markers: false, points: pts.map(([x, y]) => ({ x, y })) }],
    tooltip: (p) => `t = ${p.x}: ${p.y.toExponential(1)}`,
  });
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
fetch(document.body.dataset.kolmogorov || "/assets/data/kolmogorov.json").then((r) => r.json()).then((data) => {
  hero(data); flowLab(data); ratesChart(data); re40Chart(data); spectraChart(data);
  separationChart("separation", data.separation.re40, 150, RE40, "Re = 40, 128 × 128");
  separationChart("separation-2000", data.separation.re2000, 10, RE2000, "Re = 2000, 512 × 512", [1e-4, 1]);
});
