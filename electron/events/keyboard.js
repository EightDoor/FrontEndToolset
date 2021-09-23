const { globalShortcut, clipboard } = require('electron');
const { log } = require('util');

// 监听全局键盘快捷键
module.exports = (win) => {

  // 百度翻译
  const ret = globalShortcut.register('Alt+T', () => {
    // 剪切板内容
    const text = clipboard.readText();
    console.log(text, 'clipboard内容')
    win.webContents.send("BaiduTranslate", text)
  })
  if (!ret) {
    log("快捷键注册失败")
  }
}