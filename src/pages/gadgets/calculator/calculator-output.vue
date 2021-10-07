<template>
  <div class="output-container">
    <div class="output-up">
      <span v-if="calculated">{{ expression }}</span>
    </div>
    <div class="output-down">
      <span v-if="!calculated">{{ expression }}</span>
      <span v-else>={{ result }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator-output',
  props: ['expression', 'result', 'tweenExpression', 'calculated']
}
</script>

<style>
.output-container span {
  float: right;
}
.output-up {
  width: 100%;
  height: 24px;
  font-size: 13px;
  line-height: 24px;
}
.output-down {
  width: 100%;
  height: 31px;
  font-size: 26px;
  line-height: 31px;
}
.output-container {
  width: 512px;
  background-color: #fcfdff;
}
</style>
