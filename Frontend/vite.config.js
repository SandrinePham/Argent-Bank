import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Argent-Bank/',  // <-- important pour GitHub Pages
  plugins: [react()]
})
