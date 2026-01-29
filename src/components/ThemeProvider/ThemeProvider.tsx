import { useContext } from 'react'

import { ThemeContext } from './context'
import { DefaultConcordeTheme } from './DefaultConcordeTheme'
import '../../global.css'
import type { ThemeProviderProps } from './types'
import { useGlobalStyles } from './useGlobalStyles'

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export function ThemeProvider({
  children,
  theme = DefaultConcordeTheme,
  designTokens = {},
  darkMode = false
}: ThemeProviderProps) {
  useGlobalStyles({ theme, designTokens, darkMode })

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

ThemeProvider.displayName = 'ThemeProvider'
