const { Menu, Tray, app } = require('electron')
const path = require("path")
const { switchRoute } = require("../events/web_contents");
const Config = require("../config");

let tray = null;
module.exports = (win) => {
  tray = new Tray(path.join(__dirname, '../dist/images/tap.png'))
  // 托盘图标 http://bbs.itying.com/topic/5c21ced8d5488a17e894a7e6
  const menu = Menu.buildFromTemplate([
    {
      label: '打开主页面',
      click: function () {
        win.show();
      }
    },
    {
      label: '关于',
      click: function () {
        win.show();
        switchRoute(win, Config.method.HELP)
      }
    },
    {
      label: '退出',
      click: function () {
        win.destroy();
      }
    }
  ])
  tray.on('click', function() {
    win.show();
  })
  tray.setToolTip('个人工具箱');
  tray.setContextMenu(menu);
}
