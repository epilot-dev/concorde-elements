import type React from 'react'

export type CartDrawerProps = {
  /**
   * Whether the drawer is open
   */
  open: boolean
  /**
   * Callback when the drawer should close
   */
  onClose: () => void
  /**
   * Label for the close button at the bottom of the drawer
   */
  closeLabel?: string
  /**
   * Children to render inside the drawer
   */
  children: React.ReactNode
}
