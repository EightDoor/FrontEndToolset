<template>
  <div class="tools">
    <div v-if="watherData">
      <el-descriptions border title="天气情况">
        <el-descriptions-item label="地区" :span="12">{{
          watherData.province
        }}</el-descriptions-item>
        <el-descriptions-item label="发布时间" :span="12">{{
          watherData.reporttime
        }}</el-descriptions-item>
      </el-descriptions>
      <el-card
        class="card"
        v-for="(item, index) in watherData.casts"
        :key="index"
      >
        <template #header>
          <div class="card-header">
            <span v-if="index === 0">今日</span>
            <span v-else>{{ item.date }}</span>
            <span>{{ formatDay(item.week) }}</span>
          </div>
        </template>
        <el-divider content-position="left">白天</el-divider>
        <el-descriptions>
          <el-descriptions-item label="天气">{{
            item.dayweather
          }}</el-descriptions-item>
          <el-descriptions-item label="气温"
            >{{ item.daytemp }} ℃</el-descriptions-item
          >
          <el-descriptions-item label="风向">{{
            item.daywind
          }}</el-descriptions-item>
          <el-descriptions-item label="风力">{{
            item.daypower
          }}</el-descriptions-item>
        </el-descriptions>
        <el-divider content-position="left">晚上</el-divider>
        <el-descriptions>
          <el-descriptions-item label="天气">{{
            item.nightweather
          }}</el-descriptions-item>
          <el-descriptions-item label="气温"
            >{{ item.nighttemp }} ℃</el-descriptions-item
          >
          <el-descriptions-item label="风向">{{
            item.nightwind
          }}</el-descriptions-item>
          <el-descriptions-item label="风力">{{
            item.nightpower
          }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
    <div v-else>个人工具箱</div>

    <el-dialog
      v-model="versionUpdate"
      title="版本升级"
      :center="true"
      width="30%"
      :before-close="handleClose"
    >
      <span>更新内容: {{ versionData?.updateContent }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="versionUpdate = false">取消</el-button>
          <el-button type="primary" @click="updateVersionDownLoad()"
            >更新</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import business, { CheckoutVersion } from '@/utils/business';
import { ForecastType, WeaterType } from '@/types/home';
import { log } from '@/utils/log';

const { shell } = require('electron');

const Home = defineComponent({
  name: 'PagesHome',
  setup() {
    const watherData = ref<Partial<ForecastType>>();
    const versionData = ref<CheckoutVersion | null>(null);

    async function getVersion() {
      versionData.value = await business.checkoutVersion();
      log('version', versionData);
      versionUpdate.value = versionData.value.isShowNewVersion || false;
    }
    onMounted(() => {
      getWeater();
      getVersion();
    });

    async function getWeater() {
      try {
        const city = await business.position();
        const result = await axios.get<WeaterType>(
          'https://restapi.amap.com/v3/weather/weatherInfo',
          {
            params: {
              key: import.meta.env.VITE_GAODE_KEY,
              city,
              extensions: 'all',
            },
          }
        );
        console.log(result.data, 'result');
        if (result.data.status === '1') {
          watherData.value = result.data.forecasts[0];
        } else {
          getWeaterError();
        }
      } catch (e) {
        getWeaterError();
      }
    }

    function getWeaterError() {
      ElMessage.error('获取天气信息失败!');
    }

    function formatDay(val: string) {
      const weekday = new Array(7);
      weekday[1] = '星期一';
      weekday[2] = '星期二';
      weekday[3] = '星期三';
      weekday[4] = '星期四';
      weekday[5] = '星期五';
      weekday[6] = '星期六';
      weekday[7] = '星期日';
      console.log(val);
      console.log(weekday[Number(val)]);
      return weekday[Number(val)];
    }

    const versionUpdate = ref(false);
    function handleClose() {
      versionUpdate.value = false;
    }
    function updateVersionDownLoad() {
      const url = versionData.value?.downloadUrl;
      if (url) {
        shell.openExternal(url);
      } else {
        ElMessage.info({
          message: '不存在下载地址',
        });
      }
    }
    return {
      watherData,
      formatDay,

      versionData,
      handleClose,
      versionUpdate,
      updateVersionDownLoad,
    };
  },
});

export default Home;
</script>
<style scoped lang="less">
.tools {
  font-size: 30px;
  text-align: center;
}
.card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 15px;
  & > span:nth-child(1) {
    font-size: 16px;
    font-weight: bold;
  }
}
.card {
  margin-top: 15px;
}
</style>
