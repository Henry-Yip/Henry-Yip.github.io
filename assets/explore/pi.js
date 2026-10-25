// Interactive figures for the potential-intensity explainer. All inputs are synthetic or idealised.
import { onScreenLoop, reducedMotion, oklchToRgb } from "./lib/viz.js";
import { chart } from "./lib/plot.js";
import { serifGreek } from "./lib/greek.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const BLUE = "#3987e5", ORANGE = "#d95926", AQUA = "#199e70", INK_MUTED = "#8b94a3";

// ---------------------------------------------------------------- thermodynamics
const LV = 2.5e6, CP = 1005, EPS = 0.622, RD = 287.04, G = 9.81;
const esat = (Tc) => 6.112 * Math.exp((17.67 * Tc) / (Tc + 243.5)); // hPa (Bolton 1980)
const qsat = (Tc, p = 1015) => { const e = esat(Tc); return (EPS * e) / (p - 0.378 * e); };

// Emanuel's enthalpy form: V^2 = (Ck/Cd) (Ts - To)/To (k0* - k), boundary-layer air dT cooler than the sea.
export function potentialIntensity({ sst, tout, rh, ckcd, dT = 1 }) {
  const Ts = sst + 273.15, To = tout + 273.15, Ta = sst - dT;
  const dk = CP * dT + LV * (qsat(sst) - rh * qsat(Ta));
  const eff = (Ts - To) / To;
  return { V: Math.sqrt(Math.max(0, ckcd * eff * dk)), eff, carnot: (Ts - To) / Ts, dk };
}

const category = (v) => (v >= 70 ? "Category 5" : v >= 58 ? "Category 4" : v >= 50 ? "Category 3" : v >= 43 ? "Category 2" : v >= 33 ? "Category 1" : "below hurricane strength");

// Sequential colour ramp for temperature-like fields (one hue, darker = colder on the dark surface).
const ramp = (t) => {
  const [r, g, b] = oklchToRgb(0.34 + 0.56 * Math.max(0, Math.min(1, t)), 0.13, 48);
  return `rgb(${r},${g},${b})`;
};
const coldWarm = (t) => {
  // height colouring for the heat-engine animation: warm low, cold high
  const [r, g, b] = oklchToRgb(0.72, 0.13, 45 + 200 * t);
  return `rgb(${r},${g},${b})`;
};

// ---------------------------------------------------------------- hero: the heat engine
function heatEngine() {
  const c = $("#hero-engine");
  if (!c) return;
  const ctx = c.getContext("2d");
  let W, H;
  const size = () => {
    const r = c.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    W = c.width = Math.round(r.width * d);
    H = c.height = Math.round(r.height * d);
  };
  size();
  // closed circulation path in (x, y) fractions of the canvas
  const path = [
    [0.93, 0.8], [0.7, 0.81], [0.5, 0.815], [0.33, 0.82], [0.25, 0.81],   // 1: inflow along the sea surface
    [0.23, 0.7], [0.24, 0.55], [0.26, 0.4], [0.3, 0.27], [0.36, 0.2],      // 2: ascent in the eyewall
    [0.5, 0.18], [0.7, 0.18], [0.9, 0.19],                                 // 3: outflow near the tropopause
    [0.93, 0.35], [0.94, 0.55], [0.935, 0.72],                             // 4: slow descent far from the centre
  ];
  const seg = [], lens = [];
  let total = 0;
  for (let i = 0; i < path.length; i++) {
    const a = path[i], b = path[(i + 1) % path.length];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    seg.push([a, b]); lens.push(l); total += l;
  }
  const at = (s) => {
    s = ((s % total) + total) % total;
    for (let i = 0; i < seg.length; i++) {
      if (s <= lens[i]) { const [a, b] = seg[i], f = s / lens[i]; return [a[0] + f * (b[0] - a[0]), a[1] + f * (b[1] - a[1])]; }
      s -= lens[i];
    }
    return path[0];
  };
  const N = 150;
  const parts = Array.from({ length: N }, (_, i) => (i / N) * total);
  const labels = [
    { x: 0.6, y: 0.875, t: "① inflow: heat taken from the ocean at Tₛ" },
    { x: 0.035, y: 0.5, t: "② eyewall ascent", rot: true },
    { x: 0.6, y: 0.135, t: "③ outflow: heat lost to space at Tₒ" },
    { x: 0.975, y: 0.5, t: "④ slow descent", rot: true, right: true },
  ];
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#0d1220"); sky.addColorStop(0.8, "#121a28"); sky.addColorStop(1, "#0f2236");
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // ocean
    ctx.fillStyle = "#123150";
    ctx.beginPath(); ctx.moveTo(0, 0.85 * H);
    for (let x = 0; x <= W; x += W / 60) ctx.lineTo(x, 0.85 * H + Math.sin(x / (W / 18) + performance.now() / 900) * H * 0.004);
    ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
    // tropopause
    ctx.setLineDash([6, 6]); ctx.strokeStyle = "rgba(185,193,205,0.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, 0.15 * H); ctx.lineTo(W, 0.15 * H); ctx.stroke(); ctx.setLineDash([]);
    // eyewall cloud
    const cloud = ctx.createLinearGradient(0.18 * W, 0, 0.4 * W, 0);
    cloud.addColorStop(0, "rgba(220,228,240,0.0)"); cloud.addColorStop(0.35, "rgba(220,228,240,0.14)"); cloud.addColorStop(1, "rgba(220,228,240,0.0)");
    ctx.fillStyle = cloud;
    ctx.beginPath(); ctx.moveTo(0.2 * W, 0.83 * H); ctx.quadraticCurveTo(0.2 * W, 0.4 * H, 0.33 * W, 0.17 * H); ctx.lineTo(0.55 * W, 0.17 * H); ctx.quadraticCurveTo(0.34 * W, 0.45 * H, 0.33 * W, 0.83 * H); ctx.fill();
    // eye axis
    ctx.strokeStyle = "rgba(185,193,205,0.25)"; ctx.setLineDash([2, 5]);
    ctx.beginPath(); ctx.moveTo(0.13 * W, 0.15 * H); ctx.lineTo(0.13 * W, 0.85 * H); ctx.stroke(); ctx.setLineDash([]);
    // particles
    for (let i = 0; i < N; i++) {
      const [x, y] = at(parts[i]);
      const height = Math.max(0, Math.min(1, (0.82 - y) / 0.64));
      ctx.fillStyle = coldWarm(height);
      ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.arc(x * W, y * H, Math.max(1.5, W * 0.0055), 0, 2 * Math.PI); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // labels
    ctx.fillStyle = "#b9c1cd";
    ctx.font = `${Math.round(W * 0.026)}px Inter, system-ui, sans-serif`;
    for (const l of labels) {
      ctx.save();
      ctx.translate(l.x * W, l.y * H);
      if (l.rot) ctx.rotate(l.right ? Math.PI / 2 : -Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText(l.t, 0, 0);
      ctx.restore();
    }
    ctx.fillStyle = "#8b94a3";
    ctx.font = `${Math.round(W * 0.022)}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText("tropopause, about 15 km", 0.03 * W, 0.135 * H);
    ctx.fillText("eye", 0.13 * W + 6, 0.6 * H);
  };
  draw();
  if (reducedMotion) return;
  onScreenLoop(c, () => {
    for (let i = 0; i < N; i++) {
      const [x, y] = at(parts[i]);
      // fast in the inflow and eyewall, slow in the outer descent
      parts[i] += total * (x > 0.85 && y > 0.25 ? 0.0006 : 0.0019);
    }
    draw();
  });
  window.addEventListener("resize", () => { size(); draw(); });
}

// ---------------------------------------------------------------- potential intensity calculator
function calculator() {
  const root = $("#pi-calc");
  if (!root) return;
  const ctl = (k) => $(`[data-ctl="${k}"]`, root);
  const out = (k, v) => { const o = $(`[data-out="${k}"]`, root); if (o) o.textContent = v; };
  const read = () => ({ sst: +ctl("sst").value, tout: +ctl("tout").value, rh: +ctl("rh").value / 100, ckcd: +ctl("ckcd").value });
  const host = $(".xp-plot", root);
  let plot = null;
  const update = () => {
    const p = read(), r = potentialIntensity(p);
    out("sst", p.sst.toFixed(1) + " °C");
    out("tout", p.tout.toFixed(0) + " °C");
    out("rh", (p.rh * 100).toFixed(0) + " %");
    out("ckcd", p.ckcd.toFixed(2));
    out("carnot", (100 * r.carnot).toFixed(0) + " %");
    out("dk", (r.dk / 1000).toFixed(1) + " kJ/kg");
    out("V", r.V.toFixed(0) + " m/s");
    out("V10", (0.8 * r.V).toFixed(0) + " m/s");
    out("cat", category(0.8 * r.V));
    const spec = {
      id: "picurve",
      height: 440,
      x: { label: "Sea surface temperature (°C)", domain: [24, 32] },
      y: { label: "Potential intensity (m/s)", domain: [0, 130] },
      series: [
        { label: "gradient-level wind", color: BLUE, fn: (s) => potentialIntensity({ ...p, sst: s }).V },
        { label: "≈ 10 m wind (× 0.8)", color: ORANGE, fn: (s) => 0.8 * potentialIntensity({ ...p, sst: s }).V },
        { label: "current settings", color: ORANGE, r: 5, points: [{ x: p.sst, y: 0.8 * r.V }], hideLegend: true },
      ],
      refs: [{ axis: "y", value: 33, label: "Category 1" }, { axis: "y", value: 70, label: "Category 5", below: true }],
      forceLegend: true,
      tooltip: (pt) => `SST ${pt.x.toFixed(1)} °C<br>≈ 10 m wind ${pt.y.toFixed(0)} m/s`,
    };
    if (plot) plot.update(spec); else plot = chart(host, spec);
  };
  $$("input", root).forEach((i) => i.addEventListener("input", update));
  update();
}

// ---------------------------------------------------------------- ERA5 pressure levels with an idealised tropical profile
function era5Levels() {
  const host = $("#era5-levels");
  if (!host) return;
  const LEVELS = [1, 2, 3, 5, 7, 10, 20, 30, 50, 70, 100, 125, 150, 175, 200, 225, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 775, 800, 825, 850, 875, 900, 925, 950, 975, 1000];
  // troposphere: saturated pseudo-adiabat from 1000 hPa and 26 °C; stratosphere: idealised tropical values
  const prof = [];
  let T = 299.15, p = 1000;
  const strat = [[100, 193], [70, 198], [50, 206], [30, 215], [10, 228], [5, 242], [2, 257], [1, 265]];
  const dp = -1;
  while (p > 100) {
    const Tc = T - 273.15, es = esat(Tc), rs = (EPS * es) / (p - es);
    const dTdp = ((RD * T + LV * rs) / (CP + (LV * LV * rs * EPS) / (RD * T * T))) / p;
    prof.push([p, T]);
    T += dTdp * dp;
    p += dp;
  }
  const Ttrop = T;
  const Tstrat = (pp) => {
    if (pp >= 100) return Ttrop;
    for (let i = 0; i < strat.length - 1; i++) {
      const [p0, T0] = strat[i], [p1, T1] = strat[i + 1];
      if (pp <= p0 && pp >= p1) { const f = Math.log(p0 / pp) / Math.log(p0 / p1); return (i === 0 ? Ttrop : T0) + f * (T1 - (i === 0 ? Ttrop : T0)); }
    }
    return strat[strat.length - 1][1];
  };
  // prof[k] holds the pseudo-adiabat at p = 1000 - k hPa
  const Tof = (pp) => (pp >= 100 ? prof[Math.min(prof.length - 1, Math.round(1000 - pp))][1] : Tstrat(pp));
  // heights from the hypsometric equation, accumulated once in 1 hPa steps
  const zAt = new Float64Array(1001);
  for (let q = 1000; q > 1; q--) zAt[q - 1] = zAt[q] + ((RD * Tof(q - 0.5)) / G) * Math.log(q / (q - 1));
  const height = (pp) => zAt[Math.round(pp)];
  const pts = LEVELS.map((lv) => ({ x: Tof(lv) - 273.15, y: lv, z: height(lv) }));
  const line = [];
  for (let q = 1000; q >= 1; q *= 0.97) line.push({ x: Tof(q) - 273.15, y: q });
  chart(host, {
    id: "levels",
    height: 460,
    x: { label: "Temperature (°C), idealised tropical profile", domain: [-90, 30] },
    y: { label: "Pressure (hPa)", log: true, domain: [1000, 1], ticks: [1000, 700, 500, 300, 200, 100, 50, 20, 10, 5, 2, 1] },
    series: [
      { label: "temperature", color: INK_MUTED, line: true, markers: false, points: line, hideLegend: true },
      { label: "ERA5 pressure level", color: BLUE, r: 4, points: pts.filter((q) => q.y > 200 || q.y <= 70) },
      { label: "outflow region (≈ 100–200 hPa)", color: ORANGE, r: 4, points: pts.filter((q) => q.y <= 200 && q.y > 70) },
    ],
    forceLegend: true,
    tooltip: (q) => `<b>${q.y} hPa</b><br>about ${(q.z / 1000).toFixed(1)} km<br>${q.x.toFixed(0)} °C in this profile`,
  });
}

// ---------------------------------------------------------------- conservative remapping demo
function remap() {
  const root = $("#remap");
  if (!root) return;
  const D = 6, F = 0.5, NF = D / F;
  const isLand = (x, y) => y > 4.35 - 0.55 * Math.sin(1.1 * x) - 0.12 * x;
  const sstField = (x, y, eddy) => 27.2 + 0.35 * x - 0.18 * y + (eddy ? 1.6 * Math.exp(-((x - 2.75) ** 2 + (y - 3.05) ** 2) / (2 * 0.28 ** 2)) : 0);
  let res = 1.0, eddy = true;
  const fine = () => {
    const cells = [];
    for (let j = 0; j < NF; j++)
      for (let i = 0; i < NF; i++) {
        const x = (i + 0.5) * F, y = (j + 0.5) * F, land = isLand(x, y);
        cells.push({ i, j, land, v: land ? null : sstField(x, y, eddy) });
      }
    return cells;
  };
  const coarse = (fc) => {
    const NC = Math.round(D / res), out = [];
    const ov = (a0, a1, b0, b1) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));
    for (let J = 0; J < NC; J++)
      for (let I = 0; I < NC; I++) {
        let num = 0, den = 0, landArea = 0;
        for (const c of fc) {
          const a = ov(I * res, (I + 1) * res, c.i * F, (c.i + 1) * F) * ov(J * res, (J + 1) * res, c.j * F, (c.j + 1) * F);
          if (!a) continue;
          if (c.land) landArea += a; else { num += a * c.v; den += a; }
        }
        out.push({ I, J, v: den ? num / den : null, mixed: den > 0 && landArea > 0, land: den === 0 });
      }
    return { NC, out };
  };
  const vmin = 26.6, vmax = 30.4;
  const paint = (canvas, n, cells, getIJ) => {
    const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(r.width * d); canvas.height = Math.round(r.width * d);
    const ctx = canvas.getContext("2d"), k = canvas.width / n;
    for (const c of cells) {
      const [i, j] = getIJ(c);
      ctx.fillStyle = c.v === null ? "#2a3140" : ramp((c.v - vmin) / (vmax - vmin));
      ctx.fillRect(i * k, (n - 1 - j) * k, k + 0.5, k + 0.5);
    }
    ctx.strokeStyle = "rgba(11,14,20,0.6)"; ctx.lineWidth = 1;
    for (let q = 1; q < n; q++) {
      ctx.beginPath(); ctx.moveTo(Math.round(q * k) + 0.5, 0); ctx.lineTo(Math.round(q * k) + 0.5, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, Math.round(q * k) + 0.5); ctx.lineTo(canvas.width, Math.round(q * k) + 0.5); ctx.stroke();
    }
    for (const c of cells) {
      if (!c.mixed) continue;
      const [i, j] = getIJ(c);
      ctx.strokeStyle = "#ffffff"; ctx.lineWidth = Math.max(2, k * 0.06);
      ctx.setLineDash([k * 0.12, k * 0.08]);
      ctx.strokeRect(i * k + ctx.lineWidth, (n - 1 - j) * k + ctx.lineWidth, k - 2 * ctx.lineWidth, k - 2 * ctx.lineWidth);
      ctx.setLineDash([]);
    }
  };
  const update = () => {
    const fc = fine(), cc = coarse(fc);
    paint($("canvas.xp-fine", root), NF, fc, (c) => [c.i, c.j]);
    paint($("canvas.xp-coarse", root), cc.NC, cc.out, (c) => [c.I, c.J]);
    const fmax = Math.max(...fc.filter((c) => c.v !== null).map((c) => c.v));
    const cmax = Math.max(...cc.out.filter((c) => c.v !== null).map((c) => c.v));
    $('[data-out="fmax"]', root).textContent = fmax.toFixed(2) + " °C";
    $('[data-out="cmax"]', root).textContent = cmax.toFixed(2) + " °C";
    $('[data-out="mixed"]', root).textContent = cc.out.filter((c) => c.mixed).length;
    $('[data-out="res"]', root).textContent = res + "°";
  };
  $$("[data-res]", root).forEach((b) => b.addEventListener("click", () => { $$("[data-res]", root).forEach((o) => o.setAttribute("aria-pressed", o === b)); res = +b.dataset.res; update(); }));
  $$("[data-eddy]", root).forEach((b) => b.addEventListener("click", () => { $$("[data-eddy]", root).forEach((o) => o.setAttribute("aria-pressed", o === b)); eddy = b.dataset.eddy === "on"; update(); }));
  update();
  window.addEventListener("resize", update);
}

// ---------------------------------------------------------------- temporal averaging demo
function temporal() {
  const root = $("#temporal-lab");
  if (!root) return;
  const n = 240, dt = 3; // 30 days of 3-hourly values
  const bump = (t, t0, w) => Math.exp(-(((t - t0) / w) ** 2));
  const inputs = Array.from({ length: n }, (_, k) => {
    const day = (k * dt) / 24;
    return {
      day,
      sst: 28.6 + 0.12 * Math.sin(2 * Math.PI * day) + 0.9 * bump(day, 12, 0.9) - 0.6 * bump(day, 21, 2.5),
      tout: -74 + 1.5 * Math.sin((2 * Math.PI * day) / 9) - 2.5 * bump(day, 12.2, 0.6),
      rh: 0.8 - 0.05 * bump(day, 12, 0.9) + 0.015 * Math.sin(2 * Math.PI * day + 1),
      ckcd: 0.9,
    };
  });
  const piOf = (q) => potentialIntensity(q).V;
  const raw = inputs.map((q) => ({ x: q.day, y: piOf(q) }));
  const slider = $('[data-ctl="w"]', root);
  const WINDOWS = [1, 2, 8, 24, 80, 240]; // in 3-hour steps
  const host = $(".xp-plot", root);
  let plot = null;
  const update = () => {
    const w = WINDOWS[+slider.value];
    const ref = [], cut = [];
    let gap = 0;
    for (let s = 0; s + w <= n; s += w) {
      const win = inputs.slice(s, s + w);
      const meanPI = win.reduce((a, q) => a + piOf(q), 0) / w;
      const avg = { sst: 0, tout: 0, rh: 0, ckcd: 0.9 };
      for (const q of win) { avg.sst += q.sst / w; avg.tout += q.tout / w; avg.rh += q.rh / w; }
      const x0 = win[0].day, x1 = win[w - 1].day + dt / 24, avgPI = piOf(avg);
      ref.push({ x: x0, y: meanPI }, { x: x1, y: meanPI });
      cut.push({ x: x0, y: avgPI }, { x: x1, y: avgPI });
      gap = Math.max(gap, Math.abs(meanPI - avgPI));
    }
    const hours = w * dt;
    $('[data-out="w"]', root).textContent = hours >= 24 ? `${hours / 24} day${hours > 24 ? "s" : ""}` : `${hours} h`;
    const peak = Math.max(...raw.map((p) => p.y)), rp = Math.max(...ref.map((p) => p.y));
    $('[data-out="peak"]', root).textContent = peak.toFixed(1) + " m/s";
    $('[data-out="ref"]', root).textContent = rp.toFixed(1) + " m/s";
    $('[data-out="cut"]', root).textContent = gap.toFixed(2) + " m/s";
    const spec = {
      id: "temporal",
      height: 320,
      x: { label: "Day of the month", domain: [0, 30] },
      y: { label: "Potential intensity (m/s)", domain: [76, 100] },
      series: [
        { label: "3-hourly", color: BLUE, line: true, markers: false, points: raw },
        { label: "average of PI (compute first)", color: ORANGE, line: true, markers: false, points: ref },
        { label: "PI of averaged inputs (average first)", color: AQUA, line: true, dash: true, markers: false, points: cut },
      ],
      tooltip: (p, se) => `<b>${se.label}</b><br>day ${p.x.toFixed(1)}: ${p.y.toFixed(2)} m/s`,
    };
    if (plot) plot.update(spec); else plot = chart(host, spec);
  };
  slider.addEventListener("input", update);
  update();
}

// ---------------------------------------------------------------- table of contents (shared pattern)
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
heatEngine();
calculator();
era5Levels();
remap();
temporal();
