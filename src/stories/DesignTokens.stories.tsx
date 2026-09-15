import { Fragment } from 'react'
import '../global.css'

import { ColumnTitle, Section, Value, TokensWrapper } from './components'
import {
  BACKGROUND_COLORS,
  BLOCKS_DESIGN_TOKENS,
  MAIN_COLORS,
  OTHER_DESIGN_TOKENS,
  SHADOWS,
  TEXT_COLORS,
  TYPOGRAPHY
} from './designTokens'

export default {
  title: 'Theme/General Design Tokens',
  parameters: {
    designToken: {
      files: {
        css: ['../global.css']
      }
    }
  }
}

const ColorExamples = ({ entries }: { entries: Record<string, string> }) => (
  <>
    {Object.entries(entries).map(([name, value]) => (
      <Fragment key={name}>
        <div>{name}</div>
        <Value uppercase value={value} />
        <div
          style={{
            backgroundColor: value,
            width: '100%',
            height: '100%',
            border: '1px solid #7b7b7b'
          }}
        ></div>
      </Fragment>
    ))}
  </>
)

export const Colors = () => (
  <TokensWrapper>
    <ColumnTitle title="Color" />
    <ColumnTitle title="Value" />
    <ColumnTitle title="Example" />
    <Section title="Main Colors" />
    <div></div>
    <div></div>
    <ColorExamples entries={MAIN_COLORS} />
    <Section title="Text Colors" />
    <div></div>
    <div></div>
    <ColorExamples entries={TEXT_COLORS} />
    <Section title="Background Colors" />
    <div></div>
    <div></div>
    <ColorExamples entries={BACKGROUND_COLORS} />
  </TokensWrapper>
)

export const Typography = () => (
  <TokensWrapper>
    <ColumnTitle title="Typography" />
    <ColumnTitle title="Value" />
    <ColumnTitle title="Example" />
    {Object.entries(TYPOGRAPHY).map(([name, value]) => (
      <Fragment key={name}>
        <div>{name}</div>
        <Value value={value} />
        <div style={{ fontSize: value }}>
          The quick brown fox jumps over the lazy dog.
        </div>
      </Fragment>
    ))}
  </TokensWrapper>
)

export const Shadows = () => (
  <TokensWrapper>
    <ColumnTitle title="Shadow" />
    <ColumnTitle title="Value" />
    <ColumnTitle title="Example" />
    {Object.entries(SHADOWS).map(([name, value]) => (
      <Fragment key={name}>
        <div>{name}</div>
        <Value value={value} />
        <div
          style={{
            boxShadow: value,
            width: '100%',
            height: '100%'
          }}
        ></div>
      </Fragment>
    ))}
  </TokensWrapper>
)

export const OtherTokens = () => (
  <TokensWrapper>
    <ColumnTitle title="Design Token" />
    <ColumnTitle title="Value" />
    <div></div>
    {Object.entries(OTHER_DESIGN_TOKENS).map(([name, value]) => (
      <Fragment key={name}>
        <div>{name}</div>
        <Value value={value} />
        <div></div>
      </Fragment>
    ))}
  </TokensWrapper>
)

export const BlockTokens = () => (
  <TokensWrapper>
    <ColumnTitle title="Design Token" />
    <ColumnTitle title="Value" />
    <div></div>
    {Object.entries(BLOCKS_DESIGN_TOKENS).map(([name, value]) => (
      <Fragment key={name}>
        <div>{name}</div>
        <Value value={value} />
        <div></div>
      </Fragment>
    ))}
  </TokensWrapper>
)
