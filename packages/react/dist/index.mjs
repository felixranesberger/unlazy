import { jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { lazyLoad } from "unlazy";
export function UnLazyImage({
  src,
  srcSet,
  autoSizes,
  blurhash,
  thumbhash,
  placeholderSrc,
  placeholderSize,
  ...rest
}) {
  const target = useRef(null);
  useEffect(() => {
    if (!target.current)
      return;
    const cleanup = lazyLoad(target.current, {
      hash: thumbhash || blurhash,
      hashType: thumbhash ? "thumbhash" : "blurhash",
      placeholderSize
    });
    return () => {
      cleanup();
    };
  }, [src, srcSet, autoSizes, blurhash, thumbhash, placeholderSrc, placeholderSize]);
  return /* @__PURE__ */ jsx(
    "img",
    {
      ref: target,
      src: placeholderSrc,
      "data-src": src,
      "data-srcset": srcSet,
      "data-sizes": autoSizes ? "auto" : void 0,
      loading: "lazy",
      ...rest
    }
  );
}
