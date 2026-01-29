import type {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode
} from 'react'

type NativeDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type CardProps = Omit<
  NativeDiv,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
> & {
  children?: ReactNode

  /**
   * class attached to the component
   */
  className?: string

  /**
   * orientation of the component.
   * Defaults to vertical
   */
  orientation?: 'vertical' | 'horizontal'

  /**
   * tags the card as featured or not.
   *
   * Defaults to false
   */
  isFeatured?: boolean

  /**
   * color of the featured card component. Defaults to #efbf02
   *
   * Note: This prop only works when `isFeatured` is `true`
   */
  featuredColor?: string

  /**
   * color of the featured card label. Defaults to #ffffff
   *
   * Note: This prop only works when `isFeatured` is `true`
   */
  featuredLabelColor?: string

  /**
   * text on the featured card component
   *
   * Note: This prop only works when `isFeatured` is `true`
   */
  featuredText?: string

  /**
   * background color of the card.
   */
  backgroundColor?: string

  /**
   * hover background color of the card
   */
  hoverBgColor?: string

  /**
   * removes hover effect from the card
   */
  noHover?: boolean

  /**
   * sets the default box-shadow of the card
   */
  shadow?: string
}

export interface CardCSSProperties extends CSSProperties {
  '--concorde-card-featured-text'?: string
  '--concorde-card-featured-color'?: string
  '--concorde-card-featured-label-color'?: string
  '--concorde-card-background-color'?: string
  '--concorde-card-hover-background-color'?: string
  '--concorde-card-custom-shadow'?: string
}
