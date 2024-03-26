import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(), eslintPlugin()]
})