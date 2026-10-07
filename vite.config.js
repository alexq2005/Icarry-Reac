import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Configuro Vite para que pueda compilar y ejecutar la app de React.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
