import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import type { UploadPanelProps } from '../types'
import { UploadPanel } from '../UploadPanel'

describe('UploadPanel', () => {
  describe('accessibility > axe static tests', () => {
    const panelProps: UploadPanelProps = {
      labels: {
        Progress: 'Uploading...',
        Successful: 'Complete',
        Failed: 'Failed',
        Cancelled: 'Cancelled'
      },
      filesTableProps: {
        labels: {
          fileName: 'file_name'
        }
      },
      uploadZoneProps: {
        uploadMessage: 'Drag your files here or Browse files',
        maxQuantity: 1,
        minSize: 1 // empty files are not allowed
      },

      showLoadingBar: true,
      uploadedFiles: [],
      error: undefined,
      limitReachedText: 'File Upload limit reached',
      fileOfTypeText: 'File of type not supported',
      fileNotSupportedText: 'File not supported',
      emptyFilesNotAllowedText: 'File is empty or too small',
      networkErrorText: 'Failed to upload due to network issues',
      tooManyFilesText: 'Too many files',
      id: 'stepBlockId',
      uploadFileHandler: () => Promise.resolve(),
      deleteFileHandler: () => Promise.resolve()
    }

    const concordePanelProps: UploadPanelProps = {
      ...panelProps,
      uploadZoneProps: {
        uploadMessage: 'Drag your files here or Browse files',
        maxQuantity: 1,
        minSize: 1 // empty files are not allowed
      }
    }

    it('default state', async () => {
      const { container } = render(<UploadPanel {...concordePanelProps} />)

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
