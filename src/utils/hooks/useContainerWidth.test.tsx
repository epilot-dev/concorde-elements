import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useRef } from 'react'

import { ContainerWidthProvider, useContainerWidth } from './useContainerWidth'

function WidthDisplay() {
  const width = useContainerWidth()
  return <div data-testid="width">{width ?? 'none'}</div>
}

describe('useContainerWidth', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns undefined when no provider is present', () => {
    render(<WidthDisplay />)
    expect(screen.getByTestId('width').textContent).toBe('none')
  })

  it('returns the observed width from the provider ref', () => {
    let resizeCallback: ResizeObserverCallback

    const MockResizeObserver = vi.fn((cb: ResizeObserverCallback) => {
      resizeCallback = cb
      return {
        observe: vi.fn(() => {
          resizeCallback(
            [{ contentBoxSize: [{ inlineSize: 500 }] }] as unknown as ResizeObserverEntry[],
            {} as ResizeObserver
          )
        }),
        unobserve: vi.fn(),
        disconnect: vi.fn()
      }
    })

    vi.stubGlobal('ResizeObserver', MockResizeObserver)

    function TestWrapper() {
      const ref = useRef<HTMLDivElement>(null)
      return (
        <div ref={ref}>
          <ContainerWidthProvider containerRef={ref}>
            <WidthDisplay />
          </ContainerWidthProvider>
        </div>
      )
    }

    render(<TestWrapper />)
    expect(screen.getByTestId('width').textContent).toBe('500')
  })

  it('returns undefined when ResizeObserver is not available', () => {
    vi.stubGlobal('ResizeObserver', undefined)

    function TestWrapper() {
      const ref = useRef<HTMLDivElement>(null)
      return (
        <div ref={ref}>
          <ContainerWidthProvider containerRef={ref}>
            <WidthDisplay />
          </ContainerWidthProvider>
        </div>
      )
    }

    render(<TestWrapper />)
    expect(screen.getByTestId('width').textContent).toBe('none')
  })
})
