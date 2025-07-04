import { forwardRef } from 'react'
import InputMask from 'react-input-mask'

import { Input } from '../..'

import type { MaskedInputProps } from './types'

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (props, ref) => {
    const { inputProps, ...rest } = props
    const {
      onChange,
      onMouseDown,
      onFocus,
      onBlur,
      value,
      isRequired,
      isDisabled,
      disabled,
      ...otherInputProps
    } = inputProps

    return (
      <InputMask
        disabled={isDisabled || disabled}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onMouseDown={onMouseDown}
        value={value}
        {...rest}
      >
        {() => (
          <Input
            isDisabled={isDisabled || disabled}
            isRequired={isRequired}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            onMouseDown={onMouseDown}
            ref={ref}
            value={value}
            {...otherInputProps}
          />
        )}
      </InputMask>
    )
  }
)

MaskedInput.displayName = 'MaskedInput'
