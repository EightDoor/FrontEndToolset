<template>
  <el-config-provider size="large" :locale="locale">
    <router-view />
    <!-- 播放器 -->
    <PlayAudio />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import PlayAudio from '@/pages/music/play/audio.vue'

export default defineComponent({
  name: 'App',
  components: {
    PlayAudio,
  },
  setup() {
    return {
      locale: zhCn,
    }
  },
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body,
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'custom_font';
}
</style>
