const { globalShortcut, clipboard } = require('electron');

// 监听全局键盘快捷键
module.exports = (win) => {

  // 百度翻译
  const ret = globalShortcut.register('Alt+T', () => {
    // 剪切板内容
    const text = clipboard.readText();
    console.log(text, 'clipboard内容')
    win.webContents.send("BaiduTranslate", text)
    winShow(win);
  })
  if (!ret) {
    console.log("快捷键注册失败")
  }

  // 显示主窗口
  function winShow (win) {
    // 判断是否存在聚焦窗口
    win.show()
  }
}