import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { useMediaQuery } from '..'

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
