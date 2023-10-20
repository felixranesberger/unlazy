// src/index.tsx
import { createEffect, createSignal, onCleanup, splitProps } from "solid-js";
import { lazyLoad } from "unlazy";
function UnLazyImage(props) {
  const [local, rest] = splitProps(
    props,
    ["src", "srcSet", "autoSizes", "blurhash", "thumbhash", "placeholderSrc", "placeholderSize"]
  );
  const [target, setTarget] = createSignal();
  createEffect(() => {
    const el = target();
    if (!el)
      return;
    const cleanup = lazyLoad(el, {
      hash: local.thumbhash || local.blurhash,
      hashType: local.thumbhash ? "thumbhash" : "blurhash",
      placeholderSize: local.placeholderSize
    });
    onCleanup(() => {
      cleanup();
    });
  });
  return <img
    ref={setTarget}
    src={local.placeholderSrc}
    data-src={local.src}
    data-srcset={local.srcSet}
    data-sizes={local.autoSizes ? "auto" : void 0}
    loading="lazy"
    {...rest}
  />;
}
export {
  UnLazyImage
};
