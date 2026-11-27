import type { OtpInputValidationType } from './types'

const DISALLOWED_CHARACTERS: Record<OtpInputValidationType, RegExp> = {
  numeric: /[^0-9]/g,
  alphanumeric: /[^a-zA-Z0-9]/g
}

/** Strips whitespace and every character not allowed by `validationType`. */
export const sanitizeOtpValue = (
  value: string,
  validationType: OtpInputValidationType
) => value.replace(DISALLOWED_CHARACTERS[validationType], '')

export const getDefaultBoxAriaLabel = (
  index: number,
  length: number,
  validationType: OtpInputValidationType
) =>
  `${validationType === 'numeric' ? 'Digit' : 'Character'} ${index + 1} of ${length}`
