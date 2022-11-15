<template>
  <div>
    <div class="btn-container">
      <div>
        <el-button class="btn" type="info" @click="clearData">
          清空数据
        </el-button>
        <el-button class="btn" type="primary" @click="formatText">
          格式化
        </el-button>
      </div>
      <el-button
        type="success" class="copy btn" :data-clipboard-text="changeText"
        @click="copy()"
      >
        复制格式化内容
      </el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          v-model="content"
          :rows="30"
          type="textarea"
          placeholder="请输入json"
        />
      </el-col>
      <el-col :span="12">
        <div class="format-text">
          <JsonCode :content="javascriptFormatText" @changeText="changeTextFun" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import jsBeautify from 'js-beautify'
import Clipboard from 'clipboard'
import JsonCode from '@/components/JsonCode/index.vue'
import utils from '@/utils'

const content = ref('')
const javascriptFormatText = ref('')
const options = { indent_size: 2, space_in_empty_paren: true }

function formatText() {
  javascriptFormatText.value = jsBeautify.js_beautify(content.value, options)
}
function clearData() {
  content.value = ''
  javascriptFormatText.value = ''
}

// 复制格式化内容
const changeText = ref('')
function changeTextFun(val) {
  changeText.value = val
}
function copy() {
  const clip = new Clipboard('.copy')
  utils.clipTextResultInfo(clip)
}
</script>

<style lang="less" scoped>
.btn {
  margin-bottom: 15px;
  margin-right: 15px;
}
.format-text {
  max-height: 80vh;
  overflow-y: auto;
}
.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
