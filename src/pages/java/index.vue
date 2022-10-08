<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ListType } from '@/types/com'
import ZCard from '@/components/ZCard/index.vue'

const list = ref<ListType[]>([
  // spring-boot--------------
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
    title: 'spring-boot-starters',
    url: 'https://github.com/spring-projects/spring-boot/tree/main/spring-boot-project/spring-boot-starters',
    type: 'spring-boot',
  },
  // spring-boot--------------
  // 工具--------------
  {
    title: 'mvn',
    url: 'https://mvnrepository.com/',
    type: '工具',
  },
  {
    title: 'hutool',
    url: 'https://hutool.cn/',
    type: '工具',
  },
  // 工具--------------
  // 文档--------------
  {
    title: 'openjdk',
    url: 'https://openjdk.org/',
    type: '文档',
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
  {
    title: 'Spring Boot 教程、技术栈示例代码，快速简单上手教程。',
    url: 'https://github.com/ityouknow/spring-boot-examples',
    type: '文档',
  },
  {
    title: '互联网 Java 工程师进阶知识完全扫盲：涵盖高并发、分布式、高可用、微服务、海量数据处理等领域知识',
    url: 'https://github.com/doocs/advanced-java',
    type: '文档',
  },
  // 文档--------------
])
</script>

<style scoped lang="less">

</style>
