const w = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", p = typeof window > "u", L = !p && "loading" in HTMLImageElement.prototype, v = !p && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function z(t, e = document) {
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
function y(t = 'img[loading="lazy"]', {
  hash: e = !0,
  hashType: s = "blurhash",
  placeholderSize: c = 32,
  updateSizesOnResize: n = !1,
  onImageLoad: o
} = {}) {
  const a = /* @__PURE__ */ new Set();
  return z(t).map(async (r) => {
    const A = u(r, { updateOnResize: n });
    if (n && A && a.add(A), !r.dataset.src && !r.dataset.srcset) {
      console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", r);
      return;
    }
    if (v || !L) {
      S(r), l(r), f(r);
      return;
    }
    if (r.src || (r.src = w), r.complete && r.naturalWidth > 0) {
      console.log(1699882775467, "image already in viewport", {
        image: r,
        complete: r.complete,
        naturalWidth: r.naturalWidth,
        boundingWidth: r.getBoundingClientRect().width
      }), d(r, o);
      return;
    }
    const E = () => d(r, o);
    r.addEventListener("load", E, { once: !0 }), a.add(
      () => r.removeEventListener("load", E)
    );
  }), () => {
    for (const r of a)
      r();
    a.clear();
  };
}
function C(t = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const e of z(t))
    u(e);
}
function d(t, e) {
  const s = new Image(), { srcset: c, src: n, sizes: o } = t.dataset;
  if (o === "auto") {
    const a = b(t);
    a && (s.sizes = `${a}px`);
  } else
    t.sizes && (s.sizes = t.sizes);
  c && (s.srcset = c), n && (s.src = n), s.addEventListener("load", () => {
    S(t), l(t), f(t), e == null || e(t);
  });
}
const i = /* @__PURE__ */ new WeakMap();
function u(t, e) {
  var c;
  if (t.dataset.sizes !== "auto")
    return;
  const s = b(t);
  if (s && (t.sizes = `${s}px`), ((c = t.parentElement) == null ? void 0 : c.tagName.toLowerCase()) === "picture" && !(e != null && e.skipChildren) && [...t.parentElement.getElementsByTagName("source")].forEach(
    (n) => u(n, { skipChildren: !0 })
  ), e != null && e.updateOnResize) {
    if (!i.has(t)) {
      const n = R(() => u(t), 500), o = new ResizeObserver(n);
      i.set(t, o), o.observe(t);
    }
    return () => {
      const n = i.get(t);
      n && (n.disconnect(), i.delete(t));
    };
  }
}
function f(t) {
  t.dataset.src && (t.src = t.dataset.src, t.removeAttribute("data-src"));
}
function l(t) {
  t.dataset.srcset && (t.srcset = t.dataset.srcset, t.removeAttribute("data-srcset"));
}
function S(t) {
  const e = t.parentElement;
  (e == null ? void 0 : e.tagName.toLowerCase()) === "picture" && ([...e.querySelectorAll("source[data-srcset]")].forEach(l), [...e.querySelectorAll("source[data-src]")].forEach(f));
}
function b(t) {
  var e, s;
  return t instanceof HTMLSourceElement ? (s = (e = t.parentElement) == null ? void 0 : e.getElementsByTagName("img")[0]) == null ? void 0 : s.offsetWidth : t.offsetWidth;
}
const T = Object.freeze({
  autoSizes: C,
  lazyLoad: y,
  loadImage: d
});
var h;
(h = document.currentScript) != null && h.hasAttribute("init") && y();
export {
  C as autoSizes,
  T as default,
  y as lazyLoad,
  d as loadImage
};
