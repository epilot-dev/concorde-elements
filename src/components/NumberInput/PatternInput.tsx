import { forwardRef } from 'react'
import { PatternFormat } from 'react-number-format'

import type { PatternInputProps } from '..'
import { Input } from '..'

export const PatternInput = forwardRef<HTMLInputElement, PatternInputProps>(
  (props, ref) => {
    const { patternChar, format, onChange, mask = '_', ...rest } = props

    return (
      <PatternFormat
        customInput={Input}
        format={format}
        getInputRef={ref}
        mask={mask}
        onValueChange={onChange}
        patternChar={patternChar}
        {...rest}
      />
    )
  }
)

PatternInput.displayName = 'PatternInput'
