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
    var btn = root.querySelector('button[data-act="play"]');
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

  // ---------------------------------------------------------------- discrete model: n pendulums in a chain
  // data.runs[n] = { x: container position, th: [theta_1 ... theta_n] }, sampled every data.dt seconds.
  // Totals are fixed as n changes: rod length 10 cm, so each rod is 10/n cm and each surface piece 10/n cm wide.
  function discrete(root, data) {
    var canvas = root.querySelector("canvas"), out = root.querySelector("[data-read]");
    var W = 0.2, depth = 0.12, H = 0.17, dt = data.dt, n = 2, run = data.runs[2], view;
    var teal = [10, 143, 153], orange = [217, 102, 31];
    function bobColour(k) {
      var f = n === 1 ? 0 : (k - 1) / (n - 1), c = teal.map(function (v, i) { return Math.round(v + f * (orange[i] - v)); });
      return "rgb(" + c.join(",") + ")";
    }
    function size() { view = fitCanvas(canvas, 0.62); }
    function at(arr, t) { var f = t / dt, i = Math.min(arr.length - 2, Math.floor(f)), a = f - i; return arr[i] * (1 - a) + arr[i + 1] * a; }
    function drawAt(t) {
      var ctx = view.ctx, w = view.w, h = view.h;
      var s = Math.min(w / (W + 0.08), h / (H + 0.05)), x0 = w / 2, y0 = h - 0.025 * s;
      function X(x) { return x0 + x * s; }
      function Y(y) { return y0 - y * s; }
      var l = run.l, seg = W / (2 * n), cx = at(run.x, t), th = run.th.map(function (a) { return at(a, t); });
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = COL.faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(-W / 2 - 0.035), Y(0)); ctx.lineTo(X(W / 2 + 0.035), Y(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(0), Y(-0.012)); ctx.stroke();
      // surface: the k-th piece on each side is perpendicular to rod k; the outermost pieces run to the walls
      var left = cx - W / 2, right = cx + W / 2, P = [cx, depth], rightPts = [], leftPts = [], r = P, q = P;
      for (var k = 0; k < n - 1; k++) {
        r = [r[0] + seg * Math.cos(th[k]), r[1] + seg * Math.sin(th[k])]; rightPts.push(r);
        q = [q[0] - seg * Math.cos(th[k]), q[1] - seg * Math.sin(th[k])]; leftPts.unshift(q);
      }
      var tn = Math.tan(th[n - 1]);
      var pts = [[left, q[1] - (q[0] - left) * tn]].concat(leftPts, [P], rightPts, [[right, r[1] + (right - r[0]) * tn]]);
      fillLiquid(ctx, X, Y, pts, left, right, 0);
      // the chain of pendulums hanging from the centre of the surface
      ctx.setLineDash([2, 4]); ctx.strokeStyle = COL.faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(P[0]), Y(P[1])); ctx.lineTo(X(P[0]), Y(P[1] - n * l)); ctx.stroke(); ctx.setLineDash([]);
      var B = P, bobs = [];
      ctx.strokeStyle = COL.rod; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(P[0]), Y(P[1]));
      for (k = 0; k < n; k++) { B = [B[0] + l * Math.sin(th[k]), B[1] - l * Math.cos(th[k])]; bobs.push(B); ctx.lineTo(X(B[0]), Y(B[1])); }
      ctx.stroke();
      dot(ctx, X(P[0]), Y(P[1]), 3.5, COL.rod);
      var rad = Math.max(4.5, 8 - n);
      bobs.forEach(function (b, i) { dot(ctx, X(b[0]), Y(b[1]), rad, bobColour(i + 1)); });
      drawContainer(ctx, X, Y, left, right, 0, H);
      out.innerHTML = "t = " + t.toFixed(2) + " s &nbsp;·&nbsp; lowest rod at " + th[n - 1].toFixed(2) + " rad &nbsp;·&nbsp; container moved " + (cx * 1000).toFixed(1) + " mm";
    }
    function choose(k) {
      n = k; run = data.runs[k]; run.l = data.totals.rod_length / k;
      root.querySelectorAll("[data-n]").forEach(function (b) { b.setAttribute("aria-pressed", String(+b.getAttribute("data-n") === k)); });
    }
    choose(2);
    size();
    var duration = (run.x.length - 1) * dt;
    var p = play(root, drawAt, duration, 0.5);
    root.querySelectorAll("[data-n]").forEach(function (b) {
      b.addEventListener("click", function () { choose(+b.getAttribute("data-n")); p.redraw(); });
    });
    window.addEventListener("resize", function () { size(); p.redraw(); });
  }

  // ---------------------------------------------------------------- continuous model: shallow liquid in a container shaken sideways
  // In the container's frame the surface height eta obeys eta_tt + gamma eta_t = c^2 eta_xx (c^2 = g h), and the walls
  // force a slope of -a/g, where a(t) = X0 w^2 cos(w t) for a container at X(t) = X0 (1 - cos w t). In cosine modes:
  // q_n'' + gamma q_n' + w_n^2 q_n = (4h/L) a(t) for odd n, starting flat and at rest.
  function continuous(root) {
    var canvas = root.querySelector("canvas"), out = root.querySelector("[data-read]");
    var g = 9.81, L = 0.2, h = 0.03, H = 0.07, X0 = 0.006, w = 6, gamma = 0.5, c = Math.sqrt(g * h), N = 61, view;
    var b = ((4 * h) / L) * X0 * w * w, modes = [];
    for (var k = 1; k <= 59; k += 2) {
      var wn = (k * Math.PI * c) / L;
      var Rr = b / Math.hypot(wn * wn - w * w, gamma * w), phi = Math.atan2(gamma * w, wn * wn - w * w);
      var Om = Math.sqrt(wn * wn - (gamma * gamma) / 4), C1 = -Rr * Math.cos(phi), C2 = ((gamma / 2) * C1 - Rr * w * Math.sin(phi)) / Om;
      modes.push({ k: k, R: Rr, phi: phi, Om: Om, C1: C1, C2: C2 });
    }
    function eta(x, t) {
      var sum = 0, e = Math.exp((-gamma * t) / 2);
      for (var i = 0; i < modes.length; i++) {
        var m = modes[i];
        var q = m.R * Math.cos(w * t - m.phi) + e * (m.C1 * Math.cos(m.Om * t) + m.C2 * Math.sin(m.Om * t));
        sum += q * Math.cos((m.k * Math.PI * x) / L);
      }
      return sum;
    }
    function size() { view = fitCanvas(canvas, 0.42); }
    function drawAt(t) {
      var ctx = view.ctx, wd = view.w, ht = view.h;
      var s = Math.min(wd / (L + 0.07), ht / (H + 0.02)), x0 = wd / 2 - (X0 + L / 2) * s, y0 = ht - 0.008 * s;
      function X(x) { return x0 + x * s; }
      function Y(y) { return y0 - y * s; }
      var shift = X0 * (1 - Math.cos(w * t));
      ctx.clearRect(0, 0, wd, ht);
      ctx.strokeStyle = COL.faint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(X(-0.02), Y(0)); ctx.lineTo(X(L + 2 * X0 + 0.02), Y(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(X(L / 2), Y(0)); ctx.lineTo(X(L / 2), Y(-0.004)); ctx.stroke();
      var pts = [];
      for (var i = 0; i < N; i++) { var xi = (i / (N - 1)) * L; pts.push([shift + xi, h + eta(xi, t)]); }
      fillLiquid(ctx, X, Y, pts, shift, shift + L, 0);
      ctx.setLineDash([2, 4]); ctx.strokeStyle = COL.faint;
      ctx.beginPath(); ctx.moveTo(X(shift), Y(h)); ctx.lineTo(X(shift + L), Y(h)); ctx.stroke(); ctx.setLineDash([]);
      drawContainer(ctx, X, Y, shift, shift + L, 0, H);
      out.innerHTML = "t = " + t.toFixed(1) + " s &nbsp;·&nbsp; container at " + (shift * 1000).toFixed(1) + " mm &nbsp;·&nbsp; surface " +
        (eta(0, t) * 1000).toFixed(1) + " mm at the left wall, " + (eta(L, t) * 1000).toFixed(1) + " mm at the right";
    }
    size();
    var p = play(root, drawAt, 20, 0.5);
    window.addEventListener("resize", function () { size(); p.redraw(); });
  }

  var d = document.getElementById("slosh-discrete");
  if (d) fetch(d.getAttribute("data-src")).then(function (r) { return r.json(); }).then(function (data) { discrete(d, data); });
  var c = document.getElementById("slosh-continuous");
  if (c) continuous(c);
})();
