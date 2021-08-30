<template>
  <ul class="ul">
    <li>
      <el-badge v-if="!props.data.status" is-dot class="item">
        {{props.data.title}}
      </el-badge>
      <template v-else>
        {{props.data.title}}
      </template>
    </li>
    <li>{{props.data.status ? "卸载": "安装"}}</li>
  </ul>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';
const props = defineProps<{data: EnvInstall.ListType}>()
</script>
<style scoped lang="less">
@import "./env_component_list.less";
</style>
