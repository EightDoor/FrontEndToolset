<script lang="ts" setup>
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import http from '@/utils/request'
import store from '@/utils/store'
import business from '@/utils/business'

const storeV = useStore()
onMounted(() => {
  getStatus()
})

async function getStatus() {
  let url = '/music/login/status'
  url = await business.getCookie(url)
  http.get(url).then(async (res) => {
    if (!res.data.data.profile) {
      await store.clear()
      storeV.commit('userInfo/setData', null)
      await http.get('/music/logout')
      ElMessage.info('请重新登录')
    }
  })
}
</script>

<template />
