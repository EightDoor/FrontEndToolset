<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ZCard from '@/components/ZCard/index.vue'
import type { ListType } from '@/types/com'

const list = ref<ListType[]>([
  {
    title: 'TC39标准',
    type: '文档',
    url: 'https://tc39.es/zh-Hans/',
  },
  {
    title: 'javascript在线编辑',
    url: 'http://jsbin.com/?html,js,output',
    type: '编辑器',
  },
  {
    title: '在线编辑代码codesandbox',
    url: 'https://codesandbox.io/',
    type: '编辑器',
  },
  {
    title: 'json Editor',
    url: 'http://jsoneditoronline.org/#left=local.kadozu&right=local.gekegi',
    type: '编辑器',
  },
  {
    title: 'MDN Web',
    url: 'https://developer.mozilla.org/zh-CN/',
    type: '文档',
  },
  {
    title: 'caniuse 浏览器兼容性各属性',
    url: 'https://caniuse.com/ciu/index',
    type: '文档',
  },
  {
    title: 'Vercel v0根据文本生成UI界面代码',
    url: 'https://v0.dev/',
    type: '文档',
  },
  // 工具
  {
    title: 'eruda(手机网页调试面板)',
    url: 'https://github.com/liriliri/eruda',
    type: '工具',
  },
  {
    title: 'vConsole',
    url: 'https://github.com/Tencent/vConsole/blob/dev/README_CN.md',
    type: '工具',
  },
  {
    title: 'tailwindcss中文文档',
    url: 'https://www.tailwindcss.cn/',
    type: '工具',
  },
  {
    title: '为开发者打造的演示文稿工具',
    url: 'https://cn.sli.dev/',
    type: '工具',
  },
  {
    title: '图片压缩',
    url: 'https://docsmall.com/image-compress',
    type: '工具',
  },
  {
    title: '腾讯QQ浏览器在线工具箱',
    url: 'https://tool.browser.qq.com/',
    type: '工具',
  },
  // javascript库
  {
    title: 'file-saver',
    url: 'https://github.com/eligrey/FileSaver.js#readme',
    type: 'javascript库',
  },
  {
    title: '前端rsa加解密工具(兼容小程序环境)',
    url: 'https://github.com/neohan666/wxmp-rsa',
    type: 'javascript库',
  },
  {
    title: '代码高亮，自动语言检测 highlightjs',
    url: 'https://highlightjs.org/',
    type: 'javascript库',
  },
  {
    title: 'codemirror 可扩展的代码编辑器',
    url: 'https://codemirror.net/',
    type: 'javascript库',
  },
  // vue3
  {
    title: '官网',
    url: 'https://cn.vuejs.org/',
    type: 'vue3',
  },
  {
    title: 'Vue.js 挑战合集',
    url: 'https://github.com/webfansplz/vuejs-challenges/blob/main/README.zh-CN.md',
    type: 'vue3',
  },
  {
    title: 'VueUse',
    url: 'https://vueuse.org/',
    type: 'vue3',
  },
  {
    title: 'vite',
    url: 'https://cn.vitejs.dev/',
    type: 'vue3',
  },
  {
    title: 'pinia',
    url: 'https://pinia.vuejs.org/',
    type: 'vue3',
  },
  // vue2
  {
    title: 'vue2官网',
    url: 'https://v2.cn.vuejs.org/v2/guide/',
    type: 'vue2',
  },
  // 切图
  {
    title: 'pxcook 高效易用的自动标注工具, 生成前端代码, 设计研发协作利器',
    url: 'https://www.fancynode.com.cn/pxcook',
    type: '切图',
  },
  {
    title: '在线ps',
    url: 'https://www.photopea.com/',
    type: '切图',
  },
  // 字体
  {
    title: '带有编程连字的免费等宽字体 FiraCode',
    url: 'https://github.com/tonsky/FiraCode',
    type: '字体',
  },
  // javascript运行时
  {
    title: 'Bun(它的核心是 Bun 运行时，一个快速的 JavaScript 运行时，旨在替代 Node.js。它是用Zig编写的，由JavaScriptCore提供支持，大大减少了启动时间和内存使用量。)',
    url: 'https://github.com/oven-sh/bun',
    type: 'javascript运行时',
  },
  {
    title: 'Bun(是一个简单、现代且安全的运行时 对于使用 V8 并在 Rust 中构建的 JavaScript 和 TypeScript。)',
    url: 'https://github.com/denoland/deno',
    type: 'javascript运行时',
  },
])
</script>

<style scoped lang="less">
</style>
