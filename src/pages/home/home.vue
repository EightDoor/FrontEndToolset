<template>
  <div class="tools">个人工具箱</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';

const Home = defineComponent({
  name: 'home',
  setup() {
    onMounted(() => {
    });
  },
});

export default Home;
</script>
<style scoped lang="less">
.tools {
  font-size: 30px;
  text-align: center;
  margin-top: 20%;
}
</style>
