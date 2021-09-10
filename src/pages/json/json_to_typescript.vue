<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <JsonCode :changeText="changeText">
        <template #title>
          <el-link type="primary" style="font-size: 25px;" disabled>请输入json</el-link>
          <el-input v-model="tsName" placeholder="请输入根节点名称"></el-input>
        </template>
      </JsonCode>
    </el-col>
    <el-col :span="12">
      <JsonCode :content="content" mode="text/typescript">
        <template #title>
          <el-link type="success" style="font-size: 25px;" disabled>转换的typescript</el-link>
        </template>
      </JsonCode>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import JsonCode from '@/components/JsonCode/index.vue';
import { log } from '@/utils/log';
import JsonToTs from 'json-to-ts';
import { ref, watch } from 'vue';
import { cloneDeep } from 'lodash';

const content = ref("");
const tsName = ref("")
const sourceData = ref('')


function CoverToTs(val: string, name?: string) {
  try {
    const result = JSON.parse(val);
    return JsonToTs(result, { rootName: name ?? "RootObj" })
  } catch (err) {
    log('err', err)
  }

}

function changeText(val: any) {
  sourceData.value = cloneDeep(val);
  tsGen(val);
}
function tsGen(val: string, name?: string) {
  if (CoverToTs(val, name)) {
    content.value = CoverToTs(val, name)?.join("\n") ?? "";
  }
}

watch(tsName, (newVal) => {
  log("文件名称变化", newVal)
  tsName.value = newVal;
  tsGen(sourceData.value, tsName.value)
}, {
  immediate: true,
  deep: true
})
</script>