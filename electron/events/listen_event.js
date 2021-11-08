const { ipcMain, BrowserWindow, app, dialog } = require("electron");
const electronDl = require("electron-dl");
const Config = require("../config")
const Keyboard = require("./keyboard")
const path = require("path");

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

  // 获取开机是否自动启动应用状态
  ipcMain.handle(Config.channel.POWER_ON_STATUS, async (event, arg) => {
    const obj = app.getLoginItemSettings();
    return obj.openAtLogin;
  })

  // 设置开机启动状态
  ipcMain.handle(Config.channel.POWER_ON_SETTING_STATUS, async (event, arg) => {
    if(arg) {
      app.setLoginItemSettings({
        openAtLogin: arg,
      })
    }
  })

  // 打开webview
  ipcMain.handle(Config.channel.WEBVIEW,  async (event, arg) => {
    const { title, url } = JSON.parse(arg)
    const child = new BrowserWindow({parent: win, modal: true, show: false, webPreferences: {
        preload: path.join(__dirname, 'child_webview.js')
      }})
    // child.setMenuBarVisibility(false)
    child.setTitle(title)
    await child.loadURL(url)
    child.show()
  })
}
