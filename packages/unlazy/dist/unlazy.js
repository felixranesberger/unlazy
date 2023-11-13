const S = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", w = typeof window > "u", y = !w && "loading" in HTMLImageElement.prototype, L = !w && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function z(t, e = document) {
  return typeof t == "string" ? [...e.querySelectorAll(t)] : t instanceof Element ? [t] : [...t];
}
function R(t, e) {
  let s;
  return function(...o) {
    s && clearTimeout(s), s = setTimeout(() => {
      s = void 0, t(...o);
    }, e);
  };
}
function C(t) {
  const { width: e } = t.getBoundingClientRect();
  return e > 0 ? Promise.resolve() : (console.log(1699880827882, "waiting for element dimensions", t), new Promise((s) => {
    const o = new ResizeObserver(() => {
      const { width: n } = t.getBoundingClientRect();
      console.log(1699880844909, "element dimensions changed", { element: t, width: n }), n > 0 && (o.disconnect(), console.log(1699880866850, "resolving waitForElementDimensions", t), s());
    });
    o.observe(t);
  }));
}
function p(t = 'img[loading="lazy"]', {
  hash: e = !0,
  hashType: s = "blurhash",
  placeholderSize: o = 32,
  updateSizesOnResize: n = !1,
  onImageLoad: c
} = {}) {
  const i = /* @__PURE__ */ new Set();
  return z(t).map(async (r) => {
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
    if (r.src || (r.src = S), r.complete && r.naturalWidth > 0) {
      d(r, c);
      return;
    }
    const E = () => d(r, c);
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
  for (const e of z(t))
    u(e);
}
function d(t, e) {
  const s = new Image(), { srcset: o, src: n, sizes: c } = t.dataset;
  if (c === "auto") {
    const i = v(t);
    i && (s.sizes = `${i}px`);
  } else
    t.sizes && (s.sizes = t.sizes);
  o && (s.srcset = o), n && (s.src = n), s.addEventListener("load", () => {
    b(t), l(t), f(t), e == null || e(t);
  });
}
const a = /* @__PURE__ */ new WeakMap();
function u(t, e) {
  var o;
  if (t.dataset.sizes !== "auto")
    return;
  const s = v(t);
  if (s && (t.sizes = `${s}px`), ((o = t.parentElement) == null ? void 0 : o.tagName.toLowerCase()) === "picture" && !(e != null && e.skipChildren) && [...t.parentElement.getElementsByTagName("source")].forEach(
    (n) => u(n, { skipChildren: !0 })
  ), e != null && e.updateOnResize) {
    if (!a.has(t)) {
      const n = R(() => u(t), 500), c = new ResizeObserver(n);
      a.set(t, c), c.observe(t);
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
function v(t) {
  var e, s;
  return t instanceof HTMLSourceElement ? (s = (e = t.parentElement) == null ? void 0 : e.getElementsByTagName("img")[0]) == null ? void 0 : s.offsetWidth : t.offsetWidth;
}
const D = Object.freeze({
  autoSizes: T,
  lazyLoad: p,
  loadImage: d
});
var h;
(h = document.currentScript) != null && h.hasAttribute("init") && p();
export {
  T as autoSizes,
  D as default,
  p as lazyLoad,
  d as loadImage
};
