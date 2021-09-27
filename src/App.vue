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
import {useStore} from 'vuex';
const { ipcRenderer } = require('electron')

export default defineComponent({
  name: 'App',
  setup() {
    const list = ref(['Json', 'Translate']);
    const router = useRouter()
    const store = useStore()
    onMounted(() => {
      // 监听键盘快捷键
      ipcRenderer.on("BaiduTranslate", (event, arg) => {
        console.log('text', arg)
        store.commit('MenuBar/setIndex', '百度翻译')
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
