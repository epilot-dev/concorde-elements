import classNames from 'classnames'
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithoutRef,
  Ref
} from 'react'
import { forwardRef } from 'react'

import classes from './Button.module.scss'
import type { ButtonCSSProperties, ButtonProps } from './types'

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PropsWithoutRef<ButtonProps>
>((props, ref) => {
  const {
    leftIcon,
    rightIcon,
    label,
    className,
    isDisabled,
    style,
    color,
    backgroundColor,
    hoverBgColor,
    activeBgColor,
    variant,
    isToggle,
    isLink,
    onClick,
    children,
    gap,
    ...rest
  } = props

  const customColors: ButtonCSSProperties = {
    '--concorde-button-label-color': color,
    '--concorde-button-background-color': backgroundColor,
    '--concorde-button-hover-bg-color': hoverBgColor,
    '--concorde-button-active-bg-color': activeBgColor,
    '--concorde-button-gap': gap ? `${gap}px` : undefined
  }

  const customStyles = {
    ...style,
    ...customColors
  }

  const Component = isLink ? 'a' : 'button'

  const componentProps = {
    ...rest,
    onClick: isDisabled ? undefined : onClick,
    ref: ref as Ref<HTMLAnchorElement | HTMLButtonElement>
  }

  const labelSection =
    leftIcon || label || rightIcon ? (
      <>
        {leftIcon}
        {label && (
          <span
            className={classNames(
              'Concorde-Button__Label',
              classes['button-label']
            )}
          >
            {label}
          </span>
        )}
        {rightIcon}
      </>
    ) : null

  return (
    <Component
      aria-disabled={isDisabled || variant === 'disabled'}
      className={classNames(
        'Concorde-Button',
        classes.root,
        variant && classes[`variant-${variant}`],
        variant === 'primary' && 'Concorde-Button__Primary',
        variant === 'ghost' && 'Concorde-Button__Ghost',
        variant === 'outlined' && 'Concorde-Button__Outlined',
        isToggle && classes.toggle,
        isDisabled && classes.disabled,
        children && classes.hasChildren,
        className
      )}
      style={customStyles}
      {...(componentProps as AnchorHTMLAttributes<HTMLAnchorElement> &
        ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children ? (
        <>
          {labelSection && (
            <div className={classes.labelContainer}>{labelSection}</div>
          )}
          {children}
        </>
      ) : (
        labelSection
      )}
    </Component>
  )
})

Button.displayName = 'Button'
