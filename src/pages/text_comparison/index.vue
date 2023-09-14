<template>
  <el-row>
    <el-col :span="12">
      对比类型
      <el-select v-model="type" placeholder="请选择对比类型">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary">
        对比
      </el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-input v-model="sourceText" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" placeholder="请输入源文本" />
    </el-col>
    <el-col :span="12">
      <el-input v-model="compareText" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" placeholder="请输入对比文本" />
    </el-col>
  </el-row>
  <div id="content" />
</template>

<script lang='ts' setup>
import * as Diff from 'diff'
import { ref, watch } from 'vue'

// 类型
const type = ref('')
const typeOptions = ref([])

// 对比文本
const sourceText = ref('')
const compareText = ref('')

function diffFun() {
  const result = Diff.diffChars(sourceText.value, compareText.value)
  const virtualDOM = document.createDocumentFragment()
  result.forEach((part) => {
    const span = document.createElement('span')
    span.style.color = part.added ? 'red' : '#333333'
    if (part.removed)
      span.style['text-decoration'] = 'line-through'

    span.appendChild(document.createTextNode(part.value))
    virtualDOM.appendChild(span)
  })
  document.getElementById('content')?.appendChild(virtualDOM)
}

watch([sourceText, compareText], () => {
  diffFun()
})
</script>
