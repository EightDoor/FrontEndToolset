<template>
 <div class="container">
   <go-home/>
   <div>
     <el-form ref="formRef" :model="formData" label-width="120px">
       <el-form-item v-for="(item, index) in list" :key="index" :label="item.description">
          <el-input v-model="formData[item.label]"/>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="changeShortcutKey">更改快捷键</el-button>
       </el-form-item>
     </el-form>
   </div>
 </div>
</template>
<script setup lang="ts">
import GoHome from '@/components/GoHome/index.vue';
import { ref, onMounted } from "vue";
import CommVariable from '@/comm_variable/comm_variable.json';
import Business from '@/utils/business';
import {ElMessage} from 'element-plus';
import store from '@/utils/store';
import Constant from "@/utils/constant";

const formData = ref({})
const formRef = ref(null)
const list = ref(CommVariable.Config.ShortcutKey)

onMounted(()=>{
  getList();
})

function getList() {
  list.value.forEach((item)=>{
    formData.value[item.label] = item.value;
  })
}
async function changeShortcutKey() {
  await store.set(Constant.REGISTER_SHORTCUT_KEYS, list.value);
  await Business.registerShortcutKeys(list.value);
  ElMessage.success("更改成功");
}
</script>
<style scoped lang="less">
.container {
  padding: 15px;
}
</style>
