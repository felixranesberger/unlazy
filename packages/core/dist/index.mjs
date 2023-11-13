import { D as DEFAULT_IMAGE_PLACEHOLDER, a as DEFAULT_PLACEHOLDER_SIZE, c as createPngDataUri$1 } from './shared/core.497408d4.mjs';
import { t as toElementArray, i as isCrawler, a as isLazyLoadingSupported, d as debounce } from './shared/core.9aa6e28c.mjs';
export { c as base64ToBytes, g as getScaledDimensions, b as isSSR, w as waitForElementDimensions } from './shared/core.9aa6e28c.mjs';
import { createPngDataUri } from './thumbhash.mjs';

function lazyLoad(selectorsOrElements = 'img[loading="lazy"]', {
  hash = true,
  hashType = "blurhash",
  placeholderSize = DEFAULT_PLACEHOLDER_SIZE,
  updateSizesOnResize = false,
  onImageLoad
} = {}) {
  const cleanupFns = /* @__PURE__ */ new Set();
  toElementArray(selectorsOrElements).map(async (image) => {
    const onResizeCleanup = updateSizesAttribute(image, { updateOnResize: updateSizesOnResize });
    if (updateSizesOnResize && onResizeCleanup)
      cleanupFns.add(onResizeCleanup);
    if (
      // @ts-expect-error: Compile-time flag to exclude this code from the bundle
      (typeof __ENABLE_HASH_DECODING__ === "undefined" || __ENABLE_HASH_DECODING__) && hash
    ) {
      const placeholder = createPlaceholderFromHash({
        image,
        hash: typeof hash === "string" ? hash : void 0,
        hashType,
        size: placeholderSize
      });
      if (placeholder)
        image.src = placeholder;
    }
    if (!image.dataset.src && !image.dataset.srcset) {
      console.error("[unlazy] Missing `data-src` or `data-srcset` attribute", image);
      return;
    }
    if (isCrawler || !isLazyLoadingSupported) {
      updatePictureSources(image);
      updateImageSrcset(image);
      updateImageSrc(image);
      return;
    }
    if (!image.src)
      image.src = DEFAULT_IMAGE_PLACEHOLDER;
    if (image.complete && image.naturalWidth > 0) {
      console.log(1699882775467, "image already in viewport", {
        image,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        boundingWidth: image.getBoundingClientRect().width
      });
      loadImage(image, onImageLoad);
      return;
    }
    const loadHandler = () => loadImage(image, onImageLoad);
    image.addEventListener("load", loadHandler, { once: true });
    cleanupFns.add(
      () => image.removeEventListener("load", loadHandler)
    );
  });
  return () => {
    for (const fn of cleanupFns)
      fn();
    cleanupFns.clear();
  };
}
function autoSizes(selectorsOrElements = 'img[data-sizes="auto"], source[data-sizes="auto"]') {
  for (const image of toElementArray(selectorsOrElements))
    updateSizesAttribute(image);
}
function loadImage(image, onImageLoad) {
  const imagePreLoader = new Image();
  const { srcset, src, sizes } = image.dataset;
  if (sizes === "auto") {
    const width = getOffsetWidth(image);
    if (width)
      imagePreLoader.sizes = `${width}px`;
  } else if (image.sizes) {
    imagePreLoader.sizes = image.sizes;
  }
  if (srcset)
    imagePreLoader.srcset = srcset;
  if (src)
    imagePreLoader.src = src;
  imagePreLoader.addEventListener("load", () => {
    updatePictureSources(image);
    updateImageSrcset(image);
    updateImageSrc(image);
    onImageLoad?.(image);
  });
}
function createPlaceholderFromHash({
  /** If given, the hash will be extracted from the image's `data-blurhash` or `data-thumbhash` attribute and ratio will be calculated from the image's actual dimensions */
  image,
  hash,
  hashType = "blurhash",
  /** @default 32 */
  size = DEFAULT_PLACEHOLDER_SIZE,
  /** Will be calculated from the image's actual dimensions if not provided and image is given */
  ratio
} = {}) {
  if (!hash && image) {
    const { blurhash, thumbhash } = image.dataset;
    hash = thumbhash || blurhash;
    hashType = thumbhash ? "thumbhash" : "blurhash";
  }
  if (!hash)
    return;
  try {
    if (hashType === "thumbhash") {
      return createPngDataUri(hash);
    } else {
      if (!ratio && image) {
        const actualWidth = image.width || image.offsetWidth || size;
        const actualHeight = image.height || image.offsetHeight || size;
        ratio = actualWidth / actualHeight;
      }
      return createPngDataUri$1(hash, { ratio, size });
    }
  } catch (error) {
    console.error(`Error generating ${hashType} placeholder:`, error);
  }
}
const resizeElementStore = /* @__PURE__ */ new WeakMap();
function updateSizesAttribute(element, options) {
  if (element.dataset.sizes !== "auto")
    return;
  const width = getOffsetWidth(element);
  if (width)
    element.sizes = `${width}px`;
  if (element.parentElement?.tagName.toLowerCase() === "picture" && !options?.skipChildren) {
    [...element.parentElement.getElementsByTagName("source")].forEach(
      (sourceTag) => updateSizesAttribute(sourceTag, { skipChildren: true })
    );
  }
  if (options?.updateOnResize) {
    if (!resizeElementStore.has(element)) {
      const debounceResize = debounce(() => updateSizesAttribute(element), 500);
      const observerInstance = new ResizeObserver(debounceResize);
      resizeElementStore.set(element, observerInstance);
      observerInstance.observe(element);
    }
    return () => {
      const observerInstance = resizeElementStore.get(element);
      if (observerInstance) {
        observerInstance.disconnect();
        resizeElementStore.delete(element);
      }
    };
  }
}
function updateImageSrc(image) {
  if (image.dataset.src) {
    image.src = image.dataset.src;
    image.removeAttribute("data-src");
  }
}
function updateImageSrcset(image) {
  if (image.dataset.srcset) {
    image.srcset = image.dataset.srcset;
    image.removeAttribute("data-srcset");
  }
}
function updatePictureSources(image) {
  const picture = image.parentElement;
  if (picture?.tagName.toLowerCase() === "picture") {
    [...picture.querySelectorAll("source[data-srcset]")].forEach(updateImageSrcset);
    [...picture.querySelectorAll("source[data-src]")].forEach(updateImageSrc);
  }
}
function getOffsetWidth(element) {
  return element instanceof HTMLSourceElement ? element.parentElement?.getElementsByTagName("img")[0]?.offsetWidth : element.offsetWidth;
}

export { autoSizes, createPlaceholderFromHash, debounce, isCrawler, isLazyLoadingSupported, lazyLoad, loadImage, toElementArray };
