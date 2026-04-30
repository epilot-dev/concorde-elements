import type { CSSProperties, ReactNode } from 'react'

import type { ThemeCardVariant, InputVariant } from '..'

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

  /**
   * Default component variants applied globally.
   * Individual components can override via their own `variant` prop.
   */
  variants?: {
    input?: InputVariant
    card?: ThemeCardVariant
  }
}

export type JourneyDesignTokens = {
  // EXISTING
  coupon?: string
  cashback?: string
  custom_css?: string

  // ─── COLORS & SEMANTIC ────────────────────────────────
  /** Accent color — maps to --concorde-accent-color, defaults to primary */
  accent_color?: string
  /** Global border/outline color — maps to --concorde-outline */
  outline_color?: string
  /** Divider line color — maps to --concorde-divider-color */
  divider_color?: string
  /** Link text color — maps to --concorde-link-color */
  link_color?: string
  /** Link hover color — maps to --concorde-link-hover-color */
  link_hover_color?: string

  // ─── TYPOGRAPHY ───────────────────────────────────────
  /** Proportional font size scale applied to all --concorde-text-* variables */
  font_size_scale?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  // ─── TOPBAR / NAVIGATION ───────────────────────────────
  /** Topbar minimum height in px — maps to --concorde-topbar-height */
  topbar_height?: number
  /** Topbar/logo alignment — maps to --concorde-topbar-logo-alignment */
  topbar_logo_alignment?: 'flex-start' | 'center' | 'flex-end'

  // ─── LOGO ─────────────────────────────────────────────
  /** Logo height in px — maps to --concorde-logo-size */
  logo_size?: number

  // ─── INPUTS ───────────────────────────────────────────
  /** Input background color — maps to --concorde-input-background-color */
  input_background?: string
  /** Input border color; use 'transparent' to remove border — maps to --concorde-input-border-color */
  input_border_color?: string
  /** Input text color — maps to --concorde-input-color */
  input_text_color?: string
  /** Input label color — maps to --concorde-input-label-color */
  input_label_color?: string
  /** Input border radius in px — maps to --concorde-input-border-radius */
  input_border_radius?: number
  /** Input height in px — maps to --concorde-input-height */
  input_height?: number
  /** Input visual variant (structural CSS) */
  input_variant?: InputVariant

  // ─── BUTTONS — PRIMARY ────────────────────────────────
  /** Primary button background; supports solid colors or CSS gradients — maps to --concorde-primary-button-background-color */
  button_primary_bg?: string
  /** Primary button text color — maps to --concorde-primary-button-text-color */
  button_primary_text?: string
  /** Primary button hover background; supports gradients — maps to --concorde-primary-button-hover-bg-color */
  button_primary_hover_bg?: string
  /** Primary button hover text color — maps to --concorde-primary-button-hover-text-color */
  button_primary_hover_text?: string

  // ─── BUTTONS — OUTLINED ──────────────────────────────
  /** Outlined button border color — maps to --concorde-outlined-button-border-color */
  button_outlined_border?: string
  /** Outlined button text color — maps to --concorde-outlined-button-text-color */
  button_outlined_text?: string
  /** Outlined button hover background — maps to --concorde-outlined-button-hover-bg-color */
  button_outlined_hover_bg?: string
  /** Outlined button hover text color — maps to --concorde-outlined-button-hover-text-color */
  button_outlined_hover_text?: string

  // ─── BUTTONS — GHOST ──────────────────────────────────
  /** Ghost button background — maps to --concorde-ghost-button-background-color */
  button_ghost_bg?: string
  /** Ghost button text color — maps to --concorde-ghost-button-text-color */
  button_ghost_text?: string
  /** Ghost button hover background — maps to --concorde-ghost-button-hover-bg-color */
  button_ghost_hover_bg?: string
  /** Ghost button hover text color — maps to --concorde-ghost-button-hover-text-color */
  button_ghost_hover_text?: string

  // ─── BUTTONS — SHARED ────────────────────────────────
  /** Button border radius in px — maps to --concorde-button-border-radius */
  button_border_radius?: number
  /** Button height in px — maps to --concorde-button-height */
  button_height?: number

  // ─── CARDS ────────────────────────────────────────────
  /** Card background color — maps to --concorde-card-background-color */
  card_background?: string
  /** Card border color for outlined variant — maps to --concorde-card-border-color */
  card_border_color?: string
  /** Card visual variant — shadow (default) or outlined */
  card_variant?: ThemeCardVariant
  /** Summary card background color — maps to --concorde-summary-block-bg-color */
  summary_card_background?: string

  // ─── TOGGLE GROUP ─────────────────────────────────────
  /** Toggle button group border color — maps to --concorde-toggle-button-border-color */
  toggle_border_color?: string
  /** Toggle button selected/active background — maps to --concorde-toggle-button-selected-bg-color */
  toggle_selected_bg?: string
  /** Toggle button selected text color — maps to --concorde-toggle-button-selected-text-color */
  toggle_selected_text?: string
  /** Toggle button hover background — maps to --concorde-toggle-button-hover-bg-color */
  toggle_hover_bg?: string
  /** Toggle button hover text color — maps to --concorde-toggle-button-hover-text-color */
  toggle_hover_text?: string

  // ─── DROPDOWN / MENU ──────────────────────────────────
  /** Dropdown/menu item hover background — maps to --concorde-menu-item-hover-bg-color */
  dropdown_hover_bg?: string
  /** Dropdown/menu item hover text color — maps to --concorde-menu-item-hover-text-color */
  dropdown_hover_text?: string
  /** Dropdown/menu item selected background — maps to --concorde-menu-item-selected-bg-color */
  dropdown_selected_bg?: string
  /** Dropdown/menu item selected text color — maps to --concorde-menu-item-selected-text-color */
  dropdown_selected_text?: string

  // ─── SWITCH ───────────────────────────────────────────
  /** Switch thumb color when unchecked — maps to --concorde-switch-unchecked-color */
  switch_unchecked_color?: string
  /** Switch track color when unchecked — maps to --concorde-switch-unchecked-background-color */
  switch_unchecked_bg?: string
  /** Switch border radius in px — maps to --concorde-switch-border-radius */
  switch_border_radius?: number

  // ─── CHECKBOX / RADIO ─────────────────────────────────
  /** Checkbox border color when unchecked — maps to --concorde-checkbox-unchecked-color */
  checkbox_unchecked_color?: string
  /** Checkbox label text color — maps to --concorde-checkbox-label-color */
  checkbox_label_color?: string
  /** Radio border color when unchecked — maps to --concorde-radio-unchecked-color */
  radio_unchecked_color?: string
  /** Radio label text color — maps to --concorde-radio-label-color */
  radio_label_color?: string

  // ─── DATE PICKER ──────────────────────────────────────
  /** Date picker selected day background — maps to --concorde-datepicker-selected-bg-color */
  datepicker_selected_bg?: string
  /** Date picker selected day text color — maps to --concorde-datepicker-selected-color */
  datepicker_selected_color?: string
  /** Date picker border radius in px — maps to --concorde-datepicker-border-radius */
  datepicker_border_radius?: number

  // ─── CHIP ─────────────────────────────────────────────
  /** Chip background color — maps to --concorde-chip-background-color */
  chip_background?: string
  /** Chip hover background color — maps to --concorde-chip-hover-background-color */
  chip_hover_background?: string
  /** Chip text color — maps to --concorde-chip-text-color */
  chip_text_color?: string
  /** Chip hover text color — maps to --concorde-chip-hover-text-color */
  chip_hover_text_color?: string
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
