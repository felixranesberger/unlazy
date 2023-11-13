const bt = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", ot = typeof window > "u", pt = !ot && "loading" in HTMLImageElement.prototype, Et = !ot && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function st(t, e = document) {
  return typeof t == "string" ? [...e.querySelectorAll(t)] : t instanceof Element ? [t] : [...t];
}
function yt(t, e) {
  let n, r;
  return t >= 1 ? (n = e, r = Math.round(e / t)) : (n = Math.round(e * t), r = e), { width: n, height: r };
}
function ht(t) {
  const e = t.replace(/-/g, "+").replace(/_/g, "/"), n = typeof Buffer < "u" ? Buffer.from(e, "base64") : Uint8Array.from(atob(e), (r) => r.charCodeAt(0));
  return new Uint8Array(n);
}
function gt(t, e) {
  let n;
  return function(...r) {
    n && clearTimeout(n), n = setTimeout(() => {
      n = void 0, t(...r);
    }, e);
  };
}
function wt(t) {
  let { PI: e, min: n, max: r, cos: c, round: o } = Math, f = t[0] | t[1] << 8 | t[2] << 16, s = t[3] | t[4] << 8, a = (f & 63) / 63, p = (f >> 6 & 63) / 31.5 - 1, d = (f >> 12 & 63) / 31.5 - 1, u = (f >> 18 & 31) / 31, l = f >> 23, b = (s >> 3 & 63) / 63, v = (s >> 9 & 63) / 63, _ = s >> 15, S = r(3, _ ? l ? 5 : 7 : s & 7), y = r(3, _ ? s & 7 : l ? 5 : 7), L = l ? (t[5] & 15) / 15 : 1, U = (t[5] >> 4) / 15, O = l ? 6 : 5, m = 0, w = (D, g, P) => {
    let z = [];
    for (let C = 0; C < g; C++)
      for (let R = C ? 0 : 1; R * g < D * (g - C); R++)
        z.push(((t[O + (m >> 1)] >> ((m++ & 1) << 2) & 15) / 7.5 - 1) * P);
    return z;
  }, h = w(S, y, u), Y = w(3, 3, b * 1.25), M = w(3, 3, v * 1.25), x = l && w(5, 5, U), F = _t(t), q = o(F > 1 ? 32 : 32 * F), W = o(F > 1 ? 32 / F : 32), B = new Uint8Array(q * W * 4), j = [], G = [];
  for (let D = 0, g = 0; D < W; D++)
    for (let P = 0; P < q; P++, g += 4) {
      let z = a, C = p, R = d, J = L;
      for (let i = 0, A = r(S, l ? 5 : 3); i < A; i++)
        j[i] = c(e / q * (P + 0.5) * i);
      for (let i = 0, A = r(y, l ? 5 : 3); i < A; i++)
        G[i] = c(e / W * (D + 0.5) * i);
      for (let i = 0, A = 0; i < y; i++)
        for (let E = i ? 0 : 1, I = G[i] * 2; E * y < S * (y - i); E++, A++)
          z += h[A] * j[E] * I;
      for (let i = 0, A = 0; i < 3; i++)
        for (let E = i ? 0 : 1, I = G[i] * 2; E < 3 - i; E++, A++) {
          let et = j[E] * I;
          C += Y[A] * et, R += M[A] * et;
        }
      if (l)
        for (let i = 0, A = 0; i < 5; i++)
          for (let E = i ? 0 : 1, I = G[i] * 2; E < 5 - i; E++, A++)
            J += x[A] * j[E] * I;
      let K = z - 2 / 3 * C, tt = (3 * z - K + R) / 2, At = tt - R;
      B[g] = r(0, 255 * n(1, tt)), B[g + 1] = r(0, 255 * n(1, At)), B[g + 2] = r(0, 255 * n(1, K)), B[g + 3] = r(0, 255 * n(1, J));
    }
  return { w: q, h: W, rgba: B };
}
function _t(t) {
  let e = t[3], n = t[2] & 128, r = t[4] & 128, c = r ? n ? 5 : 7 : e & 7, o = r ? e & 7 : n ? 5 : 7;
  return c / o;
}
/**
 * Encodes an RGBA image to a PNG data URI. RGB should not be premultiplied by A.
 *
 * @remarks
 * This is optimized for speed and simplicity and does not optimize for size
 * at all. This doesn't do any compression (all values are stored uncompressed).
 *
 * @see https://github.com/evanw/thumbhash
 * @author Evan Wallace
 * @license MIT
 */
function ct(t, e, n) {
  const r = t * 4 + 1, c = 6 + e * (5 + r), o = [
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10,
    0,
    0,
    0,
    13,
    73,
    72,
    68,
    82,
    0,
    0,
    t >> 8,
    t & 255,
    0,
    0,
    e >> 8,
    e & 255,
    8,
    6,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    c >>> 24,
    c >> 16 & 255,
    c >> 8 & 255,
    c & 255,
    73,
    68,
    65,
    84,
    120,
    1
  ], f = [
    0,
    498536548,
    997073096,
    651767980,
    1994146192,
    1802195444,
    1303535960,
    1342533948,
    -306674912,
    -267414716,
    -690576408,
    -882789492,
    -1687895376,
    -2032938284,
    -1609899400,
    -1111625188
  ];
  let s = 1, a = 0;
  for (let d = 0, u = 0, l = r - 1; d < e; d++, l += r - 1)
    for (o.push(d + 1 < e ? 0 : 1, r & 255, r >> 8, ~r & 255, r >> 8 ^ 255, 0), a = (a + s) % 65521; u < l; u++) {
      const b = n[u] & 255;
      o.push(b), s = (s + b) % 65521, a = (a + s) % 65521;
    }
  o.push(
    a >> 8,
    a & 255,
    s >> 8,
    s & 255,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    73,
    69,
    78,
    68,
    174,
    66,
    96,
    130
  );
  for (let [d, u] of [[12, 29], [37, 41 + c]]) {
    let l = -1;
    for (let b = d; b < u; b++)
      l ^= o[b], l = l >>> 4 ^ f[l & 15], l = l >>> 4 ^ f[l & 15];
    l = ~l, o[u++] = l >>> 24, o[u++] = l >> 16 & 255, o[u++] = l >> 8 & 255, o[u++] = l & 255;
  }
  return `data:image/png;base64,${typeof Buffer < "u" ? Buffer.from(new Uint8Array(o)).toString("base64") : btoa(String.fromCharCode(...o))}`;
}
function Lt(t) {
  const { w: e, h: n, rgba: r } = wt(ht(t));
  return ct(e, n, r);
}
const mt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~", N = (t, e, n) => {
  let r = 0;
  for (; e < n; )
    r *= 83, r += mt.indexOf(t[e++]);
  return r;
}, at = Math.pow, H = Math.PI, xt = H * 2, lt = 3294.6, it = 269.025, Ct = (t) => t > 10.31475 ? at(t / it + 0.052132, 2.4) : t / lt, k = (t) => ~~(t > 1227e-8 ? it * at(t, 0.416666) - 13.025 : t * lt + 1), T = (t) => (t < 0 ? -1 : 1) * t * t, rt = (t) => {
  for (t += H / 2; t > H; )
    t -= xt;
  const e = 1.27323954 * t - 0.405284735 * T(t);
  return 0.225 * (T(e) - e) + e;
};
function St(t) {
  const e = N(t, 2, 6);
  return [e >> 16, e >> 8 & 255, e & 255];
}
function zt(t, e, n, r) {
  const c = N(t, 0, 1), o = c % 9 + 1, f = ~~(c / 9) + 1, s = o * f;
  let a = 0, p = 0, d = 0, u = 0, l = 0, b = 0, v = 0, _ = 0, S = 0, y = 0, L = 0, U = 0, O = 0, m = 0;
  const w = (N(t, 1, 2) + 1) / 13446 * (r | 1), h = new Float64Array(s * 3), Y = St(t);
  for (a = 0; a < 3; a++)
    h[a] = Ct(Y[a]);
  for (a = 1; a < s; a++)
    m = N(t, 4 + a * 2, 6 + a * 2), h[a * 3] = T(~~(m / (19 * 19)) - 9) * w, h[a * 3 + 1] = T(~~(m / 19) % 19 - 9) * w, h[a * 3 + 2] = T(m % 19 - 9) * w;
  const M = e * 4, x = new Uint8ClampedArray(M * n);
  for (u = 0; u < n; u++)
    for (U = H * u / n, d = 0; d < e; d++) {
      for (l = 0, b = 0, v = 0, O = H * d / e, p = 0; p < f; p++)
        for (S = rt(U * p), a = 0; a < o; a++)
          _ = rt(O * a) * S, y = (a + p * o) * 3, l += h[y] * _, b += h[y + 1] * _, v += h[y + 2] * _;
      L = 4 * d + u * M, x[L] = k(l), x[L + 1] = k(b), x[L + 2] = k(v), x[L + 3] = 255;
    }
  return x;
}
function Rt(t, {
  ratio: e = 1,
  size: n = 32
} = {}) {
  const { width: r, height: c } = yt(e, n), o = zt(t, r, c);
  return ct(r, c, o);
}
function ft(t = 'img[loading="lazy"]', {
  hash: e = !0,
  hashType: n = "blurhash",
  placeholderSize: r = 32,
  updateSizesOnResize: c = !1,
  onImageLoad: o
} = {}) {
  const f = /* @__PURE__ */ new Set();
  for (const s of st(t)) {
    const a = Z(s, { updateOnResize: c });
    if (c && a && f.add(a), // @ts-expect-error: Compile-time flag to exclude this code from the bundle
    e) {
      const d = Bt({
        image: s,
        hash: typeof e == "string" ? e : void 0,
        hashType: n,
        size: r
      });
      d && (s.src = d);
    }
    if (!s.dataset.src && !s.dataset.srcset) {
      console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", s);
      continue;
    }
    if (Et || !pt) {
      ut(s), X(s), V(s);
      continue;
    }
    if (s.src || (s.src = bt), s.complete && s.naturalWidth > 0) {
      Q(s, o);
      continue;
    }
    const p = () => Q(s, o);
    s.addEventListener("load", p, { once: !0 }), f.add(
      () => s.removeEventListener("load", p)
    );
  }
  return () => {
    for (const s of f)
      s();
    f.clear();
  };
}
function vt(t = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const e of st(t))
    Z(e);
}
function Q(t, e) {
  const n = new Image(), { srcset: r, src: c, sizes: o } = t.dataset;
  if (o === "auto") {
    const f = dt(t);
    f && (n.sizes = `${f}px`);
  } else
    t.sizes && (n.sizes = t.sizes);
  r && (n.srcset = r), c && (n.src = c), n.addEventListener("load", () => {
    ut(t), X(t), V(t), e == null || e(t);
  });
}
function Bt({
  /** If given, the hash will be extracted from the image's `data-blurhash` or `data-thumbhash` attribute and ratio will be calculated from the image's actual dimensions */
  image: t,
  hash: e,
  hashType: n = "blurhash",
  /** @default 32 */
  size: r = 32,
  /** Will be calculated from the image's actual dimensions if not provided and image is given */
  ratio: c
} = {}) {
  if (!e && t) {
    const { blurhash: o, thumbhash: f } = t.dataset;
    e = f || o, n = f ? "thumbhash" : "blurhash";
  }
  if (e)
    try {
      if (n === "thumbhash")
        return Lt(e);
      if (!c && t) {
        const o = t.width || t.offsetWidth || r, f = t.height || t.offsetHeight || r;
        c = o / f;
      }
      return Rt(e, { ratio: c, size: r });
    } catch (o) {
      console.error(`Error generating ${n} placeholder:`, o);
    }
}
const $ = /* @__PURE__ */ new WeakMap();
function Z(t, e) {
  var r;
  if (t.dataset.sizes !== "auto")
    return;
  const n = dt(t);
  if (n && (t.sizes = `${n}px`), ((r = t.parentElement) == null ? void 0 : r.tagName.toLowerCase()) === "picture" && !(e != null && e.isRecursiveCall) && [...t.parentElement.getElementsByTagName("source")].forEach(
    (c) => Z(c, { isRecursiveCall: !0 })
  ), e != null && e.updateOnResize) {
    if (!$.has(t)) {
      const c = gt(() => Z(t), 500), o = new ResizeObserver(c);
      $.set(t, o), o.observe(t);
    }
    return () => {
      const c = $.get(t);
      c && (c.disconnect(), $.delete(t));
    };
  }
}
function V(t) {
  t.dataset.src && (t.src = t.dataset.src, t.removeAttribute("data-src"));
}
function X(t) {
  t.dataset.srcset && (t.srcset = t.dataset.srcset, t.removeAttribute("data-srcset"));
}
function ut(t) {
  const e = t.parentElement;
  (e == null ? void 0 : e.tagName.toLowerCase()) === "picture" && ([...e.querySelectorAll("source[data-srcset]")].forEach(X), [...e.querySelectorAll("source[data-src]")].forEach(V));
}
function dt(t) {
  var e, n;
  return t instanceof HTMLSourceElement ? (n = (e = t.parentElement) == null ? void 0 : e.getElementsByTagName("img")[0]) == null ? void 0 : n.offsetWidth : t.offsetWidth;
}
const Dt = Object.freeze({
  autoSizes: vt,
  lazyLoad: ft,
  loadImage: Q
});
var nt;
(nt = document.currentScript) != null && nt.hasAttribute("init") && ft();
export {
  vt as autoSizes,
  Dt as default,
  ft as lazyLoad,
  Q as loadImage
};
