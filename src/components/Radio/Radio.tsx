import { Item as RadioGroupItem } from '@radix-ui/react-radio-group'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { RadioBase } from './RadioBase'
import type { RadioGroupItemProps } from './types'

export const Radio = forwardRef<
  HTMLInputElement,
  PropsWithoutRef<RadioGroupItemProps>
>((props, ref) => {
  return (
    <RadioGroupItem {...props} asChild>
      <RadioGroupItemBase {...props} ref={ref} />
    </RadioGroupItem>
  )
})

const RadioGroupItemBase = forwardRef<
  HTMLInputElement,
  PropsWithoutRef<RadioGroupItemProps>
>(({ onChange, ...props }, ref) => {
  const isChecked = props['data-state'] === 'checked'

  return (
    <RadioBase {...props} checked={isChecked} onChange={onChange} ref={ref} />
  )
})

Radio.displayName = 'Radio'
RadioGroupItemBase.displayName = 'RadioGroupItemBase'
