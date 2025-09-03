import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // permite acceso desde cualquier IP
    port: 5173,
    allowedHosts: [
      '.tunnelmole.net'  // acepta cualquier subdominio de tunnelmole.net
    ]
  }
})