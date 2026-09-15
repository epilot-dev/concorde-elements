import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react'

type NativeDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type SpacingProps = Omit<
  NativeDiv,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
> & {
  /**
   * Variant of spacing element.
   */
  variant: 'inline' | 'inset' | 'stack'

  /**
   * Set the alignment of all the children as a group.
   */
  alignItems?: CSSProperties['alignItems']

  /**
   * Set the alignment of all the children as a group.
   */
  justifyContent?: CSSProperties['justifyContent']

  /**
   * Spacing scale to be applied.
   *
   * Defaults to 1
   */
  scale?: number
}

export interface SpacingCSSProperties extends CSSProperties {
  '--concorde-spacing-scale'?: number
  '--concorde-spacing-align-items'?: string
  '--concorde-spacing-justify-content'?: string
}
