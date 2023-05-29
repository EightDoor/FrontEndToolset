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
    title: '帮小忙（腾讯qq浏览器在线工具箱）',
    url: 'https://tool.browser.qq.com/',
    type: '工具',
  },
  {
    title: 'vue2大屏自适应组件',
    url: 'https://github.com/rocyuan666/vue2-scale-box',
    type: '工具',
  },
  {
    title: '🛠️启动Vite驱动的Vue项目的推荐方式',
    url: 'https://github.com/vuejs/create-vue',
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
])
</script>

<style scoped lang="less">
</style>
