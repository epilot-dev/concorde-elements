import { Content as DropdownMenuBase } from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Menu } from '..'

import classes from './DropdownMenu.module.scss'
import type { DropdownMenuProps } from './types'

export const DropdownMenu = forwardRef<
  HTMLUListElement,
  PropsWithoutRef<DropdownMenuProps>
>((props, ref) => {
  const {
    className,
    labelId,
    hoverBgColor,
    hoverColor,
    selectedBgColor,
    selectedColor,
    ...rest
  } = props

  return (
    <DropdownMenuBase
      asChild
      {...rest}
      className={classNames('Concorde-DropdownMenu', classes.root, className)}
    >
      <MenuBase
        {...rest}
        hoverBgColor={hoverBgColor}
        hoverColor={hoverColor}
        labelId={labelId}
        ref={ref}
        selectedBgColor={selectedBgColor}
        selectedColor={selectedColor}
      />
    </DropdownMenuBase>
  )
})

export const MenuBase = forwardRef<
  HTMLUListElement,
  PropsWithoutRef<DropdownMenuProps>
>((props, ref) => {
  const {
    labelId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sideOffset: _,
    ...rest
  } = props

  return <Menu {...rest} aria-labelledby={labelId} ref={ref} role="listbox" />
})

MenuBase.displayName = 'MenuBase'
DropdownMenu.displayName = 'DropdownMenu'
