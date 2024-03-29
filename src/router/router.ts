import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import BaseLayout from '@/layout/BaseLayout.vue'
import Home from '@/pages/home/home.vue'
import NotFound from '@/pages/other/not_found.vue'
import Json from '@/pages/format/index.vue'
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
import Java from '@/pages/java/index.vue'
import ReverseFrom from '@/pages/reverse_forum/index.vue'
import BlackApple from '@/pages/black_apple/index.vue'
import Tool from '@/pages/tool/index.vue'
import CommonGadgets from '@/pages/common_gadgets/index.vue'
import MiniProgram from '@/pages/mini_program/index.vue'
import AI from '@/pages/ai/index.vue'
import DataBase from '@/pages/database/index.vue'

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
        path: '/black_apple',
        component: BlackApple,
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
        path: 'commonGadgets',
        component: CommonGadgets,
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
        path: 'AI',
        component: AI,
      },
      {
        path: 'tool',
        component: Tool,
      },
      {
        path: 'java',
        component: Java,
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
        path: 'reverse_forum',
        component: ReverseFrom,
      },
      {
        path: 'front',
        component: Front,
      },
      {
        path: 'windows',
        component: Windows,
      },
      {
        path: 'mini_program',
        component: MiniProgram,
      },
      {
        path: 'database',
        component: DataBase,
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
