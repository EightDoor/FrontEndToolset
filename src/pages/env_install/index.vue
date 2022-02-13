<template>
  <env-component-list
    v-for="(item, index) in list"
    :key="index"
    :data="item"
  ></env-component-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { log } from '@/utils/log';
import EnvComponentList from './env_component_list.vue';
import { ListType } from '@/pages/env_install/env_type';

const defaultList: ListType[] = [
  {
    title: 'nodejs',
    status: false,
    type: 'node',
    cmd: {
      cmd: 'node',
      arg: ['-v'],
    },
  },
  {
    title: 'npm',
    status: false,
    type: 'npm',
    cmd: {
      cmd: 'npm',
      arg: ['-v'],
    },
  },
  {
    title: 'nvm',
    status: false,
    type: 'nvm',
    cmd: {
      cmd: 'nvm',
      arg: ['-v'],
    },
  },
  {
    title: 'nrm',
    status: false,
    type: 'nrm',
    install: {
      cmd: 'npm',
      arg: ['install', 'nrm', '-g'],
    },
    uninstall: {
      cmd: 'npm',
      arg: ['uninstall', 'nrm', '-g'],
    },
    cmd: {
      cmd: 'nrm',
      arg: ['-V'],
    },
  },
  {
    title: 'cnpm',
    status: false,
    type: 'cnpm',
    cmd: {
      cmd: 'cnpm',
      arg: ['-v'],
    },
    install: {
      cmd: 'npm',
      arg: ['install', 'cnpm', '-g'],
    },
    uninstall: {
      cmd: 'npm',
      arg: ['uninstall', 'cnpm', '-g'],
    },
  },
  {
    title: 'yarn',
    status: false,
    type: 'yarn',
    cmd: {
      cmd: 'yarn',
      arg: ['-v'],
    },
    install: {
      cmd: 'npm',
      arg: ['install', 'yarn', '-g'],
    },
    uninstall: {
      cmd: 'npm',
      arg: ['uninstall', 'yarn', '-g'],
    },
  },
  {
    title: 'pnpm',
    status: false,
    type: 'pnpm',
    cmd: {
      cmd: 'pnpm',
      arg: ['-v'],
    },
    install: {
      cmd: 'npm',
      arg: ['install', 'pnpm', '-g'],
    },
    uninstall: {
      cmd: 'npm',
      arg: ['uninstall', 'pnpm', '-g'],
    },
  },
];
const list = ref<ListType[]>(defaultList);

onMounted(() => {
  log('工作空间', process.env);
});
</script>
