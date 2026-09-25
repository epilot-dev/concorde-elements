import { useEffect, useRef, useState } from 'react'

import type { InputProps } from '../types'

export const useInputSuffix = ({
  floatingLabel,
  endAdornment,
  value
}: Pick<InputProps, 'floatingLabel' | 'endAdornment' | 'value'>) => {
  const suffixRef = useRef<HTMLDivElement>(null)
  const [isLabelTouchingBoundary, setIsLabelTouchingBoundary] = useState(false)

  useEffect(() => {
    const handleBoundaryCheck = () => {
      if (suffixRef.current) {
        const suffixElement = suffixRef.current

        // Get the total width of all direct children of suffix
        let childrenTotalWidth = 0

        Array.from(suffixElement.children).forEach((child) => {
          const childStyles = window.getComputedStyle(child)
          const marginLeft = parseFloat(childStyles.marginLeft) || 0
          const marginRight = parseFloat(childStyles.marginRight) || 0

          childrenTotalWidth +=
            (child as HTMLElement).offsetWidth + marginLeft + marginRight
        })

        // Get the computed styles of the suffix container
        const computedStyles = window.getComputedStyle(suffixElement)

        // Calculate the inner width (subtracting padding)
        const paddingRight = parseFloat(computedStyles.paddingRight) || 0
        const paddingLeft = parseFloat(computedStyles.paddingLeft) || 0
        const innerWidth =
          suffixElement.clientWidth - paddingLeft - paddingRight

        // Check if content exceeds the visible area
        if (childrenTotalWidth >= innerWidth) {
          setIsLabelTouchingBoundary(true)
        } else {
          setIsLabelTouchingBoundary(false)
        }
      }
    }

    let observer: ResizeObserver

    if (floatingLabel) {
      try {
        // Use ResizeObserver to watch for changes in size of the suffix container
        observer = new ResizeObserver(handleBoundaryCheck)

        if (suffixRef.current) {
          observer.observe(suffixRef.current)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Input: ResizeObserver error', error)
      }

      handleBoundaryCheck()
    }

    // Cleanup observer on unmount
    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [value, floatingLabel, endAdornment])

  return { isLabelTouchingBoundary, suffixRef }
}
