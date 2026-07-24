import { useMediaQuery } from './useMediaQuery'

/**
 * True when the primary input does not support hover (e.g. touch devices like smartphones and tablets).
 * Uses the (hover: none) media query. Use this when you need touch/click behaviour without depending on ThemeProvider.
 */
export function useIsTouchDevice() {
  return useMediaQuery('(hover: none)')
}
