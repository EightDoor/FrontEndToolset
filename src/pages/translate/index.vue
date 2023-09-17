<template>
  <el-row class="header_title">
    <el-col :span="12">
      <div class="select-btn">
        <div class="select-show">
          <span :style="selectIndex[0] === 0 ? { color: 'blue' } : { color: 'red' }">{{ options[selectIndex[0]].label }}</span>
          <el-icon><Switch /></el-icon>
          <span :style="selectIndex[0] === 0 ? { color: 'red' } : { color: 'blue' }">{{ options[selectIndex[1]].label }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <div class="imageContent__clear">
        <el-button type="primary" @click="changeNewSelect">
          切换
        </el-button>
        <el-button
          type="success"
          size="large"
          :loading="data.loading"
          @click="translateFun"
        >
          翻译
        </el-button>
        <el-button type="primary" plain @click="clearText">
          清空
        </el-button>
      </div>
      <el-input
        ref="contentImgRef"
        v-model="data.entryText"
        :rows="10"
        placeholder="请在左侧输入翻译内容"
        style="margin-top: 15px"
        type="textarea"
      />
    </el-col>
    <el-col :span="1" />
    <el-col :span="12" class="right_content">
      <div>
        <div class="right_content__title">
          翻译结果为:
        </div>
        <div class="tw-flex tw-flex-row tw-items-center">
          <ul v-for="(item, index) in data.resultText" :key="index">
            <li class="right_content__title__li">
              <span v-if="data.resultText.length > 1">值: ({{ index + 1 }}):</span>
              {{ item.dst }}
            </li>
          </ul>
          <img v-if="data.resultText.length > 0" class="tw-w-5 tw-h-5 speak-img tw-ml-4" src="/images/speak.png" @click="pronunciationFun">
        </div>
      </div>
      <div
        v-if="selectIndex[0] === 0"
      >
        <el-divider />
        <ul class="formattxt-ul">
          <template v-for="(item, index) in defaultList">
            <li v-if="formatTxt(item)" :key="index">
              {{ formatTxt(item) }}   <el-button style="margin-left: 15px" type="success" class="copy" :data-clipboard-text="formatTxt(item)" @click="copyData">
                复制
              </el-button>
            </li>
          </template>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Switch } from '@element-plus/icons'
import axios from 'axios'
import MD5 from 'md5'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router'
import {
  onBeforeRouteUpdate,
  useRoute,
} from 'vue-router'
import Clipboard from 'clipboard'
import type { TranslateType } from './index.type'
import { log } from '@/utils/log'
import Config from '@/config/index'
import utils from '@/utils'

const data = reactive<TranslateType.Data>({
  entryText: '',
  resultText: [],
  loading: false,
})
const value = ref('en')
const outputValue = ref('zh')
const selectIndex = ref([1, 0])
const options = ref<
  {
    value: string
    label: string
  }[]
>([
  {
    value: 'zh',
    label: '中文',
  },
  {
    value: 'en',
    label: '英文',
  },
])

// 英文格式化展示
const defaultList = ['2', '5', '4', '3', '1']
function formatTxt(val: string) {
  if (data?.resultText?.length > 0) {
    let source = data.resultText[0].dst
    // 转换首字符为小写
    source = source.toLowerCase()
    const withHorizontal = source.replaceAll(' ', '-')
    const smallHump = tranformStr1(withHorizontal)
    switch (val) {
      case '1':
        // 带横线
        return withHorizontal
      case '2':
        // 小驼峰
        return smallHump
      case '3':
        // 大驼峰
        return smallHump[0].toUpperCase() + smallHump.substr(1)
      case '4':
        // 大写
        return withHorizontal.replaceAll('-', '_').toUpperCase()
      case '5':
        return source.toLowerCase().replaceAll(' ', '_')
    }
  }
}

/**
 * 字符串转换-分割
 * @param str
 */
function tranformStr1(str) {
  const strArr = str.split('-')
  for (let i = 1; i < strArr.length; i++)
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)

  return strArr.join('')
}
function copyData() {
  const clip = new Clipboard('.copy')
  utils.clipTextResultInfo(clip)
}

function translateFun() {
  data.resultText = []
  data.loading = true
  const query = data.entryText
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = value.value
  const to = outputValue.value
  axios
    .post(`${Config.backUrl}translate/translationContent`, {
      q: query,
      from,
      to,
    })
    .then((res) => {
      console.log(res.data, 'res.data')
      data.loading = false
      if (res.data.code === 0)
        data.resultText = res.data.data
      else
        ElMessage.error(`翻译失败: ${res.data.data}`)
    })
    .catch((err) => {
      data.loading = false
      ElMessage.error(`翻译失败: ${JSON.stringify(err)}`)
    })
}
const route = useRoute()

const contentImgRef = ref(null)

function clearText() {
  data.entryText = ''
  data.resultText = []
  if (contentImgRef.value)
    (contentImgRef.value as HTMLElement).innerHTML = ''
}

onMounted(() => {
  const title = route.query.title as string
  if (title) {
    data.entryText = title
    translateFun()
  }
})

onBeforeRouteUpdate(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    if (to.query.title) {
      data.entryText = to.query.title as string
      translateFun()
    }
    next()
  },
)

function changeNewSelect() {
  if (selectIndex.value[0] === 0) {
    selectIndex.value[0] = 1
    selectIndex.value[1] = 0
  }
  else {
    selectIndex.value[0] = 0
    selectIndex.value[1] = 1
  }
  console.log(selectIndex.value[0])
  if (selectIndex.value[0] === 0) {
    value.value = 'zh'
    outputValue.value = 'en'
  }
  else {
    value.value = 'en'
    outputValue.value = 'zh'
  }
}

// 发音
const speak = (msg: string) => {
  const synth = window.speechSynthesis
  const u = new SpeechSynthesisUtterance()
  // u.lang = 'zh-TW'
  u.text = msg
  synth.speak(u)
}
function pronunciationFun() {
  // data.resultText
  log.i(data.resultText, '翻译结果')
  const result = data.resultText.map((item) => {
    return item.dst
  }).join(',')
  speak(result)
}
</script>

<style scoped lang="less">
.header_title {
  margin-bottom: 15px;
}
.right_content {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  &__title {
    margin-bottom: 10px;
    &__li {
      color: red;
    }
  }
}
.icon {
  margin: 0 15px;
}
.input_w {
  width: 150px;
}
.imageContent {
  height: 200px;
  border: 1px solid #cccccc;
  overflow-x: scroll;
  padding: 15px;
  &__clear {
    float: right;
    margin-left: 5px;
  }
}
.select-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.select-show {
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-right: 15px;
  align-items: center;
}
.formattxt-ul {
  li {
    margin-top: 15px;
  }
}
.speak-img {
  &:hover {
    cursor: pointer;
  }
  &:active {
    background: #cccccc;
    border-radius: 20px;
  }
}
</style>
