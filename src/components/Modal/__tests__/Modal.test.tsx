import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Modal, ModalActions, ModalContent, ModalHeader } from '../'
import { Button } from '../../Button'
import { Typography } from '../../Typography'

vi.mock('../../StyleInjectionProvider', () => ({
  useStyleInjection: () => ({
    getStyleContainer: () => document.head,
    getPortalContainer: () => undefined
  })
}))

describe('Modal', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('accessibility > axe static tests', () => {
    it('default modal', async () => {
      const { container } = render(
        <Modal onClose={() => {}} open>
          <div>
            <ModalHeader>
              <Typography as="h3">Modal Title</Typography>
            </ModalHeader>
            <ModalContent>
              <Typography>Modal content goes here</Typography>
            </ModalContent>
          </div>
        </Modal>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with close button', async () => {
      const { container } = render(
        <Modal onClose={() => {}} open showCloseButton>
          <div>
            <ModalHeader>
              <Typography as="h3">Modal Title</Typography>
            </ModalHeader>
            <ModalContent>
              <Typography>Modal content goes here</Typography>
            </ModalContent>
          </div>
        </Modal>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with actions', async () => {
      const { container } = render(
        <Modal onClose={() => {}} open>
          <div>
            <ModalHeader>
              <Typography as="h3">Modal Title</Typography>
            </ModalHeader>
            <ModalContent>
              <Typography>Modal content goes here</Typography>
            </ModalContent>
            <ModalActions>
              <Button label="Cancel" variant="ghost" />
              <Button label="Save" variant="primary" />
            </ModalActions>
          </div>
        </Modal>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with aria-labelledby', async () => {
      const { container } = render(
        <Modal aria-labelledby="modal-title" onClose={() => {}} open>
          <div>
            <ModalHeader>
              <Typography as="h3" id="modal-title">
                Modal Title
              </Typography>
            </ModalHeader>
            <ModalContent>
              <Typography>Modal content goes here</Typography>
            </ModalContent>
          </div>
        </Modal>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with aria-describedby', async () => {
      const { container } = render(
        <Modal aria-describedby="modal-description" onClose={() => {}} open>
          <div>
            <ModalHeader>
              <Typography as="h3">Modal Title</Typography>
            </ModalHeader>
            <ModalContent>
              <Typography id="modal-description">
                Modal content goes here
              </Typography>
            </ModalContent>
          </div>
        </Modal>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom styles', async () => {
      const { container } = render(
        <Modal
          onClose={() => {}}
          open
          style={
            {
              '--concorde-modal-spacing': '24px'
            } as React.CSSProperties
          }
        >
          <div>
            <ModalHeader>
              <Typography as="h3">Modal Title</Typography>
            </ModalHeader>
            <ModalContent>
              <Typography>Modal content goes here</Typography>
            </ModalContent>
          </div>
        </Modal>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with role dialog', async () => {
      const { container } = render(
        <Modal onClose={() => {}} open role="dialog">
          <div>
            <ModalHeader>
              <Typography as="h3">Modal Title</Typography>
            </ModalHeader>
            <ModalContent>
              <Typography>Modal content goes here</Typography>
            </ModalContent>
          </div>
        </Modal>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with role alertdialog', async () => {
      const { container } = render(
        <Modal onClose={() => {}} open role="alertdialog">
          <div>
            <ModalHeader>
              <Typography as="h3">Warning</Typography>
            </ModalHeader>
            <ModalContent>
              <Typography>
                Are you sure you want to delete this item?
              </Typography>
            </ModalContent>
            <ModalActions>
              <Button label="Cancel" variant="ghost" />
              <Button label="Delete" variant="primary-danger" />
            </ModalActions>
          </div>
        </Modal>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })
  })

  describe('focus management', () => {
    it('returns focus to the element that opened it when closed', async () => {
      const user = userEvent.setup()

      const Harness = () => {
        const [open, setOpen] = useState(false)

        return (
          <>
            <Button label="Open details" onClick={() => setOpen(true)} />
            <Modal onClose={() => setOpen(false)} open={open} showCloseButton>
              <ModalContent>
                <Typography>Modal content</Typography>
              </ModalContent>
            </Modal>
          </>
        )
      }

      render(<Harness />)

      const trigger = screen.getByRole('button', { name: 'Open details' })

      trigger.focus()
      expect(trigger).toHaveFocus()

      // Open the modal from the trigger, then close it via the close button.
      await user.click(trigger)
      await user.click(screen.getByRole('button', { name: /close modal/i }))

      // Focus should return to the trigger, not fall back to the document body.
      await waitFor(() => expect(trigger).toHaveFocus())
    })

    it('returns focus to the trigger when the modal is mounted only while open', async () => {
      const user = userEvent.setup()

      // Mirrors modals (e.g. Product Details) that are rendered only while
      // open, so the Modal mounts with `open` already true.
      const Harness = () => {
        const [open, setOpen] = useState(false)

        return (
          <>
            <Button label="Open details" onClick={() => setOpen(true)} />
            {open && (
              <Modal onClose={() => setOpen(false)} open showCloseButton>
                <ModalContent>
                  <Typography>Modal content</Typography>
                </ModalContent>
              </Modal>
            )}
          </>
        )
      }

      render(<Harness />)

      const trigger = screen.getByRole('button', { name: 'Open details' })

      trigger.focus()
      expect(trigger).toHaveFocus()

      await user.click(trigger)
      await user.click(screen.getByRole('button', { name: /close modal/i }))

      await waitFor(() => expect(trigger).toHaveFocus())
    })
  })
})
