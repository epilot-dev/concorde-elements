import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    target: 'esnext'
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  test: {
    // CI only: runners host 3 jobs per 8-vCPU/16 GiB node, and vitest's default
    // worker count (one per CPU) is sized for a machine it has to itself.
    maxWorkers: process.env.CI ? 4 : undefined,
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
