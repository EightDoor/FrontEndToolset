<template>
  <div class="container">
    <go-home/>
    <el-descriptions title="系统信息">
      <el-descriptions-item label="版本">{{data.version}}</el-descriptions-item>
      <el-descriptions-item label="electron版本">{{data.elVersion}}</el-descriptions-item>
      <el-descriptions-item label="node版本">{{data.nodeVersion}}</el-descriptions-item>
      <el-descriptions-item label="V8引擎版本">{{data.elVersion}}</el-descriptions-item>
      <el-descriptions-item label="chrome版本">{{data.chromeVersion}}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="联系方式">
      <el-descriptions-item label="qq">851708184</el-descriptions-item>
      <el-descriptions-item label="邮箱">851708184@qq.com</el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CommVariable from '@/comm_variable/comm_variable.json';
import GoHome from '@/components/GoHome/index.vue';

const { ipcRenderer } = require('electron');

const data = ref({
  version: '0.0.0',
  elVersion: '',
  nodeVersion: '',
  v8Version: '',
  chromeVersion: '',
  information: '',
});

onMounted(() => {
  getVersion();
});

async function getVersion() {
  const res = await ipcRenderer.invoke(CommVariable.channel.GET_VERSION);
  const { version } = JSON.parse(res);
  data.value.version = version;
  data.value.elVersion = process.versions.electron ?? '';
  data.value.nodeVersion = process.versions.node ?? '';
  data.value.v8Version = process.versions.v8 ?? '';
  data.value.chromeVersion = process.versions.chrome ?? '';
}

</script>
<style scoped lang="less">
.container {
  padding: 15px;
}
</style>
