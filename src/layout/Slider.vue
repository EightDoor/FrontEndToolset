<template>
  <ul class="ul">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :default-active="String(selectIndex)"
      class="slider"
    >
      <el-menu-item
        v-for="(item, index) in list"
        :key="index"
        :index="String(index)"
        @click="change(item, index)"
      >
        <template #title>
          {{ item.title }}
        </template>
      </el-menu-item>
    </el-menu>
  </ul>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, reactive, ref, watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import utils from '@/utils'

const Slider = defineComponent({
  name: 'LayoutSlider',
  setup() {
    const selectIndex = ref(0)
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const list = reactive<Layout.SliderType[]>([
      {
        title: '首页',
        url: '/home',
      },
      {
        title: '每日必看',
        url: '/daily_muse_see',
      },
      {
        title: '百度翻译',
        url: '/translate',
      },
      {
        title: 'json数据处理',
        url: '/json',
      },
      {
        title: '开发小工具',
        url: '/gadgets',
      },
      {
        title: '常用小工具',
        url: '/commonGadgets',
      },
      {
        title: '前端开发',
        url: '/front',
      },
      {
        title: 'java',
        url: '/java',
      },
      {
        title: '工具',
        url: '/tool',
      },
      {
        title: 'go',
        url: '/go',
      },
      {
        title: 'windows',
        url: '/windows',
      },
      {
        title: '黑苹果',
        url: '/black_apple',
      },
      {
        title: '逆向论坛',
        url: '/reverse_forum',
      },
      // {
      //   title: '音乐',
      //   url: '/music',
      // },
      {
        title: 'github',
        url: 'https://github.com/EightDoor/FrontEndToolset',
        type: 'url',
      },
    ])
    function change(item: Layout.SliderType, index: number) {
      console.log(`当前选择的: ${JSON.stringify(item)}`)
      if (item.type === 'url') {
        utils.openUrl(item.url, item.title)
      }
      else {
        selectIndex.value = index
        store.commit('MenuBar/setIndex', item.title)
        router.push(item.url)
      }
    }

    function getPath() {
      const { path } = route
      const index = list.findIndex(item => item.url === path)
      if (index !== -1)
        selectIndex.value = index
    }

    const title = computed(() => store.state.MenuBar.title)
    watch(title, (newVal) => {
      const v = list.findIndex(item => item.title === newVal)
      if (v !== -1)
        selectIndex.value = v
    })

    onMounted(() => {
      getPath()
    })
    return {
      // fun
      change,
      // data
      list,
      selectIndex,
    }
  },
})

export default Slider
</script>

<style lang="less" scoped>
@import "slider.module";
</style>
