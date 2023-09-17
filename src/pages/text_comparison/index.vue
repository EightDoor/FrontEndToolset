<template>
  <el-row class="tw-mb-4">
    <el-col :span="24">
      对比类型
      <el-select v-model="selectType" filterable class="tw-w-1/3" placeholder="请选择对比类型">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button class="tw-ml-5" type="primary" @click="contrastFun">
        对比
      </el-button>
      <el-button type="warning" @click="resetFun">
        重置
      </el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-input v-model="sourceText" :autosize="{ minRows: 15, maxRows: 30 }" type="textarea" placeholder="请输入对比文本" />
    </el-col>
    <el-col :span="12">
      <el-input v-model="compareText" :autosize="{ minRows: 15, maxRows: 30 }" type="textarea" placeholder="请输入对比文本" />
    </el-col>
  </el-row>
  <template v-if="diffResult.length > 0">
    <div class="tw-text-lg tw-my-4">
      对比结果：
    </div>
    <el-row>
      <el-col :span="24">
        <div v-for="(item, index) of diffResult" :key="index">
          <span :style="customStyle(item)">
            {{ item.value }}
          </span>
        </div>
      </el-col>
    </el-row>
  </template>
</template>

<script lang='ts' setup>
import type { Change } from 'diff'
import * as Diff from 'diff'
import { ref, watch } from 'vue'

// 类型
const type = ref('')
const typeOptions = ref([
  {
    label: '比较两个 JSON 对象，比较每个对象上定义的字段',
    value: 'diffJson',
  },
  {
    label: '比较两个数组，比较每个项是否严格相等 （===）',
    value: 'diffArrays',
  },
  {
    label: ' 比较两个文本块，比较CSS',
    value: 'diffCss',
  },
  {
    label: '比较文本块,逐字比较',
    value: 'diffChars',
    options: {
      ignoreCase: false,
    },
  }, {
    label: '比较文本块,逐字比较(忽略空格)',
    value: 'diffWords',
    options: {
      ignoreCase: false,
    },
  }, {
    label: '比较文本块,逐字比较(空格)',
    value: 'diffWordsWithSpace',
    options: {
      ignoreCase: false,
    },
  }, {
    label: '比较文本块,逐行比较',
    value: 'diffLines',
    options: {
      ignoreWhitespace: true,
    },
  },
  {
    label: '比较两个文本块，逐行比较，忽略前后空格',
    value: 'diffTrimmedLines',
  },
  {
    label: '区分两个文本块，逐句比较',
    value: 'diffSentences',
  },
])

// 对比文本
const sourceText = ref('')
const compareText = ref('')
const diffResult = ref<Change[]>([])
const selectType = ref('diffJson')

function resetFun() {
  selectType.value = 'diffJson'
  diffResult.value = []
  sourceText.value = ''
  compareText.value = ''
}
function contrastFun() {
  diffFun()
}
function customStyle(item: Change) {
  return {
    'color': item.added ? 'red' : '#333333',
    'text-decoration': item.removed ? 'line-through' : 'none',
  }
}
function diffFun() {
  diffResult.value = Diff[selectType.value](sourceText.value, compareText.value)
}
</script>
