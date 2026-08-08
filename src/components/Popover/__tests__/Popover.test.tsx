import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { Popover, PopoverContent, PopoverTrigger } from '../'
import { Button } from '../../Button'
import { Typography } from '../../Typography'

describe('Popover', () => {
  describe('accessibility > axe static tests', () => {
    it('default popover', async () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Typography>Popover content</Typography>
          </PopoverContent>
        </Popover>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with modal mode', async () => {
      const { container } = render(
        <Popover modal>
          <PopoverTrigger asChild>
            <Button>Open Modal Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Typography>Modal popover content</Typography>
          </PopoverContent>
        </Popover>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with different placements', async () => {
      const { container } = render(
        <>
          {['top', 'right', 'bottom', 'left'].map((side) => (
            <Popover key={side}>
              <PopoverTrigger asChild>
                <Button>Open {side} Popover</Button>
              </PopoverTrigger>
              <PopoverContent
                side={side as 'top' | 'right' | 'bottom' | 'left'}
              >
                <Typography>Popover content</Typography>
              </PopoverContent>
            </Popover>
          ))}
        </>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with different alignments', async () => {
      const { container } = render(
        <>
          {['start', 'center', 'end'].map((align) => (
            <Popover key={align}>
              <PopoverTrigger asChild>
                <Button>Open {align} Popover</Button>
              </PopoverTrigger>
              <PopoverContent align={align as 'start' | 'center' | 'end'}>
                <Typography>Popover content</Typography>
              </PopoverContent>
            </Popover>
          ))}
        </>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with aria labels', async () => {
      const { container } = render(
        <Popover>
          <PopoverTrigger asChild>
            <Button aria-label="Open settings popover">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent aria-label="Settings menu">
            <Typography>Popover content</Typography>
          </PopoverContent>
        </Popover>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
