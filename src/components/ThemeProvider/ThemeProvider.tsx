import { useContext, useEffect } from 'react'

import { toRgbTuple } from '../../utils'

import { ThemeContext } from './context'
import { DefaultConcordeTheme } from './DefaultConcordeTheme'
import type { ThemeProviderProps } from './types'

import '../../global.css'

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export function ThemeProvider({
  children,
  theme = DefaultConcordeTheme
}: ThemeProviderProps) {
  useEffect(() => {
    const cssVariables = {
      '--concorde-primary-color': theme.palette.primary,
      '--concorde-secondary-color': theme.palette.secondary,
      '--concorde-disabled-color': theme.palette.disabled,
      '--concorde-error-color': theme.palette.error,
      '--concorde-font-family': theme.typography.fontFamily,
      '--concorde-border-radius': `${theme.shape.borderRadius}px`,
      '--concorde-spacing': `${theme.spacing}px`,
      '--concorde-primary-text': theme.palette.typography.primary,
      '--concorde-secondary-text': theme.palette.typography.secondary,
      '--concorde-disabled-text': theme.palette.typography.disabled,
      '--concorde-primary-color-rgb': toRgbTuple(theme.palette.primary),
      '--concorde-secondary-color-rgb': toRgbTuple(theme.palette.secondary),
      '--concorde-error-color-rgb': toRgbTuple(theme.palette.error),
      '--concorde-primary-text-rgb': toRgbTuple(
        theme.palette.typography.primary
      ),
      '--concorde-secondary-text-rgb': toRgbTuple(
        theme.palette.typography.secondary
      ),
      '--concorde-divider-color': theme.palette.divider,
      '--concorde-default-background': theme.palette.background.default,
      '--concorde-default-background-rgb': toRgbTuple(
        theme.palette.background.default
      ),
      '--concorde-surface-background': theme.palette.background.paper
    }

    Object.entries(cssVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })

    return () => {
      Object.keys(cssVariables).forEach((key) => {
        document.documentElement.style.removeProperty(key)
      })
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={DefaultConcordeTheme}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.displayName = 'ThemeProvider'
