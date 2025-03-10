import classNames from 'classnames'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import { Icon, Typography, Button, Spacing } from '..'

import type { UploadZoneProps, UploadZoneCSSProperties } from './types'
import classes from './UploadZone.module.scss'
import { getFilesFromEvent } from './utils'

export function UploadZone(props: UploadZoneProps) {
  const {
    uploadIcon = <Icon name="upload" size="24px" />,
    uploadMessage = 'Drag your files here or Browse files',
    uploadButtonText,
    customDropZone,
    acceptedFilesMIME,
    isDisabled = false,
    dropAcceptedColor,
    dropRejectedColor,
    onDrop,
    onDropAccepted,
    onDropRejected,
    disableClickEvent = false,
    containerProps,
    minSize,
    maxSize,
    maxQuantity = 1,
    isError = false,
    id
  } = props

  const { t } = useTranslation()

  const customStyle: UploadZoneCSSProperties = {
    ...containerProps?.style,
    '--concorde-dropzone-accepted-color': dropAcceptedColor,
    '--concorde-dropzone-rejected-color': dropRejectedColor
  }

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isFocused,
    isDragActive
  } = useDropzone({
    // limit the file sizes
    minSize,
    maxSize,

    // pass what files to accept
    accept: acceptedFilesMIME,

    // should allow multiple files upload (0 means unlimited)
    multiple: maxQuantity !== 1,

    // how many files can be uploaded
    maxFiles: maxQuantity,

    // is it disabled
    disabled: isDisabled,

    // disable click
    noClick: disableClickEvent,

    // callback when file is accepted
    onDropAccepted,

    // callback when file is rejected
    onDropRejected,

    // callback when files are dropped
    onDrop,

    // custom getter fn to retrieve files from the event
    getFilesFromEvent
  })

  if (customDropZone) {
    return customDropZone
  }

  return (
    <div
      {...containerProps}
      {...getRootProps({ id })}
      className={classNames(
        'Concorde-UploadZone',
        classes.root,
        isDragAccept && classes.accepted,
        isDragReject && classes.rejected,
        isDragActive && classes.dragActive,
        isError && classes.error,
        isFocused && !isDisabled && classes.focused,
        isDisabled && classes.disabled,
        containerProps?.className
      )}
      style={customStyle}
    >
      <input {...getInputProps()} />
      <Spacing
        alignItems="center"
        className={classes.uploadMessage}
        scale={2}
        variant="stack"
      >
        <Typography className={classes.message}>{uploadMessage}</Typography>
        <Button
          className={classes.uploadButton}
          gap={8}
          isDisabled={isDisabled}
          label={uploadButtonText || t('upload.select_file', 'Select file')}
          leftIcon={uploadIcon}
        />
      </Spacing>
    </div>
  )
}
