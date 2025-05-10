import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { Button } from '../../Button'

import classes from './DatePickerFooter.module.scss'
import type { DatePickerFooterProps } from './types'

export function DatePickerFooter({
  isHeaderSelectOpen,
  resetDate,
  closeCalendar
}: DatePickerFooterProps) {
  const { t } = useTranslation()

  if (isHeaderSelectOpen) {
    return null
  }

  return (
    <div className={classNames('Concorde-DatePicker__Footer', classes.footer)}>
      <Button
        className={classNames(
          'Concorde-DatePicker__Footer-Button',
          classes.footerButton
        )}
        label={t('Cancel')}
        onClick={resetDate}
        variant="bare"
      />
      <Button
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
