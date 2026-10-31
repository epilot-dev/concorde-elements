import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { MenuItemAdornment } from '..'

import type { DropdownMenuItemAdornmentProps } from './types'

export const DropdownMenuItemAdornment = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<DropdownMenuItemAdornmentProps>
>(({ className, ...props }, ref) => {
  return (
    <MenuItemAdornment
      {...props}
      className={classNames('Concorde-DropdownMenuItemAdornment', className)}
      ref={ref}
    />
  )
})

DropdownMenuItemAdornment.displayName = 'DropdownMenuItemAdornment'
