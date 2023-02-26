<template>
  <div v-if="dataForm">
    <h3>更新时间: {{ formatTime() }}</h3>
    <span>当前选择: {{ formatCode(selectKey) }}（{{ selectKey }}）: </span>
    <el-input-number v-model="num" :min="1" @input="inputNum" />
    <!--    <div> -->
    <!--      <h4>常用</h4> -->
    <!--      <span>美元: {{ formatCommonUse("USD") }}</span> -->
    <!--    </div> -->
    <ul class="ul">
      <li v-for="(item, index) in numRates" :key="index">
        <span>{{ formatCode(index) }}（{{ index }}）</span> <span>{{ item }}</span>
        <el-button style="margin-left: 30px" type="primary" plain size="small" @click="changeSelect(index)">
          选择
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// 免费接口 https://api.exchangerate-api.com/v4/latest/CNY
import { onMounted, ref } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash-es'
import exchangeRateCode from './exchangeRateCode'

const dataForm = ref()
const num = ref(1)
const numRates = ref<any[]>([])
const defaultRates = ref<any[]>([])
const keys = ref<String[]>([])
const selectKey = ref('USD')
onMounted(() => {
  getBaseInfo()
})
function formatTime() {
  const time = dayjs.unix(dataForm.value.time_last_updated)
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
function inputNum(val) {
  const sourceData = cloneDeep(defaultRates.value)
  if (val > 0) {
    for (const key in sourceData) {
      const item = sourceData[key]
      sourceData[key] = item * val
    }
    numRates.value = sourceData
  }
}
function formatCommonUse(type) {
  for (const key in numRates.value) {
    if (key === type)
      return numRates.value[key]
  }
  return ''
}
function formatCode(key) {
  return exchangeRateCode(key)
}
function changeSelect(type) {
  selectKey.value = type
  getBaseInfo()
}
function getBaseInfo() {
  const url = `https://api.exchangerate-api.com/v4/latest/${selectKey.value}`
  numRates.value = []
  axios.get(url).then((res) => {
    const resultKeys: String[] = []
    for (const key in res.data.rates)
      resultKeys.push(key)
    keys.value = resultKeys
    const data = res.data
    console.log(data, 'data')
    numRates.value = cloneDeep(res.data.rates)
    defaultRates.value = cloneDeep(res.data.rates)
    dataForm.value = data
  })
}
</script>

<style scoped lang="less">
.ul {
  margin-top: 15px ;
  li {
    margin-top: 15px;
    font-size: 15px;
    &>span:nth-child(1) {
      font-weight: bold;
      margin-right: 15px;
    }
  }
}
</style>
