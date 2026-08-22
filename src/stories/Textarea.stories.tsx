import type { Meta, StoryObj } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { useState } from 'react'

import type { TextareaProps } from '..'
import {
  Icon,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent,
  Textarea
} from '..'

import { Container } from './components'

const meta: Meta<TextareaProps> = {
  title: 'Elements/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered'
  },
  args: {
    helperText: '',
    isDisabled: false,
    isRequired: false,
    isError: false,
    id: 'test-id',
    variant: 'outlined'
  },
  argTypes: {
    label: {
      control: 'text',
      description:
        'Sets the label of the textarea.\n\nIf no label is provided, defaults to `placeholder`'
    },
    placeholder: { control: 'text' },
    helperText: {
      control: 'text',
      description:
        'Sets the helper text of the textarea field. This is visible under the textarea.'
    },
    startAdornment: {
      control: 'text',
      description: 'Sets the content at the left of the textarea.'
    },
    endAdornment: {
      control: 'text',
      description: 'Sets the content at the right of the textarea.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the textarea.'
    },
    isRequired: {
      control: 'boolean',
      description: 'Treats the textarea as required.'
    },
    isError: {
      control: 'boolean',
      description: 'Turns on the error state of the textarea.'
    },
    color: {
      control: 'color',
      description: 'Sets the color of the textarea.'
    },
    backgroundColor: {
      control: 'color',
      description: 'Sets the background color of the textarea.'
    },
    borderColor: {
      control: 'color',
      description: 'Sets the border color of the textarea.'
    },
    errorColor: {
      control: 'color',
      description: 'Sets the error state color of the textarea.'
    },
    borderRadius: {
      control: 'number',
      description: 'Sets the border radius of the textarea.'
    },
    variant: {
      control: 'radio',
      options: ['filled', 'outlined'],
      description:
        'Sets the variant of the textarea.\n\nDefaults to `outlined`.'
    },
    onChange: {
      control: false,
      description: 'The onChange event handler for the textarea.'
    },
    value: {
      control: 'text',
      description: 'The value of the textarea.'
    }
  },
  render: Object.assign(
    ({ value: defaultValue, ...args }: TextareaProps) => {
      const [value, setValue] = useState(defaultValue || '')

      const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
      }

      return <Textarea {...args} onChange={handleChange} value={value} />
    },
    {
      displayName: 'Textarea'
    }
  )
}

export default meta

type Story = StoryObj<TextareaProps>

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

export const Accessibility = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemAdornment>
            <Icon name="check_circle" />
          </ListItemAdornment>
          <ListItemContent>
            {`Avoid using the Textarea without an 'id', to register the label for accessibility.`}
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
