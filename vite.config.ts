import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  server: {
    port: 9999,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'http://tool.start6.cn/api/',
        target: 'http://localhost:8085/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: './dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
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
