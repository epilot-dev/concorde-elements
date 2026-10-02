import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { Accordion, AccordionItem } from '../index'

describe('AccordionItem', () => {
  test('keeps the body mounted but inert when collapsed', () => {
    const { container } = render(
      <AccordionItem expanded={false} header={<span>Preview</span>} onToggle={() => {}}>
        <div>Body content</div>
      </AccordionItem>
    )
    // Collapsed content stays in the DOM so child controls keep running their
    // mount-time effects (collapsing must not drop blocks from validation).
    expect(screen.getByText('Body content')).toBeInTheDocument()
    // ...but it is inert (non-interactive, removed from the a11y tree).
    expect(
      container.querySelector('.Concorde-AccordionItem__body')
    ).toHaveAttribute('inert')
  })

  test('body is mounted and interactive when expanded', () => {
    const { container } = render(
      <AccordionItem expanded header={<span>Preview</span>} onToggle={() => {}}>
        <div>Body content</div>
      </AccordionItem>
    )
    expect(screen.getByText('Body content')).toBeInTheDocument()
    expect(
      container.querySelector('.Concorde-AccordionItem__body')
    ).not.toHaveAttribute('inert')
  })

  test('the header toggle references the body via aria-controls', () => {
    const { container } = render(
      <AccordionItem expanded={false} header={<span>Preview</span>} onToggle={() => {}}>
        <div>Body</div>
      </AccordionItem>
    )
    const button = screen.getByRole('button', { name: /preview/i })
    const body = container.querySelector('.Concorde-AccordionItem__body')
    expect(button).toHaveAttribute('aria-controls', body?.id)
  })

  test('toggles when the header button is clicked', () => {
    const onToggle = vi.fn()
    render(
      <AccordionItem expanded={false} header={<span>Preview</span>} onToggle={onToggle}>
        <div>Body</div>
      </AccordionItem>
    )
    fireEvent.click(screen.getByRole('button', { name: /preview/i }))
    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  test('clicking an action does not toggle the item', () => {
    const onToggle = vi.fn()
    render(
      <AccordionItem
        actions={<button type="button">Remove</button>}
        expanded={false}
        header={<span>Preview</span>}
        onToggle={onToggle}
      >
        <div>Body</div>
      </AccordionItem>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onToggle).not.toHaveBeenCalled()
  })

  test('applies the error class when error is set', () => {
    const { container } = render(
      <AccordionItem error expanded={false} header={<span>Preview</span>} onToggle={() => {}}>
        <div>Body</div>
      </AccordionItem>
    )
    expect(container.querySelector('.Concorde-AccordionItem')?.className).toMatch(/error/i)
  })

  test('has no axe violations', async () => {
    const { container } = render(
      <Accordion>
        <AccordionItem expanded header={<span>Preview</span>} onToggle={() => {}}>
          <div>Body</div>
        </AccordionItem>
      </Accordion>
    )
    expect(await axe(container as HTMLElement)).toHaveNoViolations()
  })

  test('collapsed body clips overflow (no overflow-visible class)', () => {
    const { container } = render(
      <AccordionItem expanded={false} header={<span>Preview</span>} onToggle={() => {}}>
        <div>Body</div>
      </AccordionItem>
    )
    expect(
      container.querySelector('.Concorde-AccordionItem__body')?.className
    ).not.toMatch(/bodyExpanded/i)
  })

  test('an item mounted already-expanded allows overflow immediately', () => {
    const { container } = render(
      <AccordionItem expanded header={<span>Preview</span>} onToggle={() => {}}>
        <div>Body</div>
      </AccordionItem>
    )
    // No open transition fires on initial mount, so overflow must be allowed
    // right away (otherwise an auto-expanded item would clip its popovers).
    expect(
      container.querySelector('.Concorde-AccordionItem__body')?.className
    ).toMatch(/bodyExpanded/i)
  })

  test('body clips while opening, then allows overflow after the transition ends', () => {
    const { container, rerender } = render(
      <AccordionItem expanded={false} header={<span>Preview</span>} onToggle={() => {}}>
        <div>Body</div>
      </AccordionItem>
    )

    // Toggle open: while the height animates, overflow must still be clipped so
    // content does not spill over the items below.
    rerender(
      <AccordionItem expanded header={<span>Preview</span>} onToggle={() => {}}>
        <div>Body</div>
      </AccordionItem>
    )
    const body = container.querySelector('.Concorde-AccordionItem__body')
    expect(body?.className).not.toMatch(/bodyExpanded/i)

    // When the region's own open transition ends, overflow is revealed. The
    // handler keys off target===currentTarget (the region's own transition),
    // not propertyName — which jsdom's synthetic event does not carry anyway.
    const region = container.querySelector('.Concorde-AccordionItem__region')
    fireEvent.transitionEnd(region as Element)
    expect(body?.className).toMatch(/bodyExpanded/i)
  })
})
