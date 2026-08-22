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
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
})
