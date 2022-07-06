import hljs from 'highlight.js'

export default (app: any) => {
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
