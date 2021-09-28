<template>
  <div class="gadgets_container">
    <h2>RGB颜色转换成十六进制颜色</h2>
    <div>
      (R)<el-input-number class="input_num" v-model="hex1" :min="0"/>
      (G)<el-input-number class="input_num" v-model="hex2" :min="0"/>
      (B)<el-input-number class="input_num" v-model="hex3" :min="0"/>
      <el-button type="primary" @click="transformation">转换</el-button>
    </div>
    <div class="content">
      <div class="backColor" :style="hex?{backgroundColor: hex}:{}">

      </div>
      <div class="content__hex">
        {{hex}}
      </div>
      <div v-if="hex">
        <el-button type="success" size="small" style="margin-left: 15px" @click="copyColor(hex)">复制颜色</el-button>
      </div>
    </div>
  </div>

  <div class="gadgets_container">
    <h2>十六进制颜色转换成RGB颜色</h2>
    <div>
      <el-input style="width: 150px" placeholder="请输入十六进制颜色" class="input_num" v-model="hexadecimal" :min="0"/>
      <el-button type="primary" @click="transformationRgb">转换</el-button>
    </div>
    <div class="content">
      <div class="backColor" :style="hexadecimalRgb?{backgroundColor: hexadecimalRgb}:{}">

      </div>
      <div class="content__hex">
        {{hexadecimalRgb}}
      </div>
      <div v-if="hexadecimalRgb">
        <el-button type="success" size="small" style="margin-left: 15px"  @click="copyColor(hexadecimalRgb)">复制颜色</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ColorHexConversion'
}
</script>
<script lang="ts" setup>
// 颜色进制转换
import { ref } from "vue";
import { ElMessage } from "element-plus";
const {clipboard} = require("electron")

// rgb
const hex1 = ref(0);
const hex2 = ref(0);
const hex3 = ref(0);
const hex = ref("")

const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
const colorHex =  function (val: string){
  let  that = val ;
  if (/^(rgb|RGB)/.test(that)){
    const  aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "" ).split( "," );
    let  strHex =  "#" ;
    for ( let  i=0; i<aColor.length; i++){
      let  hex = Number(aColor[i]).toString(16);
      if (hex ===  "0" ){
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7){
      strHex = that;
    }
    return  strHex;
  } else  if (reg.test(that)){
    const  aNum = that.replace(/ #/,"").split("");
    if (aNum.length === 6){
      return  that;
    } else  if (aNum.length === 3){
      let  numHex =  "#" ;
      for ( let  i=0; i<aNum.length; i+=1){
        numHex += (aNum[i]+aNum[i]);
      }
      return  numHex;
    }
  } else {
    return  that;
  }
}

/*16进制颜色转为RGB格式*/
const colorRgb =  function (val: string){
  let  sColor = val.toLowerCase();
  if (sColor && reg.test(sColor)){
    if (sColor.length === 4){
      let  sColorNew =  "#" ;
      for ( let  i=1; i<4; i+=1){
        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    let  sColorChange = [];
    for ( let  i=1; i<7; i+=2){
      sColorChange.push(parseInt( "0x" +sColor.slice(i,i+2)));
    }
    return  "RGB("  + sColorChange.join( "," ) +  ")" ;
  } else {
    return  sColor;
  }
}

function transformation() {
  console.log(hex1.value);
  console.log(hex2.value);
  console.log(hex3.value);
  hex.value = colorHex(`RGB(${hex1.value},${hex2.value},${hex3.value})`)
}


// 16进制
const hexadecimal = ref("")
const hexadecimalRgb = ref("")
function transformationRgb() {
  hexadecimalRgb.value = colorRgb(hexadecimal.value)
  console.log(hexadecimalRgb.value);
}

function copyColor(val) {
  clipboard.writeText(val);
  ElMessage.success(`${val}: 复制成功`);
}

</script>
<style lang="less" scoped>
.gadgets_container {
  border-bottom: 1px solid var(--el-border-color-base);
  padding-bottom: 15px;
}
.input_num {
  margin-right: 15px;
}
.content {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  &__hex {
    color: red;
  }
}
.backColor {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
</style>
