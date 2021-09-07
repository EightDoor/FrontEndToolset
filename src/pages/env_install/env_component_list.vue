<template>
  <ul class="ul">
    <li>
      <el-badge v-if="!data.status" is-dot class="item">
        {{
          data.title
        }}
      </el-badge>
      <template v-else>{{ data.title }}</template>
      <div class="msg">
        <el-alert
          :closable="false"
          v-if="cmdDataErr"
          :title="cmdDataErr"
          type="error"
          effect="dark"
        />
        <el-alert :closable="false" v-if="cmdData" :title="cmdData" type="success" effect="dark" />
      </div>
    </li>
    <li>
      <el-button
        @click="change(data)"
        :type="data.status ? 'danger' : 'primary'"
      >{{ data.status ? '卸载' : '安装' }}</el-button>
    </li>
  </ul>
  <com-dialog ref="dialogRef" @refresh="refresh" />
</template>
<script lang="ts">
export default defineComponent({
  name: 'EnvComponentList',
});
</script>

<script lang="ts" setup>
import { log } from '@/utils/log';
import { ElMessage } from 'element-plus';
import { defineComponent, PropType, reactive, ref, watch } from 'vue';
import EnvCmd from './env_component_list_cmd';
import ComDialog from './env_component_list_dialog.vue';

const props = defineProps({
  data: {
    type: Object as PropType<EnvInstall.ListType>,
  },
});

let data = reactive<EnvInstall.ListType>({
  status: false,
  title: '',
  type: '',
  cmd: '',
  install: '',
});
const cmdData = ref('');
const cmdDataErr = ref('');
const dialogRef = ref<EnvInstall.openDialogType<EnvInstall.ListType>>();

function refresh() {
  cmdFun()
}

function cmdFun(val?: EnvInstall.ListType) {
  cmdData.value = '';
  cmdDataErr.value = '';
  EnvCmd(
    val?.cmd ?? data.cmd,
    (val) => {
      cmdDataErr.value = val;
    },
    (val) => {
      cmdData.value = String(val);
      data.status = true;
    }
  );
}
watch(
  () => props.data,
  (newValue, oldValue) => {
    log('wa', props.data);
    if (props.data) {
      data = props.data;
      cmdFun(props.data)
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

function change(val: EnvInstall.ListType) {
  if (val.install || val.uninstall) {
    dialogRef.value?.openDialog(data.status ? "uninstall" : "install", val)
  } else {
    ElMessage.error('没有安装命令!!!');
  }
}
</script>
<style scoped lang="less">
@import "./env_component_list.less";
</style>
