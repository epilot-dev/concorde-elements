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
  designTokens = {}
}: ThemeProviderProps) {
  useGlobalStyles({ theme, designTokens })

  return (
    <ThemeContext.Provider value={DefaultConcordeTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.displayName = 'ThemeProvider'
