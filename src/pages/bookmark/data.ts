import { ListType } from "@/types/com";

interface IData {
  name: string;
  code: string;
  list: ListType[];
}

const data: IData[] = [
  {
    name: "AI",
    code: "ai",
    list: [
      {
        title: "通义千问(阿里)",
        type: "工具",
        url: "https://tongyi.aliyun.com/",
      },
      {
        title: "文心一言(百度)",
        type: "工具",
        url: "https://yiyan.baidu.com/welcome",
      },
      {
        title: "智能创作助手(腾讯)",
        type: "工具",
        url: "https://effidit.qq.com/",
      },
      {
        title: "AIGC导航",
        type: "工具",
        url: "https://www.aigc.cn/",
      },
    ],
  },
  {
    name: "黑苹果",
    code: "black_apple",
    list: [
      {
        title: "联想y7000 2018",
        url: "https://github.com/xiaoMGitHub/LEGION_Y7000Series_Hackintosh",
        type: "EFI",
      },
      {
        title: "OpenCore EFI For B460M-MORTAR-WIFI",
        url: "https://github.com/Spectrelai/Hackintosh-B460M-MORTAR-WIFI",
        type: "EFI",
      },
      {
        title: "openCore可视化配置",
        url: "https://github.com/ic005k/OCAuxiliaryTools",
        type: "工具",
      },
      {
        title: "Hackintool",
        url: "https://github.com/benbaker76/Hackintool",
        type: "工具",
      },
      {
        title: "黑苹果工具集合",
        url: "https://bbs.pcbeta.com/viewthread-1930723-1-2.html",
        type: "工具",
      },
      {
        title: "【镜像下载】macOS纯净版安装镜像 不限速下载（11.x～12.x）",
        url: "https://bbs.pcbeta.com/forum.php?mod=viewthread&tid=1915719&extra=page%3D1%26filter%3Dtypeid%26typeid%3D1416%26typeid%3D1416",
        type: "工具",
      },
      {
        title: "appstorrent俄罗斯破解软件",
        url: "https://appstorrent.ru/",
        type: "软件",
      },
      {
        title: "黑苹果乐园",
        url: "https://mackext.com/",
        type: "论坛",
      },
      {
        title: "黑苹果乐园",
        url: "https://mackext.com/",
        type: "论坛",
      },
      {
        title: "远景论坛",
        url: "https://bbs.pcbeta.com/",
        type: "论坛",
      },
      {
        title: "国光的黑苹果安装教程",
        url: "https://apple.sqlsec.com/",
        type: "论坛",
      },
    ],
  },
  {
    name: "数据库",
    code: "database",
    list: [
      {
        title: "MongoDB中文手册",
        type: "mongodb",
        url: "https://docs.mongoing.com/",
      },
      {
        title: "MongoDB英文手册",
        type: "mongodb",
        url: "https://www.mongodb.com/docs/manual/tutorial/getting-started/",
      },
    ],
  },
  {
    name: "前端开发",
    code: "front",
    list: [
      {
        title: "TC39标准",
        type: "文档",
        url: "https://tc39.es/zh-Hans/",
      },
      {
        title: "javascript在线编辑",
        url: "http://jsbin.com/?html,js,output",
        type: "编辑器",
      },
      {
        title: "在线编辑代码codesandbox",
        url: "https://codesandbox.io/",
        type: "编辑器",
      },
      {
        title: "json Editor",
        url: "http://jsoneditoronline.org/#left=local.kadozu&right=local.gekegi",
        type: "编辑器",
      },
      {
        title: "MDN Web",
        url: "https://developer.mozilla.org/zh-CN/",
        type: "文档",
      },
      {
        title: "caniuse 浏览器兼容性各属性",
        url: "https://caniuse.com/ciu/index",
        type: "文档",
      },
      {
        title: "Vercel v0根据文本生成UI界面代码",
        url: "https://v0.dev/",
        type: "文档",
      },
      // 工具
      {
        title: "eruda(手机网页调试面板)",
        url: "https://github.com/liriliri/eruda",
        type: "工具",
      },
      {
        title: "vConsole",
        url: "https://github.com/Tencent/vConsole/blob/dev/README_CN.md",
        type: "工具",
      },
      {
        title: "tailwindcss中文文档",
        url: "https://www.tailwindcss.cn/",
        type: "工具",
      },
      {
        title: "为开发者打造的演示文稿工具",
        url: "https://cn.sli.dev/",
        type: "工具",
      },
      {
        title: "图片压缩",
        url: "https://docsmall.com/image-compress",
        type: "工具",
      },
      {
        title: "腾讯QQ浏览器在线工具箱",
        url: "https://tool.browser.qq.com/",
        type: "工具",
      },
      // javascript库
      {
        title: "file-saver",
        url: "https://github.com/eligrey/FileSaver.js#readme",
        type: "javascript库",
      },
      {
        title: "前端rsa加解密工具(兼容小程序环境)",
        url: "https://github.com/neohan666/wxmp-rsa",
        type: "javascript库",
      },
      {
        title: "代码高亮，自动语言检测 highlightjs",
        url: "https://highlightjs.org/",
        type: "javascript库",
      },
      {
        title: "codemirror 可扩展的代码编辑器",
        url: "https://codemirror.net/",
        type: "javascript库",
      },
      // 播放器
      {
        title: "西瓜播放器-xgplayer",
        url: "https://github.com/bytedance/xgplayer",
        type: "播放器",
      },
      {
        title: "videojs",
        url: "https://github.com/videojs/video.js",
        type: "播放器",
      },
      {
        title: "西瓜播放器-xgplayer",
        url: "https://github.com/bytedance/xgplayer",
        type: "播放器",
      },
      // vue3
      {
        title: "官网",
        url: "https://cn.vuejs.org/",
        type: "vue3",
      },
      {
        title: "Vue.js 挑战合集",
        url: "https://github.com/webfansplz/vuejs-challenges/blob/main/README.zh-CN.md",
        type: "vue3",
      },
      {
        title: "VueUse",
        url: "https://vueuse.org/",
        type: "vue3",
      },
      {
        title: "vite",
        url: "https://cn.vitejs.dev/",
        type: "vue3",
      },
      {
        title: "pinia",
        url: "https://pinia.vuejs.org/",
        type: "vue3",
      },
      // vue2
      {
        title: "vue2官网",
        url: "https://v2.cn.vuejs.org/v2/guide/",
        type: "vue2",
      },
      // 切图
      {
        title: "pxcook 高效易用的自动标注工具, 生成前端代码, 设计研发协作利器",
        url: "https://www.fancynode.com.cn/pxcook",
        type: "切图",
      },
      {
        title: "在线ps",
        url: "https://www.photopea.com/",
        type: "切图",
      },
      // 字体
      {
        title: "带有编程连字的免费等宽字体 FiraCode",
        url: "https://github.com/tonsky/FiraCode",
        type: "字体",
      },
      // javascript运行时
      {
        title:
          "Bun(它的核心是 Bun 运行时，一个快速的 JavaScript 运行时，旨在替代 Node.js。它是用Zig编写的，由JavaScriptCore提供支持，大大减少了启动时间和内存使用量。)",
        url: "https://github.com/oven-sh/bun",
        type: "javascript运行时",
      },
      {
        title:
          "Bun(是一个简单、现代且安全的运行时 对于使用 V8 并在 Rust 中构建的 JavaScript 和 TypeScript。)",
        url: "https://github.com/denoland/deno",
        type: "javascript运行时",
      },
    ],
  },
  {
    name: "goland",
    code: "go",
    list: [
      {
        title: "go官方文档",
        url: "https://golang.google.cn/",
        type: "文档",
      },
      {
        title: "Golang标准库文档",
        url: "https://studygolang.com/pkgdoc",
        type: "文档",
      },
      {
        title: "Go语言高级编程(Advanced Go Programming)",
        url: "https://chai2010.cn/advanced-go-programming-book/",
        type: "文档",
      },
      {
        title: "go Web编程",
        url: "https://github.com/astaxie/build-web-application-with-golang/blob/master/zh/preface.md",
        type: "文档",
      },
      {
        title: "Go 语言学习资料与社区索引",
        url: "https://github.com/unknwon/go-study-index",
        type: "文档",
      },
      {
        title: "Go语言101",
        url: "https://gfw.go101.org/article/101.html",
        type: "文档",
      },
    ],
  },
  {
    name: "java",
    code: "java",
    list: [
      // spring-boot--------------
      {
        title: "spring initializr",
        url: "https://start.springboot.io/",
        type: "spring-boot",
      },
      {
        title: "mybatis",
        url: "https://mybatis.net.cn/",
        type: "spring-boot",
      },
      {
        title: "mybatis-plus",
        url: "https://www.mybatis-plus.com/",
        type: "spring-boot",
      },
      {
        title: "spring-boot-starters",
        url: "https://github.com/spring-projects/spring-boot/tree/main/spring-boot-project/spring-boot-starters",
        type: "spring-boot",
      },
      // spring-boot--------------
      // 工具--------------
      {
        title: "mvn",
        url: "https://mvnrepository.com/",
        type: "工具",
      },
      {
        title: "hutool",
        url: "https://hutool.cn/",
        type: "工具",
      },
      {
        title: "jrebel激活",
        url: "http://jrebel-license.jiweichengzhu.com/",
        type: "工具",
      },
      {
        title: "java镜像下载(各种JAVA JDK的镜像分发)",
        url: "https://www.injdk.cn/",
        type: "工具",
      },
      {
        title: "banner生成",
        url: "http://patorjk.com/software/taag/#p=testall&f=Graffiti&t=Hello",
        type: "工具",
      },
      {
        title: "阿里云云效 Maven",
        url: "https://developer.aliyun.com/mvn/guide",
        type: "工具",
      },
      {
        title: "Easy Excel（快速、简洁、解决大文件内存溢出的Excel处理工具）",
        url: "https://easyexcel.opensource.alibaba.com/",
        type: "工具",
      },
      // 工具--------------
      // 文档--------------

      {
        title: "openjdk",
        url: "https://openjdk.org/",
        type: "文档",
      },
      {
        title: "廖雪峰java教程",
        url: "https://www.liaoxuefeng.com/wiki/1252599548343744",
        type: "文档",
      },
      {
        title: "Java学习+面试指南",
        url: "https://github.com/Snailclimb/JavaGuide",
        type: "文档",
      },
      {
        title: "Java教程",
        url: "https://www.liaoxuefeng.com/wiki/1252599548343744",
        type: "文档",
      },
      {
        title: "Spring Boot 教程、技术栈示例代码，快速简单上手教程。",
        url: "https://github.com/ityouknow/spring-boot-examples",
        type: "文档",
      },
      {
        title:
          "互联网 Java 工程师进阶知识完全扫盲：涵盖高并发、分布式、高可用、微服务、海量数据处理等领域知识",
        url: "https://github.com/doocs/advanced-java",
        type: "文档",
      },
      {
        title: "fastJson2",
        url: " https://alibaba.github.io/fastjson2/",
        type: "工具",
      },
      {
        title: "mybatis中文文档",
        url: " https://mybatis.org/mybatis-3/zh/index.html",
        type: "工具",
      },
      {
        title:
          "SpringSecurity框架教程-Spring Security+JWT实现项目级前端分离认证授权",
        url: "https://www.bilibili.com/video/BV1mm4y1X7Hc?p=1&vd_source=6df11dc86c4e13ea88a67a6ef88d77bc",
        type: "学习视频",
      },
      {
        title:
          "java8函数式编程(Lambda表达式，Optional，Stream流)从入门到精通-最通俗易懂的函数式编程教学",
        url: "https://www.bilibili.com/video/BV1Gh41187uR?p=1&vd_source=6df11dc86c4e13ea88a67a6ef88d77bc",
        type: "学习视频",
      },
      {
        title: "高并发的哲学原理 Philosophical Principles of High Concurrency",
        url: "https://github.com/johnlui/PPHC",
        type: "学习视频",
      },
      // 文档--------------
    ],
  },
  {
    name: "小程序",
    code: "mini_program",
    list: [
      {
        title: "dcloud插件库",
        type: "uni-app",
        url: "https://ext.dcloud.net.cn/",
      },
      {
        title: "z-tabs",
        type: "常用库",
        url: "https://ext.dcloud.net.cn/plugin?id=8308",
      },
      {
        title: "z-paging分页",
        type: "常用库",
        url: "https://z-paging.zxlee.cn/",
      },
      {
        title: "小程序 使用 tailwindcss 全方面解决方案",
        type: "常用库",
        url: "https://weapp-tw.icebreaker.top/",
      },
      {
        title: " 精致的下拉刷新和上拉加载js框架 mescroll",
        type: "常用库",
        url: "https://github.com/EightDoor/mescroll",
      },
      {
        title: "uview2.0",
        type: "ui",
        url: "https://www.uviewui.com/?from=thosefree.com",
      },
    ],
  },
  {
    name: "逆向论坛",
    code: "reverse_forum",
    list: [
      // 文档--------------
      {
        title: "看雪学苑-看雪-安全培训|安全招聘|",
        url: "https://www.pediy.com",
        type: "文档",
      },
      {
        title: "FreeBuf网络安全行业门户",
        url: "https://www.freebuf.com",
        type: "文档",
      },
      {
        title: "吾爱破解 - LCG - LSG|安卓破解|病毒分析|",
        url: "https://www.52pojie.cn",
        type: "文档",
      },
      {
        title: "看雪论坛-安全社区|安全招聘|",
        url: "https://bbs.pediy.com",
        type: "文档",
      },
      // 文档--------------
    ],
  },
  {
    name: "工具",
    code: "tool",
    list: [
      {
        title: "适用于开发人员和 IT 人员的有用工具",
        url: "https://it-tools.tech/",
        type: "工具",
      },
      {
        title: "免费pdf工具 PDF24 Tools",
        url: "https://tools.pdf24.org/zh/",
        type: "工具",
      },
      {
        title: "stackoverflow",
        url: " https://stackoverflow.com/",
        type: "工具",
      },
      {
        title: "1Panel运维工具",
        url: "https://github.com/1Panel-dev/1Panel",
        type: "工具",
      },
      {
        title: "stackoverflow中文站点",
        url: "https://stackoverflow.org.cn/",
        type: "工具",
      },
      {
        title: "pandoc支持多种格式相互转换，比如docx、docx、pdf、html等",
        url: "https://github.com/jgm/pandoc",
        type: "工具",
      },
    ],
  },
  {
    name: "windows",
    code: "windows",
    list: [
      {
        title: "Snipaste 截图 + 贴图",
        url: "https://zh.snipaste.com/index.html",
        type: "工具",
      },
      {
        title: "干净的卸载工具  Geek Uninstaller",
        url: "https://geekuninstaller.com/download",
        type: "工具",
      },
      {
        title: "7-Zip 官方中文网站",
        url: "https://sparanoid.com/lab/7z/",
        type: "工具",
      },
      {
        title:
          "ScreenToGif 允许您录制屏幕的选定区域，编辑并将其保存为 gif 或视频。",
        url: "https://github.com/NickeManarin/ScreenToGif/tree/master",
        type: "工具",
      },
      {
        title: "播放器  Global Potplayer",
        url: "https://potplayer.daum.net/?lang=zh_CN",
        type: "工具",
      },
      {
        title: "windows 激活工具 zbezj/HEU_KMS_Activator",
        url: "https://github.com/zbezj/HEU_KMS_Activator",
        type: "工具",
      },
      {
        title: "在Windows快速预览各种文件 QL-Win/QuickLook",
        url: "https://github.com/QL-Win/QuickLook",
        type: "工具",
      },
      {
        title: "数据恢复软件,硬盘分区工具,系统备份软件 - DiskGenius官方网站",
        url: "https://www.diskgenius.cn/",
        type: "工具",
      },
      {
        title: "FileZilla ftp文件上传下载",
        url: "https://filezilla-project.org/",
        type: "工具",
      },
      {
        title: "录屏软件 Captura",
        url: "https://mathewsachin.github.io/Captura/download/",
        type: "工具",
      },
      {
        title: "host切换",
        url: "https://github.com/oldj/SwitchHosts",
        type: "工具",
      },
      {
        title: "好用的远程连接工具 Windterm",
        url: "https://github.com/kingToolbox/WindTerm/releases",
        type: "工具",
      },
      {
        title: "Free Download Manager 下载器",
        url: "https://www.freedownloadmanager.org/zh/",
        type: "工具",
      },
      {
        title: "NeatDownloadManager 下载器",
        url: "https://neat-download-manager.en.softonic.com/",
        type: "工具",
      },
      {
        title: "PhotoDemon轻量级的图片编辑工具",
        url: "https://photodemon.org/",
        type: "工具",
      },
      {
        title: "ScreenToGif - 录屏，编辑，保存为 GIF 动画、视频或更多其他格式",
        url: "https://www.screentogif.com/",
        type: "工具",
      },
      {
        title: "磁盘健康检查工具",
        url: "https://github.com/hiyohiyo/CrystalDiskInfo/blob/master/README.sc.md",
        type: "工具",
      },
      {
        title: "Watt Toolkit 是一个开源跨平台的多功能 Steam 工具箱",
        url: "https://github.com/BeyondDimension/SteamTools",
        type: "工具",
      },
      {
        title: "Another Redis Desktop Manager Redis连接工具",
        url: "https://github.com/qishibo/AnotherRedisDesktopManager/blob/master/README.zh-CN.md",
        type: "工具",
      },
      {
        title: "HandBrake 视频转码器",
        url: "https://handbrake.fr/",
        type: "工具",
      },
    ],
  },
];

export default data;
