import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

import type { RatingProps } from './types'

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

/**
 * Get the hovered value of the rating
 */
export const useHoveredValue = (
  containerRef: RefObject<HTMLDivElement>,
  value: RatingProps['value']
) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    const handleIconMouseEnter = (event: Event) => {
      const iconButton = (event.target as HTMLElement).closest(
        '[data-rating-index]'
      ) as HTMLElement | null

      if (iconButton && container.contains(iconButton)) {
        const ratingIndex = iconButton.getAttribute('data-rating-index')

        if (ratingIndex && hoveredIndex !== Number(ratingIndex)) {
          setHoveredIndex(Number(ratingIndex))
        }
      }
    }

    const handleIconMouseLeave = (event: Event) => {
      const iconButton = (event.target as HTMLElement).closest(
        '[data-rating-index]'
      ) as HTMLElement | null

      if (iconButton && container.contains(iconButton)) {
        setHoveredIndex(null)
      }
    }

    const handleContainerMouseLeave = () => setHoveredIndex(null)

    container.addEventListener('mouseenter', handleIconMouseEnter, true)
    container.addEventListener('mouseleave', handleIconMouseLeave, true)
    container.addEventListener('mouseleave', handleContainerMouseLeave)

    return () => {
      container.removeEventListener('mouseenter', handleIconMouseEnter, true)
      container.removeEventListener('mouseleave', handleIconMouseLeave, true)
      container.removeEventListener('mouseleave', handleContainerMouseLeave)
    }
  }, [containerRef, hoveredIndex])

  return hoveredIndex !== null ? hoveredIndex : value
}
