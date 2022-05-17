import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: {
    port: 9999,
    host: '0.0.0.0',
  },
  build: {
    outDir: './dist',
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  optimizeDeps: {

  },
  logLevel: 'info',
  base: './',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
