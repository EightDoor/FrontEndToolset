<template>
  <div>
    <span> 生成数量 </span
    ><el-input
      style="width: 200px"
      v-model="generateCount"
      placeholder="请输入生成数量"
    />
    <el-button type="primary" style="margin-left: 15px" @click="generate()"
      >生成</el-button
    >
    <el-button type="warning" style="margin-left: 15px" @click="generate(1)"
      >去除 - 生成</el-button
    >
    <ul class="ul" v-if="data.length > 0">
      <li v-for="(item, index) in data" :key="index">
        {{ item }}
        <el-button
          @click="copy(item)"
          type="success"
          style="margin-left: 15px"
          size="small"
          >复制</el-button
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { v4 } from 'uuid';
import utils from '@/utils/index';

const generateCount = ref(5);
const data = ref<string[]>([]);
function generate(val?: number) {
  data.value = [];
  for (let i = 0; i < generateCount.value; i += 1) {
    let v = v4();
    if (val === 1) {
      v = v.replaceAll('-', '');
    }
    data.value.push(v);
  }
}
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
