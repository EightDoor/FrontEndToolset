import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';


export default defineConfig({
  server: {
    port: 9999,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'electron/dist',
    rollupOptions: {
      // output: {
      //   format: 'cjs', // 配置 Rollup 打包输出 CommonJs 格式
      // },
      external: ['AMap'], // 告诉 Rollup 不要去打包 AMap
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  optimizeDeps: {
    // 告诉 Vite 不要转换模块
    // exclude: ['electron'],
  },
  logLevel: 'info',
  base: "./",
  plugins: [
    vue(),
  ],
});
