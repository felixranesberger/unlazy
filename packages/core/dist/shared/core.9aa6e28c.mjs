const isSSR = typeof window === "undefined";
const isLazyLoadingSupported = !isSSR && "loading" in HTMLImageElement.prototype;
const isCrawler = !isSSR && (!("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));
function toElementArray(target, parentElement = document) {
  if (typeof target === "string")
    return [...parentElement.querySelectorAll(target)];
  if (target instanceof Element)
    return [target];
  return [...target];
}
function getScaledDimensions(aspectRatio, referenceSize) {
  let width;
  let height;
  if (aspectRatio >= 1) {
    width = referenceSize;
    height = Math.round(referenceSize / aspectRatio);
  } else {
    width = Math.round(referenceSize * aspectRatio);
    height = referenceSize;
  }
  return { width, height };
}
function base64ToBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const decodedData = typeof Buffer !== "undefined" ? Buffer.from(base64, "base64") : Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  return new Uint8Array(decodedData);
}
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    if (timeout)
      clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = void 0;
      fn(...args);
    }, delay);
  };
}
function waitForElementDimensions(element) {
  const { width } = element.getBoundingClientRect();
  if (width > 0)
    return Promise.resolve();
  console.log(1699880827882, "waiting for element dimensions", element);
  return new Promise((resolve) => {
    const observer = new ResizeObserver(() => {
      const { width: width2 } = element.getBoundingClientRect();
      console.log(1699880844909, "element dimensions changed", { element, width: width2 });
      if (width2 > 0) {
        observer.disconnect();
        console.log(1699880866850, "resolving waitForElementDimensions", element);
        resolve();
      }
    });
    observer.observe(element);
  });
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
function rgbaToDataUri(w, h, rgba) {
  const row = w * 4 + 1;
  const idat = 6 + h * (5 + row);
  const bytes = [
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
    w >> 8,
    w & 255,
    0,
    0,
    h >> 8,
    h & 255,
    8,
    6,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    idat >>> 24,
    idat >> 16 & 255,
    idat >> 8 & 255,
    idat & 255,
    73,
    68,
    65,
    84,
    120,
    1
  ];
  const table = [
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
  let a = 1;
  let b = 0;
  for (let y = 0, i = 0, end = row - 1; y < h; y++, end += row - 1) {
    bytes.push(y + 1 < h ? 0 : 1, row & 255, row >> 8, ~row & 255, row >> 8 ^ 255, 0);
    for (b = (b + a) % 65521; i < end; i++) {
      const u = rgba[i] & 255;
      bytes.push(u);
      a = (a + u) % 65521;
      b = (b + a) % 65521;
    }
  }
  bytes.push(
    b >> 8,
    b & 255,
    a >> 8,
    a & 255,
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
  for (let [start, end] of [[12, 29], [37, 41 + idat]]) {
    let c = ~0;
    for (let i = start; i < end; i++) {
      c ^= bytes[i];
      c = c >>> 4 ^ table[c & 15];
      c = c >>> 4 ^ table[c & 15];
    }
    c = ~c;
    bytes[end++] = c >>> 24;
    bytes[end++] = c >> 16 & 255;
    bytes[end++] = c >> 8 & 255;
    bytes[end++] = c & 255;
  }
  const base64 = typeof Buffer !== "undefined" ? Buffer.from(new Uint8Array(bytes)).toString("base64") : btoa(String.fromCharCode(...bytes));
  return `data:image/png;base64,${base64}`;
}

export { isLazyLoadingSupported as a, isSSR as b, base64ToBytes as c, debounce as d, getScaledDimensions as g, isCrawler as i, rgbaToDataUri as r, toElementArray as t, waitForElementDimensions as w };
