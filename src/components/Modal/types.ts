import type * as Dialog from '@radix-ui/react-dialog'
import type { ComponentProps } from 'react'

import type { IconButton } from '../IconButton'

export type ModalProps = ComponentProps<'div'> &
  Pick<ComponentProps<typeof Dialog.Root>, 'onOpenChange' | 'open'> &
  ComponentProps<typeof Dialog.Content> & {
    /**
     * Shows the close button in the top right corner of the modal
     *
     * Defaults to false
     */
    showCloseButton?: boolean
    /**
     * Classname to apply to the close button
     */
    closeButtonClassname?: string
    /**
     * Callback fired when the component requests to be closed
     * @deprecated Use `onOpenChange` instead, as `onClose` comes from the legacy mui architecture
     */
    onClose: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    /**
     * Classname to apply to the modal body
     */
    bodyClassName?: string
    /**
     * Close Button props
     */
    closeButtonProps?: ComponentProps<typeof IconButton>
  }
