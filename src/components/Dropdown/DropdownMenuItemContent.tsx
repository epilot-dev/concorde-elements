import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { MenuItemContent } from '..'

import type { DropdownMenuItemContentProps } from './types'

export const DropdownMenuItemContent = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<DropdownMenuItemContentProps>
>(({ className, ...rest }, ref) => {
  return (
    <MenuItemContent
      {...rest}
      className={classNames('Concorde-DropdownMenuItemContent', className)}
      ref={ref}
    />
  )
})

DropdownMenuItemContent.displayName = 'DropdownMenuItemContent'
