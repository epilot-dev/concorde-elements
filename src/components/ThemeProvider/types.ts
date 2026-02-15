import type { CSSProperties, ReactNode } from 'react'

export type ConcordeCustomFontSource = {
  fontFamily: string
  fontStyle: string
  fontDisplay: 'swap'
  fontWeight: 400 | 600 | 800 | 'bold'
  src: string
}

export type ConcordeTypography = {
  fontFamily: string
  fontSize: number
  h1?: CSSProperties
  h2?: CSSProperties
  h3?: CSSProperties
  h4?: CSSProperties
  h5?: CSSProperties
  h6?: CSSProperties
  fontSource?: ConcordeCustomFontSource[]
}

export type TypographyColor = {
  primary: string
  secondary: string
  disabled: string
}

export type ConcordePalette = {
  primary: string
  secondary: string
  disabled: string
  error: string
  accent: string
  typography: TypographyColor
  background: BackgroundColor
  divider: string
  topbar: string
  button?: {
    primary: {
      background: string
      hoverBackground: string
    }
  }
  toggleButton?: {
    borderColor: string
  }
}

export type BackgroundColor = {
  default: string
  paper: string
}

export type ConcordeShape = {
  borderRadius: number
}

export type ConcordeShadows = string[]

export interface ConcordeTheme {
  /**
   * typography options
   */
  typography: ConcordeTypography

  /**
   * colors palette options
   */
  palette: ConcordePalette

  /**
   * the space around the components
   */
  spacing: number

  /**
   * style for the container shape, currently only changes the border_radius
   */
  shape: ConcordeShape

  /**
   * Components shadows
   */
  shadows?: ConcordeShadows

  /**
   * Breakpoints for responsive design
   */
  breakpoints: {
    xs: 0
    sm: 600
    md: 960
    lg: 1200
    xl: 1536
  }

  /**
   * Material UI components styling overrides
   */
  muiOverrides?: {
    MuiInputBase?: {
      input?: CSSProperties
    }
  }
}

export type JourneyDesignTokens = {
  coupon?: string
  cashback?: string
  custom_css?: string
}

export type ThemeProviderProps = {
  children: ReactNode
  /**
   * Theme to be applied to child components
   * @default DefaultConcordeTheme
   */
  theme?: ConcordeTheme
  /**
   * Design tokens to be applied to child components
   */
  designTokens?: JourneyDesignTokens
  /**
   * @default false
   */
  darkMode?: boolean
}
