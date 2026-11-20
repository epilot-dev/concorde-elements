import { renderHook } from '@testing-library/react'

import { useReservedBottomSpace } from '../hooks/useReservedBottomSpace'

describe('useReservedBottomSpace', () => {
  afterEach(() => {
    document.body.style.paddingBottom = ''
  })

  it('reserves the space at the end of the page while active', () => {
    const { rerender } = renderHook(
      ({ isActive }) => useReservedBottomSpace(isActive, 400),
      { initialProps: { isActive: false } }
    )

    expect(document.body.style.paddingBottom).toBe('')

    rerender({ isActive: true })
    expect(document.body.style.paddingBottom).toBe('calc(0px + 400px)')

    rerender({ isActive: false })
    expect(document.body.style.paddingBottom).toBe('')
  })

  it('adds to the padding the page already has and restores it', () => {
    document.body.style.paddingBottom = '24px'

    const { unmount } = renderHook(() => useReservedBottomSpace(true, 200))

    expect(document.body.style.paddingBottom).toBe('calc(24px + 200px)')

    unmount()
    expect(document.body.style.paddingBottom).toBe('24px')
  })

  it('uses the largest reservation while several popups are open', () => {
    const first = renderHook(() => useReservedBottomSpace(true, 200))
    const second = renderHook(() => useReservedBottomSpace(true, 400))

    expect(document.body.style.paddingBottom).toBe('calc(0px + 400px)')

    second.unmount()
    expect(document.body.style.paddingBottom).toBe('calc(0px + 200px)')

    first.unmount()
    expect(document.body.style.paddingBottom).toBe('')
  })
})
