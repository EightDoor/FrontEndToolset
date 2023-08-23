<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ZCard from '@/components/ZCard/index.vue'
import type { ListType } from '@/types/com'

const list = ref<ListType[]>([
  {
    title: 'dcloud插件库',
    type: 'uni-app',
    url: 'https://ext.dcloud.net.cn/',
  },
  {
    title: 'z-tabs',
    type: '常用库',
    url: 'https://ext.dcloud.net.cn/plugin?id=8308',
  },
  {
    title: 'z-paging分页',
    type: '常用库',
    url: 'https://z-paging.zxlee.cn/',
  },
  {
    title: '小程序 使用 tailwindcss 全方面解决方案',
    type: '常用库',
    url: 'https://weapp-tw.icebreaker.top/',
  },
  {
    title: 'uview2.0',
    type: 'ui',
    url: 'https://www.uviewui.com/?from=thosefree.com',
  },
])
</script>

<style scoped lang="less">

</style>
