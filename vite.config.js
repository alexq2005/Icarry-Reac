import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/*------------------------------------------------------------*/
/*                     config de Vite                          */
/*------------------------------------------------------------*/
// Build/dev server del proyecto. El plugin de React habilita JSX y Fast Refresh.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
