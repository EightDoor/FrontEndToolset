<template>
  <go-home path="/music">
    <el-table :data="playList" stripe style="width: 100%">
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
          <el-button @click="playFun(scope.row)" type="primary"> 播放 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </go-home>
</template>
<script lang="ts" setup>
import GoHome from "@/components/GoHome/index.vue";
import { onActivated, ref } from "vue";
import http from "@/utils/request";
import { log } from "@/utils/log";
import store from "@/utils/store";
import Constant from "@/utils/constant";
import business from "@/utils/business";
import { Song, SongIdsDetail, SongPalyList } from "@/types/music/detail";
import { useStore } from "vuex";
import Business from "@/utils/business";
import { ElMessage } from "element-plus";

const storeU = useStore();
const playList = ref<Song[]>([]);

onActivated(() => {
  getList();
});

async function getList() {
  const r = business.showLoading();
  const ids = await store.get(Constant.storageListIds);
  if (ids) {
    http
      .get<SongIdsDetail>("/music/song/detail", {
        params: {
          ids,
        },
      })
      .then(async (res) => {
        log("res.data", res.data.songs);
        playList.value = res.data.songs;
        log("res.data.data", res.data.songs);
        storeU.commit("music/setSongList", res.data.songs);
        business.hideLoading(r);
      });
  }
}
/**
 * 获取单条播放地址
 */
function getIdsList(id: number) {
  return http.get<SongPalyList>("/music/song/url", {
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
  return names.join(",");
}

async function playFun(item: Song) {
  log("song", item);
  const r = Business.showLoading();
  const result = await getIdsList(item.id);
  Business.hideLoading(r);
  const playData = result.data.data;
  if (playData.length > 0) {
    storeU.commit("music/setData", item);
    storeU.commit("music/setPlayData", playData[0]);
  } else {
    ElMessage.error("不存在播放url");
  }
}

function generateTime(time: number) {
  let timeStr = "";
  let stringFormat = (i) => {
    return i < 10 ? `0${i}` : `${i}`;
  };
  let minuteTime = 0;
  let secondTime = 0;
  let hourTime = 0;
  if (time < 60) {
    timeStr = `00:${stringFormat(time)}`;
  } else if (time >= 60 && time < 3600) {
    minuteTime = parseInt(String(time / 60));
    secondTime = parseInt(String(time % 60));
    timeStr = `${stringFormat(minuteTime)}:${stringFormat(secondTime)}`;
  } else if (time >= 3600) {
    let _t = parseInt(String(time % 3600));
    hourTime = parseInt(String(time / 3600));
    minuteTime = parseInt(String(_t / 60));
    secondTime = parseInt(String(_t % 60));
    timeStr = `${stringFormat(hourTime)}:${stringFormat(minuteTime)}:${stringFormat(
      secondTime
    )}`;
  }
  return timeStr;
}
</script>
<style scoped lang="less"></style>
