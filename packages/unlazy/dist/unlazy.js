const w = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", p = typeof window > "u", L = !p && "loading" in HTMLImageElement.prototype, g = !p && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function z(e, t = document) {
  return typeof e == "string" ? [...t.querySelectorAll(e)] : e instanceof Element ? [e] : [...e];
}
function v(e, t) {
  let r;
  return function(...i) {
    r && clearTimeout(r), r = setTimeout(() => {
      r = void 0, e(...i);
    }, t);
  };
}
function y(e = 'img[loading="lazy"]', {
  hash: t = !0,
  hashType: r = "blurhash",
  placeholderSize: i = 32,
  updateSizesOnResize: n = !1,
  onImageLoad: a
} = {}) {
  const c = /* @__PURE__ */ new Set();
  for (const s of z(e)) {
    const A = u(s, { updateOnResize: n });
    if (n && A && c.add(A), !s.dataset.src && !s.dataset.srcset) {
      console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", s);
      continue;
    }
    if (g || !L) {
      S(s), l(s), f(s);
      continue;
    }
    if (s.src || (s.src = w), console.log(1699882775467, "image already in viewport", {
      image: s,
      complete: s.complete,
      naturalWidth: s.naturalWidth,
      boundingWidth: s.getBoundingClientRect().width
    }), s.complete && s.naturalWidth > 0) {
      console.log(1699883770722, "load image directly", s), d(s, a);
      continue;
    }
    const E = () => d(s, a);
    s.addEventListener("load", E, { once: !0 }), c.add(
      () => s.removeEventListener("load", E)
    );
  }
  return () => {
    for (const s of c)
      s();
    c.clear();
  };
}
function R(e = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const t of z(e))
    u(t);
}
function d(e, t) {
  const r = new Image(), { srcset: i, src: n, sizes: a } = e.dataset;
  if (a === "auto") {
    const c = b(e);
    c && (r.sizes = `${c}px`);
  } else
    e.sizes && (r.sizes = e.sizes);
  i && (r.srcset = i), n && (r.src = n), r.addEventListener("load", () => {
    S(e), l(e), f(e), t == null || t(e);
  });
}
const o = /* @__PURE__ */ new WeakMap();
function u(e, t) {
  var i;
  if (e.dataset.sizes !== "auto")
    return;
  const r = b(e);
  if (r && (e.sizes = `${r}px`), ((i = e.parentElement) == null ? void 0 : i.tagName.toLowerCase()) === "picture" && !(t != null && t.isRecursiveCall) && [...e.parentElement.getElementsByTagName("source")].forEach(
    (n) => u(n, { isRecursiveCall: !0 })
  ), t != null && t.updateOnResize) {
    if (!o.has(e)) {
      const n = v(() => u(e), 500), a = new ResizeObserver(n);
      o.set(e, a), a.observe(e);
    }
    return () => {
      const n = o.get(e);
      n && (n.disconnect(), o.delete(e));
    };
  }
}
function f(e) {
  e.dataset.src && (e.src = e.dataset.src, e.removeAttribute("data-src"));
}
function l(e) {
  e.dataset.srcset && (e.srcset = e.dataset.srcset, e.removeAttribute("data-srcset"));
}
function S(e) {
  const t = e.parentElement;
  (t == null ? void 0 : t.tagName.toLowerCase()) === "picture" && ([...t.querySelectorAll("source[data-srcset]")].forEach(l), [...t.querySelectorAll("source[data-src]")].forEach(f));
}
function b(e) {
  var t, r;
  return e instanceof HTMLSourceElement ? (r = (t = e.parentElement) == null ? void 0 : t.getElementsByTagName("img")[0]) == null ? void 0 : r.offsetWidth : e.offsetWidth;
}
const m = Object.freeze({
  autoSizes: R,
  lazyLoad: y,
  loadImage: d
});
var h;
(h = document.currentScript) != null && h.hasAttribute("init") && y();
export {
  R as autoSizes,
  m as default,
  y as lazyLoad,
  d as loadImage
};
