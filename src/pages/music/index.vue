<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <e-tab-pane
      v-for="(item, index) in list"
      :key="index"
      :label="item.title"
      :name="item.name"
    >
      <component :is="item.component" />
    </e-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { log } from "@/utils/log";
import { ref } from "vue";
import DailySongList from "./daily_song/index.vue";
import LikeMusic from "./like_music/index.vue";
import PersonalCenter from "./personal_center/index.vue";

const activeName = ref("dailySongRecommendation");
const list = [
  {
    title: "每日歌曲推荐",
    name: "dailySongRecommendation",
    component: DailySongList,
  },
  {
    title: "我喜欢的音乐",
    name: "iLikeMusic",
    component: LikeMusic,
  },
  {
    title: "个人中心",
    name: "personalCenter",
    component: PersonalCenter,
  },
];

function handleClick(val: any) {
  //
  log("val", val.index);
}
</script>
