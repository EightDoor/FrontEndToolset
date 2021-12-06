<template>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import http from '@/utils/request';
import store from '@/utils/store';

const storeV = useStore();
onMounted(() => {
  http.get('/music/login/status').then(async (res) => {
    if (!res.data.data.profile) {
      await store.clear();
      storeV.commit('userInfo/setData', null);
      await http.get('/music/logout');
      ElMessage.info('请重新登录');
    }
  });
});
</script>
