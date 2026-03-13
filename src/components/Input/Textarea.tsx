import { forwardRef, useCallback, useRef } from 'react'

import { useInput } from './hooks/useInput'
import { InputBase } from './InputBase'
import type { TextareaProps } from './types'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const {
      label,
      adornmentProps,
      containerProps,
      isRequired,
      helperText,
      color,
      backgroundColor,
      borderColor,
      errorColor,
      style,
      borderRadius,
      labelColor,
      placeholder,
      ...inputOptions
    } = props

    const { combinedProps, isActiveState, isFocused } = useInput<'textarea'>({
      isTextarea: true,
      placeholder,
      ...inputOptions
    })

    const lockedHeightRef = useRef<number | null>(null)

    const setRef = useCallback(
      (element: HTMLTextAreaElement | null) => {
        if (element) {
          if (lockedHeightRef.current === null) {
            lockedHeightRef.current = element.clientHeight
          }

          // Pass element to the parent ref, if provided
          if (typeof ref === 'function') {
            ref(element)
          } else if (ref) {
            ;(
              ref as React.MutableRefObject<
                HTMLTextAreaElement | HTMLInputElement | null
              >
            ).current = element
          }
        }
      },
      [ref]
    )

    const expandTextarea = useCallback((element: HTMLTextAreaElement) => {
      if (element) {
        const lockedHeight = lockedHeightRef.current || element.scrollHeight

        element.style.height = `${Math.max(lockedHeight, element.scrollHeight)}px`
      }
    }, [])

    return (
      <InputBase
        adornmentProps={adornmentProps}
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={borderRadius}
        color={color}
        containerProps={containerProps}
        errorColor={errorColor}
        helperText={helperText}
        isRequired={isRequired}
        label={label}
        labelColor={labelColor}
        style={style}
        {...inputOptions}
        isActiveState={isActiveState}
        isFocused={isFocused}
        isTextarea
        placeholder={placeholder}
      >
        <textarea
          {...combinedProps}
          onInput={(e) => expandTextarea(e.currentTarget)}
          ref={setRef}
          rows={2}
        />
      </InputBase>
    )
  }
)

Textarea.displayName = 'Textarea'
