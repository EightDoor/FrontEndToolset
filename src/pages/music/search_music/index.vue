<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { isArray } from 'lodash-es'
import { useStore } from 'vuex'
import type { Artist, SearchList } from '@/types/music/search_music_type'
import type { SongPalyList } from '@/types/music/detail'
import { log } from '@/utils/log'
import business from '@/utils/business'
import http from '@/utils/request'

const storeU = useStore()

const searchName = ref('')
const tableData = ref<SearchList[]>([])
const total = ref(0)
const page = ref(1)
function search() {
  if (searchName.value) {
    const keywords = searchName.value
    http
      .get('/music/search', {
        params: {
          keywords,
          limit: 10,
          offset: (page.value - 1) * 10,
        },
      })
      .then((res) => {
        tableData.value = res.data.result.songs
        total.value = res.data.result.songCount
      })
  }
  else {
    ElMessage.info({
      message: '请输入搜索歌曲名称',
    })
  }
}

function formatText(item: Artist[]) {
  if (isArray(item)) {
    let r = ''
    item.forEach((v) => {
      r += `${v.name},`
    })
    return r
  }
  return ''
}

function currentChange(val: number) {
  page.value = val
  search()
}
async function action(item: SearchList) {
  log.i(item, 'song')
  const r = business.showLoading()
  const result = await getIdsList(item.id)
  business.hideLoading(r)
  const playData = result.data.data
  if (playData.length > 0) {
    console.log(playData, 'play')
    storeU.commit('music/setData', item)
    storeU.commit('music/setPlayData', playData[0])
  }
  else {
    ElMessage.error('不存在播放url')
  }
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
</script>

<template>
  <div class="top">
    <el-input
      v-model="searchName"
      class="space"
      placeholder="请输入搜索歌曲名称"
      clearable
    />
    <el-button type="primary" @click="search">
      搜索
    </el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="歌曲名称" />
    <el-table-column label="作者">
      <template #default="scope">
        {{ formatText(scope.row.artists) }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" @click="action(scope.row)">
          播放
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    style="margin-top: 15px"
    layout="prev, pager, next"
    :total="total"
    @current-change="currentChange"
  />
</template>

<style lang="less" scoped>
.space {
  width: 300px;
  margin-right: 15px;
}
.top {
  margin-bottom: 15px;
}
</style>
