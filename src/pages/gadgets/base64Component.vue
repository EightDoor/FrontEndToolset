<template>
  <div>
    <div>
      <el-divider content-position="left">base64加密</el-divider>
      <el-input
        style="width: 400px"
        v-model="generateCount"
        placeholder="请输入加密内容"
        clearable
        type="textarea"
        :rows="4"
      />
      <el-button type="primary" style="margin-left: 15px" @click="generate"
        >加密</el-button
      >
      <div style="margin-top: 10px" v-if="data">
        {{ data }} <span style="color: red"> ({{ data.length }}位)</span>
        <el-button
          @click="copy(data)"
          type="success"
          style="margin-left: 15px"
          size="small"
          >复制</el-button
        >
      </div>
    </div>
    <div>
      <el-divider content-position="left">base64解密</el-divider>
      <el-input
        style="width: 400px"
        v-model="generateCountDecrypt"
        placeholder="请输入解密内容"
        clearable
        type="textarea"
        :rows="4"
      />
      <el-button
        type="primary"
        style="margin-left: 15px"
        @click="generateDecrypt"
        >解密</el-button
      >
      <div style="margin-top: 10px" v-if="dataDecrypt">
        {{ dataDecrypt }}
        <el-button
          @click="copyDecrypt(dataDecrypt)"
          type="success"
          style="margin-left: 15px"
          size="small"
          >复制</el-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, unref } from 'vue';
import { ElMessage } from 'element-plus';
import { encode, decode } from 'js-base64';

import utils from '@/utils/index';

function generate() {
  if (generateCount.value) {
    data.value = encode(unref(generateCount.value));
  } else {
    ElMessage.info('请输入内容');
  }
}
function copy(item: string) {
  utils.clipText(item);
}
const generateCount = ref('');
const data = ref('');

// 解密
const dataDecrypt = ref('');
const generateCountDecrypt = ref('');
function generateDecrypt() {
  if (generateCountDecrypt.value) {
    dataDecrypt.value = decode(unref(generateCountDecrypt.value));
  } else {
    ElMessage.info('请输入内容');
  }
}
function copyDecrypt(item: string) {
  utils.clipText(item);
}
</script>
<style scoped lang="less">
.ul {
  margin-top: 10px;
  border: 1px solid #cccccc;
  padding: 15px;
  li {
    margin-top: 10px;
  }
}
</style>
