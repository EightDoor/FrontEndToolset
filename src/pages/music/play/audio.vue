<template>
  <div @click="clickFun" class="play_audio" v-show="playData && isShow">
    <div class="play_audio_title" v-if="data">
      <img :src="data.al.picUrl" alt="" />
      <div class="play_audio_name">
        <span>{{ data?.name }}</span>
        <div>{{ formaAuthor(data?.ar) }}</div>
      </div>
    </div>
    <audio :src="playData.url" controls />
  </div>
  <div v-show="!isShow && minimization" @click="clickShow" class="play_audio_mini">
    <img src="http://vue3.admin.qiniu.start6.cn/%E9%9F%B3%E4%B9%90.png" alt="" />
  </div>
</template>
<script lang="ts">
import { Datum, Song } from "@/types/music/detail";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue-demi";
export default {
  name: "PlayAudio",
};
</script>
<script lang="ts" setup>
import { useStore } from "vuex";

const store = useStore();
const isShow = ref(false);
const minimization = ref(false);
const clickCount = ref(0);

const playData = computed<Datum | null>(() => {
  isShow.value = true;
  return store.state.music.playData;
});
const data = computed<Song | null>(() => {
  isShow.value = true;
  return store.state.music.data;
});

function formaAuthor(val) {
  const list: string[] = [];
  val.forEach((item) => {
    list.push(item.name);
  });

  return list.join("，");
}

function clickFun() {
  clickCount.value += 1;
  if (clickCount.value >= 2) {
    isShow.value = false;
    minimization.value = true;
    ElMessage.success("播放器最小化了");
  }
  setTimeout(() => {
    clickCount.value = 0;
  }, 2000);
}
function clickShow() {
  isShow.value = true;
  minimization.value = false;
}
</script>
<style lang="less" scoped>
.play_audio {
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  width: 100%;
  height: 50px;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  .play_audio_title {
    display: flex;
    flex-direction: row;
    img {
      width: 50px;
      height: 50px;
      display: inline-block;
      margin-right: 15px;
    }
    .play_audio_name {
      span {
        font-size: 20px;
      }
      div {
        font-size: 13px;
      }
    }
  }
}
.play_audio_mini {
  position: fixed;
  bottom: 0;
  left: 0;
  img {
    width: 50px;
    height: 50px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
