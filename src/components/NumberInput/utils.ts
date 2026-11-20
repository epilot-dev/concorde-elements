import type { ChangeMeta } from 'react-number-format'

export function getLocaleNumberFormat(localeValue?: string): {
  groupSeparator: string
  decimalSeparator: string
} {
  const locale = localeValue || window.navigator.language

  const number = 1000.1
  const parts = getLocaleParts(locale, number)

  let groupSeparator = ''
  let decimalSeparator = ''

  for (const part of parts) {
    if (part.type === 'group') {
      groupSeparator = part.value
    }
    if (part.type === 'decimal') {
      decimalSeparator = part.value
    }
  }

  return { groupSeparator, decimalSeparator }
}

const getLocaleParts = (locale: string, number: number) => {
  try {
    return new Intl.NumberFormat(locale).formatToParts(number)
  } catch (e) {
    return new Intl.NumberFormat('de-DE').formatToParts(number)
  }
}

/**
 * Reinterprets a freshly inserted "." as the locale decimal separator, so pasted dot-decimals survive.
 */
export function normalizeDecimalSeparator(
  value: string,
  decimalSeparator: string,
  changeMeta: ChangeMeta
): string {
  if (decimalSeparator === '.') {
    return value
  }

  const { start, end } = changeMeta.to
  const inserted = value.slice(start, end)

  if (inserted.includes(decimalSeparator)) {
    return value
  }

  return (
    value.slice(0, start) +
    inserted.replace(/\./g, decimalSeparator) +
    value.slice(end)
  )
}

/**
 * Most digits a number input should accept so the typed value survives the
 * conversion to a JS number. Every decimal with up to 15 significant digits
 * round-trips through a double, and 15 integer digits stay below
 * `Number.MAX_SAFE_INTEGER` (9007199254740991, 16 digits). `Number.MAX_VALUE`
 * (~1.8e308) is no useful bound: doubles drop digits long before it, so a
 * longer value would be validated against a different number than typed.
 */
export const MAX_SAFE_NUMBER_DIGITS = 15

/**
 * Whether a numeric string fits into `maxDigits` digits. Sign and separators
 * don't count. A change that removes digits is always allowed, so a longer
 * (e.g. prefilled) value can still be shortened.
 */
export function isWithinMaxDigits(
  value: string,
  previousValue: string,
  maxDigits?: number
): boolean {
  if (maxDigits === undefined) {
    return true
  }

  const digits = countDigits(value)

  return digits <= maxDigits || digits < countDigits(previousValue)
}

const countDigits = (value: string) => value.replace(/\D/g, '').length
