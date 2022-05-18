<script lang="ts" setup>
import { Refresh } from '@element-plus/icons'

const emit = defineEmits(['refresh'])

function refresh() {
  emit('refresh')
}
</script>

<template>
  <div class="refresh_data">
    <el-button :icon="Refresh" @click="refresh">
      刷新
    </el-button>
  </div>
</template>

<style lang="less" scoped>
.refresh_data {
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 100;
}
</style>
