import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        demo: resolve(__dirname, 'demo.html'),
        main: resolve(__dirname, 'index.html'),
        qr_generator: resolve(__dirname, 'qr-generate.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  }
})
