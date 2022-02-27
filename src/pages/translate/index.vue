<template>
  <el-row class="header_title">
    <el-col :span="12">
      <el-select
        class="input_w"
        @change="changeSelect"
        v-model="value"
        placeholder="请选择语言"
      >
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
      <el-button
        type="primary"
        size="small"
        @click="translateFun"
        :loading="data.loading"
        >翻译</el-button
      >
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <!-- <el-input
        type="textarea"
        :autosize="{ minRows: 10 }"
        :rows="10"
        placeholder="请输入翻译内容"
        v-model="data.entryText"
      /> -->
      <div
        ref="contentImgRef"
        @keyup="changeEvenet"
        contenteditable="true"
        class="imageContent"
      ></div>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="12" class="right_content">
      <template v-if="data.resultText.length === 0"
        >请在左侧输入翻译内容</template
      >
      <template v-else>
        <div class="right_content__title">翻译结果为:</div>
        <ul v-for="(item, index) in data.resultText" :key="index">
          <li class="right_content__title__li">
            <span v-if="data.resultText.length > 1"
              >值: ({{ index + 1 }}):</span
            >
            {{ item.dst }}
          </li>
        </ul>
      </template>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import MD5 from 'md5';
import { ArrowRightBold } from '@element-plus/icons';
import {
  useRoute,
  onBeforeRouteUpdate,
  RouteLocationNormalized,
  NavigationGuardNext,
} from 'vue-router';
import * as qiniu from 'qiniu-js';
import dayjs from 'dayjs';
import { log } from '@/utils/log';
import { TranslateType } from './index.type';
import Config from '@/config/index';

const data = reactive<TranslateType.Data>({
  entryText: '',
  resultText: [],
  loading: false,
});
const value = ref('en');
const outputValue = ref('zh');
const options = ref<
  {
    value: string;
    label: string;
  }[]
>([
  {
    value: 'zh',
    label: '中文',
  },
  {
    value: 'en',
    label: '英文',
  },
]);

function translateFun() {
  if (showTransitionImg.value) {
    // 存在图片，直接翻译图片
    uploadImg(showTransitionImg.value);
    return;
  }
  data.resultText = [];
  data.loading = true;
  const appid = import.meta.env.VITE_APP_ID;
  const key = import.meta.env.VITE_APP_KEY;
  const salt = new Date().getTime();
  const query = data.entryText;
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = value.value;
  const to = outputValue.value;
  const str1 = appid + query + salt + key;
  const sign = MD5(str1);
  log('appid', appid);
  log('key', key);
  axios
    .get('http://api.fanyi.baidu.com/api/trans/vip/translate', {
      params: {
        q: query,
        appid,
        salt,
        from,
        to,
        sign,
      },
    })
    .then((res) => {
      console.log(res);
      data.loading = false;
      if (res.data.error_code) {
        ElMessage.error(`翻译失败: ${res.data.error_cod}`);
      } else {
        data.resultText = res.data.trans_result;
      }
    })
    .catch((err) => {
      data.loading = false;
      ElMessage.error(`翻译失败: ${JSON.stringify(err)}`);
    });
}
const route = useRoute();

onMounted(() => {
  const title = route.query.title as string;
  if (title) {
    data.entryText = title;
    translateFun();
  }
});

onBeforeRouteUpdate(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.query.title) {
      data.entryText = to.query.title as string;
      translateFun();
    }
    next();
  }
);

function changeSelect(val) {
  if (val === 'zh') {
    outputValue.value = 'en';
  } else {
    outputValue.value = 'zh';
  }
}

// 翻译的图片
const showTransitionImg = ref('');
const contentImgRef = ref(null);

// 翻译图片显示
function changeEvenet(v) {
  const text = v.target.innerText;
  data.entryText = text;
  let imgUrl = '';
  if (text) {
    showTransitionImg.value = '';
  }
  v.target.childNodes.forEach(async (item) => {
    if (item.nodeName === 'IMG') {
      imgUrl = item.currentSrc;
      showTransitionImg.value = imgUrl;
    }
  });
}

async function uploadImg(imgUrl: string) {
  const result = await axios.get(`${Config.backUrl}baidu_img/token`);
  if (result.data.code === 0) {
    const token = result.data.data;
    const blob: any = dataURItoBlob(imgUrl);
    const name = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const observable = qiniu.upload(
      blob,
      name,
      token,
      {},
      {
        useCdnDomain: true,
        region: 'z1',
      }
    );
    // 上传开始
    const observer = {
      next(res) {
        console.log(res, '上传中...');
      },
      error(err) {
        console.log(err, '上传失败');
        ElMessage.error('图片上传失败');
      },
      complete(res) {
        const uploadImg = Config.qiuniuLoadUrl + res.key;
        ElMessage.success('图片上传成功');
        translationImageContent(uploadImg);
      },
    };
    observable.subscribe(observer);
  }
}
function translationImageContent(url: string) {
  axios
    .get(
      `${Config.backUrl}baidu_img/img?url=${encodeURI(url)}&from=${
        value.value
      }&to=${outputValue.value}`
    )
    .then((res) => {
      console.log(
        '🚀 ~ file: index.vue ~ line 236 ~ axios.get ~ res',
        res.data
      );
      const result = res.data.data.data.sumDst;
      const src = res.data.data.data.sumSrc;

      data.resultText = [
        {
          dst: result,
          src,
        },
      ];
      console.log(data.resultText);

      ElMessage.success('翻译成功');
    })
    .catch(() => {
      ElMessage.error('翻译失败');
    });
}

/**
 * base64  to blob二进制
 */
function dataURItoBlob(dataURI) {
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
  const byteString = atob(dataURI.split(',')[1]); // base64 解码
  const arrayBuffer = new ArrayBuffer(byteString.length); // 创建缓冲数组
  const intArray = new Uint8Array(arrayBuffer); // 创建视图

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
}
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
.imageContent {
  height: 200px;
  border: 1px solid #cccccc;
  overflow-x: scroll;
  padding: 15px;
}
</style>
