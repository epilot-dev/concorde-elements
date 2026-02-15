import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { IbanInput } from '../IbanInput'

const mockApiBaseUrl = 'https://api.example.com'
const mockPublicToken = 'test-token'

describe('IbanInput', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default state', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Bank Name"
            id="test-id"
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('filled variant', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Bank Name"
            id="test-id"
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
            variant="filled"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with value', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Bank Name"
            iban="DE89370400440532013000"
            id="test-id"
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('required state', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Bank Name"
            id="test-id"
            isRequired
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with helper text', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Bank Name"
            ibanHelper="Please enter your IBAN"
            id="test-id"
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('error state', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Bank Name"
            ibanHelper="Invalid IBAN"
            id="test-id"
            isError
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled state', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Bank Name"
            id="test-id"
            isDisabled
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with BIC and bank name', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankName="Test Bank"
            bankNameLabel="Bank Name"
            bic="TESTBICX"
            bicLabel="TESTBICX"
            ibanLabel="Test"
            id="test-id"
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom labels', async () => {
        const { container } = render(
          <IbanInput
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Name of Bank"
            bicLabel="Bank Identifier"
            ibanLabel="Account Number"
            id="test-id"
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with always show mask', async () => {
        const { container } = render(
          <IbanInput
            alwaysShowMask
            apiBaseUrl={mockApiBaseUrl}
            bankNameLabel="Bank Name"
            id="test-id"
            publicToken={mockPublicToken}
            validateIban={() => Promise.resolve({})}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
