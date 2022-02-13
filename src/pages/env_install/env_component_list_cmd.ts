import { log } from '@/utils/log';

const { spawn } = require('child_process');
/**
 * 执行命令
 * @param {*} val 命令
 */
export interface EnvCmdType {
  cmd: string;
  arg: string[];
}
type TypeFun = (val: string) => void;
function EnvCmd(val: EnvCmdType, error: TypeFun, success: TypeFun) {
  try {
    log('输出值', val);
    const ls = spawn(val.cmd, [...val.arg], {
      // 仅在当前运行环境为 Windows 时，才使用 shell
      shell: process.platform === 'win32',
    });
    // 监听标准输出
    ls.stdout.on('data', (data: any) => {
      console.log(`stdout: ${data}`);
      success(data);
    });

    // 监听标准错误
    ls.stderr.on('data', (data: any) => {
      console.error(`stderr: ${data}`);
      error(data);
    });

    // 子进程关闭实践
    ls.on('close', (code: any) => {
      console.log(`子进程退出，退出码 ${code}`);
    });
  } catch (e) {
    log(`执行命令错误 -> ${val}`, JSON.stringify(e));
  }
}

export default EnvCmd;
