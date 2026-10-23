import type { ConcordeTheme } from './types'

export const DefaultConcordeTheme: ConcordeTheme = {
  typography: {
    fontFamily: 'ProximaNova, Open Sans, Helvetica, Arial, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: 28
    },
    h2: {
      fontSize: 24
    },
    h3: {
      fontSize: 20
    },
    h4: {
      fontSize: 16
    },
    h5: {
      fontSize: 14
    },
    h6: {
      fontSize: 12
    }
  },
  palette: {
    primary: '#005EB4',
    secondary: '#913997',
    disabled: '#e0e2ec',
    error: '#ff3a3f',
    accent: '#005EB4',
    typography: {
      primary: '#001632',
      secondary: '#717171',
      disabled: '#43474e'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    divider: '#deeaf7',
    topbar: '#005EB4'
  },
  spacing: 4,
  shape: {
    borderRadius: 4
  },
  breakpoints: { xs: 0, sm: 600, md: 960, lg: 1200, xl: 1536 }
}
