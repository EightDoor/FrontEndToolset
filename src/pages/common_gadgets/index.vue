<template>
  <el-tabs tab-position="top">
    <el-tab-pane v-for="(item, index) in list" :key="index" lazy :label="item.label">
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { markRaw, ref } from 'vue'
import type { ListType } from '@/pages/gadgets/index.vue'
import ExchangeRate from '@/pages/common_gadgets/exchangeRate.vue'
import TextComparison from '@/pages/text_comparison/index.vue'
import NginxSettingFormat from '@/pages/common_gadgets/ngin_setting_format.vue'
const list = ref<ListType[]>([
  {
    label: '文本对比',
    component: markRaw(TextComparison),
  },
  {
    label: 'nginx配置格式化',
    component: markRaw(NginxSettingFormat),
  },
  {
    label: '汇率换算',
    component: markRaw(ExchangeRate),
  },
])
</script>

<style scoped lang="less"></style>
