<template>
  <div style="margin-bottom: 15px">
    <el-alert v-if="!isError" title="解析正确" :closable="false" type="success" />
    <el-alert v-else title="解析错误" :closable="false" type="error" />
  </div>

  <el-row :gutter="20">
    <el-col :span="12">
      <el-input
        v-model="content"
        :rows="30" type="textarea" placeholder="请输入json"
      />
    </el-col>
    <el-col :span="12">
      <vue-json-pretty :data="defaultJson" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const content = ref<any>(null)
const defaultJson = ref<any>({})
const isError = ref(false)
watch(content, (newVal, oldValue) => {
  if (newVal) {
    try {
      defaultJson.value = JSON.parse(newVal)
      isError.value = false
    }
    catch (e) {
      isError.value = true
      console.log(e)
    }
  }
  else {
    defaultJson.value = {}
    isError.value = false
  }
})
</script>

<style scoped lang="less"></style>
