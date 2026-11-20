import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { useInjectCss } from '../useInjectCss'

const STYLE_ID = 'inject-css-under-test'
const CSS = `@font-face { font-family: 'Test'; src: local('Test'); }`

const tag = () => document.getElementById(STYLE_ID)

describe('useInjectCss', () => {
  afterEach(() => {
    tag()?.remove()
  })

  it('injects the css into the head and removes it on unmount', () => {
    const { unmount } = renderHook(() => useInjectCss(STYLE_ID, CSS))

    expect(tag()?.textContent).toBe(CSS)

    unmount()

    expect(tag()).toBeNull()
  })

  it('keeps the tag while another hook with the same id is still mounted', () => {
    // e.g. a page rendered as a Suspense fallback and again inside the
    // resolved lazy component: the fallback unmounts after the other mounted
    const fallback = renderHook(() => useInjectCss(STYLE_ID, CSS))
    const page = renderHook(() => useInjectCss(STYLE_ID, CSS))

    fallback.unmount()

    expect(tag()?.textContent).toBe(CSS)

    page.unmount()

    expect(tag()).toBeNull()
  })

  it('releases its hold when its css becomes empty, without removing the tag others hold', () => {
    const page = renderHook(() => useInjectCss(STYLE_ID, CSS))
    const other = renderHook(({ css }) => useInjectCss(STYLE_ID, css), {
      initialProps: { css: CSS }
    })

    // the cleanup of the previous run gives the hold back before the empty
    // run, so the count is one again and the page's unmount still clears
    other.rerender({ css: '' })

    expect(tag()?.textContent).toBe(CSS)

    page.unmount()

    expect(tag()).toBeNull()
  })

  it('rewrites the tag when the css changes', () => {
    const { rerender } = renderHook(({ css }) => useInjectCss(STYLE_ID, css), {
      initialProps: { css: CSS }
    })

    rerender({ css: 'body { color: red }' })

    expect(document.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1)
    expect(tag()?.textContent).toBe('body { color: red }')
  })

  it('injects nothing for empty css', () => {
    renderHook(() => useInjectCss(STYLE_ID, '   '))

    expect(tag()).toBeNull()
  })
})
