<template>
  <div>
    <ul class="ul">
      <li
        @click="currentIndex = index"
        v-for="(item, index) of data"
        :key="index"
      >
        {{ item.name }}
      </li>
    </ul>
    <el-divider border-style="dashed" />
    <ZCard :list="bookmarks" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import data from "./data";

const currentIndex = ref(0);

const bookmarks = computed(() => {
  return data[currentIndex.value].list;
});
</script>

<style lang="scss" scoped>
.ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 20px;
  li {
    margin-top: 10px;
    font-size: 20px;
    padding: 10px;
    border-radius: 4px;
    background: white;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
