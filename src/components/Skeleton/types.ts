import type { CSSProperties, HTMLAttributes, PropsWithChildren } from 'react'

export type SkeletonElement = React.ElementRef<'span'>

export interface SkeletonProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>>,
    Pick<
      CSSProperties,
      'width' | 'minWidth' | 'maxWidth' | 'height' | 'minHeight' | 'maxHeight'
    > {
  /**
   * Whether to animate the skeleton UI
   * @default true
   */
  animate?: boolean
  /**
   * Whether children is loading
   * @default true
   */
  loading?: boolean
}
