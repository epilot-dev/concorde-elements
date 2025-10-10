import { useRef } from 'react'

import { useInjectCss } from '../../utils/useInjectCss'

import type { ConcordeTheme, JourneyDesignTokens } from './types'
import { convertThemeToCssVariables } from './utils'

export const GLOBAL_STYLES_STYLE_ID = 'concorde-globals'

export const useGlobalStyles = ({
  theme,
  designTokens,
  darkMode
}: {
  theme: ConcordeTheme
  designTokens: JourneyDesignTokens
  darkMode?: boolean
}) => {
  const cssString = convertThemeToCssVariables(theme, designTokens, darkMode)
  const customCss = designTokens.custom_css

  // Ensure that the concorde globals style tag is always before the custom css style tag
  const observer = useRef<MutationObserver>(
    new MutationObserver(() => {
      const customCSSTag = document.querySelector('[id^="custom-css-"]')
      let concordeGlobalsTag = document.getElementById(GLOBAL_STYLES_STYLE_ID)

      // If concorde globals tag is missing, recreate it
      if (!concordeGlobalsTag) {
        concordeGlobalsTag = document.createElement('style')
        concordeGlobalsTag.id = GLOBAL_STYLES_STYLE_ID
        concordeGlobalsTag.textContent = cssString
        document.head.appendChild(concordeGlobalsTag)

        return
      }

      if (!customCss || !customCSSTag) {
        // If no custom css, ensure that the concorde globals style tag is the last child
        if (document.head.lastChild !== concordeGlobalsTag) {
          document.head.removeChild(concordeGlobalsTag)
          document.head.appendChild(concordeGlobalsTag)
        }

        return
      }

      // If there is a custom css style tag and the concorde globals style tag is the last child, insert it before the custom css style tag
      if (
        document.head.lastChild === customCSSTag &&
        customCSSTag?.previousSibling !== concordeGlobalsTag
      ) {
        document.head.insertBefore(concordeGlobalsTag, customCSSTag)
      }
    })
  )

  useInjectCss(GLOBAL_STYLES_STYLE_ID, cssString, observer.current)
}
