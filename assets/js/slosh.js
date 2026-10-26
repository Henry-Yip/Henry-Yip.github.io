// Animations of the two liquid-slosh models on the ESRA project page.
(function () {
  "use strict";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var COL = { wall: "#2b3443", liquid: "#d3e6f8", surface: "#1d5fae", rod: "#6b7483", bob1: "#0a8f99", bob2: "#d9661f", faint: "#c3cad4", text: "#3b4352" };

  function fitCanvas(canvas, aspect) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = canvas.clientWidth, h = Math.round(w * aspect);
    canvas.style.height = h + "px";
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }

  // Plays drawAt(simTime) in a loop over [0, duration], at `speed` simulated units per second,
  // only while the figure is on screen. Starts playing unless the reader prefers reduced motion.
  function play(root, drawAt, duration, speed) {
    var playing = !reduced, visible = false, simT = 0, last = null, raf = 0;
    var btn = root.querySelector("button");
    function sync() { btn.textContent = playing ? "Pause" : "Play"; btn.setAttribute("aria-pressed", String(playing)); }
    function frame(now) {
      raf = 0;
      if (!playing || !visible) { last = null; return; }
      if (last !== null) simT = (simT + ((now - last) / 1000) * speed) % duration;
      last = now;
      drawAt(simT);
      raf = requestAnimationFrame(frame);
    }
    function kick() { if (!raf && playing && visible) raf = requestAnimationFrame(frame); }
    btn.addEventListener("click", function () { playing = !playing; sync(); kick(); });
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; kick(); }).observe(root);
    sync();
    drawAt(0);
    return { redraw: function () { drawAt(simT); } };
  }

  function drawContainer(ctx, X, Y, left, right, bottom, top) {
    ctx.strokeStyle = COL.wall; ctx.lineWidth = 3; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(X(left), Y(top)); ctx.lineTo(X(left), Y(bottom)); ctx.lineTo(X(right), Y(bottom)); ctx.lineTo(X(right), Y(top)); ctx.stroke();
  }

  function fillLiquid(ctx, X, Y, pts, left, right, bottom) {
    ctx.fillStyle = COL.liquid;
    ctx.beginPath(); ctx.moveTo(X(left), Y(bottom));
    pts.forEach(function (p) { ctx.lineTo(X(p[0]), Y(p[1])); });
    ctx.lineTo(X(right), Y(bottom)); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = COL.surface; ctx.lineWidth = 2.5;
    ctx.beginPath(); pts.forEach(function (p, i) { if (i) ctx.lineTo(X(p[0]), Y(p[1])); else ctx.moveTo(X(p[0]), Y(p[1])); }); ctx.stroke();
  }

  function dot(ctx, x, y, r, fill) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fillStyle = fill; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = "#ffffff"; ctx.stroke();
  }

  // ---------------------------------------------------------------- discrete (two-pendulum) model
  function discrete(root, data) {
    var canvas = root.querySelector("canvas"), out = root.querySelector("[data-read]");
    var l = data.params.l, W = 4 * l, depth = 0.12, H = 0.17, seg = W / 4;   // container 20 cm wide, surface segments of length l
    var n = data.x.length, dt = data.dt, duration = (n - 1) * dt, view;
    function size() { view = fitCanvas(canvas, 0.62); }
    function at(arr, t) { var f = t / dt, i = Math.min(n - 2, Math.floor(f)), a = f - i; return arr[i] * (1 - a) + arr[i + 1] * a; }
    function drawAt(t) {
      var ctx = view.ctx, w = view.w, h = view.h;
      var s = Math.min(w / (W + 0.08), h / (H + 0.05)), x0 = w / 2, y0 = h - 0.025 * s;
      function X(x) { return x0 + x * s; }
      function Y(y) { return y0 - y * s; }
      var cx = at(data.x, t), t1 = at(data.th1, t), t2 = at(data.th2, t);
      ctx.clearRect(0, 0, w, h);
      // ground with the container's rest position
      ctx.strokeStyle = COL.faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(-W / 2 - 0.035), Y(0)); ctx.lineTo(X(W / 2 + 0.035), Y(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(0), Y(-0.012)); ctx.stroke();
      // surface: inner segments perpendicular to the upper rod, outer ones to the lower rod, extended to the walls
      var left = cx - W / 2, right = cx + W / 2, P = [cx, depth];
      var A1 = [P[0] + seg * Math.cos(t1), P[1] + seg * Math.sin(t1)], Am1 = [P[0] - seg * Math.cos(t1), P[1] - seg * Math.sin(t1)];
      var R = [right, A1[1] + (right - A1[0]) * Math.tan(t2)], L = [left, Am1[1] - (Am1[0] - left) * Math.tan(t2)];
      fillLiquid(ctx, X, Y, [L, Am1, P, A1, R], left, right, 0);
      // the two pendulums hanging from the centre of the surface
      var B1 = [P[0] + l * Math.sin(t1), P[1] - l * Math.cos(t1)], B2 = [B1[0] + l * Math.sin(t2), B1[1] - l * Math.cos(t2)];
      ctx.setLineDash([2, 4]); ctx.strokeStyle = COL.faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(P[0]), Y(P[1])); ctx.lineTo(X(P[0]), Y(P[1] - 2 * l)); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = COL.rod; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(X(P[0]), Y(P[1])); ctx.lineTo(X(B1[0]), Y(B1[1])); ctx.lineTo(X(B2[0]), Y(B2[1])); ctx.stroke();
      dot(ctx, X(P[0]), Y(P[1]), 3.5, COL.rod);
      dot(ctx, X(B1[0]), Y(B1[1]), 7, COL.bob1);
      dot(ctx, X(B2[0]), Y(B2[1]), 7, COL.bob2);
      drawContainer(ctx, X, Y, left, right, 0, H);
      out.innerHTML = "t = " + t.toFixed(2) + " s &nbsp;·&nbsp; θ<sub>1</sub> = " + t1.toFixed(2) + " rad &nbsp;·&nbsp; θ<sub>2</sub> = " +
        t2.toFixed(2) + " rad &nbsp;·&nbsp; container moved " + (cx * 1000).toFixed(1) + " mm";
    }
    size();
    var p = play(root, drawAt, duration, 0.5);
    window.addEventListener("resize", function () { size(); p.redraw(); });
  }

  // ---------------------------------------------------------------- continuous (forced string) model
  function continuous(root) {
    var canvas = root.querySelector("canvas"), out = root.querySelector("[data-read]");
    var A = 1, c = 1, len = 1, w = 2, gamma = 0.3, N = 41, depth = 0.5, H = 0.85, scale = 0.6, view;
    var modes = [];
    for (var k = 1; k <= 39; k += 2) {
      var wn = (k * Math.PI * c) / len, bn = (4 * A) / (k * Math.PI);
      var Rr = bn / Math.hypot(wn * wn - w * w, gamma * w), phi = Math.atan2(gamma * w, wn * wn - w * w);
      var Om = Math.sqrt(wn * wn - (gamma * gamma) / 4), C1 = -Rr * Math.cos(phi), C2 = ((gamma / 2) * C1 - Rr * w * Math.sin(phi)) / Om;
      modes.push({ k: k, R: Rr, phi: phi, Om: Om, C1: C1, C2: C2 });
    }
    function u(x, t) {
      var sum = 0, e = Math.exp((-gamma * t) / 2);
      for (var i = 0; i < modes.length; i++) {
        var m = modes[i];
        var q = m.R * Math.cos(w * t - m.phi) + e * (m.C1 * Math.cos(m.Om * t) + m.C2 * Math.sin(m.Om * t));
        sum += q * Math.sin((m.k * Math.PI * x) / len);
      }
      return sum;
    }
    function size() { view = fitCanvas(canvas, 0.62); }
    function drawAt(t) {
      var ctx = view.ctx, wd = view.w, h = view.h;
      var s = Math.min(wd / 1.3, h / (H + 0.1)), x0 = wd / 2, y0 = h - 0.04 * s;
      function X(x) { return x0 + (x - 0.5) * s; }
      function Y(y) { return y0 - y * s; }
      ctx.clearRect(0, 0, wd, h);
      var pts = [];
      for (var i = 0; i < N; i++) { var x = i / (N - 1); pts.push([x, depth + scale * u(x, t)]); }
      fillLiquid(ctx, X, Y, pts, 0, 1, 0);
      ctx.setLineDash([2, 4]); ctx.strokeStyle = COL.faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(0), Y(depth)); ctx.lineTo(X(1), Y(depth)); ctx.stroke(); ctx.setLineDash([]);
      dot(ctx, X(0), Y(depth), 4, COL.surface); dot(ctx, X(1), Y(depth), 4, COL.surface);
      drawContainer(ctx, X, Y, 0, 1, 0, H);
      // driving force: an arrow whose length follows cos(w t)
      var f = Math.cos(w * t), ax = X(1.12), ay = Y(depth), len2 = f * 0.12 * s;
      ctx.strokeStyle = COL.text; ctx.fillStyle = COL.text; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax, ay - len2); ctx.stroke();
      if (Math.abs(len2) > 4) { var d = len2 > 0 ? -1 : 1; ctx.beginPath(); ctx.moveTo(ax, ay - len2); ctx.lineTo(ax - 5, ay - len2 - d * 7); ctx.lineTo(ax + 5, ay - len2 - d * 7); ctx.closePath(); ctx.fill(); }
      ctx.font = "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"; ctx.textAlign = "center";
      ctx.fillText("force", ax, Y(depth - 0.07));
      out.innerHTML = "t = " + t.toFixed(1) + " (in units of l/c)";
    }
    size();
    var p = play(root, drawAt, 20, 2);
    window.addEventListener("resize", function () { size(); p.redraw(); });
  }

  var d = document.getElementById("slosh-discrete");
  if (d) fetch(d.getAttribute("data-src")).then(function (r) { return r.json(); }).then(function (data) { discrete(d, data); });
  var c = document.getElementById("slosh-continuous");
  if (c) continuous(c);
})();
