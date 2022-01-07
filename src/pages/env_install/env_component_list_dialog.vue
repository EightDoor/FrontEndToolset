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
            <el-option
              label="npm"
              value="https://registry.npmjs.org/"
            ></el-option>
            <el-option label="cnpm" value="http://r.cnpmjs.org/"></el-option>
            <el-option
              label="taobao"
              value="https://registry.npmmirror.com/"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装命令">
          <!-- 要高亮的代码块用 "v-highlight"  -->
          <div v-highlight>
            {{ `--registry=${form.mirrorSource}` }}
          </div>
        </el-form-item>
        <el-form-item v-if="operationLog" label="操作日志">
          <!--          TODO 更新数据视图无法更新，自定义指令问题-->
          <!--          <div v-highlight>{{ operationLog }}</div>-->
          <ul class="ul">
            <div v-html="operationLog"></div>
          </ul>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="status === 'uninstall'">
      <el-form>
        <el-form-item label="卸载命令">
          <div v-highlight>{{ data?.uninstall }}</div>
        </el-form-item>
        <el-form-item v-if="operationLog" label="操作日志">
          <div v-highlight>{{ operationLog }}</div>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="submit(`--registry=${form.mirrorSource}`, data?.install)"
          :loading="loading"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { log } from '@/utils/log';
import EnvCmd, { EnvCmdType } from './env_component_list_cmd';
import { ListType, Status } from '@/pages/env_install/env_type';

const form = reactive({
  // 镜像源
  mirrorSource: 'https://registry.npm.taobao.org/',
});

const loading = ref(false);
const status = ref<Status>('install');
const data = ref<ListType>();
const dialogVisible = ref(false);
function handleClose() {
  dialogVisible.value = false;
}

const emit = defineEmits(['refresh']);

function openDialog(sta: Status, val: ListType) {
  status.value = sta;
  data.value = val;
  dialogVisible.value = true;
  operationLog.value = '';
}

const operationLog = ref('');
function submit(val: string, source?: EnvCmdType) {
  log('submit', '提交');
  if (status.value === 'install') {
    if (!val) {
      ElMessage.error('没有安装命令');
    } else {
      loading.value = true;
      if (source?.arg) {
        source.arg.push(val);
        EnvCmd(
          source,
          (err) => {
            operationLog.value += `${err}\n`;
            loading.value = false;
          },
          (v: any) => {
            loading.value = false;
            operationLog.value += `<li style="margin-top: 15px;border-bottom: 1px solid red">${v}</li>`;
            log('执行的', operationLog.value);
            emit('refresh', 'install');
          }
        );
      }
    }
  } else if (status.value === 'uninstall') {
    loading.value = true;
    EnvCmd(
      data.value?.uninstall ?? { cmd: '', arg: [] },
      (err) => {
        operationLog.value += `${err}\n`;
        loading.value = false;
        emit('refresh', 'uninstall');
      },
      (msg) => {
        loading.value = false;
        operationLog.value += `${msg}\n`;
        console.log('成功', msg);
        emit('refresh', 'uninstall');
      }
    );
  }
}

defineExpose({
  openDialog,
});
</script>
<style scoped lang="less"></style>
