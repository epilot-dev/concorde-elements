import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { UploadZone } from '../UploadZone'

describe('UploadZone', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <UploadZone acceptedFilesMIME="image/*" id="test-upload" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('disabled state', async () => {
      const { container } = render(
        <UploadZone acceptedFilesMIME="image/*" id="test-upload" isDisabled />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('error state', async () => {
      const { container } = render(
        <UploadZone acceptedFilesMIME="image/*" id="test-upload" isError />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom upload icon', async () => {
      const { container } = render(
        <UploadZone
          acceptedFilesMIME="image/*"
          id="test-upload"
          uploadIcon={<span>📁</span>}
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom upload message', async () => {
      const { container } = render(
        <UploadZone
          acceptedFilesMIME="image/*"
          id="test-upload"
          uploadMessage="Drop files here"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom upload button text', async () => {
      const { container } = render(
        <UploadZone
          acceptedFilesMIME="image/*"
          id="test-upload"
          uploadButtonText="Choose files"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with file size limits', async () => {
      const { container } = render(
        <UploadZone
          acceptedFilesMIME="image/*"
          id="test-upload"
          maxSize={1024 * 1024}
          minSize={1024}
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with multiple files allowed', async () => {
      const { container } = render(
        <UploadZone
          acceptedFilesMIME="image/*"
          id="test-upload"
          maxQuantity={0}
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom drop colors', async () => {
      const { container } = render(
        <UploadZone
          acceptedFilesMIME="image/*"
          dropAcceptedColor="#e6ffe6"
          dropRejectedColor="#ffe6e6"
          id="test-upload"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('keyboard navigation', async () => {
      const user = userEvent.setup()

      render(<UploadZone acceptedFilesMIME="image/*" id="test-upload" />)

      const uploadButton = screen.getByRole('button', { name: /select file/i })

      await user.tab()
      expect(uploadButton).toHaveFocus()
    })
  })
})
