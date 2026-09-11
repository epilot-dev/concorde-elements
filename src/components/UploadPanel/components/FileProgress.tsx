import classNames from 'classnames'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton, LinearProgress, Reveal, Spacing, Typography } from '../..'

import classes from './FileComponents.module.scss'
import type { FileProgressProps } from './types'
import { FileUploadStatus } from './types'
import { isUploadStatus } from './utils'

export function FileProgress({
  fileName,
  progress,
  onClickCancel,
  status,
  statusComponents
}: FileProgressProps) {
  const { t } = useTranslation()
  const isStatus = useMemo(() => isUploadStatus(status), [status])
  const hasProgress =
    (isStatus.Progress || isStatus.Successful) &&
    typeof progress !== 'undefined'

  return (
    <Reveal className={classes.fullWidth} show>
      <Spacing
        alignItems="center"
        className={classNames(classes.row, classes.fullWidth)}
        justifyContent="space-between"
        scale={1}
        variant="inline"
      >
        <div className={classes.fileInfo}>
          <Typography>
            <b>{getStringByStatus(status, statusComponents)}</b> ({fileName})
          </Typography>
          {hasProgress && <Typography>{progress}% uploaded</Typography>}
        </div>
        {isStatus.Progress && onClickCancel && (
          <IconButton
            aria-label={t('upload.cancel_upload', 'Cancel upload')}
            color="var(--concorde-secondary-text)"
            name="close"
            onClick={onClickCancel}
          />
        )}
      </Spacing>
      {hasProgress && <LinearProgress value={progress} />}
    </Reveal>
  )
}

function getStringByStatus(
  status: FileProgressProps['status'],
  statusComponents: FileProgressProps['statusComponents']
) {
  switch (status) {
    case FileUploadStatus.Cancelled:
      return statusComponents?.Cancelled || 'Cancelled!'
    case FileUploadStatus.Failed:
      return statusComponents?.Failed || 'Failed!'
    case FileUploadStatus.Successful:
      return statusComponents?.Successful || 'Finished.'
    default:
      return statusComponents?.Progress || 'Uploading ...'
  }
}
