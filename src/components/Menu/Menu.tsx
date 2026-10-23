import classNames from 'classnames'
import type { ReactElement } from 'react'
import { cloneElement, forwardRef, isValidElement } from 'react'
import flattenChildren from 'react-keyed-flatten-children'

import { DropdownMenuItem } from '../Dropdown/DropdownMenuItem'

import classes from './Menu.module.scss'
import { MenuItem } from './MenuItem'
import type { MenuItemProps, MenuProps } from './types'

export const Menu = forwardRef<HTMLUListElement, MenuProps>((props, ref) => {
  const {
    className,
    children,
    hoverBgColor,
    hoverColor,
    selectedBgColor,
    selectedColor,
    highlightFirstOption,
    ...rest
  } = props

  const flattenedChildren = flattenChildren(children)

  return (
    <ul
      className={classNames('Concorde-Menu', classes.root, className)}
      ref={ref}
      role="listbox"
      {...rest}
    >
      {flattenedChildren.map((child, index) => {
        // If it's a Menu Item or DropdownMenu Item, pass certain props to it
        if (
          isValidElement(child) &&
          (child.type === MenuItem || child.type === DropdownMenuItem)
        ) {
          const menuItem = child as ReactElement<MenuItemProps>

          return cloneElement(menuItem, {
            hoverBgColor,
            hoverColor,
            selectedBgColor,
            selectedColor,
            isHighlighted: highlightFirstOption && index === 0
          })
        }

        return child
      })}
    </ul>
  )
})

Menu.displayName = 'Menu'
