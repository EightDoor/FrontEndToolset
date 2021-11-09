<template>
  <el-divider content-position="left">linux</el-divider>
  <ul class="ul">
    <li v-highlight>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash 或者 wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash</li>
    <li v-highlight>Running either of the above commands downloads a script and runs it. The script clones the nvm repository to ~/.nvm, and attempts to add the source lines from the snippet below to the correct profile file (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).</li>
    <li v-highlight>export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm</li>
  </ul>
  <el-divider content-position="left">mac</el-divider>
  <ul class="ul">
    <li v-highlight>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash 或者 wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash</li>
    <li v-highlight>Running either of the above commands downloads a script and runs it. The script clones the nvm repository to ~/.nvm, and attempts to add the source lines from the snippet below to the correct profile file (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).</li>
    <li v-highlight>export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm</li>
  </ul>
  <el-divider content-position="left">windows</el-divider>
  <ul class="ul">
    <li> <a @click="download">下载地址: https://github.com/coreybutler/nvm-windows/releases</a></li>
  </ul>
</template>
<script setup lang="ts">
import utils from '@/utils';
function download() {
  utils.openUrl("http://nodejs.cn/download/")
}
</script>
<style scoped lang="less">
.ul {
  &>li {
    margin-top: 15px;
    &>a {
      cursor: pointer;
    }
  }
}
</style>
