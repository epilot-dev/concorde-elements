import useForkRef from '@mui/utils/useForkRef'
import classNames from 'classnames'
import { forwardRef, useId, useMemo } from 'react'

import { Reveal } from '../Reveal'
import { useTheme } from '../ThemeProvider'

import { useOtpInput } from './hooks/useOtpInput'
import type { OtpInputProps } from './types'
import { getDefaultBoxAriaLabel } from './utils'

import classes from './OtpInput.module.scss'

export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  (props, ref) => {
    const { variants } = useTheme()
    const {
      value,
      onChange,
      onComplete,
      onFocus,
      onBlur,
      length = 6,
      validationType = 'numeric',
      id: idProp,
      name,
      label,
      'aria-label': ariaLabel,
      helperText,
      isRequired,
      isDisabled,
      isError,
      autoFocus,
      getBoxAriaLabel,
      variant = variants?.input ?? 'outlined',
      className,
      style
    } = props

    const { currentValue, activeIndex, groupRef, setBoxRef, getBoxProps } =
      useOtpInput({
        value,
        onChange,
        onComplete,
        onFocus,
        onBlur,
        autoFocus,
        length,
        validationType
      })

    const setFirstBox = useMemo(() => setBoxRef(0), [setBoxRef])
    const firstBoxRef = useForkRef(ref, setFirstBox)

    const generatedId = useId()
    const id = idProp ?? generatedId
    const labelId = `${id}-label`
    const helperTextId = helperText
      ? `${id}-${isError ? 'errorMessage' : 'helperText'}`
      : undefined
    const getBoxId = (index: number) =>
      index === 0 ? id : `${id}-box-${index}`

    const getAriaLabel = (index: number) =>
      getBoxAriaLabel
        ? getBoxAriaLabel(index, length)
        : getDefaultBoxAriaLabel(index, length, validationType)

    return (
      <div
        className={classNames(
          'Concorde-OtpInput',
          classes.root,
          isDisabled && classes.disabled,
          className
        )}
        style={style}
      >
        {label && (
          <label
            className={classNames(
              'Concorde-OtpInput__Label',
              classes.label,
              isError && !isDisabled && classes['label-error']
            )}
            htmlFor={getBoxId(activeIndex)}
            id={labelId}
          >
            {label}
            {isRequired && (
              <span
                aria-hidden="true"
                className={classNames(
                  isError && !isDisabled && classes['error']
                )}
              >
                &thinsp;*
              </span>
            )}
          </label>
        )}
        <div
          aria-label={label ? undefined : ariaLabel}
          aria-labelledby={label ? labelId : undefined}
          className={classNames('Concorde-OtpInput__Group', classes.group)}
          ref={groupRef}
          role="group"
        >
          {Array.from({ length }, (_, index) => (
            <input
              {...getBoxProps(index)}
              aria-describedby={helperTextId}
              aria-invalid={isError || undefined}
              aria-label={getAriaLabel(index)}
              aria-required={isRequired || undefined}
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              className={classNames(
                'Concorde-OtpInput__Box',
                classes.box,
                currentValue.charAt(index) && 'Concorde-OtpInput__Box--filled',
                isError && classes['box-error'],
                variant === 'underlined' && classes['box-underlined']
              )}
              disabled={isDisabled}
              id={getBoxId(index)}
              inputMode={validationType === 'numeric' ? 'numeric' : 'text'}
              key={index}
              pattern={validationType === 'numeric' ? '[0-9]*' : '[a-zA-Z0-9]*'}
              ref={index === 0 ? firstBoxRef : setBoxRef(index)}
              spellCheck={false}
              type="text"
            />
          ))}
        </div>
        <Reveal isSubtle show={helperText}>
          <p
            className={classNames(
              'Concorde-OtpInput__HelperText',
              classes['helper-text'],
              isError && !isDisabled && classes['error']
            )}
            id={helperTextId}
          >
            {helperText}
          </p>
        </Reveal>
        {name && (
          <input
            disabled={isDisabled}
            name={name}
            type="hidden"
            value={currentValue}
          />
        )}
      </div>
    )
  }
)

OtpInput.displayName = 'OtpInput'
