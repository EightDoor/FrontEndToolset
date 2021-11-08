const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const electronDl = require('electron-dl');
const { init } = require("./events/index")
const menuInit = require("./menu/index")
electronDl()
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win;
function createWindow () {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
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
  menuInit(win)


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

  win.on('close', (event)=>{
    event.preventDefault()
    win.hide();
  })
});

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

