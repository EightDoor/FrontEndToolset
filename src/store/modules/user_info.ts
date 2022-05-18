import type { Module } from 'vuex'
import type { UserInfo as UserInfoType } from '@/types/music/user_info'

interface State {
  data: UserInfoType | null
}
const UserInfo: Module<State, any> = {
  namespaced: true,
  state: {
    data: null,
  },
  mutations: {
    setData(state, r) {
      state.data = r
    },
  },
}

export default UserInfo
