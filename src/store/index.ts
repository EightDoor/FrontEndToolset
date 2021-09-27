import {createStore,createLogger} from 'vuex';

import MenuBar from './modules/menu_bar';
const store = createStore({
  modules:{
    MenuBar,
  },
  plugins: [
    createLogger(),
  ],
  strict: process.env.NODE_ENV !== 'production'
})

export default store
