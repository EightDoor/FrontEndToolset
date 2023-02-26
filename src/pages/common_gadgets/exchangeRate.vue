<template>
  <div v-if="dataForm">
    <h3>更新时间: {{ formatTime() }}</h3>
    <span>人民币: </span>
    <el-input-number v-model="num" :min="1" @input="inputNum" />
    <div>
      <h4>常用</h4>
      <span>美元: {{ formatCommonUse("USD") }}</span>
    </div>
    <h4>其他</h4>
    <ul class="ul">
      <li v-for="(item, index) in numRates" :key="index">
        <span>{{ formatCode(index) }}（{{ index }}）</span> <span>{{ item }}</span>
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
function getBaseInfo() {
  const url = 'https://api.exchangerate-api.com/v4/latest/CNY'
  axios.get(url).then((res) => {
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
    font-size: 15px;
    &>span:nth-child(1) {
      font-weight: bold;
      margin-right: 15px;
    }
  }
}
</style>
