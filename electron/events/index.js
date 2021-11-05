const Tray = require("./tray")
const ListenEvent = require("./listen_event")

// 初始化
const init = (win) => {
  console.log('监听init初始化------------------->');
  // 监听事件
  ListenEvent(win)

  // 托盘图标
  Tray(win)
}

module.exports = { init }
