import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import type {
  DropdownXMultiProps,
  DropdownXProps,
  DropdownXSingleProps
} from '../types'

import { DropdownXBase } from './DropdownXBase'

export const DropdownX = forwardRef<
  HTMLUListElement,
  PropsWithoutRef<DropdownXProps>
>((props, ref) => {
  const { isMulti = false, ...rest } = props

  if (isMulti) {
    const multiMenuProps = rest as DropdownXMultiProps

    return <DropdownXBase {...multiMenuProps} ref={ref} sideOffset={0} />
  }

  const singleMenuProps = rest as DropdownXSingleProps

  return <DropdownXBase {...singleMenuProps} ref={ref} sideOffset={0} />
})

DropdownX.displayName = 'DropdownX'
