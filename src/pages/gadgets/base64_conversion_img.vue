<template>
  <div>
    <el-upload
      ref="upload"
      style="width: 200px"
      action="#"
      class="upload-demo"
      :on-change="onChange"
      :http-request="httpRequest"
      :file-list="fileList"
      :auto-upload="true"
    >
      <template #trigger>
        <el-button type="primary">
          选择图片
        </el-button>
      </template>
    </el-upload>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-divider content-position="left">
          转换结果为:
        </el-divider>
        <el-input
          v-model="base64Data"
          :rows="10"
          type="textarea"
        />
        <el-button v-if="base64Data" style="margin-top: 15px" type="success" @click="copyData">
          复制结果
        </el-button>
      </el-col>
      <el-col :span="12">
        <img class="img" :src="base64Data">
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

const base64Data = ref()

function httpRequest(data) {
  // 调用转方法base64
  getBase64(data.file).then((resBase64: any) => {
    base64Data.value = resBase64
  })
}

async function copyData() {
  try {
    await toClipboard(base64Data.value)
    ElMessage.success('复制成功')
  }
  catch (e) {
    console.error(e)
  }
}
const fileList = ref<any[]>([])
function onChange(uploadFile, uploadFiles: any) {
  console.log(uploadFiles, 'uploadFiles')
  if (uploadFiles.length > 0)
    fileList.value = [uploadFiles[uploadFiles.length - 1]]// 这一步，是 展示最后一次选择文件
}
// 转base64码
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileResult = ''
    reader.readAsDataURL(file)
    // 开始转
    reader.onload = () => {
      fileResult = reader.result
    }
    // 转 失败
    reader.onerror = (error) => {
      reject(error)
    }
    // 转 结束
    reader.onloadend = () => {
      resolve(fileResult)
    }
  })
}
</script>

<style scoped lang="less">
.img {
  max-width: 100%;
  height: 350px;
}
</style>
