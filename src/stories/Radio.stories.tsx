import type { Meta, StoryObj } from '@storybook/react'

import type { RadioCSSProperties, RadioProps } from '..'
import { RadioBase } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<RadioProps> = {
  title: 'Elements/Radio',
  component: RadioBase,
  parameters: {
    layout: 'centered'
  },
  args: {
    isDisabled: false,
    isRequired: false,
    isError: false,
    checked: false,
    labelPlacement: 'end'
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Sets the label of the radio input field.'
    },
    labelPlacement: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
      description: 'Sets the label placement of the radio input field.'
    },
    size: {
      control: 'text',
      description: 'Size of the radio icon.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the radio input field.'
    },
    isRequired: {
      control: 'boolean',
      description: 'Treats the radio input field as required.'
    },
    isError: {
      control: 'boolean',
      description: 'Turns on the error state of the radio.'
    },
    color: {
      control: 'color',
      description: 'Sets the color of the radio label.'
    },
    errorColor: {
      control: 'color',
      description: 'Sets the error state color of the radio input field.'
    },
    uncheckedColor: {
      control: 'color',
      description: 'Sets the unchecked state color of the radio icon.'
    }
  }
}

export default meta

type Story = StoryObj<RadioProps>

export const Default: Story = {
  args: {
    label: 'Default'
  }
}

export const Checked: Story = {
  args: {
    label: 'Default',
    checked: true
  }
}

export const Required: Story = {
  args: {
    ...Default.args,
    isRequired: true
  }
}

export const StartPosition: Story = {
  args: {
    ...Default.args,
    labelPlacement: 'start'
  }
}

export const TopPosition: Story = {
  args: {
    ...Default.args,
    labelPlacement: 'top'
  }
}

export const BottomPosition: Story = {
  args: {
    ...Default.args,
    labelPlacement: 'bottom'
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
    isRequired: true
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true
  }
}

const CUSTOM_TOKENS: RadioCSSProperties = {
  '--concorde-radio-error-color': 'string',
  '--concorde-radio-unchecked-color': 'string',
  '--concorde-radio-label-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
