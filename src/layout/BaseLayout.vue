<script lang="ts">
import Slider from '@/layout/Slider.vue';
import { defineComponent } from 'vue';

const BaseLayout = defineComponent({
  name: 'BaseLayout',
  components: { Slider },
  setup() {},
})

export default BaseLayout
</script>

<template>
  <el-container class="container">
    <el-aside class="aside" width="200px">
      <Slider />
    </el-aside>
    <el-main class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<style scoped lang="less">
@height: 20px;
.content {
  height: 100vh;
  overflow-y: auto;
}
</style>
