import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  base: '/vk-vue/',
  plugins: [
    vue(), 
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),    },
  },
  server: {
    port: 4900
  },
  runtimeCompiler: true
})
