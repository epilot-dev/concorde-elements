import { Root } from '@radix-ui/react-checkbox'
import classNames from 'classnames'
import { forwardRef } from 'react'

import { Icon } from '..'

import classes from './Checkbox.module.scss'
import type { CheckboxCSSProperties, CheckboxProps } from './types'

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    const {
      id,
      className,
      onChange,
      value,
      checked,
      defaultChecked,
      label,
      isDisabled,
      isRequired,
      isError,
      size = '24px',
      color,
      errorColor,
      uncheckedColor,
      style,
      labelPlacement = 'end',
      labelClassName,
      ...rest
    } = props

    const customColors: CheckboxCSSProperties = {
      '--concorde-checkbox-label-color': color,
      '--concorde-checkbox-error-color': errorColor,
      '--concorde-checkbox-unchecked-color': uncheckedColor
    }

    const customStyles = {
      ...style,
      ...customColors
    }

    const labelId = `${id}-label`

    return (
      <div
        className={classNames(
          'Concorde-Checkbox',
          classes.root,
          isDisabled && classes.disabled,
          labelPlacement && classes[`position-${labelPlacement}`],
          className
        )}
        role="presentation"
        style={customStyles}
      >
        <Root
          {...rest}
          aria-invalid={isError}
          aria-labelledby={labelId}
          aria-required={isRequired}
          checked={checked}
          className={classNames(
            'Concorde-Checkbox__Button',
            classes.checkboxRoot
          )}
          defaultChecked={defaultChecked}
          disabled={isDisabled}
          id={id}
          onCheckedChange={onChange}
          ref={ref}
          required={isRequired}
          value={value}
        >
          <Icon
            aria-hidden="true"
            className={classNames(
              'Concorde-Checkbox__Icon',
              classes.checkboxIcon,
              checked && classes.checkboxIconChecked
            )}
            isFilled={checked}
            name={checked ? 'check_box' : 'check_box_outline_blank'}
            size={size}
          />
        </Root>
        {label && (
          <label
            className={classNames(
              'Concorde-Checkbox__Label',
              classes.checkboxLabel,
              labelClassName
            )}
            htmlFor={id}
            id={labelId}
          >
            {label}
            {isRequired && (
              <span
                aria-hidden="true"
                className={classNames(
                  isError && !isDisabled && classes.error,
                  classes.asterisk
                )}
              >
                &thinsp;*
              </span>
            )}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
