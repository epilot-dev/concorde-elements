import type { Oklch, Rgb } from 'culori/fn'
import { useMode, modeRgb, formatHex8, modeOklch, formatHex } from 'culori/fn'

type RGBA = {
  r: number
  g: number
  b: number
  a: number
}

const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
const LIGHTNESS_ADJUSTMENTS = [94, 88, 82, 72, 64, 56, 48, 40, 32, 24] as const
const MIN_CHROMA = 0.025

/**
 * Rounds a given number to two decimal places.
 */
export const round2 = (value: number): number => Number(value.toFixed(2))

export function toRgbTuple(color: string) {
  if (!color) {
    return ''
  }

  if (color?.includes('transparent')) {
    return '255, 255, 255'
  }

  // Handle gradient format
  if (color.includes('gradient')) {
    const gradientColor = getGradientColor(color)
    const tuple = computeColorToTuple(gradientColor)

    return tuple
  }

  // TODO: Use Culori to get the RGB tuples
  // Handle HSL and RGB formats using the browser's CSS color parsing
  if (color.includes('hsl') || color.includes('rgb')) {
    const tuple = computeColorToTuple(color)

    return tuple
  }

  // Handle hex format
  if (color.startsWith('#')) {
    const tuple = hexToRgbTuple(color)

    return tuple
  }

  return ''
}

// Extract the first color from the gradient string
function getGradientColor(color: string) {
  // Match first hex, rgb or hsl color within the gradient string
  const colorMatch = color.match(
    /#([0-9a-fA-F]{3,6})|rgb\([^)]+\)|hsl\([^)]+\)/
  )

  // If a color is found, extract and process it
  if (colorMatch) {
    return colorMatch[0]
  }

  return ''
}

// Compute the RGB values of a color using the browser's CSS color parsing
function computeColorToTuple(color: string) {
  try {
    const tempElement = document.createElement('div')

    tempElement.style.color = color
    document.body.appendChild(tempElement)
    const computedColor = getComputedStyle(tempElement).color

    document.body.removeChild(tempElement)

    // Extract the RGB values using a regular expression
    const rgbMatch = computedColor.match(/\d+/g)?.map(Number)

    if (!rgbMatch) {
      return ''
    }

    return `${rgbMatch?.[0]}, ${rgbMatch?.[1]}, ${rgbMatch?.[2]}`
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Invalid color format passed', { error })

    return ''
  }
}

// Convert a hex color to RGB values
function hexToRgbTuple(color: string) {
  // Remove the '#' if it's present
  let colorValue = color.slice(1)

  // Expand shorthand hex codes to full form, e.g., #03F -> #0033FF
  if (colorValue.length === 3) {
    colorValue = colorValue
      .split('')
      .map((x) => x + x)
      .join('')
  }

  // Handle RGBA (8-digit hex code)
  if (colorValue.length >= 8) {
    const bigint = parseInt(colorValue.slice(0, 6), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `${r}, ${g}, ${b}`
  }

  // Handle RGB (6-digit hex code)
  if (colorValue.length === 6) {
    const bigint = parseInt(colorValue, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `${r}, ${g}, ${b}`
  }

  return ''
}

export function rgbToHex(color: string) {
  if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
    return color.toUpperCase()
  }

  const rgbMatch = color.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/)

  if (!rgbMatch) return '#FFFFFF'

  const r = parseInt(rgbMatch[1], 10).toString(16).padStart(2, '0')
  const g = parseInt(rgbMatch[2], 10).toString(16).padStart(2, '0')
  const b = parseInt(rgbMatch[3], 10).toString(16).padStart(2, '0')

  return `#${r}${g}${b}`.toUpperCase()
}

export const getContrastRatio = (hex1: string, hex2: string): number => {
  if (!isValidHex(hex1) || !isValidHex(hex2)) {
    // eslint-disable-next-line no-console
    console.warn('Invalid hex format detected. Returning #FFFFFF.')

    return getContrastRatio('#FFFFFF', '#FFFFFF')
  }

  if (hex1.length > 7 || hex2.length > 7) {
    return getAlphaContrastRatio(hex2, hex1)
  }

  const luminance1 = getLuminance(hex1)
  const luminance2 = getLuminance(hex2)

  const ratio =
    luminance1 > luminance2
      ? (luminance2 + 0.05) / (luminance1 + 0.05)
      : (luminance1 + 0.05) / (luminance2 + 0.05)

  return 1 / ratio
}

const getLuminance = (hex: string): number => {
  const [r, g, b] = hexToRgb(hex)

  const a = [r, g, b].map((channel) => {
    channel /= 255

    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

const hexToRgb = (hex: string): [number, number, number] => {
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }

  const bigint = parseInt(hex.slice(1), 16)

  return [
    (bigint >> 16) & 255, // Red
    (bigint >> 8) & 255, // Green
    bigint & 255 // Blue
  ]
}

const isValidHex = (hex: string): boolean => {
  const hexRegex = /^#(?:[0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i

  return hexRegex.test(hex)
}

export const getAlphaContrastRatio = (hex1: string, hex2: string): number => {
  if (!isValidHex(hex1) || !isValidHex(hex2)) {
    // eslint-disable-next-line no-console
    console.warn(
      'Invalid hex format detected. Returning default contrast ratio for white.'
    )

    return getContrastRatio('#FFFFFF', '#FFFFFF')
  }

  const luminance1 = getLuminanceAlpha(hex1)
  const luminance2 = getLuminanceAlpha(hex2)

  const L1 = Math.max(luminance1, luminance2)
  const L2 = Math.min(luminance1, luminance2)

  return (L1 + 0.05) / (L2 + 0.05)
}

const hexToRgba = (hex: string): RGBA => {
  hex = hex.replace('#', '')

  let r,
    g,
    b,
    a = 1

  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 4) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
    a = parseInt(hex[3] + hex[3], 16) / 255
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
  } else if (hex.length === 8) {
    r = parseInt(hex.slice(0, 2), 16)
    g = parseInt(hex.slice(2, 4), 16)
    b = parseInt(hex.slice(4, 6), 16)
    a = parseInt(hex.slice(6, 8), 16) / 255
  } else {
    throw new Error('Invalid hex format')
  }

  return { r, g, b, a }
}

export const blendColors = (
  overlay: string,
  background: string,
  alpha: number
): string => {
  const fg = colorToRgba(overlay, alpha)
  const bg = colorToRgba(background)

  const result = compositeOverBackground(fg, bg)

  return rgbToHex(`rgb(${result.r}, ${result.g}, ${result.b})`)
}

export const colorToRgba = (color: string, alpha = 1): RGBA => {
  const tuple = toRgbTuple(color)

  if (tuple === '') {
    return { r: 0, g: 0, b: 0, a: 0 }
  }
  const [r, g, b] = tuple.split(',').map(Number)
  const a = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha

  return { r, g, b, a }
}

const compositeOverBackground = (
  fg: RGBA,
  bg: { r: number; g: number; b: number }
): { r: number; g: number; b: number } => {
  const r = Math.round(fg.a * fg.r + (1 - fg.a) * bg.r)
  const g = Math.round(fg.a * fg.g + (1 - fg.a) * bg.g)
  const b = Math.round(fg.a * fg.b + (1 - fg.a) * bg.b)

  return { r, g, b }
}

const getLuminanceAlpha = (
  hex: string,
  background = { r: 255, g: 255, b: 255 }
): number => {
  const rgba = hexToRgba(hex)
  let { r, g, b } = rgba
  const alpha = rgba.a

  if (alpha < 1) {
    const composite = compositeOverBackground({ r, g, b, a: alpha }, background)

    r = composite.r
    g = composite.g
    b = composite.b
  }

  const linearize = (channel: number): number => {
    const c = channel / 255

    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }

  const R = linearize(r)
  const G = linearize(g)
  const B = linearize(b)

  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export function convertColorToHex(rawColor: string, removeAlpha = false) {
  let hexColor = ''

  const COLOR: string[] = [rawColor]

  COLOR.forEach((color: string) => {
    if (!color) return

    try {
      let colorValue = color

      if (colorValue.includes('transparent')) {
        colorValue = '#FFFFFF'
      }

      if (colorValue.includes('!important')) {
        colorValue = colorValue.split('!important')?.[0]?.trim()
      }

      if (colorValue.startsWith('#') && colorValue.length > 9) {
        colorValue = colorValue.slice(0, 9)
      }

      const rgbConverter = useMode(modeRgb)

      const rgbColor = rgbConverter(colorValue) as Rgb

      hexColor = formatHex8(rgbColor) || ''
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error processing ${rawColor}:`, error)
    }
  })

  if (removeAlpha) {
    hexColor = hexColor.slice(0, 7)
  }

  return hexColor
}

/**
 * Generates a lighter color based on a base OKLCH color.
 */
const generateLightShade = (baseColor: Oklch) => {
  const chroma = baseColor.c - 0.14
  const adjustedColor = {
    l: round2(94 / 100),
    c: round2(chroma > MIN_CHROMA ? chroma : 0), // 0 as fallback for colors close to black
    h: round2(baseColor.h ?? 0) // 0 as fallback for black
  }

  return formatHex(
    `oklch(${adjustedColor.l} ${adjustedColor.c} ${adjustedColor.h})`
  )
}

/**
 * Generates the lighter color.
 */
export const generateLightColor = (color: string) => {
  const hexColor = convertColorToHex(color)

  if (!hexColor) return ''

  const COLORS = [hexColor]
  let lightColor = ''

  COLORS.forEach((colorValue: string): void => {
    try {
      const rgbConverter = useMode(modeRgb)
      const oklchConverter = useMode(modeOklch)

      const rgbColor = rgbConverter(colorValue) as Rgb
      const baseOklch = oklchConverter(rgbColor) as Oklch

      if (!baseOklch) return

      const hex = generateLightShade(baseOklch)

      lightColor = hex || ''
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error processing ${color}:`, error)
    }
  })

  return lightColor
}

/**
 * Generates the shade color based on a base OKLCH color.
 */
const generateShade = (baseColor: Oklch, index: number) => {
  const targetL = LIGHTNESS_ADJUSTMENTS[index] / 100
  const baseL = baseColor.l

  // If the color is close to black or white, return gray at the target lightness
  if ((baseColor.c || 0) <= MIN_CHROMA) {
    const grayL = round2(targetL)

    return formatHex(`oklch(${grayL} 0 0)`)
  }

  // Otherwise, calculate the chroma/hue shift
  const normalized = Math.max(0, (targetL - baseL) / (1 - baseL))
  const dropOff = 0.75
  let c = Math.max(round2(baseColor.c * (1 - normalized * dropOff)), MIN_CHROMA)

  // Reduce chroma for the lightest shade (50)
  if (index === 0) {
    c = round2(c * 0.3)
  }

  // Reduce chroma for the lightest shade (100)
  if (index === 1) {
    c = round2(c * 0.8)
  }

  const hShift = index < 2 ? (index === 0 ? +5 : +2) : 0
  const h = round2((baseColor.h || 0) + hShift) % 360

  const adjustedColor = {
    l: round2(targetL),
    c: round2(c),
    h: round2(h)
  }

  return formatHex(
    `oklch(${adjustedColor.l} ${adjustedColor.c} ${adjustedColor.h})`
  )
}

/**
 * Generates the color shades of a color.
 */
export const generateColorShades = (
  color: string,
  colorName = '--concorde-primary-color'
) => {
  let colorShades = `/* ${colorName} shades */\n`
  const hexColor = convertColorToHex(color)

  if (!hexColor) return ''

  SHADE_STEPS.forEach((shade, index) => {
    try {
      const rgbConverter = useMode(modeRgb)
      const oklchConverter = useMode(modeOklch)

      const rgbColor = rgbConverter(hexColor) as Rgb
      const baseOklch = oklchConverter(rgbColor) as Oklch

      if (!baseOklch) return

      const hex = generateShade(baseOklch, index)

      colorShades += `
        ${colorName}-${shade}: ${hex};\n
      `
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error processing ${color}:`, error)
    }
  })

  return colorShades
}
