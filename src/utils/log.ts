import { Debugout } from 'debugout.js';

const uLog = new Debugout();

export const log = (title: string = '输入信息', v: any) => {
  console.group(title)
  uLog.log(v);
  console.groupEnd();
};
