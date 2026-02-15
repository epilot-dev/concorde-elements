import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import type { CheckboxCSSProperties, CheckboxProps } from '..'
import { Checkbox } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<CheckboxProps> = {
  title: 'Elements/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  args: {
    id: 'test-checkbox',
    isDisabled: false,
    isRequired: false,
    isError: false,
    checked: false,
    labelPlacement: 'end'
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Sets the label of the checkbox.'
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end'],
      description: 'Sets the label placement of the checkbox.'
    },
    size: {
      control: 'text',
      description: 'Size of the checkbox icon.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the checkbox.'
    },
    isRequired: {
      control: 'boolean',
      description: 'Treats the checkbox as required.'
    },
    isError: {
      control: 'boolean',
      description: 'Turns on the error state of the checkbox.'
    },
    color: {
      control: 'color',
      description: 'Sets the color of the checkbox label.'
    },
    onChange: {
      control: false,
      description:
        'Callback function that is called when the checkbox state is changed.'
    },
    errorColor: {
      control: 'color',
      description: 'Sets the error state color of the checkbox.'
    },
    uncheckedColor: {
      control: 'color',
      description: 'Sets the unchecked state color of the checkbox icon.'
    }
  },
  render: Object.assign(
    ({ checked, defaultChecked, ...args }: CheckboxProps) => {
      const [isChecked, setIsChecked] = useState(
        checked || defaultChecked || false
      )

      const onChange = (value: boolean) => {
        setIsChecked(value)
      }

      useEffect(() => {
        setIsChecked(checked || defaultChecked || false)
      }, [checked, defaultChecked])

      return <Checkbox {...args} checked={isChecked} onChange={onChange} />
    },
    {
      displayName: 'Checkbox'
    }
  )
}

export default meta

type Story = StoryObj<CheckboxProps>

export const Default: Story = {
  args: {
    label: 'Default'
  }
}

export const Checked: Story = {
  args: {
    label: 'Default',
    defaultChecked: true,
    id: 'checkbox-2'
  }
}

export const Required: Story = {
  args: {
    ...Default.args,
    isRequired: true,
    id: 'checkbox-3'
  }
}

export const StartPosition: Story = {
  args: {
    ...Default.args,
    labelPlacement: 'start',
    id: 'checkbox-4'
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
    isRequired: true,
    id: 'checkbox-5'
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
    id: 'disabled-checkbox'
  }
}

const CUSTOM_TOKENS: CheckboxCSSProperties = {
  '--concorde-checkbox-unchecked-color': 'string',
  '--concorde-checkbox-error-color': 'string',
  '--concorde-checkbox-label-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
