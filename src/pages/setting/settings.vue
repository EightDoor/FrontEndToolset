<template>
  <div class="setting_container">
    <go-home/>
    <el-form ref="formRef" :model="formData" label-width="120px">
      <el-form-item label="开机启动">
        <el-radio-group v-model="formData.isPowerOn">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="settingFun">设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import GoHome from "@/components/GoHome/index.vue";
import { onMounted, ref } from "vue";
import CommVariable from "@/comm_variable/comm_variable.json";
import { ElMessage } from 'element-plus';

const { ipcRenderer } = require("electron")

const formData = ref({
  isPowerOn: true,
})
const formRef = ref(null)

onMounted(()=>{
  getIsPowerOn()
})

async function getIsPowerOn() {
  formData.value.isPowerOn = await ipcRenderer.invoke(CommVariable.channel.POWER_ON_STATUS);
}
async function settingFun() {
  await ipcRenderer.invoke(CommVariable.channel.POWER_ON_SETTING_STATUS, formData.value.isPowerOn)
  ElMessage.success("设置成功")
}
</script>
<style scoped lang="less">
.setting_container {
  padding: 15px;
}
</style>
