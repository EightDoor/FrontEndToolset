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
      title: 'go官方文档',
      descriptions: 'go官方文档',
      url: 'https://golang.google.cn/',
    },
    {
      title: 'Golang标准库文档',
      descriptions: 'Golang标准库文档',
      url: 'https://studygolang.com/pkgdoc',
    },
    {
      title: 'Go语言高级编程(Advanced Go Programming)',
      descriptions: 'Go语言高级编程(Advanced Go Programming)',
      url: 'https://chai2010.cn/advanced-go-programming-book/',
    },
    {
      title: 'go Web编程',
      descriptions: 'go Web编程',
      url: 'https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/preface.md',
    },
    {
      title: 'Go 语言学习资料与社区索引',
      descriptions: 'Go 语言学习资料与社区索引',
      url: 'https://github.com/unknwon/go-study-index',
    },
    {
      title: 'Go语言101',
      descriptions: 'Go语言101',
      url: 'https://gfw.go101.org/article/101.html',
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
