const { spawn } = require("child_process")
/**
 * 执行命令
 * @param {*} val 命令 
 */
function EnvCmd(val: string) {
  const ls = spawn(val, {
    cwd: process.cwd(),
    shell: true,
  })

  // 监听标准输出
  ls.stdout.on("data", (data: any) => {
    console.log(`stdout: ${data}`);
  })

  // 监听标准错误
  ls.stderr.on("data", (data: any) => {
    console.error(`stderr: ${data}`);
  })

  // 子进程关闭实践
  ls.on('close', (code: any) => {
    console.log(`子进程退出，退出码 ${code}`);
  })
}


export default EnvCmd;