import { Item as ToggleGroupItemBase } from '@radix-ui/react-toggle-group'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { ToggleButtonBase } from '../ToggleButton'

import classes from './ToggleGroup.module.scss'
import type { ToggleGroupItemProps } from './types'

export const ToggleGroupItem = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<ToggleGroupItemProps>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupItemBase
      asChild
      {...props}
      className={classNames(
        'Concorde-ToggleGroupItem',
        classes.itemRoot,
        className
      )}
    >
      <ToggleButtonBase {...props} ref={ref} />
    </ToggleGroupItemBase>
  )
})

ToggleGroupItem.displayName = 'ToggleGroupItem'
