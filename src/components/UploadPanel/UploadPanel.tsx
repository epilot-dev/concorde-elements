import { useCallback, useMemo, useRef, useState } from 'react'
import { ErrorCode } from 'react-dropzone'

import { Spacing, Typography, UploadZone } from '..'
import type { EnrichedFile, UploadZoneProps } from '../UploadZone'

import { FilesTable } from './components/FilesTable'
import { FileUpload } from './components/FileUpload'
import { FileUploadStatus } from './components/types'
import type { UploadPanelProps } from './types'
import classes from './UploadPanel.module.scss'
import { prepareErrorMessage } from './utils'

export function UploadPanel({
  uploadZoneProps,
  filesTableProps,
  uploadFileHandler,
  deleteFileHandler,
  labels,
  showLoadingBar,
  uploadedFiles = [],
  error,
  limitReachedText = 'File Upload limit reached',
  fileOfTypeText,
  fileNotSupportedText,
  emptyFilesNotAllowedText = 'File is empty or too small',
  largeFilesNotAllowedText = 'File is too big',
  networkErrorText = 'Failed to upload due to network issues',
  tooManyFilesText = 'Too many files',
  id,
  blockId
}: UploadPanelProps) {
  const [workingFiles, setWorkingFiles] = useState<EnrichedFile[]>([])
  const pendingFilesRef = useRef<EnrichedFile[]>([])
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({})
  const filesWithErrors = useMemo<string[]>(
    () => Object.keys(uploadErrors),
    [uploadErrors]
  )
  const [tooManyFilesError, setTooManyFilesError] = useState<boolean>(false)

  /**
   * Removes a specific file from the list of files to upload.
   * You should do this when an error happens, when upload is finished, etc.
   */
  const removeFromFiles = (file: EnrichedFile) => {
    setWorkingFiles((prev) => {
      const newWorkingFiles = prev.filter((prevFile) => {
        if (prevFile.tempId && file.tempId) {
          return prevFile.tempId !== file.tempId
        }

        return prevFile.name !== file.name
      })

      return newWorkingFiles
    })
  }

  const removeFromPendingFiles = (file: EnrichedFile) => {
    const pendingFiles = pendingFilesRef.current

    const newPendingFiles = pendingFiles.filter((prevFile) => {
      if (prevFile.tempId && file.tempId) {
        return prevFile.tempId !== file.tempId
      }

      return prevFile.name !== file.name
    })

    pendingFilesRef.current = newPendingFiles
  }

  const onProgressFinished = (
    file: EnrichedFile,
    progress?: Exclude<FileUploadStatus, FileUploadStatus.Progress>,
    error?: Error
  ) => {
    window.setTimeout(
      () => void removeFromFiles(file),
      // remove from the list of pending files, either immediately(ish) or after some time
      progress === FileUploadStatus.Cancelled ? 5000 : 1000
    )

    if (
      progress === FileUploadStatus.Failed &&
      error?.message === 'Network Error'
    ) {
      setUploadErrors((prev) => ({
        ...prev,
        [file.tempId ?? file.name]: `(${file.name}) ${networkErrorText}`
      }))
    }

    removeFromPendingFiles(file)
  }

  // the call back that will be fired in the dropzone once files are dropped
  const onDrop = useCallback<Exclude<UploadZoneProps['onDrop'], undefined>>(
    (acceptedFiles) => {
      if (
        uploadZoneProps?.maxQuantity &&
        acceptedFiles.length + uploadedFiles.length >
          uploadZoneProps?.maxQuantity
      ) {
        setTooManyFilesError(true)

        return
      }
      // reset the error states after every new file drop
      if (tooManyFilesError) {
        setTooManyFilesError(false)
      }
      setUploadErrors({})
      setWorkingFiles((prev) => [...prev, ...acceptedFiles])
      pendingFilesRef.current = [...pendingFilesRef.current, ...acceptedFiles]
    },
    [uploadedFiles, uploadZoneProps?.maxQuantity, tooManyFilesError]
  )

  const onDropRejected: UploadZoneProps['onDropRejected'] = (
    fileRejections
  ) => {
    let newTooManyFilesError = false

    const newUploadErrors = fileRejections.reduce<typeof uploadErrors>(
      (acc, rejection) => {
        const code = rejection.errors[0].code

        switch (code) {
          case ErrorCode.TooManyFiles:
            // handles separately to avoid multiple error messages
            newTooManyFilesError = true
            break

          case ErrorCode.FileTooSmall:
            acc[rejection.file.tempId ?? rejection.file.name] =
              `(${rejection.file.name}) ${emptyFilesNotAllowedText}`
            break

          case ErrorCode.FileTooLarge:
            acc[rejection.file.tempId ?? rejection.file.name] =
              `(${rejection.file.name}) ${largeFilesNotAllowedText}`
            break

          default:
            acc[rejection.file.tempId ?? rejection.file.name] =
              `${prepareErrorMessage(
                rejection.file.name,
                fileOfTypeText as string
              )} ${fileNotSupportedText}`
            break
        }

        return acc
      },
      {}
    )

    setUploadErrors((prev) => ({ ...prev, ...newUploadErrors }))
    setTooManyFilesError(newTooManyFilesError)
  }

  const uploadLimitReached =
    !!uploadZoneProps?.maxQuantity &&
    uploadZoneProps?.maxQuantity <= uploadedFiles.length

  return (
    <>
      <UploadZone
        {...uploadZoneProps}
        blockId={blockId}
        id={id}
        isDisabled={uploadLimitReached || uploadZoneProps?.isDisabled}
        isError={!!error || uploadZoneProps?.isError}
        onDrop={onDrop}
        onDropRejected={onDropRejected}
      />

      <Spacing scale={5} variant="stack">
        {(uploadLimitReached ||
          tooManyFilesError ||
          error ||
          filesWithErrors) && (
          <Spacing scale={2} variant="stack">
            {/* Shows an error if the upload limit is reached */}
            {uploadLimitReached && (
              <Typography className={classes.helperText}>
                {limitReachedText}
              </Typography>
            )}

            {/* Shows an outermost error or a generic too many files error */}
            {(error || tooManyFilesError) && (
              <Typography
                className={classes.helperText}
                id={`${id}-errorMessage`}
                variant="error"
              >
                {error ?? tooManyFilesText}
              </Typography>
            )}

            {/* Shows errors related to individual file uploads */}
            {filesWithErrors && filesWithErrors.length > 0 && (
              <>
                {filesWithErrors.map((filename: string, index: number) => {
                  const reason = uploadErrors[filename]

                  if (!reason) return null

                  return (
                    <Typography
                      className={classes.helperText}
                      key={index}
                      variant="error"
                    >
                      {reason}
                    </Typography>
                  )
                })}
              </>
            )}
          </Spacing>
        )}

        {/* Indicates the file/status/progress of each file being uploaded */}
        {workingFiles.map((file, index) => {
          return (
            <FileUpload
              file={file}
              key={file.tempId ?? index}
              labels={labels}
              onProgressFinished={(progress, error) =>
                onProgressFinished(file, progress, error)
              }
              showLoadingBar={showLoadingBar || true}
              uploadFileHandler={uploadFileHandler}
            />
          )
        })}

        {uploadedFiles && (
          <FilesTable
            {...filesTableProps}
            files={uploadedFiles}
            onDeleteFile={deleteFileHandler}
          />
        )}
      </Spacing>
    </>
  )
}
