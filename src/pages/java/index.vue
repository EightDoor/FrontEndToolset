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
  {
    title: 'jrebel激活',
    url: 'http://jrebel-license.jiweichengzhu.com/',
    type: '工具',
  },
  {
    title: 'java镜像下载(各种JAVA JDK的镜像分发)',
    url: 'https://www.injdk.cn/',
    type: '工具',
  },
  {
    title: 'banner生成',
    url: 'http://patorjk.com/software/taag/#p=testall&f=Graffiti&t=Hello',
    type: '工具',
  },
  {
    title: '阿里云云效 Maven',
    url: 'https://developer.aliyun.com/mvn/guide',
    type: '工具',
  },
  {
    title: 'Easy Excel（快速、简洁、解决大文件内存溢出的Excel处理工具）',
    url: 'https://easyexcel.opensource.alibaba.com/',
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
    title: '廖雪峰java教程',
    url: 'https://www.liaoxuefeng.com/wiki/1252599548343744',
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
  {
    title: 'fastJson2',
    url: ' https://alibaba.github.io/fastjson2/',
    type: '工具',
  },
  {
    title: 'mybatis中文文档',
    url: ' https://mybatis.org/mybatis-3/zh/index.html',
    type: '工具',
  },
  {
    title: 'SpringSecurity框架教程-Spring Security+JWT实现项目级前端分离认证授权',
    url: 'https://www.bilibili.com/video/BV1mm4y1X7Hc?p=1&vd_source=6df11dc86c4e13ea88a67a6ef88d77bc',
    type: '学习视频',
  },
  {
    title: 'java8函数式编程(Lambda表达式，Optional，Stream流)从入门到精通-最通俗易懂的函数式编程教学',
    url: 'https://www.bilibili.com/video/BV1Gh41187uR?p=1&vd_source=6df11dc86c4e13ea88a67a6ef88d77bc',
    type: '学习视频',
  },
  {
    title: '高并发的哲学原理 Philosophical Principles of High Concurrency',
    url: 'https://github.com/johnlui/PPHC',
    type: '学习视频',
  },
  // 文档--------------
])
</script>

<style scoped lang="less">

</style>
