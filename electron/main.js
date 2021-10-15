const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const electronDl = require('electron-dl');
const { init } = require("./events/index")
electronDl()

// 初始化render函数

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    maximizable: true,
    minimizable: true,
    resizable: true,
    webPreferences: {
      webviewTag: true,
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  init(win);
  isDev ? dev() : win.loadFile(path.join(__dirname, 'dist/index.html'));
  // win.loadFile(path.join(__dirname, 'dist/index.html'));
  function dev () {
    const url = 'http://localhost:9999/';
    win.loadURL(url).then(
      (
        r // 打开调试
      ) => win.webContents.openDevTools({ mode: 'bottom' })
    ).catch(err => {
      console.log(err);
    });
  }
}

app.whenReady().then(() => {
  createWindow();

  // 在主进程中调用 Chromium 命令行关闭同源策略。
  app.commandLine.appendSwitch("disable-site-isolation-trials");

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
