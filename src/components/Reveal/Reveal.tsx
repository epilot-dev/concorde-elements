import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { forwardRef } from 'react'
import type { PropsWithoutRef } from 'react'

import type { RevealProps } from './types'

export const Reveal = forwardRef<HTMLDivElement, PropsWithoutRef<RevealProps>>(
  (props, ref) => {
    const {
      show,
      isActive = true,
      children,
      transition,
      initial,
      exit,
      isSubtle,
      ...rest
    } = props

    const shouldReduceMotion = useReducedMotion()

    if (!isActive) {
      return show && <>{children}</>
    }

    const yOffset = isSubtle ? -8 : -16
    const duration = shouldReduceMotion ? 0 : 0.25

    return (
      <AnimatePresence custom={show} mode="wait">
        {show ? (
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: yOffset,
              opacity: 0,
              transition: { duration, ease: [0.32, 0.72, 0, 1] },
              ...(typeof exit === 'object' ? exit : {})
            }}
            initial={{
              y: yOffset,
              opacity: 0,
              ...(typeof initial === 'object' ? initial : {})
            }}
            ref={ref}
            style={{ width: '100%' }}
            transition={{
              duration,
              ease: [0.32, 0.72, 0, 1],
              ...transition
            }}
            {...rest}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    )
  }
)

Reveal.displayName = 'Reveal'
