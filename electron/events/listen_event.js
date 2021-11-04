const { ipcMain, BrowserWindow, BrowserView } = require("electron");
const electronDl = require("electron-dl");

module.exports = (win) => {
  // 下载文件
  ipcMain.handle("download", async (event, arg) => {
    console.log(arg, 'url');
    const win = BrowserWindow.getFocusedWindow();
    const result = await electronDl.download(win, arg);
    console.log(result);
    return JSON.stringify(result);
  })
}
