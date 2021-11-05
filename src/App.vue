<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="list">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CommVariable from "@/comm_variable/comm_variable.json";
import Business from '@/utils/business'
import { ElMessage } from "element-plus";

const { ipcRenderer, clipboard } = require('electron')

export default defineComponent({
  name: 'App',
  setup() {
    const list = ref(['Json', 'Translate']);
    const router = useRouter()
    const store = useStore()
    onMounted(() => {
      // 注册键盘监听事件
      Business.registerShortcutKeys();
      // 监听键盘快捷键 是否触发
      ipcRenderer.on(CommVariable.channel.SHORTCUT, (event, arg) => {
        switch (arg){
          case CommVariable.Config.ShortcutKey[0].label:
            const text = clipboard.readText();
            store.commit('MenuBar/setIndex', '百度翻译')
            router.push({
              path: '/translate',
              query: {
                title: text
              }
            })
            break;
            case CommVariable.Config.ShortcutKey[1].label:
              router.push({
                path: '/daily_muse_see',
              })
              break;
            default:
        }
      })

      // 监听主进程发送的事件
      ipcRenderer.on(CommVariable.channel.SWITCH_ROUTE, function(event, msg) {
        console.log(msg, '匹配事件');
        switch (msg) {
          case CommVariable.method.HELP:
            router.push({
              path: '/my',
            })
            break;
            case CommVariable.method.SHORTCUT:
              router.push({
                path: '/shortcut_key'
              })
              break;
          default:
            ElMessage.info("没有匹配事件");
        }
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
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>
