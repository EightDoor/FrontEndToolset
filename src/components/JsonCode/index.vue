<script lang="ts" setup>
import { markRaw, onMounted, onUnmounted, ref, watch } from 'vue'

// 引入CodeMirror和基础样式
import type { EditorFromTextArea } from 'codemirror'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
// JSON代码高亮需要由JavaScript插件支持
import 'codemirror/mode/javascript/javascript.js'
// 选择IDEA主题样式，还有其他很多主题可选
import 'codemirror/theme/idea.css'
// 支持使用Sublime快捷键
// import "codemirror/keymap/sublime.js";
// 搜索功能的依赖
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
// 支持搜索功能
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor.js'
// 支持各种代码折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
// 支持代码区域全屏功能
import 'codemirror/addon/display/fullscreen.css'
import 'codemirror/addon/display/fullscreen.js'
// 支持括号自动匹配
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/closebrackets.js'
// 支持代码自动补全
// import "codemirror/addon/hint/show-hint.css";
// import "codemirror/addon/hint/show-hint.js";
// import "codemirror/addon/hint/anyword-hint.js";
// 行注释
import 'codemirror/addon/comment/comment.js'
// JSON错误检查
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint.js'
// 需要依赖全局的jsonlint，不是很优雅
import 'codemirror/addon/lint/json-lint.js'
import { log } from '@/utils/log'

const props = defineProps<{
  content?: string
  changeText?: (val: any) => void
  mode?: string
  // 是否获取焦点
  focus?: boolean
  readOnly?: boolean
}>()

const code = ref('')
const jsonCodeRef = ref<any>(null)

let codemirror: EditorFromTextArea
function init() {
  // 防止转为监听对象，vue3中如果CodeMirror对象被转为监听对象，会无法正常使用
  codemirror = markRaw<EditorFromTextArea>(
    // 用ref获取需要渲染的textarea的DOM
    CodeMirror.fromTextArea(jsonCodeRef.value, {
      // JS高亮显示
      mode: props.mode ?? 'application/json',
      indentUnit: 2, // 缩进单位，默认2
      smartIndent: true, // 是否智能缩进
      // 是否只读
      readOnly: props.readOnly ?? false,
      // 显示行号
      lineNumbers: true,
      // 设置主题
      // theme: "idea",
      // 绑定sublime快捷键
      // keyMap: "sublime",
      // 默认选择是否显示光标
      showCursorWhenSelecting: true,
      // 开启代码折叠
      lineWrapping: true,
      foldGutter: true,
      gutters: [
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter',
        'CodeMirror-lint-markers',
      ],
      // CodeMirror-lint-markers是实现语法报错功能
      lint: true,

      // 全屏模式
      fullScreen: false,

      // 括号匹配
      matchBrackets: true,
      autoCloseBrackets: true,

      // 额外快捷键
      extraKeys: {
        F11: (cm) => {
          cm.setOption('fullScreen', !cm.getOption('fullScreen'))
        },
        Esc: (cm) => {
          if (cm.getOption('fullScreen'))
            cm.setOption('fullScreen', false)
        },
      },
    }),
  )
  if (props.focus)
    codemirror.focus()

  // 将编辑器中的值存储下来
  codemirror.on('change', (cm: any) => {
    code.value = cm.getValue()
    if (props.changeText)
      props.changeText(cm.getValue())
  })
}

onMounted(() => {
  if (!codemirror) {
    setTimeout(() => {
      init()
    }, 0)
  }
})

function destroy() {
  // 获取代表编辑器的DOM
  // @ts-expect-error
  const element = codemirror.doc.cm.getWrapperElement()
  // 删除编辑器实例
  element && element.remove && element.remove()
}

onUnmounted(() => {
  destroy()
})

watch(
  () => props.content,
  (newVal, oldVal) => {
    log.i('new', newVal)
    if (codemirror)
      codemirror.setValue(newVal ?? '')
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<template>
  <div class="title">
    <slot name="title" />
  </div>
  <textarea
    ref="jsonCodeRef"
    v-model="code"
    class="codesql"
    style="height: 100%; width: 100%"
  />
</template>

<style lang="less">
.codesql {
  font-size: 11pt;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
.title {
  font-size: 25px;
  margin-bottom: 15px;
}
.CodeMirror {
  height: calc(100vh - 250px);
}
</style>
