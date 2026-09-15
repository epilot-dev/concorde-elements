import type { Meta, StoryObj } from '@storybook/react'

import { Icon, MobileStepper, List, ListItem, ListItemContent } from '..'
import type { MobileStepperCSSProperties, MobileStepperProps } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<MobileStepperProps> = {
  title: 'Elements/MobileStepper',
  component: MobileStepper,
  parameters: {
    layout: 'centered'
  },
  args: {
    position: 'static',
    variant: 'dots'
  },
  argTypes: {
    steps: {
      control: 'number',
      description: 'The total number of steps.'
    },
    activeStep: {
      control: 'number',
      description:
        'The active step (zero based index).\n\nDefines which step is highlighted when the variant is `dots`.'
    },
    nextButton: { control: false },
    backButton: { control: false },
    position: {
      control: 'select',
      options: ['bottom', 'top', 'static'],
      description: 'Set the positioning type.\n\nDefaults to `static`.'
    },
    variant: {
      control: 'select',
      options: ['text', 'dots', 'progress'],
      description: 'Sets the steps variant.\n\nDefaults to `dots`.'
    },
    color: {
      control: 'color',
      description: 'Sets the color of the element.'
    },
    backgroundColor: {
      control: 'color',
      description: 'Sets the background color of the element.'
    },
    stepBgColor: {
      control: 'color',
      description: 'Sets the background color of steps dots or progress bar.'
    },
    activeStepBgColor: {
      control: 'color',
      description:
        'Sets the activebackground color of steps dots or progress bar.'
    }
  }
}

export default meta

type Story = StoryObj<MobileStepperProps>

export const Default: Story = {
  args: {
    steps: 4,
    activeStep: 2
  }
}

export const TextVariant: Story = {
  args: {
    ...Default.args,
    variant: 'text'
  }
}

export const Next: Story = {
  args: {
    ...Default.args,
    nextButton: <Icon color="#005eb4" name="chevron_right" />
  }
}

export const Previous: Story = {
  args: {
    ...Default.args,
    backButton: <Icon color="#005eb4" name="chevron_left" />
  }
}

export const NextAndPrevious: Story = {
  args: {
    ...Default.args,
    nextButton: <Icon color="#005eb4" name="chevron_right" />,
    backButton: <Icon color="#005eb4" name="chevron_left" />
  }
}

const CUSTOM_TOKENS: MobileStepperCSSProperties = {
  '--concorde-mobile-stepper-color': 'string',
  '--concorde-mobile-stepper-background-color': 'string',
  '--concorde-mobile-stepper-step-background-color': 'string',
  '--concorde-mobile-stepper-active-step-background-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper customTokens={CUSTOM_TOKENS as Record<string, string>}>
      <List>
        <ListItem>
          <ListItemContent>
            {`Also refer to Button Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </CustomTokensWrapper>
  )
}
