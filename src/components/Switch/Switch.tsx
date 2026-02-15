import {
  Root as SwitchRoot,
  Thumb as SwitchThumb
} from '@radix-ui/react-switch'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Icon } from '..'

import classes from './Switch.module.scss'
import type { SwitchProps } from './types'

export const Switch = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<SwitchProps>
>((props, ref) => {
  const {
    className,
    onChange,
    checked,
    isDisabled,
    isRequired,
    id,
    isError,
    label,
    helperText,
    labelPlacement = 'end',
    labelClassName,
    ...rest
  } = props

  return (
    <div
      className={classNames(
        'Concorde-Switch',
        classes.root,
        isDisabled && classes.disabled
      )}
    >
      <div
        className={classNames(
          classes['switch-root-container'],
          classes[`position-${labelPlacement}`]
        )}
      >
        <label
          className={classNames(
            'Concorde-Switch__Label',
            classes.label,
            id && classes['label-clickable'],
            labelClassName
          )}
          htmlFor={id}
        >
          {label}
          {isRequired && (
            <span
              aria-hidden="true"
              className={classNames(isError && !isDisabled && classes['error'])}
            >
              &thinsp;*
            </span>
          )}
        </label>
        <SwitchRoot
          {...rest}
          checked={checked}
          className={classNames(
            'Concorde-Switch__Root',
            classes['switch-root'],
            className
          )}
          disabled={isDisabled}
          id={id}
          onCheckedChange={onChange}
          ref={ref}
        >
          <SwitchThumb
            className={classNames('Concorde-Switch__Thumb', classes.thumb)}
          >
            {checked ? (
              <Icon
                color="var(--concorde-primary-color)"
                name="check"
                size="16px"
              />
            ) : (
              <span className={classes['thumb-placeholder']} />
            )}
          </SwitchThumb>
        </SwitchRoot>
      </div>
      {helperText && (
        <p
          className={classNames(
            'Concorde-Switch__HelperText',
            classes['helper-text'],
            isError && !isDisabled && classes['error']
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  )
})

Switch.displayName = 'Switch'
