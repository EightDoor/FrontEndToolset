<template>
  <el-divider content-position="left">linux</el-divider>
  <ul class="ul">
    <li v-highlight>curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -</li>
    <li v-highlight>sudo apt-get install -y nodejs</li>
  </ul>
  <el-divider content-position="left">mac</el-divider>
  <ul class="ul">
    <li> <a @click="download">下载地址: http://nodejs.cn/download/</a></li>
  </ul>
  <el-divider content-position="left">windows</el-divider>
  <ul class="ul">
    <li> <a @click="download">下载地址: http://nodejs.cn/download/</a></li>
  </ul>
</template>
<script setup lang="ts">
import utils from '@/utils';

function download() {
  utils.openUrl('http://nodejs.cn/download/');
}
</script>
<style scoped lang="less">
.ul {
  &>li {
    margin-top: 15px;
    &>a {
      cursor: pointer;
    }
  }
}
</style>
