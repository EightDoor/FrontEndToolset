<script lang="ts" setup>
import {
  computed, onMounted, ref, watch,
} from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import http from '@/utils/request'
import { log } from '@/utils/log'
import type { LoginInfo, UserInfo } from '@/types/music/user_info'
import store from '@/utils/store'
import Constant from '@/utils/constant'
import business from '@/utils/business'

const storeV = useStore()
const formRef = ref()
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
}
const formData = ref({
  phone: '',
  password: '',
})
// 登录信息
const info = ref<LoginInfo | null>(null)
// 用户信息
const userInfo = ref<UserInfo | null>(null)

onMounted(() => {
  // 是否存在信息
  store.get(Constant.NETEASE_CLOUD_MUSIC).then(async (res: any) => {
    if (res) {
      await getUserDetailInfo(res.profile.userId)
      info.value = res
    }
  })
})

const infoV = computed(() => storeV.state.userInfo.data)
watch(infoV, (newVal) => {
  info.value = newVal
})

async function getUserDetailInfo(id) {
  const result = await business.getUserInfo(id)
  storeV.commit('userInfo/setData', result.data)
  userInfo.value = result.data
}
function submit() {
  formRef.value.validate((valid) => {
    if (valid) {
      http.get<LoginInfo>('music/login/cellphone', {
        params: formData.value,
      }).then(async (res) => {
        const r = res.data
        if (r.code === 200) {
          log.i('res.data', r)
          await store.set(Constant.NETEASE_CLOUD_MUSIC, r)
          await getUserDetailInfo(r.profile.userId)
          info.value = r
        }
        else {
          ElMessage.error(r.message || '登录错误')
        }
        console.log(r)
      })
    }
  })
}

const loadingLogout = ref(false)
async function signOut() {
  try {
    loadingLogout.value = true
    await http.get('/music/logout')
    loadingLogout.value = false
    info.value = null
    userInfo.value = null
    await store.clear()
    ElMessage.success('退出成功')
  }
  catch (e) {
    loadingLogout.value = false
  }
}
</script>

<template>
  <div v-if="!info" class="person_center">
    <div class="title">
      登录
    </div>
    <el-form ref="formRef" class="person_center_form" :rules="rules" :model="formData" label-width="120px">
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="formData.phone" clearable placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" clearable show-password placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit" @click="submit">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div v-else>
    <ul v-if="userInfo" class="person_center_info">
      <li>
        <span>网易云等级: </span>
        <span>
          {{ userInfo.level }}
        </span>
      </li>
      <li>
        <span>总听歌播放: </span>
        <span>
          {{ userInfo.listenSongs }}
        </span>
      </li>
      <li>
        <span>昵称: </span>
        <span>
          {{ userInfo.profile.nickname }}
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
          {{ userInfo.profile.vipType }}
        </span>
      </li>
      <li>
        <el-button :loading="loadingLogout" type="primary" @click="signOut">
          退出登录
        </el-button>
      </li>
    </ul>
  </div>
</template>

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
