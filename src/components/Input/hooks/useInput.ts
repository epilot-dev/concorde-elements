import classNames from 'classnames'
import { useState } from 'react'
import type { FocusEvent } from 'react'

import classes from '../Input.module.scss'
import type { UseInputOptions } from '../types'

export const useInput = <Type extends 'textarea' | 'input'>(
  options: UseInputOptions<Type>
) => {
  const {
    startAdornment,
    endAdornment,
    className,
    isDisabled,
    isTriggered,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isTriggerInput: _,
    isError,
    placeholder,
    id,
    value,
    defaultValue,
    onBlur,
    onFocus,
    isTextarea,
    labelId,
    variant = 'outlined',
    isAutofilled,
    readOnly,
    ...inputProps
  } = options

  const hasValue = Boolean(value || defaultValue)

  const [isLocalFocused, setIsLocalFocused] = useState(false)

  const isFocused = isTriggered || isLocalFocused
  const isFilledVariant = variant === 'filled'
  const isActiveState = hasValue || (!hasValue && isFocused)

  function handleFocus(
    event: FocusEvent<HTMLInputElement & HTMLTextAreaElement>
  ) {
    if (isDisabled || readOnly) {
      event.preventDefault()

      return
    }
    setIsLocalFocused(true)
    if (onFocus) onFocus(event)
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement & HTMLTextAreaElement>
  ) {
    if (isDisabled || readOnly) {
      event.preventDefault()

      return
    }
    setIsLocalFocused(false)
    if (onBlur) onBlur(event)
  }

  const ariaLabelledby = [inputProps['aria-labelledby'], labelId]
    .filter(Boolean)
    .join(' ')

  const combinedProps = {
    ...inputProps,
    'aria-disabled': isDisabled,
    'aria-labelledby': ariaLabelledby || undefined,
    className: classNames(
      isTextarea ? 'Concorde-Input__Textarea' : 'Concorde-Input__Input',
      classes['input'],
      isError && !isFocused && classes['input-error'],
      isDisabled && classes['input-disabled'],
      startAdornment && classes['input-start-adornment'],
      endAdornment && classes['input-end-adornment'],
      (isActiveState || (placeholder && isFilledVariant)) &&
        classes['input-valued'],
      isFilledVariant && classes['input-filled'],
      isTextarea && classes['input-textarea'],
      isAutofilled && classes['input-autofilled'],
      className
    ),
    defaultValue: defaultValue,
    disabled: isDisabled,
    id: id,
    onBlur: handleBlur,
    onFocus: handleFocus,
    value: value,
    readOnly,
    placeholder
  }

  const inputSuffixClasses = classNames(
    classes['input-suffix'],
    isError && !isFocused && classes['input-suffix-error'],
    isDisabled && classes['input-suffix-disabled'],
    startAdornment && classes['input-suffix-start-adornment'],
    endAdornment && classes['input-suffix-end-adornment'],
    isActiveState && classes['input-suffix-valued'],
    isFilledVariant && classes['input-suffix-filled']
  )

  return {
    combinedProps,
    isFocused,
    isActiveState,
    inputSuffixClasses
  }
}
