<script lang="ts" setup>
import {
  computed, ref, watch,
} from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import http from '@/utils/request'
import { log } from '@/utils/log'
import RefreshData from '@/components/RefreshData/index.vue'

import business from '@/utils/business'
import type {
  Song, SongIdsDetail, SongPalyList,
} from '@/types/music/detail'

const storeU = useStore()
const playList = ref<Song[]>([])
const loading = ref(false)
const list = ref<Song[]>([])

async function getList(id) {
  let url = 'music/likelist'
  url = await business.getCookie(url)
  playList.value = []
  list.value = []
  loading.value = true
  http.get(url, {
    params: {
      uid: id,
    },
  }).then((res: any) => {
    const { ids } = res.data

    getSongList(ids)
  })
}

function getSongList(ids: number[]) {
  const v = Math.ceil(ids.length / 1000)
  for (let i = 0; i < v; i += 1)
    sendSong(ids, i)
}
function sendSong(ids, i) {
  const result = cloneDeep(ids)
  // 获取歌曲详情
  http.get<SongIdsDetail>('/music/song/detail', {
    params: {
      ids: result.splice(i * 1000, 1000).join(','),
    },
  }).then((res) => {
    loading.value = false
    console.log(res.data.songs, 'data')
    if (res.data.songs)
      playList.value = playList.value.concat(res.data.songs)
  })
}
// 当前选择播放的歌曲
const playingSong = computed(() => storeU.state.music.data)
function tableRowClassName({ row }) {
  if (row.id === playingSong.value?.id)
    return 'success-row'

  return ''
}
const userInfo = computed(() => storeU.state.userInfo.data)
watch(userInfo, (newVal) => {
  if (newVal) {
    console.log(newVal.profile, 'p[')
    getList(newVal.profile.userId)
  }
})

function refresh() {
  if (userInfo.value)
    getList(userInfo.value.profile.userId)
}

/**
 * 获取单条播放地址
 */
function getIdsList(id: number) {
  return http.get<SongPalyList>('/music/song/url', {
    params: {
      id,
    },
  })
}

function formatSinger(val) {
  const names: string[] = []
  val.forEach((item) => {
    names.push(item.name)
  })
  return names.join(',')
}

async function playFun(item: Song) {
  storeU.commit('music/setSongList', playList.value)
  log.i(item, 'song')
  const r = business.showLoading()
  const result = await getIdsList(item.id)
  business.hideLoading(r)
  const playData = result.data.data
  if (playData.length > 0) {
    storeU.commit('music/setData', item)
    storeU.commit('music/setPlayData', playData[0])
  }
  else {
    ElMessage.error('不存在播放url')
  }
}

function generateTime(time: number) {
  let timeStr = ''
  const stringFormat = i => (i < 10 ? `0${i}` : `${i}`)
  let minuteTime = 0
  let secondTime = 0
  let hourTime = 0
  if (time < 60) {
    timeStr = `00:${stringFormat(time)}`
  }
  else if (time >= 60 && time < 3600) {
    minuteTime = parseInt(String(time / 60), 10)
    secondTime = parseInt(String(time % 60), 10)
    timeStr = `${stringFormat(minuteTime)}:${stringFormat(secondTime)}`
  }
  else if (time >= 3600) {
    const t = parseInt(String(time % 3600), 10)
    hourTime = parseInt(String(time / 3600), 10)
    minuteTime = parseInt(String(t / 60), 10)
    secondTime = parseInt(String(t % 60), 10)
    timeStr = `${stringFormat(hourTime)}:${stringFormat(minuteTime)}:${stringFormat(
      secondTime,
    )}`
  }
  return timeStr
}

// 表格分页
const total = ref(0)
watch(playList, (newVal) => {
  total.value = newVal.length
  storeU.commit('music/setSongList', newVal)
  pagination(1)
})
function change(val) {
  pagination(val)
}
function pagination(val) {
  const v = val - 1
  const result: Song[] = []
  playList.value.forEach((item, index) => {
    if (index > v * 10 && index < val * 10)
      result.push(item)
  })
  list.value = result
}
</script>

<template>
  <refresh-data @refresh="refresh" />
  <el-table
    v-loading="loading" :data="list" stripe style="width: 100%"
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
        <img v-if="scope.row.id === playingSong?.id" class="action_play" src="http://vue3.admin.qiniu.start6.cn/%E6%92%AD%E6%94%BE.png" alt="">
        <el-button type="primary" @click="playFun(scope.row)">
          播放
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination small layout="prev, pager, next" :total="total" @current-change="change" />
</template>

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
