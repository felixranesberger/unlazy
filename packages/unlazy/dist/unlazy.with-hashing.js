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
function wt(t, e) {
  let n;
  return function(...r) {
    n && clearTimeout(n), n = setTimeout(() => {
      n = void 0, t(...r);
    }, e);
  };
}
function _t(t) {
  const { width: e } = t.getBoundingClientRect();
  return e > 0 ? Promise.resolve() : (console.log(1699880827882, "waiting for element dimensions", t), new Promise((n) => {
    const r = new ResizeObserver(() => {
      const { width: o } = t.getBoundingClientRect();
      console.log(1699880844909, "element dimensions changed", { element: t, width: o }), o > 0 && (r.disconnect(), console.log(1699880866850, "resolving waitForElementDimensions", t), n());
    });
    r.observe(t);
  }));
}
function Lt(t) {
  let { PI: e, min: n, max: r, cos: o, round: c } = Math, f = t[0] | t[1] << 8 | t[2] << 16, s = t[3] | t[4] << 8, a = (f & 63) / 63, p = (f >> 6 & 63) / 31.5 - 1, d = (f >> 12 & 63) / 31.5 - 1, u = (f >> 18 & 31) / 31, l = f >> 23, b = (s >> 3 & 63) / 63, D = (s >> 9 & 63) / 63, L = s >> 15, z = r(3, L ? l ? 5 : 7 : s & 7), y = r(3, L ? s & 7 : l ? 5 : 7), g = l ? (t[5] & 15) / 15 : 1, O = (t[5] >> 4) / 15, F = l ? 6 : 5, C = 0, _ = (R, w, I) => {
    let S = [];
    for (let v = 0; v < w; v++)
      for (let B = v ? 0 : 1; B * w < R * (w - v); B++)
        S.push(((t[F + (C >> 1)] >> ((C++ & 1) << 2) & 15) / 7.5 - 1) * I);
    return S;
  }, h = _(z, y, u), k = _(3, 3, b * 1.25), M = _(3, 3, D * 1.25), x = l && _(5, 5, O), m = gt(t), q = c(m > 1 ? 32 : 32 * m), W = c(m > 1 ? 32 / m : 32), P = new Uint8Array(q * W * 4), j = [], G = [];
  for (let R = 0, w = 0; R < W; R++)
    for (let I = 0; I < q; I++, w += 4) {
      let S = a, v = p, B = d, J = g;
      for (let i = 0, A = r(z, l ? 5 : 3); i < A; i++)
        j[i] = o(e / q * (I + 0.5) * i);
      for (let i = 0, A = r(y, l ? 5 : 3); i < A; i++)
        G[i] = o(e / W * (R + 0.5) * i);
      for (let i = 0, A = 0; i < y; i++)
        for (let E = i ? 0 : 1, T = G[i] * 2; E * y < z * (y - i); E++, A++)
          S += h[A] * j[E] * T;
      for (let i = 0, A = 0; i < 3; i++)
        for (let E = i ? 0 : 1, T = G[i] * 2; E < 3 - i; E++, A++) {
          let et = j[E] * T;
          v += k[A] * et, B += M[A] * et;
        }
      if (l)
        for (let i = 0, A = 0; i < 5; i++)
          for (let E = i ? 0 : 1, T = G[i] * 2; E < 5 - i; E++, A++)
            J += x[A] * j[E] * T;
      let K = S - 2 / 3 * v, tt = (3 * S - K + B) / 2, At = tt - B;
      P[w] = r(0, 255 * n(1, tt)), P[w + 1] = r(0, 255 * n(1, At)), P[w + 2] = r(0, 255 * n(1, K)), P[w + 3] = r(0, 255 * n(1, J));
    }
  return { w: q, h: W, rgba: P };
}
function gt(t) {
  let e = t[3], n = t[2] & 128, r = t[4] & 128, o = r ? n ? 5 : 7 : e & 7, c = r ? e & 7 : n ? 5 : 7;
  return o / c;
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
  const r = t * 4 + 1, o = 6 + e * (5 + r), c = [
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
    o >>> 24,
    o >> 16 & 255,
    o >> 8 & 255,
    o & 255,
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
    for (c.push(d + 1 < e ? 0 : 1, r & 255, r >> 8, ~r & 255, r >> 8 ^ 255, 0), a = (a + s) % 65521; u < l; u++) {
      const b = n[u] & 255;
      c.push(b), s = (s + b) % 65521, a = (a + s) % 65521;
    }
  c.push(
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
  for (let [d, u] of [[12, 29], [37, 41 + o]]) {
    let l = -1;
    for (let b = d; b < u; b++)
      l ^= c[b], l = l >>> 4 ^ f[l & 15], l = l >>> 4 ^ f[l & 15];
    l = ~l, c[u++] = l >>> 24, c[u++] = l >> 16 & 255, c[u++] = l >> 8 & 255, c[u++] = l & 255;
  }
  return `data:image/png;base64,${typeof Buffer < "u" ? Buffer.from(new Uint8Array(c)).toString("base64") : btoa(String.fromCharCode(...c))}`;
}
function Ct(t) {
  const { w: e, h: n, rgba: r } = Lt(ht(t));
  return ct(e, n, r);
}
const xt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~", N = (t, e, n) => {
  let r = 0;
  for (; e < n; )
    r *= 83, r += xt.indexOf(t[e++]);
  return r;
}, at = Math.pow, U = Math.PI, vt = U * 2, lt = 3294.6, it = 269.025, zt = (t) => t > 10.31475 ? at(t / it + 0.052132, 2.4) : t / lt, Y = (t) => ~~(t > 1227e-8 ? it * at(t, 0.416666) - 13.025 : t * lt + 1), H = (t) => (t < 0 ? -1 : 1) * t * t, rt = (t) => {
  for (t += U / 2; t > U; )
    t -= vt;
  const e = 1.27323954 * t - 0.405284735 * H(t);
  return 0.225 * (H(e) - e) + e;
};
function St(t) {
  const e = N(t, 2, 6);
  return [e >> 16, e >> 8 & 255, e & 255];
}
function Bt(t, e, n, r) {
  const o = N(t, 0, 1), c = o % 9 + 1, f = ~~(o / 9) + 1, s = c * f;
  let a = 0, p = 0, d = 0, u = 0, l = 0, b = 0, D = 0, L = 0, z = 0, y = 0, g = 0, O = 0, F = 0, C = 0;
  const _ = (N(t, 1, 2) + 1) / 13446 * (r | 1), h = new Float64Array(s * 3), k = St(t);
  for (a = 0; a < 3; a++)
    h[a] = zt(k[a]);
  for (a = 1; a < s; a++)
    C = N(t, 4 + a * 2, 6 + a * 2), h[a * 3] = H(~~(C / (19 * 19)) - 9) * _, h[a * 3 + 1] = H(~~(C / 19) % 19 - 9) * _, h[a * 3 + 2] = H(C % 19 - 9) * _;
  const M = e * 4, x = new Uint8ClampedArray(M * n);
  for (u = 0; u < n; u++)
    for (O = U * u / n, d = 0; d < e; d++) {
      for (l = 0, b = 0, D = 0, F = U * d / e, p = 0; p < f; p++)
        for (z = rt(O * p), a = 0; a < c; a++)
          L = rt(F * a) * z, y = (a + p * c) * 3, l += h[y] * L, b += h[y + 1] * L, D += h[y + 2] * L;
      g = 4 * d + u * M, x[g] = Y(l), x[g + 1] = Y(b), x[g + 2] = Y(D), x[g + 3] = 255;
    }
  return x;
}
function Dt(t, {
  ratio: e = 1,
  size: n = 32
} = {}) {
  const { width: r, height: o } = yt(e, n), c = Bt(t, r, o);
  return ct(r, o, c);
}
function ft(t = 'img[loading="lazy"]', {
  hash: e = !0,
  hashType: n = "blurhash",
  placeholderSize: r = 32,
  updateSizesOnResize: o = !1,
  onImageLoad: c
} = {}) {
  const f = /* @__PURE__ */ new Set();
  return st(t).map(async (s) => {
    await _t(s);
    const a = Z(s, { updateOnResize: o });
    if (o && a && f.add(a), // @ts-expect-error: Compile-time flag to exclude this code from the bundle
    e) {
      const d = Rt({
        image: s,
        hash: typeof e == "string" ? e : void 0,
        hashType: n,
        size: r
      });
      d && (s.src = d);
    }
    if (!s.dataset.src && !s.dataset.srcset) {
      console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", s);
      return;
    }
    if (Et || !pt) {
      ut(s), X(s), V(s);
      return;
    }
    if (s.src || (s.src = bt), s.complete && s.naturalWidth > 0) {
      Q(s, c);
      return;
    }
    const p = () => Q(s, c);
    s.addEventListener("load", p, { once: !0 }), f.add(
      () => s.removeEventListener("load", p)
    );
  }), () => {
    for (const s of f)
      s();
    f.clear();
  };
}
function Pt(t = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const e of st(t))
    Z(e);
}
function Q(t, e) {
  const n = new Image(), { srcset: r, src: o, sizes: c } = t.dataset;
  if (c === "auto") {
    const f = dt(t);
    f && (n.sizes = `${f}px`);
  } else
    t.sizes && (n.sizes = t.sizes);
  r && (n.srcset = r), o && (n.src = o), n.addEventListener("load", () => {
    ut(t), X(t), V(t), e == null || e(t);
  });
}
function Rt({
  /** If given, the hash will be extracted from the image's `data-blurhash` or `data-thumbhash` attribute and ratio will be calculated from the image's actual dimensions */
  image: t,
  hash: e,
  hashType: n = "blurhash",
  /** @default 32 */
  size: r = 32,
  /** Will be calculated from the image's actual dimensions if not provided and image is given */
  ratio: o
} = {}) {
  if (!e && t) {
    const { blurhash: c, thumbhash: f } = t.dataset;
    e = f || c, n = f ? "thumbhash" : "blurhash";
  }
  if (e)
    try {
      if (n === "thumbhash")
        return Ct(e);
      if (!o && t) {
        const c = t.width || t.offsetWidth || r, f = t.height || t.offsetHeight || r;
        o = c / f;
      }
      return Dt(e, { ratio: o, size: r });
    } catch (c) {
      console.error(`Error generating ${n} placeholder:`, c);
    }
}
const $ = /* @__PURE__ */ new WeakMap();
function Z(t, e) {
  var r;
  if (t.dataset.sizes !== "auto")
    return;
  const n = dt(t);
  if (n && (t.sizes = `${n}px`), ((r = t.parentElement) == null ? void 0 : r.tagName.toLowerCase()) === "picture" && !(e != null && e.skipChildren) && [...t.parentElement.getElementsByTagName("source")].forEach(
    (o) => Z(o, { skipChildren: !0 })
  ), e != null && e.updateOnResize) {
    if (!$.has(t)) {
      const o = wt(() => Z(t), 500), c = new ResizeObserver(o);
      $.set(t, c), c.observe(t);
    }
    return () => {
      const o = $.get(t);
      o && (o.disconnect(), $.delete(t));
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
const It = Object.freeze({
  autoSizes: Pt,
  lazyLoad: ft,
  loadImage: Q
});
var nt;
(nt = document.currentScript) != null && nt.hasAttribute("init") && ft();
export {
  Pt as autoSizes,
  It as default,
  ft as lazyLoad,
  Q as loadImage
};
