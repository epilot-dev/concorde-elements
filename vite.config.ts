import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import sassDts from 'vite-plugin-sass-dts'

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    sassDts(), // generate dts for sass files
    libInjectCss(), // inject css file into each entry file
    dts({
      exclude: ['**/node_modules/**', '**/__tests__/**']
    }) // generate dts for ts files
  ],
  define: {
    'process.env': {},
    process: {}
  },
  build: {
    target: 'ES6',
    outDir: 'dist',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        // components
        Button: resolve(__dirname, 'src/components/Button'),
        Card: resolve(__dirname, 'src/components/Card'),
        Icon: resolve(__dirname, 'src/components/Icon'),
        ExpandIcon: resolve(__dirname, 'src/components/ExpandIcon'),
        Image: resolve(__dirname, 'src/components/Image'),
        ImageStepper: resolve(__dirname, 'src/components/ImageStepper'),
        Link: resolve(__dirname, 'src/components/Link'),
        List: resolve(__dirname, 'src/components/List'),
        MobileStepper: resolve(__dirname, 'src/components/MobileStepper'),
        Spacing: resolve(__dirname, 'src/components/Spacing'),
        StepperInput: resolve(__dirname, 'src/components/StepperInput'),
        ThemeProvider: resolve(__dirname, 'src/components/ThemeProvider'),
        Typography: resolve(__dirname, 'src/components/Typography'),
        IconButton: resolve(__dirname, 'src/components/IconButton'),
        DatePicker: resolve(__dirname, 'src/components/DatePicker'),
        Radio: resolve(__dirname, 'src/components/Radio'),
        Divider: resolve(__dirname, 'src/components/Divider'),
        ToggleButton: resolve(__dirname, 'src/components/ToggleButton'),
        ToggleGroup: resolve(__dirname, 'src/components/ToggleGroup'),
        RadioGroup: resolve(__dirname, 'src/components/RadioGroup'),
        Input: resolve(__dirname, 'src/components/Input'),
        CircularProgress: resolve(__dirname, 'src/components/CircularProgress'),
        Dropdown: resolve(__dirname, 'src/components/Dropdown'),
        Switch: resolve(__dirname, 'src/components/Switch'),
        Autocomplete: resolve(__dirname, 'src/components/Autocomplete'),
        Checkbox: resolve(__dirname, 'src/components/Checkbox'),
        Rating: resolve(__dirname, 'src/components/Rating'),
        Tooltip: resolve(__dirname, 'src/components/Tooltip'),
        Skeleton: resolve(__dirname, 'src/components/Skeleton')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom'],
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'chunks/[name]-[hash].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    minify: mode === 'development' ? false : 'terser'
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
}))
