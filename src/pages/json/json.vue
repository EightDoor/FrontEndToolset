<template>
  <Buttons :list="list" :click="change" />
  <JsonCode />
</template>

<script setup lang="ts">
import JsonCode from '@/components/JsonCode/index.vue';
import Buttons, { ButtonsListType } from '@/components/Buttons/index.vue';
import { ref } from '_vue@3.2.11@vue';

const list = ref<ButtonsListType[]>([
  {
    title: '压缩',
    size: 'small',
  },
  {
    title: '下载',
    size: 'small',
  },
])

function change(val: string) {
  switch (val) {
    case "压缩":
      break;
    case "下载":
      break;
  }
}

</script>