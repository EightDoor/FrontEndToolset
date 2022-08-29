<template>
  <el-select v-model="oneSelect" @change="oneChange">
    <el-option
      v-for="item in options" :key="item.value" :disabled="twoSelect === item.value" :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-input
    v-model="textSelect" :autosize="{ minRows: 10 }" class="space" :placeholder="textPlaceHolder"
    type="textarea" :row="4"
  />

  <el-select v-model="twoSelect" @change="twoChange">
    <el-option
      v-for="item in options" :key="item.value" :disabled="oneSelect === item.value" :label="item.label"
      :value="item.value"
    />
  </el-select>
  <el-input
    v-model="twoTextSelect" class="space" :placeholder="twoTextPlaceHolder" type="textarea"
    :autosize="{ minRows: 10 }"
  />

  <div class="space">
    <el-button type="primary" size="large ">
      一键将
      <span class="font">{{ oneSelect }}</span>
      转换为
      <span class="font">{{ twoSelect }}</span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 参考 https://www.jianshu.com/p/1913a645d9bb 实现
// 样式转换 less、ssass、css
const oneSelect = ref('less')
const textSelect = ref('')
const textPlaceHolder = ref(`请输入${oneSelect.value}`)
const options = [
  {
    label: 'less',
    value: 'less',
  },
  {
    label: 'sass',
    value: 'sass',
  },
  {
    label: 'css',
    value: 'css',
  },
]

function oneChange(val) {
  oneSelect.value = val
  textPlaceHolder.value = `请输入${val}`
}

const twoSelect = ref('css')
const twoTextSelect = ref('')
const twoTextPlaceHolder = ref(`请输入${twoSelect.value}`)

function twoChange(val) {
  twoSelect.value = val
  textPlaceHolder.value = `请输入${val}`
}
</script>

<style lang="less" scoped>
.space {
  margin: 15px 0;
}
.font {
  font-size: 25px;
  display: inline-block;
  margin: 0 10px;
  color: white;
}
</style>
