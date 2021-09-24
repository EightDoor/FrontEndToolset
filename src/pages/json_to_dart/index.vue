<template>
  <webview id="wb" src="https://javiercbk.github.io/json_to_dart/" />
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({ name: "JsonToDart" })
</script>
<script setup lang="ts">

</script>
<style scoped lang="less">
#wb {
  height: 100%;
  width: 100%;
}
</style>
