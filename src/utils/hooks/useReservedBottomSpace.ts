import type { RefObject } from 'react'
import { useEffect } from 'react'

type TargetState = {
  // Open popups that currently reserve space, and how much each one needs
  reservations: Map<symbol, number>
  // Target padding-bottom before the first reservation: the inline value to
  // restore afterwards, and the computed value to add the reserved space to
  original: { inline: string; computed: string } | null
}

const targets = new Map<HTMLElement, TargetState>()

/**
 * The element whose end gets the reserved space.
 *
 * A journey rendered by the <epilot-journey> web component lives in a shadow
 * root on someone else's page (e.g. the entity side panel in epilot 360):
 * padding that page's <body> makes the whole host page taller and lets it
 * scroll away. There, the space goes on the outermost element of the shadow
 * tree instead, which grows the journey inside whatever scrolls it. Anywhere
 * else (standalone page, iframe), the document belongs to the journey and the
 * space goes on <body>.
 */
const getTarget = (anchor: HTMLElement | null | undefined): HTMLElement => {
  if (
    anchor &&
    typeof ShadowRoot !== 'undefined' &&
    anchor.getRootNode() instanceof ShadowRoot
  ) {
    let element = anchor

    while (element.parentElement) {
      element = element.parentElement
    }

    return element
  }

  return document.body
}

const applyReservations = (target: HTMLElement) => {
  const state = targets.get(target)

  if (!state) {
    return
  }

  if (state.reservations.size === 0) {
    if (state.original) {
      target.style.paddingBottom = state.original.inline
    }
    targets.delete(target)

    return
  }

  if (!state.original) {
    state.original = {
      inline: target.style.paddingBottom,
      computed: window.getComputedStyle(target).paddingBottom || '0px'
    }
  }

  const space = Math.max(...state.reservations.values())

  target.style.paddingBottom = `calc(${state.original.computed} + ${space}px)`
}

/**
 * Makes the page taller by `space` px while `isActive`, so a popup (calendar,
 * dropdown) has room to open in a short page, e.g. a journey in an auto-sized
 * or fixed-height iframe.
 *
 * The space is added at the end of the page as `padding-bottom` on `<body>`,
 * not under the field that opens the popup: blocks below the field stay where
 * they are instead of jumping down while the popup is open. When `anchorRef`
 * points into a shadow root (web component embed), the space is added at the
 * end of the shadow tree instead, so the host page is left alone.
 */
export const useReservedBottomSpace = (
  isActive: boolean,
  space: number,
  anchorRef?: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    if (!isActive || typeof document === 'undefined') {
      return
    }

    const target = getTarget(anchorRef?.current)
    const key = Symbol('reserved-bottom-space')
    const state = targets.get(target) ?? {
      reservations: new Map(),
      original: null
    }

    state.reservations.set(key, space)
    targets.set(target, state)
    applyReservations(target)

    return () => {
      state.reservations.delete(key)
      applyReservations(target)
    }
  }, [isActive, space, anchorRef])
}
