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
      description,
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
      'aria-describedby': ariaDescribedby,
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
    const descriptionId = `${id}-description`
    const hasDescription = Boolean(description)
    const describedBy =
      [hasDescription ? descriptionId : undefined, ariaDescribedby]
        .filter(Boolean)
        .join(' ') || undefined

    return (
      <div
        className={classNames(
          'Concorde-Checkbox',
          classes.root,
          isDisabled && classes.disabled,
          hasDescription && classes.hasDescription,
          labelPlacement && classes[`position-${labelPlacement}`],
          className
        )}
        role="presentation"
        style={customStyles}
      >
        <Root
          {...rest}
          aria-describedby={describedBy}
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
        {label && !hasDescription && (
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
        {label && hasDescription && (
          <div
            className={classNames(
              'Concorde-Checkbox__Content',
              classes.checkboxContent
            )}
          >
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
            <span
              className={classNames(
                'Concorde-Checkbox__Description',
                classes.checkboxDescription
              )}
              id={descriptionId}
            >
              {description}
            </span>
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
