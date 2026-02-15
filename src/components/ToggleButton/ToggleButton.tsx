import { Root as ToggleRoot } from '@radix-ui/react-toggle'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Button } from '../Button'

import type { ToggleButtonProps } from './types'

export const ToggleButton = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<ToggleButtonProps>
>((props, ref) => {
  return (
    <ToggleRoot {...props} asChild>
      <ToggleButtonBase {...props} ref={ref} />
    </ToggleRoot>
  )
})

export const ToggleButtonBase = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<ToggleButtonProps>
>(({ pressed, className, disabled, ...props }, ref) => {
  // Set variant to primary if pressed (multiple toggle type) or checked (single toggle type)
  const toggleVariant =
    pressed || props['data-state'] === 'on' ? 'primary' : 'outlined'

  return (
    <Button
      {...props}
      className={classNames('Concorde-ToggleButton', className)}
      isDisabled={disabled}
      isToggle
      ref={ref}
      variant={toggleVariant}
    />
  )
})

ToggleButton.displayName = 'ToggleButton'
ToggleButtonBase.displayName = 'ToggleButtonBase'
