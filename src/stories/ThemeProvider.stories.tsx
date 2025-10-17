import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
  Button,
  DefaultConcordeTheme,
  ThemeProvider,
  Typography,
  useTheme
} from '..'

function ThemedButton() {
  const theme = useTheme()

  return (
    <Button
      backgroundColor={theme.palette.primary}
      color={theme.palette.background.paper}
      label="Test button"
      style={{
        fontSize: theme.typography.fontSize,
        borderRadius: theme.shape.borderRadius
      }}
    />
  )
}

function ThemedTypography() {
  const theme = useTheme()

  return <Typography color={theme.palette.primary?.[90]}>Example 3</Typography>
}

const meta: Meta<typeof ThemeProvider> = {
  title: 'Theme/Theme Provider',
  component: ThemeProvider,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: {
      control: false
    }
  }
}

export default meta

type Story = StoryObj<typeof ThemeProvider>

export const ExampleOne: Story = {
  args: {
    children: <ThemedButton />,
    theme: DefaultConcordeTheme
  }
}

export const ExampleTwo: Story = {
  args: {
    children: <ThemedButton />,
    theme: {
      ...DefaultConcordeTheme,
      typography: {
        ...DefaultConcordeTheme.typography,
        fontSize: 24
      },
      shape: {
        ...DefaultConcordeTheme.shape,
        borderRadius: 32
      }
    }
  }
}

export const ExampleThree: Story = {
  args: {
    children: <ThemedTypography />,
    theme: {
      ...DefaultConcordeTheme,
      palette: {
        ...DefaultConcordeTheme.palette,
        background: {
          ...DefaultConcordeTheme.palette.background,
          paper: 'red'
        }
      }
    }
  }
}
