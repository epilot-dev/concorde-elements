import classNames from 'classnames'
import type { ReactElement } from 'react'
import { cloneElement, forwardRef, isValidElement } from 'react'
import flattenChildren from 'react-keyed-flatten-children'

import { DropdownMenuItem, MenuItem } from '..'

import classes from './Menu.module.scss'
import type { MenuItemProps, MenuProps } from './types'

export const Menu = forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
  const {
    className,
    children,
    hoverBgColor,
    hoverColor,
    selectedBgColor,
    selectedColor,
    ...rest
  } = props

  return (
    <ul
      className={classNames('Concorde-Menu', classes.root, className)}
      ref={ref}
      role="listbox"
      {...rest}
    >
      {flattenChildren(children).map((child) => {
        // If it's a Menu Item or DropdownMenu Item, pass certain props to it
        if (
          isValidElement(child) &&
          (child.type === MenuItem || child.type === DropdownMenuItem)
        ) {
          return cloneElement(child as ReactElement<MenuItemProps>, {
            hoverBgColor,
            hoverColor,
            selectedBgColor,
            selectedColor
          })
        }

        return child
      })}
    </ul>
  )
})

Menu.displayName = 'Menu'
