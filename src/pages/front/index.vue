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
  // 工具
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
    title: '免费pdf工具 PDF24 Tools',
    url: 'https://tools.pdf24.org/zh/',
    type: '工具',
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
])
</script>

<style scoped lang="less">

</style>
