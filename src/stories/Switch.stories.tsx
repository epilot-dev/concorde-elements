import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { SwitchCSSProperties, SwitchProps } from '..'
import {
  Switch,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent,
  Icon,
  Typography
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

/*
 * Regression cases for the journey binary block: its label is authored in a
 * rich-text editor, so it can be a heading or a quote rather than plain text.
 * Those render as block-level elements inside the Switch label and used to
 * push the required asterisk onto its own line.
 */
export const RequiredWithHeadingLabel: Story = {
  args: {
    isRequired: true,
    label: <Typography as="h4">Binary Input fdfsdff</Typography>
  }
}

export const RequiredWithLongHeadingLabel: Story = {
  args: {
    isRequired: true,
    label: (
      <Typography as="h4">
        Binary Input fdfsdff. fsdfs sd sdf sf sdfsdfsdf and some more words so
        that this label has to wrap
      </Typography>
    )
  }
}

export const RequiredWithQuoteLabel: Story = {
  args: {
    isRequired: true,
    label: <blockquote>Quoted label text</blockquote>
  }
}

/*
 * "Heading 4" in the builder's rich-text dropdown actually renders a `<p>`
 * (Typography defaults `as` to 'p'), not a heading element — the least
 * obvious of the mapped block types, and the one most likely to be missed by
 * a selector that only targets `h1`-`h6`.
 */
export const RequiredWithCaptionLabel: Story = {
  args: {
    isRequired: true,
    label: <Typography variant="secondary">Caption label text</Typography>
  }
}

/*
 * Not required: a genuinely multi-block label (heading line + normal line)
 * must stay stacked on two lines. This is the case Finding 1 protects — the
 * old unconditional-child rule collapsed this onto one line even though
 * there is no asterisk to keep inline with anything.
 */
export const MultiBlockLabelNotRequired: Story = {
  args: {
    isRequired: false,
    label: (
      <>
        <Typography as="h4">Heading line</Typography>
        <span>Normal line</span>
      </>
    )
  }
}

/*
 * Same multi-block label, but required: only the block the asterisk
 * directly follows (the last one, "Normal line") should inline with the
 * asterisk. "Heading line" above it must remain on its own line.
 */
export const RequiredWithMultiBlockLabel: Story = {
  args: {
    isRequired: true,
    label: (
      <>
        <Typography as="h4">Heading line</Typography>
        <span>Normal line</span>
      </>
    )
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
