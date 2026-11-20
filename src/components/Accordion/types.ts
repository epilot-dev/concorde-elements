import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

type NativeDiv = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export type AccordionProps = NativeDiv & {
  className?: string
}

export type AccordionItemProps = Omit<NativeDiv, 'onToggle'> & {
  /** Whether the body is revealed. Controlled by the parent. */
  expanded: boolean
  /** Called when the header toggle is activated. */
  onToggle: () => void
  /** Collapsed/expanded header content; also the toggle target. */
  header: ReactNode
  /** Optional right-aligned controls (sibling of the toggle, never toggles). */
  actions?: ReactNode
  /** Renders the error affordance (red left bar). */
  error?: boolean
  /**
   * Framed mode: while expanded, the header row is replaced by a bordered frame
   * whose top edge carries a "notch" (chevron toggle + actions). Default: false.
   */
  hideHeaderWhenExpanded?: boolean
  /** Framed mode: content of the notch toggle next to the chevron (falls back to `header`). */
  expandedHeader?: ReactNode
  /** Framed mode: accessible name (`aria-label`) of the notch toggle. */
  expandedToggleLabel?: string
  className?: string
}
