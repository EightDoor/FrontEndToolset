<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ListType } from '@/types/com'
import ZCard from '@/components/ZCard/index.vue'

const list = ref<ListType[]>([
  {
    title: 'spring initializr',
    url: 'https://start.springboot.io/',
    type: 'spring-boot',
  },
  {
    title: 'mybatis',
    url: 'https://mybatis.net.cn/',
    type: 'spring-boot',
  },
  {
    title: 'mybatis-plus',
    url: 'https://www.mybatis-plus.com/',
    type: 'spring-boot',
  },
  {
    title: 'mvn',
    url: 'https://mvnrepository.com/',
    type: '工具',
  },
  {
    title: 'openjdk',
    url: 'https://openjdk.org/',
    type: '文档',
  },
  {
    title: 'hutool',
    url: 'https://hutool.cn/',
    type: '工具',
  },
  {
    title: 'Java学习+面试指南',
    url: 'https://github.com/Snailclimb/JavaGuide',
    type: '文档',
  },
  {
    title: 'Java教程',
    url: 'https://www.liaoxuefeng.com/wiki/1252599548343744',
    type: '文档',
  },
])
</script>

<style scoped lang="less">

</style>
