import { createApp } from 'vue'
import App from './App.vue'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// router
import router from '@/router/router'

// 代码高亮样式
import 'highlight.js/styles/monokai-sublime.css'

// 自定义指令
import directives from './directives'

// store
import store from '@/store' // 导入代码高亮样式

const app = createApp(App)
directives(app)
// @ts-expect-error
app.use(store)

app
  .use(ElementPlus, { size: 'small', zIndex: 3000, location: zhCn })
  // @ts-expect-error
  .use(router)
app.mount('#app')
