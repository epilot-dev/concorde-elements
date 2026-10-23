import { describe, it, expect, vi } from 'vitest'

import {
  getContrastRatio,
  rgbToHex,
  toRgbTuple,
  getAlphaContrastRatio,
  blendColors,
  convertColorToHex,
  generateLightColor,
  generateColorShades
} from '..'

describe('toRgbTuple', () => {
  it('should convert a hex color to an RGB tuple', () => {
    expect(toRgbTuple('#ff0000')).toBe('255, 0, 0')
    expect(toRgbTuple('#00ff00')).toBe('0, 255, 0')
    expect(toRgbTuple('#0000ff')).toBe('0, 0, 255')
  })

  it('should convert a 8-hex color to an RGB tuple', () => {
    expect(toRgbTuple('#ff0000FF')).toBe('255, 0, 0')
    expect(toRgbTuple('#ff0000FF232323')).toBe('255, 0, 0')
    expect(toRgbTuple('#00ff00FF')).toBe('0, 255, 0')
    expect(toRgbTuple('#0000ffFF')).toBe('0, 0, 255')
  })

  it('handles invalid value', () => {
    expect(toRgbTuple('#ff00')).toBe('')
    expect(toRgbTuple('null')).toBe('')
    expect(toRgbTuple('0')).toBe('')
  })

  it('should convert a shorthand hex color to an RGB tuple', () => {
    expect(toRgbTuple('#03f')).toBe('0, 51, 255')
    expect(toRgbTuple('#f00')).toBe('255, 0, 0')
  })

  it('should convert transparent colors to white tuple', () => {
    expect(toRgbTuple('transparent')).toBe('255, 255, 255')
    expect(toRgbTuple('transparent !important')).toBe('255, 255, 255')
  })

  it('should handle an rgb string and return the RGB tuple', () => {
    expect(toRgbTuple('rgb(255, 0, 0)')).toBe('255, 0, 0')
    expect(toRgbTuple('rgb(0, 255, 0)')).toBe('0, 255, 0')
    expect(toRgbTuple('rgb(0, 0, 255)')).toBe('0, 0, 255')
    expect(toRgbTuple('rgba(0, 0, 255, .12)')).toBe('0, 0, 255')
    expect(toRgbTuple('rgba(0, 0, 255, .26)')).toBe('0, 0, 255')
  })

  it('should handle an hsl string and return the RGB tuple', () => {
    expect(toRgbTuple('hsl(0, 100%, 50%)')).toBe('255, 0, 0')
    expect(toRgbTuple('hsl(120, 100%, 50%)')).toBe('0, 255, 0')
    expect(toRgbTuple('hsl(240, 100%, 50%)')).toBe('0, 0, 255')
    expect(toRgbTuple('hsla(240, 100%, 50%, 0.12)')).toBe('0, 0, 255')
  })

  it('should extract the first color from a gradient string and return the RGB tuple', () => {
    expect(toRgbTuple('linear-gradient(to right, #ff0000, #00ff00)')).toBe(
      '255, 0, 0'
    )
    expect(
      toRgbTuple('linear-gradient(to right, rgb(0, 255, 0), rgb(255, 0, 0))')
    ).toBe('0, 255, 0')
    expect(
      toRgbTuple('linear-gradient(0.45turn, hsl(93, 62%, 92%), #00ff00)')
    ).toBe('233, 247, 222')
    expect(
      toRgbTuple('linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)')
    ).toBe('63, 135, 166')
  })

  it('should return an empty string for an invalid color formats', () => {
    expect(
      toRgbTuple('linear-gradient(to left, hsl(93%, 62%, 92%), #00ff00)')
    ).toBe('')
    expect(toRgbTuple('abc')).toBe('')
    expect(toRgbTuple('unknowncolor')).toBe('')
    expect(toRgbTuple('12345')).toBe('')
    expect(toRgbTuple('....')).toBe('')
    expect(toRgbTuple('')).toBe('')
  })
})

describe('rgbToHex', () => {
  it('should return the same HEX value if it is already a valid HEX (6 digits)', () => {
    expect(rgbToHex('#FF5733')).toBe('#FF5733')
  })

  it('should return the same HEX value if it is already a valid HEX (3 digits)', () => {
    expect(rgbToHex('#abc')).toBe('#ABC')
  })

  it('should convert rgb(255, 87, 51) to #FF5733', () => {
    expect(rgbToHex('rgb(255, 87, 51)')).toBe('#FF5733')
  })

  it('should convert rgb(0, 0, 0) to #000000', () => {
    expect(rgbToHex('rgb(0, 0, 0)')).toBe('#000000')
  })

  it('should convert rgb(255, 255, 255) to #FFFFFF', () => {
    expect(rgbToHex('rgb(255, 255, 255)')).toBe('#FFFFFF')
  })

  it('return white for an invalid color format', () => {
    expect(rgbToHex('invalidColor')).toBe('#FFFFFF')
    expect(rgbToHex('rgb(255, 255)')).toBe('#FFFFFF')
  })
})

describe('getContrastRatio', () => {
  it('should return 21 for maximum contrast between black and white', () => {
    const result = getContrastRatio('#000000', '#ffffff')

    expect(result).toBeCloseTo(21, 2)
  })

  it('should return 1 for identical colors', () => {
    const result = getContrastRatio('#abcdef', '#abcdef')

    expect(result).toBeCloseTo(1, 2)
  })

  it('should handle 3-digit hex colors', () => {
    const result = getContrastRatio('#000', '#fff')

    expect(result).toBeCloseTo(21, 2)
  })

  it('should correctly calculate contrast between two medium colors', () => {
    const result = getContrastRatio('#888888', '#555555')

    expect(result).toBeGreaterThan(1)
    expect(result).toBeLessThan(4.5)
  })

  it('should handle mixed-case hex formats', () => {
    const result = getContrastRatio('#AbCdEf', '#123456')

    expect(result).toBeGreaterThan(1)
  })

  it('should return a contrast ratio of 1 when both colors are #FFFFFF', () => {
    const result = getContrastRatio('#FFFFFF', '#FFFFFF')

    expect(result).toBeCloseTo(1, 2)
  })

  it('should return 1 for invalid hex formats and log a warning', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    const result = getContrastRatio('invalidColor', '#000000')

    expect(result).toBeCloseTo(1, 2)
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Invalid hex format detected. Returning #FFFFFF.'
    )

    consoleWarnSpy.mockRestore()
  })

  it('should return 1 for invalid rgb format and log a warning', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})

    const result = getContrastRatio('rgb(255, 255, 255)', 'rgb(0, 0, 0)')

    expect(result).toBeCloseTo(1, 2)
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'Invalid hex format detected. Returning #FFFFFF.'
    )

    consoleWarnSpy.mockRestore()
  })

  it('should return a contrast ratio less than 1 for very similar colors', () => {
    const result = getContrastRatio('#010101', '#020202')

    expect(result).toBeGreaterThan(1)
  })

  it('returns similar contrast ratio for same opaque colors regardless of case', () => {
    const ratio1 = getContrastRatio('#ABCDEF', '#123456')
    const ratio2 = getContrastRatio('#abcdef', '#123456')

    expect(ratio1).toEqual(ratio2)
  })

  it('handles same color with different alpha values in contrast calculation', () => {
    const ratioOpaqueVsSemi = getContrastRatio('#FF0000', '#FF000000')

    expect(ratioOpaqueVsSemi).toBeGreaterThan(3.5)
  })

  it('handles two semi-transparent colors with different opacities', () => {
    const ratio = getContrastRatio('#FF000040', '#FF0000C0')

    expect(ratio).toBeGreaterThan(2)
  })
})

describe('getAlphaContrastRatio', () => {
  it('returns a contrast ratio of 1 when a fully transparent color composites to white', () => {
    const ratio = getAlphaContrastRatio('#aaaaaa00', '#ffffff')

    expect(ratio).toBeCloseTo(1, 2)
  })

  it('computes a contrast ratio for semi-transparent black over white', () => {
    const ratio = getAlphaContrastRatio('#00000080', '#ffffff')

    expect(ratio).toBeGreaterThan(1)
    expect(ratio).toBeLessThan(5)
  })

  it('handles both colors having alpha channels', () => {
    const ratio = getAlphaContrastRatio('#ff000080', '#00ff0080')

    expect(ratio).toBeGreaterThan(1)
    expect(ratio).toBeLessThan(10)
  })

  it('returns high contrast for dark vs light colors with alpha', () => {
    const ratio = getAlphaContrastRatio('#00008080', '#ffff0080')

    expect(ratio).toBeGreaterThan(3)
  })

  it('handles same color with different alpha values', () => {
    const ratio = getAlphaContrastRatio('#FF000080', '#FF0000')

    expect(ratio).toBeGreaterThan(1)
    expect(ratio).toBeLessThan(3)
  })

  it('falls back to default (white vs white) when given an invalid hex', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const ratio = getAlphaContrastRatio('#INVALID', '#ffffff')

    expect(ratio).toEqual(1)
    expect(warnSpy).toHaveBeenCalled()
    warnSpy.mockRestore()
  })
})

describe('blendColors', () => {
  it('should blend a color with a background color at 50% alpha', () => {
    expect(blendColors('#ff0000', '#ffffff', 0.5)).toBe('#FF8080')
  })

  it('should blend a color with a background color at 100% alpha', () => {
    expect(blendColors('#00ff00', '#0000ff', 1)).toBe('#00FF00')
  })

  it('should blend a color with a background color at 0% alpha', () => {
    expect(blendColors('#ff0000', '#0000ff', 0)).toBe('#0000FF')
  })

  it('should handle out of range alpha values', () => {
    expect(blendColors('#ff0000', '#ffffff', 1.5)).toBe('#FF0000')
    expect(blendColors('#ff0000', '#ffffff', -0.5)).toBe('#FFFFFF')
  })

  it('should handle various color formats', () => {
    expect(blendColors('rgb(255, 0, 0)', '#ffffff', 0.5)).toBe('#FF8080')
    expect(blendColors('#f00', 'rgb(0, 0, 255)', 0.75)).toBe('#BF0040')
  })

  it('should handle invalid color inputs', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(blendColors('invalid', '#ffffff', 0.5)).toBe('#FFFFFF')
    consoleErrorSpy.mockRestore()
  })
})

describe('convertColorToHex', () => {
  it('should convert named colors to hex', () => {
    expect(convertColorToHex('red')).toBe('#ff0000ff')
    expect(convertColorToHex('blue')).toBe('#0000ffff')
    expect(convertColorToHex('green')).toBe('#008000ff')
    expect(convertColorToHex('yellow')).toBe('#ffff00ff')
  })

  it('should convert rgb colors to hex', () => {
    expect(convertColorToHex('rgba(255, 0, 0, 0.5)')).toBe('#ff000080')
    expect(convertColorToHex('rgb(0, 101, 204)')).toBe('#0065ccff')
    expect(convertColorToHex('rgba(0, 101, 204, 1)')).toBe('#0065ccff')
    expect(convertColorToHex('rgb(255, 255, 255)')).toBe('#ffffffff')
  })

  it('should return the same hex if already in hex format', () => {
    expect(convertColorToHex('#ff0000')).toBe('#ff0000ff')
    expect(convertColorToHex('#ff0000ff')).toBe('#ff0000ff')
  })

  it('should trim long hex values', () => {
    expect(convertColorToHex('#123456789')).toBe('#12345678')
  })

  it("should remove '!important' and still convert correctly", () => {
    expect(convertColorToHex('red !important')).toBe('#ff0000ff')
    expect(convertColorToHex('#ff0000 !important')).toBe('#ff0000ff')
  })

  it('should convert fully transparent colors to the actual colors', () => {
    expect(convertColorToHex('transparent')).toBe('#ffffffff')
    expect(convertColorToHex('rgba(0, 101, 204, 0)')).toBe('#0065cc00')
  })

  it('should return an empty string for invalid colors', () => {
    expect(convertColorToHex('notAColor')).toBe('')
    expect(convertColorToHex('')).toBe('')
  })

  it('should handle null or undefined input gracefully', () => {
    expect(convertColorToHex(null as unknown as string)).toBe('')
    expect(convertColorToHex(undefined as unknown as string)).toBe('')
  })
})

describe('generateLightColor', () => {
  it('should generate a light color', () => {
    expect(generateLightColor('red')).toBe('#ffcdbd')
    expect(generateLightColor('blue')).toBe('#b1e8ff')
    expect(generateLightColor('#005EB4')).toBe('#ebebeb')
    expect(generateLightColor('#000000')).toBe('#ebebeb')
    expect(generateLightColor('#0ac005aa')).toBe('#c5fdbf')
  })

  it("should remove '!important' and still convert correctly", () => {
    expect(generateLightColor('#005EB4 !important')).toBe('#ebebeb')
    expect(generateLightColor('#000000 !important')).toBe('#ebebeb')
    expect(generateLightColor('blue !important')).toBe('#b1e8ff')
  })

  it('should return an empty string for invalid colors', () => {
    expect(generateLightColor('notAColor')).toBe('')
    expect(generateLightColor('')).toBe('')
  })

  it('should handle null or undefined input gracefully', () => {
    expect(generateLightColor(null as unknown as string)).toBe('')
    expect(generateLightColor(undefined as unknown as string)).toBe('')
  })
})

describe('generateColorShades', () => {
  it('should generate color shades', () => {
    const redShades = generateColorShades('red', 'primary')

    expect(redShades).toContain(`/* primary shades */`)
    expect(redShades).toContain(`primary-50: #ffe5de;`)
    expect(redShades).toContain(`primary-100: #ffbfaf;`)
    expect(redShades).toContain(`primary-200: #ff9986;`)
    expect(redShades).toContain(`primary-300: #ff6250;`)
    expect(redShades).toContain(`primary-400: #ff2117;`)
    expect(redShades).toContain(`primary-500: #e60000;`)
    expect(redShades).toContain(`primary-600: #c80000;`)
    expect(redShades).toContain(`primary-700: #aa0000;`)
    expect(redShades).toContain(`primary-800: #8c0000;`)
    expect(redShades).toContain(`primary-900: #6e0000;`)

    const blueShades = generateColorShades('blue', 'primary')

    expect(blueShades).toContain(`/* primary shades */`)
    expect(blueShades).toContain(`primary-50: #e3ebff;`)
    expect(blueShades).toContain(`primary-100: #b9d6ff;`)
    expect(blueShades).toContain(`primary-200: #8fc1ff;`)
    expect(blueShades).toContain(`primary-300: #639dff;`)
    expect(blueShades).toContain(`primary-400: #417eff;`)
    expect(blueShades).toContain(`primary-500: #1a5aff;`)
    expect(blueShades).toContain(`primary-600: #002bff;`)
    expect(blueShades).toContain(`primary-700: #0900ea;`)
    expect(blueShades).toContain(`primary-800: #1900cd;`)
    expect(blueShades).toContain(`primary-900: #2400b1;`)
  })
})
