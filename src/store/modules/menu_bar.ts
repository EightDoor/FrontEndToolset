import type { Module } from 'vuex'

interface State {
  title: string
}
const MenuBar: Module<State, any> = {
  namespaced: true,
  state: {
    title: '首页',
  },
  mutations: {
    setIndex(state, r) {
      state.title = r
    },
  },
}

export default MenuBar
