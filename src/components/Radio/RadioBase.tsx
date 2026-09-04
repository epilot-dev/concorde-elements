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
      description,
      isDisabled,
      isRequired,
      isError,
      size = '24px',
      color,
      errorColor,
      uncheckedColor,
      style,
      labelPlacement,
      'aria-describedby': ariaDescribedby,
      ...rest
    } = props

    const labelId = id ? `${id}-label` : undefined
    const descriptionId = id ? `${id}-description` : undefined
    const hasDescription = Boolean(description)
    const describedBy =
      [hasDescription ? descriptionId : undefined, ariaDescribedby]
        .filter(Boolean)
        .join(' ') || undefined

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
          hasDescription && classes.hasDescription,
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
            aria-describedby={describedBy}
            aria-disabled={isDisabled}
            // Pin the accessible name to the label span so the description is
            // announced as a description, not as part of the name
            aria-labelledby={hasDescription ? labelId : undefined}
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

        {label && !hasDescription && (
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
        {label && hasDescription && (
          <span
            className={classNames(
              'Concorde-Radio__Content',
              classes.radioContent
            )}
          >
            <span
              {...labelProps}
              className={classNames(
                'Concorde-Radio__Label',
                classes.radioLabel,
                labelProps?.className
              )}
              id={labelId}
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
            <span
              className={classNames(
                'Concorde-Radio__Description',
                classes.radioDescription
              )}
              id={descriptionId}
            >
              {description}
            </span>
          </span>
        )}
      </label>
    )
  }
)

RadioBase.displayName = 'RadioBase'
