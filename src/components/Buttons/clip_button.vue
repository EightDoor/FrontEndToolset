<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ClipButton',
})
</script>

<script setup lang="ts">
// 复制内容到剪切板
const props = defineProps<ClipTextType>()
export interface ClipTextType {
  clipText: () => void
  title?: string
}
function clipText() {
  props.clipText()
}
</script>

<template>
  <el-button
    type="primary"
    size="small"
    style="margin-left: 15px; margin-bottom: 15px"
    @click="clipText"
  >
    {{ props.title ?? '复制' }}
  </el-button>
</template>
