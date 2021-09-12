<template>
  <Buttons :focus="true" :list="list" :click="change" :loading="loading">
    <ClipButton :clipText="clipText" title="复制内容" />
  </Buttons>
  <JsonCode :changeText="changeText" :content="content" />
</template>

<script setup lang="ts">
import JsonCode from '@/components/JsonCode/index.vue';
import Buttons, { ButtonsListType } from '@/components/Buttons/index.vue';
import { ref } from 'vue';
import utils from '@/utils';
import ClipButton from '@/components/Buttons/clip_button.vue';


const loading = ref(false)

const list = ref<ButtonsListType[]>([
  {
    title: '压缩',
    size: 'small',
  },
  {
    title: '格式化',
    size: 'small',
  }
])
const content = ref<any>(null)
const defaultJson = ref<any>(null)

function clipText() {
  utils.clipText(defaultJson.value)
}

function change(val: string) {
  switch (val) {
    case "压缩":
      content.value = utils.format(defaultJson.value, true);
      break;
    case "格式化":
      content.value = utils.format(defaultJson.value ?? content.value, false);
      break
  }
}

function changeText(val: any) {
  defaultJson.value = val;
}


</script>