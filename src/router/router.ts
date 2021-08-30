import BaseLayout from '@/layout/BaseLayout.vue';
import Home from '@/pages/home/home.vue';
import NotFound from '@/pages/other/not_found.vue';
import EnvInstall from '@/pages/env_install/index.vue';
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
      }
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
