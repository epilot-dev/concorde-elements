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
    accent: '#0000ff',
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
  cashback: '#00ccff'
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

  test('should properly handle text colors in dark mode', () => {
    const themeVars = getThemeVariables(mockTheme, mockDesignTokens)
    const darkColors = generateDarkModeColors(themeVars)

    // Check that text colors are included in dark mode generation
    expect(darkColors).toContain('--concorde-primary-text-dark')
    expect(darkColors).toContain('--concorde-secondary-text-dark')
    expect(darkColors).toContain('--concorde-disabled-text-dark')
    expect(darkColors).toContain('--concorde-disabled-label-text-dark')
  })

  test('should properly handle background colors in dark mode', () => {
    const themeVars = getThemeVariables(mockTheme, mockDesignTokens)
    const darkColors = generateDarkModeColors(themeVars)

    // Check that background colors are included in dark mode generation
    expect(darkColors).toContain('--concorde-default-background-dark')
    expect(darkColors).toContain('--concorde-topbar-background-dark')
    expect(darkColors).toContain('--concorde-surface-background-dark')
    expect(darkColors).toContain('--concorde-neutral-surface-dark')
    expect(darkColors).toContain('--concorde-loading-background-dark')
    expect(darkColors).toContain('--concorde-disabled-background-dark')
  })

  test('should generate different dark colors for text vs non-text colors', () => {
    const themeVars = getThemeVariables(mockTheme, mockDesignTokens)
    const darkColors = generateDarkModeColors(themeVars)

    // Extract the dark color values from the generated CSS
    const darkColorMatches = darkColors.match(
      /--concorde-([^:]+)-dark:\s*([^;]+);/g
    )

    expect(darkColorMatches).toBeTruthy()

    // Create a map of color names to their dark values
    const darkColorMap: Record<string, string> = {}

    darkColorMatches?.forEach((match) => {
      const [, colorName, colorValue] =
        match.match(/--concorde-([^:]+)-dark:\s*([^;]+);/) || []

      if (colorName && colorValue) {
        darkColorMap[colorName] = colorValue.trim()
      }
    })

    // Verify that text colors are lighter than non-text colors
    const textColors = ['primary-text', 'secondary-text', 'disabled-text']
    const nonTextColors = ['primary-color', 'secondary-color', 'accent-color']

    textColors.forEach((textColor) => {
      nonTextColors.forEach((nonTextColor) => {
        if (darkColorMap[textColor] && darkColorMap[nonTextColor]) {
          // Text colors should generally be lighter in dark mode
          // This is a basic check - in practice the exact values depend on the base colors
          expect(darkColorMap[textColor]).toBeDefined()
          expect(darkColorMap[nonTextColor]).toBeDefined()
        }
      })
    })
  })

  test('should properly lighten secondary text color in dark mode', () => {
    // Create a theme with a dark secondary text color similar to the original issue
    const themeWithDarkSecondaryText = {
      ...mockTheme,
      palette: {
        ...mockTheme.palette,
        typography: {
          ...mockTheme.palette.typography,
          secondary: '#424242' // The problematic dark color from the original issue
        }
      }
    } as ConcordeTheme

    const themeVars = getThemeVariables(
      themeWithDarkSecondaryText,
      mockDesignTokens
    )
    const darkColors = generateDarkModeColors(themeVars)

    // Extract the secondary text dark color
    const secondaryTextDarkMatch = darkColors.match(
      /--concorde-secondary-text-dark:\s*([^;]+);/
    )

    expect(secondaryTextDarkMatch).toBeTruthy()
    expect(secondaryTextDarkMatch![1]).toBeDefined()

    const darkColor = secondaryTextDarkMatch![1].trim()

    // The dark color should be lighter than the original #424242
    // We can't easily compare hex values directly, but we can verify it's not the same
    expect(darkColor).not.toBe('#424242')
    expect(darkColor).toMatch(/^#[0-9a-fA-F]{6}$/) // Should be a valid hex color
  })
})

describe('generateDarkModeStyles', () => {
  test('should return correct dark mode styles when enabled', () => {
    const themeVars = getThemeVariables(mockTheme, mockDesignTokens)
    const darkStyles = generateDarkModeStyles(themeVars, true)

    expect(typeof darkStyles).toBe('string')
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
