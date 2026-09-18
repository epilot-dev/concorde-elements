import type { UploadFileHandlerCallback } from './types'
import { FileUploadStatus } from './types'

// TODO: Create generic factory to generate "is" maps from enums
export const isUploadStatus = (
  status: FileUploadStatus | undefined
): Record<keyof typeof FileUploadStatus, boolean> => {
  return Object.entries(FileUploadStatus).reduce(
    (acc, [key, value]) => {
      acc[key as keyof typeof FileUploadStatus] = value === status

      return acc
    },
    {} as ReturnType<typeof isUploadStatus>
  )
}

export const withUploadProgress = (
  uploadFileHandler: UploadFileHandlerCallback,
  file: File,
  onUploadProgress: (progress?: ProgressEvent) => void,
  signal?: AbortSignal
) => {
  const config = {
    onUploadProgress: onUploadProgress,
    signal
  }

  const data = new FormData()

  data.append('file', file)

  return uploadFileHandler(data, config)
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}
