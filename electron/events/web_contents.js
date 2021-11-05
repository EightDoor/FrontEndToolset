const Config = require('../config')
/**
 * 从主进程向渲染进程发送消息
  */

// 切换路由
function switchRoute(win, method, value) {
  win.webContents.send(Config.channel.SWITCH_ROUTE, {
    method,
    value
  })
}


module.exports = { switchRoute }
