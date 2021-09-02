<template>
  <env-component-list
    v-for="(item, index) in list"
    :key="index"
    :data="item"
  ></env-component-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
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
    title: 'nrm',
    status: false,
    type: 'nrm',
    cmd: 'nrm -v',
    install: 'npm install nrm -g',
  },
  {
    title: 'cnpm',
    status: false,
    type: 'cnpm',
    cmd: 'cnpm -v',
    install: 'npm install cnpm -g',
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
  },
];
const list = ref<EnvInstall.ListType[]>(defaultList);
</script>
