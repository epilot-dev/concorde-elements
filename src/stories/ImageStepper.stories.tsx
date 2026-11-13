import type { Meta, StoryObj } from '@storybook/react'

import { ImageStepper, List, ListItem, ListItemContent } from '..'
import type { ImageStepperProps } from '..'

import { Container } from './components'

const images = [
  {
    id: '1',
    src: 'https://via.placeholder.com/250x200?text=Image+1',
    alt: 'Test 1'
  },
  {
    id: '2',
    src: 'https://via.placeholder.com/250x200?text=Image+2',
    alt: 'Test 2'
  },
  {
    id: '3',
    src: 'https://via.placeholder.com/250x200?text=Image+3',
    alt: 'Test 3'
  },
  {
    id: '4',
    src: 'https://via.placeholder.com/250x200?text=Image+4',
    alt: 'Test 4'
  },
  {
    id: '5',
    src: 'https://via.placeholder.com/250x200?text=Image+5',
    alt: 'Test 5'
  }
]

const meta: Meta<ImageStepperProps> = {
  title: 'Elements/ImageStepper',
  component: ImageStepper,
  parameters: {
    layout: 'centered'
  },
  args: {
    position: 'static',
    variant: 'dots'
  },
  argTypes: {
    images: {
      controls: false,
      description: 'The list of images to be rendered'
    },
    position: {
      control: 'select',
      options: ['bottom', 'top', 'static'],
      description:
        'Set the positioning type of the stepper element.\n\nDefaults to `static`.'
    },
    variant: {
      control: 'select',
      options: ['text', 'dots', 'progress'],
      description: 'Sets the steps variant.\n\nDefaults to `dots`.'
    },
    color: {
      control: 'color',
      description:
        'Sets the color of the stepper element and the color of the stepper icon.'
    },
    backgroundColor: {
      control: 'color',
      description: 'Sets the background color of the stepper dots.'
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

type Story = StoryObj<ImageStepperProps>

export const Default: Story = {
  args: {
    images
  }
}

export const TextVariant: Story = {
  args: {
    ...Default.args,
    variant: 'text'
  }
}

export const CustomTokens = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemContent>
            {`Refer to Button & Mobile stepper Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}
