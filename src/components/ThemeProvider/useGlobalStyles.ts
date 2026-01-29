import { useEffect } from 'react'

import { useStyleInjection } from '../StyleInjectionProvider'

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
  const { getStyleContainer } = useStyleInjection()
  const styleContainer = getStyleContainer()
  const isInShadowDOM = styleContainer !== document.head

  const cssString = convertThemeToCssVariables(
    theme,
    designTokens,
    darkMode,
    isInShadowDOM
  )
  const customCss = designTokens.custom_css

  useEffect(() => {
    const trimmedCss = cssString?.trim() || ''

    let styleTag = styleContainer.querySelector(`#${GLOBAL_STYLES_STYLE_ID}`)

    if (styleTag && !trimmedCss) {
      styleTag.remove()
    } else if (!styleTag && trimmedCss) {
      styleTag = document.createElement('style')
      styleTag.id = GLOBAL_STYLES_STYLE_ID
      styleTag.textContent = trimmedCss
      styleContainer.appendChild(styleTag)
    } else if (styleTag && styleTag.textContent !== trimmedCss) {
      styleTag.textContent = trimmedCss
    }

    // Ensure that the concorde globals style tag is always before the custom css style tag
    const observer = new MutationObserver(() => {
      const customCSSTag = styleContainer.querySelector(
        'style[id^="custom-css-"]'
      )
      let concordeGlobalsTag = styleContainer.querySelector(
        `#${GLOBAL_STYLES_STYLE_ID}`
      )

      // If concorde globals tag is missing, recreate it
      if (!concordeGlobalsTag) {
        concordeGlobalsTag = document.createElement('style')
        concordeGlobalsTag.id = GLOBAL_STYLES_STYLE_ID
        concordeGlobalsTag.textContent = cssString
        styleContainer.appendChild(concordeGlobalsTag)

        return
      }

      if (!concordeGlobalsTag) {
        return
      }

      if (!customCss || !customCSSTag) {
        // If no custom css, ensure that the concorde globals style tag is the last child
        if (styleContainer.lastChild !== concordeGlobalsTag) {
          styleContainer.removeChild(concordeGlobalsTag)
          styleContainer.appendChild(concordeGlobalsTag)
        }

        return
      }

      // If there is a custom css style tag and the concorde globals style tag is the last child, insert it before the custom css style tag
      if (
        styleContainer.lastChild === customCSSTag &&
        customCSSTag?.previousSibling !== concordeGlobalsTag
      ) {
        styleContainer.insertBefore(concordeGlobalsTag, customCSSTag)
      }
    })

    // Observe the last child
    observer.observe(styleContainer, { childList: true })

    return () => {
      styleTag?.remove()
      if (observer) {
        observer.disconnect()
      }
    }
  }, [cssString, customCss, styleContainer])
}
