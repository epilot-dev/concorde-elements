import { formatCss, formatHex, useMode, modeRgb, modeOklch } from 'culori/fn'
import type { Rgb, Oklch } from 'culori/fn'

import {
  blendColors,
  convertColorToHex,
  generateColorShades,
  round2,
  toRgbTuple
} from '../../utils'

import type { ConcordeTheme, JourneyDesignTokens } from './types'

const THEME_BASE_COLORS = [
  '--concorde-primary-color',
  '--concorde-secondary-color',
  '--concorde-disabled-color',
  '--concorde-error-color',
  '--concorde-outline',
  '--concorde-primary-text',
  '--concorde-secondary-text',
  '--concorde-disabled-text',
  '--concorde-divider-color',
  '--concorde-coupon-discount-color',
  '--concorde-coupon-cashback-color',
  '--concorde-primary-button-background-color',
  '--concorde-primary-button-hover-bg-color',
  '--concorde-toggle-button-border-color'
]

const THEME_BACKGROUND_BASE_COLORS = [
  '--concorde-default-background',
  '--concorde-topbar-background',
  '--concorde-surface-background'
]

export const getThemeVariables = (
  theme: ConcordeTheme,
  designTokens: JourneyDesignTokens
) => ({
  '--concorde-primary-color': theme.palette.primary,
  '--concorde-accent-color': theme.palette.accent,
  '--concorde-secondary-color': theme.palette.secondary,
  '--concorde-disabled-color': theme.palette.disabled,
  '--concorde-error-color': theme.palette.error,
  '--concorde-outline': '#74777f',
  '--concorde-font-family': theme.typography.fontFamily,
  '--concorde-border-radius': `${theme.shape.borderRadius}px`,
  '--concorde-spacing': `${theme.spacing}px`,
  '--concorde-primary-text': theme.palette.typography.primary,
  '--concorde-secondary-text': theme.palette.typography.secondary,
  '--concorde-disabled-text': theme.palette.typography.disabled,
  '--concorde-primary-color-rgb': toRgbTuple(theme.palette.primary),
  '--concorde-secondary-color-rgb': toRgbTuple(theme.palette.secondary),
  '--concorde-error-color-rgb': toRgbTuple(theme.palette.error),
  '--concorde-primary-text-rgb': toRgbTuple(theme.palette.typography.primary),
  '--concorde-secondary-text-rgb': toRgbTuple(
    theme.palette.typography.secondary
  ),
  '--concorde-divider-color': theme.palette.divider,
  '--concorde-default-background': theme.palette.background.default,
  '--concorde-default-background-rgb': toRgbTuple(
    theme.palette.background.default
  ),
  '--concorde-topbar-background': theme.palette.topbar,
  '--concorde-surface-background': convertColorToHex(
    theme.palette.background.paper,
    true
  ),
  '--concorde-secondary-background': blendColors(
    theme.palette.primary,
    convertColorToHex(theme.palette.background.paper, true),
    0.06
  ),
  ...(designTokens.coupon && {
    '--concorde-coupon-discount-color': designTokens.coupon
  }),
  ...(designTokens.cashback && {
    '--concorde-coupon-cashback-color': designTokens.cashback
  }),
  ...(theme.palette.button?.primary?.background && {
    '--concorde-primary-button-background-color':
      theme.palette.button?.primary?.background
  }),
  ...(theme.palette.button?.primary?.hoverBackground && {
    '--concorde-primary-button-hover-bg-color':
      theme.palette.button?.primary?.hoverBackground
  }),
  ...(theme.palette.toggleButton?.borderColor && {
    '--concorde-toggle-button-border-color':
      theme.palette.toggleButton?.borderColor
  })
})

/**
 * Generates a dark mode color based on a base OKLCH color.
 */
const generateDarkShade = (baseColor: Oklch, isBackground = false) => {
  const adjustedColor = {
    l: round2(baseColor.l * (isBackground ? 0.3 : 1.5)), // Darken bg, brighten foreground
    c: round2(baseColor.c * (isBackground ? 0.5 : 1.2)), // Reduce chroma for backgrounds
    h: round2(baseColor.h ?? 0) // 0 as fallback for black
  }

  return {
    oklch: formatCss(
      `oklch(${adjustedColor.l} ${adjustedColor.c} ${adjustedColor.h})`
    ),
    hex: formatHex(
      `oklch(${adjustedColor.l} ${adjustedColor.c} ${adjustedColor.h})`
    )
  }
}

/**
 * Generates the dark mode CSS variables for the brand color shades.
 */
export const generateDarkModeColors = (colorValues: Record<string, string>) => {
  let darkColors = `/* Dark mode colors */\n`

  const ALL_COLORS = [...THEME_BASE_COLORS, ...THEME_BACKGROUND_BASE_COLORS]

  ALL_COLORS.forEach((colorName) => {
    const color = colorValues[colorName]

    if (!color) return
    try {
      let colorValue = color

      if (color.includes('!important')) {
        colorValue = color.split('!important')?.[0]?.trim()
      }

      if (color.startsWith('#') && color.length > 9) {
        colorValue = colorValue.slice(0, 9)
      }

      const rgbConverter = useMode(modeRgb)
      const oklchConverter = useMode(modeOklch)

      const rgbColor = rgbConverter(colorValue) as Rgb
      const baseOklch = oklchConverter(rgbColor) as Oklch

      if (!baseOklch) return

      const { oklch, hex } = generateDarkShade(
        baseOklch,
        THEME_BACKGROUND_BASE_COLORS.includes(colorName)
      )

      darkColors += `
        ${colorName}-oklch: oklch(${baseOklch.l} ${baseOklch.c} ${baseOklch.h ?? 0});\n
        ${colorName}-dark: ${hex};\n
        ${colorName}-dark-oklch: ${oklch};\n
        `
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error processing ${colorName}:`, error)
    }
  })

  return darkColors
}

/**
 * Generates the dark mode styles which turn on dark mode
 */
export function generateDarkModeStyles(
  themeVariables: Record<string, string>,
  darkMode: JourneyDesignTokens['dark_mode']
) {
  if (!darkMode) return ''

  const darkModeSection = [
    ...THEME_BASE_COLORS,
    ...THEME_BACKGROUND_BASE_COLORS
  ]
    .map((colorName) =>
      themeVariables[colorName] ? `${colorName}: var(${colorName}-dark);` : ''
    )
    .join('\n')

  return darkMode === 'user_preference'
    ? `/* Dark mode styles */\n@media (prefers-color-scheme: dark) {\n${darkModeSection}\n}`
    : `/* Dark mode styles */\n${darkModeSection}`
}

export function convertThemeToCssVariables(
  theme: ConcordeTheme,
  designTokens: JourneyDesignTokens
) {
  const darkMode = designTokens?.dark_mode
  const themeVariables = getThemeVariables(theme, designTokens)
  const darkModeColors = generateDarkModeColors(themeVariables)
  const darkModeStyles = generateDarkModeStyles(themeVariables, darkMode)
  const primaryColorShades = generateColorShades(theme.palette.primary)

  const cssVariablesString = `
    body { background-color: var(--concorde-default-background); }
    :root {
        /* Theme variables */
        ${Object.entries(themeVariables)
          .map(
            ([key, value]) => `
        ${key}: ${value};
          `
          )
          .join('\n')}
        ${darkModeColors}
        ${darkModeStyles}
        ${primaryColorShades}
    }
  `

  return cssVariablesString
}
