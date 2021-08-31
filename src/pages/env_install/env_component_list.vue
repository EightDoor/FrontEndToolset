<template>
  <ul class="ul">
    <li>
      <el-badge v-if="!data.status" is-dot class="item">{{ data.title }}</el-badge>
      <template v-else>{{ data.title }}</template>
    </li>
    <li>
      <el-button type="primary">{{ data.status ? "卸载" : "安装" }}</el-button>
    </li>
  </ul>
</template>
<script lang="ts">
import { reactive, watch, defineComponent, PropType } from 'vue';
import EnvCmd from './env_component_list_cmd';
import { log } from '@/utils/log';
export default defineComponent({
  name: "EnvComponentList",
  props: {
    data: {
      type: Object as PropType<EnvInstall.ListType>,
    }
  },
  setup(props) {
    let data = reactive<EnvInstall.ListType>({
      status: false,
      title: '',
      type: '',
    })

    watch(() => props.data, (newValue, oldValue) => {
      log("wa", props.data)
      if (props.data) {
        EnvCmd('node -v')
        data = props.data;
      }
    }, {
      immediate: true,
      deep: true
    })
    return {
      data,
    }
  }
})
</script>
<style scoped lang="less">
@import "./env_component_list.less";
</style>
