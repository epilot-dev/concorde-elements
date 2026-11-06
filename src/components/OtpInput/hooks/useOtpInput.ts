import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type FocusEvent,
  type KeyboardEvent
} from 'react'

import type { UseOtpInputOptions } from '../types'
import { sanitizeOtpValue } from '../utils'

const removeAt = (value: string, index: number) =>
  value.slice(0, index) + value.slice(index + 1)

/** Code state, focus movement and the per-box handlers of an OtpInput. */
export const useOtpInput = ({
  value,
  onChange,
  onComplete,
  onFocus,
  onBlur,
  autoFocus,
  length,
  validationType
}: UseOtpInputOptions) => {
  const currentValue = sanitizeOtpValue(value ?? '', validationType).slice(
    0,
    length
  )
  // The next empty box (or the last one); boxes after it can't be focused
  const activeIndex = Math.min(currentValue.length, length - 1)

  const groupRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<Array<HTMLInputElement | null>>([])
  // Where focus goes once the parent re-renders with the committed code
  const pendingFocusRef = useRef<{ value: string; index: number } | null>(null)

  const focusBox = (index: number) => {
    const box = boxesRef.current[Math.max(0, Math.min(index, length - 1))]

    box?.focus()
    box?.select()
  }

  useLayoutEffect(() => {
    const pending = pendingFocusRef.current

    if (!pending) return

    pendingFocusRef.current = null
    // A parent that kept another value overrode the edit, so focus stays put
    if (pending.value === currentValue) focusBox(pending.index)
  })

  useEffect(() => {
    if (autoFocus) boxesRef.current[activeIndex]?.focus()
    // Only on mount or when autoFocus is turned on, not on every change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFocus])

  /** Hands the code to the parent; focus follows on the render that shows it. */
  const commit = (nextValue: string, focusIndex: number) => {
    const next = nextValue.slice(0, length)

    if (next === currentValue) {
      focusBox(focusIndex)

      return
    }

    pendingFocusRef.current = { value: next, index: focusIndex }
    onChange(next)
    if (next.length === length) onComplete?.(next)
  }

  const fillFromStart = (characters: string) => {
    const next = characters.slice(0, length)

    commit(next, next.length)
  }

  const isInsideGroup = (target: EventTarget | null) =>
    target instanceof Node && Boolean(groupRef.current?.contains(target))

  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const raw = event.target.value
    const previousCharacter = currentValue.charAt(index)

    if (!raw) {
      if (previousCharacter) commit(removeAt(currentValue, index), index)

      return
    }

    // Typing into a filled box without a selection leaves both characters
    const inserted =
      previousCharacter && raw.length === 2
        ? raw.charAt(0) === previousCharacter
          ? raw.slice(1)
          : raw.slice(0, 1)
        : raw
    const characters = sanitizeOtpValue(inserted, validationType)

    // Several characters at once come from autofill, treat like a paste
    if (characters.length > 1) {
      fillFromStart(characters)
    } else if (characters) {
      commit(
        currentValue.slice(0, index) +
          characters +
          currentValue.slice(index + 1),
        index + 1
      )
    }
  }

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    switch (event.key) {
      case 'Backspace':
        event.preventDefault()
        if (currentValue.charAt(index)) {
          commit(removeAt(currentValue, index), index)
        } else if (index > 0) {
          commit(removeAt(currentValue, index - 1), index - 1)
        }
        break
      case 'Delete':
        event.preventDefault()
        if (currentValue.charAt(index)) {
          commit(removeAt(currentValue, index), index)
        }
        break
      case 'ArrowLeft':
        event.preventDefault()
        focusBox(index - 1)
        break
      case 'ArrowRight':
        event.preventDefault()
        focusBox(Math.min(index + 1, currentValue.length))
        break
      case 'Home':
        event.preventDefault()
        focusBox(0)
        break
      case 'End':
        event.preventDefault()
        focusBox(currentValue.length)
        break
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const characters = sanitizeOtpValue(
      event.clipboardData.getData('text'),
      validationType
    )

    if (characters) fillFromStart(characters)
  }

  const handleFocus = (index: number, event: FocusEvent<HTMLInputElement>) => {
    if (!isInsideGroup(event.relatedTarget)) onFocus?.(event)

    if (index > activeIndex) {
      focusBox(activeIndex)

      return
    }
    event.currentTarget.select()
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!isInsideGroup(event.relatedTarget)) onBlur?.(event)
  }

  const setBoxRef = useCallback(
    (index: number) => (element: HTMLInputElement | null) => {
      boxesRef.current[index] = element
    },
    []
  )

  /** Behaviour of one box; the component adds its markup and aria. */
  const getBoxProps = (index: number) => ({
    value: currentValue.charAt(index),
    tabIndex: index === activeIndex ? 0 : -1,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      handleChange(index, event),
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) =>
      handleKeyDown(index, event),
    onFocus: (event: FocusEvent<HTMLInputElement>) => handleFocus(index, event),
    onBlur: handleBlur,
    onPaste: handlePaste
  })

  return { currentValue, activeIndex, groupRef, setBoxRef, getBoxProps }
}
