import type { App } from 'vue'
import hljs from 'highlight.js'
import { log } from '@/utils/log' // 导入代码高亮文件

export default (app: App<Element>) => {
  // 代码高亮
  app.directive('highlight', {
    mounted: (el, binding, vnode) => {
      hljs.highlightBlock(el)
      // const blocks = el.querySelectorAll('pre code');
      // blocks.forEach((block: any) => {
      // })
    },
  })
}
