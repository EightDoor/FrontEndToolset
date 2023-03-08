<template>
  <z-card :list="list" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ListType } from '@/types/com'
import ZCard from '@/components/ZCard/index.vue'

const list = ref<ListType[]>([
  {
    title: '联想y7000 2018',
    url: 'https://github.com/xiaoMGitHub/LEGION_Y7000Series_Hackintosh',
    type: 'EFI',
  },
  {
    title: 'OpenCore EFI For B460M-MORTAR-WIFI',
    url: 'https://github.com/Spectrelai/Hackintosh-B460M-MORTAR-WIFI',
    type: 'EFI',
  },
  {
    title: 'openCore可视化配置',
    url: 'https://github.com/ic005k/OCAuxiliaryTools',
    type: '工具',
  },
  {
    title: 'Hackintool',
    url: 'https://github.com/benbaker76/Hackintool',
    type: '工具',
  },
  {
    title: '黑苹果工具集合',
    url: 'https://bbs.pcbeta.com/viewthread-1930723-1-2.html',
    type: '工具',
  },
  {
    title: '【镜像下载】macOS纯净版安装镜像 不限速下载（11.x～12.x）',
    url: 'https://bbs.pcbeta.com/forum.php?mod=viewthread&tid=1915719&extra=page%3D1%26filter%3Dtypeid%26typeid%3D1416%26typeid%3D1416',
    type: '工具',
  },
  {
    title: 'appstorrent俄罗斯破解软件',
    url: 'https://appstorrent.ru/',
    type: '软件',
  },
  {
    title: '黑苹果乐园',
    url: 'https://mackext.com/',
    type: '论坛',
  },
  {
    title: '黑苹果乐园',
    url: 'https://mackext.com/',
    type: '论坛',
  },
  {
    title: '远景论坛',
    url: 'https://bbs.pcbeta.com/',
    type: '论坛',
  },
  {
    title: '国光的黑苹果安装教程',
    url: 'https://apple.sqlsec.com/',
    type: '论坛',
  },
])
</script>

<style scoped lang="less">
</style>
