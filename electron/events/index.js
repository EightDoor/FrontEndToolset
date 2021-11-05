const { ipcMain } = require("electron")
const { autoUpdater } = require("electron-updater")
const Tray = require("./tray")
const ListenEvent = require("./listen_event")

// 升级地址
const uploadUrl = 'http://www.start7.cn/1.deb';

// 初始化
const init = (win) => {
  console.log('监听init初始化------------------->');
  // 监听事件
  ListenEvent(win)

  // 版本升级
  update(win)

  // 托盘图标
  Tray(win)
}


function sendUpdateMessage (msg, win) {
  win.send('uploadMsg', msg)
}

// 版本更新
function update (win) {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
  };
  autoUpdater.setFeedURL(uploadUrl);
  autoUpdater.on('error', function (error) {
    sendUpdateMessage(message.error, win)
  });
  autoUpdater.on('checking-for-update', function () {
    sendUpdateMessage(message.checking, win)
  });
  autoUpdater.on('update-available', function (info) {
    sendUpdateMessage(message.updateAva, win)
  });
  autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage(message.updateNotAva, win)
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    win.webContents.send('downloadProgress', progressObj)
  })
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {

    win.on('isUpdateNow', (e, arg) => {
      console.log(arguments);
      console.log("开始更新");
      //some code here to handle event
      autoUpdater.quitAndInstall();
    });

    win.webContents.send('isUpdateNow')
  });

  ipcMain.on("checkForUpdate", async () => {
    //执行自动更新检查
    await autoUpdater.checkForUpdates();
  })
}



module.exports = { init }
