<template>
  <ul v-loading="loading" class="daily_song_container">
    <li @click="change(item)" v-for="(item, index) in list" :key="index">
      <img :src="item.picUrl" :alt="item.name" />
      <div class="play_count">播放次数: {{ formatCount(item.playCount) }}</div>
      <div class="content">{{ item.name }}</div>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { sortBy } from 'lodash';
import { useRouter } from 'vue-router';
import { MusicType, RecommendedSongList, SongListDetail } from '@/types/music';
import { log } from '@/utils/log';
import http from '@/utils/request';
import business from '@/utils/business';
import Constant from '@/utils/constant';
import store from '@/utils/store';

const router = useRouter();
const loading = ref(false);
const list = ref<RecommendedSongList[]>([]);
function getSongList() {
  loading.value = true;
  http.get<MusicType<RecommendedSongList>>('music/personalized').then((res) => {
    log('res.data', res.data.result);
    // 排序
    const result = sortBy(res.data.result, 'playCount').reverse();
    list.value = result;
    loading.value = false;
  });
}
onMounted(() => {
  getSongList();
});

function formatCount(num: number) {
  let result = '';
  if (num >= 100000000) {
    result = `${Math.round(num / 10000000) / 10}亿`;
  } else if (num >= 10000) {
    result = `${Math.round(num / 1000) / 10}万`;
  }
  return result;
}

async function change(item) {
  log('item', item);
  const r = business.showLoading();
  const result = await http.get<SongListDetail>('/music/playlist/detail', {
    params: {
      id: item.id,
    },
  });
  const ids: number[] = [];
  result.data.playlist.trackIds.forEach((v) => {
    ids.push(v.id);
  });
  await store.set(Constant.storageListIds, ids.join(','));
  business.hideLoading(r);
  router.push('/music_list');
}
</script>
<style lang="less" scoped>
.daily_song_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > li {
    position: relative;
    height: 250px;
    width: 200px;
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    &:hover {
      cursor: pointer;
    }
    & > img {
      border-radius: 10px;
      height: 200px;
      width: 100%;
    }
  }

  .play_count {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
  }
  .content {
  }
}
</style>
