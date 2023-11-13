const pt = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", ot = typeof window > "u", _t = !ot && "loading" in HTMLImageElement.prototype, bt = !ot && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function st(t, e = document) {
  return typeof t == "string" ? [...e.querySelectorAll(t)] : t instanceof Element ? [t] : [...t];
}
function yt(t, e) {
  let n, r;
  return t >= 1 ? (n = e, r = Math.round(e / t)) : (n = Math.round(e * t), r = e), { width: n, height: r };
}
function Et(t) {
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
function ht(t) {
  let { PI: e, min: n, max: r, cos: c, round: s } = Math, f = t[0] | t[1] << 8 | t[2] << 16, o = t[3] | t[4] << 8, a = (f & 63) / 63, _ = (f >> 6 & 63) / 31.5 - 1, d = (f >> 12 & 63) / 31.5 - 1, u = (f >> 18 & 31) / 31, i = f >> 23, p = (o >> 3 & 63) / 63, B = (o >> 9 & 63) / 63, L = o >> 15, I = r(3, L ? i ? 5 : 7 : o & 7), y = r(3, L ? o & 7 : i ? 5 : 7), w = i ? (t[5] & 15) / 15 : 1, O = (t[5] >> 4) / 15, T = i ? 6 : 5, m = 0, h = (U, g, D) => {
    let S = [];
    for (let C = 0; C < g; C++)
      for (let z = C ? 0 : 1; z * g < U * (g - C); z++)
        S.push(((t[T + (m >> 1)] >> ((m++ & 1) << 2) & 15) / 7.5 - 1) * D);
    return S;
  }, E = h(I, y, u), $ = h(3, 3, p * 1.25), H = h(3, 3, B * 1.25), x = i && h(5, 5, O), N = Lt(t), M = s(N > 1 ? 32 : 32 * N), W = s(N > 1 ? 32 / N : 32), G = new Uint8Array(M * W * 4), F = [], q = [];
  for (let U = 0, g = 0; U < W; U++)
    for (let D = 0; D < M; D++, g += 4) {
      let S = a, C = _, z = d, J = w;
      for (let l = 0, A = r(I, i ? 5 : 3); l < A; l++)
        F[l] = c(e / M * (D + 0.5) * l);
      for (let l = 0, A = r(y, i ? 5 : 3); l < A; l++)
        q[l] = c(e / W * (U + 0.5) * l);
      for (let l = 0, A = 0; l < y; l++)
        for (let b = l ? 0 : 1, P = q[l] * 2; b * y < I * (y - l); b++, A++)
          S += E[A] * F[b] * P;
      for (let l = 0, A = 0; l < 3; l++)
        for (let b = l ? 0 : 1, P = q[l] * 2; b < 3 - l; b++, A++) {
          let et = F[b] * P;
          C += $[A] * et, z += H[A] * et;
        }
      if (i)
        for (let l = 0, A = 0; l < 5; l++)
          for (let b = l ? 0 : 1, P = q[l] * 2; b < 5 - l; b++, A++)
            J += x[A] * F[b] * P;
      let K = S - 2 / 3 * C, tt = (3 * S - K + z) / 2, At = tt - z;
      G[g] = r(0, 255 * n(1, tt)), G[g + 1] = r(0, 255 * n(1, At)), G[g + 2] = r(0, 255 * n(1, K)), G[g + 3] = r(0, 255 * n(1, J));
    }
  return { w: M, h: W, rgba: G };
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
  for (let d = 0, u = 0, i = r - 1; d < e; d++, i += r - 1)
    for (s.push(d + 1 < e ? 0 : 1, r & 255, r >> 8, ~r & 255, r >> 8 ^ 255, 0), a = (a + o) % 65521; u < i; u++) {
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
    let i = -1;
    for (let p = d; p < u; p++)
      i ^= s[p], i = i >>> 4 ^ f[i & 15], i = i >>> 4 ^ f[i & 15];
    i = ~i, s[u++] = i >>> 24, s[u++] = i >> 16 & 255, s[u++] = i >> 8 & 255, s[u++] = i & 255;
  }
  return `data:image/png;base64,${typeof Buffer < "u" ? Buffer.from(new Uint8Array(s)).toString("base64") : btoa(String.fromCharCode(...s))}`;
}
function wt(t) {
  const { w: e, h: n, rgba: r } = ht(Et(t));
  return ct(e, n, r);
}
const mt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~", Y = (t, e, n) => {
  let r = 0;
  for (; e < n; )
    r *= 83, r += mt.indexOf(t[e++]);
  return r;
}, at = Math.pow, v = Math.PI, xt = v * 2, it = 3294.6, lt = 269.025, Ct = (t) => t > 10.31475 ? at(t / lt + 0.052132, 2.4) : t / it, k = (t) => ~~(t > 1227e-8 ? lt * at(t, 0.416666) - 13.025 : t * it + 1), R = (t) => (t < 0 ? -1 : 1) * t * t, rt = (t) => {
  for (t += v / 2; t > v; )
    t -= xt;
  const e = 1.27323954 * t - 0.405284735 * R(t);
  return 0.225 * (R(e) - e) + e;
};
function It(t) {
  const e = Y(t, 2, 6);
  return [e >> 16, e >> 8 & 255, e & 255];
}
function St(t, e, n, r) {
  const c = Y(t, 0, 1), s = c % 9 + 1, f = ~~(c / 9) + 1, o = s * f;
  let a = 0, _ = 0, d = 0, u = 0, i = 0, p = 0, B = 0, L = 0, I = 0, y = 0, w = 0, O = 0, T = 0, m = 0;
  const h = (Y(t, 1, 2) + 1) / 13446 * (r | 1), E = new Float64Array(o * 3), $ = It(t);
  for (a = 0; a < 3; a++)
    E[a] = Ct($[a]);
  for (a = 1; a < o; a++)
    m = Y(t, 4 + a * 2, 6 + a * 2), E[a * 3] = R(~~(m / (19 * 19)) - 9) * h, E[a * 3 + 1] = R(~~(m / 19) % 19 - 9) * h, E[a * 3 + 2] = R(m % 19 - 9) * h;
  const H = e * 4, x = new Uint8ClampedArray(H * n);
  for (u = 0; u < n; u++)
    for (O = v * u / n, d = 0; d < e; d++) {
      for (i = 0, p = 0, B = 0, T = v * d / e, _ = 0; _ < f; _++)
        for (I = rt(O * _), a = 0; a < s; a++)
          L = rt(T * a) * I, y = (a + _ * s) * 3, i += E[y] * L, p += E[y + 1] * L, B += E[y + 2] * L;
      w = 4 * d + u * H, x[w] = k(i), x[w + 1] = k(p), x[w + 2] = k(B), x[w + 3] = 255;
    }
  return x;
}
function zt(t, {
  ratio: e = 1,
  size: n = 32
} = {}) {
  const { width: r, height: c } = yt(e, n), s = St(t, r, c);
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
  for (const o of st(t)) {
    const a = j(o, { updateOnResize: c });
    if (c && a && f.add(a), // @ts-expect-error: Compile-time flag
    e) {
      const d = Gt({
        image: o,
        hash: typeof e == "string" ? e : void 0,
        hashType: n,
        size: r
      });
      d && (o.src = d);
    }
    if (!o.dataset.src && !o.dataset.srcset) {
      (typeof __UNLAZY_LOGGING__ > "u" || __UNLAZY_LOGGING__) && console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", o);
      continue;
    }
    if (bt || !_t) {
      ut(o), X(o), V(o);
      continue;
    }
    if (o.src || (o.src = pt), console.log(1699882775467, "image already in viewport", {
      image: o,
      complete: o.complete,
      naturalWidth: o.naturalWidth,
      boundingWidth: o.getBoundingClientRect().width
    }), o.complete && o.naturalWidth > 0) {
      console.log(1699883770722, "load image directly", o), Q(o, s);
      continue;
    }
    const _ = () => Q(o, s);
    o.addEventListener("load", _, { once: !0 }), f.add(
      () => o.removeEventListener("load", _)
    );
  }
  return () => {
    for (const o of f)
      o();
    f.clear();
  };
}
function Bt(t = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const e of st(t))
    j(e);
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
function Gt({
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
        return wt(e);
      if (!c && t) {
        const s = t.width || t.offsetWidth || r, f = t.height || t.offsetHeight || r;
        c = s / f;
      }
      return zt(e, { ratio: c, size: r });
    } catch (s) {
      (typeof __UNLAZY_LOGGING__ > "u" || __UNLAZY_LOGGING__) && console.error(`Error generating ${n} placeholder:`, s);
    }
}
const Z = /* @__PURE__ */ new WeakMap();
function j(t, e) {
  var r;
  if (t.dataset.sizes !== "auto")
    return;
  const n = dt(t);
  if (n && (t.sizes = `${n}px`), ((r = t.parentElement) == null ? void 0 : r.tagName.toLowerCase()) === "picture" && !(e != null && e.skipChildren) && [...t.parentElement.getElementsByTagName("source")].forEach(
    (c) => j(c, { skipChildren: !0 })
  ), e != null && e.updateOnResize) {
    if (!Z.has(t)) {
      const c = gt(() => j(t), 500), s = new ResizeObserver(c);
      Z.set(t, s), s.observe(t);
    }
    return () => {
      const c = Z.get(t);
      c && (c.disconnect(), Z.delete(t));
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
const Ut = Object.freeze({
  autoSizes: Bt,
  lazyLoad: ft,
  loadImage: Q
});
var nt;
(nt = document.currentScript) != null && nt.hasAttribute("init") && ft();
export {
  Bt as autoSizes,
  Ut as default,
  ft as lazyLoad,
  Q as loadImage
};
