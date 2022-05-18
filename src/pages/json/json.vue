<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Clipboard from 'clipboard'
import JsonCode from '@/components/JsonCode/index.vue'
import Buttons from '@/components/Buttons/index.vue'
import type { ButtonsListType } from '@/types/com'

const loading = ref(false)

const list = ref<ButtonsListType[]>([
  {
    title: '压缩',
    size: 'small',
  },
  {
    title: '格式化',
    size: 'small',
  },
])
const content = ref<any>(null)
const defaultJson = ref<any>(null)

function clipText() {
  const clipboard = new Clipboard('.copy')
  clipboard.on('success', (e) => {
    console.log('复制成功', e)
    ElMessage.success('复制成功')
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', (e) => {
    // 不支持复制
    console.log('该浏览器不支持自动复制', e)
    // 释放内存
    clipboard.destroy()
  })
}

function change(val: string) {
  switch (val) {
    case '压缩':
      content.value = JSON.stringify(defaultJson.value)
      break
    case '格式化':
      try {
        content.value = JSON.parse(defaultJson.value)
      }
      catch (e) {
        ElMessage.error('json格式化失败')
      }
      break
    default:
  }
}

function changeText(val: any) {
  defaultJson.value = val
}
</script>

<template>
  <Buttons :focus="true" :list="list" :click="change" :loading="loading">
    <el-button
      type="primary"
      size="small"
      class="copy"
      :data-clipboard-text="defaultJson"
      style="margin-left: 15px; margin-bottom: 15px"
      @click="clipText"
    >
      复制
    </el-button>
  </Buttons>
  <JsonCode :change-text="changeText" :content="content" />
</template>

<style scoped lang="less"></style>
