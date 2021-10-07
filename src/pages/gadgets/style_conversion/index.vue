<template>
  <el-select @change="oneChange" v-model="oneSelect">
    <el-option
      :disabled="twoSelect === item.value"
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
  <el-input
    class="space"
    :placeholder="textPlaceHolder"
    type="textarea"
    v-model="textSelect"
    :row="4"
  ></el-input>

  <el-select @change="twoChange" v-model="twoSelect">
    <el-option
      :disabled="oneSelect === item.value"
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
  <el-input
    class="space"
    :placeholder="twoTextPlaceHolder"
    type="textarea"
    v-model="twoTextSelect"
    :row="4"
  ></el-input>

  <div class="space">
    <el-button type="primary">
      一键将
      <span class="font">{{ oneSelect }}</span>
      转换为
      <span class="font">{{ twoSelect }}</span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
// 参考 https://www.jianshu.com/p/1913a645d9bb 实现
// 样式转换 less、ssass、css
const oneSelect = ref("less")
const textSelect = ref("")
const textPlaceHolder = ref("请输入" + oneSelect.value)
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
  oneSelect.value = val;
  textPlaceHolder.value = `请输入${val}`
}



const twoSelect = ref("css")
const twoTextSelect = ref("")
const twoTextPlaceHolder = ref("请输入" + twoSelect.value)


function twoChange(val) {
  twoSelect.value = val;
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
  color: red;
}
</style>
