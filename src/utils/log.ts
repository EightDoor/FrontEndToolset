const log = {
  /**
   * 信息
   * @param title
   * @param val
   */
  i(title, val) {
    console.log(title, JSON.stringify(val))
  },
  /**
   * 成功
   * @param title
   * @param val
   */
  s(title, val) {
    console.log(title, JSON.stringify(val))
  },
}

export { log }
