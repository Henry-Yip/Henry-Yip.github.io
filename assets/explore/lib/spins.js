// Monte Carlo engines for the interactive figures: the 2D Ising model and the
// 3D classical Heisenberg model, each with local Metropolis and Wolff cluster updates.

export function rng(seed = 12345) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const ISING_TC = 2 / Math.log(1 + Math.SQRT2); // 2.26918...
export const HEIS_TC = 1.443;                          // simple cubic lattice, J = 1

export class Ising2D {
  constructor(L, seed = 1) {
    this.L = L;
    this.N = L * L;
    this.s = new Int8Array(this.N);
    this.rand = rng(seed);
    this.stack = new Int32Array(this.N);
    this.mark = new Uint8Array(this.N);
    this.randomize();
  }

  randomize() {
    for (let i = 0; i < this.N; i++) this.s[i] = this.rand() < 0.5 ? 1 : -1;
  }

  order() {
    this.s.fill(1);
  }

  neighbours(i, out) {
    const L = this.L, x = i % L, y = (i - x) / L;
    out[0] = y * L + ((x + 1) % L);
    out[1] = y * L + ((x + L - 1) % L);
    out[2] = ((y + 1) % L) * L + x;
    out[3] = ((y + L - 1) % L) * L + x;
    return out;
  }

  metropolisSweep(T) {
    const { L, N, s, rand } = this;
    const w4 = Math.exp(-4 / T), w8 = Math.exp(-8 / T);
    for (let k = 0; k < N; k++) {
      const i = (rand() * N) | 0;
      const x = i % L, y = (i - x) / L;
      const sum = s[y * L + ((x + 1) % L)] + s[y * L + ((x + L - 1) % L)] + s[((y + 1) % L) * L + x] + s[((y + L - 1) % L) * L + x];
      const dE = 2 * s[i] * sum;
      if (dE <= 0 || rand() < (dE === 4 ? w4 : w8)) s[i] = -s[i];
    }
  }

  // One Wolff cluster flip; returns the cluster size.
  wolff(T) {
    const { N, s, rand, stack, mark } = this;
    const p = 1 - Math.exp(-2 / T);
    const nb = [0, 0, 0, 0];
    const seed = (rand() * N) | 0, sign = s[seed];
    let top = 0, size = 1;
    stack[top++] = seed;
    mark[seed] = 1;
    while (top > 0) {
      const i = stack[--top];
      this.neighbours(i, nb);
      for (let k = 0; k < 4; k++) {
        const j = nb[k];
        if (!mark[j] && s[j] === sign && rand() < p) {
          mark[j] = 1;
          stack[top++] = j;
          size++;
        }
      }
    }
    for (let i = 0; i < N; i++) if (mark[i]) { s[i] = -s[i]; mark[i] = 0; }
    return size;
  }

  // Wolff updates until about one sweep's worth of spins has been flipped.
  wolffSweep(T) {
    let flipped = 0;
    while (flipped < this.N) flipped += this.wolff(T);
  }

  magnetization() {
    let m = 0;
    for (let i = 0; i < this.N; i++) m += this.s[i];
    return m / this.N;
  }

  energy() {
    const { L, s } = this;
    let e = 0;
    for (let i = 0; i < this.N; i++) {
      const x = i % L, y = (i - x) / L;
      e -= s[i] * (s[y * L + ((x + 1) % L)] + s[((y + 1) % L) * L + x]);
    }
    return e / this.N;
  }
}

// Step-by-step Wolff cluster growth, for the animated explanation.
export class WolffGrowth {
  constructor(model, T) {
    this.m = model;
    this.p = 1 - Math.exp(-2 / T);
    this.state = new Uint8Array(model.N); // 0 = untouched, 1 = in cluster, 2 = waiting in stack
    this.stack = [];
    this.tested = 0;
    this.accepted = 0;
    this.seed = (model.rand() * model.N) | 0;
    this.sign = model.s[this.seed];
    this.state[this.seed] = 2;
    this.stack.push(this.seed);
    this.size = 1;
    this.current = -1;
  }

  get done() {
    return this.stack.length === 0;
  }

  step() {
    if (this.done) return false;
    const i = this.stack.pop();
    this.current = i;
    this.state[i] = 1;
    const nb = this.m.neighbours(i, [0, 0, 0, 0]);
    for (const j of nb) {
      if (this.state[j] === 0 && this.m.s[j] === this.sign) {
        this.tested++;
        if (this.m.rand() < this.p) {
          this.state[j] = 2;
          this.stack.push(j);
          this.size++;
          this.accepted++;
        }
      }
    }
    return true;
  }

  flip() {
    for (let i = 0; i < this.m.N; i++) if (this.state[i]) this.m.s[i] = -this.m.s[i];
  }
}

export class Heisenberg3D {
  constructor(L, seed = 7) {
    this.L = L;
    this.N = L * L * L;
    this.sx = new Float32Array(this.N);
    this.sy = new Float32Array(this.N);
    this.sz = new Float32Array(this.N);
    this.rand = rng(seed);
    this.nbr = new Int32Array(6 * this.N);
    this.stack = new Int32Array(this.N);
    this.mark = new Uint8Array(this.N);
    this.projOf = new Float32Array(this.N); // pre-flip projections of Wolff cluster members
    const idx = (x, y, z) => ((x + L) % L) + L * (((y + L) % L) + L * ((z + L) % L));
    for (let z = 0; z < L; z++)
      for (let y = 0; y < L; y++)
        for (let x = 0; x < L; x++) {
          const i = idx(x, y, z), b = 6 * i;
          this.nbr[b] = idx(x + 1, y, z);
          this.nbr[b + 1] = idx(x - 1, y, z);
          this.nbr[b + 2] = idx(x, y + 1, z);
          this.nbr[b + 3] = idx(x, y - 1, z);
          this.nbr[b + 4] = idx(x, y, z + 1);
          this.nbr[b + 5] = idx(x, y, z - 1);
        }
    this.randomize();
  }

  randomUnit() {
    const z = 2 * this.rand() - 1, phi = 2 * Math.PI * this.rand(), r = Math.sqrt(1 - z * z);
    return [r * Math.cos(phi), r * Math.sin(phi), z];
  }

  randomize() {
    for (let i = 0; i < this.N; i++) {
      const [x, y, z] = this.randomUnit();
      this.sx[i] = x; this.sy[i] = y; this.sz[i] = z;
    }
  }

  order() {
    this.sx.fill(0); this.sy.fill(0); this.sz.fill(1);
  }

  // Local update: rotate a spin by an angle in [-thetaMax, thetaMax] towards a random perpendicular direction.
  metropolisSweep(T, thetaMax = 1.2) {
    const { N, sx, sy, sz, nbr, rand } = this;
    let accepted = 0;
    for (let k = 0; k < N; k++) {
      const i = (rand() * N) | 0, b = 6 * i;
      let hx = 0, hy = 0, hz = 0;
      for (let n = 0; n < 6; n++) { const j = nbr[b + n]; hx += sx[j]; hy += sy[j]; hz += sz[j]; }
      const ax = sx[i], ay = sy[i], az = sz[i];
      // random unit vector perpendicular to the spin
      let [px, py, pz] = this.randomUnit();
      const d = px * ax + py * ay + pz * az;
      px -= d * ax; py -= d * ay; pz -= d * az;
      const pn = Math.hypot(px, py, pz) || 1;
      const th = (2 * rand() - 1) * thetaMax, c = Math.cos(th), s = Math.sin(th);
      let nx = c * ax + (s * px) / pn, ny = c * ay + (s * py) / pn, nz = c * az + (s * pz) / pn;
      const nn = Math.hypot(nx, ny, nz);
      nx /= nn; ny /= nn; nz /= nn;
      const dE = -((nx - ax) * hx + (ny - ay) * hy + (nz - az) * hz);
      if (dE <= 0 || rand() < Math.exp(-dE / T)) { sx[i] = nx; sy[i] = ny; sz[i] = nz; accepted++; }
    }
    return accepted / N;
  }

  // One Wolff cluster flip: reflect a cluster through the plane perpendicular to a random unit vector r.
  wolff(T) {
    const { N, sx, sy, sz, nbr, rand, stack, mark, projOf } = this;
    const [rx, ry, rz] = this.randomUnit();
    const beta2 = 2 / T;
    const seed = (rand() * N) | 0;
    let top = 0, size = 1;
    const reflect = (i) => {
      const proj = sx[i] * rx + sy[i] * ry + sz[i] * rz;
      sx[i] -= 2 * proj * rx; sy[i] -= 2 * proj * ry; sz[i] -= 2 * proj * rz;
      return proj;
    };
    mark[seed] = 1;
    stack[top++] = seed;
    projOf[seed] = reflect(seed);
    while (top > 0) {
      const i = stack[--top], pi = projOf[i], b = 6 * i;
      for (let n = 0; n < 6; n++) {
        const j = nbr[b + n];
        if (mark[j]) continue;
        const pj = sx[j] * rx + sy[j] * ry + sz[j] * rz;
        const prod = pi * pj;
        if (prod > 0 && rand() < 1 - Math.exp(-beta2 * prod)) {
          mark[j] = 1;
          projOf[j] = reflect(j);
          stack[top++] = j;
          size++;
        }
      }
    }
    for (let i = 0; i < N; i++) mark[i] = 0;
    return size;
  }

  wolffSweep(T) {
    let flipped = 0;
    while (flipped < this.N) flipped += this.wolff(T);
  }

  magnetization() {
    let mx = 0, my = 0, mz = 0;
    for (let i = 0; i < this.N; i++) { mx += this.sx[i]; my += this.sy[i]; mz += this.sz[i]; }
    return Math.hypot(mx, my, mz) / this.N;
  }
}
