import {getItem, setItem, removeItem, clear} from 'localforage';

const store = {
  /**
   * 读取
   * @param key
   */
  get: (key: string) => {
    return getItem(key)
  },
  /**
   * 存储
   * @param key
   * @param data
   */
  set: (key: string, data: any) => {
    return setItem(key, data)
  },
  /**
   * 移除某一项
   * @param key
   */
  removeItem: (key: string) => {
    return removeItem(key)
  },
  /**
   * 清空
   */
  clear: () => {
    return clear()
  }
}

export default store
