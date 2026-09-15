import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { ModalProps } from '..'
import {
  Modal,
  Button,
  Typography,
  ModalActions,
  ModalHeader,
  ModalContent
} from '..'

import { CustomTokensWrapper } from './components'

function ModalBody() {
  return (
    <>
      <ModalHeader>
        <Typography as="h3">Modal header</Typography>
      </ModalHeader>
      <ModalContent>
        <Typography>This is a test modal description</Typography>
      </ModalContent>
    </>
  )
}

const style = {
  backgroundColor: 'var(--concorde-surface-background)',
  borderRadius: 'var(--concorde-border-radius)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
}

const meta: Meta<typeof Modal> = {
  title: 'Elements/Modal/Modal',
  component: Modal,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    showCloseButton: {
      control: 'boolean',
      description: 'Shows the close button in the top right corner of the modal'
    }
  },
  render: Object.assign(
    (args: ModalProps) => {
      const [open, setOpen] = useState(false)
      const handleOpen = () => setOpen(true)
      const handleClose = () => setOpen(false)

      return (
        <>
          <Button label="Open Modal" onClick={handleOpen} variant="primary" />
          <Modal {...args} onClose={handleClose} open={open} />
        </>
      )
    },
    {
      displayName: 'Modal'
    }
  )
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    children: (
      <div style={style}>
        <ModalBody />
      </div>
    )
  }
}

export const ShowClose: Story = {
  args: {
    ...Default.args,
    showCloseButton: true
  }
}

export const Actions: Story = {
  args: {
    children: (
      <div style={style}>
        <ModalBody />
        <ModalActions>
          <Button label="Cancel" variant="ghost" />
          <Button label="Save" variant="primary" />
        </ModalActions>
      </div>
    ),
    showCloseButton: true
  }
}

const CUSTOM_TOKENS = {
  '--concorde-modal-spacing': 'string'
} as const

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
