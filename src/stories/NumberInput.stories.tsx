import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { NumberInputProps } from '..'
import {
  Icon,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent,
  NumberInput
} from '..'

import { Container } from './components'

const meta: Meta<NumberInputProps> = {
  title: 'Elements/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered'
  },
  args: {
    helperText: '',
    isDisabled: false,
    isRequired: false,
    isError: false,
    id: 'test-id',
    variant: 'outlined',
    readOnly: false,
    isFormattingEnabled: true
  },
  argTypes: {
    label: {
      control: 'text',
      description:
        'Sets the label of the input element.\n\nIf no label is provided, defaults to `placeholder`'
    },
    placeholder: { control: 'text' },
    helperText: {
      control: 'text',
      description:
        'Sets the helper text of the input field. This is visible under the input element.'
    },
    startAdornment: {
      control: 'text',
      description: 'Sets the content at the left of the input element.'
    },
    endAdornment: {
      control: 'text',
      description: 'Sets the content at the right of the input element.'
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
    },
    borderRadius: {
      control: 'number',
      description: 'Sets the border radius of the input element.'
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outlined'],
      description:
        'Sets the variant of the input element.\n\nDefaults to `outlined`.'
    },
    onChange: {
      control: false,
      description: 'The onChange event handler for the input element.'
    },
    value: {
      control: 'text',
      description: 'The value of the input element.'
    },
    floatingLabel: {
      control: 'text',
      description: 'The floating label of the input element.'
    },
    isFormattingEnabled: {
      control: 'boolean',
      description: 'Turns on the formatting of the number input.'
    }
  },
  render: Object.assign(
    ({ value: defaultValue, ...args }: NumberInputProps) => {
      const [value, setValue] = useState(defaultValue || '')

      const handleChange = (value: string) => {
        setValue(value)
      }

      return <NumberInput {...args} onChange={handleChange} value={value} />
    },
    {
      displayName: 'Input'
    }
  )
}

export default meta

type Story = StoryObj<NumberInputProps>

export const Default: Story = {
  args: {
    placeholder: 'Enter anything...',
    label: 'Default'
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
    value: 'Hello'
  }
}

export const ValuedFilled: Story = {
  args: {
    ...Default.args,
    variant: 'filled',
    value: 'Hello'
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
    isDisabled: true,
    isRequired: true,
    isError: true,
    helperText: 'This is an error subtext'
  }
}

export const LeftAdorned: Story = {
  args: {
    ...Default.args,
    startAdornment: <Icon name="info" />
  }
}

export const RightAdorned: Story = {
  args: {
    ...Default.args,
    placeholder: 'Search',
    endAdornment: <Icon name="close" />
  }
}

export const RightLeftAdorned: Story = {
  args: {
    ...Default.args,
    label: 'Control',
    placeholder: 'Search',
    endAdornment: <Icon name="close" />,
    startAdornment: <Icon name="info" />
  }
}

export const RightLeftAdornedError: Story = {
  args: {
    ...Default.args,
    label: 'Control',
    placeholder: 'Search',
    endAdornment: <Icon name="close" />,
    startAdornment: <Icon name="info" />,
    isError: true
  }
}

export const FloatingLabel: Story = {
  args: {
    ...Default.args,
    label: 'Number Input',
    placeholder: '0',
    floatingLabel: 'kVA',
    endAdornment: <Icon name="close" />,
    startAdornment: <Icon name="info" />
  }
}

export const NoThousandFormatting: Story = {
  args: {
    ...Default.args,
    label: 'Number Input',
    placeholder: '0',
    floatingLabel: 'kVA',
    isFormattingEnabled: false
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
            {`Avoid using the Input without an 'id', to register the label for accessibility.`}
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
            {`Refer to Input Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}
