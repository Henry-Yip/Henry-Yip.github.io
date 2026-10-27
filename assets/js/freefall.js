// Live figure for the plane-crash post: a fall from rest under quadratic drag, in an exponential atmosphere and with
// constant air density, integrated in the browser, and the closed-form speed v(h) checked against the numbers.
import { chart } from "/assets/explore/lib/plot.js";

const g = 9.81;
const OBJECTS = {
  skydiver: { label: "Skydiver", m: 80, k: 0.25 },        // k = (1/2) rho_0 c_d A at sea level, kg/m
  airliner: { label: "Airliner", m: 60000, k: 11 },
};
const EXP = "#2a78d6", CONST = "#eb6834";

// e^{-x} Ei(x) for x > 0: power series for moderate x, asymptotic series for large x
function scaledEi(x) {
  if (x < 40) {
    let sum = 0, term = 1;
    for (let n = 1; n < 400; n++) { term *= x / n; const t = term / n; sum += t; if (t < 1e-17 * sum) break; }
    return Math.exp(-x) * (0.5772156649015329 + Math.log(x) + sum);
  }
  let s = 1, t = 1;
  for (let n = 1; n < 40; n++) { const next = (t * n) / x; if (next > t) break; t = next; s += t; }
  return s / x;
}
// the boxed formula: v(h)^2 = 2gH e^{-y} [Ei(y) - Ei(y0)]
function speedFormula(h, h0, H, m, k) {
  const y = ((2 * k * H) / m) * Math.exp(-h / H), y0 = ((2 * k * H) / m) * Math.exp(-h0 / H);
  return Math.sqrt(Math.max(0, 2 * g * H * (scaledEi(y) - Math.exp(y0 - y) * scaledEi(y0))));
}
// m dv/dt = mg - k rho(h)/rho_0 v^2, dh/dt = -v, from rest at h0 until the ground; fourth-order Runge-Kutta
function fall(h0, H, m, k, constant) {
  const f = (h, v) => [-v, g - (k / m) * (constant ? 1 : Math.exp(-h / H)) * v * v];
  let t = 0, h = h0, v = 0;
  const dt = 0.05, out = [{ t, h, v }];
  while (h > 0 && t < 3600) {
    const a = f(h, v), b = f(h + 0.5 * dt * a[0], v + 0.5 * dt * a[1]), c = f(h + 0.5 * dt * b[0], v + 0.5 * dt * b[1]), d = f(h + dt * c[0], v + dt * c[1]);
    const hn = h + (dt / 6) * (a[0] + 2 * b[0] + 2 * c[0] + d[0]), vn = v + (dt / 6) * (a[1] + 2 * b[1] + 2 * c[1] + d[1]);
    if (hn <= 0) { const s = h / (h - hn); out.push({ t: t + s * dt, h: 0, v: v + s * (vn - v) }); break; }
    t += dt; h = hn; v = vn; out.push({ t, h, v });
  }
  return out;
}

function lab(root) {
  const $ = (s) => root.querySelector(s), out = (k) => root.querySelector(`[data-out="${k}"]`);
  let key = "skydiver", vt = null, va = null;
  const run = () => {
    const { m, k } = OBJECTS[key], h0 = +$('[data-ctl="h0"]').value * 1000, H = +$('[data-ctl="H"]').value * 1000;
    out("h0").textContent = (h0 / 1000).toFixed(1) + " km";
    out("H").textContent = (H / 1000).toFixed(1) + " km";
    const E = fall(h0, H, m, k, false), C = fall(h0, H, m, k, true), vT = Math.sqrt((m * g) / k);
    const every = (a, n) => a.filter((_, i) => i % n === 0 || i === a.length - 1);
    const tMax = Math.max(E[E.length - 1].t, C[C.length - 1].t), vMax = Math.max(...E.map((p) => p.v), ...C.map((p) => p.v));
    const step = Math.max(1, Math.round(E.length / 400));
    const timeSpec = {
      id: "fall-time", height: 330,
      x: { label: "time (s)", domain: [0, tMax] },
      y: { label: "speed (m/s)", domain: [0, 1.1 * vMax] },
      refs: [{ value: vT, axis: "y", label: `sea-level terminal velocity, ${vT.toFixed(0)} m/s`, below: true }],
      series: [
        { label: "exponential atmosphere", color: EXP, line: true, markers: false, points: every(E, step).map((p) => ({ x: p.t, y: p.v, h: p.h })) },
        { label: "constant density", color: CONST, line: true, markers: false, dash: true, points: every(C, step).map((p) => ({ x: p.t, y: p.v, h: p.h })) },
      ],
      tooltip: (p, se) => `<b>${se.label}</b><br>t = ${p.x.toFixed(1)} s: ${p.y.toFixed(1)} m/s at ${(p.h / 1000).toFixed(2)} km`,
    };
    // speed against altitude: the numerical solution and the closed-form v(h) every 500 m
    const marks = [];
    for (let h = h0 - 500; h >= 0; h -= 500) marks.push({ x: h / 1000, y: speedFormula(h, h0, H, m, k) });
    const altSpec = {
      id: "fall-alt", height: 330,
      x: { label: "altitude (km)", domain: [h0 / 1000, 0], ticks: Array.from({ length: Math.floor(h0 / 1000 / (h0 > 8000 ? 2 : 1)) + 1 }, (_, i) => i * (h0 > 8000 ? 2 : 1)) },
      y: { label: "speed (m/s)", domain: [0, 1.1 * vMax] },
      series: [
        { label: "numerical solution", color: EXP, line: true, markers: false, points: every(E, step).map((p) => ({ x: p.h / 1000, y: p.v })) },
        { label: "formula for v(h)", color: "#1c2230", r: 3.5, points: marks },
      ],
      tooltip: (p, se) => `<b>${se.label}</b><br>${p.x.toFixed(2)} km: ${p.y.toFixed(1)} m/s`,
    };
    if (vt) vt.update(timeSpec); else vt = chart($(".ff-time"), timeSpec);
    if (va) va.update(altSpec); else va = chart($(".ff-alt"), altSpec);
    const last = (a) => a[a.length - 1], peak = E.reduce((a, p) => (p.v > a.v ? p : a), E[0]);
    out("tE").textContent = `${last(E).t.toFixed(0)} s`;
    out("tC").textContent = `${last(C).t.toFixed(0)} s`;
    out("vE").textContent = `${last(E).v.toFixed(0)} m/s`;
    out("peak").textContent = `${peak.v.toFixed(0)} m/s at ${(peak.h / 1000).toFixed(1)} km`;
    // worst disagreement between the formula and the numerical solution
    let worst = 0;
    for (const p of E) if (p.h < h0 - 1) worst = Math.max(worst, Math.abs(speedFormula(p.h, h0, H, m, k) - p.v) / Math.max(p.v, 1e-9));
    out("check").textContent = worst < 1e-4 ? "agree to better than 0.01 %" : `agree to ${(100 * worst).toFixed(2)} %`;
  };
  root.querySelectorAll("[data-obj]").forEach((b) => b.addEventListener("click", () => {
    key = b.dataset.obj;
    root.querySelectorAll("[data-obj]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    run();
  }));
  root.querySelectorAll("input[type=range]").forEach((s) => s.addEventListener("input", run));
  run();
}

const root = document.getElementById("fall-lab");
if (root) lab(root);
