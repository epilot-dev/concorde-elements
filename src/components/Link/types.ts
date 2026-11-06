import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode
} from 'react'

type NativeLink = AnchorHTMLAttributes<HTMLAnchorElement>

type NativeButton = ButtonHTMLAttributes<HTMLButtonElement>

type LinkOwnProps = {
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

export type LinkProps = Omit<NativeLink, 'ref' | 'color'> &
  LinkOwnProps & {
    /**
     * element the link renders as.
     *
     * Defaults to `'a'`
     */
    as?: 'a'
  }

/**
 * A link that triggers an action instead of navigating, e.g. inside a sentence:
 * rendered as a button, since a link without a target is not reachable by keyboard.
 */
export type LinkAsButtonProps = Omit<NativeButton, 'ref' | 'color' | 'type'> &
  LinkOwnProps & {
    as: 'button'
  }

export interface LinkCSSProperties extends CSSProperties {
  '--concorde-link-color'?: string
  '--concorde-link-hover-color'?: string
}
