const At = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", rt = typeof window > "u", pt = !rt && "loading" in HTMLImageElement.prototype, _t = !rt && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function nt(t, e = document) {
  return typeof t == "string" ? [...e.querySelectorAll(t)] : t instanceof Element ? [t] : [...t];
}
function bt(t, e) {
  let n, r;
  return t >= 1 ? (n = e, r = Math.round(e / t)) : (n = Math.round(e * t), r = e), { width: n, height: r };
}
function yt(t) {
  const e = t.replace(/-/g, "+").replace(/_/g, "/"), n = typeof Buffer < "u" ? Buffer.from(e, "base64") : Uint8Array.from(atob(e), (r) => r.charCodeAt(0));
  return new Uint8Array(n);
}
function Et(t, e) {
  let n;
  return function(...r) {
    n && clearTimeout(n), n = setTimeout(() => {
      n = void 0, t(...r);
    }, e);
  };
}
function ht(t) {
  let { PI: e, min: n, max: r, cos: c, round: s } = Math, f = t[0] | t[1] << 8 | t[2] << 16, o = t[3] | t[4] << 8, a = (f & 63) / 63, _ = (f >> 6 & 63) / 31.5 - 1, d = (f >> 12 & 63) / 31.5 - 1, u = (f >> 18 & 31) / 31, i = f >> 23, p = (o >> 3 & 63) / 63, B = (o >> 9 & 63) / 63, L = o >> 15, S = r(3, L ? i ? 5 : 7 : o & 7), y = r(3, L ? o & 7 : i ? 5 : 7), w = i ? (t[5] & 15) / 15 : 1, T = (t[5] >> 4) / 15, H = i ? 6 : 5, m = 0, g = (U, h, D) => {
    let z = [];
    for (let C = 0; C < h; C++)
      for (let I = C ? 0 : 1; I * h < U * (h - C); I++)
        z.push(((t[H + (m >> 1)] >> ((m++ & 1) << 2) & 15) / 7.5 - 1) * D);
    return z;
  }, E = g(S, y, u), k = g(3, 3, p * 1.25), N = g(3, 3, B * 1.25), x = i && g(5, 5, T), M = gt(t), W = s(M > 1 ? 32 : 32 * M), F = s(M > 1 ? 32 / M : 32), G = new Uint8Array(W * F * 4), q = [], Z = [];
  for (let U = 0, h = 0; U < F; U++)
    for (let D = 0; D < W; D++, h += 4) {
      let z = a, C = _, I = d, V = w;
      for (let l = 0, A = r(S, i ? 5 : 3); l < A; l++)
        q[l] = c(e / W * (D + 0.5) * l);
      for (let l = 0, A = r(y, i ? 5 : 3); l < A; l++)
        Z[l] = c(e / F * (U + 0.5) * l);
      for (let l = 0, A = 0; l < y; l++)
        for (let b = l ? 0 : 1, P = Z[l] * 2; b * y < S * (y - l); b++, A++)
          z += E[A] * q[b] * P;
      for (let l = 0, A = 0; l < 3; l++)
        for (let b = l ? 0 : 1, P = Z[l] * 2; b < 3 - l; b++, A++) {
          let K = q[b] * P;
          C += k[A] * K, I += N[A] * K;
        }
      if (i)
        for (let l = 0, A = 0; l < 5; l++)
          for (let b = l ? 0 : 1, P = Z[l] * 2; b < 5 - l; b++, A++)
            V += x[A] * q[b] * P;
      let X = z - 2 / 3 * C, J = (3 * z - X + I) / 2, dt = J - I;
      G[h] = r(0, 255 * n(1, J)), G[h + 1] = r(0, 255 * n(1, dt)), G[h + 2] = r(0, 255 * n(1, X)), G[h + 3] = r(0, 255 * n(1, V));
    }
  return { w: W, h: F, rgba: G };
}
function gt(t) {
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
function ot(t, e, n) {
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
function Lt(t) {
  const { w: e, h: n, rgba: r } = ht(yt(t));
  return ot(e, n, r);
}
const wt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~", j = (t, e, n) => {
  let r = 0;
  for (; e < n; )
    r *= 83, r += wt.indexOf(t[e++]);
  return r;
}, st = Math.pow, v = Math.PI, mt = v * 2, ct = 3294.6, at = 269.025, xt = (t) => t > 10.31475 ? st(t / at + 0.052132, 2.4) : t / ct, Q = (t) => ~~(t > 1227e-8 ? at * st(t, 0.416666) - 13.025 : t * ct + 1), R = (t) => (t < 0 ? -1 : 1) * t * t, tt = (t) => {
  for (t += v / 2; t > v; )
    t -= mt;
  const e = 1.27323954 * t - 0.405284735 * R(t);
  return 0.225 * (R(e) - e) + e;
};
function Ct(t) {
  const e = j(t, 2, 6);
  return [e >> 16, e >> 8 & 255, e & 255];
}
function St(t, e, n, r) {
  const c = j(t, 0, 1), s = c % 9 + 1, f = ~~(c / 9) + 1, o = s * f;
  let a = 0, _ = 0, d = 0, u = 0, i = 0, p = 0, B = 0, L = 0, S = 0, y = 0, w = 0, T = 0, H = 0, m = 0;
  const g = (j(t, 1, 2) + 1) / 13446 * (r | 1), E = new Float64Array(o * 3), k = Ct(t);
  for (a = 0; a < 3; a++)
    E[a] = xt(k[a]);
  for (a = 1; a < o; a++)
    m = j(t, 4 + a * 2, 6 + a * 2), E[a * 3] = R(~~(m / (19 * 19)) - 9) * g, E[a * 3 + 1] = R(~~(m / 19) % 19 - 9) * g, E[a * 3 + 2] = R(m % 19 - 9) * g;
  const N = e * 4, x = new Uint8ClampedArray(N * n);
  for (u = 0; u < n; u++)
    for (T = v * u / n, d = 0; d < e; d++) {
      for (i = 0, p = 0, B = 0, H = v * d / e, _ = 0; _ < f; _++)
        for (S = tt(T * _), a = 0; a < s; a++)
          L = tt(H * a) * S, y = (a + _ * s) * 3, i += E[y] * L, p += E[y + 1] * L, B += E[y + 2] * L;
      w = 4 * d + u * N, x[w] = Q(i), x[w + 1] = Q(p), x[w + 2] = Q(B), x[w + 3] = 255;
    }
  return x;
}
function zt(t, {
  ratio: e = 1,
  size: n = 32
} = {}) {
  const { width: r, height: c } = bt(e, n), s = St(t, r, c);
  return ot(r, c, s);
}
function it(t = 'img[loading="lazy"]', {
  hash: e = !0,
  hashType: n = "blurhash",
  placeholderSize: r = 32,
  updateSizesOnResize: c = !1,
  onImageLoad: s
} = {}) {
  const f = /* @__PURE__ */ new Set();
  for (const o of nt(t)) {
    const a = O(o, { updateOnResize: c });
    if (c && a && f.add(a), // @ts-expect-error: Compile-time flag
    e) {
      const d = Bt({
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
    if (_t || !pt) {
      $(o, s);
      continue;
    }
    if (o.src || (o.src = At), console.log(1699882775467, "image already in viewport", {
      image: o,
      complete: o.complete,
      naturalWidth: o.naturalWidth,
      boundingWidth: o.getBoundingClientRect().width
    }), o.complete && o.naturalWidth > 0) {
      console.log(1699883770722, "load image directly", o), $(o, s);
      continue;
    }
    const _ = () => $(o, s);
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
function It(t = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const e of nt(t))
    O(e);
}
function $(t, e) {
  const n = new Image(), { srcset: r, src: c, sizes: s } = t.dataset;
  if (s === "auto") {
    const f = ut(t);
    f && (n.sizes = `${f}px`);
  } else
    t.sizes && (n.sizes = t.sizes);
  r && (n.srcset = r), c && (n.src = c), n.addEventListener("load", () => {
    O(t), Gt(t), ft(t), lt(t), e == null || e(t);
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
    const { blurhash: s, thumbhash: f } = t.dataset;
    e = f || s, n = f ? "thumbhash" : "blurhash";
  }
  if (e)
    try {
      if (n === "thumbhash")
        return Lt(e);
      if (!c && t) {
        const s = t.width || t.offsetWidth || r, f = t.height || t.offsetHeight || r;
        c = s / f;
      }
      return zt(e, { ratio: c, size: r });
    } catch (s) {
      (typeof __UNLAZY_LOGGING__ > "u" || __UNLAZY_LOGGING__) && console.error(`Error generating ${n} placeholder:`, s);
    }
}
const Y = /* @__PURE__ */ new WeakMap();
function O(t, e) {
  var r;
  if (t.dataset.sizes !== "auto")
    return;
  const n = ut(t);
  if (n && (t.sizes = `${n}px`), ((r = t.parentElement) == null ? void 0 : r.tagName.toLowerCase()) === "picture" && !(e != null && e.skipChildren) && [...t.parentElement.getElementsByTagName("source")].forEach(
    (c) => O(c, { skipChildren: !0 })
  ), e != null && e.updateOnResize) {
    if (!Y.has(t)) {
      const c = Et(() => O(t), 500), s = new ResizeObserver(c);
      Y.set(t, s), s.observe(t);
    }
    return () => {
      const c = Y.get(t);
      c && (c.disconnect(), Y.delete(t));
    };
  }
}
function lt(t) {
  t.dataset.src && (t.src = t.dataset.src, t.removeAttribute("data-src"));
}
function ft(t) {
  t.dataset.srcset && (t.srcset = t.dataset.srcset, t.removeAttribute("data-srcset"));
}
function Gt(t) {
  const e = t.parentElement;
  (e == null ? void 0 : e.tagName.toLowerCase()) === "picture" && ([...e.querySelectorAll("source[data-srcset]")].forEach(ft), [...e.querySelectorAll("source[data-src]")].forEach(lt));
}
function ut(t) {
  var e, n;
  return t instanceof HTMLSourceElement ? (n = (e = t.parentElement) == null ? void 0 : e.getElementsByTagName("img")[0]) == null ? void 0 : n.offsetWidth : t.offsetWidth;
}
const Ut = Object.freeze({
  autoSizes: It,
  lazyLoad: it,
  loadImage: $
});
var et;
(et = document.currentScript) != null && et.hasAttribute("init") && it();
export {
  It as autoSizes,
  Ut as default,
  it as lazyLoad,
  $ as loadImage
};
