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
      title: 'spring initializr',
      descriptions: 'spring-boot 项目初始化',
      url: 'https://start.springboot.io/',
    },
    {
      title: 'mybatis',
      descriptions: 'mybatis 中文网站',
      url: 'https://mybatis.net.cn/',
    },
    {
      title: 'mybatis-plus',
      descriptions: 'mybatis-plus',
      url: 'https://www.mybatis-plus.com/',
    },
    {
      title: 'mvn',
      descriptions: 'mvn 仓库',
      url: 'https://mvnrepository.com/',
    },
    {
      title: 'openjdk',
      descriptions: 'openjdk',
      url: 'https://openjdk.org/',
    },
    {
      title: 'hutool',
      descriptions: 'hutool 工具库',
      url: 'https://hutool.cn/',
    },
    {
      title: 'Java学习+面试指南',
      descriptions: '一份涵盖大部分 Java 程序员所需要掌握的核心知识。准备 Java 面试，首选 JavaGuide！',
      url: 'https://github.com/Snailclimb/JavaGuide',
    },
    {
      title: 'Java教程',
      descriptions: '廖雪峰java教程',
      url: 'https://www.liaoxuefeng.com/wiki/1252599548343744',
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
