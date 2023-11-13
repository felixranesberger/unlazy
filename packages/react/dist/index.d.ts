import type { ImgHTMLAttributes } from 'react';
import type { UnLazyLoadOptions } from 'unlazy';
interface Props extends ImgHTMLAttributes<HTMLImageElement>, Pick<UnLazyLoadOptions, 'placeholderSize'> {
    /** Image source URL to be lazy-loaded. */
    src?: ImgHTMLAttributes<HTMLImageElement>['src'];
    /** Image source set to be lazy-loaded. */
    srcSet?: ImgHTMLAttributes<HTMLImageElement>['srcSet'];
    /**
     * A flag to indicate whether the sizes attribute should be automatically calculated.
     * @default false
     */
    autoSizes?: boolean;
    /** A BlurHash string representing the blurry placeholder image. */
    blurhash?: string;
    /** A ThumbHash string representing the blurry placeholder image. */
    thumbhash?: string;
    /** Optional image source URL for a custom placeholder image. Will be ignored if a BlurHash or ThumbHash is provided. */
    placeholderSrc?: string;
}
export declare function UnLazyImage({ src, srcSet, autoSizes, blurhash, thumbhash, placeholderSrc, placeholderSize, ...rest }: Props): import("react").JSX.Element;
export {};
