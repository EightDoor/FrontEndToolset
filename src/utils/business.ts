import { ipcRenderer } from "electron";
import CommVariable from "@/comm_variable/comm_variable.json";

export interface RegisterShortcutType {
  value: string;
  label: string;
  description: string;
}
const Business = {
  registerShortcutKeys: (list: RegisterShortcutType[])=>{
    // 发送主进程注册快捷键
    ipcRenderer.invoke(CommVariable.channel.REGISTER_SHORTCUT, JSON.stringify(list ?? CommVariable.Config.ShortcutKey));
  }
}

export default Business
