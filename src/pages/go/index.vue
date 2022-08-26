<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ListType } from '@/types/com'
import ZCard from '@/components/ZCard/index.vue'

const list = ref<ListType[]>([
  {
    title: 'go官方文档',
    url: 'https://golang.google.cn/',
    type: '文档',
  },
  {
    title: 'Golang标准库文档',
    url: 'https://studygolang.com/pkgdoc',
    type: '文档',
  },
  {
    title: 'Go语言高级编程(Advanced Go Programming)',
    url: 'https://chai2010.cn/advanced-go-programming-book/',
    type: '文档',
  },
  {
    title: 'go Web编程',
    url: 'https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/preface.md',
    type: '文档',
  },
  {
    title: 'Go 语言学习资料与社区索引',
    url: 'https://github.com/unknwon/go-study-index',
    type: '文档',
  },
  {
    title: 'Go语言101',
    url: 'https://gfw.go101.org/article/101.html',
    type: '文档',
  },
])
</script>

<style scoped lang="less">

</style>
