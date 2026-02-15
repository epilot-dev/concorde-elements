import '@testing-library/jest-dom/'
import { vi } from 'vitest'
import 'vitest-axe/extend-expect'
import * as matchers from 'vitest-axe/matchers'
expect.extend(matchers)

vi.setConfig({ testTimeout: 30000 })

HTMLCanvasElement.prototype.getContext = vi.fn()

vi.stubGlobal(
  'ResizeObserver',
  vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn()
  }))
)
