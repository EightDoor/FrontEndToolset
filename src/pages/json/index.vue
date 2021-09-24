<template>
  <el-tabs type="border-card" @tab-click="change">
    <el-tab-pane v-for="(item, index) in data" :key="index" :label="item.title">
      <template v-if="index === selectIndex">
        <component :is="item.component"></component>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({ name: "Json" })
</script>
<script setup lang="ts">
interface DataType {
  title: string;
  component: any;
}
import { ref } from 'vue';
import JsonComponent from './json.vue';
import JsonToTs from './json_to_typescript.vue';
const selectIndex = ref(0)
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

function change(val: any) {
  selectIndex.value = Number(val.index);
}

</script>
