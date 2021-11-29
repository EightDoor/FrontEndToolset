import Config from '@/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const instant = axios.create({
  baseURL: ""
})

instant.interceptors.request.use((config: AxiosRequestConfig) => {
  // 在发送请求之前做些什么
  const reg = /music/;
  if (reg.test(config.url || "")) {
    config.baseURL = Config.musicApi;
  }
  return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 添加响应拦截器
instant.interceptors.response.use(function (response: AxiosResponse) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default instant;
