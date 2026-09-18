import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { DropdownMenu } from '../DropdownMenu'
import { DropdownMenuItem } from '../DropdownMenuItem'
import { DropdownMenuItemContent } from '../DropdownMenuItemContent'
import type { DropdownMenuXProps, DropdownOption } from '../types'

export const DropdownMenuX = forwardRef<
  HTMLUListElement,
  PropsWithoutRef<Omit<DropdownMenuXProps, 'isMulti'>>
>((props, ref) => {
  const {
    className,
    options,
    value,
    defaultValue,
    onSelect,
    disabledLabels,
    ...rest
  } = props

  function isValueSelected(optionValue: DropdownOption['value']) {
    const localValue = value || defaultValue

    if (Array.isArray(localValue)) {
      return localValue?.includes(optionValue)
    }

    return optionValue === localValue
  }

  return (
    <DropdownMenu {...rest} className={className} ref={ref}>
      {options?.map((option, index) => {
        const isSelected = isValueSelected(option.value)
        const isDisabled = disabledLabels?.includes(option.label)

        return (
          <DropdownMenuItem
            aria-label={option.label || option.value}
            isDisabled={isDisabled}
            isSelected={isSelected}
            key={`${option.label}-${index}`}
            onSelect={() => {
              if (isDisabled) {
                return
              }
              if (onSelect) onSelect(option.value)
            }}
          >
            <DropdownMenuItemContent>{option.label}</DropdownMenuItemContent>
          </DropdownMenuItem>
        )
      })}
    </DropdownMenu>
  )
})

DropdownMenuX.displayName = 'DropdownMenuX'
