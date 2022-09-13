<template>
  <div>
    <span>生成密码位数: </span>
    <el-input-number v-model="count" :min="5" />
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

const count = ref(20)
const data = ref('')

function password_generator(len) {
  const length = (len) || (10)
  const string = 'abcdefghijklmnopqrstuvwxyz' // to upper
  const numeric = '0123456789'
  const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-='
  let password = ''
  let character = ''
  while (password.length < length) {
    const entity1 = Math.ceil(string.length * Math.random() * Math.random())
    const entity2 = Math.ceil(numeric.length * Math.random() * Math.random())
    const entity3 = Math.ceil(punctuation.length * Math.random() * Math.random())
    let hold = string.charAt(entity1)
    hold = (password.length % 2 === 0) ? (hold.toUpperCase()) : (hold)
    character += hold
    character += numeric.charAt(entity2)
    character += punctuation.charAt(entity3)
    password = character
  }
  password = password.split('').sort(() => { return 0.5 - Math.random() }).join('')
  return password.substr(0, len)
}

function generatePasswd() {
  data.value = password_generator(count.value)
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
