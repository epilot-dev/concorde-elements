import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react'

type NativeLink = AnchorHTMLAttributes<HTMLAnchorElement>

export type LinkProps = Omit<NativeLink, 'ref' | 'color'> & {
  children?: ReactNode

  /**
   * class attached to the component
   */
  className?: string

  /**
   * disables the link.
   *
   * Defaults to `false`
   */
  isDisabled?: boolean

  /**
   * color of the link.
   */
  color?: string

  /**
   * hover color of the link.
   */
  hoverColor?: string
}

export interface LinkCSSProperties extends CSSProperties {
  '--concorde-link-color'?: string
  '--concorde-link-hover-color'?: string
}
