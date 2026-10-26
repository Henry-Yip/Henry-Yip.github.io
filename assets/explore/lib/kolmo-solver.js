// Kolmogorov flow  u_t + u.grad u = -grad p + Re^-1 lap u + sin(4y) x  on [0, 2pi]^2, in vorticity form, with
// the same pseudo-spectral method as JAX-CFD: the 2/3 rule on the advection term and Carpenter-Kennedy
// low-storage Runge-Kutta steps with Crank-Nicolson for the viscous term. Arrays are indexed [ix * N + iy].

// iterative radix-2 complex FFT on (re, im) of length n
class FFT {
  constructor(n) {
    this.n = n;
    this.rev = new Uint32Array(n);
    const bits = Math.log2(n);
    for (let i = 0; i < n; i++) { let r = 0; for (let b = 0; b < bits; b++) r |= ((i >> b) & 1) << (bits - 1 - b); this.rev[i] = r; }
    this.cos = new Float64Array(n / 2); this.sin = new Float64Array(n / 2);
    for (let i = 0; i < n / 2; i++) { this.cos[i] = Math.cos((2 * Math.PI * i) / n); this.sin[i] = Math.sin((2 * Math.PI * i) / n); }
  }
  run(re, im, inverse) {
    const n = this.n, rev = this.rev, sg = inverse ? 1 : -1;
    for (let i = 0; i < n; i++) { const j = rev[i]; if (j > i) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
    for (let size = 2; size <= n; size *= 2) {
      const half = size / 2, step = n / size;
      for (let s = 0; s < n; s += size)
        for (let k = 0; k < half; k++) {
          const c = this.cos[k * step], si = sg * this.sin[k * step], a = s + k, b = a + half;
          const tr = re[b] * c - im[b] * si, ti = re[b] * si + im[b] * c;
          re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        }
    }
  }
}

const ALPHA = [0, 0.1496590219993, 0.3704009573644, 0.6222557631345, 0.9582821306748, 1];
const BETA = [0, -0.4178904745, -1.192151694643, -1.697784692471, -1.514183444257];
const GAMMA = [0.1496590219993, 0.3792103129999, 0.8229550293869, 0.6994504559488, 0.1530572479681];

export class Kolmogorov {
  constructor(N = 64, Re = 20, dt = 0.01) {
    this.N = N; this.dt = dt; this.t = 0;
    const M = N * N;
    this.fft = new FFT(N);
    this.rowR = new Float64Array(N); this.rowI = new Float64Array(N);
    const kOf = (i) => (i < N / 2 ? i : i - N);
    this.kx = new Float64Array(M); this.ky = new Float64Array(M); this.k2 = new Float64Array(M); this.keep = new Uint8Array(M);
    for (let i = 0; i < N; i++)
      for (let j = 0; j < N; j++) {
        const a = kOf(i), b = kOf(j), p = i * N + j;
        this.kx[p] = i === N / 2 ? 0 : a; this.ky[p] = j === N / 2 ? 0 : b;     // no derivative of the Nyquist modes
        this.k2[p] = a * a + b * b;
        this.keep[p] = Math.abs(a) < N / 3 && Math.abs(b) < N / 3 ? 1 : 0;         // 2/3 rule
      }
    this.wr = new Float64Array(M); this.wi = new Float64Array(M);                    // vorticity, spectral
    this.hr = new Float64Array(M); this.hi = new Float64Array(M);
    this.fr = new Float64Array(M); this.fi = new Float64Array(M);
    this.ar = new Float64Array(M); this.ai = new Float64Array(M); this.br = new Float64Array(M); this.bi = new Float64Array(M);
    // forcing: the curl of sin(4y) x is -4 cos(4y)
    this.gr = new Float64Array(M); this.gi = new Float64Array(M);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) this.gr[i * N + j] = -4 * Math.cos((4 * 2 * Math.PI * j) / N);
    this.fft2(this.gr, this.gi, false);
    this.setRe(Re);
  }
  setRe(Re) { this.Re = Re; this.nu = 1 / Re; }
  fft2(re, im, inverse) {
    const N = this.N, R = this.rowR, I = this.rowI, f = this.fft;
    for (let i = 0; i < N; i++) {
      const o = i * N;
      for (let j = 0; j < N; j++) { R[j] = re[o + j]; I[j] = im[o + j]; }
      f.run(R, I, inverse);
      for (let j = 0; j < N; j++) { re[o + j] = R[j]; im[o + j] = I[j]; }
    }
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) { R[i] = re[i * N + j]; I[i] = im[i * N + j]; }
      f.run(R, I, inverse);
      for (let i = 0; i < N; i++) { re[i * N + j] = R[i]; im[i * N + j] = I[i]; }
    }
    if (inverse) { const s = 1 / (N * N); for (let p = 0; p < N * N; p++) { re[p] *= s; im[p] *= s; } }
  }
  // set the state from real-space vorticity w[ix * N + iy]
  setVorticity(w) { this.wr.set(w); this.wi.fill(0); this.fft2(this.wr, this.wi, false); }
  addVorticity(w) {
    const r = Float64Array.from(w), i = new Float64Array(w.length);
    this.fft2(r, i, false);
    for (let p = 0; p < r.length; p++) { this.wr[p] += r[p]; this.wi[p] += i[p]; }
  }
  laminar() {   // u = (Re / 16) sin 4y, whose vorticity is -(Re / 4) cos 4y
    const N = this.N, w = new Float64Array(N * N);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) w[i * N + j] = -(this.Re / 4) * Math.cos((4 * 2 * Math.PI * j) / N);
    return w;
  }
  vorticity(out) {
    out.set(this.wr); this.ai.set(this.wi); this.fft2(out, this.ai, true);
    return out;
  }
  // explicit terms: -u.grad w (2/3 rule) plus forcing, into (fr, fi)
  explicit(wr, wi) {
    const M = this.N * this.N, { kx, ky, k2, ar, ai, br, bi, fr, fi } = this;
    for (let p = 0; p < M; p++) {
      const inv = k2[p] ? 1 / k2[p] : 0, pr = wr[p] * inv, pi = wi[p] * inv;
      // u + i v from (kx + i ky) psi, since u = i ky psi and v = -i kx psi
      ar[p] = kx[p] * pr - ky[p] * pi; ai[p] = kx[p] * pi + ky[p] * pr;
      // w_x + i w_y from (i kx - ky) w
      br[p] = -kx[p] * wi[p] - ky[p] * wr[p]; bi[p] = kx[p] * wr[p] - ky[p] * wi[p];
    }
    this.fft2(ar, ai, true); this.fft2(br, bi, true);
    for (let p = 0; p < M; p++) { fr[p] = -(ar[p] * br[p] + ai[p] * bi[p]); fi[p] = 0; }
    this.fft2(fr, fi, false);
    const { keep, gr, gi } = this;
    for (let p = 0; p < M; p++) { fr[p] = keep[p] ? fr[p] + gr[p] : gr[p]; fi[p] = keep[p] ? fi[p] + gi[p] : gi[p]; }
  }
  step() {
    const M = this.N * this.N, dt = this.dt, { wr, wi, hr, hi, fr, fi, k2 } = this, nu = this.nu;
    for (let s = 0; s < BETA.length; s++) {
      this.explicit(wr, wi);
      const mu = 0.5 * dt * (ALPHA[s + 1] - ALPHA[s]), g = GAMMA[s] * dt, b = BETA[s];
      for (let p = 0; p < M; p++) {
        hr[p] = fr[p] + b * hr[p]; hi[p] = fi[p] + b * hi[p];
        const lin = -nu * k2[p], den = 1 / (1 - mu * lin);
        wr[p] = (wr[p] + g * hr[p] + mu * lin * wr[p]) * den;
        wi[p] = (wi[p] + g * hi[p] + mu * lin * wi[p]) * den;
      }
    }
    this.t += dt;
  }
  // energy, dissipation and energy input per unit area
  diagnostics() {
    const N = this.N, M = N * N, { wr, wi, k2 } = this;
    let e = 0, z = 0;
    for (let p = 0; p < M; p++) { const a = wr[p] * wr[p] + wi[p] * wi[p]; z += a; if (k2[p]) e += a / k2[p]; }
    return { E: (0.5 * e) / (M * M), D: (this.nu * z) / (M * M) };
  }
}
