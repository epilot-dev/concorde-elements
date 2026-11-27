import classNames from 'classnames'
import { useReducedMotion } from 'motion/react'
import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { MouseEvent, TransitionEvent } from 'react'

import { ExpandIcon } from '../ExpandIcon'

import type { AccordionItemProps } from './types'

import classes from './Accordion.module.scss'

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      expanded,
      onToggle,
      header,
      actions,
      error = false,
      hideHeaderWhenExpanded: framed = false,
      expandedHeader,
      expandedToggleLabel,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const bodyId = useId()
    const bodyRef = useRef<HTMLDivElement>(null)
    const headerToggleRef = useRef<HTMLButtonElement>(null)
    const notchToggleRef = useRef<HTMLButtonElement>(null)
    const notchRef = useRef<HTMLDivElement>(null)
    const pendingFocusRef = useRef<'notch' | 'header' | null>(null)
    const shouldReduceMotion = useReducedMotion()

    // `.body` keeps `overflow: hidden` while collapsed AND during the open
    // animation (so the collapse clips and content does not spill while the height
    // animates). Once fully expanded it switches to `overflow: visible` so
    // descendant popovers (date-picker calendar, dropdowns, tooltips) can escape
    // the box. `isAnimatingOpen` marks the "currently animating open" window.
    const [isAnimatingOpen, setIsAnimatingOpen] = useState(false)
    const wasExpandedRef = useRef(expanded)

    // A parent may collapse a framed item while keyboard focus sits inside the
    // notch (e.g. Duplicate adds an instance and collapses the others). The notch
    // then unmounts and focus would fall to <body>. The DOM still holds the old
    // tree during render, so this is the last moment focus can be inspected;
    // `wasExpandedRef` only updates in an effect after commit. The write is
    // idempotent, so repeated or discarded renders are harmless.
    if (
      framed &&
      !expanded &&
      wasExpandedRef.current &&
      notchRef.current?.contains(document.activeElement)
    ) {
      pendingFocusRef.current = 'header'
    }

    useEffect(() => {
      const wasExpanded = wasExpandedRef.current

      wasExpandedRef.current = expanded

      // Gate overflow only for a real collapsed -> expanded toggle with motion on.
      // Initial mount (no transition fires) and reduced motion reveal overflow
      // immediately; collapsing never gates (overflow is hidden while collapsed).
      // Framed mode never animates (no transition runs, so nothing would clear it).
      if (expanded && !wasExpanded && !shouldReduceMotion && !framed) {
        setIsAnimatingOpen(true)
      } else if (!expanded) {
        setIsAnimatingOpen(false)
      }
    }, [expanded, shouldReduceMotion, framed])

    const handleRegionTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
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
    // versions without `@ts-expect-error`. A layout effect so parents measuring in
    // their own layout effect already see the final `inert` state.
    useLayoutEffect(() => {
      const el = bodyRef.current

      if (!el) return

      if (expanded) {
        el.removeAttribute('inert')
      } else {
        el.setAttribute('inert', '')
      }
    }, [expanded])

    // Framed mode swaps the toggle button on expand/collapse; keep keyboard focus
    // on the control the user just activated.
    useEffect(() => {
      const target = pendingFocusRef.current

      pendingFocusRef.current = null

      if (target === 'notch') notchToggleRef.current?.focus()
      if (target === 'header') headerToggleRef.current?.focus()
    }, [expanded])

    const handleToggleClick =
      (target: 'notch' | 'header') => (event: MouseEvent<HTMLButtonElement>) => {
        if (framed && document.activeElement === event.currentTarget) {
          pendingFocusRef.current = target === 'notch' ? 'header' : 'notch'
        }

        onToggle()
      }

    // Reveal overflow only when fully expanded (not mid-open-animation).
    const showsOverflow = expanded && !isAnimatingOpen
    const isFramedOpen = framed && expanded

    return (
      <div
        className={classNames(
          'Concorde-AccordionItem',
          classes.root,
          framed && 'Concorde-AccordionItem--framed',
          framed && classes.framed,
          isFramedOpen && classes.framedExpanded,
          error && !isFramedOpen && classes.error,
          className
        )}
        ref={ref}
        {...rest}
      >
        {!isFramedOpen && (
          <div className={classNames('Concorde-AccordionItem__header', classes.header)}>
            <button
              aria-controls={bodyId}
              aria-expanded={expanded}
              className={classes.toggle}
              onClick={handleToggleClick('header')}
              ref={headerToggleRef}
              type="button"
            >
              <span className={classes.chevronWrapper} data-hero="chevron">
                <ExpandIcon className={classes.chevron} isExpanded={expanded} />
              </span>
              <span className={classes.headerContent}>{header}</span>
            </button>
            {actions && (
              <div
                className={classNames('Concorde-AccordionItem__actions', classes.actions)}
                data-hero="actions"
              >
                {actions}
              </div>
            )}
          </div>
        )}
        <div
          className={classNames(
            'Concorde-AccordionItem__frame',
            isFramedOpen && classes.frameExpanded,
            isFramedOpen && error && classes.frameError
          )}
        >
          {isFramedOpen && (
            <div
              className={classNames('Concorde-AccordionItem__notch', classes.notch)}
              ref={notchRef}
            >
              <button
                aria-controls={bodyId}
                aria-expanded
                aria-label={expandedToggleLabel}
                className={classNames('Concorde-AccordionItem__notchToggle', classes.notchToggle)}
                onClick={handleToggleClick('notch')}
                ref={notchToggleRef}
                type="button"
              >
                <span className={classes.chevronWrapper} data-hero="chevron">
                  <ExpandIcon className={classes.chevron} isExpanded />
                </span>
                <span className={classes.headerContent}>{expandedHeader ?? header}</span>
              </button>
              {actions && (
                <div
                  className={classNames('Concorde-AccordionItem__actions', classes.actions)}
                  data-hero="actions"
                >
                  {actions}
                </div>
              )}
            </div>
          )}
          <div
            className={classNames(
              'Concorde-AccordionItem__region',
              classes.region,
              expanded ? classes.regionExpanded : classes.regionCollapsed,
              framed && classes.regionInstant
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
                  classes.bodyInner,
                  framed && classes.bodyInnerFramed
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'
