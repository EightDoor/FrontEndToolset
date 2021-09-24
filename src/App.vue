<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="list">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
const { ipcRenderer } = require('electron')

export default defineComponent({
  name: 'App',
  setup() {
    const list = ref(['Json', 'Translate']);
    const router = useRouter()
    onMounted(() => {
      // 监听键盘快捷键
      ipcRenderer.on("BaiduTranslate", (event, arg) => {
        console.log('text', arg)
        router.push({
          path: '/translate',
          query: {
            title: arg
          }
        })
      })
    })
    return {
      list
    }
  }
})
</script>
<style>
body,
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
