import type { AxiosResponse, AxiosRequestConfig } from 'axios';
export interface CustomResponseData<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosResponse['config'];
  request?: any;
}

export interface CustomRequestData extends AxiosRequestConfig {
  customProperty?: any;
}


