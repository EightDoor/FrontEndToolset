import CommVariable from "@/comm_variable/comm_variable.json";
import store from '@/utils/store';
import Constant from "@/utils/constant";
const {ipcRenderer} = require('electron')

export interface RegisterShortcutType {
  value: string;
  label: string;
  description: string;
}
const Business = {
  registerShortcutKeys: async (list?: RegisterShortcutType[])=>{
    const result = await store.get(Constant.REGISTER_SHORTCUT_KEYS)
    let r: unknown = list ?? CommVariable.Config.ShortcutKey
    if(result) {
      r = result;
    }
    // 发送主进程注册快捷键
    await ipcRenderer.invoke(CommVariable.channel.REGISTER_SHORTCUT, JSON.stringify(r));
  }
}

export default Business
