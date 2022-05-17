<script setup lang="ts">
import JsonToTs from 'json-to-ts'
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash-es'
import Clipboard from 'clipboard'
import { log } from '@/utils/log'
import JsonCode from '@/components/JsonCode/index.vue'
import utils from '@/utils'
import type { ButtonsListType } from '@/components/Buttons/index.vue'
import Buttons from '@/components/Buttons/index.vue'

const content = ref('')
const tsName = ref('')
const sourceData = ref('')
const defaultSource = ref('')

function CoverToTs(val: string, name?: string) {
  try {
    const result = JSON.parse(val)
    return JsonToTs(result, { rootName: name ?? 'RootObj' })
  }
  catch (err) {
    log.i('err', err)
  }
}

// button
const buttonList: ButtonsListType[] = [
  {
    title: '格式化',
    size: 'small',
  },
]
function formatText() {
  defaultSource.value = utils.format(sourceData.value, false)
}
function changeButton(val: string) {
  if (val === '格式化')
    formatText()
}

function changeText(val: any) {
  sourceData.value = cloneDeep(val)
  tsGen(val)
}
function tsGen(val: string, name?: string) {
  if (CoverToTs(val, name))
    content.value = CoverToTs(val, name)?.join('\n') ?? ''
}

function clipText() {
  const clipboard = new Clipboard('.copy')
  clipboard.on('success', (e) => {
    console.log('复制成功', e)
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

watch(tsName, (newVal) => {
  log.i('文件名称变化', newVal)
  tsName.value = newVal
  tsGen(sourceData.value, tsName.value)
}, {
  immediate: true,
  deep: true,
})
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <JsonCode :change-text="changeText" :content="defaultSource">
        <template #title>
          <div>
            <el-link type="primary" style="font-size: 25px;" disabled>
              请输入根节点名称
            </el-link>
            <el-input v-model="tsName" class="inputW" placeholder="请输入根节点名称" />
          </div>
          <Buttons :list="buttonList" :click="changeButton" />
        </template>
      </JsonCode>
    </el-col>
    <el-col :span="12">
      <JsonCode :content="content" mode="text/typescript" :read-only="true">
        <template #title>
          <el-link type="success" style="font-size: 25px;" disabled>
            转换的typescript
          </el-link>
          <el-button
            type="primary"
            size="small"
            class="copy"
            :data-clipboard-text="content"
            style="margin-left: 15px; margin-bottom: 15px"
            @click="clipText"
          >
            复制内容
          </el-button>
        </template>
      </JsonCode>
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
.inputW {
  width: 150px;
  margin-left: 15px;
}
</style>
