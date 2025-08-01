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
  '--concorde-accent-color',
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
  '--concorde-toggle-button-border-color',
  '--concorde-disabled-label-text'
]

const THEME_BACKGROUND_BASE_COLORS = [
  '--concorde-default-background',
  '--concorde-topbar-background',
  '--concorde-surface-background',
  '--concorde-neutral-surface',
  '--concorde-loading-background',
  '--concorde-disabled-background',
  '--concorde-product-tile-background-color'
]

const THEME_TEXT_COLORS = [
  '--concorde-primary-text',
  '--concorde-secondary-text',
  '--concorde-disabled-text',
  '--concorde-disabled-label-text'
]

const THEME_SHADOW_COLORS = [
  '--concorde-card-shadow',
  '--concorde-card-shadow-hover'
]

const ALL_COLORS = [...THEME_BASE_COLORS, ...THEME_BACKGROUND_BASE_COLORS]

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
  }),
  '--concorde-disabled-label-text':
    theme.palette.typography.disabled || '#8c9dad',
  '--concorde-loading-background': '#e0e0e0',
  '--concorde-neutral-surface': '#e0e2ec',
  '--concorde-disabled-background': '#e6eef7',
  '--concorde-product-tile-background-color': '#ffffff'
})

/**
 * Generates a dark mode color based on a base OKLCH color.
 */
const generateDarkShade = (
  baseColor: Oklch,
  isBackground = false,
  isTextColor = false
) => {
  let lightnessMultiplier: number
  let chromaMultiplier: number

  if (isBackground) {
    lightnessMultiplier = 0.3 // Darken backgrounds
    chromaMultiplier = 0.5 // Reduce chroma for backgrounds
  } else if (isTextColor) {
    // For text colors, use a more sophisticated approach similar to Dark Reader
    // Target a lightness around 0.75-0.85 for good readability in dark mode
    const targetLightness = 0.8
    const currentLightness = baseColor.l

    if (currentLightness < 0.5) {
      // Dark colors need significant lightening
      lightnessMultiplier = targetLightness / currentLightness
    } else {
      // Lighter colors get moderate adjustment
      lightnessMultiplier = 1.2
    }

    // Slightly reduce chroma for better readability
    chromaMultiplier = 0.8
  } else {
    lightnessMultiplier = 1.5 // Brighten other foreground elements
    chromaMultiplier = 1.2 // Slightly increase chroma
  }

  const adjustedColor = {
    l: round2(Math.min(baseColor.l * lightnessMultiplier, 1)), // Cap at 1.0
    c: round2(baseColor.c * chromaMultiplier),
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

  ALL_COLORS.forEach((colorName) => {
    const color = colorValues[colorName]

    if (!color || color === 'transparent') return

    // Special handling for product tile background color
    if (
      colorName === '--concorde-product-tile-background-color' &&
      color === '#ffffff'
    ) {
      darkColors += `
        ${colorName}-dark: rgb(var(--concorde-primary-color-rgb), 0.1);\n
        `

      return
    }

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
        THEME_BACKGROUND_BASE_COLORS.includes(colorName),
        THEME_TEXT_COLORS.includes(colorName)
      )

      darkColors += `
        ${colorName}-oklch: oklch(${baseOklch.l} ${baseOklch.c} ${baseOklch.h ?? 0});\n
        ${colorName}-dark: ${hex};\n
        ${colorName}-dark-oklch: ${oklch};\n
        `
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error processing ${colorName} (${color}):`, error)
    }
  })

  return darkColors
}

/**
 * Generates dark mode variants for shadow variables.
 */
export const generateDarkModeShadows = (
  shadowValues: Record<string, string>
) => {
  let darkShadows = `/* Dark mode shadows */\n`

  THEME_SHADOW_COLORS.forEach((shadowName) => {
    const shadow = shadowValues[shadowName]

    if (!shadow) return

    // Convert black shadows to white for dark mode
    const darkShadow = shadow.replace(
      /rgba\(0,\s*0,\s*0,/g,
      'rgba(255, 255, 255,'
    )

    darkShadows += `
      ${shadowName}-dark: ${darkShadow};\n
      `
  })

  return darkShadows
}

/**
 * Generates the dark mode styles which turn on dark mode
 */
export function generateDarkModeStyles(
  themeVariables: Record<string, string>,
  darkMode: JourneyDesignTokens['dark_mode']
) {
  if (!darkMode) return ''

  const darkModeSection = [...ALL_COLORS]
    .map((colorName) => {
      return themeVariables[colorName]
        ? `${colorName}: var(${colorName}-dark);`
        : ''
    })
    .join('\n')

  const darkModeShadowsSection = [...THEME_SHADOW_COLORS]
    .map((shadowName) => {
      return themeVariables[shadowName]
        ? `${shadowName}: var(${shadowName}-dark);`
        : ''
    })
    .join('\n')

  return darkMode === 'user_preference'
    ? `/* Dark mode styles */\n@media (prefers-color-scheme: dark) {\n${darkModeSection}\n${darkModeShadowsSection}\n}`
    : `/* Dark mode styles */\n${darkModeSection}\n${darkModeShadowsSection}`
}

export function convertThemeToCssVariables(
  theme: ConcordeTheme,
  designTokens: JourneyDesignTokens
) {
  const darkMode = designTokens?.dark_mode
  const themeVariables = getThemeVariables(theme, designTokens)
  const darkModeColors = generateDarkModeColors(themeVariables)
  const darkModeShadows = generateDarkModeShadows(themeVariables)
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
        ${darkModeShadows}
        ${darkModeStyles}
        ${primaryColorShades}
    }
  `

  return cssVariablesString
}
