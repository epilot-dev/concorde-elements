import { useEffect, useRef, useState } from 'react'

import type { UseInputBaseOptions } from '../types'

export const useInputBase = (options: UseInputBaseOptions) => {
  const { label, startAdornment, isRequired, value, defaultValue } = options

  const setWidthUpdated = useState(false)
  const hasValue = Boolean(value || defaultValue)
  const hasStartAdornment = Boolean(startAdornment)

  const isLabelEmpty = !label && !isRequired

  const inputContainerRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLLabelElement>(null)
  const startAdornmentRef = useRef<HTMLDivElement>(null)

  const labelWidthRef = useRef<string | undefined>()
  const startAdornmentWidthRef = useRef<string | undefined>()

  // Calculate label and adornment widths
  const setInputWidths = useRef(() => {
    const label = labelRef.current
    const startAdornment = startAdornmentRef.current

    const labelWidth = label?.offsetWidth
    const startAdornmentWidth = startAdornment?.offsetWidth
    let isUpdated = false

    if (labelWidth === undefined && startAdornmentWidth === undefined) return

    const actualLabelWidth = labelWidth ? `${labelWidth}px` : undefined
    const actualStartAdornmentWidth = startAdornmentWidth
      ? `${startAdornmentWidth}px`
      : undefined

    if (actualLabelWidth && labelWidthRef.current !== actualLabelWidth) {
      labelWidthRef.current = actualLabelWidth
      isUpdated = true
    }
    if (
      actualStartAdornmentWidth &&
      actualStartAdornmentWidth !== startAdornmentWidthRef.current
    ) {
      startAdornmentWidthRef.current = actualStartAdornmentWidth
      isUpdated = true
    }

    if (isUpdated) {
      setWidthUpdated[1]((prev) => !prev)
    }
  })

  // Set widths when input is modified
  useEffect(() => {
    setInputWidths.current()
  }, [hasValue, label, isRequired, startAdornment])

  // Set label and adornment widths for correct label placement.
  useEffect(() => {
    const elements = [
      inputContainerRef.current,
      labelRef.current,
      startAdornmentRef.current
    ].filter((element): element is NonNullable<typeof element> =>
      Boolean(element)
    )

    if (!elements.length) {
      return
    }

    let observer: ResizeObserver | null = null

    try {
      observer = new ResizeObserver(setInputWidths.current)

      for (const element of elements) {
        observer.observe(element)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Input: ResizeObserver error', error)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [hasStartAdornment])

  return {
    labelWidthRef,
    inputContainerRef,
    startAdornmentWidthRef,
    startAdornmentRef,
    isLabelEmpty,
    labelRef
  }
}
