<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ZCard from '@/components/ZCard/index.vue'
import type { ListType } from '@/types/com'

const list = ref<ListType[]>([
  {
    title: '通义千问(阿里)',
    type: '工具',
    url: 'https://tongyi.aliyun.com/',
  },
  {
    title: '文心一言(百度)',
    type: '工具',
    url: 'https://yiyan.baidu.com/welcome',
  },
  {
    title: '智能创作助手(腾讯)',
    type: '工具',
    url: 'https://effidit.qq.com/',
  },
  {
    title: 'AIGC导航',
    type: '工具',
    url: 'https://www.aigc.cn/',
  },
])
</script>

<style scoped lang="less">

</style>
