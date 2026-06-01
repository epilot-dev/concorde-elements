import type * as PopoverPrimitive from '@radix-ui/react-popover'
import type { ComponentProps, ElementRef } from 'react'

export type PopoverProps = ComponentProps<typeof PopoverPrimitive.Root>
export type PopoverTriggerProps = ComponentProps<
  typeof PopoverPrimitive.Trigger
>
export type PopoverContentProps = ComponentProps<
  typeof PopoverPrimitive.Content
>
export type PopoverAnchorProps = ComponentProps<typeof PopoverPrimitive.Anchor>
export type PopoverCloseProps = ComponentProps<typeof PopoverPrimitive.Close>
export type PopoverArrowProps = ComponentProps<typeof PopoverPrimitive.Arrow>
export type PopoverContentRef = ElementRef<typeof PopoverPrimitive.Content>
