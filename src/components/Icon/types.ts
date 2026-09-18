import type { MaterialSymbol } from 'material-symbols'
import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react'

type NativeSpan = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>

export type IconName = MaterialSymbol | 'expand_more'

export type IconProps = Omit<
  NativeSpan,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
> & {
  /**
   * Search for more icon names here: https://marella.me/material-symbols/demo/
   */
  name?: IconName

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
  '--concorde-icon-color'?: string
  '--concorde-icon-hover-color'?: string
  '--concorde-icon-size'?: string
  '--concorde-icon-is-filled'?: string
}
