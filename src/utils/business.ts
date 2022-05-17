import { ElLoading } from 'element-plus'
import store from '@/utils/store'
import Constant from '@/utils/constant'
import http from '@/utils/request'

const business = {
  /**
   * 获取用户信息
   * @param uid
   */
  getUserInfo(uid: string) {
    return http.get('music/user/detail', {
      params: {
        uid,
      },
    })
  },
  /**
   * 显示加载中
   * @param text
   * @returns
   */
  showLoading(text?: string) {
    const loadingInstance = ElLoading.service({
      text: text ?? '加载中...',
    })
    setTimeout(() => {
      if (loadingInstance)
        loadingInstance.close()
    }, 5000)
    return loadingInstance
  },
  /**
   * 关闭loading弹框
   * @param instant
   */
  hideLoading(instant: any) {
    if (instant)
      instant.close()
  },
  /**
   * 获取本地登录存储的cookie 登录鉴权需要
   */
  async getCookie(url) {
    const data: any = await store.get(Constant.NETEASE_CLOUD_MUSIC)
    if (data)
      return `${url}?cookie=${data.cookie}&timestamp=${Date.now()}`

    return url
  },
}

export default business
