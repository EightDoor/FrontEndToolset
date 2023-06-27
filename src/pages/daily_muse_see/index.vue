<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ZCard from '@/components/ZCard/index.vue'
import type { ListType } from '@/types/com'

const list = ref<ListType[]>([
  {
    title: 'github中文排行榜',
    url: 'https://github.com/GrowingGit/GitHub-Chinese-Top-Charts',
    type: '文档',
  },
  {
    title: '开发人员路线图',
    url: 'https://roadmap.sh/',
    type: '文档',
  },
  {
    title: '开源中国',
    url: 'https://www.oschina.net/',
    type: '文档',
  },
])
</script>

<style scoped lang="less">

</style>
