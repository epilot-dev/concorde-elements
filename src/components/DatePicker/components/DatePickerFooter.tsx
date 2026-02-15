import classNames from 'classnames'

import { Button } from '../../Button'
import { useDatepickerTranslations } from '../utils'

import classes from './DatePickerFooter.module.scss'
import type { DatePickerFooterProps } from './types'

export function DatePickerFooter({
  isHeaderSelectOpen,
  resetDate,
  closeCalendar
}: DatePickerFooterProps) {
  const { CANCEL_DATE_SELECTED, ACCEPT_DATE_SELECTED, CANCEL } =
    useDatepickerTranslations()

  if (isHeaderSelectOpen) {
    return null
  }

  return (
    <div className={classNames('Concorde-DatePicker__Footer', classes.footer)}>
      <Button
        aria-label={CANCEL_DATE_SELECTED}
        className={classNames(
          'Concorde-DatePicker__Footer-Button',
          classes.footerButton
        )}
        label={CANCEL}
        onClick={resetDate}
        variant="bare"
      />
      <Button
        aria-label={ACCEPT_DATE_SELECTED}
        className={classNames(
          'Concorde-DatePicker__Footer-Button',
          classes.footerButton
        )}
        label="OK"
        onClick={closeCalendar}
        variant="bare"
      />
    </div>
  )
}
