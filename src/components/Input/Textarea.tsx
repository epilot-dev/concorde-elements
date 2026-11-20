import { forwardRef, useCallback, useRef } from 'react'

import { useTheme } from '../ThemeProvider'

import { useInput } from './hooks/useInput'
import { InputBase } from './InputBase'
import { useInputWarning } from './InputStatusContext'
import type { TextareaProps } from './types'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { variants } = useTheme()
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
      variant = variants?.input,
      isWarning: isWarningProp,
      ...inputOptions
    } = props

    const isWarning = useInputWarning({
      isError: inputOptions.isError,
      isWarning: isWarningProp
    })

    const { combinedProps, isActiveState, isFocused } = useInput<'textarea'>({
      isTextarea: true,
      placeholder,
      variant,
      ...inputOptions,
      isWarning
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
        isWarning={isWarning}
        placeholder={placeholder}
        variant={variant}
      >
        <textarea
          {...combinedProps}
          aria-required={isRequired}
          onInput={(e) => expandTextarea(e.currentTarget)}
          ref={setRef}
          rows={2}
        />
      </InputBase>
    )
  }
)

Textarea.displayName = 'Textarea'
