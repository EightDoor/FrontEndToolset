const { ipcMain, BrowserWindow } = require("electron");
const electronDl = require("electron-dl");
const Config = require("../config")
const Keyboard = require("./keyboard")

module.exports = (win) => {
  // 下载文件
  ipcMain.handle(Config.channel.DOWNLOAD_FILE, async (event, arg) => {
    console.log(arg, 'url');
    const win = BrowserWindow.getFocusedWindow();
    const result = await electronDl.download(win, arg);
    console.log(result);
    return JSON.stringify(result);
  })

  // 注册键盘快捷方式
  ipcMain.handle(Config.channel.REGISTER_SHORTCUT, async (event, arg)=>{
    try {
      const list = JSON.parse(arg);
      if(list && list.length > 0) {
        Keyboard(win, list);
      }
    } catch (e) {
      console.error(e, '注册键盘快捷方式失败');
    }
  })
}
