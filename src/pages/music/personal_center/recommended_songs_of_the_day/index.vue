<template>
  <refresh-data @refresh="refresh"/>

  <el-table :data="playList" stripe style="width: 100%"
            :row-class-name="tableRowClassName"
  >
    <el-table-column label="序号">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="标题" />
    <el-table-column label="歌手">
      <template #default="scope">
        {{ formatSinger(scope.row.ar) }}
      </template>
    </el-table-column>
    <el-table-column label="时长">
      <template #default="scope">
        {{ generateTime(scope.row?.dt / 1000) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <img class="action_play" v-if="scope.row.id === playingSong?.id" src="http://vue3.admin.qiniu.start6.cn/%E6%92%AD%E6%94%BE.png" alt="">
        <el-button @click="playFun(scope.row)" type="primary">

          播放 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import {
  computed, ref, watch,
} from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import http from '@/utils/request';
import { log } from '@/utils/log';

import business from '@/utils/business';
import { Song, SongPalyList } from '@/types/music/detail';
import { DailyRecommendedSongData, DailySong } from '@/types/music/my_play_list';
import RefreshData from '@/components/RefreshData/index.vue';

const storeU = useStore();
const playList = ref<DailySong[]>([]);

async function getList() {
  http.get<DailyRecommendedSongData>('music/recommend/songs').then((res) => {
    playList.value = res.data.data.dailySongs;
  });
}

// 当前选择播放的歌曲
const playingSong = computed(() => storeU.state.music.data);
function tableRowClassName({ row }) {
  if (row.id === playingSong.value?.id) {
    return 'success-row';
  }
  return '';
}
const userInfo = computed(() => storeU.state.userInfo.data);
watch(userInfo, (newVal) => {
  if (newVal) {
    getList();
  }
});

function refresh() {
  getList();
}

/**
 * 获取单条播放地址
 */
function getIdsList(id: number) {
  return http.get<SongPalyList>('/music/song/url', {
    params: {
      id,
    },
  });
}

function formatSinger(val) {
  const names: string[] = [];
  val.forEach((item) => {
    names.push(item.name);
  });
  return names.join(',');
}

async function playFun(item: Song) {
  log('song', item);
  const r = business.showLoading();
  const result = await getIdsList(item.id);
  business.hideLoading(r);
  const playData = result.data.data;
  if (playData.length > 0) {
    storeU.commit('music/setData', item);
    storeU.commit('music/setPlayData', playData[0]);
  } else {
    ElMessage.error('不存在播放url');
  }
}

function generateTime(time: number) {
  let timeStr = '';
  const stringFormat = (i) => (i < 10 ? `0${i}` : `${i}`);
  let minuteTime = 0;
  let secondTime = 0;
  let hourTime = 0;
  if (time < 60) {
    timeStr = `00:${stringFormat(time)}`;
  } else if (time >= 60 && time < 3600) {
    minuteTime = parseInt(String(time / 60), 10);
    secondTime = parseInt(String(time % 60), 10);
    timeStr = `${stringFormat(minuteTime)}:${stringFormat(secondTime)}`;
  } else if (time >= 3600) {
    const t = parseInt(String(time % 3600), 10);
    hourTime = parseInt(String(time / 3600), 10);
    minuteTime = parseInt(String(t / 60), 10);
    secondTime = parseInt(String(t % 60), 10);
    timeStr = `${stringFormat(hourTime)}:${stringFormat(minuteTime)}:${stringFormat(
      secondTime,
    )}`;
  }
  return timeStr;
}
</script>
<style  lang="less">
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-lighter);
}
.action_play {
  width: 30px;
  height: 30px;
  vertical-align: bottom;
  margin-right: 15px;
}
</style>
