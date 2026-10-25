// Interactive figures for the 3D Heisenberg explorable.
import { Ising2D, Heisenberg3D, WolffGrowth, ISING_TC, HEIS_TC } from "./lib/spins.js";
import { LatticeView, CubeView, Trace, drawSlice, onScreenLoop, reducedMotion } from "./lib/viz.js";
import { chart, linfit } from "./lib/plot.js";
import { serifGreek } from "./lib/greek.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Colour roles (validated on the dark chart surface).
const L_RAMP = ["#1c5cab", "#2a78d6", "#5598e7", "#86b6ef", "#b7d3f6"]; // ordinal: small L -> large L
const METRO = "#3987e5", WOLFF = "#d95926", AQUA = "#199e70";
const INK_MUTED = "#8b94a3";

const fmt = (v, d = 3) => (Math.abs(v) < 1e-12 ? "0" : v.toFixed(d));

function bindPlay(root, start = !reducedMotion) {
  let playing = start;
  const btn = $('[data-act="play"]', root);
  const sync = () => { if (btn) { btn.textContent = playing ? "Pause" : "Play"; btn.setAttribute("aria-pressed", playing); } };
  sync();
  return {
    get playing() { return playing; },
    set playing(v) { playing = v; sync(); },
    onToggle(fn) { btn?.addEventListener("click", () => { playing = !playing; sync(); fn(playing); }); },
  };
}

function segmented(root, attr, onChange) {
  const buttons = $$(`[data-${attr}]`, root);
  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      buttons.forEach((o) => o.setAttribute("aria-pressed", o === b));
      onChange(b.dataset[attr]);
    })
  );
}

// ---------------------------------------------------------------- hero cube
function hero() {
  const canvas = $("#hero-cube");
  if (!canvas) return;
  const model = new Heisenberg3D(14, 11);
  for (let k = 0; k < 60; k++) model.wolffSweep(HEIS_TC);
  const view = new CubeView(canvas, model, { autoRotate: 0.003 });
  let frame = 0;
  view.draw(false);
  if (reducedMotion) return;
  onScreenLoop(canvas, () => {
    if (frame++ % 3 === 0) model.wolff(HEIS_TC);
    view.draw();
  });
  window.addEventListener("resize", () => { view.resize(); view.draw(false); });
}

// ---------------------------------------------------------------- 2D Ising laboratory
function isingLab() {
  const root = $("#ising-lab");
  if (!root) return;
  const L = 128, model = new Ising2D(L, 21);
  const view = new LatticeView($("canvas.xp-lattice", root), L);
  const trace = new Trace($("canvas.xp-trace", root), [{ color: METRO }], { n: 240, ymin: 0, ymax: 1 });
  const slider = $('[data-ctl="T"]', root);
  let T = +slider.value, algo = "metropolis";
  const out = (k, v) => { const o = $(`[data-out="${k}"]`, root); if (o) o.textContent = v; };
  const play = bindPlay(root);

  const step = () => {
    if (algo === "wolff") model.wolffSweep(T); else model.metropolisSweep(T);
    const m = model.magnetization();
    view.draw(model.s);
    trace.push(Math.abs(m));
    out("m", fmt(Math.abs(m)));
    out("e", fmt(model.energy()));
  };
  const loop = onScreenLoop(root, step, () => play.playing);
  play.onToggle(() => loop.kick());
  slider.addEventListener("input", () => {
    T = +slider.value;
    out("T", T.toFixed(2));
    out("ratio", (T / ISING_TC).toFixed(2));
  });
  segmented(root, "algo", (a) => { algo = a; trace.series[0].color = a === "wolff" ? WOLFF : METRO; });
  $('[data-act="hot"]', root).addEventListener("click", () => { model.randomize(); trace.clear(); view.draw(model.s); });
  $('[data-act="cold"]', root).addEventListener("click", () => { model.order(); trace.clear(); view.draw(model.s); });
  $$("[data-preset]", root).forEach((b) => b.addEventListener("click", () => { slider.value = b.dataset.preset; slider.dispatchEvent(new Event("input")); }));
  slider.dispatchEvent(new Event("input"));
  view.draw(model.s);
  window.addEventListener("resize", () => { view.resize(); trace.resize(); view.draw(model.s); });
}

// ---------------------------------------------------------------- 2D Ising vs 3D Heisenberg
function compare() {
  const root = $("#compare");
  if (!root) return;
  const ising = new Ising2D(96, 5), heis = new Heisenberg3D(16, 9);
  const iv = new LatticeView($("canvas.xp-ising", root), 96);
  const cubeCanvas = $("canvas.xp-cube", root), sliceCanvas = $("canvas.xp-slice", root);
  const cv = new CubeView(cubeCanvas, heis, { autoRotate: 0.002, onDrag: () => !play.playing && cv.draw(false) });
  const slider = $('[data-ctl="r"]', root);
  let r = +slider.value, mode = "cube", frame = 0;
  const play = bindPlay(root);
  const out = (k, v) => { const o = $(`[data-out="${k}"]`, root); if (o) o.textContent = v; };

  const sliceSize = () => { const b = sliceCanvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); sliceCanvas.width = Math.round(b.width * d); sliceCanvas.height = Math.round(b.width * d); };
  const drawAll = (spin) => {
    iv.draw(ising.s);
    if (mode === "cube") cv.draw(spin); else drawSlice(sliceCanvas, heis, heis.L >> 1);
    out("mi", fmt(Math.abs(ising.magnetization())));
    out("mh", fmt(heis.magnetization()));
  };
  const step = () => {
    ising.wolffSweep(r * ISING_TC);
    ising.metropolisSweep(r * ISING_TC);
    if (frame++ % 2 === 0) { heis.wolffSweep(r * HEIS_TC); heis.metropolisSweep(r * HEIS_TC); }
    drawAll(true);
  };
  const loop = onScreenLoop(root, step, () => play.playing);
  play.onToggle(() => loop.kick());
  slider.addEventListener("input", () => {
    r = +slider.value;
    out("r", r.toFixed(2));
    out("Ti", (r * ISING_TC).toFixed(2));
    out("Th", (r * HEIS_TC).toFixed(2));
  });
  segmented(root, "view", (v) => {
    mode = v;
    cubeCanvas.hidden = v !== "cube";
    sliceCanvas.hidden = v !== "slice";
    if (v === "slice") sliceSize(); else cv.resize();
    drawAll(false);
  });
  $$("[data-preset]", root).forEach((b) => b.addEventListener("click", () => { slider.value = b.dataset.preset; slider.dispatchEvent(new Event("input")); }));
  slider.dispatchEvent(new Event("input"));
  for (let k = 0; k < 40; k++) { ising.wolffSweep(r * ISING_TC); heis.wolffSweep(r * HEIS_TC); }
  drawAll(false);
  window.addEventListener("resize", () => { iv.resize(); cv.resize(); if (mode === "slice") sliceSize(); drawAll(false); });
}

// ---------------------------------------------------------------- Wolff cluster growth, step by step
function wolffGrow() {
  const root = $("#wolff-grow");
  if (!root) return;
  const L = 32, model = new Ising2D(L, 17);
  const view = new LatticeView($("canvas.xp-lattice", root), L, { layers: [WOLFF, AQUA], grid: true });
  const slider = $('[data-ctl="T"]', root);
  let T = +slider.value, grow = null, auto = false, timer = 0;
  const out = (k, v) => { const o = $(`[data-out="${k}"]`, root); if (o) o.textContent = v; };
  const autoBtn = $('[data-act="auto"]', root);

  const equilibrate = () => { for (let k = 0; k < 200; k++) model.wolffSweep(T); };
  const redraw = () => {
    view.draw(model.s, grow ? grow.state : null);
    if (grow && grow.current >= 0 && !grow.done) view.marker(grow.current, "#ffffff");
    if (grow) view.marker(grow.seed, "#ffffff");
    out("size", grow ? grow.size : 0);
    out("tested", grow ? grow.tested : 0);
    out("accepted", grow ? grow.accepted : 0);
    out("waiting", grow ? grow.stack.length : 0);
    out("status", !grow ? "Press “Seed a cluster”." : grow.done ? "Cluster complete: flip it." : "Growing…");
  };
  const newCluster = () => { grow = new WolffGrowth(model, T); redraw(); };
  const stopAuto = () => { auto = false; clearInterval(timer); autoBtn.textContent = "Auto-grow"; autoBtn.setAttribute("aria-pressed", false); };

  slider.addEventListener("input", () => {
    T = +slider.value;
    out("T", T.toFixed(2));
    out("p", (1 - Math.exp(-2 / T)).toFixed(3));
  });
  slider.addEventListener("change", () => { stopAuto(); grow = null; equilibrate(); redraw(); });
  $('[data-act="seed"]', root).addEventListener("click", () => { stopAuto(); newCluster(); });
  $('[data-act="step"]', root).addEventListener("click", () => { if (!grow) newCluster(); else grow.step(); redraw(); });
  autoBtn.addEventListener("click", () => {
    if (auto) return stopAuto();
    if (!grow || grow.done) newCluster();
    auto = true;
    autoBtn.textContent = "Stop";
    autoBtn.setAttribute("aria-pressed", true);
    timer = setInterval(() => { if (!grow.step()) stopAuto(); redraw(); }, reducedMotion ? 400 : 60);
  });
  $('[data-act="flip"]', root).addEventListener("click", () => {
    stopAuto();
    if (!grow) return;
    while (grow.step());
    grow.flip();
    grow = null;
    redraw();
  });
  slider.dispatchEvent(new Event("input"));
  equilibrate();
  redraw();
  window.addEventListener("resize", () => { view.resize(); redraw(); });
}

// ---------------------------------------------------------------- Metropolis vs Wolff at Tc
function race() {
  const root = $("#race");
  if (!root) return;
  const L = 96, a = new Ising2D(L, 31), b = new Ising2D(L, 31);
  for (let k = 0; k < 300; k++) { a.wolffSweep(ISING_TC); }
  b.s.set(a.s);
  const va = new LatticeView($("canvas.xp-metro", root), L), vb = new LatticeView($("canvas.xp-wolff", root), L);
  const trace = new Trace($("canvas.xp-trace", root), [{ color: METRO }, { color: WOLFF }], { n: 300, ymin: -1, ymax: 1 });
  const play = bindPlay(root);
  const out = (k, v) => { const o = $(`[data-out="${k}"]`, root); if (o) o.textContent = v; };
  let sweeps = 0;
  const step = () => {
    a.metropolisSweep(ISING_TC);
    b.wolffSweep(ISING_TC);
    sweeps++;
    va.draw(a.s);
    vb.draw(b.s);
    trace.push(a.magnetization(), b.magnetization());
    out("sweeps", sweeps);
  };
  const loop = onScreenLoop(root, step, () => play.playing);
  play.onToggle(() => loop.kick());
  $('[data-act="reset"]', root).addEventListener("click", () => { b.s.set(a.s); trace.clear(); sweeps = 0; va.draw(a.s); vb.draw(b.s); });
  va.draw(a.s);
  vb.draw(b.s);
  window.addEventListener("resize", () => { va.resize(); vb.resize(); trace.resize(); va.draw(a.s); vb.draw(b.s); });
}

// ---------------------------------------------------------------- charts from the simulation data
async function dataCharts() {
  if (!$("#chart-binder")) return;
  const D = await (await fetch(document.body.dataset.csp)).json();
  const lColor = (series) => (L) => L_RAMP[series.map((s) => s.L).indexOf(L)];

  // Binder cumulant crossings
  {
    const host = $("#chart-binder");
    const build = (which) => {
      const S = which === "large" ? D.binder_large : D.binder_small, col = lColor(S);
      return {
        id: "binder",
        x: { label: "Temperature T", ...(which === "large" ? { domain: [1.4295, 1.4565] } : { domain: [1.18, 1.77] }) },
        y: { label: "Binder cumulant U₄" },
        series: S.map((s) => ({ label: `L = ${s.L}`, color: col(s.L), line: true, r: 3.5, points: s.T.map((T, k) => ({ x: T, y: s.y[k], e: s.e[k] })) })),
        refs: [{ axis: "x", value: which === "large" ? 1.443 : 1.444, band: which === "large" ? [1.442, 1.444] : undefined, label: which === "large" ? "Tc = 1.4430(10)" : "Tc ≈ 1.444" }],
      };
    };
    const c = chart($(".xp-plot", host), build("large"));
    segmented(host, "binder", (w) => c.update(build(w)));
  }

  // Finite-size scaling of m and chi at Tc
  const fssChart = (sel, key, ekey, label, slope, lit, litLabel) => {
    const pts = D.fss.map((r) => ({ x: r.L, y: r[key], e: r[ekey], inWin: r.L >= 48 }));
    const win = pts.filter((p) => p.inWin);
    const f = linfit(win.map((p) => Math.log(p.x)), win.map((p) => Math.log(p.y)), win.map((p) => (p.y / p.e) ** 2));
    const mid = Math.exp((Math.log(48) + Math.log(256)) / 2);
    const yMid = Math.exp(f.a + f.b * Math.log(mid));
    chart($(sel), {
      id: key,
      x: { label: "Lattice size L", log: true, domain: [3.5, 300], ticks: [4, 8, 16, 32, 64, 128, 256] },
      y: { label, log: true },
      series: [
        { label: "outside fit window", color: METRO, opacity: 0.35, points: pts.filter((p) => !p.inWin), hideLegend: false },
        { label: "fit window L ≥ 48", color: METRO, points: win },
        { label: `fit, slope ${f.b.toFixed(3)}`, color: METRO, fn: (L) => Math.exp(f.a + f.b * Math.log(L)), range: [40, 300] },
        { label: litLabel, color: INK_MUTED, dash: true, fn: (L) => yMid * Math.pow(L / mid, lit), range: [40, 300] },
      ],
      forceLegend: true,
    });
    return f.b;
  };
  fssChart("#chart-fss-m", "m", "me", "Magnetisation ⟨|m|⟩ at Tc", -0.508, -0.5188, "literature slope −0.519");
  fssChart("#chart-fss-chi", "chi", "chie", "Susceptibility χ at Tc", 1.991, 1.9625, "literature slope 1.963");

  // Data collapse playground
  {
    const host = $("#collapse-lab");
    const S = D.collapse, col = lColor(S);
    const nuIn = $('[data-ctl="nu"]', host), tcIn = $('[data-ctl="tc"]', host);
    const score = (Tc, nu) => {
      const pts = S.flatMap((s) => s.T.map((T, k) => [s.L, (T - Tc) * Math.pow(s.L, 1 / nu), s.y[k], s.e[k]]));
      let tot = 0, n = 0;
      for (const Lh of S.map((s) => s.L)) {
        const rest = pts.filter((p) => p[0] !== Lh).sort((p, q) => p[1] - q[1]);
        for (const [, x, y, e] of pts.filter((p) => p[0] === Lh)) {
          if (x < rest[0][1] || x > rest[rest.length - 1][1]) continue;
          let k = 1;
          while (rest[k][1] < x) k++;
          const [, x0, y0] = rest[k - 1], [, x1, y1] = rest[k];
          const yi = x1 === x0 ? y0 : y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
          tot += ((y - yi) / e) ** 2;
          n++;
        }
      }
      return tot / n;
    };
    const build = (Tc, nu) => ({
      id: "collapse",
      x: { label: "Scaling variable (T − Tc) · L^(1/ν)", domain: [-16, 16] },
      y: { label: "ξ / L", domain: [0, 1.75] },
      series: S.map((s) => ({ label: `L = ${s.L}`, color: col(s.L), r: 3.5, points: s.T.map((T, k) => ({ x: (T - Tc) * Math.pow(s.L, 1 / nu), y: s.y[k], e: s.e[k] })) })),
    });
    const c = chart($(".xp-plot", host), build(1.443, 0.7175));
    const refresh = () => {
      const nu = +nuIn.value, Tc = +tcIn.value, sc = score(Tc, nu);
      $('[data-out="nu"]', host).textContent = nu.toFixed(4);
      $('[data-out="tc"]', host).textContent = Tc.toFixed(4);
      $('[data-out="score"]', host).textContent = sc.toFixed(2);
      const q = $('[data-out="quality"]', host);
      q.textContent = sc < 2 ? "collapsed" : sc < 6 ? "close" : "not collapsed";
      q.dataset.q = sc < 2 ? "good" : sc < 6 ? "mid" : "bad";
      c.update(build(Tc, nu));
    };
    nuIn.addEventListener("input", refresh);
    tcIn.addEventListener("input", refresh);
    $$("[data-nu]", host).forEach((b) => b.addEventListener("click", () => { nuIn.value = b.dataset.nu; if (b.dataset.tc) tcIn.value = b.dataset.tc; refresh(); }));
    refresh();
  }

  // Correlation function at Tc
  {
    const S = D.corr.series, col = lColor(S), eta = D.corr.eta, k = 1 + eta;
    chart($("#chart-gr"), {
      id: "gr",
      x: { label: "Distance r (lattice units)", log: true, domain: [0.9, 70], ticks: [1, 2, 5, 10, 20, 50] },
      y: { label: "Correlation G(r)", log: true, domain: [0.006, 0.6] },
      series: [
        ...S.map((s) => ({ label: `L = ${s.L}`, color: col(s.L), r: 3, points: s.r.map((r, i) => ({ x: r, y: s.g[i], e: s.e[i] })) })),
        ...S.map((s) => ({ color: col(s.L), fn: (r) => s.A * (Math.pow(r, -k) + Math.pow(s.L - r, -k)) + s.B, range: [8, s.L / 2] })),
      ],
    });
    const Lt = 128;
    chart($("#chart-images"), {
      id: "img",
      height: 280,
      x: { label: "Separation r / L", domain: [0.01, 0.99] },
      y: { label: "G(r), schematic", log: true, domain: [0.004, 1.2] },
      series: [
        { label: "direct path  r^−(1+η)", color: METRO, dash: true, fn: (x) => Math.pow(x * Lt, -1.0375) },
        { label: "wrap-around path  (L − r)^−(1+η)", color: WOLFF, dash: true, fn: (x) => Math.pow((1 - x) * Lt, -1.0375) },
        { label: "what the box measures: the sum", color: AQUA, fn: (x) => Math.pow(x * Lt, -1.0375) + Math.pow((1 - x) * Lt, -1.0375) },
      ],
      forceLegend: true,
    });
  }

  // Critical isotherm
  {
    const I = D.isotherm, show = [32, 64, 128], ramp = [L_RAMP[0], L_RAMP[2], L_RAMP[4]];
    const S = I.series.filter((s) => show.includes(s.L));
    const d = I.delta, p = I.p;
    chart($("#chart-isotherm"), {
      id: "iso",
      x: { label: "External field h", log: true, domain: [0.004, 1.8], ticks: [0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1] },
      y: { label: "Magnetisation along the field Mz", log: true, domain: [0.13, 0.9], ticks: [0.15, 0.2, 0.3, 0.5, 0.7] },
      series: [
        ...S.map((s, i) => ({ label: `L = ${s.L}`, color: ramp[i], r: 3.5, points: s.h.map((h, k) => ({ x: h, y: s.y[k], e: s.e[k] })) })),
        ...S.map((s, i) => ({ color: ramp[i], fn: (h) => s.A * Math.pow(h, 1 / d) * (1 + s.B * Math.pow(h, p) + s.C * Math.pow(h, 2 * p)), range: [0.004, I.hmax] })),
        { label: "pure power law, literature δ = 4.783", color: INK_MUTED, dash: true, fn: (h) => 0.753 * Math.pow(h, 1 / 4.783), range: [0.004, 1.8] },
      ],
      refs: [{ axis: "x", band: [I.hmax, 1.8] }],
      notes: [{ x: 0.14, y: 0.17, text: "outside fit range (h > 0.1)" }],
    });
  }

  // Autocorrelation times
  {
    const M = D.tau.metropolis, Wf = D.tau.wolff.filter((r) => r.L >= 8);
    const f = linfit(M.map((r) => Math.log(r.L)), M.map((r) => Math.log(r.t)), M.map((r) => (r.t / r.e) ** 2));
    $('[data-out="zmetro"]')?.replaceChildren(f.b.toFixed(2));
    chart($("#chart-tau"), {
      id: "tau",
      x: { label: "Lattice size L", log: true, domain: [6, 300], ticks: [8, 16, 32, 64, 128, 256] },
      y: { label: "Autocorrelation time τ (sweeps)", log: true, domain: [0.6, 8000], ticks: [1, 10, 100, 1000] },
      series: [
        { label: "Metropolis", color: METRO, points: M.map((r) => ({ x: r.L, y: r.t, e: r.e })) },
        { label: `Metropolis fit τ ∝ L^${f.b.toFixed(2)}`, color: METRO, dash: true, fn: (L) => Math.exp(f.a + f.b * Math.log(L)), range: [12, 300], hideLegend: true },
        { label: "Wolff", color: WOLFF, points: Wf.map((r) => ({ x: r.L, y: r.t, e: r.e })) },
      ],
      notes: [{ x: 70, y: 2.6, text: "Wolff: about one sweep, at every size" }, { x: 70, y: 1500, text: "Metropolis: τ ∝ L^1.8", anchor: "end" }],
    });
  }

  // Pull plot: deviation from literature in units of the combined error
  {
    const rows = [
      ["Tc", 1.443, 0.001, 1.443, 0.0002],
      ["β/ν", 0.508, 0.012, 0.5188, 0.0003],
      ["γ/ν", 1.991, 0.03, 1.9625, 0.0005],
      ["ν", 0.7175, 0.0106, 0.7112, 0.0005],
      ["η", 0.036, 0.022, 0.0375, 0.0005],
      ["δ", 4.79, 0.09, 4.783, 0.003],
    ];
    const pts = rows.map(([name, v, e, l, le], i) => ({ x: (v - l) / Math.hypot(e, le), y: rows.length - i, name }));
    chart($("#chart-pull"), {
      id: "pull",
      height: 300,
      margin: { l: 58 },
      x: { label: "Deviation from literature (in standard errors)", domain: [-2.2, 2.2], ticks: [-2, -1, 0, 1, 2] },
      y: { label: "", domain: [0.4, rows.length + 0.6], ticks: rows.map((_, i) => rows.length - i), fmt: (v) => rows[rows.length - v][0] },
      series: [{ label: "this work", color: WOLFF, r: 5, points: pts }],
      refs: [{ axis: "x", band: [-1, 1] }, { axis: "x", value: 0 }],
      tooltip: (p) => `<b>${p.name}</b><br>${p.x >= 0 ? "+" : ""}${p.x.toFixed(2)}σ from literature`,
    });
  }
}

// ---------------------------------------------------------------- table of contents
function toc() {
  const nav = $("#xp-toc");
  if (!nav) return;
  const heads = $$(".xp-article h2[id]");
  nav.innerHTML = heads.map((h) => { const c = h.cloneNode(true); c.querySelector(".num")?.remove(); return `<a href="#${h.id}">${c.textContent.trim()}</a>`; }).join("");
  const links = $$("a", nav);
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-20% 0px -70% 0px" });
  heads.forEach((h) => io.observe(h));
}

serifGreek();
toc();
hero();
isingLab();
compare();
wolffGrow();
race();
dataCharts();
