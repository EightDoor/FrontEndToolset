<script setup lang="ts">
import GoHome from '@/components/GoHome/index.vue'
</script>

<template>
  <div class="container">
    <go-home />
    <el-descriptions title="联系方式">
      <el-descriptions-item label="qq">
        851708184
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">
        851708184@qq.com
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 15px;
}
</style>
