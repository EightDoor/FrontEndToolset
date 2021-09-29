<template>
  <el-row class="header_title">
    <el-col :span="12">
      <el-select class="input_w" v-model="value" placeholder="请选择语言">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-icon class="icon">
        <ArrowRightBold />
      </el-icon>
      <el-select class="input_w" v-model="outputValue" placeholder="请选择语言">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="12">
      <el-button type="primary" size="small" @click="translateFun" :loading="data.loading">翻译</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-input
        type="textarea"
        :autosize="{ minRows: 10 }"
        :rows="10"
        placeholder="请输入翻译内容"
        v-model="data.entryText"
      />
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="12" class="right_content">
      <template v-if="data.resultText.length === 0">请在左侧输入翻译内容</template>
      <template v-else>
        <div class="right_content__title">翻译结果为:</div>
        <ul v-for="(item, index) in data.resultText" :key="index">
          <li class="right_content__title__li">
            <span v-if="data.resultText.length > 1">值: ({{ index + 1 }}):</span>
            {{ item.dst }}
          </li>
        </ul>
      </template>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({ name: "Translate" })
</script>
<script setup lang="ts">
import { log } from "@/utils/log";
import { ElMessage } from "element-plus";
import { reactive, ref, onMounted, } from "vue";
import axios from 'axios';
import MD5 from 'md5';
import { TranslateType } from "./index.type";
import { ArrowRightBold } from '@element-plus/icons'
import { useRoute, onBeforeRouteUpdate, NavigationGuard, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';


const data = reactive<TranslateType.Data>({
  entryText: "",
  resultText: [],
  loading: false,
})
const value = ref("en")
const outputValue = ref("zh")
const options = ref<{
  value: string;
  label: string;
}[]>([
  {
    value: 'zh',
    label: '中文',
  },
  {
    value: 'en',
    label: '英文',
  }
])


function translateFun() {
  data.loading = true;
  const appid = import.meta.env.VITE_APP_ID;
  const key = import.meta.env.VITE_APP_KEY;
  const salt = (new Date).getTime();
  const query = data.entryText;
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = value.value;
  const to = outputValue.value;
  const str1 = appid + query + salt + key;
  const sign = MD5(str1);
  log("appid", appid)
  log("key", key)
  axios.get("http://api.fanyi.baidu.com/api/trans/vip/translate", {
    params: {
      q: query,
      appid: appid,
      salt: salt,
      from: from,
      to: to,
      sign: sign
    }
  }).then(res => {
    console.log(res);
    data.loading = false;
    if (res.data.error_code) {
      ElMessage.error("翻译失败: " + res.data.error_cod)
    } else {
      data.resultText = res.data.trans_result;
    }
  }).catch(err => {
    data.loading = false;
    ElMessage.error("翻译失败: " + JSON.stringify(err))
  })
}
const route = useRoute()

onMounted(() => {
  const title = route.query.title as string;
  if (title) {
    data.entryText = title;
    translateFun();
  }
})

onBeforeRouteUpdate((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (to.query.title) {
    data.entryText = to.query.title as string;
    translateFun();
  }
  next();
})

</script>
<style scoped lang="less">
.header_title {
  margin-bottom: 15px;
}
.right_content {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  &__title {
    margin-bottom: 10px;
    &__li {
      color: red;
    }
  }
}
.icon {
  margin: 0 15px;
}
.input_w {
  width: 150px;
}
</style>
