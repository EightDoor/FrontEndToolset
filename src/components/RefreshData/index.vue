<template>
  <div class="refresh_data">
    <el-button @click="refresh" :icon="Refresh">刷新</el-button>
  </div>
</template>
<script lang="ts" setup>
import { Refresh } from '@element-plus/icons';

const emit = defineEmits(['refresh']);

function refresh() {
  emit('refresh');
}

</script>
<style lang="less" scoped>
.refresh_data {
  position: fixed;
  right: 15px;
  bottom: 15px;
}
</style>
