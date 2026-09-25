import { motion } from 'motion/react'

import classes from './CheckCircleAnimated.module.scss'

const getAnimationVariants = (isActive: boolean) => {
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: isActive ? 1.5 : 0, bounce: 0 },
        opacity: { duration: isActive ? 0.01 : 0 }
      }
    }
  }
}

export function CheckCircleAnimated({
  isActive = true
}: {
  isActive?: boolean
}) {
  return (
    <motion.svg
      animate="visible"
      className={classes.svg}
      height="150"
      initial="hidden"
      viewBox="0 0 24 24"
      width="150"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle Path */}
      <motion.circle
        className={classes.shape}
        cx="12"
        cy="12"
        r="10"
        stroke="var(--concorde-primary-color)"
        variants={getAnimationVariants(isActive)}
      />
      {/* Checkmark Path */}
      <motion.path
        className={classes.shape}
        d="M8.5 12.5 l3 3 l5 -5"
        stroke="var(--concorde-primary-color)"
        variants={getAnimationVariants(isActive)}
      />
    </motion.svg>
  )
}
