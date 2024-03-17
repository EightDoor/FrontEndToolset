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

  {
    title: 'JavaScript教程',
    url: 'https://wangdoc.com/javascript/basic/introduction',
    type: '学习',
  },
  {
    title: 'ES6 教程',
    url: 'https://wangdoc.com/es6/',
    type: '学习',
  },
  {
    title: 'Java教程',
    url: 'https://www.liaoxuefeng.com/wiki/1252599548343744',
    type: '学习',
  },
  {
    title: 'TypeScript 教程',
    url: 'https://www.ruanyifeng.com/blog/2023/08/typescript-tutorial.html',
    type: '学习',
  },
  {
    title: 'TypeScript 教程',
    url: 'https://www.ruanyifeng.com/blog/2023/08/typescript-tutorial.html',
    type: '学习',
  },
  {
    title: 'Hello 算法(动画图解、一键运行的数据结构与算法教程)',
    url: 'https://github.com/krahets/hello-algo',
    type: '学习',
  },
])
</script>

<style scoped lang="less">

</style>
