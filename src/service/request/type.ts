import { AxiosRequestConfig, AxiosResponse } from "axios";
export interface xwlRequestInterceptors<T = AxiosResponse> {
  //定义扩展接口类型
  requestInterceptor?: (config: any) => any;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
export interface xwlRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  //继承后有父类所有属性
  //涉及到接口的合并
  showLoading?: boolean;
  interceptors?: xwlRequestInterceptors<T>;
}
