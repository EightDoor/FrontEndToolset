<template>
  <ul class="daily_muse_see">
    <li v-for="(item, index) in list" :key="index">
      <el-card >
        <template #header>
          <div class="header">
            {{item.title}}
            <el-button class="btn" type="primary" size="mini" @click="changeCard(item)">访问</el-button>
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
import { useRouter } from 'vue-router';

interface ListType {
  title: string;
  url?: string;
  descriptions: string;
  router?: string;
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
      title: 'CNode',
      descriptions: 'CNode',
      url: 'https://cnodejs.org/?tab=good'
    },
    {
      title: '今日头条',
      descriptions: '今日头条',
      router: "/today_headlines",
    },
    {
      title: '开源中国',
      descriptions: '开源中国',
      url: 'https://www.oschina.net/'
    },
  ]
}

const router = useRouter();
function changeCard(item) {
  if(item.url) {
    utils.openUrl(item.url, item.title)
  }else if(item.router) {
    router.push(item.router)
  }
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
.btn {
  &:hover {
    cursor: pointer;
  }
}
</style>
