import { functionalValidators, IBAN_Specifications } from '@epilot/validators'
import classNames from 'classnames'
import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { CircularProgress, Input, Spacing } from '../'
import { usePrevious } from '../../utils'

import classes from './IbanInput.module.scss'
import { MaskedInput } from './MaskedInput'
import type { IbanInputProps, IbanResponse } from './types'
import {
  MASK_PLACEHOLDER,
  getIbanPlaceholder,
  getMask,
  getSanitizedIban
} from './utils'

export const IbanInput = (props: IbanInputProps) => {
  const {
    iban: initialIban,
    ibanLabel = 'IBAN',
    ibanHelper,
    bic,
    bicLabel = 'BIC',
    bicHelper,
    bankName,
    bankNameLabel,
    bankNameHelper,
    apiBaseUrl,
    onChange,
    isDisabled = false,
    isError,
    isRequired = false,
    onChangeNoValidation,
    variant = 'outlined',
    alwaysShowMask = false,
    id,
    placeholder: customPlaceholder,
    validateIban
  } = props
  const [iban, setIban] = useState<string>(initialIban || '')
  const [loading, setLoading] = useState(false)
  const [ibanError, setIbanError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [accessibleInput, setAccessibleInput] = useState(false)
  const { placeholder, maskLength: initialMaskLength } = getIbanPlaceholder(
    navigator.language
  )

  const [maskLength, setMaskLength] = useState(initialMaskLength)
  const [applyMask, setApplyMask] = useState<boolean>(false)
  const prevApplyMask = usePrevious(applyMask)
  const [ibanSyntaxValid, setIbanSyntaxValid] = useState(false)
  const [autoData, setAutoData] = useState<IbanResponse>({
    bic_number: bic || '',
    bank_name: bankName || ''
  })

  useEffect(() => {
    setApplyMask(iban.length > 1)

    // focus the input element whenever the input component changes and it was initially typed
    if (
      inputRef.current &&
      typeof prevApplyMask !== 'undefined' &&
      applyMask !== prevApplyMask &&
      !accessibleInput
    ) {
      inputRef.current.focus()
    }
  }, [iban, applyMask, prevApplyMask, accessibleInput])

  useEffect(() => {
    if (initialIban) {
      const sanitizedIban = getSanitizedIban(iban)

      if (sanitizedIban.length > 1) setMaskLength(sanitizedIban.length)
      load(initialIban)
      setIban(sanitizedIban)
      setIbanError(false)
      setIbanSyntaxValid(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIban])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isAccessibleInput = e.target.id.endsWith('--iban-input-accessible')

    setAccessibleInput(isAccessibleInput)

    const newValue = e.target.value

    const sanitizedIban = getSanitizedIban(newValue)

    if (sanitizedIban.length > 1) setMaskLength(sanitizedIban.length)

    setIban(sanitizedIban.toUpperCase())

    // give the value to the callback
    if (onChangeNoValidation) {
      onChangeNoValidation(sanitizedIban)
    }

    // check the iban for errors
    const ibanValid = functionalValidators.iban.callback(sanitizedIban)

    // set the mask length
    if (sanitizedIban.length > 1) {
      const spec =
        IBAN_Specifications[sanitizedIban.substring(0, 2).toUpperCase()]

      if (spec) {
        setMaskLength(spec.length)
      }
    }

    // autofill if a url is provided
    // and there is not syntax in the iban
    if (apiBaseUrl && ibanValid) {
      // set to loading
      setLoading(true)
      setIbanSyntaxValid(true)
      load(sanitizedIban)
    } else {
      setIbanError(true)
      setIbanSyntaxValid(false)
      // pass data to the caller as empty
      if (onChange) {
        onChange('', {})
      }
    }
  }

  const load = async (newValue: string) => {
    validateIban(newValue).then((data) => {
      if (data) {
        setAutoData(data)
        setIbanError(false)

        // pass data to the caller if there is no errors
        if (onChange) {
          onChange(newValue, data)
        }
      } else {
        setAutoData({})
        setIbanError(true)
        // pass data to the caller as empty
        if (onChange) {
          onChange('', {})
        }
      }

      setLoading(false)
    })
  }

  return (
    <Spacing
      className={classNames('Concorde-IbanInput', classes.fullWidth)}
      scale={5}
      variant="stack"
    >
      {applyMask ? (
        <MaskedInput
          alwaysShowMask={alwaysShowMask}
          inputProps={{
            isDisabled,
            isRequired,
            isError:
              isError ||
              ibanError ||
              (iban.length > 2 && iban.indexOf('_') === -1 && !ibanSyntaxValid),
            helperText:
              isError ||
              ibanError ||
              (iban.length > 2 && iban.indexOf('_') === -1 && !ibanSyntaxValid)
                ? ibanHelper
                : '',
            label: ibanLabel,
            onChange: handleChange,
            placeholder: customPlaceholder || placeholder,
            value: iban,
            variant,
            id,
            tabIndex: -1
          }}
          mask={getMask(maskLength)}
          maskPlaceholder={MASK_PLACEHOLDER}
          ref={inputRef}
        />
      ) : (
        <Input
          helperText={
            isError || ibanError || (!ibanSyntaxValid && iban.length > 2)
              ? ibanHelper
              : ''
          }
          id={id}
          isDisabled={isDisabled}
          isError={
            isError || ibanError || (!ibanSyntaxValid && iban.length > 2)
          }
          isRequired={isRequired}
          label={ibanLabel}
          onChange={handleChange}
          placeholder={customPlaceholder || placeholder}
          ref={inputRef}
          tabIndex={-1}
          value={iban}
          variant={variant}
        />
      )}
      <Input
        aria-describedby={`${id}-errorMessage`}
        containerProps={{
          className: classes['container-accessible']
        }}
        id={id && `${id}--iban-input-accessible`}
        isDisabled={isDisabled}
        isError={isError || ibanError || (!ibanSyntaxValid && iban.length > 2)}
        isRequired={isRequired}
        label={`${ibanLabel} input`}
        maxLength={maskLength}
        onChange={handleChange}
        placeholder={customPlaceholder || placeholder}
        value={iban}
        variant={variant}
      />

      <Spacing
        className={classNames(
          classes.fullWidth,
          (ibanError || !ibanSyntaxValid) && classes.hidden
        )}
        scale={5}
        variant="stack"
      >
        {autoData?.bic_number && (
          <Input
            endAdornment={loading && <CircularProgress size={20} />}
            helperText={bicHelper}
            id={id && `${id}-bic`}
            isDisabled
            label={bicLabel}
            readOnly
            value={autoData?.bic_number}
            variant={variant}
          />
        )}

        {autoData?.bank_name && (
          <Input
            endAdornment={loading && <CircularProgress size={20} />}
            helperText={bankNameHelper}
            id={id && `${id}-bank`}
            isDisabled
            label={bankNameLabel}
            readOnly
            value={autoData?.bank_name}
            variant={variant}
          />
        )}
      </Spacing>
    </Spacing>
  )
}
