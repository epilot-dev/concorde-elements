import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { SwitchCSSProperties, SwitchProps } from '..'
import {
  Switch,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent,
  Icon
} from '../'

import { Container, CustomTokensWrapper } from './components'

const meta: Meta<SwitchProps> = {
  title: 'Elements/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  args: {
    id: 'test-id',
    isDisabled: false,
    isRequired: false,
    isError: false,
    labelPlacement: 'end',
    'aria-label': 'Test Switch'
  },
  argTypes: {
    children: { control: false },
    label: {
      control: 'text',
      description: 'Sets the label of the switch.'
    },
    labelPlacement: {
      control: 'radio',
      options: ['start', 'end'],
      description:
        'Sets the label placement of the switch.\n\nDefaults to `end`'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Turns on the disabled state of the switch.'
    },
    isRequired: {
      control: 'boolean',
      description: 'Turns on the required state of the switch.'
    },
    isError: {
      control: 'boolean',
      description: 'Turns on the error state of the switch.'
    },
    helperText: {
      control: 'text',
      description: 'Sets the helper text of the switch.'
    },
    onChange: {
      control: false,
      description: 'The onChange event handler for the switch.'
    },
    value: {
      control: 'text',
      description: 'The value of the switch.'
    },
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the switch.'
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state of the switch.'
    },
    name: {
      control: 'text',
      description: 'The name of the switch.'
    },
    id: {
      control: 'text',
      description: 'The id of the switch.'
    }
  },
  render: Object.assign(
    (args: SwitchProps) => {
      const [isChecked, setIsChecked] = useState(false || args?.defaultChecked)

      const onChange = (checked: boolean) => {
        setIsChecked(checked)
      }

      return <Switch {...args} checked={isChecked} onChange={onChange} />
    },
    {
      displayName: 'Input'
    }
  )
}

export default meta

type Story = StoryObj<SwitchProps>

export const Default: Story = {
  args: {
    label: 'Default'
  }
}

export const Checked: Story = {
  args: {
    ...Default.args,
    defaultChecked: true
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
    id: 'test-id-disabled'
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
    label: 'Default',
    isError: true,
    helperText: 'This is an error subtext'
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
            {`Avoid using without an 'id' to ensure the label can trigger the switch.`}
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemAdornment>
            <Icon name="check_circle" />
          </ListItemAdornment>
          <ListItemContent>
            {`Avoid using without an 'id' and 'aria-label' to ensure the Switch is accessible to screen readers.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}

const CUSTOM_TOKENS: SwitchCSSProperties = {
  '--concorde-switch-unchecked-color': 'string',
  '--concorde-switch-unchecked-background-color': 'string',
  '--concorde-switch-border-radius': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
