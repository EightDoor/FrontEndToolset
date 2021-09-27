const {Menu, Tray, BrowserWindow } = require('electron')
const path = require("path")


module.exports = ()=>{
  const appIcon = new Tray(path.join(__dirname, '../dist/images/tap.png'))
  // 托盘图标 http://bbs.itying.com/topic/5c21ced8d5488a17e894a7e6
  const menu = Menu.buildFromTemplate([
    {
      label: '设置',
      click: function () {} //打开相应页面
    },
    {
      label: '帮助',
      click: function () {}
    },
    {
      label: '关于',
      click: function () {}
    },
    {
      label: '退出',
      click: function () {
        BrowserWindow.getFocusedWindow().webContents().send('close-main-window');
      }
    }
  ])
  appIcon.setToolTip('个人工具箱');
  appIcon.setContextMenu(menu);
}
