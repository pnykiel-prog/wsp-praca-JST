import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Statyczna strona-prezentacja (SPA). Base względny, aby działała także
// z podkatalogu na dowolnym hostingu statycznym.
export default defineConfig({
  base: './',
  plugins: [react()],
})
