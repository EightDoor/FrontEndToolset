<template>
    <div class="person_center" v-if="!info">
      <div class="title">
        登录
      </div>
      <el-form class="person_center_form" ref="formRef" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="手机号码" prop="phone">
          <el-input clearable v-model="formData.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input clearable v-model="formData.password" show-password placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" class="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  <div v-else>
    <ul class="person_center_info">
      <li>
        <span>网易云等级: </span>
        <span>
          {{userInfo.level}}
        </span>
      </li>
      <li>
        <span>总听歌播放: </span>
        <span>
          {{userInfo.listenSongs}}
        </span>
      </li>
      <li>
        <span>昵称: </span>
        <span>
          {{userInfo.profile.nickname}}
        </span>
      </li>
      <li>
        <span>头像: </span>
        <span>
          <img :src="userInfo.profile.avatarUrl" alt="">
        </span>
      </li>
      <li>
        <span>vip等级: </span>
        <span style="color: red">
          {{userInfo.profile.vipType}}
        </span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import http from '@/utils/request';
import { log } from '@/utils/log';
import { LoginInfo, UserInfo } from '@/types/music/user_info';
import store from '@/utils/store';
import Constant from '@/utils/constant';
import business from '@/utils/business';

const storeV = useStore();
const formRef = ref();
const rules = {
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
};
const formData = ref({
  phone: '',
  password: '',
});
// 登录信息
const info = ref<LoginInfo | null>(null);
// 用户信息
const userInfo = ref<UserInfo | null>(null);

onMounted(() => {
  // 是否存在信息
  store.get(Constant.NETEASE_CLOUD_MUSIC).then(async (res) => {
    if (res) {
      await getUserDetailInfo(res.profile.userId);
      info.value = res;
    }
  });
});

async function getUserDetailInfo(id) {
  const result = await business.getUserInfo(id);
  storeV.commit('userInfo/setData', result.data);
  userInfo.value = result.data;
}
function submit() {
  formRef.value.validate((valid) => {
    if (valid) {
      http.get<LoginInfo>('music/login/cellphone', {
        params: formData.value,
      }).then(async (res) => {
        const r = res.data;
        if (r.code === 200) {
          log('res.data', r);
          await store.set(Constant.NETEASE_CLOUD_MUSIC, r);
          await getUserDetailInfo(r.profile.userId);
          info.value = r;
        } else {
          ElMessage.error(r.message || '登录错误');
        }
        console.log(r);
      });
    }
  });
}

</script>
<style lang="less" scoped>
.person_center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .person_center_form {
    width: 500px;
  }
  .title {
    font-size: 30px;
    margin-bottom: 15px;
  }
  .submit {
    width: 150px;
    margin-left: 80px;
  }
}
.person_center_info {
  li {
    margin-bottom: 15px;
  }
  span:nth-child(1) {
    display: inline-block;
    margin-right: 10px;
  }
  span:nth-child(2) {
    font-size: 25px;
  }
  img {
    width: 300px;
    height: 300px;
    border-radius: 10px;
  }
}
</style>
