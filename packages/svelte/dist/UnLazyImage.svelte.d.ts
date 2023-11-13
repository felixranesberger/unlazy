import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        src?: string | undefined;
        srcSet?: string | undefined;
        autoSizes?: boolean | undefined;
        blurhash?: string | undefined;
        thumbhash?: string | undefined;
        placeholderSrc?: string | undefined;
        placeholderSize?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type UnLazyImageProps = typeof __propDef.props;
export type UnLazyImageEvents = typeof __propDef.events;
export type UnLazyImageSlots = typeof __propDef.slots;
export default class UnLazyImage extends SvelteComponentTyped<UnLazyImageProps, UnLazyImageEvents, UnLazyImageSlots> {
}
export {};
