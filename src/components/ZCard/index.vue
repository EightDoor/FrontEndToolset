<template>
  <div v-for="(item, index) in data" :key="index">
    <el-divider
      v-if="item.title !== 'none'"
      class="divider_container"
      content-position="left"
    >
      <div class="divider_font">
        {{ item.title }}
      </div>
    </el-divider>
    <div class="ul_card">
      <ul v-for="(v, vIndex) in item.list" :key="vIndex">
        <li @click="changeCard(v)">
          <div class="container_card">
            <el-card shadow="always">
              {{ v.title }}
            </el-card>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ListType } from "@/types/com";
import utils from "@/utils";
import { isArray } from "lodash-es";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

interface GroupList {
  title: String;
  list: ListType[];
}
const props = defineProps<{
  list: ListType[];
}>();

const data = ref<GroupList[]>([]);
const router = useRouter();
function changeCard(item) {
  if (item.url) utils.openUrl(item.url, item.title);
  else if (item.router) router.push(item.router);
}
watch(
  () => props.list,
  (newVal) => {
    if (isArray(newVal)) {
      // 分组
      const list: GroupList[] = [];
      newVal.forEach((item) => {
        if (item.type) {
          const isTypeIndex = list.findIndex((v) => v.title === item.type);
          if (isTypeIndex !== -1) {
            list[isTypeIndex].list.push(item);
          } else {
            list.push({
              title: item.type,
              list: [item],
            });
          }
        } else {
          const isNoneIndex = list.findIndex((v) => v.title === "none");
          if (isNoneIndex !== -1) {
            list[isNoneIndex].list.push(item);
          } else {
            list.push({
              title: "none",
              list: [item],
            });
          }
        }
      });
      data.value = list;
      console.log(data, "data");
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
</script>

<style lang="less" scoped>
.container_card {
  &:hover {
    cursor: pointer;
    transform: translate(0, -10px);
  }
}
.ul_card {
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;

  li {
    margin-right: 50px;
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
  }
}
.divider_container {
  margin-bottom: 40px;
}
.divider_font {
  font-size: 30px;
}
</style>
