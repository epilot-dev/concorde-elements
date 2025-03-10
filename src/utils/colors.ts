export function toRgbTuple(color: string) {
  if (!color) {
    return ''
  }

  // Handle gradient format
  if (color.includes('gradient')) {
    const gradientColor = getGradientColor(color)
    const tuple = computeColorToTuple(gradientColor)

    return tuple
  }

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
  const hexRegex = /^#([0-9A-F]{3}){1,2}$/i

  return hexRegex.test(hex)
}
