import { act, fireEvent, render, screen } from '@testing-library/react'
import { createRef, useEffect, useLayoutEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import classes from '../Accordion.module.scss'
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

let mounts = 0

const MountCounter = () => {
  useEffect(() => {
    mounts++
  }, [])

  return <input aria-label="field" />
}

let setExpandedFromOutside: (value: boolean) => void = () => {}

const Framed = ({
  initialExpanded = true,
  onToggle,
  actions = <button type="button">Remove</button>,
  error = false,
  children = <MountCounter />
}: {
  initialExpanded?: boolean
  onToggle?: () => void
  actions?: ReactNode
  error?: boolean
  children?: ReactNode
}) => {
  const [expanded, setExpanded] = useState(initialExpanded)

  setExpandedFromOutside = setExpanded

  return (
    <AccordionItem
      actions={actions}
      error={error}
      expanded={expanded}
      expandedToggleLabel="Collapse entry 1"
      header={<span>Preview</span>}
      hideHeaderWhenExpanded
      onToggle={() => {
        onToggle?.()
        setExpanded((value) => !value)
      }}
    >
      {children}
    </AccordionItem>
  )
}

describe('AccordionItem framed mode', () => {
  test('framed: renders no header row while expanded', () => {
    const { container } = render(<Framed />)
    expect(container.querySelector('.Concorde-AccordionItem__header')).toBeNull()
    expect(container.querySelector('.Concorde-AccordionItem__notch')).not.toBeNull()
    expect(container.querySelector('.Concorde-AccordionItem')).toHaveClass(
      'Concorde-AccordionItem--framed'
    )
  })

  test('framed: root carries the framed module class collapsed and expanded', () => {
    const { container } = render(<Framed />)
    const root = container.querySelector('.Concorde-AccordionItem')
    expect(classes.framed).toBeTruthy()
    expect(root).toHaveClass(classes.framed)
    fireEvent.click(screen.getByRole('button', { name: 'Collapse entry 1' }))
    expect(root).toHaveClass(classes.framed)
  })

  test('framed: renders the header row and no notch while collapsed', () => {
    const { container } = render(<Framed initialExpanded={false} />)
    expect(container.querySelector('.Concorde-AccordionItem__header')).not.toBeNull()
    expect(container.querySelector('.Concorde-AccordionItem__notch')).toBeNull()
  })

  test('framed: notch toggle is wired for assistive tech', () => {
    const { container } = render(<Framed />)
    const toggle = screen.getByRole('button', { name: 'Collapse entry 1' })
    const body = container.querySelector('.Concorde-AccordionItem__body')
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(body?.id).toBeTruthy()
    expect(toggle).toHaveAttribute('aria-controls', body?.id)
  })

  test('framed: clicking the notch toggle calls onToggle, clicking a notch action does not', () => {
    const onToggle = vi.fn()
    render(<Framed onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button', { name: 'Collapse entry 1' }))
    expect(onToggle).toHaveBeenCalledTimes(1)
    // Collapsed now; expand again so the notch action is rendered.
    fireEvent.click(screen.getByRole('button', { name: /preview/i }))
    expect(onToggle).toHaveBeenCalledTimes(2)
    onToggle.mockClear()
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }))
    expect(onToggle).not.toHaveBeenCalled()
  })

  test('framed: children stay mounted across toggles', () => {
    mounts = 0
    render(<Framed />)
    fireEvent.change(screen.getByLabelText('field', { selector: 'input' }), {
      target: { value: 'typed' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Collapse entry 1' }))
    fireEvent.click(screen.getByRole('button', { name: /preview/i }))
    expect(mounts).toBe(1)
    expect(screen.getByLabelText('field')).toHaveValue('typed')
  })

  test('framed: focus moves to the notch toggle on expand and back to the header toggle on collapse', () => {
    render(<Framed initialExpanded={false} />)
    const headerToggle = screen.getByRole('button', { name: /preview/i })
    headerToggle.focus()
    fireEvent.click(headerToggle)
    const notchToggle = screen.getByRole('button', { name: 'Collapse entry 1' })
    expect(document.activeElement).toBe(notchToggle)
    fireEvent.click(notchToggle)
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /preview/i }))
  })

  test('framed: focus does not move when the toggle was not focused', () => {
    render(<Framed initialExpanded={false} />)
    act(() => setExpandedFromOutside(true))
    expect(screen.getByRole('button', { name: 'Collapse entry 1' })).toBeInTheDocument()
    expect(document.activeElement).toBe(document.body)
  })

  test('framed: focus moves to the header toggle when the parent collapses while focus is in the notch', () => {
    render(<Framed />)
    screen.getByRole('button', { name: 'Remove' }).focus()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Remove' }))
    act(() => setExpandedFromOutside(false))
    expect(document.activeElement).toBe(screen.getByRole('button', { name: /preview/i }))
  })

  test('framed: focus is left alone when the parent collapses while focus is elsewhere', () => {
    render(<Framed />)
    act(() => setExpandedFromOutside(false))
    expect(document.activeElement).toBe(document.body)
  })

  test('framed: header and notch both expose hero anchors for chevron and actions', () => {
    const { container } = render(<Framed initialExpanded={false} />)
    const header = container.querySelector('.Concorde-AccordionItem__header') as HTMLElement
    expect(header.querySelector('[data-hero="chevron"]')).not.toBeNull()
    expect(header.querySelector('[data-hero="actions"]')).not.toBeNull()
    act(() => setExpandedFromOutside(true))
    const notch = container.querySelector('.Concorde-AccordionItem__notch') as HTMLElement
    expect(notch.querySelector('[data-hero="chevron"]')).not.toBeNull()
    expect(notch.querySelector('[data-hero="actions"]')).not.toBeNull()
  })

  test('framed: notch actions carry the public Concorde-AccordionItem__actions class', () => {
    const { container } = render(<Framed />)
    const notch = container.querySelector('.Concorde-AccordionItem__notch') as HTMLElement
    expect(notch.querySelector('.Concorde-AccordionItem__actions')).not.toBeNull()
  })

  test('framed: body overflow is visible right after expanding', () => {
    const { container } = render(<Framed initialExpanded={false} />)
    act(() => setExpandedFromOutside(true))
    expect(classes.bodyExpanded).toBeTruthy()
    expect(container.querySelector('.Concorde-AccordionItem__body')).toHaveClass(
      classes.bodyExpanded
    )
  })

  test('framed: error colours the frame instead of the left bar', () => {
    const { container } = render(<Framed error />)
    const root = container.querySelector('.Concorde-AccordionItem')
    expect(classes.frameError).toBeTruthy()
    expect(container.querySelector('.Concorde-AccordionItem__frame')).toHaveClass(
      classes.frameError
    )
    expect(root).not.toHaveClass(classes.error)
    fireEvent.click(screen.getByRole('button', { name: 'Collapse entry 1' }))
    expect(root).toHaveClass(classes.error)
  })

  test('framed: has no axe violations when expanded', async () => {
    const { container } = render(<Framed />)
    expect(await axe(container as HTMLElement)).toHaveNoViolations()
  })
})

describe('AccordionItem ref and effects', () => {
  test('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <AccordionItem expanded={false} header="Preview" onToggle={() => {}} ref={ref}>
        <div>Body</div>
      </AccordionItem>
    )
    expect(ref.current).toHaveClass('Concorde-AccordionItem')
  })

  test('inert is updated before parent layout effects run', () => {
    const seen: boolean[] = []

    const Parent = ({ expanded }: { expanded: boolean }) => {
      useLayoutEffect(() => {
        const body = document.querySelector('.Concorde-AccordionItem__body')
        seen.push(body?.hasAttribute('inert') ?? true)
      }, [expanded])

      return (
        <AccordionItem expanded={expanded} header="Preview" onToggle={() => {}}>
          <div>Body</div>
        </AccordionItem>
      )
    }

    const { rerender } = render(<Parent expanded={false} />)
    rerender(<Parent expanded />)
    expect(seen).toEqual([true, false])
  })
})
