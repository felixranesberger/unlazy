const v = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", z = typeof window > "u", y = !z && "loading" in HTMLImageElement.prototype, L = !z && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function p(t, e = document) {
  return typeof t == "string" ? [...e.querySelectorAll(t)] : t instanceof Element ? [t] : [...t];
}
function R(t, e) {
  let s;
  return function(...c) {
    s && clearTimeout(s), s = setTimeout(() => {
      s = void 0, t(...c);
    }, e);
  };
}
function C(t) {
  const { width: e } = t.getBoundingClientRect();
  return e > 0 ? Promise.resolve() : new Promise((s) => {
    const c = new ResizeObserver(() => {
      const { width: n } = t.getBoundingClientRect();
      n > 0 && (c.disconnect(), s());
    });
    c.observe(t);
  });
}
function w(t = 'img[loading="lazy"]', {
  hash: e = !0,
  hashType: s = "blurhash",
  placeholderSize: c = 32,
  updateSizesOnResize: n = !1,
  onImageLoad: o
} = {}) {
  const i = /* @__PURE__ */ new Set();
  return p(t).map(async (r) => {
    await C(r);
    const A = u(r, { updateOnResize: n });
    if (n && A && i.add(A), !r.dataset.src && !r.dataset.srcset) {
      console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", r);
      return;
    }
    if (L || !y) {
      b(r), l(r), f(r);
      return;
    }
    if (r.src || (r.src = v), r.complete && r.naturalWidth > 0) {
      d(r, o);
      return;
    }
    const E = () => d(r, o);
    r.addEventListener("load", E, { once: !0 }), i.add(
      () => r.removeEventListener("load", E)
    );
  }), () => {
    for (const r of i)
      r();
    i.clear();
  };
}
function T(t = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const e of p(t))
    u(e);
}
function d(t, e) {
  const s = new Image(), { srcset: c, src: n, sizes: o } = t.dataset;
  if (o === "auto") {
    const i = S(t);
    i && (s.sizes = `${i}px`);
  } else
    t.sizes && (s.sizes = t.sizes);
  c && (s.srcset = c), n && (s.src = n), s.addEventListener("load", () => {
    b(t), l(t), f(t), e == null || e(t);
  });
}
const a = /* @__PURE__ */ new WeakMap();
function u(t, e) {
  var c;
  if (t.dataset.sizes !== "auto")
    return;
  const s = S(t);
  if (s && (t.sizes = `${s}px`), ((c = t.parentElement) == null ? void 0 : c.tagName.toLowerCase()) === "picture" && !(e != null && e.skipChildren) && [...t.parentElement.getElementsByTagName("source")].forEach(
    (n) => u(n, { skipChildren: !0 })
  ), e != null && e.updateOnResize) {
    if (!a.has(t)) {
      const n = R(() => u(t), 500), o = new ResizeObserver(n);
      a.set(t, o), o.observe(t);
    }
    return () => {
      const n = a.get(t);
      n && (n.disconnect(), a.delete(t));
    };
  }
}
function f(t) {
  t.dataset.src && (t.src = t.dataset.src, t.removeAttribute("data-src"));
}
function l(t) {
  t.dataset.srcset && (t.srcset = t.dataset.srcset, t.removeAttribute("data-srcset"));
}
function b(t) {
  const e = t.parentElement;
  (e == null ? void 0 : e.tagName.toLowerCase()) === "picture" && ([...e.querySelectorAll("source[data-srcset]")].forEach(l), [...e.querySelectorAll("source[data-src]")].forEach(f));
}
function S(t) {
  var e, s;
  return t instanceof HTMLSourceElement ? (s = (e = t.parentElement) == null ? void 0 : e.getElementsByTagName("img")[0]) == null ? void 0 : s.offsetWidth : t.offsetWidth;
}
const O = Object.freeze({
  autoSizes: T,
  lazyLoad: w,
  loadImage: d
});
var h;
(h = document.currentScript) != null && h.hasAttribute("init") && w();
export {
  T as autoSizes,
  O as default,
  w as lazyLoad,
  d as loadImage
};
