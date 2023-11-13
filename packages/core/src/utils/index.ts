/* eslint-disable node/prefer-global/buffer */
export const isSSR = typeof window === 'undefined'
export const isLazyLoadingSupported = !isSSR && 'loading' in HTMLImageElement.prototype
export const isCrawler = !isSSR && (!('onscroll' in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent))

export function toElementArray<T extends HTMLElement>(
  target: string | T | NodeListOf<T> | T[],
  parentElement: Element | Document = document,
): T[] {
  if (typeof target === 'string')
    return [...parentElement.querySelectorAll<T>(target)]

  if (target instanceof Element)
    return [target]

  return [...target]
}

export function getScaledDimensions(aspectRatio: number, referenceSize: number) {
  let width: number
  let height: number

  if (aspectRatio >= 1) {
    width = referenceSize
    height = Math.round(referenceSize / aspectRatio)
  }
  else {
    width = Math.round(referenceSize * aspectRatio)
    height = referenceSize
  }

  return { width, height }
}

export function base64ToBytes(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/')

  const decodedData = typeof Buffer !== 'undefined'
    ? Buffer.from(base64, 'base64')
    : Uint8Array.from(atob(base64), char => char.charCodeAt(0))

  return new Uint8Array(decodedData)
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return function (...args: Parameters<T>) {
    if (timeout)
      clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = undefined
      fn(...args)
    }, delay)
  }
}

export function waitForElementDimensions<T extends HTMLElement>(element: T): Promise<void> {
  const { width } = element.getBoundingClientRect()
  if (width > 0)
    return Promise.resolve()

  console.log(1699880827882, 'waiting for element dimensions', element);

  return new Promise((resolve) => {
    const observer = new ResizeObserver(() => {
      const { width } = element.getBoundingClientRect()
      console.log(1699880844909, 'element dimensions changed', { element, width });
      if (width > 0) {
        observer.disconnect()
        console.log(1699880866850, 'resolving waitForElementDimensions', element);
        resolve()
      }
    });

    observer.observe(element);
  });
}
