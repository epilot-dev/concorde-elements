import { useEffect, useState } from 'react'

import { useTheme } from '../../components/ThemeProvider'

import { useContainerWidth } from './useContainerWidth'

export function useMediaQuery(query: string, enabled = true) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (
      !enabled ||
      typeof window === 'undefined' ||
      // other non-supported browser environments (e.g. vitest)
      typeof window.matchMedia !== 'function'
    )
      return

    const mediaQuery = window.matchMedia(query)

    setMatches(mediaQuery.matches)

    const handleChange = () => {
      setMatches(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query, enabled])

  return matches
}

export function useIsMobile() {
  const theme = useTheme()
  const containerWidth = useContainerWidth()
  const hasContainerWidth = containerWidth !== undefined

  const mobileQuery = `(max-width: ${theme.breakpoints.sm - 1}px)`
  const mediaQueryResult = useMediaQuery(mobileQuery, !hasContainerWidth)

  if (hasContainerWidth) {
    return containerWidth < theme.breakpoints.sm
  }

  return mediaQueryResult
}

export function useIsMobileOrTablet() {
  const theme = useTheme()
  const containerWidth = useContainerWidth()
  const hasContainerWidth = containerWidth !== undefined

  const tabletQuery = `(max-width: ${theme.breakpoints.md - 1}px)`
  const mediaQueryResult = useMediaQuery(tabletQuery, !hasContainerWidth)

  if (hasContainerWidth) {
    return containerWidth < theme.breakpoints.md
  }

  return mediaQueryResult
}
