<template>
  <el-tabs tab-position="top">
    <el-tab-pane v-for="(item, index) in list" :key="index" :label="item.label">
      <component :is="item.component" />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { markRaw, ref } from 'vue'
import Calculator from './calculator/index.vue'
import ColorHexConversion from './color_hex_conversion.vue'
import UrlEncoding from './url_encoding.vue'
import StyleConversion from './style_conversion/index.vue'
import UUIDGenerate from './uuid_generate.vue'
import Md5Component from './md5Component.vue'
import Base64Component from './base64Component.vue'
import PasswordGenerate from './password_generate.vue'
import TimeStamp from './time_stamp/index.vue'
import ImageCompression from './image_compression.vue'
import TimeConversion from '@/pages/gadgets/timeConversion.vue'
import Base64ConversionImg from '@/pages/gadgets/base64_conversion_img.vue'

export interface ListType {
  label: string
  component: any
}
const list = ref<ListType[]>([
  {
    label: '密码生成',
    component: markRaw(PasswordGenerate),
  },
  {
    label: '时间转换<->时间戳',
    component: markRaw(TimeStamp),
  },
  // {
  //   label: '时间单位转换',
  //   component: markRaw(TimeConversion),
  // },
  {
    label: 'uuid生成',
    component: markRaw(UUIDGenerate),
  },
  {
    label: 'md5',
    component: markRaw(Md5Component),
  },
  {
    label: 'base64',
    component: markRaw(Base64Component),
  },
  {
    label: '颜色进制转换',
    component: markRaw(ColorHexConversion),
  },
  {
    label: '计算器',
    component: markRaw(Calculator),
  },
  {
    label: 'Url编码解码',
    component: markRaw(UrlEncoding),
  },
  {
    label: '图片转换->base64',
    component: markRaw(Base64ConversionImg),
  },
  {
    label: '图片压缩',
    component: markRaw(ImageCompression),
  },
  // {
  //   label: 'less、sass、css相互转换',
  //   component: markRaw(StyleConversion),
  // },
])
</script>
