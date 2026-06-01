import { render, renderHook, screen } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, describe, it, expect, vi } from 'vitest'

import { ContainerWidthProvider } from '../hooks/useContainerWidth'
import { useIsMobile, useIsMobileOrTablet, useMediaQuery } from '..'

describe('useMediaQuery', () => {
  it('should return true if the media query matches', () => {
    const matchMediaMock = vi.fn().mockImplementation(() => {
      return {
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      }
    })

    window.matchMedia = matchMediaMock

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'))

    expect(result.current).toBe(true)
    expect(matchMediaMock).toHaveBeenCalledWith('(min-width: 600px)')
  })

  it('should return false if the media query does not match', () => {
    const matchMediaMock = vi.fn().mockImplementation(() => {
      return {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      }
    })

    window.matchMedia = matchMediaMock

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'))

    expect(result.current).toBe(false)
    expect(matchMediaMock).toHaveBeenCalledWith('(min-width: 600px)')
  })
})

function IsMobileDisplay() {
  const isMobile = useIsMobile()
  return <div data-testid="is-mobile">{String(isMobile)}</div>
}

function IsMobileOrTabletDisplay() {
  const isMobileOrTablet = useIsMobileOrTablet()
  return <div data-testid="is-mobile-or-tablet">{String(isMobileOrTablet)}</div>
}

function createResizeObserverMock(inlineSize: number) {
  let resizeCallback: ResizeObserverCallback

  return vi.fn((cb: ResizeObserverCallback) => {
    resizeCallback = cb
    return {
      observe: vi.fn(() => {
        resizeCallback(
          [{ contentBoxSize: [{ inlineSize }] }] as unknown as ResizeObserverEntry[],
          {} as ResizeObserver
        )
      }),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    }
  })
}

function WrapperWithContainerWidth({
  children
}: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref}>
      <ContainerWidthProvider containerRef={ref}>{children}</ContainerWidthProvider>
    </div>
  )
}

describe('useIsMobile (container-aware)', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns true when container width is below sm breakpoint (600px)', () => {
    vi.stubGlobal('ResizeObserver', createResizeObserverMock(500))

    render(
      <WrapperWithContainerWidth>
        <IsMobileDisplay />
      </WrapperWithContainerWidth>
    )

    expect(screen.getByTestId('is-mobile').textContent).toBe('true')
  })

  it('returns false when container width is at or above sm breakpoint', () => {
    vi.stubGlobal('ResizeObserver', createResizeObserverMock(700))

    render(
      <WrapperWithContainerWidth>
        <IsMobileDisplay />
      </WrapperWithContainerWidth>
    )

    expect(screen.getByTestId('is-mobile').textContent).toBe('false')
  })

  it('falls back to matchMedia when no ContainerWidthProvider exists', () => {
    const matchMediaMock = vi.fn().mockImplementation(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    }))

    window.matchMedia = matchMediaMock

    render(<IsMobileDisplay />)

    expect(screen.getByTestId('is-mobile').textContent).toBe('true')
    expect(matchMediaMock).toHaveBeenCalled()
  })
})

describe('useIsMobileOrTablet (container-aware)', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns true when container width is below md breakpoint (960px)', () => {
    vi.stubGlobal('ResizeObserver', createResizeObserverMock(800))

    render(
      <WrapperWithContainerWidth>
        <IsMobileOrTabletDisplay />
      </WrapperWithContainerWidth>
    )

    expect(screen.getByTestId('is-mobile-or-tablet').textContent).toBe('true')
  })

  it('returns false when container width is at or above md breakpoint', () => {
    vi.stubGlobal('ResizeObserver', createResizeObserverMock(1200))

    render(
      <WrapperWithContainerWidth>
        <IsMobileOrTabletDisplay />
      </WrapperWithContainerWidth>
    )

    expect(screen.getByTestId('is-mobile-or-tablet').textContent).toBe('false')
  })
})
