<template>
  <div class="container">
    <ul class="ul">
      <li v-for="(item, index) of list" :key="index">
        <el-input v-model="item.one" clearable class="space" placeholder="请输入" />
        <template v-if="item.key === 1">
          <el-dropdown @command="changeSelectTime($event, item)">
            <span class="el-dropdown-link">
              <el-icon>
                <Fold />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(v, selectTimeIndex) of commanTimeList" :key="selectTimeIndex" :command="v">
                  {{ v }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>

        <el-input v-model="item.two" clearable class="space" placeholder="请输入" />
        <el-input v-if="item.key === 2" v-model="item.defaultFormat" class="space" placeholder="请输入" />
        <span v-if="item.key === 2" class="quick-select">
          <el-dropdown @command="changeTime($event, item)">
            <span class="el-dropdown-link">
              <el-icon>
                <Fold />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(v, timeIndex) of commandFormatTimeList" :key="timeIndex" :command="v">{{ v }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </span>
        <el-button size="small" style="margin-left: 15px" :type="item.key === 1 ? 'success' : 'primary'" plain
          @click="changeStatus(item)">
          <el-icon>
            <Switch />
          </el-icon>
          <span class="btb-switch">{{ formatAction(item.key) }}</span>
        </el-button>
        <el-button style="margin-left: 15px" type="primary" @click="transformation(item)">
          转换
        </el-button>
        <el-button type="warning" style="margin-left: 15px" @click="addFun">
          新增
        </el-button>
        <el-button v-if="list.length > 1 && index !== 0" type="danger" style="margin-left: 15px" @click="delFun(item)">
          删除
        </el-button>
      </li>
    </ul>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { ElNotification } from 'element-plus'
import {
  Fold,
  Switch,
} from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import { log } from '@/utils/log'

interface ListData {
  one: Number | String
  two: Number | String
  key: Number
  defaultFormat: String
}
const defaultData: ListData = {
  one: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
  two: dayjs(Date.now()).valueOf(),
  key: 1,
  defaultFormat: 'YYYY-MM-DD HH:mm:ss',
}
const commandFormatTimeList = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD', 'YYYY-MM-DD HH:mm', 'HH:mm:ss']
const defaultTime = dayjs(Date.now()).format('YYYY-MM-DD')
const defaultCurrentTime = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
const commanTimeList = [defaultCurrentTime, `${defaultTime} 00:00:00`, `${defaultTime} 23:59:59`]
const list = ref<ListData[]>([
  cloneDeep(defaultData),
])
const actions = ref([
  {
    lable: 'str时间<->时间戳',
    key: 1,
  },
  {
    lable: '时间戳<->str时间',
    key: 2,
  },
])
function changeSelectTime(event, item) {
  item.one = event
}
function formatAction(key: Number) {
  return actions.value.find(item => item.key === key)?.lable
}
function transformation(item) {
  log.i(item, '点击项')
  if (item.key === 1) {
    item.two = dayjs(item.one).valueOf()
    ElNotification.success(`${formatAction(item.key)} 成功!`)
  }
  else if (item.key === 2) {
    item.two = dayjs(item.one).format(item.defaultFormat)
    ElNotification.success(`${formatAction(item.key)} 成功!`)
  }
  else {
    ElNotification.error('key不匹配')
  }
}
function addFun() {
  list.value.push(cloneDeep(defaultData))
}
function delFun(val) {
  const index = list.value.findIndex(item => item.key === val.key)
  list.value.splice(index, 1)
}
function changeStatus(item) {
  item.key = item.key === 1 ? 2 : 1

  const swap1 = item.two
  item.two = item.one
  item.one = swap1
}
function changeTime(val, item) {
  log.i(val, '当前选择的')
  item.defaultFormat = val
}
</script>

<style scoped lang="less">
.container {
  .switch {
    display: inline-block;
    margin-left: 10px;
  }

  .ul {
    li {
      margin-top: 20px
    }
  }
}

.space {
  margin-left: 15px;
  width: 200px;
}

.quick-select {
  cursor: pointer;

}

.el-dropdown-link {
  margin-top: 10px;
}
</style>
