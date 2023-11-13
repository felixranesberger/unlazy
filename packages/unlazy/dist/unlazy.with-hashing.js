const pt = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", ot = typeof window > "u", bt = !ot && "loading" in HTMLImageElement.prototype, yt = !ot && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function st(t, e = document) {
  return typeof t == "string" ? [...e.querySelectorAll(t)] : t instanceof Element ? [t] : [...t];
}
function Et(t, e) {
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
  let { PI: e, min: n, max: r, cos: c, round: s } = Math, f = t[0] | t[1] << 8 | t[2] << 16, o = t[3] | t[4] << 8, a = (f & 63) / 63, b = (f >> 6 & 63) / 31.5 - 1, d = (f >> 12 & 63) / 31.5 - 1, u = (f >> 18 & 31) / 31, l = f >> 23, p = (o >> 3 & 63) / 63, R = (o >> 9 & 63) / 63, L = o >> 15, B = r(3, L ? l ? 5 : 7 : o & 7), E = r(3, L ? o & 7 : l ? 5 : 7), x = l ? (t[5] & 15) / 15 : 1, O = (t[5] >> 4) / 15, M = l ? 6 : 5, C = 0, _ = (I, w, T) => {
    let D = [];
    for (let z = 0; z < w; z++)
      for (let P = z ? 0 : 1; P * w < I * (w - z); P++)
        D.push(((t[M + (C >> 1)] >> ((C++ & 1) << 2) & 15) / 7.5 - 1) * T);
    return D;
  }, h = _(B, E, u), k = _(3, 3, p * 1.25), W = _(3, 3, R * 1.25), S = l && _(5, 5, O), F = Lt(t), q = s(F > 1 ? 32 : 32 * F), j = s(F > 1 ? 32 / F : 32), v = new Uint8Array(q * j * 4), m = [], G = [];
  for (let I = 0, w = 0; I < j; I++)
    for (let T = 0; T < q; T++, w += 4) {
      let D = a, z = b, P = d, J = x;
      for (let i = 0, A = r(B, l ? 5 : 3); i < A; i++)
        m[i] = c(e / q * (T + 0.5) * i);
      for (let i = 0, A = r(E, l ? 5 : 3); i < A; i++)
        G[i] = c(e / j * (I + 0.5) * i);
      for (let i = 0, A = 0; i < E; i++)
        for (let y = i ? 0 : 1, g = G[i] * 2; y * E < B * (E - i); y++, A++)
          D += h[A] * m[y] * g;
      for (let i = 0, A = 0; i < 3; i++)
        for (let y = i ? 0 : 1, g = G[i] * 2; y < 3 - i; y++, A++) {
          let et = m[y] * g;
          z += k[A] * et, P += W[A] * et;
        }
      if (l)
        for (let i = 0, A = 0; i < 5; i++)
          for (let y = i ? 0 : 1, g = G[i] * 2; y < 5 - i; y++, A++)
            J += S[A] * m[y] * g;
      let K = D - 2 / 3 * z, tt = (3 * D - K + P) / 2, At = tt - P;
      v[w] = r(0, 255 * n(1, tt)), v[w + 1] = r(0, 255 * n(1, At)), v[w + 2] = r(0, 255 * n(1, K)), v[w + 3] = r(0, 255 * n(1, J));
    }
  return { w: q, h: j, rgba: v };
}
function Lt(t) {
  let e = t[3], n = t[2] & 128, r = t[4] & 128, c = r ? n ? 5 : 7 : e & 7, s = r ? e & 7 : n ? 5 : 7;
  return c / s;
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
  const r = t * 4 + 1, c = 6 + e * (5 + r), s = [
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
  let o = 1, a = 0;
  for (let d = 0, u = 0, l = r - 1; d < e; d++, l += r - 1)
    for (s.push(d + 1 < e ? 0 : 1, r & 255, r >> 8, ~r & 255, r >> 8 ^ 255, 0), a = (a + o) % 65521; u < l; u++) {
      const p = n[u] & 255;
      s.push(p), o = (o + p) % 65521, a = (a + o) % 65521;
    }
  s.push(
    a >> 8,
    a & 255,
    o >> 8,
    o & 255,
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
    for (let p = d; p < u; p++)
      l ^= s[p], l = l >>> 4 ^ f[l & 15], l = l >>> 4 ^ f[l & 15];
    l = ~l, s[u++] = l >>> 24, s[u++] = l >> 16 & 255, s[u++] = l >> 8 & 255, s[u++] = l & 255;
  }
  return `data:image/png;base64,${typeof Buffer < "u" ? Buffer.from(new Uint8Array(s)).toString("base64") : btoa(String.fromCharCode(...s))}`;
}
function xt(t) {
  const { w: e, h: n, rgba: r } = _t(ht(t));
  return ct(e, n, r);
}
const Ct = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~", N = (t, e, n) => {
  let r = 0;
  for (; e < n; )
    r *= 83, r += Ct.indexOf(t[e++]);
  return r;
}, at = Math.pow, U = Math.PI, St = U * 2, lt = 3294.6, it = 269.025, zt = (t) => t > 10.31475 ? at(t / it + 0.052132, 2.4) : t / lt, Y = (t) => ~~(t > 1227e-8 ? it * at(t, 0.416666) - 13.025 : t * lt + 1), H = (t) => (t < 0 ? -1 : 1) * t * t, rt = (t) => {
  for (t += U / 2; t > U; )
    t -= St;
  const e = 1.27323954 * t - 0.405284735 * H(t);
  return 0.225 * (H(e) - e) + e;
};
function Bt(t) {
  const e = N(t, 2, 6);
  return [e >> 16, e >> 8 & 255, e & 255];
}
function Dt(t, e, n, r) {
  const c = N(t, 0, 1), s = c % 9 + 1, f = ~~(c / 9) + 1, o = s * f;
  let a = 0, b = 0, d = 0, u = 0, l = 0, p = 0, R = 0, L = 0, B = 0, E = 0, x = 0, O = 0, M = 0, C = 0;
  const _ = (N(t, 1, 2) + 1) / 13446 * (r | 1), h = new Float64Array(o * 3), k = Bt(t);
  for (a = 0; a < 3; a++)
    h[a] = zt(k[a]);
  for (a = 1; a < o; a++)
    C = N(t, 4 + a * 2, 6 + a * 2), h[a * 3] = H(~~(C / (19 * 19)) - 9) * _, h[a * 3 + 1] = H(~~(C / 19) % 19 - 9) * _, h[a * 3 + 2] = H(C % 19 - 9) * _;
  const W = e * 4, S = new Uint8ClampedArray(W * n);
  for (u = 0; u < n; u++)
    for (O = U * u / n, d = 0; d < e; d++) {
      for (l = 0, p = 0, R = 0, M = U * d / e, b = 0; b < f; b++)
        for (B = rt(O * b), a = 0; a < s; a++)
          L = rt(M * a) * B, E = (a + b * s) * 3, l += h[E] * L, p += h[E + 1] * L, R += h[E + 2] * L;
      x = 4 * d + u * W, S[x] = Y(l), S[x + 1] = Y(p), S[x + 2] = Y(R), S[x + 3] = 255;
    }
  return S;
}
function Pt(t, {
  ratio: e = 1,
  size: n = 32
} = {}) {
  const { width: r, height: c } = Et(e, n), s = Dt(t, r, c);
  return ct(r, c, s);
}
function ft(t = 'img[loading="lazy"]', {
  hash: e = !0,
  hashType: n = "blurhash",
  placeholderSize: r = 32,
  updateSizesOnResize: c = !1,
  onImageLoad: s
} = {}) {
  const f = /* @__PURE__ */ new Set();
  return st(t).map(async (o) => {
    const a = Z(o, { updateOnResize: c });
    if (c && a && f.add(a), // @ts-expect-error: Compile-time flag to exclude this code from the bundle
    e) {
      const d = vt({
        image: o,
        hash: typeof e == "string" ? e : void 0,
        hashType: n,
        size: r
      });
      d && (o.src = d);
    }
    if (!o.dataset.src && !o.dataset.srcset) {
      console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", o);
      return;
    }
    if (yt || !bt) {
      ut(o), X(o), V(o);
      return;
    }
    if (o.src || (o.src = pt), o.complete && o.naturalWidth > 0) {
      console.log(1699882775467, "image already in viewport", {
        complete: o.complete,
        naturalWidth: o.naturalWidth,
        boundingWidth: o.getBoundingClientRect().width
      }), Q(o, s);
      return;
    }
    const b = () => Q(o, s);
    o.addEventListener("load", b, { once: !0 }), f.add(
      () => o.removeEventListener("load", b)
    );
  }), () => {
    for (const o of f)
      o();
    f.clear();
  };
}
function Rt(t = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const e of st(t))
    Z(e);
}
function Q(t, e) {
  const n = new Image(), { srcset: r, src: c, sizes: s } = t.dataset;
  if (s === "auto") {
    const f = dt(t);
    f && (n.sizes = `${f}px`);
  } else
    t.sizes && (n.sizes = t.sizes);
  r && (n.srcset = r), c && (n.src = c), n.addEventListener("load", () => {
    ut(t), X(t), V(t), e == null || e(t);
  });
}
function vt({
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
    const { blurhash: s, thumbhash: f } = t.dataset;
    e = f || s, n = f ? "thumbhash" : "blurhash";
  }
  if (e)
    try {
      if (n === "thumbhash")
        return xt(e);
      if (!c && t) {
        const s = t.width || t.offsetWidth || r, f = t.height || t.offsetHeight || r;
        c = s / f;
      }
      return Pt(e, { ratio: c, size: r });
    } catch (s) {
      console.error(`Error generating ${n} placeholder:`, s);
    }
}
const $ = /* @__PURE__ */ new WeakMap();
function Z(t, e) {
  var r;
  if (t.dataset.sizes !== "auto")
    return;
  const n = dt(t);
  if (n && (t.sizes = `${n}px`), ((r = t.parentElement) == null ? void 0 : r.tagName.toLowerCase()) === "picture" && !(e != null && e.skipChildren) && [...t.parentElement.getElementsByTagName("source")].forEach(
    (c) => Z(c, { skipChildren: !0 })
  ), e != null && e.updateOnResize) {
    if (!$.has(t)) {
      const c = wt(() => Z(t), 500), s = new ResizeObserver(c);
      $.set(t, s), s.observe(t);
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
const It = Object.freeze({
  autoSizes: Rt,
  lazyLoad: ft,
  loadImage: Q
});
var nt;
(nt = document.currentScript) != null && nt.hasAttribute("init") && ft();
export {
  Rt as autoSizes,
  It as default,
  ft as lazyLoad,
  Q as loadImage
};
