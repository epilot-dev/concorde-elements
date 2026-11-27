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

  describe('in a web component (shadow root)', () => {
    const renderInShadowRoot = () => {
      const host = document.createElement('div')
      const shadowRoot = host.attachShadow({ mode: 'open' })
      const mountPoint = document.createElement('div')
      const field = document.createElement('div')

      mountPoint.appendChild(document.createElement('div')).appendChild(field)
      shadowRoot.appendChild(mountPoint)
      document.body.appendChild(host)

      return { host, mountPoint, anchorRef: { current: field } }
    }

    afterEach(() => {
      document.body.innerHTML = ''
    })

    it('reserves the space at the end of the shadow tree, not on the page', () => {
      const { host, mountPoint, anchorRef } = renderInShadowRoot()

      const { rerender } = renderHook(
        ({ isActive }) => useReservedBottomSpace(isActive, 400, anchorRef),
        { initialProps: { isActive: true } }
      )

      expect(mountPoint.style.paddingBottom).toBe('calc(0px + 400px)')
      expect(document.body.style.paddingBottom).toBe('')
      expect(host.style.paddingBottom).toBe('')

      rerender({ isActive: false })
      expect(mountPoint.style.paddingBottom).toBe('')
    })

    it('keeps reservations of the page and of the web component apart', () => {
      const { mountPoint, anchorRef } = renderInShadowRoot()

      const inPage = renderHook(() => useReservedBottomSpace(true, 200))
      const inShadow = renderHook(() =>
        useReservedBottomSpace(true, 400, anchorRef)
      )

      expect(document.body.style.paddingBottom).toBe('calc(0px + 200px)')
      expect(mountPoint.style.paddingBottom).toBe('calc(0px + 400px)')

      inShadow.unmount()
      expect(mountPoint.style.paddingBottom).toBe('')
      expect(document.body.style.paddingBottom).toBe('calc(0px + 200px)')

      inPage.unmount()
      expect(document.body.style.paddingBottom).toBe('')
    })

    it('reserves the space on <body> when the field is in the page', () => {
      const field = document.body.appendChild(document.createElement('div'))

      const { unmount } = renderHook(() =>
        useReservedBottomSpace(true, 400, { current: field })
      )

      expect(document.body.style.paddingBottom).toBe('calc(0px + 400px)')

      unmount()
      expect(document.body.style.paddingBottom).toBe('')
    })
  })
})
