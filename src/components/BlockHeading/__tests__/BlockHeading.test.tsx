import { render, screen } from '@testing-library/react'
import { useEffect } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { BlockHeading } from '../'

const onMount = vi.fn()

const Control = () => {
  useEffect(() => onMount(), [])

  return <input aria-label="Control" />
}

describe('BlockHeading', () => {
  beforeEach(() => {
    onMount.mockClear()
  })

  it('renders only its children without a title or subtitle', () => {
    const { container } = render(
      <BlockHeading>
        <Control />
      </BlockHeading>
    )

    expect(container.querySelector('.Concorde-BlockHeading')).toBeNull()
    expect(screen.getByRole('textbox', { name: 'Control' })).toBeInTheDocument()
  })

  it('keeps its children mounted when the heading appears later', () => {
    const { rerender } = render(
      <BlockHeading>
        <Control />
      </BlockHeading>
    )

    rerender(
      <BlockHeading subtitle="Where we deliver to" title="Your address">
        <Control />
      </BlockHeading>
    )

    expect(screen.getByRole('heading', { name: 'Your address' })).toBeInTheDocument()
    expect(screen.getByText('Where we deliver to')).toBeInTheDocument()
    expect(onMount).toHaveBeenCalledTimes(1)
  })
})
