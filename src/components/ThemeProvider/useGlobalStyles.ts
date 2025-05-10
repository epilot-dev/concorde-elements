import { useEffect } from 'react'

import type { ConcordeTheme, JourneyDesignTokens } from './types'
import { convertThemeToCssVariables } from './utils'

export const useGlobalStyles = ({
  theme,
  designTokens
}: {
  theme: ConcordeTheme
  designTokens: JourneyDesignTokens
}) => {
  const cssString = convertThemeToCssVariables(theme, designTokens)

  useEffect(() => {
    const styleId = 'concorde-globals'
    let styleTag = document.getElementById(styleId)

    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = styleId
      styleTag.textContent = cssString
      document.head.appendChild(styleTag)
    } else {
      styleTag.textContent = cssString
    }

    return () => {
      if (styleTag) {
        styleTag.remove()
      }
    }
  }, [cssString])
}
