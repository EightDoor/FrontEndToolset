<template>
  <webview id="wb" src="https://github.com/EightDoor/FrontEndToolset" />
</template>
<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({ name: "Github" })
</script>
<script setup lang="ts">

</script>
<style scoped lang="less">
#wb {
  height: 100%;
  width: 100%;
}
</style>
