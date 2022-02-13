import { EnvCmdType } from '@/pages/env_install/env_component_list_cmd';

export interface ListType {
  // 标题
  title: string;
  // 安装状态
  status: boolean;
  // 类型
  type: string;
  // 版本检测命令
  cmd: EnvCmdType;
  // 安装命令
  install?: EnvCmdType;
  // 卸载命令
  uninstall?: EnvCmdType;
}

export type Status = 'install' | 'uninstall';
// 安装、卸载 打开的弹窗
export interface OpenDialogType<T> {
  openDialog: (status: Status, data: T) => void;
}
