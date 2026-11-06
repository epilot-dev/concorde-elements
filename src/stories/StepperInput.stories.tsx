import type { Meta, StoryObj } from '@storybook/react'

import type { StepperInputCSSProperties, StepperInputProps } from '..'
import { StepperInput, List, ListItem, ListItemContent } from '..'
import type { TextFieldCSSProperties } from '../components/TextField/types'

import { CustomTokensWrapper } from './components'

const meta: Meta<StepperInputProps> = {
  title: 'Elements/StepperInput',
  component: StepperInput,
  parameters: {
    layout: 'centered'
  },
  args: {
    helperText: '',
    isDisabled: false,
    isRequired: false,
    isError: false,
    isFullWidth: false
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Sets the label of the input element.'
    },
    value: {
      control: 'number',
      description: 'Sets the value of the input element.'
    },
    placeholder: { control: 'text' },
    helperText: {
      control: 'text',
      description:
        'Sets the helper text of the input field. This is visible under the input element.'
    },
    startAdornment: {
      control: false,
      description:
        'Sets the content at the left of the input element.\n\nDefaults to `<IconButton name="remove" />`'
    },
    endAdornment: {
      control: false,
      description:
        'Sets the content at the right of the input element.\n\nDefaults to `<IconButton name="add" />`'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the input element.'
    },
    isRequired: {
      control: 'boolean',
      description: 'Treats the input element as required.'
    },
    isError: {
      control: 'boolean',
      description: 'Turns on the error state of the input element.'
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Sets whether the input is full width or not'
    },
    containerProps: {
      description: `Sets the props of the stepper input's container element.`
    },
    inputContainerProps: {
      description: `Sets the props of the actual input's container element.`
    },
    adornmentProps: {
      description: `Sets the props of the stepper input's adornment element.`
    },
    color: {
      control: 'color',
      description: 'Sets the color of the input element.'
    },
    backgroundColor: {
      control: 'color',
      description: 'Sets the background color of the input element.'
    },
    borderColor: {
      control: 'color',
      description: 'Sets the border color of the input element.'
    },
    errorColor: {
      control: 'color',
      description: 'Sets the error state color of the input element.'
    }
  }
}

export default meta

type Story = StoryObj<StepperInputProps>

export const Default: Story = {
  args: {
    placeholder: '0',
    label: 'Default'
  }
}

export const Required: Story = {
  args: {
    ...Default.args,
    isRequired: true
  }
}

export const HelperText: Story = {
  args: {
    ...Default.args,
    helperText: 'This is a subtext'
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
    isRequired: true,
    helperText: 'This is an error subtext'
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true
  }
}

const CUSTOM_TOKENS: StepperInputCSSProperties & TextFieldCSSProperties = {
  '--concorde-stepper-field-error-color': 'string',
  '--concorde-stepper-field-border-color': 'string',
  '--concorde-text-field-color': 'string',
  '--concorde-text-field-background-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper customTokens={CUSTOM_TOKENS as Record<string, string>}>
      <List>
        <ListItem>
          <ListItemContent>
            {`Also refer to IconButton Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </CustomTokensWrapper>
  )
}
