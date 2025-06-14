import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Typography, Spacing, IconButton, Divider, Reveal } from '../..'

import classes from './FileComponents.module.scss'
import type { FilesTableProps } from './types'
import { formatFileSize } from './utils'

export function FilesTable({ labels, files, onDeleteFile }: FilesTableProps) {
  const { t } = useTranslation()

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
