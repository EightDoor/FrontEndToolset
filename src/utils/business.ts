import CommVariable from "@/comm_variable/comm_variable.json";
import store from '@/utils/store';
import Constant from "@/utils/constant";
import "@amap/amap-jsapi-types";
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
  },
  position: ()=>{
    return new Promise((resolve, reject)=>{
      AMap.plugin('AMap.Geolocation', function() {
        // @ts-ignore
        const geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        // @ts-ignore
        AMap.event.addListener(geolocation, 'complete', onComplete)
        // @ts-ignore
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete (data) {
          // data是具体的定位信息
          console.log(data, '高德根据ip定位');
          geolocation.getCityInfo( function(status, result) {
            if (status === 'complete') {
              // result为对应的地理位置详细信息
              console.log(result, '地理位置');
              resolve(result.adcode);
            }
          })
        }

        function onError (data) {
          // 定位出错
          console.error(data);
          reject(data)
        }
      })
    })
  },
}

export default Business
