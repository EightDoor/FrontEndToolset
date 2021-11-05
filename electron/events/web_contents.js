const Config = require('../config')
/**
 * 从主进程向渲染进程发送消息
  */

// 切换路由
function switchRoute(win, method) {
  win.webContents.send(Config.channel.SWITCH_ROUTE, method)
}

module.exports = { switchRoute }
