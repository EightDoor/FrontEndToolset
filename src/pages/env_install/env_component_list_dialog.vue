<template>
  <el-dialog
    :center="true"
    :title="status === 'install' ? '安装' : '卸载'"
    v-model="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <div v-if="status === 'install'">
      <el-form :model="form" ref="ruleForm" label-width="100px">
        <el-form-item label="镜像源">
          <el-select v-model="form.mirrorSource" placeholder="请选择镜像源">
            <el-option label="npm" value="https://registry.npmjs.org/"></el-option>
            <el-option label="cnpm" value="http://r.cnpmjs.org/"></el-option>
            <el-option label="taobao" value="https://registry.npm.taobao.org/"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装命令">
          <!-- 要高亮的代码块用 "v-highlight"  -->
          <div v-highlight>{{ data?.install }}</div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { log } from '@/utils/log';

const form = reactive({
  // 镜像源
  "mirrorSource": "taobao",
});
const status = ref<EnvInstall.Status>('install')
const data = ref<EnvInstall.ListType>()
const dialogVisible = ref(false);
function handleClose() {
  dialogVisible.value = false;
}

function openDialog(sta: EnvInstall.Status, val: EnvInstall.ListType) {
  status.value = sta;
  data.value = val;
  dialogVisible.value = true;
}

function submit() {
  log('submit', '提交');
  if (status.value === 'install') {

  } else if (status.value === 'uninstall') {
  }
}
defineExpose({
  openDialog,
})
</script>