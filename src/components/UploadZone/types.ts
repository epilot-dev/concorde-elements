import type {
  ChangeEvent,
  CSSProperties,
  HTMLAttributes,
  ReactNode
} from 'react'
import type {
  DropzoneOptions,
  FileRejection,
  FileWithPath
} from 'react-dropzone'

export type DropEvent =
  | React.DragEvent<HTMLElement>
  | ChangeEvent<HTMLInputElement>
  | DragEvent
  | Event

export type UploadZoneProps = {
  /**
   * The icon used inside the upload
   */
  uploadIcon?: ReactNode

  /**
   * The text used to explain the action to the user
   */
  uploadMessage?: ReactNode | string

  /**
   * The text on the upload button
   */
  uploadButtonText?: string

  /**
   * Totally customize the drop zone. Using this will make the component ignore the uploadIcon
   */
  customDropZone?: JSX.Element

  /**
   * Disable the component
   */
  isDisabled?: boolean

  /**
   * acceptable files default: 'font/*' ex: 'image/jpeg, image/png'
   * check this link by Mozilla https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
   */
  acceptedFilesMIME?: string

  /**
   * This is the color that will be used to display as backround when the drop is acceptable
   */
  dropAcceptedColor?: string

  /**
   * This is the color that will be used to display as backround when the drop is rejected
   */
  dropRejectedColor?: string

  /**
   * a call back fired once the drop is accepted
   */
  onDropAccepted?: (files: EnrichedFile[], event: DropEvent) => void

  /**
   * a call back fired once the drop is rejected
   */
  onDropRejected?: (
    fileRejections: EnrichedFileRejection[],
    event: DropEvent
  ) => void

  /**
   * a call back fired once a drop happens, regardless if the dropped files were accepted or rejected.
   */
  onDrop?: (
    acceptedFiles: EnrichedFile[],
    fileRejections: EnrichedFileRejection[],
    event: DropEvent
  ) => void

  /**
   * disable the click event, this will allow only deag n drop
   */
  disableClickEvent?: boolean

  /**
   * drop zone container style which also could be used border style
   */
  containerProps?: HTMLAttributes<HTMLDivElement>

  /**
   * Maximum file size, in bytes.
   * @default 0 (allows uploading files of ANY size)
   */
  maxSize?: DropzoneOptions['maxSize']

  /**
   * Minimum file size, in bytes.
   * @default 0 (allows uploading empty files)
   */
  minSize?: DropzoneOptions['minSize']

  /**
   * The maximum number of files that can be uploaded (at all times).
   *
   * If set to 0 (zero), it means an unlimited number of files can be uploaded
   * @default 1
   */
  maxQuantity?: number

  /**
   * If error is true, the component will be displayed with an error style
   */
  isError?: boolean

  /**
   * Input id
   */
  id?: string

  /**
   * The block id
   */
  blockId?: string
}

export interface EnrichedFileRejection extends FileRejection {
  file: EnrichedFile
}

export interface EnrichedFile extends File, FileWithPath {
  /** Best effort generated ID that (attempts to) uniquely identifies a file object */
  tempId?: string
}

export interface UploadZoneCSSProperties extends CSSProperties {
  '--concorde-dropzone-accepted-color'?: string
  '--concorde-dropzone-rejected-color'?: string
  '--concorde-dropzone-active-background-color'?: string
}
