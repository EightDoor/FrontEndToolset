import { log } from "./log";
const { clipboard } = require("electron")
import { ElMessage } from "element-plus";

const utils = {

  /**
   * format(json,true）;表示压缩json字符串。
   * format(json,false）;表示格式化json字符串。
   * @param txt
   * @param compress
   * @returns
   */
  format: (txt: string, compress: boolean/*是否为压缩模式*/) => {/* 格式化JSON源码(对象转换为JSON文本) */
    const indentChar = ' ';
    if (/^\s*$/.test(txt)) {
      alert();
      log('err', '数据为空,无法格式化! ')
      return txt;
    }
    try { var data = eval('(' + txt + ')'); }
    catch (e: any) {
      log('err', '数据源语法错误,格式化失败! 错误信息: ' + e.description)
      return txt;
    }
    let draw: any[] = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

    var notify = function (name: any, value: any, isLast: any, indent: any/*缩进*/, formObj: any) {
      nodeCount++;/*节点计数*/
      for (var i = 0, tab = ''; i < indent; i++)tab += indentChar;/* 缩进HTML */
      tab = compress ? '' : tab;/*压缩模式忽略缩进*/
      maxDepth = ++indent;/*缩进递增并记录*/
      if (value && value.constructor == Array) {/*处理数组*/
        draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);/*缩进'[' 然后换行*/
        for (var i = 0; i < value.length; i++)
          notify(i, value[i], i == value.length - 1, indent, false);
        draw.push(tab + ']' + (isLast ? line : (',' + line)));/*缩进']'换行,若非尾元素则添加逗号*/
      } else if (value && typeof value == 'object') {/*处理对象*/
        draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);/*缩进'{' 然后换行*/
        var len = 0, i = 0;
        for (var key in value) len++;
        for (var key in value) notify(key, value[key], ++i == len, indent, true);
        draw.push(tab + '}' + (isLast ? line : (',' + line)));/*缩进'}'换行,若非尾元素则添加逗号*/
      } else {
        if (typeof value == 'string') value = '"' + value + '"';
        draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
      }
    };
    const isLast = true, indent = 0;
    notify('', data, isLast, indent, false);
    return draw.join('');
  },


  /**
   * 复制文字到剪切板
   * @param text 内容
   */
  clipText: function (text: string): void {
    if (text) {
      ElMessage.success("内容已经复制到剪切板");
      clipboard.writeText(text);
    } else {
      ElMessage.info("请输入内容");
    }
  },
  openUrl: function(url: string, title?: string): void {
      const strWindowFeatures = `
          menubar=yes,
          toolbar=yes,
          location=yes,
          resizable=yes,
          scrollbars=yes,
          status=yes
      `;
      window.open(url, title, strWindowFeatures)
  }
}

export default utils
