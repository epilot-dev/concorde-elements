import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
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

      const uploadButton = screen.getByRole('button', { name: /datei zum hochladen auswählen/i })

      await user.tab()
      expect(uploadButton).toHaveFocus()
    })
  })

  describe('required state', () => {
    it('describes the select file button as required', () => {
      render(<UploadZone acceptedFilesMIME="image/*" id="test-upload" isRequired />)

      expect(
        screen.getByRole('button', { name: /datei zum hochladen auswählen/i })
      ).toHaveAccessibleDescription('Pflichtfeld')
    })

    it('shows the asterisk without adding it to the dropzone name', () => {
      render(
        <UploadZone
          acceptedFilesMIME="image/*"
          blockId="site-plan"
          containerProps={{ 'aria-labelledby': 'site-plan-label' }}
          id="test-upload"
          isRequired
          uploadMessage="Lageplan hochladen"
        />
      )

      expect(screen.getByText('Lageplan hochladen')).toHaveTextContent(
        'Lageplan hochladen *'
      )
      expect(screen.getByRole('region')).toHaveAccessibleName(
        'Lageplan hochladen'
      )
    })

    it('keeps the error message in the description', () => {
      render(
        <>
          <UploadZone acceptedFilesMIME="image/*" id="test-upload" isError isRequired />
          <p id="test-upload-errorMessage">Upload failed</p>
        </>
      )

      expect(
        screen.getByRole('button', { name: /datei zum hochladen auswählen/i })
      ).toHaveAccessibleDescription('Upload failed Pflichtfeld')
    })
  })

  describe('accepted file types', () => {
    const csvContent = 'name;street\nLieferstelle 1;Hauptstr. 1'

    const uploadFile = async (acceptedFilesMIME: string, file: File) => {
      const user = userEvent.setup({ applyAccept: false })
      const onDropAccepted = vi.fn()
      const onDropRejected = vi.fn()

      const { container } = render(
        <UploadZone
          acceptedFilesMIME={acceptedFilesMIME}
          id="test-upload"
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        />
      )

      await user.upload(
        container.querySelector('input[type="file"]') as HTMLInputElement,
        file
      )

      return { onDropAccepted, onDropRejected }
    }

    it('accepts a CSV file reported as text/csv', async () => {
      const { onDropAccepted, onDropRejected } = await uploadFile(
        'application/vnd.ms-excel, text/csv, .csv',
        new File([csvContent], 'lieferstellen.csv', { type: 'text/csv' })
      )

      expect(onDropAccepted).toHaveBeenCalledTimes(1)
      expect(onDropRejected).not.toHaveBeenCalled()
    })

    it('accepts a CSV file without a MIME type by its extension', async () => {
      const { onDropAccepted, onDropRejected } = await uploadFile(
        'application/vnd.ms-excel, text/csv, .csv',
        new File([csvContent], 'lieferstellen.csv', { type: '' })
      )

      expect(onDropAccepted).toHaveBeenCalledTimes(1)
      expect(onDropRejected).not.toHaveBeenCalled()
    })

    it('rejects a text/csv file when CSV is not in the accepted types', async () => {
      const { onDropAccepted, onDropRejected } = await uploadFile(
        'application/vnd.ms-excel',
        new File([csvContent], 'lieferstellen.csv', { type: 'text/csv' })
      )

      expect(onDropAccepted).not.toHaveBeenCalled()
      expect(onDropRejected).toHaveBeenCalledTimes(1)
    })
  })
})
