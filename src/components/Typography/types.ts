import type { CSSProperties, ReactNode } from 'react'

export type TypographyTags =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'legend'
  | 'dt'
  | 'dd'

export type Variant = 'primary' | 'secondary' | 'error' | 'disabled'

export interface TypographyTagProps<T extends TypographyTags> {
  children?: ReactNode

  /**
   * html element that component will be rendered as.
   * Defaults to the paragraph element
   */
  as?: T

  /**
   * class attached to the component
   */
  className?: string

  /**
   * style of the component
   */
  variant?: Variant
}

type TypographyRefMap = {
  h1: HTMLHeadingElement
  h2: HTMLHeadingElement
  h3: HTMLHeadingElement
  h4: HTMLHeadingElement
  h5: HTMLHeadingElement
  h6: HTMLHeadingElement
  p: HTMLParagraphElement
  span: HTMLSpanElement
  div: HTMLDivElement
  legend: HTMLLegendElement
  dt: HTMLDListElement
  dd: HTMLDListElement
}

export type TypographyRef<T extends TypographyTags> = TypographyRefMap[T]

export type TypographyProps<T extends TypographyTags> = Omit<
  TypographyTagProps<T> & JSX.IntrinsicElements[T],
  'ref'
>

export interface TypographyCSSProperties extends CSSProperties {
  '--concorde-typography-color'?: string
}
