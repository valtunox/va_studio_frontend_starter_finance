import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
  },
  server: {
    port: 3008,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5112',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    port: 3008,
  },
})
