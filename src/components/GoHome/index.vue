<template>
  <el-row class="container_go_home">
    <el-col :span="24">
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter()
function goHome() {
  router.push("/")
}
</script>
<style scoped lang="less">
.container_go_home {
  margin-bottom: 15px;
}
</style>
