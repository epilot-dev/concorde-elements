import { useEffect } from 'react'

import type { ConcordeTheme, JourneyDesignTokens } from './types'
import { convertThemeToCssVariables } from './utils'

/**
 * Domain agnostic hook that injects CSS into the document head.
 */
export const useInjectCss = (styleId: string, css: string) => {
  useEffect(() => {
    const trimmedCss = css.trim()

    let styleTag = document.getElementById(styleId)

    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = styleId
      styleTag.textContent = trimmedCss
      document.head.appendChild(styleTag)
    } else if (styleTag.textContent !== trimmedCss) {
      styleTag.textContent = trimmedCss
    }

    return () => styleTag?.remove()
  }, [styleId, css])
}

export const useGlobalStyles = ({
  theme,
  designTokens
}: {
  theme: ConcordeTheme
  designTokens: JourneyDesignTokens
}) => {
  const cssString = convertThemeToCssVariables(theme, designTokens)

  useInjectCss('concorde-globals', cssString)
}
