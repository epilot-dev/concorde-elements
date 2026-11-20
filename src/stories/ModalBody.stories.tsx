import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import type { ReactNode } from 'react'

import { ModalActions, Typography, Button, ModalHeader, ModalContent } from '..'

const style = {
  backgroundColor: 'var(--concorde-surface-background)',
  borderRadius: 'var(--concorde-border-radius)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  padding: 'calc(var(--concorde-spacing) * 3)',
  width: '100%'
}

function ModalBody({ children }: { children: ReactNode }) {
  return <div style={style}>{children}</div>
}

const meta: Meta<typeof ModalBody> = {
  title: 'Elements/Modal/ModalBody',
  component: ModalBody,
  parameters: {
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof ModalBody>
type ModalHeaderStory = StoryObj<typeof ModalHeader>
type ModalContentStory = StoryObj<typeof ModalContent>
type ModalActionsStory = StoryObj<typeof ModalActions>

export const Default: Story = {
  args: {
    children: (
      <>
        <ModalHeader>
          <Typography as="h3">Modal header</Typography>
        </ModalHeader>
        <ModalContent>
          <Typography>This is a test modal description</Typography>
        </ModalContent>
        <ModalActions>
          <Button label="Cancel" variant="ghost" />
          <Button label="Save" variant="primary" />
        </ModalActions>
      </>
    )
  }
}

export const Header: ModalHeaderStory = {
  args: {
    children: (
      <ModalHeader>
        <Typography as="h3">Modal header</Typography>
      </ModalHeader>
    )
  }
}

export const Content: ModalContentStory = {
  args: {
    children: (
      <ModalContent>
        <Typography>This is a test modal description</Typography>
      </ModalContent>
    )
  }
}

export const Actions: ModalActionsStory = {
  args: {
    children: (
      <ModalActions>
        <Button label="Cancel" variant="ghost" />
        <Button label="Save" variant="primary" />
      </ModalActions>
    )
  }
}
