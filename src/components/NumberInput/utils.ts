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
