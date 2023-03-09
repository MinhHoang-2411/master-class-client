import { getAuth } from '@/utils/auth';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const URL_API = process.env.NEXT_PUBLIC_API_URL;

const axiosClient_V2 = axios.create({
  baseURL: URL_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient_V2;

// Add a request interceptor
axiosClient_V2.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const auth: any = getAuth();

    config.headers = {
      'Accept-Language': 'en',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${auth.api_token}`,
    };
    let locale = Cookies.get('appLocale') || 'en';
    config.headers['Accept-Language'] = ['vi', 'en'].includes(locale) ? locale : 'en';

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient_V2.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
