
// const spawn = require('cross-spawn')
const { spawn } = require("child_process")
/**
 * 执行命令
 * @param {*} val 命令 
 */

type TypeFun = (val: string) => void;
function EnvCmd(val: string, error: TypeFun, success: TypeFun) {
  // const ls = spawn('npm', ['-v'], {
  //   stdio: "inherit",
  //   shell: process.env.SHELL,
  // })
  // if (ls.error) {
  //   error(JSON.stringify(ls.error));
  //   return;
  // }
  // log("spawn", ls)
  // success(ls.stdout)


  const ls = spawn(val, {
    shell: process.env.SHELL,
  })
  // 监听标准输出
  ls.stdout.on("data", (data: any) => {
    console.log(`stdout: ${data}`);
    success(data);
  })

  // 监听标准错误
  ls.stderr.on("data", (data: any) => {
    console.error(`stderr: ${data}`);
    data += `errOut -> ${data}\n`;
    error(data);
  })

  // 子进程关闭实践
  ls.on('close', (code: any) => {
    console.log(`子进程退出，退出码 ${code}`);
  })
}

// function EnvCmd(val: string, error: TypeFun, success: TypeFun) {
//   cost result = spawn.sync('npm', { stdio: 'inherit' })
//   log('r', result)
//   log('stderr', result.stderr)
//   success(result.stdout)
//   error(result.error)
// }

export default EnvCmd;