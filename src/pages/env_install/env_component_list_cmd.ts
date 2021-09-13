import { log } from "@/utils/log";
const { spawn } = require("child_process")
/**
 * 执行命令
 * @param {*} val 命令
 */

type TypeFun = (val: string) => void;
function EnvCmd(val: string, error: TypeFun, success: TypeFun) {
  log('输出值', val)
  const ls = spawn(val, {
    shell: true,
  })
  // 监听标准输出
  ls.stdout.on("data", (data: any) => {
    console.log(`stdout: ${data}`);
    success(data);
  })

  // 监听标准错误
  ls.stderr.on("data", (data: any) => {
    console.error(`stderr: ${data}`);
    error(data);
  })

  // 子进程关闭实践
  ls.on('close', (code: any) => {
    console.log(`子进程退出，退出码 ${code}`);
  })
}

export default EnvCmd;
