<template>
  <ul class="daily_muse_see">
    <li v-for="(item, index) in list" :key="index">
      <el-card>
        <template #header>
          <div class="header">
            {{ item.title }}
            <el-button
              class="btn"
              type="primary"
              size="small"
              @click="changeCard(item)"
            >
              访问
            </el-button>
          </div>
        </template>
        <div class="content">
          {{ item.descriptions }}
        </div>
      </el-card>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import utils from '@/utils'

interface ListType {
  title: string
  url?: string
  descriptions: string
  router?: string
}
const list = ref<ListType[]>([])

onMounted(() => {
  getList()
})

function getList() {
  list.value = [
    {
      title: 'TC39标准',
      descriptions: 'javascript',
      url: 'https://tc39.es/zh-Hans/',
    },
    {
      title: 'javascript在线编辑',
      descriptions: 'javascript',
      url: 'http://jsbin.com/?html,js,output',
    },
    {
      title: '在线编辑代码codesandbox',
      descriptions: '在线编辑代码codesandbox',
      url: 'https://codesandbox.io/',
    },
    {
      title: 'json Editor',
      descriptions: 'json',
      url: 'http://jsoneditoronline.org/#left=local.kadozu&right=local.gekegi',
    },
    {
      title: 'MDN Web',
      descriptions: 'Web',
      url: 'https://developer.mozilla.org/zh-CN/',
    },
  ]
}

const router = useRouter()
function changeCard(item) {
  if (item.url)
    utils.openUrl(item.url, item.title)
  else if (item.router)
    router.push(item.router)
}
</script>

<style scoped lang="less">
.daily_muse_see {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  & > li {
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
  align-items: center;
}
.btn {
  &:hover {
    cursor: pointer;
  }
}
</style>
