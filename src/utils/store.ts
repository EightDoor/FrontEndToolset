import {
  clear, getItem, removeItem, setItem,
} from 'localforage'

const store = {
  /**
   * 读取
   * @param key
   */
  get: (key: string) => getItem(key),
  /**
   * 存储
   * @param key
   * @param data
   */
  set: (key: string, data: any) => setItem(key, data),
  /**
   * 移除某一项
   * @param key
   */
  removeItem: (key: string) => removeItem(key),
  /**
   * 清空
   */
  clear: () => clear(),
}

export default store
