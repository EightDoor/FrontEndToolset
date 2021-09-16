declare module '*.json';
declare module '*.png';
declare module '*.jpg';
interface ImportMetaEnv {
  VITE_APP_ID: string
  VITE_APP_KEY: string
  // 更多环境变量...
}