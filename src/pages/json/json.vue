<template>
  <Buttons :list="list" :click="change" :loading="loading" />
  <JsonCode />
</template>

<script setup lang="ts">
import JsonCode from '@/components/JsonCode/index.vue';
import Buttons, { ButtonsListType } from '@/components/Buttons/index.vue';
import { ref } from 'vue';
import { ipcRenderer } from 'electron';
import { log } from '@/utils/log';
import { ElMessage } from 'element-plus';


const loading = ref(false)

const list = ref<ButtonsListType[]>([
  {
    title: '压缩',
    size: 'small',
  },
  {
    title: '下载',
    size: 'small',
  },
])

function change(val: string) {
  switch (val) {
    case "压缩":
      break;
    case "下载":
      download();
      break;
  }
}

async function download() {
  loading.value = true;
  try {
    const result = await ipcRenderer.invoke("download", 'http://apk.start6.cn/1.mp4')
    loading.value = false;
    log('r', result)
    log("loading", loading.value)
  } catch (err) {
    loading.value = false;
    ElMessage.error("下载错误: " + err)
    log("下载错误", err)
  }
}

</script>