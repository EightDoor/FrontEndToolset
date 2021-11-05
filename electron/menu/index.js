const { Menu} = require("electron")
const { switchRoute } = require('../events/web_contents')
const Config = require("../config");

const isMac = process.platform === 'darwin'
module.exports = (win)=>{
  const template = [
    {
      label: '操作',
      submenu: [
        {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
        },
        {
          label: '粘贴',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: '全选',
          role: 'selectAll'
        }
      ]
    },
    {
      label: '窗口',
      role: 'window',
      submenu: [
        {
          label: '最小化',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: '关闭',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
        {
          label: '切换开发者工具',
          accelerator: (function () {
            if (isMac) {
              return 'Alt+Command+I'
            } else {
              return 'Ctrl+Shift+I'
            }
          })(),
          click: function (item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.toggleDevTools()
            }
          }
        },
        {
          type: 'separator'
        }
      ]
    },
    {
      label: '帮助',
      role: 'help',
      submenu: [
        {
          label: "快捷键",
          click: function() {
            switchRoute(win, Config.method.SHORTCUT)
          }
        },
        {
          label:'意见反馈',
          click:function() {
            switchRoute(win, Config.method.HELP)
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
