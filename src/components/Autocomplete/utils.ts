import type { RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'

const MIN_DROPDOWN_SPACE_REQUIRED = 400

// Check if dropdown has insufficient space (less than 500px from top and bottom)
export const useInsufficientSpace = ({
  isOpen,
  containerRef
}: {
  isOpen?: boolean
  containerRef: RefObject<HTMLDivElement>
}) => {
  const [hasInsufficientSpace, setHasInsufficientSpace] = useState(false)
  const hasSetInsufficientSpaceRef = useRef(false)

  useEffect(() => {
    if (!containerRef?.current) {
      return
    }

    // Reset the flag and state when dropdown is closed
    if (!isOpen) {
      hasSetInsufficientSpaceRef.current = false
      setHasInsufficientSpace(false)

      return
    }

    const dropdown = containerRef.current

    const handleDocumentScroll = () => {
      if (!dropdown || !isOpen) {
        setHasInsufficientSpace(false)

        return
      }

      const rect = dropdown.getBoundingClientRect()

      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )

      // Calculate space from bottom of dropdown to bottom of document
      const spaceToBottom = documentHeight - (rect.bottom + window.scrollY)

      // Calculate space from top of dropdown to top of document
      const spaceToTop = rect.top + window.scrollY

      const insufficient =
        spaceToBottom < MIN_DROPDOWN_SPACE_REQUIRED &&
        spaceToTop < MIN_DROPDOWN_SPACE_REQUIRED

      if (hasSetInsufficientSpaceRef.current) {
        return
      }

      setHasInsufficientSpace(insufficient)
      hasSetInsufficientSpaceRef.current = true
    }

    handleDocumentScroll()

    window.addEventListener('resize', handleDocumentScroll)

    return () => {
      window.removeEventListener('resize', handleDocumentScroll)
    }
  }, [isOpen, containerRef])

  return hasInsufficientSpace
}
