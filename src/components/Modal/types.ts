import type {
  ModalBackdropSlotProps,
  ModalProps as ModalBaseProps
} from '@mui/base/Modal'
import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react'

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
  /**
   * Classname to apply to the close button
   */
  closeButtonClassname?: string
  /**
   * Callback fired when the component requests to be closed
   */
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  /**
   * Classname to apply to the modal body
   */
  bodyClassName?: string
}

export type ModalBackdropProps = NativeDiv & ModalBackdropSlotProps

export type ModalHeaderProps = NativeDiv

export type ModalContentProps = NativeDiv

export type ModalActionsProps = NativeDiv

export interface ModalCSSProperties extends CSSProperties {
  '--concorde-modal-spacing'?: string
}
