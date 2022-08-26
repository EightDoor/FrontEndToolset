import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import BaseLayout from '@/layout/BaseLayout.vue'
import Home from '@/pages/home/home.vue'
import NotFound from '@/pages/other/not_found.vue'
import Json from '@/pages/json/index.vue'
import JsonToDart from '@/pages/json_to_dart/index.vue'
import Translate from '@/pages/translate/index.vue'
import Gadgets from '@/pages/gadgets/index.vue'
import My from '@/pages/my/index.vue'
import DailyMuseSee from '@/pages/daily_muse_see/index.vue'
import TodayHeadlines from '@/pages/daily_muse_see/today_headlines.vue'
import Music from '@/pages/music/index.vue'
import MusicList from '@/pages/music/music_list/index.vue'
import Go from '@/pages/go/index.vue'
import Front from '@/pages/front/index.vue'
import Windows from '@/pages/windows/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BaseLayout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'json',
        component: Json,
      },
      {
        path: 'json_to_dart',
        component: JsonToDart,
      },
      {
        path: 'translate',
        component: Translate,
      },
      {
        path: 'gadgets',
        component: Gadgets,
      },
      {
        path: 'daily_muse_see',
        component: DailyMuseSee,
      },
      {
        path: 'go',
        component: Go,
      },
      {
        path: 'music',
        component: Music,
      },
      {
        path: 'music_list',
        component: MusicList,
      },
      {
        path: 'music_list',
        component: MusicList,
      },
      {
        path: 'front',
        component: Front,
      },
      {
        path: 'windows',
        component: Windows,
      },
    ],
  },
  {
    path: '/my',
    component: My,
  },
  {
    path: '/today_headlines',
    component: TodayHeadlines,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
