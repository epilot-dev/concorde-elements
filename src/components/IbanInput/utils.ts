import { IBAN_Specifications } from '@epilot/validators'

import type { IbanResponse } from './types'

export const MASK_PLACEHOLDER = '_'

const DEFAULT_PLACEHOLDER = 'DE00000000000000000000'

const USER_LOCALES = new Set(['LU', 'DE', 'AT'])

export function getMask(length: number) {
  if (length === 0) return ''

  return 'aa' + '*'.repeat(length - 2)
}

export async function getAutoData(
  iban: string,
  baseUrl: string,
  publicToken: string
) {
  const sanitizedIban = getSanitizedIban(iban)

  try {
    const data = (await (
      await fetch(baseUrl + sanitizedIban, {
        headers: {
          authorization: `Bearer ${publicToken}`
        }
      })
    ).json()) as IbanResponse

    return data
  } catch {
    return null
  }
}

export function getSanitizedIban(iban: string) {
  return iban.replace(/ /g, '').split(MASK_PLACEHOLDER).join('').trim()
}

export function getIbanPlaceholder(browserLocale: string) {
  const extractedCountryCode = browserLocale.slice(-2).toUpperCase()

  const validCountryCode = USER_LOCALES.has(extractedCountryCode)
    ? extractedCountryCode
    : 'DE'

  const countryIbanExample: string =
    IBAN_Specifications[validCountryCode].example
  const maskLength: number = IBAN_Specifications[validCountryCode].length

  if (!countryIbanExample) {
    return {
      placeholder: DEFAULT_PLACEHOLDER,
      maskLength: IBAN_Specifications['DE'].length
    }
  }

  return {
    placeholder: countryIbanExample.replace(/\d/g, '0'),
    maskLength
  }
}
