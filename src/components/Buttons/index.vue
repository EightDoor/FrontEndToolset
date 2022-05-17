<script lang="ts" setup>
import type { ButtonsListType } from '@/types/com'

const props = defineProps<{
  list: ButtonsListType[]
  click: (val: string) => void
  w?: string
  h?: string
  loading?: boolean
}>()
</script>

<template>
  <ul class="ul">
    <li v-for="(item, index) in props.list" :key="index">
      <el-button
        :loading="props.loading ?? false"
        class="button_space"
        :type="item.type ?? 'primary'"
        :size="item.size ?? 'medium'"
        :plain="item.plain ?? false"
        @click="() => props.click(item.title)"
      >
        {{ item.title }}
      </el-button>
    </li>
    <slot />
  </ul>
</template>

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
