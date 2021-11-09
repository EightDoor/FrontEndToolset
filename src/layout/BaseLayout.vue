<template>
  <el-container class="container">
    <el-aside class="aside" width="200px">
      <Slider />
    </el-aside>
    <el-main class="content">
      <router-view />
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Slider from '@/layout/Slider.vue';

const BaseLayout = defineComponent({
  name: 'baseLayout',
  components: { Slider },
  setup() { },
});

export default BaseLayout;
</script>
<style scoped lang="less">
@height: 20px;
.content {
  height: 100vh;
  overflow-y: auto;
}
</style>
