<template>
  <div>
    <span> 生成数量 </span>
    <el-input v-model="generateCount" style="width: 200px" placeholder="请输入生成数量" />
    <el-button size="large" type="primary" style="margin-left: 15px" @click="generate()">
      生成
    </el-button>
    <el-button size="large" type="warning" style="margin-left: 15px" @click="generate(1)">
      去除 - 生成
    </el-button>
    <ul v-if="data.length > 0" class="ul">
      <li v-for="(item, index) in data" :key="index">
        {{ item }}
        <el-button
          type="success" style="margin-left: 15px" size="large" class="copy" :data-clipboard-text="item"
          @click="copy()"
        >
          复制
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { v4 } from 'uuid'
import Clipboard from 'clipboard'
import utils from '@/utils/index'

const generateCount = ref(5)
const data = ref<string[]>([])
function generate(val?: number) {
  data.value = []
  for (let i = 0; i < generateCount.value; i += 1) {
    let v = v4()
    if (val === 1)
      v = v.replaceAll('-', '')

    data.value.push(v)
  }
}
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
