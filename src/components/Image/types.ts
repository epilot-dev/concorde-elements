import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'

export type ImageDimension = {
  width?: number
  height?: number
}

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /**
   * Decides whether image will load immediately or be delayed using the default animation.
   *
   * Defaults to `true`
   */
  isDefaultLoaded?: boolean

  /**
   * Sets the props of the image's container element.
   */
  containerProps?: HTMLAttributes<HTMLDivElement>

  /**
   * Sets the fallback src if the src doesn't load
   */
  fallbackSrc?: string

  /**
   * Overrides the default loading placeholder
   */
  loadingPlaceholder?: ReactNode

  /**
   * Overrides the default error message when an image doesn't load
   */
  errorText?: ReactNode

  /**
   * Turns on animation when image loads
   */
  isAnimated?: boolean

  /**
   * Sets the image's dimension
   */
  dimension?: ImageDimension
}
