<template>
  <ul class="ul">
    <li v-for="(item, index) in props.list" :key="index">
      <el-button
        :loading="props.loading ?? false"
        @click="() => props.click(item.title)"
        class="button_space"
        :type="item.type ?? 'primary'"
        :size="item.size ?? 'medium'"
        :plain="item.plain ?? false"
      >{{ item.title }}</el-button>
    </li>
    <slot></slot>
  </ul>
</template>
<script lang="ts" setup>

export interface ButtonsType {
  list: ButtonsListType[],
  click: (val: string) => void;
  w?: string;
  h?: string;
  loading?: boolean
}
export interface ButtonsListType {
  title: string;
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text',
  size?: 'medium' | 'small' | 'mini'
  plain?: boolean,
}

const props = defineProps<ButtonsType>()
</script>
<style lang="less" scoped>
.button_space {
  margin-right: 15px;
  margin-bottom: 15px;
}
.ul {
  display: flex;
  flex-direction: row;
}
</style>
