import { render } from '@testing-library/react'
import { useContext } from 'react'
import { describe, expect, it } from 'vitest'

import { ThemeContext } from '../context'
import { DefaultConcordeTheme } from '../DefaultConcordeTheme'
import { ThemeProvider } from '../ThemeProvider'
import type { JourneyDesignTokens } from '../types'

const inputVariantOf = (input_variant: string) => {
  let variant: string | undefined
  const Probe = () => {
    variant = useContext(ThemeContext)?.variants?.input

    return null
  }

  render(
    <ThemeProvider designTokens={{ input_variant } as JourneyDesignTokens} theme={DefaultConcordeTheme}>
      <Probe />
    </ThemeProvider>
  )

  return variant
}

describe('ThemeProvider input variant', () => {
  it('keeps the variants Concorde has', () => {
    expect(inputVariantOf('filled')).toBe('filled')
    expect(inputVariantOf('underlined')).toBe('underlined')
  })

  it('shows Spark’s surface input outlined, as Concorde has no such input', () => {
    expect(inputVariantOf('surface')).toBe('outlined')
  })
})
