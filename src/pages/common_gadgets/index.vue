<template>
  <el-tabs tab-position="top">
    <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.label">
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { markRaw, ref } from 'vue'
import type { ListType } from '@/pages/gadgets/index.vue'
import ExchangeRate from '@/pages/common_gadgets/exchangeRate.vue'
import SpeedTest from '@/pages/common_gadgets/speedTest.vue'

const list = ref<ListType[]>([
  {
    label: '汇率换算',
    component: markRaw(ExchangeRate),
  },
  {
    label: '网速测试',
    component: markRaw(SpeedTest),
  },
])
</script>

<style scoped lang="less"></style>
