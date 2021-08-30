<template>
  <env-component-list v-for="(item, index) in list" :key="index" :data="item"></env-component-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EnvComponentList from './env_component_list.vue';

const defaultList:EnvInstall.ListType[] = [
  {
    title: "nodejs",
    status: false,
    type: "node"
  },
  {
    title: "npm",
    status: false,
    type:"npm"
  },
  {
    title: "cnpm",
    status: false,
    type: "cnpm"
  },
  {
    title: "yarn",
    status: false,
    type: "yarn"
  }
];
const list:EnvInstall.ListType[] = ref(defaultList);
</script>
