import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Rewrite React's /api/admin/* to the Express server's /admin/api/*
      '/api/admin': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/admin/, '/admin/api')
      },
      // Forward all other /api/* calls straight through to the Express server
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  }
})
