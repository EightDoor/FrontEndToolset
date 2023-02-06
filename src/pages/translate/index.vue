<template>
  <el-row class="header_title">
    <el-col :span="12">
      <!--      <el-select -->
      <!--        v-model="value" -->
      <!--        class="input_w" -->
      <!--        placeholder="请选择语言" -->
      <!--        @change="changeSelect" -->
      <!--      > -->
      <!--        <el-option -->
      <!--          v-for="item in options" -->
      <!--          :key="item.value" -->
      <!--          :label="item.label" -->
      <!--          :value="item.value" -->
      <!--        /> -->
      <!--      </el-select> -->
      <!--      <el-icon class="icon"> -->
      <!--        <ArrowRightBold /> -->
      <!--      </el-icon> -->
      <!--      <el-select v-model="outputValue" class="input_w" placeholder="请选择语言"> -->
      <!--        <el-option -->
      <!--          v-for="item in options" -->
      <!--          :key="item.value" -->
      <!--          :label="item.label" -->
      <!--          :value="item.value" -->
      <!--        /> -->
      <!--      </el-select> -->
      <div class="select-btn">
        <div class="select-show">
          <span :style="selectIndex[0] === 0 ? { color: 'blue' } : { color: 'red' }">{{ options[selectIndex[0]].label }}</span>
          <el-icon><Switch /></el-icon>
          <span :style="selectIndex[0] === 0 ? { color: 'red' } : { color: 'blue' }">{{ options[selectIndex[1]].label }}</span>
        </div>
        <el-button type="primary" @click="changeNewSelect">
          切换
        </el-button>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <!-- <el-input
        type="textarea"
        :autosize="{ minRows: 10 }"
        :rows="10"
        placeholder="请输入翻译内容"
        v-model="data.entryText"
      /> -->

      <div class="imageContent__clear">
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
      <div
        ref="contentImgRef"
        contenteditable="true"
        class="imageContent"
        @keyup="changeEvenet"
      />
    </el-col>
    <el-col :span="1" />
    <el-col :span="12" class="right_content">
      <div>
        <template v-if="data.resultText.length === 0">
          请在左侧输入翻译内容
        </template>
        <template v-else>
          <div class="right_content__title">
            翻译结果为:
          </div>
          <ul v-for="(item, index) in data.resultText" :key="index">
            <li class="right_content__title__li">
              <span v-if="data.resultText.length > 1">值: ({{ index + 1 }}):</span>
              {{ item.dst }}
            </li>
          </ul>
        </template>
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
import * as qiniu from 'qiniu-js'
import dayjs from 'dayjs'
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
const defaultList = ['2', '4', '3', '1']
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
  if (showTransitionImg.value) {
    // 存在图片，直接翻译图片
    uploadImg(showTransitionImg.value)
    return
  }
  data.resultText = []
  data.loading = true
  const appid = import.meta.env.VITE_APP_ID
  const key = import.meta.env.VITE_APP_KEY
  const salt = new Date().getTime()
  const query = data.entryText
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = value.value
  const to = outputValue.value
  const str1 = appid + query + salt + key
  const sign = MD5(str1)
  log.i('appid', appid)
  log.i('key', key)
  axios
    .get(`${Config.backUrl}baidu_img/translationContent`, {
      params: {
        q: query,
        appid,
        salt,
        from,
        to,
        sign,
      },
    })
    .then((res) => {
      console.log(res.data, 'res.data')
      data.loading = false
      if (res.data.code === 0)
        data.resultText = res.data.data.trans_result
      else
        ElMessage.error(`翻译失败: ${res.data.data}`)
    })
    .catch((err) => {
      data.loading = false
      ElMessage.error(`翻译失败: ${JSON.stringify(err)}`)
    })
}
const route = useRoute()

// 翻译的图片
const showTransitionImg = ref('')
const contentImgRef = ref(null)

function clearText() {
  data.entryText = ''
  data.resultText = []
  showTransitionImg.value = ''
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

function changeSelect(val) {
  if (val === 'zh')
    outputValue.value = 'en'
  else
    outputValue.value = 'zh'
}

// 翻译图片显示
function changeEvenet(v) {
  const text = v.target.innerText
  data.entryText = text
  let imgUrl = ''
  if (text)
    showTransitionImg.value = ''

  v.target.childNodes.forEach(async (item) => {
    if (item.nodeName === 'IMG') {
      imgUrl = item.currentSrc
      showTransitionImg.value = imgUrl
    }
  })
  if (v.keyCode === 13) {
    console.log('键入回车')
    translateFun()
  }
}

async function uploadImg(imgUrl: string) {
  const result = await axios.get(`${Config.backUrl}baidu_img/token`)
  if (result.data.code === 0) {
    const token = result.data.data
    const blob: any = dataURItoBlob(imgUrl)
    const name = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    const observable = qiniu.upload(
      blob,
      name,
      token,
      {},
      {
        useCdnDomain: true,
        region: 'z1',
      },
    )
    // 上传开始
    const observer = {
      next(res) {
        console.log(res, '上传中...')
      },
      error(err) {
        console.log(err, '上传失败')
        ElMessage.error('图片上传失败')
      },
      complete(res) {
        const uploadImg = Config.qiuniuLoadUrl + res.key
        ElMessage.success('图片上传成功')
        translationImageContent(uploadImg)
      },
    }
    observable.subscribe(observer)
  }
}
function translationImageContent(url: string) {
  axios
    .get(
      `${Config.backUrl}baidu_img/img?url=${encodeURI(url)}&from=${
        value.value
      }&to=${outputValue.value}`,
    )
    .then((res) => {
      console.log(
        '🚀 ~ file: index.vue ~ line 236 ~ axios.get ~ res',
        res.data,
      )
      const result = res.data.data.data.sumDst
      const src = res.data.data.data.sumSrc

      data.resultText = [
        {
          dst: result,
          src,
        },
      ]
      console.log(data.resultText)

      ElMessage.success('翻译成功')
    })
    .catch(() => {
      ElMessage.error('翻译失败')
    })
}

/**
 * base64  to blob二进制
 */
function dataURItoBlob(dataURI) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0] // mime类型
  const byteString = atob(dataURI.split(',')[1]) // base64 解码
  const arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
  const intArray = new Uint8Array(arrayBuffer) // 创建视图

  for (let i = 0; i < byteString.length; i++)
    intArray[i] = byteString.charCodeAt(i)

  return new Blob([intArray], { type: mimeString })
}

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
</style>
