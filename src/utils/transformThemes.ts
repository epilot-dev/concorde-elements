import type { CSSProperties } from 'react'

import type { ConcordeTheme } from '../components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EpilotThemeRef = Record<string, any>

/**
 * @todo We need to make this utility independent from MUI theming logic
 */
export const transformMuiThemeToConcordeTheme = (
  theme: EpilotThemeRef
): ConcordeTheme => {
  return {
    typography: {
      fontFamily:
        theme.typography?.fontFamily ||
        'Proxima Nova, Open Sans, Helvetica, Arial, sans-serif',
      fontSize: theme.typography?.fontSize || 16,
      h1: {
        fontSize: theme.typography?.h1?.fontSize || 28
      },
      h2: {
        fontSize: theme.typography?.h2?.fontSize || 24
      },
      h3: {
        fontSize: theme.typography?.h3?.fontSize || 20
      },
      h4: {
        fontSize: theme.typography?.h4?.fontSize || 16
      },
      h5: {
        fontSize: theme.typography?.h5?.fontSize || 14
      },
      h6: {
        fontSize: theme.typography?.h6?.fontSize || 12
      },
      fontSource: theme.typography?.fontSource || []
    },
    palette: {
      primary: theme.palette?.primary.main || '#005EB4',
      secondary: theme.palette?.secondary.main || '#913997',
      disabled: '#e0e2ec',
      error: theme.palette?.error.main || '#ff3a3f',
      accent: theme.palette?.primary.main || '#005EB4',
      background: {
        default: theme.palette?.background.default || '#FFFFFF',
        paper:
          (theme.muiOverrides?.MuiPaper?.root as CSSProperties)
            ?.backgroundColor || '#FFFFFF'
      },
      topbar:
        theme?.muiOverrides?.MuiAppBar?.colorPrimary.backgroundColor ||
        '#005eb4',
      divider: theme.palette?.divider || '#DEEAF7',
      typography: {
        primary: theme.palette?.text.primary || '#001632',
        secondary: theme.palette?.text.secondary || '#717171',
        disabled: theme.palette?.text.disabled || '#43474e'
      },
      button: theme.muiOverrides?.MuiButton?.containedPrimary
        ? {
            primary: {
              background:
                theme.muiOverrides?.MuiButton?.containedPrimary
                  ?.backgroundColor ||
                theme.muiOverrides?.MuiButton?.containedPrimary?.background,
              hoverBackground:
                theme.muiOverrides?.MuiButton?.containedPrimary?.['&:hover']
                  ?.backgroundColor ||
                theme.muiOverrides?.MuiButton?.containedPrimary?.['&:hover']
                  ?.background
            }
          }
        : undefined,
      toggleButton: theme.muiOverrides?.MuiToggleButton
        ? {
            borderColor: theme.muiOverrides?.MuiToggleButton?.root?.borderColor
          }
        : undefined
    },
    spacing: theme.spacing || 8,
    shape: {
      borderRadius:
        theme.shape?.borderRadius !== undefined ? theme.shape?.borderRadius : 4
    },
    breakpoints: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536
    }
  }
}
