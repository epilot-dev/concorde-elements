import { useEffect } from 'react'

/**
 * Domain agnostic hook that injects CSS into the document head.
 */
export const useInjectCss = (
  styleId: string,
  css?: string,
  observer?: MutationObserver
) =>
  useEffect(() => {
    const trimmedCss = css?.trim()

    if (!trimmedCss) {
      return
    }

    let styleTag = document.getElementById(styleId)

    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = styleId
      styleTag.textContent = trimmedCss
      document.head.appendChild(styleTag)
    } else if (styleTag.textContent !== trimmedCss) {
      styleTag.textContent = trimmedCss
    }

    if (observer) {
      observer.observe(document.head, { childList: true })
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [styleId, css, observer])
