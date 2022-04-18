<template>
  <refresh-data @refresh="refresh" />

  <div v-loading="loading">
    <ul v-if="list.length > 0" class="daily_song_container">
      <li @click="change(item)" v-for="(item, index) in list" :key="index">
        <img :src="item.coverImgUrl" :alt="item.name" />
        <div class="play_count">
          播放次数: {{ formatCount(item.playCount) }}
        </div>
        <div class="content">{{ item.name }}</div>
      </li>
    </ul>
    <el-empty v-else description="暂无歌曲"></el-empty>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { sortBy } from 'lodash-es';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SongListDetail } from '@/types/music';
import { log } from '@/utils/log';
import http from '@/utils/request';
import business from '@/utils/business';
import Constant from '@/utils/constant';
import store from '@/utils/store';
import { Playlist, UserPlayList } from '@/types/music/my_play_list';
import RefreshData from '@/components/RefreshData/index.vue';

const storeV = useStore();
const router = useRouter();
const loading = ref(false);
const list = ref<Playlist[]>([]);
function getSongList(id) {
  loading.value = true;
  http
    .get<UserPlayList>('music/user/playlist', {
      params: {
        uid: id,
        limit: 10000,
      },
    })
    .then((res) => {
      log('res.data', res.data);
      // 排序
      list.value = sortBy(res.data.playlist, 'playCount').reverse();
      console.log(list.value, 'val');
      loading.value = false;
    });
}

const userInfo = computed(() => storeV.state.userInfo.data);
watch(userInfo, (newVal) => {
  if (newVal) {
    getSongList(newVal.profile.userId);
  }
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

function refresh() {
  if (userInfo.value.profile.userId) {
    getSongList(userInfo.value.profile.userId);
  }
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
  li {
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
