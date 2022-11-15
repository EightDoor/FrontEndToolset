<template>
  <el-tabs type="border-card" @tab-click="change">
    <el-tab-pane v-for="(item, index) in data" :key="index" :label="item.title">
      <template v-if="index === selectIndex">
        <div class="container_json">
          <component :is="item.component" />
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JsonComponent from './json.vue'
import JsonToTs from './json_to_typescript.vue'

interface DataType {
  title: string
  component: any
}
const selectIndex = ref(0)
const data = ref<DataType[]>([
  {
    title: '格式化',
    component: JsonComponent,
  },
  {
    title: 'json to ts',
    component: JsonToTs,
  },
])

function change(val: any) {
  selectIndex.value = Number(val.index)
}
</script>

<style scoped lang="less"></style>
