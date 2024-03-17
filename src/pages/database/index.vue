<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ZCard from '@/components/ZCard/index.vue'
import type { ListType } from '@/types/com'

const list = ref<ListType[]>([
  {
    title: 'MongoDB中文手册',
    type: 'mongodb',
    url: 'https://docs.mongoing.com/',
  },
  {
    title: 'MongoDB英文手册',
    type: 'mongodb',
    url: 'https://www.mongodb.com/docs/manual/tutorial/getting-started/',
  },
])
</script>

<style scoped lang="less">

</style>
