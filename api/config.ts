import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { CustomRequestData } from '../api/model';
// import { ROUTES_CONFIG } from '@/enums/routesEnum';

const BASE_URL = "https://premium-staging.athene.network";
const service = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept-Language': 'vi',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
  },
});

export function requestHttp(requestData: CustomRequestData): any {
  const { url, method, data, params, withCredentials, timeout } = requestData;
  return service({
    url,
    method,
    data,
    params,
    withCredentials,
    timeout: timeout || 10 * 1000,
  });
}

export default requestHttp;
