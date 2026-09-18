import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { AccordionItemProps } from '..'
import { Accordion, AccordionItem } from '..'

const meta: Meta<AccordionItemProps> = {
  title: 'Elements/Accordion',
  component: AccordionItem,
  parameters: {
    layout: 'padded'
  }
}

export default meta

type Story = StoryObj<AccordionItemProps>

/**
 * Three items, the middle one expanded. The two collapsed items MUST clip their
 * body to 0px — no sliver of the inner content (e.g. "Hidden field") may show
 * between a collapsed header and the next item. This guards the padding-bleed
 * regression where overflow:hidden left a ~16px band visible.
 */
const InteractiveAccordion = () => {
  const [expanded, setExpanded] = useState<number | null>(1)

  return (
    <Accordion>
      {[0, 1, 2].map((i) => (
        <AccordionItem
          expanded={expanded === i}
          header={<span>{`Item ${i + 1} — preview line`}</span>}
          key={i}
          onToggle={() => setExpanded((cur) => (cur === i ? null : i))}
        >
          <div>Hidden field {i + 1} (must be fully clipped when collapsed)</div>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const Default: Story = {
  render: () => <InteractiveAccordion />
}

export const Invalid: Story = {
  render: () => (
    <Accordion>
      <AccordionItem error expanded={false} header={<span>Invalid item</span>} onToggle={() => {}}>
        <div>Hidden field (must be fully clipped when collapsed)</div>
      </AccordionItem>
    </Accordion>
  )
}
