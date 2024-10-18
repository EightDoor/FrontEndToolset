<template>
  <div>
    <ul class="ul sticky">
      <li
        :class="[currentIndex === index ? 'active-li' : '']"
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

  background: white;
  height: 50px;
  li {
    min-width: 100px;
    margin-top: 10px;
    font-size: 20px;
    padding: 10px;
    border-radius: 4px;
    background: white;
    &:hover {
      cursor: pointer;
    }
  }
  .active-li {
    border: 1px dashed #ccc;
    text-align: center;
  }
}

.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0; /* 设置元素距离顶部的位置 */
}
</style>
