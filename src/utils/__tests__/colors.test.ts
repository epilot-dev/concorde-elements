import { describe, it, expect, vi } from 'vitest'

import { getContrastRatio, rgbToHex, toRgbTuple } from '..'

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
})
