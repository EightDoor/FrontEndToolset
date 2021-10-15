<template>
  <el-input
    v-model="text"
    :row="4"
    type="textarea"
    placeholder="请输入"
  ></el-input>
  <div class="container_buttons">
    <buttons :list="list" :click="change" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'UrlEncoding',
};
</script>
<script lang="ts" setup>
// Url编码解码
import { ref } from 'vue';
import Buttons, { ButtonsListType } from '@/components/Buttons/index.vue';
import { ElMessage } from 'element-plus';
const text = ref('');
const list: ButtonsListType[] = [
  {
    title: 'encodeURI编码',
  },
  {
    title: 'decodeURI解码',
    type: 'success',
  },
];

function change(val) {
  console.log(val, 'val');
  if (text.value) {
    if (val === 'encodeURI编码') {
      text.value = encodeURI(text.value);
      ElMessage.success('编码成功');
    } else if (val === 'decodeURI解码') {
      text.value = decodeURI(text.value);
      ElMessage.success('解码成功');
    }
  } else {
    ElMessage.info('请输入内容');
  }
}
</script>
<style scoped lang="less">
.container_buttons {
  margin-top: 15px;
  float: right;
}
</style>
