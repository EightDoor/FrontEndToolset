<template>
  <el-form ref="formRef" style="width: 500px" :model="dataForm" class="demo-form-inline" label-width="100px" label-position="left">
    <el-form-item label="天（d）" prop="days">
      <el-input v-model="dataForm.days" type="number" placeholder="请输入" @input="formatTime($event, 'days')" />
    </el-form-item>
    <el-form-item label="时（h）" prop="hours">
      <el-input v-model="dataForm.hours" type="number" placeholder="请输入" @input="formatTime($event, 'hours')" />
    </el-form-item>
    <el-form-item label="周（week）" prop="weeks">
      <el-input v-model="dataForm.weeks" type="number" placeholder="请输入" @input="formatTime($event, 'weeks')" />
    </el-form-item>
    <el-form-item label="分（min）" prop="minutes">
      <el-input v-model="dataForm.minutes" type="number" placeholder="请输入" @input="formatTime($event, 'minutes')" />
    </el-form-item>
    <el-form-item label="秒（s）" prop="seconds">
      <el-input v-model="dataForm.seconds" type="number" placeholder="请输入" @input="formatTime($event, 'seconds')" />
    </el-form-item>
    <el-form-item
      label="毫秒（ms）" prop="milliseconds"
    >
      <el-input v-model="dataForm.milliseconds" placeholder="请输入" @input="formatTime($event, 'milliseconds')" />
    </el-form-item>
    <el-form-item label="年（year）" prop="years">
      <el-input v-model="dataForm.years" type="number" placeholder="请输入" @input="formatTime($event, 'years')" />
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="reset(formRef)">
        全部清空
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { convertDays, convertHours, convertMilliseconds, convertMinutes, convertSeconds, convertWeeks, convertYears } from './timeConversionFun'

const dataForm = reactive({
  days: 0,
  hours: 0,
  weeks: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
  years: 0,
})
const formRef = ref<FormInstance>()

function reset(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  formEl?.resetFields()
}
function formatTime(val, type) {
  console.log(val, 'val')
  console.log(type)
  let result: any
  switch (type) {
    case 'days':
      result = convertDays(val)
      console.log(dataForm, 'dataForm')
      break
    case 'hour':
      result = convertHours(val)
      break
    case 'weeks':
      result = convertWeeks(val)
      break
    case 'minutes':
      result = convertMinutes(val)
      break
    case 'seconds':
      result = convertSeconds(val)
      break
    case 'milliseconds':
      result = convertMilliseconds(val)
      break
    case 'years':
      result = convertYears(val)
      break
  }
  dataForm.days = result.days
  dataForm.years = result.years
  dataForm.seconds = result.seconds
  dataForm.milliseconds = result.milliseconds
  dataForm.minutes = result.minutes
  dataForm.hours = result.hours
  dataForm.weeks = result.weeks
  console.log(result, 'result')
}
</script>

<style scoped lang="less"></style>
