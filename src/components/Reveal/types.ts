import type { HTMLMotionProps, MotionAdvancedProps } from 'motion/react'
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren
} from 'react'

type NativeDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type RevealProps = PropsWithChildren<
  HTMLMotionProps<'div'> &
    NativeDiv & {
      /**
       * Whether to show
       */
      show: MotionAdvancedProps['custom']

      /**
       * Whether animations are active.
       * If false, it will just show the children without any animation.
       * @default true
       */
      isActive?: boolean

      /**
       * Ensures the animation is more subtle.
       */
      isSubtle?: boolean
    }
>
