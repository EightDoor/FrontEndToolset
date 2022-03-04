<template>
  <div>
    <span> 加密内容: </span
    ><el-input
      style="width: 200px"
      v-model="generateCount"
      placeholder="请输入加密内容"
      clearable
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
</template>
<script lang="ts" setup>
import { ref, unref } from 'vue';
import md5 from 'md5';
import { ElMessage } from 'element-plus';
import utils from '@/utils/index';

function generate() {
  if (generateCount.value) {
    data.value = md5(unref(generateCount.value));
  } else {
    ElMessage.info('请输入内容');
  }
}
const generateCount = ref('');
const data = ref('');

function copy(item: string) {
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
