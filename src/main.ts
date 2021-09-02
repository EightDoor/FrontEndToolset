import { createApp } from 'vue';
import App from './App.vue';

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

//router
import router from '@/router/router';

// 代码高亮样式
import 'highlight.js/styles/monokai-sublime.css'  //导入代码高亮样式

const app = createApp(App);

// 自定义指令
import directives from './directives';
directives(app)

app.use(ElementPlus, { size: 'small', zIndex: 3000 }).use(router);
app.mount('#app');
