<script>import { onDestroy } from "svelte";
import { lazyLoad } from "unlazy";
export let src = void 0;
export let srcSet = void 0;
export let autoSizes = false;
export let blurhash = void 0;
export let thumbhash = void 0;
export let placeholderSrc = void 0;
export let placeholderSize = void 0;
let target;
let cleanup;
$:
  if (target) {
    cleanup?.();
    cleanup = lazyLoad(target, {
      hash: thumbhash || blurhash,
      hashType: thumbhash ? "thumbhash" : "blurhash",
      placeholderSize
    });
  }
onDestroy(() => {
  cleanup?.();
});
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<img
  bind:this={target}
  src={placeholderSrc}
  data-src={src}
  data-srcset={srcSet}
  data-sizes={autoSizes ? 'auto' : undefined}
  loading="lazy"
  {...$$restProps}
/>
