import { Fragment } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'

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

export const TokensWrapper = ({
  children,
  columns
}: {
  children: ReactNode
  columns?: string
}) => (
  <Container>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns || '1fr 1fr 1fr',
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

export const CustomTokensWrapper = ({
  customTokens,
  children
}: PropsWithChildren<{
  customTokens: Record<string, string>
}>) => (
  <Container>
    <TokensWrapper columns="1fr 1fr">
      <ColumnTitle title="Token" />
      <ColumnTitle title="Type" />
      {Object.entries(customTokens).map(([name, value]) => (
        <Fragment key={name}>
          <div>{name}</div>
          <Value value={value} />
        </Fragment>
      ))}
    </TokensWrapper>
    {children}
  </Container>
)
