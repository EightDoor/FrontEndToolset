# 功能
- 开发环境配置

# 运行
- 构建node-gpy
  - 执行 nmp run rebuild
- `npm run z`
# 打包
- `npm run dist:all` 打包全部平台
- `npm run dist:mac` 打包mac
- `npm run dist:win` 打包win
# 其他
- 编辑器使用webstorm 
  - 配置Prettier  实现代码保存自动格式化
    - 详细参考 https://prettier.bootcss.com/docs/webstorm.html
# 依赖
- concurrently 同时运行多条命令
- prettier 代码格式化
- debugout.js 前端日志
- vitejs-plugin-electron electron ESModule使用
- codemirror 代码编辑器
- json-to-ts json转换为ts文件
- 百度翻译api
  - 需要自己在根目录创建 .env.local文件 添加对应的百度api开发者id和秘钥


# 完成
- 首页 ![首页](http://mn.applet.start6.cn/git-home.png)
# 功能列表
- nodejs工具管理
- json格式化
- json转换dart
- 文件下载
- 翻译工具
- 快捷键跳转启动
- 每天必看的东西
- 颜色进制转换
- 计算器
- 托盘图标
- URl编码解码
- less、sass 转换为css
- open打开网页
- 快捷键配置
- 开机自启动
  - 没有没有第一次启动 开机自启动选项开启状态
# TODO
- keep-alive 不生效
# 下载
- 根据对应的版本选择下载即可
- 链接: https://pan.baidu.com/s/1Fpfq_cDraOtmzMB8nBzAMA 
  - 提取码: pmqe
# 存在问题
- 打开 window.open() 第一次未加载完毕关闭， 第二次打开 出现程序闪退
