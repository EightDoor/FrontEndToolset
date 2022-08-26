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
    title: 'vConsole',
    url: 'https://github.com/Tencent/vConsole/blob/dev/README_CN.md',
    type: '工具',
  },
])
</script>

<style scoped lang="less">

</style>
