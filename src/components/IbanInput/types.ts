import type { InputProps } from '..'

export type IbanInputProps = Pick<
  InputProps,
  'id' | 'variant' | 'isDisabled' | 'isRequired' | 'isError'
> & {
  /**
   * value of iban field
   */
  iban?: string

  /**
   * label of iban field
   *
   * Defaults to `IBAN`
   */
  ibanLabel?: InputProps['label']

  /**
   * helper text of iban field
   */
  ibanHelper?: InputProps['helperText']

  /**
   * value of bic field
   */
  bic?: string

  /**
   * label of bic field
   * @default "BIC"
   */
  bicLabel?: InputProps['label']

  /**
   * helper text of bic field
   */
  bicHelper?: InputProps['helperText']

  /**
   * value of bankName field
   */
  bankName?: string

  /**
   * label of bankName field
   */
  bankNameLabel: InputProps['label']

  /**
   * helper text of bankName field
   */
  bankNameHelper?: InputProps['helperText']

  /**
   * a callback that will be triggered once the user iban is correct
   */
  onChange?: (iban: string, ibanResponse: IbanResponse) => void

  /**
   * a callback that will be always triggered
   */
  onChangeNoValidation?: (iban: string) => void

  /**
   * the base url of checking for iban
   */
  apiBaseUrl: string

  /**
   * Should always show input mask.
   */
  alwaysShowMask?: boolean

  /**
   * public token for the iban API call
   */
  publicToken: string

  /**
   * placeholder of iban field
   */
  placeholder?: string

  /**
   * Validate IBAN function
   */
  validateIban: (iban: string) => Promise<IbanResponse>
}

export type IbanResponse = {
  bic_number?: string
  bank_name?: string
  zip?: string
  address?: string
}
