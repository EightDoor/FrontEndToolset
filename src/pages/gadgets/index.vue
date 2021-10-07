<template>
  <el-tabs tab-position="top">
    <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.label">
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
export default {
  name: 'Gadgets',
}
</script>
<script lang="ts" setup>
import { markRaw, ref } from "vue";
import Calculator from './calculator/index.vue';
import ColorHexConversion from './color_hex_conversion.vue';
import UrlEncoding from './url_encoding.vue';

interface ListType {
  label: string;
  component: any;
}
const list = ref<ListType[]>([
  {
    label: '颜色进制转换',
    component: markRaw(ColorHexConversion),
  },
  {
    label: '计算器',
    component: markRaw(Calculator),
  },
  {
    label: 'Url编码解码',
    component: markRaw(UrlEncoding),
  }
])
</script>
