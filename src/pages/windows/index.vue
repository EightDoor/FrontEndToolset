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
    title: "ScreenToGif 允许您录制屏幕的选定区域，编辑并将其保存为 gif 或视频。",
    url: "https://github.com/NickeManarin/ScreenToGif/tree/master",
    type:"工具",
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
  {
    title: 'Free Download Manager 下载器',
    url: 'https://www.freedownloadmanager.org/zh/',
    type: '工具',
  },
  {
    title: 'NeatDownloadManager 下载器',
    url: 'https://neat-download-manager.en.softonic.com/',
    type: '工具',
  },
  {
    title: 'PhotoDemon轻量级的图片编辑工具',
    url: 'https://photodemon.org/',
    type: '工具',
  },
  {
    title: 'ScreenToGif - 录屏，编辑，保存为 GIF 动画、视频或更多其他格式',
    url: 'https://www.screentogif.com/',
    type: '工具',
  },
  {
    title: '磁盘健康检查工具',
    url: 'https://github.com/hiyohiyo/CrystalDiskInfo/blob/master/README.sc.md',
    type: '工具',
  },
  {
    title: 'Watt Toolkit 是一个开源跨平台的多功能 Steam 工具箱',
    url: 'https://github.com/BeyondDimension/SteamTools',
    type: '工具',
  },
  {
    title: 'Another Redis Desktop Manager Redis连接工具',
    url: 'https://github.com/qishibo/AnotherRedisDesktopManager/blob/master/README.zh-CN.md',
    type: '工具',
  },
  {
    title: 'HandBrake 视频转码器',
    url: 'https://handbrake.fr/',
    type: '工具',
  },
])
</script>

<style scoped lang="less">
</style>
