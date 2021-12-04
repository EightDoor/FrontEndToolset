import { createStore, createLogger } from 'vuex';

import MenuBar from './modules/menu_bar';
import MusicStore from './modules/music';
import UserInfo from './modules/user_info';

const store = createStore({
  modules: {
    MenuBar,
    music: MusicStore,
    userInfo: UserInfo,
  },
  plugins: [
    createLogger(),
  ],
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
