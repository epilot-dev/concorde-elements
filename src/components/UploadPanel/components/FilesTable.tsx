import classNames from 'classnames'
import { once } from 'radashi'
import { useTranslation } from 'react-i18next'

import { Typography, Spacing, IconButton, Divider, Reveal } from '../..'

import classes from './FileComponents.module.scss'
import type { FilesTableProps } from './types'
import { formatFileSize } from './utils'

// eslint-disable-next-line no-console
const errorOnce = once(console.error)

export function FilesTable({ labels, files, onDeleteFile }: FilesTableProps) {
  const { t } = useTranslation()

  /**
   * Temporary logging for debugging purposes
   * @see {@link https://e-pilot.atlassian.net/browse/STABLE360-8677}
   */
  if (files && Array.isArray(files) === false) {
    errorOnce(
      `Expected an array for 'files', but received: '${typeof files}'`,
      { files }
    )
  }

  // won't render if no uploaded files
  if (!files || !files?.length) return null

  return (
    <div className={classes.fullWidth}>
      <Typography as="h5">{labels.fileName || 'Uploaded files'}</Typography>

      <>
        {files?.map((file, index) => (
          <Reveal
            key={[file.s3ref?.bucket, file.s3ref?.key, file.original_name].join(
              ','
            )}
            show
          >
            <Spacing
              alignItems="center"
              className={classNames(classes.row, classes.fullWidth)}
              data-testid={`uploaded-file-row-${file.file_name}`}
              justifyContent="space-between"
              scale={0}
              variant="inline"
            >
              <div className={classes.fileInfo}>
                <Typography className={classes.title} variant="primary">
                  {file.file_name}
                </Typography>
                <Typography variant="secondary">
                  {formatFileSize(file.file_size)}
                </Typography>
              </div>
              <IconButton
                aria-label={t('upload.delete_file', 'Delete file')}
                color="var(--concorde-secondary-text)"
                name="close"
                onClick={() => void onDeleteFile?.(file)}
                size="24px"
              />
            </Spacing>
            {index < files.length - 1 && <Divider />}
          </Reveal>
        ))}
      </>
    </div>
  )
}
