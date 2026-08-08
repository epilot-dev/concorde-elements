import type { Meta, StoryObj } from '@storybook/react'

import { Icon, ToggleButton } from '..'

const meta: Meta<typeof ToggleButton> = {
  title: 'Elements/Toggle Button',
  component: ToggleButton,
  parameters: {
    layout: 'centered'
  },
  args: {
    label: 'Button'
  },
  argTypes: {
    pressed: {
      control: 'boolean',
      description:
        'Setting this value sets this button as controlled and must be used with `onPressedChanged`\n\n Controls whether button as pressed or not'
    },
    onPressedChange: {
      control: false,
      description:
        'Event handler called when the pressed state of the toggle changes.'
    },
    disabled: {
      description:
        'When true, prevents the user from interacting with the toggle group and all its items.'
    }
  }
}

export default meta

type Story = StoryObj<typeof ToggleButton>

export const Default: Story = {
  args: {}
}

export const Controlled: Story = {
  args: {
    label: 'Button',
    pressed: true
  }
}

export const Disabled: Story = {
  args: {
    label: 'Button',
    disabled: true
  }
}

export const LeftIconButton: Story = {
  args: {
    label: 'Button',
    leftIcon: <Icon name="info" />
  }
}

export const RightIconButton: Story = {
  args: {
    label: 'Button',
    rightIcon: <Icon name="close" />
  }
}

export const IconsButton: Story = {
  args: {
    label: 'Button',
    leftIcon: <Icon name="info" />,
    rightIcon: <Icon name="close" />
  }
}
