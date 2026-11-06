import classNames from 'classnames'

import classes from './Accordion.module.scss'
import type { AccordionProps } from './types'

export const Accordion = ({ className, children, ...rest }: AccordionProps) => {
  return (
    <div
      className={classNames('Concorde-Accordion', classes.accordion, className)}
      {...rest}
    >
      {children}
    </div>
  )
}

Accordion.displayName = 'Accordion'
