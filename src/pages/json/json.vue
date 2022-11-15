<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="json格式化" name="json_format">
        <JsonFormat />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import JsonFormat from './json_format.vue'
const activeName = ref('json_format')
</script>

<style lang="less" scoped>

</style>
