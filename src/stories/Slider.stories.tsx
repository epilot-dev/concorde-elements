import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { SliderCSSProperties, SliderProps } from '..'
import { NumberInput, Slider } from '..'

import { Container, CustomTokensWrapper } from './components'

const meta: Meta<SliderProps> = {
  title: 'Elements/Slider',
  component: Slider,
  parameters: {
    layout: 'centered'
  },
  args: {
    id: 'test-id',
    'aria-label': 'Test Slider',
    min: 0,
    max: 100,
    step: 1,
    value: 40,
    showScale: true,
    isDisabled: false,
    isError: false,
    readOnly: false
  },
  argTypes: {
    value: { control: 'number', description: 'The current value.' },
    min: { control: 'number', description: 'The lowest selectable value.' },
    max: { control: 'number', description: 'The greatest selectable value.' },
    step: {
      control: 'number',
      description: 'The increment the thumb moves in.'
    },
    showScale: {
      control: 'boolean',
      description: 'Shows the formatted `min` and `max` under the rail.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Turns on the disabled state of the slider.'
    },
    isError: {
      control: 'boolean',
      description: 'Turns on the error state of the slider.'
    },
    readOnly: {
      control: 'boolean',
      description: 'Renders the slider read-only.'
    },
    formatValue: { control: false },
    children: { control: false }
  }
}

export default meta

type Story = StoryObj<SliderProps>

const ControlledSlider = (args: SliderProps) => {
  const [value, setValue] = useState(args.value)

  return (
    <Container>
      <div style={{ width: 400 }}>
        <Slider {...args} onChange={setValue} value={value} />
      </div>
    </Container>
  )
}

export const Default: Story = {
  render: Object.assign((args: SliderProps) => <ControlledSlider {...args} />, {
    displayName: 'Default'
  })
}

export const Currency: Story = {
  args: {
    min: 0,
    max: 250,
    step: 0.01,
    value: 99.5,
    formatValue: (value) =>
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
      }).format(value)
  },
  render: Object.assign((args: SliderProps) => <ControlledSlider {...args} />, {
    displayName: 'Currency'
  })
}

export const WithInput: Story = {
  args: {
    min: 500,
    max: 10000,
    step: 250,
    value: 3500,
    formatValue: (value) => `${value} kWh`
  },
  render: Object.assign(
    (args: SliderProps) => {
      const [value, setValue] = useState(args.value)

      return (
        <Container>
          <div style={{ width: 400, display: 'grid', gap: 12 }}>
            <NumberInput
              floatingLabel="kWh"
              id="consumption"
              label="Annual consumption"
              onChange={(next) => setValue(Number(next))}
              value={value}
            />
            <Slider {...args} onChange={setValue} value={value} />
          </div>
        </Container>
      )
    },
    { displayName: 'WithInput' }
  )
}

export const CustomTokens: Story = {
  render: Object.assign(
    (args: SliderProps) => {
      const customTokens: Record<keyof SliderCSSProperties, string> = {
        '--concorde-slider-rail-color': '#e0e7ff',
        '--concorde-slider-track-color': '#4f46e5',
        '--concorde-slider-thumb-color': '#312e81',
        '--concorde-slider-rail-height': '12px',
        '--concorde-slider-thumb-size': '28px'
      }

      return (
        <CustomTokensWrapper customTokens={customTokens}>
          <ControlledSlider {...args} />
        </CustomTokensWrapper>
      )
    },
    { displayName: 'CustomTokens' }
  )
}
