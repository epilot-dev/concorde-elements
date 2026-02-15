import type { UploadZoneProps } from '..'

import type {
  deleteFileHandlerCallback,
  FilesTableProps,
  FileUploadProps,
  S3File,
  UploadFileHandlerCallback
} from './components/types'

export type UploadPanelProps = {
  filesTableProps: FilesTableProps
  uploadZoneProps?: UploadZoneProps
  labels: FileUploadProps['labels']
  uploadFileHandler: UploadFileHandlerCallback
  deleteFileHandler: deleteFileHandlerCallback
  showLoadingBar?: boolean
  uploadedFiles?: S3File[]
  maxQuantity?: number
  required?: boolean
  error?: string
  limitReachedText?: string
  fileOfTypeText?: string
  /** Error shown when the file type is not supported */
  fileNotSupportedText?: string
  /** Error shown when the file size is greater than the specified limit */
  largeFilesNotAllowedText?: string
  /** Error shown when the file size is lower than the specified limit (.e.g empty) */
  emptyFilesNotAllowedText?: string
  networkErrorText?: string
  /** Message shown when the user attempts to exceed the maximum number of files allowed */
  tooManyFilesText?: string
  /** Id of upload panel input */
  id?: string
  /** Block id for aria-labelledby */
  blockId?: string
  /** Callback fired when the upload starts */
  onUploadStart?: () => void
  /** Callback fired when the upload ends */
  onUploadEnd?: () => void
}
