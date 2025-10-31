import * as PopoverPrimitive from '@radix-ui/react-popover'
import classNames from 'classnames'
import React from 'react'

import classes from './Popover.module.scss'
import type { PopoverContentProps, PopoverContentRef } from './types'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverClose = PopoverPrimitive.Close

const PopoverArrow = PopoverPrimitive.Arrow

const PopoverContent = React.forwardRef<PopoverContentRef, PopoverContentProps>(
  ({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          className={classNames(
            classes.content,
            'Concorde-PopoverContent',
            className
          )}
          ref={ref}
          sideOffset={sideOffset}
          {...props}
        >
          {props.children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    )
  }
)

PopoverContent.displayName = 'PopoverContent'

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverClose,
  PopoverArrow
}
