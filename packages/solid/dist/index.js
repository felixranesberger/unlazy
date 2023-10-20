import { use, spread, mergeProps, template } from 'solid-js/web';
import { splitProps, createSignal, createEffect, onCleanup } from 'solid-js';
import { lazyLoad } from 'unlazy';

// src/index.tsx
var _tmpl$ = /* @__PURE__ */ template(`<img loading="lazy">`);
function UnLazyImage(props) {
  const [local, rest] = splitProps(props, ["src", "srcSet", "autoSizes", "blurhash", "thumbhash", "placeholderSrc", "placeholderSize"]);
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
  return (() => {
    const _el$ = _tmpl$();
    use(setTarget, _el$);
    spread(_el$, mergeProps({
      get src() {
        return local.placeholderSrc;
      },
      get ["data-src"]() {
        return local.src;
      },
      get ["data-srcset"]() {
        return local.srcSet;
      },
      get ["data-sizes"]() {
        return local.autoSizes ? "auto" : void 0;
      }
    }, rest), false, false);
    return _el$;
  })();
}

export { UnLazyImage };
