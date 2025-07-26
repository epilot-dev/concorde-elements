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

    return (
      <AnimatePresence custom={show} mode="wait">
        {show ? (
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: isSubtle ? -10 : -35,
              opacity: 0,
              transition: {
                duration: isSubtle ? 0.3 : 0.2
              },
              ...(typeof exit === 'object' ? exit : {})
            }}
            initial={{
              y: isSubtle ? -10 : -35,
              opacity: 0,
              ...(typeof initial === 'object' ? initial : {})
            }}
            ref={ref}
            style={{ width: '100%' }}
            transition={{
              ease: 'easeInOut',
              duration: shouldReduceMotion ? 0 : 0.6,
              type: 'spring',
              stiffness: 300,
              damping: 20,
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
