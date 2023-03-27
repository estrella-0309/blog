import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/api/config/Loading";
import { ResultData } from "@/api/interface";
import { ResultEnum } from "@/api/enums";
import router from "@/router";
import { checkStatus } from "@/api/utils/checkStatus";
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css'
const config = {
  baseURL: "api",
  timeout: ResultEnum.TIMEOUT as number,
  withCredentials: true
}

class RequestHttp {
  service: AxiosInstance;
  /**
   * constructor
   */
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);


    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见loginApi
        config.headers!.noLoading || showFullScreenLoading()
        NProgress.start()
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done()
        const { data } = response;
        // * 在请求结束后，并关闭请求 loading
        tryHideFullScreenLoading();
        // * 登陆失效（code == 401）
        if (data.status == ResultEnum.OVERDUE) {
          ElMessage.error(data.message);
          return Promise.reject(data);
        }
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.status && data.status !== ResultEnum.SUCCESS) {
          ElMessage.error(data.message);
          return Promise.reject(data);
        }
        // * 成功请求（在页面上除非特殊情况，否则不用在页面处理失败逻辑）
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        tryHideFullScreenLoading();
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
        if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace("/500");
        return Promise.reject(error);
      }
    );
  }
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }
}
export default new RequestHttp(config);
