import { JSX } from 'solid-js';
import { UnLazyLoadOptions } from 'unlazy';

interface Props extends JSX.ImgHTMLAttributes<HTMLImageElement>, Pick<UnLazyLoadOptions, 'placeholderSize'> {
    /** Image source URL to be lazy-loaded. */
    src?: JSX.ImgHTMLAttributes<HTMLImageElement>['src'];
    /** Image source set to be lazy-loaded. */
    srcSet?: JSX.ImgHTMLAttributes<HTMLImageElement>['srcSet'];
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
declare function UnLazyImage(props: Props): JSX.Element;

export { UnLazyImage };
