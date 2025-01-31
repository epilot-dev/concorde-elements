import type {
  ModalBackdropSlotProps,
  ModalProps as ModalBaseProps
} from '@mui/base/Modal'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type NativeDiv = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
>

export type ModalProps = ModalBaseProps & {
  /**
   * Shows the close button in the top right corner of the modal
   *
   * Defaults to false
   */
  showCloseButton?: boolean
}

export type ModalBackdropProps = NativeDiv & ModalBackdropSlotProps

export type ModalHeaderProps = NativeDiv

export type ModalContentProps = NativeDiv

export type ModalActionsProps = NativeDiv
