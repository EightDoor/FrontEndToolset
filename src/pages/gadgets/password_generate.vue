<template>
  <div>
    <span>生成密码位数: </span>
    <el-input-number v-model="count" :min="5" />
    <el-checkbox v-model="usePunctuation" style="margin-left: 15px">
      包含特殊字符
    </el-checkbox>
    <el-button type="primary" style="margin-left: 30px" @click="generatePasswd">
      生成
    </el-button>
    <div class="result-container">
      结果值: <div class="result">
        {{ data }}
      </div>
      <el-button v-if="data" style="margin-left: 15px" type="success" class="copy" :data-clipboard-text="data" @click="copyData">
        复制结果值
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Clipboard from 'clipboard'
import utils from '@/utils'

const count = ref(15)
const data = ref('')
const usePunctuation = ref(true) // 新增一个用来控制是否使用特殊字符的标志

function password_generator(len, includePunctuation = true) {
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-='

  // 根据includePunctuation决定是否合并punctuation
  const allChars = [...lowerCase, ...upperCase, ...numbers]
  if (includePunctuation)
    allChars.push(...punctuation)

  let password = ''
  while (password.length < len) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    password += allChars[randomIndex]
  }

  // 如果密码长度大于实际需要的长度，则截取前len位
  password = password.slice(0, len)

  return password
}

function generatePasswd() {
  data.value = password_generator(count.value, usePunctuation.value)
}
function copyData() {
  const clip = new Clipboard('.copy')
  utils.clipTextResultInfo(clip)
}
</script>

<style lang="less" scoped>
.result-container {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-content: center;
  .result {
    color: red;
    margin-left: 15px;
  }
}
</style>
