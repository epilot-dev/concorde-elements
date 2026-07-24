import classNames from 'classnames'
import type { ChangeEvent } from 'react'
import { forwardRef } from 'react'

import { Icon } from '../Icon'

import classes from './Radio.module.scss'
import type { RadioCSSProperties, RadioProps } from './types'

export const RadioBase = forwardRef<HTMLInputElement, RadioProps>(
  (props, ref) => {
    const {
      id,
      className,
      onChange,
      value,
      checked,
      defaultChecked,
      containerProps,
      label,
      labelProps,
      isDisabled,
      isRequired,
      isError,
      size = '24px',
      color,
      errorColor,
      uncheckedColor,
      style,
      labelPlacement,
      ...rest
    } = props

    const customColors: RadioCSSProperties = {
      '--concorde-radio-label-color': color,
      '--concorde-radio-error-color': errorColor,
      '--concorde-radio-unchecked-color': uncheckedColor
    }

    const customStyles = {
      ...style,
      ...customColors
    }

    return (
      <label
        {...containerProps}
        aria-disabled={isDisabled}
        className={classNames(
          'Concorde-Radio',
          classes.root,
          isDisabled && classes.disabled,
          labelPlacement && classes[`position-${labelPlacement}`],
          containerProps?.className
        )}
        htmlFor={id}
        style={customStyles}
      >
        <span
          className={classNames(
            'Concorde-Radio__Control',
            classes.radioControl
          )}
        >
          <input
            {...rest}
            aria-disabled={isDisabled}
            checked={checked}
            className={classNames(
              'Concorde-Radio__Input',
              classes.radioInput,
              className
            )}
            defaultChecked={defaultChecked}
            disabled={isDisabled}
            id={id}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (isDisabled) {
                event.preventDefault()

                return
              }
              if (onChange) {
                onChange(event.target.checked)
              }
            }}
            ref={ref}
            type="radio"
            value={value}
          />
          <Icon
            className={classNames(
              'Concorde-Radio_Icon',
              classes.radioIcon,
              checked && classes.radioIconChecked
            )}
            name={checked ? 'radio_button_checked' : 'radio_button_unchecked'}
            size={size}
          />
        </span>

        {label && (
          <span
            {...labelProps}
            className={classNames(
              'Concorde-Radio__Label',
              classes.radioLabel,
              labelProps?.className
            )}
          >
            {typeof label === 'string' ? (
              <>
                {label}
                {isRequired && (
                  <span
                    aria-hidden="true"
                    className={classNames(
                      isError && !isDisabled && classes.error
                    )}
                  >
                    &thinsp;*
                  </span>
                )}
              </>
            ) : (
              label
            )}
          </span>
        )}
      </label>
    )
  }
)

RadioBase.displayName = 'RadioBase'
