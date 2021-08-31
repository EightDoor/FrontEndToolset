import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';
import viteTips from 'vite-plugin-tips';
import electron from 'vitejs-plugin-electron';


export default defineConfig({
  server: {
    port: 9999,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'electron/dist',
    rollupOptions: {
      output: {
        format: 'cjs', // 配置 Rollup 打包输出 CommonJs 格式
      },
      external: ['electron',], // 告诉 Rollup 不要去打包 electron
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  optimizeDeps: {
    // 告诉 Vite 不要转换模块
    exclude: ['electron', 'child_process'],
  },
  logLevel: 'info',
  base: "./",
  plugins: [
    vue(),
    electron(),
    viteTips(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
});
