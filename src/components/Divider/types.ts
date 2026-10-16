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

export type DividerProps = Omit<
  NativeDiv,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
> & {
  /**
   * class attached to the component
   */
  className?: string

  /**
   * orientation of the component.
   * Defaults to horizontal
   */
  orientation?: 'vertical' | 'horizontal'

  /**
   * Thickness of the divider.
   *
   * Defaults to 1
   */
  thickness?: number

  /**
   * Color of the divider
   */
  color?: string

  /**
   * Optional label rendered centered between two divider lines
   */
  label?: ReactNode
}

export interface DividerCSSProperties extends CSSProperties {
  '--concorde-divider-custom-color'?: string
  '--concorde-divider-thickness'?: string
}
