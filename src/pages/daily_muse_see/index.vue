<template>
  <ul class="daily_muse_see">
    <li v-for="(item, index) in list" :key="index">
      <el-card >
        <template #header>
          <div class="header">
            {{item.title}}
            <el-button type="primary" size="mini" @click="changeCard(item)">访问</el-button>
          </div>
        </template>
        <div class="content">
          {{item.descriptions}}
        </div>
      </el-card>
    </li>
  </ul>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import utils from '@/utils';

interface ListType {
  title: string;
  url: string;
  descriptions: string;
}
const list = ref<ListType[]>([]);

onMounted(()=>{
  getList()
})

function getList() {
  list.value = [
    {
      title: '个人h5',
      descriptions: '根据开放api归类',
      url: 'http://personal.start6.cn/'
    },
    {
      title: '开源中国',
      descriptions: '开源中国',
      url: 'https://www.oschina.net/'
    },
  ]
}

function changeCard(item) {
  utils.openUrl(item.url, item.title)
}
</script>
<style scoped lang="less">
.daily_muse_see {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  &>li {
    width: 300px;
    margin-right: 15px;
    margin-bottom: 15px;
    &:hover {
      cursor: pointer;
    }
  }
}
.content {
  font-size: 14px;
  color: #afaeae;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center
}
</style>
