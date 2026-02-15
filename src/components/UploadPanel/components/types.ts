import type { EnrichedFile } from '../..'

export type FileUploadStatusLabel = Record<
  keyof typeof FileUploadStatus,
  string | React.ReactNode
>

export type FileProgressProps = {
  fileName?: string
  /**
   * Progress in percentage.
   * If not provided, the progress bar will not show.
   */
  progress?: number
  /**
   * Callback function to cancel the upload.
   * If not provided, the cancel button will not show
   */
  onClickCancel?: () => void
  status?: FileUploadStatus
  statusComponents?: Partial<FileUploadStatusLabel>
}

export enum FileUploadStatus {
  Progress = 'PROGRESS',
  Successful = 'SUCCESSFUL',
  Failed = 'FAILED',
  Cancelled = 'CANCELLED'
}

export type FileUploadProps = {
  onProgressFinished?: (
    progress?: Exclude<FileUploadStatus, FileUploadStatus.Progress>,
    error?: Error
  ) => void
  file: EnrichedFile
  uploadFileHandler: UploadFileHandlerCallback
  showLoadingBar: boolean
  labels: FileUploadStatusLabel
}

export type FileStatusNotificationProps = {
  message: React.ReactNode
  icon: React.ReactNode
}

export type FilesTableProps = {
  files?: S3File[]
  labels: {
    fileName: string
  }
  onDeleteFile?: deleteFileHandlerCallback
}

export type UploadFileHandlerCallback = (
  data: FormData,
  options?: {
    onUploadProgress?: (progress: ProgressEvent) => void
    signal?: AbortSignal
  }
) => Promise<void>

export type deleteFileHandlerCallback = (file: S3File) => void

/**
 * Describes a file that has been uploaded to S3
 */
export type S3File = {
  original_name: string
  file_name: string
  file_size: number
  bucket_name?: string
  file_type?: string
  _tags?: string[]
  s3ref?: {
    key: string
    bucket: string
  }
}
