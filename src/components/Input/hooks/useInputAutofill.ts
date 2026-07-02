import type { Ref } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

// Fallback to check if the input has third-party filled attribute
function hasFilledAttribute(inputElement: HTMLInputElement) {
  const attributesArray = Array.from(inputElement.attributes)

  return Boolean(
    attributesArray.some((attribute) => attribute.name.includes('filled'))
  )
}

export const useInputAutofill = ({ ref }: { ref?: Ref<HTMLInputElement> }) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const hasCheckedAutofill = useRef(false)
  const [isAutofilled, setIsAutofilled] = useState(false)

  const setRef = useCallback(
    (element: HTMLInputElement | null) => {
      if (element) {
        // Pass element to the parent ref, if provided
        if (typeof ref === 'function') {
          ref(element)
        } else if (ref) {
          ;(ref as React.MutableRefObject<HTMLInputElement | null>).current =
            element
        }
        inputRef.current = element
      }
    },
    [ref]
  )

  // Use mutation observer to check if the input has filled attribute
  useEffect(() => {
    const inputElement = inputRef.current

    if (!inputElement) return

    const observer = new MutationObserver((mutations) => {
      if (hasCheckedAutofill.current) return

      const isFilled = hasFilledAttribute(inputElement)

      if (isFilled) {
        hasCheckedAutofill.current = true
        setIsAutofilled(true)

        return
      }
      mutations.forEach((mutation) => {
        // Check if the input has third-party filled attribute
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName &&
          mutation.attributeName.includes('filled')
        ) {
          hasCheckedAutofill.current = true
          setIsAutofilled(true)

          return
        }
      })
    })

    observer.observe(inputElement, {
      attributes: true // Monitor attribute changes
    })

    return () => observer.disconnect()
  }, [])

  return { isAutofilled, setRef }
}
