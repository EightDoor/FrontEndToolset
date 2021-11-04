const {app, Menu, shell} = require("electron")

const isMac = process.platform === 'darwin'
module.exports = ()=>{
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
          label:'意见反馈',
          click:function() {
            shell.openExternal('http://www.start6.cn')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
