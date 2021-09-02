namespace EnvInstall {
  export interface ListType {
    // 标题
    title: string;
    // 安装状态
    status: boolean
    // 类型
    type: string,
    // 版本检测命令
    cmd: string;
    // 安装命令
    install?: string;
    // 卸载命令
    uninstall?: string;
  }

  export type Status = 'install' | 'uninstall';
  // 安装、卸载 打开的弹窗
  export interface openDialogType<T> {
    openDialog: (status: Status, data: T) => void
  }
}
