import type { HTMLAttributes, ReactNode } from 'react'

export type HelperTextVariant = 'default' | 'error' | 'warning'

export type HelperTextProps = Omit<
  HTMLAttributes<HTMLParagraphElement>,
  'children'
> & {
  /**
   * The text shown under the field. Nothing is rendered when empty.
   */
  children?: ReactNode

  /**
   * Colour and semantics of the text:
   * - `default`: neutral hint
   * - `error`: blocking problem, announced assertively (`role="alert"`)
   * - `warning`: advisory, non-blocking problem, announced politely (`role="status"`)
   * @default 'default'
   */
  variant?: HelperTextVariant
}
