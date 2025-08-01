import { useEffect, useRef } from 'react'

/**
 * Use the keyboard to navigate the rating
 */
export const useRatingKeyboard = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleKeyboard = useRef((event: KeyboardEvent) => {
    if (!containerRef.current) return
    const { key } = event
    const activeElement = document.activeElement as HTMLElement

    if (!containerRef.current.contains(activeElement)) return
    const parentTooltip = activeElement.parentNode as HTMLElement

    let next: HTMLElement | null = null

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      const nextTooltip = parentTooltip.nextElementSibling as HTMLElement | null

      next = nextTooltip?.childNodes[0] as HTMLElement | null
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      const prevTooltip =
        parentTooltip.previousElementSibling as HTMLElement | null

      next = prevTooltip?.childNodes[0] as HTMLElement | null
    } else {
      return
    }
    if (next && next instanceof HTMLElement) {
      event.preventDefault()
      next.focus()
    }
  })

  useEffect(() => {
    const container = containerRef.current
    const handleKeyboardFunc = handleKeyboard.current

    if (!container) return
    container.addEventListener('keydown', handleKeyboardFunc)

    return () => {
      container.removeEventListener('keydown', handleKeyboardFunc)
    }
  }, [])

  return {
    containerRef
  }
}

/**
 * Get the tab index for a rating option
 */
export const getTabIndex = (
  value: number | undefined,
  isSelected: boolean,
  index: number
) => {
  if (value === undefined || value < 0) {
    return index === 0 ? 0 : -1
  }
  if (isSelected) {
    return 0
  }

  return -1
}
