// import { BASE_URL, TIME_OUT } from "./request/config";
import xwlRequest from "./request/index";
// import localCache from "../utils/cache";

// const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidXNDb2RlIjoiNjIwMDEwMDAyNDMiLCJleHAiOjE2ODUxNzcyOTIsInVzZXJuYW1lIjoidGlhbnRpYW4ifQ.5i3lnvVd62RV-YDqbTffCwzeMagKNrGTS-N6-37OHd8`;
// 开发
const token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJidXNDb2RlIjoiMDkzMTEwMDAxMjciLCJleHAiOjE2ODU0MzA0ODgsInVzZXJuYW1lIjoidGlhbnFpbmdqaWF5dWFuIn0.WI6Dn42npO96SXgJkLNzAtMnO7yxomX8udpiYzTlMAI`;
const xwlRequests = new xwlRequest({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: import.meta.env.VITE_APP_TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      if (token) {
        config.headers["X-Access-Token"] = token;
      }

      console.log("请求成功的拦截");
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("请求失败的拦截");
      return err;
    },
    responseInterceptor: (res) => {
      console.log("响应成功的拦截");
      return res;
    },
    responseInterceptorCatch: (err) => {
      console.log("响应失败的拦截");
      return err;
    },
  },
});
export default xwlRequests;
