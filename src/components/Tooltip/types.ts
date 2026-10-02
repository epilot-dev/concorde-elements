import type { TooltipContentProps } from '@radix-ui/react-tooltip'
import type { ReactNode } from 'react'

export type TooltipProps = {
  /**
   * The class name of the tooltip
   */
  className?: string

  /**
   * The class name of the tooltip content because it is rendered in a portal
   */
  contentClassName?: string

  /**
   * The trigger of the tooltip
   */
  children: ReactNode

  /**
   * Whether to show the arrow
   *
   * Defaults to `true`
   */
  arrow?: boolean

  /**
   * The placement of the tooltip
   */
  placement?: 'top' | 'right' | 'bottom' | 'left'

  /**
   * The title of the tooltip
   */
  title: string | ReactNode

  /**
   * Mounts tooltip content beside trigger
   */
  isLocal?: boolean

  /**
   * The offset of the tooltip
   */
  sideOffset?: TooltipContentProps['sideOffset']
}
