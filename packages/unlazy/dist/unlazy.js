const y = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", h = typeof window > "u", v = !h && "loading" in HTMLImageElement.prototype, w = !h && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function p(e, t = document) {
  return typeof e == "string" ? [...t.querySelectorAll(e)] : e instanceof Element ? [e] : [...e];
}
function R(e, t) {
  let s;
  return function(...c) {
    s && clearTimeout(s), s = setTimeout(() => {
      s = void 0, e(...c);
    }, t);
  };
}
function S(e = 'img[loading="lazy"]', {
  hash: t = !0,
  hashType: s = "blurhash",
  placeholderSize: c = 32,
  updateSizesOnResize: n = !1,
  onImageLoad: a
} = {}) {
  const i = /* @__PURE__ */ new Set();
  for (const r of p(e)) {
    const A = u(r, { updateOnResize: n });
    if (n && A && i.add(A), !r.dataset.src && !r.dataset.srcset) {
      console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", r);
      continue;
    }
    if (w || !v) {
      L(r), l(r), d(r);
      continue;
    }
    if (r.src || (r.src = y), r.complete && r.naturalWidth > 0) {
      f(r, a);
      continue;
    }
    const E = () => f(r, a);
    r.addEventListener("load", E, { once: !0 }), i.add(
      () => r.removeEventListener("load", E)
    );
  }
  return () => {
    for (const r of i)
      r();
    i.clear();
  };
}
function T(e = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const t of p(e))
    u(t);
}
function f(e, t) {
  const s = new Image(), { srcset: c, src: n, sizes: a } = e.dataset;
  if (a === "auto") {
    const i = b(e);
    i && (s.sizes = `${i}px`);
  } else
    e.sizes && (s.sizes = e.sizes);
  c && (s.srcset = c), n && (s.src = n), s.addEventListener("load", () => {
    L(e), l(e), d(e), t == null || t(e);
  });
}
const o = /* @__PURE__ */ new WeakMap();
function u(e, t) {
  var c;
  if (e.dataset.sizes !== "auto")
    return;
  const s = b(e);
  if (s && (e.sizes = `${s}px`), ((c = e.parentElement) == null ? void 0 : c.tagName.toLowerCase()) === "picture" && !(t != null && t.isRecursiveCall) && [...e.parentElement.getElementsByTagName("source")].forEach(
    (n) => u(n, { isRecursiveCall: !0 })
  ), t != null && t.updateOnResize) {
    if (!o.has(e)) {
      const n = R(() => u(e), 500), a = new ResizeObserver(n);
      o.set(e, a), a.observe(e);
    }
    return () => {
      const n = o.get(e);
      n && (n.disconnect(), o.delete(e));
    };
  }
}
function d(e) {
  e.dataset.src && (e.src = e.dataset.src, e.removeAttribute("data-src"));
}
function l(e) {
  e.dataset.srcset && (e.srcset = e.dataset.srcset, e.removeAttribute("data-srcset"));
}
function L(e) {
  const t = e.parentElement;
  (t == null ? void 0 : t.tagName.toLowerCase()) === "picture" && ([...t.querySelectorAll("source[data-srcset]")].forEach(l), [...t.querySelectorAll("source[data-src]")].forEach(d));
}
function b(e) {
  var t, s;
  return e instanceof HTMLSourceElement ? (s = (t = e.parentElement) == null ? void 0 : t.getElementsByTagName("img")[0]) == null ? void 0 : s.offsetWidth : e.offsetWidth;
}
const C = Object.freeze({
  autoSizes: T,
  lazyLoad: S,
  loadImage: f
});
var z;
(z = document.currentScript) != null && z.hasAttribute("init") && S();
export {
  T as autoSizes,
  C as default,
  S as lazyLoad,
  f as loadImage
};
