import classNames from 'classnames'
import { useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import type { TransitionEvent } from 'react'

import { ExpandIcon } from '../ExpandIcon'

import classes from './Accordion.module.scss'
import type { AccordionItemProps } from './types'

export const AccordionItem = ({
  expanded,
  onToggle,
  header,
  actions,
  error = false,
  className,
  children,
  ...rest
}: AccordionItemProps) => {
  const bodyId = useId()
  const bodyRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // `.body` keeps `overflow: hidden` while collapsed AND during the open
  // animation (so the collapse clips and content does not spill while the height
  // animates). Once fully expanded it switches to `overflow: visible` so
  // descendant popovers (date-picker calendar, dropdowns, tooltips) can escape
  // the box. `isAnimatingOpen` marks the "currently animating open" window.
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false)
  const wasExpandedRef = useRef(expanded)

  useEffect(() => {
    const wasExpanded = wasExpandedRef.current

    wasExpandedRef.current = expanded

    // Gate overflow only for a real collapsed -> expanded toggle with motion on.
    // Initial mount (no transition fires) and reduced motion reveal overflow
    // immediately; collapsing never gates (overflow is hidden while collapsed).
    if (expanded && !wasExpanded && !shouldReduceMotion) {
      setIsAnimatingOpen(true)
    } else if (!expanded) {
      setIsAnimatingOpen(false)
    }
  }, [expanded, shouldReduceMotion])

  const handleRegionTransitionEnd = (
    event: TransitionEvent<HTMLDivElement>
  ) => {
    // The region only ever transitions `grid-template-rows`, so any transition
    // that ends ON the region itself (not a bubbled child transition) is the
    // open/close animation finishing. Guarding on target===currentTarget rather
    // than propertyName also keeps this simulatable in jsdom, where the
    // synthetic transition event carries no propertyName.
    if (event.target === event.currentTarget) {
      setIsAnimatingOpen(false)
    }
  }

  // Apply `inert` imperatively so the collapsed body is non-interactive and
  // removed from the a11y tree while STAYING MOUNTED (its children's mount-time
  // effects must keep running — collapsing must not drop blocks from validation).
  // Done via setAttribute (not a JSX prop) to stay type-safe across React
  // versions without `@ts-expect-error`.
  useEffect(() => {
    const el = bodyRef.current

    if (!el) return

    if (expanded) {
      el.removeAttribute('inert')
    } else {
      el.setAttribute('inert', '')
    }
  }, [expanded])

  // Reveal overflow only when fully expanded (not mid-open-animation).
  const showsOverflow = expanded && !isAnimatingOpen

  return (
    <div
      className={classNames(
        'Concorde-AccordionItem',
        classes.root,
        error && classes.error,
        className
      )}
      {...rest}
    >
      <div className={classNames('Concorde-AccordionItem__header', classes.header)}>
        <button
          aria-controls={bodyId}
          aria-expanded={expanded}
          className={classes.toggle}
          onClick={onToggle}
          type="button"
        >
          <ExpandIcon className={classes.chevron} isExpanded={expanded} />
          <span className={classes.headerContent}>{header}</span>
        </button>
        {actions && (
          <div className={classNames('Concorde-AccordionItem__actions', classes.actions)}>
            {actions}
          </div>
        )}
      </div>
      <div
        className={classNames(
          'Concorde-AccordionItem__region',
          classes.region,
          expanded ? classes.regionExpanded : classes.regionCollapsed
        )}
        onTransitionEnd={handleRegionTransitionEnd}
      >
        <div
          className={classNames(
            'Concorde-AccordionItem__body',
            classes.body,
            showsOverflow && classes.bodyExpanded
          )}
          id={bodyId}
          ref={bodyRef}
        >
          <div
            className={classNames(
              'Concorde-AccordionItem__bodyInner',
              classes.bodyInner
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

AccordionItem.displayName = 'AccordionItem'
