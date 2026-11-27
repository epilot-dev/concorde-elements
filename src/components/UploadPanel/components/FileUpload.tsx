import { useState, useEffect, useCallback, useRef } from 'react'

import { Typography, Icon } from '../..'

import classes from './FileComponents.module.scss'
import { FileProgress } from './FileProgress'
import type { FileUploadProps } from './types'
import { FileUploadStatus } from './types'
import { withUploadProgress } from './utils'

export function FileUpload({
  file,
  uploadFileHandler,
  labels,
  onProgressFinished,
  showLoadingBar
}: FileUploadProps) {
  const [progress, setProgress] = useState<number>(0)
  const [status, setStatus] = useState<FileUploadStatus>(
    FileUploadStatus.Progress
  )
  const abortControllerRef = useRef<AbortController>()

  const onProgress = (progressEvent?: ProgressEvent) => {
    progressEvent &&
      setProgress(
        Math.floor((progressEvent.loaded * 100) / progressEvent.total)
      )
  }

  const onCancel = useCallback(() => {
    abortControllerRef.current?.abort()
    setStatus(FileUploadStatus.Cancelled)
    onProgressFinished?.(FileUploadStatus.Cancelled)
  }, [onProgressFinished])

  useEffect(() => {
    abortControllerRef.current = new AbortController()

    withUploadProgress(
      uploadFileHandler,
      file,
      onProgress,
      abortControllerRef.current?.signal
    )
      .then(() => {
        setStatus(FileUploadStatus.Successful)
        onProgressFinished?.(FileUploadStatus.Successful)
      })
      .catch((e: Error) => {
        // wont record errors when the user intentionally cancelled
        if (e?.name === 'CanceledError') return

        setStatus(FileUploadStatus.Failed)
        onProgressFinished?.(FileUploadStatus.Failed, e)
      })
    // runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (
    FileUploadStatus.Successful ||
    FileUploadStatus.Cancelled ||
    FileUploadStatus.Progress
  ) {
    if (!showLoadingBar) {
      return null
    }

    return (
      <FileProgress
        fileName={file.name}
        onClickCancel={onCancel}
        progress={progress}
        status={status}
        statusComponents={labels}
      />
    )
  }

  if (FileUploadStatus.Failed) {
    return (
      <Typography className={classes.fileUploadStatus}>
        {labels.Failed}
        <Icon isFilled name="error" />
      </Typography>
    )
  }

  return null
}
