import type {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode
} from 'react'

/**
 * Card visual variants.
 * - shadow: box-shadow (default)
 * - outlined: 1px border, no shadow
 * - bare: no shadow, no border, no background (internal; used by BlockContent for non-card blocks)
 */
export type CardVariant = 'shadow' | 'outlined' | 'bare'

/**
 * User-configurable card variants — the subset exposed via design tokens.
 * Excludes `bare` since it's an internal variant not meant for theme-level configuration.
 */
export type ThemeCardVariant = Exclude<CardVariant, 'bare'>

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

  /**
   * Card visual variant. Defaults to the theme's card variant, or 'shadow'.
   * - shadow: box-shadow (default)
   * - outlined: 1px border, no shadow
   * - glass: translucent background with backdrop blur
   * - bare: no shadow, no border, no background
   */
  variant?: CardVariant
}

export interface CardCSSProperties extends CSSProperties {
  '--concorde-card-featured-text'?: string
  '--concorde-card-featured-color'?: string
  '--concorde-card-featured-label-color'?: string
  '--concorde-card-background-color'?: string
  '--concorde-card-hover-background-color'?: string
  '--concorde-card-custom-shadow'?: string
}
