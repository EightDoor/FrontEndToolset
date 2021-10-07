<template>
  <div>
    <div class="calculator-container">
      <calculator-output :expression="expression" :result="result" :calculated="calculated"></calculator-output>
      <calculator-button :button-arr="buttonArr" @assign="assign"></calculator-button>
    </div>
  </div>
</template>

<script>
import calculator_button from "./calculator-button.vue";
import calculator_output from "./calculator-output.vue";
export default {
  name: "calculator",
  components: {
    "calculator-output": calculator_output,
    "calculator-button": calculator_button
  },
  data: function () {
    return {
      buttonArr: [
        "back",
        "(",
        ")",
        "%",
        "C",
        "7",
        "8",
        "9",
        "/",
        "4",
        "5",
        "6",
        "*",
        "1",
        "2",
        "3",
        "-",
        "0",
        ".",
        "=",
        "+"
      ],
      expression: "", //保存算式
      result: null, //保存计算结果
      calculated: false //表示计算是否完成,true为未完成,false为完成
    };
  },
  computed: {
    lastChar: function () {
      return this.expression.charAt(this.expression.length - 1);
    }
  },
  methods: {
    assign: function (event, item) {
      //根据点击的按钮,调用特定的函数
      switch (item) {
        case "0":
          this.checkZero(event);
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          this.checkNum(event, item);
          break;
        case "C":
          this.clear();
          break;
        case "+":
        case "-":
        case "/":
        case "*":
        case ".":
          this.checkOperator(event, item);
          break;
        case "back":
          this.back();
          break;
        case "%":
          this.turnFloat();
          break;
        case "=":
          this.calculate();
          break;
        default:
          this.expression += item;
      }
    },
    deleteLastChar: function () {
      //删除表达式最后一位字符
      return this.expression.substring(0, this.expression.length - 1);
    },
    back: function () {
      //对应back键,删除算式的最后一位
      this.expression == ""
        ? this.clear()
        : (this.expression = this.deleteLastChar()); //当删到算式为空时,调用clear(),相当于按了一次'C'键 : 如果算式不为空,则删掉其最后一位的字符
    },
    clear: function () {
      //对应C键,清空保存算式和结果的属性,并把表示计算是否结束的属性设为false
      this.expression = this.result = "";
      this.calculated = false;
    },
    checkOperator: function (event, item) {
      //对应+-*/.键
      var reg = /[\+\-\*\/\.]/;
      if (item === "-") {
        return (this.expression += item);
      };
      if (!reg.test(this.lastChar)) {
        //如果算式最后一位已经是运算符或算式为空且点击的键不是-,则阻止本次操作
        this.expression += item;
      };
    },
    checkZero: function (event) {
      //对应0键
      this.expression == "0"
        ? event.preventDefault()
        : (this.expression += "0"); //如果算式只有一个0,则阻止本次操作
    },
    checkNum: function (event, item) {
      //对应1-9键
      this.expression == "0"
        ? ((this.expression = ""), (this.expression += item))
        : (this.expression += item); //如果当前算式只有一个0,则删除这个0再将数字拼入算式
    },
    turnFloat: function () {
      //对应%,将数字转化为它*0.01后的结果
      if (!parseInt(this.lastChar)) {
        //当最后一位字符不是数字时,不执行函数
        return;
      }
      var i = this.expression.length - 1;
      var reg = /[0-9\.]/;
      do {
        var char = this.expression.charAt(i);
        i--;
      } while (reg.test(char));
      var num = parseFloat(this.expression.substring(i + 2));
      this.expression = this.expression.substring(0, i + 2);
      var floatNum = num * 0.01;
      this.expression += floatNum.toString();
    },
    calculate: function () {
      //对应=
      try {
        if (this.expression == "") {
          return;
        }
        var reg = /[0-9\)]/;
        if (!reg.test(this.lastChar)) {
          //如果算式的最后一位不是数字或右括号,则删除最后一位字符直到遇到数字或右括号为止
          do {
            this.expression = this.deleteLastChar();
          } while (!reg.test(this.lastChar));
        }
        this.calculated = true;
        this.result = eval(this.expression) + "";
      } catch (e) {
        alert("您输入的算式有误");
      }
    }
  }
};
</script>

<style>
.calculator-container {
  width: 514px;
  padding: 10px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
}
</style>
