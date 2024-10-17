import BaseLayout from "@/layout/BaseLayout.vue";
import Bookmark from "@/pages/bookmark/index.vue";
import CommonGadgets from "@/pages/common_gadgets/index.vue";
import DailyMuseSee from "@/pages/daily_muse_see/index.vue";
import TodayHeadlines from "@/pages/daily_muse_see/today_headlines.vue";
import Json from "@/pages/format/index.vue";
import Gadgets from "@/pages/gadgets/index.vue";
import Home from "@/pages/home/home.vue";
import My from "@/pages/my/index.vue";
import NotFound from "@/pages/other/not_found.vue";
import Translate from "@/pages/translate/index.vue";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: BaseLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: Home,
      },
      {
        path: "json",
        component: Json,
      },
      {
        path: "/bookmark",
        component: Bookmark,
      },
      {
        path: "translate",
        component: Translate,
      },
      {
        path: "gadgets",
        component: Gadgets,
      },
      {
        path: "commonGadgets",
        component: CommonGadgets,
      },
      {
        path: "daily_muse_see",
        component: DailyMuseSee,
      },
    ],
  },
  {
    path: "/my",
    component: My,
  },
  {
    path: "/today_headlines",
    component: TodayHeadlines,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
