import { useEffect, useState } from 'react'

import { useTheme } from '../../components/ThemeProvider'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (
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
  }, [query])

  return matches
}

export function useIsMobile() {
  const theme = useTheme()

  const mobileQuery = `(max-width: ${theme.breakpoints.sm - 1}px)`

  return useMediaQuery(mobileQuery)
}

export function useIsMobileOrTablet() {
  const theme = useTheme()

  const tabletQuery = `(max-width: ${theme.breakpoints.md - 1}px)`

  return useMediaQuery(tabletQuery)
}
