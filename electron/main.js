const {
  app,
  BrowserWindow,
  globalShortcut,
  autoUpdater,
  dialog,
} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const electronDl = require('electron-dl');
const { init } = require('./events/index');
const menuInit = require('./menu/index');

electronDl();
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    maximizable: true,
    minimizable: true,
    resizable: true,
    webPreferences: {
      webviewTag: false,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  init(win);
  menuInit(win);

  isDev ? dev() : win.loadFile(path.join(__dirname, 'dist/index.html'));
  // win.loadFile(path.join(__dirname, 'dist/index.html'));
  function dev() {
    const url = 'http://localhost:9999/';
    win
      .loadURL(url)
      .then(
        (
          r // 打开调试
        ) => win.webContents.openDevTools({ mode: 'bottom' })
      )
      .catch((err) => {
        console.log(err);
      });
  }

  initUpdate();
}

app.whenReady().then(() => {
  createWindow();

  // 在主进程中调用 Chromium 命令行关闭同源策略。
  app.commandLine.appendSwitch('disable-site-isolation-trials');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  win.on('close', (event) => {
    event.preventDefault();
    win.hide();
  });
});

app.on('will-quit', () => {
  win = null;
  globalShortcut.unregisterAll();
});

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

function initUpdate() {
  const server = 'https://vue3-admin-nest-upload.vercel.app/';
  const url = `${server}/update/${process.platform}/${app.getVersion()}`;
  console.log('操作平台', process.platform);
  console.log('当前版本: ', app.getVersion());
  autoUpdater.setFeedURL({ url });
  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 5000);

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['立即重启', '稍后启动'],
      title: '应用程序更新',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: '已下载新版本,重新启动应用程序更新。',
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });

  autoUpdater.on('error', (message) => {
    console.error('There was a problem updating the application');
    console.error(message);
  });
}
