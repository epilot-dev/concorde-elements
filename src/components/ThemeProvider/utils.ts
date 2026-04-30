import { formatCss, formatHex, useMode, modeRgb, modeOklch } from 'culori/fn'
import type { Rgb, Oklch } from 'culori/fn'

import globalCss from '../../global.css?raw'
import {
  blendColors,
  convertColorToHex,
  generateColorShades,
  round2,
  toRgbTuple
} from '../../utils'

import type { ConcordeTheme, JourneyDesignTokens } from './types'

const THEME_RGB_COLORS = [
  '--concorde-primary-color-rgb',
  '--concorde-secondary-color-rgb',
  '--concorde-default-background-rgb',
  '--concorde-primary-text-rgb',
  '--concorde-secondary-text-rgb',
  '--concorde-error-color-rgb'
]

const THEME_BASE_COLORS = [
  // Brand / semantic colors
  '--concorde-primary-color',
  '--concorde-accent-color',
  '--concorde-secondary-color',
  '--concorde-disabled-color',
  '--concorde-error-color',
  '--concorde-outline',
  '--concorde-divider-color',
  '--concorde-coupon-discount-color',
  '--concorde-coupon-cashback-color',
  // Text colors
  '--concorde-primary-button-background-color',
  '--concorde-primary-button-hover-bg-color',
  '--concorde-primary-text',
  '--concorde-secondary-text',
  '--concorde-disabled-text',
  '--concorde-disabled-label-text',
  '--concorde-button-default-text',
  '--concorde-heading-color',
  '--concorde-link-color',
  '--concorde-link-hover-color',
  '--concorde-input-color',
  '--concorde-input-label-color',
  '--concorde-primary-button-text-color',
  '--concorde-primary-button-hover-text-color',
  '--concorde-outlined-button-text-color',
  '--concorde-outlined-button-hover-text-color',
  '--concorde-ghost-button-text-color',
  '--concorde-ghost-button-hover-text-color',
  '--concorde-toggle-button-selected-text-color',
  '--concorde-toggle-button-hover-text-color',
  '--concorde-menu-item-hover-color',
  '--concorde-menu-item-selected-color',
  '--concorde-checkbox-label-color',
  '--concorde-radio-label-color',
  '--concorde-datepicker-selected-color',
  '--concorde-chip-text-color',
  '--concorde-chip-hover-text-color',
  // Icon/thumb colors for form controls
  '--concorde-switch-unchecked-color',
  '--concorde-checkbox-unchecked-color',
  '--concorde-radio-unchecked-color',
  // Border colors
  '--concorde-input-border-color',
  '--concorde-toggle-button-border-color',
  '--concorde-outlined-button-border-color',
  '--concorde-card-border-color'
]

const THEME_BACKGROUND_BASE_COLORS = [
  '--concorde-default-background',
  '--concorde-topbar-background',
  '--concorde-surface-background',
  '--concorde-neutral-surface',
  '--concorde-loading-background',
  '--concorde-disabled-background',
  '--concorde-product-tile-background-color',
  '--concorde-skeleton-bg-from',
  '--concorde-skeleton-bg-to',
  '--concorde-card-default-background',
  // Input backgrounds
  '--concorde-input-background-color',
  // Outlined button hover bg
  '--concorde-primary-button-hover-bg-color',
  '--concorde-primary-button-background-color',
  '--concorde-outlined-button-hover-bg-color',
  '--concorde-ghost-button-hover-bg-color',
  '--concorde-ghost-button-background-color',
  // Card backgrounds
  '--concorde-card-background-color',
  '--concorde-card-hover-background-color',
  '--concorde-summary-block-bg-color',
  // Toggle button backgrounds
  '--concorde-toggle-button-selected-bg-color',
  '--concorde-toggle-button-hover-bg-color',
  // Menu/Dropdown backgrounds
  '--concorde-menu-item-hover-bg-color',
  '--concorde-menu-item-selected-bg-color',
  // Switch unchecked background
  '--concorde-switch-unchecked-background-color',
  // Datepicker selected background
  '--concorde-datepicker-selected-bg-color',
  // Chip backgrounds
  '--concorde-chip-background-color',
  '--concorde-chip-hover-background-color'
]

const THEME_TEXT_COLORS = [
  '--concorde-primary-text',
  '--concorde-secondary-text',
  '--concorde-disabled-text',
  '--concorde-disabled-label-text',
  '--concorde-button-default-text',
  '--concorde-accent-color',
  '--concorde-primary-color',
  '--concorde-secondary-color',
  '--concorde-signature-pen-color',
  '--concorde-error-color',
  // Heading and link colors
  '--concorde-heading-color',
  '--concorde-link-color',
  '--concorde-link-hover-color',
  // Input text colors
  '--concorde-input-color',
  '--concorde-input-label-color',
  // Button text colors
  '--concorde-primary-button-text-color',
  '--concorde-primary-button-hover-text-color',
  '--concorde-outlined-button-text-color',
  '--concorde-outlined-button-hover-text-color',
  '--concorde-ghost-button-text-color',
  '--concorde-ghost-button-hover-text-color',
  // Toggle button text colors
  '--concorde-toggle-button-selected-text-color',
  '--concorde-toggle-button-hover-text-color',
  // Menu/Dropdown text colors
  '--concorde-menu-item-hover-color',
  '--concorde-menu-item-selected-color',
  // Checkbox/Radio label colors
  '--concorde-checkbox-label-color',
  '--concorde-radio-label-color',
  // Datepicker selected text
  '--concorde-datepicker-selected-color',
  // Chip text colors
  '--concorde-chip-text-color',
  '--concorde-chip-hover-text-color'
]

const THEME_SHADOW_COLORS = [
  '--concorde-card-shadow',
  '--concorde-card-shadow-hover',
  '--concorde-image-stepper-button-shadow'
]

const ALL_COLORS = [
  ...THEME_BASE_COLORS,
  ...THEME_BACKGROUND_BASE_COLORS,
  ...THEME_RGB_COLORS
]

const FONT_SIZE_SCALE_MULTIPLIERS: Record<string, number> = {
  xs: 0.8,
  sm: 0.9,
  md: 1.0,
  lg: 1.1,
  xl: 1.2
}

const BASE_FONT_SIZES: Record<string, number> = {
  '--concorde-text-3xl': 2,
  '--concorde-text-2xl': 1.75,
  '--concorde-text-xl': 1.5,
  '--concorde-text-lg': 1.25,
  '--concorde-text-base': 1,
  '--concorde-text-sm': 0.875,
  '--concorde-text-xs': 0.75
}

/**
 * Returns scaled --concorde-text-* variables for a given font_size_scale token.
 * Returns empty object for 'md' (default) or undefined scale.
 */
const getFontSizeVariables = (
  scale?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
): Record<string, string> => {
  if (!scale || scale === 'md') return {}

  const multiplier = FONT_SIZE_SCALE_MULTIPLIERS[scale]

  return Object.fromEntries(
    Object.entries(BASE_FONT_SIZES).map(([key, baseRem]) => [
      key,
      `${round2(baseRem * multiplier)}rem`
    ])
  )
}

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
  '--concorde-button-default-text': '#ffffff',
  '--concorde-loading-background': '#e0e0e0',
  '--concorde-neutral-surface': '#e0e2ec',
  '--concorde-disabled-background': '#e6eef7',
  '--concorde-product-tile-background-color': '#ffffff',
  '--concorde-skeleton-bg-from': '#f0f0f0',
  '--concorde-skeleton-bg-to': '#e8e8e8',
  '--concorde-card-shadow':
    '0 0 1px rgba(0, 0, 0, 0.12), 0 8px 48px rgba(0, 0, 0, 0.08)',
  '--concorde-card-shadow-hover':
    '0 0 1px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.16)',
  '--concorde-signature-pen-color': '#005eb4',
  '--concorde-card-default-background': convertColorToHex(
    theme.palette.background.paper,
    true
  ),

  // ─── Design token overrides ────────────────────────────────────────────────

  // Colors & Semantic
  ...(designTokens.accent_color && {
    '--concorde-accent-color': designTokens.accent_color
  }),
  ...(designTokens.outline_color && {
    '--concorde-outline': designTokens.outline_color
  }),
  ...(designTokens.divider_color && {
    '--concorde-divider-color': designTokens.divider_color
  }),
  ...(designTokens.link_color && {
    '--concorde-link-color': designTokens.link_color
  }),
  ...(designTokens.link_hover_color && {
    '--concorde-link-hover-color': designTokens.link_hover_color
  }),

  // Typography
  ...getFontSizeVariables(designTokens.font_size_scale),

  // Topbar / Navigation
  ...(designTokens.topbar_height !== undefined && {
    '--concorde-topbar-height': `${designTokens.topbar_height}px`
  }),
  ...(designTokens.topbar_logo_alignment && {
    '--concorde-topbar-logo-alignment': designTokens.topbar_logo_alignment
  }),

  // Logo
  ...(designTokens.logo_size !== undefined && {
    '--concorde-logo-size': `${designTokens.logo_size}px`
  }),

  // Step Header
  // Inputs
  ...(designTokens.input_background && {
    '--concorde-input-background-color': designTokens.input_background
  }),
  ...(designTokens.input_border_color && {
    '--concorde-input-border-color': designTokens.input_border_color
  }),
  ...(designTokens.input_text_color && {
    '--concorde-input-color': designTokens.input_text_color
  }),
  ...(designTokens.input_label_color && {
    '--concorde-input-label-color': designTokens.input_label_color
  }),
  ...(designTokens.input_border_radius !== undefined && {
    '--concorde-input-border-radius': `${designTokens.input_border_radius}px`
  }),
  ...(designTokens.input_height !== undefined && {
    '--concorde-input-height': `${designTokens.input_height}px`
  }),

  // Buttons — Primary
  ...(designTokens.button_primary_bg && {
    '--concorde-primary-button-background-color': designTokens.button_primary_bg
  }),
  ...(designTokens.button_primary_text && {
    '--concorde-button-default-text': designTokens.button_primary_text,
    '--concorde-primary-button-text-color': designTokens.button_primary_text
  }),
  ...(designTokens.button_primary_hover_bg && {
    '--concorde-primary-button-hover-bg-color':
      designTokens.button_primary_hover_bg
  }),
  ...(designTokens.button_primary_hover_text && {
    '--concorde-primary-button-hover-text-color':
      designTokens.button_primary_hover_text
  }),

  // Buttons — Outlined
  ...(designTokens.button_outlined_border && {
    '--concorde-outlined-button-border-color':
      designTokens.button_outlined_border
  }),
  ...(designTokens.button_outlined_text && {
    '--concorde-outlined-button-text-color': designTokens.button_outlined_text
  }),
  ...(designTokens.button_outlined_hover_bg && {
    '--concorde-outlined-button-hover-bg-color':
      designTokens.button_outlined_hover_bg
  }),
  ...(designTokens.button_outlined_hover_text && {
    '--concorde-outlined-button-hover-text-color':
      designTokens.button_outlined_hover_text
  }),

  // Buttons — Ghost
  ...(designTokens.button_ghost_bg && {
    '--concorde-ghost-button-background-color': designTokens.button_ghost_bg
  }),
  ...(designTokens.button_ghost_text && {
    '--concorde-ghost-button-text-color': designTokens.button_ghost_text
  }),
  ...(designTokens.button_ghost_hover_bg && {
    '--concorde-ghost-button-hover-bg-color': designTokens.button_ghost_hover_bg
  }),
  ...(designTokens.button_ghost_hover_text && {
    '--concorde-ghost-button-hover-text-color':
      designTokens.button_ghost_hover_text
  }),

  // Buttons — Shared
  ...(designTokens.button_border_radius !== undefined && {
    '--concorde-button-border-radius': `${designTokens.button_border_radius}px`
  }),
  ...(designTokens.button_height !== undefined && {
    '--concorde-button-height': `${designTokens.button_height}px`
  }),

  // Cards
  ...(designTokens.card_background && {
    '--concorde-card-background-color': designTokens.card_background
  }),
  ...(designTokens.card_border_color && {
    '--concorde-card-border-color': designTokens.card_border_color
  }),
  ...(designTokens.summary_card_background && {
    '--concorde-summary-block-bg-color': designTokens.summary_card_background
  }),

  // Toggle Group
  ...(designTokens.toggle_border_color && {
    '--concorde-toggle-button-border-color': designTokens.toggle_border_color
  }),
  ...(designTokens.toggle_selected_bg && {
    '--concorde-toggle-button-selected-bg-color':
      designTokens.toggle_selected_bg
  }),
  ...(designTokens.toggle_selected_text && {
    '--concorde-toggle-button-selected-text-color':
      designTokens.toggle_selected_text
  }),
  ...(designTokens.toggle_hover_bg && {
    '--concorde-toggle-button-hover-bg-color': designTokens.toggle_hover_bg
  }),
  ...(designTokens.toggle_hover_text && {
    '--concorde-toggle-button-hover-text-color': designTokens.toggle_hover_text
  }),

  // Dropdown / Menu
  ...(designTokens.dropdown_hover_bg && {
    '--concorde-menu-item-hover-bg-color': designTokens.dropdown_hover_bg
  }),
  ...(designTokens.dropdown_hover_text && {
    '--concorde-menu-item-hover-color': designTokens.dropdown_hover_text
  }),
  ...(designTokens.dropdown_selected_bg && {
    '--concorde-menu-item-selected-bg-color': designTokens.dropdown_selected_bg
  }),
  ...(designTokens.dropdown_selected_text && {
    '--concorde-menu-item-selected-color': designTokens.dropdown_selected_text
  }),

  // Switch
  ...(designTokens.switch_unchecked_color && {
    '--concorde-switch-unchecked-color': designTokens.switch_unchecked_color
  }),
  ...(designTokens.switch_unchecked_bg && {
    '--concorde-switch-unchecked-background-color':
      designTokens.switch_unchecked_bg
  }),
  ...(designTokens.switch_border_radius !== undefined && {
    '--concorde-switch-border-radius': `${designTokens.switch_border_radius}px`
  }),

  // Checkbox / Radio
  ...(designTokens.checkbox_unchecked_color && {
    '--concorde-checkbox-unchecked-color': designTokens.checkbox_unchecked_color
  }),
  ...(designTokens.checkbox_label_color && {
    '--concorde-checkbox-label-color': designTokens.checkbox_label_color
  }),
  ...(designTokens.radio_unchecked_color && {
    '--concorde-radio-unchecked-color': designTokens.radio_unchecked_color
  }),
  ...(designTokens.radio_label_color && {
    '--concorde-radio-label-color': designTokens.radio_label_color
  }),

  // Date Picker
  ...(designTokens.datepicker_selected_bg && {
    '--concorde-datepicker-selected-bg-color':
      designTokens.datepicker_selected_bg
  }),
  ...(designTokens.datepicker_selected_color && {
    '--concorde-datepicker-selected-color':
      designTokens.datepicker_selected_color
  }),
  ...(designTokens.datepicker_border_radius !== undefined && {
    '--concorde-datepicker-border-radius': `${designTokens.datepicker_border_radius}px`
  }),

  // Chip
  '--concorde-chip-background-color': designTokens.chip_background || '#f7f7f7',
  ...(designTokens.chip_hover_background && {
    '--concorde-chip-hover-background-color': designTokens.chip_hover_background
  }),
  ...(designTokens.chip_text_color && {
    '--concorde-chip-text-color': designTokens.chip_text_color
  }),
  ...(designTokens.chip_hover_text_color && {
    '--concorde-chip-hover-text-color': designTokens.chip_hover_text_color
  })
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
    let targetLightness = 0.8
    const currentLightness = baseColor.l

    if (currentLightness === 0) {
      // Special case for pure black - set to target lightness directly
      const adjustedColor = {
        l: targetLightness,
        c: baseColor.c,
        h: baseColor.h ?? 0
      }

      return {
        oklch: formatCss(
          `oklch(${adjustedColor.l} ${adjustedColor.c} ${adjustedColor.h})`
        ),
        hex: formatHex(
          `oklch(${adjustedColor.l} ${adjustedColor.c} ${adjustedColor.h})`
        )
      }
    } else if (currentLightness < 0.5) {
      // Dark colors need significant lightening
      lightnessMultiplier = targetLightness / currentLightness
    } else if (currentLightness < 0.8) {
      // Lighter colors get moderate adjustment
      lightnessMultiplier = 1.2
    } else {
      // For very light colors like white, set to 0.2
      targetLightness = 0.2
      lightnessMultiplier = targetLightness / currentLightness
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
        ${colorName}-dark: rgb(var(--concorde-primary-color-rgb), 0.05);\n
        `

      return
    }

    // Special handling for topbar background color
    if (colorName === '--concorde-topbar-background') {
      darkColors += `
        ${colorName}-dark: var(--concorde-default-background);\n
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

      // Handle rgs tuple if it exists
      if (THEME_RGB_COLORS.includes(`${colorName}-rgb`) && hex) {
        darkColors += `
          ${colorName}-rgb-dark: ${toRgbTuple(hex)};\n
          `
      }
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

    // Use fixed shadow value for dark mode
    const darkShadow = `inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)`

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
  darkMode?: boolean
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

  return `/* Dark mode styles */\n${darkModeSection}\n${darkModeShadowsSection}`
}

/**
 * Replaces :root with :host for shadow DOM global.css variables.
 * TODO: Add e2e tests for shadow DOM CSS injection.
 */
function getBaseGlobalStyles(isInShadowDOM?: boolean): string {
  if (!isInShadowDOM) return ''

  return `
    /* Base global styles */
    ${globalCss.replace(/:root/g, ':host')}
  `
}

export function convertThemeToCssVariables(
  theme: ConcordeTheme,
  designTokens: JourneyDesignTokens,
  darkMode?: boolean,
  isInShadowDOM?: boolean
) {
  const themeVariables = getThemeVariables(theme, designTokens)
  const darkModeColors = generateDarkModeColors(themeVariables)
  const darkModeShadows = generateDarkModeShadows(themeVariables)
  const darkModeStyles = generateDarkModeStyles(themeVariables, darkMode)
  const primaryColorShades = generateColorShades(theme.palette.primary)

  const rootSelector = isInShadowDOM ? ':host' : ':root'
  const bodySelector = isInShadowDOM ? ':host > div' : 'body'

  // Shadow DOM global.css variables
  const baseGlobalStyles = getBaseGlobalStyles(isInShadowDOM)

  const cssVariablesString = `
    ${baseGlobalStyles}
    /* Theme overrides */
    ${rootSelector} {
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
    ${bodySelector} { background-color: var(--concorde-default-background); }
  `

  return cssVariablesString
}
