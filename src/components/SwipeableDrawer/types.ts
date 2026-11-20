import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type React from 'react'

type NativeDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type SwipeableDrawerProps = Omit<NativeDiv, 'ref'> & {
  /**
   * class attached to the component
   */
  className?: string
  /**
   * children of the component
   */
  children: React.ReactNode
  /**
   * visibility of the component
   */
  wrapChildrenWithDrawer: boolean
  /**
   * text for the button
   */
  collapsedString: string
  /**
   * container props
   */
  containerProps?: NativeDiv
}
