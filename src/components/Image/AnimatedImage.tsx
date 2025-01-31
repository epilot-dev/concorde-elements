import type { HTMLMotionProps } from 'motion/react'
import { motion, AnimatePresence } from 'motion/react'
import { forwardRef } from 'react'

import type { ImageProps } from './types'

export const AnimatedImage = forwardRef<
  HTMLImageElement,
  ImageProps & { custom: boolean }
>((props, ref) => {
  const { custom, ...rest } = props

  return (
    <AnimatePresence custom={custom} mode="wait">
      <motion.img
        {...(rest as Omit<HTMLMotionProps<'img'>, 'ref'>)}
        animate={{ opacity: 1, scale: 1 }}
        custom={custom}
        initial={{ opacity: 0, scale: 0.5 }}
        ref={ref}
        transition={{
          type: 'spring',
          ease: 'easeIn',
          duration: 0.4,
          stiffness: 300,
          damping: 20
        }}
      />
    </AnimatePresence>
  )
})

AnimatedImage.displayName = 'AnimatedImage'
