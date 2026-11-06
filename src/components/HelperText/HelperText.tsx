import classNames from 'classnames'
import { forwardRef } from 'react'

import classes from './HelperText.module.scss'
import type { HelperTextProps } from './types'

const ROLES = {
  default: undefined,
  error: 'alert',
  warning: 'status'
} as const

/**
 * A helper line under a field, styled like the Input's own helper text.
 * Use it for feedback the field component cannot render itself, e.g. an
 * advisory warning, or a message shared by several inputs.
 */
export const HelperText = forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ children, variant = 'default', className, ...rest }, ref) => {
    if (!children) return null

    return (
      <p
        className={classNames(
          'Concorde-HelperText',
          `Concorde-HelperText--${variant}`,
          classes.root,
          variant !== 'default' && classes[variant],
          className
        )}
        ref={ref}
        role={ROLES[variant]}
        {...rest}
      >
        {children}
      </p>
    )
  }
)

HelperText.displayName = 'HelperText'
