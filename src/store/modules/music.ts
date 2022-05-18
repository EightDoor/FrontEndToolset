import type { Module } from 'vuex'
import type { Datum, Song } from '@/types/music/detail'

type StatusType = 1 | 2
interface State {
  // 播放状态 1 暂停 2 播放
  playStatus: StatusType
  // 当前播放歌曲
  data: Song | null
  // 当前播放歌曲请求 url 等信息
  playData: Datum | null
  // 歌曲列表
  songList: Song[]
}
const MusicStore: Module<State, any> = {
  namespaced: true,
  state: {
    playStatus: 1,
    data: null,
    playData: null,
    songList: [],
  },
  mutations: {
    setPlayState(state, payload: StatusType) {
      state.playStatus = payload
    },
    setData(state, payload) {
      state.data = payload
    },
    setPlayData(state, payload) {
      state.playData = payload
    },
    setSongList(state, payload) {
      state.songList = payload
    },
  },
}

export default MusicStore
