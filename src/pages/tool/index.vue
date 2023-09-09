<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ListType } from '@/types/com'
import ZCard from '@/components/ZCard/index.vue'

const list = ref<ListType[]>([
  {
    title: '免费pdf工具 PDF24 Tools',
    url: 'https://tools.pdf24.org/zh/',
    type: '工具',
  },
  {
    title: 'stackoverflow',
    url: ' https://stackoverflow.com/',
    type: '工具',
  },
  {
    title: '1Panel运维工具',
    url: 'https://github.com/1Panel-dev/1Panel',
    type: '工具',
  },
  {
    title: 'stackoverflow中文站点',
    url: 'https://stackoverflow.org.cn/',
    type: '工具',
  },
  {
    title: 'pandoc支持多种格式相互转换，比如docx、docx、pdf、html等',
    url: 'https://github.com/jgm/pandoc',
    type: '工具',
  },
])
</script>

<style scoped lang="less">

</style>
