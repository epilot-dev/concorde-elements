import { useEffect } from 'react'

/**
 * How many mounted hooks currently share each style tag. Two instances can
 * overlap for a moment, e.g. the journey page rendered as a Suspense fallback
 * and again inside the resolved lazy shell: the one that unmounts must not
 * pull the tag from under the one that stays.
 */
const holders = new Map<string, number>()

/**
 * Domain agnostic hook that injects CSS into the document head.
 *
 * One tag per `styleId`: the id names a singleton (e.g. the journey's
 * `@font-face` rules), so every holder of an id is expected to derive the
 * same css from the same source. The latest writer wins, as before; the
 * hook does not merge rules from different holders.
 */
export const useInjectCss = (styleId: string, css?: string) =>
  useEffect(() => {
    const trimmedCss = css?.trim() || ''

    let styleTag = document.getElementById(styleId)

    if (!trimmedCss) {
      if (styleTag && !holders.get(styleId)) styleTag.remove()

      return
    }

    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = styleId
      styleTag.textContent = trimmedCss
      document.head.appendChild(styleTag)
    } else if (styleTag.textContent !== trimmedCss) {
      styleTag.textContent = trimmedCss
    }

    holders.set(styleId, (holders.get(styleId) ?? 0) + 1)

    return () => {
      const left = (holders.get(styleId) ?? 1) - 1

      if (left > 0) {
        holders.set(styleId, left)

        return
      }

      holders.delete(styleId)
      document.getElementById(styleId)?.remove()
    }
  }, [styleId, css])
