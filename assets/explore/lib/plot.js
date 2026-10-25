// Small SVG chart library for the explorable pages: linear/log axes, points with
// error bars, lines and fitted curves, reference lines, legend, hover tooltip and a table view.

const NS = "http://www.w3.org/2000/svg";

const el = (tag, attrs = {}, parent) => {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (parent) parent.appendChild(n);
  return n;
};

function niceTicks(min, max, count = 5) {
  const span = max - min;
  const step0 = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= count) || 10 * mag;
  const ticks = [];
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-9; v += step) ticks.push(+v.toPrecision(12));
  return ticks;
}

function logTicks(min, max) {
  const ticks = [];
  for (let e = Math.floor(Math.log10(min)); e <= Math.ceil(Math.log10(max)); e++)
    for (const m of [1, 2, 5]) {
      const v = m * Math.pow(10, e);
      if (v >= min * 0.999 && v <= max * 1.001) ticks.push(v);
    }
  return ticks;
}

const fmtTick = (v) => {
  if (v === 0) return "0";
  const a = Math.abs(v);
  if (a >= 1e4 || a < 1e-3) return v.toExponential(0).replace("e+", "e");
  return String(+v.toPrecision(4));
};

// Set SVG text, putting Greek letters in the serif face so that ν is not mistaken for v.
function setText(node, str) {
  node.textContent = "";
  for (const part of String(str).split(/([\u0370-\u03ff])/)) {
    if (!part) continue;
    if (/[\u0370-\u03ff]/.test(part)) el("tspan", { class: "gr" }, node).textContent = part;
    else node.appendChild(document.createTextNode(part));
  }
}

export function chart(container, spec) {
  const W = Math.round(Math.max(340, Math.min(760, container.clientWidth || 640)));
  const H = Math.round((spec.height || 340) * Math.min(1, Math.max(0.78, W / 640)));
  const m = { l: 58, r: 18, t: 14, b: 46, ...(spec.margin || {}) };
  container.classList.add("xp-chart");
  container.innerHTML = "";

  const legend = document.createElement("div");
  legend.className = "xp-legend";
  container.appendChild(legend);

  const wrap = document.createElement("div");
  wrap.className = "xp-chart-wrap";
  container.appendChild(wrap);
  const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": spec.title || "Chart" });
  wrap.appendChild(svg);
  const tip = document.createElement("div");
  tip.className = "xp-tip";
  wrap.appendChild(tip);

  const table = document.createElement("details");
  table.className = "xp-table";
  container.appendChild(table);

  let state = spec;
  let sx, sy, pts;

  function render(s) {
    state = s;
    svg.innerHTML = "";
    const all = s.series.flatMap((se) => (se.points || []).filter((p) => isFinite(p.x) && isFinite(p.y)));
    const xd = s.x.domain || [Math.min(...all.map((p) => p.x)), Math.max(...all.map((p) => p.x))];
    const yd = s.y.domain || [Math.min(...all.map((p) => p.y - (p.e || 0))), Math.max(...all.map((p) => p.y + (p.e || 0)))];
    const scale = (ax, d, r0, r1) => {
      if (ax.log) {
        const a = Math.log10(d[0]), b = Math.log10(d[1]);
        return (v) => r0 + ((Math.log10(v) - a) / (b - a)) * (r1 - r0);
      }
      return (v) => r0 + ((v - d[0]) / (d[1] - d[0])) * (r1 - r0);
    };
    sx = scale(s.x, xd, m.l, W - m.r);
    sy = scale(s.y, yd, H - m.b, m.t);

    // grid and ticks
    const g = el("g", { class: "xp-axis" }, svg);
    const xt = s.x.ticks || (s.x.log ? logTicks(...xd) : niceTicks(...xd, 6));
    const yt = s.y.ticks || (s.y.log ? logTicks(...yd) : niceTicks(...yd, 5));
    for (const v of yt) {
      const y = sy(v);
      el("line", { x1: m.l, x2: W - m.r, y1: y, y2: y, class: "xp-grid" }, g);
      setText(el("text", { x: m.l - 8, y: y + 4, "text-anchor": "end", class: "xp-tick" }, g), (s.y.fmt || fmtTick)(v));
    }
    for (const v of xt) {
      const x = sx(v);
      el("line", { x1: x, x2: x, y1: m.t, y2: H - m.b, class: "xp-grid" }, g);
      setText(el("text", { x, y: H - m.b + 18, "text-anchor": "middle", class: "xp-tick" }, g), (s.x.fmt || fmtTick)(v));
    }
    el("line", { x1: m.l, x2: W - m.r, y1: H - m.b, y2: H - m.b, class: "xp-base" }, g);
    setText(el("text", { x: (m.l + W - m.r) / 2, y: H - 8, "text-anchor": "middle", class: "xp-label" }, g), s.x.label || "");
    const yl = el("text", { x: 14, y: (m.t + H - m.b) / 2, "text-anchor": "middle", class: "xp-label", transform: `rotate(-90 14 ${(m.t + H - m.b) / 2})` }, g);
    setText(yl, s.y.label || "");

    const clip = el("clipPath", { id: (s.id || "c") + "-clip" }, svg);
    el("rect", { x: m.l, y: m.t, width: W - m.l - m.r, height: H - m.t - m.b }, clip);
    const plot = el("g", { "clip-path": `url(#${(s.id || "c")}-clip)` }, svg);

    // reference bands and lines
    for (const r of s.refs || []) {
      if (r.band) {
        const [a, b] = r.band;
        if (r.axis === "x") el("rect", { x: sx(a), y: m.t, width: sx(b) - sx(a), height: H - m.t - m.b, class: "xp-band" }, plot);
        else el("rect", { x: m.l, y: sy(b), width: W - m.l - m.r, height: sy(a) - sy(b), class: "xp-band" }, plot);
      }
      if (r.value !== undefined) {
        if (r.axis === "x") el("line", { x1: sx(r.value), x2: sx(r.value), y1: m.t, y2: H - m.b, class: "xp-ref" }, plot);
        else el("line", { x1: m.l, x2: W - m.r, y1: sy(r.value), y2: sy(r.value), class: "xp-ref" }, plot);
        if (r.label) {
          const t = r.axis === "x"
            ? el("text", { x: sx(r.value) + 6, y: m.t + 14, class: "xp-reflabel" }, svg)
            : el("text", { x: W - m.r - 6, y: sy(r.value) + (r.below ? 14 : -6), "text-anchor": "end", class: "xp-reflabel" }, svg);
          setText(t, r.label);
        }
      }
    }

    // curves
    for (const se of s.series) {
      if (!se.fn) continue;
      const [a, b] = se.range || xd;
      const n = 160, d = [];
      for (let k = 0; k <= n; k++) {
        const x = s.x.log ? a * Math.pow(b / a, k / n) : a + ((b - a) * k) / n;
        const y = se.fn(x);
        if (isFinite(y) && (!s.y.log || y > 0)) d.push(`${d.length ? "L" : "M"}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
      }
      el("path", { d: d.join(""), class: "xp-curve" + (se.dash ? " xp-dash" : ""), stroke: se.color, "stroke-opacity": se.opacity ?? 1 }, plot);
    }

    // points, error bars and joining lines
    pts = [];
    for (const se of s.series) {
      if (!se.points) continue;
      const P = se.points.filter((p) => isFinite(p.x) && isFinite(p.y) && (!s.y.log || p.y > 0) && (!s.x.log || p.x > 0));
      const op = se.opacity ?? 1;
      if (se.line) {
        const d = P.map((p, k) => `${k ? "L" : "M"}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join("");
        el("path", { d, class: "xp-line" + (se.dash ? " xp-dash" : ""), stroke: se.color, "stroke-opacity": op }, plot);
      }
      for (const p of P) {
        const x = sx(p.x), y = sy(p.y);
        if (p.e) {
          const lo = s.y.log ? Math.max(p.y - p.e, yd[0]) : p.y - p.e;
          el("line", { x1: x, x2: x, y1: sy(lo), y2: sy(p.y + p.e), class: "xp-err", stroke: se.color, "stroke-opacity": 0.7 * op }, plot);
        }
        if (se.markers !== false) el("circle", { cx: x, cy: y, r: se.r || 4, fill: se.color, class: "xp-dot", "fill-opacity": op }, plot);
        pts.push({ x, y, p, se });
      }
    }

    // annotations (text in ink colours)
    for (const a of s.notes || []) {
      setText(el("text", { x: sx(a.x), y: sy(a.y), "text-anchor": a.anchor || "start", class: "xp-note" }, svg), a.text);
    }

    // legend: swatch beside ink-coloured text
    legend.innerHTML = "";
    const named = s.series.filter((se) => se.label && !se.hideLegend);
    if (named.length > 1 || s.forceLegend) {
      for (const se of named) {
        const item = document.createElement("span");
        item.className = "xp-legend-item";
        const asLine = (se.fn && !se.points) || (se.line && se.markers === false);
        item.innerHTML = `<i class="${asLine ? "line" + (se.dash ? " dash" : "") : "dot"}" style="--c:${se.color}"></i>${se.label}`;
        legend.appendChild(item);
      }
    }

    // table view
    const rows = s.series.filter((se) => se.points && se.label).flatMap((se) => se.points.map((p) => [se.label, p.x, p.y, p.e]));
    table.innerHTML = `<summary>Show data table</summary><div class="xp-table-scroll"><table><thead><tr><th>Series</th><th>${s.x.label || "x"}</th><th>${s.y.label || "y"}</th><th>± error</th></tr></thead><tbody>${rows
      .map((r) => `<tr><td>${r[0]}</td><td>${fmtNum(r[1])}</td><td>${fmtNum(r[2])}</td><td>${r[3] ? fmtNum(r[3]) : ""}</td></tr>`)
      .join("")}</tbody></table></div>`;
  }

  const fmtNum = (v) => (v === undefined || v === null ? "" : Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-3 && v !== 0) ? v.toExponential(3) : String(+v.toPrecision(5)));

  // hover: nearest point within reach
  const hit = el("rect", { x: 0, y: 0, width: W, height: H, fill: "transparent" });
  const showTip = (evt) => {
    const box = svg.getBoundingClientRect();
    const px = ((evt.clientX - box.left) / box.width) * W, py = ((evt.clientY - box.top) / box.height) * H;
    let best = null, bd = 28 * 28;
    for (const q of pts) {
      const d = (q.x - px) ** 2 + (q.y - py) ** 2;
      if (d < bd) { bd = d; best = q; }
    }
    svg.querySelectorAll(".xp-hl").forEach((n) => n.remove());
    if (!best) { tip.style.opacity = 0; return; }
    el("circle", { cx: best.x, cy: best.y, r: 7, class: "xp-hl", stroke: best.se.color }, svg);
    const f = state.tooltip || ((p, se) => `<b>${se.label || ""}</b><br>${state.x.label}: ${fmtNum(p.x)}<br>${state.y.label}: ${fmtNum(p.y)}${p.e ? " ± " + fmtNum(p.e) : ""}`);
    tip.innerHTML = f(best.p, best.se);
    const left = (best.x / W) * box.width, top = (best.y / H) * box.height;
    tip.style.left = Math.min(left + 12, box.width - 170) + "px";
    tip.style.top = Math.max(top - 10, 0) + "px";
    tip.style.opacity = 1;
  };
  svg.addEventListener("pointermove", showTip);
  svg.addEventListener("pointerleave", () => { tip.style.opacity = 0; svg.querySelectorAll(".xp-hl").forEach((n) => n.remove()); });

  render(spec);
  svg.appendChild(hit);
  return {
    update(next) {
      render({ ...state, ...next });
      svg.appendChild(hit);
    },
  };
}

// Weighted least-squares straight line y = a + b x; returns {a, b}.
export function linfit(xs, ys, ws) {
  let S = 0, Sx = 0, Sy = 0, Sxx = 0, Sxy = 0;
  xs.forEach((x, i) => {
    const w = ws ? ws[i] : 1;
    S += w; Sx += w * x; Sy += w * ys[i]; Sxx += w * x * x; Sxy += w * x * ys[i];
  });
  const b = (S * Sxy - Sx * Sy) / (S * Sxx - Sx * Sx);
  return { a: (Sy - b * Sx) / S, b };
}
