<template>
  <login-status/>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane
      v-for="(item, index) in list"
      :key="index"
      :label="item.title"
      :name="item.name"
    >
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { log } from '@/utils/log';
import DailySongList from './daily_song/index.vue';
import LikeMusic from './like_music/index.vue';
import PersonalCenter from './personal_center/index.vue';
import MyPlayList from './personal_center/my_play_list/index.vue';
import RecommendedSongsOfTheDay from './personal_center/recommended_songs_of_the_day/index.vue';
import LoginStatus from './personal_center/login_status.vue';
import RefreshData from '@/components/RefreshData/index.vue';

const activeName = ref('recommendedSongsOfTheDay');
const list = [
  {
    title: '每日推荐歌曲',
    name: 'recommendedSongsOfTheDay',
    component: RecommendedSongsOfTheDay,
  },
  {
    title: '推荐歌单',
    name: 'dailySongRecommendation',
    component: DailySongList,
  },
  {
    title: '我的歌单',
    name: 'myPlayList',
    component: MyPlayList,
  },
  {
    title: '我喜欢的音乐',
    name: 'iLikeMusic',
    component: LikeMusic,
  },
  {
    title: '个人中心',
    name: 'personalCenter',
    component: PersonalCenter,
  },
];

function handleClick(val: any) {
  //
  log('val', val.index);
}

</script>
