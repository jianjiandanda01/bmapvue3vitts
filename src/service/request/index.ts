import axios from "axios";
import { AxiosInstance } from "axios";
import { xwlRequestInterceptors, xwlRequestConfig } from "./type";
//将axios封装到类中
class xwlRequest {
  instance: AxiosInstance; //axios的实例将被保存到这里
  interceptors?: xwlRequestInterceptors; //获取到的interceptors将被保存到这里
  constructor(config: xwlRequestConfig) {
    //构造器里的config包括baseURL，timeout等
    this.instance = axios.create(config); //创建axios实例，并保存
    this.interceptors = config.interceptors; //从传进来的config对象中取出key为interceptors的value并保存
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }
  request<T>(config: xwlRequestConfig<T>): Promise<T> {
    //再次封装request方法
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          if (res.data.code === 200) {
            resolve(res.data.result); //将结果返回出去
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
          return err;
        });
    });
  }
  get<T>(config: xwlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: xwlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: xwlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: xwlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
  put<T>(config: xwlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
}
export default xwlRequest;
