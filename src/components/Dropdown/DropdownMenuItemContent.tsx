import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { MenuItemContent } from '..'

import classes from './DropdownMenuItemContent.module.scss'
import type { DropdownMenuItemContentProps } from './types'

export const DropdownMenuItemContent = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<DropdownMenuItemContentProps>
>(({ className, ...rest }, ref) => {
  return (
    <MenuItemContent
      {...rest}
      className={classNames(
        'Concorde-DropdownMenuItemContent',
        classes.root,
        className
      )}
      ref={ref}
    />
  )
})

DropdownMenuItemContent.displayName = 'DropdownMenuItemContent'
