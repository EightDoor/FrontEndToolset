<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
const { ipcRenderer } = require('electron')

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
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