<template>
  <ul class="ul">
    <li v-for="(item, index) in list" :key="index" @click="change(item, index)">
      <el-button type="primary">{{ item.title }}</el-button>
      <img v-if="selectIndex === index" class="img" src="/images/tap.png" alt />
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {useStore} from 'vuex';

const Slider = defineComponent({
  name: 'slider',
  setup() {
    const selectIndex = ref(0)
    const router = useRouter();
    const route = useRoute()
    const store = useStore()
    const list = reactive<Layout.SliderType[]>([
      {
        title: '首页',
        url: '/home',
      },
      {
        title: "node环境安装与配置",
        url: "/env_install"
      },
      {
        title: "json格式化",
        url: "/json"
      },
      {
        title: "json to dart",
        url: "/json_to_dart"
      },
      {
        title: "百度翻译",
        url: "/translate"
      },
      {
        title: "小工具",
        url: "/gadgets"
      },
      {
        title: "github",
        url: '/github'
      },
    ]);
    function change(item: any, index: number) {
      selectIndex.value = index;
      store.commit('MenuBar/setIndex', item.title)
      console.log(`当前选择的: ${JSON.stringify(item)}`);
      router.push(item.url);
    }

    function getPath() {
      const path = route.path;
      const index = list.findIndex((item) => item.url === path);
      if (index !== -1) {
        selectIndex.value = index;
      }
    }

    const title = computed(()=>store.state.MenuBar.title)
    watch(title, (newVal)=>{
      const v = list.findIndex((item)=>item.title === newVal);
      if(v !== -1) {
        selectIndex.value = v
      }
    })

    onMounted(() => {
      getPath()
    })
    return {
      //fun
      change,
      //data
      list,
      selectIndex
    };
  },
});

export default Slider;
</script>
<style lang="less" scoped>
@import "slider.module";
.img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  display: inline-block;
  margin-left: 15px;
}
</style>
