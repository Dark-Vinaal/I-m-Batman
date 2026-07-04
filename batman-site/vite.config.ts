import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Copy favicon files to public/ on config load
const faviconDir = path.resolve(__dirname, 'favicon')
const publicDir = path.resolve(__dirname, 'public')

if (fs.existsSync(faviconDir)) {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  fs.readdirSync(faviconDir).forEach(file => {
    fs.copyFileSync(path.join(faviconDir, file), path.join(publicDir, file))
  })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
