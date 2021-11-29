<template>
  <go-home path="/music"> 列表 </go-home>
</template>
<script lang="ts" setup>
import GoHome from "@/components/GoHome/index.vue";
import { onActivated } from "vue";
import http from "@/utils/request";
import { log } from "@/utils/log";
import { useRoute } from "vue-router";
import store from "@/utils/store";
import Constant from "@/utils/constant";
import business from "@/utils/business";

const route = useRoute();

onActivated(() => {
  getList();
});

async function getList() {
  const r = business.showLoading();
  const ids = await store.get(Constant.storageListIds);
  if (ids) {
    http
      .get("/music/song/detail", {
        params: {
          ids,
        },
      })
      .then((res) => {
        log("res.data", res.data);
        business.hideLoading(r);
      });
  }
}
</script>
