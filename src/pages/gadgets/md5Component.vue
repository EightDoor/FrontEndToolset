<template>
  <div>
    <span> 加密内容: </span><el-input
      v-model="generateCount"
      style="width: 200px"
      placeholder="请输入加密内容"
      clearable
    />
    <el-button type="primary" style="margin-left: 15px" @click="generate">
      加密
    </el-button>
    <div v-if="data" style="margin-top: 10px">
      {{ data }} <span style="color: red"> ({{ data.length }}位)</span>
      <el-button
        type="success"
        style="margin-left: 15px"
        size="small"
        class="copy" :data-clipboard-text="data"
        @click="copy()"
      >
        复制
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'
import md5 from 'md5'
import { ElMessage } from 'element-plus'
import Clipboard from 'clipboard'
import utils from '@/utils/index'

function generate() {
  if (generateCount.value)
    data.value = md5(unref(generateCount.value))
  else
    ElMessage.info('请输入内容')
}
const generateCount = ref('')
const data = ref('')

function copy() {
  const clip = new Clipboard('.copy')
  utils.clipTextResultInfo(clip)
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
