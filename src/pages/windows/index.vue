<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ListType } from '@/types/com'
import ZCard from '@/components/ZCard/index.vue'

const list = ref<ListType[]>([
  {
    title: 'Snipaste 截图 + 贴图',
    url: 'https://zh.snipaste.com/index.html',
    type: '工具',
  },
  {
    title: '干净的卸载工具  Geek Uninstaller',
    url: 'https://geekuninstaller.com/download',
    type: '工具',
  },
  {
    title: '7-Zip 官方中文网站',
    url: 'https://sparanoid.com/lab/7z/',
    type: '工具',
  },
  {
    title: '播放器  Global Potplayer',
    url: 'https://potplayer.daum.net/?lang=zh_CN',
    type: '工具',
  },
  {
    title: 'windows 激活工具 zbezj/HEU_KMS_Activator',
    url: 'https://github.com/zbezj/HEU_KMS_Activator',
    type: '工具',
  },
  {
    title: '在Windows快速预览各种文件 QL-Win/QuickLook',
    url: 'https://github.com/QL-Win/QuickLook',
    type: '工具',
  },
  {
    title: '数据恢复软件,硬盘分区工具,系统备份软件 - DiskGenius官方网站',
    url: 'https://www.diskgenius.cn/',
    type: '工具',
  },
  {
    title: 'FileZilla ftp文件上传下载',
    url: 'https://filezilla-project.org/',
    type: '工具',
  },
  {
    title: '录屏软件 Captura',
    url: 'https://mathewsachin.github.io/Captura/download/',
    type: '工具',
  },
  {
    title: 'host切换',
    url: 'https://github.com/oldj/SwitchHosts',
    type: '工具',
  },
  {
    title: '好用的远程连接工具 Windterm',
    url: 'https://github.com/kingToolbox/WindTerm/releases',
    type: '工具',
  },
])
</script>

<style scoped lang="less">
</style>
