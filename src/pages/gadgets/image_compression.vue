<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        class="upload-demo"
        action="/api/imageCompression"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-success="onSuccess"
        :auto-upload="false"
        :limit="limit"
        :data="{
          compressSchedule,
        }"
        accept=".jpg,.png,.JPG,.PNG"
        drag
        :on-exceed="handleExceed"
      >
        <div class="el-upload__text">
          将文件拖到此处或<em>点击上传</em>，最多上传10张图片
        </div>
      </el-upload>
      <div class="slider-demo-block">
        <span class="demonstration">图片质量压缩比例: {{ compressSchedule }}</span>
        <div style="padding: 0 15px">
          <el-slider v-model="compressSchedule" :min="0.1" :max="1" :step="0.1" />
        </div>
        <el-alert :closable="false" title="提示：图片质量压缩比例越低，图片越小，图片质量越差。jpg格式图片压缩效果最好" type="warning" />
      </div>
      <el-button v-if="fileList.length > 0" style="margin-top: 20px;margin-left: 30px" type="primary" @click="startComppression">
        开始压缩
      </el-button>
      <el-button v-if="fileList.length > 0" style="margin-top: 20px;margin-left: 30px" type="info" @click="clearImg">
        清空
      </el-button>
    </el-col>
    <el-col :span="12">
      <el-table height="500" :data="compressionResultList" style="width: 100%">
        <el-table-column label="图片名称" prop="title" />
        <el-table-column label="图片">
          <template #default="scope">
            <img style="width: 50px;height: 50px" :src="scope.row.url">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button @click="downloadImg(scope.row)">
              下载图片
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadInstance, UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { log } from '@/utils/log'

const limit = ref(10)
const fileList = ref<UploadUserFile[]>([])
const compressionResultList = ref([])
const compressSchedule = ref(0.8)

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
function onSuccess(response) {
  if (response.code === 0)
    compressionResultList.value = response.data
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `最大只能上传${limit.value}张图片`,
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `确认删除 ${uploadFile.name} 吗?`,
  ).then(
    () => true,
    () => false,
  )
}

const uploadRef = ref<UploadInstance>()
function startComppression() {
  uploadRef.value?.submit()
}
function clearImg() {
  fileList.value = []
  compressionResultList.value = []
}
function downloadImg(item) {
  downImgFile(item.url, item.title)
}
function downImgFile(url, filename) {
  // 创建隐藏的可下载链接
  const eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  // 字符内容转变成blob地址
  eleLink.href = url
  // 触发点击
  document.body.appendChild(eleLink)
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}
</script>

<style scoped lang="less"></style>
