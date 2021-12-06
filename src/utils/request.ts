import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from '@/config';

const instant = axios.create({
  baseURL: '',
  withCredentials: true,
});

instant.interceptors.request.use(async (config: AxiosRequestConfig) => {
  // 在发送请求之前做些什么
  const reg = /music/;
  if (reg.test(config.url || '')) {
    config.baseURL = Config.musicApi;
  }
  return config;
}, (error) =>
// 对请求错误做些什么
  Promise.reject(error));

// 添加响应拦截器
instant.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) =>
    // 对响应错误做点什么
    Promise.reject(error)
  ,
);

export default instant;
