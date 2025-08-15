import { useEffect } from 'react'

/**
 * Domain agnostic hook that injects CSS into the document head.
 */
export const useInjectCss = (styleId: string, css: string) =>
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
