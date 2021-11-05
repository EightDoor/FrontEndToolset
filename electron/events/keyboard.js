const { globalShortcut } = require('electron');
const Config = require('../config')

// 监听全局键盘快捷键
module.exports = (win, list) => {
  // 键盘快捷键
 list.forEach((item)=>{
   const ret = globalShortcut.register(item.value, () => {
     win.webContents.send(Config.channel.SHORTCUT, item.label)
     winShow(win);
   })
   if (!ret) {
     console.log("快捷键注册失败")
   }
 })
  // 显示主窗口
  function winShow (win) {
    // 判断是否存在聚焦窗口
    win.show()
  }
}
