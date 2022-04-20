<template>
  <go-home path="/daily_muse_see">
    <el-row :gutter="10">
      <el-col v-for="(o, index) in data" :key="o.rid" :span="8" class="space">
        <el-card :body-style="{ padding: '0px' }">
          <template #header>
            <div class="card-header">
              <span>来源: {{ o.source }}</span>
              <el-button
                type="text"
                class="button"
                @click="open(o.article_url, o.title)"
                >打开</el-button
              >
            </div>
          </template>
          <div style="padding: 14px">
            <span class="title">{{ o.title }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </go-home>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import GoHome from '@/components/GoHome/index.vue';
import { ListType } from '@/pages/daily_muse_see/daily_muse_see.interface';
import utils from '@/utils';

const data = ref<ListType[]>([]);
onMounted(() => {
  getList();
});

function getList() {
  // 今日头条
  axios.get('http://is.snssdk.com/api/news/feed/v51/').then((res) => {
    const result: any[] = res.data.data;
    const list: ListType[] = [];
    result.map((item) => {
      const v = JSON.parse(item.content);
      list.push(v);
    });
    data.value = list;
  });
}

function open(val: string, title: string) {
  utils.openUrl(val, title);
}
</script>
<style scoped lang="less">
.card-header {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
.space {
  margin-bottom: 15px;
}
.title {
  font-size: 20px;
  color: #67c23a;
}
</style>
