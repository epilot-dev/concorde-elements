import type { ReactNode } from 'react'
import React from 'react'

export const Container = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily:
        '"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
      padding: '0 24px'
    }}
  >
    {children}
  </div>
)

export const TokensWrapper = ({ children }: { children: ReactNode }) => (
  <Container>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px'
      }}
    >
      {children}
    </div>
  </Container>
)

export const Section = ({ title }: { title: string }) => (
  <div style={{ color: 'gray' }}>{title}</div>
)

export const Value = ({
  value,
  uppercase
}: {
  value: string
  uppercase?: boolean
}) => (
  <div
    style={{
      fontFamily: '"Source Code Pro", monaco, Consolas, monospace, monospace',
      fontWeight: 300,
      fontSize: 14,
      textTransform: uppercase ? 'uppercase' : 'none'
    }}
  >
    {value}
  </div>
)

export const ColumnTitle = ({ title }: { title: string }) => (
  <div>
    <strong style={{ fontSize: '1.2rem' }}>{title}</strong>
  </div>
)
