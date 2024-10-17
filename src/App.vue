<template>
  <el-config-provider size="large" :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    return {
      locale: zhCn,
    };
  },
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body,
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: "custom_font";
}
</style>
