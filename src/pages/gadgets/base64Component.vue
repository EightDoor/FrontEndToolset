<template>
  <div>
    <div>
      <el-divider content-position="left">
        base64加密
      </el-divider>
      <el-input
        v-model="generateCount" style="width: 500px" placeholder="请输入加密内容" clearable type="textarea" :rows="4"
        :autosize="{ minRows: 10 }"
      />
      <el-button type="primary" size="large" style="margin-left: 15px" @click="generate">
        加密
      </el-button>
      <div v-if="data" style="margin-top: 10px">
        {{ data }} <span style="color: red"> ({{ data.length }}位)</span>
        <el-button
          type="success" style="margin-left: 15px" size="large" class="copy" :data-clipboard-text="data"
          @click="copy()"
        >
          复制
        </el-button>
      </div>
    </div>
    <div>
      <el-divider content-position="left">
        base64解密
      </el-divider>
      <el-input
        v-model="generateCountDecrypt" style="width: 500px" :autosize="{ minRows: 10 }" placeholder="请输入解密内容"
        clearable type="textarea" :rows="4"
      />
      <el-button type="primary" size="large" style="margin-left: 15px" @click="generateDecrypt">
        解密
      </el-button>
      <div v-if="dataDecrypt" style="margin-top: 10px">
        {{ dataDecrypt }}
        <el-button
          type="success" style="margin-left: 15px" size="large" class="copy" :data-clipboard-text="dataDecrypt"
          @click="copyDecrypt()"
        >
          复制
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'
import { ElMessage } from 'element-plus'
import { decode, encode } from 'js-base64'

import Clipboard from 'clipboard'
import utils from '@/utils/index'

function generate() {
  if (generateCount.value)
    data.value = encode(unref(generateCount.value))
  else
    ElMessage.info('请输入内容')
}
function copy() {
  const clip = new Clipboard('.copy')
  utils.clipTextResultInfo(clip)
}
const generateCount = ref('')
const data = ref('')

// 解密
const dataDecrypt = ref('')
const generateCountDecrypt = ref('')
function generateDecrypt() {
  if (generateCountDecrypt.value)
    dataDecrypt.value = decode(unref(generateCountDecrypt.value))
  else
    ElMessage.info('请输入内容')
}
function copyDecrypt() {
  const clipboard = new Clipboard('.copy')
  utils.clipTextResultInfo(clipboard)
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
