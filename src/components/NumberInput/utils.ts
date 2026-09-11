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
