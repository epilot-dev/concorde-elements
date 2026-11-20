import { useEffect } from 'react'

// Open popups that currently reserve space, and how much each one needs
const reservations = new Map<symbol, number>()
// <body> padding-bottom before the first reservation: the inline value to
// restore afterwards, and the computed value to add the reserved space to
let original: { inline: string; computed: string } | null = null

const applyReservations = () => {
  const { body } = document

  if (reservations.size === 0) {
    if (original) {
      body.style.paddingBottom = original.inline
      original = null
    }

    return
  }

  if (!original) {
    original = {
      inline: body.style.paddingBottom,
      computed: window.getComputedStyle(body).paddingBottom || '0px'
    }
  }

  const space = Math.max(...reservations.values())

  body.style.paddingBottom = `calc(${original.computed} + ${space}px)`
}

/**
 * Makes the document taller by `space` px while `isActive`, so a popup
 * (calendar, dropdown) has room to open in a short page, e.g. a journey in an
 * auto-sized or fixed-height iframe.
 *
 * The space is added at the end of the page as `padding-bottom` on `<body>`,
 * not under the field that opens the popup: blocks below the field stay where
 * they are instead of jumping down while the popup is open.
 */
export const useReservedBottomSpace = (isActive: boolean, space: number) => {
  useEffect(() => {
    if (!isActive || typeof document === 'undefined') {
      return
    }

    const key = Symbol('reserved-bottom-space')

    reservations.set(key, space)
    applyReservations()

    return () => {
      reservations.delete(key)
      applyReservations()
    }
  }, [isActive, space])
}
