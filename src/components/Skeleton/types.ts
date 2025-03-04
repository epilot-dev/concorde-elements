import type * as React from 'react'

export type SkeletonElement = React.ElementRef<'span'>

// TODO: add actual type
type Dimension = string | number

export interface SkeletonProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> {
  /**
   * Whether children is loading
   * @default true
   */
  loading?: boolean
  // size indicators
  width?: Dimension
  minWidth?: Dimension
  maxWidth?: Dimension
  height?: Dimension
  minHeight?: Dimension
  maxHeight?: Dimension
}
