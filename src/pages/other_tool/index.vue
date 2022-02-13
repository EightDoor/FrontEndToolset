<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="定时开关机" name="timerSwitch">
      <ul class="ul">
        <li>当前时间: {{ currentTime }}</li>
        <li>
          选择时间关机:
          <el-select v-model="selectTime" placeholder="请选择预制时间">
            <el-option
              v-for="item in shutDownList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span class="right_span"
            ><el-date-picker
              v-model="selectTimeCu"
              type="datetime"
              placeholder="请选择关机时间"
            >
            </el-date-picker
          ></span>
          <span class="right_span">
            <el-button v-if="!turnOnTiming" @click="startFun" type="primary"
              >开始</el-button
            >
            <el-button v-else @click="stopFun" type="danger"
              >取消任务</el-button
            >
          </span>
          <div>
            <el-alert
              :closable="false"
              style="margin: 15px 0"
              title="同时选择了【预制时间】和【关机时间】, 优先使用关机时间"
              type="warning"
            />
          </div>
        </li>
        <li v-if="turnOnTiming">
          距离关机还有
          <span class="shutdown">{{ formatDuring(turnOnTiming) }}</span>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { log } from '@/utils/log';

const { exec } = require('child_process');

interface ShutDownListType {
  label: string;
  value: number;
}
const currentTime = ref('');
const timeInter = ref();
const activeName = ref('timerSwitch');
const turnOnTiming = ref<number>(0);
// select选择的时间差值
const selectTime = ref(0);
const selectTimeCu = ref(0);
const selectTimeInter = ref();
// 默认单位为ms
const shutDownList = ref<ShutDownListType[]>([
  {
    label: '半小时后',
    value: formatMillisecond(30),
  },
  {
    label: '一小时后',
    value: formatMillisecond(60),
  },
  {
    label: '二小时后',
    value: formatMillisecond(120),
  },
]);

// 格式化毫秒
function formatMillisecond(val: number) {
  return val * 60 * 1000;
}

function handleClick(tab: string) {
  log('click', tab);
  activeName.value = tab;
}

function formatTime() {
  const time = Date.now();
  currentTime.value = dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

function startFun() {
  if (!selectTimeCu.value && !selectTime.value) {
    ElMessage.info('请选择时间');
    return;
  }
  if (selectTimeCu.value) {
    log('selectTimeCu', selectTimeCu.value);
    turnOnTiming.value = selectTimeCu.value;
  } else if (selectTime.value) {
    log('selectTime', selectTime.value);
    turnOnTiming.value = dayjs(selectTime.value).valueOf();
  }
  selectTimeInter.value = setInterval(() => {
    log('时间', turnOnTiming.value);
    turnOnTiming.value -= 1000;
    if (turnOnTiming.value <= 0) {
      sendStop();
    }
  }, 1000);
}

function sendStop() {
  log('执行了关机命令了', process.platform);
  let cmd = '';
  if (process.platform === 'win32') {
    cmd = 'shutdown  -s  -t   00';
  } else if (process.platform === 'linux') {
    //
  } else if (process.platform === 'darwin') {
    //
  }
  const workerProcess = exec(cmd);
  if (workerProcess) {
    // 打印正常的后台可执行程序输出
    workerProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    // 打印错误的后台可执行程序输出
    workerProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    // 退出之后的输出
    workerProcess.on('close', (code) => {
      console.log(`out code：${code}`);
    });
  }
}

function stopFun() {
  reset();
  ElMessage.success('取消任务');
}

function reset() {
  selectTimeCu.value = 0;
  turnOnTiming.value = 0;
  selectTime.value = 0;
  if (selectTimeInter.value) {
    clearInterval(selectTimeInter.value);
  }
}

const formatDuring = (t: number) => {
  const HOUR: number = 1000 * 60 * 60;
  const d = parseInt(String(t / (HOUR * 24)), 10);
  const h = parseInt(String((t % (HOUR * 24)) / HOUR), 10);
  const m = parseInt(String((t % HOUR) / (1000 * 60)), 10);
  const s = parseInt(String((t % (1000 * 60)) / 1000), 10);

  let text = '';
  if (d) {
    text += `${d}天`;
  }
  if (h) {
    text += `${h}小时`;
  }
  if (m) {
    text += `${m}分`;
  }
  if (s) {
    text += `${s}秒`;
  }
  return text || '-';
};
onMounted(() => {
  timeInter.value = setInterval(() => {
    formatTime();
  }, 1000);
});

onUnmounted(() => {
  if (timeInter.value) {
    clearInterval(timeInter.value);
  }
});
</script>
<style scoped lang="less">
.ul {
  li {
    margin-bottom: 15px;
  }
}
.right_span {
  display: inline-block;
  margin-left: 15px;
}
.shutdown {
  display: inline-block;
  margin: 0 15px;
  font-size: 25px;
}
</style>
