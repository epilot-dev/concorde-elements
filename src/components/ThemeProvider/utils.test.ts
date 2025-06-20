import { describe, test, expect } from 'vitest'

import type { ConcordeTheme, JourneyDesignTokens } from './types'
import {
  getThemeVariables,
  generateDarkModeColors,
  generateDarkModeStyles,
  convertThemeToCssVariables
} from './utils'

// Mock theme and design tokens
const mockTheme = {
  palette: {
    primary: '#ff0000',
    secondary: '#00ff00',
    disabled: '#cccccc',
    error: '#ff0000',
    typography: {
      primary: '#000000',
      secondary: '#333333',
      disabled: '#666666'
    },
    divider: '#dddddd',
    background: {
      default: '#ffffff',
      paper: '#f5f5f5'
    },
    topbar: '#222222'
  },
  typography: { fontFamily: 'Arial' },
  shape: { borderRadius: 4 },
  spacing: 8
} as ConcordeTheme

const mockDesignTokens = {
  coupon: '#ffcc00',
  cashback: '#00ccff',
  dark_mode: 'user_preference'
} as JourneyDesignTokens

describe('getThemeVariables', () => {
  test('should generate correct theme variables', () => {
    const themeVars = getThemeVariables(mockTheme, mockDesignTokens)

    expect(themeVars['--concorde-primary-color']).toBe('#ff0000')
    expect(themeVars['--concorde-font-family']).toBe('Arial')
    expect(themeVars['--concorde-border-radius']).toBe('4px')
    expect(themeVars['--concorde-spacing']).toBe('8px')
    expect(themeVars['--concorde-coupon-discount-color']).toBe('#ffcc00')
    expect(themeVars['--concorde-coupon-cashback-color']).toBe('#00ccff')
  })

  test('should generate theme variables without design tokens', () => {
    const themeVars = getThemeVariables(mockTheme, {})

    expect(themeVars['--concorde-primary-color']).toBe('#ff0000')
    expect(themeVars['--concorde-coupon-discount-color']).toBeUndefined()
    expect(themeVars['--concorde-coupon-cashback-color']).toBeUndefined()
  })
})

describe('generateDarkModeColors', () => {
  test('should generate dark mode colors without throwing errors', () => {
    const themeVars = getThemeVariables(mockTheme, mockDesignTokens)
    const darkColors = generateDarkModeColors(themeVars)

    expect(typeof darkColors).toBe('string')
    expect(darkColors).toContain('--concorde-primary-color-oklch')
    expect(darkColors).toContain('--concorde-primary-color-dark')
    expect(darkColors).toContain('--concorde-primary-color-dark-oklch')
  })
})

describe('generateDarkModeStyles', () => {
  test('should return correct dark mode styles when enabled', () => {
    const themeVars = getThemeVariables(mockTheme, mockDesignTokens)
    const darkStyles = generateDarkModeStyles(themeVars, 'user_preference')

    expect(typeof darkStyles).toBe('string')
    expect(darkStyles).toContain('@media (prefers-color-scheme: dark)')
  })

  test('should return empty string when dark mode is disabled', () => {
    const themeVars = getThemeVariables(mockTheme, mockDesignTokens)
    const darkStyles = generateDarkModeStyles(themeVars, undefined)

    expect(darkStyles).toBe('')
  })
})

describe('convertThemeToCssVariables', () => {
  test('should return valid CSS variable string', () => {
    const cssVars = convertThemeToCssVariables(mockTheme, mockDesignTokens)

    expect(typeof cssVars).toBe('string')
    expect(cssVars).toContain('--concorde-primary-color: #ff0000')
    expect(cssVars).toContain('--concorde-font-family: Arial')
  })
})
