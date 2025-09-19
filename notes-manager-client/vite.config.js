import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Forward all API calls to the backend during development
      // Example: fetch('/api/notes') -> http://localhost:5000/api/notes
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})