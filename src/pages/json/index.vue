<template>
  <el-tabs type="border-card">
    <el-tab-pane v-for="(item, index) in data" :key="index" :label="item.title">
      <component :is="item.component"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">

interface DataType {
  title: string;
  component: any;
}
import { ref } from 'vue';
import JsonComponent from './json.vue';
import JsonToTs from './json_to_typescript.vue';
const data = ref<DataType[]>([
  {
    title: "json格式化",
    component: JsonComponent
  },
  {
    title: "json to ts",
    component: JsonToTs,
  }
])

</script>