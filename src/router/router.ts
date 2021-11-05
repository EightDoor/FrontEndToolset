import BaseLayout from '@/layout/BaseLayout.vue';
import Home from '@/pages/home/home.vue';
import NotFound from '@/pages/other/not_found.vue';
import EnvInstall from '@/pages/env_install/index.vue';
import Json from '@/pages/json/index.vue';
import JsonToDart from '@/pages/json_to_dart/index.vue';
import Translate from '@/pages/translate/index.vue';
import Gadgets from '@/pages/gadgets/index.vue';
import My from '@/pages/my/index.vue';
import DailyMuseSee from '@/pages/daily_muse_see/index.vue';
import ShortcutKey from '@/pages/shortcut_key/index.vue';

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

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
        path: "env_install",
        component: EnvInstall,
      },
      {
        path: 'json',
        component: Json,
      },
      {
        path: '/json_to_dart',
        component: JsonToDart,
      },
      {
        path: '/translate',
        component: Translate,
      },
      {
        path: '/gadgets',
        component: Gadgets,
      },
      {
        path: '/daily_muse_see',
        component: DailyMuseSee,
      }
    ],
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/shortcut_key',
    component: ShortcutKey,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
