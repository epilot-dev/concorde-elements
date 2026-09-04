/* eslint-disable react/display-name */
import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

import { Button, Typography } from '..'
import './Popover.stories.scss'
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from '../components/Popover/Popover'

type PopoverStoryProps = React.ComponentProps<typeof Popover> & {}

const meta: Meta<PopoverStoryProps> = {
  title: 'Elements/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A Popover component built on top of Radix UI Popover primitive. Provides a floating panel that displays content related to a trigger element.'
      }
    }
  },
  argTypes: {
    children: {
      control: false
    }
  }
}

export default meta

type Story = StoryObj<PopoverStoryProps>

export const Default: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Show Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="popover-story__content">
          <Typography as="h4">Simple Popover</Typography>
          <Typography as="p">This is a basic popover example.</Typography>
        </PopoverContent>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'The most basic implementation of a Popover with a trigger button and content.'
      }
    }
  }
}

export const WithDismissButton: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Show Dismissible Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="popover-story__content">
          <Typography as="h4">Closeable Popover</Typography>
          <Typography as="p">Click the button to close.</Typography>

          <PopoverClose asChild>
            <Button aria-label="Close" variant="primary">
              Close
            </Button>
          </PopoverClose>
        </PopoverContent>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'A Popover that includes a dedicated close button for explicit dismissal.'
      }
    }
  }
}

export const DismissOnContentClick: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button>Show Interactive Popover</Button>
        </PopoverTrigger>
        <PopoverContent
          className="popover-story__content"
          onClick={() => setOpen(false)}
        >
          <Typography as="h4">Click Anywhere to Close</Typography>
          <Typography as="p">
            Click anywhere inside this popover (including this text) to close
            it.
          </Typography>
        </PopoverContent>
      </Popover>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'A Popover that closes when clicking anywhere within its content area. Useful for menu-like interactions.'
      },
      source: {
        code: `
const [open, setOpen] = React.useState(false)

return (
  <Popover onOpenChange={setOpen} open={open}>
    <PopoverTrigger asChild>
      <Button>Show Interactive Popover</Button>
    </PopoverTrigger>
    <PopoverContent
      className="popover-story__content"
      onClick={() => setOpen(false)}
    >
      <Typography as="h4">Click Anywhere to Close</Typography>
      <Typography as="p">
        Click anywhere inside this popover (including this text) to close
        it.
      </Typography>
    </PopoverContent>
  </Popover>`
      }
    }
  }
}

export const PreventOutsideInteraction: Story = {
  args: {
    children: (
      <Popover modal>
        <PopoverTrigger asChild>
          <Button>Show Non-Dismissible Popover</Button>
        </PopoverTrigger>
        <PopoverContent
          className="popover-story__content"
          onInteractOutside={(e) => {
            e.preventDefault()
          }}
        >
          <Typography as="h4">Non-Dismissible Popover</Typography>
          <Typography as="p">
            This popover wont close when clicking outside. You need to click the
            close button to dismiss it.
          </Typography>

          <PopoverClose asChild>
            <Button aria-label="Close" variant="primary">
              Close
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'A Popover that prevents interaction with outside elements and requires explicit dismissal via the close button.'
      }
    }
  }
}

export const PlacementExamples: Story = {
  args: {
    children: (
      <div className="popover-story__position-container">
        {['top', 'right', 'bottom', 'left'].map((side) => (
          <Popover key={side}>
            <PopoverTrigger asChild>
              <Button>Show {side} Popover</Button>
            </PopoverTrigger>
            <PopoverContent
              align="center"
              className="popover-story__content"
              side={side as 'top' | 'right' | 'bottom' | 'left'}
              sideOffset={5}
            >
              <Typography as="h4">Popover {side}</Typography>
              <Typography as="p">
                This popover is aligned to the {side}.
              </Typography>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates different placement options (top, right, bottom, left) for the Popover relative to its trigger.'
      }
    }
  }
}

export const AlignmentExamples: Story = {
  args: {
    children: (
      <div className="popover-story__position-container">
        {['start', 'center', 'end'].map((align) => (
          <Popover key={align}>
            <PopoverTrigger asChild>
              <Button>Show {align} Aligned</Button>
            </PopoverTrigger>
            <PopoverContent
              align={align as 'start' | 'center' | 'end'}
              alignOffset={0}
              className="popover-story__content"
              side="bottom"
            >
              <Typography as="h4">Alignment {align}</Typography>
              <Typography as="p">
                This popover has {align} alignment.
              </Typography>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows different alignment options (start, center, end) for the Popover relative to its trigger.'
      }
    }
  }
}
