import type { HTMLMotionProps } from 'motion/react'
import { motion, AnimatePresence } from 'motion/react'
import { forwardRef } from 'react'

import type { ImageProps } from './types'

export const AnimatedImage = forwardRef<
  HTMLImageElement,
  ImageProps & { custom: boolean }
>((props, ref) => {
  const { custom, alt = '', src, className, ...rest } = props

  return (
    <AnimatePresence custom={custom} mode="wait">
      <motion.img
        {...(rest as Omit<HTMLMotionProps<'img'>, 'ref'>)}
        alt={alt}
        animate={{ opacity: custom ? 1 : 0, scale: custom ? 1 : 0.75 }}
        className={className}
        custom={custom}
        initial={{ opacity: 0, scale: 0.75 }}
        key={src}
        layout="position"
        ref={ref}
        src={src}
        transition={{
          type: 'spring',
          ease: 'easeIn',
          duration: 0.3,
          bounce: 0.1,
          layout: {
            type: 'tween'
          }
        }}
      />
    </AnimatePresence>
  )
})

AnimatedImage.displayName = 'AnimatedImage'
