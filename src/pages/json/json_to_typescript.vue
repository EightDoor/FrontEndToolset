<template>
  <el-row :gutter="20">
    <el-col :span="12">
      <JsonCode :changeText="changeText" :content="defaultSource.value">
        <template #title>
          <div>
            <el-link type="primary" style="font-size: 25px;" disabled>请输入根节点名称</el-link>
            <el-input class="inputW" v-model="tsName" placeholder="请输入根节点名称"></el-input>
          </div>
          <Buttons :list="buttonList" :click="changeButton" />
        </template>
      </JsonCode>
    </el-col>
    <el-col :span="12">
      <JsonCode :content="content.value" mode="text/typescript" :readOnly="true">
        <template #title>
          <el-link type="success" style="font-size: 25px;" disabled>转换的typescript</el-link>
          <Clip_button :clipText="clipText" title="复制内容" />
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
import Clip_button from '@/components/Buttons/clip_button.vue';
import utils from '@/utils';
import Buttons, { ButtonsListType } from '@/components/Buttons/index.vue';

const content = ref("");
const tsName = ref("")
const sourceData = ref('')
const defaultSource = ref("")


function CoverToTs(val: string, name?: string) {
  try {
    const result = JSON.parse(val);
    return JsonToTs(result, { rootName: name ?? "RootObj" })
  } catch (err) {
    log('err', err)
  }

}

// button
const buttonList: ButtonsListType[] = [
  {
    title: '格式化',
    size: 'small',
  },
];
function formatText() {
  defaultSource.value = utils.format(sourceData.value, false);
}
function changeButton(val: string) {
  if (val === '格式化') {
    formatText();
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

function clipText() {
  utils.clipText(content.value)
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
<style scoped lang="less">
.inputW {
  width: 150px;
  margin-left: 15px;
}
</style>
