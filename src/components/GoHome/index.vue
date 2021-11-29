<template>
  <div class="container_go_home">
    <el-row class="go_home">
      <el-col :span="24">
        <el-button type="primary" @click="goHome"
          >返回{{ !props.path ? "首页" : "" }}</el-button
        >
      </el-col>
    </el-row>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const props = defineProps<{
  path?: string;
}>();

const router = useRouter();
function goHome() {
  console.log(props.path, "path");
  router.push(props.path ?? "/");
}
</script>
<style scoped lang="less">
.container_go_home {
  padding: 15px;
  .go_home {
    margin-bottom: 15px;
  }
}
</style>
