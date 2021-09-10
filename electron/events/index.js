const { BrowserWindow, ipcMain } = require("electron")
const electronDl = require('electron-dl');



// 初始化
const init = () => {
  console.log('监听init初始化------------------->');

  ipcMain.handleOnce("download", async (event, arg) => {
    console.log(arg, 'url');
    const win = BrowserWindow.getFocusedWindow();
    const result = await electronDl.download(win, arg);
    console.log(result);
    return JSON.stringify(result);
  })
}


module.exports = { init }