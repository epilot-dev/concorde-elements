import { describe, it, expect } from 'vitest'

import { toRgbTuple } from '..'

describe('toRgbTuple', () => {
  it('should convert a hex color to an RGB tuple', () => {
    expect(toRgbTuple('#ff0000')).toBe('255, 0, 0')
    expect(toRgbTuple('#00ff00')).toBe('0, 255, 0')
    expect(toRgbTuple('#0000ff')).toBe('0, 0, 255')
  })

  it('should convert a 8-hex color to an RGB tuple', () => {
    expect(toRgbTuple('#ff0000FF')).toBe('255, 0, 0')
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
