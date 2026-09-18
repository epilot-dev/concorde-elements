import { Root as DropdownMenuRootBase } from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import type { DropdownMenuRootProps } from './types'

export const DropdownMenuRoot = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<DropdownMenuRootProps>
>((props, ref) => {
  const { className, containerProps, modal = false, ...rest } = props

  return (
    <div
      {...containerProps}
      className={classNames('Concorde-Dropdown', className)}
      ref={ref}
    >
      <DropdownMenuRootBase modal={modal} {...rest} />
    </div>
  )
})

DropdownMenuRoot.displayName = 'DropdownMenuRoot'
