<template>
  <div class="play_audio" v-show="playData && isShow">
    <div class="play_audio_title" v-if="data">
      <img :src="data?.al?.picUrl" alt="" />
      <div class="play_audio_name">
        <span>{{ data?.name }}</span>
        <div>{{ formaAuthor(data?.ar) }}</div>
      </div>
      <div>
        <el-tooltip
          class="item"
          effect="dark"
          :content="selectMusic ? '取消喜欢' : '喜欢'"
          placement="top"
        >
          <img
            @click="changeSelectMusic"
            class="select_music"
            :src="selectMusicImg + '.png'"
            alt=""
          />
        </el-tooltip>
      </div>
    </div>
    <div class="play_audio_controller">
      <el-button type="primary" class="last" @click="songSwitch(1)"
        >上一首</el-button
      >
      <audio autoplay ref="audioRef" :src="playData?.url" controls />
      <el-button type="primary" class="nextSong" @click="songSwitch(2)"
        >下一首</el-button
      >
    </div>
    <div class="right_menu">
      <el-tooltip class="item" effect="dark" content="最小化" placement="top">
        <img
          @click="clickHide"
          class="select_music"
          src="http://vue3.admin.qiniu.start6.cn/%E6%9C%80%E5%B0%8F%E5%8C%96.png"
          alt=""
        />
      </el-tooltip>

      <el-tooltip class="item" effect="dark" content="播放列表" placement="top">
        <el-icon @click="goMenu" class="play_audio_icon" size="25"
          ><menu-icon
        /></el-icon>
      </el-tooltip>
    </div>
  </div>
  <div
    v-show="!isShow && minimization"
    @click="clickShow"
    class="play_audio_mini"
  >
    <el-tooltip
      class="item"
      effect="dark"
      content="点击展开播放器"
      placement="top"
    >
      <img
        src="http://vue3.admin.qiniu.start6.cn/%E9%9F%B3%E4%B9%90.png"
        alt=""
      />
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { Menu as MenuIcon } from '@element-plus/icons';
import { useRouter } from 'vue-router';
import { isArray } from 'lodash-es';
import { Datum, Song, SongPalyList } from '@/types/music/detail';
import { log } from '@/utils/log';
import http from '@/utils/request';
import business from '@/utils/business';
import UtilStore from '@/utils/store';
import Constant from '@/utils/constant';

interface IMusicCheck {
  success: boolean;
  message: string;
}

const store = useStore();
const isShow = ref(false);
const minimization = ref(false);
const clickCount = ref(0);

const router = useRouter();

const playData = computed<Datum | null>(() => {
  isShow.value = true;
  log('当前播放歌曲信息', store.state.music.playData);
  if (store.state.music.data) {
    const { id } = store.state.music.playData;
    const status = likeList.value.includes(id);
    if (status) {
      selectMusic.value = true;
      selectMusicImg.value = `${url}_select`;
    } else {
      selectMusic.value = false;
      selectMusicImg.value = url;
    }
  }
  return store.state.music.playData;
});
const data = computed<Song | null>(() => {
  isShow.value = true;
  return store.state.music.data;
});

function formaAuthor(val) {
  const list: string[] = [];
  if (isArray(val)) {
    val.forEach((item) => {
      list.push(item.name);
    });
  }

  return list.join('，');
}
function clickShow() {
  isShow.value = true;
  minimization.value = false;
}
function clickHide() {
  isShow.value = false;
  minimization.value = true;
}
const audioRef = ref();

// 1是 上一首 2是下一首
async function playTheNext(status?: 1 | 2) {
  const list = store.state.music.songList;
  const sing = store.state.music.data;
  if (list.length > 0) {
    const index = list.findIndex((item) => item.id === sing.id);
    if (index < 0) {
      // 已经是第一首了
      ElMessage.info('已经是第一首歌曲了');
    } else if (index < list.length - 1) {
      songSwitchImplement(list, index, status);
    } else {
      ElMessage.info('已经是最后一首歌了');
    }
  }
}

async function songSwitchImplement(list, index, status?: 1 | 2) {
  const v = status === 1 ? index - 1 : index + 1;
  log('v', v);
  const singData = list[v];
  if (singData) {
    const loading = business.showLoading('切换中..');
    // 判断当前歌曲是否可以播放
    const v = await getSongIsAvailable(singData?.id);
    if (v) {
      const r = await getIdsList(singData?.id);
      log('r', r.data.data);
      if (r.data.data.length > 0) {
        business.hideLoading(loading);
        store.commit('music/setData', singData);
        store.commit('music/setPlayData', r.data.data[0]);
      } else {
        ElMessage.info('切换失败');
      }
    } else {
      ElMessage.info('当前歌曲没有版权信息,3s自动跳转下一首');
      setTimeout(() => {
        songSwitchImplement(list, index + 1, status);
      }, 3000);
    }
  }
}

function getSongIsAvailable(id) {
  return new Promise((resolve, reject) => {
    http
      .get<IMusicCheck>('/music/check/music', {
        params: {
          id,
        },
      })
      .then((res) => {
        if (res.data.success) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function songSwitch(val?: 1 | 2) {
  playTheNext(val);
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

// 获取喜欢歌曲列表
const likeList = ref<number[]>([]);
async function getAListOfFavoriteSongs() {
  // 获取登录信息
  const userInfo: any = await UtilStore.get(Constant.NETEASE_CLOUD_MUSIC);
  log('登录信息', userInfo);
  if (userInfo) {
    const uid = userInfo.account.id;
    let url = '/music/likelist';
    url = await business.getCookie(url);
    await http.get(`${url}&uid=${uid}`).then((res) => {
      const { data } = res;
      log('喜欢音乐列表', data);
      likeList.value = data.ids;
    });
  }
}

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.addEventListener('ended', () => {
      // 播放完毕，自定切换播放下一首
      playTheNext();
    });
  }

  getAListOfFavoriteSongs();
});
function goMenu() {
  router.push('/music_list');
}

// 喜欢音乐/取消喜欢
const url = 'http://vue3.admin.qiniu.start6.cn/%E5%96%9C%E6%AC%A2';
const selectMusic = ref(false);
const selectMusicImg = ref(url);
function changeSelectMusic() {
  selectMusic.value = !selectMusic.value;
  if (selectMusic.value) {
    selectMusicImg.value = `${url}_select`;
    likeFun(true);
  } else {
    selectMusicImg.value = url;
    likeFun(false);
  }
  setTimeout(() => {
    getAListOfFavoriteSongs();
  }, 5000);
}
async function likeFun(like: boolean) {
  let url = '/music/like';
  url = await business.getCookie(url);
  http
    .get(url, {
      params: {
        id: data.value?.id,
        like,
      },
    })
    .then((res) => {
      if (res.data.code === 200) {
        ElMessage.success(like ? '喜欢成功' : '取消喜欢');
      }
    });
}

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.removeEventLister('ended');
  }
});
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
  justify-content: space-between;
  align-items: center;
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
.play_audio_icon {
  margin: 0 15px;
  &:hover {
    cursor: pointer;
  }
}
.play_audio_controller {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .last {
    margin-right: 15px;
  }
  .nextSong {
    margin-left: 15px;
  }
}
.select_music {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-left: 15px;
  vertical-align: bottom;
  &:hover {
    cursor: pointer;
  }
}
.right_menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
