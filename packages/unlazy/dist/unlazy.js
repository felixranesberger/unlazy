const S = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", E = typeof window > "u", _ = !E && "loading" in HTMLImageElement.prototype, b = !E && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function h(e, t = document) {
  return typeof e == "string" ? [...t.querySelectorAll(e)] : e instanceof Element ? [e] : [...e];
}
function w(e, t) {
  let r;
  return function(...i) {
    r && clearTimeout(r), r = setTimeout(() => {
      r = void 0, e(...i);
    }, t);
  };
}
function p(e = 'img[loading="lazy"]', {
  hash: t = !0,
  hashType: r = "blurhash",
  placeholderSize: i = 32,
  updateSizesOnResize: n = !1,
  onImageLoad: c
} = {}) {
  const o = /* @__PURE__ */ new Set();
  for (const s of h(e)) {
    const f = a(s, { updateOnResize: n });
    if (n && f && o.add(f), !s.dataset.src && !s.dataset.srcset) {
      (typeof __UNLAZY_LOGGING__ > "u" || __UNLAZY_LOGGING__) && console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", s);
      continue;
    }
    if (b || !_) {
      d(s, c);
      continue;
    }
    if (s.src || (s.src = S), console.log(1699882775467, "image already in viewport", {
      image: s,
      complete: s.complete,
      naturalWidth: s.naturalWidth,
      boundingWidth: s.getBoundingClientRect().width
    }), s.complete && s.naturalWidth > 0) {
      console.log(1699883770722, "load image directly", s), d(s, c);
      continue;
    }
    const l = () => d(s, c);
    s.addEventListener("load", l, { once: !0 }), o.add(
      () => s.removeEventListener("load", l)
    );
  }
  return () => {
    for (const s of o)
      s();
    o.clear();
  };
}
function g(e = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const t of h(e))
    a(t);
}
function d(e, t) {
  const r = new Image(), { srcset: i, src: n, sizes: c } = e.dataset;
  if (c === "auto") {
    const o = y(e);
    o && (r.sizes = `${o}px`);
  } else
    e.sizes && (r.sizes = e.sizes);
  i && (r.srcset = i), n && (r.src = n), r.addEventListener("load", () => {
    a(e), v(e), L(e), z(e), t == null || t(e);
  });
}
const u = /* @__PURE__ */ new WeakMap();
function a(e, t) {
  var i;
  if (e.dataset.sizes !== "auto")
    return;
  const r = y(e);
  if (r && (e.sizes = `${r}px`), ((i = e.parentElement) == null ? void 0 : i.tagName.toLowerCase()) === "picture" && !(t != null && t.skipChildren) && [...e.parentElement.getElementsByTagName("source")].forEach(
    (n) => a(n, { skipChildren: !0 })
  ), t != null && t.updateOnResize) {
    if (!u.has(e)) {
      const n = w(() => a(e), 500), c = new ResizeObserver(n);
      u.set(e, c), c.observe(e);
    }
    return () => {
      const n = u.get(e);
      n && (n.disconnect(), u.delete(e));
    };
  }
}
function z(e) {
  e.dataset.src && (e.src = e.dataset.src, e.removeAttribute("data-src"));
}
function L(e) {
  e.dataset.srcset && (e.srcset = e.dataset.srcset, e.removeAttribute("data-srcset"));
}
function v(e) {
  const t = e.parentElement;
  (t == null ? void 0 : t.tagName.toLowerCase()) === "picture" && ([...t.querySelectorAll("source[data-srcset]")].forEach(L), [...t.querySelectorAll("source[data-src]")].forEach(z));
}
function y(e) {
  var t, r;
  return e instanceof HTMLSourceElement ? (r = (t = e.parentElement) == null ? void 0 : t.getElementsByTagName("img")[0]) == null ? void 0 : r.offsetWidth : e.offsetWidth;
}
const R = Object.freeze({
  autoSizes: g,
  lazyLoad: p,
  loadImage: d
});
var A;
(A = document.currentScript) != null && A.hasAttribute("init") && p();
export {
  g as autoSizes,
  R as default,
  p as lazyLoad,
  d as loadImage
};
