import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@mui/material',
      '@mui/icons-material',
      'react-markdown',
      'remark-gfm',
      'shiki',
    ],
    force: false, // Set to true if you need to force re-optimization
  },
  server: {
    hmr: {
      overlay: true,
    },
  },
})
