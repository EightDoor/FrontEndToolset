<template>
  <el-dialog
    :center="true"
    :title="data.title + '安装'"
    v-model="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <EnvNode v-if="data.type === 'node'" />
    <EnvNvm v-if="data.type === 'nvm'" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import EnvNode from './env_component_node.vue';
import EnvNvm from './env_component_nvm.vue';

const dialogVisible = ref(false);
const data = reactive({
  title: '',
  type: '',
});
function handleClose() {
  dialogVisible.value = false;
}

function openDialog(val) {
  data.title = val.title;
  data.type = val.type;
  dialogVisible.value = true;
}

defineExpose({
  openDialog,
});
</script>
<style scoped lang="less"></style>
