<template>
  <env-component-list v-for="(item, index) in list" :key="index" :data="item"></env-component-list>
</template>

<script setup lang="ts">
import { log } from '@/utils/log';
import { onMounted, ref } from 'vue';
import EnvComponentList from './env_component_list.vue';

const defaultList: EnvInstall.ListType[] = [
  {
    title: 'nodejs',
    status: false,
    type: 'node',
    cmd: 'node -v',
  },
  {
    title: 'npm',
    status: false,
    type: 'npm',
    cmd: 'npm -v',
  },
  {
    title: 'nvm',
    status: false,
    type: 'nvm',
    cmd: 'nvm --version'
  },
  {
    title: 'nrm',
    status: false,
    type: 'nrm',
    cmd: 'nrm -V',
    install: 'npm install nrm -g',
    uninstall: "npm uninstall nrm -g"
  },
  {
    title: 'cnpm',
    status: false,
    type: 'cnpm',
    cmd: 'cnpm -v',
    install: 'npm install cnpm -g',
    uninstall: 'npm uninstall cnpm -g'
  },
  {
    title: 'yarn',
    status: false,
    type: 'yarn',
    cmd: 'yarn -v',
    install: 'npm install yarn -g',
  },
  {
    title: 'pnpm',
    status: false,
    type: 'pnpm',
    cmd: 'pnpm -v',
    install: 'npm install -g pnpm',
    uninstall: 'npm uninstall -g pnpm',
  },
];
const list = ref<EnvInstall.ListType[]>(defaultList);

onMounted(() => {
  log("工作空间", process.env)
})
</script>
