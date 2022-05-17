import { ElLoading, ElMessage } from 'element-plus'
import { log } from './log'
import CommVariable from '@/comm_variable/comm_variable.json'

const utils = {
  /**
   * format(json,true）;表示压缩json字符串。
   * format(json,false）;表示格式化json字符串。
   * @param txt
   * @param compress
   * @returns
   */
  format: (txt: string, compress: boolean /* 是否为压缩模式 */) => {
    /* 格式化JSON源码(对象转换为JSON文本) */
    const indentChar = ' '
    if (/^\s*$/.test(txt)) {
      log('err', '数据为空,无法格式化! ')
      return txt
    }
    try {
      var data = eval(`(${txt})`)
    }
    catch (e: any) {
      log('err', `数据源语法错误,格式化失败! 错误信息: ${e.description}`)
      return txt
    }
    const draw: any[] = []
    const last = false
    const This = this
    const line = compress ? '' : '\n'
    let nodeCount = 0
    let maxDepth = 0

    var notify = function (
      name: any,
      value: any,
      isLast: any,
      indent: any /* 缩进 */,
      formObj: any,
    ) {
      nodeCount++ /* 节点计数 */
      for (var i = 0, tab = ''; i < indent; i++)
        tab += indentChar /* 缩进HTML */
      tab = compress ? '' : tab /* 压缩模式忽略缩进 */
      maxDepth = ++indent /* 缩进递增并记录 */
      if (value && value.constructor == Array) {
        /* 处理数组 */
        draw.push(
          `${tab + (formObj ? `"${name}":` : '')}[${line}`,
        ) /* 缩进'[' 然后换行 */
        for (var i = 0; i < value.length; i++)
          notify(i, value[i], i == value.length - 1, indent, false)

        draw.push(
          `${tab}]${isLast ? line : `,${line}`}`,
        ) /* 缩进']'换行,若非尾元素则添加逗号 */
      }
      else if (value && typeof value === 'object') {
        /* 处理对象 */
        draw.push(
          `${tab + (formObj ? `"${name}":` : '')}{${line}`,
        ) /* 缩进'{' 然后换行 */
        let len = 0
        var i = 0
        for (var key in value) len++
        for (var key in value)
          notify(key, value[key], ++i == len, indent, true)
        draw.push(
          `${tab}}${isLast ? line : `,${line}`}`,
        ) /* 缩进'}'换行,若非尾元素则添加逗号 */
      }
      else {
        if (typeof value === 'string')
          value = `"${value}"`
        draw.push(
          tab
            + (formObj ? `"${name}":` : '')
            + value
            + (isLast ? '' : ',')
            + line,
        )
      }
    }
    const isLast = true
    const indent = 0
    notify('', data, isLast, indent, false)
    return draw.join('')
  },

  /**
   * 复制文字到剪切板
   * @param text 内容
   */
  clipText(text: string): void {
    if (text) {
      ElMessage.success('内容已经复制到剪切板')
      if (utils.isElectron()) {
        const { clipboard } = require('electron')
        clipboard.writeText(text)
      }
    }
    else {
      ElMessage.info('请输入内容')
    }
  },
  async openUrl(url: string, title?: string) {
    const loading = ElLoading.service({
      lock: true,
      text: `${title ?? '网页'} 打开中...`,
    })
    // 超时5秒关闭
    setTimeout(() => {
      loading.close()
    }, 5000)

    if (utils.isElectron()) {
      const { ipcRenderer } = require('electron')
      await ipcRenderer.invoke(
        CommVariable.channel.WEBVIEW,
        JSON.stringify({
          url,
          title,
        }),
      )
    }

    loading.close()
  },

  /**
   * 是否是electron
   * @returns
   */
  isElectron() {
    return window === undefined
  },
}

export default utils
