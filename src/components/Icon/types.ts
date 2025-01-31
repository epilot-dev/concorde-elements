import type { MaterialSymbol } from 'material-symbols'
import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react'

type NativeSpan = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>

export type IconProps = Omit<
  NativeSpan,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
> & {
  /**
   * Search for more icon names here: https://marella.me/material-symbols/demo/
   */
  name?: MaterialSymbol | 'expand_more'

  /**
   * variant of the icon.
   */
  variant?: 'sharp' | 'rounded' | 'outlined'

  /**
   * color of the icon.
   */
  color?: 'primary' | 'secondary' | 'error' | string

  /**
   * hover color of the icon.
   */
  hoverColor?: string

  /**
   * size of the icon.
   */
  size?: string

  /**
   * sets the icon to filled.
   */
  isFilled?: boolean
}

export interface IconCSSProperties extends CSSProperties {
  '--icon-color'?: string
  '--icon-hover-color'?: string
  '--icon-size'?: string
  '--icon-is-filled'?: string
}
