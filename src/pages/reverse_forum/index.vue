<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ListType } from '@/types/com'
import ZCard from '@/components/ZCard/index.vue'

const list = ref<ListType[]>([
  // 文档--------------
  {
    title: '看雪学苑-看雪-安全培训|安全招聘|',
    url: 'https://www.pediy.com',
    type: '文档',
  },
  {
    title: 'FreeBuf网络安全行业门户',
    url: 'https://www.freebuf.com',
    type: '文档',
  },
  {
    title: '吾爱破解 - LCG - LSG|安卓破解|病毒分析|',
    url: 'https://www.52pojie.cn',
    type: '文档',
  },
  {
    title: '看雪论坛-安全社区|安全招聘|',
    url: 'https://bbs.pediy.com',
    type: '文档',
  },
  // 文档--------------
])
</script>

<style scoped lang="less">

</style>
