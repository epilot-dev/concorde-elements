import { useContext, useMemo } from 'react'

import { ThemeContext } from './context'
import { DefaultConcordeTheme } from './DefaultConcordeTheme'
import '../../global.css'
import type { ConcordeTheme, ThemeProviderProps } from './types'
import { useGlobalStyles } from './useGlobalStyles'

/**
 * Returns the current theme context. Safe to use outside ThemeProvider —
 * falls back to DefaultConcordeTheme with no design-token overrides.
 */
export function useTheme(): ConcordeTheme {
  const context = useContext(ThemeContext)

  return context ?? DefaultConcordeTheme
}

export function ThemeProvider({
  children,
  theme = DefaultConcordeTheme,
  designTokens = {},
  darkMode = false
}: ThemeProviderProps) {
  useGlobalStyles({ theme, designTokens, darkMode })

  const mergedTheme = useMemo<ConcordeTheme>(() => {
    const hasVariantOverrides =
      designTokens.input_variant || designTokens.card_variant

    if (!hasVariantOverrides) return theme

    return {
      ...theme,
      variants: {
        ...theme.variants,
        ...(designTokens.input_variant && {
          input: designTokens.input_variant
        }),
        ...(designTokens.card_variant && {
          card: designTokens.card_variant
        })
      }
    }
  }, [theme, designTokens.input_variant, designTokens.card_variant])

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.displayName = 'ThemeProvider'
