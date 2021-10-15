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

  // 打开新页面
  ipcMain.handle("openWeb", async (event, arg) => {
    const { url, width, height } = arg;
    const child = new BrowserWindow({ parent: win, modal: true, show: false, width: width ?? 300, height: height ?? 300 });
    child.loadURL(url);
    child.once('ready-to-show', () => {
      child.show()
    })
  })
}
