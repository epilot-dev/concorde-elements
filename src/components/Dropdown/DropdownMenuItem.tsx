import { Item as DropdownMenuItemBase } from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import type { PropsWithoutRef, ReactElement } from 'react'
import { cloneElement, forwardRef, isValidElement } from 'react'
import flattenChildren from 'react-keyed-flatten-children'

import { DropdownMenuItemAdornment, MenuItem } from '..'

import classes from './DropdownMenuItem.module.scss'
import type {
  DropdownMenuItemAdornmentProps,
  DropdownMenuItemProps
} from './types'

export const DropdownMenuItem = forwardRef<
  HTMLLIElement,
  PropsWithoutRef<DropdownMenuItemProps>
>((props, ref) => {
  const {
    className,
    isSelected,
    isDisabled,
    hoverBgColor,
    hoverColor,
    selectedBgColor,
    selectedColor,
    ...rest
  } = props

  return (
    <DropdownMenuItemBase
      {...rest}
      aria-selected={isSelected || false}
      asChild
      className={classNames(
        'Concorde-DropdownMenuItem',
        classes.root,
        className
      )}
      role="option"
    >
      <MenuItemBase
        {...rest}
        hoverBgColor={hoverBgColor}
        hoverColor={hoverColor}
        isDisabled={isDisabled}
        isSelected={isSelected}
        ref={ref}
        selectedBgColor={selectedBgColor}
        selectedColor={selectedColor}
      />
    </DropdownMenuItemBase>
  )
})

const MenuItemBase = forwardRef<
  HTMLLIElement,
  PropsWithoutRef<DropdownMenuItemProps>
>(({ isDisabled, disabled, isSelected, children, ...props }, ref) => {
  const isSelectedItem = isSelected || props['data-highlighted']
  const isDisabledItem = isDisabled || disabled || props['data-disabled']

  const directChildren = flattenChildren(children).map((child) => {
    // If it's a DropdownMenuItemAdornment, pass some props to it
    if (isValidElement(child) && child.type === DropdownMenuItemAdornment) {
      return cloneElement(
        child as ReactElement<DropdownMenuItemAdornmentProps>,
        {
          isSelected: isSelectedItem
        }
      )
    }

    return child
  })

  return (
    <MenuItem
      {...props}
      isClickable
      isDisabled={isDisabledItem}
      isSelected={isSelectedItem}
      ref={ref}
    >
      {directChildren}
    </MenuItem>
  )
})

MenuItemBase.displayName = 'MenuItemBase'
DropdownMenuItem.displayName = 'DropdownMenuItem'
