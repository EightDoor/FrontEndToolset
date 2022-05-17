import { ElLoading } from 'element-plus'
import axios from 'axios'
import utils from '.'
import CommVariable from '@/comm_variable/comm_variable.json'
import store from '@/utils/store'
import Constant from '@/utils/constant'
import http from '@/utils/request'
import { log } from '@/utils/log'

export interface RegisterShortcutType {
  value: string
  label: string
  description: string
}

export interface CheckoutVersion {
  // 是否有新版本
  isShowNewVersion?: boolean
  // 版本信息
  version: string
  // 更新内容
  updateContent: string
  // 下载地址
  downloadUrl: string
  // 历史版本列表
  lastList: CheckoutVersion[]
}
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

  /**
   * 检测版本更新
   */
  checkoutVersion(): Promise<CheckoutVersion> {
    return new Promise((resolve, reject) => {
      axios
        .get<CheckoutVersion>('http://vue3.admin.qiniu.start6.cn/update.json')
        .then((res) => {
          const { data } = res
          console.log(data, 'res.data')
          log.i('当前获取的版本更新数据为 -> ', data)
          const version = process.env.npm_package_version
          log.i('当前获取的package.json版本号为 -> ', version)
          const result: CheckoutVersion = {
            version: data.version,
            updateContent: data.updateContent,
            downloadUrl: data.downloadUrl,
            lastList: data.lastList,
            isShowNewVersion: false,
          }
          if (business.compare(data.version, version) === 1) {
            // 有新版本了
            result.isShowNewVersion = true
          }
          resolve(result)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },

  /**
   * 版本比较
   * Return 1 if a > b
   * Return -1 if a < b
   * Return 0 if a == b
   * @param a
   * @param b
   */
  compare(a, b): 1 | -1 | 0 {
    if (a === b)
      return 0

    const aComponents = a.split('.')
    const bComponents = b.split('.')

    const len = Math.min(aComponents.length, bComponents.length)

    // loop while the components are equal
    for (let i = 0; i < len; i += 1) {
      // A bigger than B
      if (parseInt(aComponents[i], 10) > parseInt(bComponents[i], 10))
        return 1

      // B bigger than A
      if (parseInt(aComponents[i], 10) < parseInt(bComponents[i], 10))
        return -1
    }

    // If one's a prefix of the other, the longer one is greater.
    if (aComponents.length > bComponents.length)
      return 1

    if (aComponents.length < bComponents.length)
      return -1

    // Otherwise they are the same.
    return 0
  },
}

export default business
