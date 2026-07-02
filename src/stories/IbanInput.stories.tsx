import type { Meta, StoryObj } from '@storybook/react'

import type { IbanInputProps } from '..'
import {
  Icon,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent,
  IbanInput
} from '..'

import { Container } from './components'

const meta: Meta<IbanInputProps> = {
  title: 'Elements/IbanInput',
  component: IbanInput,
  parameters: {
    layout: 'centered'
  },
  args: {
    ibanHelper: '',
    isDisabled: false,
    isRequired: false,
    isError: false,
    id: 'test-id',
    variant: 'outlined'
  },
  argTypes: {
    ibanLabel: {
      control: 'text',
      description:
        'Sets the label of the input element.\n\nIf no label is provided, defaults to `placeholder`'
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
    variant: {
      control: 'radio',
      options: ['filled', 'outlined'],
      description:
        'Sets the variant of the input element.\n\nDefaults to `outlined`.'
    },
    onChange: {
      control: false,
      description: 'The onChange event handler for the iban input.'
    },
    iban: {
      control: 'text',
      description: 'The value of the input element.'
    }
  }
}

export default meta

type Story = StoryObj<IbanInputProps>

export const Default: Story = {
  args: {
    ibanLabel: 'IBAN'
  }
}

export const Filled: Story = {
  args: {
    ...Default.args,
    variant: 'filled'
  }
}

export const ValuedOutlined: Story = {
  args: {
    ...Default.args,
    iban: 'DE89370400440532013000'
  }
}

export const ValuedFilled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
    iban: 'DE89370400440532013000'
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
    ...Default.args
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
    isRequired: true,
    ibanHelper: 'Enter your IBAN'
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
    isRequired: true,
    isError: true
  }
}

export const Accessibility = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemAdornment>
            <Icon name="check_circle" />
          </ListItemAdornment>
          <ListItemContent>
            {`Avoid using the IbanInput without an 'id', to register the label for accessibility.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}

export const CustomTokens = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemContent>
            {`Refer to Input & Spacing Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}
