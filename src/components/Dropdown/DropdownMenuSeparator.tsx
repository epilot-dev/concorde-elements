import { Separator as DropdownSeparatorBase } from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Divider } from '..'

import type { DropdownMenuSeparatorProps } from './types'

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<DropdownMenuSeparatorProps>
>(({ className, ...props }, ref) => {
  return (
    <DropdownSeparatorBase
      asChild
      {...props}
      className={classNames('Concorde-DropdownMenuSeparator', className)}
    >
      <Divider {...props} ref={ref} />
    </DropdownSeparatorBase>
  )
})

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'
