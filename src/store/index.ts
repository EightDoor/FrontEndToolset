import {createStore,createLogger} from 'vuex';

import MenuBar from './modules/menu_bar';
import MusicStore from './modules/music';

const store = createStore({
  modules:{
    MenuBar,
    'music': MusicStore,
  },
  plugins: [
    createLogger(),
  ],
  strict: process.env.NODE_ENV !== 'production'
})

export default store
