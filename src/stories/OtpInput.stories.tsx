import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { OtpInputCSSProperties, OtpInputProps } from '..'
import { OtpInput } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<OtpInputProps> = {
  title: 'Elements/OtpInput',
  component: OtpInput,
  parameters: {
    layout: 'centered'
  },
  args: {
    length: 6,
    helperText: '',
    isDisabled: false,
    isRequired: false,
    isError: false,
    autoFocus: false
  },
  argTypes: {
    value: {
      control: 'text',
      description:
        'Sets the value of the code. Disallowed characters and characters beyond `length` are ignored.'
    },
    length: {
      control: 'number',
      description: 'Sets the number of boxes.\n\nDefaults to `6`'
    },
    validationType: {
      control: 'radio',
      options: ['numeric', 'alphanumeric'],
      description:
        'Sets the characters accepted by the boxes.\n\nDefaults to `numeric`'
    },
    label: {
      control: 'text',
      description:
        'Sets the label of the input. Also used as the accessible name of the group.'
    },
    helperText: {
      control: 'text',
      description:
        'Sets the helper text of the input. This is visible under the boxes.'
    },
    isRequired: {
      control: 'boolean',
      description: 'Treats the input as required.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables every box.'
    },
    isError: {
      control: 'boolean',
      description: 'Turns on the error state of the input.'
    },
    autoFocus: {
      control: 'boolean',
      description: 'Focuses the next empty box on mount.'
    },
    variant: {
      control: 'radio',
      options: ['outlined', 'filled', 'underlined'],
      description:
        "Sets the variant of the boxes.\n\nDefaults to the theme's input variant, or `outlined`"
    },
    getBoxAriaLabel: {
      control: false,
      description:
        'Returns the accessible name of a box, e.g. for translations.\n\nDefaults to `Digit {index + 1} of {length}`'
    },
    onChange: {
      description: 'Callback fired with the sanitized code whenever it changes.'
    },
    onComplete: {
      description: 'Callback fired with the code once every box is filled.'
    }
  },
  render: Object.assign(
    ({ value: defaultValue, onChange, ...args }: OtpInputProps) => {
      const [value, setValue] = useState(defaultValue || '')

      const handleChange = (next: string) => {
        setValue(next)
        onChange?.(next)
      }

      return (
        <div style={{ width: 'min(400px, 100vw - 32px)' }}>
          <OtpInput {...args} onChange={handleChange} value={value} />
        </div>
      )
    },
    {
      displayName: 'OtpInput'
    }
  )
}

export default meta

type Story = StoryObj<OtpInputProps>

export const Default: Story = {
  args: {
    id: 'otp-default',
    label: 'Verification code',
    helperText: 'Enter the 6-digit code we sent to your email address.'
  }
}

export const Required: Story = {
  args: {
    ...Default.args,
    id: 'otp-required',
    isRequired: true
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    id: 'otp-error',
    value: '123456',
    isError: true,
    helperText: 'The code is incorrect. Please try again.'
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    id: 'otp-disabled',
    value: '12',
    isDisabled: true
  }
}

export const Underlined: Story = {
  args: {
    ...Default.args,
    id: 'otp-underlined',
    variant: 'underlined'
  }
}

export const FourDigits: Story = {
  args: {
    ...Default.args,
    id: 'otp-four',
    length: 4,
    helperText: ''
  }
}

export const Alphanumeric: Story = {
  args: {
    ...Default.args,
    id: 'otp-alphanumeric',
    validationType: 'alphanumeric',
    helperText: ''
  }
}

const CUSTOM_TOKENS: OtpInputCSSProperties = {
  '--concorde-input-color': 'string',
  '--concorde-input-background-color': 'string',
  '--concorde-input-border-color': 'string',
  '--concorde-input-error-color': 'string',
  '--concorde-input-label-color': 'string',
  '--concorde-input-border-radius': 'string',
  '--concorde-input-height': 'string',
  '--concorde-otp-input-box-max-width': 'string',
  '--concorde-otp-input-gap': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
