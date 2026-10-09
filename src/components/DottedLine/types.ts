import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react'

type NativeDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type DottedLineProps = Omit<
  NativeDiv,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
> & {
  /**
   * class attached to the component
   */
  className?: string

  /**
   * Color of the divider
   */
  color?: string
}

export interface DottedLineCSSProperties extends CSSProperties {
  '--concorde-dotted-line-custom-color'?: string
}
