import type { MotionAdvancedProps } from 'motion/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { PropsWithChildren } from 'react'

export const Reveal = ({
  show,
  isActive,
  children,
  className
}: PropsWithChildren<{
  show: MotionAdvancedProps['custom']
  isActive: boolean
  className?: string
}>) => {
  const shouldReduceMotion = useReducedMotion()

  if (!isActive) {
    return show && <>{children}</>
  }

  return (
    <AnimatePresence custom={show} mode="wait">
      {show ? (
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          className={className}
          exit={{
            y: -35,
            opacity: 0,
            transition: {
              duration: 0.2
            }
          }}
          initial={{ y: -35, opacity: 0 }}
          style={{ width: '100%' }}
          transition={{
            ease: 'easeInOut',
            duration: shouldReduceMotion ? 0 : 0.6,
            type: 'spring',
            stiffness: 300,
            damping: 20
          }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
